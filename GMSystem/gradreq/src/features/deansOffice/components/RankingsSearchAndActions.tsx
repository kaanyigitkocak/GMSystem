import { Box, TextField, InputAdornment, Button, Paper, MenuItem, Chip, Typography, Divider } from '@mui/material';
import { Search as SearchIcon, FileDownload as FileDownloadIcon, Refresh as RefreshIcon, Clear as ClearIcon } from '@mui/icons-material';
import type { StudentRecord, FilterOptions, UniversityRankingResult } from '../types';
import { faculties } from '../../../shared/faculties';

interface RankingsSearchAndActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading: boolean;
  onRefresh: () => Promise<void>;
  onApproveAll: () => void;
  onExport: () => void;
  filteredData: StudentRecord[];
  filters: FilterOptions;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  universityRanking: UniversityRankingResult | null;
}

const RankingsSearchAndActions = ({
  searchQuery,
  onSearchChange,
  isLoading,
  onRefresh,
  onApproveAll,
  onExport,
  filteredData,
  filters,
  updateFilters,
  clearFilters,
  universityRanking
}: RankingsSearchAndActionsProps) => {
  // Get departments from faculties
  const facultyName = 'Faculty of Engineering';
  const faculty = faculties.find(f => f.name === facultyName);
  const departments = faculty ? faculty.departments : [];

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      {/* Statistics Section */}
      {universityRanking && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ranking Overview
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Chip 
              label={`Total Students: ${universityRanking.metadata.totalStudents}`}
              color="info"
              variant="outlined"
            />
            <Chip 
              label={`Pending Reviews: ${universityRanking.metadata.pendingReviews}`}
              color="warning"
              variant="outlined"
            />
            <Chip 
              label={`Approved: ${universityRanking.metadata.approvedStudents}`}
              color="success"
              variant="outlined"
            />
            <Chip 
              label={`Rejected: ${universityRanking.metadata.rejectedStudents}`}
              color="error"
              variant="outlined"
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Last updated: {new Date(universityRanking.metadata.lastUpdated).toLocaleString()}
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
        </Box>
      )}

      {/* Search and Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2 }}>
        <TextField
          label="Search Students"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', sm: '50%', md: '30%' } }}
        />

        {/* Department Filter */}
        <TextField
          select
          label="Department"
          value={filters.department || ''}
          onChange={(e) => updateFilters({ department: e.target.value || undefined })}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All Departments</MenuItem>
          {departments.map(dept => (
            <MenuItem key={dept} value={dept}>{dept}</MenuItem>
          ))}
        </TextField>

        {/* Status Filter */}
        <TextField
          select
          label="Status"
          value={filters.status || 'all'}
          onChange={(e) => updateFilters({ status: e.target.value as any })}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>

        {/* GPA Range */}
        <TextField
          label="Min GPA"
          type="number"
          size="small"
          value={filters.minGpa || ''}
          onChange={(e) => updateFilters({ minGpa: e.target.value ? parseFloat(e.target.value) : undefined })}
          inputProps={{ min: 0, max: 4, step: 0.1 }}
          sx={{ width: 100 }}
        />

        <TextField
          label="Max GPA"
          type="number"
          size="small"
          value={filters.maxGpa || ''}
          onChange={(e) => updateFilters({ maxGpa: e.target.value ? parseFloat(e.target.value) : undefined })}
          inputProps={{ min: 0, max: 4, step: 0.1 }}
          sx={{ width: 100 }}
        />

        <Button 
          variant="outlined" 
          startIcon={<ClearIcon />} 
          onClick={clearFilters}
          size="small"
        >
          Clear Filters
        </Button>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          disabled={isLoading}
        >
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
        
        <Button
          variant="contained"
          color="success"
          onClick={onApproveAll}
        >
          Approve All Eligible
        </Button>
        
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={onExport}
          disabled={filteredData.length === 0}
        >
          Export to CSV
        </Button>
      </Box>
    </Paper>
  );
};

export default RankingsSearchAndActions; 