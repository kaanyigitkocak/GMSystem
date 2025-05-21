import type { Notification } from '../components/NotificationsPanel';

// Mock data for notifications
const mockNotifications: Record<string, Notification[]> = {
  'student_affairs': [
    {
      id: '1',
      title: 'New Graduation Applications',
      message: '5 new graduation applications require review',
      type: 'info',
      read: false,
      date: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Ranking Files Updated',
      message: 'Department ranking files have been updated',
      type: 'success',
      read: true,
      date: new Date(Date.now() - 3600000).toISOString()
    }
  ],
  'deans_office': [
    {
      id: '1',
      title: 'Faculty Rankings Ready',
      message: 'New faculty-wide rankings are available',
      type: 'info',
      read: false,
      date: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Department Files Received',
      message: 'All department ranking files have been received',
      type: 'success',
      read: true,
      date: new Date(Date.now() - 3600000).toISOString()
    }
  ],
  'secretary': [
    {
      id: '1',
      title: 'New Transcript Requests',
      message: '3 new transcript requests require processing',
      type: 'info',
      read: false,
      date: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Diploma Batch Ready',
      message: 'New batch of diplomas is ready for printing',
      type: 'success',
      read: true,
      date: new Date(Date.now() - 3600000).toISOString()
    }
  ]
};

export const getNotifications = async (stakeholder: string): Promise<Notification[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockNotifications[stakeholder] || [];
};

export const markNotificationAsRead = async (stakeholder: string, notificationId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const notifications = mockNotifications[stakeholder];
  if (notifications) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }
}; 