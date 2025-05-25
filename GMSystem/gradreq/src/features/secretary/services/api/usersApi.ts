import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../utils/serviceUtils";

// Get service configuration
const { apiBaseUrl } = getServiceConfig();

// Default fetch options
const fetchOptions = {
  mode: "cors" as RequestMode,
  headers: {
    "Content-Type": "application/json",
  },
};

// User data interface for GetFromAuth endpoint - matching advisor's interface
export interface UserFromAuth {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  userRole: string;
  studentNumber?: string | null;
  currentGpa?: number | null;
  currentEctsCompleted?: number | null;
  staffIdentificationNumber?: string;
  title?: string;
  departmentId: string;
  departmentName: string;
  facultyId: string;
  facultyName: string;
}

// Get current user from auth token
export const getUserFromAuthApi = async (): Promise<UserFromAuth> => {
  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    const response = await fetch(`${apiBaseUrl}/Users/GetFromAuth`, {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await handleApiResponse<UserFromAuth>(response);
    return data;
  } catch (error) {
    console.error("Failed to get user from auth:", error);
    throw new ServiceError("Failed to get current user information");
  }
};
