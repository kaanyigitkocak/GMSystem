import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Divider,
  Button,
  IconButton,
  Tooltip,
  LinearProgress,
  Avatar,
  Chip,
  Alert
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ArrowForward as ArrowForwardIcon,
  PeopleAlt as PeopleAltIcon,
  School as SchoolIcon,
  CalendarMonth as CalendarMonthIcon,
  FileUpload as FileUploadIcon,
  ListAlt as ListAltIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';
import { getNotifications, getGraduationRequests, getDashboardStats } from '../services';
import type { Notification, GraduationRequest } from '../services/types';

const SecretaryDashboardPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pendingRequests, setPendingRequests] = useState<GraduationRequest[]>([]);
  const [graduatesCount, setGraduatesCount] = useState<number>(0);
  const [graduationDate, setGraduationDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{
    notifications: boolean;
    requests: boolean;
    stats: boolean;
  }>({
    notifications: false,
    requests: false,
    stats: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrors({
        notifications: false,
        requests: false,
        stats: false
      });
      
      try {
        const notificationsData = await getNotifications().catch(error => {
          console.error('Error fetching notifications:', error);
          setErrors(prev => ({ ...prev, notifications: true }));
          return [];
        });
        
        const requestsData = await getGraduationRequests().catch(error => {
          console.error('Error fetching graduation requests:', error);
          setErrors(prev => ({ ...prev, requests: true }));
          return [];
        });
        
        const statsData = await getDashboardStats().catch(error => {
          console.error('Error fetching dashboard stats:', error);
          setErrors(prev => ({ ...prev, stats: true }));
          return { graduatesCount: 0, graduationDate: '' };
        });
        
        setNotifications(notificationsData);
        setPendingRequests(requestsData);
        setGraduatesCount(statsData.graduatesCount);
        setGraduationDate(statsData.graduationDate);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

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

  const formatGraduationDate = (dateStr: string) => {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  if (loading) {
    return (
      <SecretaryDashboardLayout>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </SecretaryDashboardLayout>
    );
  }

  return (
    <SecretaryDashboardLayout>
      <Box sx={{ mb: 4 }}>
        {(errors.notifications || errors.requests || errors.stats) && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
          >
            Unable to load some dashboard data. Please try refreshing the page.
          </Alert>
        )}
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
          {/* Welcome Section */}
          <Box gridColumn="span 12">
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Welcome!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome to the Secretary Panel of the Graduation Management System. From here, you can manage the graduation process,
                upload transcripts, and create department ranking lists.
              </Typography>
            </Paper>
          </Box>

          {/* Quick Action Cards */}
          <Box gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <Typography variant="h6" sx={{ mb: 2 }} fontWeight="medium">
              Quick Actions
            </Typography>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              <Box gridColumn="span 6">
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                  onClick={() => navigate('/secretary/transcripts')}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <FileUploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight="medium">
                      Upload Transcripts
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upload transcripts and check graduation requirements
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box gridColumn="span 6">
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                  onClick={() => navigate('/secretary/ranking')}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <ListAltIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h6" fontWeight="medium">
                      Ranking List
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create department graduation ranking
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>

          {/* Summary Stats */}
          <Box gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <Typography variant="h6" sx={{ mb: 2 }} fontWeight="medium">
              Status Summary
            </Typography>
            <Paper sx={{ p: 2 }}>
              {errors.stats || errors.requests ? (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="error">
                    Unable to load status data
                  </Typography>
                </Box>
              ) : (
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                  <Box gridColumn="span 6">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                        <PeopleAltIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Pending Requests
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {pendingRequests.length}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box gridColumn="span 6">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'info.light', mr: 2 }}>
                        <NotificationsIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Notifications
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {notifications.filter(n => !n.read).length}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box gridColumn="span 6">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                        <SchoolIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Graduates
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {graduatesCount}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box gridColumn="span 6">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'warning.light', mr: 2 }}>
                        <CalendarMonthIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Graduation Date
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {formatGraduationDate(graduationDate)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Paper>
          </Box>
          
          {/* Recent Notifications */}
          <Box gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <Typography variant="h6" sx={{ mb: 2 }} fontWeight="medium">
              Recent Notifications
            </Typography>
            <Paper>
              <List sx={{ p: 0 }}>
                {errors.notifications ? (
                  <ListItem sx={{ px: 2, py: 3 }}>
                    <ListItemText 
                      primary="Unable to load notifications"
                      secondary="There was an error fetching notification data"
                      sx={{ textAlign: 'center', color: 'error.main' }}
                    />
                  </ListItem>
                ) : notifications.length > 0 ? (
                  notifications.slice(0, 4).map((notification, index) => (
                    <React.Fragment key={notification.id}>
                      <ListItem
                        sx={{ 
                          bgcolor: notification.read ? 'transparent' : 'rgba(0, 0, 0, 0.02)',
                          px: 2, py: 1.5 
                        }}
                        secondaryAction={
                          <IconButton edge="end" aria-label="view">
                            <ArrowForwardIcon fontSize="small" />
                          </IconButton>
                        }
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {getNotificationIcon(notification.type)}
                        </ListItemIcon>
                        <ListItemText 
                          primary={notification.title}
                          secondary={
                            <Typography variant="body2" color="text.secondary" noWrap>
                              {notification.message}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < notifications.slice(0, 4).length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem sx={{ px: 2, py: 3 }}>
                    <ListItemText 
                      primary="No notifications"
                      secondary="You're all caught up!"
                      sx={{ textAlign: 'center' }}
                    />
                  </ListItem>
                )}
              </List>
              <Divider />
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Button 
                  size="small" 
                  onClick={() => navigate('/secretary/notifications')}
                  sx={{ fontWeight: 500 }}
                >
                  View All Notifications
                </Button>
              </Box>
            </Paper>
          </Box>
          
          {/* Graduation Requests */}
          <Box gridColumn={{ xs: 'span 12', md: 'span 6' }}>
            <Typography variant="h6" sx={{ mb: 2 }} fontWeight="medium">
              Pending Graduation Requests
            </Typography>
            <Paper>
              <List sx={{ p: 0 }}>
                {errors.requests ? (
                  <ListItem sx={{ px: 2, py: 3 }}>
                    <ListItemText 
                      primary="Unable to load requests"
                      secondary="There was an error fetching request data"
                      sx={{ textAlign: 'center', color: 'error.main' }}
                    />
                  </ListItem>
                ) : pendingRequests.length > 0 ? (
                  pendingRequests.slice(0, 4).map((request, index) => (
                    <React.Fragment key={request.id}>
                      <ListItem
                        sx={{ px: 2, py: 1.5 }}
                        secondaryAction={
                          <Chip 
                            label={request.status} 
                            size="small"
                            color={
                              request.status === 'pending' 
                                ? 'warning' 
                                : request.status === 'approved' 
                                  ? 'success' 
                                  : 'error'
                            }
                          />
                        }
                      >
                        <ListItemText 
                          primary={`${request.studentName} (${request.studentId})`}
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {request.requestType} • Submitted on {request.date}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < pendingRequests.slice(0, 4).length - 1 && <Divider />}
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem sx={{ px: 2, py: 3 }}>
                    <ListItemText 
                      primary="No pending requests"
                      secondary="All graduation requests have been processed"
                      sx={{ textAlign: 'center' }}
                    />
                  </ListItem>
                )}
              </List>
              <Divider />
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Button 
                  size="small" 
                  onClick={() => navigate('/secretary/requests')}
                  sx={{ fontWeight: 500 }}
                >
                  View All Requests
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </SecretaryDashboardLayout>
  );
};

export default SecretaryDashboardPage; 