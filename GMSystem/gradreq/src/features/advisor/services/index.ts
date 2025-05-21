import { getServiceConfig } from "./utils/serviceUtils";
import * as studentApiService from "./api/studentApi";
import * as studentMockService from "./mock/studentMock";
import * as petitionApiService from "./api/petitionApi";
import * as petitionMockService from "./mock/petitionMock";
import * as transcriptApiService from "./api/transcriptApi";
import * as transcriptMockService from "./mock/transcriptMock";

import type {
  Student,
  PetitionData,
  PetitionResult,
  PetitionStudent,
  Course,
  StudentInfo,
  TranscriptData,
} from "./types";

const { useMock } = getServiceConfig();

// Student service functions
export const getStudents = async (): Promise<Student[]> => {
  if (useMock) {
    return studentMockService.getStudentsMock();
  }
  return studentApiService.getStudentsApi();
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
  return studentApiService.sendEmailToStudentApi(studentId, subject, message);
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
  studentId: string
): Promise<TranscriptData> => {
  if (useMock) {
    return transcriptMockService.getStudentTranscriptMock(studentId);
  }
  return transcriptApiService.getStudentTranscriptApi(studentId);
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
};
