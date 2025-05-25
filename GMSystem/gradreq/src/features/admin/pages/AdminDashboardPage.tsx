import { Typography, Paper, Container, Grid as MuiGrid } from '@mui/material';
import { useAuth } from '../../auth/contexts/AuthContext';

// Define Grid component with proper typing
const Grid = MuiGrid as any;

const AdminDashboardPage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="body1">
              Welcome, {user?.name || 'Administrator'}! This is the admin dashboard where you can manage system settings and users.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage user accounts, roles, and permissions.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              height: 240,
            }}
          >
            <Typography variant="h6" gutterBottom>
              System Settings
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Configure system-wide settings and parameters.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage; 