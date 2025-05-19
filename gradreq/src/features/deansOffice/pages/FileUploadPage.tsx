import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
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
  InsertDriveFile as FileIcon,
  CheckCircle as CheckCircleIcon,
  Sync as SyncIcon
} from '@mui/icons-material';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  department: string;
  uploaded: Date;
}

const FileUploadPage = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
    
    // Map files to our data structure
    const newFiles = csvFiles.map(file => {
      // Extract department name from filename (assuming format like "department_ranking.csv")
      const departmentName = file.name.split('_')[0] || 'Unknown';
      
      return {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        department: departmentName.charAt(0).toUpperCase() + departmentName.slice(1),
        uploaded: new Date()
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    setError(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleProcessFiles = () => {
    if (files.length === 0) {
      setError('Please upload at least one file');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    // Simulate processing delay
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      
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
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
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
        </Grid>
        
        <Grid item xs={12} md={5}>
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
                  Expected CSV format: Student ID, Name, Department, GPA, Ranking
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
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
                      <FileIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={file.name} 
                      secondary={`${formatFileSize(file.size)} • Uploaded ${file.uploaded.toLocaleTimeString()}`} 
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
        </Grid>
      </Grid>
    </DeansOfficeDashboardLayout>
  );
};

export default FileUploadPage;