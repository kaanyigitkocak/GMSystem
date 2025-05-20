import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  List,
  ListItem,
  Button,
  Stack,
  Snackbar,
  Alert
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import StudentAffairsDashboardLayout from '../layout/StudentAffairsDashboardLayout';

const departments = [
  'Physics',
  'Photonics',
  'Chemistry',
  'Mathematics',
  'Molecular Biology and Genetics',
  'Computer Engineering',
  'Bioengineering',
  'Environmental Engineering',
  'Energy Systems Engineering',
  'Electrical-Electronics Engineering',
  'Food Engineering',
  'Civil Engineering',
  'Mechanical Engineering',
  'Materials Science and Engineering',
  'Chemical Engineering',
  'Industrial Design',
  'Architecture',
  'City and Regional Planning'
];

const UploadGraduationDecisionsPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({});
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleFileUpload = (department: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [department]: file
      }));
      console.log(`File uploaded for ${department}:`, file);
      
      // Show success notification
      setNotification({
        open: true,
        message: `File uploaded successfully for ${department}`,
        severity: 'success'
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <StudentAffairsDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Upload Graduation Decisions
        </Typography>
        
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Select a file for each department to upload graduation decisions.
          </Typography>

          <List>
            {departments.map((department) => (
              <ListItem 
                key={department}
                sx={{ 
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  py: 2
                }}
              >
                <Stack 
                  direction="row" 
                  spacing={2} 
                  alignItems="center" 
                  width="100%"
                >
                  <Typography sx={{ flex: 1 }}>
                    {department}
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                    sx={{ minWidth: '150px' }}
                  >
                    {uploadedFiles[department] ? 'Change File' : 'Upload File'}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileUpload(department, e)}
                      accept=".xlsx,.xls,.csv"
                    />
                  </Button>
                  {uploadedFiles[department] && (
                    <Typography variant="body2" color="text.secondary">
                      {uploadedFiles[department]?.name}
                    </Typography>
                  )}
                </Stack>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </StudentAffairsDashboardLayout>
  );
};

export default UploadGraduationDecisionsPage;
