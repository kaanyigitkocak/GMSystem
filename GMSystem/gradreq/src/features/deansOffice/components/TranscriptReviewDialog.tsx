import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Alert,
  TextField,
  Divider
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';
import type { StudentRecord } from '../types';

interface TranscriptReviewDialogProps {
  open: boolean;
  student: StudentRecord | null;
  onClose: () => void;
  onApprove: (studentId: string) => void;
  onDisapprove: (studentId: string) => void;
}

const TranscriptReviewDialog = ({
  open,
  student,
  onClose,
  onApprove,
  onDisapprove
}: TranscriptReviewDialogProps) => {
  const [reviewNote, setReviewNote] = useState('');

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  // Handle approve
  const handleApprove = () => {
    if (student) {
      onApprove(student.studentId);
      setReviewNote('');
      onClose();
    }
  };

  // Handle disapprove
  const handleDisapprove = () => {
    if (student) {
      onDisapprove(student.studentId);
      setReviewNote('');
      onClose();
    }
  };

  if (!student) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Transcript Review - {student.name} {student.surname}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Student Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Student ID
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {student.studentId}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="body1">
                {student.department}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Faculty
              </Typography>
              <Typography variant="body1">
                {student.faculty}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                University Rank
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                #{student.rank}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                GPA
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="primary">
                {student.gpa.toFixed(2)}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Credits
              </Typography>
              <Typography variant="body1">
                {student.completedCredits}/{student.totalCredits}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Graduation Eligible
              </Typography>
              <Chip
                label={student.graduationEligible ? 'Yes' : 'No'}
                color={student.graduationEligible ? 'success' : 'error'}
                size="small"
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Current Status
              </Typography>
              <Chip
                label={student.transcriptStatus.toUpperCase()}
                color={getStatusColor(student.transcriptStatus) as any}
                size="small"
              />
            </Box>
          </Box>

          {/* Previous review note */}
          {student.reviewNote && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Previous Review Note:
              </Typography>
              <Typography variant="body2">
                {student.reviewNote}
              </Typography>
            </Alert>
          )}

          {/* Submission date */}
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Submission Date:</strong> {new Date(student.submissionDate).toLocaleDateString()}
              {student.reviewDate && (
                <span>
                  <br />
                  <strong>Last Review:</strong> {new Date(student.reviewDate).toLocaleDateString()}
                </span>
              )}
            </Typography>
          </Alert>

          {/* New review note */}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Review Note (Optional)"
            value={reviewNote}
            onChange={(e) => setReviewNote(e.target.value)}
            placeholder="Add any notes for this decision..."
            sx={{ mt: 2 }}
          />
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        
        <Button
          variant="contained"
          color="error"
          startIcon={<CloseIcon />}
          onClick={handleDisapprove}
          disabled={student.transcriptStatus === 'rejected'}
        >
          Reject
        </Button>
        
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={handleApprove}
          disabled={student.transcriptStatus === 'approved'}
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TranscriptReviewDialog; 