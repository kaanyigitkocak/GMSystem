export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  date: string;
}

export interface GraduationRequest {
  id: string;
  studentId: string;
  studentName: string;
  requestType: string;
  status: "pending" | "approved" | "rejected";
  date: string;
  notes?: string;
}

export interface StudentRanking {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  gpa: number;
  graduationDate: string;
  ranking: number;
}

export interface TranscriptData {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  uploadDate: string;
  status: "pending" | "processed" | "rejected";
  fileName?: string;
  fileSize?: number;
  metaInfo?: string;
}
