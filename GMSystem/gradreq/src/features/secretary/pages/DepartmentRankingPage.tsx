import { useState, useEffect } from 'react';
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
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import {
  Print as PrintIcon,
  FileDownload as FileDownloadIcon,
  Visibility as VisibilityIcon,
  Check as CheckIcon,
  Cancel as CancelIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';
import type { StudentRanking } from '../services/types';
import { getStudentRankings } from '../services';

// Updated StudentRanking type to include status
interface ExtendedStudentRanking extends StudentRanking {
  status: 'Pending' | 'Approved' | 'Rejected';
}

// Mock interface for student transcript data
interface StudentTranscript {
  studentId: string;
  studentName: string;
  department: string;
  gpa: number;
  credits: number;
  courses: Array<{
    courseCode: string;
    courseName: string;
    credit: number;
    grade: string;
    semester: string;
  }>;
}

const DepartmentRankingPage = () => {
  // Fixed department for the secretary
  const departmentName = "Test Department";
  
  // Remove the direct mock data initialization
  const [students, setStudents] = useState<ExtendedStudentRanking[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New state for transcript dialog
  const [openTranscriptDialog, setOpenTranscriptDialog] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState<StudentTranscript | null>(null);
  const [currentStudentId, setCurrentStudentId] = useState<string>('');

  // Add back the useEffect to fetch student rankings from API
  useEffect(() => {
    const fetchStudentRankings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStudentRankings(departmentName);
        const studentsWithStatus = data.map(student => ({
          ...student,
          status: 'Pending' as const
        }));
        setStudents(studentsWithStatus);
      } catch (error) {
        console.error('Error fetching student rankings:', error);
        setError('Unable to load data');
        setSnackbarMessage('Failed to load student rankings');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentRankings();
  }, [departmentName]);

  // Handle view transcript
  const handleViewTranscript = (student: ExtendedStudentRanking) => {
    const mockTranscript: StudentTranscript = {
      studentId: student.studentId,
      studentName: student.studentName,
      department: student.department,
      gpa: student.gpa,
      credits: Math.floor(Math.random() * 50) + 100, 
      courses: [
        {
          courseCode: 'CENG101',
          courseName: 'Introduction to Computer Engineering',
          credit: 4,
          grade: 'AA',
          semester: 'Fall 2020'
        },
        {
          courseCode: 'MATH101',
          courseName: 'Calculus I',
          credit: 4,
          grade: 'BA',
          semester: 'Fall 2020'
        },
        {
          courseCode: 'PHYS101',
          courseName: 'Physics I',
          credit: 4,
          grade: 'BB',
          semester: 'Fall 2020'
        },
        {
          courseCode: 'CENG102',
          courseName: 'Data Structures',
          credit: 4,
          grade: 'AA',
          semester: 'Spring 2021'
        },
        {
          courseCode: 'MATH102',
          courseName: 'Calculus II',
          credit: 4,
          grade: 'CB',
          semester: 'Spring 2021'
        }
      ]
    };
    
    setCurrentTranscript(mockTranscript);
    setCurrentStudentId(student.id);
    setOpenTranscriptDialog(true);
  };

  const handleCloseTranscriptDialog = () => {
    setOpenTranscriptDialog(false);
    setCurrentTranscript(null);
    setCurrentStudentId('');
  };

  const handleRejectStudent = () => {
    if (!currentStudentId) return;
    
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === currentStudentId 
          ? { ...student, status: 'Rejected' as const } 
          : student
      )
    );
    
    setSnackbarMessage(`Student has been rejected from graduation`);
    setSnackbarOpen(true);
    handleCloseTranscriptDialog();
  };

  const handleApproveStudent = () => {
    if (!currentStudentId) return;
    
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === currentStudentId 
          ? { ...student, status: 'Approved' as const } 
          : student
      )
    );
    
    setSnackbarMessage(`Student has been approved for graduation`);
    setSnackbarOpen(true);
    handleCloseTranscriptDialog();
  };

  const handleApproveAll = () => {
    setStudents(prevStudents => 
      prevStudents.map(student => ({ ...student, status: 'Approved' as const }))
    );
    
    setSnackbarMessage(`All ${students.length} students have been approved for graduation`);
    setSnackbarOpen(true);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text(`${departmentName} - Graduation Ranking`, 14, 16);

    const tableColumn = ["Rank", "Student ID", "Öğrenci Adı", "GPA", "Mezuniyet Tarihi", "Durum"]; // Turkish headers
    const tableRows: (string | number)[][] = [];

    students.forEach(student => {
      const studentData = [
        student.ranking,
        student.studentId,
        student.studentName, // Assume student names might have Turkish characters
        student.gpa.toFixed(2),
        student.graduationDate,
        student.status
      ];
      tableRows.push(studentData);
    });

    // Try using a standard font that might have better UTF-8 support for autotable
    autoTable(doc, { 
      head: [tableColumn], 
      body: tableRows, 
      startY: 20,
      styles: { font: "helvetica", fontStyle: "normal" }, // Added font style
      headStyles: { fontStyle: 'bold'}
    });
    doc.save(`${departmentName.toLowerCase().replace(/\s+/g, '-')}-ranking.pdf`);
    setSnackbarMessage('Ranking PDF generated successfully');
    setSnackbarOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Rank", "Student ID", "Student Name", "GPA", "Graduation Date", "Status"];
    const csvRows = [
      headers.join(','), // header row
      ...students.map(student => 
        [
          student.ranking,
          student.studentId,
          student.studentName,
          student.gpa.toFixed(2),
          student.graduationDate,
          student.status
        ].join(',')
      )
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${departmentName.toLowerCase().replace(/\s+/g, '-')}-ranking.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setSnackbarMessage('Ranking exported to CSV successfully');
    setSnackbarOpen(true);
  };

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // Update loading state rendering
  if (loading) {
    return (
      <SecretaryDashboardLayout>
        <Box sx={{ width: '100%' }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
            <Box gridColumn="span 12">
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {departmentName} Ranking
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                  Create and manage department graduation ranking lists. You can approve or reject students,
                  export the ranking to various formats, and print graduation certificates.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckIcon />}
                    onClick={handleApproveAll}
                    disabled={true}
                  >
                    Approve All
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={handleGeneratePDF}
                    disabled={true}
                  >
                    Generate PDF
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    onClick={handleExportCSV}
                    disabled={true}
                  >
                    Export to CSV
                  </Button>
                </Box>
                
                <Alert severity="info" sx={{ mb: 3 }}>
                  Review student transcripts and approve or reject their graduation status.
                </Alert>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                  <CircularProgress />
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </SecretaryDashboardLayout>
    );
  }

  return (
    <SecretaryDashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
          <Box gridColumn="span 12">
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {departmentName} Ranking
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Create and manage department graduation ranking lists. You can approve or reject students,
                export the ranking to various formats, and print graduation certificates.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckIcon />}
                  onClick={handleApproveAll}
                  disabled={loading || students.length === 0 || error !== null}
                >
                  Approve All
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={handleGeneratePDF}
                  disabled={loading || students.length === 0 || error !== null}
                >
                  Generate PDF
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<FileDownloadIcon />}
                  onClick={handleExportCSV} // Renamed from handleExportExcel
                  disabled={loading || students.length === 0 || error !== null}
                >
                  Export to CSV
                </Button>
              </Box>
              
              <Alert severity="info" sx={{ mb: 3 }}>
                Review student transcripts and approve or reject their graduation status.
              </Alert>
              
              {/* Show error alert when data loading fails */}
              {error && (
                <Alert 
                  severity="error" 
                  icon={<ErrorIcon />}
                  action={
                    <Button 
                      color="inherit" 
                      size="small" 
                      onClick={() => window.location.reload()}
                    >
                      RETRY
                    </Button>
                  }
                  sx={{ mb: 3 }}
                >
                  {error}
                </Alert>
              )}
              
              {students.length === 0 && !error ? (
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
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* Show table rows only if there's no error and we have students */}
                      {!error && students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.ranking}</TableCell>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.studentName}</TableCell>
                          <TableCell>{student.gpa.toFixed(2)}</TableCell>
                          <TableCell>{student.graduationDate}</TableCell>
                          <TableCell>
                            <Chip 
                              label={student.status} 
                              color={getStatusChipColor(student.status) as any}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton 
                              size="small" 
                              color="info"
                              onClick={() => handleViewTranscript(student)}
                              disabled={loading}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {/* Show an error row when there's an error */}
                      {error && (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                            <Typography color="error">
                              {error}
                            </Typography>
                            <Button 
                              variant="outlined" 
                              color="primary" 
                              size="small" 
                              onClick={() => window.location.reload()}
                              sx={{ mt: 2 }}
                            >
                              Retry Loading Data
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
      
      {/* View Transcript Dialog */}
      <Dialog open={openTranscriptDialog} onClose={handleCloseTranscriptDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Student Transcript</Typography>
          {currentTranscript && (
            <Chip 
              label={`GPA: ${currentTranscript.gpa.toFixed(2)}`}
              color="primary"
              sx={{ fontWeight: 'bold' }}
            />
          )}
        </DialogTitle>
        <DialogContent dividers>
          {currentTranscript ? (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Student: {currentTranscript.studentName} ({currentTranscript.studentId})
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Department: {currentTranscript.department}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Credits: {currentTranscript.credits}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                Course List
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course Code</TableCell>
                      <TableCell>Course Name</TableCell>
                      <TableCell align="center">Credits</TableCell>
                      <TableCell align="center">Grade</TableCell>
                      <TableCell>Semester</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentTranscript.courses.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell>{course.courseCode}</TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell align="center">{course.credit}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={course.grade}
                            size="small"
                            color={
                              course.grade === 'AA' || course.grade === 'BA' ? 'success' :
                              course.grade === 'BB' || course.grade === 'CB' ? 'primary' :
                              course.grade === 'CC' || course.grade === 'DC' ? 'warning' :
                              'error'
                            }
                          />
                        </TableCell>
                        <TableCell>{course.semester}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<CancelIcon />} 
            onClick={handleRejectStudent}
          >
            Reject
          </Button>
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<CheckIcon />} 
            onClick={handleApproveStudent}
          >
            Approve
          </Button>
          <Button onClick={handleCloseTranscriptDialog}>Close</Button>
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