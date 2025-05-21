// As per CODING_GUIDELINES.md: camelCase.ts for TS files.
import { useState, useCallback } from 'react';
import { StudentRecord, DepartmentRankingFile, FacultyRankingResult, FileUploadStatus, BatchFileUploadProcessingResult } from '../types';
import { parseDepartmentCsv } from '../services/deansOfficeService';

export const useFacultyRanking = () => {
  const [uploadedFilesInfo, setUploadedFilesInfo] = useState<FileUploadStatus[]>([]);
  const [facultyRanking, setFacultyRanking] = useState<FacultyRankingResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [batchProcessingResult, setBatchProcessingResult] = useState<BatchFileUploadProcessingResult | null>(null);

  const resetState = () => {
    setError(null);
    setWarning(null);
    setFacultyRanking(null);
    setUploadedFilesInfo([]);
    setBatchProcessingResult(null);
  };

  const handleFileUpload = useCallback(async (files: FileList) => {
    setIsLoading(true);
    resetState();

    if (!files || files.length === 0) {
      setError("No files selected.");
      setIsLoading(false);
      return;
    }

    const fileProcessingPromises = Array.from(files).map(file => parseDepartmentCsv(file));
    const results: DepartmentRankingFile[] = await Promise.all(fileProcessingPromises);

    const currentFilesStatus: FileUploadStatus[] = [];
    let allEligibleRecords: StudentRecord[] = [];
    let hasAnyFileError = false;
    let hasAnyFileWarning = false; // For warnings like mixed eligibility or empty files
    let hasMixedEligibilityInBatch = false;
    let allFilesProcessedEmptyOrNonEligible = true;

    results.forEach(result => {
      if (result.error) {
        currentFilesStatus.push({ fileName: result.fileName, status: 'error', message: result.error });
        hasAnyFileError = true;
      } else {
        const eligibleInFile = result.records.filter(r => r.isEligible);
        const nonEligibleInFile = result.records.filter(r => !r.isEligible);

        if (result.records.length === 0 || result.warning?.includes("File is empty")) {
             currentFilesStatus.push({ fileName: result.fileName, status: 'warning_empty_eligible', message: result.warning || 'File is empty or contains no processable records.' });
             hasAnyFileWarning = true;
        } else if (eligibleInFile.length === 0) {
          currentFilesStatus.push({ fileName: result.fileName, status: 'warning_empty_eligible', message: 'No eligible students found in this file.', processedRecords: result.records });
          hasAnyFileWarning = true;
        } else {
          allFilesProcessedEmptyOrNonEligible = false; // At least one file has eligible students
          allEligibleRecords.push(...eligibleInFile);
          if (nonEligibleInFile.length > 0) {
            currentFilesStatus.push({ fileName: result.fileName, status: 'warning_mixed_eligibility', message: 'Contains non-eligible students (excluded).', processedRecords: eligibleInFile });
            hasMixedEligibilityInBatch = true;
            hasAnyFileWarning = true;
          } else {
            currentFilesStatus.push({ fileName: result.fileName, status: 'uploaded', processedRecords: eligibleInFile });
          }
        }
      }
    });

    setUploadedFilesInfo(currentFilesStatus);

    const studentIdCounts = new Map<string, number>();
    allEligibleRecords.forEach(record => {
      studentIdCounts.set(record.id, (studentIdCounts.get(record.id) || 0) + 1);
    });
    const hasDuplicatesInBatch = Array.from(studentIdCounts.values()).some(count => count > 1);

    let overallMessageParts: string[] = [];
    if (files.length > 0 && allEligibleRecords.length === 0 && !hasAnyFileError) {
        overallMessageParts.push("No eligible students found in any uploaded files.");
        if (!hasAnyFileWarning) hasAnyFileWarning = true; // Make sure warning state is set
    }
    if (hasAnyFileError) overallMessageParts.push("Some files had errors and were not fully processed.");
    if (hasDuplicatesInBatch) overallMessageParts.push("Duplicate student IDs found across files; GPAs will be averaged for ranking.");
    if (hasMixedEligibilityInBatch) overallMessageParts.push("Non-eligible students were excluded from processing.");
    
    let finalOverallMessage = "";
    if (overallMessageParts.length > 0) {
        finalOverallMessage = overallMessageParts.join(' ');
    } else if (!hasAnyFileError && !hasAnyFileWarning && allEligibleRecords.length > 0) {
        finalOverallMessage = "All files processed successfully. Ready for ranking.";
    } else if (!hasAnyFileError && hasAnyFileWarning && allEligibleRecords.length > 0) {
        finalOverallMessage = "Files processed with warnings. Ready for ranking.";
    }


    if (hasAnyFileError) setError(finalOverallMessage || "Errors occurred during file processing.");
    else if (hasAnyFileWarning || (finalOverallMessage && finalOverallMessage !== "All files processed successfully. Ready for ranking.")) setWarning(finalOverallMessage || "File processing completed with warnings.");
    else if (finalOverallMessage) setWarning(finalOverallMessage); // For success with info like duplicates

    setBatchProcessingResult({
      allFilesStatus: currentFilesStatus,
      validRecords: allEligibleRecords,
      hasDuplicates: hasDuplicatesInBatch,
      overallMessage: finalOverallMessage,
      proceedWithRanking: allEligibleRecords.length > 0 && !hasAnyFileError, // Only proceed if no critical errors and some data
    });
    setIsLoading(false);
  }, []);

  const generateFacultyRanking = useCallback(() => {
    if (!batchProcessingResult || !batchProcessingResult.proceedWithRanking || batchProcessingResult.validRecords.length === 0) {
      const errorMsg = "Ranking could not be created: No eligible students available or critical errors in file processing.";
      setFacultyRanking({ rankedStudents: [], warnings: [], errors: [errorMsg] });
      setError(errorMsg); // Set main error state
      return;
    }
    setIsLoading(true);

    let recordsToRank = [...batchProcessingResult.validRecords];
    
    // Sort by GPA
    recordsToRank.sort((a, b) => b.gpa - a.gpa);
    
    // Assign ranks after sorting
    recordsToRank.forEach((student, index) => {
      student.rank = index + 1;
    });

    const rankingWarnings: string[] = [];
    if (batchProcessingResult.overallMessage?.includes("Non-eligible students")) {
      rankingWarnings.push("Only eligible students are included in the ranking.");
    }
    if (recordsToRank.length === 0) {
      rankingWarnings.push("No students to display in the ranking after processing.");
    }

    setFacultyRanking({
      rankedStudents: recordsToRank,
      warnings: rankingWarnings,
      errors: []
    });
    setIsLoading(false);
  }, [batchProcessingResult]);

  return {
    uploadedFilesInfo,
    facultyRanking,
    isLoading,
    error,
    warning,
    batchProcessingResult,
    handleFileUpload,
    generateFacultyRanking,
  };
};
