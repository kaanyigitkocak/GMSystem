import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Chip,
  Box,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

// Updated StudentRanking type to include status
export interface ExtendedStudentRanking {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  gpa: number;
  graduationDate: string;
  ranking: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface StudentRankingTableProps {
  students: ExtendedStudentRanking[];
  loading: boolean;
  departmentName: string;
  onViewTranscript: (student: ExtendedStudentRanking) => void;
  getStatusChipColor: (status: string) => 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const StudentRankingTable: React.FC<StudentRankingTableProps> = ({
  students,
  loading,
  departmentName,
  onViewTranscript,
  getStatusChipColor,
}) => {
  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center', width: '100%' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading student rankings...
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, width: '100%' }}>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        {departmentName} - Student Rankings
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Students are ranked by their GPA in descending order. Review transcripts and approve/reject students for graduation.
      </Typography>
      
      <TableContainer sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell align="right">GPA</TableCell>
              <TableCell>Graduation Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{student.ranking}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.studentName}</TableCell>
                <TableCell align="right">{student.gpa.toFixed(2)}</TableCell>
                <TableCell>{student.graduationDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={student.status} 
                    color={getStatusChipColor(student.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onViewTranscript(student)}
                    size="small"
                    title="View Transcript"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No students found in this department
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StudentRankingTable; 