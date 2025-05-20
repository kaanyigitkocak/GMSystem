import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Chip from '@mui/material/Chip';
import { School, Email, ListAlt, Notifications, CalendarToday, Group, AssignmentTurnedIn, Warning, CheckCircle, Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import type { Notification } from '../services/studentAffairsService';
import { getNotifications } from '../services/studentAffairsService';

const mockStatus = {
  pendingRequests: 4,
  notifications: 3,
  graduates: 23,
  graduationDate: 'Jun 15',
};

const statusIcon = {
  pendingRequests: <AssignmentTurnedIn color="error" />,
  notifications: <Notifications color="primary" />,
  graduates: <Group color="success" />,
  graduationDate: <CalendarToday color="warning" />,
};

const StudentAffairsDashboardPage = () => {
  const navigate = useNavigate();
  // Graduation process status: false = not initialized, true = initialized
  const [graduationInitialized, setGraduationInitialized] = useState(false);
  const fileInputRef = useRef(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  // For demo: simulate mail send by toggling status (in real app, this would be set after mail send)
  const handleSimulateMailSend = () => setGraduationInitialized(true);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome!</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome to the Student Affairs Panel of the Graduation Management System. 
      </Typography>
      <Grid container spacing={3}>
        {/* Quick Actions - always at the top, full width */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {/* Upload Ranking File Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{ flex: 1 }}
                onClick={() => fileInputRef.current && (fileInputRef.current as HTMLInputElement).click()}
              >
                Upload Ranking File
              </Button>
              <input
                type="file"
                accept=".csv,.pdf,.xlsx"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    alert(`Selected file: ${e.target.files[0].name}`);
                    // Burada dosya yükleme işlemi başlatılabilir
                  }
                }}
              />
              {/* Send Graduation Mail Button */}
              <Button
                variant="contained"
                color="secondary"
                sx={{ flex: 1 }}
                onClick={() => navigate('/student-affairs/send-graduation-mail')}
              >
                Send Graduation Mail
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      {/* New row for notifications and status */}
      <Grid container spacing={3}>
        {/* Notifications & Status side by side */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
            <Typography variant="h6" gutterBottom>Recent Notifications</Typography>
            <List sx={{ flex: 1 }}>
              {notifications.map((n, i) => (
                <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: n.type === 'info' ? 'primary.main' : n.type === 'success' ? 'success.main' : 'warning.main' }}>
                      {n.type === 'info' && <Notifications />}
                      {n.type === 'success' && <CheckCircle />}
                      {n.type === 'warning' && <Warning />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={n.title} secondary={n.desc} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 2, bgcolor: graduationInitialized ? 'success.lighter' : 'error.lighter' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Avatar sx={{ bgcolor: graduationInitialized ? 'success.main' : 'error.main', width: 56, height: 56, mr: 2 }}>
                {graduationInitialized ? <CheckCircle fontSize="large" /> : <Cancel fontSize="large" />}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color={graduationInitialized ? 'success.main' : 'error.main'}>
                  {graduationInitialized ? 'Graduation Process Initialized' : 'Graduation Process Not Initialized'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {graduationInitialized
                    ? 'The graduation process has been started. All department secretaries have been notified.'
                    : 'The graduation process has not been started yet.'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentAffairsDashboardPage; 