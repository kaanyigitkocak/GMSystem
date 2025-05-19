import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  IconButton
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';

// Define interface for certificate department
interface Department {
  id: string;
  name: string;
  completed: boolean;
  file: File | null;
}

const DisengagementCertificatesPage = () => {
  // List of departments that require disengagement certificates
  const initialDepartments: Department[] = [
    { id: 'library', name: 'Library', completed: true, file: null },
    { id: 'it', name: 'IT Department', completed: false, file: null },
    { id: 'student_affairs', name: 'Student Affairs', completed: false, file: null },
    { id: 'graduate_office', name: 'Graduate Office', completed: false, file: null },
    { id: 'sports_culture', name: 'Sports & Culture Department', completed: false, file: null }
  ];
  
  const [certificates, setCertificates] = useState<Department[]>(initialDepartments);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, deptId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }
    
    // Update certificate list
    setCertificates(prevCerts => 
      prevCerts.map(cert => 
        cert.id === deptId 
          ? { ...cert, file: file, completed: true } 
          : cert
      )
    );
    
    const deptName = certificates.find(c => c.id === deptId)?.name || 'department';
    setSuccessMessage(`Certificate uploaded successfully for ${deptName}`);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Handle file delete
  const handleDeleteFile = (deptId: string) => {
    setCertificates(prevCerts => 
      prevCerts.map(cert => 
        cert.id === deptId 
          ? { ...cert, file: null, completed: false } 
          : cert
      )
    );
  };
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Disengagement Certificates</Typography>
        <Typography variant="body1" paragraph>
          You need to upload disengagement certificates from each department below to complete 
          your graduation process. These certificates confirm that you have no outstanding 
          obligations with the respective departments.
        </Typography>
        
        {successMessage && (
          <Alert 
            severity="success" 
            sx={{ mb: 2 }}
            onClose={() => setSuccessMessage('')}
          >
            {successMessage}
          </Alert>
        )}
        
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          {certificates.map((dept) => (
            <Grid sx={{ width: { xs: '100%', md: '50%' } }} key={dept.id}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column',
                  bgcolor: dept.completed ? 'rgba(76, 175, 80, 0.04)' : 'transparent',
                  borderColor: dept.completed ? 'success.light' : 'divider'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  {dept.completed ? (
                    <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  ) : (
                    <DescriptionIcon color="action" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {dept.name}
                  </Typography>
                </Box>
                
                {dept.file ? (
                  <Box sx={{ mt: 2 }}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 1.5, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        bgcolor: 'rgba(0, 0, 0, 0.02)'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PdfIcon color="error" sx={{ mr: 1 }} />
                        <Typography variant="body2" noWrap sx={{ maxWidth: 180 }}>
                          {dept.file.name}
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={() => handleDeleteFile(dept.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  </Box>
                ) : (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ width: '100%' }}
                    >
                      Upload Certificate
                      <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={(e) => handleFileUpload(e, dept.id)}
                      />
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" gutterBottom>Certificate Requirements:</Typography>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="File Format: PDF only" 
                secondary="Each certificate must be uploaded in PDF format" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Official Stamp Required" 
                secondary="Make sure each certificate includes the official department stamp and signature" 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Verification Process" 
                secondary="Uploaded certificates will be verified by the Student Affairs Office" 
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default DisengagementCertificatesPage; 