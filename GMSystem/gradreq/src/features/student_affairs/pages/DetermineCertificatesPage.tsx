import { Box, Paper, Typography, Button, Stack, Snackbar, Alert } from '@mui/material';
import { useDetermineCertificates } from '../hooks/useDetermineCertificates';
import CertificatesTable from '../components/CertificatesTable';

const DetermineCertificatesPage = () => {
  const {
    combinedRankings,
    filesLoaded,
    showRankings,
    notifications,
    fileInputRef,
    handleLoadRankings,
    handleFileChange,
    handleDetermineCertificates,
    handleExportToExcel,
    handleCloseSuccess,
    handleCloseError,
    handleCloseDetermineSuccess,
    handleCloseExportSuccess
  } = useDetermineCertificates();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Determine Certificates
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          Click the 'Load Student Rankings' button to retrieve and display the student ranking data required for determining the student certificates.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleLoadRankings}
          >
            Load Student Rankings
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

      {showRankings && (
        <CertificatesTable 
          combinedRankings={combinedRankings}
          onExport={handleExportToExcel}
        />
      )}

      {/* Notifications */}
      <Snackbar 
        open={notifications.showSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          File(s) loaded successfully!
        </Alert>
      </Snackbar>

      <Snackbar 
        open={notifications.showError} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {notifications.errorMessage}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={notifications.showDetermineSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseDetermineSuccess}
      >
        <Alert onClose={handleCloseDetermineSuccess} severity="success" sx={{ width: '100%' }}>
          Certificates determined successfully!
        </Alert>
      </Snackbar>

      <Snackbar 
        open={notifications.showExportSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseExportSuccess}
      >
        <Alert onClose={handleCloseExportSuccess} severity="success" sx={{ width: '100%' }}>
          Data exported successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DetermineCertificatesPage;
