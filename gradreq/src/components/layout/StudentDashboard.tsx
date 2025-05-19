import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  useTheme,
  useMediaQuery,
  ListItemButton,
  Badge,
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Description as DescriptionIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import iyteLogoPng from '../../core/assets/iyte-logo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Main StudentDashboard component
const StudentDashboard = ({ children }: { children?: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  
  // Menu anchor states
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [messagesAnchor, setMessagesAnchor] = useState<null | HTMLElement>(null);
  
  // Current active path for highlighting navigation
  const pathname = window.location.pathname;
  
  // Menu handlers
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };
  
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };
  
  const handleMessagesOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMessagesAnchor(event.currentTarget);
  };
  
  const handleMessagesClose = () => {
    setMessagesAnchor(null);
  };
  
  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
  };
  
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const drawerWidth = 240;
  
  // Navigation items
  const navItems = [
    { path: '/student', icon: <DashboardIcon />, label: 'Dashboard', exact: true },
    { path: '/student/transcript', icon: <DescriptionIcon />, label: 'My Transcript' },
    { path: '/student/requirements', icon: <SchoolIcon />, label: 'Graduation Requirements' },
    { path: '/student/manual-check', icon: <CheckCircleIcon />, label: 'Manual Check' },
    { path: '/student/disengagement', icon: <UploadIcon />, label: 'Disengagement Certificates' }
  ];
  
  // Check if a navigation item is active
  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };
  
  // Sidebar drawer content
  const drawer = (
    <>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          p: 2, 
          borderBottom: `1px solid ${theme.palette.divider}` 
        }}
      >
        <Box 
          component="img" 
          src={iyteLogoPng} 
          alt="IYTE Logo" 
          sx={{ width: 120, height: 'auto', mb: 1 }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main, textAlign: 'center' }}>
          Graduation Management System
        </Typography>
        {isMobile && (
          <IconButton 
            onClick={toggleDrawer} 
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              selected={isActive(item.path, item.exact)}
              onClick={isMobile ? toggleDrawer : undefined}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <List sx={{ mt: 'auto' }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 }
        }}
      >
        {/* Mobile drawer */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { 
                width: drawerWidth,
                boxSizing: 'border-box' 
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': { 
                width: drawerWidth,
                boxSizing: 'border-box',
                border: 'none'
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      
      {/* Main content */}
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto',
        width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }
      }}>
        {/* Top AppBar */}
        <AppBar 
          position="fixed"
          color="default" 
          elevation={1}
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student Panel
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Notifications Button */}
              <IconButton 
                color="inherit" 
                sx={{ ml: 1 }}
                onClick={handleNotificationsOpen}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              
              {/* Messages Button */}
              <IconButton 
                color="inherit" 
                sx={{ ml: 1 }}
                onClick={handleMessagesOpen}
              >
                <Badge badgeContent={2} color="primary">
                  <EmailIcon />
                </Badge>
              </IconButton>
              
              <Typography variant="body2" sx={{ ml: 2, mr: 1, display: { xs: 'none', sm: 'block' } }}>
                {user?.name || 'Student'} 
              </Typography>
              <IconButton
                onClick={handleProfileMenuOpen}
                color="inherit"
                edge="end"
              >
                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
                  {(user?.name || 'U')[0]}
                </Avatar>
              </IconButton>
            </Box>
            
            {/* Profile Menu */}
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
            
            {/* Notifications Menu */}
            <Menu
              anchorEl={notificationsAnchor}
              open={Boolean(notificationsAnchor)}
              onClose={handleNotificationsClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: { width: 320, maxHeight: 400 }
              }}
            >
              <MenuItem sx={{ bgcolor: '#f9f9f9' }}>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle2" fontWeight={600}>Notifications</Typography>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Typography variant="body2" fontWeight={500}>Advisor responded to your request</Typography>
                  <Typography variant="caption" color="text.secondary">2 hours ago</Typography>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Typography variant="body2" fontWeight={500}>Missing document report processed</Typography>
                  <Typography variant="caption" color="text.secondary">1 day ago</Typography>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Typography variant="body2" fontWeight={500}>System update completed</Typography>
                  <Typography variant="caption" color="text.secondary">2 days ago</Typography>
                </Box>
              </MenuItem>
              <MenuItem sx={{ justifyContent: 'center' }}>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>View All Notifications</Typography>
              </MenuItem>
            </Menu>
            
            {/* Messages Menu */}
            <Menu
              anchorEl={messagesAnchor}
              open={Boolean(messagesAnchor)}
              onClose={handleMessagesClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: { width: 320, maxHeight: 400 }
              }}
            >
              <MenuItem sx={{ bgcolor: '#f9f9f9' }}>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle2" fontWeight={600}>Messages</Typography>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Typography variant="body2" fontWeight={500}>Advisor: Prof. Smith</Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    Please review your graduation status and get back to me...
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Typography variant="body2" fontWeight={500}>Student Affairs</Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    Your graduation requirements have been updated...
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem sx={{ justifyContent: 'center' }}>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>View All Messages</Typography>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        
        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(3)})`,
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            paddingBottom: theme.spacing(3),
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* Welcome Section with information about the student */}
          <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'rgba(204, 0, 0, 0.03)', border: '1px solid rgba(204, 0, 0, 0.1)' }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Welcome, {user?.name || 'Student'}
            </Typography>
            <Typography variant="body1">
              Welcome to the Graduation Management System. From this panel, you can check your transcript,
              view graduation requirements, and submit a manual check request.
            </Typography>
          </Paper>
          
          {/* Page Content */}
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboard; 