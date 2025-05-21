import type { Notification } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";

const { apiBaseUrl } = getServiceConfig();

// Get all notifications
export const getNotificationsApi = async (): Promise<Notification[]> => {
  throw new Error("Not implemented");
};

// Mark notification as read
export const markNotificationAsReadApi = async (id: string): Promise<void> => {
  throw new Error("Not implemented");
};

// Mark all notifications as read
export const markAllNotificationsAsReadApi = async (): Promise<void> => {
  throw new Error("Not implemented");
};

// Delete notification
export const deleteNotificationApi = async (id: string): Promise<void> => {
  throw new Error("Not implemented");
};
