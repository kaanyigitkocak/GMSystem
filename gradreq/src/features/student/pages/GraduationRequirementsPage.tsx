import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useGraduationRequirements } from '../hooks/useGraduationRequirements';

const GraduationRequirementsPage = () => {
  const { 
    data, 
    isLoading, 
    error, 
    submitMissingFilesReport, 
    isSubmitting, 
    reportSuccess, 
    reportError 
  } = useGraduationRequirements();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSendMessage = async () => {
    const success = await submitMissingFilesReport(message);
    if (success) {
      setDialogOpen(false);
      setSnackbarOpen(true);
      setMessage('');
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // Error state
  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Failed to load graduation requirements data: {error.message}
      </Alert>
    );
  }
  
  // Data not available
  if (!data) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Graduation requirements data is not available.
      </Alert>
    );
  }
  
  const { requirements, overallProgress, studentInfo } = data;
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h5" gutterBottom>Graduation Requirements</Typography>
          <Box>
            <Button 
              variant="outlined" 
              color="error"
              startIcon={<ErrorIcon />}
              onClick={handleDialogOpen}
            >
              Files Missing
            </Button>
          </Box>
        </Box>
        
        <Box 
          sx={{ 
            mb: 4, 
            bgcolor: 'rgba(204, 0, 0, 0.03)', 
            border: '1px solid rgba(204, 0, 0, 0.1)', 
            borderRadius: 1,
            p: 2
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid sx={{ width: { xs: '100%', sm: '50%' } }}>
              <Typography variant="h6" gutterBottom>Overall Graduation Progress</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={overallProgress} 
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      bgcolor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: overallProgress === 100 ? 'success.main' : 'primary.main',
                      }
                    }} 
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {overallProgress}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid sx={{ width: { xs: '100%', sm: '50%' } }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-end' }}>
                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  <Typography variant="body2" color="text.secondary">Department</Typography>
                  <Typography variant="body1" fontWeight={500}>{studentInfo.department}</Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  <Typography variant="body2" color="text.secondary">Required Credits</Typography>
                  <Typography variant="body1" fontWeight={500}>{studentInfo.requiredCredits}</Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  <Typography variant="body2" color="text.secondary">Completed Credits</Typography>
                  <Typography variant="body1" fontWeight={500}>{studentInfo.completedCredits}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        {requirements.map((category, index) => (
          <Accordion key={index} defaultExpanded={index === 0} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                bgcolor: 'rgba(0, 0, 0, 0.03)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={500}>{category.category}</Typography>
                  <Chip 
                    label={`${category.completed}/${category.total} Completed`} 
                    color={category.progress === 100 ? 'success' : 'primary'}
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={category.progress} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: category.progress === 100 ? 'success.main' : 'primary.main',
                        }
                      }} 
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {category.progress}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                {category.items.map((item) => (
                  <ListItem key={item.id} sx={{ pl: 0, pr: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.completed ? 
                        <CheckCircleIcon fontSize="small" color="success" /> : 
                        <CancelIcon fontSize="small" color="error" />
                      }
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography 
                            component="span" 
                            variant="body2" 
                            sx={{ 
                              fontWeight: item.completed ? 400 : 500,
                              color: item.completed ? 'text.secondary' : 'text.primary',
                              textDecoration: item.completed ? 'line-through' : 'none',
                              mr: 1
                            }}
                          >
                            {item.id}
                          </Typography>
                          <Typography 
                            component="span" 
                            variant="body2" 
                            sx={{ 
                              fontWeight: item.completed ? 400 : 500,
                              color: item.completed ? 'text.secondary' : 'text.primary',
                              textDecoration: item.completed ? 'line-through' : 'none',
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      }
                      secondary={`${item.credits} credits`}
                      secondaryTypographyProps={{
                        sx: {
                          color: item.completed ? 'text.secondary' : 'text.primary',
                          textDecoration: item.completed ? 'line-through' : 'none',
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
      
      {/* Missing Files Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Report Missing Files</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph sx={{ mt: 1 }}>
            Please describe the missing files or documents for your graduation requirements and we'll notify your advisor.
          </Typography>
          <TextField
            autoFocus
            label="Message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          {reportError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {reportError.message}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleSendMessage} 
            variant="contained" 
            disabled={!message.trim() || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Success Snackbar */}
      <Snackbar 
        open={snackbarOpen || reportSuccess} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Missing files report sent successfully to your advisor.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GraduationRequirementsPage; 