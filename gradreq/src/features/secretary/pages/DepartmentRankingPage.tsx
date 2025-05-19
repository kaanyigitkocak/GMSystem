import React, { useState } from 'react';
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
  Snackbar
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

interface StudentRanking {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  gpa: number;
  graduationDate: string;
  ranking: number;
}

const DepartmentRankingPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Computer Engineering');
  const [students, setStudents] = useState<StudentRanking[]>([
    {
      id: '1',
      studentId: '20190045',
      studentName: 'John Doe',
      department: 'Computer Engineering',
      gpa: 3.85,
      graduationDate: '2023-06-15',
      ranking: 1
    },
    {
      id: '2',
      studentId: '20190078',
      studentName: 'Jane Smith',
      department: 'Computer Engineering',
      gpa: 3.75,
      graduationDate: '2023-06-15',
      ranking: 2
    },
    {
      id: '3',
      studentId: '20190023',
      studentName: 'Mike Johnson',
      department: 'Computer Engineering',
      gpa: 3.62,
      graduationDate: '2023-06-15',
      ranking: 3
    },
    {
      id: '4',
      studentId: '20190098',
      studentName: 'Emily Brown',
      department: 'Computer Engineering',
      gpa: 3.57,
      graduationDate: '2023-06-15',
      ranking: 4
    },
    {
      id: '5',
      studentId: '20190132',
      studentName: 'David Wilson',
      department: 'Computer Engineering',
      gpa: 3.45,
      graduationDate: '2023-06-15',
      ranking: 5
    }
  ]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentRanking | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Handle department change
  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setSelectedDepartment(event.target.value);
  };

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
  const handleSaveStudent = () => {
    if (!currentStudent) return;
    
    setStudents(students.map(student => 
      student.id === currentStudent.id ? currentStudent : student
    ));
    
    setSnackbarMessage('Student information updated successfully');
    setSnackbarOpen(true);
    handleCloseEditDialog();
  };

  // Handle move student up
  const handleMoveUp = (id: string) => {
    const index = students.findIndex(student => student.id === id);
    if (index <= 0) return;
    
    const newStudents = [...students];
    const temp = newStudents[index - 1].ranking;
    newStudents[index - 1].ranking = newStudents[index].ranking;
    newStudents[index].ranking = temp;
    
    // Swap positions
    [newStudents[index - 1], newStudents[index]] = [newStudents[index], newStudents[index - 1]];
    
    setStudents(newStudents);
  };

  // Handle move student down
  const handleMoveDown = (id: string) => {
    const index = students.findIndex(student => student.id === id);
    if (index >= students.length - 1) return;
    
    const newStudents = [...students];
    const temp = newStudents[index + 1].ranking;
    newStudents[index + 1].ranking = newStudents[index].ranking;
    newStudents[index].ranking = temp;
    
    // Swap positions
    [newStudents[index + 1], newStudents[index]] = [newStudents[index], newStudents[index + 1]];
    
    setStudents(newStudents);
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
            <FormControl sx={{ minWidth: 240 }}>
              <InputLabel id="department-select-label">Department</InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={selectedDepartment}
                label="Department"
                onChange={handleDepartmentChange}
              >
                <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
                <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
                <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
                <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ display: 'flex', gap: 1, ml: 'auto', mt: { xs: 2, md: 0 } }}>
              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={handleGeneratePDF}
              >
                Generate PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={handleExportExcel}
              >
                Export to Excel
              </Button>
            </Box>
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            The ranking is automatically calculated based on student GPA. You can manually adjust the ranking by using the up/down arrows.
          </Alert>
          
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
                          disabled={student.ranking === 1}
                        >
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="primary" 
                          onClick={() => handleMoveDown(student.id)}
                          disabled={student.ranking === students.length}
                        >
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditClick(student)}
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
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveStudent} variant="contained">Save</Button>
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