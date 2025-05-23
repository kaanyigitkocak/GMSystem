import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import type { StudentData } from '../hooks/useDetermineCertificates';

interface CertificatesTableProps {
  combinedRankings: StudentData[];
  onExport: () => void;
}

const CertificatesTable = ({ combinedRankings, onExport }: CertificatesTableProps) => {
  if (combinedRankings.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Certificate Determinations
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={onExport}
        >
          Export to Excel
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">GPA</TableCell>
              <TableCell>Certificate Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinedRankings.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell align="right">{student.gpa.toFixed(2)}</TableCell>
                <TableCell>
                  <Typography
                    color={
                      student.certificateType === 'High Honors'
                        ? 'success.main'
                        : student.certificateType === 'Honors'
                        ? 'warning.main'
                        : 'text.secondary'
                    }
                    fontWeight={student.certificateType ? 'bold' : 'normal'}
                  >
                    {student.certificateType || 'No Certificate'}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CertificatesTable; 