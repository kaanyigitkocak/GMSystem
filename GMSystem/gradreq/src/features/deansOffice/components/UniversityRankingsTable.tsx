import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';
import type { StudentRecord, SortOptions } from '../types';

interface UniversityRankingsTableProps {
  filteredData: StudentRecord[];
  isLoading: boolean;
  
  // Sorting
  sortOptions: SortOptions;
  onRequestSort: (sort: Partial<SortOptions>) => void;
  
  // Actions
  onApprove: (studentId: string) => void;
  onDisapprove: (studentId: string) => void;
  onViewTranscript: (studentId: string) => void;
}

const UniversityRankingsTable = ({
  filteredData,
  isLoading,
  sortOptions,
  onRequestSort,
  onApprove,
  onDisapprove,
  onViewTranscript
}: UniversityRankingsTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Pagination
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle pagination
  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle sorting
  const handleRequestSort = (field: SortOptions['field']) => {
    const isAsc = sortOptions.field === field && sortOptions.direction === 'asc';
    onRequestSort({
      field,
      direction: isAsc ? 'desc' : 'asc'
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="university ranking table" sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 70, fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortOptions.field === 'rank'}
                  direction={sortOptions.field === 'rank' ? sortOptions.direction : 'asc'}
                  onClick={() => handleRequestSort('rank')}
                >
                  Rank
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ minWidth: 120, fontWeight: 'bold' }}>
                Student ID
              </TableCell>
              <TableCell sx={{ minWidth: 180, fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortOptions.field === 'name'}
                  direction={sortOptions.field === 'name' ? sortOptions.direction : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ minWidth: 140, fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortOptions.field === 'department'}
                  direction={sortOptions.field === 'department' ? sortOptions.direction : 'asc'}
                  onClick={() => handleRequestSort('department')}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold' }}>
                Faculty
              </TableCell>
              <TableCell align="right" sx={{ minWidth: 80, fontWeight: 'bold' }}>
                <TableSortLabel
                  active={sortOptions.field === 'gpa'}
                  direction={sortOptions.field === 'gpa' ? sortOptions.direction : 'asc'}
                  onClick={() => handleRequestSort('gpa')}
                >
                  GPA
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ minWidth: 90, fontWeight: 'bold' }}>
                Credits
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold' }}>
                Status
              </TableCell>
              <TableCell sx={{ minWidth: 200, fontWeight: 'bold' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((student) => (
                <TableRow
                  key={student.id}
                  hover
                  sx={
                    student.transcriptStatus === 'approved'
                      ? { backgroundColor: 'rgba(56, 142, 60, 0.12)' }
                      : student.transcriptStatus === 'rejected'
                      ? { backgroundColor: 'rgba(211, 47, 47, 0.12)' }
                      : {}
                  }
                >
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                    #{student.rank}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                    {student.studentId}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {student.name} {student.surname}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 150 }}>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      {student.department}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 120, fontSize: '0.875rem' }}>
                    {student.faculty}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'primary.main' }}>
                    {student.gpa.toFixed(2)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '0.875rem' }}>
                    {student.completedCredits}/{student.totalCredits}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={student.transcriptStatus.toUpperCase()} 
                      color={getStatusColor(student.transcriptStatus) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ minWidth: 200 }}>
                    <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'column' }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onViewTranscript(student.studentId)}
                        sx={{ fontSize: '0.75rem', py: 0.5 }}
                      >
                        Transcript
                      </Button>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Button
                          size="small"
                          color="success"
                          onClick={() => onApprove(student.studentId)}
                          startIcon={<CheckIcon fontSize="small" />}
                          disabled={student.transcriptStatus === 'approved'}
                          sx={{ fontSize: '0.70rem', py: 0.25, minWidth: 80 }}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => onDisapprove(student.studentId)}
                          startIcon={<CloseIcon fontSize="small" />}
                          disabled={student.transcriptStatus === 'rejected'}
                          sx={{ fontSize: '0.70rem', py: 0.25, minWidth: 80 }}
                        >
                          Reject
                        </Button>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : isLoading ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={40} />
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Loading ranking data...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No ranking data found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UniversityRankingsTable; 