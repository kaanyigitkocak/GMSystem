import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';
import { useTranscripts, useTranscriptConflicts } from '../hooks';
import { validateTranscriptFile, formatTranscriptMetaInfo, parseTranscriptCSV } from '../utils/transcriptUtils';
import {
  FileUploadSection,
  FilePreview,
  TranscriptsTable,
  ConflictsSection,
  ConflictResolutionDialog,
} from '../components';
import TranscriptAnalysisDialog from '../components/transcripts/TranscriptAnalysisDialog';
import type {
  TranscriptEntryDetails,
  StudentConflict,
  TranscriptData,
} from '../services/types';
import type { ParsedStudentTranscript } from '../utils/transcriptUtils';

/**
 * TranscriptProcessingPage Component
 * 
 * Allows secretaries to upload, view, process, and manage student transcripts.
 * Provides functionality to upload PDF or CSV files, process transcripts,
 * and export eligible graduates list.
 */
const TranscriptProcessingPage = () => {
  const {
    transcripts,
    loading,
    uploadAndParsePDF,
    uploadTranscript,
    deleteTranscript,
    fetchTranscripts,
    addTranscript
  } = useTranscripts();

  const {
    conflicts,
    resolveConflict  } = useTranscriptConflicts();

  // State management
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Dialog management state
  const [selectedConflict, setSelectedConflict] = useState<StudentConflict | null>(null);
  const [isConflictResolutionDialogOpen, setIsConflictResolutionDialogOpen] = useState<boolean>(false);
  
  // Transcript analysis dialog state
  const [parsedTranscript, setParsedTranscript] = useState<ParsedStudentTranscript | null>(null);
  const [isAnalysisDialogOpen, setIsAnalysisDialogOpen] = useState<boolean>(false);

  /**
   * Loads transcript data when component mounts
   */
  useEffect(() => {
    fetchTranscripts();
  }, [fetchTranscripts]);

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
    
    // Validate file using utility
    const validation = validateTranscriptFile(selectedFile);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Invalid file type');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  };

  /**
   * Handles file upload process
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
      
      // Check if file is CSV or PDF
      const fileType = file.name.split('.').pop()?.toLowerCase();
      
      if (fileType === 'csv') {
        // Process CSV file with our new parsing function
        const reader = new FileReader();
        
        reader.onload = async (event) => {
          try {
            const csvContent = event.target?.result as string;
            
            if (!csvContent) {
              throw new Error('Failed to read CSV content');
            }
            
            // Parse CSV using our new function
            const parsedResult = parseTranscriptCSV(csvContent);
            
            console.log('Parsed CSV transcript:', parsedResult);
            
            // Set the parsed transcript and show analysis dialog
            setParsedTranscript(parsedResult);
            setIsAnalysisDialogOpen(true);
            
            // Reset processing state
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
      } else if (fileType === 'pdf') {
        // For PDF files, use the PDF parsing API with detailed progress
        try {
          // Show initial loading message for OCR
          setSuccessMessage('🔄 Starting OCR processing... This may take 30-60 seconds.');
          
          // Upload and parse the PDF transcript (this already creates TranscriptData and CourseTaken records)
          const parsedTranscript = await uploadAndParsePDF(file, (progress) => {
            console.log(`PDF processing progress: ${progress}%`);
          });
          console.log('PDF transcript parsed and saved:', parsedTranscript);
          
          // Show success message
          setSuccessMessage(`✅ Transcript for ${parsedTranscript.studentName} uploaded and processed successfully!`);
          
          // Reset file input state
          setFile(null);
          
          // Clear success message after 5 seconds (longer for PDF success)
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        } catch (error) {
          console.error('Error processing PDF transcript:', error);
          setErrorMessage(`❌ Failed to process PDF transcript: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      } else {
        // For other file types, use the original implementation
        const uploadResult = await uploadTranscript(file);
        
        // Show success message
        setSuccessMessage(`Transcript for ${uploadResult.studentName} uploaded successfully.`);
        
        // Reset file input state
        setFile(null);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
        
      setProcessing(false);
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
      await deleteTranscript(id);
      setSuccessMessage('Transcript deleted successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting transcript:', error);
      setErrorMessage('Failed to delete transcript.');
    }
  };

  /**
   * Handles confirming a parsed transcript from CSV analysis
   */
  const handleConfirmTranscriptAnalysis = async (transcript: ParsedStudentTranscript) => {
    try {
      // Create a TranscriptData object from the parsed transcript
      const transcriptData: TranscriptData = {
        id: `transcript_${Date.now()}`,
        studentId: transcript.studentId,
        studentName: transcript.studentName,
        department: transcript.department,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending' as const,
        fileName: file?.name || 'unknown.csv',
        fileSize: 0,
        metaInfo: `GPA: ${transcript.calculatedGpa} | Credits: ${transcript.totalCredits} | Courses: ${transcript.courses.length} | ${transcript.analysis.isEligibleForGraduation ? '✅ Eligible' : '❌ Not Eligible'}`
      };
      
      // Add the transcript to the transcripts list
      addTranscript(transcriptData);
      
      // Show success message
      setSuccessMessage(`Transcript for ${transcript.studentName} (${transcript.studentId}) processed successfully!`);
      
      // Reset states
      setFile(null);
      setParsedTranscript(null);
      setIsAnalysisDialogOpen(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error confirming transcript analysis:', error);
      setErrorMessage(`Failed to process transcript: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  /**
   * Handles conflict resolution when a secretary selects the correct transcript
   * from conflicting entries
   */
  const handleConfirmResolution = async (chosenEntry: TranscriptEntryDetails, originalConflict: StudentConflict) => {
    try {
      // Use the hook to resolve the conflict
      await resolveConflict(chosenEntry, originalConflict);
      
      // Close the dialog
      setIsConflictResolutionDialogOpen(false);
      setSelectedConflict(null);
      
      // Show success message
      setSuccessMessage(`Conflict resolved for student ${chosenEntry.studentId}.`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Error resolving conflict:', error);
      setErrorMessage(`Failed to resolve conflict: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <SecretaryDashboardLayout>
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
          {/* Upload Section */}
          <FileUploadSection
            file={file}
            processing={processing}
            successMessage={successMessage}
            errorMessage={errorMessage}
            onFileChange={handleFileChange}
            onUpload={handleUpload}
            onClearFile={() => setFile(null)}
            onClearSuccessMessage={() => setSuccessMessage('')}
            onClearErrorMessage={() => setErrorMessage('')}
          />
          
          {/* File Preview */}
          {file && (
            <FilePreview 
              file={file} 
              onClearFile={() => setFile(null)} 
            />
          )}
          
          {/* Conflicts Section */}
          <ConflictsSection
            conflicts={conflicts}
            onResolveConflict={(conflict) => {
              setSelectedConflict(conflict);
              setIsConflictResolutionDialogOpen(true);
            }}
          />
          
          {/* Transcripts List */}
          <TranscriptsTable
            transcripts={transcripts}
            loading={loading}
            onDelete={handleDelete}
            formatTranscriptMetaInfo={formatTranscriptMetaInfo}
          />
        </Box>
      </Box>

      {/* Conflict Resolution Dialog */}
      <ConflictResolutionDialog
        open={isConflictResolutionDialogOpen}
        selectedConflict={selectedConflict}
        onClose={() => {
          setIsConflictResolutionDialogOpen(false);
          setSelectedConflict(null);
        }}
        onConfirmResolution={handleConfirmResolution}
      />

      {/* Transcript Analysis Dialog */}
      <TranscriptAnalysisDialog
        open={isAnalysisDialogOpen}
        transcript={parsedTranscript}
        onClose={() => {
          setIsAnalysisDialogOpen(false);
          setParsedTranscript(null);
        }}
        onConfirm={handleConfirmTranscriptAnalysis}
      />
    </SecretaryDashboardLayout>
  );
};

export default TranscriptProcessingPage; 