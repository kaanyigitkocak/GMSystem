import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

interface RejectDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (rejectionReason: string) => void;
  studentName: string; // To display which student is being rejected
}

const RejectDialog: React.FC<RejectDialogProps> = ({ open, onClose, onConfirm, studentName }) => {
  const [rejectionReason, setRejectionReason] = useState('');

  const handleConfirm = () => {
    onConfirm(rejectionReason);
    setRejectionReason(''); // Reset reason for next time
    onClose();
  };

  const handleClose = () => {
    setRejectionReason(''); // Reset reason
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reject Graduation Application</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Please enter the reason for rejecting the graduation application for <strong>{studentName}</strong>.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="rejectionReason"
          label="Rejection Reason"
          type="text"
          fullWidth
          variant="outlined"
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          multiline
          rows={4}
          placeholder="Enter detailed reason for rejection..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleConfirm} 
          disabled={!rejectionReason.trim()}
          color="error"
          variant="contained"
        >
          Reject Student
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectDialog; 