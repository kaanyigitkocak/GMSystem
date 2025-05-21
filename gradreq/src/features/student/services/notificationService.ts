import type { Notification } from "../types";

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Graduation Requirements Updated",
    message:
      "Your graduation requirements have been updated. Please check the requirements page.",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Transcript Updated",
    message: "Your transcript has been updated with the latest grades.",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: false,
    type: "success",
  },
  {
    id: "3",
    title: "Manual Check Approved",
    message: "Your manual check request has been approved by your advisor.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    read: true,
    type: "success",
  },
  {
    id: "4",
    title: "Missing Document",
    message:
      "You have a missing document. Please upload it as soon as possible.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    read: true,
    type: "warning",
  },
];

// Get all notifications
export const getNotifications = async (): Promise<Notification[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockNotifications]);
    }, 500);
  });
};

// Mark notification as read
export const markNotificationAsRead = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockNotifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        mockNotifications[index].read = true;
      }
      resolve();
    }, 300);
  });
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      mockNotifications.forEach((n) => {
        n.read = true;
      });
      resolve();
    }, 300);
  });
};

// Delete notification
export const deleteNotification = async (id: string): Promise<void> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockNotifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        mockNotifications.splice(index, 1);
      }
      resolve();
    }, 300);
  });
};
