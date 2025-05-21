import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Grid as MuiGrid,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';
import StudentAffairsDashboardLayout from '../layout/StudentAffairsDashboardLayout';
import { getStudents, getNotifications, getGraduationDecisions } from '../services/studentAffairsService';
import { useAuth } from '../../auth/contexts/AuthContext';
import type { Notification } from '../types';

// Define Grid component with proper typing
const Grid = MuiGrid as any;

// Define types for graduation decisions
interface GraduationDecision {
  id: string;
  meetingDate: string;
  decisionNumber: string;
  faculty: string;
  department: string;
  academicYear: string;
  semester: string;
  students: Array<{
    id: string;
    name: string;
    studentId: string;
    status: string;
  }>;
}

const StudentAffairsDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    eligibleStudents: 0,
    pendingStudents: 0,
    notEligibleStudents: 0
  });
  const [recentNotifications, setRecentNotifications] = useState<Notification[]>([]);
  const [recentDecisions, setRecentDecisions] = useState<GraduationDecision[]>([]);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch students data
        const studentsData = await getStudents();
        
        // Calculate statistics
        const eligible = studentsData.filter(s => s.graduationStatus === 'Eligible').length;
        const pending = studentsData.filter(s => s.graduationStatus === 'Pending').length;
        const notEligible = studentsData.filter(s => s.graduationStatus === 'Not Eligible').length;
        
        setStats({
          totalStudents: studentsData.length,
          eligibleStudents: eligible,
          pendingStudents: pending,
          notEligibleStudents: notEligible
        });
        
        // Fetch notifications
        const notificationsData = await getNotifications();
        setRecentNotifications(notificationsData.slice(0, 5));
        
        // Fetch graduation decisions
        const decisionsData = await getGraduationDecisions();
        setRecentDecisions(decisionsData.slice(0, 3));
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <StudentAffairsDashboardLayout>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mb: 4 }}>
          {/* Welcome Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Welcome, {user?.name || 'Student Affairs Officer'}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome to the Student Affairs Panel of the Graduation Management System. From this panel, you can determine student certificates, generate university ranking lists, and upload graduation decisions for each department.
            </Typography>
          </Paper>
          
          {/* Statistics Section */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Total Students
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {stats.totalStudents}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: 'success.light' }}>
                <CardContent>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Eligible for Graduation
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {stats.eligibleStudents}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: 'warning.light' }}>
                <CardContent>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Pending Review
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {stats.pendingStudents}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: 'error.light' }}>
                <CardContent>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Not Eligible
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {stats.notEligibleStudents}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Quick Actions Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => navigate('/student-affairs/university-rankings')}
                  sx={{
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    textTransform: 'none'
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 40 }} />
                  <Typography variant="body1">
                    University Rankings
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  color="info"
                  fullWidth
                  onClick={() => navigate('/student-affairs/upload-graduation-decisions')}
                  sx={{
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    textTransform: 'none'
                  }}
                >
                  <UploadFileIcon sx={{ fontSize: 40 }} />
                  <Typography variant="body1">
                    Upload Decisions
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{
                    height: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    textTransform: 'none'
                  }}
                >
                  <EmailIcon sx={{ fontSize: 40 }} />
                  <Typography variant="body1">
                    Send Notifications
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Recent Activities Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Recent Notifications
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {recentNotifications.map((notification) => (
                    <ListItem key={notification.id} divider>
                      <ListItemText 
                        primary={notification.title} 
                        secondary={notification.message}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="text" 
                    color="primary"
                    onClick={() => navigate('/student-affairs/notifications')}
                  >
                    View All
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Recent Graduation Decisions
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {recentDecisions.map((decision) => (
                    <ListItem key={decision.id} divider>
                      <ListItemText 
                        primary={`${decision.faculty} - ${decision.department}`} 
                        secondary={`Decision #${decision.decisionNumber} | ${decision.meetingDate} | ${decision.students.length} students`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    variant="text" 
                    color="primary"
                    onClick={() => navigate('/student-affairs/upload-graduation-decisions')}
                  >
                    View All
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </StudentAffairsDashboardLayout>
  );
};

export default StudentAffairsDashboardPage; 