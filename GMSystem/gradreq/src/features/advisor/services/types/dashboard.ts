import type { Notification } from "../../../../core/types/common.types";

// Dashboard stats interface
export interface DashboardStats {
  totalStudents: number;
  pendingGraduation: number;
  manualCheckRequests: number;
  totalPetitions: number;
}

// Alert interface
export interface Alert {
  id: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
}

// Pending request interface
export interface PendingRequest {
  id: string;
  studentName: string;
  requestType: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

// Manual check request interface
export interface ManualCheckRequest {
  id: string;
  student: string;
  studentId: string;
  date: string;
  reason: string;
  status: 'Pending' | 'In Review' | 'Completed' | 'Rejected';
  notes: string;
  priority: 'low' | 'medium' | 'high';
}

// Dashboard response interface
export interface DashboardData {
  stats: DashboardStats;
  alerts: Alert[];
  notifications: Notification[];
  pendingRequests: PendingRequest[];
}
