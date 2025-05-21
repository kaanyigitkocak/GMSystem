import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Grid,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Divider,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Stack,
  LinearProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  VerifiedUser as VerifiedUserIcon,
  Report as ReportIcon,
  Email as EmailIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

import AdvisorDashboardLayout from '../layout/AdvisorDashboardLayout';
import { getStudentDetails } from '../services/advisorService';
import { Student } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Mock transcript data
const mockTranscriptData = [
  { courseCode: 'CENG101', courseName: 'Introduction to Computer Engineering', credits: 4, grade: 'AA', semester: 'Fall 2021' },
  { courseCode: 'CENG102', courseName: 'Computer Programming', credits: 4, grade: 'BA', semester: 'Spring 2022' },
  { courseCode: 'MATH101', courseName: 'Calculus I', credits: 4, grade: 'BB', semester: 'Fall 2021' },
  { courseCode: 'MATH102', courseName: 'Calculus II', credits: 4, grade: 'CB', semester: 'Spring 2022' },
  { courseCode: 'PHYS101', courseName: 'Physics I', credits: 4, grade: 'BB', semester: 'Fall 2021' },
  { courseCode: 'PHYS102', courseName: 'Physics II', credits: 4, grade: 'BA', semester: 'Spring 2022' },
  { courseCode: 'ENG101', courseName: 'English I', credits: 3, grade: 'AA', semester: 'Fall 2021' },
  { courseCode: 'ENG102', courseName: 'English II', credits: 3, grade: 'AA', semester: 'Spring 2022' },
  { courseCode: 'CENG201', courseName: 'Data Structures', credits: 4, grade: 'BB', semester: 'Fall 2022' },
  { courseCode: 'CENG202', courseName: 'Algorithms', credits: 4, grade: 'CB', semester: 'Spring 2023' },
  { courseCode: 'CENG315', courseName: 'Database Systems', credits: 4, grade: 'BA', semester: 'Fall 2022' },
];

