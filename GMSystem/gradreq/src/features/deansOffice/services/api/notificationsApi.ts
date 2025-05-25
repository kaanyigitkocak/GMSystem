import type { Notification } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import { getUserFromAuthApi } from "./usersApi";

// Get service configuration
const { apiBaseUrl } = getServiceConfig();

// Default fetch options
const fetchOptions = {
  mode: "cors" as RequestMode,
  headers: {
    "Content-Type": "application/json",
  },
};

// Get notifications for current user
export const getNotificationsApi = async (): Promise<Notification[]> => {
  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    // First get current user ID
    const currentUser = await getUserFromAuthApi();

    // Build query parameters to match the API format from the curl request
    const params = new URLSearchParams({
      PageIndex: "0",
      PageSize: "10",
      recipientUserId: currentUser.id,
      isRead: "false",
    });

    const response = await fetch(
      `${apiBaseUrl}/Notifications?${params.toString()}`,
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

    // Map the backend response to our frontend model
    return data.items.map((item) => ({
      id: item.id,
      title: item.title || "Notification",
      message: item.message || item.content || "",
      type: item.notificationType || item.type || "info",
      read: item.isRead || item.read || false,
      date: item.createdDate || item.date || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    throw new ServiceError("Failed to fetch notifications");
  }
};

// Mark notification as read
export const markNotificationAsReadApi = async (id: string): Promise<void> => {
  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    // First get the notification to preserve other fields
    const getResponse = await fetch(`${apiBaseUrl}/Notifications/${id}`, {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });

    const notification = await handleApiResponse<any>(getResponse);

    // Update the notification with isRead = true
    const updateCommand = {
      id: id,
      title: notification.title,
      message: notification.message,
      recipientUserId: notification.recipientUserId,
      isRead: true,
    };

    const response = await fetch(`${apiBaseUrl}/Notifications`, {
      ...fetchOptions,
      method: "PUT",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(updateCommand),
    });

    await handleApiResponse<any>(response);
  } catch (error) {
    console.error(`Failed to mark notification ${id} as read:`, error);
    throw new ServiceError(`Failed to mark notification ${id} as read`);
  }
};

// Mark all notifications as read
export const markAllNotificationsAsReadApi = async (): Promise<void> => {
  try {
    // Get current user's notifications first
    const notifications = await getNotificationsApi();
    const unreadNotifications = notifications.filter((n) => !n.read);

    // Mark each unread notification as read
    await Promise.all(
      unreadNotifications.map((notification) =>
        markNotificationAsReadApi(notification.id)
      )
    );
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error);
    throw new ServiceError("Failed to mark all notifications as read");
  }
};

// Delete notification
export const deleteNotificationApi = async (id: string): Promise<void> => {
  try {
    // Get auth token from localStorage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      throw new ServiceError("No authentication token found");
    }

    const response = await fetch(`${apiBaseUrl}/Notifications/${id}`, {
      ...fetchOptions,
      method: "DELETE",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });

    await handleApiResponse<any>(response);
  } catch (error) {
    console.error(`Failed to delete notification ${id}:`, error);
    throw new ServiceError(`Failed to delete notification ${id}`);
  }
};
