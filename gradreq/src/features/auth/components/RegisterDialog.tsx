import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Alert
} from '@mui/material';
import { Close } from '@mui/icons-material';
import theme from '../../../core/styles/theme';

// Import shared types and constants
import { RegisterStage, UserType } from '../types';

// Import modular form components
import EmailVerificationForm from './forms/EmailVerificationForm';
import CodeVerificationForm from './forms/CodeVerificationForm';
import UserTypeSelectionForm from './forms/UserTypeSelectionForm';
import StudentRegistrationForm from './forms/StudentRegistrationForm';
import AdminRegistrationForm from './forms/AdminRegistrationForm';
import AdvisorRegistrationForm from './forms/AdvisorRegistrationForm';
import SecretaryRegistrationForm from './forms/SecretaryRegistrationForm';
import DeansOfficeRegistrationForm from './forms/DeansOfficeRegistrationForm';
import StudentAffairsRegistrationForm from './forms/StudentAffairsRegistrationForm';
import type { StudentFormData } from './forms/StudentRegistrationForm';
import type { AdminFormData } from './forms/AdminRegistrationForm';
import type { AdvisorFormData } from './forms/AdvisorRegistrationForm';
import type { SecretaryFormData } from './forms/SecretaryRegistrationForm';
import type { DeansOfficeFormData } from './forms/DeansOfficeRegistrationForm';
import type { StudentAffairsFormData } from './forms/StudentAffairsRegistrationForm';

interface RegisterDialogProps {
  open: boolean;
  onClose: () => void;
}

const RegisterDialog = ({ open, onClose }: RegisterDialogProps) => {
  // Current stage and user data
  const [currentStage, setCurrentStage] = useState<RegisterStage>(RegisterStage.EMAIL_VERIFICATION);
  const [userType, setUserType] = useState<UserType>(UserType.STUDENT);
  const [email, setEmail] = useState('');
  
  // Handle dialog close with reset
  const handleClose = () => {
    setCurrentStage(RegisterStage.EMAIL_VERIFICATION);
    setUserType(UserType.STUDENT);
    setEmail('');
    onClose();
  };
  
  // Handle email verification completion
  const handleEmailVerificationSent = (verifiedEmail: string) => {
    setEmail(verifiedEmail);
    setCurrentStage(RegisterStage.CODE_VERIFICATION);
  };
  
  // Handle code verification completion
  const handleCodeVerified = () => {
    setCurrentStage(RegisterStage.USER_TYPE_SELECTION);
  };
  
  // Handle user type selection
  const handleUserTypeSelected = (selectedType: UserType) => {
    setUserType(selectedType);
    setCurrentStage(RegisterStage.REGISTRATION_FORM);
  };
  
  // Handle student registration completion
  const handleStudentRegistered = (formData: StudentFormData) => {
    console.log('Registering student:', {
      email,
      type: userType,
      ...formData
    });
    
    setCurrentStage(RegisterStage.COMPLETE);
  };
  
  // Handle admin registration completion
  const handleAdminRegistered = (formData: AdminFormData) => {
    console.log('Registering admin:', {
      email,
      type: userType,
      ...formData
    });
    
    setCurrentStage(RegisterStage.COMPLETE);
  };
  
  // Handle advisor registration completion
  const handleAdvisorRegistered = (formData: AdvisorFormData) => {
    console.log('Registering advisor:', {
      email,
      type: userType,
      ...formData
    });
    
    setCurrentStage(RegisterStage.COMPLETE);
  };
  
  // Handle secretary registration completion
  const handleSecretaryRegistered = (formData: SecretaryFormData) => {
    console.log('Registering secretary:', {
      email,
      type: userType,
      ...formData
    });
    
    setCurrentStage(RegisterStage.COMPLETE);
  };
  
  // Handle dean's office registration completion
  const handleDeansOfficeRegistered = (formData: DeansOfficeFormData) => {
    console.log('Registering dean\'s office staff:', {
      email,
      type: userType,
      ...formData
    });
    
    setCurrentStage(RegisterStage.COMPLETE);
  };
  
  // Handle student affairs registration completion
  const handleStudentAffairsRegistered = (formData: StudentAffairsFormData) => {
    console.log('Registering student affairs staff:', {
      email,
      type: userType,
      ...formData
    });
    
    setCurrentStage(RegisterStage.COMPLETE);
  };
  
  // Get dialog title based on current stage
  const getDialogTitle = (): string => {
    switch (currentStage) {
      case RegisterStage.USER_TYPE_SELECTION:
        return 'Select Account Type';
      case RegisterStage.REGISTRATION_FORM:
        return 'Complete Registration';
      case RegisterStage.COMPLETE:
        return 'Registration Complete';
      default:
        return 'Register';
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: '100%',
          maxWidth: '500px',
          p: 1
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', color: theme.palette.primary.main, fontWeight: 600 }}>
        {getDialogTitle()}
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
        {currentStage === RegisterStage.EMAIL_VERIFICATION && (
          <EmailVerificationForm 
            initialEmail="" 
            onVerificationSent={handleEmailVerificationSent} 
          />
        )}
        
        {/* Verification code stage */}
        {currentStage === RegisterStage.CODE_VERIFICATION && (
          <CodeVerificationForm 
            email={email} 
            onVerified={handleCodeVerified} 
          />
        )}
        
        {/* User type selection stage */}
        {currentStage === RegisterStage.USER_TYPE_SELECTION && (
          <UserTypeSelectionForm 
            onContinue={handleUserTypeSelected} 
          />
        )}
        
        {/* Registration form stage */}
        {currentStage === RegisterStage.REGISTRATION_FORM && (
          <>
            <Typography variant="body1" gutterBottom>
              Please complete your registration by providing the following information.
            </Typography>
            
            {userType === UserType.STUDENT && (
              <StudentRegistrationForm onSubmit={handleStudentRegistered} />
            )}
            {userType === UserType.ADMIN && (
              <AdminRegistrationForm onSubmit={handleAdminRegistered} />
            )}
            {userType === UserType.ADVISOR && (
              <AdvisorRegistrationForm onSubmit={handleAdvisorRegistered} />
            )}
            {userType === UserType.SECRETARY && (
              <SecretaryRegistrationForm onSubmit={handleSecretaryRegistered} />
            )}
            {userType === UserType.DEANS_OFFICE && (
              <DeansOfficeRegistrationForm onSubmit={handleDeansOfficeRegistered} />
            )}
            {userType === UserType.STUDENT_AFFAIRS && (
              <StudentAffairsRegistrationForm onSubmit={handleStudentAffairsRegistered} />
            )}
          </>
        )}
        
        {/* Complete stage */}
        {currentStage === RegisterStage.COMPLETE && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Registration successful! Your account has been created. You can now log in with your email address.
          </Alert>
        )}
      </DialogContent>
      
      {/* We only need a dialog close button at the completion stage or when going back */}
      {currentStage === RegisterStage.COMPLETE && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={handleClose}
          >
            Return to Login
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default RegisterDialog; 