// filepath: /Users/eraykocabozdogan/Desktop/Eray/github/shut/GMSystem/gradreq/src/features/deansOffice/pages/FileUploadPage.tsx
import {
  Box,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Divider,
  Chip,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  Sync as SyncIcon,
  Warning as WarningIcon,
  InfoOutlined as InfoIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import DeansOfficeDashboardLayout from '../layout/DeansOfficeDashboardLayout';
import { useFileUpload } from '../hooks';
import { FileUploadArea, UploadedFilesList } from '../components';

const FileUploadPage = () => {
  const {
    files,
    validationSummary,
    dragActive,
    uploading,
    success,
    error,
    warnings,
    fileInputRef,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleFiles,
    handleRemoveFile,
    handleProcessFiles,
    clearError,
    clearWarnings
  } = useFileUpload();

  return (
    <DeansOfficeDashboardLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          File Upload
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload department ranking files to create faculty-wide rankings.
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={clearError}
          action={
            <Button color="inherit" size="small" onClick={clearError}>
              <CloseIcon fontSize="small" />
            </Button>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      {/* Warning Alert */}
      {warnings.length > 0 && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          onClose={clearWarnings}
          action={
            <Button color="inherit" size="small" onClick={clearWarnings}>
              <CloseIcon fontSize="small" />
            </Button>
          }
        >
          <AlertTitle>Warning</AlertTitle>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <AlertTitle>Success</AlertTitle>
          Files processed successfully! Faculty rankings have been updated.
        </Alert>
      )}

      {/* File Upload Area */}
      <FileUploadArea
        dragActive={dragActive}
        fileInputRef={fileInputRef}
        onDrag={handleDrag}
        onDrop={handleDrop}
        onFileChange={handleFileChange}
      />

      {/* Uploaded Files List */}
      <UploadedFilesList
        files={files}
        onRemoveFile={handleRemoveFile}
      />

      {/* Validation Summary */}
      {validationSummary && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon color="info" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Validation Summary
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip 
                label={`Valid Files: ${validationSummary.validFiles}`}
                color="success"
                variant="outlined"
              />
              <Chip 
                label={`Invalid Files: ${validationSummary.invalidFiles}`}
                color="error"
                variant="outlined"
              />
              <Chip 
                label={`Total Students: ${validationSummary.totalStudents}`}
                color="info"
                variant="outlined"
              />
              <Chip 
                label={`Eligible Students: ${validationSummary.eligibleStudents}`}
                color="primary"
                variant="outlined"
              />
            </Box>

            {validationSummary.duplicateStudents && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                <WarningIcon sx={{ mr: 1 }} />
                Duplicate student records detected. Only the latest record will be used.
              </Alert>
            )}

            {validationSummary.mixedGraduationStatus && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <InfoIcon sx={{ mr: 1 }} />
                Some students do not meet graduation criteria and will be excluded from rankings.
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Process Files Button */}
      {files.length > 0 && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleProcessFiles}
            disabled={uploading}
            startIcon={uploading ? <CircularProgress size={20} /> : <SyncIcon />}
            sx={{ minWidth: 200 }}
          >
            {uploading ? 'Processing...' : 'Process Files'}
          </Button>
        </Box>
      )}
    </DeansOfficeDashboardLayout>
  );
};

export default FileUploadPage;
