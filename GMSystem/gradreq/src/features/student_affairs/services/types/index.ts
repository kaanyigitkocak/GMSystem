// Types for student affairs feature

// Eligibility check types
export enum EligibilityCheckType {
  GPA = 1,
  TOTAL_ECTS = 2,
  MANDATORY_COURSES = 3,
  TECHNICAL_ELECTIVES = 4,
  NON_TECHNICAL_ELECTIVES = 5,
  UNIVERSITY_ELECTIVES = 6,
  FAILED_COURSE_LIMIT = 7,
}

export interface EligibilityCheckResult {
  id: string;
  processId: string;
  checkType: EligibilityCheckType;
  isMet: boolean;
  actualValue: string;
  requiredValue: string;
  notesOrMissingItems: string | null;
  checkDate: string;
}

export interface EligibilityCheckResponse {
  items: EligibilityCheckResult[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  date: string;
}

export interface GraduationRequest {
  id: string;
  studentId: string;
  studentName: string;
  requestType: string;
  status: string;
  date: string;
  notes: string;
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
  status: string;
  fileName: string;
  fileSize: number;
  metaInfo?: string;
}

export interface CertificateType {
  id: string;
  name: string;
  description: string;
}

export interface CertificateStatus {
  certificateId: string;
  status: string;
  issueDate: string | null;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  department: string;
  faculty: string;
  gpa: number;
  graduationStatus: string;
  certificateStatus: CertificateStatus[];
  eligibilityResults?: EligibilityCheckResult[];
  isEligible?: boolean;
}

export interface GraduationDecision {
  id: string;
  meetingDate: string;
  decisionNumber: string;
  faculty: string;
  department: string;
  academicYear: string;
  semester: string;
  students: {
    id: string;
    name: string;
    studentId: string;
    status: string;
  }[];
}

// Course information interface to represent parsed CSV data
export interface CourseInfo {
  studentId: string;
  studentName?: string;
  courseCode: string;
  courseName: string;
  credit: number;
  grade: string;
  semester: string;
}
