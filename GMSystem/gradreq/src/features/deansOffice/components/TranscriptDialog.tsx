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
  Close as CloseIcon,
} from '@mui/icons-material';

// Interface for student transcript data - adapted for dean's office needs
export interface StudentTranscript {
  studentId: string;
  studentName: string;
  department: string;
  faculty: string;
  gpa: number;
  totalCredits: number;
  graduationEligible: boolean;
  courses: Array<{
    courseCode: string;
    courseName: string;
    credit: number;
    grade: string;
    semester: string;
    courseType: 'Mandatory' | 'Technical Elective' | 'Non-Technical Elective' | 'Other';
  }>;
  graduationRequirements: {
    mandatoryCredits: { required: number; completed: number };
    technicalElectives: { required: number; completed: number };
    nonTechnicalElectives: { required: number; completed: number };
    totalRequired: number;
  };
}

interface TranscriptDialogProps {
  open: boolean;
  transcript: StudentTranscript | null;
  onClose: () => void;
}

const TranscriptDialog: React.FC<TranscriptDialogProps> = ({
  open,
  transcript,
  onClose,
}) => {
  if (!transcript) return null;

  const getGradeColor = (grade: string) => {
    const gradeValue = parseFloat(grade);
    if (gradeValue >= 85) return 'success';
    if (gradeValue >= 70) return 'warning';
    return 'error';
  };

  const getCourseTypeColor = (type: string) => {
    switch (type) {
      case 'Mandatory': return 'primary';
      case 'Technical Elective': return 'secondary';
      case 'Non-Technical Elective': return 'info';
      default: return 'default';
    }
  };

  const isRequirementMet = (required: number, completed: number) => completed >= required;

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
              Student Transcript Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Academic record and graduation eligibility review
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 3 }}>
        {/* Student Information */}
        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Student Information
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="body2" color="text.secondary">
                Student ID
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transcript.studentId}
              </Typography>
            </Box>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transcript.studentName}
              </Typography>
            </Box>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="body2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transcript.department}
              </Typography>
            </Box>
            <Box sx={{ minWidth: '200px' }}>
              <Typography variant="body2" color="text.secondary">
                Faculty
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {transcript.faculty}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Academic Summary */}
        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Academic Summary
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {transcript.gpa.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                GPA
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: '120px' }}>
              <Typography variant="h4" color="info.main" fontWeight="bold">
                {transcript.totalCredits}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Credits
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', minWidth: '200px' }}>
              <Chip 
                label={transcript.graduationEligible ? "Eligible for Graduation" : "Not Eligible"}
                color={transcript.graduationEligible ? "success" : "error"}
                size="medium"
                sx={{ fontSize: '0.875rem', py: 1 }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Graduation Requirements */}
        <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Graduation Requirements
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, minWidth: '200px', flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Mandatory Credits
              </Typography>
              <Typography variant="h6" 
                color={isRequirementMet(
                  transcript.graduationRequirements.mandatoryCredits.required,
                  transcript.graduationRequirements.mandatoryCredits.completed
                ) ? 'success.main' : 'error.main'}
              >
                {transcript.graduationRequirements.mandatoryCredits.completed} / {transcript.graduationRequirements.mandatoryCredits.required}
              </Typography>
            </Box>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, minWidth: '200px', flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Technical Electives
              </Typography>
              <Typography variant="h6"
                color={isRequirementMet(
                  transcript.graduationRequirements.technicalElectives.required,
                  transcript.graduationRequirements.technicalElectives.completed
                ) ? 'success.main' : 'error.main'}
              >
                {transcript.graduationRequirements.technicalElectives.completed} / {transcript.graduationRequirements.technicalElectives.required}
              </Typography>
            </Box>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, minWidth: '200px', flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Non-Technical Electives
              </Typography>
              <Typography variant="h6"
                color={isRequirementMet(
                  transcript.graduationRequirements.nonTechnicalElectives.required,
                  transcript.graduationRequirements.nonTechnicalElectives.completed
                ) ? 'success.main' : 'error.main'}
              >
                {transcript.graduationRequirements.nonTechnicalElectives.completed} / {transcript.graduationRequirements.nonTechnicalElectives.required}
              </Typography>
            </Box>
            <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, minWidth: '200px', flex: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Total Credits
              </Typography>
              <Typography variant="h6"
                color={transcript.totalCredits >= transcript.graduationRequirements.totalRequired ? 'success.main' : 'error.main'}
              >
                {transcript.totalCredits} / {transcript.graduationRequirements.totalRequired}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Course Details */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Course Details ({transcript.courses.length} courses)
          </Typography>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Course Code</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell align="center">Credits</TableCell>
                  <TableCell align="center">Grade</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transcript.courses.map((course, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {course.courseCode}
                      </Typography>
                    </TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell align="center">{course.credit}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={course.grade}
                        size="small"
                        color={getGradeColor(course.grade)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>
                      <Chip 
                        label={course.courseType}
                        size="small"
                        color={getCourseTypeColor(course.courseType)}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          startIcon={<CloseIcon />}
          sx={{ minWidth: '120px' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranscriptDialog; 