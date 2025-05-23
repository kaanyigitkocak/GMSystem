import { Box, Typography, Alert, AlertTitle } from '@mui/material';
import { useState } from 'react';
import StudentAffairsDashboardLayout from '../layout/StudentAffairsDashboardLayout';
import { useUniversityRankings } from '../hooks';
import RankingsSearchAndActions from '../components/RankingsSearchAndActions';
import RankingsTable from '../components/RankingsTable';
import TranscriptDialog from '../components/TranscriptDialog';
import { exportRankingsToCSV } from '../utils/exportUtils';
import { getStudentTranscript } from '../services';
import type { StudentTranscript } from '../components/TranscriptDialog';

const UniversityRankingsPage = () => {
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<StudentTranscript | null>(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);

  const {
    // State
    isLoading,
    error,
    warnings,
    searchQuery,
    
    // Computed data
    filteredData,
    sortedData,
    paginatedData,
    
    // Table controls
    order,
    orderBy,
    page,
    rowsPerPage,
    approvalStatus,
    
    // Actions
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    setSearchQuery,
    handleApprove,
    handleDisapprove,
    handleApproveAll,
    refreshRanking,
    setError,
    setWarnings
  } = useUniversityRankings();

  // Handle export to CSV
  const handleExportRankings = () => {
    try {
      exportRankingsToCSV(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export data');
    }
  };

  // Handle view transcript with dialog
  const handleViewTranscript = async (studentId: string) => {
    const student = sortedData.find(s => s.studentId === studentId);
    if (!student) return;

    setLoadingTranscript(true);
    try {
      const transcript = await getStudentTranscript(
        student.studentId,
        student.name,
        student.department,
        student.faculty,
        student.gpa,
        student.credits
      );
      setSelectedTranscript(transcript);
      setTranscriptDialogOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transcript');
    } finally {
      setLoadingTranscript(false);
    }
  };

  const handleCloseTranscriptDialog = () => {
    setTranscriptDialogOpen(false);
    setSelectedTranscript(null);
  };

  return (
    <StudentAffairsDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          University Rankings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage university-wide student rankings for graduation
        </Typography>
      </Box>
      
      {/* Error alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      
      {/* Warning alerts */}
      {warnings.length > 0 && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          onClose={() => setWarnings([])}
        >
          <AlertTitle>Warnings</AlertTitle>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </Alert>
      )}
      
      {/* Search and Actions */}
      <RankingsSearchAndActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoading={isLoading}
        onRefresh={refreshRanking}
        onApproveAll={handleApproveAll}
        onExport={handleExportRankings}
        filteredData={filteredData}
      />
      
      {/* Rankings Table */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={3}>
        <Box gridColumn={{ xs: 'span 12', lg: 'span 12' }}>
          <RankingsTable
            paginatedData={paginatedData}
            isLoading={isLoading || loadingTranscript}
            filteredDataLength={filteredData.length}
            
            // Sorting
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            
            // Pagination
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            
            // Actions
            approvalStatus={approvalStatus}
            onApprove={handleApprove}
            onDisapprove={handleDisapprove}
            onViewTranscript={handleViewTranscript}
          />
        </Box>
      </Box>

      {/* Transcript Dialog */}
      <TranscriptDialog
        open={transcriptDialogOpen}
        transcript={selectedTranscript}
        onClose={handleCloseTranscriptDialog}
      />
    </StudentAffairsDashboardLayout>
  );
};

export default UniversityRankingsPage;
