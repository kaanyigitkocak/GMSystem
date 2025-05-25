import type { TranscriptData } from "../types";
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

// Dashboard stats API functions - Use real endpoints
export const getDashboardStatsApi = async (): Promise<{
  graduatesCount: number;
  graduationDate: string;
}> => {
  try {
    // Since there's no dashboard stats endpoint, we'll calculate from students and eligibility data
    // This will be handled by the hook using students and eligibility APIs
    return {
      graduatesCount: 0,
      graduationDate: new Date().toISOString().split("T")[0],
    };
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
