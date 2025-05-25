import type { Student } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import { getUserFromAuthApi } from "./usersApi";
import { executeWithRetry } from "../../../common/utils/rateLimitUtils";
import type { UserFromAuth } from "./usersApi"; // Ensure UserFromAuth is imported

// Get service configuration
const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Cache key for advisor data
const ADVISOR_CACHE_KEY = "advisor_data";
const STUDENTS_CACHE_KEY = "advisor_students";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Interface for cached advisor data
interface CachedAdvisorData {
  advisorId: string;
  departmentId: string;
  departmentName: string;
  timestamp: number;
}

// Interface for cached students data
interface CachedStudentsData {
  students: Student[];
  timestamp: number;
}

// Get cached data from localStorage
const getCachedData = <T>(key: string): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn("Failed to parse cached data:", error);
  }
  return null;
};

// Set data to cache in localStorage
const setCachedData = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn("Failed to cache data:", error);
  }
};

// Check if cached data is still valid
const isCacheValid = (timestamp: number): boolean => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Get advisor data with caching
export const getAdvisorData = async (): Promise<CachedAdvisorData> => {
  // Check cache first
  const cached = getCachedData<CachedAdvisorData>(ADVISOR_CACHE_KEY);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached;
  }
  return await executeWithRetry(async () => {
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      // Get current user data from /Users/GetFromAuth
      const currentUser = await getUserFromAuthApi();

      console.log("🔍 [AdvisorApiDebug] Current user data:", currentUser);
      console.log("🔍 [AdvisorApiDebug] User role:", currentUser.userRole);

      // Check if user is an advisor (handle both frontend and backend role naming)
      const userRole = currentUser.userRole?.toUpperCase();
      if (userRole !== "ADVISOR") {
        throw new ServiceError(
          `User is not an advisor. Current role: ${currentUser.userRole}`
        );
      }

      const advisorData: CachedAdvisorData = {
        advisorId: currentUser.id,
        departmentId: currentUser.departmentId,
        departmentName: currentUser.departmentName,
        timestamp: Date.now(),
      };

      // Cache the data
      setCachedData(ADVISOR_CACHE_KEY, advisorData);

      return advisorData;
    } catch (error) {
      console.error("Failed to get advisor data:", error);
      throw new ServiceError("Failed to get advisor information");
    }
  });
};

// Helper function to map backend graduation status to frontend status
const mapStudentStatus = (graduationStatus: number): Student["status"] => {
  switch (graduationStatus) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return "Normal Öğrenim";
    case 9:
      return "Mezuniyet Aşaması";
    case 10:
      return "Mezuniyet Aşaması"; // Graduated students are still shown as graduation stage
    default:
      return "Normal Öğrenim";
  }
};

// API function to get students assigned to current advisor
export const getStudentsApi = async (): Promise<Student[]> => {
  return await executeWithRetry(async () => {
    try {
      // Check if we have cached students data
      const cachedStudents =
        getCachedData<CachedStudentsData>(STUDENTS_CACHE_KEY);
      if (cachedStudents && isCacheValid(cachedStudents.timestamp)) {
        return cachedStudents.students;
      }

      // Get auth token from localStorage
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      // Get advisor data (cached or fresh)
      const advisorData = await getAdvisorData();

      // Get all students from the department using the Students endpoint
      const response = await fetch(
        `${apiBaseUrl}/Students?departmentId=${advisorData.departmentId}&PageRequest.PageIndex=0&PageRequest.PageSize=1000`,
        {
          ...fetchOptions,
          method: "GET",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await handleApiResponse<{
        items: any[];
        index: number;
        size: number;
        count: number;
        pages: number;
        hasPrevious: boolean;
        hasNext: boolean;
      }>(response);

      // Filter students that are assigned to this advisor and map the backend response to our frontend model
      const allStudents = data.items
        .filter((item) => item.assignedAdvisorUserId === advisorData.advisorId)
        .map((item) => ({
          id: item.id || item.studentId || item.studentNumber,
          name: `${item.firstName || ""} ${item.lastName || ""}`.trim(),
          department: item.departmentName || advisorData.departmentName,
          gpa: item.currentGpa ? item.currentGpa.toFixed(2) : "N/A",
          status: mapStudentStatus(item.graduationStatus),
          email: item.email || "",
          phone: item.phoneNumber || item.phone || "",
          lastMeeting: item.lastMeetingDate || "",
          studentNumber: item.studentNumber || item.id,
          ectsCompleted: item.currentEctsCompleted || 0,
          enrollDate: item.enrollDate || "",
          graduationStatus: item.graduationStatus || 0,
        }));

      // Cache the students data
      const studentsToCache: CachedStudentsData = {
        students: allStudents,
        timestamp: Date.now(),
      };
      setCachedData(STUDENTS_CACHE_KEY, studentsToCache);

      return allStudents;
    } catch (error) {
      console.error("Failed to fetch students:", error);
      throw new ServiceError("Failed to fetch students");
    }
  });
};

// API function to send email to student
export const sendEmailToStudentApi = async (
  studentId: string,
  subject: string,
  message: string
): Promise<{ success: boolean }> => {
  return await executeWithRetry(async () => {
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const response = await fetch(
        `${apiBaseUrl}/Students/${studentId}/send-email`,
        {
          ...fetchOptions,
          method: "POST",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            subject,
            message,
          }),
        }
      );

      await handleApiResponse<any>(response);
      return { success: true };
    } catch (error) {
      console.error(`Failed to send email to student ${studentId}:`, error);
      throw new ServiceError(`Failed to send email to student ${studentId}`);
    }
  });
};
