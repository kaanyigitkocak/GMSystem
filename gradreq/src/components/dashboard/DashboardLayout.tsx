import { useState } from 'react';
import type { ReactNode } from 'react';
import { 
  Box, 
  Typography, 
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
  Badge,
  ListItemButton,
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
  Email as EmailIcon
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import iyteLogoPng from '../../assets/iyte-logo.png';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  
  // Profile menu state
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const profileMenuOpen = Boolean(profileMenuAnchor);
  
  // Notifications menu state
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const notificationsOpen = Boolean(notificationsAnchor);
  
  // Messages menu state
  const [messagesAnchor, setMessagesAnchor] = useState<null | HTMLElement>(null);
  const messagesOpen = Boolean(messagesAnchor);
  
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
        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemIcon>
              <DashboardIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="My Transcript" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Graduation Requirements" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Manual Check" />
          </ListItemButton>
        </ListItem>
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
        overflow: 'auto'
      }}>
        {/* Top AppBar */}
        <AppBar position="sticky" color="default" elevation={1}>
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
              open={profileMenuOpen}
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
              open={notificationsOpen}
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
              open={messagesOpen}
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
                  <Typography variant="body2" fontWeight={500}>Advisor: Prof. Onur Demirörs</Typography>
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
        
        {/* Page content */}
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout; 