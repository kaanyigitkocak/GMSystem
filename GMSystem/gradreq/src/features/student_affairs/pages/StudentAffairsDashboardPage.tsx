import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { useAuth } from "../../auth/contexts/AuthContext";
import { useStudentAffairsDashboard } from "../hooks";
import DashboardStats from "../components/DashboardStats";
import QuickActions from "../components/QuickActions";
import RecentActivities from "../components/RecentActivities";

const StudentAffairsDashboardPage = () => {
  const { user } = useAuth();
  const { loading, stats, recentNotifications, recentDecisions, error } = useStudentAffairsDashboard();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ py: 5 }}> {/* Adjusted for rendering within router-applied layout */}
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}> {/* Adjusted for rendering within router-applied layout */}
        {error}
      </Alert>
    );
  }

  return (
    // Layout is assumed to be applied by the router
    <Box sx={{ mb: 4 }}> {/* Main content container */}
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Welcome, {user?.name || 'Student Affairs Officer'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Student Affairs Panel of the Graduation Management System. From this panel, you can determine student certificates, manage student approvals and rankings, and upload graduation decisions for each department.
        </Typography>
      </Paper>
      
      {/* Statistics Section */}
      {stats && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Dashboard Statistics
          </Typography>
          <DashboardStats stats={stats} />
        </Box>
      )}
      
      {/* Quick Actions Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <QuickActions />
      </Box>
      
      {/* Recent Activities Section */}
      {(recentNotifications && recentNotifications.length > 0) || (recentDecisions && recentDecisions.length > 0) ? (
        <Box> {/* No mb:3 if it's the last section and parent Box has mb:4 */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Recent Activities
          </Typography>
          <RecentActivities 
            recentNotifications={recentNotifications} 
            recentDecisions={recentDecisions} 
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default StudentAffairsDashboardPage;