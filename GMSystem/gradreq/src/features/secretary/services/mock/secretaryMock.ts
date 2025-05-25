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
    createdAt: "2023-05-15T10:30:00",
  },
  {
    id: "n2",
    title: "Transcript Processing Complete",
    message: "Jane Smith's transcript has been processed successfully.",
    type: "success",
    read: false,
    date: "2023-05-14T16:45:00",
    createdAt: "2023-05-14T16:45:00",
  },
  {
    id: "n3",
    title: "Missing Documents",
    message: "Mike Johnson is missing disengagement certificates.",
    type: "warning",
    read: false,
    date: "2023-05-13T09:15:00",
    createdAt: "2023-05-13T09:15:00",
  },
  {
    id: "n4",
    title: "System Notification",
    message: "The graduation approval deadline is approaching (May 30).",
    type: "info",
    read: true,
    date: "2023-05-12T14:20:00",
    createdAt: "2023-05-12T14:20:00",
  },
  {
    id: "n5",
    title: "Error in Transcript",
    message: "Error found in Emily Brown's transcript - missing courses.",
    type: "error",
    read: true,
    date: "2023-05-11T11:05:00",
    createdAt: "2023-05-11T11:05:00",
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
      gpa: 3.95,
      graduationDate: "2024-06-15",
      ranking: 1,
    },
    {
      id: "102",
      studentId: "2019510042",
      studentName: "Ayşe Demir",
      department: "Test Department",
      gpa: 3.89,
      graduationDate: "2024-06-15",
      ranking: 2,
    },
    {
      id: "103",
      studentId: "2019510036",
      studentName: "Mehmet Kaya",
      department: "Test Department",
      gpa: 3.84,
      graduationDate: "2024-06-15",
      ranking: 3,
    },
    {
      id: "104",
      studentId: "2019510078",
      studentName: "Zeynep Şahin",
      department: "Test Department",
      gpa: 3.79,
      graduationDate: "2024-06-15",
      ranking: 4,
    },
    {
      id: "105",
      studentId: "2019510089",
      studentName: "Can Özkan",
      department: "Test Department",
      gpa: 3.74,
      graduationDate: "2024-06-15",
      ranking: 5,
    },
    {
      id: "106",
      studentId: "2019510123",
      studentName: "Elif Güner",
      department: "Test Department",
      gpa: 3.68,
      graduationDate: "2024-06-15",
      ranking: 6,
    },
    {
      id: "107",
      studentId: "2019510067",
      studentName: "Burak Arslan",
      department: "Test Department",
      gpa: 3.62,
      graduationDate: "2024-06-15",
      ranking: 7,
    },
    {
      id: "108",
      studentId: "2019510145",
      studentName: "Selin Yurt",
      department: "Test Department",
      gpa: 3.58,
      graduationDate: "2024-06-15",
      ranking: 8,
    },
    {
      id: "109",
      studentId: "2019510156",
      studentName: "Emre Çelik",
      department: "Test Department",
      gpa: 3.53,
      graduationDate: "2024-06-15",
      ranking: 9,
    },
    {
      id: "110",
      studentId: "2019510178",
      studentName: "Gizem Aydın",
      department: "Test Department",
      gpa: 3.47,
      graduationDate: "2024-06-15",
      ranking: 10,
    },
    {
      id: "111",
      studentId: "2019510199",
      studentName: "Tolga Şen",
      department: "Test Department",
      gpa: 3.42,
      graduationDate: "2024-06-15",
      ranking: 11,
    },
    {
      id: "112",
      studentId: "2019510211",
      studentName: "Deniz Korkmaz",
      department: "Test Department",
      gpa: 3.38,
      graduationDate: "2024-06-15",
      ranking: 12,
    },
    {
      id: "113",
      studentId: "2019510234",
      studentName: "Ozan Balcı",
      department: "Test Department",
      gpa: 3.33,
      graduationDate: "2024-06-15",
      ranking: 13,
    },
    {
      id: "114",
      studentId: "2019510256",
      studentName: "Merve Akbaş",
      department: "Test Department",
      gpa: 3.28,
      graduationDate: "2024-06-15",
      ranking: 14,
    },
    {
      id: "115",
      studentId: "2019510278",
      studentName: "Kemal Doğan",
      department: "Test Department",
      gpa: 3.24,
      graduationDate: "2024-06-15",
      ranking: 15,
    },
    {
      id: "116",
      studentId: "2019510289",
      studentName: "Pınar Özdemir",
      department: "Test Department",
      gpa: 3.19,
      graduationDate: "2024-06-15",
      ranking: 16,
    },
    {
      id: "117",
      studentId: "2019510301",
      studentName: "Murat Sezer",
      department: "Test Department",
      gpa: 3.15,
      graduationDate: "2024-06-15",
      ranking: 17,
    },
    {
      id: "118",
      studentId: "2019510324",
      studentName: "İrem Kaplan",
      department: "Test Department",
      gpa: 3.11,
      graduationDate: "2024-06-15",
      ranking: 18,
    },
    {
      id: "119",
      studentId: "2019510345",
      studentName: "Berkay Tunç",
      department: "Test Department",
      gpa: 3.07,
      graduationDate: "2024-06-15",
      ranking: 19,
    },
    {
      id: "120",
      studentId: "2019510367",
      studentName: "Ezgi Çakır",
      department: "Test Department",
      gpa: 3.02,
      graduationDate: "2024-06-15",
      ranking: 20,
    },
    {
      id: "121",
      studentId: "2019510389",
      studentName: "Arda Yıldız",
      department: "Test Department",
      gpa: 2.98,
      graduationDate: "2024-06-15",
      ranking: 21,
    },
    {
      id: "122",
      studentId: "2019510412",
      studentName: "Neslihan Koca",
      department: "Test Department",
      gpa: 2.94,
      graduationDate: "2024-06-15",
      ranking: 22,
    },
    {
      id: "123",
      studentId: "2019510435",
      studentName: "Serkan Polat",
      department: "Test Department",
      gpa: 2.89,
      graduationDate: "2024-06-15",
      ranking: 23,
    },
    {
      id: "124",
      studentId: "2019510458",
      studentName: "Başak Öz",
      department: "Test Department",
      gpa: 2.85,
      graduationDate: "2024-06-15",
      ranking: 24,
    },
    {
      id: "125",
      studentId: "2019510481",
      studentName: "Görkem Erdem",
      department: "Test Department",
      gpa: 2.81,
      graduationDate: "2024-06-15",
      ranking: 25,
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
  // Test Department transcripts
  {
    id: "101",
    studentId: "2019510001",
    studentName: "Ahmet Yılmaz",
    department: "Test Department",
    uploadDate: "2024-05-20",
    status: "processed",
    fileName: "ahmet_yilmaz_transcript.pdf",
    fileSize: 1350,
  },
  {
    id: "102",
    studentId: "2019510042",
    studentName: "Ayşe Demir",
    department: "Test Department",
    uploadDate: "2024-05-19",
    status: "processed",
    fileName: "ayse_demir_transcript.pdf",
    fileSize: 1280,
  },
  {
    id: "103",
    studentId: "2019510036",
    studentName: "Mehmet Kaya",
    department: "Test Department",
    uploadDate: "2024-05-18",
    status: "pending",
    fileName: "mehmet_kaya_transcript.pdf",
    fileSize: 1190,
  },
  {
    id: "104",
    studentId: "2019510078",
    studentName: "Zeynep Şahin",
    department: "Test Department",
    uploadDate: "2024-05-17",
    status: "processed",
    fileName: "zeynep_sahin_transcript.pdf",
    fileSize: 1420,
  },
  {
    id: "105",
    studentId: "2019510089",
    studentName: "Can Özkan",
    department: "Test Department",
    uploadDate: "2024-05-16",
    status: "pending",
    fileName: "can_ozkan_transcript.pdf",
    fileSize: 1310,
  },
  {
    id: "106",
    studentId: "2019510123",
    studentName: "Elif Güner",
    department: "Test Department",
    uploadDate: "2024-05-15",
    status: "processed",
    fileName: "elif_guner_transcript.pdf",
    fileSize: 1270,
  },
  {
    id: "107",
    studentId: "2019510067",
    studentName: "Burak Arslan",
    department: "Test Department",
    uploadDate: "2024-05-14",
    status: "processed",
    fileName: "burak_arslan_transcript.pdf",
    fileSize: 1390,
  },
  {
    id: "108",
    studentId: "2019510145",
    studentName: "Selin Yurt",
    department: "Test Department",
    uploadDate: "2024-05-13",
    status: "pending",
    fileName: "selin_yurt_transcript.pdf",
    fileSize: 1250,
  },
  {
    id: "109",
    studentId: "2019510156",
    studentName: "Emre Çelik",
    department: "Test Department",
    uploadDate: "2024-05-12",
    status: "processed",
    fileName: "emre_celik_transcript.pdf",
    fileSize: 1330,
  },
  {
    id: "110",
    studentId: "2019510178",
    studentName: "Gizem Aydın",
    department: "Test Department",
    uploadDate: "2024-05-11",
    status: "processed",
    fileName: "gizem_aydin_transcript.pdf",
    fileSize: 1180,
  },
];

