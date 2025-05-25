import {
  getServiceConfig,
  handleApiResponse,
  debugFetch,
} from "../../../common/utils/serviceUtils";
import { executeWithRetry } from "../../../common/utils/rateLimitUtils";

const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Helper function to get access token
const getAccessToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  return token;
};

// Helper function to create headers
const createAuthHeaders = () => {
  const token = getAccessToken();
  return {
    ...fetchOptions.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Backend response interfaces
export interface BackendStudentResponse {
  id: string;
  studentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  programName: string;
  enrollDate: string;
  currentGpa: number;
  currentEctsCompleted: number;
  graduationStatus: number;
  assignedAdvisorUserId: string;
  graduationProcess: {
    id: string;
    status: number;
    academicTerm: string;
    creationDate: string;
    lastUpdateDate: string;
    notes: string | null;
    advisorUserId: string;
    advisorReviewDate: string | null;
    deptSecretaryUserId: string | null;
    deptSecretaryReviewDate: string | null;
    deansOfficeUserId: string | null;
    deansOfficeReviewDate: string | null;
    studentAffairsUserId: string | null;
    studentAffairsReviewDate: string | null;
  };
}

// Get current student data with graduation process
export const getCurrentStudentApi =
  async (): Promise<BackendStudentResponse> => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No authentication token found. Please log in first.");
      }

      console.log("👤 Starting get current student API call...");

      // First get current user to get student ID
      const userResponse = await debugFetch(`${apiBaseUrl}/users/GetFromAuth`, {
        ...fetchOptions,
        headers: createAuthHeaders(),
      });
      const userData = (await handleApiResponse(userResponse)) as {
        id: string;
        studentNumber: string;
      };

      console.log("✅ Got user data:", {
        id: userData.id,
        studentNumber: userData.studentNumber,
      });

      // Get detailed student data with graduation process
      const studentResponse = await debugFetch(
        `${apiBaseUrl}/Students/${userData.id}`,
        {
          ...fetchOptions,
          headers: createAuthHeaders(),
        }
      );
      const studentData: BackendStudentResponse = await handleApiResponse(
        studentResponse
      );

      console.log("✅ Got student data with graduation process:", {
        id: studentData.id,
        graduationStatus: studentData.graduationStatus,
        graduationProcessStatus: studentData.graduationProcess?.status,
      });

      return studentData;
    } catch (error) {
      console.error("❌ Get current student API failed:", error);
      throw error;
    }
  };

// Get student by ID
export const getStudentByIdApi = async (studentId: string) => {
  return await executeWithRetry(async () => {
    const url = `${apiBaseUrl}/students/${studentId}`;

    console.log("🎓 Getting student by ID:", studentId);

    const options = {
      ...fetchOptions,
      headers: createAuthHeaders(),
    };

    try {
      const response = await debugFetch(url, options);
      return await handleApiResponse(response, url);
    } catch (error) {
      console.error("❌ getStudentByIdApi failed:", error);
      throw error;
    }
  });
};
