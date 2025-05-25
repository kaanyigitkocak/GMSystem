import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  FileUpload as FileUploadIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useNotifications } from '../hooks/useNotifications';
import iyteLogoPng from '../../../core/assets/iyte-logo.png';

const drawerWidth = 240;

const StudentAffairsDashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Notifications hook
  const { notifications, loading: notificationsLoading, markAsRead } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const pathname = window.location.pathname;
  const navItems = [
    { path: '/student-affairs', icon: <DashboardIcon />, label: 'Dashboard', exact: true },
    { path: '/student-affairs/approval-ranking', icon: <CloudUploadIcon />, label: 'Approval & Ranking', exact: false },
    { path: '/student-affairs/upload-graduation-decisions', icon: <FileUploadIcon />, label: 'Upload Graduation Decisions', exact: false },
    { path: '/student-affairs/notifications', icon: <NotificationsIcon />, label: 'Notifications', exact: false },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate('/login');
  };

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
      
      <Divider />
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={isActive(item.path, item.exact)}
              onClick={isMobile ? toggleDrawer : undefined}
              sx={{
                paddingLeft: theme.spacing(2.5),
                paddingRight: theme.spacing(2.5),
                '&.Mui-selected': {
                  backgroundColor: theme.palette.action.selected,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  color: theme.palette.primary.main,
                  paddingLeft: `calc(${theme.spacing(2.5)} - 4px)`,
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ flexGrow: 1 }} />
      
      <List sx={{ mt: 'auto' }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ paddingLeft: theme.spacing(2.5) }}>
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
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 }
        }}
      >
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
            open
            sx={{
              '& .MuiDrawer-paper': { 
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          p: { xs: 2, md: 3 }
        }}
      >
        <AppBar 
          position="fixed" 
          color="default"
          elevation={0}
          sx={{ 
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            bgcolor: 'background.paper'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Student Affairs Panel
            </Typography>
            
            <Box sx={{ display: 'flex' }}>
              <Tooltip title="Notifications">
                <IconButton 
                  color="inherit" 
                  onClick={handleNotificationsOpen}
                  aria-label="show notifications"
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Menu
                anchorEl={notificationsAnchor}
                open={Boolean(notificationsAnchor)}
                onClose={handleNotificationsClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    width: 350,
                    maxHeight: 400,
                    p: 0,
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
                  to="/student-affairs/notifications"
                  onClick={handleNotificationsClose}
                >
                  View all notifications
                </MenuItem>
              </Menu>
              

            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default StudentAffairsDashboardLayout;
