import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography,
  Grid,
  Divider,
  Button,
  TextField,
  CircularProgress,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  IconButton,
  InputAdornment,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Card,
  CardContent
} from '@mui/material';
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import AdvisorDashboardLayout from '../layout/AdvisorDashboardLayout';
import { getManualCheckRequests, updateManualCheckRequest } from '../services/advisorService';
import { ManualCheckRequest } from '../types';

const ManualCheckRequestsPage = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<ManualCheckRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ManualCheckRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ManualCheckRequest | null>(null);
  const [reviewStatus, setReviewStatus] = useState<ManualCheckRequest['status']>('pending');
  const [reviewNotes, setReviewNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await getManualCheckRequests();
        setRequests(data);
        setFilteredRequests(data);
      } catch (err) {
        console.error('Error fetching manual check requests:', err);
        setError('Failed to load manual check requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = requests.filter(
        request => 
          request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.studentId.includes(searchQuery) ||
          request.requestType.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(requests);
    }
  }, [searchQuery, requests]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleViewDetails = (request: ManualCheckRequest) => {
    setSelectedRequest(request);
    setReviewStatus(request.status);
    setReviewNotes('');
    setDetailsDialogOpen(true);
    setSubmitSuccess(false);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
    setSelectedRequest(null);
  };

  const handleSubmitReview = async () => {
    if (!selectedRequest) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updateManualCheckRequest(selectedRequest.id, reviewStatus);
      
      // Update the request in the state
      const updatedRequests = requests.map(req => 
        req.id === selectedRequest.id
          ? { ...req, status: reviewStatus }
          : req
      );
      
      setRequests(updatedRequests);
      setFilteredRequests(updatedRequests.filter(
        req => 
          req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          req.studentId.includes(searchQuery) ||
          req.requestType.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      
      setSubmitSuccess(true);
    } catch (err) {
      console.error('Error updating manual check request:', err);
      setError('Failed to update the request status. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusChip = (status: ManualCheckRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Chip size="small" label="Pending" color="warning" />;
      case 'approved':
        return <Chip size="small" label="Approved" color="success" />;
      case 'rejected':
        return <Chip size="small" label="Rejected" color="error" />;
      case 'reviewing':
        return <Chip size="small" label="Reviewing" color="info" />;
      default:
        return <Chip size="small" label={status} />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <AdvisorDashboardLayout>
      <Box sx={{ mb: 4 }}>
        {/* Page Header */}
        <Typography variant="h4" gutterBottom>
          Manual Check Requests
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Review and process special case graduation check requests from your students. These may include Article 19 evaluations, 
          summer school credits, or other exceptions to standard graduation requirements.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
        )}

        {/* Search and Filter */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by student name or request type"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { md: 'right' } }}>
              <Typography variant="body2" color="text.secondary">
                Total Requests: <strong>{requests.length}</strong> | Showing: <strong>{filteredRequests.length}</strong>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Request Stats */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                <Typography variant="h5" color="primary" fontWeight="medium">
                  {requests.filter(req => req.status === 'pending').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                <Typography variant="h5" color="info.main" fontWeight="medium">
                  {requests.filter(req => req.status === 'reviewing').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reviewing
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                <Typography variant="h5" color="success.main" fontWeight="medium">
                  {requests.filter(req => req.status === 'approved').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Approved
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                <Typography variant="h5" color="error.main" fontWeight="medium">
                  {requests.filter(req => req.status === 'rejected').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rejected
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Requests List */}
        {loading ? (
          <Box display="flex" justifyContent="center" sx={{ py: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredRequests.length === 0 ? (
          <Paper sx={{ p: 5, textAlign: 'center' }}>
            <Typography variant="h6">No requests found</Typography>
            <Typography variant="body2" color="text.secondary">
              Adjust your search criteria or try again later
            </Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="manual check requests table">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Request Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>{request.studentId}</TableCell>
                    <TableCell>{request.studentName}</TableCell>
                    <TableCell>{request.requestType}</TableCell>
                    <TableCell>{formatDate(request.date)}</TableCell>
                    <TableCell>{getStatusChip(request.status)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Details & Process">
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(request)}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Contact Student">
                        <IconButton
                          size="small"
                        >
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      
      {/* Request Details Dialog */}
      <Dialog 
        open={detailsDialogOpen} 
        onClose={handleDetailsDialogClose} 
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Manual Check Request Details
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <>
              {submitSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Request status updated successfully!
                </Alert>
              )}
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Student:</Typography>
                  <Typography variant="body1">{selectedRequest.studentName}</Typography>
                  <Typography variant="caption" color="text.secondary">ID: {selectedRequest.studentId}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Request Type:</Typography>
                  <Typography variant="body1">{selectedRequest.requestType}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Submission Date:</Typography>
                  <Typography variant="body1">{formatDate(selectedRequest.date)}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2">Current Status:</Typography>
                  {getStatusChip(selectedRequest.status)}
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Request Reason:</Typography>
                  <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f9f9f9', mb: 3 }}>
                    <Typography variant="body2">{selectedRequest.reason}</Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ mb: 2 }}>
                    <Typography variant="subtitle2">Review this Request</Typography>
                  </Divider>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="status-select-label">Update Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      value={reviewStatus}
                      onChange={(e) => setReviewStatus(e.target.value as ManualCheckRequest['status'])}
                      label="Update Status"
                    >
                      <MenuItem value="reviewing">Reviewing</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Review Notes"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Enter any notes regarding this request review (optional)"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handleSubmitReview}
                      disabled={isSubmitting || submitSuccess}
                      sx={{ mt: 2 }}
                    >
                      {isSubmitting ? <CircularProgress size={24} /> : 'Submit Review'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </AdvisorDashboardLayout>
  );
};

export default ManualCheckRequestsPage;
