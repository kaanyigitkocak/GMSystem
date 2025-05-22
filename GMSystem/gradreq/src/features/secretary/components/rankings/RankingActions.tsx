import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import {
  Print as PrintIcon,
  FileDownload as FileDownloadIcon,
  Check as CheckIcon,
} from '@mui/icons-material';

interface RankingActionsProps {
  departmentName: string;
  studentCount: number;
  onGeneratePDF: () => void;
  onExportCSV: () => void;
  onApproveAll: () => void;
}

const RankingActions: React.FC<RankingActionsProps> = ({
  departmentName,
  studentCount,
  onGeneratePDF,
  onExportCSV,
  onApproveAll,
}) => {
  return (
    <Paper sx={{ p: 3, width: '100%' }}>
      <Typography variant="h6" gutterBottom fontWeight="medium">
        Actions
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Generate reports and manage graduation approvals for {departmentName}.
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 2, 
        mb: 3 
      }}>
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={onGeneratePDF}
          sx={{ flex: 1, minHeight: '48px' }}
        >
          Generate PDF Report
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={onExportCSV}
          sx={{ flex: 1, minHeight: '48px' }}
        >
          Export CSV
        </Button>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mb: 2
      }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={onApproveAll}
          sx={{ minHeight: '48px', px: 4 }}
        >
          Approve All Students ({studentCount})
        </Button>
      </Box>
      
      <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block' }}>
        This will approve all students for graduation. This action cannot be undone.
      </Typography>
    </Paper>
  );
};

export default RankingActions; 