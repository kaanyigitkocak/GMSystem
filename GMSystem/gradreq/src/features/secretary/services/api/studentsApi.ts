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
      return cachedStudents.students;
    }

    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    // Get secretary data (cached or fresh)
    const secretaryData = await getSecretaryData();

    // Get all students from the department using the Students endpoint
    const maxPageSize = 2147483647; // Integer.MAX_VALUE
    const response = await fetch(
      `${apiBaseUrl}/Students?departmentId=${secretaryData.departmentId}&PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
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

    // Map all students in the department (not filtered by advisor)
    const allStudents = data.items.map((item) => ({
      id: item.id || item.studentId || item.studentNumber,
      name: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
      department: item.departmentName || secretaryData.departmentName,
      gpa: item.currentGpa ? item.currentGpa.toFixed(2) : "N/A",
      status: mapStudentStatus(item.graduationStatus),
      email: item.email || "",
      phone: item.phoneNumber || item.phone || "",
      lastMeeting: item.lastMeetingDate || "",
      studentNumber: item.studentNumber || item.id,
      ectsCompleted: item.currentEctsCompleted || 0,
      enrollDate: item.enrollDate || "",
      graduationStatus: item.graduationStatus || 0,
    }));

    // Cache the students data
    const studentsToCache: CachedStudentsData = {
      students: allStudents,
      timestamp: Date.now(),
    };
    setCachedData(STUDENTS_CACHE_KEY, studentsToCache);

    return allStudents;
  } catch (error) {
    console.error("Failed to fetch students:", error);
    throw new ServiceError("Failed to fetch students");
  }
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
