import { Paper, Typography, Grid as MuiGrid, Button, Alert, Snackbar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import StartGraduationProcessDialog from './StartGraduationProcessDialog';
import { startGraduationProcess } from '../services';

const Grid = MuiGrid as any;

const QuickActions = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStartGraduationProcess = async (academicTerm: string) => {
    try {
      await startGraduationProcess(academicTerm);
      setSuccessMessage(`Graduation process started successfully for ${academicTerm}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to start graduation process';
      setErrorMessage(errorMsg);
      throw error; // Re-throw to let dialog handle it
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setDialogOpen(true)}
              sx={{
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                textTransform: 'none'
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 40 }} />
              <Typography variant="body1">
                Start Graduation Process
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate('/student-affairs/approval-ranking')}
              sx={{
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                textTransform: 'none'
              }}
            >
              <SchoolIcon sx={{ fontSize: 40 }} />
              <Typography variant="body1">
                Approval & Ranking
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="info"
              fullWidth
              onClick={() => navigate('/student-affairs/upload-graduation-decisions')}
              sx={{
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                textTransform: 'none'
              }}
            >
              <UploadFileIcon sx={{ fontSize: 40 }} />
              <Typography variant="body1">
                Upload Decisions
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{
                height: '120px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                textTransform: 'none'
              }}
            >
              <EmailIcon sx={{ fontSize: 40 }} />
              <Typography variant="body1">
                Send Notifications
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <StartGraduationProcessDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleStartGraduationProcess}
      />

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuickActions; 