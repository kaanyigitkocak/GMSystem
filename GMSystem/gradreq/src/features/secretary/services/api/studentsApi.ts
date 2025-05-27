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

// Set data to cache in localStorage with quota management
const setCachedData = <T>(key: string, data: T): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.warn(
        "🚨 [Cache] localStorage quota exceeded, clearing old cache data..."
      );

      // Clear old cache entries to make space
      try {
        // Clear eligibility cache first (usually the largest)
        localStorage.removeItem(ELIGIBILITY_CACHE_KEY);
        console.log("🧹 [Cache] Cleared eligibility cache");

        // Try again after clearing
        localStorage.setItem(key, JSON.stringify(data));
        console.log("✅ [Cache] Successfully cached data after cleanup");
      } catch (retryError) {
        console.warn(
          "🚨 [Cache] Still failed after cleanup, clearing all secretary caches..."
        );

        // If still failing, clear all secretary-related caches
        clearAllCaches();

        // Final attempt with minimal data
        try {
          localStorage.setItem(key, JSON.stringify(data));
          console.log("✅ [Cache] Successfully cached data after full cleanup");
        } catch (finalError) {
          console.error(
            "❌ [Cache] Failed to cache data even after full cleanup:",
            finalError
          );
        }
      }
    } else {
      console.warn("Failed to cache data:", error);
    }
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

    // Optimized: Get students with departmentId parameter in single request
    const studentsListUrl = `${apiBaseUrl}/Students?PageIndex=0&PageSize=100&departmentId=${departmentId}`;
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

    // Transform the response data directly (optimized - no individual API calls needed)
    const transformedStudents: Student[] = data.items.map(
      (studentData: any) => {
        console.log(
          `🔍 [SecretaryApiDebug] Processing student ${studentData.firstName} ${studentData.lastName} (ID: ${studentData.id}):`,
          studentData
        );

        // Create graduation process object from the response data
        const graduationProcess = studentData.activeGraduationProcessId
          ? {
              id: studentData.activeGraduationProcessId,
              status: studentData.activeGraduationProcessStatus,
              academicTerm: studentData.activeGraduationProcessAcademicTerm,
              creationDate: studentData.activeGraduationProcessInitiationDate,
              lastUpdateDate: studentData.activeGraduationProcessLastUpdateDate,
            }
          : undefined;

        return {
          id: studentData.id,
          studentNumber: studentData.studentNumber,
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          name: `${studentData.firstName || ""} ${
            studentData.lastName || ""
          }`.trim(),
          email: studentData.email,
          departmentId: studentData.departmentId,
          departmentName:
            studentData.departmentName || secretaryData.departmentName,
          department:
            studentData.departmentName || secretaryData.departmentName,
          facultyId: studentData.facultyId || "",
          facultyName: studentData.facultyName || "",
          programName: studentData.programName || "",
          enrollDate: studentData.enrollDate || "",
          currentGpa: studentData.currentGpa || 0,
          gpa: studentData.currentGpa || 0,
          currentEctsCompleted: studentData.currentEctsCompleted || 0,
          graduationStatus: studentData.graduationStatus || 0,
          status: mapStudentStatus(studentData.graduationStatus),
          assignedAdvisorUserId: studentData.assignedAdvisorUserId || null,
          activeGraduationProcessId:
            studentData.activeGraduationProcessId || null,
          activeGraduationProcessStatus:
            studentData.activeGraduationProcessStatus || null,
          activeGraduationProcessAcademicTerm:
            studentData.activeGraduationProcessAcademicTerm || null,
          activeGraduationProcessInitiationDate:
            studentData.activeGraduationProcessInitiationDate || null,
          activeGraduationProcessLastUpdateDate:
            studentData.activeGraduationProcessLastUpdateDate || null,
          graduationProcess: graduationProcess,
          phone: studentData.phoneNumber || studentData.phone || "",
          lastMeeting: studentData.lastMeetingDate || "",
        };
      }
    );

    // Cache the students data
    const studentsToCache: CachedStudentsData = {
      students: transformedStudents,
      timestamp: Date.now(),
    };
    setCachedData(STUDENTS_CACHE_KEY, studentsToCache);

    console.log(
      "✅ [SecretaryApiDebug] Successfully fetched and processed students data."
    );
    return transformedStudents;
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

// Helper function to fetch the raw list of graduation processes

// Helper function to map students with their corresponding graduation processes

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

    // Cache management: limit cache size to prevent quota exceeded errors
    const currentCache = getCachedData<CachedEligibilityData>(
      ELIGIBILITY_CACHE_KEY
    ) || {
      results: {},
      timestamp: Date.now(),
    };

    // If cache is getting too large, clear old entries
    const cacheKeys = Object.keys(currentCache.results);
    const MAX_CACHE_ENTRIES = 50; // Limit to 50 students to prevent quota issues

    if (cacheKeys.length >= MAX_CACHE_ENTRIES) {
      console.log(
        `🧹 [Cache] Cache has ${cacheKeys.length} entries, clearing to prevent quota issues`
      );
      // Keep only the most recent 25 entries
      const sortedKeys = cacheKeys.sort();
      const keysToRemove = sortedKeys.slice(0, cacheKeys.length - 25);
      keysToRemove.forEach((key) => delete currentCache.results[key]);
    }

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
  console.log("🧹 [SecretaryApiDebug] Eligibility cache cleared");
};

// Clear all caches (including students cache)
export const clearAllCaches = (): void => {
  try {
    localStorage.removeItem(ELIGIBILITY_CACHE_KEY);
    localStorage.removeItem(STUDENTS_CACHE_KEY);
    localStorage.removeItem(SECRETARY_CACHE_KEY);
    console.log("🧹 [SecretaryApiDebug] All secretary caches cleared");
  } catch (error) {
    console.warn("Failed to clear some caches:", error);
  }
};

// Function to check and clean localStorage if it's getting full
export const cleanupLocalStorageIfNeeded = (): void => {
  try {
    // Test if localStorage is near quota
    const testKey = "quota_test";
    const testData = "x".repeat(1024 * 100); // 100KB test

    try {
      localStorage.setItem(testKey, testData);
      localStorage.removeItem(testKey);
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        console.warn(
          "🚨 [Cache] localStorage quota nearly exceeded, performing cleanup..."
        );

        // Clear all secretary-related caches
        clearAllCaches();

        // Also clear any other large cache entries that might exist
        Object.keys(localStorage).forEach((key) => {
          if (
            key.includes("eligibility") ||
            key.includes("students") ||
            key.includes("cache")
          ) {
            try {
              localStorage.removeItem(key);
            } catch (e) {
              console.warn(`Failed to remove cache key ${key}:`, e);
            }
          }
        });

        console.log("✅ [Cache] localStorage cleanup completed");
      }
    }
  } catch (error) {
    console.warn("Failed to check localStorage quota:", error);
  }
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
