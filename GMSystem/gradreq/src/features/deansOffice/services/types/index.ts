// Types for deansoffice feature

// Types for notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  date: string;
}

export interface StudentRanking {
  id: string;
  rank: number;
  studentId: string;
  name: string;
  department: string;
  faculty: string;
  gpa: number;
  credits: number;
  duplicateRecords?: boolean;
  graduationEligible: boolean;
}

export interface RankingMetadata {
  totalStudents: number;
  eligibleStudents: number;
  hasDuplicates: boolean;
  mixedGraduationStatus: boolean;
  lastUpdated: Date;
}

export type FileStatus = "valid" | "invalid" | "pending";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  department: string;
  uploaded: Date;
  status: FileStatus;
  issues?: string[];
}

export interface ValidationSummary {
  validFiles: number;
  invalidFiles: number;
  totalStudents: number;
  eligibleStudents: number;
  duplicateStudents: boolean;
  mixedGraduationStatus: boolean;
}

export interface FileValidationResult {
  isValid: boolean;
  invalidReason?: string;
  studentCount: number;
  eligibleStudentCount: number;
  hasDuplicates: boolean;
  mixedGraduationStatus: boolean;
}

// Re-export common types or define DeansOffice specific types here if needed
export {
  EligibilityCheckType, // Enum olduğu için doğrudan export
} from "../../../advisor/services/types";

export type {
  Student,
  StudentEligibilityStatus,
  EligibilityCheckResult,
  CourseTaken,
} from "../../../advisor/services/types";

// Example of a DeansOffice specific type (if any in the future)
// export interface DeansOfficeSpecificData {
//   facultyId: string;
//   deanName: string;
// }

// EligibilityData tipi context içinde tanımlı olduğu için burada tekrar export etmeye gerek yok,
// ama eğer global olarak kullanılacaksa buraya taşınabilir.
// export type { EligibilityData } from '../../contexts/EligibilityContext';
