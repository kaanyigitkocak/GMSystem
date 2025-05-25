import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

interface StartGraduationProcessDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (academicTerm: string) => Promise<void>;
}

const StartGraduationProcessDialog: React.FC<StartGraduationProcessDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [academicTerm, setAcademicTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!academicTerm.trim()) {
      setError('Academic term is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onConfirm(academicTerm.trim());
      handleClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start graduation process';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setAcademicTerm('');
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={loading}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        <Typography variant="h6">Start Graduation Process</Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to start the graduation process for all students?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            This action will initiate the graduation process for all eligible students in the system. 
            This process cannot be undone.
          </Typography>
          
          <TextField
            label="Academic Term"
            placeholder="e.g., Spring 2025"
            value={academicTerm}
            onChange={(e) => setAcademicTerm(e.target.value)}
            fullWidth
            required
            disabled={loading}
            helperText="Enter the academic term for this graduation process"
          />
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="warning"
          disabled={loading || !academicTerm.trim()}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? 'Starting...' : 'Yes, Start Process'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartGraduationProcessDialog; 