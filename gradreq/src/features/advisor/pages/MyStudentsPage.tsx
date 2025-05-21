import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
  CircularProgress,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  InputAdornment,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import AdvisorDashboardLayout from '../layout/AdvisorDashboardLayout';
import { getAdvisedStudents } from '../services/advisorService';
import { Student } from '../types';

const MyStudentsPage = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getAdvisedStudents();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = students.filter(
        student => 
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.studentId.includes(searchQuery)
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEmailClick = (student: Student) => {
    setSelectedStudent(student);
    setEmailDialogOpen(true);
  };

  const handleEmailDialogClose = () => {
    setEmailDialogOpen(false);
    setSelectedStudent(null);
  };

  const getStatusChip = (gpa: number, status: string) => {
    if (status !== 'Active') {
      return <Chip size="small" label={status} color="error" />;
    }
    
    if (gpa >= 3.0) {
      return <Chip size="small" label="Eligible" color="success" />;
    } else if (gpa >= 2.0) {
      return <Chip size="small" label="Eligible" color="warning" />;
    } else {
      return <Chip size="small" label="Not Eligible" color="error" />;
    }
  };

  return (
    <AdvisorDashboardLayout>
      <Box sx={{ mb: 4 }}>
        {/* Page Header */}
        <Typography variant="h4" gutterBottom>
          My Students
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          View and manage all your advised students. You can check their graduation status, review transcripts,
          and handle graduation requests.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
        )}

        {/* Search and Filter */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name or student ID"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { md: 'right' } }}>
              <Typography variant="body2" color="text.secondary">
                Total Students: <strong>{students.length}</strong> | Showing: <strong>{filteredStudents.length}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Students List */}
        {loading ? (
          <Box display="flex" justifyContent="center" sx={{ py: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredStudents.length === 0 ? (
          <Paper sx={{ p: 5, textAlign: 'center' }}>
            <Typography variant="h6">No students found</Typography>
            <Typography variant="body2" color="text.secondary">
              Adjust your search criteria or try again later
            </Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="students table">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>GPA</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{`${student.name} ${student.surname}`}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.gpa.toFixed(2)}</TableCell>
                    <TableCell>
                      {getStatusChip(student.gpa, student.academicStatus)}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Transcript & Graduation Status">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/advisor/students/${student.studentId}`)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Send Email">
                        <IconButton
                          size="small"
                          onClick={() => handleEmailClick(student)}
                        >
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Create Petition">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/advisor/petitions/new?studentId=${student.studentId}`)}
                        >
                          <DescriptionIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      
      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onClose={handleEmailDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Send Email to {selectedStudent ? `${selectedStudent.name} ${selectedStudent.surname}` : 'Student'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Compose an email to send to the student regarding their graduation status or other academic matters.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEmailDialogClose}>Send Email</Button>
        </DialogActions>
      </Dialog>
    </AdvisorDashboardLayout>
  );
};

export default MyStudentsPage;
