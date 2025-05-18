import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

interface CodeVerificationFormProps {
  email: string;
  onVerified: () => void;
}

const CodeVerificationForm = ({ email, onVerified }: CodeVerificationFormProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  
  // Verify the code
  const handleVerifyCode = () => {
    setVerificationError(null);
    
    if (!verificationCode.trim()) {
      setVerificationError('Verification code is required');
      return;
    }
    
    // Simple validation for verification code
    if (!/^\d+$/.test(verificationCode)) {
      setVerificationError('Verification code must contain numbers only');
      return;
    }
    
    setVerifying(true);
    
    // Simulate API verification
    setTimeout(() => {
      console.log('Verifying code:', verificationCode);
      setVerifying(false);
      
      // For demo, "123456" is valid
      if (verificationCode === '123456') {
        onVerified();
      } else {
        setVerificationError('Invalid verification code. Please try again.');
      }
    }, 1000);
  };
  
  return (
    <>
      <Typography variant="body1" gutterBottom>
        A verification code has been sent to {email}.
        Please enter the code below.
      </Typography>
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="verification-code"
        label="Verification Code"
        name="verification-code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        error={!!verificationError}
        helperText={verificationError || 'For demo purposes, use "123456"'}
      />
      
      {verificationError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {verificationError}
        </Alert>
      )}
      
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={verifying}
          onClick={handleVerifyCode}
        >
          {verifying ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress size={22} color="inherit" thickness={4} sx={{ mr: 1 }} />
              Verifying...
            </Box>
          ) : 'Verify Code'}
        </Button>
      </Box>
    </>
  );
};

export default CodeVerificationForm; 