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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  Warning as WarningIcon,
} from '@mui/icons-material';
import type { StudentConflict, TranscriptEntryDetails } from '../../services/types';

interface ConflictResolutionDialogProps {
  open: boolean;
  selectedConflict: StudentConflict | null;
  onClose: () => void;
  onConfirmResolution: (chosenEntry: TranscriptEntryDetails, originalConflict: StudentConflict) => void;
}

const ConflictResolutionDialog: React.FC<ConflictResolutionDialogProps> = ({
  open,
  selectedConflict,
  onClose,
  onConfirmResolution,
}) => {
  return (
    <Dialog 
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle sx={{ bgcolor: 'error.light', color: 'error.dark', display: 'flex', alignItems: 'center' }}>
        <WarningIcon sx={{ mr: 1 }} />
        Resolve Transcript Conflict
      </DialogTitle>
      
      <DialogContent dividers>
        {selectedConflict && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Student: {selectedConflict.studentName} ({selectedConflict.studentId})
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Department: {selectedConflict.department}
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
              This student has multiple conflicting transcript entries. Please review the differences and select the correct one.
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              {selectedConflict.conflictingEntries.map((entry, index) => (
                <Box key={index} sx={{ flex: 1, mb: { xs: 2, md: 0 } }}>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      height: '100%',
                      borderColor: 'divider',
                      borderWidth: 2
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Version {index + 1}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight="bold">
                        GPA: <span style={{ color: 'error.main' }}>{entry.gpa}</span>
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="subtitle2" gutterBottom>
                      Courses:
                    </Typography>
                    
                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Credit</TableCell>
                            <TableCell align="right">Grade</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {entry.courses && entry.courses.map((course, idx) => (
                            <TableRow key={idx}>
                              <TableCell>{course.courseCode}</TableCell>
                              <TableCell>{course.courseName}</TableCell>
                              <TableCell align="right">{course.credit}</TableCell>
                              <TableCell align="right">{course.grade}</TableCell>
                            </TableRow>
                          ))}
                          {(!entry.courses || entry.courses.length === 0) && (
                            <TableRow>
                              <TableCell colSpan={4} align="center">No course data available</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => onConfirmResolution(entry, selectedConflict!)}
                    >
                      Select This Version
                    </Button>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConflictResolutionDialog; 