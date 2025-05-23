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
import type { StudentRanking, Order, ApprovalStatus } from '../hooks/useUniversityRankings';

interface RankingsTableProps {
  paginatedData: StudentRanking[];
  isLoading: boolean;
  filteredDataLength: number;
  
  // Sorting
  order: Order;
  orderBy: keyof StudentRanking;
  onRequestSort: (property: keyof StudentRanking) => void;
  
  // Pagination
  page: number;
  rowsPerPage: number;
  onPageChange: (_event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  // Actions
  approvalStatus: ApprovalStatus;
  onApprove: (studentId: string) => void;
  onDisapprove: (studentId: string) => void;
  onViewTranscript: (studentId: string) => void;
}

const RankingsTable = ({
  paginatedData,
  isLoading,
  filteredDataLength,
  order,
  orderBy,
  onRequestSort,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  approvalStatus,
  onApprove,
  onDisapprove,
  onViewTranscript
}: RankingsTableProps) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="university ranking table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'rank'}
                  direction={orderBy === 'rank' ? order : 'asc'}
                  onClick={() => onRequestSort('rank')}
                >
                  Rank
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'studentId'}
                  direction={orderBy === 'studentId' ? order : 'asc'}
                  onClick={() => onRequestSort('studentId')}
                >
                  Student ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => onRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'department'}
                  direction={orderBy === 'department' ? order : 'asc'}
                  onClick={() => onRequestSort('department')}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'faculty'}
                  direction={orderBy === 'faculty' ? order : 'asc'}
                  onClick={() => onRequestSort('faculty')}
                >
                  Faculty
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'gpa'}
                  direction={orderBy === 'gpa' ? order : 'asc'}
                  onClick={() => onRequestSort('gpa')}
                >
                  GPA
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'credits'}
                  direction={orderBy === 'credits' ? order : 'asc'}
                  onClick={() => onRequestSort('credits')}
                >
                  Credits
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'graduationEligible'}
                  direction={orderBy === 'graduationEligible' ? order : 'asc'}
                  onClick={() => onRequestSort('graduationEligible')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((student) => {
                const status = approvalStatus[student.id];
                return (
                  <TableRow
                    key={student.id}
                    hover
                    sx={
                      status === 'approved'
                        ? { backgroundColor: 'rgba(56, 142, 60, 0.12)' }
                        : status === 'disapproved'
                        ? { backgroundColor: 'rgba(211, 47, 47, 0.12)' }
                        : {}
                    }
                  >
                    <TableCell>{student.rank}</TableCell>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {student.name}
                      </Box>
                    </TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.faculty}</TableCell>
                    <TableCell align="right">{student.gpa.toFixed(2)}</TableCell>
                    <TableCell align="right">{student.credits}</TableCell>
                    <TableCell>
                      <Chip 
                        label={student.graduationEligible ? "Eligible" : "Not Eligible"} 
                        color={student.graduationEligible ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => onViewTranscript(student.studentId)}
                        >
                          Transcript
                        </Button>
                        <Button
                          size="small"
                          color="success"
                          onClick={() => onApprove(student.id)}
                          startIcon={<CheckIcon />}
                          disabled={status === 'approved'}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => onDisapprove(student.id)}
                          startIcon={<CloseIcon />}
                          disabled={status === 'disapproved'}
                        >
                          Disapprove
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
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
        count={filteredDataLength}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default RankingsTable; 