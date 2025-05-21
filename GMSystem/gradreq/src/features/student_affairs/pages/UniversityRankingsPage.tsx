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
  TablePagination,
  TableSortLabel,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Divider,
  Alert,
  AlertTitle,
  Chip,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import StudentAffairsDashboardLayout from '../layout/StudentAffairsDashboardLayout';
import { getUniversityRankings } from '../services/studentAffairsService';
import { useNavigate } from 'react-router-dom';

// Define types for university rankings
interface StudentRanking {
  id: string;
  rank: number;
  studentId: string;
  name: string;
  department: string;
  faculty: string;
  gpa: number;
  credits: number;
  duplicateRecords?: boolean;
  graduationEligible: boolean;
}

interface RankingMetadata {
  totalStudents: number;
  eligibleStudents: number;
  hasDuplicates: boolean;
  mixedGraduationStatus: boolean;
  lastUpdated: Date;
}

type Order = 'asc' | 'desc';

// Add approval status type
interface ApprovalStatus {
  [studentId: string]: 'approved' | 'disapproved' | undefined;
}

const UniversityRankingsPage = () => {
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof StudentRanking>('gpa');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [rankingMetadata, setRankingMetadata] = useState<RankingMetadata | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [studentRankings, setStudentRankings] = useState<StudentRanking[]>([]);
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>({});
  
  const navigate = useNavigate();

  // Load data from service when component mounts
  useEffect(() => {
    const loadUniversityRankings = async () => {
      setIsLoading(true);
      try {
        // Get university rankings data
        const rawRankings = await getUniversityRankings();
        
        // Transform the data to match our StudentRanking interface
        const transformedRankings: StudentRanking[] = [];
        let totalStudents = 0;
        
        // Process each department's rankings
        rawRankings.forEach(dept => {
          dept.students.forEach(student => {
            totalStudents++;
            transformedRankings.push({
              id: `${dept.id}-${student.id}`, // Make ID unique by combining dept and student IDs
              rank: student.rank,
              studentId: `2020${dept.id}${student.id.padStart(3, '0')}`,
              name: student.name,
              department: dept.department,
              faculty: dept.faculty,
              gpa: student.gpa,
              credits: Math.floor(Math.random() * 30) + 120,
              duplicateRecords: false, // Remove duplicate flag since we're not merging
              graduationEligible: student.gpa >= 2.0
            });
          });
        });
        
        // Sort by GPA
        transformedRankings.sort((a, b) => b.gpa - a.gpa);
        
        // Assign ranks after sorting
        transformedRankings.forEach((student, index) => {
          student.rank = index + 1;
        });
        
        // Create metadata
        const metadata: RankingMetadata = {
          totalStudents,
          eligibleStudents: transformedRankings.filter(s => s.graduationEligible).length,
          hasDuplicates: false, // Remove duplicate flag since we're not merging
          mixedGraduationStatus: transformedRankings.some(s => !s.graduationEligible),
          lastUpdated: new Date()
        };
        
        setStudentRankings(transformedRankings);
        setRankingMetadata(metadata);
      } catch (err) {
        setError('Failed to load university ranking data. Please try again later.');
        console.error('Error loading university rankings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUniversityRankings();
  }, []);
  
  // Generate warnings based on metadata
  useEffect(() => {
    const newWarnings: string[] = [];
    
    if (rankingMetadata) {
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
    const matchesDepartment = selectedDepartment === null || student.department === selectedDepartment;
    
    return matchesSearch && matchesFaculty && matchesDepartment;
  });
  
  // Approve/disapprove handlers
  const handleApprove = (studentId: string) => {
    setApprovalStatus(prev => ({ ...prev, [studentId]: 'approved' }));
  };
  const handleDisapprove = (studentId: string) => {
    setApprovalStatus(prev => ({ ...prev, [studentId]: 'disapproved' }));
  };

  // Sort: approved first, then normal, then disapproved
  const sortedData = [...filteredData].sort((a, b) => {
    const aStatus = approvalStatus[a.id];
    const bStatus = approvalStatus[b.id];
    if (aStatus === 'approved' && bStatus !== 'approved') return -1;
    if (aStatus !== 'approved' && bStatus === 'approved') return 1;
    if (aStatus === 'disapproved' && bStatus !== 'disapproved') return 1;
    if (aStatus !== 'disapproved' && bStatus === 'disapproved') return -1;
    // fallback to original sort
    if (orderBy === 'rank') return order === 'asc' ? a.rank - b.rank : b.rank - a.rank;
    if (orderBy === 'gpa') return order === 'asc' ? a.gpa - b.gpa : b.gpa - a.gpa;
    if (orderBy === 'credits') return order === 'asc' ? a.credits - b.credits : b.credits - a.credits;
    const aVal = a[orderBy] as string;
    const bVal = b[orderBy] as string;
    return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });
  
  // Pagination
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Faculty and department filter options
  const faculties = Array.from(new Set(studentRankings.map(student => student.faculty)));
  const departments = Array.from(new Set(studentRankings
    .filter(student => selectedFaculty === null || student.faculty === selectedFaculty)
    .map(student => student.department)));
  
  // Generate a fresh ranking
  const refreshRanking = async () => {
    setIsLoading(true);
    
    try {
      // Get university rankings data
      const rawRankings = await getUniversityRankings();
      
      // Transform the data to match our StudentRanking interface
      const transformedRankings: StudentRanking[] = [];
      let totalStudents = 0;
      
      // Process each department's rankings
      rawRankings.forEach(dept => {
        dept.students.forEach(student => {
          totalStudents++;
          transformedRankings.push({
            id: `${dept.id}-${student.id}`, // Make ID unique by combining dept and student IDs
            rank: student.rank,
            studentId: `2020${dept.id}${student.id.padStart(3, '0')}`,
            name: student.name,
            department: dept.department,
            faculty: dept.faculty,
            gpa: student.gpa,
            credits: Math.floor(Math.random() * 30) + 120,
            duplicateRecords: false, // Remove duplicate flag since we're not merging
            graduationEligible: student.gpa >= 2.0
          });
        });
      });
      
      // Sort by GPA
      transformedRankings.sort((a, b) => b.gpa - a.gpa);
      
      // Assign ranks after sorting
      transformedRankings.forEach((student, index) => {
        student.rank = index + 1;
      });
      
      // Create metadata
      const metadata: RankingMetadata = {
        totalStudents,
        eligibleStudents: transformedRankings.filter(s => s.graduationEligible).length,
        hasDuplicates: false, // Remove duplicate flag since we're not merging
        mixedGraduationStatus: transformedRankings.some(s => !s.graduationEligible),
        lastUpdated: new Date()
      };
      
      setStudentRankings(transformedRankings);
      setRankingMetadata(metadata);
    } catch (err) {
      setError('Failed to refresh ranking data. Please try again later.');
      console.error('Error refreshing university rankings:', err);
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
    
    const headers = ['Rank', 'Student ID', 'Name', 'Department', 'Faculty', 'GPA', 'Credits', 'Graduation Eligible'];
    
    const csvContent = [
      headers.join(','),
      ...sortedData.map(student => [
        student.rank,
        student.studentId,
        `"${student.name}"`,
        `"${student.department}"`,
        `"${student.faculty}"`,
        student.gpa,
        student.credits,
        student.graduationEligible ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `university_rankings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Approve all students
  const handleApproveAll = () => {
    // Here we would make an API call to approve all students
    // For now, we'll just show a success message
    setWarnings([]);
    setError(null);
    alert('All students have been approved for graduation');
  };

  // View student transcript
  const handleViewTranscript = (studentId: string) => {
    navigate(`/student-affairs/transcripts/${studentId}`);
  };

  return (
    <StudentAffairsDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          University Rankings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage university-wide student rankings for graduation
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
              color="success"
              onClick={handleApproveAll}
            >
              Approve All
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
              <Table stickyHeader aria-label="university ranking table">
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
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'graduationEligible'}
                        direction={orderBy === 'graduationEligible' ? order : 'asc'}
                        onClick={() => handleRequestSort('graduationEligible')}
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
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleViewTranscript(student.studentId)}
                            >
                              View Transcript
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Button
                                size="small"
                                color="success"
                                onClick={() => handleApprove(student.id)}
                                startIcon={<CheckIcon />}
                                disabled={status === 'approved'}
                              >
                                Approve
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleDisapprove(student.id)}
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
                      <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={40} />
                        <Typography variant="body2" sx={{ mt: 2 }}>
                          Loading ranking data...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
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
                  
                  {rankingMetadata.mixedGraduationStatus && (
                    <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 2 }}>
                      <Typography variant="caption">
                        Some students don't meet graduation criteria
                      </Typography>
                    </Alert>
                  )}
                </>
              )}
              
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Filter by Faculty
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                Filter by Department
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {departments.map(department => (
                  <Chip
                    key={department}
                    label={department}
                    onClick={() => setSelectedDepartment(department)}
                    variant={selectedDepartment === department ? 'filled' : 'outlined'}
                    color={selectedDepartment === department ? 'primary' : 'default'}
                  />
                ))}
                {selectedDepartment && (
                  <Chip
                    label="Clear"
                    onClick={() => setSelectedDepartment(null)}
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
    </StudentAffairsDashboardLayout>
  );
};

export default UniversityRankingsPage;
