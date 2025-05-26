import { 
  Box, 
  Typography, 
  Paper, 
  Grid as MuiGrid, 
  Card, 
  CardContent, 
  CardHeader, 
  Button,
  Alert,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material';
import { 
  Visibility, 
  Refresh, 
  ClearAll, 
  CheckCircle, 
  Cancel, 
  Description,
  FileDownload,
  PictureAsPdf
} from '@mui/icons-material';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useStudentAffairs } from '../contexts/StudentAffairsContext';
import { 
  getStudentTranscript, 
  setStudentAffairsApproved, 
  setStudentAffairsRejected, 
  getStudentAffairsUserInfo 
} from '../services';
import type { Student } from '../services/types';
import type { StudentTranscript } from '../components/TranscriptDialog';
import RejectDialog from '../components/RejectDialog';
import { 
  exportStudentsToCSV, 
  exportStudentsToPDF, 
  formatEligibilityStatus, 
  formatGraduationStatus,
  type StudentExportData 
} from '../../../core/utils/exportUtils';

const Grid = MuiGrid as any; // MuiGrid type issue workaround

// Helper function to sort students by eligibility and GPA
const sortStudentsByEligibilityAndGPA = (students: Student[]): Student[] => {
  return [...students].sort((a, b) => {
    // First, sort by eligibility status
    const aEligible = a.graduationStatus === 'Eligible';
    const bEligible = b.graduationStatus === 'Eligible';
    
    if (aEligible && !bEligible) return -1;
    if (!aEligible && bEligible) return 1;
    
    // If both have same eligibility status, sort by GPA (descending)
    const aGPA = a.gpa || 0;
    const bGPA = b.gpa || 0;
    
    return bGPA - aGPA;
  });
};

