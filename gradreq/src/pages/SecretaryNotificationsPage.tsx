import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Chip,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkEmailReadIcon
} from '@mui/icons-material';
import SecretaryDashboard from '../components/layout/SecretaryDashboard';
import { getNotifications, markNotificationAsRead } from '../services/secretaryService';
import type { Notification } from '../types/secretary';

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`notifications-tabpanel-${index}`}
      aria-labelledby={`notifications-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `notifications-tab-${index}`,
    'aria-controls': `notifications-tabpanel-${index}`,
  };
};

const SecretaryNotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notificationsData = await getNotifications();
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    
    if (unreadNotifications.length === 0) return;
    
    try {
      const promises = unreadNotifications.map(notification => 
        markNotificationAsRead(notification.id)
      );
      
      await Promise.all(promises);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'success':
        return <CheckCircleIcon color="success" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getNotificationsByReadStatus = (read: boolean) => {
    return notifications.filter(notification => notification.read === read);
  };

  const filterNotifications = (notifications: Notification[]) => {
    return notifications.filter(notification => {
      // Filter by search term
      const matchesSearch = 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by type
      const matchesType = 
        filterType === 'all' || 
        notification.type === filterType || 
        (filterType === 'student_affairs' && notification.source === 'student_affairs') ||
        (filterType === 'advisor' && notification.source === 'advisor') ||
        (filterType === 'student' && notification.source === 'student');
      
      return matchesSearch && matchesType;
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;

  const renderNotificationList = (filteredNotifications: Notification[]) => {
    if (filteredNotifications.length === 0) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            {searchTerm || filterType !== 'all' 
              ? 'Arama kriterlerine uygun bildirim bulunamadı.' 
              : 'Bildirim bulunmamaktadır.'}
          </Typography>
        </Box>
      );
    }

    return (
      <List>
        {filteredNotifications.map((notification, index) => (
          <>
            <ListItem
              key={notification.id}
              alignItems="flex-start"
              secondaryAction={
                !notification.read ? (
                  <IconButton 
                    edge="end" 
                    color="primary"
                    onClick={() => handleMarkAsRead(notification.id)}
                    size="small"
                  >
                    <MarkEmailReadIcon />
                  </IconButton>
                ) : null
              }
            >
              <ListItemIcon>
                {getNotificationIcon(notification.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {notification.title}
                    </Typography>
                    {!notification.read && <Chip label="Yeni" size="small" color="primary" />}
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: 'block', mb: 1 }}
                    >
                      {notification.message}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.75rem' }}
                      >
                        {new Date(notification.date).toLocaleString('tr-TR')}
                      </Typography>
                      <Chip 
                        label={
                          notification.source === 'student_affairs' 
                            ? 'Öğrenci İşleri' 
                            : notification.source === 'advisor' 
                              ? 'Danışman' 
                              : notification.source === 'student' 
                                ? 'Öğrenci' 
                                : 'Sistem'
                        }
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </>
                }
              />
            </ListItem>
            {index < filteredNotifications.length - 1 && <Divider variant="inset" component="li" />}
          </>
        ))}
      </List>
    );
  };

  return (
    <SecretaryDashboard>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Bildirimler
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Öğrenci İşleri, danışmanlar ve öğrencilerden gelen bildirimleri bu sayfadan görüntüleyebilirsiniz.
        </Typography>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                size="small"
                placeholder="Bildirim ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 250 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel id="filter-type-label">Filtreleme</InputLabel>
                <Select
                  labelId="filter-type-label"
                  value={filterType}
                  label="Filtreleme"
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <MenuItem value="all">Tümü</MenuItem>
                  <MenuItem value="info">Bilgi</MenuItem>
                  <MenuItem value="warning">Uyarı</MenuItem>
                  <MenuItem value="error">Hata</MenuItem>
                  <MenuItem value="success">Başarılı</MenuItem>
                  <Divider />
                  <MenuItem value="student_affairs">Öğrenci İşleri</MenuItem>
                  <MenuItem value="advisor">Danışman</MenuItem>
                  <MenuItem value="student">Öğrenci</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <IconButton 
              color="primary" 
              onClick={handleMarkAllAsRead}
              disabled={!notifications.some(n => !n.read)}
            >
              <MarkEmailReadIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="notification tabs"
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={unreadCount} color="error" sx={{ mr: 1 }}>
                      <NotificationsIcon fontSize="small" />
                    </Badge>
                    Tüm Bildirimler
                  </Box>
                } 
                {...a11yProps(0)} 
              />
              <Tab 
                label="Okunmamış" 
                {...a11yProps(1)} 
                disabled={unreadCount === 0}
              />
              <Tab 
                label="Okunmuş" 
                {...a11yProps(2)} 
                disabled={readCount === 0}
              />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            {renderNotificationList(filterNotifications(notifications))}
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            {renderNotificationList(filterNotifications(getNotificationsByReadStatus(false)))}
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            {renderNotificationList(filterNotifications(getNotificationsByReadStatus(true)))}
          </TabPanel>
        </Paper>
      </Box>
    </SecretaryDashboard>
  );
};

export default SecretaryNotificationsPage; 