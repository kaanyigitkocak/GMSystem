// filepath: /Users/eraykocabozdogan/Desktop/Eray/github/shut/GMSystem/gradreq/src/features/deansOffice/pages/FileUploadPage.tsx
import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Alert,
  AlertTitle,
  Divider,
  Chip,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Sync as SyncIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  InfoOutlined as InfoIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';
import type { FileStatus, UploadedFile, ValidationSummary } from '../services/deansOfficeService';
import { processCSVFiles, generateValidationSummary } from '../services/deansOfficeService';

const FileUploadPage = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [validationSummary, setValidationSummary] = useState<ValidationSummary | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (selectedFiles: File[]) => {
    // Filter for CSV files
    const csvFiles = selectedFiles.filter(file => 
      file.name.toLowerCase().endsWith('.csv')
    );
    
    if (csvFiles.length === 0) {
      setError('Please select CSV files only');
      return;
    }
    
    // Use the service to process the files
    const newFiles = processCSVFiles(csvFiles);
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Count invalid files
    const invalidFileCount = newFiles.filter(file => file.status === 'invalid').length;
    
    // Update validation summary using the service
    const summary = generateValidationSummary(newFiles);
    setValidationSummary(summary);
    
    // Set warnings based on validation
    const newWarnings: string[] = [];
    if (invalidFileCount > 0) {
      newWarnings.push(`${invalidFileCount} of ${newFiles.length} files have format issues`);
    }
    
    if (newWarnings.length > 0) {
      setWarnings(newWarnings);
    } else {
      setWarnings([]);
    }
    
    // Clear error if we have at least some valid files
    if (newFiles.length > invalidFileCount) {
      setError(null);
    } else if (invalidFileCount === newFiles.length) {
      setError('All uploaded files are invalid. Please check the file format.');
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    
    // Re-evaluate warnings after file removal
    setTimeout(() => {
      const invalidCount = files.filter(f => f.status === 'invalid').length;
      if (invalidCount === 0) {
        setWarnings([]);
      }
    }, 0);
  };

  const handleProcessFiles = () => {
    if (files.length === 0) {
      setError('Please upload at least one file');
      return;
    }
    
    // Count valid files
    const validFiles = files.filter(file => file.status === 'valid');
    
    if (validFiles.length === 0) {
      setError('No valid files to process. Please upload at least one valid file.');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    // Simulate processing delay
    setTimeout(() => {
      setUploading(false);
      
      // Check if we have special conditions to demonstrate
      if (validationSummary && validationSummary.eligibleStudents === 0) {
        setError('No eligible students found for ranking. Please check the files.');
      } else {
        setSuccess(true);
        // If we have warnings, show a different message
        if (warnings.length > 0) {
          setWarnings([...warnings, 'Files imported with warnings. Only valid files were processed.']);
        }
      }
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Get status icon based on file status
  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case 'valid':
        return <CheckCircleIcon color="success" />;
      case 'invalid':
        return <ErrorIcon color="error" />;
      case 'pending':
        return <CircularProgress size={20} />;
      default:
        return null;
    }
  };

  return (
    <DeansOfficeDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          File Upload
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload department ranking files to create faculty-wide rankings.
        </Typography>
      </Box>
      
      {/* Success alert */}
      {success && (
        <Alert 
          severity="success"
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setSuccess(false)}
            >
              <CheckCircleIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Success</AlertTitle>
          Files successfully imported for processing!
        </Alert>
      )}
      
      {/* Warning alerts */}
      {warnings.length > 0 && (
        <Alert 
          severity="warning"
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setWarnings([])}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Warnings</AlertTitle>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </Alert>
      )}
      
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
      
      {/* Validation summary */}
      {validationSummary && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            File Validation Summary
          </Typography>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn={{ xs: 'span 12', md: 'span 6' }}>
              <Typography variant="body2">
                <strong>Valid Files:</strong> {validationSummary.validFiles} of {validationSummary.validFiles + validationSummary.invalidFiles}
              </Typography>
              <Typography variant="body2">
                <strong>Total Students:</strong> {validationSummary.totalStudents}
              </Typography>
              <Typography variant="body2">
                <strong>Eligible for Ranking:</strong> {validationSummary.eligibleStudents} students
              </Typography>
            </Box>
            <Box gridColumn={{ xs: 'span 12', md: 'span 6' }}>
              {validationSummary.duplicateStudents && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WarningIcon color="warning" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="warning.main">
                    Duplicate students detected across departments
                  </Typography>
                </Box>
              )}
              {validationSummary.mixedGraduationStatus && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InfoIcon color="info" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="info.main">
                    Mixed graduation status found (only eligible students will be ranked)
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      )}
      
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
        <Box gridColumn={{ xs: 'span 12', md: 'span 7' }}>
          <Paper 
            sx={{ 
              p: 3, 
              minHeight: 300,
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center',
              border: dragActive ? '2px dashed' : '2px solid',
              borderColor: dragActive ? 'primary.main' : 'divider',
              backgroundColor: dragActive ? 'action.hover' : 'background.paper',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            
            <CloudUploadIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
            
            <Typography variant="h6" align="center" gutterBottom>
              Drag & Drop Department Ranking Files
            </Typography>
            
            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
              Or click to browse your files (CSV format only)
            </Typography>
            
            <Button variant="contained" startIcon={<CloudUploadIcon />}>
              Select CSV Files
            </Button>
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              Multiple files can be uploaded simultaneously
            </Typography>
          </Paper>
        </Box>
        
        <Box gridColumn={{ xs: 'span 12', md: 'span 5' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" paragraph>
                <strong>1.</strong> Collect department ranking CSV files from all departments.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>2.</strong> Drag and drop the files to the upload area or click to browse.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>3.</strong> Files should contain student rankings with their GPAs.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>4.</strong> After uploading all files, click the "Process Files" button.
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>5.</strong> The system will combine all rankings to create a faculty-wide ranking.
              </Typography>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="caption">
                  Expected CSV format: Student ID, Name, Department, GPA, Ranking, Graduation Status
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Box>
        
        <Box gridColumn="span 12">
          <Paper sx={{ p: 0, mt: 2 }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Uploaded Files
              </Typography>
              <Box>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <SyncIcon />}
                  onClick={handleProcessFiles}
                  disabled={files.length === 0 || uploading}
                  sx={{ mr: 2 }}
                >
                  {uploading ? 'Processing...' : 'Process Files'}
                </Button>
              </Box>
            </Box>
            
            <Divider />
            
            {files.length === 0 ? (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No files uploaded yet
                </Typography>
              </Box>
            ) : (
              <List>
                {files.map((file) => (
                  <ListItem key={file.id}>
                    <ListItemIcon>
                      {getStatusIcon(file.status)}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box component="span" sx={{ mr: 1 }}>{file.name}</Box>
                          {file.status === 'invalid' && (
                            <Chip 
                              label="Invalid Format" 
                              size="small" 
                              color="error" 
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <>
                          <Box component="span">
                            {`${formatFileSize(file.size)} • Uploaded ${file.uploaded.toLocaleTimeString()}`}
                          </Box>
                          {file.status === 'invalid' && file.issues && file.issues.length > 0 && (
                            <Box component="div" sx={{ color: 'error.main', fontSize: '0.8rem', mt: 0.5 }}>
                              Issues: {file.issues.join(', ')}
                            </Box>
                          )}
                        </>
                      }
                    />
                    <Chip
                      label={file.department}
                      size="small"
                      sx={{ mr: 2 }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(file.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </Box>
    </DeansOfficeDashboardLayout>
  );
};

export default FileUploadPage;
