import {
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  LinearProgress
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

interface DashboardStatsProps {
  uploadedCount: number;
  totalDepartments: number;
  uploadProgress: number;
}

const DashboardStats = ({ uploadedCount, totalDepartments, uploadProgress }: DashboardStatsProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', mb: 2, color: 'primary.main' }}>
            <SchoolIcon fontSize="large" />
          </Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Department Upload Status
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Progress overview of department file submissions.
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {`${Math.round(uploadProgress)}%`}
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {uploadedCount} of {totalDepartments} departments have uploaded files
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardStats; 