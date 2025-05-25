import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, Outlet } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
  Paper,
  Alert,
  Button
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Logout as LogoutIcon,
  Description as DescriptionIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useNotifications } from '../hooks';
import { EligibilityProvider } from '../contexts/EligibilityContext';
import iyteLogoPng from '../../../core/assets/iyte-logo.png';

const drawerWidth = 240;

const SecretaryDashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [renderError, setRenderError] = useState<Error | null>(null);
  
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Notifications hook
  const { notifications, loading: notificationsLoading, markAsRead } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const pathname = window.location.pathname;
  const navItems = [
    { path: '/secretary', icon: <DashboardIcon />, label: 'Dashboard', exact: true },
    { path: '/secretary/transcript-management', icon: <DescriptionIcon />, label: 'Transcript Management' },
    { path: '/secretary/graduation-requests', icon: <SchoolIcon />, label: 'Graduation Requests' },
    { path: '/secretary/notifications', icon: <NotificationsIcon />, label: 'Notifications' },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handle errors in children rendering
  useEffect(() => {
    setRenderError(null);
  }, []);

  const drawer = (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <img 
          src={iyteLogoPng} 
          alt="IYTE Logo" 
          style={{ 
            height: 40, 
            marginRight: 12,
            filter: 'brightness(0) invert(1)'
          }} 
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>
            IYTE
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1 }}>
            Graduation Management System
          </Typography>
        </Box>
      </Box>
      
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
      
      <List sx={{ px: 2, py: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={isActive(item.path, item.exact)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'rgba(255,255,255,0.08)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.12)',
                  },
                },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: isActive(item.path, item.exact) ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
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
    <EligibilityProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 }
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
                  boxSizing: 'border-box',
                  border: 'none',
                  background: 'linear-gradient(180deg, #d32f2f 0%, #b71c1c 100%)',
                  color: 'white',
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
                  border: 'none',
                  background: 'linear-gradient(180deg, #d32f2f 0%, #b71c1c 100%)',
                  color: 'white',
                },
              }}
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        
        <AppBar 
          position="fixed" 
          sx={{ 
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: '#d32f2f', // Red color to match the request
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Secretary Panel
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
              

            </Box>
            
            {/* Notifications Menu */}
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
              <Paper sx={{ width: '100%' }}>
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
                          <ListItemText 
                            primary={
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
                            }
                            secondary={
                              <Box>
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
                            }
                          />
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
                
                <Divider />
                
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
                  to="/secretary/notifications"
                  onClick={handleNotificationsClose}
                >
                  View all notifications
                </MenuItem>
              </Paper>
            </Menu>
            

          </Toolbar>
        </AppBar>
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            p: 3,
            mt: 8,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {renderError ? (
            <Box sx={{ mb: 3 }}>
              <Alert
                severity="error"
                icon={<ErrorIcon />}
                action={
                  <Button 
                    color="inherit" 
                    size="small" 
                    onClick={() => window.location.reload()}
                  >
                    RELOAD
                  </Button>
                }
              >
                An error occurred while loading content. Please try refreshing the page.
              </Alert>
            </Box>
          ) : null}
          
          {/* Render outlet content */}
          <Outlet />
        </Box>
      </Box>
    </EligibilityProvider>
  );
};

export default SecretaryDashboardLayout;
