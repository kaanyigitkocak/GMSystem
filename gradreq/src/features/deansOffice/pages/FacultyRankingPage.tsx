import { useState } from 'react';
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
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';

// Types
interface StudentRanking {
  id: string;
  rank: number;
  studentId: string;
  name: string;
  department: string;
  faculty: string;
  gpa: number;
  credits: number;
}

// Sample data
const sampleStudentRankings: StudentRanking[] = [
  { id: '1', rank: 1, studentId: '220202101', name: 'Ali Yılmaz', department: 'Computer Engineering', faculty: 'Engineering', gpa: 3.98, credits: 144 },
  { id: '2', rank: 2, studentId: '220202056', name: 'Ayşe Kaya', department: 'Computer Engineering', faculty: 'Engineering', gpa: 3.97, credits: 148 },
  { id: '3', rank: 3, studentId: '210201089', name: 'Mehmet Demir', department: 'Electrical Engineering', faculty: 'Engineering', gpa: 3.95, credits: 152 },
  { id: '4', rank: 4, studentId: '210305062', name: 'Zeynep Yıldız', department: 'Physics', faculty: 'Science', gpa: 3.93, credits: 138 },
  { id: '5', rank: 5, studentId: '220401023', name: 'Mustafa Şahin', department: 'Architecture', faculty: 'Architecture', gpa: 3.91, credits: 160 },
  { id: '6', rank: 6, studentId: '210301045', name: 'Fatma Çelik', department: 'Chemistry', faculty: 'Science', gpa: 3.89, credits: 136 },
  { id: '7', rank: 7, studentId: '220205078', name: 'Ahmet Aksoy', department: 'Mechanical Engineering', faculty: 'Engineering', gpa: 3.88, credits: 142 },
  { id: '8', rank: 8, studentId: '210208091', name: 'Sema Yılmaz', department: 'Civil Engineering', faculty: 'Engineering', gpa: 3.86, credits: 146 },
  { id: '9', rank: 9, studentId: '220301012', name: 'Emre Koç', department: 'Mathematics', faculty: 'Science', gpa: 3.85, credits: 134 },
  { id: '10', rank: 10, studentId: '210204067', name: 'Elif Şahin', department: 'Industrial Design', faculty: 'Architecture', gpa: 3.84, credits: 150 },
  { id: '11', rank: 11, studentId: '220203045', name: 'Burak Demir', department: 'Bioengineering', faculty: 'Engineering', gpa: 3.83, credits: 140 },
  { id: '12', rank: 12, studentId: '210307034', name: 'Gizem Yılmaz', department: 'Molecular Biology', faculty: 'Science', gpa: 3.82, credits: 138 },
  { id: '13', rank: 13, studentId: '220207089', name: 'Oğuz Kaya', department: 'Materials Engineering', faculty: 'Engineering', gpa: 3.80, credits: 144 },
  { id: '14', rank: 14, studentId: '210401032', name: 'Ceren Arslan', department: 'Urban Planning', faculty: 'Architecture', gpa: 3.79, credits: 156 },
  { id: '15', rank: 15, studentId: '220302056', name: 'Onur Öztürk', department: 'Physics', faculty: 'Science', gpa: 3.78, credits: 132 },
];

type Order = 'asc' | 'desc';

const FacultyRankingPage = () => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof StudentRanking>('gpa');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  
  // Handle sort request
  const handleRequestSort = (property: keyof StudentRanking) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Filter and sort data
  const filteredData = sampleStudentRankings.filter(student => {
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
  const faculties = Array.from(new Set(sampleStudentRankings.map(student => student.faculty)));
  
  // Download ranking as CSV
  const downloadRankingCsv = () => {
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
          Students ranked by GPA across all departments
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <Paper sx={{ mb: 3 }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ width: '100%', maxWidth: 500 }}>
                <TextField
                  fullWidth
                  placeholder="Search by name, ID or department"
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                {selectedFaculty && (
                  <Chip 
                    label={`Faculty: ${selectedFaculty}`} 
                    onDelete={() => setSelectedFaculty(null)} 
                    color="primary"
                  />
                )}
                
                <IconButton 
                  color="primary" 
                  onClick={() => {
                    // Toggle faculty filter dropdown
                  }}
                >
                  <FilterListIcon />
                </IconButton>
                
                <Button
                  startIcon={<FileDownloadIcon />}
                  onClick={downloadRankingCsv}
                >
                  Export
                </Button>
                
                <Button
                  startIcon={<RefreshIcon />}
                  onClick={() => {
                    // Refresh ranking data
                    setSearchQuery('');
                    setSelectedFaculty(null);
                    setPage(0);
                  }}
                >
                  Refresh
                </Button>
              </Box>
            </Box>
            
            <TableContainer>
              <Table>
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
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.faculty}</TableCell>
                        <TableCell align="right">{student.gpa.toFixed(2)}</TableCell>
                        <TableCell align="right">{student.credits}</TableCell>
                      </TableRow>
                    ))
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
        </Grid>
        
        <Grid item xs={12} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ranking Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" paragraph>
                This ranking shows all students across the faculty, sorted by GPA in descending order.
              </Typography>
              
              <Typography variant="body2" paragraph>
                The ranking is generated automatically after department ranking files are uploaded and processed.
              </Typography>
              
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
                  Last updated: May 15, 2025 at 14:30
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DeansOfficeDashboardLayout>
  );
};

export default FacultyRankingPage;