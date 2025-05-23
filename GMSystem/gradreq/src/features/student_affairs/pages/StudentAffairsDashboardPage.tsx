import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { useAuth } from "../../auth/contexts/AuthContext";
import StudentAffairsDashboardLayout from "../layout/StudentAffairsDashboardLayout";
import { useStudentAffairsDashboard } from "../hooks";
import DashboardStats from "../components/DashboardStats";
import QuickActions from "../components/QuickActions";
import RecentActivities from "../components/RecentActivities";

const StudentAffairsDashboardPage = () => {
  const { user } = useAuth();
  const { loading, stats, recentNotifications, recentDecisions, error } = useStudentAffairsDashboard();

  if (loading) {
    return (
      <StudentAffairsDashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </StudentAffairsDashboardLayout>
    );
  }

  if (error) {
    return (
      <StudentAffairsDashboardLayout>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </StudentAffairsDashboardLayout>
    );
  }

  return (
    <StudentAffairsDashboardLayout>
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
        <DashboardStats stats={stats} />
        
        {/* Quick Actions Section */}
        <QuickActions />
        
        {/* Recent Activities Section */}
        <RecentActivities 
          recentNotifications={recentNotifications} 
          recentDecisions={recentDecisions} 
        />
      </Box>
    </StudentAffairsDashboardLayout>
  );
};

export default StudentAffairsDashboardPage; 