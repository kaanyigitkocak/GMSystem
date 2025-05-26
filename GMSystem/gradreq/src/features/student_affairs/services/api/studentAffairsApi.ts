import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
  Student,
  CertificateType,
  GraduationDecision,
  EligibilityCheckResponse,
  EligibilityCheckResult,
} from "../types";
import {
  getServiceConfig,
  handleApiResponse,
  ServiceError,
} from "../utils/serviceUtils";
import {
  executeWithRateLimit,
  executeWithRetry,
} from "../../../common/utils/rateLimitUtils";

// Notification services
export const getNotificationsApi = async (): Promise<Notification[]> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const maxPageSize = 2147483647; // Integer.MAX_VALUE
      const response = await fetch(
        `${apiBaseUrl}/Notifications?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
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

      const notifications = data?.items || [];

      // Transform backend notification data to frontend format
      return notifications.map((notification: any) => ({
        id: notification.id,
        title: notification.title || "Notification",
        message: notification.message || "",
        type: notification.type || "info",
        read: notification.isRead || false,
        date:
          notification.createdDate ||
          notification.date ||
          new Date().toISOString(),
      }));
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    // Return empty array instead of throwing error to prevent dashboard crash
    return [];
  }
};

export const markNotificationAsReadApi = async (_id: string): Promise<void> => {
  throw new Error("Not implemented");
};

// Graduation requests service
export const getGraduationRequestsApi = async (): Promise<
  GraduationRequest[]
> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const maxPageSize = 2147483647; // Integer.MAX_VALUE
      const response = await fetch(
        `${apiBaseUrl}/GraduationRequests?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
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

      const graduationRequests = data?.items || [];

      // Transform backend data to frontend format
      return graduationRequests.map((request: any) => ({
        id: request.id,
        studentId: request.studentId || request.id,
        studentName: request.studentName || "Unknown Student",
        department: request.departmentName || "Unknown Department",
        faculty: request.facultyName || "Unknown Faculty",
        requestType: request.requestType || "Graduation",
        date: request.createdDate || new Date().toISOString(),
        status: request.status || "Pending",
        documents: request.documents || [],
        notes: request.notes || "",
      }));
    });
  } catch (error) {
    console.error("Error fetching graduation requests:", error);
    // Return empty array instead of throwing error to prevent dashboard crash
    return [];
  }
};

// Student rankings service
export const getStudentRankingsApi = async (
  _department: string
): Promise<StudentRanking[]> => {
  throw new Error("Not implemented");
};

export const updateStudentRankingApi = async (
  _student: StudentRanking
): Promise<StudentRanking> => {
  throw new Error("Not implemented");
};

// Transcript services
export const getTranscriptsApi = async (): Promise<TranscriptData[]> => {
  throw new Error("Not implemented");
};

export const deleteTranscriptApi = async (_id: string): Promise<boolean> => {
  throw new Error("Not implemented");
};

export const processTranscriptApi = async (
  _id: string
): Promise<TranscriptData> => {
  throw new Error("Not implemented");
};

