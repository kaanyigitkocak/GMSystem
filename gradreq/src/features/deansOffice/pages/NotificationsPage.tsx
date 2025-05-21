import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Button
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkEmailReadIcon
} from '@mui/icons-material';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';
import { getNotifications, markNotificationAsRead } from '../../../shared/services/notificationsService';
import type { Notification } from '../../../shared/components/NotificationsPanel';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications('deans_office');
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
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
    markNotificationAsRead('deans_office', id);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
    notifications.forEach(n => markNotificationAsRead('deans_office', n.id));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'success':
        return <CheckCircleIcon color="success" />;
      default:
        return <NotificationsIcon color="info" />;
    }
  };

  const filteredNotifications =
    activeTab === 0
      ? notifications
      : activeTab === 1
        ? notifications.filter(n => !n.read)
        : notifications.filter(n => n.read);

  return (
    <DeansOfficeDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              Notifications
            </Typography>
            <Box>
              <Button
                startIcon={<MarkEmailReadIcon />}
                onClick={handleMarkAllAsRead}
                disabled={!notifications.some(n => !n.read)}
                size="small"
              >
                Mark all as read
              </Button>
            </Box>
          </Box>

          <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tab label="All" />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Unread</span>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <Chip
                      size="small"
                      color="primary"
                      label={notifications.filter(n => !n.read).length}
                      sx={{ ml: 1, height: 20, fontSize: '0.75rem' }}
                    />
                  )}
                </Box>
              }
            />
            <Tab label="Read" />
          </Tabs>

          <List>
            {filteredNotifications.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No notifications"
                  secondary="You're all caught up!"
                  sx={{ textAlign: 'center' }}
                />
              </ListItem>
            ) : (
              filteredNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    sx={{
                      bgcolor: notification.read ? 'transparent' : 'rgba(0, 0, 0, 0.02)',
                      py: 2
                    }}
                    secondaryAction={
                      <Box>
                        {!notification.read && (
                          <IconButton
                            edge="end"
                            aria-label="mark as read"
                            onClick={() => handleMarkAsRead(notification.id)}
                            sx={{ mr: 1 }}
                          >
                            <MarkEmailReadIcon fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(notification.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {getNotificationIcon(notification.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" component="div" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                          {notification.title}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" component="div" sx={{ color: 'text.secondary', mb: 0.5 }}>
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                            {new Date(notification.date).toLocaleString()}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < filteredNotifications.length - 1 && <Divider />}
                </React.Fragment>
              ))
            )}
          </List>
        </Paper>
      </Box>
    </DeansOfficeDashboardLayout>
  );
};

export default NotificationsPage; 