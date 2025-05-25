import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  CircularProgress,
  Paper,
  Alert,
  Button
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  CloudUpload as CloudUploadIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
  AccountCircle as AccountCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useNotifications } from '../hooks';
import { EligibilityProvider } from '../contexts/EligibilityContext';
import iyteLogoPng from '../../../core/assets/iyte-logo.png';

const drawerWidth = 280;

interface SecretaryDashboardLayoutProps {
  children: React.ReactNode;
}

const SecretaryDashboardLayout = ({ children }: SecretaryDashboardLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [renderError, setRenderError] = useState<Error | null>(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { notifications, unreadCount, loading: notificationsLoading, markAsRead } = useNotifications();
  
  const pathname = window.location.pathname;

  const navItems = [
    { path: '/secretary', icon: <DashboardIcon />, label: 'Dashboard', exact: true },
    { path: '/secretary/transcripts', icon: <CloudUploadIcon />, label: 'Transcript Processing' },
    { path: '/secretary/ranking', icon: <FormatListNumberedIcon />, label: 'Approval & Ranking' },
    { path: '/secretary/notifications', icon: <NotificationsIcon />, label: 'Notifications' },
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

  // Handle errors in children rendering
  useEffect(() => {
    return () => {
      // Clean up error state when unmounting
      setRenderError(null);
    };
  }, []);

  // Drawer content shared between mobile and desktop
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
      <List sx={{ pt: 0 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={isActive(item.path, item.exact)}
              onClick={isMobile ? toggleDrawer : undefined}
              sx={{
                // borderLeft: isActive(item.path, item.exact) ? `3px solid ${theme.palette.primary.main}` : 'none',
                // bgcolor: isActive(item.path, item.exact) ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                // py: 1.5,
              }}
            >
              <ListItemIcon sx={{ minWidth: 'auto', mr: 2, color: isActive(item.path, item.exact) ? theme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontWeight: isActive(item.path, item.exact) ? 'bold' : 'normal',
                  // color: isActive(item.path, item.exact) ? theme.palette.primary.main : 'inherit'
                }} 
              />
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
    <EligibilityProvider>
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
                  boxSizing: 'border-box',
                  border: 'none'
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
                  border: 'none'
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
                Secretary Panel
              </Typography>
              
              <Tooltip title="Notifications">
                <IconButton 
                  onClick={handleNotificationsOpen}
                  sx={{ mr: 1 }}
                  aria-label="notifications"
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Profile settings">
                <IconButton 
                  onClick={handleProfileMenuOpen} 
                  sx={{ ml: 1 }}
                  aria-label="account settings"
                >
                  <Avatar 
                    alt={user?.name || 'User'} 
                    src="/static/images/avatar/default.jpg"
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
              </Tooltip>
              
              <Menu
                anchorEl={notificationsAnchor}
                open={Boolean(notificationsAnchor)}
                onClose={handleNotificationsClose}
                MenuListProps={{ sx: { width: 350, maxHeight: 400, p: 0 } }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
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
                      notifications.slice(0, 5).map((notification, index) => {
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
              
              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleLogout} sx={{ minWidth: 150 }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Log out</ListItemText>
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          
          <Toolbar />
          
          <Box 
            sx={{ 
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
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
            
            {/* Render children in a try-catch block */}
            {(() => {
              try {
                return children;
              } catch (error) {
                if (error instanceof Error) {
                  console.error('Error rendering children:', error);
                  setRenderError(error);
                  return (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <Typography color="error">
                        Failed to load content. Please try reloading the page.
                      </Typography>
                    </Box>
                  );
                }
                return null;
              }
            })()}
          </Box>
        </Box>
      </Box>
    </EligibilityProvider>
  );
};

export default SecretaryDashboardLayout; 