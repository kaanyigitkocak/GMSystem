import { useState } from 'react';
import {
  TextField,
  Box,
  Button,
  InputAdornment,
  CircularProgress,
  MenuItem
} from '@mui/material';
import { Person, Phone } from '@mui/icons-material';
import { faculties } from '../types';

export interface DeansOfficeFormData {
  firstName: string;
  lastName: string;
  faculty: string;
  phoneNumber: string;
}

interface DeansOfficeRegistrationFormProps {
  onSubmit: (formData: DeansOfficeFormData) => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  faculty?: string;
  phoneNumber?: string;
}

const DeansOfficeRegistrationForm = ({ onSubmit }: DeansOfficeRegistrationFormProps) => {
  const [formData, setFormData] = useState<DeansOfficeFormData>({
    firstName: '',
    lastName: '',
    faculty: '',
    phoneNumber: '',
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.faculty) errors.faculty = 'Faculty is required';
    
    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(formData);
    }, 1500);
  };
  
  return (
    <Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="first-name"
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        error={!!formErrors.firstName}
        helperText={formErrors.firstName}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="last-name"
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        error={!!formErrors.lastName}
        helperText={formErrors.lastName}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        select
        margin="normal"
        required
        fullWidth
        id="faculty"
        label="Faculty"
        name="faculty"
        value={formData.faculty}
        onChange={handleInputChange}
        error={!!formErrors.faculty}
        helperText={formErrors.faculty}
      >
        {faculties.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone-number"
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        error={!!formErrors.phoneNumber}
        helperText={formErrors.phoneNumber}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Phone />
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress size={22} color="inherit" thickness={4} sx={{ mr: 1 }} />
              Registering...
            </Box>
          ) : 'Register'}
        </Button>
      </Box>
    </Box>
  );
};

export default DeansOfficeRegistrationForm; 