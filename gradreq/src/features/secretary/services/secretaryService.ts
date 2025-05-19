import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
} from "../types";

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
export const getNotifications = async (): Promise<Notification[]> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNotifications);
    }, 500);
  });
};

// Function to fetch graduation requests (simulated API call)
export const getGraduationRequests = async (): Promise<GraduationRequest[]> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGraduationRequests);
    }, 500);
  });
};

// Function to fetch student rankings by department (simulated API call)
export const getStudentRankings = async (
  department: string
): Promise<StudentRanking[]> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStudentRankings[department] || []);
    }, 500);
  });
};

// Function to update student ranking (simulated API call)
export const updateStudentRanking = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would update the database
      // For now, we just return the updated student
      resolve(student);
    }, 500);
  });
};

// Function to reorder student rankings (simulated API call)
export const reorderStudentRankings = async (
  rankings: StudentRanking[]
): Promise<StudentRanking[]> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would update the database
      // For now, we just return the updated rankings
      resolve(rankings);
    }, 500);
  });
};

// Function to fetch transcripts (simulated API call)
export const getTranscripts = async (): Promise<TranscriptData[]> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTranscripts);
    }, 500);
  });
};

// Function to upload transcript (simulated API call)
export const uploadTranscript = async (file: File): Promise<TranscriptData> => {
  // Simulating API delay and processing
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTranscript: TranscriptData = {
        id: (mockTranscripts.length + 1).toString(),
        studentId: "2019" + Math.floor(1000 + Math.random() * 9000).toString(),
        studentName: "New Student",
        department: "Computer Engineering",
        uploadDate: new Date().toISOString().split("T")[0],
        status: "pending",
        fileName: file.name,
        fileSize: Math.round(file.size / 1024),
      };

      // Add to mock transcripts
      mockTranscripts = [newTranscript, ...mockTranscripts];

      resolve(newTranscript);
    }, 1500);
  });
};

// Function to delete transcript (simulated API call)
export const deleteTranscript = async (id: string): Promise<boolean> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTranscripts = mockTranscripts.filter(
        (transcript) => transcript.id !== id
      );
      resolve(true);
    }, 500);
  });
};

// Function to process transcript (simulated API call)
export const processTranscript = async (
  id: string
): Promise<TranscriptData> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockTranscripts.findIndex(
        (transcript) => transcript.id === id
      );

      if (index !== -1) {
        mockTranscripts[index] = {
          ...mockTranscripts[index],
          status: "processed",
        };

        resolve(mockTranscripts[index]);
      } else {
        throw new Error("Transcript not found");
      }
    }, 1000);
  });
};

// Function to get dashboard statistics
export const getDashboardStats = async (): Promise<{
  graduatesCount: number;
  graduationDate: string;
}> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardStats);
    }, 500);
  });
};
