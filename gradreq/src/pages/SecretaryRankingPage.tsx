import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  AlertTitle,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Chip,
  Card,
  CardContent,
  CardActions,
  Divider,
  TextField
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  FileDownload as FileDownloadIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import SecretaryDashboard from '../components/layout/SecretaryDashboard';
import { uploadTranscripts, generateDepartmentRanking, exportResultsToFile } from '../services/secretaryService';
import type { TranscriptFile, RankingListItem } from '../types/secretary';

const SecretaryRankingPage = () => {
  const [uploadedFile, setUploadedFile] = useState<TranscriptFile | null>(null);
  const [rankingList, setRankingList] = useState<RankingListItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportFormat, setExportFormat] = useState('xlsx');
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const filesArray = Array.from(files);
      // Only use the first file
      const file = filesArray[0];
      const uploadedFilesData = await uploadTranscripts([file]);
      setUploadedFile(uploadedFilesData[0]);
    } catch (err) {
      setError('Mezun listesi dosyası yüklenirken bir hata oluştu. Lütfen dosya formatını kontrol edin.');
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleGenerateRanking = async () => {
    if (!uploadedFile) {
      setError('İşlem yapılacak mezun listesi dosyası bulunmamaktadır.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await generateDepartmentRanking([uploadedFile.id]);
      setRankingList(result);
    } catch (err) {
      setError('Sıralama listesi oluşturulurken bir hata oluştu.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportResults = async () => {
    if (rankingList.length === 0) {
      setError('Dışa aktarılacak sıralama listesi bulunmamaktadır.');
      return;
    }

    setIsExporting(true);
    setError(null);
    
    try {
      const url = await exportResultsToFile(
        rankingList,
        exportFormat as 'csv' | 'xlsx' | 'pdf'
      );
      setDownloadUrl(url);
    } catch (err) {
      setError('Sıralama listesi dışa aktarılırken bir hata oluştu.');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredRankingList = rankingList.filter(
    student => 
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SecretaryDashboard>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Bölüm Mezuniyet Sıralaması
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Mezuniyet hakkı kazanan öğrencilerin GANO'ya göre bölüm içi sıralamasını oluşturabilirsiniz.
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setError(null)}
          >
            <AlertTitle>Hata</AlertTitle>
            {error}
          </Alert>
        )}

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mezun Listesi Yükle
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Mezuniyet hakkı kazanan öğrencilerin listesini içeren dosyayı yükleyin. 
              Bu dosya, "Transkript İşlemleri" sayfasında oluşturduğunuz mezun olabilecek öğrencilerin listesi olmalıdır.
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                sx={{ mr: 2 }}
              >
                {isUploading ? 'Yükleniyor...' : 'Dosya Yükle'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              
              <Button
                variant="outlined"
                startIcon={<SortIcon />}
                onClick={handleGenerateRanking}
                disabled={!uploadedFile || isProcessing}
              >
                {isProcessing ? 'İşleniyor...' : 'Sıralama Oluştur'}
              </Button>
            </Box>
            
            {uploadedFile && (
              <Alert severity="success" sx={{ mb: 2 }}>
                <AlertTitle>Dosya Yüklendi</AlertTitle>
                <Typography variant="body2">
                  <strong>Dosya:</strong> {uploadedFile.fileName}
                </Typography>
                <Typography variant="body2">
                  <strong>Yükleme Tarihi:</strong> {new Date(uploadedFile.uploadDate).toLocaleString('tr-TR')}
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>

        {rankingList.length > 0 && (
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Mezuniyet Sıralama Listesi
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
                    <InputLabel id="export-format-label">Format</InputLabel>
                    <Select
                      labelId="export-format-label"
                      value={exportFormat}
                      label="Format"
                      onChange={(e) => setExportFormat(e.target.value)}
                    >
                      <MenuItem value="xlsx">Excel (XLSX)</MenuItem>
                      <MenuItem value="csv">CSV</MenuItem>
                      <MenuItem value="pdf">PDF</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleExportResults}
                    disabled={isExporting}
                  >
                    {isExporting ? 'Hazırlanıyor...' : 'Dışa Aktar'}
                  </Button>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Öğrenci adı veya numarası ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                  }}
                />
              </Box>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell width="10%">Sıralama</TableCell>
                      <TableCell>Öğrenci No</TableCell>
                      <TableCell>Öğrenci Adı</TableCell>
                      <TableCell>Bölüm</TableCell>
                      <TableCell align="right">GANO</TableCell>
                      <TableCell align="right">Toplam Kredi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRankingList.length > 0 ? (
                      filteredRankingList.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Chip 
                              label={student.rank} 
                              color={student.rank <= 3 ? 'primary' : 'default'} 
                              size="small" 
                              sx={{ 
                                fontWeight: student.rank <= 3 ? 'bold' : 'normal',
                                minWidth: '30px'
                              }} 
                            />
                          </TableCell>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.studentName}</TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell align="right">{student.gpa.toFixed(2)}</TableCell>
                          <TableCell align="right">{student.totalCredits}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography color="text.secondary">
                            {searchTerm ? 'Arama kriterlerine uygun öğrenci bulunamadı.' : 'Sıralama listesi boş.'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            
            {downloadUrl && (
              <>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    İndirin
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        )}
        
        {(isUploading || isProcessing) && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              {isUploading ? 'Dosya yükleniyor...' : 'Sıralama oluşturuluyor...'}
            </Typography>
          </Box>
        )}
      </Box>
    </SecretaryDashboard>
  );
};

export default SecretaryRankingPage; 