import { Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../../auth/contexts/AuthContext';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';
import { useDeansOfficeDashboard } from '../hooks';
import {
  DashboardQuickActions,
  DashboardStats,
  DepartmentStatusList,
  RecentActivitiesList
} from '../components';

const DeansOfficeDashboardPage = () => {
  const { user } = useAuth();
  const {
    departmentStats,
    recentActivities,
    stats,
    statusMessage,
    clearStatusMessage
  } = useDeansOfficeDashboard(user?.name);

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
          <Alert 
            severity="info" 
            sx={{ mt: 2 }}
            onClose={clearStatusMessage}
          >
            {statusMessage}
          </Alert>
        )}
      </Box>
      
      {/* Quick Actions */}
      <DashboardQuickActions />
      
      {/* Statistics */}
      <DashboardStats 
        uploadedCount={stats.uploadedCount}
        totalDepartments={stats.totalDepartments}
        uploadProgress={stats.uploadProgress}
      />
      
      {/* Department Status and Recent Activities */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 3 
      }}>
        <DepartmentStatusList departmentStats={departmentStats} />
        <RecentActivitiesList recentActivities={recentActivities} />
      </Box>
    </DeansOfficeDashboardLayout>
  );
};

export default DeansOfficeDashboardPage;