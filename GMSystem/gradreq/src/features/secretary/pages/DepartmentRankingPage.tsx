import { useState, useEffect } from 'react';
import {
  Box,
  Alert,
  Snackbar,
  Button,
} from '@mui/material';
import {
  Error as ErrorIcon
} from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';
import type { StudentRanking } from '../services/types';
import { useStudentRankings } from '../hooks';
import { getStudentTranscript } from '../services';
import {
  StudentRankingTable,
  RankingActions,
  TranscriptDialog,
  type ExtendedStudentRanking,
  type StudentTranscript,
} from '../components';



const DepartmentRankingPage = () => {
  // Fixed department for the secretary
  const departmentName = "Test Department";
  
  const {
    rankings,
    loading,
    error,
    fetchRankings,
    updateRanking,
    reorderRankings
  } = useStudentRankings();
  
  // Convert rankings to extended format with status
  const [students, setStudents] = useState<ExtendedStudentRanking[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // New state for transcript dialog
  const [openTranscriptDialog, setOpenTranscriptDialog] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState<StudentTranscript | null>(null);
  const [currentStudentId, setCurrentStudentId] = useState<string>('');

  // Fetch rankings on mount
  useEffect(() => {
    fetchRankings(departmentName);
  }, [fetchRankings, departmentName]);

  // Update students when rankings change
  useEffect(() => {
    const studentsWithStatus = rankings.map(student => ({
      ...student,
      status: 'Pending' as const
    }));
    setStudents(studentsWithStatus);
  }, [rankings]);

  // Handle view transcript with new service
  const handleViewTranscript = async (student: ExtendedStudentRanking) => {
    try {
      const transcript = await getStudentTranscript(
        student.studentId,
        student.studentName,
        student.department,
        "Engineering",
        student.gpa,
        Math.floor(Math.random() * 50) + 100
      );
      setCurrentTranscript(transcript);
      setCurrentStudentId(student.id);
      setOpenTranscriptDialog(true);
    } catch (error) {
      console.error('Failed to load transcript:', error);
      setSnackbarMessage('Failed to load transcript');
      setSnackbarOpen(true);
    }
  };

  const handleCloseTranscriptDialog = () => {
    setOpenTranscriptDialog(false);
    setCurrentTranscript(null);
    setCurrentStudentId('');
  };

  // Handle approve/reject from transcript dialog
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

  // Handle approve/reject from table
  const handleTableApprove = (studentId: string) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, status: 'Approved' as const } 
          : student
      )
    );
    
    const student = students.find(s => s.id === studentId);
    setSnackbarMessage(`${student?.studentName} has been approved for graduation`);
    setSnackbarOpen(true);
  };

  const handleTableReject = (studentId: string) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, status: 'Rejected' as const } 
          : student
      )
    );
    
    const student = students.find(s => s.id === studentId);
    setSnackbarMessage(`${student?.studentName} has been rejected from graduation`);
    setSnackbarOpen(true);
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



  return (
    <SecretaryDashboardLayout>
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
          {/* Actions Section */}
          <RankingActions
            departmentName={departmentName}
            studentCount={students.length}
            onGeneratePDF={handleGeneratePDF}
            onExportCSV={handleExportCSV}
            onApproveAll={handleApproveAll}
          />
          
          {/* Error Alert */}
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
            >
              {error}
            </Alert>
          )}
          
          {/* Student Rankings Table */}
          <StudentRankingTable
            students={students}
            loading={loading}
            departmentName={departmentName}
            onViewTranscript={handleViewTranscript}
            onApprove={handleTableApprove}
            onReject={handleTableReject}
            getStatusChipColor={getStatusChipColor}
          />
        </Box>
      </Box>
      
      {/* View Transcript Dialog */}
      <TranscriptDialog
        open={openTranscriptDialog}
        transcript={currentTranscript}
        onClose={handleCloseTranscriptDialog}
        onApprove={handleApproveStudent}
        onReject={handleRejectStudent}
      />
      
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