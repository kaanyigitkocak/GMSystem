import { useState } from 'react';
import type { ReactNode } from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  IconButton,
  Menu,
  MenuItem,
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
  CircularProgress
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Description as DescriptionIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Close as CloseIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useAuth } from '../../../core/hooks/useAuth';
import iyteLogoPng from '../../../core/assets/iyte-logo.png';
import { Link as RouterLink } from 'react-router-dom';
import { useNotifications } from '../hooks/useNotifications';

interface StudentDashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

// Main StudentDashboardLayout component
const StudentDashboardLayout = ({ children }: StudentDashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  
  // Notifications hook
  const { notifications, loading: notificationsLoading, markAsRead } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Notifications menu state
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const notificationsOpen = Boolean(notificationsAnchor);
  
  // Messages menu state - removed unused variables
  
  // Current active path for highlighting navigation
  const pathname = window.location.pathname;
  
  // Menu handlers
  
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };
  
  const handleLogout = () => {
    handleNotificationsClose();
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
    { path: '/student/disengagement', icon: <EmailIcon />, label: 'Disengagement Certificates' },
    { path: '/student/notifications', icon: <NotificationsIcon />, label: 'Notifications' }
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
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              
              <Typography variant="body2" sx={{ ml: 2, mr: 1, display: { xs: 'none', sm: 'block' } }}>
                {user?.name || 'Student'} 
              </Typography>
            </Box>
            
            {/* Notifications Menu */}
            <Menu
              anchorEl={notificationsAnchor}
              open={notificationsOpen}
              onClose={handleNotificationsClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: { width: 350, maxHeight: 400, p: 0 }
              }}
            >
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Notifications
                </Typography>
                {unreadCount > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    {unreadCount} unread notifications
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {notificationsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => {
                    const getNotificationIcon = () => {
                      switch (notification.type) {
                        case 'warning':
                          return <WarningIcon color="warning" fontSize="small" />;
                        case 'error':
                          return <ErrorIcon color="error" fontSize="small" />;
                        case 'success':
                          return <CheckCircleIcon color="success" fontSize="small" />;
                        default:
                          return <NotificationsIcon color="info" fontSize="small" />;
                      }
                    };

                    return (
                      <MenuItem 
                        key={notification.id} 
                        onClick={() => {
                          if (!notification.read) {
                            markAsRead(notification.id);
                          }
                          handleNotificationsClose();
                        }}
                        sx={{ 
                          py: 1.5, 
                          px: 2,
                          backgroundColor: notification.read ? 'transparent' : 'action.hover',
                          '&:hover': {
                            backgroundColor: 'action.selected'
                          }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {getNotificationIcon()}
                        </ListItemIcon>
                        <Box sx={{ width: '100%' }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: notification.read ? 400 : 600,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {notification.title}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ 
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 0.5 }}>
                            {new Date(notification.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </MenuItem>
                    );
                  })
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <NotificationsIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      No notifications yet
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <MenuItem 
                sx={{ 
                  py: 1.5, 
                  justifyContent: 'center', 
                  color: 'primary.main',
                  fontWeight: 600,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}
                component={RouterLink}
                to="/student/notifications"
                onClick={handleNotificationsClose}
              >
                View all notifications
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

export default StudentDashboardLayout; 