import { getServiceConfig } from "./utils/serviceUtils";
import * as apiService from "./api";
import * as mockIndex from "./mock";
import * as secretaryMockService from "./mock/secretaryMock";
import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
  DashboardStats,
} from "./types";
import type { StudentTranscript } from "./types";

// User service functions
export const getUserFromAuth = async () => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.getUserFromAuthMock();
  }
  return apiService.getUserFromAuthApi();
};

// Service router functions
export const getNotifications = async (): Promise<Notification[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.getNotificationsMock();
  }
  return apiService.getNotificationsApi();
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.markNotificationAsReadMock(id);
  }
  return apiService.markNotificationAsReadApi(id);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.markAllNotificationsAsReadMock();
  }
  return apiService.markAllNotificationsAsReadApi();
};

export const getGraduationRequests = async (): Promise<GraduationRequest[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.getGraduationRequestsMock();
  }
  return apiService.getGraduationRequestsApi();
};

export const updateGraduationRequestStatus = async (
  id: string,
  status: string,
  notes?: string
): Promise<GraduationRequest> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.updateGraduationRequestStatusMock(
      id,
      status,
      notes
    );
  }
  return apiService.updateGraduationRequestStatusApi(id, status, notes);
};

export const getStudentRankings = async (
  department: string
): Promise<StudentRanking[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.getStudentRankingsMock(department);
  }
  return apiService.getStudentRankingsApi(department);
};

export const updateStudentRanking = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.updateStudentRankingMock(student);
  }
  return apiService.updateStudentRankingApi(student);
};

export const reorderStudentRankings = async (
  rankings: StudentRanking[]
): Promise<StudentRanking[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.reorderStudentRankingsMock(rankings);
  }
  return apiService.reorderStudentRankingsApi(rankings);
};

export const getTranscripts = async (): Promise<TranscriptData[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.getTranscriptsMock();
  }
  return apiService.getTranscriptsApi();
};

export const parseTranscriptCSV = async (
  file: File
): Promise<TranscriptData[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.parseTranscriptCSVMock(file);
  }
  return apiService.parseTranscriptCSVApi(file);
};

export const uploadTranscript = async (file: File): Promise<TranscriptData> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.uploadTranscriptMock(file);
  }
  return apiService.uploadTranscriptApi(file);
};

export const uploadAndParsePDFTranscript = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<TranscriptData> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.uploadAndParsePDFTranscriptMock(
      file,
      onProgress
    );
  }
  return apiService.uploadAndParsePDFTranscriptApi(file, onProgress);
};

export const submitParsedTranscript = async (
  transcriptData: TranscriptData
): Promise<{
  transcriptData: TranscriptData;
  studentCreated: {
    userId: string;
    studentId: string;
    transcriptDataId: string;
  };
}> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    const mockResult = await secretaryMockService.submitParsedTranscriptMock(
      transcriptData
    );
    return {
      transcriptData: mockResult,
      studentCreated: {
        userId: "mock-user-id",
        studentId: "mock-student-id",
        transcriptDataId: "mock-transcript-id",
      },
    };
  }
  return apiService.submitParsedTranscriptApi(transcriptData);
};

export const deleteTranscript = async (id: string): Promise<boolean> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.deleteTranscriptMock(id);
  }
  return apiService.deleteTranscriptApi(id);
};

export const processTranscript = async (
  id: string
): Promise<TranscriptData> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.processTranscriptMock(id);
  }
  return apiService.processTranscriptApi(id);
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.getDashboardStatsMock();
  }
  return apiService.getDashboardStatsApi();
};

export const getEligibleGraduates = async (): Promise<TranscriptData[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.getEligibleGraduatesMock();
  }
  return apiService.getEligibleGraduatesApi();
};

export const exportEligibleGraduatesCSV = async (): Promise<string> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.exportEligibleGraduatesCSVMock();
  }
  return apiService.exportEligibleGraduatesCSVApi();
};

export const exportEligibleGraduatesPDF = async (): Promise<Blob> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return secretaryMockService.exportEligibleGraduatesPDFMock();
  }
  return apiService.exportEligibleGraduatesPDFApi();
};

// Student management functions
export const getStudentsWithEligibilityStatus = async () => {
  return apiService.getStudentsWithEligibilityStatusApi();
};

export const performEligibilityChecksForMissingStudents = async () => {
  return apiService.performEligibilityChecksForMissingStudentsApi();
};

export const performEligibilityChecksForAllStudents = async () => {
  return apiService.performEligibilityChecksForAllStudentsApi();
};

export const clearEligibilityCache = () => {
  return apiService.clearEligibilityCache();
};

export const getStudents = async () => {
  return apiService.getStudentsApi();
};

export const getStudentEligibilityResults = async (studentUserId: string) => {
  return apiService.getStudentEligibilityResultsApi(studentUserId);
};

// Re-export types
export type { Notification, GraduationRequest, StudentRanking, TranscriptData };

// Transcript service
// export { getStudentTranscript } from "./transcriptService";

// Student Transcript Service (Mock only for now)
export const getStudentTranscript = async (
  studentId: string,
  studentName?: string,
  department?: string,
  faculty?: string,
  gpa?: number,
  credits?: number
): Promise<StudentTranscript> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return mockIndex.getStudentTranscript(
      studentId,
      studentName,
      department,
      faculty,
      gpa,
      credits
    );
  }
  console.warn(
    "getStudentTranscript is currently only available in mock mode."
  );
  return Promise.resolve(
    mockIndex.generateMockTranscript(
      studentId,
      studentName || "Default Student",
      department || "Default Dept",
      faculty || "Default Faculty",
      gpa || 0,
      credits || 0
    )
  );
};

// Add other service router functions as needed...
