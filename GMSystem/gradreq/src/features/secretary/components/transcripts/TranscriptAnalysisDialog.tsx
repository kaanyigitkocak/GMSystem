import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  Warning,
  School,
  Grade,
  TrendingUp
} from '@mui/icons-material';
import type { ParsedStudentTranscript } from '../../utils/transcriptUtils';

interface TranscriptAnalysisDialogProps {
  open: boolean;
  transcript: ParsedStudentTranscript | null;
  onClose: () => void;
  onConfirm?: (transcript: ParsedStudentTranscript) => void;
}

/**
 * TranscriptAnalysisDialog Component
 * 
 * Displays detailed analysis of a parsed student transcript including:
 * - Student information
 * - GPA and credit calculations
 * - Course breakdown by type
 * - Graduation eligibility analysis
 * - Missing requirements
 */
const TranscriptAnalysisDialog: React.FC<TranscriptAnalysisDialogProps> = ({
  open,
  transcript,
  onClose,
  onConfirm
}) => {
  if (!transcript) return null;

  const {
    studentId,
    studentName,
    department,
    calculatedGpa,
    totalCredits,
    mandatoryCourses,
    technicalElectives,
    nonTechnicalElectives,
    analysis
  } = transcript;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(transcript);
    }
    onClose();
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
    ) : (
      <Cancel sx={{ color: 'error.main', fontSize: 20 }} />
    );
  };

  const getStatusColor = (status: boolean) => {
    return status ? 'success' : 'error';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <School color="primary" />
          <Typography variant="h6">
            Transcript Analysis - {studentName}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Student Information */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Student Information
              </Typography>
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Student ID
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {studentId}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Department
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {department}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Academic Summary & Graduation Eligibility */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TrendingUp color="primary" />
                  <Typography variant="h6">Academic Summary</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      GPA
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {calculatedGpa}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Credits
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                      {totalCredits}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Grade color="primary" />
                  <Typography variant="h6">Graduation Eligibility</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getStatusIcon(analysis.isEligibleForGraduation)}
                  <Chip
                    label={analysis.isEligibleForGraduation ? 'Eligible' : 'Not Eligible'}
                    color={getStatusColor(analysis.isEligibleForGraduation)}
                    variant="filled"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Course Statistics */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Statistics
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <Box>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {mandatoryCourses.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mandatory Courses
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" color="secondary" fontWeight="bold">
                    {technicalElectives.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Technical Electives
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    {nonTechnicalElectives.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Non-Technical Electives
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Requirements Check */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Requirements Check
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    {getStatusIcon(analysis.hasAllMandatoryCourses)}
                  </ListItemIcon>
                  <ListItemText
                    primary="All Mandatory Courses"
                    secondary="Required: All mandatory courses must be completed"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {getStatusIcon(analysis.hasMinimumTechnicalElectives)}
                  </ListItemIcon>
                  <ListItemText
                    primary="Technical Electives"
                    secondary={`Required: Minimum 6 courses (Current: ${technicalElectives.filter(c => c.grade !== 'FF').length})`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {getStatusIcon(analysis.hasMinimumNonTechnicalElectives)}
                  </ListItemIcon>
                  <ListItemText
                    primary="Non-Technical Electives"
                    secondary={`Required: Minimum 3 courses (Current: ${nonTechnicalElectives.filter(c => c.grade !== 'FF').length})`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {getStatusIcon(analysis.hasMinimumCredits)}
                  </ListItemIcon>
                  <ListItemText
                    primary="Total Credits"
                    secondary={`Required: Minimum 240 ECTS (Current: ${totalCredits})`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {getStatusIcon(analysis.hasMinimumGpa)}
                  </ListItemIcon>
                  <ListItemText
                    primary="Minimum GPA"
                    secondary={`Required: Minimum 2.0 GPA (Current: ${calculatedGpa})`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Missing Requirements */}
          {analysis.missingRequirements.length > 0 && (
            <Alert severity="warning" icon={<Warning />}>
              <Typography variant="h6" gutterBottom>
                Missing Requirements
              </Typography>
              <List dense>
                {analysis.missingRequirements.map((requirement, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={requirement} />
                  </ListItem>
                ))}
              </List>
            </Alert>
          )}

          {/* Course Details Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Details ({transcript.courses.length} courses)
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Course Code</TableCell>
                      <TableCell>Course Name</TableCell>
                      <TableCell>Grade</TableCell>
                      <TableCell>Credits</TableCell>
                      <TableCell>Semester</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transcript.courses.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell>{course.courseCode}</TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell>
                          <Chip
                            label={course.grade}
                            size="small"
                            color={course.grade === 'FF' ? 'error' : 'success'}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{course.semester}</TableCell>
                        <TableCell>
                          <Chip
                            label={course.courseType}
                            size="small"
                            variant="outlined"
                            color={
                              course.courseType === 'Mandatory' ? 'primary' :
                              course.courseType === 'Technical Elective' ? 'secondary' : 'info'
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        {onConfirm && (
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm & Process
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TranscriptAnalysisDialog; 