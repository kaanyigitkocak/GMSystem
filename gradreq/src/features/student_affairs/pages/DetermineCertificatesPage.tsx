import React, { useRef, useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert
} from '@mui/material';
import StudentAffairsDashboardLayout from '../layout/StudentAffairsDashboardLayout';
import DownloadIcon from '@mui/icons-material/Download';

interface StudentData {
  name: string;
  id: string;
  department: string;
  gpa: number;
  certificateType: string;
}

const DetermineCertificatesPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [combinedRankings, setCombinedRankings] = useState<StudentData[]>([]);
  const [showRankings, setShowRankings] = useState(false);
  const [showDetermineSuccess, setShowDetermineSuccess] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);

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
        const lines = content.split('\n');
        const headers = lines[0].toLowerCase().split(',');
        
        for (let j = 1; j < lines.length; j++) {
          if (!lines[j].trim()) continue;
          
          const values = lines[j].split(',');
          if (values.length !== headers.length) continue;

          const student: StudentData = {
            name: values[headers.indexOf('name')].trim(),
            id: values[headers.indexOf('id')].trim(),
            department: values[headers.indexOf('department')].trim(),
            gpa: parseFloat(values[headers.indexOf('gpa')].trim()),
            certificateType: determineCertificateType(parseFloat(values[headers.indexOf('gpa')].trim()))
          };

          if (!isNaN(student.gpa)) {
            allStudents.push(student);
          }
        }
      } catch (error) {
        setErrorMessage('Error reading file: ' + file.name);
        setShowError(true);
        hasError = true;
        break;
      }
    }

    if (!hasError && allStudents.length > 0) {
      setCombinedRankings(allStudents);
      setFilesLoaded(true);
      setShowSuccess(true);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const determineCertificateType = (gpa: number): string => {
    if (gpa >= 3.5 && gpa <= 4.0) return 'High Honors';
    if (gpa >= 3.0 && gpa < 3.5) return 'Honors';
    return '';
  };

  const handleDetermineCertificates = () => {
    setShowRankings(true);
    setShowDetermineSuccess(true);
  };

  const handleExportToExcel = () => {
    if (combinedRankings.length === 0) return;

    // Create CSV content
    const headers = ['Name', 'ID', 'Department', 'GPA', 'Certificate Type'];
    const rows = combinedRankings.map(student => [
      student.name,
      student.id,
      student.department,
      student.gpa.toFixed(2),
      student.certificateType
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
    link.setAttribute('download', `certificate_determinations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleCloseDetermineSuccess = () => {
    setShowDetermineSuccess(false);
  };

  const handleCloseExportSuccess = () => {
    setShowExportSuccess(false);
  };

  return (
    <StudentAffairsDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Determine Certificates
        </Typography>
        
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            Click the 'Load University Rankings' button to retrieve and display the university ranking data required for determining the student certificates.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleLoadRankings}
            >
              Load University Rankings
            </Button>
            <Button 
              variant="contained" 
              color={filesLoaded ? "success" : "error"}
              onClick={handleDetermineCertificates}
              disabled={!filesLoaded}
            >
              Determine Certificates
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
                Certificate Determinations
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                onClick={handleExportToExcel}
              >
                Export to Excel
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>GPA</TableCell>
                    <TableCell>Certificate Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {combinedRankings.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.gpa.toFixed(2)}</TableCell>
                      <TableCell>{student.certificateType}</TableCell>
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
            University ranking files successfully loaded.
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
          open={showDetermineSuccess} 
          autoHideDuration={6000} 
          onClose={handleCloseDetermineSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseDetermineSuccess} severity="success" sx={{ width: '100%' }}>
            Certificates have been determined based on the university rankings.
          </Alert>
        </Snackbar>

        <Snackbar 
          open={showExportSuccess} 
          autoHideDuration={6000} 
          onClose={handleCloseExportSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseExportSuccess} severity="success" sx={{ width: '100%' }}>
            Certificate determinations have been successfully exported.
          </Alert>
        </Snackbar>
      </Box>
    </StudentAffairsDashboardLayout>
  );
};

export default DetermineCertificatesPage;
