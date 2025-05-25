import { 
  Box, 
  Typography, 
  Paper, 
  Grid as MuiGrid, 
  Button,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Snackbar
} from '@mui/material';
import { Refresh, PlayArrow, ClearAll, BarChart, People, AssignmentTurnedIn, HourglassEmpty } from '@mui/icons-material';
import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthContext';
import { useDeansOfficeEligibility } from '../contexts/DeansOfficeEligibilityContext';

const Grid = MuiGrid as any; // MuiGrid type issue workaround

const DeansOfficeDashboardPage = () => {
  const { user } = useAuth();
  const {
    eligibilityData,
    loading: eligibilityLoading,
    performingChecks,
    error: eligibilityError,
    fetchEligibilityData,
    performEligibilityChecksForMissingStudents,
    refreshEligibilityData,
  } = useDeansOfficeEligibility();

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Yeni API artık facultyId'yi otomatik olarak GetFromAuth'dan alıyor
    // Bu yüzden sadece user varsa data fetch'i başlatıyoruz
    if (user && !eligibilityData && !eligibilityLoading) {
      console.log(`[DeansOfficeDashboardPage] User authenticated, fetching eligibility data...`);
      // fetchEligibilityData artık facultyId parametresi almıyor, otomatik olarak GetFromAuth'dan alıyor
      fetchEligibilityData()
        .then(() => {
          console.log(`[DeansOfficeDashboardPage] Eligibility data fetched successfully`);
        })
        .catch((error) => {
          console.error('[DeansOfficeDashboardPage] Failed to fetch eligibility data:', error);
          setErrorMessage('Failed to load eligibility data. Please check if you have proper faculty assignment.');
        });
    } else if (!user) {
      console.warn('[DeansOfficeDashboardPage] User not available yet.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, eligibilityData, eligibilityLoading, fetchEligibilityData]);

  const handlePerformEligibilityChecks = useCallback(async () => {
    try {
      // performEligibilityChecksForMissingStudents artık facultyId parametresi almıyor
      const result = await performEligibilityChecksForMissingStudents();
      if (result.processedStudents.length > 0) {
        setSuccessMessage(
          `Eligibility checks completed for ${result.processedStudents.length} students. Results are being processed...`
        );
      } else {
        setSuccessMessage(`All students in your faculty already have eligibility check results.`);
      }
    } catch (err: any) {
      setErrorMessage('Failed to perform eligibility checks. Please try again.');
      console.error('Failed to perform eligibility checks:', err);
    }
  }, [performEligibilityChecksForMissingStudents]);

  const handleRefreshWithClearCache = useCallback(async () => {
    try {
      // refreshEligibilityData artık facultyId parametresi almıyor
      await refreshEligibilityData(true);
      setSuccessMessage(`Eligibility data refreshed successfully.`);
    } catch (err: any) {
      setErrorMessage('Failed to refresh eligibility data. Please try again.');
      console.error('Failed to refresh eligibility data:', err);
    }
  }, [refreshEligibilityData]);
  
  const handleManualRefreshEligibility = useCallback(async () => {
    try {
      // fetchEligibilityData artık facultyId parametresi almıyor
      await fetchEligibilityData(false); // Don't force refresh from cache
      setSuccessMessage(`Eligibility data reloaded.`);
    } catch (err: any) {
      setErrorMessage('Failed to reload eligibility data. Please try again.');
      console.error('Failed to reload eligibility data:', err);
    }
  }, [fetchEligibilityData]);

  const handleCloseSuccessMessage = () => setSuccessMessage('');
  const handleCloseErrorMessage = () => setErrorMessage('');

  return (
    <>
      <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dean's Office Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {`Welcome, Dean ${user?.name || user?.email || 'User'}. Manage student graduation eligibility for your faculty.`}
      </Typography>
        
        {eligibilityLoading && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <strong>Loading eligibility data...</strong>
          </Alert>
        )}
        {performingChecks && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            <CircularProgress size={16} sx={{ mr: 1 }} />
            <strong>Running eligibility checks...</strong>
          </Alert>
        )}
         {eligibilityError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {`Error loading eligibility data: ${eligibilityError}`}
            <Button onClick={handleManualRefreshEligibility} size="small" sx={{ml:1}}>Retry</Button>
          </Alert>
        )}
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Faculty Overview
            </Typography>
            <Typography>
              Review and manage graduation eligibility for all students within your faculty.
            </Typography>
          </Paper>
        </Grid>

        {eligibilityData ? (
          <>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <People color="primary" sx={{ fontSize: 30, mb: 1 }} />
                <Typography variant="h5">{eligibilityData.studentsWithEligibility.length}</Typography>
                <Typography variant="body2">Total Students</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <AssignmentTurnedIn color="success" sx={{ fontSize: 30, mb: 1 }} />
                <Typography variant="h5">{eligibilityData.eligibleCount}</Typography>
                <Typography variant="body2">Eligible Students</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <HourglassEmpty color="error" sx={{ fontSize: 30, mb: 1 }} />
                <Typography variant="h5">{eligibilityData.ineligibleCount}</Typography>
                <Typography variant="body2">Ineligible Students</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <BarChart color="warning" sx={{ fontSize: 30, mb: 1 }} />
                <Typography variant="h5">{eligibilityData.pendingCheckCount}</Typography>
                <Typography variant="body2">Pending Checks</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
                 <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Tooltip title="Refresh Eligibility Data (from cache)">
                      <span>
                        <IconButton 
                          onClick={handleManualRefreshEligibility} 
                          disabled={eligibilityLoading || performingChecks}
                          color="primary"
                          size="small"
                        >
                          <Refresh />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Clear Cache & Full Refresh">
                      <span>
                        <IconButton 
                          onClick={handleRefreshWithClearCache} 
                          disabled={eligibilityLoading || performingChecks}
                          color="secondary"
                          size="small"
                        >
                          <ClearAll />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                  <Typography variant="caption">Refresh Data</Typography>
              </Paper>
            </Grid>
          </>
        ) : (
          !eligibilityLoading && (
            <Grid item xs={12}>
              <Alert severity="info">
                {eligibilityError 
                  ? 'Failed to load eligibility data. Please ensure you have proper faculty assignment and try refreshing.' 
                  : 'Eligibility data is loading. If you have just logged in, please wait a moment.'
                }
              </Alert>
            </Grid>
          )
        )}

        {eligibilityData && eligibilityData.pendingCheckCount > 0 && (
          <Grid item xs={12}>
            <Alert severity="warning" sx={{ mt:2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {`${eligibilityData.pendingCheckCount} students in your faculty don't have eligibility check results.`}
                  </Typography>
                  <Typography variant="body2">
                    Click the button to perform eligibility checks for these students.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handlePerformEligibilityChecks}
                  disabled={performingChecks || eligibilityLoading}
                  startIcon={performingChecks ? <CircularProgress size={16} /> : <PlayArrow />}
                  sx={{ ml: 2, minWidth: '220px' }}
                >
                  {performingChecks ? 'Running Faculty Checks...' : 'Perform Faculty Checks'}
                </Button>
              </Box>
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt:1 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/deansoffice/approval-ranking"
                disabled={!eligibilityData}
              >
                Faculty Approval & Ranking
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeansOfficeDashboardPage;