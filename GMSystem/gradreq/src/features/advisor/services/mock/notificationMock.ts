import type { Notification } from '../../../../core/types/common.types';

// Mock notification data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Yeni Dilekçe',
    message: 'Öğrenci dilekçe başvurusu yapıldı.',
    type: 'info',
    read: false,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: '2',
    title: 'Transkript Güncellendi',
    message: 'Öğrenci transkripti güncellendi.',
    type: 'success',
    read: false,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: '3',
    title: 'Danışmanlık Randevusu',
    message: 'Yeni danışmanlık randevusu talep edildi.',
    type: 'warning',
    read: true,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
];

export const getNotificationsMock = async (): Promise<Notification[]> => {
  console.log('getNotificationsMock called');
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...mockNotifications];
};

export const markNotificationAsReadMock = async (id: string): Promise<void> => {
  console.log('markNotificationAsReadMock called with id:', id);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const notification = mockNotifications.find((n) => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

export const markAllNotificationsAsReadMock = async (): Promise<void> => {
  console.log('markAllNotificationsAsReadMock called');
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  mockNotifications.forEach((notification) => {
    notification.read = true;
  });
};

export const deleteNotificationMock = async (id: string): Promise<void> => {
  console.log('deleteNotificationMock called with id:', id);
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const index = mockNotifications.findIndex((n) => n.id === id);
  if (index !== -1) {
    mockNotifications.splice(index, 1);
  }
};
