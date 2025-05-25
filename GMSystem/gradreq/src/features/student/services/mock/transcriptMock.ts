import type { TranscriptData, Course, StudentInfo } from "../types";
import { calculateGPA } from "../utils/serviceUtils";

// Mock transcript data
const mockTranscriptCourses: Course[] = [
  {
    id: "CENG101",
    code: "CENG101",
    name: "Introduction to Computer Engineering",
    credits: 4,
    grade: "AA",
    semester: "Fall 2020",
  },
  {
    id: "CENG211",
    code: "CENG211",
    name: "Data Structures",
    credits: 4,
    grade: "BA",
    semester: "Spring 2021",
  },
  {
    id: "CENG311",
    code: "CENG311",
    name: "Algorithms",
    credits: 4,
    grade: "BB",
    semester: "Fall 2021",
  },
  {
    id: "MATH101",
    code: "MATH101",
    name: "Calculus I",
    credits: 4,
    grade: "AA",
    semester: "Fall 2020",
  },
  {
    id: "MATH102",
    code: "MATH102",
    name: "Calculus II",
    credits: 4,
    grade: "BA",
    semester: "Spring 2021",
  },
  {
    id: "PHYS101",
    code: "PHYS101",
    name: "Physics I",
    credits: 4,
    grade: "BB",
    semester: "Fall 2020",
  },
  {
    id: "PHYS102",
    code: "PHYS102",
    name: "Physics II",
    credits: 4,
    grade: "CB",
    semester: "Spring 2021",
  },
];

const mockStudentInfo: StudentInfo = {
  name: "John Doe",
  id: "2020123001",
  department: "Computer Engineering",
};

// Get transcript data
export const getTranscriptMock = async (): Promise<TranscriptData> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        studentInfo: mockStudentInfo,
        courses: mockTranscriptCourses,
        gpa: calculateGPA(
          mockTranscriptCourses.map((course) => ({
            grade: course.grade,
            credits: course.credits,
          }))
        ),
      });
    }, 600);
  });
};
