import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
} from "../types";

// Course information interface to represent parsed CSV data
interface CourseInfo {
  studentId: string;
  studentName?: string;
  courseCode: string;
  courseName: string;
  credit: number;
  grade: string;
  semester: string;
}

// Grade point mapping for GPA calculation
const GRADE_POINTS: Record<string, number> = {
  AA: 4.0,
  A: 4.0,
  BA: 3.5,
  BB: 3.0,
  B: 3.0,
  CB: 2.5,
  "C+": 2.5,
  CC: 2.0,
  C: 2.0,
  DC: 1.5,
  "D+": 1.5,
  DD: 1.0,
  D: 1.0,
  FF: 0.0,
  F: 0.0,
};

// Department code mapping
const DEPARTMENT_MAP: Record<string, string> = {
  CENG: "Computer Engineering",
  CSE: "Computer Engineering",
  EE: "Electrical Engineering",
  ME: "Mechanical Engineering",
  CE: "Civil Engineering",
  MATH: "Mathematics",
  PHYS: "Physics",
  CHEM: "Chemistry",
};

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "New Graduation Request",
    message: "John Doe has submitted a manual graduation check request.",
    type: "info",
    read: false,
    date: "2023-05-15T10:30:00",
  },
  {
    id: "n2",
    title: "Transcript Processing Complete",
    message: "Jane Smith's transcript has been processed successfully.",
    type: "success",
    read: false,
    date: "2023-05-14T16:45:00",
  },
  {
    id: "n3",
    title: "Missing Documents",
    message: "Mike Johnson is missing disengagement certificates.",
    type: "warning",
    read: false,
    date: "2023-05-13T09:15:00",
  },
  {
    id: "n4",
    title: "System Notification",
    message: "The graduation approval deadline is approaching (May 30).",
    type: "info",
    read: true,
    date: "2023-05-12T14:20:00",
  },
  {
    id: "n5",
    title: "Error in Transcript",
    message: "Error found in Emily Brown's transcript - missing courses.",
    type: "error",
    read: true,
    date: "2023-05-11T11:05:00",
  },
];

// Mock data for graduation requests
const mockGraduationRequests: GraduationRequest[] = [
  {
    id: "r1",
    studentId: "20190001",
    studentName: "John Doe",
    requestType: "Manual Check",
    status: "pending",
    date: "2023-05-15",
    notes: "Student is requesting a manual check for Article 19.",
  },
  {
    id: "r2",
    studentId: "20190023",
    studentName: "Jane Smith",
    requestType: "Transcript Verification",
    status: "approved",
    date: "2023-05-14",
    notes: "Transcript has been verified and approved.",
  },
  {
    id: "r3",
    studentId: "20190045",
    studentName: "Mike Johnson",
    requestType: "Disengagement Certificate",
    status: "pending",
    date: "2023-05-13",
    notes: "Missing library clearance certificate.",
  },
  {
    id: "r4",
    studentId: "20190078",
    studentName: "Emily Brown",
    requestType: "Manual Check",
    status: "rejected",
    date: "2023-05-10",
    notes: "Student has not completed all required courses.",
  },
];

