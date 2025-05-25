import type { Student, TranscriptData, CourseTaken } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";

// Get service configuration
const { apiBaseUrl, fetchOptions } = getServiceConfig();

// API function to get advisor's students
export const getAdvisorStudentsApi = async (): Promise<Student[]> => {
  throw new Error("Not implemented");
};

// API function to get transcript data for a specific student
export const getStudentTranscriptApi = async (
  studentId: string,
  studentInfo?: { name: string; studentNumber: string; department: string }
): Promise<TranscriptData> => {
  try {
    console.log("🔍 [TranscriptApiDebug] Fetching transcript for student:", studentId);

    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    // Use maximum integer value for page size to get all courses
    const maxPageSize = 2147483647; // Integer.MAX_VALUE
    const url = `${apiBaseUrl}/CourseTakens/by-student/${studentId}?PageRequest.PageSize=${maxPageSize}`;
    console.log("🔍 [TranscriptApiDebug] Request URL:", url);

    const response = await fetch(url, {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("🔍 [TranscriptApiDebug] Response status:", response.status);
    console.log("🔍 [TranscriptApiDebug] Response ok:", response.ok);

    const data = await handleApiResponse<{
      items: CourseTaken[];
    }>(response);

    console.log("🔍 [TranscriptApiDebug] Parsed data:", data);
    console.log("🔍 [TranscriptApiDebug] Items count:", data.items?.length || 0);

    // Transform the API response to match our TranscriptData interface
    const transformedData: TranscriptData = {
      studentInfo: {
        id: studentInfo?.studentNumber || studentId,
        name: studentInfo?.name || "Unknown Student",
        department: studentInfo?.department || "Unknown Department"
      },
      courses: data.items?.map((course: CourseTaken) => ({
        id: course.courseCodeInTranscript || "",
        name: course.courseNameInTranscript || "",
        credits: course.creditsEarned || 0,
        grade: course.grade || "",
        semester: course.semesterTaken || ""
      })) || [],
      gpa: calculateGPA(data.items || [])
    };

    console.log("🔍 [TranscriptApiDebug] Transformed data:", transformedData);
    return transformedData;
  } catch (error) {
    console.error("❌ [TranscriptApiDebug] Error occurred:", error);
    console.error("Error fetching student transcript:", error);
    throw new ServiceError(`Failed to fetch transcript for student ${studentId}`);
  }
};

// Helper function to calculate GPA from courses
const calculateGPA = (courses: CourseTaken[]): string => {
  if (!courses || courses.length === 0) {
    return "0.00";
  }

  // Simple GPA calculation based on letter grades
  const gradePoints: { [key: string]: number } = {
    'AA': 4.0, 'BA': 3.5, 'BB': 3.0, 'CB': 2.5, 'CC': 2.0,
    'DC': 1.5, 'DD': 1.0, 'FD': 0.5, 'FF': 0.0
  };

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach(course => {
    const credit = course.creditsEarned || 0;
    const gradePoint = gradePoints[course.grade] ?? 0;
    
    totalPoints += gradePoint * credit;
    totalCredits += credit;
  });

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  return gpa.toFixed(2);
};
