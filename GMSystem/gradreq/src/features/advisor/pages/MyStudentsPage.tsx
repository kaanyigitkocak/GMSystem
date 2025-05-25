import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Card, 
  CardContent, 
  Button, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Checkbox, 
  Alert,
  CircularProgress
} from '@mui/material';
import { LoadingOverlay } from '../../../shared/components';
import { 
  getStudents,
  getStudentsWithEligibilityStatus,
  performSystemEligibilityChecks,
  setAdvisorEligible,
  setAdvisorNotEligible,
  getAdvisorId,
} from '../services';
import type { Student } from '../services/types';

interface StudentWithEligibility extends Student {
  hasManualRequest?: boolean;
}

const MyStudentsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentWithEligibility | null>(null);
  const [openTranscript, setOpenTranscript] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [petitionDialogOpen, setPetitionDialogOpen] = useState(false);
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [checkingStudentId, setCheckingStudentId] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentWithEligibility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advisorId, setAdvisorId] = useState<string | null>(null);
  const [advisorIdLoadingError, setAdvisorIdLoadingError] = useState<string | null>(null);

  // State for rejection dialog
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [studentToReject, setStudentToReject] = useState<StudentWithEligibility | null>(null);
  const [isProcessingApproval, setIsProcessingApproval] = useState(false);
  const [processingStudentId, setProcessingStudentId] = useState<string | null>(null);

  // Load students and advisor ID on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        setAdvisorIdLoadingError(null);

        // Fetch Advisor ID first
        console.log('🔍 Loading Advisor ID...');
        const fetchedAdvisorId = await getAdvisorId();
        if (fetchedAdvisorId) {
          setAdvisorId(fetchedAdvisorId);
          console.log('✅ Advisor ID loaded:', fetchedAdvisorId);
        } else {
          console.error('❌ Failed to load Advisor ID or ID is null');
          setAdvisorIdLoadingError('Failed to load Advisor ID. Approve/Reject actions will be disabled.');
          // Potentially return early or handle this state in the UI
        }

        console.log('🔍 Loading students directly from API...');
        const studentsData = await getStudents();
        console.log('✅ Students loaded directly from API:', studentsData);
        
        setStudents(studentsData.map(student => ({
          ...student,
          hasManualRequest: false
        })));
      } catch (err: any) {
        console.error('❌ Failed to load initial data:', err);
        const errorMessage = err.message || 'Failed to load data. Please try again.';
        setError(errorMessage);
        if (!advisorId && !advisorIdLoadingError) { // If advisor ID also failed implicitly
            setAdvisorIdLoadingError('Failed to load Advisor ID due to a general error.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.studentNumber?.includes(search) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheckboxChange = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSendPetition = () => {
    if (selectedIds.length === 0) return;
    setPetitionDialogOpen(true);
  };

  const handleViewDetails = async (student: StudentWithEligibility) => {
    setSelectedStudent(student);
    setIsLoadingTranscript(true);
    setOpenTranscript(true);
    
    // Simulate loading transcript data
    setTimeout(() => {
      setIsLoadingTranscript(false);
    }, 1500);
  };

  const handleCheckGraduationStatus = async (studentId: string) => {
    setCheckingStudentId(studentId);
    setIsCheckingStatus(true);
    
    try {
      await performSystemEligibilityChecks([studentId]);
      // Reload students to get updated eligibility status
      const updatedStudents = await getStudentsWithEligibilityStatus();
      setStudents(updatedStudents.map(student => ({
        ...student,
        hasManualRequest: false
      })));
    } catch (error) {
      console.error('Failed to check graduation status:', error);
    } finally {
      setIsCheckingStatus(false);
      setCheckingStudentId(null);
    }
  };

  const handleApprove = async (studentId: string) => {
    if (!advisorId) {
      alert("Advisor ID is not available. Cannot approve.");
      return;
    }
    
    // Find student details for better logging
    const student = students.find(s => s.id === studentId);
    console.log(`🔍 [MyStudentsPage] Approving student: ${studentId}`, {
      studentName: student?.name,
      studentNumber: student?.studentNumber,
      advisorId
    });
    
    setProcessingStudentId(studentId);
    setIsProcessingApproval(true);
    try {
      await setAdvisorEligible([studentId], advisorId);
      console.log(`✅ [MyStudentsPage] Student ${studentId} approved successfully`);
      // Optionally, refresh student data or update UI
      alert(`Student ${student?.name || studentId} approved successfully.`);
      // Example: Refresh student list
      const updatedStudents = await getStudentsWithEligibilityStatus();
      setStudents(updatedStudents.map(student => ({
        ...student,
        hasManualRequest: false // Reset or update as needed
      })));
    } catch (err) {
      console.error('❌ [MyStudentsPage] Failed to approve student:', err);
      alert(`Failed to approve student ${student?.name || studentId}. Please try again.`);
    } finally {
      setIsProcessingApproval(false);
      setProcessingStudentId(null);
    }
  };

  const handleOpenRejectDialog = (student: StudentWithEligibility) => {
    setStudentToReject(student);
    setRejectionReason('');
    setRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setStudentToReject(null);
    setRejectDialogOpen(false);
  };

  const handleSubmitRejectDialog = async () => {
    if (!studentToReject || !rejectionReason) return;
    if (!advisorId) {
      alert("Advisor ID is not available. Cannot reject.");
      return;
    }

    console.log(`🔍 [MyStudentsPage] Rejecting student: ${studentToReject.id}`, {
      studentName: studentToReject.name,
      studentNumber: studentToReject.studentNumber,
      advisorId,
      rejectionReason
    });

    setProcessingStudentId(studentToReject.id);
    setIsProcessingApproval(true);
    try {
      await setAdvisorNotEligible([studentToReject.id], advisorId, rejectionReason);
      console.log(`✅ [MyStudentsPage] Student ${studentToReject.id} rejected successfully`);
      // Optionally, refresh student data or update UI
      alert(`Student ${studentToReject.name} rejected successfully.`);
      handleCloseRejectDialog();
      // Example: Refresh student list
      const updatedStudents = await getStudentsWithEligibilityStatus();
      setStudents(updatedStudents.map(student => ({
        ...student,
        hasManualRequest: false // Reset or update as needed
      })));
    } catch (err) {
      console.error('❌ [MyStudentsPage] Failed to reject student:', err);
      alert(`Failed to reject student ${studentToReject.name}. Please try again.`);
    } finally {
      setIsProcessingApproval(false);
      setProcessingStudentId(null);
    }
  };

  const getStatusChip = (student: StudentWithEligibility) => {
    if (student.status === 'Mezun') {
      return <Chip label="Graduated" color="info" size="small" />;
    } else if (student.status === 'Mezuniyet Aşaması') {
      return <Chip label="Eligible" color="success" size="small" />;
    } else {
      return <Chip label="Not Eligible" color="warning" size="small" />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading students...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (advisorIdLoadingError && !error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">{advisorIdLoadingError}</Alert>
         <Typography sx={{ mt: 1, mb: 2 }} color="text.secondary">
            Student approval/rejection functionalities will be disabled.
            Please ensure you are properly logged in or contact support if the issue persists.
        </Typography>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry Loading Page
        </Button>
      </Box>
    );
  }

  const selectedStudents = students.filter(s => selectedIds.includes(s.id));

  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      <LoadingOverlay 
        isLoading={isCheckingStatus || isProcessingApproval}
        message={isCheckingStatus ? "Checking graduation status..." : "Processing request..."}
        color="info"
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
        <Typography variant="h4" gutterBottom>
          My Students ({students.length})
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          disabled={selectedIds.length === 0}
          onClick={handleSendPetition}
        >
          Send Petition ({selectedIds.length})
        </Button>
      </Box>
      
      <TextField
        label="Search by name or student number"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 3, width: 400 }}
        placeholder="Enter student name or number..."
      />
      
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: 2 
        }}
      >
        {filtered.map(student => (
          <Card key={student.id} elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Checkbox
                  checked={selectedIds.includes(student.id)}
                  onChange={() => handleCheckboxChange(student.id)}
                  sx={{ mr: 1 }}
                />
                <Typography variant="h6">
                  {student.name}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                ID: {student.studentNumber}
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Department: {student.department || 'N/A'}
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                Status: {student.graduationStatus}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                {getStatusChip(student)}
                {student.hasManualRequest && (
                  <Chip label="Manual Request" color="info" size="small" sx={{ ml: 1 }} />
                )}
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={() => handleViewDetails(student)}
                >
                  View Transcript
                </Button>
                
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="success"
                  onClick={() => handleCheckGraduationStatus(student.id)}
                  disabled={checkingStudentId === student.id}
                >
                  {checkingStudentId === student.id ? 'Checking...' : 'Check Status'}
                </Button>
                
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={() => { 
                    setSelectedStudent(student); 
                    setOpenEmail(true); 
                  }}
                >
                  Send Email
                </Button>
                {/* New Approve and Reject Buttons */}
                <Button 
                  size="small" 
                  variant="contained" 
                  color="primary"
                  onClick={() => handleApprove(student.id)}
                  disabled={processingStudentId === student.id || !advisorId || !!advisorIdLoadingError}
                  sx={{ ml: 1 }}
                >
                  {processingStudentId === student.id && isProcessingApproval ? 'Approving...' : 'Approve'}
                </Button>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="error"
                  onClick={() => handleOpenRejectDialog(student)}
                  disabled={processingStudentId === student.id || !advisorId || !!advisorIdLoadingError}
                  sx={{ ml: 1 }}
                >
                   {processingStudentId === student.id && isProcessingApproval ? 'Rejecting...' : 'Reject'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filtered.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No students found matching your search.
          </Typography>
        </Box>
      )}

      {/* Transcript Dialog */}
      <Dialog open={openTranscript} onClose={() => setOpenTranscript(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Transcript Viewer - {selectedStudent?.name}
        </DialogTitle>
        <DialogContent sx={{ position: 'relative', minHeight: 300 }}>
          <LoadingOverlay 
            isLoading={isLoadingTranscript} 
            message="Loading transcript data..."
            color="primary"
          />
          {!isLoadingTranscript && (
            <Typography>
              Transcript details for {selectedStudent?.name} 
              (ID: {selectedStudent?.studentNumber})
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTranscript(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={openEmail} onClose={() => setOpenEmail(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Send email to: {selectedStudent?.name}
          </Typography>
          <TextField
            label="Subject"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmail(false)}>Cancel</Button>
          <Button variant="contained">Send</Button>
        </DialogActions>
      </Dialog>

      {/* Petition Dialog */}
      <Dialog open={petitionDialogOpen} onClose={() => setPetitionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Petition</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Send petition for {selectedStudents.length} selected students:
          </Typography>
          {selectedStudents.map(student => (
            <Typography key={student.id} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
              • {student.name} ({student.studentNumber})
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPetitionDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="secondary">Send Petition</Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={rejectDialogOpen} onClose={handleCloseRejectDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Reject Student Graduation</DialogTitle>
        <DialogContent>
          {studentToReject && (
            <Typography sx={{ mb: 2 }}>
              You are about to reject the graduation for: <strong>{studentToReject.name}</strong> (ID: {studentToReject.studentNumber}).
            </Typography>
          )}
          <Typography sx={{ mb: 1 }}>
            Please provide a reason for rejection:
          </Typography>
          <TextField
            label="Rejection Reason"
            multiline
            rows={4}
            fullWidth
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmitRejectDialog} 
            variant="contained" 
            color="error"
            disabled={!rejectionReason || isProcessingApproval}
          >
            {isProcessingApproval ? 'Rejecting...' : 'Submit Rejection'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyStudentsPage;
