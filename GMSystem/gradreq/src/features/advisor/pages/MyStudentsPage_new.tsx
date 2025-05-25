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
import { getStudentsWithEligibilityStatusApi, performSystemEligibilityChecksApi } from '../services/api/studentApi';
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

  // Load students on component mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔍 Loading students with eligibility status...');
        const studentsData = await getStudentsWithEligibilityStatusApi();
        console.log('✅ Students loaded:', studentsData);
        
        setStudents(studentsData.map(student => ({
          ...student,
          hasManualRequest: false // This could be enhanced based on actual data
        })));
      } catch (err) {
        console.error('❌ Failed to load students:', err);
        setError('Failed to load students. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const filtered = students.filter(s =>
    s.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    s.lastName?.toLowerCase().includes(search.toLowerCase()) ||
    s.studentNumber?.includes(search) ||
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())
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
      await performSystemEligibilityChecksApi([studentId]);
      // Reload students to get updated eligibility status
      const updatedStudents = await getStudentsWithEligibilityStatusApi();
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

  const getStatusChip = (student: StudentWithEligibility) => {
    if (student.isEligible) {
      return <Chip label="Eligible" color="success" size="small" />;
    } else if (student.graduationStatus === 'Mezun') {
      return <Chip label="Graduated" color="info" size="small" />;
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

  const selectedStudents = students.filter(s => selectedIds.includes(s.id));

  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      <LoadingOverlay 
        isLoading={isCheckingStatus} 
        message="Checking graduation status..."
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
                  {student.firstName} {student.lastName}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                ID: {student.studentNumber}
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                Department: {student.department?.name || 'N/A'}
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
          Transcript Viewer - {selectedStudent?.firstName} {selectedStudent?.lastName}
        </DialogTitle>
        <DialogContent sx={{ position: 'relative', minHeight: 300 }}>
          <LoadingOverlay 
            isLoading={isLoadingTranscript} 
            message="Loading transcript data..."
            color="primary"
          />
          {!isLoadingTranscript && (
            <Typography>
              Transcript details for {selectedStudent?.firstName} {selectedStudent?.lastName} 
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
            Send email to: {selectedStudent?.firstName} {selectedStudent?.lastName}
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
              • {student.firstName} {student.lastName} ({student.studentNumber})
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPetitionDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="secondary">Send Petition</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyStudentsPage;
