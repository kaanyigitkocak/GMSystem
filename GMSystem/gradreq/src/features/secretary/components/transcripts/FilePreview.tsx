import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  PictureAsPdf as PdfIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';

interface FilePreviewProps {
  file: File;
  onClearFile: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, onClearFile }) => {
  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {file.name.endsWith('.csv') ? (
            <TableChartIcon color="primary" sx={{ mr: 1 }} />
          ) : (
            <PdfIcon color="error" sx={{ mr: 1 }} />
          )}
          <Typography variant="body2">
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </Typography>
        </Box>
        <IconButton onClick={onClearFile}>
          <DeleteIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default FilePreview; 