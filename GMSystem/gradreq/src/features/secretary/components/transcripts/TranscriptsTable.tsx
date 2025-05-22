import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { TranscriptData } from '../../services/types';

interface TranscriptsTableProps {
  transcripts: TranscriptData[];
  loading: boolean;
  onDelete: (id: string) => void;
  formatTranscriptMetaInfo: (transcript: TranscriptData) => string;
}

const TranscriptsTable: React.FC<TranscriptsTableProps> = ({
  transcripts,
  loading,
  onDelete,
  formatTranscriptMetaInfo,
}) => {
  if (loading && transcripts.length === 0) {
    return (
      <Paper sx={{ p: 3, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography variant="h6" fontWeight="medium">
          Uploaded Transcripts
        </Typography>
      </Box>
      
      <TableContainer sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Information</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transcripts.map((transcript) => (
              <TableRow key={transcript.id}>
                <TableCell>{transcript.studentId}</TableCell>
                <TableCell>{transcript.studentName}</TableCell>
                <TableCell>{formatTranscriptMetaInfo(transcript)}</TableCell>
                <TableCell>{transcript.uploadDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={transcript.status === 'processed' ? 'Processed' : 'Added'}
                    size="small"
                    color={transcript.status === 'processed' ? 'success' : 'primary'}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => onDelete(transcript.id)}
                      disabled={loading}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {transcripts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No transcripts uploaded yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TranscriptsTable; 