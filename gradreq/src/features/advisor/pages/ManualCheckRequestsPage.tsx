import { useState } from 'react';
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Chip } from '@mui/material';

const mockRequests = [
  { id: '1', student: 'Jane Smith', studentId: '20201001', date: '2024-05-10', reason: 'Article 19', status: 'Pending', notes: '' },
  { id: '2', student: 'John Doe', studentId: '20201002', date: '2024-05-12', reason: 'Summer School', status: 'In Review', notes: 'Waiting for transcript.' },
];
const statusOptions = ['Pending', 'In Review', 'Completed'];

const ManualCheckRequestsPage = () => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  const handleOpen = (req: any) => {
    setSelected(req);
    setStatus(req.status);
    setNotes(req.notes);
    setOpen(true);
  };

  const handleSave = () => {
    // Save logic here
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Manual Check Requests</Typography>
      <Card>
        <CardContent>
          <List>
            {mockRequests.map(req => (
              <ListItem key={req.id} divider>
                <ListItemText
                  primary={`${req.student} (${req.studentId})`}
                  secondary={`Date: ${req.date} | Reason: ${req.reason}`}
                />
                <Chip label={req.status} color={req.status === 'Completed' ? 'success' : req.status === 'In Review' ? 'warning' : 'default'} sx={{ mr: 2 }} />
                <Button variant="outlined" size="small" onClick={() => handleOpen(req)}>Review</Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Manual Check Request</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">Student: {selected?.student} ({selected?.studentId})</Typography>
          <Typography variant="body2">Date: {selected?.date}</Typography>
          <Typography variant="body2">Reason: {selected?.reason}</Typography>
          <TextField
            select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
          <Button variant="outlined" color="info">Notify Student</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManualCheckRequestsPage; 