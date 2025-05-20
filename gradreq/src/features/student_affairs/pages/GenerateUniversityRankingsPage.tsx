import React, { useState, useRef } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import StudentAffairsDashboardLayout from '../layout/StudentAffairsDashboardLayout';
import DownloadIcon from '@mui/icons-material/Download';

interface StudentData {
  name: string;
  id: string;
  department: string;
  gpa: number;
}

const GenerateUniversityRankingsPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [combinedRankings, setCombinedRankings] = useState<StudentData[]>([]);
  const [showRankings, setShowRankings] = useState(false);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);

  const normalizeHeader = (header: string): string => {
    return header.toLowerCase()
      .replace(/[^a-z0-9]/g, '') // Remove special characters
      .replace(/^(student|stud)?(name|names)$/, 'name')
      .replace(/^(student|stud)?(id|ids?)$/, 'id')
      .replace(/^(department|dept|departments?)$/, 'department')
      .replace(/^(gpa|grade|grades?|point|points?|average|averages?)$/, 'gpa');
  };

  const validateCSVStructure = (content: string): boolean => {
    const lines = content.split('\n');
    if (lines.length < 2) return false;
    
    const headers = lines[0].toLowerCase().split(',').map(h => normalizeHeader(h.trim()));
    const requiredHeaders = ['name', 'id', 'department', 'gpa'];
    
    // Check if all required headers are present in some form
    return requiredHeaders.every(required => 
      headers.some(header => header.includes(required))
    );
  };

  const findColumnIndex = (headers: string[], target: string): number => {
    const normalizedTarget = normalizeHeader(target);
    return headers.findIndex(header => 
      normalizeHeader(header).includes(normalizedTarget)
    );
  };

  const parseCSV = (content: string): StudentData[] => {
    const lines = content.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data: StudentData[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) continue;

      const nameIndex = findColumnIndex(headers, 'name');
      const idIndex = findColumnIndex(headers, 'id');
      const departmentIndex = findColumnIndex(headers, 'department');
      const gpaIndex = findColumnIndex(headers, 'gpa');

      if (nameIndex === -1 || idIndex === -1 || departmentIndex === -1 || gpaIndex === -1) {
        continue;
      }

      const student: StudentData = {
        name: values[nameIndex],
        id: values[idIndex],
        department: values[departmentIndex],
        gpa: parseFloat(values[gpaIndex])
      };

      if (!isNaN(student.gpa)) {
        data.push(student);
      }
    }

    return data;
  };

  const handleLoadRankings = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let allStudents: StudentData[] = [];
    let hasError = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        setErrorMessage('Please select valid CSV files only.');
        setShowError(true);
        hasError = true;
        break;
      }

      try {
        const content = await file.text();
        if (!validateCSVStructure(content)) {
          setErrorMessage('Invalid CSV structure. File must contain columns for: name, id, department, and gpa (or similar variations).');
          setShowError(true);
          hasError = true;
          break;
        }

        const students = parseCSV(content);
        allStudents = [...allStudents, ...students];
      } catch (error) {
        setErrorMessage('Error reading file: ' + file.name);
        setShowError(true);
        hasError = true;
        break;
      }
    }

    if (!hasError && allStudents.length > 0) {
      // Sort students by GPA in descending order
      allStudents.sort((a, b) => b.gpa - a.gpa);
      setCombinedRankings(allStudents);
      setFilesLoaded(true);
      setShowSuccess(true);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateRankings = () => {
    setShowRankings(true);
    setShowCreateSuccess(true);
  };

  const handleDownloadRankings = () => {
    if (combinedRankings.length === 0) return;

    // Create CSV content
    const headers = ['Rank', 'Name', 'ID', 'Department', 'GPA'];
    const rows = combinedRankings.map((student, index) => [
      (index + 1).toString(),
      student.name,
      student.id,
      student.department,
      student.gpa.toFixed(2)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `university_rankings_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCloseCreateSuccess = () => {
    setShowCreateSuccess(false);
  };

  const handleCloseDownloadSuccess = () => {
    setShowDownloadSuccess(false);
  };

  return (
    <StudentAffairsDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Generate University Rankings
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            This page allows you to generate the university ranking list by uploading faculty ranking files. First, load the signed faculty rankings, then create the overall university ranking based on students' GPAs.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleLoadRankings}
            >
              Load Faculty Rankings
            </Button>
            <Button 
              variant="contained" 
              color={filesLoaded ? "success" : "error"}
              onClick={handleCreateRankings}
              disabled={!filesLoaded}
            >
              Create University Rankings
            </Button>
          </Stack>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            multiple
            style={{ display: 'none' }}
          />
        </Paper>

        {showRankings && combinedRankings.length > 0 && (
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                University Rankings
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadRankings}
              >
                Download Rankings
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>GPA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {combinedRankings.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.gpa.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        <Snackbar 
          open={showSuccess} 
          autoHideDuration={6000} 
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            Faculty ranking files successfully loaded.
          </Alert>
        </Snackbar>

        <Snackbar 
          open={showError} 
          autoHideDuration={6000} 
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>

        <Snackbar 
          open={showCreateSuccess} 
          autoHideDuration={6000} 
          onClose={handleCloseCreateSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseCreateSuccess} severity="success" sx={{ width: '100%' }}>
            University rankings have been successfully created based on the loaded faculty rankings.
          </Alert>
        </Snackbar>

        <Snackbar 
          open={showDownloadSuccess} 
          autoHideDuration={6000} 
          onClose={handleCloseDownloadSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseDownloadSuccess} severity="success" sx={{ width: '100%' }}>
            University rankings have been successfully downloaded.
          </Alert>
        </Snackbar>
      </Box>
    </StudentAffairsDashboardLayout>
  );
};

export default GenerateUniversityRankingsPage;