// Mock function for getting user data
export const getUserFromAuthMock = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "secretary-mock-id",
        firstName: "Test",
        lastName: "Secretary",
        email: "secretary@example.com",
        createdDate: "2023-01-01T00:00:00",
        updatedDate: "2023-01-01T00:00:00",
      });
    }, 200);
  });
};

// Function to fetch notifications (simulated API call)
export const getNotificationsMock = async (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNotifications);
    }, 500);
  });
};

// Function to mark notification as read (simulated API call)
export const markNotificationAsReadMock = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const notification = mockNotifications.find((n) => n.id === id);
      if (notification) {
        notification.read = true;
      }
      resolve();
    }, 300);
  });
};

// Function to mark all notifications as read (simulated API call)
export const markAllNotificationsAsReadMock = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockNotifications.forEach((n) => {
        n.read = true;
      });
      resolve();
    }, 300);
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

// Mock function for updating graduation request status
export const updateGraduationRequestStatusMock = async (
  id: string,
  status: string,
  notes?: string
): Promise<GraduationRequest> => {
  console.log(
    `Mock: Updating graduation request ${id} to status ${status} with notes: ${notes}`
  );
  const requestIndex = mockGraduationRequests.findIndex((req) => req.id === id);
  if (requestIndex === -1) {
    throw new Error("Mock: Graduation request not found");
  }
  mockGraduationRequests[requestIndex] = {
    ...mockGraduationRequests[requestIndex],
    status,
    notes: notes ?? mockGraduationRequests[requestIndex].notes,
  };
  return mockGraduationRequests[requestIndex];
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
  try {
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
  } catch (error) {
    console.error("Error in mock upload:", error);
    throw new Error("Failed to upload transcript file in mock service");
  }
};

