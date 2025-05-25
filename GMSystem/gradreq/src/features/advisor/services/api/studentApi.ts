import type {
  Student,
  CourseTaken,
  EligibilityCheckResult,
  StudentEligibilityStatus,
} from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import { getUserFromAuthApi } from "./usersApi";
import { getEnvironmentConfig } from "../../../../core/utils/environment"; // Corrected import path and function name

// Get service configuration
const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Cache key for advisor data
const ADVISOR_CACHE_KEY = "advisor_data";
const STUDENTS_CACHE_KEY = "advisor_students";
const ELIGIBILITY_CACHE_KEY = "advisor_eligibility_results";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Interface for cached advisor data
interface CachedAdvisorData {
  advisorId: string;
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

// Get advisor data with caching
export const getAdvisorData = async (): Promise<CachedAdvisorData> => {
  // Check cache first
  const cached = getCachedData<CachedAdvisorData>(ADVISOR_CACHE_KEY);
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

    console.log("🔍 [AdvisorApiDebug] Current user data:", currentUser);
    console.log("🔍 [AdvisorApiDebug] User role:", currentUser.userRole);

    // Check if user is an advisor (handle both frontend and backend role naming)
    const userRole = currentUser.userRole?.toUpperCase();
    if (userRole !== "ADVISOR") {
      throw new ServiceError(`User is not an advisor. Current role: ${currentUser.userRole}`);
    }

    const advisorData: CachedAdvisorData = {
      advisorId: currentUser.id,
      departmentId: currentUser.departmentId,
      departmentName: currentUser.departmentName,
      timestamp: Date.now(),
    };

    // Cache the data
    setCachedData(ADVISOR_CACHE_KEY, advisorData);

    return advisorData;
  } catch (error) {
    console.error("Failed to get advisor data:", error);
    throw new ServiceError("Failed to get advisor information");
  }
};

// API function to get students assigned to current advisor
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

    // Get advisor data (cached or fresh)
    const advisorData = await getAdvisorData();

    // Get all students from the department using the Students endpoint
    const response = await fetch(
      `${apiBaseUrl}/Students?departmentId=${advisorData.departmentId}&PageRequest.PageIndex=0&PageRequest.PageSize=1000`,
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

    // Filter students that are assigned to this advisor and map the backend response to our frontend model
    const allStudents = data.items
      .filter((item) => item.assignedAdvisorUserId === advisorData.advisorId)
      .map((item) => ({
        id: item.id || item.studentId || item.studentNumber,
        name: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
        department: item.departmentName || advisorData.departmentName,
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
      return "Mezuniyet Aşaması";
    case 10:
      return "Mezuniyet Aşaması"; // Graduated students are still shown as graduation stage
    default:
      return "Normal Öğrenim";
  }
};

// API function to send email to student
export const sendEmailToStudentApi = async (
  studentId: string,
  subject: string,
  message: string
): Promise<{ success: boolean }> => {
  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    const response = await fetch(
      `${apiBaseUrl}/Students/${studentId}/send-email`,
      {
        ...fetchOptions,
        method: "POST",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          subject,
          message,
        }),
      }
    );

    await handleApiResponse<any>(response);
    return { success: true };
  } catch (error) {
    console.error(`Failed to send email to student ${studentId}:`, error);
    throw new ServiceError(`Failed to send email to student ${studentId}`);
  }
};

