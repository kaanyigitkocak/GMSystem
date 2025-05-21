import { getServiceConfig } from "./utils/serviceUtils";

// Import API services
import {
  getNotificationsApi,
  markNotificationAsReadApi,
  getGraduationRequestsApi,
  getStudentRankingsApi,
  updateStudentRankingApi,
  getTranscriptsApi,
  deleteTranscriptApi,
  processTranscriptApi,
  getCertificateTypesApi,
  getStudentsApi,
  getStudentByIdApi,
  updateCertificateStatusApi,
  getUniversityRankingsApi,
  getGraduationDecisionsApi,
} from "./api/studentAffairsApi";

// Import mock services
import {
  getNotificationsMock,
  markNotificationAsReadMock,
  getGraduationRequestsMock,
  getStudentRankingsMock,
  updateStudentRankingMock,
  getTranscriptsMock,
  deleteTranscriptMock,
  processTranscriptMock,
  getCertificateTypesMock,
  getStudentsMock,
  getStudentByIdMock,
  updateCertificateStatusMock,
  getUniversityRankingsMock,
  getGraduationDecisionsMock,
} from "./mock/studentAffairsMock";

// Import types
import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
  Student,
  CertificateType,
  UniversityRanking,
  GraduationDecision,
} from "./types";

// Get service configuration
const { useMock } = getServiceConfig();

// Notification services
export const getNotifications = async (): Promise<Notification[]> => {
  if (useMock) {
    return getNotificationsMock();
  }
  return getNotificationsApi();
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  if (useMock) {
    return markNotificationAsReadMock(id);
  }
  return markNotificationAsReadApi(id);
};

// Graduation requests service
export const getGraduationRequests = async (): Promise<GraduationRequest[]> => {
  if (useMock) {
    return getGraduationRequestsMock();
  }
  return getGraduationRequestsApi();
};

// Student rankings service
export const getStudentRankings = async (
  department: string
): Promise<StudentRanking[]> => {
  if (useMock) {
    return getStudentRankingsMock(department);
  }
  return getStudentRankingsApi(department);
};

export const updateStudentRanking = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  if (useMock) {
    return updateStudentRankingMock(student);
  }
  return updateStudentRankingApi(student);
};

// Transcript services
export const getTranscripts = async (): Promise<TranscriptData[]> => {
  if (useMock) {
    return getTranscriptsMock();
  }
  return getTranscriptsApi();
};

export const deleteTranscript = async (id: string): Promise<boolean> => {
  if (useMock) {
    return deleteTranscriptMock(id);
  }
  return deleteTranscriptApi(id);
};

export const processTranscript = async (
  id: string
): Promise<TranscriptData> => {
  if (useMock) {
    return processTranscriptMock(id);
  }
  return processTranscriptApi(id);
};

// Certificate services
export const getCertificateTypes = async (): Promise<CertificateType[]> => {
  if (useMock) {
    return getCertificateTypesMock();
  }
  return getCertificateTypesApi();
};

// Student services
export const getStudents = async (): Promise<Student[]> => {
  if (useMock) {
    return getStudentsMock();
  }
  return getStudentsApi();
};

export const getStudentById = async (
  id: string
): Promise<Student | undefined> => {
  if (useMock) {
    return getStudentByIdMock(id);
  }
  return getStudentByIdApi(id);
};

export const updateCertificateStatus = async (
  studentId: string,
  certificateId: string,
  status: string,
  issueDate: string | null
): Promise<Student | undefined> => {
  if (useMock) {
    return updateCertificateStatusMock(
      studentId,
      certificateId,
      status,
      issueDate
    );
  }
  return updateCertificateStatusApi(
    studentId,
    certificateId,
    status,
    issueDate
  );
};

// University rankings services
export const getUniversityRankings = async (): Promise<UniversityRanking[]> => {
  if (useMock) {
    return getUniversityRankingsMock();
  }
  return getUniversityRankingsApi();
};

// Graduation decisions services
export const getGraduationDecisions = async (): Promise<
  GraduationDecision[]
> => {
  if (useMock) {
    return getGraduationDecisionsMock();
  }
  return getGraduationDecisionsApi();
};
