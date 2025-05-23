import { Box, Paper, Typography, Snackbar, Alert } from '@mui/material';
import StudentAffairsDashboardLayout from '../layout/StudentAffairsDashboardLayout';
import { useUploadGraduationDecisions } from '../hooks/useUploadGraduationDecisions';
import DepartmentUploadList from '../components/DepartmentUploadList';

const UploadGraduationDecisionsPage = () => {
  const {
    uploadedFiles,
    notification,
    handleFileUpload,
    handleCloseNotification
  } = useUploadGraduationDecisions();

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

          <DepartmentUploadList 
            uploadedFiles={uploadedFiles}
            onFileUpload={handleFileUpload}
          />
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
