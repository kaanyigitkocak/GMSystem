import React, { useState, useEffect } from 'react';
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
  TableRow,
  Alert,
  IconButton,
  Divider,
  Chip,
  LinearProgress,
  CircularProgress,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';

import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  PictureAsPdf as PdfIcon,
  TableChart as TableChartIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';
import { 
  getTranscripts, 
  uploadTranscript, 
  deleteTranscript,
  processTranscript,
} from '../services';
import type { TranscriptData } from '../services/types';

/**
 * Extended type definitions for transcript conflict handling
 */
// Represents the detailed data of a single transcript entry, especially for comparison
interface TranscriptEntryDetails {
  studentId: string;
  studentName: string;
  department: string;
  gpa: number;
  courses: Array<{
    courseCode: string;
    courseName: string;
    credit: number;
    grade: string;
    semester: string;
  }>;
  rawData: any; // For storing the original data structure to aid in resolution
}

// Represents a conflict where a student has multiple, differing transcript entries
interface StudentConflict {
  id: string; // A unique identifier for this conflict instance
  studentId: string;
  studentName: string; 
  department: string;
  fileName?: string; // Source file of this conflict
  conflictingEntries: TranscriptEntryDetails[]; // Array of conflicting entries for the student
}

// Expected response structure from the modified uploadTranscript service
interface UploadProcessingResult {
  successfullyAddedTranscripts: TranscriptData[];
  detectedConflicts: StudentConflict[];
}

/**
 * TranscriptProcessingPage Component
 * 
 * Allows secretaries to upload, view, process, and manage student transcripts.
 * Provides functionality to upload PDF or CSV files, process transcripts,
 * and export eligible graduates list.
 */
