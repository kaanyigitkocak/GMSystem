import { useState } from 'react';
import { Box, Typography, TextField, Card, CardContent, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, Alert } from '@mui/material';
import { LoadingOverlay } from '../../../shared/components';

const mockStudents = [
  { id: '1', name: 'Jane Smith', studentId: '20201001', department: 'Computer Engineering', gpa: 3.45, status: 'Eligible', hasManualRequest: true },
  { id: '2', name: 'John Doe', studentId: '20201002', department: 'Electrical Engineering', gpa: 2.95, status: 'Pending', hasManualRequest: false },
  { id: '3', name: 'Lisa Wang', studentId: '20201003', department: 'Physics', gpa: 3.80, status: 'Eligible', hasManualRequest: false },
];

const MyStudentsPage = () => {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<null | typeof mockStudents[0]>(null);
  const [openTranscript, setOpenTranscript] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openManual, setOpenManual] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [petitionDialogOpen, setPetitionDialogOpen] = useState(false);
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [checkingStudentId, setCheckingStudentId] = useState<string | null>(null);

  const filtered = mockStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.includes(search)
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

  const handleViewDetails = async (student: typeof mockStudents[0]) => {
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
    
    // Simulate checking graduation status
    setTimeout(() => {
      setIsCheckingStatus(false);
      setCheckingStudentId(null);
    }, 2000);
  };

  const selectedStudents = mockStudents.filter(s => selectedIds.includes(s.id));
  return (
    <Box sx={{ p: 3, position: 'relative' }}>      <LoadingOverlay 
        isLoading={isCheckingStatus} 
        message="Checking graduation status..."
        color="info"
      />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
        <Typography variant="h4" gutterBottom>
          My Students
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          disabled={selectedIds.length === 0}
          onClick={handleSendPetition}
        >
          Send Petition
        </Button>
      </Box>
      <TextField
        label="Search by name or ID"
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 3, width: 300 }}
      />      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: 2 
        }}
      >
        {filtered.map(student => (
          <Card key={student.id}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Checkbox
                  checked={selectedIds.includes(student.id)}
                  onChange={() => handleCheckboxChange(student.id)}
                  sx={{ mr: 1 }}
                />
                <Typography variant="h6">{student.name}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">ID: {student.studentId}</Typography>
              <Typography variant="body2">Department: {student.department}</Typography>
              <Typography variant="body2">GPA: {student.gpa}</Typography>
              <Chip label={student.status} color={student.status === 'Eligible' ? 'success' : 'warning'} sx={{ mt: 1, mb: 1 }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={() => handleViewDetails(student)}
                >
                  View Details
                </Button>
                <Button size="small" variant="outlined" color="error">Report Missing Transcript</Button>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="success"
                  onClick={() => handleCheckGraduationStatus(student.id)}
                  disabled={checkingStudentId === student.id}
                >
                  Check Graduation Status
                </Button>
                <Button size="small" variant="outlined" color="success">Approve Graduation</Button>
                <Button size="small" variant="outlined" onClick={() => { setSelectedStudent(student); setOpenEmail(true); }}>Send Email</Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>      {/* Transcript Dialog */}
      <Dialog open={openTranscript} onClose={() => setOpenTranscript(false)} maxWidth="md" fullWidth>
        <DialogTitle>Transcript Viewer</DialogTitle>
        <DialogContent sx={{ position: 'relative', minHeight: 200 }}>
          <LoadingOverlay 
            isLoading={isLoadingTranscript} 
            message="Loading transcript data..."
            color="primary"
          />
          {/* Transcript details would go here */}
          <Typography>Transcript details for {selectedStudent?.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTranscript(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Email Dialog */}
      <Dialog open={openEmail} onClose={() => setOpenEmail(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Email</DialogTitle>
        <DialogContent>
          {/* Email form would go here */}
          <Typography>Email to {selectedStudent?.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmail(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Petition Dialog (toplu) */}
      <Dialog open={petitionDialogOpen} onClose={() => setPetitionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Petition</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Petition will be sent for the following students:
          </Alert>
          <ul>
            {selectedStudents.map(s => (
              <li key={s.id}>{s.name} ({s.studentId})</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPetitionDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={() => setPetitionDialogOpen(false)}>Send</Button>
        </DialogActions>
      </Dialog>
      {/* Manual Check Request Dialog */}
      <Dialog open={openManual} onClose={() => setOpenManual(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Manual Check Request</DialogTitle>
        <DialogContent>
          {/* Manual check request details would go here */}
          <Typography>Manual check request for {selectedStudent?.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenManual(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyStudentsPage; 