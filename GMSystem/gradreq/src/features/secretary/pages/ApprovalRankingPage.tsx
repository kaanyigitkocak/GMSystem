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
  PlayArrow, 
  ClearAll, 
  CheckCircle, 
  Cancel, 
  Description 
} from '@mui/icons-material';
import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import type { Student, EligibilityCheckType, CourseTaken } from '../../advisor/services/types';
import { useEligibility } from '../contexts/EligibilityContext';
import { getStudentCourseTakensApi } from '../services/api/studentsApi';
import TranscriptDialog from '../components/rankings/TranscriptDialog';
import { LoadingOverlay } from '../../../shared/components';

const Grid = MuiGrid as any;

// Helper function to get check type name
const getCheckTypeName = (checkType: EligibilityCheckType): string => {
  switch (checkType) {
    case 1: return 'GPA';
    case 2: return 'Total ECTS';
    case 3: return 'Mandatory Courses';
    case 4: return 'Technical Electives';
    case 5: return 'Non-Technical Electives';
    case 6: return 'University Electives';
    case 7: return 'Failed Course Limit';
    default: return 'Unknown';
  }
};

// Helper function to sort students by eligibility and GPA
const sortStudentsByEligibilityAndGPA = (students: Student[]): Student[] => {
  return [...students].sort((a, b) => {
    // First, sort by eligibility status
    const aEligible = a.eligibilityStatus?.hasResults && a.eligibilityStatus.isEligible;
    const bEligible = b.eligibilityStatus?.hasResults && b.eligibilityStatus.isEligible;
    
    if (aEligible && !bEligible) return -1;
    if (!aEligible && bEligible) return 1;
    
    // If both have same eligibility status, sort by GPA (descending)
    const aGPA = parseFloat(a.gpa) || 0;
    const bGPA = parseFloat(b.gpa) || 0;
    
    return bGPA - aGPA;
  });
};

