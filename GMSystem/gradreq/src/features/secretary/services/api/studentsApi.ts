import type {
  Student,
  CourseTaken,
  EligibilityCheckResult,
  StudentEligibilityStatus,
  EligibilityCheckType,
} from "../../../advisor/services/types";
import { getServiceConfig } from "../utils/serviceUtils";
import { handleApiResponse, ServiceError } from "../utils/serviceUtils";
import { getUserFromAuthApi } from "./usersApi";

// Get service configuration
const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Cache key for secretary data
const SECRETARY_CACHE_KEY = "secretary_data";
const STUDENTS_CACHE_KEY = "secretary_students";
const ELIGIBILITY_CACHE_KEY = "secretary_eligibility_results";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Interface for cached secretary data
interface CachedSecretaryData {
  secretaryId: string;
  departmentId: string;
  departmentName: string;
  timestamp: number;
}

// Interface for cached students data
interface CachedStudentsData {
  students: Student[];
  timestamp: number;
}

// Interface for cached eligibility data
interface CachedEligibilityData {
  results: Record<string, EligibilityCheckResult[]>; // studentId -> results
  timestamp: number;
}

// Get cached data from localStorage
const getCachedData = <T>(key: string): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn("Failed to parse cached data:", error);
  }
  return null;
};

// Set data to cache in localStorage
const setCachedData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to cache data:", error);
  }
};

// Check if cached data is still valid
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Get secretary data with caching
export const getSecretaryData = async (): Promise<CachedSecretaryData> => {
  // Check cache first
  const cached = getCachedData<CachedSecretaryData>(SECRETARY_CACHE_KEY);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached;
  }

  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    // Get current user data from /Users/GetFromAuth
    const currentUser = await getUserFromAuthApi();

    console.log("🔍 [SecretaryApiDebug] Current user data:", currentUser);
    console.log("🔍 [SecretaryApiDebug] User role:", currentUser.userRole);

    // Check if user is a secretary (handle both frontend and backend role naming)
    const userRole = currentUser.userRole?.toUpperCase();
    if (userRole !== "SECRETARY" && userRole !== "DEPARTMENT_SECRETARY") {
      throw new ServiceError(
        `User is not a secretary. Current role: ${currentUser.userRole}`
      );
    }

    const secretaryData: CachedSecretaryData = {
      secretaryId: currentUser.id,
      departmentId: currentUser.departmentId,
      departmentName: currentUser.departmentName,
      timestamp: Date.now(),
    };

    // Cache the data
    setCachedData(SECRETARY_CACHE_KEY, secretaryData);

    return secretaryData;
  } catch (error) {
    console.error("Failed to get secretary data:", error);
    throw new ServiceError("Failed to get secretary information");
  }
};

