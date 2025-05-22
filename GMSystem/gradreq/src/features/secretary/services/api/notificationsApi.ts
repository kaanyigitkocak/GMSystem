import type { Notification } from "../types";
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

export const markNotificationAsReadApi = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/Notifications/${id}/mark-read`,
      {
        ...fetchOptions,
        method: "PUT",
      }
    );

    await handleApiResponse<any>(response);
  } catch (error) {
    console.error(`Failed to mark notification ${id} as read:`, error);
    throw new ServiceError(`Failed to mark notification ${id} as read`);
  }
};
