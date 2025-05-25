import type {
  Student,
  EligibilityCheckResult,
  StudentEligibilityStatus,
  EligibilityCheckType,
  CourseTaken,
} from "../types"; // Assuming types are correctly re-exported in deansoffice/services/types

// TODO: Determine if serviceUtils should be shared or deansoffice-specific.
// For now, assuming we might need to create/adapt utils for deansoffice.
// If a shared core/utils exists, that would be better.
// Let's tentatively import from a path that would make sense if we copied/adapted it.
import {
  getServiceConfig,
  handleApiResponse,
  ServiceError,
} from "../utils/serviceUtils";

// Cache keys for Dean's Office data
const DEANS_OFFICE_FACULTY_INFO_KEY = "deans_office_faculty_info";
const DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX = "deans_office_students_faculty_"; // Appended with facultyId
const DEANS_OFFICE_ELIGIBILITY_CACHE_KEY_PREFIX =
  "deans_office_eligibility_faculty_"; // Appended with facultyId
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Faculty info from logged-in user
interface FacultyInfo {
  facultyId: string;
  facultyName?: string;
  deanId?: string;
  timestamp: number;
}

interface CachedStudentsData {
  students: Student[];
  timestamp: number;
}

interface CachedEligibilityData {
  results: Record<string, EligibilityCheckResult[]>; // studentId -> results array
  timestamp: number;
}

const getCachedData = <T>(key: string): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn(
      `[DeansOfficeAPI] Failed to parse cached data for key ${key}:`,
      error
    );
  }
  return null;
};

const setCachedData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn(
      `[DeansOfficeAPI] Failed to cache data for key ${key}:`,
      error
    );
  }
};

const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Helper to map backend student status to frontend status (example, adjust as needed)
const mapStudentStatus = (graduationStatus: any): Student["status"] => {
  // This mapping needs to be confirmed with actual backend enum/values
  if (graduationStatus === undefined || graduationStatus === null)
    return "Normal Öğrenim";
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
      return "Mezun"; // Assuming 9 is Mezun
    case 10:
      return "Ayrıldı"; // Assuming 10 is Ayrıldı
    default:
      return "Normal Öğrenim";
  }
};

// Get dean's faculty info from GetFromAuth endpoint
export const getDeanFacultyInfo = async (): Promise<FacultyInfo> => {
  // Check cache first
  const cached = getCachedData<FacultyInfo>(DEANS_OFFICE_FACULTY_INFO_KEY);
  if (cached && isCacheValid(cached.timestamp)) {
    console.log(
      `[DeansOfficeAPI] Using cached faculty info: ${cached.facultyId}`
    );
    return cached;
  }

  const { apiBaseUrl, fetchOptions } = getServiceConfig();
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new ServiceError("No authentication token found");
  }

  try {
    // Call GetFromAuth endpoint to get current user details
    const response = await fetch(`${apiBaseUrl}/Users/GetFromAuth`, {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });

    const userData = await handleApiResponse<any>(response);
    console.log(`[DeansOfficeAPI] User data from GetFromAuth:`, userData);

    // Check if the user has a faculty ID
    if (!userData.facultyId) {
      console.error(
        "[DeansOfficeAPI] Current user does not have a facultyId:",
        userData
      );
      throw new ServiceError(
        "Current user does not have a faculty ID. Dean's Office functionality requires a faculty assignment."
      );
    }

    // Create faculty info from user data
    const facultyInfo: FacultyInfo = {
      facultyId: userData.facultyId,
      facultyName: userData.facultyName,
      deanId: userData.id,
      timestamp: Date.now(),
    };

    // Cache the faculty info
    setCachedData(DEANS_OFFICE_FACULTY_INFO_KEY, facultyInfo);
    console.log(
      `[DeansOfficeAPI] Cached faculty info for dean: ${facultyInfo.facultyId}`
    );

    return facultyInfo;
  } catch (error: any) {
    console.error(
      "[DeansOfficeAPI] Failed to get faculty info from auth:",
      error
    );
    if (error instanceof ServiceError) throw error;
    throw new ServiceError(`Failed to get faculty info: ${error.message}`);
  }
};

