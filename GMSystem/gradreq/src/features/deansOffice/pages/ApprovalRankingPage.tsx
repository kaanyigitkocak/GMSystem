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
import type { Student, EligibilityCheckType } from '../services/types';
import {
  useDeanFacultyInfo,
  useStudentsWithEligibility,
  // useStudentTranscript, // Used in TranscriptDialog component
  useApproveStudents,
  useRejectStudents,
  usePerformEligibilityChecks,
  useClearStudentCache,
} from '../hooks/useStudents';
import TranscriptDialog from '../components/TranscriptDialog';
import { LoadingOverlay } from '../../../shared/components';
import RejectDialog from '../components/RejectDialog';
import { 
  exportStudentsToCSV, 
  exportStudentsToPDF, 
  formatEligibilityStatus, 
  formatGraduationStatus,
  type StudentExportData 
} from '../../../core/utils/exportUtils';

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

// Helper function to check if student is already approved by dean
const isStudentApprovedByDean = (student: Student, recentlyApproved: Set<string>): boolean => {
  const processStatus = student.activeGraduationProcessStatus;
  return processStatus === 11 || recentlyApproved.has(student.id); // DEANS_OFFICE_APPROVED
};

// Helper function to check if student is already rejected by dean
const isStudentRejectedByDean = (student: Student, recentlyRejected: Set<string>): boolean => {
  const processStatus = student.activeGraduationProcessStatus;
  return processStatus === 12 || recentlyRejected.has(student.id); // DEANS_OFFICE_REJECTED
};

// Helper function to check if student is rejected by secretary
const isStudentRejectedBySecretary = (student: Student): boolean => {
  const processStatus = student.activeGraduationProcessStatus;
  return processStatus === 9; // DEPT_SECRETARY_REJECTED_PROCESS
};

// Helper function to check if student is waiting for dean approval
const isWaitingForDeanApproval = (student: Student): boolean => {
  const processStatus = student.activeGraduationProcessStatus;
  return processStatus === 8; // DEPT_SECRETARY_APPROVED_PENDING_DEAN
};

// Helper function to get row background color based on approval/rejection status
const getRowBackgroundColor = (student: Student, recentlyApproved: Set<string>, recentlyRejected: Set<string>): string => {
  const processStatus = student.activeGraduationProcessStatus;
  
  if (isStudentRejectedByDean(student, recentlyRejected) || isStudentRejectedBySecretary(student)) {
    console.log(`Setting RED background for student ${student.firstName} ${student.lastName} - status: ${processStatus}`);
    return '#ffebee'; // Light red background for rejected students
  }
  
  if (isStudentApprovedByDean(student, recentlyApproved)) {
    console.log(`Setting GREEN background for student ${student.firstName} ${student.lastName} - status: ${processStatus}`);
    return '#e8f5e8'; // Light green background for approved students
  }
  
  if (isWaitingForDeanApproval(student)) {
    console.log(`Setting LIGHT BLUE background for student ${student.firstName} ${student.lastName} - status: ${processStatus}`);
    return '#e3f2fd'; // Light blue background for students waiting for dean approval
  }
  
  console.log(`Setting TRANSPARENT background for student ${student.firstName} ${student.lastName} - status: ${processStatus}`);
  return 'transparent'; // Normal background for other statuses
};

// Helper function to get row opacity based on status
const getRowOpacity = (student: Student, recentlyRejected: Set<string>): number => {
  if (isStudentRejectedBySecretary(student)) {
    return 0.6; // Make row appear faded when rejected by secretary
  }
  if (isStudentRejectedByDean(student, recentlyRejected)) {
    return 0.7; // Slightly faded for dean rejected, but still prominent
  }
  return 1; // Normal opacity for other statuses
};

