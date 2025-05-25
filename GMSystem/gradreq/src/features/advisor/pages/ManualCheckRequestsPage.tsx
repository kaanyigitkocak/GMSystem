import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  MenuItem, 
  Chip,
  Alert
} from '@mui/material';
import { useManualCheckRequests } from '../hooks/useManualCheckRequests';
import type { ManualCheckRequest } from '../services/types/dashboard';
import { LoadingOverlay } from '../../../shared/components';

const statusOptions: Array<ManualCheckRequest['status']> = ['Pending', 'In Review', 'Completed', 'Rejected'];

const ManualCheckRequestsPage = () => {
  const { requests, loading, error, updateRequest } = useManualCheckRequests();
  const [selected, setSelected] = useState<ManualCheckRequest | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ManualCheckRequest['status']>('Pending');
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);
  const handleOpen = (req: ManualCheckRequest) => {
    setSelected(req);
    setStatus(req.status);
    setNotes(req.notes);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!selected) return;
    
    try {
      setUpdating(true);
      await updateRequest(selected.id, { status, notes });
      setOpen(false);
    } catch (error) {
      console.error('Failed to update request:', error);
    } finally {
      setUpdating(false);
    }
  };
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      <LoadingOverlay 
        isLoading={loading} 
        message="Loading manual check requests..."
        color="info"
      />
      
      <Typography variant="h4" gutterBottom>Manual Check Requests</Typography>
      <Card>
        <CardContent>
          <List>
            {requests.map(req => (
              <ListItem key={req.id} divider>
                <ListItemText
                  primary={`${req.student} (${req.studentId})`}
                  secondary={`Date: ${req.date} | Reason: ${req.reason}`}
                />
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip 
                    label={req.priority} 
                    size="small"
                    color={
                      req.priority === 'high' ? 'error' : 
                      req.priority === 'medium' ? 'warning' : 'default'
                    }
                  />
                  <Chip 
                    label={req.status} 
                    color={req.status === 'Completed' ? 'success' : req.status === 'In Review' ? 'warning' : 'default'} 
                    sx={{ mr: 2 }} 
                  />
                  <Button variant="outlined" size="small" onClick={() => handleOpen(req)}>
                    Review
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Manual Check Request</DialogTitle>
        <DialogContent sx={{ position: 'relative' }}>
          <LoadingOverlay 
            isLoading={updating} 
            message="Updating request..."
            color="primary"
          />
          
          <Typography variant="subtitle2">Student: {selected?.student} ({selected?.studentId})</Typography>
          <Typography variant="body2">Date: {selected?.date}</Typography>
          <Typography variant="body2">Reason: {selected?.reason}</Typography><TextField
            select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value as ManualCheckRequest['status'])}
            fullWidth
            sx={{ mt: 2 }}
          >
            {statusOptions.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            fullWidth
            multiline
            minRows={3}
            sx={{ mt: 2 }}
          />
        </DialogContent>        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={updating}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            disabled={updating}
          >
            Save
          </Button>
          <Button variant="outlined" color="info" disabled={updating}>
            Notify Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManualCheckRequestsPage; 