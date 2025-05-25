// Types for advisor feature

// Types for notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  date: string;
}

// Types for eligibility checks
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

export interface StudentEligibilityStatus {
  studentId: string;
  hasResults: boolean;
  isEligible: boolean;
  eligibilityChecks: EligibilityCheckResult[];
  lastCheckDate?: string;
}

// Types for student data
export interface Student {
  id: string;
  name: string;
  department: string;
  gpa: string;
  status:
    | "Normal Öğrenim"
    | "Şartlı Geçme"
    | "Mezuniyet Aşaması"
    | "Mezun"
    | "Ayrıldı";
  email?: string;
  phone?: string;
  lastMeeting?: string;
  studentNumber?: string;
  ectsCompleted?: number;
  enrollDate?: string;
  graduationStatus?: number;
  eligibilityStatus?: StudentEligibilityStatus;
}

// Types for course taken data
export interface CourseTaken {
  id: string;
  studentUserId: string;
  courseCodeInTranscript: string;
  courseNameInTranscript: string;
  matchedCourseId: string;
  grade: string;
  semesterTaken: string;
  creditsEarned: number;
  isSuccessfullyCompleted: boolean;
}

// Types for petition
export type PetitionStudent = Pick<Student, "id" | "name" | "department">;

export interface PetitionData {
  type: string;
  studentId: string;
  content: string;
}

export interface PetitionResult {
  id: string;
  type: string;
  studentId: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

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
