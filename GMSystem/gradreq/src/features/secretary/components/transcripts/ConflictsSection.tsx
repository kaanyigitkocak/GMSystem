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
} from '@mui/material';
import {
  Warning as WarningIcon,
} from '@mui/icons-material';
import type { StudentConflict } from '../../services/types';

interface ConflictsSectionProps {
  conflicts: StudentConflict[];
  onResolveConflict: (conflict: StudentConflict) => void;
}

const ConflictsSection: React.FC<ConflictsSectionProps> = ({
  conflicts,
  onResolveConflict,
}) => {
  if (conflicts.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mt: 3, bgcolor: 'error.light', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <WarningIcon color="error" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="medium" color="error.dark">
          Conflicts Requiring Review
        </Typography>
      </Box>
      
      <Typography variant="body2" color="error.dark" paragraph>
        The following students have conflicting transcript entries that need to be resolved.
      </Typography>
      
      <TableContainer sx={{ width: '100%' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conflicts.map((conflict) => (
              <TableRow key={conflict.id}>
                <TableCell>{conflict.studentId}</TableCell>
                <TableCell>{conflict.studentName}</TableCell>
                <TableCell>{conflict.department}</TableCell>
                <TableCell>{conflict.fileName || 'Unknown'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onResolveConflict(conflict)}
                  >
                    Resolve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ConflictsSection; 