import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid
} from '@mui/material';
import {
  Description as DescriptionIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import GraduationProgressTracker from './GraduationProgressTracker';

const DashboardHome = () => {
  return (
    <>
      {/* Graduation Progress Bar - Only shown on dashboard home */}
      <GraduationProgressTracker />
      
      <Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
        <Grid sx={{ width: { xs: '100%', md: '33.33%' }, padding: '0 16px' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Transcript Check
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                You can view your transcript, check your courses, grades, and graduation status.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button 
                variant="contained" 
                size="medium"
                component={RouterLink}
                to="/student/transcript"
              >
                View Transcript
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid sx={{ width: { xs: '100%', md: '33.33%' }, padding: '0 16px' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Graduation Requirements
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                You can view your department's graduation requirements and check your progress.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button 
                variant="contained" 
                size="medium"
                component={RouterLink}
                to="/student/requirements"
              >
                View Requirements
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid sx={{ width: { xs: '100%', md: '33.33%' }, padding: '0 16px' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Manual Check Request
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                For special cases like Article 19 or summer school, you can request a manual graduation check.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button 
                variant="contained" 
                size="medium"
                component={RouterLink}
                to="/student/manual-check"
              >
                Request Manual Check
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid sx={{ width: { xs: '100%', md: '33.33%' }, mt: 3, padding: '0 16px' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <UploadIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Disengagement Certificates
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Upload your disengagement certificates from various departments to complete your graduation process.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button 
                variant="contained" 
                size="medium"
                component={RouterLink}
                to="/student/disengagement"
              >
                Upload Certificates
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardHome; 