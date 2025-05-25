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
  Snackbar,
  CircularProgress
} from '@mui/material';
import {
  GetApp as DownloadIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useTranscript } from '../hooks/useTranscript';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TranscriptPage = () => {
  const { 
    data, 
    isLoading, 
    error, 
    submitMissingDocumentReport, 
    isSubmitting, 
    reportSuccess, 
    reportError 
  } = useTranscript();
  
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
    const success = await submitMissingDocumentReport(message);
    if (success) {
      setDialogOpen(false);
      setSnackbarOpen(true);
      setMessage('');
    }
  };

  // Function to generate PDF
  const generatePDF = () => {
    if (!data) return;

    const { studentInfo, courses, gpa } = data;
    
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add university logo and header
    doc.setFontSize(18);
    doc.setTextColor(204, 0, 0);
    doc.text('Izmir Institute of Technology', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Academic Transcript', 105, 30, { align: 'center' });
    
    // Add student information
    doc.setFontSize(12);
    doc.text(`Student Name: ${studentInfo.name}`, 20, 45);
    doc.text(`Student ID: ${studentInfo.id}`, 20, 52);
    doc.text(`Department: ${studentInfo.department}`, 20, 59);
    doc.text(`GPA: ${gpa}`, 20, 66);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 73);
    
    // Create table for courses
    const tableColumn = ["Course Code", "Course Name", "Credits", "Grade", "Semester"];
    const tableRows = courses.map(course => [
      course.code,
      course.name,
      course.credits,
      course.grade,
      course.semester
    ]);
    
    // Add the table to the PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineWidth: 0.1,
        lineColor: [0, 0, 0]
      },
      headStyles: {
        fillColor: [204, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });
    
    // Add footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text('This is an unofficial transcript. The official transcript can be requested from the Student Affairs Office.', 105, doc.internal.pageSize.height - 10, { align: 'center' });
      doc.text(`Page ${i} of ${pageCount}`, 105, doc.internal.pageSize.height - 5, { align: 'center' });
    }
    
    // Save the PDF
    doc.save(`Transcript_${studentInfo.id}.pdf`);
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
        Failed to load transcript data: {error.message}
      </Alert>
    );
  }
  
  // Data not available
  if (!data) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Transcript data is not available.
      </Alert>
    );
  }
  
  const { studentInfo, courses, gpa } = data;
  
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
              onClick={generatePDF}
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
            <Typography variant="body1" fontWeight={500}>{studentInfo.name}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Student ID:</Typography>
            <Typography variant="body1" fontWeight={500}>{studentInfo.id}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Department:</Typography>
            <Typography variant="body1" fontWeight={500}>{studentInfo.department}</Typography>
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
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.code}</TableCell>
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
          Missing document report sent successfully to your advisor.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TranscriptPage; 