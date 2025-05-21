import type { PetitionData, PetitionResult, PetitionStudent } from "../types";
import { getStudentsMock } from "./studentMock";

// API function to get students for petition
export const getStudentsForPetitionMock = async (): Promise<
  PetitionStudent[]
> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Get students from mock data
  const students = await getStudentsMock();

  // Map to PetitionStudent type
  return students.map((student) => ({
    id: student.id,
    name: student.name,
    department: student.department,
  }));
};

// API function to create a petition
export const createPetitionMock = async (
  petitionData: PetitionData
): Promise<PetitionResult> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Validate petition data
  if (!petitionData.type || !petitionData.studentId || !petitionData.content) {
    throw new Error("Tüm dilekçe alanları doldurulmalıdır");
  }

  if (petitionData.content.trim().length < 50) {
    throw new Error("Dilekçe içeriği en az 50 karakter olmalıdır");
  }

  // Verify student exists
  const students = await getStudentsMock();
  const student = students.find((s) => s.id === petitionData.studentId);

  if (!student) {
    throw new Error("Öğrenci bulunamadı");
  }

  // Simulate successful response with created petition
  const now = new Date().toISOString();
  return {
    id: `petition-${Math.floor(Math.random() * 10000)}`,
    ...petitionData,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
};
