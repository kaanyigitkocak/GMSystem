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
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import type { TranscriptData } from '../services/types';

interface TranscriptDialogProps {
  open: boolean;
  transcript: TranscriptData | null;
  loading: boolean;
  onClose: () => void;
}

const TranscriptDialog: React.FC<TranscriptDialogProps> = ({
  open,
  transcript,
  loading,
  onClose,
}) => {
  const getGradeColor = (grade: string) => {
    // Convert letter grades to numeric for color coding
    const numericGrade = parseFloat(grade);
    if (!isNaN(numericGrade)) {
      if (numericGrade >= 85) return 'success';
      if (numericGrade >= 70) return 'warning';
      return 'error';
    }
    
    // Handle letter grades
    switch (grade.toUpperCase()) {
      case 'AA':
      case 'BA':
        return 'success';
      case 'BB':
      case 'CB':
        return 'warning';
      case 'CC':
      case 'DC':
        return 'info';
      default:
        return 'error';
    }
  };

  const getGradeChipVariant = (grade: string) => {
    const color = getGradeColor(grade);
    return color === 'error' ? 'filled' : 'outlined';
  };

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SchoolIcon color="primary" />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Student Transcript
            </Typography>
            {transcript && (
              <Typography variant="subtitle2" color="text.secondary">
                {transcript.studentInfo.name} - {transcript.studentInfo.id}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : transcript ? (
          <>
            {/* Student Information */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Student Information
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Student Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {transcript.studentInfo.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Student Number
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {transcript.studentInfo.id}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {transcript.studentInfo.department}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Current GPA
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {transcript.gpa}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Courses Table */}
            <Paper sx={{ overflow: 'hidden' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" color="primary">
                  Course History
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Courses: {transcript.courses.length}
                </Typography>
              </Box>
              
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Course Code</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Course Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Credits</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Grade</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Semester</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transcript.courses.map((course, index) => (
                      <TableRow 
                        key={`${course.id}-${index}`}
                        hover
                        sx={{ 
                          '&:nth-of-type(odd)': { 
                            backgroundColor: 'action.hover' 
                          } 
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {course.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {course.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {course.credits}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={course.grade}
                            color={getGradeColor(course.grade)}
                            variant={getGradeChipVariant(course.grade)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {course.semester}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No transcript data available
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Button
          onClick={onClose}
          variant="contained"
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranscriptDialog;
