import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'; // Assuming Material-UI

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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reject Graduation Application</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the reason for rejecting the graduation application for {studentName}.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="rejectionReason"
          label="Rejection Reason"
          type="text"
          fullWidth
          variant="standard"
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} disabled={!rejectionReason.trim()}>Reject</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RejectDialog; 