import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Stack,
  LinearProgress,
  Alert
} from '@mui/material';
import {
  School as SchoolIcon,
  CloudUpload as CloudUploadIcon,
  FormatListNumbered as FormatListNumberedIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthContext';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';

// Sample data for dashboard
const recentActivities = [
  { id: 1, action: 'Faculty ranking updated', timestamp: '2 hours ago', user: 'Dean\'s Office' },
  { id: 4, action: 'Faculty ranking updated', timestamp: '1 week ago', user: 'Dean\'s Office' },
];

const departmentStats = [
  { department: 'Computer Engineering', filesUploaded: true, lastUpdate: '1 day ago' },
  { department: 'Mathematics', filesUploaded: true, lastUpdate: '2 days ago' },
  { department: 'Physics', filesUploaded: false, lastUpdate: 'N/A' },
  { department: 'Chemistry', filesUploaded: false, lastUpdate: 'N/A' },
  { department: 'Mechanical Engineering', filesUploaded: false, lastUpdate: 'N/A' },
];

const DeansOfficeDashboardPage = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Calculate statistics
  const uploadedCount = departmentStats.filter(dept => dept.filesUploaded).length;
  const totalDepartments = departmentStats.length;
  const uploadProgress = (uploadedCount / totalDepartments) * 100;
  
  useEffect(() => {
    // Set welcome message when component mounts
    setStatusMessage(`Welcome back, ${user?.name || 'Dean'}. ${uploadedCount} out of ${totalDepartments} departments have uploaded their ranking files.`);
    
    // Clear message after 5 seconds
    const timer = setTimeout(() => {
      setStatusMessage(null);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [user, uploadedCount, totalDepartments]);
  
  return (
    <DeansOfficeDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dean's Office Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Overview of faculty ranking process and department submissions
        </Typography>
        
        {statusMessage && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {statusMessage}
          </Alert>
        )}
      </Box>
      
      <Grid container spacing={3}>
        {/* Quick action cards */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', mb: 2, color: 'primary.main' }}>
                    <CloudUploadIcon fontSize="large" />
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Upload Files
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload department ranking files to create faculty rankings.
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button 
                      variant="outlined" 
                      endIcon={<ArrowForwardIcon />} 
                      onClick={() => navigate('/deansoffice/file-upload')}
                      fullWidth
                    >
                      Go to Upload
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', mb: 2, color: 'primary.main' }}>
                    <FormatListNumberedIcon fontSize="large" />
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Faculty Rankings
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    View and manage faculty-wide student rankings by GPA.
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>
                    <Button 
                      variant="outlined" 
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate('/deansoffice/faculty-ranking')}
                      fullWidth
                    >
                      View Rankings
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', mb: 2, color: 'primary.main' }}>
                    <SchoolIcon fontSize="large" />
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    Department Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Check which departments have submitted their ranking files.
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress variant="determinate" value={uploadProgress} />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">{`${Math.round(uploadProgress)}%`}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {uploadedCount} of {totalDepartments} departments have uploaded files
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Department Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Department Submission Status
            </Typography>
            <List>
              {departmentStats.map((dept, index) => (
                <Box key={dept.department}>
                  <ListItem
                    secondaryAction={
                      <Typography variant="caption" color="text.secondary">
                        {dept.lastUpdate}
                      </Typography>
                    }
                  >
                    <ListItemText 
                      primary={dept.department} 
                      secondary={dept.filesUploaded ? 'Files uploaded' : 'Pending upload'}
                      secondaryTypographyProps={{
                        color: dept.filesUploaded ? 'success.main' : 'warning.main'
                      }}
                    />
                  </ListItem>
                  {index < departmentStats.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Recent Activity
              </Typography>
            </Box>
            <List>
              {recentActivities.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText 
                      primary={activity.action}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {activity.timestamp} • {activity.user}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </DeansOfficeDashboardLayout>
  );
};

export default DeansOfficeDashboardPage;