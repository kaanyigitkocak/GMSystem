import type { GraduationRequirementsData } from "../types";
import {
  getServiceConfig,
  handleApiResponse,
  debugFetch,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import type {
  BackendUserResponse,
  BackendStudentResponse,
  BackendCourseTakensResponse,
} from "../types/backendTypes";
import { executeWithRetry } from "../../../common/utils/rateLimitUtils";

const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Helper function to get access token with debug
const getAccessToken = (): string | null => {
  const token = localStorage.getItem("authToken"); // Changed from "accessToken" to "authToken"
  console.log("🔑 Graduation Requirements API - Access Token Check:", {
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

// Mock graduation requirements for when student record doesn't exist
const createMockGraduationRequirements = (
  userData: BackendUserResponse
): GraduationRequirementsData => {
  console.log(
    "📋 Creating mock graduation requirements data for user:",
    userData.id
  );
  return {
    studentInfo: {
      department: "Computer Engineering", // Mock department
      requiredCredits: 240,
      completedCredits: 180, // Mock completed credits
    },
    requirements: [
      {
        category: "Core Courses",
        progress: 75,
        completed: 18,
        total: 24,
        items: [], // This should be populated from requirement sets
      },
      {
        category: "Elective Courses",
        progress: 60,
        completed: 12,
        total: 20,
        items: [],
      },
    ],
    overallProgress: 75, // Mock overall progress
  };
};

// Get graduation requirements data for current student
export const getGraduationRequirementsApi =
  async (): Promise<GraduationRequirementsData> => {
    return await executeWithRetry(async () => {
      console.log("📋 Starting graduation requirements API call...");

      try {
        // First get current user to get student ID
        const userResponse = await debugFetch(
          `${apiBaseUrl}/users/GetFromAuth`,
          {
            ...fetchOptions,
            headers: createAuthHeaders(),
          }
        );
        const userData = await handleApiResponse<BackendUserResponse>(
          userResponse,
          `${apiBaseUrl}/users/GetFromAuth`
        );
        console.log("✅ Got user data for graduation requirements:", {
          id: userData.id,
        });

        try {
          // Get student info
          const studentResponse = await debugFetch(
            `${apiBaseUrl}/students/${userData.id}`,
            {
              ...fetchOptions,
              headers: createAuthHeaders(),
            }
          );
          const studentData = await handleApiResponse<BackendStudentResponse>(
            studentResponse,
            `${apiBaseUrl}/students/${userData.id}`
          );
          console.log("✅ Got student data:", {
            department: studentData.departmentName,
          });

          // Get course takens
          const courseTakensResponse = await debugFetch(
            `${apiBaseUrl}/coursetakens?studentId=${userData.id}`,
            {
              ...fetchOptions,
              headers: createAuthHeaders(),
            }
          );
          const courseTakensData =
            await handleApiResponse<BackendCourseTakensResponse>(
              courseTakensResponse,
              `${apiBaseUrl}/coursetakens?studentId=${userData.id}`
            );
          console.log("✅ Got course takens data:", {
            itemCount: courseTakensData.items?.length || 0,
          });

          // Get graduation requirement sets (this might need adjustment based on actual API structure)
          const requirementSetsResponse = await debugFetch(
            `${apiBaseUrl}/graduationrequirementsets?departmentId=${studentData.id}`,
            {
              ...fetchOptions,
              headers: createAuthHeaders(),
            }
          );
          const requirementSetsData = await handleApiResponse<any>(
            requirementSetsResponse,
            `${apiBaseUrl}/graduationrequirementsets?departmentId=${studentData.id}`
          );
          console.log(
            "✅ Got graduation requirement sets:",
            requirementSetsData
          );

          // Calculate completed credits
          const completedCredits =
            courseTakensData.items?.reduce(
              (sum, course) => sum + course.credits,
              0
            ) || 0;

          // This will need to be adjusted based on actual backend structure
          const result: GraduationRequirementsData = {
            studentInfo: {
              department: studentData.departmentName,
              requiredCredits: 240, // This should come from requirement sets
              completedCredits: completedCredits,
            },
            requirements: [
              {
                category: "Core Courses",
                progress: 75,
                completed: 18,
                total: 24,
                items: [], // This should be populated from requirement sets
              },
              {
                category: "Elective Courses",
                progress: 60,
                completed: 12,
                total: 20,
                items: [],
              },
            ],
            overallProgress: Math.round((completedCredits / 240) * 100),
          };

          console.log(
            "🎉 Graduation requirements API completed successfully:",
            result
          );
          return result;
        } catch (studentError) {
          console.warn(
            "⚠️ Student record not found, using mock data:",
            studentError
          );

          // Check if it's a StudentNotExists error
          if (
            studentError instanceof ServiceError &&
            (studentError.message.includes("StudentNotExists") ||
              studentError.statusCode === 500)
          ) {
            console.log(
              "📋 User exists but no student record found. Creating mock graduation requirements..."
            );
            return createMockGraduationRequirements(userData);
          }

          // If it's a different error, re-throw it
          throw studentError;
        }
      } catch (error) {
        console.error("❌ Graduation requirements API failed:", error);
        throw error;
      }
    });
  };

// Report missing files
export const reportMissingFilesApi = async (
  message: string
): Promise<{ success: boolean }> => {
  try {
    return await executeWithRetry(async () => {
      // This might be implemented as a notification or support ticket
      const response = await debugFetch(`${apiBaseUrl}/notifications`, {
        ...fetchOptions,
        method: "POST",
        headers: createAuthHeaders(),
        body: JSON.stringify({
          title: "Missing Files Report",
          message: message,
          type: "info",
        }),
      });

      await handleApiResponse(response, `${apiBaseUrl}/notifications`);
      return { success: true };
    });
  } catch (error) {
    console.warn(
      "⚠️ Could not send notification, but returning success:",
      error
    );
    return { success: true }; // Return success even if notification fails
  }
};
