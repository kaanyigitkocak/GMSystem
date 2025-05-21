import type {
  GraduationRequirementsData,
  RequirementCategory,
  StudentProgramInfo,
} from "../types";
import { calculateOverallProgress } from "../utils/serviceUtils";

// Mock graduation requirements data
const mockRequirements: RequirementCategory[] = [
  {
    category: "Core Courses",
    progress: 85,
    completed: 17,
    total: 20,
    items: [
      {
        id: "CENG101",
        name: "Introduction to Computer Engineering",
        credits: 4,
        completed: true,
      },
      { id: "CENG211", name: "Data Structures", credits: 4, completed: true },
      { id: "CENG311", name: "Algorithms", credits: 4, completed: true },
      {
        id: "CENG371",
        name: "Database Management",
        credits: 4,
        completed: true,
      },
      {
        id: "CENG302",
        name: "Operating Systems",
        credits: 4,
        completed: false,
      },
    ],
  },
  {
    category: "Mathematics & Science Courses",
    progress: 100,
    completed: 6,
    total: 6,
    items: [
      { id: "MATH101", name: "Calculus I", credits: 4, completed: true },
      { id: "MATH102", name: "Calculus II", credits: 4, completed: true },
      { id: "MATH211", name: "Linear Algebra", credits: 4, completed: true },
      { id: "PHYS101", name: "Physics I", credits: 4, completed: true },
      { id: "PHYS102", name: "Physics II", credits: 4, completed: true },
      {
        id: "STAT201",
        name: "Probability & Statistics",
        credits: 3,
        completed: true,
      },
    ],
  },
  {
    category: "Technical Electives",
    progress: 50,
    completed: 2,
    total: 4,
    items: [
      { id: "CENG401", name: "Machine Learning", credits: 3, completed: true },
      { id: "CENG413", name: "Computer Graphics", credits: 3, completed: true },
      {
        id: "CENG451",
        name: "Distributed Systems",
        credits: 3,
        completed: false,
      },
      { id: "CENG461", name: "Cloud Computing", credits: 3, completed: false },
    ],
  },
  {
    category: "General Education & Humanities",
    progress: 66,
    completed: 4,
    total: 6,
    items: [
      { id: "ENG101", name: "English I", credits: 3, completed: true },
      { id: "ENG102", name: "English II", credits: 3, completed: true },
      { id: "TURK101", name: "Turkish I", credits: 2, completed: true },
      { id: "TURK102", name: "Turkish II", credits: 2, completed: true },
      { id: "HIST101", name: "History I", credits: 2, completed: false },
      { id: "HIST102", name: "History II", credits: 2, completed: false },
    ],
  },
];

const mockStudentProgramInfo: StudentProgramInfo = {
  department: "Computer Engineering",
  requiredCredits: 140,
  completedCredits: 105,
};

// API function to get graduation requirements data
export const getGraduationRequirementsMock =
  async (): Promise<GraduationRequirementsData> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Calculate overall progress
        const overallProgress = calculateOverallProgress(mockRequirements);

        resolve({
          studentInfo: mockStudentProgramInfo,
          requirements: mockRequirements,
          overallProgress,
        });
      }, 800);
    });
  };
