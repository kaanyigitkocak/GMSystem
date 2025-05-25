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
} from '@mui/material';
import {
  School as SchoolIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { LoadingOverlay } from '../../../../shared/components';
import type { CourseTaken } from '../../../advisor/services/types';
import type { Student } from '../../../advisor/services/types';

interface TranscriptDialogProps {
  open: boolean;
  student: Student | null;
  courses: CourseTaken[] | null;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  isLoading?: boolean;
}

const TranscriptDialog: React.FC<TranscriptDialogProps> = ({
  open,
  student,
  courses,
  onClose,
  onApprove,
  onReject,
  isLoading = false,
}) => {
  const getGradeChipColor = (grade: string): 'success' | 'warning' | 'error' | 'default' => {
    const upperGrade = grade.toUpperCase();
    if (['AA', 'BA', 'BB', 'CB', 'CC'].includes(upperGrade)) return 'success';
    if (['DC', 'DD'].includes(upperGrade)) return 'warning';
    if (['FF', 'FD', 'F', 'U'].includes(upperGrade)) return 'error';
    return 'default';
  };

  const getStatusChip = (isSuccessfullyCompleted: boolean): { text: string; color: 'success' | 'error' } => {
    return isSuccessfullyCompleted 
      ? { text: 'Passed', color: 'success' }
      : { text: 'Failed', color: 'error' };
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
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Student Transcript - {student?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Student ID: {student?.studentNumber || student?.id} | Department: {student?.department} | GPA: {student?.gpa}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3, position: 'relative' }}>
        <LoadingOverlay 
          isLoading={isLoading} 
          message="Loading transcript data..."
        />
        
        {/* Course Details */}
        <Paper variant="outlined" sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Course Details ({courses?.length || 0} courses)
          </Typography>
          {courses && courses.length > 0 ? (
            <TableContainer sx={{ maxHeight: 'calc(80vh - 280px)' }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Course Code</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell align="center">Credits</TableCell>
                    <TableCell align="center">Grade</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell>Semester</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => {
                    const statusInfo = getStatusChip(course.isSuccessfullyCompleted);
                    return (
                      <TableRow key={course.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {course.courseCodeInTranscript}
                          </Typography>
                        </TableCell>
                        <TableCell>{course.courseNameInTranscript}</TableCell>
                        <TableCell align="center">{course.creditsEarned}</TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={course.grade}
                            size="small"
                            color={getGradeChipColor(course.grade)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={statusInfo.text}
                            size="small"
                            color={statusInfo.color}
                            variant="filled"
                          />
                        </TableCell>
                        <TableCell>{course.semesterTaken}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ textAlign: 'center', py: 3 }}>
              No course data available for this student.
            </Typography>
          )}
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
        
        {onApprove && (
          <Button 
            onClick={onApprove} 
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            sx={{ minWidth: '120px' }}
            disabled={isLoading}
          >
            Approve
          </Button>
        )}
        {onReject && (
          <Button 
            onClick={onReject} 
            variant="contained"
            color="error"
            startIcon={<CancelIcon />}
            sx={{ minWidth: '120px' }}
            disabled={isLoading}
          >
            Reject
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TranscriptDialog; 