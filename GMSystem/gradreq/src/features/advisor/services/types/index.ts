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

// Types for graduation process
export interface GraduationProcess {
  id: string;
  status: number;
  academicTerm: string;
  creationDate: string;
  lastUpdateDate: string;
  notes?: string | null;
  advisorUserId?: string | null;
  advisorReviewDate?: string | null;
  deptSecretaryUserId?: string | null;
  deptSecretaryReviewDate?: string | null;
  deansOfficeUserId?: string | null;
  deansOfficeReviewDate?: string | null;
  studentAffairsUserId?: string | null;
  studentAffairsReviewDate?: string | null;
}

// Types for student data
export interface Student {
  id: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
  name: string; // Computed property: firstName + lastName
  email: string;
  departmentId: string;
  departmentName: string;
  department: string; // Alias for departmentName
  facultyId: string;
  facultyName: string;
  programName: string;
  enrollDate: string;
  currentGpa: number;
  gpa: number; // Alias for currentGpa
  currentEctsCompleted: number;
  graduationStatus: GraduationProcessStatus;
  status: string; // String representation of graduationStatus
  assignedAdvisorUserId: string | null;
  activeGraduationProcessId: string | null;
  activeGraduationProcessStatus: GraduationProcessStatus | null;
  activeGraduationProcessAcademicTerm: string | null;
  activeGraduationProcessInitiationDate: string | null;
  activeGraduationProcessLastUpdateDate: string | null;
  eligibilityStatus?: StudentEligibilityStatus;
  graduationProcess?: GraduationProcess; // Optional graduation process details
  phone?: string; // Optional phone number
  lastMeeting?: string; // Optional last meeting date
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
export type PetitionStudent = Pick<
  Student,
  "id" | "firstName" | "lastName" | "name" | "departmentName"
>;

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
