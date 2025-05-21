import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NotificationsPanel from '../../../shared/components/NotificationsPanel';
import { getNotifications, markNotificationAsRead } from '../../../shared/services/notificationsService';

const StudentAffairsLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Box sx={{ width: 320 }}>
          <NotificationsPanel
            getNotifications={() => getNotifications('student_affairs')}
            markAsRead={(id) => markNotificationAsRead('student_affairs', id)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentAffairsLayout; 