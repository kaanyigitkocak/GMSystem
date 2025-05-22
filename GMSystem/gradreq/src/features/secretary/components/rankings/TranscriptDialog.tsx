import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Divider,
} from '@mui/material';
import {
  Check as CheckIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Mock interface for student transcript data
export interface StudentTranscript {
  studentId: string;
  studentName: string;
  department: string;
  gpa: number;
  credits: number;
  courses: Array<{
    courseCode: string;
    courseName: string;
    credit: number;
    grade: string;
    semester: string;
  }>;
}

interface TranscriptDialogProps {
  open: boolean;
  transcript: StudentTranscript | null;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const TranscriptDialog: React.FC<TranscriptDialogProps> = ({
  open,
  transcript,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!transcript) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { height: '90vh' }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Student Transcript Review
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review the student's academic record and approve/reject for graduation
        </Typography>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        {/* Student Information */}
        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Student Information
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Student ID
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transcript.studentId}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary">
                Student Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transcript.studentName}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transcript.department}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Credits
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transcript.credits}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Cumulative GPA
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {transcript.gpa.toFixed(2)}
            </Typography>
          </Box>
        </Paper>
        
        {/* Course History */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Course History
          </Typography>
          
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell align="center">Credits</TableCell>
                  <TableCell align="center">Grade</TableCell>
                  <TableCell>Semester</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transcript.courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {course.courseCode}
                      </Typography>
                    </TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell align="center">{course.credit}</TableCell>
                    <TableCell align="center">
                      <Typography 
                        variant="body2" 
                        fontWeight="bold"
                        color={course.grade.startsWith('A') ? 'success.main' : 
                               course.grade.startsWith('B') ? 'primary.main' : 
                               'text.primary'}
                      >
                        {course.grade}
                      </Typography>
                    </TableCell>
                    <TableCell>{course.semester}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ minWidth: '120px' }}
        >
          Close
        </Button>
        
        <Button 
          onClick={onReject} 
          variant="contained"
          color="error"
          startIcon={<CancelIcon />}
          sx={{ minWidth: '120px' }}
        >
          Reject
        </Button>
        
        <Button 
          onClick={onApprove} 
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          sx={{ minWidth: '120px' }}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranscriptDialog; 