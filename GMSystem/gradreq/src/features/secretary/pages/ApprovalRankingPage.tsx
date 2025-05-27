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
  Description,
  FileDownload,
  PictureAsPdf
} from '@mui/icons-material';
import { useState, useCallback, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import type { Student, EligibilityCheckType, CourseTaken } from '../../advisor/services/types';
import { useEligibility } from '../contexts/EligibilityContext';
import { getStudentCourseTakensApi, clearAllCaches, setSecretaryApprovedApi, cleanupLocalStorageIfNeeded } from '../services/api/studentsApi';
import { getSecretaryData } from '../services/api/studentsApi';
import TranscriptDialog from '../components/rankings/TranscriptDialog';
import { LoadingOverlay } from '../../../shared/components';
import RejectDialog from '../components/RejectDialog';
import { setDeptSecretaryRejected } from '../services/graduationProcessService';
import { 
  exportStudentsToCSV, 
  exportStudentsToPDF, 
  formatEligibilityStatus, 
  formatGraduationStatus,
  getStatusColor,
  type StudentExportData 
} from '../../../core/utils/exportUtils';
import { GraduationProcessStatus } from '../types/index.d';

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

// Helper function to check if student is already approved by secretary
const isStudentApprovedBySecretary = (student: Student, recentlyApproved: Set<string>): boolean => {
  const processStatus = student.activeGraduationProcessStatus || student.graduationProcess?.status;
  return processStatus === GraduationProcessStatus.DEPT_SECRETARY_APPROVED_PENDING_DEAN || recentlyApproved.has(student.id);
};

// Helper function to check if student is already rejected by secretary
const isStudentRejectedBySecretary = (student: Student, recentlyRejected: Set<string>): boolean => {
  const processStatus = student.activeGraduationProcessStatus || student.graduationProcess?.status;
  return processStatus === GraduationProcessStatus.DEPT_SECRETARY_REJECTED_PROCESS || recentlyRejected.has(student.id);
};

// Helper function to check if student is rejected by advisor
const isStudentRejectedByAdvisor = (student: Student): boolean => {
  const processStatus = student.activeGraduationProcessStatus || student.graduationProcess?.status;
  return processStatus === GraduationProcessStatus.ADVISOR_NOT_ELIGIBLE;
};

// Helper function to check if student is waiting for advisor approval
const isWaitingForAdvisorApproval = (student: Student): boolean => {
  const processStatus = student.activeGraduationProcessStatus || student.graduationProcess?.status;
  return processStatus === GraduationProcessStatus.AWAITING_DEPT_SECRETARY_TRANSCRIPT_UPLOAD;
};

// Helper function to get row background color based on approval/rejection status
const getRowBackgroundColor = (student: Student, recentlyApproved: Set<string>, recentlyRejected: Set<string>): string => {
  const processStatus = student.activeGraduationProcessStatus || student.graduationProcess?.status;
  
  // Priority: Rejected (red) > Approved (green) > Waiting for advisor (light gray) > Normal (transparent)
  if (isStudentRejectedBySecretary(student, recentlyRejected) || isStudentRejectedByAdvisor(student)) {
    console.log(`Setting RED background for student ${student.name} - status: ${processStatus}`);
    return '#ffebee'; // Light red background for rejected students
  }
  
  if (isStudentApprovedBySecretary(student, recentlyApproved)) {
    console.log(`Setting GREEN background for student ${student.name} - status: ${processStatus}`);
    return '#e8f5e8'; // Light green background for approved students
  }
  
  if (isWaitingForAdvisorApproval(student)) {
    console.log(`Setting LIGHT GRAY background for student ${student.name} - status: ${processStatus}`);
    return '#f5f5f5'; // Light gray background for students waiting for advisor approval
  }
  
  console.log(`Setting TRANSPARENT background for student ${student.name} - status: ${processStatus}`);
  return 'transparent'; // Normal background for other statuses
};

// Helper function to get row opacity based on status
const getRowOpacity = (student: Student): number => {
  if (isWaitingForAdvisorApproval(student)) {
    return 0.6; // Make row appear faded when waiting for advisor approval
  }
  if (isStudentRejectedByAdvisor(student)) { // Added advisor rejection check
    return 0.7; // Slightly faded for advisor rejected, but still prominent
  }
  return 1; // Normal opacity for other statuses
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
    const aGPA = a.gpa || 0;
    const bGPA = b.gpa || 0;
    
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
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [studentToReject, setStudentToReject] = useState<Student | null>(null);
  const [recentlyApprovedStudents, setRecentlyApprovedStudents] = useState<Set<string>>(new Set());
  const [recentlyRejectedStudents, setRecentlyRejectedStudents] = useState<Set<string>>(new Set());

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
      // Check and cleanup localStorage if needed before refresh
      cleanupLocalStorageIfNeeded();
      
      // Clear all caches including students cache to force fresh data with graduation process
      clearAllCaches();
      await refreshEligibilityData(true);
      setSuccessMessage('All data refreshed successfully with graduation process info.');
    } catch (err) {
      setErrorMessage('Failed to refresh eligibility data. Please try again.');
      console.error('Failed to refresh eligibility data:', err);
    }
  }, [refreshEligibilityData, setSuccessMessage, setErrorMessage]);



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
      console.log("🔍 [SecretaryApprovalRanking] Approving student:", student.id);
      
      // Add to recently approved set for immediate UI feedback
      setRecentlyApprovedStudents(prev => new Set(prev).add(student.id));
      
      // Check and cleanup localStorage if needed before approval
      cleanupLocalStorageIfNeeded();
      
      // Get secretary data
      const secretaryData = await getSecretaryData();
      
      // Call API to approve student
      await setSecretaryApprovedApi([student.id], secretaryData.secretaryId);
      
      setSuccessMessage(`Student ${student.name} (${student.studentNumber}) has been approved for graduation.`);
      
      // Refresh data to show updated status
      await fetchEligibilityData(true);
    } catch (err) {
      setErrorMessage('Failed to approve student. Please try again.');
      console.error('Failed to approve student:', err);
    }
  }, [setSuccessMessage, setErrorMessage, fetchEligibilityData]);

  const handleOpenRejectDialog = useCallback((student: Student) => {
    setStudentToReject(student);
    setRejectDialogOpen(true);
  }, []);

  const handleCloseRejectDialog = useCallback(() => {
    setStudentToReject(null);
    setRejectDialogOpen(false);
  }, []);

  const handleConfirmReject = useCallback(async (rejectionReason: string) => {
    if (!studentToReject) return;

    try {
      console.log(`🔍 [SecretaryApprovalRanking] Confirming rejection for student: ${studentToReject.id} with reason: ${rejectionReason}`);
      
      // Add to recently rejected set for immediate UI feedback
      setRecentlyRejectedStudents(prev => new Set(prev).add(studentToReject.id));
      
      const secretaryData = await getSecretaryData();
      
      const response = await setDeptSecretaryRejected({
        studentUserIds: [studentToReject.id],
        deptSecretaryUserId: secretaryData.secretaryId,
        rejectionReason: rejectionReason,
      });

      if (response.successfullyProcessedCount > 0) {
        setSuccessMessage(response.overallMessage || `Student ${studentToReject.name} (${studentToReject.studentNumber}) has been rejected.`);
      } else if (response.failedToProcessCount > 0 && response.processSummaries.length > 0) {
        setErrorMessage(response.processSummaries[0].message || `Failed to reject student ${studentToReject.name}.`);
      } else {
        setErrorMessage(response.overallMessage || `An unexpected error occurred while rejecting student ${studentToReject.name}.`);
      }
      
      // Refresh data to show updated status - MODIFIED LINE
      console.log("Attempting to clear caches and refresh eligibility data after rejection attempt.");
      clearAllCaches(); // Ensure caches are cleared
      await refreshEligibilityData(true); // Use the more comprehensive refresh function

    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to reject student. Please try again.');
      console.error('Failed to reject student:', err);
    } finally {
      handleCloseRejectDialog();
    }
  }, [studentToReject, refreshEligibilityData, handleCloseRejectDialog]); // Ensure refreshEligibilityData is in dependency array

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

  // Export functions
  const handleExportCSV = useCallback(() => {
    try {
      const exportData: StudentExportData[] = sortedStudents.map((student, index) => ({
        rank: index + 1,
        name: student.name || `${student.firstName} ${student.lastName}`,
        studentId: student.studentNumber || student.id,
        department: student.department || student.departmentName,
        faculty: student.facultyName,
        gpa: student.gpa || student.currentGpa || 0,
        eligibilityStatus: formatEligibilityStatus(
          student.eligibilityStatus?.hasResults 
            ? (student.eligibilityStatus.isEligible ? 'Eligible' : 'Not Eligible')
            : 'No Results Available'
        ),
        status: formatGraduationStatus(student.graduationProcess?.status),
        lastCheckDate: student.eligibilityStatus?.lastCheckDate
          ? new Date(student.eligibilityStatus.lastCheckDate).toLocaleDateString('tr-TR')
          : undefined
      }));

      exportStudentsToCSV(exportData, 'secretary_approval_ranking', 'Sekreter Onay ve Sıralama');
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
        name: student.name || `${student.firstName} ${student.lastName}`,
        studentId: student.studentNumber || student.id,
        department: student.department || student.departmentName,
        faculty: student.facultyName,
        gpa: student.gpa || student.currentGpa || 0,
        eligibilityStatus: formatEligibilityStatus(
          student.eligibilityStatus?.hasResults 
            ? (student.eligibilityStatus.isEligible ? 'Eligible' : 'Not Eligible')
            : 'No Results Available'
        ),
        status: formatGraduationStatus(student.graduationProcess?.status),
        lastCheckDate: student.eligibilityStatus?.lastCheckDate
          ? new Date(student.eligibilityStatus.lastCheckDate).toLocaleDateString('tr-TR')
          : undefined
      }));

      exportStudentsToPDF(exportData, 'secretary_approval_ranking', 'Sekreter Onay ve Sıralama');
      setSuccessMessage('Student data exported to PDF successfully.');
    } catch (error) {
      setErrorMessage('Failed to export PDF. Please try again.');
      console.error('Failed to export PDF:', error);
    }
  }, [sortedStudents, setSuccessMessage, setErrorMessage]);

  // Debug log for all students and their graduation process status
  useEffect(() => {
    if (sortedStudents.length > 0) {
      console.log("🔍 [SecretaryApprovalRanking] All students with graduation process status:");
      sortedStudents.forEach(student => {
        console.log(`Student: ${student.name}, ID: ${student.id}, processStatus: ${student.graduationProcess?.status}, GP:`, student.graduationProcess);
      });
    }
  }, [sortedStudents]);

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
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleExportCSV}
                      disabled={loading || performingChecks || sortedStudents.length === 0}
                      startIcon={<FileDownload />}
                      sx={{ minWidth: '100px' }}
                    >
                      CSV
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleExportPDF}
                      disabled={loading || performingChecks || sortedStudents.length === 0}
                      startIcon={<PictureAsPdf />}
                      sx={{ minWidth: '100px' }}
                    >
                      PDF
                    </Button>
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
                        <TableCell>Process Status</TableCell>
                        <TableCell>Last Check Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedStudents.map((student, index) => (
                        <TableRow
                          key={student.id}
                          sx={{ backgroundColor: getRowBackgroundColor(student, recentlyApprovedStudents, recentlyRejectedStudents), opacity: getRowOpacity(student) }}
                        >
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
                                color: student.gpa >= 3.0 ? 'success.main' : 'error.main'
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
                            <Chip
                              label={formatGraduationStatus(student.activeGraduationProcessStatus || student.graduationProcess?.status)}
                              color={getStatusColor(student.activeGraduationProcessStatus || student.graduationProcess?.status)}
                              size="small"
                              sx={
                                isStudentApprovedBySecretary(student, recentlyApprovedStudents) ? {
                                  backgroundColor: '#2e7d32',
                                  color: 'white',
                                  fontWeight: 'bold'
                                } : isStudentRejectedBySecretary(student, recentlyRejectedStudents) ? {
                                  backgroundColor: '#d32f2f',
                                  color: 'white',
                                  fontWeight: 'bold'
                                } : {}
                              }
                            />
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
                                <span>
                                <IconButton
                                  onClick={() => handleViewTranscript(student)}
                                  size="small"
                                  color="info"
                                >
                                  <Description />
                                </IconButton>
                                </span>
                              </Tooltip>
                              <Tooltip title={
                                isStudentRejectedBySecretary(student, recentlyRejectedStudents)
                                  ? "Student already rejected by secretary"
                                  : isStudentApprovedBySecretary(student, recentlyApprovedStudents) 
                                  ? "Student already approved by secretary" 
                                  : isWaitingForAdvisorApproval(student)
                                  ? "Waiting for advisor approval"
                                  : "Approve for Graduation"
                              }>
                                <span>
                                <IconButton
                                  onClick={() => handleApproveStudent(student)}
                                  disabled={(() => {
                                    const hasResults = student.eligibilityStatus?.hasResults;
                                    const isEligible = student.eligibilityStatus?.isEligible;
                                    const isApproved = isStudentApprovedBySecretary(student, recentlyApprovedStudents);
                                    const isRejected = isStudentRejectedBySecretary(student, recentlyRejectedStudents);
                                    const isWaiting = isWaitingForAdvisorApproval(student);
                                    const processStatus = student.graduationProcess?.status;
                                    
                                    // For secretary: Only check if student is already processed or waiting for advisor
                                    // Allow approval for students with status 5 (approved by advisor)
                                    const disabled = isApproved || isRejected || isWaiting || processStatus !== GraduationProcessStatus.ADVISOR_ELIGIBLE;
                                    
                                    console.log(`Approve button for ${student.name}: processStatus=${processStatus}, hasResults=${hasResults}, isEligible=${isEligible}, isApproved=${isApproved}, isRejected=${isRejected}, isWaiting=${isWaiting}, disabled=${disabled}`);
                                    
                                    return disabled;
                                  })()}
                                  size="small"
                                  color="success"
                                >
                                  <CheckCircle />
                                </IconButton>
                                </span>
                              </Tooltip>
                              <Tooltip title={
                                isStudentRejectedBySecretary(student, recentlyRejectedStudents)
                                  ? "Student already rejected by secretary"
                                  : isStudentApprovedBySecretary(student, recentlyApprovedStudents) 
                                  ? "Student already approved by secretary" 
                                  : isWaitingForAdvisorApproval(student)
                                  ? "Waiting for advisor approval"
                                  : "Reject for Graduation"
                              }>
                                <span>
                                <IconButton
                                  onClick={() => handleOpenRejectDialog(student)}
                                  disabled={(() => {
                                    const hasResults = student.eligibilityStatus?.hasResults;
                                    const isApproved = isStudentApprovedBySecretary(student, recentlyApprovedStudents);
                                    const isRejected = isStudentRejectedBySecretary(student, recentlyRejectedStudents);
                                    const isWaiting = isWaitingForAdvisorApproval(student);
                                    const processStatus = student.graduationProcess?.status;
                                    
                                    // For secretary: Only check if student is already processed or waiting for advisor
                                    // Allow rejection for students with status 5 (approved by advisor)
                                    const disabled = isApproved || isRejected || isWaiting || processStatus !== GraduationProcessStatus.ADVISOR_ELIGIBLE;
                                    
                                    console.log(`Reject button for ${student.name}: processStatus=${processStatus}, hasResults=${hasResults}, isApproved=${isApproved}, isRejected=${isRejected}, isWaiting=${isWaiting}, disabled=${disabled}`);
                                    
                                    return disabled;
                                  })()}
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

      {/* Reject Confirmation Dialog */}
      {studentToReject && (
        <RejectDialog
          open={rejectDialogOpen}
          onClose={handleCloseRejectDialog}
          onConfirm={handleConfirmReject}
          studentName={studentToReject.name}
        />
      )}

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