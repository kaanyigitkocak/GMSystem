import { getServiceConfig } from "./utils/serviceUtils";
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
import {
  getManualCheckRequestsMock,
  updateManualCheckRequestMock,
} from "./mock/manualCheckRequestsMock";
import {
  getManualCheckRequestsApi,
  updateManualCheckRequestApi,
} from "./api/manualCheckRequestsApi";

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
import type { DashboardData, ManualCheckRequest } from "./types/dashboard";

const { useMock } = getServiceConfig();

// Student service functions
export const getStudents = async (): Promise<Student[]> => {
  if (useMock) {
    return studentMockService.getStudentsMock();
  }
  return advisorStudentDataApiService.getStudentsApi();
};

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

// Manual check requests service functions
export const manualCheckRequestsService = {
  getManualCheckRequests: async (): Promise<ManualCheckRequest[]> => {
    if (useMock) {
      return getManualCheckRequestsMock();
    }
    return getManualCheckRequestsApi();
  },

  updateManualCheckRequest: async (
    id: string,
    updates: Partial<ManualCheckRequest>
  ): Promise<ManualCheckRequest> => {
    if (useMock) {
      return updateManualCheckRequestMock(id, updates);
    }
    return updateManualCheckRequestApi(id, updates);
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
