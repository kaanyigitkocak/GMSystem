import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
  Student,
  CertificateType,
  UniversityRanking,
  GraduationDecision,
  CourseInfo,
} from "../types";
import { calculateGPA, determineDepartment } from "../utils/serviceUtils";

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
  ],
};

// Mock data for transcripts
let mockTranscripts: TranscriptData[] = [
  {
    id: "t1",
    studentId: "20190045",
    studentName: "John Doe",
    department: "Computer Engineering",
    uploadDate: "2023-05-10",
    status: "processed",
    fileName: "john_doe_transcript.csv",
    fileSize: 45678,
    metaInfo: "Contains 32 courses | GPA: 3.85",
  },
  {
    id: "t2",
    studentId: "20190078",
    studentName: "Jane Smith",
    department: "Computer Engineering",
    uploadDate: "2023-05-11",
    status: "processed",
    fileName: "jane_smith_transcript.csv",
    fileSize: 42567,
    metaInfo: "Contains 30 courses | GPA: 3.75",
  },
];

// Certificate types
const certificateTypes: CertificateType[] = [
  {
    id: "1",
    name: "Graduation Certificate",
    description: "Official graduation certificate",
  },
  { id: "2", name: "Diploma", description: "Official diploma" },
  { id: "3", name: "Transcript", description: "Official transcript" },
];

// Students data
const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    studentId: "2020123001",
    department: "Computer Engineering",
    faculty: "Engineering",
    gpa: 3.75,
    graduationStatus: "Eligible",
    certificateStatus: [
      { certificateId: "1", status: "Ready", issueDate: "2023-06-15" },
      { certificateId: "2", status: "Processing", issueDate: null },
      { certificateId: "3", status: "Ready", issueDate: "2023-06-10" },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    studentId: "2020123002",
    department: "Computer Engineering",
    faculty: "Engineering",
    gpa: 3.95,
    graduationStatus: "Eligible",
    certificateStatus: [
      { certificateId: "1", status: "Ready", issueDate: "2023-06-15" },
      { certificateId: "2", status: "Ready", issueDate: "2023-06-20" },
      { certificateId: "3", status: "Ready", issueDate: "2023-06-10" },
    ],
  },
];

// University rankings data
const universityRankings: UniversityRanking[] = [
  {
    id: "1",
    year: "2023",
    department: "Computer Engineering",
    faculty: "Engineering",
    students: [
      { id: "1", name: "Jane Smith", gpa: 3.95, rank: 1 },
      { id: "2", name: "John Doe", gpa: 3.75, rank: 2 },
    ],
  },
];

// Graduation decisions data
const graduationDecisions: GraduationDecision[] = [
  {
    id: "1",
    meetingDate: "2023-06-01",
    decisionNumber: "GD-2023-001",
    faculty: "Engineering",
    department: "Computer Engineering",
    academicYear: "2022-2023",
    semester: "Spring",
    students: [
      {
        id: "1",
        name: "John Doe",
        studentId: "2020123001",
        status: "Approved",
      },
      {
        id: "2",
        name: "Jane Smith",
        studentId: "2020123002",
        status: "Approved",
      },
    ],
  },
];

// Mock functions

// Notification services
export const getNotificationsMock = async (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockNotifications]);
    }, 500);
  });
};

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

// Graduation requests service
export const getGraduationRequestsMock = async (): Promise<
  GraduationRequest[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockGraduationRequests]);
    }, 500);
  });
};

// Student rankings service
export const getStudentRankingsMock = async (
  department: string
): Promise<StudentRanking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStudentRankings[department] || []);
    }, 500);
  });
};

export const updateStudentRankingMock = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const department = student.department;
      const index = mockStudentRankings[department]?.findIndex(
        (s) => s.id === student.id
      );

      if (department && index !== undefined && index !== -1) {
        mockStudentRankings[department][index] = { ...student };
      }

      resolve(student);
    }, 400);
  });
};

// Transcript services
export const getTranscriptsMock = async (): Promise<TranscriptData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockTranscripts]);
    }, 500);
  });
};

export const deleteTranscriptMock = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockTranscripts = mockTranscripts.filter((t) => t.id !== id);
      resolve(true);
    }, 300);
  });
};

export const processTranscriptMock = async (
  id: string
): Promise<TranscriptData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const transcript = mockTranscripts.find((t) => t.id === id);
      if (!transcript) {
        reject(new Error("Transcript not found"));
        return;
      }

      transcript.status = "processed";
      resolve({ ...transcript });
    }, 700);
  });
};

// Certificate services
export const getCertificateTypesMock = async (): Promise<CertificateType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...certificateTypes]);
    }, 300);
  });
};

// Student services
export const getStudentsMock = async (): Promise<Student[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...students]);
    }, 400);
  });
};

export const getStudentByIdMock = async (
  id: string
): Promise<Student | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const student = students.find((s) => s.id === id);
      resolve(student);
    }, 300);
  });
};

export const updateCertificateStatusMock = async (
  studentId: string,
  certificateId: string,
  status: string,
  issueDate: string | null
): Promise<Student | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const student = students.find((s) => s.id === studentId);
      if (student) {
        const certStatus = student.certificateStatus.find(
          (c) => c.certificateId === certificateId
        );
        if (certStatus) {
          certStatus.status = status;
          certStatus.issueDate = issueDate;
        }
      }
      resolve(student);
    }, 400);
  });
};

// University rankings services
export const getUniversityRankingsMock = async (): Promise<
  UniversityRanking[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...universityRankings]);
    }, 500);
  });
};

// Graduation decisions services
export const getGraduationDecisionsMock = async (): Promise<
  GraduationDecision[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...graduationDecisions]);
    }, 400);
  });
};
