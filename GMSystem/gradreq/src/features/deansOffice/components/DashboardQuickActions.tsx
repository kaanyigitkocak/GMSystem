import {
  Typography,
  Card,
  CardContent,
  Button,
  Box
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  FormatListNumbered as FormatListNumberedIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: CloudUploadIcon,
      title: 'Upload Files',
      description: 'Upload department ranking files to create faculty rankings.',
      path: '/deansoffice/file-upload',
      buttonText: 'Go to Upload'
    },
    {
      icon: FormatListNumberedIcon,
      title: 'Faculty Rankings',
      description: 'View and manage faculty-wide student rankings by GPA.',
      path: '/deansoffice/faculty-ranking',
      buttonText: 'View Rankings'
    },
    {
      icon: SchoolIcon,
      title: 'Department Status',
      description: 'Check which departments have submitted their ranking files.',
      path: '/deansoffice/department-status',
      buttonText: 'View Status'
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Quick Actions
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 2 
      }}>
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Card 
              key={index}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
              }}
            >
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', mb: 2, color: 'primary.main' }}>
                  <IconComponent fontSize="large" />
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {action.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Button 
                    variant="outlined" 
                    endIcon={<ArrowForwardIcon />} 
                    onClick={() => navigate(action.path)}
                    fullWidth
                  >
                    {action.buttonText}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default DashboardQuickActions; 