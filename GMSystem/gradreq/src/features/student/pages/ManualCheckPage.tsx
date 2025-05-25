import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Alert,
  AlertTitle,
  CircularProgress,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Grid
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Send as SendIcon
} from '@mui/icons-material';

const ManualCheckPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_isSubmitted, _setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    details: '',
    requestType: 'article19'
  });
  
  // Form validation
  const isFormValid = () => {
    return formData.reason.trim() !== '' && formData.details.trim() !== '';
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      _setIsSubmitted(true);
      setIsSubmitting(false);
      setActiveStep(2);
    }, 1500);
  };
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle next step
  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };
  
  // Steps in the process
  const steps = [
    'Request Information',
    'Confirmation',
    'Request Submitted'
  ];
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>Manual Graduation Check Request</Typography>
        <Typography variant="body1" paragraph>
          Use this form to request a manual check of your graduation status for special cases 
          such as Article 19 or summer school credits.
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === 0 && (
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend">Request Type</FormLabel>
              <RadioGroup
                row
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
              >
                <FormControlLabel value="article19" control={<Radio />} label="Article 19" />
                <FormControlLabel value="summerSchool" control={<Radio />} label="Summer School" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            
            <TextField
              fullWidth
              required
              label="Reason for Manual Check"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              margin="normal"
              helperText="Briefly describe why you need a manual graduation check"
            />
            
            <TextField
              fullWidth
              required
              multiline
              rows={4}
              label="Additional Details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              margin="normal"
              helperText="Provide any relevant details about your special case"
            />
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleNext}
                disabled={!isFormValid()}
              >
                Next
              </Button>
            </Box>
          </form>
        )}
        
        {activeStep === 1 && (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              <AlertTitle>Please Review Your Request</AlertTitle>
              Carefully check the information below before submitting your request.
            </Alert>
            
            <Grid container spacing={2}>
              <Grid sx={{ width: { xs: '100%', sm: '50%' } }}>
                <Typography variant="subtitle2" color="text.secondary">Request Type</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {formData.requestType === 'article19' && 'Article 19'}
                  {formData.requestType === 'summerSchool' && 'Summer School'}
                  {formData.requestType === 'other' && 'Other'}
                </Typography>
              </Grid>
              
              <Grid sx={{ width: { xs: '100%', sm: '50%' } }}>
                <Typography variant="subtitle2" color="text.secondary">Reason</Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>{formData.reason}</Typography>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle2" color="text.secondary">Additional Details</Typography>
            <Typography variant="body1" paragraph>{formData.details}</Typography>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack} disabled={isSubmitting}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </Box>
          </Box>
        )}
        
        {activeStep === 2 && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>Request Submitted Successfully!</Typography>
            <Typography variant="body1" paragraph>
              Your manual graduation check request has been sent to your advisor.
              You will receive a notification once your request has been processed.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Request ID: MGC-{Math.floor(100000 + Math.random() * 900000)}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ManualCheckPage; 