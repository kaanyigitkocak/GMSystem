import type { Student, TranscriptData } from "../types";

// API function to get advisor's students
export const getAdvisorStudentsApi = async (): Promise<Student[]> => {
  throw new Error("Not implemented");
};

// API function to get transcript data for a specific student
export const getStudentTranscriptApi = async (
  studentId: string
): Promise<TranscriptData> => {
  throw new Error("Not implemented");
};
