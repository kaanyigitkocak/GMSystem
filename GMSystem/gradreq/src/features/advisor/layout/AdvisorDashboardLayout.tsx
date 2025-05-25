import { Outlet } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import { EligibilityProvider } from '../contexts/EligibilityContext';

const drawerWidth = 240;

const AdvisorDashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Notifications hook
  const { notifications, loading: notificationsLoading, markAsRead } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Menu anchor states
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
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
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/advisor' },
    { text: 'My Students', icon: <SchoolIcon />, path: '/advisor/my-students' },
    { text: 'Manual Check Requests', icon: <AssignmentIcon />, path: '/advisor/manual-check-requests' },
    { text: 'Approval & Ranking', icon: <GroupIcon />, path: '/advisor/approval-ranking' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/advisor/notifications' },
  ];

  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Advisor Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
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
    <EligibilityProvider>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Advisor Panel
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
              
              <IconButton
                onClick={handleProfileMenuOpen}
                color="inherit"
                edge="end"
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  {(user?.name || 'A')[0]}
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
                to="/advisor/notifications"
                onClick={handleNotificationsClose}
              >
                View all notifications
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </EligibilityProvider>
  );
};

export default AdvisorDashboardLayout; 