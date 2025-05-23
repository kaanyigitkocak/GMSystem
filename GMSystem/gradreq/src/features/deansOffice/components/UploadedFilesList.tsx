import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import type { UploadedFile, FileStatus } from '../services/types';

interface UploadedFilesListProps {
  files: UploadedFile[];
  onRemoveFile: (id: string) => void;
}

const UploadedFilesList = ({ files, onRemoveFile }: UploadedFilesListProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case 'valid':
        return <CheckCircleIcon color="success" />;
      case 'invalid':
        return <ErrorIcon color="error" />;
      case 'pending':
        return <CircularProgress size={20} />;
      default:
        return null;
    }
  };

  if (files.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
        Uploaded Files ({files.length})
      </Typography>
      <List>
        {files.map((file) => (
          <ListItem key={file.id}>
            <ListItemIcon>
              {getStatusIcon(file.status)}
            </ListItemIcon>
            <ListItemText
              primary={file.name}
              secondary={
                <>
                  {formatFileSize(file.size)}
                  {file.issues && file.issues.length > 0 && (
                    <Typography variant="caption" color="error" display="block">
                      Issues: {file.issues.join(', ')}
                    </Typography>
                  )}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="delete"
                onClick={() => onRemoveFile(file.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default UploadedFilesList; 