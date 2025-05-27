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

// Graduation Process Status Enum (Backend'den gelen enum)
export enum GraduationProcessStatus {
  AWAITING_DEPT_SECRETARY_TRANSCRIPT_UPLOAD = 1,
  TRANSCRIPT_PARSE_SUCCESSFUL_PENDING_ADVISOR_CHECK = 3,
  TRANSCRIPT_PARSE_ERROR_AWAITING_REUPLOAD = 4,
  ADVISOR_ELIGIBLE = 5,
  ADVISOR_NOT_ELIGIBLE = 6,
  DEPT_SECRETARY_APPROVED_PENDING_DEAN = 8,
  DEPT_SECRETARY_REJECTED_PROCESS = 9,
  DEANS_OFFICE_APPROVED = 11,
  DEANS_OFFICE_REJECTED = 12,
  STUDENT_AFFAIRS_APPROVED = 14,
  STUDENT_AFFAIRS_REJECTED = 15,
  COMPLETED_GRADUATED = 18,
  PROCESS_TERMINATED_BY_ADMIN = 19,
}
