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
  Button,
  CircularProgress,
  Chip,
  Box,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
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
  onApprove?: (studentId: string) => void;
  onReject?: (studentId: string) => void;
  getStatusChipColor: (status: string) => 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const StudentRankingTable: React.FC<StudentRankingTableProps> = ({
  students,
  loading,
  departmentName,
  onViewTranscript,
  onApprove,
  onReject,
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
            {students.map((student) => (
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
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onViewTranscript(student)}
                      sx={{ fontSize: '0.70rem', py: 0.25, minWidth: 80 }}
                    >
                      Transcript
                    </Button>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button
                        size="small"
                        color="success"
                        onClick={() => onApprove?.(student.id)}
                        startIcon={<CheckIcon fontSize="small" />}
                        disabled={student.status === 'Approved'}
                        sx={{ fontSize: '0.70rem', py: 0.25, minWidth: 70 }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => onReject?.(student.id)}
                        startIcon={<CloseIcon fontSize="small" />}
                        disabled={student.status === 'Rejected'}
                        sx={{ fontSize: '0.70rem', py: 0.25, minWidth: 70 }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </Box>
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