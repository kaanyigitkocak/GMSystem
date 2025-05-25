import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Badge,
  Divider,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as SuccessIcon,
  Close as CloseIcon
} from '@mui/icons-material';

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  date: string;
};

interface NotificationsPanelProps {
  getNotifications: () => Promise<Notification[]>;
  markAsRead: (id: string) => Promise<void>;
  maxHeight?: number;
}

const NotificationsPanel = ({ getNotifications, markAsRead, maxHeight = 400 }: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await getNotifications();
      setNotifications(data);
      setError(null);
    } catch (err) {
      setError('Failed to load notifications');
      console.error('Error loading notifications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <InfoIcon color="info" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'success':
        return <SuccessIcon color="success" />;
      default:
        return <InfoIcon />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
          Notifications
        </Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={loadNotifications} size="small">
            <NotificationsActiveIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress size={24} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : notifications.length === 0 ? (
        <Typography color="text.secondary" align="center">
          No notifications
        </Typography>
      ) : (
        <List sx={{ 
          overflow: 'auto', 
          maxHeight: maxHeight,
          '& .MuiListItem-root': {
            borderLeft: '4px solid transparent',
            '&.unread': {
              borderLeftColor: 'primary.main',
              bgcolor: 'action.hover'
            }
          }
        }}>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              className={notification.read ? '' : 'unread'}
              secondaryAction={
                !notification.read && (
                  <Tooltip title="Mark as read">
                    <IconButton 
                      edge="end" 
                      size="small"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )
              }
            >
              <ListItemIcon>
                {getNotificationIcon(notification.type)}
              </ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(notification.date).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default NotificationsPanel; 