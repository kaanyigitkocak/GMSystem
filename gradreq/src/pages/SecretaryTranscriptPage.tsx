import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import SecretaryDashboard from '../components/layout/SecretaryDashboard';
import { uploadTranscripts, checkGraduationRequirements, exportResultsToFile } from '../services/secretaryService';
import type { TranscriptFile, StudentGraduationData } from '../types/secretary';

const SecretaryTranscriptPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<TranscriptFile[]>([]);
  const [studentData, setStudentData] = useState<StudentGraduationData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState('xlsx');
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const filesArray = Array.from(files);
      const uploadedFilesData = await uploadTranscripts(filesArray);
      setUploadedFiles(uploadedFilesData);
      setActiveStep(1);
    } catch (err) {
      setError('Error uploading transcript files. Please check the file format.');
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleProcessTranscripts = async () => {
    if (uploadedFiles.length === 0) {
      setError('No transcript files available for processing.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const fileIds = uploadedFiles.map(file => file.id);
      const result = await checkGraduationRequirements(fileIds);
      setStudentData(result);
      setActiveStep(2);
    } catch (err) {
      setError('Error processing transcripts.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportResults = async () => {
    if (studentData.length === 0) {
      setError('No student data available to export.');
      return;
    }

    setIsExporting(true);
    setError(null);
    
    try {
      const url = await exportResultsToFile(
        studentData,
        exportFormat as 'csv' | 'xlsx' | 'pdf'
      );
      setDownloadUrl(url);
    } catch (err) {
      setError('Error exporting results.');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setUploadedFiles([]);
    setStudentData([]);
    setDownloadUrl(null);
    setError(null);
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    
    // If all files are deleted, go back to step 0
    if (uploadedFiles.length === 1) {
      setActiveStep(0);
    }
  };

  return (
    <SecretaryDashboard>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Transcript Processing
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          From this page, you can upload student transcripts, check graduation requirements, and export the results.
        </Typography>

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

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>Upload Transcript</StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Select or drag transcript files downloaded from the UBYS system.
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? 'Uploading...' : 'Upload Transcript'}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".csv,.xlsx,.xls"
                      style={{ display: 'none' }}
                      onChange={handleFileUpload}
                    />
                  </Box>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel>Check Graduation Requirements</StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Start processing to check graduation requirements based on uploaded transcripts.
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrowIcon />}
                      onClick={handleProcessTranscripts}
                      disabled={isProcessing || uploadedFiles.length === 0}
                      sx={{ mr: 1 }}
                    >
                      {isProcessing ? 'Processing...' : 'Check Requirements'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setActiveStep(0)}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel>View and Export Results</StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    View the list of students who meet graduation requirements and export the results.
                  </Typography>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                      <InputLabel id="export-format-label">Format</InputLabel>
                      <Select
                        labelId="export-format-label"
                        value={exportFormat}
                        label="Format"
                        onChange={(e) => setExportFormat(e.target.value)}
                      >
                        <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                        <MenuItem value="csv">CSV</MenuItem>
                        <MenuItem value="pdf">PDF</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={handleExportResults}
                      disabled={isExporting || studentData.length === 0}
                      sx={{ mr: 1 }}
                    >
                      {isExporting ? 'Preparing...' : 'Export'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleReset}
                    >
                      New Process
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </Grid>
          
          <Grid item xs={12} md={8}>
            {activeStep === 0 && uploadedFiles.length === 0 && (
              <Paper sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CloudUploadIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Upload Transcript Files
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload transcript files from UBYS for graduation requirement checks.
                </Typography>
              </Paper>
            )}
            
            {uploadedFiles.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Uploaded Transcript Files
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>File Name</TableCell>
                          <TableCell>Upload Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell width="10%">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {uploadedFiles.map((file) => (
                          <TableRow key={file.id}>
                            <TableCell>{file.fileName}</TableCell>
                            <TableCell>{new Date(file.uploadDate).toLocaleString()}</TableCell>
                            <TableCell>
                              <Chip 
                                label={file.status === 'processing' ? 'Processing' : file.status === 'completed' ? 'Completed' : 'Error'} 
                                color={file.status === 'processing' ? 'info' : file.status === 'completed' ? 'success' : 'error'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title="Delete File">
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => handleDeleteFile(file.id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
            
            {activeStep === 2 && studentData.length > 0 && (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Graduation Requirement Check Results
                    </Typography>
                    <Box>
                      <Chip 
                        label={`Total: ${studentData.length}`} 
                        color="default" 
                        size="small" 
                        sx={{ mr: 1 }} 
                      />
                      <Chip 
                        label={`Successful: ${studentData.filter(s => s.meetsRequirements).length}`} 
                        color="success" 
                        size="small" 
                        sx={{ mr: 1 }} 
                      />
                      <Chip 
                        label={`Failed: ${studentData.filter(s => !s.meetsRequirements).length}`} 
                        color="error" 
                        size="small" 
                      />
                    </Box>
                  </Box>
                  
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Student ID</TableCell>
                          <TableCell>Student Name</TableCell>
                          <TableCell>Department</TableCell>
                          <TableCell>GPA</TableCell>
                          <TableCell>Total Credits</TableCell>
                          <TableCell>Graduation Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentData.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.studentName}</TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>{student.gpa.toFixed(2)}</TableCell>
                            <TableCell>{student.totalCredits}</TableCell>
                            <TableCell>
                              <Chip
                                icon={student.meetsRequirements ? <CheckCircleIcon /> : <ErrorIcon />}
                                label={student.meetsRequirements ? 'Can Graduate' : 'Cannot Graduate'}
                                color={student.meetsRequirements ? 'success' : 'error'}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                
                {downloadUrl && (
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </Button>
                  </CardActions>
                )}
              </Card>
            )}
            
            {isUploading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
              </Box>
            )}
            
            {isProcessing && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Processing transcripts, please wait...
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </SecretaryDashboard>
  );
};

export default SecretaryTranscriptPage; 