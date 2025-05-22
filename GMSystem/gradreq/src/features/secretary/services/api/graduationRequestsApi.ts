import type { GraduationRequest } from "../types";
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

export const updateGraduationRequestStatusApi = async (
  id: string,
  status: string,
  notes?: string
): Promise<GraduationRequest> => {
  try {
    const response = await fetch(`${apiBaseUrl}/GraduationProcesses/${id}`, {
      ...fetchOptions,
      method: "PUT",
      body: JSON.stringify({
        status,
        notes,
      }),
    });

    const updatedRequest = await handleApiResponse<any>(response);

    return {
      id: updatedRequest.id,
      studentId: updatedRequest.studentId,
      studentName: updatedRequest.studentName,
      requestType: updatedRequest.type,
      status: updatedRequest.status,
      date: updatedRequest.createdDate,
      notes: updatedRequest.notes,
    };
  } catch (error) {
    console.error("Failed to update graduation request status:", error);
    throw new ServiceError("Failed to update graduation request status");
  }
};
