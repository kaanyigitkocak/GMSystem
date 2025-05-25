import type {
  Student,
  EligibilityCheckResult,
  StudentEligibilityStatus,
} from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import {
  executeWithRetry,
  executeWithRateLimit,
} from "../../../common/utils/rateLimitUtils";

// Get service configuration
const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Cache key for eligibility data
const ELIGIBILITY_CACHE_KEY = "advisor_eligibility_results";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

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

// API function to perform system eligibility checks for multiple students
export const performSystemEligibilityChecksApi = async (
  studentUserIds: string[]
): Promise<{ success: boolean }> => {
  return await executeWithRetry(async () => {
    try {
      console.log(
        "🔍 [EligibilityApiDebug] Performing eligibility checks for students:",
        studentUserIds
      );

      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const response = await fetch(
        `${apiBaseUrl}/GraduationProcesses/PerformSystemEligibilityChecks`,
        {
          ...fetchOptions,
          method: "POST",
          headers: {
            ...(fetchOptions.headers as Record<string, string>),
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            studentUserIds,
          }),
        }
      );

      console.log(
        "🔍 [EligibilityApiDebug] PerformSystemEligibilityChecks response status:",
        response.status
      );

      await handleApiResponse<any>(response);

      localStorage.removeItem(ELIGIBILITY_CACHE_KEY);

      console.log(
        "✅ [EligibilityApiDebug] System eligibility checks completed successfully"
      );
      return { success: true };
    } catch (error) {
      console.error(
        "❌ [EligibilityApiDebug] Failed to perform system eligibility checks:",
        error
      );
      throw new ServiceError("Failed to perform system eligibility checks");
    }
  });
};