/**
 * Mock function for uploading and parsing PDF transcript
 */
export const uploadAndParsePDFTranscriptMock = async (
  file: File,
  onProgress?: (progress: number) => void // Add optional onProgress callback
): Promise<TranscriptData> => {
  console.log("Mock: Uploading and parsing PDF transcript:", file.name);
  if (onProgress) {
    onProgress(0);
    await new Promise((resolve) => setTimeout(resolve, 50));
    onProgress(25);
    await new Promise((resolve) => setTimeout(resolve, 50));
    onProgress(50);
    await new Promise((resolve) => setTimeout(resolve, 50));
    onProgress(75);
    await new Promise((resolve) => setTimeout(resolve, 50));
    onProgress(100);
  }

  try {
    // In a real implementation, this would extract data from the PDF content
    // based on the Turkish transcript format

    // Simulate extracted data from transcript (based on the example image)

    // Use data from file name, or default if not available
    const fileNameParts = file.name.split("_");
    let studentId = fileNameParts.length > 1 ? fileNameParts[0] : "20190045";
    let studentName =
      fileNameParts.length > 1
        ? fileNameParts[1]
            .split(".")[0]
            .replace(/([A-Z])/g, " $1")
            .trim()
        : "Öğrenci Adı Soyadı";

    // Create a transcript data object based on the format in the image
    const transcript: TranscriptData = {
      id: `pdf_${new Date().getTime()}`,
      studentId,
      studentName,
      department: "Bilgisayar Mühendisliği",
      uploadDate: new Date().toISOString().split("T")[0],
      status: "pending",
      fileName: file.name,
      fileSize: file.size,
      metaInfo: `AGNO: 3.64 | Kayıt Tarihi: 14.09.2021 | Fakülte: Mühendislik Fakültesi | Toplam AKTS: 258`,
    };

    // Extracted courses would include:
    // 1. Courses from the 2021-2022 Fall semester (e.g., CENG111, CENG112, etc.)
    // 2. Courses from the 2021-2022 Spring semester
    // 3. Courses from the 2022-2023 Fall semester
    // 4. Courses from the 2022-2023 Spring semester
    // 5. Courses from the 2023-2024 Fall semester
    // 6. Courses from the 2023-2024 Spring semester

    console.log("PDF parsing simulated successfully for:", studentName);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return transcript;
  } catch (error) {
    console.error("Error in mock PDF parsing:", error);
    throw new Error("Failed to parse PDF transcript in mock service");
  }
};

