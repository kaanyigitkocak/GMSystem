import { useState, useEffect } from "react";
import { getNotifications } from "../services";
import type { Notification } from "../types";

interface UseNotificationsPageReturn {
  notifications: Notification[];
  activeTab: number;
  loading: boolean;
  filteredNotifications: Notification[];

  // Actions
  handleTabChange: (_event: React.SyntheticEvent, newValue: number) => void;
  handleMarkAsRead: (id: string) => void;
  handleMarkAllAsRead: () => void;
  handleDelete: (id: string) => void;
  getNotificationIcon: (type: Notification["type"]) => React.ReactNode;
}

export const useNotificationsPage = (): UseNotificationsPageReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    // Note: Icons will be imported in the component that uses this hook
    // This function will be implemented in the component
    return null;
  };

  const filteredNotifications =
    activeTab === 0
      ? notifications
      : activeTab === 1
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.read);

  return {
    notifications,
    activeTab,
    loading,
    filteredNotifications,
    handleTabChange,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDelete,
    getNotificationIcon,
  };
};
