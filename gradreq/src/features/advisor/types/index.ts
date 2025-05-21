// Common types for the advisor feature

export interface Student {
  id: number;
  studentId: string;
  name: string;
  surname: string;
  department: string;
  gpa: number;
  academicStatus: string;
}

export interface ManualCheckRequest {
  id: number;
  studentId: string;
  studentName: string;
  requestType: string;
  date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'reviewing';
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
}

export interface UpcomingDeadline {
  id: number;
  title: string;
  date: string;
  description: string;
}

export interface AdvisorStatistics {
  totalStudents: number;
  pendingGraduations: number;
  manualCheckRequests: number;
}

export interface PetitionType {
  id: number;
  name: string;
  description: string;
}

export interface Petition {
  id: number;
  studentId: string;
  studentName: string;
  type: string;
  date: string;
  content: string;
  status: 'draft' | 'submitted' | 'processed';
}
