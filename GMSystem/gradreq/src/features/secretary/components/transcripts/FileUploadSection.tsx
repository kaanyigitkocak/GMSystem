import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface FileUploadSectionProps {
  file: File | null;
  processing: boolean;
  successMessage: string;
  errorMessage: string;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onClearFile: () => void;
  onClearSuccessMessage: () => void;
  onClearErrorMessage: () => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  file,
  processing,
  successMessage,
  errorMessage,
  onFileChange,
  onUpload,
  onClearFile,
  onClearSuccessMessage,
  onClearErrorMessage,
}) => {
  return (
    <Paper sx={{ p: 3, mb: 3, width: '100%' }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Transcript Processing
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Upload student transcripts to process graduation requirements. The system will automatically check 
        if students meet all graduation criteria.
      </Typography>
      
      <Typography variant="body2" component="div" sx={{ mb: 2, color: 'text.secondary' }}>
        <strong>Supported formats:</strong>
        <ul>
          <li>PDF - İzmir Yüksek Teknoloji Enstitüsü transcript format</li>
          <li>CSV - For bulk import with proper headers</li>
        </ul>
        PDF transcripts will be automatically parsed to extract student information, courses, and grades.
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Alert Messages */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={onClearSuccessMessage}>
          {successMessage}
        </Alert>
      )}
      
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={onClearErrorMessage}>
          {errorMessage}
          {file && (
            <Button 
              color="inherit" 
              size="small" 
              onClick={onClearFile} 
              sx={{ ml: 2 }}
            >
              Clear Selected File
            </Button>
          )}
        </Alert>
      )}
      
      {/* Upload Controls */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2, 
        mb: 3,
        width: '100%'
      }}>
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{ flex: 1, minHeight: '48px' }}
          disabled={processing}
        >
          Select Transcript File
          <input
            type="file"
            accept=".pdf,.csv"
            hidden
            onChange={onFileChange}
            key={file ? 'file-selected' : 'no-file'}
          />
        </Button>
        
        <Button
          variant="contained"
          startIcon={processing ? <LinearProgress sx={{ width: 24 }} /> : <CheckCircleIcon />}
          onClick={onUpload}
          disabled={!file || processing}
          sx={{ flex: 1, minHeight: '48px' }}
        >
          {processing ? 'Processing...' : 'Upload Transcript'}
        </Button>
      </Box>
    </Paper>
  );
};

export default FileUploadSection; 