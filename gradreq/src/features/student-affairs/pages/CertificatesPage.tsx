import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, Alert, IconButton, Stack, Checkbox, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import {
  uploadFacultyRankingFiles,
  getUploadedFacultyRankingFiles,
  removeFacultyRankingFile,
  createUniversityRanking,
  getUniversityRankingResult,
  getSystemFacultyRankings
} from '../services/studentAffairsService';
import type { FacultyRankingFile, UniversityRankingResult, SystemFacultyRanking } from '../types';

const CertificatesPage = () => {
  const [files, setFiles] = useState<FacultyRankingFile[]>([]);
  const [systemFiles, setSystemFiles] = useState<SystemFacultyRanking[]>([]);
  const [selectedSystemIds, setSelectedSystemIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [result, setResult] = useState<UniversityRankingResult | null>(null);

  useEffect(() => {
    getUploadedFacultyRankingFiles().then(setFiles);
    getUniversityRankingResult().then(setResult);
    getSystemFacultyRankings().then(setSystemFiles);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSuccess('');
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;
    setLoading(true);
    try {
      const uploaded = await uploadFacultyRankingFiles(Array.from(selected));
      setFiles(prev => [...prev, ...uploaded]);
      setSuccess('Files uploaded successfully.');
    } catch {
      setError('Failed to upload files.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    setLoading(true);
    setError('');
    try {
      await removeFacultyRankingFile(id);
      setFiles(await getUploadedFacultyRankingFiles());
    } catch {
      setError('Failed to remove file.');
    } finally {
      setLoading(false);
    }
  };

  const handleSystemSelect = (id: string) => {
    setSelectedSystemIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCreateCertificates = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await createUniversityRanking();
      setResult(res);
      setSuccess('Certificate lists generated successfully.');
    } catch (err: any) {
      setError(err.message || 'Failed to generate certificates.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Generate Certificates</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography sx={{ mb: 2 }}>
          Upload or select university ranking files to generate Honors and High Honors certificate lists.
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            disabled={loading}
          >
            Upload University Rankings
            <input
              type="file"
              accept=".csv,.xlsx,.xls,.pdf"
              multiple
              hidden
              onChange={handleFileUpload}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateCertificates}
            disabled={loading || (files.length === 0 && selectedSystemIds.length === 0)}
            startIcon={<DownloadIcon />}
          >
            Generate Certificates
          </Button>
        </Stack>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Uploaded Files:</Typography>
        <List>
          {files.length === 0 && <ListItem><ListItemText primary="No files uploaded yet." /></ListItem>}
          {files.map(f => (
            <ListItem key={f.id} secondaryAction={
              <IconButton edge="end" color="error" onClick={() => handleRemove(f.id)} disabled={loading}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={f.fileName} />
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>System University Rankings:</Typography>
        <List>
          {systemFiles.length === 0 && <ListItem><ListItemText primary="No system university rankings available." /></ListItem>}
          {systemFiles.map(f => (
            <ListItem key={f.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSystemIds.includes(f.id)}
                    onChange={() => handleSystemSelect(f.id)}
                    disabled={loading}
                  />
                }
                label={<span>{f.facultyName} (<a href={f.fileUrl} target="_blank" rel="noopener noreferrer">{f.fileName}</a>)</span>}
              />
            </ListItem>
          ))}
        </List>
        {result && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="success">
              <div>Certificate lists are ready:</div>
              <div>
                <a href={result.honorsFileUrl} download={result.honorsFileName} style={{ fontWeight: 'bold', marginRight: 16 }}>
                  Download Honors List
                </a>
                <a href={result.highHonorsFileUrl} download={result.highHonorsFileName} style={{ fontWeight: 'bold' }}>
                  Download High Honors List
                </a>
              </div>
            </Alert>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CertificatesPage; 