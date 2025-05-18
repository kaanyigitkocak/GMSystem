import { useState } from 'react';
import { Box } from '@mui/material';
import theme from '../styles/theme';

// Import modular components
import LoginForm from '../components/auth/LoginForm';
import ForgotPasswordDialog from '../components/auth/ForgotPasswordDialog';
import RegisterDialog from '../components/auth/RegisterDialog';

const LoginPage = () => {
  // State for controlling dialogs
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // Handle dialog open/close
  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };
  
  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };
  
  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };
  
  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        bgcolor: theme.palette.background.default
      }}
    >
      {/* Login Form */}
      <LoginForm 
        onForgotPasswordClick={handleForgotPasswordOpen}
        onRegisterClick={handleRegisterOpen}
      />
      
      {/* Forgot Password Dialog */}
      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        initialEmail=""
        onClose={handleForgotPasswordClose}
      />
      
      {/* Register Dialog */}
      <RegisterDialog
        open={registerOpen}
        onClose={handleRegisterClose}
      />
    </Box>
  );
};

export default LoginPage; 