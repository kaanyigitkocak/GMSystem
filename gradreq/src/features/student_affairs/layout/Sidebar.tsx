import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StudentAffairsSidebar = () => (
  <Box sx={{ width: 220, bgcolor: 'background.paper', height: '100vh', p: 2, borderRight: 1, borderColor: 'divider' }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Student Affairs
    </Typography>
    <List>
      <ListItem button component={NavLink} to="/student-affairs/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={NavLink} to="/student-affairs/university-rankings">
        <ListItemText primary="University Rankings" />
      </ListItem>
    </List>
  </Box>
);

export default StudentAffairsSidebar; 