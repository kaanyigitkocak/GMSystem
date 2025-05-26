import { useState } from 'react';
import {
  TextField,
  Box,
  Button,
  MenuItem,
  InputAdornment,
  CircularProgress,
  IconButton
} from '@mui/material';
import { Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { faculties, departments } from '../../types';

export interface StudentFormData {
  firstName: string;
  lastName: string;
  faculty: string;
  department: string;
  password?: string;
  confirmPassword?: string;
}

interface StudentRegistrationFormProps {
  onSubmit: (formData: StudentFormData) => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  faculty?: string;
  department?: string;
  password?: string;
  confirmPassword?: string;
}

const StudentRegistrationForm = ({ onSubmit }: StudentRegistrationFormProps) => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    faculty: '',
    department: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // If faculty changes, reset department
    if (name === 'faculty') {
      setFormData({
        ...formData,
        [name]: value,
        department: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Filter departments based on selected faculty
  const filteredDepartments = departments.filter(
    dept => formData.faculty ? dept.faculty === formData.faculty : true
  );
  
  // Validate form
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.faculty) errors.faculty = 'Faculty is required';
    if (!formData.department) errors.department = 'Department is required';
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else {
      if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }
      if (formData.password.length > 20) {
        errors.password = 'Password must be at most 20 characters long';
      }
      if (!/[A-Z]/.test(formData.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
      }
      if (!/[a-z]/.test(formData.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
      }
      if (!/[0-9]/.test(formData.password)) {
        errors.password = 'Password must contain at least one number';
      }
      if (!/[^a-zA-Z0-9]/.test(formData.password)) {
        errors.password = 'Password must contain at least one special character';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (formData.password && formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
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
        select
        margin="normal"
        required
        fullWidth
        id="department"
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleInputChange}
        error={!!formErrors.department}
        helperText={formErrors.department}
        disabled={!formData.faculty} // Disable until faculty is selected
      >
        {filteredDepartments.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={formData.password}
        onChange={handleInputChange}
        error={!!formErrors.password}
        helperText={formErrors.password || 'Password must be 6-20 characters with uppercase, lowercase, number, and special character'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        id="confirm-password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={!!formErrors.confirmPassword}
        helperText={formErrors.confirmPassword}
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

export default StudentRegistrationForm; 