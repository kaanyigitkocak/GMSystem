import { Box, TextField, InputAdornment, Button, Paper } from '@mui/material';
import { Search as SearchIcon, FileDownload as FileDownloadIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import type { StudentRanking } from '../hooks/useUniversityRankings';

interface RankingsSearchAndActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading: boolean;
  onRefresh: () => Promise<void>;
  onApproveAll: () => void;
  onExport: () => void;
  filteredData: StudentRanking[];
}

const RankingsSearchAndActions = ({
  searchQuery,
  onSearchChange,
  isLoading,
  onRefresh,
  onApproveAll,
  onExport,
  filteredData
}: RankingsSearchAndActionsProps) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
        
        <Box sx={{ display: 'flex', gap: 1 }}>
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
            Approve All
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
      </Box>
    </Paper>
  );
};

export default RankingsSearchAndActions; 