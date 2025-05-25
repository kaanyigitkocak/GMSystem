export interface SetDeptSecretaryRejectedRequest {
  studentUserIds: string[];
  deptSecretaryUserId: string;
  rejectionReason: string;
}

export interface ProcessSummary {
  studentUserId: string;
  success: boolean;
  message: string;
  graduationProcessId: string | null;
  newGraduationProcessStatus: string | null;
  newStudentGraduationStatus: string | null;
}

export interface SetDeptSecretaryRejectedResponse {
  totalStudentsInRequest: number;
  successfullyProcessedCount: number;
  failedToProcessCount: number;
  processSummaries: ProcessSummary[];
  overallMessage: string;
}
