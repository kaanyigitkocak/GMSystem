import type { Student } from "../types";

// API function to get students data
export const getStudentsApi = async (): Promise<Student[]> => {
  throw new Error("Not implemented");
};

// API function to send email to student
export const sendEmailToStudentApi = async (
  studentId: string,
  subject: string,
  message: string
): Promise<{ success: boolean }> => {
  throw new Error("Not implemented");
};
