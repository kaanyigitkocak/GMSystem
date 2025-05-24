import {
  getServiceConfig,
  handleApiResponse,
  debugFetch,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import type { BackendUserResponse } from "../types/backendTypes";

const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Helper function to get access token with debug
const getAccessToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  console.log("🔑 Graduation Progress API - Access Token Check:", {
    tokenExists: !!token,
    tokenPreview: token ? `${token.substring(0, 20)}...` : "null",
  });
  return token;
};

// Helper function to create headers with debug
const createAuthHeaders = () => {
  const token = getAccessToken();
  return {
    ...fetchOptions.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Mock graduation progress for when student record doesn't exist
const createMockGraduationProgress = () => {
  console.log("📋 Creating mock graduation progress data");
  return {
    steps: [
      { label: "Transcript Upload", description: "Upload your transcript" },
      { label: "System Check", description: "Automated eligibility check" },
      {
        label: "Advisor Approval",
        description: "Advisor reviews your application",
      },
      {
        label: "Department Approval",
        description: "Department secretary approval",
      },
      {
        label: "Dean's Office",
        description: "Final approval from dean's office",
      },
      { label: "Student Affairs", description: "Student affairs final check" },
    ],
    activeStep: 1, // Mock progress
  };
};

// Get graduation progress for current student
export const getGraduationProgressApi = async (): Promise<{
  steps: Array<{ label: string; description: string }>;
  activeStep: number;
}> => {
  console.log("🎓 Starting graduation progress API call...");

  try {
    // First get current user to get student ID
    const userUrl = `${apiBaseUrl}/users/GetFromAuth`;
    console.log("🔍 Step 1: Getting current user from:", userUrl);

    const userResponse = await debugFetch(userUrl, {
      ...fetchOptions,
      headers: createAuthHeaders(),
    });
    const userData = await handleApiResponse<BackendUserResponse>(
      userResponse,
      userUrl
    );
    console.log("✅ Got user data for graduation progress:", {
      id: userData.id,
    });

    try {
      // Get graduation processes for the student
      const graduationProcessUrl = `${apiBaseUrl}/graduationprocesses?studentId=${userData.id}`;
      console.log(
        "📋 Step 2: Getting graduation processes from:",
        graduationProcessUrl
      );

      const graduationProcessResponse = await debugFetch(graduationProcessUrl, {
        ...fetchOptions,
        headers: createAuthHeaders(),
      });
      const graduationData = await handleApiResponse<any>(
        graduationProcessResponse,
        graduationProcessUrl
      );
      console.log("✅ Got graduation process data:", graduationData);

      // Transform to frontend format - this will need adjustment based on actual backend structure
      const result = {
        steps: [
          { label: "Transcript Upload", description: "Upload your transcript" },
          { label: "System Check", description: "Automated eligibility check" },
          {
            label: "Advisor Approval",
            description: "Advisor reviews your application",
          },
          {
            label: "Department Approval",
            description: "Department secretary approval",
          },
          {
            label: "Dean's Office",
            description: "Final approval from dean's office",
          },
          {
            label: "Student Affairs",
            description: "Student affairs final check",
          },
        ],
        activeStep: 0, // This should be calculated based on graduation process status
      };

      console.log("🎉 Graduation progress API completed successfully:", result);
      return result;
    } catch (graduationError) {
      console.warn(
        "⚠️ Graduation process data not found, using mock data:",
        graduationError
      );

      // Check if it's a StudentNotExists or related error
      if (
        graduationError instanceof ServiceError &&
        (graduationError.message.includes("StudentNotExists") ||
          graduationError.statusCode === 500 ||
          graduationError.statusCode === 404)
      ) {
        console.log(
          "📋 No graduation process found. Creating mock graduation progress..."
        );
        return createMockGraduationProgress();
      }

      // If it's a different error, re-throw it
      throw graduationError;
    }
  } catch (error) {
    console.error("❌ Graduation progress API failed:", error);
    throw error;
  }
};

// Get disconnection procedures for current student
export const getDisconnectionProceduresApi = async (): Promise<
  Array<{
    name: string;
    completed: boolean;
  }>
> => {
  console.log("📋 Getting disconnection procedures...");

  // This endpoint might not exist yet, returning mock data for now
  const result = [
    { name: "Library", completed: false },
    { name: "Student Affairs", completed: false },
    { name: "Department", completed: false },
    { name: "Dormitory", completed: false },
  ];

  console.log("✅ Disconnection procedures (mock):", result);
  return result;
};
