import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box
} from '@mui/material';

interface RecentActivity {
  id: number;
  action: string;
  timestamp: string;
  user: string;
}

interface RecentActivitiesListProps {
  recentActivities: RecentActivity[];
}

const RecentActivitiesList = ({ recentActivities }: RecentActivitiesListProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>
        <List>
          {recentActivities.map((activity, index) => (
            <Box key={activity.id}>
              <ListItem sx={{ px: 0 }}>
                <ListItemText
                  primary={activity.action}
                  secondary={
                    <Box component="span">
                      {activity.timestamp} • {activity.user}
                    </Box>
                  }
                />
              </ListItem>
              {index < recentActivities.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default RecentActivitiesList; 