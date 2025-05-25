import type {
  GraduationRequirementsData,
  RequirementCategory,
  RequirementItem,
} from "../types";
import {
  getServiceConfig,
  handleApiResponse,
  debugFetch,
} from "../../../common/utils/serviceUtils";
import type {
  BackendUserResponse,
  BackendCourseTakensResponse,
  BackendCoursesResponse,
  BackendCourseItem,
  BackendCourseTakenItem,
} from "../types/backendTypes";

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

// Get graduation requirements data for current student
export const getGraduationRequirementsApi =
  async (): Promise<GraduationRequirementsData> => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("No authentication token found. Please log in first.");
      }

      console.log("📋 Starting graduation requirements API call...");

      // 1. Get current user data
      const userResponse = await debugFetch(`${apiBaseUrl}/users/GetFromAuth`, {
        ...fetchOptions,
        headers: createAuthHeaders(),
      });
      const userData: BackendUserResponse = await handleApiResponse(
        userResponse
      );

      console.log("✅ Got user data:", {
        id: userData.id,
        studentNumber: userData.studentNumber,
        departmentName: userData.departmentName,
      });

      const userGuidId = userData.id;

      // 2. Get all courses from the department/system
      const coursesResponse = await debugFetch(
        `${apiBaseUrl}/Courses?PageIndex=0&PageSize=200`,
        {
          ...fetchOptions,
          headers: createAuthHeaders(),
        }
      );
      const coursesData: BackendCoursesResponse = await handleApiResponse(
        coursesResponse
      );

      console.log("✅ Got courses data:", {
        totalCourses: coursesData.items.length,
      });

      // 3. Get student's completed courses
      const courseTakensResponse = await debugFetch(
        `${apiBaseUrl}/CourseTakens/by-student/${userGuidId}?PageIndex=0&PageSize=100`,
        {
          ...fetchOptions,
          headers: createAuthHeaders(),
        }
      );
      const courseTakensData: BackendCourseTakensResponse =
        await handleApiResponse(courseTakensResponse);

      console.log("✅ Got course takens data:", {
        completedCourses: courseTakensData.items.length,
      });

      // 4. Process the data to create graduation requirements
      const completedCourseIds = new Set(
        courseTakensData.items
          .filter((course) => course.isSuccessfullyCompleted)
          .map((course) => course.matchedCourseId)
      );

      // Calculate total completed credits
      const completedCredits = courseTakensData.items
        .filter((course) => course.isSuccessfullyCompleted)
        .reduce((sum, course) => sum + course.creditsEarned, 0);

      // Categorize courses by type
      const mandatoryCourses = coursesData.items.filter(
        (course) => course.courseType === 1
      );
      const electiveCourses = coursesData.items.filter(
        (course) => course.courseType === 2
      );

      // Create requirement items for mandatory courses
      const mandatoryRequirementItems: RequirementItem[] = mandatoryCourses.map(
        (course) => ({
          id: course.id,
          name: `${course.courseCode} - ${course.courseName}`,
          credits: course.ects,
          completed: completedCourseIds.has(course.id),
        })
      );

      // Create requirement items for elective courses (only show completed ones)
      const completedElectives = courseTakensData.items
        .filter(
          (taken) =>
            taken.isSuccessfullyCompleted &&
            coursesData.items.find(
              (course) => course.id === taken.matchedCourseId
            )?.courseType === 2
        )
        .map((taken) => {
          const course = coursesData.items.find(
            (c) => c.id === taken.matchedCourseId
          );
          return {
            id: taken.id,
            name: `${taken.courseCodeInTranscript} - ${taken.courseNameInTranscript}`,
            credits: taken.creditsEarned,
            completed: true,
          };
        });

      // Calculate progress for mandatory courses
      const completedMandatory = mandatoryRequirementItems.filter(
        (item) => item.completed
      );
      const mandatoryProgress =
        mandatoryCourses.length > 0
          ? Math.round(
              (completedMandatory.length / mandatoryCourses.length) * 100
            )
          : 0;

      // Calculate progress for electives (assume need at least 60 ECTS from electives)
      const electiveCreditsNeeded = 60;
      const completedElectiveCredits = completedElectives.reduce(
        (sum, item) => sum + item.credits,
        0
      );
      const electiveProgress = Math.min(
        Math.round((completedElectiveCredits / electiveCreditsNeeded) * 100),
        100
      );

      // Create requirement categories
      const requirements: RequirementCategory[] = [
        {
          category: "Mandatory Courses",
          progress: mandatoryProgress,
          completed: completedMandatory.length,
          total: mandatoryCourses.length,
          items: mandatoryRequirementItems,
        },
        {
          category: "Elective Courses",
          progress: electiveProgress,
          completed: completedElectives.length,
          total: Math.ceil(electiveCreditsNeeded / 6), // Assuming average 6 ECTS per elective
          items: completedElectives,
        },
      ];

      // Calculate overall progress (assume 240 ECTS total needed)
      const totalCreditsNeeded = 240;
      const overallProgress = Math.min(
        Math.round((completedCredits / totalCreditsNeeded) * 100),
        100
      );

      const result: GraduationRequirementsData = {
        studentInfo: {
          department: userData.departmentName || "N/A",
          requiredCredits: totalCreditsNeeded,
          completedCredits: completedCredits,
        },
        requirements: requirements,
        overallProgress: overallProgress,
      };

      console.log(
        "🎉 Graduation requirements API completed successfully:",
        result
      );
      return result;
    } catch (error) {
      console.error("❌ Graduation requirements API failed:", error);
      throw error;
    }
  };

// Report missing files
export const reportMissingFilesApi = async (
  message: string
): Promise<{ success: boolean }> => {
  try {
    // For now, just simulate success
    console.log("📝 Reporting missing files:", message);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  } catch (error) {
    console.error("❌ Failed to report missing files:", error);
    throw error;
  }
};
