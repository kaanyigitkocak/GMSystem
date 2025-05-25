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

// Import rate limiting utilities
import {
  executeWithRateLimit,
  DEFAULT_RATE_LIMIT_CONFIG,
} from "../../../common/utils/rateLimitUtils";

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
  console.log(
    "[DeansOfficeAPI] Attempting to fetch students with eligibility for faculty:",
    facultyId
  );
  const finalFacultyId = facultyId ?? (await getDeanFacultyInfo()).facultyId;
  const cacheKey = `${DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX}${finalFacultyId}_with_eligibility`;

  const cached = getCachedData<CachedStudentsData>(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    console.log(
      `[DeansOfficeAPI] Using cached student list with eligibility for faculty ${finalFacultyId}`
    );
    console.log(`[DeansOfficeAPI] Sample cached student:`, cached.students[0]);
    return cached.students;
  }

  console.log(
    `[DeansOfficeAPI] Cache miss or invalid, fetching fresh data for faculty ${finalFacultyId}`
  );

  const { apiBaseUrl, fetchOptions } = getServiceConfig();
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new ServiceError("No authentication token found");
  }

  try {
    // Fetch all students for the faculty using the paginated endpoint
    // This endpoint already returns graduation process information
    let allStudents: Student[] = [];
    let pageIndex = 0;
    let hasNextPage = true;
    const pageSize = 2000; // Fetch in larger chunks to get all students

    console.log(
      `[DeansOfficeAPI] Fetching all students for faculty ${finalFacultyId} with graduation process info`
    );

    // Get the complete list of students for the faculty with graduation process info
    while (hasNextPage) {
      const response = await fetch(
        `${apiBaseUrl}/Students?facultyId=${finalFacultyId}&PageIndex=${pageIndex}&PageSize=${pageSize}`,
        {
          ...fetchOptions,
          method: "GET",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const paginatedData = await handleApiResponse<{
        items: any[];
        hasNextPage: boolean;
      }>(response);

      if (paginatedData && paginatedData.items) {
        // Transform the API response to match our Student interface
        const transformedStudents = paginatedData.items.map(
          (apiStudent: any) => {
            // Debug: Log first student's data to verify graduation process info
            if (
              pageIndex === 0 &&
              paginatedData.items.indexOf(apiStudent) === 0
            ) {
              console.log(
                "🔍 [DeansOfficeAPI] Sample student data from GetList API:",
                apiStudent
              );
              console.log(
                "🔍 [DeansOfficeAPI] activeGraduationProcessStatus:",
                apiStudent.activeGraduationProcessStatus
              );
            }

            return {
              id: apiStudent.id,
              studentNumber: apiStudent.studentNumber,
              firstName: apiStudent.firstName,
              lastName: apiStudent.lastName,
              name: `${apiStudent.firstName} ${apiStudent.lastName}`,
              email: apiStudent.email,
              departmentId: apiStudent.departmentId,
              departmentName: apiStudent.departmentName,
              department: apiStudent.departmentName,
              facultyId: apiStudent.facultyId,
              facultyName: apiStudent.facultyName,
              programName: apiStudent.programName,
              enrollDate: apiStudent.enrollDate,
              currentGpa: apiStudent.currentGpa,
              gpa: apiStudent.currentGpa,
              currentEctsCompleted: apiStudent.currentEctsCompleted,
              graduationStatus: apiStudent.graduationStatus,
              status: apiStudent.graduationStatus?.toString() || "Unknown",
              assignedAdvisorUserId: apiStudent.assignedAdvisorUserId,
              activeGraduationProcessId: apiStudent.activeGraduationProcessId,
              activeGraduationProcessStatus:
                apiStudent.activeGraduationProcessStatus,
              activeGraduationProcessAcademicTerm:
                apiStudent.activeGraduationProcessAcademicTerm,
              activeGraduationProcessInitiationDate:
                apiStudent.activeGraduationProcessInitiationDate,
              activeGraduationProcessLastUpdateDate:
                apiStudent.activeGraduationProcessLastUpdateDate,
            } as Student;
          }
        );

        // Debug: Log first transformed student
        if (pageIndex === 0 && transformedStudents.length > 0) {
          console.log(
            "🔍 [DeansOfficeAPI] Sample transformed student:",
            transformedStudents[0]
          );
          console.log(
            "🔍 [DeansOfficeAPI] Transformed activeGraduationProcessStatus:",
            transformedStudents[0].activeGraduationProcessStatus
          );
        }

        allStudents = allStudents.concat(transformedStudents);
        hasNextPage = paginatedData.hasNextPage;
        pageIndex++;
      } else {
        hasNextPage = false; // Stop if no items or unexpected structure
      }
    }

    console.log(
      `[DeansOfficeAPI] Fetched ${allStudents.length} students for faculty ${finalFacultyId} with graduation process info. Now fetching eligibility.`
    );

    if (allStudents.length === 0) {
      setCachedData(cacheKey, { students: [], timestamp: Date.now() });
      return [];
    }

    // Then, fetch eligibility for each student (or adapt if there's a bulk endpoint)
    // This part assumes getStudentEligibilityResultsForDeanApi exists and works correctly.
    // The rate limiting here is crucial.
    const resultsFromRateLimit: Array<{
      item: Student;
      result?: Student;
      error?: any;
      success: boolean;
    }> = await executeWithRateLimit(
      allStudents,
      async (student: Student): Promise<Student> => {
        // Changed: requestFn now processes a single student
        try {
          const eligibilityChecks =
            await getStudentEligibilityResultsForDeanApi(
              student.id,
              finalFacultyId,
              authToken,
              apiBaseUrl,
              fetchOptions
            );
          const isEligible =
            eligibilityChecks.length > 0 &&
            eligibilityChecks.every((check) => check.isMet);

          const eligibilityStatus: StudentEligibilityStatus = {
            studentId: student.id,
            hasResults: eligibilityChecks.length > 0,
            isEligible: isEligible,
            eligibilityChecks: eligibilityChecks,
            lastCheckDate:
              eligibilityChecks.length > 0
                ? new Date().toISOString()
                : undefined,
          };

          return {
            ...student,
            eligibilityStatus,
          };
        } catch (error) {
          console.error(
            `[DeansOfficeAPI] Failed to get eligibility for student ${student.id}:`,
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
      },
      DEFAULT_RATE_LIMIT_CONFIG
    );

    // Map results from executeWithRateLimit to Student[]
    const studentsWithEligibility: Student[] = resultsFromRateLimit.map(
      (res) => {
        if (res.success && res.result) {
          return res.result; // This is already a Student object with updated eligibilityStatus
        }
        // If not successful or no result, return the original item with potentially default/error eligibilityStatus
        // The error case is already handled inside the requestFn to return a Student object
        return res.item;
      }
    );

    console.log(
      `[DeansOfficeAPI] Processed eligibility for ${studentsWithEligibility.length} students.`
    );

    // Debug: Log final result before caching
    if (studentsWithEligibility.length > 0) {
      console.log(
        "🔍 [DeansOfficeAPI] Sample final student before caching:",
        studentsWithEligibility[0]
      );
      console.log(
        "🔍 [DeansOfficeAPI] Final activeGraduationProcessStatus:",
        studentsWithEligibility[0].activeGraduationProcessStatus
      );
    }

    setCachedData(cacheKey, {
      students: studentsWithEligibility,
      timestamp: Date.now(),
    });
    return studentsWithEligibility;
  } catch (error: any) {
    console.error(
      `[DeansOfficeAPI] Error in getFacultyStudentsWithEligibilityApi for faculty ${finalFacultyId}:`,
      error
    );
    if (error instanceof ServiceError) throw error;
    throw new ServiceError(
      `Failed to fetch students with eligibility: ${error.message}`
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

  // Clear all cache keys related to this faculty
  if (actualFacultyId) {
    localStorage.removeItem(
      `${DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX}${actualFacultyId}`
    );
    localStorage.removeItem(
      `${DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX}${actualFacultyId}_with_eligibility`
    );
    localStorage.removeItem(
      `${DEANS_OFFICE_ELIGIBILITY_CACHE_KEY_PREFIX}${actualFacultyId}`
    );
  } else {
    // Otherwise try to clear all faculty caches by scanning localStorage for matching keys
    // This is a fallback that tries to clear any faculty-related cache
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith(DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX) ||
        key.startsWith(DEANS_OFFICE_ELIGIBILITY_CACHE_KEY_PREFIX) ||
        key === DEANS_OFFICE_FACULTY_INFO_KEY
      ) {
        console.log(`[DeansOfficeAPI] Removing cache key: ${key}`);
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

// Refactor getStudentTranscriptByIdApi to use fetch pattern
export const getStudentTranscriptByIdApi = async (
  studentId: string
): Promise<{
  items: CourseTaken[];
  count: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}> => {
  const { apiBaseUrl, fetchOptions } = getServiceConfig();
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    console.error("[API] No auth token found for getStudentTranscriptByIdApi");
    throw new ServiceError("Authentication token not found.");
  }

  // Assuming the endpoint is paginated as per typical API design
  // Using default PageIndex=0 and a large PageSize to get all records, adjust if needed
  const pageIndex = 0;
  const pageSize = 2000; // Or a more appropriate large number to get all transcripts

  try {
    console.log(
      `[API] Fetching transcript for student ${studentId} with pagination. Page: ${pageIndex}, Size: ${pageSize}`
    );
    const response = await fetch(
      `${apiBaseUrl}/Students/${studentId}/transcript?PageIndex=${pageIndex}&PageSize=${pageSize}`,
      {
        ...fetchOptions,
        method: "GET",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    // Expecting a paginated response similar to other new endpoints
    const data = await handleApiResponse<{
      items: CourseTaken[];
      count: number;
      pageIndex: number;
      pageSize: number;
      totalPages: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    }>(response);

    if (data && data.items) {
      console.log(
        `[API] Successfully fetched transcript for student ${studentId}. Count: ${data.count}`
      );
      return data;
    } else {
      console.warn(
        `[API] No items found in transcript response for student ${studentId} or unexpected format. Data:`,
        data
      );
      return {
        items: [],
        count: 0,
        pageIndex,
        pageSize,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      };
    }
  } catch (error: any) {
    console.error(
      `[API] Failed to fetch transcript for student ${studentId}:`,
      error
    );
    // Return a default paginated structure on error
    return {
      items: [],
      count: 0,
      pageIndex,
      pageSize,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  }
};

// Update function getStudentsForDeanFaculty (if it maps to old Student type)
export const getStudentsForDeanFaculty = async (
  facultyId?: string
): Promise<Student[]> => {
  console.log(
    "[DeansOfficeAPI] Attempting to fetch students for dean faculty:",
    facultyId
  );
  const finalFacultyId = facultyId ?? (await getDeanFacultyInfo()).facultyId;
  const cacheKey = `${DEANS_OFFICE_STUDENTS_CACHE_KEY_PREFIX}${finalFacultyId}`;

  const cached = getCachedData<CachedStudentsData>(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    console.log(
      `[DeansOfficeAPI] Using cached student list for faculty ${finalFacultyId}`
    );
    return cached.students;
  }

  const { apiBaseUrl, fetchOptions } = getServiceConfig();
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new ServiceError("No authentication token found");
  }

  try {
    // This function should also use the new paginated GET /api/Students endpoint
    let allStudents: Student[] = [];
    let pageIndex = 0;
    let hasNextPage = true;
    const pageSize = 2000; // Fetch in larger chunks to get all students

    console.log(
      `[DeansOfficeAPI] Fetching all students for faculty ${finalFacultyId} (getStudentsForDeanFaculty)`
    );

    // First, get basic student list
    let basicStudents: any[] = [];
    while (hasNextPage) {
      const response = await fetch(
        `${apiBaseUrl}/Students?facultyId=${finalFacultyId}&PageIndex=${pageIndex}&PageSize=${pageSize}`,
        {
          ...fetchOptions,
          method: "GET",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const paginatedData = await handleApiResponse<{
        items: any[];
        hasNextPage: boolean;
      }>(response);

      if (paginatedData && paginatedData.items) {
        basicStudents = basicStudents.concat(paginatedData.items);
        hasNextPage = paginatedData.hasNextPage;
        pageIndex++;
      } else {
        hasNextPage = false;
      }
    }

    console.log(
      `[DeansOfficeAPI] Fetched ${basicStudents.length} basic student records. Now fetching detailed data...`
    );

    // Now fetch detailed data for each student to get graduation process information
    const detailedStudents = await Promise.all(
      basicStudents.map(async (basicStudent) => {
        try {
          const studentResponse = await fetch(
            `${apiBaseUrl}/Students/${basicStudent.id}`,
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
          return studentDetailData;
        } catch (error) {
          console.error(
            `[DeansOfficeAPI] Failed to fetch detailed data for student ${basicStudent.id}:`,
            error
          );
          return basicStudent;
        }
      })
    );

    allStudents = detailedStudents;

    console.log(
      `[DeansOfficeAPI] Fetched ${allStudents.length} students for faculty ${finalFacultyId}.`
    );

    // The fetched students should already conform to the new Student type.
    // No manual mapping of fields like 'name' to 'firstName'/'lastName' should be needed if the API returns the new structure.

    setCachedData(cacheKey, { students: allStudents, timestamp: Date.now() });
    return allStudents;
  } catch (error: any) {
    console.error(
      `[DeansOfficeAPI] Error in getStudentsForDeanFaculty for faculty ${finalFacultyId}:`,
      error
    );
    if (error instanceof ServiceError) throw error;
    throw new ServiceError(
      `Failed to fetch students for dean faculty: ${error.message}`
    );
  }
};

// Refactor the new getStudentsForFacultyApi to use fetch
export const getStudentsForFacultyApi = async (
  facultyId: string,
  pageIndex: number = 0,
  pageSize: number = 2000
): Promise<{
  items: Student[];
  count: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}> => {
  const { apiBaseUrl, fetchOptions } = getServiceConfig(); // Use established pattern
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    console.error("[API] No auth token found for getStudentsForFacultyApi");
    // Consider throwing a ServiceError or returning a specific error structure
    // For now, returning a default paginated response to avoid breaking the caller
    return {
      items: [],
      count: 0,
      pageIndex,
      pageSize,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  }

  try {
    console.log(
      `[API] Fetching students for faculty ${facultyId}. Page: ${pageIndex}, Size: ${pageSize}`
    );
    const response = await fetch(
      `${apiBaseUrl}/Students?facultyId=${facultyId}&PageIndex=${pageIndex}&PageSize=${pageSize}`,
      {
        ...fetchOptions,
        method: "GET",
        headers: {
          ...fetchOptions.headers, // Spread existing headers
          Authorization: `Bearer ${authToken}`, // Add Authorization header
        },
      }
    );

    // Assuming handleApiResponse is set up to parse the JSON and handle errors
    // And that the API returns the specified paginated structure including 'items'
    const data = await handleApiResponse<{
      items: Student[];
      count: number;
      pageIndex: number;
      pageSize: number;
      totalPages: number;
      hasPreviousPage: boolean;
      hasNextPage: boolean;
    }>(response);

    if (data && data.items) {
      console.log(
        `[API] Successfully fetched students for faculty ${facultyId}. Count: ${data.count}`
      );
      return data;
    } else {
      // This case might be hit if handleApiResponse returns null/undefined on error,
      // or if the data.items is missing.
      console.warn(
        `[API] No items found in response for faculty ${facultyId} or unexpected format. Data:`,
        data
      );
      return {
        items: [],
        count: 0,
        pageIndex,
        pageSize,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      };
    }
  } catch (error) {
    console.error(
      `[API] Error fetching students for faculty ${facultyId}:`,
      error
    );
    // Return a default paginated structure on error
    return {
      items: [],
      count: 0,
      pageIndex,
      pageSize,
      totalPages: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    };
  }
};

// API function to approve students by dean's office
export const setDeansOfficeApprovedApi = async (
  studentUserIds: string[],
  deansOfficeUserId: string
): Promise<{ success: boolean }> => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    console.log("🔍 [DeansOfficeApiDebug] Approving students:", {
      studentUserIds,
      deansOfficeUserId,
      endpoint: "/api/GraduationProcesses/SetDeansOfficeApproved",
    });

    const { apiBaseUrl, fetchOptions } = getServiceConfig();

    const response = await fetch(
      `${apiBaseUrl}/GraduationProcesses/SetDeansOfficeApproved`,
      {
        ...fetchOptions,
        method: "POST",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          studentUserIds,
          deansOfficeUserId: deansOfficeUserId,
        }),
      }
    );

    await handleApiResponse<any>(response);

    console.log("✅ [DeansOfficeApiDebug] Students approved successfully");

    // Clear caches to force refresh
    const facultyInfo = await getDeanFacultyInfo();
    await clearDeansOfficeEligibilityCache(facultyInfo.facultyId);

    return { success: true };
  } catch (error) {
    console.error(
      "❌ [DeansOfficeApiDebug] Failed to approve students:",
      error
    );
    throw new ServiceError("Failed to approve students");
  }
};

// API function to reject students by dean's office
export const setDeansOfficeRejectedApi = async (
  studentUserIds: string[],
  deansOfficeUserId: string,
  rejectionReason?: string
): Promise<{ success: boolean }> => {
  try {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    console.log("🔍 [DeansOfficeApiDebug] Rejecting students:", {
      studentUserIds,
      deansOfficeUserId,
      rejectionReason,
      endpoint: "/api/GraduationProcesses/SetDeansOfficeRejected",
    });

    const { apiBaseUrl, fetchOptions } = getServiceConfig();

    const response = await fetch(
      `${apiBaseUrl}/GraduationProcesses/SetDeansOfficeRejected`,
      {
        ...fetchOptions,
        method: "POST",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          studentUserIds,
          deansOfficeUserId: deansOfficeUserId,
          notes: rejectionReason || "",
        }),
      }
    );

    await handleApiResponse<any>(response);

    console.log("✅ [DeansOfficeApiDebug] Students rejected successfully");

    // Clear caches to force refresh
    const facultyInfo = await getDeanFacultyInfo();
    await clearDeansOfficeEligibilityCache(facultyInfo.facultyId);

    return { success: true };
  } catch (error) {
    console.error("❌ [DeansOfficeApiDebug] Failed to reject students:", error);
    throw new ServiceError("Failed to reject students");
  }
};
