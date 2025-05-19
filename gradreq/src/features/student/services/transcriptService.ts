// Types for transcript data
export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  semester: string;
}

export interface StudentInfo {
  name: string;
  id: string;
  department: string;
}

export interface TranscriptData {
  studentInfo: StudentInfo;
  courses: Course[];
  gpa: string;
}

// Mock transcript data
const mockCourses: Course[] = [
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
];

const mockStudentInfo: StudentInfo = {
  name: "John Doe",
  id: "20190101023",
  department: "Computer Engineering",
};

// Function to calculate GPA
const calculateGPA = (courses: Course[]): string => {
  const gradePoints: { [key: string]: number } = {
    AA: 4.0,
    BA: 3.5,
    BB: 3.0,
    CB: 2.5,
    CC: 2.0,
    DC: 1.5,
    DD: 1.0,
    FF: 0.0,
  };

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    totalPoints += gradePoints[course.grade] * course.credits;
    totalCredits += course.credits;
  });

  return (totalPoints / totalCredits).toFixed(2);
};

// API function to get transcript data
export const getTranscriptData = async (): Promise<TranscriptData> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Calculate GPA
  const gpa = calculateGPA(mockCourses);

  return {
    studentInfo: mockStudentInfo,
    courses: mockCourses,
    gpa,
  };
};

// API function to submit missing documents report
export const reportMissingDocuments = async (
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
