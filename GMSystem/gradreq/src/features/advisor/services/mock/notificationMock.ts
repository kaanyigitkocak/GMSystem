import type { Notification } from "../types";

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Yeni Dilekçe",
    message: "Öğrenci dilekçe başvurusu yapıldı.",
    type: "info",
    isRead: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    recipientUserId: "advisor-1",
    senderUserId: "student-1",
  },
  {
    id: "2",
    title: "Transkript Güncellendi",
    message: "Öğrenci transkripti güncellendi.",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    recipientUserId: "advisor-1",
    senderUserId: "system",
  },
  {
    id: "3",
    title: "Danışmanlık Randevusu",
    message: "Yeni danışmanlık randevusu talep edildi.",
    type: "warning",
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    recipientUserId: "advisor-1",
    senderUserId: "student-2",
  },
];

export const getNotificationsMock = async (): Promise<Notification[]> => {
  console.log("getNotificationsMock called");
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockNotifications];
};

export const markNotificationAsReadMock = async (id: string): Promise<void> => {
  console.log("markNotificationAsReadMock called with id:", id);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.isRead = true;
  }
};

export const markAllNotificationsAsReadMock = async (): Promise<void> => {
  console.log("markAllNotificationsAsReadMock called");
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  mockNotifications.forEach(notification => {
    notification.isRead = true;
  });
};

export const deleteNotificationMock = async (id: string): Promise<void> => {
  console.log("deleteNotificationMock called with id:", id);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = mockNotifications.findIndex(n => n.id === id);
  if (index !== -1) {
    mockNotifications.splice(index, 1);
  }
};