const TranscriptProcessingPage = () => {
  // State management
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [transcripts, setTranscripts] = useState<TranscriptData[]>([]);
  const [conflicts, setConflicts] = useState<StudentConflict[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // Dialog management state
  const [selectedConflict, setSelectedConflict] = useState<StudentConflict | null>(null);
  const [isConflictResolutionDialogOpen, setIsConflictResolutionDialogOpen] = useState<boolean>(false);

  /**
   * Loads transcript data when component mounts
   */
  useEffect(() => {
    fetchTranscripts();
  }, []);

  /**
   * Fetches transcript data from the service
   */
  const fetchTranscripts = async () => {
    try {
      setLoading(true);
      const data = await getTranscripts();
      setTranscripts(data);
    } catch (error) {
      console.error('Error fetching transcripts:', error);
      setErrorMessage('Failed to load transcripts');
    } finally {
      setLoading(false);
    }
  };



  /**
   * Parses CSV content and detects conflicts between student records
   * Returns both valid transcripts and conflicts
   */
  const parseCSVForConflicts = (csvContent: string, fileName: string): { 
    validTranscripts: TranscriptData[],
    conflicts: StudentConflict[] 
  } => {
    // Parse CSV content
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    // Validate headers
    const requiredHeaders = ['StudentID', 'StudentName', 'CourseCode', 'CourseName', 'Credit', 'Grade', 'Semester', 'GPA', 'Department'];
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
    
    if (missingHeaders.length > 0) {
      throw new Error(`CSV file is missing required headers: ${missingHeaders.join(', ')}`);
    }
    
    // Group records by student
    const studentRecordsMap: Record<string, Array<{
      studentId: string;
      studentName: string;
      department: string;
      gpa: number;
      courses: Array<{
        courseCode: string;
        courseName: string;
        credit: number;
        grade: string;
        semester: string;
      }>;
      rawData: any;
    }>> = {};
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const values = line.split(',');
      if (values.length !== headers.length) {
        console.warn(`Skipping invalid line ${i + 1}: ${line}`);
        continue;
      }
      
      // Create a record object from CSV line
      const record: Record<string, string> = {};
      headers.forEach((header, index) => {
        record[header] = values[index];
      });
      
      const studentId = record.StudentID;
      const studentName = record.StudentName;
      const department = record.Department;
      const gpa = parseFloat(record.GPA);
      
      const course = {
        courseCode: record.CourseCode,
        courseName: record.CourseName,
        credit: parseFloat(record.Credit),
        grade: record.Grade,
        semester: record.Semester
      };
      
      // Check if we've seen this student before
      if (!studentRecordsMap[studentId]) {
        studentRecordsMap[studentId] = [];
      }
      
      // Check if we've seen this student with this GPA before
      let existingRecordIndex = studentRecordsMap[studentId].findIndex(r => Math.abs(r.gpa - gpa) < 0.001);
      
      if (existingRecordIndex >= 0) {
        // Add course to existing record
        studentRecordsMap[studentId][existingRecordIndex].courses.push(course);
      } else {
        // Create new record for this student with this GPA
        studentRecordsMap[studentId].push({
          studentId,
          studentName,
          department,
          gpa,
          courses: [course],
          rawData: { originalLine: i + 1 }
        });
      }
    }
    
    // Identify conflicts and valid transcripts
    const conflicts: StudentConflict[] = [];
    const validTranscripts: TranscriptData[] = [];
    
    Object.entries(studentRecordsMap).forEach(([studentId, records]) => {
      if (records.length > 1) {
        // This student has multiple records with different GPAs - it's a conflict
        conflicts.push({
          id: `conflict_${studentId}_${new Date().getTime()}`,
          studentId,
          studentName: records[0].studentName,
          department: records[0].department,
          fileName,
          conflictingEntries: records
        });
      } else {
        // This student has only one record - it's valid
        validTranscripts.push({
          id: `transcript_${studentId}_${new Date().getTime()}`,
          studentId,
          studentName: records[0].studentName,
          department: records[0].department,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          fileName,
          fileSize: csvContent.length
        });
      }
    });
    
    return { validTranscripts, conflicts };
  };

  /**
   * Handles file selection change
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Clear any previous messages
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!event.target.files || event.target.files.length === 0) {
      console.log('No file selected');
      setFile(null);
      return;
    }
    
    const selectedFile = event.target.files[0];
    console.log('File selected:', selectedFile.name, selectedFile.type);
    
    // Get the file extension
    const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
    
    // Check if file is PDF or CSV
    if (fileType !== 'pdf' && fileType !== 'csv') {
      setErrorMessage('Please upload a PDF or CSV file.');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  };

  /**
   * Handles file upload process
   * 
   * Modified to handle transcript conflicts - when the same student has multiple
   * entries with different data in the uploaded file
   */
  const handleUpload = async () => {
    if (!file) {
      setErrorMessage('Please select a file to upload.');
      return;
    }

    try {
      setProcessing(true);
      setErrorMessage(''); 
      
      console.log('Starting upload for file:', file.name);
      
      // Check if file is CSV
      const fileType = file.name.split('.').pop()?.toLowerCase();
      
      if (fileType === 'csv') {
        // Process CSV file for conflicts directly
        const reader = new FileReader();
        
        reader.onload = (event) => {
          try {
            const csvContent = event.target?.result as string;
            
            if (!csvContent) {
              throw new Error('Failed to read CSV content');
            }
            
            // Parse CSV and detect conflicts
            const { validTranscripts, conflicts } = parseCSVForConflicts(csvContent, file.name);
            
            console.log('Parsed CSV results:', { validTranscripts, conflicts });
            
            // Update the transcripts state with successfully added transcripts
            if (validTranscripts.length > 0) {
              // Append new transcripts to existing ones
              setTranscripts(prev => [...prev, ...validTranscripts]);
              
              // Show success message if any transcripts were added
              setSuccessMessage(`${validTranscripts.length} transcripts from ${file.name} uploaded successfully.`);
              
              // Clear success message after 3 seconds
              setTimeout(() => {
                setSuccessMessage('');
              }, 3000);
            }
            
            // Update conflicts state with any detected conflicts
            if (conflicts.length > 0) {
              // Append new conflicts to existing ones
              setConflicts(prev => [...prev, ...conflicts]);
              
              // Show warning about conflicts
              setErrorMessage(`${conflicts.length} conflicts detected in ${file.name}. Please review and resolve them.`);
            }
            
            // Reset file input state
            setFile(null);
            setProcessing(false);
            
          } catch (error) {
            console.error('Error processing CSV:', error);
            setErrorMessage(`Failed to process CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setProcessing(false);
          }
        };
        
        reader.onerror = () => {
          setErrorMessage('Failed to read the CSV file.');
          setProcessing(false);
        };
        
        // Start reading the file
        reader.readAsText(file);
      } else {
        // For non-CSV files, use the original implementation
        const uploadResult = await uploadTranscript(file);
        
        // Create result with just the uploaded transcript
        const result: UploadProcessingResult = {
          successfullyAddedTranscripts: [uploadResult],
          detectedConflicts: []
        };
        
        console.log('Upload result:', result);
        
        // Update the transcripts state with successfully added transcripts
        setTranscripts(prev => [...prev, ...result.successfullyAddedTranscripts]);
        
        // Show success message
        setSuccessMessage(`Transcript for ${uploadResult.studentName} uploaded successfully.`);
        
        // Reset file input state
        setFile(null);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        
        setProcessing(false);
      }
    } catch (error) {
      console.error('Error uploading transcript:', error);
      setErrorMessage(`Failed to upload transcript: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Don't reset file on error so user can try again
      setProcessing(false);
    }
  };

  /**
   * Handles transcript deletion
   */
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteTranscript(id);
      setTranscripts(transcripts.filter(transcript => transcript.id !== id));
      setSuccessMessage('Transcript deleted successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting transcript:', error);
      setErrorMessage('Failed to delete transcript.');
    } finally {
      setLoading(false);
    }
  };

  // The handleProcess function has been removed as processing is no longer done on individual transcripts

  /**
   * Handles conflict resolution when a secretary selects the correct transcript
   * from conflicting entries
   */
  const handleConfirmResolution = async (chosenEntry: TranscriptEntryDetails, originalConflict: StudentConflict) => {
    try {
      setLoading(true);
      
      // In a real implementation, this would call a service function like:
      // const newConfirmedTranscript = await resolveTranscriptConflict(originalConflict.id, chosenEntry.rawData);
      
      // For now, we'll simulate this by creating a new transcript from the chosen entry
      const newConfirmedTranscript: TranscriptData = {
        id: `resolved_${new Date().getTime()}`,
        studentId: chosenEntry.studentId,
        studentName: chosenEntry.studentName,
        department: chosenEntry.department,
        uploadDate: new Date().toISOString().split('T')[0],
        status: "pending", // We'll keep using the existing status values for now
        fileName: originalConflict.fileName || '',
        fileSize: 0, // Added fileSize to satisfy TranscriptData type
        // In a real implementation, we'd include more data from the chosen entry
      };
      
      // Add the resolved transcript to the transcripts list
      setTranscripts(prev => [...prev, newConfirmedTranscript]);
      
      // Remove the resolved conflict from the conflicts list
      setConflicts(prev => prev.filter(c => c.id !== originalConflict.id));
      
      // Close the dialog
      setIsConflictResolutionDialogOpen(false);
      setSelectedConflict(null);
      
      // Show success message
      setSuccessMessage(`Conflict resolved for student ${chosenEntry.studentId}.`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Error resolving conflict:', error);
      setErrorMessage(`Failed to resolve conflict: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };



  /**
   * Renders file preview if a file is selected
   */
  const renderFilePreview = () => {
    if (!file) return null;
    
    return (
      <Box sx={{ mb: 3 }}>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between' 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {file.name.endsWith('.csv') ? (
              <TableChartIcon color="primary" sx={{ mr: 1 }} />
            ) : (
              <PdfIcon color="error" sx={{ mr: 1 }} />
            )}
            <Typography variant="body2">
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Typography>
          </Box>
          <IconButton onClick={() => setFile(null)}>
            <DeleteIcon />
          </IconButton>
        </Paper>
      </Box>
    );
  };

  /**
   * Renders transcript table or loading spinner
   */
  const renderTranscriptTable = () => {
    if (loading && transcripts.length === 0) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transcripts.map((transcript) => (
              <TableRow key={transcript.id}>
                <TableCell>{transcript.studentId}</TableCell>
                <TableCell>{transcript.studentName}</TableCell>
                <TableCell>{transcript.department}</TableCell>
                <TableCell>{transcript.uploadDate}</TableCell>
                <TableCell>
                  <Chip 
                    label="Added"
                    size="small"
                    color="success"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(transcript.id)}
                      disabled={loading}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {transcripts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No transcripts uploaded yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  /**
   * Renders the conflicts section if there are any conflicts to review
   */
  const renderConflictsSection = () => {
    if (conflicts.length === 0) {
      return null;
    }

    return (
      <Paper sx={{ p: 3, mt: 3, bgcolor: 'error.light' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WarningIcon color="error" sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="medium" color="error.dark">
            Conflicts Requiring Review
          </Typography>
        </Box>
        
        <Typography variant="body2" color="error.dark" paragraph>
          The following students have conflicting transcript entries that need to be resolved.
        </Typography>
        
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conflicts.map((conflict) => (
                <TableRow key={conflict.id}>
                  <TableCell>{conflict.studentId}</TableCell>
                  <TableCell>{conflict.studentName}</TableCell>
                  <TableCell>{conflict.department}</TableCell>
                  <TableCell>{conflict.fileName || 'Unknown'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => {
                        setSelectedConflict(conflict);
                        setIsConflictResolutionDialogOpen(true);
                      }}
                    >
                      Resolve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  };

  return (
    <SecretaryDashboardLayout>
      <Box sx={{ mb: 4 }}>
        {/* Upload Section */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Transcript Processing
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Upload student transcripts to process graduation requirements. The system will automatically check 
            if students meet all graduation criteria.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          {/* Alert Messages */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          )}
          
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage('')}>
              {errorMessage}
              {file && (
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => setFile(null)} 
                  sx={{ ml: 2 }}
                >
                  Clear Selected File
                </Button>
              )}
            </Alert>
          )}
          
          {/* Upload Controls */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ flexGrow: 1 }}
              disabled={processing}
            >
              Select Transcript File
              <input
                type="file"
                accept=".pdf,.csv"
                hidden
                onChange={handleFileChange}
                key={file ? 'file-selected' : 'no-file'}
              />
            </Button>
            
            <Button
              variant="contained"
              startIcon={processing ? <LinearProgress sx={{ width: 24 }} /> : <CheckCircleIcon />}
              onClick={handleUpload}
              disabled={!file || processing}
              sx={{ flexGrow: 1 }}
            >
              {processing ? 'Processing...' : 'Upload Transcript'}
            </Button>
          </Box>
          

          
          {/* File Preview */}
          {renderFilePreview()}
        </Paper>
        
        {/* Conflicts Section */}
        {renderConflictsSection()}
        
        {/* Transcripts List */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="medium">
              Uploaded Transcripts
            </Typography>
          </Box>
          
          {/* Transcript Table */}
          {renderTranscriptTable()}
        </Paper>
      </Box>

      {/* Conflict Resolution Dialog */}
      <Dialog 
        open={isConflictResolutionDialogOpen}
        onClose={() => {
          setIsConflictResolutionDialogOpen(false);
          setSelectedConflict(null);
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'error.light', color: 'error.dark', display: 'flex', alignItems: 'center' }}>
          <WarningIcon sx={{ mr: 1 }} />
          Resolve Transcript Conflict
        </DialogTitle>
        
        <DialogContent dividers>
          {selectedConflict && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Student: {selectedConflict.studentName} ({selectedConflict.studentId})
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Department: {selectedConflict.department}
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                This student has multiple conflicting transcript entries. Please review the differences and select the correct one.
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                {selectedConflict.conflictingEntries.map((entry, index) => (
                  <Box key={index} sx={{ flex: 1, mb: { xs: 2, md: 0 } }}>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        height: '100%',
                        borderColor: 'divider',
                        borderWidth: 2
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Version {index + 1}
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" fontWeight="bold">
                          GPA: <span style={{ color: 'error.main' }}>{entry.gpa}</span>
                        </Typography>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Courses:
                      </Typography>
                      
                      <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Code</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Credit</TableCell>
                              <TableCell align="right">Grade</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {entry.courses && entry.courses.map((course, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{course.courseCode}</TableCell>
                                <TableCell>{course.courseName}</TableCell>
                                <TableCell align="right">{course.credit}</TableCell>
                                <TableCell align="right">{course.grade}</TableCell>
                              </TableRow>
                            ))}
                            {(!entry.courses || entry.courses.length === 0) && (
                              <TableRow>
                                <TableCell colSpan={4} align="center">No course data available</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => handleConfirmResolution(entry, selectedConflict!)}
                      >
                        Select This Version
                      </Button>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button 
            onClick={() => {
              setIsConflictResolutionDialogOpen(false);
              setSelectedConflict(null);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </SecretaryDashboardLayout>
  );
};

export default TranscriptProcessingPage; 