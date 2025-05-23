import { Paper, Typography, Grid as MuiGrid, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from "react-router-dom";

const Grid = MuiGrid as any;

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate('/student-affairs/university-rankings')}
            sx={{
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              textTransform: 'none'
            }}
          >
            <SchoolIcon sx={{ fontSize: 40 }} />
            <Typography variant="body1">
              University Rankings
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="info"
            fullWidth
            onClick={() => navigate('/student-affairs/upload-graduation-decisions')}
            sx={{
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              textTransform: 'none'
            }}
          >
            <UploadFileIcon sx={{ fontSize: 40 }} />
            <Typography variant="body1">
              Upload Decisions
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="success"
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
              Send Notifications
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuickActions; 