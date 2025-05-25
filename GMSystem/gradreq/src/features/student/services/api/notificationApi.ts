import type { Notification } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import { getUserFromAuthApi } from "./usersApi";
import {
  executeWithRetry,
  executeWithRateLimit,
} from "../../../common/utils/rateLimitUtils";

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
    return await executeWithRetry(async () => {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      // First get current user ID
      const currentUser = await getUserFromAuthApi();

      // Build query parameters
      const params = new URLSearchParams({
        "PageRequest.PageIndex": "0",
        "PageRequest.PageSize": "100",
        recipientUserId: currentUser.id,
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
    });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    throw new ServiceError("Failed to fetch notifications");
  }
};

// Mark notification as read
export const markNotificationAsReadApi = async (id: string): Promise<void> => {
  try {
    return await executeWithRetry(async () => {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const response = await fetch(
        `${apiBaseUrl}/Notifications/${id}/mark-read`,
        {
          ...fetchOptions,
          method: "PUT",
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      await handleApiResponse<any>(response);
    });
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

    if (unreadNotifications.length === 0) {
      console.log(
        "[Student NotificationAPI] No unread notifications to mark as read"
      );
      return;
    }

    console.log(
      `[Student NotificationAPI] Marking ${unreadNotifications.length} notifications as read with rate limiting...`
    );

    // Mark each unread notification as read with rate limiting
    const results = await executeWithRateLimit(
      unreadNotifications,
      async (notification) => {
        await markNotificationAsReadApi(notification.id);
        return { notificationId: notification.id, success: true };
      },
      {
        batchSize: 10,
        delayBetweenBatches: 500,
        maxRetries: 3,
        retryDelay: 1000,
      }
    );

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    console.log(
      `[Student NotificationAPI] Mark as read completed: ${successCount} successful, ${failureCount} failed`
    );

    if (failureCount > 0) {
      console.warn(
        `[Student NotificationAPI] ${failureCount} notifications failed to be marked as read`
      );
    }
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error);
    throw new ServiceError("Failed to mark all notifications as read");
  }
};

// Delete notification
export const deleteNotificationApi = async (id: string): Promise<void> => {
  try {
    return await executeWithRetry(async () => {
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
    });
  } catch (error) {
    console.error(`Failed to delete notification ${id}:`, error);
    throw new ServiceError(`Failed to delete notification ${id}`);
  }
};