/**
 * Mock implementation for submitting parsed transcript data
 * Updated to handle the Turkish transcript format
 */
export const submitParsedTranscriptMock = async (
  transcriptData: TranscriptData
): Promise<TranscriptData> => {
  try {
    // Extract GPA and registration date from metaInfo if available
    let gpa = "0.00";
    let registrationDate = "";
    let faculty = "";
    let totalCredits = "";

    if (transcriptData.metaInfo) {
      const agnoMatch = transcriptData.metaInfo.match(/AGNO:\s*([\d.]+)/);
      const dateMatch = transcriptData.metaInfo.match(
        /Kayıt Tarihi:\s*([^|]+)/
      );
      const facultyMatch = transcriptData.metaInfo.match(/Fakülte:\s*([^|]+)/);
      const creditsMatch =
        transcriptData.metaInfo.match(/Toplam AKTS:\s*(\d+)/);

      if (agnoMatch) gpa = agnoMatch[1];
      if (dateMatch) registrationDate = dateMatch[1].trim();
      if (facultyMatch) faculty = facultyMatch[1].trim();
      if (creditsMatch) totalCredits = creditsMatch[1];
    }

    // In a real implementation, this would submit the transcript data to the backend
    // For the mock, we'll simulate a successful submission

    // Generate a new ID to simulate backend processing
    const submittedTranscript: TranscriptData = {
      ...transcriptData,
      id: `submitted_${new Date().getTime()}`,
      status: "processed",
      uploadDate: new Date().toISOString().split("T")[0],
      metaInfo:
        transcriptData.metaInfo ||
        `AGNO: ${gpa} | Kayıt Tarihi: ${registrationDate} | Fakülte: ${faculty} | Toplam AKTS: ${totalCredits}`,
    };

    // Create sample course data in the metaInfo to simulate a real transcript
    if (!submittedTranscript.metaInfo?.includes("Courses:")) {
      const courseSample = `
Courses: 
2021-2022 Güz: CENG111, CENG112, ENG101, MATH141, MATH144, PHYS121, PHYS122
2021-2022 Bahar: CENG212, CENG216, CENG218, HIST202
2022-2023 Güz: CENG211, CENG212, CENG315, CENG311
2022-2023 Bahar: CENG218, CENG312, CENG316, CENG318, CENG322, CENG341, MAN223
2023-2024 Güz: CENG415, CENG400, CENG411, CENG465, CENG464, SPRT211
2023-2024 Bahar: CENG416, CENG418, CENG424, CENG506, CENG464
      `;

      submittedTranscript.metaInfo += " | " + courseSample.trim();
    }

    // Add to the mock transcripts list
    updateMockTranscripts([submittedTranscript]);

    console.log(
      "Submitted transcript data for:",
      submittedTranscript.studentName
    );

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return submittedTranscript;
  } catch (error) {
    console.error("Error in mock transcript submission:", error);
    throw new Error("Failed to submit transcript data in mock service");
  }
};

