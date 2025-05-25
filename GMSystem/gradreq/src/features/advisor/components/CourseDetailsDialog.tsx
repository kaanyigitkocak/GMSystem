import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import type { CourseTaken } from '../services/types';

interface CourseDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  studentName?: string;
  studentId?: string;
  courses: CourseTaken[];
  loading: boolean;
  error?: string | null;
}

const CourseDetailsDialog = ({
  open,
  onClose,
  studentName,
  studentId,
  courses,
  loading,
  error
}: CourseDetailsDialogProps) => {
  
  // Debug logs
  console.log('📋 [CourseDialogDebug] Dialog props:', {
    open,
    studentName,
    studentId,
    coursesCount: courses.length,
    loading,
    error,
    courses: courses.slice(0, 2) // Show first 2 courses for debugging
  });
  
  // Helper function to get grade color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'AA':
      case 'BA':
        return 'success';
      case 'BB':
      case 'CB':
        return 'info';
      case 'CC':
      case 'DC':
        return 'warning';
      case 'DD':
      case 'FF':
        return 'error';
      default:
        return 'default';
    }
  };

  // Calculate statistics
  const totalCredits = courses.reduce((sum, course) => sum + course.creditsEarned, 0);
  const completedCourses = courses.filter(course => course.isSuccessfullyCompleted).length;
  const averageGrade = courses.length > 0 ? 
    courses.reduce((sum, course) => {
      const gradePoints: Record<string, number> = {
        'AA': 4.0, 'BA': 3.5, 'BB': 3.0, 'CB': 2.5,
        'CC': 2.0, 'DC': 1.5, 'DD': 1.0, 'FF': 0.0
      };
      return sum + (gradePoints[course.grade] || 0);
    }, 0) / courses.length : 0;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '600px' }
      }}
    >
      <DialogTitle>
        <Box>
          <Typography variant="h5" component="div">
            Course Details
          </Typography>
          {studentName && (
            <Typography variant="subtitle1" color="text.secondary">
              Student: {studentName} {studentId && `(${studentId})`}
            </Typography>
          )}
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <CircularProgress sx={{ mr: 2 }} />
            <Typography>Loading course details...</Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && courses.length > 0 && (
          <>
            {/* Statistics Summary */}
            <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Courses
                  </Typography>
                  <Typography variant="h6">
                    {courses.length}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Completed Courses
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {completedCourses}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Credits
                  </Typography>
                  <Typography variant="h6">
                    {totalCredits}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Average Grade
                  </Typography>
                  <Typography variant="h6">
                    {averageGrade.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Courses Table */}
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell><strong>Course Code</strong></TableCell>
                    <TableCell><strong>Course Name</strong></TableCell>
                    <TableCell align="center"><strong>Grade</strong></TableCell>
                    <TableCell align="center"><strong>Credits</strong></TableCell>
                    <TableCell><strong>Semester</strong></TableCell>
                    <TableCell align="center"><strong>Status</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow 
                      key={course.id}
                      sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {course.courseCodeInTranscript}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {course.courseNameInTranscript}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={course.grade} 
                          color={getGradeColor(course.grade)}
                          size="small"
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">
                          {course.creditsEarned}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {course.semesterTaken}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={course.isSuccessfullyCompleted ? 'Completed' : 'Failed'} 
                          color={course.isSuccessfullyCompleted ? 'success' : 'error'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {!loading && !error && courses.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Course Data Available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This student has no course records in the system.
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDetailsDialog; 