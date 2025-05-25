import { getServiceConfig } from "./utils/serviceUtils";
import { getServiceConfig as getCommonServiceConfig } from "../../common/utils/serviceUtils";
import * as advisorStudentDataApiService from "./api/advisorStudentDataApi";
import * as advisorStudentCourseApiService from "./api/advisorStudentCourseApi";
import * as advisorStudentEligibilityApiService from "./api/advisorStudentEligibilityApi";
import * as studentMockService from "./mock/studentMock";
import * as petitionApiService from "./api/petitionApi";
import * as petitionMockService from "./mock/petitionMock";
import * as transcriptApiService from "./api/transcriptApi";
import * as transcriptMockService from "./mock/transcriptMock";
import * as notificationApiService from "./api/notificationsApi";
import * as notificationMockService from "./mock/notificationMock";
import { getDashboardDataMock } from "./mock/dashboardMock";
import { getDashboardDataApi } from "./api/dashboardApi";

import type {
  Student,
  PetitionData,
  PetitionResult,
  PetitionStudent,
  Course,
  StudentInfo,
  TranscriptData,
  Notification,
  CourseTaken,
} from "./types";
import type { DashboardData } from "./types/dashboard";

const { useMock } = getServiceConfig();

export const sendEmailToStudent = async (
  studentId: string,
  subject: string,
  message: string
): Promise<{ success: boolean }> => {
  if (useMock) {
    return studentMockService.sendEmailToStudentMock(
      studentId,
      subject,
      message
    );
  }
  return advisorStudentDataApiService.sendEmailToStudentApi(
    studentId,
    subject,
    message
  );
};

export const getStudentCourseTakens = async (
  studentId: string
): Promise<CourseTaken[]> => {
  // Course takens only available via API for now
  return advisorStudentCourseApiService.getStudentCoursesApi(studentId);
};

// Petition service functions
export const getStudentsForPetition = async (): Promise<PetitionStudent[]> => {
  if (useMock) {
    return petitionMockService.getStudentsForPetitionMock();
  }
  return petitionApiService.getStudentsForPetitionApi();
};

export const createPetition = async (
  petitionData: PetitionData
): Promise<PetitionResult> => {
  if (useMock) {
    return petitionMockService.createPetitionMock(petitionData);
  }
  return petitionApiService.createPetitionApi(petitionData);
};

// Transcript service functions
export const getAdvisorStudents = async (): Promise<Student[]> => {
  if (useMock) {
    return transcriptMockService.getAdvisorStudentsMock();
  }
  return transcriptApiService.getAdvisorStudentsApi();
};

export const getStudentTranscript = async (
  studentId: string,
  studentInfo?: { name: string; studentNumber: string; department: string }
): Promise<TranscriptData> => {
  if (useMock) {
    return transcriptMockService.getStudentTranscriptMock(studentId);
  }
  return transcriptApiService.getStudentTranscriptApi(studentId, studentInfo);
};

// Notification service functions
export const getNotifications = async (): Promise<Notification[]> => {
  if (useMock) {
    return notificationMockService.getNotificationsMock();
  }
  return notificationApiService.getNotificationsApi();
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  if (useMock) {
    return notificationMockService.markNotificationAsReadMock(id);
  }
  return notificationApiService.markNotificationAsReadApi(id);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  if (useMock) {
    return notificationMockService.markAllNotificationsAsReadMock();
  }
  return notificationApiService.markAllNotificationsAsReadApi();
};

export const deleteNotification = async (id: string): Promise<void> => {
  if (useMock) {
    return notificationMockService.deleteNotificationMock(id);
  }
  return notificationApiService.deleteNotificationApi(id);
};

// Dashboard service functions
export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    if (useMock) {
      return getDashboardDataMock();
    }
    return getDashboardDataApi();
  },
};

// Additional functions from studentApi that might be exposed through this index.ts:
// getAdvisorData, performSystemEligibilityChecksApi, getStudentEligibilityResultsApi,
// getStudentsWithEligibilityStatusApi, performEligibilityChecksForMissingStudentsApi,
// performEligibilityChecksForAllStudentsApi, clearEligibilityCache

// Example for performSystemEligibilityChecksApi:
export const performSystemEligibilityChecks = async (
  studentUserIds: string[]
): Promise<{ success: boolean; processedStudents: string[] }> => {
  if (useMock) {
    // return studentMockService.performSystemEligibilityChecksMock(studentUserIds); // Mock would need to be created
    console.warn(
      "Mock for performSystemEligibilityChecks not implemented, calling API."
    );
    // For mock, ensure it also returns processedStudents
    return { success: true, processedStudents: studentUserIds };
  }
  return advisorStudentEligibilityApiService.performEligibilityChecksForAllStudentsApi(
    studentUserIds
  );
};

// Example for getStudentEligibilityResults:
export const getStudentEligibilityResults = async (
  studentUserId: string
): Promise<any[]> => {
  // Replace 'any[]' with actual EligibilityCheckResult[] type
  if (useMock) {
    // return studentMockService.getStudentEligibilityResultsMock(studentUserId); // Mock would need to be created
    console.warn(
      "Mock for getStudentEligibilityResults not implemented, calling API."
    );
  }
  return advisorStudentEligibilityApiService.getStudentEligibilityResultsApi(
    studentUserId
  );
};

// Example for getStudentsWithEligibilityStatus:
// This one now takes getStudentsApi as a parameter. We need to pass it from advisorStudentDataApiService
export const getStudentsWithEligibilityStatus = async (): Promise<
  Student[]
> => {
  if (useMock) {
    // return studentMockService.getStudentsWithEligibilityStatusMock(); // Mock would need to be created
    console.warn(
      "Mock for getStudentsWithEligibilityStatus not implemented, calling API."
    );
  }
  return advisorStudentEligibilityApiService.getStudentsWithEligibilityStatusApi(
    advisorStudentDataApiService.getStudentsApi // Passing the actual getStudentsApi function
  );
};

