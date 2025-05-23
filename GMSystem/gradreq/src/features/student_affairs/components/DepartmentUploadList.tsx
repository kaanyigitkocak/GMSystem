import { List, ListItem, Button, Stack, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const departments = [
  'Physics',
  'Photonics',
  'Chemistry',
  'Mathematics',
  'Molecular Biology and Genetics',
  'Computer Engineering',
  'Bioengineering',
  'Environmental Engineering',
  'Energy Systems Engineering',
  'Electrical-Electronics Engineering',
  'Food Engineering',
  'Civil Engineering',
  'Mechanical Engineering',
  'Materials Science and Engineering',
  'Chemical Engineering',
  'Industrial Design',
  'Architecture',
  'City and Regional Planning'
];

interface DepartmentUploadListProps {
  uploadedFiles: Record<string, File | null>;
  onFileUpload: (department: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DepartmentUploadList = ({ uploadedFiles, onFileUpload }: DepartmentUploadListProps) => {
  return (
    <List>
      {departments.map((department) => (
        <ListItem 
          key={department}
          sx={{ 
            borderBottom: '1px solid',
            borderColor: 'divider',
            py: 2
          }}
        >
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center" 
            width="100%"
          >
            <Typography sx={{ flex: 1 }}>
              {department}
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{ minWidth: '150px' }}
            >
              {uploadedFiles[department] ? 'Change File' : 'Upload File'}
              <input
                type="file"
                hidden
                onChange={(e) => onFileUpload(department, e)}
                accept=".xlsx,.xls,.csv"
              />
            </Button>
            {uploadedFiles[department] && (
              <Typography variant="body2" color="text.secondary">
                {uploadedFiles[department]?.name}
              </Typography>
            )}
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};

export default DepartmentUploadList; 