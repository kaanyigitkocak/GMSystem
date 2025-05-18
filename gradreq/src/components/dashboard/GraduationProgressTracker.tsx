import {
  Box,
  Typography,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  IconButton,
  useTheme
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  ThumbUp as ThumbUpIcon,
  BookmarkRemove as BookmarkRemoveIcon,
  VerifiedUser as VerifiedUserIcon,
  EmojiEvents as EmojiEventsIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const GraduationProgressTracker = () => {
  const theme = useTheme();
  // This would come from API in real implementation
  const activeStep = 2; // 0-indexed, so this is "Disconnection Procedures"
  
  const steps = [
    {
      label: 'Application & Academic Assessment',
      description: 'Your application is being reviewed by your advisor and department secretary.'
    },
    {
      label: "Dean's Office Approval",
      description: 'Your graduation application is being reviewed by the dean\'s office.'
    },
    {
      label: 'Disconnection Procedures',
      description: 'You need to complete disconnection procedures with Library, IT, Student Affairs, etc.'
    },
    {
      label: 'Rectorate Approval',
      description: 'Your graduation is awaiting final approval from the rectorate.'
    },
    {
      label: 'Graduation Approved',
      description: 'Congratulations! Your graduation has been approved and your documents are being prepared.'
    }
  ];
  
  const getStepIcon = (index: number) => {
    const icons = [
      <AssignmentIcon />,
      <ThumbUpIcon />,
      <BookmarkRemoveIcon />,
      <VerifiedUserIcon />,
      <EmojiEventsIcon />
    ];
    return icons[index];
  };
  
  // Style for the active step
  const activeStepStyle = {
    '& .MuiStepLabel-root .Mui-active': {
      color: theme.palette.primary.main,
    },
    '& .MuiStepLabel-label.Mui-active': {
      fontWeight: 'bold',
      color: theme.palette.primary.main,
    }
  };
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3,
        mb: 4,
        borderRadius: 2,
        border: '1px solid',
        borderColor: theme.palette.divider,
        backgroundColor: '#f9f9f9'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon color="primary" sx={{ mr: 1 }} /> 
          Graduation Process Status
        </Typography>
        <Tooltip title="Your current graduation application status">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        sx={{ 
          mt: 2, 
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            '& .MuiStep-root': {
              width: '100%',
              mb: 2,
              pl: 0
            }
          },
          ...activeStepStyle
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel 
              StepIconComponent={() => (
                <Box 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: index <= activeStep ? theme.palette.primary.main : theme.palette.grey[300],
                    color: index <= activeStep ? 'white' : theme.palette.grey[600]
                  }}
                >
                  {getStepIcon(index)}
                </Box>
              )}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: index === activeStep ? 'bold' : 'normal',
                  mb: 0.5
                }}
              >
                {step.label}
              </Typography>
              {index === activeStep && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {step.description}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {/* Custom Active Step Details - only shown when at the Disconnection Procedures step */}
      {activeStep === 2 && (
        <Box sx={{ mt: 3, p: 2, borderRadius: 1, bgcolor: 'rgba(204, 0, 0, 0.03)', border: '1px solid rgba(204, 0, 0, 0.1)' }}>
          <Typography variant="subtitle2" gutterBottom>Required Disconnection Procedures:</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[
              { name: 'Library', completed: true },
              { name: 'IT Department', completed: false },
              { name: 'Student Affairs', completed: false },
              { name: 'Graduate Office', completed: false },
              { name: 'Sports & Culture Dept.', completed: false }
            ].map((item, index) => (
              <Grid key={index} sx={{ width: { xs: '50%', sm: '33.33%', md: '20%' }, mb: 1 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1,
                    borderRadius: 1,
                    bgcolor: item.completed ? 'rgba(76, 175, 80, 0.08)' : 'transparent'
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: '1px solid',
                      borderColor: item.completed ? 'success.main' : 'divider',
                      bgcolor: item.completed ? 'success.main' : 'transparent',
                      mr: 1
                    }}
                  >
                    {item.completed && <CheckCircleIcon sx={{ color: 'white', fontSize: 16 }} />}
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: item.completed ? 'success.main' : 'text.primary',
                      fontWeight: item.completed ? 500 : 400
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default GraduationProgressTracker; 