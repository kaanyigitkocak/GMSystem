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
  markAllNotificationsAsReadMock,
  deleteNotificationMock,
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

// Notification services
export const getNotifications = async (): Promise<Notification[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return getNotificationsMock();
  }
  return getNotificationsApi();
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return markNotificationAsReadMock(id);
  }
  return markNotificationAsReadApi(id);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return markAllNotificationsAsReadMock();
  }
  // Note: markAllNotificationsAsReadApi doesn't exist in the API imports above
  // You may need to add it or implement it
  throw new Error("markAllNotificationsAsReadApi not implemented");
};

export const deleteNotification = async (id: string): Promise<void> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return deleteNotificationMock(id);
  }
  // Note: deleteNotificationApi doesn't exist in the API imports above
  // You may need to add it or implement it
  throw new Error("deleteNotificationApi not implemented");
};

// Graduation requests service
export const getGraduationRequests = async (): Promise<GraduationRequest[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return getGraduationRequestsMock();
  }
  return getGraduationRequestsApi();
};

// Student rankings service
export const getStudentRankings = async (
  department: string
): Promise<StudentRanking[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return getStudentRankingsMock(department);
  }
  return getStudentRankingsApi(department);
};

export const updateStudentRanking = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return updateStudentRankingMock(student);
  }
  return updateStudentRankingApi(student);
};

// Transcript services
export const getTranscripts = async (): Promise<TranscriptData[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return getTranscriptsMock();
  }
  return getTranscriptsApi();
};

export const deleteTranscript = async (id: string): Promise<boolean> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return deleteTranscriptMock(id);
  }
  return deleteTranscriptApi(id);
};

export const processTranscript = async (
  id: string
): Promise<TranscriptData> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return processTranscriptMock(id);
  }
  return processTranscriptApi(id);
};

// Certificate services
export const getCertificateTypes = async (): Promise<CertificateType[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return getCertificateTypesMock();
  }
  return getCertificateTypesApi();
};

// Student services
export const getStudents = async (): Promise<Student[]> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return getStudentsMock();
  }
  return getStudentsApi();
};

export const getStudentById = async (
  id: string
): Promise<Student | undefined> => {
  const { useMock } = getServiceConfig();
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
  const { useMock } = getServiceConfig();
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
  const { useMock } = getServiceConfig();
  if (useMock) {
    return getUniversityRankingsMock();
  }
  return getUniversityRankingsApi();
};

// Graduation decisions services
export const getGraduationDecisions = async (): Promise<
  GraduationDecision[]
> => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return getGraduationDecisionsMock();
  }
  return getGraduationDecisionsApi();
};

// Transcript service
export { getStudentTranscript } from "./transcriptService";