// Mock data for department rankings
const mockStudentRankings: Record<string, StudentRanking[]> = {
  "Computer Engineering": [
    {
      id: "1",
      studentId: "20190045",
      studentName: "John Doe",
      department: "Computer Engineering",
      gpa: 3.85,
      graduationDate: "2023-06-15",
      ranking: 1,
    },
    {
      id: "2",
      studentId: "20190078",
      studentName: "Jane Smith",
      department: "Computer Engineering",
      gpa: 3.75,
      graduationDate: "2023-06-15",
      ranking: 2,
    },
    {
      id: "3",
      studentId: "20190023",
      studentName: "Mike Johnson",
      department: "Computer Engineering",
      gpa: 3.62,
      graduationDate: "2023-06-15",
      ranking: 3,
    },
    {
      id: "4",
      studentId: "20190098",
      studentName: "Emily Brown",
      department: "Computer Engineering",
      gpa: 3.57,
      graduationDate: "2023-06-15",
      ranking: 4,
    },
    {
      id: "5",
      studentId: "20190132",
      studentName: "David Wilson",
      department: "Computer Engineering",
      gpa: 3.45,
      graduationDate: "2023-06-15",
      ranking: 5,
    },
  ],
  "Electrical Engineering": [
    {
      id: "6",
      studentId: "20190112",
      studentName: "Sarah Thompson",
      department: "Electrical Engineering",
      gpa: 3.92,
      graduationDate: "2023-06-15",
      ranking: 1,
    },
    {
      id: "7",
      studentId: "20190067",
      studentName: "Robert Davis",
      department: "Electrical Engineering",
      gpa: 3.88,
      graduationDate: "2023-06-15",
      ranking: 2,
    },
    {
      id: "8",
      studentId: "20190039",
      studentName: "Linda Miller",
      department: "Electrical Engineering",
      gpa: 3.72,
      graduationDate: "2023-06-15",
      ranking: 3,
    },
  ],
  "Mechanical Engineering": [
    {
      id: "9",
      studentId: "20190051",
      studentName: "Mark Williams",
      department: "Mechanical Engineering",
      gpa: 3.79,
      graduationDate: "2023-06-15",
      ranking: 1,
    },
    {
      id: "10",
      studentId: "20190087",
      studentName: "Jennifer Taylor",
      department: "Mechanical Engineering",
      gpa: 3.65,
      graduationDate: "2023-06-15",
      ranking: 2,
    },
  ],
  "Civil Engineering": [
    {
      id: "11",
      studentId: "20190103",
      studentName: "Daniel Anderson",
      department: "Civil Engineering",
      gpa: 3.81,
      graduationDate: "2023-06-15",
      ranking: 1,
    },
    {
      id: "12",
      studentId: "20190056",
      studentName: "Laura Martinez",
      department: "Civil Engineering",
      gpa: 3.77,
      graduationDate: "2023-06-15",
      ranking: 2,
    },
  ],
  "Test Department": [
    {
      id: "101",
      studentId: "2019510001",
      studentName: "Ahmet Yılmaz",
      department: "Test Department",
      gpa: 3.82,
      graduationDate: "2024-06-15",
      ranking: 1,
    },
    {
      id: "102",
      studentId: "2019510042",
      studentName: "Ayşe Demir",
      department: "Test Department",
      gpa: 3.75,
      graduationDate: "2024-06-15",
      ranking: 2,
    },
    {
      id: "103",
      studentId: "2019510036",
      studentName: "Mehmet Kaya",
      department: "Test Department",
      gpa: 3.65,
      graduationDate: "2024-06-15",
      ranking: 3,
    },
    {
      id: "104",
      studentId: "2019510078",
      studentName: "Zeynep Şahin",
      department: "Test Department",
      gpa: 3.58,
      graduationDate: "2024-06-15",
      ranking: 4,
    },
  ],
};

// Mock data for transcripts
let mockTranscripts: TranscriptData[] = [
  {
    id: "1",
    studentId: "20190045",
    studentName: "John Doe",
    department: "Computer Engineering",
    uploadDate: "2023-05-15",
    status: "pending",
    fileName: "john_doe_transcript.pdf",
    fileSize: 1250,
  },
  {
    id: "2",
    studentId: "20190078",
    studentName: "Jane Smith",
    department: "Computer Engineering",
    uploadDate: "2023-05-14",
    status: "processed",
    fileName: "jane_smith_transcript.pdf",
    fileSize: 980,
  },
  {
    id: "3",
    studentId: "20190023",
    studentName: "Mike Johnson",
    department: "Computer Engineering",
    uploadDate: "2023-05-13",
    status: "rejected",
    fileName: "mike_johnson_transcript.pdf",
    fileSize: 1100,
  },
];

// Mock data for dashboard statistics
const mockDashboardStats = {
  graduatesCount: 23,
  graduationDate: "2023-06-15",
};

// Function to fetch notifications (simulated API call)
export const getNotificationsMock = async (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNotifications);
    }, 500);
  });
};

