import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Button,
  Card,
  CardContent,
  Divider,
  Alert,
  AlertTitle,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';
import type { StudentRanking, RankingMetadata } from '../services/deansOfficeService';
import { getFacultyRankings } from '../services/deansOfficeService';
import { faculties } from '../../../shared/faculties';

// Sıralama tipi
type Order = 'asc' | 'desc';

const FacultyRankingPage = () => {
  // State'ler
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof StudentRanking>('gpa');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [rankingMetadata, setRankingMetadata] = useState<RankingMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentRankings, setStudentRankings] = useState<StudentRanking[]>([]);

  // Sadece Mühendislik Fakültesi
  const facultyName = 'Faculty of Engineering';
  const faculty = faculties.find(f => f.name === facultyName);
  const departments = faculty ? faculty.departments : [];

  // Veriyi yükle
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await getFacultyRankings();
        setStudentRankings(result.rankings);
        setRankingMetadata(result.metadata);
      } catch {
        setError('Ranking data could not be loaded.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Filtreleme
  const filtered = studentRankings.filter(s =>
    s.faculty === facultyName &&
    (selectedDepartment ? s.department === selectedDepartment : true) &&
    (
      searchQuery === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.includes(searchQuery) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sıralama
  const sorted = [...filtered].sort((a, b) => {
    if (orderBy === 'rank') return order === 'asc' ? a.rank - b.rank : b.rank - a.rank;
    if (orderBy === 'gpa') return order === 'asc' ? a.gpa - b.gpa : b.gpa - a.gpa;
    if (orderBy === 'credits') return order === 'asc' ? a.credits - b.credits : b.credits - a.credits;
    const aVal = a[orderBy] as string;
    const bVal = b[orderBy] as string;
    return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  // Sayfalama
  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Yenile
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const result = await getFacultyRankings();
      setStudentRankings(result.rankings);
      setRankingMetadata(result.metadata);
    } catch {
      setError('Ranking data could not be loaded.');
    } finally {
      setIsLoading(false);
    }
  };

  // Export
  const handleExport = () => {
    if (filtered.length === 0) return setError('No data to export.');
    const headers = ['Rank', 'Student ID', 'Name', 'Department', 'Faculty', 'GPA', 'Credits'];
    const csv = [
      headers.join(','),
      ...sorted.map(s => [s.rank, s.studentId, `"${s.name}"`, `"${s.department}"`, `"${s.faculty}"`, s.gpa, s.credits].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `faculty_ranking_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sıralama başlığı tıklama
  const handleRequestSort = (property: keyof StudentRanking) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sayfa değiştir
  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <DeansOfficeDashboardLayout>
      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {/* Filters and buttons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2, mt: 1 }}>
        <TextField
          label="Search Student"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 220 }}
        />
        <TextField
          select
          label="Department"
          value={selectedDepartment}
          onChange={e => setSelectedDepartment(e.target.value)}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All Departments</MenuItem>
          {departments.map(dept => (
            <MenuItem key={dept} value={dept}>{dept}</MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
        <Button variant="contained" color="success" onClick={() => {}}>
          Approve
        </Button>
        <Button variant="contained" startIcon={<FileDownloadIcon />} onClick={handleExport}>
          Export
        </Button>
      </Box>

      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'auto', boxShadow: 2, p: 0, m: 0 }}>
        <TableContainer sx={{ maxHeight: 600, p: 0, m: 0 }}>
          <Table stickyHeader aria-label="faculty ranking table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'rank'}
                    direction={orderBy === 'rank' ? order : 'asc'}
                    onClick={() => handleRequestSort('rank')}
                  >
                    Rank
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'studentId'}
                    direction={orderBy === 'studentId' ? order : 'asc'}
                    onClick={() => handleRequestSort('studentId')}
                  >
                    Student ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'department'}
                    direction={orderBy === 'department' ? order : 'asc'}
                    onClick={() => handleRequestSort('department')}
                  >
                    Department
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'faculty'}
                    direction={orderBy === 'faculty' ? order : 'asc'}
                    onClick={() => handleRequestSort('faculty')}
                  >
                    Faculty
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'gpa'}
                    direction={orderBy === 'gpa' ? order : 'asc'}
                    onClick={() => handleRequestSort('gpa')}
                  >
                    GPA
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'credits'}
                    direction={orderBy === 'credits' ? order : 'asc'}
                    onClick={() => handleRequestSort('credits')}
                  >
                    Credits
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Loading...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : paginated.length > 0 ? (
                paginated.map(student => (
                  <TableRow key={student.id} hover>
                    <TableCell>{student.rank}</TableCell>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.faculty}</TableCell>
                    <TableCell align="right">{student.gpa.toFixed(2)}</TableCell>
                    <TableCell align="right">{student.credits}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => {}}>
                        Transcript
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      No records found.
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
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Ranking Info card */}
      <Card sx={{ width: '100%', mt: 2, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Ranking Information</Typography>
          <Divider sx={{ mb: 2 }} />
          {rankingMetadata && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Students Ranked
              </Typography>
              <Typography variant="body1">
                {rankingMetadata.eligibleStudents} / {rankingMetadata.totalStudents}
              </Typography>
            </Box>
          )}
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Filter by Department
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {departments.map(dept => (
              <Chip
                key={dept}
                label={dept}
                onClick={() => setSelectedDepartment(dept)}
                variant={selectedDepartment === dept ? 'filled' : 'outlined'}
                color={selectedDepartment === dept ? 'primary' : 'default'}
              />
            ))}
            {selectedDepartment && (
              <Chip
                label="Clear"
                onClick={() => setSelectedDepartment('')}
                variant="outlined"
              />
            )}
          </Box>
          {rankingMetadata && (
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="caption">
                Last updated: {rankingMetadata.lastUpdated.toLocaleDateString()} {rankingMetadata.lastUpdated.toLocaleTimeString()}
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>
    </DeansOfficeDashboardLayout>
  );
};

export default FacultyRankingPage;
