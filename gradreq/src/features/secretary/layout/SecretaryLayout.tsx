import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SecretarySidebar from './Sidebar';
import NotificationsPanel from '../../../shared/components/NotificationsPanel';
import { getNotifications, markNotificationAsRead } from '../../../shared/services/notificationsService';

const SecretaryLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <SecretarySidebar />
      <Box sx={{ flexGrow: 1, p: 3, display: 'flex', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Box sx={{ width: 320 }}>
          <NotificationsPanel
            getNotifications={() => getNotifications('secretary')}
            markAsRead={(id) => markNotificationAsRead('secretary', id)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SecretaryLayout; 