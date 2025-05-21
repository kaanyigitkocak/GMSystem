import type { Course, TranscriptData } from "../types";
import { getStudentsMock } from "./studentMock";
import { calculateGPA } from "../utils/serviceUtils";
import type { Student } from "../types";

// Mock list of advisor's students
export const getAdvisorStudentsMock = async (): Promise<Student[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Get data from mockStudentsMock
  return getStudentsMock();
};

// Mock course data for a specific student
const mockCoursesMap: Record<string, Course[]> = {
  "20190101023": [
    {
      id: "CENG311",
      name: "Algorithms",
      credits: 4,
      grade: "AA",
      semester: "Fall 2021-2022",
    },
    {
      id: "CENG371",
      name: "Database Management",
      credits: 4,
      grade: "BA",
      semester: "Spring 2021-2022",
    },
    {
      id: "MATH101",
      name: "Calculus I",
      credits: 4,
      grade: "BB",
      semester: "Fall 2020-2021",
    },
    {
      id: "PHYS101",
      name: "Physics I",
      credits: 4,
      grade: "CB",
      semester: "Fall 2020-2021",
    },
    {
      id: "MATH102",
      name: "Calculus II",
      credits: 4,
      grade: "BA",
      semester: "Spring 2020-2021",
    },
    {
      id: "PHYS102",
      name: "Physics II",
      credits: 4,
      grade: "CB",
      semester: "Spring 2020-2021",
    },
    {
      id: "CENG211",
      name: "Data Structures",
      credits: 4,
      grade: "AA",
      semester: "Fall 2021-2022",
    },
    {
      id: "ENG101",
      name: "English I",
      credits: 3,
      grade: "BB",
      semester: "Fall 2020-2021",
    },
  ],
  "20190102034": [
    {
      id: "CENG311",
      name: "Algorithms",
      credits: 4,
      grade: "CB",
      semester: "Fall 2021-2022",
    },
    {
      id: "CENG371",
      name: "Database Management",
      credits: 4,
      grade: "CC",
      semester: "Spring 2021-2022",
    },
    {
      id: "MATH101",
      name: "Calculus I",
      credits: 4,
      grade: "CC",
      semester: "Fall 2020-2021",
    },
    {
      id: "PHYS101",
      name: "Physics I",
      credits: 4,
      grade: "DC",
      semester: "Fall 2020-2021",
    },
    {
      id: "MATH102",
      name: "Calculus II",
      credits: 4,
      grade: "DC",
      semester: "Spring 2020-2021",
    },
    {
      id: "PHYS102",
      name: "Physics II",
      credits: 4,
      grade: "DD",
      semester: "Spring 2020-2021",
    },
    {
      id: "CENG211",
      name: "Data Structures",
      credits: 4,
      grade: "BB",
      semester: "Fall 2021-2022",
    },
    {
      id: "ENG101",
      name: "English I",
      credits: 3,
      grade: "BB",
      semester: "Fall 2020-2021",
    },
  ],
};

// API function to get transcript data for a specific student
export const getStudentTranscriptMock = async (
  studentId: string
): Promise<TranscriptData> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Get student details
  const students = await getStudentsMock();
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    throw new Error("Öğrenci bulunamadı");
  }

  // Find the student's courses or use default courses
  const courses = mockCoursesMap[studentId] || mockCoursesMap["20190101023"];

  return {
    studentInfo: {
      name: student.name,
      id: student.id,
      department: student.department,
    },
    courses,
    gpa: calculateGPA(courses),
  };
};
