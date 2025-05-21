import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DeansOfficeSidebar from './Sidebar';
import NotificationsPanel from '../../../shared/components/NotificationsPanel';
import { getNotifications, markNotificationAsRead } from '../../../shared/services/notificationsService';

const DeansOfficeLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <DeansOfficeSidebar />
      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Box sx={{ width: 320 }}>
          <NotificationsPanel
            getNotifications={() => getNotifications('deans_office')}
            markAsRead={(id) => markNotificationAsRead('deans_office', id)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DeansOfficeLayout; 