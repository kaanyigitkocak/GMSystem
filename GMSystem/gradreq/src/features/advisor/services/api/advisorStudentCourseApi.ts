import type { CourseTaken } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import { executeWithRetry } from "../../../common/utils/rateLimitUtils";
import { getEnvironmentConfig } from "../../../../core/utils/environment";

// Get service configuration
const { apiBaseUrl, fetchOptions: globalFetchOptions } = getServiceConfig(); // Renamed to avoid conflict

// API function to get courses taken by a specific student (renamed from getStudentCourseTakensApi for clarity)
export const getStudentCoursesApi = async (
  studentId: string
): Promise<CourseTaken[]> => {
  return await executeWithRetry(async () => {
    try {
      console.log(
        "🔍 [CourseApiDebug] Fetching courses for student:",
        studentId
      );

      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const maxPageSize = 10000;
      const url = `${apiBaseUrl}/CourseTakens/by-student/${studentId}?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`;
      console.log("🔍 [CourseApiDebug] Request URL:", url);

      const response = await fetch(url, {
        ...globalFetchOptions, // Use renamed globalFetchOptions
        method: "GET",
        headers: {
          ...(globalFetchOptions.headers as Record<string, string>),
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("🔍 [CourseApiDebug] Response status:", response.status);
      console.log("🔍 [CourseApiDebug] Response ok:", response.ok);

      const data = await handleApiResponse<{
        items: CourseTaken[];
      }>(response);

      console.log("🔍 [CourseApiDebug] Parsed data:", data);
      console.log("🔍 [CourseApiDebug] Items count:", data.items?.length || 0);
      console.log("🔍 [CourseApiDebug] First item:", data.items?.[0]);

      return data.items || [];
    } catch (error) {
      console.error("❌ [CourseApiDebug] Error occurred:", error);
      console.error(
        `Failed to fetch course takens for student ${studentId}:`,
        error
      );
      throw new ServiceError(
        `Failed to fetch course takens for student ${studentId}`
      );
    }
  });
};

// This version of getStudentCourses was also in the original file, keeping it separate for now
// It seems to use a different way to get baseUrl and fetchOptions
export const getStudentCoursesAlternateApi = async (
  studentId: string
): Promise<CourseTaken[]> => {
  return await executeWithRetry(async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Authentication token not found. Please login.");
      return [];
    }

    const maxPageSize = 10000;
    const config = getEnvironmentConfig();
    const baseUrl = config.apiBaseUrl;
    const fetchURL = `${baseUrl}/CourseTakens/by-student/${studentId}?PageRequest.PageIndex=0&PageRequest.PageSize=${maxPageSize}`;

    const localFetchOptions = {
      // Renamed to avoid conflict
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await fetch(fetchURL, localFetchOptions);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(
          `Error fetching student courses: ${response.status} ${response.statusText}`,
          errorBody
        );
        throw new Error(
          `Failed to fetch student courses: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      const courses: CourseTaken[] = data.items || [];
      return courses;
    } catch (error) {
      console.error("Error in getStudentCoursesAlternateApi:", error);
      throw error;
    }
  });
};