/**
 * Mock implementation for deleting a transcript
 */
export const deleteTranscriptMock = async (id: string): Promise<boolean> => {
  try {
    // In a real implementation, this would delete the transcript from the backend
    // For the mock, we'll simulate a successful deletion

    // Remove from the mock transcripts list
    mockTranscripts = mockTranscripts.filter(
      (transcript) => transcript.id !== id
    );

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return true;
  } catch (error) {
    console.error("Error in mock transcript deletion:", error);
    throw new Error("Failed to delete transcript in mock service");
  }
};

/**
 * Mock implementation for processing a transcript
 */
export const processTranscriptMock = async (
  id: string
): Promise<TranscriptData> => {
  try {
    // Find the transcript in our mock data
    const transcriptIndex = mockTranscripts.findIndex(
      (transcript) => transcript.id === id
    );

    if (transcriptIndex === -1) {
      throw new Error(`Transcript with ID ${id} not found`);
    }

    // Update the transcript status
    const updatedTranscript = {
      ...mockTranscripts[transcriptIndex],
      status: "processed",
    };

    // Update the mock data
    mockTranscripts[transcriptIndex] = updatedTranscript;

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return updatedTranscript;
  } catch (error) {
    console.error("Error in mock transcript processing:", error);
    throw new Error("Failed to process transcript in mock service");
  }
};

/**
 * Mock implementation for getting dashboard stats
 */
export const getDashboardStatsMock = async (): Promise<{
  graduatesCount: number;
  graduationDate: string;
}> => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    graduatesCount: 152,
    graduationDate: "2023-06-15",
  };
};

/**
 * Mock implementation for getting eligible graduates
 */
export const getEligibleGraduatesMock = async (): Promise<TranscriptData[]> => {
  // Filter processed transcripts
  const eligibleGraduates = mockTranscripts.filter(
    (transcript) => transcript.status === "processed"
  );

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return eligibleGraduates;
};

/**
 * Mock implementation for exporting eligible graduates as CSV
 */
export const exportEligibleGraduatesCSVMock = async (): Promise<string> => {
  // Create a simple CSV header
  const csvHeader = "StudentID,StudentName,Department,GPA,Status\n";

  // Add rows for each eligible graduate
  const csvRows = mockTranscripts
    .filter((transcript) => transcript.status === "processed")
    .map(
      (transcript) =>
        `${transcript.studentId},${transcript.studentName},${transcript.department},3.5,Eligible`
    )
    .join("\n");

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return csvHeader + csvRows;
};

/**
 * Mock implementation for exporting eligible graduates as PDF
 */
export const exportEligibleGraduatesPDFMock = async (): Promise<Blob> => {
  // Create a simple text representation (would be PDF in real implementation)
  const text = `Eligible Graduates Report
Generated: ${new Date().toISOString().split("T")[0]}
Total Graduates: ${
    mockTranscripts.filter((t) => t.status === "processed").length
  }

Student List:
${mockTranscripts
  .filter((t) => t.status === "processed")
  .map((t) => `- ${t.studentId}: ${t.studentName} (${t.department})`)
  .join("\n")}
`;

  // Convert to Blob
  const blob = new Blob([text], { type: "application/pdf" });

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return blob;
};
