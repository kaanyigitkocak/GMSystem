import type {
  Notification,
  GraduationRequest,
  StudentRanking,
  TranscriptData,
} from "../types";
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

// Notifications API functions
export const getNotificationsApi = async (): Promise<Notification[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/Notifications`, {
      ...fetchOptions,
      method: "GET",
    });

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
    return data.items.map((item) => ({
      id: item.id,
      title: item.title,
      message: item.message,
      type: item.notificationType,
      read: item.read,
      date: item.createdDate,
    }));
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    throw new ServiceError("Failed to fetch notifications");
  }
};

// Graduation Requests API functions
export const getGraduationRequestsApi = async (): Promise<
  GraduationRequest[]
> => {
  try {
    const response = await fetch(`${apiBaseUrl}/GraduationProcesses`, {
      ...fetchOptions,
      method: "GET",
    });

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
    return data.items.map((item) => ({
      id: item.id,
      studentId: item.studentId,
      studentName: item.studentName,
      requestType: item.type,
      status: item.status,
      date: item.createdDate,
      notes: item.notes,
    }));
  } catch (error) {
    console.error("Failed to fetch graduation requests:", error);
    throw new ServiceError("Failed to fetch graduation requests");
  }
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

// Transcripts API functions
export const getTranscriptsApi = async (): Promise<TranscriptData[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/TranscriptDatas`, {
      ...fetchOptions,
      method: "GET",
    });

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
    return data.items.map((item) => ({
      id: item.id,
      studentId: item.studentId,
      studentName: item.studentName,
      department: item.department,
      uploadDate: item.uploadDate,
      status: item.status,
      fileName: item.fileName,
      fileSize: item.fileSize,
      metaInfo: item.metaInfo,
    }));
  } catch (error) {
    console.error("Failed to fetch transcripts:", error);
    throw new ServiceError("Failed to fetch transcripts");
  }
};

// Use FormData for file upload
export const parseTranscriptCSVApi = async (
  file: File
): Promise<TranscriptData[]> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${apiBaseUrl}/TranscriptDatas/parse-csv`, {
      ...fetchOptions,
      method: "POST",
      headers: {}, // Clear default headers when using FormData
      body: formData,
    });

    return await handleApiResponse<TranscriptData[]>(response);
  } catch (error) {
    console.error("Failed to parse CSV:", error);
    throw new ServiceError("Failed to parse CSV file");
  }
};

export const uploadTranscriptApi = async (
  file: File
): Promise<TranscriptData> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${apiBaseUrl}/TranscriptDatas/upload`, {
      ...fetchOptions,
      method: "POST",
      headers: {}, // Clear default headers when using FormData
      body: formData,
    });

    return await handleApiResponse<TranscriptData>(response);
  } catch (error) {
    console.error("Failed to upload transcript:", error);
    throw new ServiceError("Failed to upload transcript");
  }
};

export const deleteTranscriptApi = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${apiBaseUrl}/TranscriptDatas/${id}`, {
      ...fetchOptions,
      method: "DELETE",
    });

    await handleApiResponse<any>(response);
    return true;
  } catch (error) {
    console.error(`Failed to delete transcript ${id}:`, error);
    throw new ServiceError(`Failed to delete transcript ${id}`);
  }
};

export const processTranscriptApi = async (
  id: string
): Promise<TranscriptData> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/TranscriptDatas/${id}/process`,
      {
        ...fetchOptions,
        method: "POST",
      }
    );

    return await handleApiResponse<TranscriptData>(response);
  } catch (error) {
    console.error(`Failed to process transcript ${id}:`, error);
    throw new ServiceError(`Failed to process transcript ${id}`);
  }
};

// Dashboard stats API functions
export const getDashboardStatsApi = async (): Promise<{
  graduatesCount: number;
  graduationDate: string;
}> => {
  try {
    const response = await fetch(`${apiBaseUrl}/Secretary/dashboard-stats`, {
      ...fetchOptions,
      method: "GET",
    });

    return await handleApiResponse<{
      graduatesCount: number;
      graduationDate: string;
    }>(response);
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    throw new ServiceError("Failed to fetch dashboard stats");
  }
};

export const getEligibleGraduatesApi = async (): Promise<TranscriptData[]> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/EligibilityCheckResults/eligible`,
      {
        ...fetchOptions,
        method: "GET",
      }
    );

    const data = await handleApiResponse<{
      items: any[];
    }>(response);

    return data.items.map((item) => ({
      id: item.id,
      studentId: item.studentId,
      studentName: item.studentName,
      department: item.department,
      uploadDate: item.checkDate,
      status: "Eligible",
      fileName: "",
      fileSize: 0,
    }));
  } catch (error) {
    console.error("Failed to fetch eligible graduates:", error);
    throw new ServiceError("Failed to fetch eligible graduates");
  }
};

export const exportEligibleGraduatesCSVApi = async (): Promise<string> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/EligibilityCheckResults/export-csv`,
      {
        ...fetchOptions,
        method: "GET",
      }
    );

    return await response.text();
  } catch (error) {
    console.error("Failed to export eligible graduates as CSV:", error);
    throw new ServiceError("Failed to export eligible graduates as CSV");
  }
};

export const exportEligibleGraduatesPDFApi = async (): Promise<Blob> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/EligibilityCheckResults/export-pdf`,
      {
        ...fetchOptions,
        method: "GET",
      }
    );

    return await response.blob();
  } catch (error) {
    console.error("Failed to export eligible graduates as PDF:", error);
    throw new ServiceError("Failed to export eligible graduates as PDF");
  }
};

// Add other API functions as needed...