// API function to get all students in the department
export const getStudentsApi = async (): Promise<Student[]> => {
  try {
    // Check if we have cached students data
    const cachedStudents =
      getCachedData<CachedStudentsData>(STUDENTS_CACHE_KEY);
    if (cachedStudents && isCacheValid(cachedStudents.timestamp)) {
      console.log("🔍 [SecretaryApiDebug] Returning cached students data");
      return cachedStudents.students;
    }

    console.log(
      "🔄 [SecretaryApiDebug] No valid cache, fetching fresh students data..."
    );

    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    // Get secretary data (cached or fresh)
    const secretaryData = await getSecretaryData();
    const departmentId = secretaryData.departmentId;

    // First, get the list of all students in the department
    const studentsListUrl = `${apiBaseUrl}/Students?departmentId=${departmentId}&PageRequest.PageIndex=0&PageRequest.PageSize=1000`;
    console.log(
      "🔍 [SecretaryApiDebug] Fetching students list from:",
      studentsListUrl
    );

    const response = await fetch(studentsListUrl, {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await handleApiResponse<{ items: any[] }>(response);
    console.log(
      `🔍 [SecretaryApiDebug] Fetched ${data.items.length} students from API.`
    );

    // Now, for each student, fetch detailed data including graduation process
    console.log(
      `🔍 [SecretaryApiDebug] Fetching detailed data for each student...`
    );
    const allStudents = await Promise.all(
      data.items.map(async (item) => {
        try {
          // Fetch individual student data to get graduation process
          const studentResponse = await fetch(
            `${apiBaseUrl}/Students/${item.id}`,
            {
              ...fetchOptions,
              method: "GET",
              headers: {
                ...fetchOptions.headers,
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          const studentDetailData = await handleApiResponse<any>(
            studentResponse
          );

          // Log the detailed data to ensure it has graduationProcess
          console.log(
            `🔍 [SecretaryApiDebug] Student ${studentDetailData.firstName} ${studentDetailData.lastName} (ID: ${studentDetailData.id}) detailed data:`,
            studentDetailData
          );

          return {
            id: studentDetailData.id, // Directly from studentDetailData
            studentNumber: studentDetailData.studentNumber,
            firstName: studentDetailData.firstName,
            lastName: studentDetailData.lastName,
            name: `${studentDetailData.firstName || ""} ${
              studentDetailData.lastName || ""
            }`.trim(),
            email: studentDetailData.email,
            departmentId: studentDetailData.departmentId,
            department:
              studentDetailData.departmentName || secretaryData.departmentName, // Prefer departmentName from studentDetailData if available
            programName: studentDetailData.programName,
            enrollDate: studentDetailData.enrollDate,
            currentGpa: studentDetailData.currentGpa,
            gpa: studentDetailData.currentGpa
              ? studentDetailData.currentGpa.toFixed(2)
              : "N/A",
            currentEctsCompleted: studentDetailData.currentEctsCompleted,
            ectsCompleted: studentDetailData.currentEctsCompleted || 0,
            status: mapStudentStatus(studentDetailData.graduationStatus), // Student's general status from backend's graduationStatus field
            graduationStatus: studentDetailData.graduationStatus, // Store raw backend value of student's overall status
            assignedAdvisorUserId: studentDetailData.assignedAdvisorUserId,
            graduationProcess: studentDetailData.graduationProcess || undefined, // This is the GraduationProcess object
            // Ensure other fields used by UI are mapped if they come from studentDetailData
            // phone: studentDetailData.phoneNumber || "", // Example, adjust if backend provides phoneNumber
            // lastMeeting: studentDetailData.lastMeetingDate || "", // Example, adjust if backend provides lastMeetingDate
          };
        } catch (error) {
          console.warn(
            `⚠️ [SecretaryApiDebug] Failed to fetch detailed data for student ${item.id}:`,
            error
          );
          // Return basic student data from the list if detailed fetch fails
          return {
            id: item.id,
            studentNumber: item.studentNumber, // from list item
            firstName: item.firstName, // from list item
            lastName: item.lastName, // from list item
            name: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
            email: item.email, // from list item
            departmentId: item.departmentId, // from list item
            department: secretaryData.departmentName, // Default department name
            gpa: item.currentGpa ? item.currentGpa.toFixed(2) : "N/A", // from list item
            status: mapStudentStatus(item.graduationStatus), // from list item
            graduationStatus: item.graduationStatus, // from list item
            // Ensure all required fields for Student type are present, even if undefined
            programName: undefined,
            enrollDate: undefined,
            currentGpa: undefined,
            currentEctsCompleted: undefined,
            ectsCompleted: item.currentEctsCompleted || 0,
            assignedAdvisorUserId: undefined,
            graduationProcess: undefined,
          };
        }
      })
    );

    // Cache the students data
    const studentsToCache: CachedStudentsData = {
      students: allStudents,
      timestamp: Date.now(),
    };
    setCachedData(STUDENTS_CACHE_KEY, studentsToCache);

    console.log(
      "✅ [SecretaryApiDebug] Successfully fetched and processed students data."
    );
    return allStudents;
  } catch (error) {
    console.error("❌ [SecretaryApiDebug] Failed to fetch students:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(
      "Failed to fetch students due to an unexpected error."
    );
  }
};

// Helper function to fetch the raw list of students for a department
const fetchStudentsList = async (departmentId: string, authToken: string) => {
  const maxPageSize = 2147483647; // Integer.MAX_VALUE
  const studentsListUrl = `${apiBaseUrl}/Students?departmentId=${departmentId}&PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`;

  console.log(" fetching students list from:", studentsListUrl);

  const response = await fetch(studentsListUrl, {
    ...fetchOptions,
    method: "GET",
    headers: { ...fetchOptions.headers, Authorization: `Bearer ${authToken}` },
  });

  const data = await handleApiResponse<{ items: any[] }>(response);
  console.log(` Fetched ${data.items.length} students from API.`);
  return data;
};

// Helper function to fetch the raw list of graduation processes
const fetchGraduationProcessesList = async (authToken: string) => {
  const maxPageSize = 2147483647; // Integer.MAX_VALUE
  const graduationProcessesUrl = `${apiBaseUrl}/GraduationProcesses?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`;

  console.log(" fetching graduation processes from:", graduationProcessesUrl);

  const response = await fetch(graduationProcessesUrl, {
    ...fetchOptions,
    method: "GET",
    headers: { ...fetchOptions.headers, Authorization: `Bearer ${authToken}` },
  });
  const data = await handleApiResponse<{ items: any[] }>(response);
  console.log(` Fetched ${data.items.length} graduation processes from API.`);
  return data;
};

// Helper function to map students with their corresponding graduation processes
const mapStudentsWithProcesses = (
  studentItems: any[],
  processItems: any[],
  defaultDepartmentName: string
): Student[] => {
  const graduationProcessMap = new Map();
  console.log(
    "🔍 [mapStudentsWithProcesses] Raw processItems count:",
    processItems.length
  );
  processItems.forEach((process) => {
    if (process.studentId) {
      graduationProcessMap.set(process.studentId, process);
    } else {
      console.warn(
        "⚠️ [mapStudentsWithProcesses] Process item missing studentId:",
        process
      );
    }
  });
  console.log(
    "🔍 [mapStudentsWithProcesses] graduationProcessMap size:",
    graduationProcessMap.size
  );
  // console.log("🔍 [mapStudentsWithProcesses] graduationProcessMap content:", Object.fromEntries(graduationProcessMap)); // Can be very verbose

  return studentItems.map((item) => {
    if (!item.id) {
      console.warn(
        "⚠️ [mapStudentsWithProcesses] Student item missing id:",
        item
      );
    }
    const studentId = item.id;
    const graduationProcess = graduationProcessMap.get(studentId);

    if (!graduationProcess) {
      // This log is important to see if a student doesn't have a matching process
      console.log(
        `ℹ️ [mapStudentsWithProcesses] No graduation process found for studentId: ${studentId} (Name: ${item.firstName} ${item.lastName})`
      );
    }

    // console.log( // This log can be very verbose, enable if needed for specific student debugging
    //   ` Student ${item.firstName} ${item.lastName} (${studentId}) mapped with GP:`, graduationProcess
    // );
    return {
      id: studentId,
      name: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
      department: item.departmentName || defaultDepartmentName,
      gpa: item.currentGpa ? item.currentGpa.toFixed(2) : "N/A",
      status: mapStudentStatus(item.graduationStatus), // This is student's general status, not process status
      email: item.email || "",
      phone: item.phoneNumber || item.phone || "",
      lastMeeting: item.lastMeetingDate || "",
      studentNumber: item.studentNumber || item.id, // Ensure studentNumber is populated
      ectsCompleted: item.currentEctsCompleted || 0,
      enrollDate: item.enrollDate || "",
      graduationStatus: item.graduationStatus || 0, // This is student's general status
      graduationProcess: graduationProcess || undefined, // This is the crucial part
    };
  });
};

// Helper function to map backend graduation status to frontend status
const mapStudentStatus = (graduationStatus: number): Student["status"] => {
  switch (graduationStatus) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return "Normal Öğrenim";
    case 9:
      return "Mezun";
    case 10:
      return "Ayrıldı";
    default:
      return "Normal Öğrenim";
  }
};

// API function to send email to a student
export const sendEmailToStudentApi = async (
  studentId: string,
  subject: string,
  message: string
): Promise<{ success: boolean }> => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    const response = await fetch(`${apiBaseUrl}/MailLogs`, {
      ...fetchOptions,
      method: "POST",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        recipientUserId: studentId,
        subject: subject,
        body: message,
        isHtml: false,
      }),
    });

    await handleApiResponse<any>(response);
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new ServiceError("Failed to send email to student");
  }
};