const getStudentEligibilityResultsForDeanApi = async (
  studentId: string,
  facultyId: string, // facultyId for targeted caching
  authToken: string,
  apiBaseUrl: string,
  fetchOptions: RequestInit
): Promise<EligibilityCheckResult[]> => {
  const cacheKey = `${DEANS_OFFICE_ELIGIBILITY_CACHE_KEY_PREFIX}${facultyId}_student_${studentId}`;
  const cached = getCachedData<EligibilityCheckResult[]>(cacheKey);
  if (cached && isCacheValid(Date.now())) {
    // Decided against individual student eligibility caching for now to simplify, will rely on faculty student list cache.
  }

  const maxPageSize = 2147483647; // Integer.MAX_VALUE
  const response = await fetch(
    `${apiBaseUrl}/EligibilityCheckResults/student/${studentId}?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
    {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const data = await handleApiResponse<{ items: any[] }>(response);
  const results: EligibilityCheckResult[] = (data.items || []).map(
    (item: any) => ({
      id: item.id?.toString(),
      processId: item.processId?.toString(),
      checkType: item.checkType as EligibilityCheckType, // Direct mapping from the backend enum
      isMet: item.isMet,
      actualValue: item.actualValue?.toString(),
      requiredValue: item.requiredValue?.toString(),
      notesOrMissingItems: item.notesOrMissingItems,
      checkDate: item.checkDate,
      studentUserId: studentId, // Ensure this is part of the type, or add if needed
    })
  );

  return results;
};

// Main function to get all students in the faculty with their eligibility status
export const getFacultyStudentsWithEligibilityApi = async (
  facultyId?: string // Optional parameter now - if not provided, we'll get it from auth
): Promise<Student[]> => {
  let actualFacultyId = facultyId;

  if (!actualFacultyId) {
    // If facultyId is not explicitly provided, get it from the authenticated user
    console.log(
      `[DeansOfficeAPI] No faculty ID provided, getting from authenticated user...`
    );
    const facultyInfo = await getDeanFacultyInfo();
    actualFacultyId = facultyInfo.facultyId;
    console.log(
      `[DeansOfficeAPI] Using faculty ID from auth: ${actualFacultyId}`
    );
  }

  if (!actualFacultyId) {
    throw new ServiceError(
      "Faculty ID is required and could not be determined from user authentication."
    );
  }

  console.log(
    `[DeansOfficeAPI] Fetching students with eligibility for faculty: ${actualFacultyId}`
  );

  const studentCacheKey = `${DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX}${actualFacultyId}`;
  const cachedStudentsData = getCachedData<CachedStudentsData>(studentCacheKey);
  if (cachedStudentsData && isCacheValid(cachedStudentsData.timestamp)) {
    console.log(
      `[DeansOfficeAPI] Returning cached student list for faculty ${actualFacultyId}`
    );
    return cachedStudentsData.students;
  }

  const { apiBaseUrl, fetchOptions } = getServiceConfig();
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new ServiceError("No authentication token found");
  }

  try {
    const maxPageSize = 2147483647; // Integer.MAX_VALUE for "get all"
    const studentsResponse = await fetch(
      `${apiBaseUrl}/Students?facultyId=${actualFacultyId}&PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
      {
        ...fetchOptions,
        method: "GET",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const studentsData = await handleApiResponse<{ items: any[] }>(
      studentsResponse
    );
    const studentListFromApi = studentsData.items || [];

    if (!Array.isArray(studentListFromApi)) {
      console.error(
        "[DeansOfficeAPI] Student list from API is not an array:",
        studentListFromApi
      );
      throw new ServiceError("Received invalid student list from server.");
    }

    console.log(
      `[DeansOfficeAPI] Retrieved ${studentListFromApi.length} students for faculty ${actualFacultyId}`
    );

    const studentsWithEligibility: Student[] = await Promise.all(
      studentListFromApi.map(async (studentDto: any) => {
        try {
          // Get eligibility check results for this student
          const eligibilityChecks =
            await getStudentEligibilityResultsForDeanApi(
              studentDto.id.toString(),
              actualFacultyId,
              authToken,
              apiBaseUrl,
              fetchOptions
            );

          // Group and get latest check result for each check type
          // This handles cases where there are multiple checks of the same type with different dates
          const latestResults = new Map<number, EligibilityCheckResult>();
          eligibilityChecks.forEach((result) => {
            const existing = latestResults.get(result.checkType);
            if (
              !existing ||
              new Date(result.checkDate) > new Date(existing.checkDate)
            ) {
              latestResults.set(result.checkType, result);
            }
          });
          const latestResultsArray = Array.from(latestResults.values());

          // Determine overall eligibility status
          const hasResults = latestResultsArray.length > 0;
          const isEligible =
            hasResults && latestResultsArray.every((check) => check.isMet);

          // Get the date of the most recent check
          const lastCheckDate = hasResults
            ? latestResultsArray.reduce((latest, current) =>
                new Date(current.checkDate) > new Date(latest.checkDate)
                  ? current
                  : latest
              ).checkDate
            : undefined;

          // Construct eligibility status object
          const eligibilityStatus: StudentEligibilityStatus = {
            studentId: studentDto.id.toString(),
            hasResults,
            isEligible,
            eligibilityChecks: latestResultsArray,
            lastCheckDate,
          };

          // Map and return the complete student object with eligibility
          return {
            id: studentDto.id.toString(),
            name:
              `${studentDto.firstName || ""} ${
                studentDto.lastName || ""
              }`.trim() ||
              studentDto.name ||
              "N/A",
            department:
              studentDto.department?.name || studentDto.departmentName || "N/A",
            gpa:
              studentDto.currentGpa?.toFixed(2) ||
              studentDto.gpa?.toString() ||
              "N/A",
            status: mapStudentStatus(
              studentDto.graduationStatus || studentDto.status
            ),
            email: studentDto.email,
            studentNumber: studentDto.studentNo || studentDto.studentNumber,
            ectsCompleted:
              studentDto.currentEctsCompleted || studentDto.ectsCompleted,
            enrollDate: studentDto.enrollDate,
            graduationStatus: studentDto.graduationStatus,
            eligibilityStatus,
          };
        } catch (error: any) {
          console.error(
            `[DeansOfficeAPI] Failed to fetch or process eligibility for student ${studentDto.id}:`,
            error.message
          );
          // Return student without eligibility data if there was an error
          return {
            id: studentDto.id.toString(),
            name:
              `${studentDto.firstName || ""} ${
                studentDto.lastName || ""
              }`.trim() ||
              studentDto.name ||
              "N/A",
            department:
              studentDto.department?.name || studentDto.departmentName || "N/A",
            gpa:
              studentDto.currentGpa?.toFixed(2) ||
              studentDto.gpa?.toString() ||
              "N/A",
            status: mapStudentStatus(
              studentDto.graduationStatus || studentDto.status
            ),
            email: studentDto.email,
            studentNumber: studentDto.studentNo || studentDto.studentNumber,
            ectsCompleted:
              studentDto.currentEctsCompleted || studentDto.ectsCompleted,
            enrollDate: studentDto.enrollDate,
            graduationStatus: studentDto.graduationStatus,
            eligibilityStatus: {
              studentId: studentDto.id.toString(),
              hasResults: false,
              isEligible: false,
              eligibilityChecks: [],
            },
          };
        }
      })
    );

    // Cache the results
    setCachedData(studentCacheKey, {
      students: studentsWithEligibility,
      timestamp: Date.now(),
    });

    // Log some statistics about eligibility
    const eligibleCount = studentsWithEligibility.filter(
      (s) => s.eligibilityStatus?.isEligible
    ).length;
    const notEligibleCount = studentsWithEligibility.filter(
      (s) => s.eligibilityStatus?.hasResults && !s.eligibilityStatus.isEligible
    ).length;
    const pendingCount = studentsWithEligibility.filter(
      (s) => !s.eligibilityStatus?.hasResults
    ).length;

    console.log(
      `[DeansOfficeAPI] Faculty ${actualFacultyId} eligibility summary: ${studentsWithEligibility.length} total, ${eligibleCount} eligible, ${notEligibleCount} not eligible, ${pendingCount} pending`
    );

    return studentsWithEligibility;
  } catch (error: any) {
    console.error(
      `[DeansOfficeAPI] Failed to fetch faculty students or their eligibility:`,
      error.message
    );
    if (error instanceof ServiceError) throw error;
    throw new ServiceError(
      `Failed to fetch data for faculty ${actualFacultyId}: ${error.message}`
    );
  }
};

export const performFacultyEligibilityChecksForMissingStudentsApi = async (
  facultyId?: string // Optional parameter - if not provided, we'll get it from auth
): Promise<{
  success: boolean;
  processedStudents: string[];
  studentsWithoutResults: string[];
}> => {
  let actualFacultyId = facultyId;

  if (!actualFacultyId) {
    // If facultyId is not explicitly provided, get it from the authenticated user
    console.log(
      `[DeansOfficeAPI] No faculty ID provided for eligibility checks, getting from authenticated user...`
    );
    const facultyInfo = await getDeanFacultyInfo();
    actualFacultyId = facultyInfo.facultyId;
    console.log(
      `[DeansOfficeAPI] Using faculty ID from auth for eligibility checks: ${actualFacultyId}`
    );
  }

  if (!actualFacultyId) {
    throw new ServiceError(
      "Faculty ID is required for eligibility checks and could not be determined from user authentication."
    );
  }

  console.log(
    `[DeansOfficeAPI] Performing eligibility checks for missing students in faculty: ${actualFacultyId}`
  );

  const { apiBaseUrl, fetchOptions } = getServiceConfig();
  const authToken = localStorage.getItem("authToken");
  if (!authToken) throw new ServiceError("No authentication token found");

  // 1. Fetch all students for the faculty (uses caching internally if data is fresh)
  const allStudentsInFaculty = await getFacultyStudentsWithEligibilityApi(
    actualFacultyId
  );

  // 2. Identify students who are missing eligibility results
  const studentsMissingResults = allStudentsInFaculty
    .filter((student) => !student.eligibilityStatus?.hasResults)
    .map((student) => student.id);

  if (studentsMissingResults.length === 0) {
    console.log(
      `[DeansOfficeAPI] All students in faculty ${actualFacultyId} already have eligibility check results.`
    );
    return { success: true, processedStudents: [], studentsWithoutResults: [] };
  }

  console.log(
    `[DeansOfficeAPI] Found ${studentsMissingResults.length} students in faculty ${actualFacultyId} missing eligibility results. Performing checks...`
  );

  try {
    // 3. Call the backend to perform checks for these students
    const response = await fetch(
      `${apiBaseUrl}/GraduationProcesses/PerformSystemEligibilityChecks`,
      {
        ...fetchOptions,
        method: "POST",
        headers: {
          ...fetchOptions.headers,
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ studentUserIds: studentsMissingResults }),
      }
    );

    await handleApiResponse<any>(response);

    // Clear relevant caches after successful operation
    localStorage.removeItem(
      `${DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX}${actualFacultyId}`
    );

    console.log(
      `[DeansOfficeAPI] Eligibility checks successfully initiated for ${studentsMissingResults.length} students in faculty ${actualFacultyId}.`
    );
    return {
      success: true,
      processedStudents: studentsMissingResults,
      studentsWithoutResults: studentsMissingResults,
    };
  } catch (error: any) {
    console.error(
      `[DeansOfficeAPI] Failed to perform eligibility checks for faculty ${actualFacultyId}:`,
      error.message
    );
    if (error instanceof ServiceError) throw error;
    throw new ServiceError(
      `Failed to perform eligibility checks: ${error.message}`
    );
  }
};

