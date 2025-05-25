import type { Notification } from "../../../../core/types/common.types";

// Dashboard stats interface
export interface DashboardStats {
  totalStudents: number;
  pendingGraduation: number;
  totalPetitions: number;
}

// Alert interface
export interface Alert {
  id: string;
  message: string;
  type?: "info" | "warning" | "error" | "success";
}

// Pending request interface
export interface PendingRequest {
  id: string;
  studentName: string;
  requestType: string;
  date: string;
  priority: "low" | "medium" | "high";
}

// Dashboard response interface
export interface DashboardData {
  stats: DashboardStats;
  alerts: Alert[];
  notifications: Notification[];
  pendingRequests: PendingRequest[];
}
