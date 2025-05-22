import type { StudentRanking } from "../types";
import {
  getServiceConfig,
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

// Student Rankings API functions
export const getStudentRankingsApi = async (
  department: string
): Promise<StudentRanking[]> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/RankingLists?department=${encodeURIComponent(department)}`,
      {
        ...fetchOptions,
        method: "GET",
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

    // Map the backend response to our frontend model
    return data.items.map((item, index) => ({
      id: item.id,
      studentId: item.studentId,
      studentName: item.studentName,
      department: item.department,
      gpa: item.gpa,
      graduationDate: item.graduationDate,
      ranking: index + 1,
    }));
  } catch (error) {
    console.error(
      `Failed to fetch student rankings for department ${department}:`,
      error
    );
    throw new ServiceError(
      `Failed to fetch student rankings for department ${department}`
    );
  }
};

export const updateStudentRankingApi = async (
  student: StudentRanking
): Promise<StudentRanking> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/RankingListEntries/${student.id}`,
      {
        ...fetchOptions,
        method: "PUT",
        body: JSON.stringify({
          id: student.id,
          studentId: student.studentId,
          gpa: student.gpa,
          ranking: student.ranking,
        }),
      }
    );

    const updatedStudent = await handleApiResponse<any>(response);

    return {
      id: updatedStudent.id,
      studentId: updatedStudent.studentId,
      studentName: student.studentName, // Keep the name from the input since it might not be returned
      department: student.department, // Keep the department from the input
      gpa: updatedStudent.gpa,
      graduationDate: student.graduationDate, // Keep the graduation date from the input
      ranking: updatedStudent.ranking,
    };
  } catch (error) {
    console.error("Failed to update student ranking:", error);
    throw new ServiceError("Failed to update student ranking");
  }
};

export const reorderStudentRankingsApi = async (
  rankings: StudentRanking[]
): Promise<StudentRanking[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/RankingLists/reorder`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify(
        rankings.map((r) => ({
          id: r.id,
          ranking: r.ranking,
        }))
      ),
    });

    await handleApiResponse<any>(response);
    return rankings;
  } catch (error) {
    console.error("Failed to reorder student rankings:", error);
    throw new ServiceError("Failed to reorder student rankings");
  }
};