export const clearDeansOfficeEligibilityCache = async (
  facultyId?: string // Optional parameter - if not provided, we'll get it from auth
): Promise<void> => {
  let actualFacultyId = facultyId;

  if (!actualFacultyId) {
    // If facultyId is not explicitly provided, get it from the authenticated user
    try {
      const facultyInfo = await getDeanFacultyInfo();
      actualFacultyId = facultyInfo.facultyId;
      console.log(
        `[DeansOfficeAPI] Using faculty ID from auth for cache clearing: ${actualFacultyId}`
      );
    } catch (error) {
      console.warn(
        "[DeansOfficeAPI] Could not determine faculty ID from auth for cache clearing:",
        error
      );
      // We'll still clear the general faculty info cache even if we couldn't get the specific faculty ID
    }
  }

  console.log(
    `[DeansOfficeAPI] Clearing eligibility cache for faculty: ${
      actualFacultyId || "ALL"
    }`
  );

  // Clear faculty info cache
  localStorage.removeItem(DEANS_OFFICE_FACULTY_INFO_KEY);

  // If a specific faculty was identified, clear that faculty's student cache
  if (actualFacultyId) {
    localStorage.removeItem(
      `${DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX}${actualFacultyId}`
    );
  } else {
    // Otherwise try to clear all faculty caches by scanning localStorage for matching keys
    // This is a fallback that tries to clear any faculty-related cache
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith(DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX) ||
        key.startsWith(DEANS_OFFICE_ELIGIBILITY_CACHE_KEY_PREFIX)
      ) {
        localStorage.removeItem(key);
      }
    });
  }

  return Promise.resolve();
};

