import { Box, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

const SecretarySidebar = () => (
  <Box sx={{ width: 220, bgcolor: 'background.paper', height: '100vh', p: 2, borderRight: 1, borderColor: 'divider' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Secretary
    </Typography>
    <List>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/secretary/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/secretary/operations">
          <ListItemText primary="Operations" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/secretary/notifications">
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);

export default SecretarySidebar; 