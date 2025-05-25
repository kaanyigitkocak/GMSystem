import {
  Typography,
  Paper,
  Button
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

interface FileUploadAreaProps {
  dragActive: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadArea = ({ 
  dragActive, 
  fileInputRef, 
  onDrag, 
  onDrop, 
  onFileChange 
}: FileUploadAreaProps) => {
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Paper 
      sx={{ 
        p: 4, 
        textAlign: 'center', 
        border: '2px dashed',
        borderColor: dragActive ? 'primary.main' : 'grey.300',
        bgcolor: dragActive ? 'action.hover' : 'background.paper',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover'
        }
      }}
      onDragEnter={onDrag}
      onDragLeave={onDrag}
      onDragOver={onDrag}
      onDrop={onDrop}
      onClick={handleUploadClick}
    >
      <CloudUploadIcon 
        sx={{ 
          fontSize: 48, 
          color: dragActive ? 'primary.main' : 'grey.400',
          mb: 2 
        }} 
      />
      <Typography variant="h6" gutterBottom>
        {dragActive ? 'Drop files here' : 'Drag and drop files here'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        or click to select files
      </Typography>
      <Button variant="contained" size="large">
        Select Files
      </Button>
      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        Only CSV files are accepted
      </Typography>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".csv"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
    </Paper>
  );
};

export default FileUploadArea; 