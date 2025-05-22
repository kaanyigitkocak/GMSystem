import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import SecretaryDashboardLayout from '../layout/SecretaryDashboardLayout';
import { useTranscripts, useTranscriptConflicts } from '../hooks';
import { validateTranscriptFile, formatTranscriptMetaInfo } from '../utils/transcriptUtils';
import {
  FileUploadSection,
  FilePreview,
  TranscriptsTable,
  ConflictsSection,
  ConflictResolutionDialog,
} from '../components';
import type {
  TranscriptEntryDetails,
  StudentConflict,
} from '../services/types';

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
    error,
    uploadProgress,
    uploadAndParsePDF,
    uploadTranscript,
    submitParsedTranscript,
    deleteTranscript,
    fetchTranscripts
  } = useTranscripts();

  const {
    conflicts,
    processing: conflictProcessing,
    error: conflictError,
    processCSVForConflicts,
    resolveConflict,
    removeConflict,
    clearConflicts,
    clearError: clearConflictError
  } = useTranscriptConflicts();

  // State management
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  // Dialog management state
  const [selectedConflict, setSelectedConflict] = useState<StudentConflict | null>(null);
  const [isConflictResolutionDialogOpen, setIsConflictResolutionDialogOpen] = useState<boolean>(false);

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
        // Process CSV file for conflicts directly
        const reader = new FileReader();
        
        reader.onload = async (event) => {
          try {
            const csvContent = event.target?.result as string;
            
            if (!csvContent) {
              throw new Error('Failed to read CSV content');
            }
            
            // Parse CSV and detect conflicts using hook
            const result = await processCSVForConflicts(csvContent, file.name);
            
            console.log('Parsed CSV results:', result);
            
            // Update the transcripts state with successfully added transcripts
            if (result.validTranscripts.length > 0) {
              // Show success message if any transcripts were added
              setSuccessMessage(`${result.validTranscripts.length} transcripts from ${file.name} uploaded successfully.`);
              
              // Clear success message after 3 seconds
              setTimeout(() => {
                setSuccessMessage('');
              }, 3000);
            }
            
            // Conflicts are automatically managed by the hook
            if (result.conflicts.length > 0) {
              // Show warning about conflicts
              setErrorMessage(`${result.conflicts.length} conflicts detected in ${file.name}. Please review and resolve them.`);
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
      } else if (fileType === 'pdf') {
        // For PDF files, use the PDF parsing API
        try {
          // Upload and parse the PDF transcript
          const parsedTranscript = await uploadAndParsePDF(file);
          console.log('PDF transcript parsed:', parsedTranscript);
          
          // Submit the parsed transcript data to create a record
          const submittedTranscript = await submitParsedTranscript(parsedTranscript);
          console.log('Transcript submitted successfully:', submittedTranscript);
          
          // Show success message
          setSuccessMessage(`Transcript for ${submittedTranscript.transcriptData.studentName} uploaded and processed successfully.`);
          
          // Reset file input state
          setFile(null);
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        } catch (error) {
          console.error('Error processing PDF transcript:', error);
          setErrorMessage(`Failed to process PDF transcript: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
   * Handles conflict resolution when a secretary selects the correct transcript
   * from conflicting entries
   */
  const handleConfirmResolution = async (chosenEntry: TranscriptEntryDetails, originalConflict: StudentConflict) => {
    try {
      // Use the hook to resolve the conflict
      const confirmedTranscript = await resolveConflict(chosenEntry, originalConflict);
      
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
    </SecretaryDashboardLayout>
  );
};

export default TranscriptProcessingPage; 