// API function to get courses taken by a specific student
export const getStudentCourseTakensApi = async (
  studentId: string
): Promise<CourseTaken[]> => {
  try {
    console.log("🔍 [CourseApiDebug] Fetching courses for student:", studentId);

    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    const maxPageSize = 10000; // Use a reasonable large number instead of MAX_SAFE_INTEGER
    const url = `${apiBaseUrl}/CourseTakens/by-student/${studentId}?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`;
    console.log("🔍 [CourseApiDebug] Request URL:", url);

    const response = await fetch(url, {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("🔍 [CourseApiDebug] Response status:", response.status);
    console.log("🔍 [CourseApiDebug] Response ok:", response.ok);

    const data = await handleApiResponse<{
      items: CourseTaken[];
    }>(response);

    console.log("🔍 [CourseApiDebug] Parsed data:", data);
    console.log("🔍 [CourseApiDebug] Items count:", data.items?.length || 0);
    console.log("🔍 [CourseApiDebug] First item:", data.items?.[0]);

    return data.items || [];
  } catch (error) {
    console.error("❌ [CourseApiDebug] Error occurred:", error);
    console.error(
      `Failed to fetch course takens for student ${studentId}:`,
      error
    );
    throw new ServiceError(
      `Failed to fetch course takens for student ${studentId}`
    );
  }
};

// API function to perform system eligibility checks for multiple students
export const performSystemEligibilityChecksApi = async (
  studentUserIds: string[]
): Promise<{ success: boolean }> => {
  try {
    console.log(
      "🔍 [EligibilityApiDebug] Performing eligibility checks for students:",
      studentUserIds
    );

    // Get auth token from localStorage
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
          ...fetchOptions.headers,
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

    // Clear eligibility cache since we just performed new checks
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
};

// API function to get eligibility check results for a specific student with caching
export const getStudentEligibilityResultsApi = async (
  studentUserId: string
): Promise<EligibilityCheckResult[]> => {
  try {
    // Check cache first
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

    // Get auth token from localStorage
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
        ...fetchOptions.headers,
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

    // Update cache
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
};

// API function to get eligibility status for all advisor's students (NO automatic perform)
export const getStudentsWithEligibilityStatusApi = async (): Promise<
  Student[]
> => {
  try {
    console.log(
      "🔍 [EligibilityApiDebug] Fetching students with eligibility status (checking existing results only)"
    );

    // First get all students
    const students = await getStudentsApi();

    // For each student, check their existing eligibility results (no automatic perform)
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
          // Return student without eligibility status if fetch fails
          const eligibilityStatus: StudentEligibilityStatus = {
            studentId: student.id,
            hasResults: false,
            isEligible: false,
            eligibilityChecks: [],
          };

          return {
            ...student,
            eligibilityStatus,
          };
        }
      })
    );

    console.log(
      "✅ [EligibilityApiDebug] Students with eligibility status fetched successfully"
    );
    return studentsWithEligibility;
  } catch (error) {
    console.error(
      "❌ [EligibilityApiDebug] Failed to fetch students with eligibility status:",
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
      "🔍 [EligibilityApiDebug] Starting eligibility checks for students without results"
    );

    // Get all students with their current eligibility status
    const studentsWithStatus = await getStudentsWithEligibilityStatusApi();

    // Find students who don't have eligibility results
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

    // Perform system eligibility checks for students without results
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
  try {
    console.log(
      "🔍 [EligibilityApiDebug] Performing eligibility checks for all students:",
      studentUserIds
    );

    // Get auth token from localStorage
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
          ...fetchOptions.headers,
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

    // Clear eligibility cache since we just performed new checks
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
};

// API function to get courses taken by a specific student
export const getStudentCourses = async (
  studentId: string
): Promise<CourseTaken[]> => {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    console.error("Authentication token not found. Please login.");
    return []; 
  }

  const maxPageSize = 10000; // Use a reasonable large number instead of MAX_SAFE_INTEGER
  const config = getEnvironmentConfig(); // Get environment configuration
  const baseUrl = config.apiBaseUrl; // Use apiBaseUrl from the config
  const fetchURL = `${baseUrl}/CourseTakens/by-student/${studentId}?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`;

  const fetchOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(fetchURL, fetchOptions);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Error fetching student courses: ${response.status} ${response.statusText}`,
        errorBody
      );
      throw new Error(
        `Failed to fetch student courses: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    const courses: CourseTaken[] = data.items || [];
    return courses;
  } catch (error) {
    console.error("Error in getStudentCourses:", error);
    throw error; 
  }
};
