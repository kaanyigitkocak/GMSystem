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
  Divider
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
import { useAuth } from '../../../features/auth/contexts/AuthContext';
import iyteLogoPng from '../../../assets/iyte-logo.png';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
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
              {title}
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
                {user?.name || 'User'} 
              </Typography>
              
              {/* Profile Menu Button */}
              <IconButton 
                onClick={handleProfileMenuOpen}
                size="small" 
                edge="end" 
                aria-label="account of current user"
                aria-controls="profile-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar 
                  sx={{ width: 32, height: 32 }}
                  alt={user?.name || 'User'}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        
        {/* Menus */}
        {/* Profile Menu */}
        <Menu
          id="profile-menu"
          anchorEl={profileMenuAnchor}
          open={profileMenuOpen}
          onClose={handleProfileMenuClose}
          MenuListProps={{
            'aria-labelledby': 'profile-button',
          }}
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
          id="notifications-menu"
          anchorEl={notificationsAnchor}
          open={notificationsOpen}
          onClose={handleNotificationsClose}
          MenuListProps={{
            'aria-labelledby': 'notifications-button',
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: { width: 320, maxWidth: '100%' }
          }}
        >
          <MenuItem>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Manual check request approved
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              New message from advisor
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Graduation requirements updated
            </Typography>
          </MenuItem>
        </Menu>
        
        {/* Messages Menu */}
        <Menu
          id="messages-menu"
          anchorEl={messagesAnchor}
          open={messagesOpen}
          onClose={handleMessagesClose}
          MenuListProps={{
            'aria-labelledby': 'messages-button',
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: { width: 320, maxWidth: '100%' }
          }}
        >
          <MenuItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Dr. Smith (Advisor)
              </Typography>
              <Typography variant="body2" noWrap>
                Please schedule a meeting to discuss your...
              </Typography>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Department Secretary
              </Typography>
              <Typography variant="body2" noWrap>
                Your transcript has been updated with...
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
        
        {/* Content Container */}
        <Box 
          component="main" 
          sx={{ 
            p: 3,
            flexGrow: 1,
            overflowY: 'auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout; 