// Function to fetch graduation requests (simulated API call)
export const getGraduationRequestsMock = async (): Promise<
  GraduationRequest[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGraduationRequests);
    }, 500);
  });
};

// Function to fetch student rankings by department (simulated API call)
export const getStudentRankingsMock = async (
  department: string
): Promise<StudentRanking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStudentRankings[department] || []);
    }, 500);
  });
};

// Function to update student ranking (simulated API call)
export const updateStudentRankingMock = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would update the database
      resolve(student);
    }, 500);
  });
};

// Function to reorder student rankings (simulated API call)
export const reorderStudentRankingsMock = async (
  rankings: StudentRanking[]
): Promise<StudentRanking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would update the database
      resolve(rankings);
    }, 500);
  });
};

// Function to fetch transcripts (simulated API call)
export const getTranscriptsMock = async (): Promise<TranscriptData[]> => {
  return new Promise((resolve) => {
    console.log("Current mockTranscripts:", mockTranscripts);
    setTimeout(() => {
      resolve(mockTranscripts);
    }, 500);
  });
};

/**
 * Calculates GPA from an array of grade strings
 */
const calculateGPA = (grades: string[]): { gpa: number; credits: number } => {
  let totalPoints = 0;
  let validGrades = 0;

  grades.forEach((grade) => {
    if (grade in GRADE_POINTS) {
      totalPoints += GRADE_POINTS[grade];
      validGrades++;
    }
  });

  return {
    gpa: validGrades > 0 ? totalPoints / validGrades : 0,
    credits: validGrades,
  };
};

/**
 * Reads a CSV file and parses its content
 */
const readCSVFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target || !event.target.result) {
        reject(new Error("Error reading file: No file content found"));
        return;
      }

      const content = event.target.result.toString();
      if (!content.trim()) {
        reject(new Error("CSV file is empty"));
        return;
      }

      resolve(content);
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
};

/**
 * Parses CSV content into course data
 */
const parseCSVContent = (csvContent: string): CourseInfo[] => {
  const lines = csvContent.split("\n");

  if (lines.length < 2) {
    throw new Error(
      "CSV file must contain a header row and at least one data row"
    );
  }

  // Assuming first line is header
  const header = lines[0].split(",");
  if (header.length < 6) {
    throw new Error(
      "CSV header must contain at least: StudentID, CourseCode, CourseName, Credit, Grade, Semester"
    );
  }

  // Skip header and process content lines
  const courseData: CourseInfo[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue; // Skip empty lines

    const values = lines[i].split(",");

    // Basic validation to ensure we have all required fields
    if (values.length < 6) continue;

    courseData.push({
      studentId: values[0].trim(),
      courseCode: values[1].trim(),
      courseName: values[2].trim(),
      credit: parseFloat(values[3].trim()),
      grade: values[4].trim(),
      semester: values[5].trim(),
      studentName: values[6]?.trim(), // Optional student name field
    });
  }

  return courseData;
};

/**
 * Groups course data by student ID
 */
const groupCoursesByStudent = (
  courseData: CourseInfo[]
): Record<string, CourseInfo[]> => {
  const studentCourses: Record<string, CourseInfo[]> = {};

  courseData.forEach((course) => {
    if (!studentCourses[course.studentId]) {
      studentCourses[course.studentId] = [];
    }
    studentCourses[course.studentId].push(course);
  });

  return studentCourses;
};

/**
 * Determines department based on course codes
 */
const determineDepartment = (courses: CourseInfo[]): string => {
  // Count department code frequencies
  const departmentCounts: Record<string, number> = {};

  courses.forEach((course) => {
    // Extract department code (first letters before numbers)
    const deptCode = course.courseCode.match(/^[A-Za-z]+/)?.[0] || "";
    departmentCounts[deptCode] = (departmentCounts[deptCode] || 0) + 1;
  });

  // Find most frequent department code
  let mostFrequentDept = "";
  let maxCount = 0;

  Object.entries(departmentCounts).forEach(([dept, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentDept = dept;
    }
  });

  return DEPARTMENT_MAP[mostFrequentDept] || "Computer Engineering";
};