// Export for performEligibilityChecksForMissingStudentsApi
export const performChecksForMissingStudents = async (): Promise<{
  success: boolean;
  processedStudents: string[];
  studentsWithoutResults: string[];
}> => {
  if (useMock) {
    console.warn(
      "Mock for performChecksForMissingStudents not implemented, calling API."
    );
    // return studentMockService.performChecksForMissingStudentsMock(); // Mock would need to be created
    // For now, falling back to API or a default mock response
    return {
      success: true,
      processedStudents: [],
      studentsWithoutResults: [],
    };
  }
  return advisorStudentEligibilityApiService.performEligibilityChecksForMissingStudentsApi(
    advisorStudentDataApiService.getStudentsApi // Pass the dependency
  );
};

// Export clearEligibilityCache
export const clearEligibilityCache = (): void => {
  if (useMock) {
    console.warn(
      "Mock for clearEligibilityCache not implemented, calling API."
    );
    // Mock implementation might clear a mock cache or do nothing
    return;
  }
  return advisorStudentEligibilityApiService.clearEligibilityCache();
};

// Re-export types
export type {
  Student,
  PetitionData,
  PetitionResult,
  PetitionStudent,
  Course,
  StudentInfo,
  TranscriptData,
  Notification,
  CourseTaken,
};

// New service functions for advisor actions
export const setAdvisorEligible = async (
  studentUserIds: string[],
  advisorUserId: string
): Promise<void> => {
  const { apiBaseUrl } = getCommonServiceConfig();
  const fullUrl = `${apiBaseUrl}/GraduationProcesses/SetAdvisorEligible`;

  // Log the request parameters
  console.log("🔍 [API Request] setAdvisorEligible - Parameters:", {
    studentUserIds,
    advisorUserId,
    endpoint: fullUrl,
  });

  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ studentUserIds, advisorUserId }),
    });

    // Log the raw response
    console.log(
      "📡 [API Response] setAdvisorEligible - Status:",
      response.status,
      response.statusText
    );

    // Clone the response to avoid consuming it
    const clonedResponse = response.clone();

    // Try to parse and log the response body
    try {
      const responseData = await clonedResponse.json();
      console.log("✅ [API Response] setAdvisorEligible - Body:", responseData);
    } catch (parseError) {
      console.log(
        "⚠️ [API Response] setAdvisorEligible - Body could not be parsed as JSON"
      );
    }

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Failed to set advisor eligible" }));
      console.error("❌ [API Error] setAdvisorEligible:", errorData);
      throw new Error(errorData.message || "Failed to set advisor eligible");
    }

    console.log("✅ [API Success] setAdvisorEligible completed successfully");
  } catch (error) {
    console.error("❌ [API Exception] setAdvisorEligible:", error);
    throw error;
  }
};

export const setAdvisorNotEligible = async (
  studentUserIds: string[],
  advisorUserId: string,
  rejectionReason: string
): Promise<void> => {
  const { apiBaseUrl } = getCommonServiceConfig();
  const fullUrl = `${apiBaseUrl}/GraduationProcesses/SetAdvisorNotEligible`;

  // Log the request parameters
  console.log("🔍 [API Request] setAdvisorNotEligible - Parameters:", {
    studentUserIds,
    advisorUserId,
    rejectionReason,
    endpoint: fullUrl,
  });

  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        studentUserIds,
        advisorUserId,
        rejectionReason,
      }),
    });

    // Log the raw response
    console.log(
      "📡 [API Response] setAdvisorNotEligible - Status:",
      response.status,
      response.statusText
    );

    // Clone the response to avoid consuming it
    const clonedResponse = response.clone();

    // Try to parse and log the response body
    try {
      const responseData = await clonedResponse.json();
      console.log(
        "✅ [API Response] setAdvisorNotEligible - Body:",
        responseData
      );
    } catch (parseError) {
      console.log(
        "⚠️ [API Response] setAdvisorNotEligible - Body could not be parsed as JSON"
      );
    }

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Failed to set advisor not eligible" }));
      console.error("❌ [API Error] setAdvisorNotEligible:", errorData);
      throw new Error(
        errorData.message || "Failed to set advisor not eligible"
      );
    }

    console.log(
      "✅ [API Success] setAdvisorNotEligible completed successfully"
    );
  } catch (error) {
    console.error("❌ [API Exception] setAdvisorNotEligible:", error);
    throw error;
  }
};

// New service function to get Advisor ID
export const getAdvisorId = async (): Promise<string | null> => {
  const { apiBaseUrl } = getCommonServiceConfig();
  const fullUrl = `${apiBaseUrl}/Users/GetFromAuth`;

  console.log("🔍 [API Request] getAdvisorId - Fetching from", fullUrl);

  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log(
      "📡 [API Response] getAdvisorId - Status:",
      response.status,
      response.statusText
    );

    if (!response.ok) {
      console.error(
        "❌ [API Error] getAdvisorId - Failed with status:",
        response.status
      );
      throw new Error("Failed to fetch advisor ID");
    }

    const userData = await response.json();
    console.log("✅ [API Response] getAdvisorId - User data:", userData);

    if (!userData.id) {
      console.warn(
        "⚠️ [API Warning] getAdvisorId - No ID found in response:",
        userData
      );
    } else {
      console.log("✅ [API Success] getAdvisorId - Retrieved ID:", userData.id);
    }

    return userData.id; // This should be the user ID from the response
  } catch (error) {
    console.error("❌ [API Exception] getAdvisorId:", error);
    throw error; // Re-throw to be handled by the component
  }
};
