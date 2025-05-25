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
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  ThumbUp as ThumbUpIcon,
  BookmarkRemove as BookmarkRemoveIcon,
  VerifiedUser as VerifiedUserIcon,
  EmojiEvents as EmojiEventsIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  School as SchoolIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useGraduationProgress } from '../hooks/useGraduationProgress';

const GraduationProgressTracker = () => {
  const theme = useTheme();
  const { 
    activeStep, 
    steps, 
    stepStatuses,
    disconnectionProcedures, 
    isLoading, 
    error,
    isDisconnectionLoading,
    disconnectionError 
  } = useGraduationProgress();
  
  const getStepIcon = (index: number) => {
    const icons = [
      <AssignmentIcon />,
      <ThumbUpIcon />,
      <BookmarkRemoveIcon />,
      <VerifiedUserIcon />,
      <EmojiEventsIcon />,
      <SchoolIcon />
    ];
    return icons[index] || <SchoolIcon />;
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
  
  // Error display
  if (error) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3,
          mb: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: theme.palette.error.main,
          backgroundColor: theme.palette.error.light
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ErrorIcon color="error" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h2" color="error">
            Error Loading Graduation Status
          </Typography>
        </Box>
        <Typography variant="body2">{error.message}</Typography>
      </Paper>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3,
          mb: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: theme.palette.divider,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Loading graduation progress...</Typography>
      </Paper>
    );
  }
  
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
              StepIconComponent={() => {
                const stepStatus = stepStatuses[index];
                let bgColor = theme.palette.grey[300];
                let textColor = theme.palette.grey[600];
                
                if (stepStatus === 'approved') {
                  bgColor = theme.palette.success.main;
                  textColor = 'white';
                } else if (stepStatus === 'rejected') {
                  bgColor = theme.palette.error.main;
                  textColor = 'white';
                } else if (index === activeStep) {
                  bgColor = theme.palette.primary.main;
                  textColor = 'white';
                }
                
                return (
                  <Box 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: bgColor,
                      color: textColor
                    }}
                  >
                    {getStepIcon(index)}
                  </Box>
                );
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: index === activeStep ? 'bold' : 'normal',
                  mb: 0.5,
                  color: stepStatuses[index] === 'rejected' ? theme.palette.error.main : 
                         stepStatuses[index] === 'approved' ? theme.palette.success.main : 
                         index === activeStep ? theme.palette.primary.main : 'inherit'
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
          
          {isDisconnectionLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
          
          {disconnectionError && (
            <Typography color="error" variant="body2">
              Error loading disconnection procedures: {disconnectionError.message}
            </Typography>
          )}
          
          {!isDisconnectionLoading && !disconnectionError && disconnectionProcedures && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {disconnectionProcedures.map((item, index) => (
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
          )}
        </Box>
      )}
    </Paper>
  );
};

export default GraduationProgressTracker; 