// Certificate services
export const getCertificateTypesApi = async (): Promise<CertificateType[]> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const maxPageSize = 2147483647; // Integer.MAX_VALUE
      const response = await fetch(
        `${apiBaseUrl}/CertificateTypes?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
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

      const certificateTypes = data?.items || [];

      // Transform backend data to frontend format
      return certificateTypes.map((cert: any) => ({
        id: cert.id,
        name: cert.name || "Unknown Certificate",
        description: cert.description || "",
        requirements: cert.requirements || [],
        isActive: cert.isActive !== false,
      }));
    });
  } catch (error) {
    console.error("Error fetching certificate types:", error);
    // Return empty array instead of throwing error to prevent dashboard crash
    return [];
  }
};

// Student services
export const getStudentsApi = async (): Promise<Student[]> => {
  try {
    const { apiBaseUrl, fetchOptions } = getServiceConfig();
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    const maxPageSize = 2147483647; // Integer.MAX_VALUE

    // Fetch students with retry logic
    const studentsResponse = await executeWithRetry(async () => {
      const response = await fetch(
        `${apiBaseUrl}/Students?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
        {
          ...fetchOptions,
          method: "GET",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return handleApiResponse<{
        items: any[];
        index: number;
        size: number;
        count: number;
        pages: number;
        hasPrevious: boolean;
        hasNext: boolean;
      }>(response);
    });

    const students = studentsResponse?.items || [];
    console.log(
      `[StudentAffairsAPI] Fetched ${students.length} students, now fetching eligibility data with rate limiting...`
    );

    // Transform backend data to frontend format
    const transformedStudents: Student[] = students.map((student: any) => ({
      id: student.id,
      name:
        student.name ||
        `${student.firstName || ""} ${student.lastName || ""}`.trim(),
      studentId: student.studentNumber || student.id,
      department: student.departmentName || student.department || "",
      faculty: student.facultyName || student.faculty || "",
      gpa: parseFloat(student.currentGpa || student.gpa) || 0,
      graduationStatus: "Pending",
      certificateStatus: [],
      eligibilityResults: [],
      isEligible: false,
      activeGraduationProcessStatus: student.activeGraduationProcessStatus,
    }));

    // Fetch eligibility check results for all students with rate limiting
    const eligibilityResults = await executeWithRateLimit(
      transformedStudents,
      async (student: Student) => {
        const eligibilityData = await getEligibilityCheckResultsApi(student.id);
        return { studentId: student.id, eligibilityResults: eligibilityData };
      },
      {
        batchSize: 15, // Reduced batch size for better stability
        delayBetweenBatches: 1200, // Slightly increased delay
        maxRetries: 3,
        retryDelay: 2000,
      }
    );

    // Apply eligibility results to students
    const studentsWithEligibility = transformedStudents.map((student) => {
      const eligibilityResult = eligibilityResults.find(
        (result: any) =>
          result.success && result.result?.studentId === student.id
      );

      if (eligibilityResult?.result) {
        const eligibilityData = eligibilityResult.result.eligibilityResults;
        student.eligibilityResults = eligibilityData;

        // Determine if student is eligible (all checks must be met)
        student.isEligible =
          eligibilityData.length > 0 &&
          eligibilityData.every(
            (result: EligibilityCheckResult) => result.isMet
          );

        // Update graduation status based on eligibility
        if (eligibilityData.length > 0) {
          student.graduationStatus = student.isEligible
            ? "Eligible"
            : "Not Eligible";
        }
      } else {
        // Log failed eligibility checks
        const failedResult = eligibilityResults.find(
          (result: any) => !result.success && result.item.id === student.id
        );
        if (failedResult) {
          console.warn(
            `Failed to fetch eligibility for student ${student.id}:`,
            failedResult.error
          );
        }

        student.eligibilityResults = [];
        student.isEligible = false;
        student.graduationStatus = "Unknown";
      }

      return student;
    });

    const successfulEligibilityChecks = eligibilityResults.filter(
      (r: any) => r.success
    ).length;
    const failedEligibilityChecks = eligibilityResults.filter(
      (r: any) => !r.success
    ).length;

    console.log(
      `[StudentAffairsAPI] Eligibility checks completed: ${successfulEligibilityChecks} successful, ${failedEligibilityChecks} failed`
    );

    return studentsWithEligibility;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw new ServiceError("Failed to fetch students data");
  }
};

export const getStudentByIdApi = async (
  _id: string
): Promise<Student | undefined> => {
  throw new Error("Not implemented");
};

export const updateCertificateStatusApi = async (
  _studentId: string,
  _certificateId: string,
  _status: string,
  _issueDate: string | null
): Promise<Student | undefined> => {
  throw new Error("Not implemented");
};

// Graduation decisions services
export const getGraduationDecisionsApi = async (): Promise<
  GraduationDecision[]
> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const maxPageSize = 2147483647; // Integer.MAX_VALUE
      const response = await fetch(
        `${apiBaseUrl}/GraduationProcesses?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`,
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

      const graduationProcesses = data?.items || [];

      // Transform graduation processes to graduation decisions format
      return graduationProcesses.map((process: any) => ({
        id: process.id,
        meetingDate: process.createdDate || new Date().toISOString(),
        decisionNumber: `GD-${process.id.substring(0, 8)}`,
        faculty: process.facultyName || "Unknown Faculty",
        department: process.departmentName || "Unknown Department",
        academicYear: new Date().getFullYear().toString(),
        semester: "Spring", // Default value
        students: [
          {
            id: process.studentId || process.id,
            name: process.studentName || "Unknown Student",
            studentId: process.studentNumber || process.studentId,
            status: process.status || "Pending",
          },
        ],
      }));
    });
  } catch (error) {
    console.error("Error fetching graduation decisions:", error);
    // Return empty array instead of throwing error to prevent dashboard crash
    return [];
  }
};

// Eligibility check services
export const getEligibilityCheckResultsApi = async (
  studentId: string
): Promise<EligibilityCheckResult[]> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const response = await fetch(
        `${apiBaseUrl}/EligibilityCheckResults/student/${studentId}?PageIndex=0&PageSize=10`,
        {
          ...fetchOptions,
          method: "GET",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await handleApiResponse<EligibilityCheckResponse>(response);
      return data?.items || [];
    });
  } catch (error) {
    console.error(
      `Error fetching eligibility results for student ${studentId}:`,
      error
    );
    // Return empty array instead of throwing error to prevent dashboard crash
    return [];
  }
};

// Student Affairs approval/rejection services
export const setStudentAffairsApprovedApi = async (
  studentUserIds: string[],
  studentAffairsUserId: string
): Promise<void> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const response = await fetch(
        `${apiBaseUrl}/GraduationProcesses/SetStudentAffairsApproved`,
        {
          ...fetchOptions,
          method: "POST",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentUserIds,
            studentAffairsUserId,
          }),
        }
      );

      await handleApiResponse(response);
    });
  } catch (error) {
    console.error("Error approving students:", error);
    throw new ServiceError("Failed to approve students");
  }
};

export const setStudentAffairsRejectedApi = async (
  studentUserIds: string[],
  studentAffairsUserId: string,
  rejectionReason: string
): Promise<void> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const response = await fetch(
        `${apiBaseUrl}/GraduationProcesses/SetStudentAffairsRejected`,
        {
          ...fetchOptions,
          method: "POST",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentUserIds,
            studentAffairsUserId,
            rejectionReason,
          }),
        }
      );

      await handleApiResponse(response);
    });
  } catch (error) {
    console.error("Error rejecting students:", error);
    throw new ServiceError("Failed to reject students");
  }
};

// Get current user info for Student Affairs
export const getStudentAffairsUserInfoApi = async (): Promise<{
  userId: string;
  name: string;
  email: string;
}> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const response = await fetch(`${apiBaseUrl}/Users/GetFromAuth`, {
        ...fetchOptions,
        method: "GET",
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await handleApiResponse<any>(response);
      return {
        userId: data.id,
        name: data.name || `${data.firstName} ${data.lastName}`,
        email: data.email,
      };
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new ServiceError("Failed to fetch user information");
  }
};

// Start graduation process for all students
export const startGraduationProcessApi = async (
  academicTerm: string
): Promise<void> => {
  try {
    return await executeWithRetry(async () => {
      const { apiBaseUrl, fetchOptions } = getServiceConfig();
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      // Get current user ID from auth
      const { getUserFromAuthApi } = await import("./usersApi");
      const currentUser = await getUserFromAuthApi();

      const requestBody = {
        academicTerm: academicTerm,
        initiatedByUserId: currentUser.id,
      };

      const response = await fetch(
        `${apiBaseUrl}/GraduationProcesses/StartForAllStudents`,
        {
          ...fetchOptions,
          method: "POST",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      await handleApiResponse<void>(response);
    });
  } catch (error) {
    console.error("Error starting graduation process:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(
      "Failed to start graduation process. Please try again."
    );
  }
};
