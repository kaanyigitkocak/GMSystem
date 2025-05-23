import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box
} from '@mui/material';

interface DepartmentStatus {
  department: string;
  filesUploaded: boolean;
  lastUpdate: string;
}

interface DepartmentStatusListProps {
  departmentStats: DepartmentStatus[];
}

const DepartmentStatusList = ({ departmentStats }: DepartmentStatusListProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Paper sx={{ p: 2, height: '100%' }}>
        <Typography variant="h6" gutterBottom>
          Department Submission Status
        </Typography>
        <List>
          {departmentStats.map((dept, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText
                primary={dept.department}
                secondary={`Last update: ${dept.lastUpdate}`}
              />
              <Chip
                label={dept.filesUploaded ? 'Uploaded' : 'Pending'}
                color={dept.filesUploaded ? 'success' : 'warning'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default DepartmentStatusList; 