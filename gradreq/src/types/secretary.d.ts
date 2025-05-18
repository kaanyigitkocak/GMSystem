export interface TranscriptFile {
  id: string;
  fileName: string;
  uploadDate: string;
  status: "processing" | "completed" | "failed";
  error?: string;
}

export interface StudentGraduationData {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  gpa: number;
  totalCredits: number;
  meetsRequirements: boolean;
  details?: {
    missingCourses?: string[];
    missingCredits?: number;
    otherIssues?: string[];
  };
}

export interface RankingListItem extends StudentGraduationData {
  rank: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  date: string;
  read: boolean;
  source: "student_affairs" | "advisor" | "student" | "system";
  relatedId?: string;
}

export interface GraduationRequest {
  id: string;
  studentId: string;
  studentName: string;
  advisorId: string;
  advisorName: string;
  requestDate: string;
  status: "pending" | "processing" | "approved" | "rejected";
}
