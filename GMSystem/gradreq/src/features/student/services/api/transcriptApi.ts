import type { TranscriptData } from "../types";
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

const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Helper function to get access token with debug
const getAccessToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  console.log("🔑 Transcript API - Access Token Check:", {
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

// Mock data for when student record doesn't exist
const createMockTranscriptData = (
  userData: BackendUserResponse
): TranscriptData => {
  console.log("📋 Creating mock transcript data for user:", userData.id);
  return {
    studentInfo: {
      name: `${userData.firstName} ${userData.lastName}`,
      id: userData.studentNumber || userData.id,
      department: "Computer Engineering", // Mock department
    },
    courses: [
      {
        id: "CS101",
        name: "Introduction to Programming",
        credits: 3,
        grade: "AA",
        semester: "2023 Fall",
      },
      {
        id: "CS102",
        name: "Data Structures",
        credits: 4,
        grade: "BA",
        semester: "2024 Spring",
      },
      {
        id: "MATH101",
        name: "Calculus I",
        credits: 4,
        grade: "BB",
        semester: "2023 Fall",
      },
    ],
    gpa: "3.45",
  };
};

// Get transcript data for current student
export const getTranscriptApi = async (): Promise<TranscriptData> => {
  console.log("📄 Starting transcript API call...");

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
    console.log("✅ Got user data:", {
      id: userData.id,
      name: `${userData.firstName} ${userData.lastName}`,
    });

    // Try to get student info using user's student ID
    try {
      const studentUrl = `${apiBaseUrl}/students/${userData.id}`;
      console.log("🎓 Step 2: Getting student info from:", studentUrl);

      const studentResponse = await debugFetch(studentUrl, {
        ...fetchOptions,
        headers: createAuthHeaders(),
      });
      const studentData = await handleApiResponse<BackendStudentResponse>(
        studentResponse,
        studentUrl
      );
      console.log("✅ Got student data:", {
        department: studentData.departmentName,
      });

      // Get transcript data (this might need adjustment based on actual API structure)
      const transcriptUrl = `${apiBaseUrl}/transcriptdatas?studentId=${userData.id}`;
      console.log("📋 Step 3: Getting transcript data from:", transcriptUrl);

      const transcriptResponse = await debugFetch(transcriptUrl, {
        ...fetchOptions,
        headers: createAuthHeaders(),
      });
      const transcriptData = await handleApiResponse<any>(
        transcriptResponse,
        transcriptUrl
      );
      console.log("✅ Got transcript data:", transcriptData);

      // Get course takens for the student
      const courseTakensUrl = `${apiBaseUrl}/coursetakens?studentId=${userData.id}`;
      console.log("📚 Step 4: Getting course takens from:", courseTakensUrl);

      const courseTakensResponse = await debugFetch(courseTakensUrl, {
        ...fetchOptions,
        headers: createAuthHeaders(),
      });
      const courseTakensData =
        await handleApiResponse<BackendCourseTakensResponse>(
          courseTakensResponse,
          courseTakensUrl
        );
      console.log("✅ Got course takens data:", {
        itemCount: courseTakensData.items?.length || 0,
      });

      // Transform backend data to frontend format
      const result: TranscriptData = {
        studentInfo: {
          name: `${userData.firstName} ${userData.lastName}`,
          id: userData.studentNumber || userData.id,
          department: studentData.departmentName || "N/A",
        },
        courses:
          courseTakensData.items?.map((course) => ({
            id: course.id,
            name: course.courseName,
            credits: course.credits,
            grade: course.grade,
            semester: course.semester,
          })) || [],
        gpa: "0.00", // This will need to be calculated or retrieved from backend
      };

      console.log("🎉 Transcript API completed successfully:", result);
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
          "📋 User exists but no student record found. Creating mock transcript data..."
        );
        return createMockTranscriptData(userData);
      }

      // If it's a different error, re-throw it
      throw studentError;
    }
  } catch (error) {
    console.error("❌ Transcript API failed:", error);
    throw error;
  }
};
