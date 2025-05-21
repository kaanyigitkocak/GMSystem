import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Alert,
  CircularProgress,
  IconButton,
  Stack
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  AccessTime as AccessTimeIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import AdvisorDashboardLayout from '../layout/AdvisorDashboardLayout';
import { 
  getAdvisorStatistics, 
  getManualCheckRequests, 
  getNotifications, 
  getUpcomingDeadlines 
} from '../services/advisorService';
import { 
  AdvisorStatistics, 
  ManualCheckRequest, 
  Notification, 
  UpcomingDeadline 
} from '../types';
import { useAuth } from '../../auth/contexts/AuthContext';

const AdvisorDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<AdvisorStatistics>({
    totalStudents: 0,
    pendingGraduations: 0,
    manualCheckRequests: 0
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [manualRequests, setManualRequests] = useState<ManualCheckRequest[]>([]);
  const [deadlines, setDeadlines] = useState<UpcomingDeadline[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch data in parallel for efficiency
        const [statsData, notifData, requestsData, deadlinesData] = await Promise.all([
          getAdvisorStatistics(),
          getNotifications(),
          getManualCheckRequests(),
          getUpcomingDeadlines()
        ]);
        
        setStatistics(statsData);
        setNotifications(notifData);
        setManualRequests(requestsData);
        setDeadlines(deadlinesData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    switch(type) {
      case 'warning': return <WarningIcon color="warning" />;
      case 'success': return <CheckCircleIcon color="success" />;
      case 'error': return <ErrorIcon color="error" />;
      default: return <NotificationsIcon color="info" />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('tr-TR', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <AdvisorDashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </AdvisorDashboardLayout>
    );
  }

  return (
    <AdvisorDashboardLayout>
      <Box sx={{ mb: 4 }}>
        {/* Welcome Banner */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Welcome, {user?.name || 'Advisor'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to the Advisor Panel of the Graduation Management System. From this panel, you can manage your students, 
            review graduation requests, create petitions, and respond to manual check requests.
          </Typography>
        </Paper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.light', mb: 2, width: 56, height: 56 }}>
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="div" fontWeight="bold">
                  {statistics.totalStudents}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Students
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'info.light', mb: 2, width: 56, height: 56 }}>
                  <SchoolIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="div" fontWeight="bold">
                  {statistics.pendingGraduations}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Pending Graduation Reviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'warning.light', mb: 2, width: 56, height: 56 }}>
                  <AssignmentTurnedInIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" component="div" fontWeight="bold">
                  {statistics.manualCheckRequests}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manual Check Requests
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Action Buttons */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate('/advisor/students')}
                sx={{
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  textTransform: 'none'
                }}
              >
                <PersonIcon sx={{ fontSize: 40 }} />
                <Typography variant="body1">
                  My Students
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => navigate('/advisor/manual-check')}
                sx={{
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  textTransform: 'none'
                }}
              >
                <AssignmentTurnedInIcon sx={{ fontSize: 40 }} />
                <Typography variant="body1">
                  Manual Check Requests
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                variant="contained"
                color="info"
                fullWidth
                onClick={() => navigate('/advisor/petitions')}
                sx={{
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  textTransform: 'none'
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: 40 }} />
                <Typography variant="body1">
                  Create New Petition
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Recent Activities and Alerts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Latest Notifications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {notifications.length === 0 ? (
                <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No new notifications
                </Typography>
              ) : (
                <List>
                  {notifications.slice(0, 4).map((notification) => (
                    <ListItem key={notification.id} divider>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {getNotificationIcon(notification.type)}
                      </ListItemIcon>
                      <ListItemText 
                        primary={notification.title} 
                        secondary={notification.message}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="outlined" 
                  size="small"
                >
                  View All Notifications
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack spacing={3} sx={{ height: '100%' }}>
              {/* Important Deadlines */}
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AccessTimeIcon color="warning" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Upcoming Deadlines
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {deadlines.length === 0 ? (
                  <Typography color="text.secondary" sx={{ py: 1, textAlign: 'center' }}>
                    No upcoming deadlines
                  </Typography>
                ) : (
                  <List dense disablePadding>
                    {deadlines.map((deadline) => (
                      <ListItem key={deadline.id} sx={{ px: 0 }}>
                        <ListItemText 
                          primary={deadline.title} 
                          secondary={
                            <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                              {formatDate(deadline.date)}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>

              {/* Recent Check Requests */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Recent Manual Check Requests
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {manualRequests.length === 0 ? (
                  <Typography color="text.secondary" sx={{ py: 1, textAlign: 'center' }}>
                    No pending manual check requests
                  </Typography>
                ) : (
                  <List dense disablePadding>
                    {manualRequests.slice(0, 3).map((request) => (
                      <ListItem 
                        key={request.id} 
                        sx={{ 
                          px: 0, 
                          borderLeft: `3px solid ${
                            request.status === 'pending' 
                              ? 'warning.main' 
                              : request.status === 'approved' 
                                ? 'success.main' 
                                : request.status === 'rejected' 
                                  ? 'error.main' 
                                  : 'info.main'
                          }`,
                          pl: 1,
                          mb: 1
                        }}
                      >
                        <ListItemText 
                          primary={request.studentName} 
                          secondary={request.requestType}
                        />
                        <Button 
                          variant="outlined" 
                          size="small" 
                          component={RouterLink} 
                          to={`/advisor/manual-check/${request.id}`}
                        >
                          Review
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                )}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    component={RouterLink}
                    to="/advisor/manual-check"
                  >
                    View All Requests
                  </Button>
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </AdvisorDashboardLayout>
  );
};

export default AdvisorDashboardPage;
