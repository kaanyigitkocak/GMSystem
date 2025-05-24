// Dean's Office Types
export interface StudentRecord {
  id: string;
  studentId: string;
  name: string;
  surname: string;
  department: string;
  faculty: string;
  gpa: number;
  totalCredits: number;
  completedCredits: number;
  rank?: number;
  graduationEligible: boolean;
  transcriptStatus: "pending" | "approved" | "rejected";
  submissionDate: string;
  reviewDate?: string;
  reviewNote?: string;
}

export interface UniversityRankingResult {
  rankings: StudentRecord[];
  metadata: {
    totalStudents: number;
    pendingReviews: number;
    approvedStudents: number;
    rejectedStudents: number;
    lastUpdated: string;
  };
}

export interface TranscriptReview {
  studentId: string;
  status: "approved" | "rejected";
  note?: string;
  reviewedBy: string;
  reviewDate: string;
}

export interface ApprovalAction {
  studentId: string;
  action: "approve" | "reject";
  note?: string;
}

export interface FilterOptions {
  faculty?: string;
  department?: string;
  status?: "all" | "pending" | "approved" | "rejected";
  minGpa?: number;
  maxGpa?: number;
}

export interface SortOptions {
  field: "rank" | "gpa" | "name" | "department" | "submissionDate";
  direction: "asc" | "desc";
}