const ApprovalRankingPage = () => {
  const { 
    students, 
    dashboardStats, 
    loading, 
    error, 
    refreshStudentsData 
  } = useStudentAffairs();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [eligibilityDialogOpen, setEligibilityDialogOpen] = useState(false);
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [transcriptData, setTranscriptData] = useState<StudentTranscript | null>(null);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [studentToReject, setStudentToReject] = useState<Student | null>(null);
  const [userInfo, setUserInfo] = useState<{ userId: string; name: string; email: string } | null>(null);

  // Get sorted students
  const sortedStudents = useMemo(() => {
    return sortStudentsByEligibilityAndGPA(students);
  }, [students]);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getStudentAffairsUserInfo();
        setUserInfo(info);
      } catch (err) {
        console.error('Failed to fetch user info:', err);
        setErrorMessage('Failed to fetch user information');
      }
    };
    fetchUserInfo();
  }, []);

  const handleRefreshData = useCallback(async () => {
    try {
      await refreshStudentsData();
      setSuccessMessage('Student data refreshed successfully.');
    } catch (err) {
      setErrorMessage('Failed to refresh student data. Please try again.');
      console.error('Failed to refresh student data:', err);
    }
  }, [refreshStudentsData]);

  const handleViewEligibilityDetails = useCallback((student: Student) => {
    setSelectedStudent(student);
    setEligibilityDialogOpen(true);
  }, []);

  const handleCloseEligibilityDialog = useCallback(() => {
    setEligibilityDialogOpen(false);
    setSelectedStudent(null);
  }, []);

  const handleViewTranscript = useCallback(async (student: Student) => {
    try {
      setTranscriptLoading(true);
      setSelectedStudent(student);
      console.log("🔍 [StudentAffairsApprovalRanking] Fetching transcript for student:", student.id);
      const transcript = await getStudentTranscript(student.id);
      setTranscriptData(transcript);
      setTranscriptDialogOpen(true);
    } catch (err) {
      console.error('Failed to fetch transcript:', err);
      setErrorMessage('Failed to fetch student transcript. Please try again.');
    } finally {
      setTranscriptLoading(false);
    }
  }, []);

  const handleCloseTranscriptDialog = useCallback(() => {
    setTranscriptDialogOpen(false);
    setSelectedStudent(null);
    setTranscriptData(null);
  }, []);

  const handleApproveStudent = useCallback(async (student: Student) => {
    if (!userInfo) {
      setErrorMessage('User information not available. Please refresh the page.');
      return;
    }

    try {
      console.log("🔍 [StudentAffairsApprovalRanking] Approving student:", student.studentId);
      await setStudentAffairsApproved([student.id], userInfo.userId);
      setSuccessMessage(`Student ${student.name} (${student.studentId}) has been approved for graduation.`);
      
      // Refresh data to show updated status
      await refreshStudentsData();
    } catch (err) {
      setErrorMessage('Failed to approve student. Please try again.');
      console.error('Failed to approve student:', err);
    }
  }, [userInfo, refreshStudentsData]);

  const handleOpenRejectDialog = useCallback((student: Student) => {
    setStudentToReject(student);
    setRejectDialogOpen(true);
  }, []);

  const handleCloseRejectDialog = useCallback(() => {
    setStudentToReject(null);
    setRejectDialogOpen(false);
  }, []);

  const handleConfirmReject = useCallback(async (rejectionReason: string) => {
    if (!studentToReject || !userInfo) {
      setErrorMessage('Missing information for rejection. Please try again.');
      return;
    }

    try {
      console.log(`🔍 [StudentAffairsApprovalRanking] Rejecting student: ${studentToReject.studentId} with reason: ${rejectionReason}`);
      await setStudentAffairsRejected([studentToReject.id], userInfo.userId, rejectionReason);
      setSuccessMessage(`Student ${studentToReject.name} (${studentToReject.studentId}) has been rejected.`);
      
      // Refresh data to show updated status
      await refreshStudentsData();
    } catch (err) {
      setErrorMessage('Failed to reject student. Please try again.');
      console.error('Failed to reject student:', err);
    } finally {
      handleCloseRejectDialog();
    }
  }, [studentToReject, userInfo, refreshStudentsData, handleCloseRejectDialog]);

  const handleCloseSuccessMessage = useCallback(() => {
    setSuccessMessage('');
  }, []);

  const handleCloseErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  // Export functions
  const handleExportCSV = useCallback(() => {
    try {
      const exportData: StudentExportData[] = sortedStudents.map((student, index) => ({
        rank: index + 1,
        name: student.name,
        studentId: student.studentId,
        department: student.department,
        faculty: student.faculty,
        gpa: student.gpa || 0,
        eligibilityStatus: formatEligibilityStatus(student.graduationStatus),
        status: formatGraduationStatus(student.graduationStatus),
        lastCheckDate: undefined // Student Affairs doesn't have lastCheckDate
      }));

      exportStudentsToCSV(exportData, 'student_affairs_approval_ranking', 'Öğrenci İşleri Onay ve Sıralama');
      setSuccessMessage('Student data exported to CSV successfully.');
    } catch (error) {
      setErrorMessage('Failed to export CSV. Please try again.');
      console.error('Failed to export CSV:', error);
    }
  }, [sortedStudents, setSuccessMessage, setErrorMessage]);

  const handleExportPDF = useCallback(() => {
    try {
      const exportData: StudentExportData[] = sortedStudents.map((student, index) => ({
        rank: index + 1,
        name: student.name,
        studentId: student.studentId,
        department: student.department,
        faculty: student.faculty,
        gpa: student.gpa || 0,
        eligibilityStatus: formatEligibilityStatus(student.graduationStatus),
        status: formatGraduationStatus(student.graduationStatus),
        lastCheckDate: undefined // Student Affairs doesn't have lastCheckDate
      }));

      exportStudentsToPDF(exportData, 'student_affairs_approval_ranking', 'Öğrenci İşleri Onay ve Sıralama');
      setSuccessMessage('Student data exported to PDF successfully.');
    } catch (error) {
      setErrorMessage('Failed to export PDF. Please try again.');
      console.error('Failed to export PDF:', error);
    }
  }, [sortedStudents, setSuccessMessage, setErrorMessage]);

  // İlk yükleme (veri yokken) ve genel refresh için loading durumu
  if (loading && students.length === 0) {
    console.log("[StudentAffairsApprovalRanking] Rendering: Initial Loading Screen");
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
        <CircularProgress size={60} />
        <Typography sx={{ ml: 2 }}>Loading student eligibility data...</Typography>
      </Box>
    );
  }

  if (error && students.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Approval & Ranking
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
          <Button onClick={handleRefreshData} size="small" sx={{ ml: 1 }}>
            Retry
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Approval & Ranking
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Review student eligibility status and manage graduation approvals. Students are sorted by eligibility status and GPA.
        </Typography>
        {loading && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <strong>Refreshing student data...</strong> Please wait while we update the student information.
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Statistics Summary */}
        {dashboardStats && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Student Affairs Eligibility Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {dashboardStats.eligibleStudents}
                    </Typography>
                    <Typography variant="body2">Eligible Students</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="error.main">
                      {dashboardStats.notEligibleStudents}
                    </Typography>
                    <Typography variant="body2">Ineligible Students</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      {dashboardStats.pendingStudents}
                    </Typography>
                    <Typography variant="body2">Pending Checks</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Tooltip title="Refresh Data">
                        <span>
                        <IconButton 
                          onClick={handleRefreshData}
                          disabled={loading}
                          color="primary"
                          size="small"
                        >
                          <Refresh />
                        </IconButton>
                        </span>
                      </Tooltip>
                      <Tooltip title="Clear Cache & Full Refresh">
                        <span>
                        <IconButton 
                          onClick={handleRefreshData} 
                          disabled={loading}
                          color="secondary"
                          size="small"
                        >
                          <ClearAll />
                        </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                    <Typography variant="body2">Actions</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}

        {/* Student Eligibility Table */}
        {students.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardHeader 
                title="Student Eligibility Details (Sorted by Eligibility & GPA)"
                action={
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleExportCSV}
                      disabled={loading || sortedStudents.length === 0}
                      startIcon={<FileDownload />}
                      sx={{ minWidth: '100px' }}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleExportPDF}
                      disabled={loading || sortedStudents.length === 0}
                      startIcon={<PictureAsPdf />}
                      sx={{ minWidth: '100px' }}
                    >
                      PDF
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleRefreshData}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={16} /> : <Refresh />}
                    >
                      Refresh List
                    </Button>
                  </Box>
                }
              />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Student ID</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Faculty</TableCell>
                        <TableCell>GPA</TableCell>
                        <TableCell>Eligibility Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedStudents.map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              #{index + 1}
                            </Typography>
                          </TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.faculty}</TableCell>
                          <TableCell>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 'bold',
                                color: student.gpa >= 3.0 ? 'success.main' : 'error.main'
                              }}
                            >
                              {student.gpa.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={student.graduationStatus}
                              color={
                                student.graduationStatus === 'Eligible' ? 'success' : 
                                student.graduationStatus === 'Not Eligible' ? 'error' : 'warning'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Tooltip title="View Eligibility Details">
                                <span>
                                <IconButton
                                  onClick={() => handleViewEligibilityDetails(student)}
                                  disabled={!student.eligibilityResults || student.eligibilityResults.length === 0}
                                  size="small"
                                >
                                  <Visibility />
                                </IconButton>
                                </span>
                              </Tooltip>
                              <Tooltip title="View Transcript">
                                <IconButton
                                  onClick={() => handleViewTranscript(student)}
                                  size="small"
                                  color="info"
                                >
                                  <Description />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Approve for Graduation">
                                <span>
                                <IconButton
                                  onClick={() => handleApproveStudent(student)}
                                  disabled={student.graduationStatus !== 'Eligible'}
                                  size="small"
                                  color="success"
                                >
                                  <CheckCircle />
                                </IconButton>
                                </span>
                              </Tooltip>
                              <Tooltip title="Reject for Graduation">
                                <span>
                                <IconButton
                                  onClick={() => handleOpenRejectDialog(student)}
                                  disabled={!student.eligibilityResults || student.eligibilityResults.length === 0}
                                  size="small"
                                  color="error"
                                >
                                  <Cancel />
                                </IconButton>
                                </span>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* No Data State */}
        {students.length === 0 && !loading && (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Student Data Available
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                There are no students to display. Please check your data source or try refreshing.
              </Typography>
              <Button variant="contained" onClick={handleRefreshData} startIcon={<Refresh />}>
                Refresh Data
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Eligibility Details Dialog */}
      <Dialog 
        open={eligibilityDialogOpen} 
        onClose={handleCloseEligibilityDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Eligibility Details - {selectedStudent?.name}
        </DialogTitle>
        <DialogContent>
          {selectedStudent?.eligibilityResults ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Student ID: {selectedStudent.studentId} | Department: {selectedStudent.department} | GPA: {selectedStudent.gpa.toFixed(2)}
              </Typography>
              <Alert 
                severity={selectedStudent.isEligible ? 'success' : 'error'} 
                sx={{ mb: 2 }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {selectedStudent.isEligible 
                    ? 'This student meets all graduation requirements.' 
                    : 'This student does not meet all graduation requirements.'}
                </Typography>
              </Alert>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Requirement</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actual Value</TableCell>
                      <TableCell>Required Value</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedStudent.eligibilityResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {result.checkType === 1 ? 'GPA' :
                           result.checkType === 2 ? 'Total ECTS' :
                           result.checkType === 3 ? 'Mandatory Courses' :
                           result.checkType === 4 ? 'Technical Electives' :
                           result.checkType === 5 ? 'Non-Technical Electives' :
                           result.checkType === 6 ? 'University Electives' :
                           result.checkType === 7 ? 'Failed Course Limit' :
                           `Check Type ${result.checkType}`}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={result.isMet ? 'Met' : 'Not Met'}
                            color={result.isMet ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{result.actualValue}</TableCell>
                        <TableCell>{result.requiredValue}</TableCell>
                        <TableCell>{result.notesOrMissingItems || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Alert severity="warning">
              Eligibility check has not been performed for this student yet.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEligibilityDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Transcript Dialog */}
      <Dialog 
        open={transcriptDialogOpen} 
        onClose={handleCloseTranscriptDialog} 
        maxWidth="lg" 
        fullWidth
      >
        <DialogTitle>
          Student Transcript - {selectedStudent?.name}
        </DialogTitle>
        <DialogContent>
          {transcriptLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading transcript...</Typography>
            </Box>
          ) : transcriptData ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Course Code</TableCell>
                    <TableCell>Course Name</TableCell>
                    <TableCell>Credits</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transcriptData.courses.map((course, index) => (
                    <TableRow key={index}>
                      <TableCell>{course.courseCode || 'N/A'}</TableCell>
                      <TableCell>{course.courseName || 'N/A'}</TableCell>
                      <TableCell>{course.credit || 'N/A'}</TableCell>
                      <TableCell>{course.grade || 'N/A'}</TableCell>
                      <TableCell>{course.semester || 'N/A'}</TableCell>
                      <TableCell>{course.courseType || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Alert severity="info">
              No transcript data available for this student.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTranscriptDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      {studentToReject && (
        <RejectDialog
          open={rejectDialogOpen}
          onClose={handleCloseRejectDialog}
          onConfirm={handleConfirmReject}
          studentName={`${studentToReject.name} (${studentToReject.studentId})`}
        />
      )}

      {/* Success/Error Messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
      >
        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApprovalRankingPage; 