// Types for graduation requirements data
export interface RequirementItem {
  id: string;
  name: string;
  credits: number;
  completed: boolean;
}

export interface RequirementCategory {
  category: string;
  progress: number;
  completed: number;
  total: number;
  items: RequirementItem[];
}

export interface StudentProgramInfo {
  department: string;
  requiredCredits: number;
  completedCredits: number;
}

export interface GraduationRequirementsData {
  studentInfo: StudentProgramInfo;
  requirements: RequirementCategory[];
  overallProgress: number;
}

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

// Calculate overall progress
const calculateOverallProgress = (
  requirements: RequirementCategory[]
): number => {
  let totalCompleted = 0;
  let totalRequired = 0;

  requirements.forEach((category) => {
    totalCompleted += category.completed;
    totalRequired += category.total;
  });

  return Math.round((totalCompleted / totalRequired) * 100);
};

// API function to get graduation requirements data
export const getGraduationRequirements =
  async (): Promise<GraduationRequirementsData> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Calculate overall progress
    const overallProgress = calculateOverallProgress(mockRequirements);

    return {
      studentInfo: mockStudentProgramInfo,
      requirements: mockRequirements,
      overallProgress,
    };
  };

// API function to report missing files
export const reportMissingFiles = async (
  message: string
): Promise<{ success: boolean }> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate validation
  if (!message.trim()) {
    throw new Error("Message is required");
  }

  // Simulate successful response
  return { success: true };
};
