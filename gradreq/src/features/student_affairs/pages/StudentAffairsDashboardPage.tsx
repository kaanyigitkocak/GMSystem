import React from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Grid,
  Button
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import StudentAffairsDashboardLayout from '../layout/StudentAffairsDashboardLayout';

const StudentAffairsDashboardPage = () => {
  return (
    <StudentAffairsDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
          {/* Welcome Section */}
          <Box gridColumn="span 12">
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Welcome!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome to the Student Affairs Panel of the Graduation Management System. From this panel, you can determine student certificates, generate university ranking lists, and upload graduation decisions for each department.
              </Typography>
            </Paper>
          </Box>

          {/* Quick Actions Section */}
          <Box gridColumn="span 12">
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Box sx={{ width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }, p: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      height: '120px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      textTransform: 'none'
                    }}
                  >
                    <EmailIcon sx={{ fontSize: 40 }} />
                    <Typography variant="body1">
                      Send Automated Emails
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Box>
    </StudentAffairsDashboardLayout>
  );
};

export default StudentAffairsDashboardPage; 