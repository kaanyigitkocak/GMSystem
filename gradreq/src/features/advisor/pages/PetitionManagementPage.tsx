import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List
} from '@mui/material';
import {
  Description as DescriptionIcon,
  GetApp as GetAppIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import AdvisorDashboardLayout from '../layout/AdvisorDashboardLayout';
import { getPetitionTypes, getAdvisedStudents, createPetition, getPetitions } from '../services/advisorService';
import type { PetitionType, Student, Petition } from '../types';

const steps = ['Select Petition Type', 'Select Student', 'Write Content', 'Review and Submit'];

const PetitionManagementPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [petitionTypes, setPetitionTypes] = useState<PetitionType[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [previousPetitions, setPreviousPetitions] = useState<Petition[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [petitionFormData, setPetitionFormData] = useState({
    type: '',
    studentId: '',
    content: ''
  });
  const [formErrors, setFormErrors] = useState({
    type: false,
    studentId: false,
    content: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [viewPetitionDialogOpen, setViewPetitionDialogOpen] = useState(false);
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);

  // We use location but not navigate in this component
  const location = useLocation();
  
  // Check if we have a student ID from query parameters (from My Students page)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const studentId = params.get('studentId');
    
    if (studentId) {
      setPetitionFormData(prev => ({
        ...prev,
        studentId
      }));
      // If student ID is provided, skip to step 2 (content) after loading
      // We'll do this after data is loaded
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch petition types, student list, and previous petitions in parallel
        const [typesData, studentsData, petitionsData] = await Promise.all([
          getPetitionTypes(),
          getAdvisedStudents(),
          getPetitions()
        ]);
        
        setPetitionTypes(typesData);
        setStudents(studentsData);
        setPreviousPetitions(petitionsData);
        
        // If a student ID was provided in the URL, and data is now loaded,
        // we can safely advance to step 2 (content) if the student ID is valid
        const params = new URLSearchParams(location.search);
        const studentId = params.get('studentId');
        
        if (studentId && studentsData.some(s => s.studentId === studentId)) {
          setActiveStep(1); // Go to student selection
          // We don't need to set studentId in form data because it was already set in the first useEffect
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load required data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [location.search]);

  const handleNext = () => {
    let canProceed = true;
    
    // Validate current step
    if (activeStep === 0) {
      // Validate petition type
      if (!petitionFormData.type) {
        setFormErrors(prev => ({ ...prev, type: true }));
        canProceed = false;
      } else {
        setFormErrors(prev => ({ ...prev, type: false }));
      }
    } else if (activeStep === 1) {
      // Validate student selection
      if (!petitionFormData.studentId) {
        setFormErrors(prev => ({ ...prev, studentId: true }));
        canProceed = false;
      } else {
        setFormErrors(prev => ({ ...prev, studentId: false }));
      }
    } else if (activeStep === 2) {
      // Validate petition content
      if (!petitionFormData.content || petitionFormData.content.length < 10) {
        setFormErrors(prev => ({ ...prev, content: true }));
        canProceed = false;
      } else {
        setFormErrors(prev => ({ ...prev, content: false }));
      }
    }
    
    if (canProceed) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setPetitionFormData({
      type: '',
      studentId: '',
      content: ''
    });
    setFormErrors({
      type: false,
      studentId: false,
      content: false
    });
    setSubmitSuccess(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setPetitionFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset error when user starts typing
    setFormErrors(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Get the selected student's full name
      const selectedStudent = students.find(s => s.studentId === petitionFormData.studentId);
      
      if (!selectedStudent) {
        throw new Error('Selected student not found');
      }
      
      const petitionData = {
        studentId: petitionFormData.studentId,
        studentName: `${selectedStudent.name} ${selectedStudent.surname}`,
        type: petitionFormData.type,
        content: petitionFormData.content,
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        status: 'draft' as const
      };
      
      // Submit the petition
      await createPetition(petitionData);
      setSubmitSuccess(true);
      
      // Also fetch the updated list of petitions
      const updatedPetitions = await getPetitions();
      setPreviousPetitions(updatedPetitions);
    } catch (err) {
      console.error('Error submitting petition:', err);
      setError('Failed to submit petition. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleViewPetition = (petition: Petition) => {
    setSelectedPetition(petition);
    setViewPetitionDialogOpen(true);
  };
  
  const handleCloseViewPetitionDialog = () => {
    setViewPetitionDialogOpen(false);
    setSelectedPetition(null);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl fullWidth error={formErrors.type}>
            <InputLabel id="petition-type-label">Petition Type</InputLabel>
            <Select
              labelId="petition-type-label"
              id="petition-type-select"
              value={petitionFormData.type}
              label="Petition Type"
              onChange={(e) => handleInputChange('type', e.target.value)}
            >
              {petitionTypes.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {formErrors.type && (
              <FormHelperText>Please select a petition type</FormHelperText>
            )}
            {petitionFormData.type && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Description:</Typography>
                <Typography variant="body2" color="text.secondary">
                  {petitionTypes.find(t => t.name === petitionFormData.type)?.description || 'No description available'}
                </Typography>
              </Box>
            )}
          </FormControl>
        );
      case 1:
        return (
          <FormControl fullWidth error={formErrors.studentId}>
            <InputLabel id="student-select-label">Student</InputLabel>
            <Select
              labelId="student-select-label"
              id="student-select"
              value={petitionFormData.studentId}
              label="Student"
              onChange={(e) => handleInputChange('studentId', e.target.value)}
              disabled={Boolean(new URLSearchParams(location.search).get('studentId'))}
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.studentId}>
                  {`${student.name} ${student.surname} (${student.studentId})`}
                </MenuItem>
              ))}
            </Select>
            {formErrors.studentId && (
              <FormHelperText>Please select a student</FormHelperText>
            )}
          </FormControl>
        );
      case 2:
        return (
          <TextField
            fullWidth
            label="Petition Content"
            multiline
            rows={10}
            variant="outlined"
            value={petitionFormData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            error={formErrors.content}
            helperText={formErrors.content ? "Please enter detailed petition content (at least 10 characters)" : ""}
            placeholder="Enter the detailed content of the petition. Be specific about the request and include all relevant information."
          />
        );
      case 3:
        const selectedType = petitionTypes.find(t => t.name === petitionFormData.type);
        const selectedStudent = students.find(s => s.studentId === petitionFormData.studentId);
        
        return (
          <Box>
            <Card variant="outlined">
              <CardHeader title="Petition Preview" />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Petition Type:</Typography>
                    <Typography variant="body1">{petitionFormData.type}</Typography>
                    {selectedType && (
                      <Typography variant="caption" color="text.secondary">
                        {selectedType.description}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2">Student:</Typography>
                    <Typography variant="body1">
                      {selectedStudent ? `${selectedStudent.name} ${selectedStudent.surname} (${selectedStudent.studentId})` : ''}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Date:</Typography>
                    <Typography variant="body1">{new Date().toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Content:</Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                      {petitionFormData.content}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  };

  return (
    <AdvisorDashboardLayout>
      <Box sx={{ mb: 4 }}>
        {/* Page Header */}
        <Typography variant="h4" gutterBottom>
          Petition Management
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Create and manage petitions for students. You can create new petitions for various academic purposes and track previously submitted petitions.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        <Grid container spacing={3}>
          {/* New Petition Form */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
              <Typography variant="h6" gutterBottom>
                Create New Petition
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              {loading ? (
                <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box>
                  {submitSuccess ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="h6" color="success.main" gutterBottom>
                        Petition Submitted Successfully!
                      </Typography>
                      <Typography variant="body1" paragraph>
                        The petition has been created and saved. You can download the PDF or create another petition.
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<GetAppIcon />}
                          sx={{ mr: 2 }}
                        >
                          Download PDF
                        </Button>
                        <Button variant="contained" onClick={handleReset}>
                          Create Another Petition
                        </Button>
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      
                      <Box sx={{ mb: 3 }}>
                        {getStepContent(activeStep)}
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                        
                        <Box>
                          {activeStep === steps.length - 1 ? (
                            <Button
                              variant="contained"
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                            </Button>
                          ) : (
                            <Button variant="contained" onClick={handleNext}>
                              Next
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
          
          {/* Previous Petitions */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Previous Petitions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {loading ? (
                <Box display="flex" justifyContent="center" sx={{ p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : previousPetitions.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No previous petitions found
                </Typography>
              ) : (
                <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                  <List dense>
                    {previousPetitions.map((petition) => (
                      <Box key={petition.id} sx={{ mb: 2 }}>
                        <Paper variant="outlined" sx={{ p: 1.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Typography variant="subtitle2">{petition.type}</Typography>
                              <Typography variant="body2">{petition.studentName}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(petition.date)}
                              </Typography>
                            </Box>
                            <Box>
                              <Chip
                                size="small"
                                label={petition.status}
                                color={
                                  petition.status === 'draft'
                                    ? 'default'
                                    : petition.status === 'submitted'
                                    ? 'primary'
                                    : 'success'
                                }
                                sx={{ mb: 1 }}
                              />
                              <IconButton
                                size="small"
                                onClick={() => handleViewPetition(petition)}
                              >
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Paper>
                      </Box>
                    ))}
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      {/* View Petition Dialog */}
      <Dialog 
        open={viewPetitionDialogOpen} 
        onClose={handleCloseViewPetitionDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Petition Details
        </DialogTitle>
        <DialogContent>
          {selectedPetition && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Petition Type:</Typography>
                <Typography variant="body1">{selectedPetition.type}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Student:</Typography>
                <Typography variant="body1">{selectedPetition.studentName}</Typography>
                <Typography variant="caption">{selectedPetition.studentId}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Date:</Typography>
                <Typography variant="body1">{formatDate(selectedPetition.date)}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Status:</Typography>
                <Chip
                  label={selectedPetition.status}
                  color={
                    selectedPetition.status === 'draft'
                      ? 'default'
                      : selectedPetition.status === 'submitted'
                      ? 'primary'
                      : 'success'
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Content:</Typography>
                <Paper variant="outlined" sx={{ p: 2, mt: 1, backgroundColor: '#f9f9f9' }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {selectedPetition.content}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewPetitionDialog} color="primary">
            Close
          </Button>
          <Button 
            variant="contained" 
            startIcon={<GetAppIcon />} 
            onClick={handleCloseViewPetitionDialog}
          >
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>
    </AdvisorDashboardLayout>
  );
};

export default PetitionManagementPage;
