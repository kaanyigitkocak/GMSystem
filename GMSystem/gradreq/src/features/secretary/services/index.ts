import { getServiceConfig } from "./utils/serviceUtils";
import * as apiService from "./api";
import * as mockService from "./mock/secretaryMock";
import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
} from "./types";

const { useMock } = getServiceConfig();

// Service router functions
export const getNotifications = async (): Promise<Notification[]> => {
  if (useMock) {
    return mockService.getNotificationsMock();
  }
  return apiService.getNotificationsApi();
};

export const getGraduationRequests = async (): Promise<GraduationRequest[]> => {
  if (useMock) {
    return mockService.getGraduationRequestsMock();
  }
  return apiService.getGraduationRequestsApi();
};

export const getStudentRankings = async (
  department: string
): Promise<StudentRanking[]> => {
  if (useMock) {
    return mockService.getStudentRankingsMock(department);
  }
  return apiService.getStudentRankingsApi(department);
};

export const updateStudentRanking = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  if (useMock) {
    return mockService.updateStudentRankingMock(student);
  }
  return apiService.updateStudentRankingApi(student);
};

export const reorderStudentRankings = async (
  rankings: StudentRanking[]
): Promise<StudentRanking[]> => {
  if (useMock) {
    return mockService.reorderStudentRankingsMock(rankings);
  }
  return apiService.reorderStudentRankingsApi(rankings);
};

export const getTranscripts = async (): Promise<TranscriptData[]> => {
  if (useMock) {
    return mockService.getTranscriptsMock();
  }
  return apiService.getTranscriptsApi();
};

export const parseTranscriptCSV = async (
  file: File
): Promise<TranscriptData[]> => {
  if (useMock) {
    return mockService.parseTranscriptCSVMock(file);
  }
  return apiService.parseTranscriptCSVApi(file);
};

export const uploadTranscript = async (file: File): Promise<TranscriptData> => {
  if (useMock) {
    return mockService.uploadTranscriptMock(file);
  }
  return apiService.uploadTranscriptApi(file);
};

export const uploadAndParsePDFTranscript = async (
  file: File
): Promise<TranscriptData> => {
  if (useMock) {
    return mockService.uploadAndParsePDFTranscriptMock(file);
  }
  return apiService.uploadAndParsePDFTranscriptApi(file);
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
  if (useMock) {
    // For mock, wrap the simple response in the expected format
    const mockResult = await mockService.submitParsedTranscriptMock(
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
  if (useMock) {
    return mockService.deleteTranscriptMock(id);
  }
  return apiService.deleteTranscriptApi(id);
};

export const processTranscript = async (
  id: string
): Promise<TranscriptData> => {
  if (useMock) {
    return mockService.processTranscriptMock(id);
  }
  return apiService.processTranscriptApi(id);
};

export const getDashboardStats = async (): Promise<{
  graduatesCount: number;
  graduationDate: string;
}> => {
  if (useMock) {
    return mockService.getDashboardStatsMock();
  }
  return apiService.getDashboardStatsApi();
};

export const getEligibleGraduates = async (): Promise<TranscriptData[]> => {
  if (useMock) {
    return mockService.getEligibleGraduatesMock();
  }
  return apiService.getEligibleGraduatesApi();
};

export const exportEligibleGraduatesCSV = async (): Promise<string> => {
  if (useMock) {
    return mockService.exportEligibleGraduatesCSVMock();
  }
  return apiService.exportEligibleGraduatesCSVApi();
};

export const exportEligibleGraduatesPDF = async (): Promise<Blob> => {
  if (useMock) {
    return mockService.exportEligibleGraduatesPDFMock();
  }
  return apiService.exportEligibleGraduatesPDFApi();
};

// Re-export types
export type { Notification, GraduationRequest, StudentRanking, TranscriptData };

// Add other service router functions as needed...
