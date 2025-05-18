import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar
} from '@mui/material';
import {
  GetApp as DownloadIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

// Sample transcript data
const sampleCourses = [
  { id: 'CENG311', name: 'Algorithms', credits: 4, grade: 'AA', semester: 'Fall 2021-2022' },
  { id: 'CENG371', name: 'Database Management', credits: 4, grade: 'BA', semester: 'Spring 2021-2022' },
  { id: 'MATH101', name: 'Calculus I', credits: 4, grade: 'BB', semester: 'Fall 2020-2021' },
  { id: 'PHYS101', name: 'Physics I', credits: 4, grade: 'CB', semester: 'Fall 2020-2021' },
  { id: 'MATH102', name: 'Calculus II', credits: 4, grade: 'BA', semester: 'Spring 2020-2021' },
  { id: 'PHYS102', name: 'Physics II', credits: 4, grade: 'CB', semester: 'Spring 2020-2021' },
  { id: 'CENG211', name: 'Data Structures', credits: 4, grade: 'AA', semester: 'Fall 2021-2022' },
  { id: 'ENG101', name: 'English I', credits: 3, grade: 'BB', semester: 'Fall 2020-2021' }
];

// Function to calculate GPA
const calculateGPA = (courses: typeof sampleCourses) => {
  const gradePoints: { [key: string]: number } = {
    'AA': 4.0, 'BA': 3.5, 'BB': 3.0, 'CB': 2.5, 'CC': 2.0, 'DC': 1.5, 'DD': 1.0, 'FF': 0.0
  };
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  courses.forEach(course => {
    totalPoints += gradePoints[course.grade] * course.credits;
    totalCredits += course.credits;
  });
  
  return (totalPoints / totalCredits).toFixed(2);
};

const TranscriptPage = () => {
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
  
  const gpa = calculateGPA(sampleCourses);
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h5" gutterBottom>Transcript</Typography>
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
              Documents Missing
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Student Name:</Typography>
            <Typography variant="body1" fontWeight={500}>John Doe</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Student ID:</Typography>
            <Typography variant="body1" fontWeight={500}>20190101023</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Department:</Typography>
            <Typography variant="body1" fontWeight={500}>Computer Engineering</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">GPA:</Typography>
            <Typography variant="h6" fontWeight={600} color="primary">{gpa}</Typography>
          </Box>
        </Box>
        
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}>
                <TableCell><Typography fontWeight={500}>Course Code</Typography></TableCell>
                <TableCell><Typography fontWeight={500}>Course Name</Typography></TableCell>
                <TableCell align="center"><Typography fontWeight={500}>Credits</Typography></TableCell>
                <TableCell align="center"><Typography fontWeight={500}>Grade</Typography></TableCell>
                <TableCell><Typography fontWeight={500}>Semester</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell align="center">{course.credits}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={course.grade} 
                      size="small"
                      color={
                        course.grade === 'AA' || course.grade === 'BA' ? 'success' :
                        course.grade === 'BB' || course.grade === 'CB' ? 'primary' :
                        course.grade === 'CC' || course.grade === 'DC' ? 'warning' : 
                        'error'
                      }
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>{course.semester}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            This is an unofficial transcript. The official transcript can be requested from the Student Affairs Office.
          </Typography>
        </Box>
      </Paper>
      
      {/* Missing Documents Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Report Missing Documents</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph sx={{ mt: 1 }}>
            Please describe the issue with your transcript documents and we'll notify your advisor.
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
          Missing document report sent successfully to your advisor.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TranscriptPage; 