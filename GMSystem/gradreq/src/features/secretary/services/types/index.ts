// Common interfaces for both mock and API services
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  date: string;
  createdAt?: string;
}

export interface GraduationRequest {
  id: string;
  studentId: string;
  studentName: string;
  requestType: string;
  status: string;
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
  status: string;
  fileName: string;
  fileSize: number;
  metaInfo?: string;
  // Additional fields for İYTE transcript format
  tcKimlikNo?: string;
  ogrenciNo?: string;
  program?: string;
  egitimDuzeyi?: string;
  egitimDili?: string;
  mezuniyetTarihi?: string;
  kayitSekli?: string;
  kayitTarihi?: string;
  gpa?: string;
  totalCredits?: string;
  faculty?: string;
}

// Dashboard stats interface
export interface DashboardStats {
  graduatesCount: number;
  graduationDate: string;
  totalStudents?: number;
  eligibleStudents?: number;
  ineligibleStudents?: number;
  pendingChecks?: number;
}

// Interface for creating student from parsed transcript
export interface CreateStudentFromTranscriptRequest {
  // User fields
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  // Student fields
  studentNumber: string;
  departmentId: string;
  programName: string;
  enrollDate: string;
  currentGpa?: number;
  currentEctsCompleted?: number;
}

// Interface for creating transcript data
export interface CreateTranscriptDataRequest {
  studentUserId: string;
  sourceDocumentId: string;
  parsingDate: string;
  parsedGpa: number;
  parsedEcts: number;
  isValidForProcessing: boolean;
}

// Transcript processing interfaces
export interface TranscriptEntryDetails {
  studentId: string;
  studentName: string;
  department: string;
  gpa: number;
  courses: Array<{
    courseCode: string;
    courseName: string;
    credit: number;
    grade: string;
    semester: string;
  }>;
  rawData: any;
}

export interface StudentConflict {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  fileName?: string;
  conflictingEntries: TranscriptEntryDetails[];
}

export interface UploadProcessingResult {
  successfullyAddedTranscripts: TranscriptData[];
  detectedConflicts: StudentConflict[];
}

// Service configuration interface
export interface ServiceConfig {
  apiBaseUrl: string;
  useMock: boolean;
}

// Interface for student transcript data - adapted for secretary needs
export interface StudentTranscript {
  studentId: string;
  studentName: string;
  department: string;
  faculty: string;
  gpa: number;
  totalCredits: number;
  graduationEligible: boolean;
  courses: Array<{
    courseCode: string;
    courseName: string;
    credit: number;
    grade: string;
    semester: string;
    courseType:
      | "Mandatory"
      | "Technical Elective"
      | "Non-Technical Elective"
      | "Other";
  }>;
  graduationRequirements: {
    mandatoryCredits: { required: number; completed: number };
    technicalElectives: { required: number; completed: number };
    nonTechnicalElectives: { required: number; completed: number };
    totalRequired: number;
  };
}
