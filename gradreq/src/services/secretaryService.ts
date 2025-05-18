import type {
  TranscriptFile,
  StudentGraduationData,
  RankingListItem,
  Notification,
  GraduationRequest,
} from "../types/secretary";

// Mock data and simulation functions for development
// These would be replaced with actual API calls in production

// Upload transcript files
export const uploadTranscripts = async (
  files: File[]
): Promise<TranscriptFile[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response
  return files.map((file, index) => ({
    id: `file-${Date.now()}-${index}`,
    fileName: file.name,
    uploadDate: new Date().toISOString(),
    status: "processing",
  }));
};

// Check graduation requirements
export const checkGraduationRequirements = async (
  fileIds: string[]
): Promise<StudentGraduationData[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock response
  return [
    {
      id: "1",
      studentId: "2020123456",
      studentName: "Ahmet Yılmaz",
      department: "Computer Engineering",
      gpa: 3.75,
      totalCredits: 145,
      meetsRequirements: true,
    },
    {
      id: "2",
      studentId: "2019123457",
      studentName: "Ayşe Demir",
      department: "Computer Engineering",
      gpa: 3.45,
      totalCredits: 142,
      meetsRequirements: true,
    },
    {
      id: "3",
      studentId: "2020123458",
      studentName: "Mehmet Kaya",
      department: "Computer Engineering",
      gpa: 2.85,
      totalCredits: 130,
      meetsRequirements: false,
      details: {
        missingCredits: 10,
        missingCourses: ["CSE4062", "CSE4082"],
      },
    },
  ];
};

// Generate department ranking
export const generateDepartmentRanking = async (
  studentDataIds: string[]
): Promise<RankingListItem[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock response - students ranked by GPA
  return [
    {
      id: "1",
      studentId: "2020123456",
      studentName: "Ahmet Yılmaz",
      department: "Computer Engineering",
      gpa: 3.75,
      totalCredits: 145,
      meetsRequirements: true,
      rank: 1,
    },
    {
      id: "2",
      studentId: "2019123457",
      studentName: "Ayşe Demir",
      department: "Computer Engineering",
      gpa: 3.45,
      totalCredits: 142,
      meetsRequirements: true,
      rank: 2,
    },
  ];
};

// Export results to file
export const exportResultsToFile = async (
  data: StudentGraduationData[] | RankingListItem[],
  fileType: "csv" | "xlsx" | "pdf"
): Promise<string> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock response - return a download URL
  return `https://example.com/downloads/${Date.now()}.${fileType}`;
};

// Get notifications
export const getNotifications = async (): Promise<Notification[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock response
  return [
    {
      id: "1",
      title: "Graduation Process Started",
      message:
        "Student Affairs has started the graduation process for the Spring 2023 semester.",
      type: "info",
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: true,
      source: "student_affairs",
    },
    {
      id: "2",
      title: "Missing Transcript",
      message:
        "Advisor Prof. Dr. Ali Can reported missing transcript for student 2020123459.",
      type: "warning",
      date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: false,
      source: "advisor",
      relatedId: "2020123459",
    },
    {
      id: "3",
      title: "System Error",
      message:
        "Error processing transcript for student 2019123460. Please check file format.",
      type: "error",
      date: new Date().toISOString(),
      read: false,
      source: "system",
      relatedId: "2019123460",
    },
  ];
};

// Mark notification as read
export const markNotificationAsRead = async (
  notificationId: string
): Promise<void> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  console.log(`Marking notification ${notificationId} as read`);
  // API call would be here
};

// Get pending graduation requests from advisors
export const getGraduationRequests = async (): Promise<GraduationRequest[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Mock response
  return [
    {
      id: "1",
      studentId: "2020123456",
      studentName: "Ahmet Yılmaz",
      advisorId: "A001",
      advisorName: "Prof. Dr. Ali Can",
      requestDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: "pending",
    },
    {
      id: "2",
      studentId: "2019123457",
      studentName: "Ayşe Demir",
      advisorId: "A002",
      advisorName: "Doç. Dr. Zeynep Kara",
      requestDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      status: "pending",
    },
  ];
};
