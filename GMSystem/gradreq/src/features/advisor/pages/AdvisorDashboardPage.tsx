import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  Divider,
  Alert
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const mockStats = {
  totalStudents: 24,
  pendingGraduation: 3,
  manualCheckRequests: 2,
};

const mockAlerts = [
  { id: 1, message: 'Petition deadline: May 30, 2025' },
  { id: 2, message: 'Student John Doe is at risk of not graduating' },
];

const mockNotifications = [
  { id: 1, title: 'Graduation approval pending', detail: '3 students are waiting for your approval.' },
  { id: 2, title: 'Manual check request', detail: 'A new manual check request has been submitted.' },
];

const AdvisorDashboardPage = () => {
  const navigate = useNavigate();
  const [stats] = useState(mockStats);
  const [alerts] = useState(mockAlerts);
  const [notifications] = useState(mockNotifications);

  const pendingRequests = [
    { id: 1, studentName: 'Ahmet Yilmaz', requestType: 'Transcript Review', date: '2023-08-15' },
    { id: 2, studentName: 'Ayse Kaya', requestType: 'Petition', date: '2023-08-17' },
    { id: 3, studentName: 'Mehmet Demir', requestType: 'Graduation Review', date: '2023-08-20' },
  ];

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Advisor Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Welcome, you can manage your students' graduation process and view important updates here.
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <strong>Tip:</strong> Use the sidebar to quickly access your students, review manual check requests, and send petitions.
        </Alert>
      </Box>
      <Grid container spacing={3}>
        {/* Example Announcement */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Announcement
            </Typography>
            <Typography>
              The graduation review period for Spring 2025 has started. Please check your students' status and approve eligible candidates.
            </Typography>
          </Paper>
        </Grid>
        {/* Statistics */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{ 
              height: '100%',
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Typography variant="h3" color="primary" gutterBottom>
              {stats.totalStudents}
            </Typography>
            <Typography variant="body1">Total Students</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{ 
              height: '100%',
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Typography variant="h3" color="warning.main" gutterBottom>
              {stats.pendingGraduation}
            </Typography>
            <Typography variant="body1">Pending Graduation</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{ 
              height: '100%',
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Typography variant="h3" color="success.main" gutterBottom>
              {stats.manualCheckRequests}
            </Typography>
            <Typography variant="body1">Manual Check Requests</Typography>
          </Paper>
        </Grid>

        {/* Pending Requests */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Pending Requests" 
            />
            <CardContent>
              <List>
                {pendingRequests.map((request, index) => (
                  <Box key={request.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${request.studentName} - ${request.requestType}`}
                        secondary={`Request Date: ${request.date}`}
                      />
                      <Button variant="outlined" size="small">
                        Review
                      </Button>
                    </ListItem>
                    {index < pendingRequests.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Alerts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Alerts
            </Typography>
            <Box sx={{ mb: 2 }}>
              {alerts.map(alert => (
                <Alert key={alert.id} severity="warning" sx={{ mb: 1 }}>{alert.message}</Alert>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={() => navigate('/advisor/my-students')}>My Students</Button>
              <Button variant="contained" onClick={() => navigate('/advisor/manual-check-requests')}>Manual Check Requests</Button>
              <Button variant="contained" color="secondary" onClick={() => navigate('/advisor/petition-management')}>Petition Management</Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Notifications & Tasks */}
        <Grid item xs={12}>
          <Card>
            <CardHeader 
              title="Recent Notifications & Tasks" 
            />
            <CardContent>
              <List>
                {notifications.map(n => (
                  <ListItem key={n.id} divider>
                    <ListItemText primary={n.title} secondary={n.detail} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AdvisorDashboardPage; 