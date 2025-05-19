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
  Snackbar
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  GetApp as DownloadIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

// Sample graduation requirements data
const requirements = [
  {
    category: 'Core Courses',
    progress: 85,
    completed: 17,
    total: 20,
    items: [
      { id: 'CENG101', name: 'Introduction to Computer Engineering', credits: 4, completed: true },
      { id: 'CENG211', name: 'Data Structures', credits: 4, completed: true },
      { id: 'CENG311', name: 'Algorithms', credits: 4, completed: true },
      { id: 'CENG371', name: 'Database Management', credits: 4, completed: true },
      { id: 'CENG302', name: 'Operating Systems', credits: 4, completed: false },
    ]
  },
  {
    category: 'Mathematics & Science Courses',
    progress: 100,
    completed: 6,
    total: 6,
    items: [
      { id: 'MATH101', name: 'Calculus I', credits: 4, completed: true },
      { id: 'MATH102', name: 'Calculus II', credits: 4, completed: true },
      { id: 'MATH211', name: 'Linear Algebra', credits: 4, completed: true },
      { id: 'PHYS101', name: 'Physics I', credits: 4, completed: true },
      { id: 'PHYS102', name: 'Physics II', credits: 4, completed: true },
      { id: 'STAT201', name: 'Probability & Statistics', credits: 3, completed: true },
    ]
  },
  {
    category: 'Technical Electives',
    progress: 50,
    completed: 2,
    total: 4,
    items: [
      { id: 'CENG401', name: 'Machine Learning', credits: 3, completed: true },
      { id: 'CENG413', name: 'Computer Graphics', credits: 3, completed: true },
      { id: 'CENG451', name: 'Distributed Systems', credits: 3, completed: false },
      { id: 'CENG461', name: 'Cloud Computing', credits: 3, completed: false },
    ]
  },
  {
    category: 'General Education & Humanities',
    progress: 66,
    completed: 4,
    total: 6,
    items: [
      { id: 'ENG101', name: 'English I', credits: 3, completed: true },
      { id: 'ENG102', name: 'English II', credits: 3, completed: true },
      { id: 'TURK101', name: 'Turkish I', credits: 2, completed: true },
      { id: 'TURK102', name: 'Turkish II', credits: 2, completed: true },
      { id: 'HIST101', name: 'History I', credits: 2, completed: false },
      { id: 'HIST102', name: 'History II', credits: 2, completed: false },
    ]
  }
];

// Calculate overall progress
const calculateOverallProgress = () => {
  let totalCompleted = 0;
  let totalRequired = 0;
  
  requirements.forEach(category => {
    totalCompleted += category.completed;
    totalRequired += category.total;
  });
  
  return Math.round((totalCompleted / totalRequired) * 100);
};

const GraduationRequirementsPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSendMessage = () => {
    // Here you would implement API call to send message
    setDialogOpen(false);
    setSnackbarOpen(true);
    setMessage('');
  };
  
  const overallProgress = calculateOverallProgress();
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h5" gutterBottom>Graduation Requirements</Typography>
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              sx={{ mr: 1 }}
            >
              Download PDF
            </Button>
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
                  <Typography variant="body1" fontWeight={500}>Computer Engineering</Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  <Typography variant="body2" color="text.secondary">Required Credits</Typography>
                  <Typography variant="body1" fontWeight={500}>140</Typography>
                </Box>
                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  <Typography variant="body2" color="text.secondary">Completed Credits</Typography>
                  <Typography variant="body1" fontWeight={500}>105</Typography>
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
                      {item.completed ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" fontWeight={item.completed ? 400 : 500}>
                            {item.id} - {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.credits} credits
                          </Typography>
                        </Box>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          This is a digital representation of your graduation requirements. For any discrepancies, please contact your department.
        </Typography>
      </Paper>
      
      {/* Missing Files Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Report Missing Files</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph sx={{ mt: 1 }}>
            Please describe the issue with the graduation requirements files and we'll notify the Student Affairs.
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleSendMessage} 
            variant="contained" 
            disabled={!message.trim()}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Missing files report sent successfully to Student Affairs.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GraduationRequirementsPage; 