// API function to get student course takens (transcript)
export const getStudentCourseTakensApi = async (
  studentId: string
): Promise<CourseTaken[]> => {
  try {
    // Get service configuration
    const { apiBaseUrl, fetchOptions } = getServiceConfig();

    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    console.log(
      `🔍 [DeansOfficeApi] Fetching course takens for student: ${studentId}`
    );

    const response = await fetch(
      `${apiBaseUrl}/CourseTakens?studentId=${studentId}&PageRequest.PageIndex=0&PageRequest.PageSize=2147483647`,
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
      `🔍 [DeansOfficeApi] Received ${data.items.length} course takens for student ${studentId}`
    );

    // Map the course takens data
    const courseTakens: CourseTaken[] = data.items.map((item) => ({
      id: item.id,
      studentUserId: item.studentUserId || item.studentId,
      courseCodeInTranscript:
        item.courseCodeInTranscript || item.courseCode || "N/A",
      courseNameInTranscript:
        item.courseNameInTranscript || item.courseName || "N/A",
      matchedCourseId: item.matchedCourseId || item.courseId || "",
      creditsEarned: item.creditsEarned || 0,
      grade: item.grade || "N/A",
      isSuccessfullyCompleted: item.isSuccessfullyCompleted || false,
      semesterTaken: item.semesterTaken || "N/A",
    }));

    return courseTakens;
  } catch (error) {
    console.error(
      `❌ [DeansOfficeApi] Failed to fetch course takens for student ${studentId}:`,
      error
    );
    throw new ServiceError("Failed to fetch student course takens");
  }
};