// API function to get course takens for a student
export const getStudentCourseTakensApi = async (
  studentId: string
): Promise<CourseTaken[]> => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    const maxPageSize = 2147483647; // Integer.MAX_VALUE
    const response = await fetch(
      `${apiBaseUrl}/CourseTakens/by-student/${studentId}?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
      {
        ...fetchOptions,
        method: "GET",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = await handleApiResponse<{
      items: any[];
      index: number;
      size: number;
      count: number;
      pages: number;
      hasPrevious: boolean;
      hasNext: boolean;
    }>(response);

    console.log(
      `🔍 [SecretaryApiDebug] Raw CourseTakens for student ${studentId}: ${data.items.length} items`
    );

    const mappedCourses = data.items.map((item) => ({
      id: item.id,
      studentUserId: studentId,
      courseCodeInTranscript: item.courseCodeInTranscript,
      courseNameInTranscript: item.courseNameInTranscript,
      matchedCourseId: item.matchedCourseId || item.id,
      grade: item.grade,
      semesterTaken: item.semesterTaken,
      creditsEarned: item.creditsEarned,
      isSuccessfullyCompleted: item.isSuccessfullyCompleted,
    }));

    console.log(
      `🔍 [SecretaryApiDebug] Mapped CourseTakens for student ${studentId}: ${mappedCourses.length} items`
    );

    // Log a warning if we get an unusually large number of courses
    if (mappedCourses.length > 100) {
      console.warn(
        `⚠️ [SecretaryApiDebug] Unusually large number of courses (${mappedCourses.length}) for student ${studentId}. This might indicate a backend issue.`
      );
    }
    return mappedCourses;
  } catch (error) {
    console.error("Failed to fetch course takens:", error);
    throw new ServiceError("Failed to fetch student course takens");
  }
};

// API function to perform system eligibility checks for students
export const performSystemEligibilityChecksApi = async (
  studentUserIds: string[]
): Promise<{ success: boolean }> => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    console.log(
      "🔍 [SecretaryApiDebug] Performing eligibility checks for students:",
      studentUserIds
    );

    // Perform eligibility checks using the correct endpoint
    const response = await fetch(
      `${apiBaseUrl}/GraduationProcesses/PerformSystemEligibilityChecks`,
      {
        ...fetchOptions,
        method: "POST",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          studentUserIds, // Pass the array of student IDs
        }),
      }
    );

    await handleApiResponse<any>(response);
    console.log(
      `✅ [SecretaryApiDebug] Eligibility check completed for students: ${studentUserIds.join(
        ", "
      )}`
    );

    // Clear the eligibility cache to force refresh
    clearEligibilityCache();

    return { success: true };
  } catch (error) {
    console.error("Failed to perform eligibility checks:", error);
    throw new ServiceError("Failed to perform eligibility checks");
  }
};

// API function to get eligibility check results for a student
export const getStudentEligibilityResultsApi = async (
  studentUserId: string
): Promise<EligibilityCheckResult[]> => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    const cachedEligibility = getCachedData<CachedEligibilityData>(
      ELIGIBILITY_CACHE_KEY
    );
    if (
      cachedEligibility &&
      isCacheValid(cachedEligibility.timestamp) &&
      cachedEligibility.results[studentUserId]
    ) {
      return cachedEligibility.results[studentUserId];
    }
    const maxPageSize = 2147483647;
    const url = `${apiBaseUrl}/EligibilityCheckResults/student/${studentUserId}?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`;
    console.log(
      "🔍 [SecretaryApiDebug] Fetching eligibility results from:",
      url
    );

    const response = await fetch(url, {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await handleApiResponse<{
      items: any[]; // Backend'den gelen ham data
      index: number;
      size: number;
      count: number;
      pages: number;
      hasPrevious: boolean;
      hasNext: boolean;
    }>(response);

    console.log(
      `🔍 [SecretaryApiDebug] Raw EligibilityCheckResults for student ${studentUserId}: ${data.items.length} items`
    );

    // Gelen veriyi EligibilityCheckResult tipine map et
    const results: EligibilityCheckResult[] = (data.items || []).map(
      (item: any) => ({
        id: item.id,
        studentUserId: studentUserId, // studentUserId backend'den gelmiyorsa, parametreden al
        processId: item.processId,
        checkType: item.checkType as EligibilityCheckType,
        isMet: item.isMet,
        actualValue: item.actualValue,
        requiredValue: item.requiredValue,
        notesOrMissingItems: item.notesOrMissingItems,
        checkDate: item.checkDate,
      })
    );

    console.log(
      `🔍 [SecretaryApiDebug] Mapped EligibilityCheckResults for student ${studentUserId}: ${results.length} items`
    );

    const currentCache = getCachedData<CachedEligibilityData>(
      ELIGIBILITY_CACHE_KEY
    ) || {
      results: {},
      timestamp: Date.now(),
    };
    currentCache.results[studentUserId] = results;
    currentCache.timestamp = Date.now();
    setCachedData(ELIGIBILITY_CACHE_KEY, currentCache);

    return results;
  } catch (error) {
    console.error("Failed to fetch eligibility results:", error);
    throw new ServiceError("Failed to fetch student eligibility results");
  }
};

// API function to get all students with their eligibility status
export const getStudentsWithEligibilityStatusApi = async (): Promise<
  Student[]
> => {
  try {
    console.log(
      "🔍 [SecretaryApiDebug] Fetching students with eligibility status"
    );
    const students = await getStudentsApi();
    console.log(
      `🔍 [SecretaryApiDebug] Found ${students.length} students in department`
    );

    const studentsWithEligibility = await Promise.all(
      students.map(async (student) => {
        try {
          const eligibilityResults = await getStudentEligibilityResultsApi(
            student.id
          );

          // Group results by checkType and get the latest result for each type
          const latestResults = new Map<number, EligibilityCheckResult>();
          eligibilityResults.forEach((result) => {
            const existing = latestResults.get(result.checkType);
            if (
              !existing ||
              new Date(result.checkDate) > new Date(existing.checkDate)
            ) {
              latestResults.set(result.checkType, result);
            }
          });

          const latestResultsArray = Array.from(latestResults.values());

          // Debug log to check duplicate handling
          if (eligibilityResults.length !== latestResultsArray.length) {
            console.log(
              `🔍 [SecretaryApiDebug] Duplicate handling for student ${student.id}: ${eligibilityResults.length} -> ${latestResultsArray.length} results`
            );
          }
          const hasResults = latestResultsArray.length > 0;
          const isEligible =
            hasResults && latestResultsArray.every((result) => result.isMet);
          const lastCheckDate =
            latestResultsArray.length > 0
              ? latestResultsArray.reduce((latest, current) =>
                  new Date(current.checkDate) > new Date(latest.checkDate)
                    ? current
                    : latest
                ).checkDate
              : undefined;

          const eligibilityStatus: StudentEligibilityStatus = {
            studentId: student.id,
            hasResults,
            isEligible,
            eligibilityChecks: latestResultsArray,
            lastCheckDate,
          };

          return {
            ...student,
            eligibilityStatus,
          };
        } catch (error) {
          console.warn(
            `Failed to get eligibility status for student ${student.id}:`,
            error
          );
          return {
            ...student,
            eligibilityStatus: {
              studentId: student.id,
              hasResults: false,
              isEligible: false,
              eligibilityChecks: [],
            },
          };
        }
      })
    );

    console.log(
      "✅ [SecretaryApiDebug] Students with eligibility status fetched successfully"
    );
    return studentsWithEligibility;
  } catch (error) {
    console.error(
      "❌ [SecretaryApiDebug] Failed to fetch students with eligibility status:",
      error
    );
    throw new ServiceError("Failed to fetch students with eligibility status");
  }
};

// Function to perform eligibility checks for students who don't have results
export const performEligibilityChecksForMissingStudentsApi = async (): Promise<{
  success: boolean;
  processedStudents: string[];
  studentsWithoutResults: string[];
}> => {
  try {
    console.log(
      "🔍 [SecretaryApiDebug] Starting eligibility checks for students without results"
    );
    const studentsWithStatus = await getStudentsWithEligibilityStatusApi();
    console.log(
      `🔍 [SecretaryApiDebug] Found ${studentsWithStatus.length} total students`
    );

    const studentsWithoutResults = studentsWithStatus
      .filter((student) => !student.eligibilityStatus?.hasResults) // eligibilityStatus objesindeki hasResults'a bak
      .map((student) => student.id);

    console.log(
      `🔍 [SecretaryApiDebug] Found ${studentsWithoutResults.length} students without results (hasResults: false)`
    );

    if (studentsWithoutResults.length === 0) {
      console.log(
        "ℹ️ [SecretaryApiDebug] All students already have eligibility check results."
      );
      return {
        success: true,
        processedStudents: [],
        studentsWithoutResults: [],
      };
    }

    await performSystemEligibilityChecksApi(studentsWithoutResults);

    return {
      success: true,
      processedStudents: studentsWithoutResults,
      studentsWithoutResults,
    };
  } catch (error) {
    console.error(
      "Failed to perform eligibility checks for missing students:",
      error
    );
    throw new ServiceError(
      "Failed to perform eligibility checks for missing students"
    );
  }
};

// API function to perform eligibility checks for all students
export const performEligibilityChecksForAllStudentsApi = async (): Promise<{
  success: boolean;
  processedStudents: string[];
}> => {
  try {
    const allStudents = await getStudentsApi();
    const allStudentIds = allStudents.map((student) => student.id);

    console.log(
      "🔍 [SecretaryApiDebug] Performing eligibility checks for ALL department students:",
      allStudentIds.length
    );

    // performSystemEligibilityChecksApi zaten cache temizliyor.
    await performSystemEligibilityChecksApi(allStudentIds);

    return {
      success: true,
      processedStudents: allStudentIds,
    };
  } catch (error) {
    console.error(
      "Failed to perform eligibility checks for all students:",
      error
    );
    throw new ServiceError(
      "Failed to perform eligibility checks for all students"
    );
  }
};

// Clear eligibility cache
export const clearEligibilityCache = (): void => {
  localStorage.removeItem(ELIGIBILITY_CACHE_KEY);
  // localStorage.removeItem(STUDENTS_CACHE_KEY); // Student listesi genellikle daha stabil, bunu silmeyebiliriz
  console.log("🔍 [SecretaryApiDebug] Eligibility cache cleared");
};

// Clear all caches (including students cache)
export const clearAllCaches = (): void => {
  localStorage.removeItem(ELIGIBILITY_CACHE_KEY);
  localStorage.removeItem(STUDENTS_CACHE_KEY);
  localStorage.removeItem(SECRETARY_CACHE_KEY);
  console.log("🔍 [SecretaryApiDebug] All caches cleared");
};

// API function to approve students by secretary
export const setSecretaryApprovedApi = async (
  studentUserIds: string[],
  secretaryUserId: string
): Promise<{ success: boolean }> => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    console.log("🔍 [SecretaryApiDebug] Approving students:", {
      studentUserIds,
      secretaryUserId,
      endpoint: "/api/GraduationProcesses/SetDeptSecretaryApproved",
    });

    const response = await fetch(
      `${apiBaseUrl}/GraduationProcesses/SetDeptSecretaryApproved`,
      {
        ...fetchOptions,
        method: "POST",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          studentUserIds,
          deptSecretaryUserId: secretaryUserId,
        }),
      }
    );

    await handleApiResponse<any>(response);

    console.log("✅ [SecretaryApiDebug] Students approved successfully");

    // Clear caches to force refresh
    clearAllCaches();

    return { success: true };
  } catch (error) {
    console.error("❌ [SecretaryApiDebug] Failed to approve students:", error);
    throw new ServiceError("Failed to approve students");
  }
};

// API function to reject students by secretary
export const setSecretaryRejectedApi = async (
  studentUserIds: string[],
  secretaryUserId: string,
  rejectionReason?: string
): Promise<{ success: boolean }> => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    console.log("🔍 [SecretaryApiDebug] Rejecting students:", {
      studentUserIds,
      secretaryUserId,
      rejectionReason,
      endpoint: "/api/GraduationProcesses/SetDeptSecretaryRejected",
    });

    const response = await fetch(
      `${apiBaseUrl}/GraduationProcesses/SetDeptSecretaryRejected`,
      {
        ...fetchOptions,
        method: "POST",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          studentUserIds,
          deptSecretaryUserId: secretaryUserId,
          notes: rejectionReason || "",
        }),
      }
    );

    await handleApiResponse<any>(response);

    console.log("✅ [SecretaryApiDebug] Students rejected successfully");

    // Clear caches to force refresh
    clearAllCaches();

    return { success: true };
  } catch (error) {
    console.error("❌ [SecretaryApiDebug] Failed to reject students:", error);
    throw new ServiceError("Failed to reject students");
  }
};
