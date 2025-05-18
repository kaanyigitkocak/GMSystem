import { useState, useEffect } from 'react';
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
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
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

import SecretaryDashboard from '../components/layout/SecretaryDashboard';
import { getNotifications, getGraduationRequests } from '../services/secretaryService';
import type { Notification, GraduationRequest } from '../types/secretary';

const SecretaryDashboardPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pendingRequests, setPendingRequests] = useState<GraduationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [notificationsData, requestsData] = await Promise.all([
          getNotifications(),
          getGraduationRequests()
        ]);
        
        setNotifications(notificationsData);
        setPendingRequests(requestsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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

  const getProgressValue = () => {
    // Simulating graduation progress based on various factors
    // In a real application, this would come from the backend
    return 45;
  };

  if (loading) {
    return (
      <SecretaryDashboard>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </SecretaryDashboard>
    );
  }

  return (
    <SecretaryDashboard>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Welcome!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome to the Secretary Panel of the Graduation Management System. From here, you can manage the graduation process,
                upload transcripts, and create department ranking lists.
              </Typography>
            </Paper>
          </Grid>

          {/* Quick Action Cards */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }} fontWeight="medium">
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              </Grid>
              <Grid item xs={6}>
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
              </Grid>
            </Grid>
          </Grid>

          {/* Summary Stats */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }} fontWeight="medium">
              Status Summary
            </Typography>
            <Paper sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'success.light', mr: 2 }}>
                      <SchoolIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Graduates
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        23
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'warning.light', mr: 2 }}>
                      <CalendarMonthIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Deadline
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        June 15
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Graduation Process Progress
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={getProgressValue()} 
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2" align="right">
                  {getProgressValue()}% Completed
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Pending Graduation Requests */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }} fontWeight="medium">
              Pending Graduation Requests
            </Typography>
            <Paper sx={{ height: '100%' }}>
              {pendingRequests.length > 0 ? (
                <List disablePadding>
                  {pendingRequests.map((request, index) => (
                    <>
                      <ListItem
                        key={request.id}
                        secondaryAction={
                          <Tooltip title="Process">
                            <IconButton edge="end" color="primary">
                              <ArrowForwardIcon />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <ListItemText
                          primary={request.studentName}
                          secondary={`Advisor: ${request.advisorName} | ${new Date(request.requestDate).toLocaleDateString()}`}
                        />
                      </ListItem>
                      {index < pendingRequests.length - 1 && <Divider component="li" />}
                    </>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No pending graduation requests.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">
                Notifications
              </Typography>
              <Button 
                size="small" 
                variant="outlined" 
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/secretary/notifications')}
              >
                View All
              </Button>
            </Box>
            <Paper sx={{ height: '100%' }}>
              {notifications.length > 0 ? (
                <List disablePadding>
                  {notifications.slice(0, 3).map((notification, index) => (
                    <>
                      <ListItem key={notification.id} alignItems="flex-start">
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {getNotificationIcon(notification.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle2">
                                {notification.title}
                              </Typography>
                              {!notification.read && <Chip label="New" size="small" color="primary" />}
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                                sx={{ display: 'inline' }}
                              >
                                {notification.message}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                sx={{ display: 'block', mt: 0.5, fontSize: '0.75rem' }}
                              >
                                {new Date(notification.date).toLocaleString()}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < Math.min(notifications.length, 3) - 1 && <Divider variant="inset" component="li" />}
                    </>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No notifications.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </SecretaryDashboard>
  );
};

export default SecretaryDashboardPage; 