// Helper function to get status chip for dean view
const getDeanStatusChip = (student: Student) => {
  const processStatus = student.activeGraduationProcessStatus;
  
  console.log(`🔍 [DeanStatusChip] Student ${student.firstName} ${student.lastName}: processStatus=${processStatus}`);
  
  // Map all possible graduation process statuses based on the enum
  switch (processStatus) {
    case 1: // AWAITING_DEPT_SECRETARY_TRANSCRIPT_UPLOAD
      return (
        <Chip
          label="Advisor Pending"
          color="warning"
          size="small"
          sx={{ backgroundColor: '#ed6c02', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 3: // TRANSCRIPT_PARSE_SUCCESSFUL_PENDING_ADVISOR_CHECK
      return (
        <Chip
          label="Pending Advisor Check"
          color="info"
          size="small"
          sx={{ backgroundColor: '#0288d1', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 4: // TRANSCRIPT_PARSE_ERROR_AWAITING_REUPLOAD
      return (
        <Chip
          label="Transcript Error - Reupload Needed"
          color="error"
          size="small"
          sx={{ backgroundColor: '#d32f2f', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 5: // ADVISOR_ELIGIBLE
      return (
        <Chip
          label="Advisor Approved (Eligible)"
          color="success"
          size="small"
          sx={{ backgroundColor: '#2e7d32', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 6: // ADVISOR_NOT_ELIGIBLE
      return (
        <Chip
          label="Advisor Rejected (Not Eligible)"
          color="error"
          size="small"
          sx={{ backgroundColor: '#d32f2f', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 8: // DEPT_SECRETARY_APPROVED_PENDING_DEAN
      return (
        <Chip
          label="Ready for Dean Review"
          color="info"
          size="small"
          sx={{ backgroundColor: '#0288d1', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 9: // DEPT_SECRETARY_REJECTED_PROCESS
      return (
        <Chip
          label="Secretary Rejected"
          color="error"
          size="small"
          sx={{ backgroundColor: '#d32f2f', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 11: // DEANS_OFFICE_APPROVED
      return (
        <Chip
          label="Approved by Dean"
          color="success"
          size="small"
          sx={{ backgroundColor: '#2e7d32', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 12: // DEANS_OFFICE_REJECTED
      return (
        <Chip
          label="Rejected by Dean"
          color="error"
          size="small"
          sx={{ backgroundColor: '#d32f2f', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 14: // STUDENT_AFFAIRS_APPROVED
      return (
        <Chip
          label="Student Affairs Approved"
          color="success"
          size="small"
          sx={{ backgroundColor: '#2e7d32', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 15: // STUDENT_AFFAIRS_REJECTED
      return (
        <Chip
          label="Student Affairs Rejected"
          color="error"
          size="small"
          sx={{ backgroundColor: '#d32f2f', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 18: // COMPLETED_GRADUATED
      return (
        <Chip
          label="Graduated ✓"
          color="success"
          size="small"
          sx={{ backgroundColor: '#1b5e20', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case 19: // PROCESS_TERMINATED_BY_ADMIN
      return (
        <Chip
          label="Process Terminated"
          color="error"
          size="small"
          sx={{ backgroundColor: '#b71c1c', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    case null:
    case undefined:
      return (
        <Chip
          label="No Active Process"
          color="default"
          size="small"
          sx={{ backgroundColor: '#757575', color: 'white', fontWeight: 'bold' }}
        />
      );
    
    default:
      return (
        <Chip
          label={`Unknown Status (${processStatus})`}
          color="default"
          size="small"
          sx={{ backgroundColor: '#9e9e9e', color: 'white', fontWeight: 'bold' }}
        />
      );
  }
};

// Helper function to sort students by eligibility and GPA
const sortStudentsByEligibilityAndGPA = (students: Student[]): Student[] => {
  return [...students].sort((a, b) => {
    // First, prioritize students waiting for dean approval
    const aWaitingForDean = isWaitingForDeanApproval(a);
    const bWaitingForDean = isWaitingForDeanApproval(b);
    
    if (aWaitingForDean && !bWaitingForDean) return -1;
    if (!aWaitingForDean && bWaitingForDean) return 1;
    
    // Then sort by eligibility status
    const aEligible = a.eligibilityStatus?.hasResults && a.eligibilityStatus.isEligible;
    const bEligible = b.eligibilityStatus?.hasResults && b.eligibilityStatus.isEligible;
    
    if (aEligible && !bEligible) return -1;
    if (!aEligible && bEligible) return 1;
    
    // If both have same eligibility status, sort by GPA (descending)
    const aGPA = a.currentGpa || 0;
    const bGPA = b.currentGpa || 0;
    
    return bGPA - aGPA;
  });
};

const ApprovalRankingPage = () => {
  // React Query hooks
  const { data: facultyInfo, isLoading: facultyLoading, error: facultyError } = useDeanFacultyInfo();
  const { 
    data: studentsData = [], 
    isLoading: studentsLoading, 
    error: studentsError,
    refetch: refetchStudents 
  } = useStudentsWithEligibility(facultyInfo?.facultyId);

  // Mutations
  const approveStudents = useApproveStudents();
  const rejectStudents = useRejectStudents();
  const performEligibilityChecks = usePerformEligibilityChecks();
  const clearCache = useClearStudentCache();

  // Local state for UI
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [eligibilityDialogOpen, setEligibilityDialogOpen] = useState(false);
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [studentToReject, setStudentToReject] = useState<Student | null>(null);
  const [recentlyApprovedStudents, setRecentlyApprovedStudents] = useState<Set<string>>(new Set());
  const [recentlyRejectedStudents, setRecentlyRejectedStudents] = useState<Set<string>>(new Set());

  // Computed values
  const students = sortStudentsByEligibilityAndGPA(studentsData);
  const loading = facultyLoading || studentsLoading;
  const error = facultyError || studentsError;
  const performingChecks = performEligibilityChecks.isPending;

  // Show message if no students found
  if (studentsData.length === 0 && !loading && !error) {
    setErrorMessage("No students found for your faculty.");
  }

  const handlePerformEligibilityChecks = useCallback(async () => {
    if (!facultyInfo?.facultyId) return;
    
    try {
      console.log("🔍 [DeanApprovalRanking] Starting eligibility checks for missing students...");
      const result = await performEligibilityChecks.mutateAsync(facultyInfo.facultyId);
      setSuccessMessage(
        `Eligibility checks completed for ${result.processedStudents.length} students. Results are being processed...`
      );
      console.log("✅ [DeanApprovalRanking] Eligibility checks completed, list will be updated automatically");
    } catch (err) {
      setErrorMessage('Failed to perform eligibility checks. Please try again.');
      console.error('Failed to perform eligibility checks:', err);
    }
  }, [facultyInfo?.facultyId, performEligibilityChecks]);

  const handleRefreshWithClearCache = useCallback(async () => {
    if (!facultyInfo?.facultyId) return;
    
    try {
      await clearCache.mutateAsync(facultyInfo.facultyId);
      setSuccessMessage('All data refreshed successfully.');
    } catch (err) {
      setErrorMessage('Failed to refresh data. Please try again.');
      console.error('Failed to refresh data:', err);
    }
  }, [facultyInfo?.facultyId, clearCache]);

  const handleViewEligibilityDetails = useCallback((student: Student) => {
    setSelectedStudent(student);
    setEligibilityDialogOpen(true);
  }, []);

  const handleCloseEligibilityDialog = useCallback(() => {
    setEligibilityDialogOpen(false);
    setSelectedStudent(null);
  }, []);

  const handleViewTranscript = useCallback((student: Student) => {
    setSelectedStudent(student);
    setTranscriptDialogOpen(true);
  }, []);

  const handleCloseTranscriptDialog = useCallback(() => {
    setTranscriptDialogOpen(false);
    setSelectedStudent(null);
  }, []);

  const handleApproveStudent = useCallback(async (student: Student) => {
    if (!facultyInfo?.deanId) return;
    
    try {
      console.log("🔍 [DeanApprovalRanking] Approving student:", student.id);
      
      // Add to recently approved set for immediate UI feedback
      setRecentlyApprovedStudents(prev => new Set(prev).add(student.id));
      
      await approveStudents.mutateAsync({
        studentUserIds: [student.id],
        deansOfficeUserId: facultyInfo.deanId,
      });
      
      setSuccessMessage(`Student ${student.firstName} ${student.lastName} (${student.studentNumber}) has been approved for graduation.`);
    } catch (err) {
      setErrorMessage('Failed to approve student. Please try again.');
      console.error('Failed to approve student:', err);
    }
  }, [facultyInfo?.deanId, approveStudents]);

  const handleOpenRejectDialog = useCallback((student: Student) => {
    setStudentToReject(student);
    setRejectDialogOpen(true);
  }, []);

  const handleCloseRejectDialog = useCallback(() => {
    setStudentToReject(null);
    setRejectDialogOpen(false);
  }, []);

  const handleConfirmReject = useCallback(async (rejectionReason: string) => {
    if (!studentToReject || !facultyInfo?.deanId) return;

    try {
      console.log(`🔍 [DeanApprovalRanking] Confirming rejection for student: ${studentToReject.id} with reason: ${rejectionReason}`);
      
      // Add to recently rejected set for immediate UI feedback
      setRecentlyRejectedStudents(prev => new Set(prev).add(studentToReject.id));
      
      await rejectStudents.mutateAsync({
        studentUserIds: [studentToReject.id],
        deansOfficeUserId: facultyInfo.deanId,
        rejectionReason,
      });

      setSuccessMessage(`Student ${studentToReject.firstName} ${studentToReject.lastName} (${studentToReject.studentNumber}) has been rejected.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to reject student. Please try again.');
      console.error('Failed to reject student:', err);
    } finally {
      handleCloseRejectDialog();
    }
  }, [studentToReject, facultyInfo?.deanId, rejectStudents, handleCloseRejectDialog]);

  const handleCloseSuccessMessage = useCallback(() => {
    setSuccessMessage('');
  }, []);

  const handleCloseErrorMessage = useCallback(() => {
    setErrorMessage('');
  }, []);

  // Get sorted students
  const sortedStudents = sortStudentsByEligibilityAndGPA(students);

  // Export functions
  const handleExportCSV = useCallback(() => {
    try {
      const exportData: StudentExportData[] = sortedStudents.map((student, index) => ({
        rank: index + 1,
        name: `${student.firstName} ${student.lastName}`,
        studentId: student.studentNumber || student.id,
        department: student.departmentName,
        faculty: student.facultyName,
        gpa: student.currentGpa || 0,
        eligibilityStatus: formatEligibilityStatus(
          student.eligibilityStatus?.hasResults 
            ? (student.eligibilityStatus.isEligible ? 'Eligible' : 'Not Eligible')
            : 'No Results Available'
        ),
        status: formatGraduationStatus(student.activeGraduationProcessStatus || undefined),
        lastCheckDate: student.eligibilityStatus?.lastCheckDate
          ? new Date(student.eligibilityStatus.lastCheckDate).toLocaleDateString('tr-TR')
          : undefined
      }));

      exportStudentsToCSV(exportData, 'dean_approval_ranking', 'Dekan Onay ve Sıralama');
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
        name: `${student.firstName} ${student.lastName}`,
        studentId: student.studentNumber || student.id,
        department: student.departmentName,
        faculty: student.facultyName,
        gpa: student.currentGpa || 0,
        eligibilityStatus: formatEligibilityStatus(
          student.eligibilityStatus?.hasResults 
            ? (student.eligibilityStatus.isEligible ? 'Eligible' : 'Not Eligible')
            : 'No Results Available'
        ),
        status: formatGraduationStatus(student.activeGraduationProcessStatus || undefined),
        lastCheckDate: student.eligibilityStatus?.lastCheckDate
          ? new Date(student.eligibilityStatus.lastCheckDate).toLocaleDateString('tr-TR')
          : undefined
      }));

      exportStudentsToPDF(exportData, 'dean_approval_ranking', 'Dekan Onay ve Sıralama');
      setSuccessMessage('Student data exported to PDF successfully.');
    } catch (error) {
      setErrorMessage('Failed to export PDF. Please try again.');
      console.error('Failed to export PDF:', error);
    }
  }, [sortedStudents, setSuccessMessage, setErrorMessage]);

  // Debug log for all students and their graduation process status
  useEffect(() => {
    if (sortedStudents.length > 0) {
      console.log(`🔍 [DeanApprovalRanking] Displaying ${sortedStudents.length} students with graduation process status:`);
      
      // Group students by status for better overview
      const statusGroups: Record<string, number> = {};
      sortedStudents.forEach((student) => {
        const status = student.activeGraduationProcessStatus || 'null';
        statusGroups[status] = (statusGroups[status] || 0) + 1;
      });
      
      console.log("📊 [DeanApprovalRanking] Status distribution:", statusGroups);
      
      // Log first 10 students for detailed view
      sortedStudents.slice(0, 10).forEach((student, index) => {
        console.log(`${index + 1}. Student: ${student.firstName} ${student.lastName}, ID: ${student.id}, processStatus: ${student.activeGraduationProcessStatus || 'null'}`);
      });
      
      if (sortedStudents.length > 10) {
        console.log(`... and ${sortedStudents.length - 10} more students`);
      }
    } else {
      console.log("🔍 [DeanApprovalRanking] No students to display");
    }
  }, [sortedStudents]);

  // Initial loading screen
  if (loading && students.length === 0) {
    console.log("[DeanApprovalRanking] Rendering: Initial Loading Screen");
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)' }}>
        <CircularProgress size={60} />
        <Typography sx={{ ml: 2 }}>Loading student data...</Typography>
      </Box>
    );
  }

  // Initial error screen
  if (error && students.length === 0) {
    console.log("[DeanApprovalRanking] Rendering: Initial Error Screen");
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 2, justifyContent: 'center' }}>
          {error?.message || 'An error occurred'}
        </Alert>
        <Button variant="contained" onClick={() => refetchStudents()}>
          Retry Loading Data
        </Button>
      </Box>
    );
  }

  console.log("[DeanApprovalRanking] Rendering: Main Content. performingChecks for Overlay:", performingChecks);

  // Calculate statistics for ALL students
  const totalStudents = students.length;
  const eligibleCount = students.filter(s => s.eligibilityStatus?.isEligible).length;
  const ineligibleCount = students.filter(s => s.eligibilityStatus?.hasResults && !s.eligibilityStatus.isEligible).length;
  const pendingCheckCount = students.filter(s => !s.eligibilityStatus?.hasResults).length;
  
  // Calculate dean-specific statistics
  const waitingForDeanCount = students.filter(s => s.activeGraduationProcessStatus === 8).length;
  const graduatedCount = students.filter(s => s.activeGraduationProcessStatus === 18).length;

  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      {/* Loading overlay for performing checks */}
      <LoadingOverlay 
        isLoading={performingChecks} 
        message="Performing eligibility checks, please wait..." 
      />

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dean's Office - Approval & Ranking
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Review ALL students in the faculty - their eligibility status and graduation process status. Manage graduation approvals for students approved by secretary. Students are sorted by eligibility status and GPA.
        </Typography>
        {performingChecks && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <strong>Running eligibility checks...</strong> This may take a few moments.
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Statistics Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Faculty Summary - Total: {totalStudents} Students
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6} md={2}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main">
                    {totalStudents}
                  </Typography>
                  <Typography variant="body2">Total</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {eligibleCount}
                  </Typography>
                  <Typography variant="body2">Eligible</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">
                    {ineligibleCount}
                  </Typography>
                  <Typography variant="body2">Ineligible</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">
                    {pendingCheckCount}
                  </Typography>
                  <Typography variant="body2">Pending</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main">
                    {waitingForDeanCount}
                  </Typography>
                  <Typography variant="body2">Dean Review</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={2}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" style={{ color: '#1b5e20' }}>
                    {graduatedCount}
                  </Typography>
                  <Typography variant="body2">Graduated</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Refresh Data (from cache)">
                      <span>
                      <IconButton 
                        onClick={() => refetchStudents()}
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

        {/* Eligibility Actions */}
        {pendingCheckCount > 0 && (
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {pendingCheckCount} students don't have eligibility check results.
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

        {/* Student Table */}
        <Grid item xs={12}>
          <Card>
            <CardHeader 
              title="ALL Faculty Students (Sorted by Eligibility & GPA)"
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
                    onClick={() => refetchStudents()}
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
                      <TableCell>Dean Status</TableCell>
                      <TableCell>Last Check Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedStudents.map((student, index) => (
                      <TableRow
                        key={student.id}
                        sx={{ backgroundColor: getRowBackgroundColor(student, recentlyApprovedStudents, recentlyRejectedStudents), opacity: getRowOpacity(student, recentlyRejectedStudents) }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            #{index + 1}
                          </Typography>
                        </TableCell>
                        <TableCell>{student.firstName} {student.lastName}</TableCell>
                        <TableCell>{student.studentNumber || student.id}</TableCell>
                        <TableCell>{student.departmentName}</TableCell>
                        <TableCell>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 'bold',
                              color: (student.currentGpa || 0) >= 3.0 ? 'success.main' : 'error.main'
                            }}
                          >
                            {student.currentGpa?.toFixed(2) || 'N/A'}
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
                          {getDeanStatusChip(student)}
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
                            <Tooltip title={
                              isStudentRejectedByDean(student, recentlyRejectedStudents)
                                ? "Student already rejected by dean"
                                : isStudentApprovedByDean(student, recentlyApprovedStudents) 
                                ? "Student already approved by dean" 
                                : isStudentRejectedBySecretary(student)
                                ? "Student rejected by secretary"
                                : "Approve for Graduation"
                            }>
                              <span>
                              <IconButton
                                onClick={() => handleApproveStudent(student)}
                                disabled={(() => {
                                  const processStatus = student.activeGraduationProcessStatus;
                                  
                                  // For dean: Only allow approval for students with status 8 (secretary approved, pending dean)
                                  const disabled = processStatus !== 8;
                                  
                                  console.log(`Approve button for ${student.firstName} ${student.lastName}: processStatus=${processStatus}, disabled=${disabled}`);
                                  
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
                              isStudentRejectedByDean(student, recentlyRejectedStudents)
                                ? "Student already rejected by dean"
                                : isStudentApprovedByDean(student, recentlyApprovedStudents) 
                                ? "Student already approved by dean" 
                                : isStudentRejectedBySecretary(student)
                                ? "Student rejected by secretary"
                                : "Reject for Graduation"
                            }>
                              <span>
                              <IconButton
                                onClick={() => handleOpenRejectDialog(student)}
                                disabled={(() => {
                                  const processStatus = student.activeGraduationProcessStatus;
                                  
                                  // For dean: Only allow rejection for students with status 8 (secretary approved, pending dean)
                                  const disabled = processStatus !== 8;
                                  
                                  console.log(`Reject button for ${student.firstName} ${student.lastName}: processStatus=${processStatus}, disabled=${disabled}`);
                                  
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
      </Grid>

      {/* Eligibility Details Dialog */}
      <Dialog 
        open={eligibilityDialogOpen} 
        onClose={handleCloseEligibilityDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          Eligibility Details - {selectedStudent?.firstName} {selectedStudent?.lastName}
        </DialogTitle>
        <DialogContent>
          {selectedStudent?.eligibilityStatus?.eligibilityChecks && selectedStudent.eligibilityStatus.eligibilityChecks.length > 0 ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Student ID: {selectedStudent.studentNumber || selectedStudent.id} | Department: {selectedStudent.departmentName} | GPA: {selectedStudent.currentGpa?.toFixed(2)}
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

      {/* Transcript Dialog */}
      <TranscriptDialog
        open={transcriptDialogOpen}
        onClose={handleCloseTranscriptDialog}
        student={selectedStudent}
      />

      {/* Reject Confirmation Dialog */}
      {studentToReject && (
        <RejectDialog
          open={rejectDialogOpen}
          onClose={handleCloseRejectDialog}
          onConfirm={handleConfirmReject}
          studentName={`${studentToReject.firstName} ${studentToReject.lastName}`}
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