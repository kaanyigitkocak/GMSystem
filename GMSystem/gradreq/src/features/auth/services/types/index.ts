import { UserType } from "../../types";

// Types for user authentication
export interface User {
  id: string;
  email: string;
  role: UserType;
  name: string;
  department?: string;
  facultyId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Service configuration interface (to match common pattern)
export interface ServiceConfig {
  apiBaseUrl: string;
  useMock: boolean;
}
