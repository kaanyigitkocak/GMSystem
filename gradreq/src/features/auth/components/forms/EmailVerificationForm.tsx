import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { validateEmail } from '../../types';
import { sendVerificationEmail } from '../../services/authService';

interface EmailVerificationFormProps {
  initialEmail: string;
  onVerificationSent: (email: string) => void;
}

const EmailVerificationForm = ({ initialEmail, onVerificationSent }: EmailVerificationFormProps) => {
  const [email, setEmail] = useState(initialEmail);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  
  // Send verification code to email
  const handleSendVerificationCode = async () => {
    setEmailError(null);
    
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailSending(true);
    
    try {
      // Use the auth service to send verification email
      await sendVerificationEmail(email);
      onVerificationSent(email);
    } catch (error) {
      setEmailError(
        error instanceof Error 
          ? error.message 
          : 'Unable to send verification code. Please try again later.'
      );
    } finally {
      setEmailSending(false);
    }
  };
  
  return (
    <>
      <Typography variant="body1" gutterBottom>
        We need to verify your email address first. Please enter your email.
      </Typography>
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="register-email"
        label="Email"
        name="register-email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />
      
      {emailError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {emailError}
        </Alert>
      )}
      
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={emailSending}
          onClick={handleSendVerificationCode}
        >
          {emailSending ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress size={22} color="inherit" thickness={4} sx={{ mr: 1 }} />
              Sending...
            </Box>
          ) : 'Send Verification Code'}
        </Button>
      </Box>
    </>
  );
};

export default EmailVerificationForm; 