const ApprovalRankingPage = () => {
  // const navigate = useNavigate();
  
  // Use eligibility context instead of local state
  const {
    eligibilityData,
    loading,
    performingChecks,
    error,
    fetchEligibilityData,
    performEligibilityChecksForMissingStudents,
    refreshEligibilityData,
  } = useEligibility();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [eligibilityDialogOpen, setEligibilityDialogOpen] = useState(false);
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [transcriptData, setTranscriptData] = useState<CourseTaken[]>([]);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // console.log("[ApprovalRankingPage] performingChecks from context:", performingChecks);
  // console.log("[ApprovalRankingPage] loading from context:", loading);

  const handlePerformEligibilityChecks = useCallback(async () => {
    try {
      console.log("!!!! [ApprovalRankingPage] INSIDE TRY - handlePerformEligibilityChecks - useCallback WRAPPED !!!!");
      console.log("🔍 [SecretaryApprovalRanking] Starting eligibility checks for missing students...");
      const result = await performEligibilityChecksForMissingStudents();
      setSuccessMessage(
        `Eligibility checks completed for ${result.processedStudents.length} students. Results are being processed...`
      );
      console.log("✅ [SecretaryApprovalRanking] Eligibility checks completed, list will be updated automatically");
    } catch (err) {
      setErrorMessage('Failed to perform eligibility checks. Please try again.');
      console.error('Failed to perform eligibility checks:', err);
    }
  }, [performEligibilityChecksForMissingStudents, setSuccessMessage, setErrorMessage]);

  const handleRefreshWithClearCache = useCallback(async () => {
    try {
      await refreshEligibilityData(true);
      setSuccessMessage('Eligibility data refreshed successfully.');
    } catch (err) {
      setErrorMessage('Failed to refresh eligibility data. Please try again.');
      console.error('Failed to refresh eligibility data:', err);
    }
  }, [refreshEligibilityData, setSuccessMessage, setErrorMessage]);

  const handleManualRefresh = useCallback(async () => {
    try {
      await fetchEligibilityData(true);
      setSuccessMessage('Eligibility data refreshed successfully.');
    } catch (err) {
      setErrorMessage('Failed to refresh eligibility data. Please try again.');
      console.error('Failed to refresh eligibility data:', err);
    }
  }, [fetchEligibilityData, setSuccessMessage, setErrorMessage]);

  const handleViewEligibilityDetails = useCallback((student: Student) => {
    setSelectedStudent(student);
    setEligibilityDialogOpen(true);
  }, [setSelectedStudent, setEligibilityDialogOpen]);

  const handleCloseEligibilityDialog = useCallback(() => {
    setEligibilityDialogOpen(false);
    setSelectedStudent(null);
  }, [setEligibilityDialogOpen, setSelectedStudent]);

  const handleViewTranscript = useCallback(async (student: Student) => {
    try {
      setTranscriptLoading(true);
      setSelectedStudent(student);
      console.log("🔍 [SecretaryApprovalRanking] Fetching transcript for student:", student.id);
      const courses = await getStudentCourseTakensApi(student.id);
      setTranscriptData(courses);
      setTranscriptDialogOpen(true);
    } catch (err) {
      console.error('Failed to fetch transcript:', err);
      setErrorMessage('Failed to fetch student transcript. Please try again.');
    } finally {
      setTranscriptLoading(false);
    }
  }, [setTranscriptLoading, setSelectedStudent, setTranscriptData, setTranscriptDialogOpen, setErrorMessage]);

  const handleCloseTranscriptDialog = useCallback(() => {
    setTranscriptDialogOpen(false);
    setSelectedStudent(null);
    setTranscriptData([]);
  }, [setTranscriptDialogOpen, setSelectedStudent, setTranscriptData]);

  const handleApproveStudent = useCallback(async (student: Student) => {
    try {
      console.log("🔍 [SecretaryApprovalRanking] Approving student (placeholder):", student.id);
      setSuccessMessage(`Student ${student.name} (${student.studentNumber}) request noted (placeholder).`);
    } catch (err) {
      setErrorMessage('Failed to process approval. Please try again.');
      console.error('Failed to process approval:', err);
    }
  }, [setSuccessMessage, setErrorMessage]);

  const handleRejectStudent = useCallback(async (student: Student) => {
    try {
      console.log("🔍 [SecretaryApprovalRanking] Rejecting student (placeholder):", student.id);
      setSuccessMessage(`Student ${student.name} (${student.studentNumber}) rejection noted (placeholder).`);
    } catch (err) {
      setErrorMessage('Failed to process rejection. Please try again.');
      console.error('Failed to process rejection:', err);
    }
  }, [setSuccessMessage, setErrorMessage]);

  const handleCloseSuccessMessage = useCallback(() => {
    setSuccessMessage('');
  }, [setSuccessMessage]);

  const handleCloseErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, [setErrorMessage]);

  // Get sorted students
  const sortedStudents = eligibilityData 
    ? sortStudentsByEligibilityAndGPA(eligibilityData.studentsWithEligibility as any)
    : [];

  // İlk yükleme (veri yokken) ve genel refresh için loading durumu
  if (loading && !eligibilityData) {
    console.log("[ApprovalRankingPage] Rendering: Initial Loading Screen");
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
        <CircularProgress size={60} />
        <Typography sx={{ ml: 2 }}>Loading student eligibility data...</Typography>
      </Box>
    );
  }

  // Genel hata durumu (veri yokken)
  if (error && !eligibilityData) {
    console.log("[ApprovalRankingPage] Rendering: Initial Error Screen");
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2, justifyContent: 'center' }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={() => fetchEligibilityData(true)}>
          Retry Loading Data
        </Button>
      </Box>
    );
  }

  console.log("[ApprovalRankingPage] Rendering: Main Content. performingChecks for Overlay:", performingChecks);

  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      {/* performingChecks için LoadingOverlay */}
      <LoadingOverlay 
        isLoading={performingChecks} 
        message="Performing eligibility checks, please wait..." 
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Approval & Ranking
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Review student eligibility status and manage graduation approvals for all students in the department. Students are sorted by eligibility status and GPA.
        </Typography>
        {/* Bu Alert artık LoadingOverlay tarafından kapsanacağı için kaldırılabilir veya farklı şekilde gösterilebilir. */}
        {/* Şimdilik bırakıyorum, belki overlay altında da bir bilgi vermek istenebilir.*/}
        {performingChecks && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <strong>Running eligibility checks...</strong> This may take a few moments.
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Statistics Summary */}
        {eligibilityData && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Department Eligibility Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {eligibilityData.eligibleCount}
                    </Typography>
                    <Typography variant="body2">Eligible Students</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="error.main">
                      {eligibilityData.ineligibleCount}
                    </Typography>
                    <Typography variant="body2">Ineligible Students</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      {eligibilityData.pendingCheckCount}
                    </Typography>
                    <Typography variant="body2">Pending Checks</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <Tooltip title="Refresh Data (from cache)">
                        <span>
                        <IconButton 
                          onClick={() => fetchEligibilityData(false)}
                          disabled={loading || performingChecks}
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
                          onClick={handleRefreshWithClearCache} 
                          disabled={loading || performingChecks}
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

        {/* Eligibility Actions */}
        {eligibilityData && eligibilityData.pendingCheckCount > 0 && (
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {eligibilityData.pendingCheckCount} students don't have eligibility check results.
                  </Typography>
                  <Typography variant="body2">
                    Click the button below to perform eligibility checks for these students.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handlePerformEligibilityChecks}
                  disabled={performingChecks || loading}
                  startIcon={performingChecks ? <CircularProgress size={16} /> : <PlayArrow />}
                  sx={{ ml: 2, minWidth: '200px' }}
                >
                  {performingChecks ? 'Running Checks...' : 'Perform Eligibility Check'}
                </Button>
              </Box>
            </Alert>
          </Grid>
        )}

        {/* Student Eligibility Table */}
        {eligibilityData && (
          <Grid item xs={12}>
            <Card>
              <CardHeader 
                title="Department Student Eligibility Details (Sorted by Eligibility & GPA)"
                action={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePerformEligibilityChecks}
                      disabled={performingChecks || loading}
                      startIcon={performingChecks ? <CircularProgress size={16} /> : <PlayArrow />}
                    >
                      {performingChecks ? 'Running Checks...' : 'Perform Checks for All'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => fetchEligibilityData(false)}
                      disabled={loading || performingChecks}
                      startIcon={(loading && !performingChecks) ? <CircularProgress size={16} /> : <Refresh />}
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
                        <TableCell>GPA</TableCell>
                        <TableCell>Eligibility Status</TableCell>
                        <TableCell>Last Check Date</TableCell>
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
                          <TableCell>{student.studentNumber || student.id}</TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 'bold',
                                color: parseFloat(student.gpa) >= 3.0 ? 'success.main' : 'error.main'
                              }}
                            >
                              {student.gpa}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {student.eligibilityStatus?.hasResults ? (
                              <Chip
                                label={student.eligibilityStatus.isEligible ? 'Eligible' : 'Not Eligible'}
                                color={student.eligibilityStatus.isEligible ? 'success' : 'error'}
                                size="small"
                              />
                            ) : (
                              <Chip label="No Results Available" color="warning" size="small" />
                            )}
                          </TableCell>
                          <TableCell>
                            {student.eligibilityStatus?.lastCheckDate
                              ? new Date(student.eligibilityStatus.lastCheckDate).toLocaleDateString()
                              : 'N/A'
                            }
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <Tooltip title="View Eligibility Details">
                                <span>
                                <IconButton
                                  onClick={() => handleViewEligibilityDetails(student)}
                                  disabled={!student.eligibilityStatus?.hasResults}
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
                                  disabled={!student.eligibilityStatus?.hasResults || !student.eligibilityStatus.isEligible}
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
                                  onClick={() => handleRejectStudent(student)}
                                  disabled={!student.eligibilityStatus?.hasResults}
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
          {selectedStudent?.eligibilityStatus?.eligibilityChecks && selectedStudent.eligibilityStatus.eligibilityChecks.length > 0 ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Student ID: {selectedStudent.studentNumber || selectedStudent.id} | Department: {selectedStudent.department} | GPA: {selectedStudent.gpa}
              </Typography>
              <Alert 
                severity={selectedStudent.eligibilityStatus.isEligible ? 'success' : 'error'} 
                sx={{ mb: 2 }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {selectedStudent.eligibilityStatus.isEligible 
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
                      <TableCell>Check Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedStudent.eligibilityStatus.eligibilityChecks.map((check) => (
                      <TableRow key={check.id}>
                        <TableCell>{getCheckTypeName(check.checkType)}</TableCell>
                        <TableCell>
                          <Chip
                            label={check.isMet ? 'Met' : 'Not Met'}
                            color={check.isMet ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{check.actualValue}</TableCell>
                        <TableCell>{check.requiredValue}</TableCell>
                        <TableCell>
                          {new Date(check.checkDate).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {selectedStudent.eligibilityStatus.eligibilityChecks.some(check => check.notesOrMissingItems) && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Notes
                  </Typography>
                  {selectedStudent.eligibilityStatus.eligibilityChecks
                    .filter(check => check.notesOrMissingItems)
                    .map((check) => (
                      <Alert key={check.id} severity="info" sx={{ mb: 1 }}>
                        <strong>{getCheckTypeName(check.checkType)}:</strong> {check.notesOrMissingItems}
                      </Alert>
                    ))
                  }
                </Box>
              )}
            </>
          ) : (
            <Alert severity="warning">
              No eligibility check results available for this student. Use the "Perform Eligibility Check" button to generate results.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEligibilityDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Transcript Dialog - Component Kullanımı */}
      <TranscriptDialog
        open={transcriptDialogOpen}
        onClose={handleCloseTranscriptDialog}
        student={selectedStudent}
        courses={transcriptData}
        isLoading={transcriptLoading}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
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