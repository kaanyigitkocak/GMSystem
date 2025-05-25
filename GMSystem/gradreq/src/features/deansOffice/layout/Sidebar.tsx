import { Box, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

const DeansOfficeSidebar = () => (
  <Box sx={{ width: 220, bgcolor: 'background.paper', height: '100vh', p: 2, borderRight: 1, borderColor: 'divider' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Dean's Office
    </Typography>
    <List>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/deansoffice">
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/deansoffice/approval-ranking">
          <ListItemText primary="Approval & Ranking" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton component={NavLink} to="/deansoffice/notifications">
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </ListItem>
    </List>
  </Box>
);

export default DeansOfficeSidebar; 