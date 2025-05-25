// Common type definitions used throughout the application

// User-related types
export interface User {
  id: string;
  name: string;
  email: string;
  role:
    | "student"
    | "secretary"
    | "advisor"
    | "admin"
    | "deans_office"
    | "student_affairs";
}

// Auth-related types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// UI related types
export interface MenuItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Notification type
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  date: string;
}

// Add more common types as needed
