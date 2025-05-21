import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Alert,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import theme from '../../../core/styles/theme';

interface ForgotPasswordDialogProps {
  open: boolean;
  initialEmail: string;
  onClose: () => void;
}

// Forgot password process stages
enum ForgotPasswordStage {
  EMAIL_VERIFICATION = 0,
  CODE_VERIFICATION = 1,
  PASSWORD_RESET = 2,
  COMPLETE = 3
}

const ForgotPasswordDialog = ({ open, initialEmail, onClose }: ForgotPasswordDialogProps) => {
  // Email verification
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [resetEmailSending, setResetEmailSending] = useState(false);
  const [resetEmailError, setResetEmailError] = useState<string | null>(null);
  
  // Code verification 
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  
  // Password reset
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  
  // Current stage
  const [currentStage, setCurrentStage] = useState<ForgotPasswordStage>(ForgotPasswordStage.EMAIL_VERIFICATION);
  
  // Handle dialog close with reset
  const handleClose = () => {
    setResetEmail(initialEmail);
    setVerificationCode('');
    setNewPassword('');
    setConfirmPassword('');
    setCurrentStage(ForgotPasswordStage.EMAIL_VERIFICATION);
    setResetEmailError(null);
    setVerificationError(null);
    setResetError(null);
    onClose();
  };
  
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
    setResetEmailError(null);
    
    if (!resetEmail.trim()) {
      setResetEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(resetEmail)) {
      setResetEmailError('Please enter a valid email address');
      return;
    }
    
    setResetEmailSending(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Sending verification code to:', resetEmail);
      setResetEmailSending(false);
      
      // Simulate API errors for testing
      if (resetEmail.includes('error') || resetEmail.includes('test')) {
        setResetEmailError('Unable to send verification code. Please try again later.');
      } else {
        // Move to next stage - code verification
        setCurrentStage(ForgotPasswordStage.CODE_VERIFICATION);
      }
    }, 1500);
  };
  
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
        setCurrentStage(ForgotPasswordStage.PASSWORD_RESET);
      } else {
        setVerificationError('Invalid verification code. Please try again.');
      }
    }, 1000);
  };
  
  // Reset password
  const handleResetPassword = () => {
    setResetError(null);
    
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setResetError('Both password fields are required');
      return;
    }
    
    // Validate password strength
    if (newPassword.length < 8) {
      setResetError('Password must be at least 8 characters long');
      return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }
    
    setResetting(true);
    
    // Simulate API reset
    setTimeout(() => {
      console.log('Resetting password for:', resetEmail);
      setResetting(false);
      // Password reset successful
      setCurrentStage(ForgotPasswordStage.COMPLETE);
    }, 1500);
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: '100%',
          maxWidth: '400px',
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', color: theme.palette.primary.main, fontWeight: 600 }}>
        {currentStage === ForgotPasswordStage.PASSWORD_RESET 
          ? 'Reset Your Password' 
          : currentStage === ForgotPasswordStage.COMPLETE
            ? 'Password Reset Complete'
            : 'Forgot Password'
        }
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        {/* Email verification stage */}
        {currentStage === ForgotPasswordStage.EMAIL_VERIFICATION && (
          <>
            <Typography variant="body1" gutterBottom>
              Please enter your email address. We will send you a verification code.
            </Typography>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="reset-email"
              label="Email"
              name="reset-email"
              autoComplete="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              error={!!resetEmailError}
              helperText={resetEmailError}
            />
            
            {resetEmailError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {resetEmailError}
              </Alert>
            )}
          </>
        )}
        
        {/* Verification code stage */}
        {currentStage === ForgotPasswordStage.CODE_VERIFICATION && (
          <>
            <Typography variant="body1" gutterBottom>
              A verification code has been sent to {resetEmail}.
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
          </>
        )}
        
        {/* Password reset stage */}
        {currentStage === ForgotPasswordStage.PASSWORD_RESET && (
          <>
            <Typography variant="body1" gutterBottom>
              Please enter your new password.
            </Typography>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-password"
              label="New Password"
              name="new-password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      edge="end"
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              label="Confirm Password"
              name="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            {resetError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {resetError}
              </Alert>
            )}
          </>
        )}
        
        {/* Complete stage */}
        {currentStage === ForgotPasswordStage.COMPLETE && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Your password has been reset successfully. You can now login with your new password.
          </Alert>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, flexDirection: 'column', gap: 1 }}>
        {/* Email verification stage buttons */}
        {currentStage === ForgotPasswordStage.EMAIL_VERIFICATION && (
          <Button
            variant="contained"
            fullWidth
            disabled={resetEmailSending}
            onClick={handleSendVerificationCode}
          >
            {resetEmailSending ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={22} color="inherit" thickness={4} sx={{ mr: 1 }} />
                Sending...
              </Box>
            ) : 'Send Verification Code'}
          </Button>
        )}
        
        {/* Code verification stage buttons */}
        {currentStage === ForgotPasswordStage.CODE_VERIFICATION && (
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
        )}
        
        {/* Password reset stage buttons */}
        {currentStage === ForgotPasswordStage.PASSWORD_RESET && (
          <Button
            variant="contained"
            fullWidth
            disabled={resetting}
            onClick={handleResetPassword}
          >
            {resetting ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={22} color="inherit" thickness={4} sx={{ mr: 1 }} />
                Resetting...
              </Box>
            ) : 'Reset Password'}
          </Button>
        )}
        
        {/* Close button (always visible) */}
        <Button 
          variant="outlined" 
          fullWidth
          onClick={handleClose}
        >
          {currentStage === ForgotPasswordStage.COMPLETE ? 'Return to Login' : 'Close'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPasswordDialog; 