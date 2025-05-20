import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, Alert, Link, Stack, Grid } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { createUniversityRanking, getUniversityRankingResult, getSystemFacultyRankings } from '../services/studentAffairsService';
import type { UniversityRankingResult, SystemFacultyRanking } from '../types';

const RankingsAndCertificatesPage = () => {
  const [systemFiles, setSystemFiles] = useState<SystemFacultyRanking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [result, setResult] = useState<UniversityRankingResult | null>(null);

  useEffect(() => {
    getSystemFacultyRankings().then(setSystemFiles);
    getUniversityRankingResult().then(setResult);
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await createUniversityRanking();
      setResult(res);
      setSuccess('University ranking and certificate files generated successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to generate files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Rankings & Certificates</Typography>
      <Grid container spacing={3}>
        {/* University Rankings Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>University Rankings</Typography>
            <Typography sx={{ mb: 2 }}>Generate university-wide rankings and certificate lists based on available faculty rankings.</Typography>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Faculty Rankings:</Typography>
            <List>
              {systemFiles.length === 0 && <ListItem><ListItemText primary="No faculty rankings available." /></ListItem>}
              {systemFiles.map(f => (
                <ListItem key={f.id}>
                  <ListItemText
                    primary={f.facultyName}
                    secondary={f.fileName ? (
                      <Link href={f.fileUrl} target="_blank" rel="noopener" underline="hover">
                        {f.fileName}
                      </Link>
                    ) : 'No ranking file available.'}
                  />
                </ListItem>
              ))}
            </List>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerate}
              disabled={loading || systemFiles.length === 0}
              startIcon={<DownloadIcon />}
              sx={{ mt: 2 }}
            >
              Create University Rankings
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            {result && (
              <Box sx={{ mt: 3 }}>
                <Alert severity="success">
                  <div>Files are ready:</div>
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Link href={result.honorsFileUrl} download={result.honorsFileName} underline="hover" fontWeight="bold">
                      Download Honors List
                    </Link>
                    <Link href={result.highHonorsFileUrl} download={result.highHonorsFileName} underline="hover" fontWeight="bold">
                      Download High Honors List
                    </Link>
                  </Stack>
                </Alert>
              </Box>
            )}
          </Paper>
        </Grid>
        {/* Certificates Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Certificates</Typography>
            {result ? (
              <Stack direction="row" spacing={2}>
                <Link href={result.honorsFileUrl} download={result.honorsFileName} underline="hover" fontWeight="bold">
                  Download Honors Certificate List
                </Link>
                <Link href={result.highHonorsFileUrl} download={result.highHonorsFileName} underline="hover" fontWeight="bold">
                  Download High Honors Certificate List
                </Link>
              </Stack>
            ) : (
              <Typography color="text.secondary">No certificate files generated yet.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RankingsAndCertificatesPage; 