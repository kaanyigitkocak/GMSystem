import { 
  Box, 
  Typography, 
  Paper, 
  Grid as MuiGrid, 
  Card, 
  CardContent, 
  CardHeader, 
  List, 
  ListItem, 
  ListItemText, 
  Button,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material';
import { Refresh, PlayArrow, ClearAll } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSecretaryDashboard } from '../hooks/useSecretaryDashboard';

const Grid = MuiGrid as any;

const SecretaryDashboardPage = () => {
  const navigate = useNavigate();
  const { 
    dashboardData, 
    loading, 
    error,
    eligibilityData, 
    eligibilityLoading, 
    performingChecks,
    refetch, 
    refreshEligibility,
    performEligibilityChecksForMissingStudents,
    refreshEligibilityData
  } = useSecretaryDashboard();

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePerformEligibilityChecks = async () => {
    try {
      const result = await performEligibilityChecksForMissingStudents();
      
      if (result.processedStudents.length > 0) {
        setSuccessMessage(
          `Eligibility checks completed for ${result.processedStudents.length} students. Results are being processed...`
        );
      } else {
        setSuccessMessage('All students already have eligibility check results.');
      }
    } catch (error) {
      setErrorMessage('Failed to perform eligibility checks. Please try again.');
      console.error('Failed to perform eligibility checks:', error);
    }
  };

  const handleRefreshWithClearCache = async () => {
    try {
      await refreshEligibilityData(true);
      setSuccessMessage('Eligibility data refreshed successfully.');
    } catch (error) {
      setErrorMessage('Failed to refresh eligibility data. Please try again.');
      console.error('Failed to refresh eligibility data:', error);
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage('');
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage('');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={refetch}>
            Retry
          </Button>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          No dashboard data available
        </Alert>
      </Box>
    );
  }

  const { stats, alerts, notifications, pendingRequests } = dashboardData;

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Secretary Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Welcome, you can manage all department students' graduation process and view important updates here.
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <strong>Tip:</strong> Use the sidebar to process transcripts, manage approval rankings, and review all department students.
        </Alert>
        {eligibilityLoading && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <strong>Loading eligibility data...</strong> Please wait while we fetch existing graduation requirement results.
          </Alert>
        )}
        {performingChecks && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <strong>Running eligibility checks...</strong> Please wait while we check graduation requirements for students without existing results.
          </Alert>
        )}
      </Box>
      
      <Grid container spacing={3}>
        {/* Example Announcement */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Announcement
            </Typography>
            <Typography>
              The graduation review period for Spring 2025 has started. Please process student transcripts and approve eligible candidates.
            </Typography>
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{ 
              height: '100%',
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Typography variant="h3" color="primary" gutterBottom>
              {stats.totalStudents}
            </Typography>
            <Typography variant="body1">Total Students</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{ 
              height: '100%',
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Typography variant="h3" color="warning.main" gutterBottom>
              {stats.pendingGraduation}
            </Typography>
            <Typography variant="body1">Pending Graduation</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{ 
              height: '100%',
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Typography variant="h3" color="success.main" gutterBottom>
              {stats.manualCheckRequests}
            </Typography>
            <Typography variant="body1">Manual Check Requests</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={3}>
          <Paper
            elevation={2}
            sx={{ 
              height: '100%',
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}
          >
            <Typography variant="h3" color="info.main" gutterBottom>
              {stats.totalPetitions}
            </Typography>
            <Typography variant="body1">Total Petitions</Typography>
          </Paper>
        </Grid>

        {/* Eligibility Statistics */}
        {eligibilityData && (
          <>
            <Grid item xs={12} md={3}>
              <Paper
                elevation={2}
                sx={{ 
                  height: '100%',
                  p: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h3" color="success.main" gutterBottom>
                  {eligibilityData.eligibleCount}
                </Typography>
                <Typography variant="body1">Eligible Students</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Paper
                elevation={2}
                sx={{ 
                  height: '100%',
                  p: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h3" color="error.main" gutterBottom>
                  {eligibilityData.ineligibleCount}
                </Typography>
                <Typography variant="body1">Ineligible Students</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Paper
                elevation={2}
                sx={{ 
                  height: '100%',
                  p: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h3" color="warning.main" gutterBottom>
                  {eligibilityData.pendingCheckCount}
                </Typography>
                <Typography variant="body1">Pending Checks</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={3}>
              <Paper
                elevation={2}
                sx={{ 
                  height: '100%',
                  p: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Tooltip title="Refresh Eligibility Data">
                    <IconButton 
                      onClick={refreshEligibility} 
                      disabled={eligibilityLoading || performingChecks}
                      color="primary"
                      size="small"
                    >
                      <Refresh />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Clear Cache & Refresh">
                    <IconButton 
                      onClick={handleRefreshWithClearCache} 
                      disabled={eligibilityLoading || performingChecks}
                      color="secondary"
                      size="small"
                    >
                      <ClearAll />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="body2">Refresh Data</Typography>
              </Paper>
            </Grid>
          </>
        )}

        {/* Eligibility Actions */}
        {eligibilityData && eligibilityData.pendingCheckCount > 0 && (
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {eligibilityData.pendingCheckCount} students don't have eligibility check results.
                  </Typography>
                  <Typography variant="body2">
                    Click the button below to perform eligibility checks for students without existing results.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handlePerformEligibilityChecks}
                  disabled={performingChecks || eligibilityLoading}
                  startIcon={performingChecks ? <CircularProgress size={16} /> : <PlayArrow />}
                  sx={{ ml: 2, minWidth: '200px' }}
                >
                  {performingChecks ? 'Running Checks...' : 'Perform Eligibility Check'}
                    </Button>
              </Box>
            </Alert>
          </Grid>
        )}

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                onClick={() => navigate('/secretary/transcripts')}
              >
                Process Transcripts
              </Button>
              <Button 
                variant="contained" 
                onClick={() => navigate('/secretary/approval-ranking')}
              >
                Approval & Ranking
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => navigate('/secretary/notifications')}
              >
                Notifications
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/secretary/export-graduates')}
              >
                Export Graduates
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Pending Requests */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader 
              title="Pending Requests" 
            />
            <CardContent>
              <List>
                {pendingRequests.map((request, index) => (
                  <Box key={request.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${request.studentName} - ${request.requestType}`}
                        secondary={`Request Date: ${request.date}`}
                      />
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip 
                          label={request.priority} 
                          size="small"
                          color={
                            request.priority === 'high' ? 'error' : 
                            request.priority === 'medium' ? 'warning' : 'default'
                          }
                        />
                        <Button variant="outlined" size="small">
                          Review
                        </Button>
                      </Box>
                    </ListItem>
                    {index < pendingRequests.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Alerts & Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Alerts
            </Typography>
            <Box sx={{ mb: 2 }}>
              {alerts.map(alert => (
                <Alert 
                  key={alert.id} 
                  severity={alert.type || 'info'} 
                  sx={{ mb: 1 }}
                >
                  {alert.message}
                </Alert>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Recent Notifications & Tasks */}
        <Grid item xs={12}>
          <Card>
            <CardHeader 
              title="Recent Notifications & Tasks" 
            />
            <CardContent>
              <List>
                {notifications.map(notification => (
                  <ListItem key={notification.id} divider>
                    <ListItemText 
                      primary={notification.title} 
                      secondary={`${notification.message} - ${notification.date}`}
                    />
                    {!notification.read && (
                      <Chip label="New" color="primary" size="small" />
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Success Snackbar */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
      >
        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SecretaryDashboardPage; 