// Mock graduation requirements data
const mockGradRequirements = {
  totalCreditsRequired: 180,
  totalCreditsTaken: 168,
  compulsoryCourses: {
    required: 15,
    completed: 13,
  },
  electiveCourses: {
    technical: {
      required: 5,
      completed: 4,
    },
    nonTechnical: {
      required: 3,
      completed: 3,
    },
  },
  gpaRequirement: {
    required: 2.0,
    current: 3.42,
  },
  otherRequirements: [
    { name: 'Internship I', completed: true },
    { name: 'Internship II', completed: true },
    { name: 'Senior Design Project', completed: true },
  ],
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-tabpanel-${index}`}
      aria-labelledby={`student-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const StudentDetailPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [graduationApprovalOpen, setGraduationApprovalOpen] = useState(false);
  
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId) {
        setError('No student ID provided');
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const data = await getStudentDetails(studentId);
        setStudent(data);
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError('Failed to load student details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [studentId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleEmailClick = () => {
    setEmailDialogOpen(true);
  };

  const handleEmailDialogClose = () => {
    setEmailDialogOpen(false);
  };

  const handleReportClick = () => {
    setReportDialogOpen(true);
  };

  const handleReportDialogClose = () => {
    setReportDialogOpen(false);
  };
  
  const handlePetitionClick = () => {
    if (studentId) {
      navigate(`/advisor/petitions/new?studentId=${studentId}`);
    }
  };
  
  const handleGraduationApproval = () => {
    setGraduationApprovalOpen(true);
  };
  
  const handleGraduationApprovalClose = () => {
    setGraduationApprovalOpen(false);
  };

  const getRequirementProgress = (completed: number, required: number) => {
    return (completed / required) * 100;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'AA':
      case 'BA':
        return 'success.main';
      case 'BB':
      case 'CB':
        return 'primary.main';
      case 'CC':
        return 'warning.main';
      case 'DC':
      case 'DD':
        return 'orange';
      case 'FF':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  return (
    <AdvisorDashboardLayout>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      ) : student ? (
        <Box sx={{ mb: 4 }}>
          {/* Student Overview Panel */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                  {`${student.name} ${student.surname}`}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Student ID:</strong> {student.studentId}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Department:</strong> {student.department}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>GPA:</strong>{' '}
                  <Typography 
                    component="span" 
                    color={student.gpa >= 2.0 ? 'success.main' : 'error.main'}
                    fontWeight="bold"
                  >
                    {student.gpa.toFixed(2)}
                  </Typography>
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Academic Status:</strong>{' '}
                  <Chip 
                    size="small" 
                    label={student.academicStatus} 
                    color={student.academicStatus === 'Active' ? 'success' : 'error'} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    onClick={handleEmailClick}
                    fullWidth
                  >
                    Send Email
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    onClick={handlePetitionClick}
                    fullWidth
                  >
                    Create Petition
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<ReportIcon />}
                    onClick={handleReportClick}
                    fullWidth
                  >
                    Report Missing Transcript
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Tabs for different sections */}
          <Paper sx={{ p: 0, mb: 3 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="student detail tabs"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Transcript" />
              <Tab label="Graduation Requirements" />
            </Tabs>

            {/* Transcript Tab */}
            <TabPanel value={activeTab} index={0}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="transcript table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Course Code</TableCell>
                      <TableCell>Course Name</TableCell>
                      <TableCell align="center">Credits</TableCell>
                      <TableCell align="center">Grade</TableCell>
                      <TableCell>Semester</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockTranscriptData.map((course) => (
                      <TableRow key={course.courseCode} hover>
                        <TableCell>{course.courseCode}</TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell align="center">{course.credits}</TableCell>
                        <TableCell 
                          align="center" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: getGradeColor(course.grade)
                          }}
                        >
                          {course.grade}
                        </TableCell>
                        <TableCell>{course.semester}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            {/* Graduation Requirements Tab */}
            <TabPanel value={activeTab} index={1}>
              <Box>
                {/* Summary Card */}
                <Card variant="outlined" sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Graduation Status Summary
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          Total Credits:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            color={mockGradRequirements.totalCreditsTaken >= mockGradRequirements.totalCreditsRequired ? 'success' : 'primary'}
                            value={Math.min(100, (mockGradRequirements.totalCreditsTaken / mockGradRequirements.totalCreditsRequired) * 100)}
                            sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                          />
                          <Typography variant="body2">
                            {mockGradRequirements.totalCreditsTaken}/{mockGradRequirements.totalCreditsRequired}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="body2">
                          GPA Requirement:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            color={mockGradRequirements.gpaRequirement.current >= mockGradRequirements.gpaRequirement.required ? 'success' : 'error'}
                            value={Math.min(100, (mockGradRequirements.gpaRequirement.current / mockGradRequirements.gpaRequirement.required) * 100)}
                            sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                          />
                          <Typography variant="body2">
                            {mockGradRequirements.gpaRequirement.current.toFixed(2)}/{mockGradRequirements.gpaRequirement.required.toFixed(1)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        onClick={handleGraduationApproval}
                      >
                        Approve Graduation
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                      >
                        Reject Graduation
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
                
                {/* Detailed Requirements */}
                <Typography variant="h6" gutterBottom>Detailed Requirements</Typography>
                <Grid container spacing={3}>
                  {/* Compulsory Courses */}
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Compulsory Courses
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={getRequirementProgress(
                              mockGradRequirements.compulsoryCourses.completed,
                              mockGradRequirements.compulsoryCourses.required
                            )}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 5 }}
                          />
                          <Typography variant="body2">
                            {mockGradRequirements.compulsoryCourses.completed}/{mockGradRequirements.compulsoryCourses.required}
                          </Typography>
                        </Box>
                        {mockGradRequirements.compulsoryCourses.completed < mockGradRequirements.compulsoryCourses.required && (
                          <Typography variant="caption" color="error">
                            Missing {mockGradRequirements.compulsoryCourses.required - mockGradRequirements.compulsoryCourses.completed} compulsory courses
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Technical Electives */}
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Technical Electives
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={getRequirementProgress(
                              mockGradRequirements.electiveCourses.technical.completed,
                              mockGradRequirements.electiveCourses.technical.required
                            )}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 5 }}
                          />
                          <Typography variant="body2">
                            {mockGradRequirements.electiveCourses.technical.completed}/{mockGradRequirements.electiveCourses.technical.required}
                          </Typography>
                        </Box>
                        {mockGradRequirements.electiveCourses.technical.completed < mockGradRequirements.electiveCourses.technical.required && (
                          <Typography variant="caption" color="error">
                            Missing {mockGradRequirements.electiveCourses.technical.required - mockGradRequirements.electiveCourses.technical.completed} technical electives
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Non-Technical Electives */}
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Non-Technical Electives
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            color="success"
                            value={getRequirementProgress(
                              mockGradRequirements.electiveCourses.nonTechnical.completed,
                              mockGradRequirements.electiveCourses.nonTechnical.required
                            )}
                            sx={{ flexGrow: 1, height: 8, borderRadius: 5 }}
                          />
                          <Typography variant="body2">
                            {mockGradRequirements.electiveCourses.nonTechnical.completed}/{mockGradRequirements.electiveCourses.nonTechnical.required}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Other Requirements */}
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Other Requirements
                        </Typography>
                        <Stack spacing={1}>
                          {mockGradRequirements.otherRequirements.map((req, index) => (
                            <Box 
                              key={index} 
                              sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between' 
                              }}
                            >
                              <Typography variant="body2">{req.name}</Typography>
                              {req.completed ? (
                                <CheckCircleIcon color="success" fontSize="small" />
                              ) : (
                                <CancelIcon color="error" fontSize="small" />
                              )}
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      ) : (
        <Box>
          <Alert severity="warning">Student not found</Alert>
          <Button 
            variant="contained" 
            onClick={() => navigate('/advisor/students')}
            sx={{ mt: 2 }}
          >
            Back to Students List
          </Button>
        </Box>
      )}

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onClose={handleEmailDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Send Email to {student ? `${student.name} ${student.surname}` : 'Student'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Compose an email to send to the student regarding their graduation status or other academic matters.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Subject"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Message"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEmailDialogClose}>Send Email</Button>
        </DialogActions>
      </Dialog>
      
      {/* Report Missing Transcript Dialog */}
      <Dialog open={reportDialogOpen} onClose={handleReportDialogClose}>
        <DialogTitle>
          Report Missing Transcript
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to report that this student's transcript has missing or incorrect information?
            This will notify the Secretary's office to investigate.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Details about the missing information"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReportDialogClose}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleReportDialogClose}>
            Report Issue
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Graduation Approval Dialog */}
      <Dialog open={graduationApprovalOpen} onClose={handleGraduationApprovalClose}>
        <DialogTitle>
          Approve Graduation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to approve this student's graduation eligibility. This means you have:
            <ul>
              <li>Verified that all required courses have been completed</li>
              <li>Confirmed that the GPA requirement has been met</li>
              <li>Checked that all other graduation requirements are satisfied</li>
            </ul>
            This approval will be recorded in the system and the student will be notified.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Additional Comments (optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGraduationApprovalClose}>Cancel</Button>
          <Button 
            variant="contained" 
            color="success" 
            startIcon={<VerifiedUserIcon />}
            onClick={handleGraduationApprovalClose}
          >
            Confirm Approval
          </Button>
        </DialogActions>
      </Dialog>
    </AdvisorDashboardLayout>
  );
};

export default StudentDetailPage;