/**
 * Creates TranscriptData objects from parsed course data
 */
const createTranscripts = (
  studentCourses: Record<string, CourseInfo[]>,
  fileName: string,
  fileSize: number
): TranscriptData[] => {
  // Create student name map
  const studentNames: Record<string, string> = {};

  Object.values(studentCourses)
    .flat()
    .forEach((course) => {
      if (course.studentName && !studentNames[course.studentId]) {
        studentNames[course.studentId] = course.studentName;
      }
    });

  // Transform to TranscriptData
  return Object.keys(studentCourses).map((studentId) => {
    const courses = studentCourses[studentId];
    const coursesCount = courses.length;
    const studentName = studentNames[studentId] || `Student ${studentId}`;
    const department = determineDepartment(courses);

    // Calculate GPA
    const grades = courses.map((c) => c.grade);
    const gpaInfo = calculateGPA(grades);

    // Generate timestamp-based ID to avoid collisions
    const timestamp = new Date().getTime();
    const uniqueId = `csv_${timestamp}_${studentId}`;

    return {
      id: uniqueId,
      studentId,
      studentName,
      department,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "pending",
      fileName,
      fileSize,
      metaInfo: `Contains ${coursesCount} courses | GPA: ${gpaInfo.gpa.toFixed(
        2
      )}`,
    };
  });
};

/**
 * Updates mock transcript data with new entries
 */
const updateMockTranscripts = (newTranscripts: TranscriptData[]): void => {
  const updatedMockTranscripts = [...newTranscripts];

  // Add existing transcripts while ensuring no ID collisions
  mockTranscripts.forEach((existingTranscript) => {
    const exists = updatedMockTranscripts.some(
      (t) =>
        t.studentId === existingTranscript.studentId &&
        t.fileName === existingTranscript.fileName
    );

    if (!exists) {
      updatedMockTranscripts.push(existingTranscript);
    }
  });

  // Update the mock data
  console.log("Previous mockTranscripts count:", mockTranscripts.length);
  mockTranscripts = updatedMockTranscripts;
  console.log("Updated mockTranscripts count:", mockTranscripts.length);
};

/**
 * Parses a CSV file containing transcript data
 */
export const parseTranscriptCSVMock = async (
  file: File
): Promise<TranscriptData[]> => {
  try {
    // Read and parse CSV content
    const csvContent = await readCSVFile(file);
    const courseData = parseCSVContent(csvContent);
    console.log("Parsed course data:", courseData);

    // Group by student and create transcripts
    const studentCourses = groupCoursesByStudent(courseData);
    console.log("Grouped student courses:", studentCourses);

    const transcripts = createTranscripts(
      studentCourses,
      file.name,
      Math.round(file.size / 1024)
    );
    console.log("Generated transcript data:", transcripts);

    // Update mock data
    updateMockTranscripts(transcripts);

    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(transcripts);
      }, 1000);
    });
  } catch (error) {
    console.error("Error parsing CSV:", error);
    throw error instanceof Error
      ? error
      : new Error("Unknown error parsing CSV");
  }
};

/**
 * Uploads a transcript file (PDF or CSV)
 */
export const uploadTranscriptMock = async (
  file: File
): Promise<TranscriptData> => {
  console.log(`Starting to process file: ${file.name} (type: ${file.type})`);

  // Check file type
  const fileType = file.name.split(".").pop()?.toLowerCase();

  // If CSV file, use the CSV parser
  if (fileType === "csv") {
    try {
      console.log("Processing as CSV file");
      const parsedTranscripts = await parseTranscriptCSVMock(file);

      // Return the first transcript for compatibility with existing code
      if (parsedTranscripts.length > 0) {
        console.log(
          `CSV processing successful, ${parsedTranscripts.length} records created`
        );
        return parsedTranscripts[0];
      }
    } catch (error) {
      console.error("Error processing CSV:", error);
      throw error instanceof Error
        ? error
        : new Error("Unknown error processing CSV");
    }
  }

  // If PDF file, process it (this is a placeholder and should be implemented)
  throw new Error("PDF processing not implemented");
};
