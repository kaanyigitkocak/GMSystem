import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, TextField } from '@mui/material';
import { sendGraduationMail } from '../services/studentAffairsService';

const SendGraduationMailPage = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [mailContent, setMailContent] = useState('This mail will be sent to all department secretaries to initiate the graduation process.');

  const handleSendMail = async () => {
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      await sendGraduationMail(mailContent);
      setSuccess('Graduation mail has been sent to all department secretaries.');
    } catch (err) {
      setError('Failed to send mail.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Send Graduation Mail</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography sx={{ mb: 2 }}>
          This mail will be sent to all department secretaries to initiate the graduation process.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSendMail} disabled={loading} sx={{ mb: 2 }}>
          {loading ? 'Sending...' : 'Send Mail'}
        </Button>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Mail Content</Typography>
          <TextField
            multiline
            minRows={6}
            fullWidth
            value={mailContent}
            onChange={e => setMailContent(e.target.value)}
            variant="outlined"
            placeholder="Edit the mail content here..."
          />
        </Box>
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default SendGraduationMailPage; 