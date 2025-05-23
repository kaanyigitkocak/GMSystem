import { Grid as MuiGrid, Card, CardContent, Typography } from '@mui/material';

const Grid = MuiGrid as any;

interface DashboardStatsProps {
  stats: {
    totalStudents: number;
    eligibleStudents: number;
    pendingStudents: number;
    notEligibleStudents: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Total Students
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold">
              {stats.totalStudents}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%', bgcolor: 'success.light' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Eligible for Graduation
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold">
              {stats.eligibleStudents}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%', bgcolor: 'warning.light' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Pending Review
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold">
              {stats.pendingStudents}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%', bgcolor: 'error.light' }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Not Eligible
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold">
              {stats.notEligibleStudents}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardStats; 