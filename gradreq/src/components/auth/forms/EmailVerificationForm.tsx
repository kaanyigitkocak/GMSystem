import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

interface EmailVerificationFormProps {
  initialEmail: string;
  onVerificationSent: (email: string) => void;
}

const EmailVerificationForm = ({ initialEmail, onVerificationSent }: EmailVerificationFormProps) => {
  const [email, setEmail] = useState(initialEmail);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  
  // Email validation
  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Send verification code to email
  const handleSendVerificationCode = () => {
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
    
    // Simulate API call
    setTimeout(() => {
      console.log('Sending verification code to:', email);
      setEmailSending(false);
      
      // Simulate API errors for testing
      if (email.includes('error') || email.includes('test')) {
        setEmailError('Unable to send verification code. Please try again later.');
      } else {
        onVerificationSent(email);
      }
    }, 1500);
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