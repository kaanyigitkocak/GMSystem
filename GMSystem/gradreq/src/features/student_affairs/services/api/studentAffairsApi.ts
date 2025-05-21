import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
  Student,
  CertificateType,
  UniversityRanking,
  GraduationDecision,
} from "../types";
import { getServiceConfig } from "../utils/serviceUtils";

const { apiBaseUrl } = getServiceConfig();

// Notification services
export const getNotificationsApi = async (): Promise<Notification[]> => {
  throw new Error("Not implemented");
};

export const markNotificationAsReadApi = async (id: string): Promise<void> => {
  throw new Error("Not implemented");
};

// Graduation requests service
export const getGraduationRequestsApi = async (): Promise<
  GraduationRequest[]
> => {
  throw new Error("Not implemented");
};

// Student rankings service
export const getStudentRankingsApi = async (
  department: string
): Promise<StudentRanking[]> => {
  throw new Error("Not implemented");
};

export const updateStudentRankingApi = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  throw new Error("Not implemented");
};

// Transcript services
export const getTranscriptsApi = async (): Promise<TranscriptData[]> => {
  throw new Error("Not implemented");
};

export const deleteTranscriptApi = async (id: string): Promise<boolean> => {
  throw new Error("Not implemented");
};

export const processTranscriptApi = async (
  id: string
): Promise<TranscriptData> => {
  throw new Error("Not implemented");
};

// Certificate services
export const getCertificateTypesApi = async (): Promise<CertificateType[]> => {
  throw new Error("Not implemented");
};

// Student services
export const getStudentsApi = async (): Promise<Student[]> => {
  throw new Error("Not implemented");
};

export const getStudentByIdApi = async (
  id: string
): Promise<Student | undefined> => {
  throw new Error("Not implemented");
};

export const updateCertificateStatusApi = async (
  studentId: string,
  certificateId: string,
  status: string,
  issueDate: string | null
): Promise<Student | undefined> => {
  throw new Error("Not implemented");
};

// University rankings services
export const getUniversityRankingsApi = async (): Promise<
  UniversityRanking[]
> => {
  throw new Error("Not implemented");
};

// Graduation decisions services
export const getGraduationDecisionsApi = async (): Promise<
  GraduationDecision[]
> => {
  throw new Error("Not implemented");
};
