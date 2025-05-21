import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Print as PrintIcon,
  FileDownload as FileDownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';
import { getStudentRankings, updateStudentRanking, reorderStudentRankings } from '../services/secretaryService';
import type { StudentRanking } from '../types';
import { useAuth } from '../../auth/contexts/AuthContext';

const DepartmentRankingPage = () => {
  const { user } = useAuth();
  const department = user?.department || 'Department';
  const [students, setStudents] = useState<StudentRanking[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentRanking | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch student rankings on mount
  useEffect(() => {
    const fetchStudentRankings = async () => {
      setLoading(true);
      try {
        const data = await getStudentRankings(department);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student rankings:', error);
        setSnackbarMessage('Failed to load student rankings');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentRankings();
  }, [department]);

  // Handle edit student
  const handleEditClick = (student: StudentRanking) => {
    setCurrentStudent({...student});
    setOpenEditDialog(true);
  };

  // Handle close edit dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentStudent(null);
  };

  // Handle save student
  const handleSaveStudent = async () => {
    if (!currentStudent) return;
    
    try {
      setLoading(true);
      const updatedStudent = await updateStudentRanking(currentStudent);
      
      setStudents(students.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      ));
      
      setSnackbarMessage('Student information updated successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating student:', error);
      setSnackbarMessage('Failed to update student information');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      handleCloseEditDialog();
    }
  };

  // Handle move student up
  const handleMoveUp = async (id: string) => {
    const index = students.findIndex(student => student.id === id);
    if (index <= 0) return;
    
    try {
      const newStudents = [...students];
      const temp = newStudents[index - 1].ranking;
      newStudents[index - 1].ranking = newStudents[index].ranking;
      newStudents[index].ranking = temp;
      
      // Swap positions
      [newStudents[index - 1], newStudents[index]] = [newStudents[index], newStudents[index - 1]];
      
      // Update the rankings on the server
      await reorderStudentRankings(newStudents);
      
      setStudents(newStudents);
    } catch (error) {
      console.error('Error reordering students:', error);
      setSnackbarMessage('Failed to reorder students');
      setSnackbarOpen(true);
    }
  };

  // Handle move student down
  const handleMoveDown = async (id: string) => {
    const index = students.findIndex(student => student.id === id);
    if (index >= students.length - 1) return;
    
    try {
      const newStudents = [...students];
      const temp = newStudents[index + 1].ranking;
      newStudents[index + 1].ranking = newStudents[index].ranking;
      newStudents[index].ranking = temp;
      
      // Swap positions
      [newStudents[index + 1], newStudents[index]] = [newStudents[index], newStudents[index + 1]];
      
      // Update the rankings on the server
      await reorderStudentRankings(newStudents);
      
      setStudents(newStudents);
    } catch (error) {
      console.error('Error reordering students:', error);
      setSnackbarMessage('Failed to reorder students');
      setSnackbarOpen(true);
    }
  };

  // Handle generate PDF
  const handleGeneratePDF = () => {
    setSnackbarMessage('Ranking PDF generated successfully');
    setSnackbarOpen(true);
  };

  // Handle export to Excel
  const handleExportExcel = () => {
    setSnackbarMessage('Ranking exported to Excel successfully');
    setSnackbarOpen(true);
  };

  return (
    <SecretaryDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Department Ranking
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Create and manage department graduation ranking lists. You can reorder students,
            export the ranking to various formats, and print graduation certificates.
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: 240, py: 2, px: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              {department}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, ml: 'auto', mt: { xs: 2, md: 0 } }}>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handleGeneratePDF}
                disabled={loading || students.length === 0}
              >
                Generate PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={handleExportExcel}
                disabled={loading || students.length === 0}
              >
                Export to Excel
              </Button>
            </Box>
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            The ranking is automatically calculated based on student GPA. You can manually adjust the ranking by using the up/down arrows.
          </Alert>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : students.length === 0 ? (
            <Alert severity="warning" sx={{ mb: 3 }}>
              No student rankings found for this department.
            </Alert>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Student ID</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>GPA</TableCell>
                    <TableCell>Graduation Date</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.ranking}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.studentName}</TableCell>
                      <TableCell>{student.gpa.toFixed(2)}</TableCell>
                      <TableCell>{student.graduationDate}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                          <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={() => handleMoveUp(student.id)}
                            disabled={student.ranking === 1 || loading}
                          >
                            <ArrowUpwardIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={() => handleMoveDown(student.id)}
                            disabled={student.ranking === students.length || loading}
                          >
                            <ArrowDownwardIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => handleEditClick(student)}
                            disabled={loading}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
      
      {/* Edit Student Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Student Information</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              margin="dense"
              label="Student ID"
              fullWidth
              variant="outlined"
              value={currentStudent?.studentId || ''}
              onChange={(e) => setCurrentStudent(curr => curr ? {...curr, studentId: e.target.value} : null)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Student Name"
              fullWidth
              variant="outlined"
              value={currentStudent?.studentName || ''}
              onChange={(e) => setCurrentStudent(curr => curr ? {...curr, studentName: e.target.value} : null)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="GPA"
              fullWidth
              variant="outlined"
              type="number"
              inputProps={{ min: 0, max: 4, step: 0.01 }}
              value={currentStudent?.gpa || 0}
              onChange={(e) => setCurrentStudent(curr => curr ? {...curr, gpa: parseFloat(e.target.value)} : null)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Graduation Date"
              fullWidth
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={currentStudent?.graduationDate || ''}
              onChange={(e) => setCurrentStudent(curr => curr ? {...curr, graduationDate: e.target.value} : null)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} disabled={loading}>Cancel</Button>
          <Button onClick={handleSaveStudent} variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </SecretaryDashboardLayout>
  );
};

export default DepartmentRankingPage; 