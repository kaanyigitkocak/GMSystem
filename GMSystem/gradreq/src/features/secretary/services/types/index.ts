// Common interfaces for both mock and API services
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
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
