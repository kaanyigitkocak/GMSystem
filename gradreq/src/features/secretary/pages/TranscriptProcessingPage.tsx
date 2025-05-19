import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Alert,
  IconButton,
  Divider,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';

interface TranscriptData {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  uploadDate: string;
  status: 'pending' | 'processed' | 'rejected';
  file: File | null;
}

const TranscriptProcessingPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transcripts, setTranscripts] = useState<TranscriptData[]>([
    {
      id: '1',
      studentId: '20190045',
      studentName: 'John Doe',
      department: 'Computer Engineering',
      uploadDate: '2023-05-15',
      status: 'pending',
      file: null
    },
    {
      id: '2',
      studentId: '20190078',
      studentName: 'Jane Smith',
      department: 'Computer Engineering',
      uploadDate: '2023-05-14',
      status: 'processed',
      file: null
    },
    {
      id: '3',
      studentId: '20190023',
      studentName: 'Mike Johnson',
      department: 'Computer Engineering',
      uploadDate: '2023-05-13',
      status: 'rejected',
      file: null
    }
  ]);

  // Handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      
      // Check if file is PDF
      if (selectedFile.type !== 'application/pdf') {
        setErrorMessage('Please upload a PDF file.');
        return;
      }
      
      setFile(selectedFile);
      setErrorMessage('');
    }
  };

  // Handle upload
  const handleUpload = () => {
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    setProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      // Create a new transcript entry
      const newTranscript: TranscriptData = {
        id: (transcripts.length + 1).toString(),
        studentId: '2019' + Math.floor(1000 + Math.random() * 9000).toString(),
        studentName: 'New Student',
        department: 'Computer Engineering',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        file: file
      };
      
      // Add to transcripts
      setTranscripts([newTranscript, ...transcripts]);
      
      // Reset state
      setFile(null);
      setProcessing(false);
      setSuccessMessage('Transcript uploaded successfully.');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1500);
  };

  // Handle delete
  const handleDelete = (id: string) => {
    setTranscripts(transcripts.filter(transcript => transcript.id !== id));
  };

  // Handle process
  const handleProcess = (id: string) => {
    setTranscripts(transcripts.map(transcript => 
      transcript.id === id 
        ? { ...transcript, status: 'processed' } 
        : transcript
    ));
  };

  return (
    <SecretaryDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Transcript Processing
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Upload student transcripts to process graduation requirements. The system will automatically check 
            if students meet all graduation criteria.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          )}
          
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ flexGrow: 1 }}
              disabled={processing}
            >
              Select Transcript PDF
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            
            <Button
              variant="contained"
              startIcon={processing ? <LinearProgress sx={{ width: 24 }} /> : <CheckCircleIcon />}
              onClick={handleUpload}
              disabled={!file || processing}
              sx={{ flexGrow: 1 }}
            >
              {processing ? 'Processing...' : 'Upload Transcript'}
            </Button>
          </Box>
          
          {file && (
            <Box sx={{ mb: 3 }}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between' 
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PdfIcon color="error" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </Typography>
                </Box>
                <IconButton onClick={() => setFile(null)}>
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Box>
          )}
        </Paper>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Uploaded Transcripts
          </Typography>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Upload Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transcripts.map((transcript) => (
                  <TableRow key={transcript.id}>
                    <TableCell>{transcript.studentId}</TableCell>
                    <TableCell>{transcript.studentName}</TableCell>
                    <TableCell>{transcript.department}</TableCell>
                    <TableCell>{transcript.uploadDate}</TableCell>
                    <TableCell>
                      <Chip 
                        label={transcript.status} 
                        size="small"
                        color={
                          transcript.status === 'pending' 
                            ? 'warning' 
                            : transcript.status === 'processed' 
                              ? 'success' 
                              : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {transcript.status === 'pending' && (
                          <Button 
                            size="small" 
                            variant="outlined"
                            onClick={() => handleProcess(transcript.id)}
                          >
                            Process
                          </Button>
                        )}
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(transcript.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {transcripts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      No transcripts uploaded yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </SecretaryDashboardLayout>
  );
};

export default TranscriptProcessingPage; 