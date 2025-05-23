import { Grid as MuiGrid, Paper, Typography, Divider, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import type { Notification } from '../types';

const Grid = MuiGrid as any;

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

interface RecentActivitiesProps {
  recentNotifications: Notification[];
  recentDecisions: GraduationDecision[];
}

const RecentActivities = ({ recentNotifications, recentDecisions }: RecentActivitiesProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default RecentActivities; 