// API function to get eligibility check results for a specific student with caching
export const getStudentEligibilityResultsApi = async (
  studentUserId: string
): Promise<EligibilityCheckResult[]> => {
  return await executeWithRetry(async () => {
    try {
      const cachedEligibility = getCachedData<CachedEligibilityData>(
        ELIGIBILITY_CACHE_KEY
      );
      if (cachedEligibility && isCacheValid(cachedEligibility.timestamp)) {
        const cachedResults = cachedEligibility.results[studentUserId];
        if (cachedResults) {
          console.log(
            "🔍 [EligibilityApiDebug] Using cached results for student:",
            studentUserId
          );
          return cachedResults;
        }
      }

      console.log(
        "🔍 [EligibilityApiDebug] Fetching eligibility results for student:",
        studentUserId
      );

      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const url = `${apiBaseUrl}/EligibilityCheckResults/student/${studentUserId}?PageIndex=0&PageSize=50`;
      console.log("🔍 [EligibilityApiDebug] Request URL:", url);

      const response = await fetch(url, {
        ...fetchOptions,
        method: "GET",
        headers: {
          ...(fetchOptions.headers as Record<string, string>),
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("🔍 [EligibilityApiDebug] Response status:", response.status);

      const data = await handleApiResponse<{
        items: EligibilityCheckResult[];
        index: number;
        size: number;
        count: number;
        pages: number;
        hasPrevious: boolean;
        hasNext: boolean;
      }>(response);

      const results = data.items || [];
      console.log(
        "🔍 [EligibilityApiDebug] Eligibility results count:",
        results.length
      );

      const currentCache = cachedEligibility || {
        results: {},
        timestamp: Date.now(),
      };
      currentCache.results[studentUserId] = results;
      currentCache.timestamp = Date.now();
      setCachedData(ELIGIBILITY_CACHE_KEY, currentCache);

      return results;
    } catch (error) {
      console.error(
        "❌ [EligibilityApiDebug] Failed to fetch eligibility results:",
        error
      );
      console.error(
        `Failed to fetch eligibility results for student ${studentUserId}:`,
        error
      );
      throw new ServiceError(
        `Failed to fetch eligibility results for student ${studentUserId}`
      );
    }
  });
};

// API function to get eligibility status for all advisor's students (NO automatic perform)
// This function depends on getStudentsApi from advisorStudentDataApi, need to handle this dependency.
// For now, assuming getStudentsApi is available or will be imported correctly.
// We might need to pass getStudentsApi as an argument or rethink the structure if this becomes complex.
export const getStudentsWithEligibilityStatusApi = async (
  getStudentsDirectly: () => Promise<Student[]> // Explicitly pass the function
): Promise<Student[]> => {
  return await executeWithRetry(async () => {
    try {
      console.log(
        "🔍 [EligibilityApiDebug] Fetching students with eligibility status (checking existing results only)"
      );

      const students = await getStudentsDirectly();

      const studentsWithEligibility = await executeWithRateLimit(
        students,
        async (student) => {
          try {
            const eligibilityResults = await getStudentEligibilityResultsApi(
              student.id
            );

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
            const eligibilityStatus: StudentEligibilityStatus = {
              studentId: student.id,
              hasResults: false,
              isEligible: false,
              eligibilityChecks: [],
            };
            return {
              ...student,
              eligibilityStatus,
              error: true, // Mark as errored to filter out if needed
            };
          }
        },
        {
          batchSize: 5,
          delayBetweenBatches: 200,
          maxRetries: 2,
          retryDelay: 500,
        } // Custom config for this part
      );

      console.log(
        "✅ [EligibilityApiDebug] Students with eligibility status fetched successfully"
      );
      return studentsWithEligibility
        .filter((s) => s.success)
        .map((s) => s.result as Student);
    } catch (error) {
      console.error(
        "❌ [EligibilityApiDebug] Failed to fetch students with eligibility status:",
        error
      );
      throw new ServiceError(
        "Failed to fetch students with eligibility status"
      );
    }
  });
};

// Function to perform eligibility checks for students who don't have results
export const performEligibilityChecksForMissingStudentsApi = async (
  getStudentsDirectly: () => Promise<Student[]> // Explicitly pass the function
): Promise<{
  success: boolean;
  processedStudents: string[];
  studentsWithoutResults: string[];
}> => {
  return await executeWithRetry(async () => {
    try {
      console.log(
        "🔍 [EligibilityApiDebug] Starting eligibility checks for students without results"
      );

      const studentsWithStatus = await getStudentsWithEligibilityStatusApi(
        getStudentsDirectly
      );

      const studentsWithoutResults = studentsWithStatus
        .filter((student) => !student.eligibilityStatus?.hasResults)
        .map((student) => student.id);

      if (studentsWithoutResults.length === 0) {
        console.log(
          "ℹ️ [EligibilityApiDebug] All students already have eligibility check results"
        );
        return {
          success: true,
          processedStudents: [],
          studentsWithoutResults: [],
        };
      }

      console.log(
        `🔍 [EligibilityApiDebug] Performing eligibility checks for ${studentsWithoutResults.length} students without results`
      );

      await performSystemEligibilityChecksApi(studentsWithoutResults);

      console.log(
        "✅ [EligibilityApiDebug] Eligibility checks completed for students without results"
      );
      return {
        success: true,
        processedStudents: studentsWithoutResults,
        studentsWithoutResults,
      };
    } catch (error) {
      console.error(
        "❌ [EligibilityApiDebug] Failed to perform eligibility checks for missing students:",
        error
      );
      throw new ServiceError(
        "Failed to perform eligibility checks for students without results"
      );
    }
  });
};

// Function to clear eligibility cache
export const clearEligibilityCache = (): void => {
  localStorage.removeItem(ELIGIBILITY_CACHE_KEY);
  console.log("🔍 [EligibilityApiDebug] Eligibility cache cleared");
};

// Function to perform eligibility checks for all students
export const performEligibilityChecksForAllStudentsApi = async (
  studentUserIds: string[]
): Promise<{ success: boolean; processedStudents: string[] }> => {
  return await executeWithRetry(async () => {
    try {
      console.log(
        "🔍 [EligibilityApiDebug] Performing eligibility checks for all students:",
        studentUserIds
      );

      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const response = await fetch(
        `${apiBaseUrl}/GraduationProcesses/PerformSystemEligibilityChecks`,
        {
          ...fetchOptions,
          method: "POST",
          headers: {
            ...(fetchOptions.headers as Record<string, string>),
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            studentUserIds,
          }),
        }
      );

      console.log(
        "🔍 [EligibilityApiDebug] PerformSystemEligibilityChecks response status:",
        response.status
      );

      await handleApiResponse<any>(response);

      localStorage.removeItem(ELIGIBILITY_CACHE_KEY);

      console.log(
        "✅ [EligibilityApiDebug] System eligibility checks completed successfully for all students"
      );
      return { success: true, processedStudents: studentUserIds };
    } catch (error) {
      console.error(
        "❌ [EligibilityApiDebug] Failed to perform system eligibility checks for all students:",
        error
      );
      throw new ServiceError(
        "Failed to perform system eligibility checks for all students"
      );
    }
  });
};
