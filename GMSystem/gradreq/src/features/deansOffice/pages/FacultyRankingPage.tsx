import React, { useState } from 'react';
import { Box, Typography, Alert, AlertTitle } from '@mui/material';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';
import { useFacultyRanking } from '../hooks/useFacultyRanking';
import RankingsSearchAndActions from '../components/RankingsSearchAndActions';
import UniversityRankingsTable from '../components/UniversityRankingsTable';
import TranscriptDialog from '../components/TranscriptDialog';
import { exportUniversityRankingsToCSV } from '../utils/exportUtils';
import { getStudentTranscript } from '../services/transcriptService';
import type { StudentRecord } from '../types';
import type { StudentTranscript } from '../components/TranscriptDialog';

const FacultyRankingPage: React.FC = () => {
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<StudentTranscript | null>(null);
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    universityRanking,
    filteredRankings,
    isLoading,
    error,
    filters,
    sortOptions,
    fetchUniversityRanking,
    handleTranscriptAction,
    updateFilters,
    updateSort,
    clearFilters,
  } = useFacultyRanking();

  // Filter by search query
  const searchFilteredData = filteredRankings.filter(student => 
    searchQuery === '' ||
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.includes(searchQuery) ||
    student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle export to CSV
  const handleExportRankings = () => {
    try {
      exportUniversityRankingsToCSV(searchFilteredData);
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  // Handle view transcript with dialog - like Student Affairs
  const handleViewTranscript = async (studentId: string) => {
    const student = searchFilteredData.find(s => s.studentId === studentId);
    if (!student) return;

    setLoadingTranscript(true);
    try {
      const transcript = await getStudentTranscript(
        student.studentId,
        `${student.name} ${student.surname}`,
        student.department,
        student.faculty,
        student.gpa,
        student.totalCredits
      );
      setSelectedTranscript(transcript);
      setTranscriptDialogOpen(true);
    } catch (err) {
      console.error('Failed to load transcript:', err);
    } finally {
      setLoadingTranscript(false);
    }
  };

  // Handle close transcript dialog
  const handleCloseTranscriptDialog = () => {
    setTranscriptDialogOpen(false);
    setSelectedTranscript(null);
  };

  // Handle approve student
  const handleApprove = async (studentId: string) => {
    await handleTranscriptAction({
      studentId,
      action: 'approve'
    });
  };

  // Handle disapprove student  
  const handleDisapprove = async (studentId: string) => {
    await handleTranscriptAction({
      studentId,
      action: 'reject'
    });
  };

  // Handle approve all eligible students
  const handleApproveAll = () => {
    const eligibleStudents = searchFilteredData.filter(s => 
      s.graduationEligible && s.transcriptStatus === 'pending'
    );
    
    eligibleStudents.forEach(student => {
      handleTranscriptAction({
        studentId: student.studentId,
        action: 'approve'
      });
    });
  };

  return (
    <DeansOfficeDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          University Rankings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage university-wide student rankings for graduation approval
        </Typography>
      </Box>
      
      {/* Error alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => window.location.reload()}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      
      {/* Search and Actions */}
      <RankingsSearchAndActions
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoading={isLoading}
        onRefresh={fetchUniversityRanking}
        onApproveAll={handleApproveAll}
        onExport={handleExportRankings}
        filteredData={searchFilteredData}
        filters={filters}
        updateFilters={updateFilters}
        clearFilters={clearFilters}
        universityRanking={universityRanking}
      />
      
      {/* Rankings Table */}
      <UniversityRankingsTable
        filteredData={searchFilteredData}
        isLoading={isLoading || loadingTranscript}
        
        // Sorting
        sortOptions={sortOptions}
        onRequestSort={updateSort}
        
        // Actions
        onApprove={handleApprove}
        onDisapprove={handleDisapprove}
        onViewTranscript={handleViewTranscript}
      />

      {/* Transcript Dialog - Student Affairs style */}
      <TranscriptDialog
        open={transcriptDialogOpen}
        transcript={selectedTranscript}
        onClose={handleCloseTranscriptDialog}
      />
    </DeansOfficeDashboardLayout>
  );
};

export default FacultyRankingPage;
