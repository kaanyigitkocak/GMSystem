import React, { useState, useEffect } from 'react';
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
  Alert,
  IconButton,
  Divider,
  Chip,
  LinearProgress,
  CircularProgress,
  Menu,
  MenuItem
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  PictureAsPdf as PdfIcon,
  TableChart as TableChartIcon,
  FileDownload as FileDownloadIcon
} from '@mui/icons-material';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';
import { 
  getTranscripts, 
  uploadTranscript, 
  deleteTranscript, 
  processTranscript,
  exportEligibleGraduatesCSV,
  exportEligibleGraduatesPDF
} from '../services/secretaryService';
import type { TranscriptData } from '../types';

/**
 * TranscriptProcessingPage Component
 * 
 * Allows secretaries to upload, view, process, and manage student transcripts.
 * Provides functionality to upload PDF or CSV files, process transcripts,
 * and export eligible graduates list.
 */
const TranscriptProcessingPage = () => {
  // State management
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transcripts, setTranscripts] = useState<TranscriptData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [exportMenuAnchorEl, setExportMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  // Derived state
  const exportMenuOpen = Boolean(exportMenuAnchorEl);
  const hasEligibleGraduates = transcripts.some(t => t.status === 'processed');

  /**
   * Loads transcript data when component mounts
   */
  useEffect(() => {
    fetchTranscripts();
  }, []);

  /**
   * Fetches transcript data from the service
   */
  const fetchTranscripts = async () => {
    try {
      setLoading(true);
      const data = await getTranscripts();
      setTranscripts(data);
    } catch (error) {
      console.error('Error fetching transcripts:', error);
      setErrorMessage('Failed to load transcripts');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles file selection change
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Clear any previous messages
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!event.target.files || event.target.files.length === 0) {
      console.log('No file selected');
      setFile(null);
      return;
    }
    
    const selectedFile = event.target.files[0];
    console.log('File selected:', selectedFile.name, selectedFile.type);
    
    // Get the file extension
    const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
    
    // Check if file is PDF or CSV
    if (fileType !== 'pdf' && fileType !== 'csv') {
      setErrorMessage('Please upload a PDF or CSV file.');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  };

  /**
   * Handles file upload process
   */
  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    try {
      setProcessing(true);
      setErrorMessage(''); 
      
      console.log('Starting upload for file:', file.name);
      
      // Call the upload service
      const newTranscript = await uploadTranscript(file);
      console.log('Upload successful, received:', newTranscript);
      
      // After upload, refresh the transcripts list
      const updatedTranscripts = await getTranscripts();
      console.log('Fetched updated transcript list:', updatedTranscripts);
      setTranscripts(updatedTranscripts);
      
      // Reset file input state
      setFile(null);
      
      // Show success message
      setSuccessMessage(`${file.name} uploaded successfully.`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error uploading transcript:', error);
      setErrorMessage(`Failed to upload transcript: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Don't reset file on error so user can try again
    } finally {
      setProcessing(false);
    }
  };

  /**
   * Handles transcript deletion
   */
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteTranscript(id);
      setTranscripts(transcripts.filter(transcript => transcript.id !== id));
      setSuccessMessage('Transcript deleted successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting transcript:', error);
      setErrorMessage('Failed to delete transcript.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles transcript processing
   */
  const handleProcess = async (id: string) => {
    try {
      setLoading(true);
      const updatedTranscript = await processTranscript(id);
      setTranscripts(transcripts.map(transcript => 
        transcript.id === id ? updatedTranscript : transcript
      ));
      setSuccessMessage('Transcript processed successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error processing transcript:', error);
      setErrorMessage('Failed to process transcript.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles export menu open
   */
  const handleExportMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setExportMenuAnchorEl(event.currentTarget);
  };

  /**
   * Handles export menu close
   */
  const handleExportMenuClose = () => {
    setExportMenuAnchorEl(null);
  };

  /**
   * Handles CSV download
   */
  const handleDownloadCSV = async () => {
    try {
      setDownloading(true);
      handleExportMenuClose();
      
      const csvContent = await exportEligibleGraduatesCSV();
      
      // Create a blob and download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Set download attributes
      link.href = url;
      link.setAttribute('download', `eligible-graduates-${new Date().toISOString().split('T')[0]}.csv`);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSuccessMessage('Eligible graduates CSV downloaded successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error downloading CSV:', error);
      setErrorMessage('Failed to download CSV.');
    } finally {
      setDownloading(false);
    }
  };

  /**
   * Handles PDF download
   */
  const handleDownloadPDF = async () => {
    try {
      setDownloading(true);
      handleExportMenuClose();
      
      const pdfBlob = await exportEligibleGraduatesPDF();
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      
      // Set download attributes
      link.href = url;
      link.setAttribute('download', `eligible-graduates-${new Date().toISOString().split('T')[0]}.pdf`);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setSuccessMessage('Eligible graduates PDF downloaded successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setErrorMessage('Failed to download PDF.');
    } finally {
      setDownloading(false);
    }
  };

  /**
   * Renders file preview if a file is selected
   */
  const renderFilePreview = () => {
    if (!file) return null;
    
    return (
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
            {file.name.endsWith('.csv') ? (
              <TableChartIcon color="primary" sx={{ mr: 1 }} />
            ) : (
              <PdfIcon color="error" sx={{ mr: 1 }} />
            )}
            <Typography variant="body2">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Typography>
          </Box>
          <IconButton onClick={() => setFile(null)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      </Box>
    );
  };

  /**
   * Renders transcript table or loading spinner
   */
  const renderTranscriptTable = () => {
    if (loading && transcripts.length === 0) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    
    return (
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
                        disabled={loading}
                      >
                        Process
                      </Button>
                    )}
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(transcript.id)}
                      disabled={loading}
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
    );
  };

  return (
    <SecretaryDashboardLayout>
      <Box sx={{ mb: 4 }}>
        {/* Upload Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Transcript Processing
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Upload student transcripts to process graduation requirements. The system will automatically check 
            if students meet all graduation criteria.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Alert Messages */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          )}
          
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage('')}>
              {errorMessage}
              {file && (
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => setFile(null)} 
                  sx={{ ml: 2 }}
                >
                  Clear Selected File
                </Button>
              )}
            </Alert>
          )}
          
          {/* Upload Controls */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ flexGrow: 1 }}
              disabled={processing}
            >
              Select Transcript File
              <input
                type="file"
                accept=".pdf,.csv"
                hidden
                onChange={handleFileChange}
                key={file ? 'file-selected' : 'no-file'}
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
          
          {/* File Preview */}
          {renderFilePreview()}
        </Paper>
        
        {/* Transcripts List */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="medium">
              Uploaded Transcripts
            </Typography>
            
            {/* Export Button */}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportMenuOpen}
              disabled={downloading || !hasEligibleGraduates}
            >
              {downloading ? 'Downloading...' : 'Download Eligible Graduates'}
            </Button>
            
            {/* Export Menu */}
            <Menu
              anchorEl={exportMenuAnchorEl}
              open={exportMenuOpen}
              onClose={handleExportMenuClose}
            >
              <MenuItem onClick={handleDownloadCSV}>Download as CSV</MenuItem>
              <MenuItem onClick={handleDownloadPDF}>Download as PDF</MenuItem>
            </Menu>
          </Box>
          
          {/* Transcript Table */}
          {renderTranscriptTable()}
        </Paper>
      </Box>
    </SecretaryDashboardLayout>
  );
};

export default TranscriptProcessingPage; 