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
  Chip,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';
import type { StudentRanking, RankingMetadata } from '../services/deansOfficeService';
import { getFacultyRankings } from '../services/deansOfficeService';

type Order = 'asc' | 'desc';

const FacultyRankingPage = () => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof StudentRanking>('gpa');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [rankingMetadata, setRankingMetadata] = useState<RankingMetadata | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentRankings, setStudentRankings] = useState<StudentRanking[]>([]);
  
  // Load data from service when component mounts
  useEffect(() => {
    const loadFacultyRankings = async () => {
      setIsLoading(true);
      try {
        const result = await getFacultyRankings();
        setStudentRankings(result.rankings);
        setRankingMetadata(result.metadata);
      } catch (err) {
        setError('Failed to load ranking data. Please try again later.');
        console.error('Error loading faculty rankings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFacultyRankings();
  }, []);
  
  // Generate warnings based on metadata
  useEffect(() => {
    const newWarnings: string[] = [];
    
    if (rankingMetadata) {
      if (rankingMetadata.hasDuplicates) {
        newWarnings.push('Duplicate student records merged from different departments');
      }
      
      if (rankingMetadata.mixedGraduationStatus) {
        newWarnings.push('Some students did not meet graduation criteria and were excluded');
      }
      
      if (rankingMetadata.eligibleStudents === 0) {
        setError('No eligible students found for ranking. Please check department files.');
      } else {
        setError(null);
      }
    }
    
    setWarnings(newWarnings);
  }, [rankingMetadata]);
  
  // Handle sort request
  const handleRequestSort = (property: keyof StudentRanking) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  // Handle pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Filter and sort data
  const filteredData = studentRankings.filter((student) => {
    const matchesSearch = searchQuery === '' || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesFaculty = selectedFaculty === null || student.faculty === selectedFaculty;
    
    return matchesSearch && matchesFaculty;
  });
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (orderBy === 'rank') {
      return order === 'asc' ? a.rank - b.rank : b.rank - a.rank;
    }
    
    if (orderBy === 'gpa') {
      return order === 'asc' ? a.gpa - b.gpa : b.gpa - a.gpa;
    }
    
    if (orderBy === 'credits') {
      return order === 'asc' ? a.credits - b.credits : b.credits - a.credits;
    }
    
    // String comparison for other fields
    const aValue = a[orderBy] as string;
    const bValue = b[orderBy] as string;
    
    return order === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
  
  // Pagination
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Faculty filter options
  const faculties = Array.from(new Set(studentRankings.map(student => student.faculty)));
  
  // Generate a fresh ranking
  const refreshRanking = async () => {
    setIsLoading(true);
    
    try {
      const result = await getFacultyRankings();
      setStudentRankings(result.rankings);
      setRankingMetadata(result.metadata);
    } catch (err) {
      setError('Failed to refresh ranking data. Please try again later.');
      console.error('Error refreshing faculty rankings:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Export functionality
  const handleExportRankings = () => {
    if (filteredData.length === 0) {
      setError('No data to export');
      return;
    }
    
    const headers = ['Rank', 'Student ID', 'Name', 'Department', 'Faculty', 'GPA', 'Credits'];
    
    const csvContent = [
      headers.join(','),
      ...sortedData.map(student => [
        student.rank,
        student.studentId,
        `"${student.name}"`,
        `"${student.department}"`,
        `"${student.faculty}"`,
        student.gpa,
        student.credits
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `faculty_ranking_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DeansOfficeDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Faculty Ranking
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage consolidated faculty-wide student rankings
        </Typography>
      </Box>
      
      {/* Error alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      
      {/* Warning alerts */}
      {warnings.length > 0 && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          onClose={() => setWarnings([])}
        >
          <AlertTitle>Warnings</AlertTitle>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </Alert>
      )}
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Search Students"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: '50%', md: '30%' } }}
          />
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={refreshRanking}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
            
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportRankings}
            >
              Export to CSV
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
        <Box gridColumn={{ xs: 'span 12', lg: 'span 9' }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((student) => (
                      <TableRow key={student.id} hover>
                        <TableCell>{student.rank}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {student.name}
                            {student.duplicateRecords && (
                              <Tooltip title="Records merged from multiple departments">
                                <InfoIcon color="warning" fontSize="small" sx={{ ml: 1 }} />
                              </Tooltip>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.faculty}</TableCell>
                        <TableCell align="right">{student.gpa.toFixed(2)}</TableCell>
                        <TableCell align="right">{student.credits}</TableCell>
                      </TableRow>
                    ))
                  ) : isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={40} />
                        <Typography variant="body2" sx={{ mt: 2 }}>
                          Loading ranking data...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
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
        </Box>
        
        <Box gridColumn={{ xs: 'span 12', lg: 'span 3' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ranking Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {rankingMetadata && (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Students Ranked
                    </Typography>
                    <Typography variant="body1">
                      {rankingMetadata.eligibleStudents} eligible of {rankingMetadata.totalStudents} total
                    </Typography>
                  </Box>
                  
                  {rankingMetadata.hasDuplicates && (
                    <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 2 }}>
                      <Typography variant="caption">
                        Students appearing in multiple department files have been merged
                      </Typography>
                    </Alert>
                  )}
                  
                  {rankingMetadata.mixedGraduationStatus && (
                    <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 2 }}>
                      <Typography variant="caption">
                        Only students meeting graduation criteria are included in the ranking
                      </Typography>
                    </Alert>
                  )}
                </>
              )}
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Filter by Faculty
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {faculties.map(faculty => (
                  <Chip
                    key={faculty}
                    label={faculty}
                    onClick={() => setSelectedFaculty(faculty)}
                    variant={selectedFaculty === faculty ? 'filled' : 'outlined'}
                    color={selectedFaculty === faculty ? 'primary' : 'default'}
                  />
                ))}
                {selectedFaculty && (
                  <Chip
                    label="Clear"
                    onClick={() => setSelectedFaculty(null)}
                    variant="outlined"
                  />
                )}
              </Box>
              
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="caption">
                  Last updated: {rankingMetadata?.lastUpdated.toLocaleDateString()} at {rankingMetadata?.lastUpdated.toLocaleTimeString()}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DeansOfficeDashboardLayout>
  );
};

export default FacultyRankingPage;
