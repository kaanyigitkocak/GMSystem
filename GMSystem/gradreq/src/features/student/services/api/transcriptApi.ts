import {
  debugFetch,
  handleApiResponse,
  getServiceConfig,
} from "../../../common/utils/serviceUtils";
import type {
  BackendUserResponse,
  BackendCourseTakensResponse,
  BackendEligibilityCheckResponse,
} from "../types/backendTypes";
import type { TranscriptData } from "../types";

const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Helper function to get access token
const getAccessToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  // console.log("🔑 Transcript API - Access Token Check:", {
  //   tokenExists: !!token,
  //   tokenLength: token?.length || 0,
  // });
  return token;
};

export const getTranscriptApi = async (): Promise<TranscriptData> => {
  try {
    const token = getAccessToken();
    if (!token) {
      throw new Error("No authentication token found. Please log in first.");
    }

    // 1. Get user data from auth endpoint
    const userResponse = await debugFetch(`${apiBaseUrl}/users/GetFromAuth`, {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    const userData: BackendUserResponse = await handleApiResponse(userResponse);

    // Debug: Log the actual user data to see what we're getting
    console.log("🔍 Debug - User data from /users/GetFromAuth:", {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      studentNumber: userData.studentNumber,
      departmentName: userData.departmentName,
      fullUserData: userData,
    });

    const userGuidId = userData.id; // This is the User's Guid ID
    if (!userGuidId) {
      throw new Error("No user ID (GUID) found in user data");
    }

    // 2. Get course taken data
    const courseTakensUrl = `${apiBaseUrl}/coursetakens/by-student/${userGuidId}?PageIndex=0&PageSize=2147483647`;
    const courseTakensResponse = await debugFetch(courseTakensUrl, {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    const courseTakensData: BackendCourseTakensResponse =
      await handleApiResponse(courseTakensResponse);

    // 3. Get eligibility check results for GPA
    let gpaFromEligibility = "N/A";
    try {
      const eligibilityUrl = `${apiBaseUrl}/EligibilityCheckResults/student/${userGuidId}?PageIndex=0&PageSize=10`; // Assuming PageSize 10 is enough
      const eligibilityResponse = await debugFetch(eligibilityUrl, {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      const eligibilityData: BackendEligibilityCheckResponse =
        await handleApiResponse(eligibilityResponse);

      const gpaItem = eligibilityData.items.find(
        (item) => item.checkType === 1
      );
      if (gpaItem && gpaItem.actualValue) {
        gpaFromEligibility = parseFloat(gpaItem.actualValue).toFixed(2);
      }
    } catch (eligibilityError) {
      console.warn(
        "Could not fetch or parse GPA from eligibility results:",
        eligibilityError
      );
      // GPA will remain "N/A"
    }

    // 4. Transform the data for the frontend
    const transcriptData: TranscriptData = {
      studentInfo: {
        id: userData.studentNumber || userGuidId, // Use studentNumber, fallback to user GUID
        name: `${userData.firstName} ${userData.lastName}`,
        department: userData.departmentName || "N/A", // Use departmentName from auth response
      },
      courses: courseTakensData.items.map((course) => ({
        id: course.id, // This is CourseTakenId
        code: course.courseCodeInTranscript,
        name: course.courseNameInTranscript,
        credits: course.creditsEarned,
        grade: course.grade,
        semester: course.semesterTaken,
      })),
      gpa: gpaFromEligibility, // Use GPA from eligibility check
    };

    return transcriptData;
  } catch (error) {
    console.error("Error fetching transcript data:", error);
    // It's important to check if it's an auth error to redirect to login
    if (error instanceof Error && error.message.includes("401")) {
      // Potentially clear token and redirect to login page
      // localStorage.removeItem("authToken");
      // window.location.href = "/login";
      throw new Error("Authentication failed. Please log in again.");
    }
    throw error;
  }
};