// New function to get student transcript by student ID
export const getStudentTranscriptByIdApi = async (
  studentId: string
): Promise<CourseTaken[]> => {
  const config = getServiceConfig(); // Ensure this returns the correct type with apiBaseUrl
  if (!config || !config.apiBaseUrl) {
    throw new ServiceError(
      "Service configuration is not available. User might not be logged in or endpoint is missing.",
      500 // Using a generic server error status code
    );
  }

  const { apiBaseUrl } = config; // Use apiBaseUrl from the config
  const token = localStorage.getItem("authToken"); // Corrected token key

  if (!token) {
    throw new ServiceError("Authentication token not found.", 401); // Unauthorized status
  }

  try {
    // Add pagination parameters to get all courses
    const maxPageSize = 2147483647; // Integer.MAX_VALUE
    const response = await fetch(
      `${apiBaseUrl}/CourseTakens/by-student/${studentId}?PageIndex=0&PageSize=${maxPageSize}`, // Added pagination parameters
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // The API returns a paginated response, so we need to extract the items
    const data = await handleApiResponse<{
      items: CourseTaken[];
      index: number;
      size: number;
      count: number;
      pages: number;
      hasPrevious: boolean;
      hasNext: boolean;
    }>(response);

    // Return the items array from the paginated response
    return data?.items || [];
  } catch (error) {
    console.error(
      `[DeansOfficeAPI] Error fetching transcript for student ${studentId}:`,
      error
    );
    if (error instanceof ServiceError) {
      throw error; // Re-throw if it's already a ServiceError (e.g., from handleApiResponse)
    }
    // For other types of errors (e.g., network issues before fetch completes)
    throw new ServiceError(
      `Failed to fetch transcript for student ${studentId}.`,
      503 // Service Unavailable or a generic network error code
    );
  }
};

// Get all students for the dean\\'s faculty
export const getStudentsForDeanFaculty = async (
  facultyId?: string // Optional parameter - if not provided, we'll get it from auth
): Promise<Student[]> => {
  let actualFacultyId = facultyId;

  if (!actualFacultyId) {
    // If facultyId is not explicitly provided, get it from the authenticated user
    console.log(
      `[DeansOfficeAPI] No faculty ID provided, getting from authenticated user...`
    );
    const facultyInfo = await getDeanFacultyInfo();
    actualFacultyId = facultyInfo.facultyId;
    console.log(
      `[DeansOfficeAPI] Using faculty ID from auth: ${actualFacultyId}`
    );
  }

  if (!actualFacultyId) {
    throw new ServiceError(
      "Faculty ID is required and could not be determined from user authentication."
    );
  }

  console.log(
    `[DeansOfficeAPI] Fetching students with eligibility for faculty: ${actualFacultyId}`
  );

  const studentCacheKey = `${DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX}${actualFacultyId}`;
  const cachedStudentsData = getCachedData<CachedStudentsData>(studentCacheKey);
  if (cachedStudentsData && isCacheValid(cachedStudentsData.timestamp)) {
    console.log(
      `[DeansOfficeAPI] Returning cached student list for faculty ${actualFacultyId}`
    );
    return cachedStudentsData.students;
  }

  const { apiBaseUrl, fetchOptions } = getServiceConfig();
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new ServiceError("No authentication token found");
  }

  try {
    const maxPageSize = 2147483647; // Integer.MAX_VALUE for "get all"
    const studentsResponse = await fetch(
      `${apiBaseUrl}/Students?facultyId=${actualFacultyId}&PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
      {
        ...fetchOptions,
        method: "GET",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const studentsData = await handleApiResponse<{ items: any[] }>(
      studentsResponse
    );
    const studentListFromApi = studentsData.items || [];

    if (!Array.isArray(studentListFromApi)) {
      console.error(
        "[DeansOfficeAPI] Student list from API is not an array:",
        studentListFromApi
      );
      throw new ServiceError("Received invalid student list from server.");
    }

    console.log(
      `[DeansOfficeAPI] Retrieved ${studentListFromApi.length} students for faculty ${actualFacultyId}`
    );

    const studentsWithEligibility: Student[] = await Promise.all(
      studentListFromApi.map(async (studentDto: any) => {
        try {
          // Get eligibility check results for this student
          const eligibilityChecks =
            await getStudentEligibilityResultsForDeanApi(
              studentDto.id.toString(),
              actualFacultyId,
              authToken,
              apiBaseUrl,
              fetchOptions
            );

          // Group and get latest check result for each check type
          // This handles cases where there are multiple checks of the same type with different dates
          const latestResults = new Map<number, EligibilityCheckResult>();
          eligibilityChecks.forEach((result) => {
            const existing = latestResults.get(result.checkType);
            if (
              !existing ||
              new Date(result.checkDate) > new Date(existing.checkDate)
            ) {
              latestResults.set(result.checkType, result);
            }
          });
          const latestResultsArray = Array.from(latestResults.values());

          // Determine overall eligibility status
          const hasResults = latestResultsArray.length > 0;
          const isEligible =
            hasResults && latestResultsArray.every((check) => check.isMet);

          // Get the date of the most recent check
          const lastCheckDate = hasResults
            ? latestResultsArray.reduce((latest, current) =>
                new Date(current.checkDate) > new Date(latest.checkDate)
                  ? current
                  : latest
              ).checkDate
            : undefined;

          // Construct eligibility status object
          const eligibilityStatus: StudentEligibilityStatus = {
            studentId: studentDto.id.toString(),
            hasResults,
            isEligible,
            eligibilityChecks: latestResultsArray,
            lastCheckDate,
          };

          // Map and return the complete student object with eligibility
          return {
            id: studentDto.id.toString(),
            name:
              `${studentDto.firstName || ""} ${
                studentDto.lastName || ""
              }`.trim() ||
              studentDto.name ||
              "N/A",
            department:
              studentDto.department?.name || studentDto.departmentName || "N/A",
            gpa:
              studentDto.currentGpa?.toFixed(2) ||
              studentDto.gpa?.toString() ||
              "N/A",
            status: mapStudentStatus(
              studentDto.graduationStatus || studentDto.status
            ),
            email: studentDto.email,
            studentNumber: studentDto.studentNo || studentDto.studentNumber,
            ectsCompleted:
              studentDto.currentEctsCompleted || studentDto.ectsCompleted,
            enrollDate: studentDto.enrollDate,
            graduationStatus: studentDto.graduationStatus,
            eligibilityStatus,
          };
        } catch (error: any) {
          console.error(
            `[DeansOfficeAPI] Failed to fetch or process eligibility for student ${studentDto.id}:`,
            error.message
          );
          // Return student without eligibility data if there was an error
          return {
            id: studentDto.id.toString(),
            name:
              `${studentDto.firstName || ""} ${
                studentDto.lastName || ""
              }`.trim() ||
              studentDto.name ||
              "N/A",
            department:
              studentDto.department?.name || studentDto.departmentName || "N/A",
            gpa:
              studentDto.currentGpa?.toFixed(2) ||
              studentDto.gpa?.toString() ||
              "N/A",
            status: mapStudentStatus(
              studentDto.graduationStatus || studentDto.status
            ),
            email: studentDto.email,
            studentNumber: studentDto.studentNo || studentDto.studentNumber,
            ectsCompleted:
              studentDto.currentEctsCompleted || studentDto.ectsCompleted,
            enrollDate: studentDto.enrollDate,
            graduationStatus: studentDto.graduationStatus,
            eligibilityStatus: {
              studentId: studentDto.id.toString(),
              hasResults: false,
              isEligible: false,
              eligibilityChecks: [],
            },
          };
        }
      })
    );

    // Cache the results
    setCachedData(studentCacheKey, {
      students: studentsWithEligibility,
      timestamp: Date.now(),
    });

    // Log some statistics about eligibility
    const eligibleCount = studentsWithEligibility.filter(
      (s) => s.eligibilityStatus?.isEligible
    ).length;
    const notEligibleCount = studentsWithEligibility.filter(
      (s) => s.eligibilityStatus?.hasResults && !s.eligibilityStatus.isEligible
    ).length;
    const pendingCount = studentsWithEligibility.filter(
      (s) => !s.eligibilityStatus?.hasResults
    ).length;

    console.log(
      `[DeansOfficeAPI] Faculty ${actualFacultyId} eligibility summary: ${studentsWithEligibility.length} total, ${eligibleCount} eligible, ${notEligibleCount} not eligible, ${pendingCount} pending`
    );

    return studentsWithEligibility;
  } catch (error: any) {
    console.error(
      `[DeansOfficeAPI] Failed to fetch faculty students or their eligibility:`,
      error.message
    );
    if (error instanceof ServiceError) throw error;
    throw new ServiceError(
      `Failed to fetch data for faculty ${actualFacultyId}: ${error.message}`
    );
  }
};
