import { useState, useCallback } from "react";
import type {
  TranscriptData,
  StudentConflict,
  TranscriptEntryDetails,
} from "../services/types";
import {
  parseCSVForConflicts,
  createConfirmedTranscriptFromResolution,
} from "../utils/transcriptUtils";

interface UseTranscriptConflictsReturn {
  conflicts: StudentConflict[];
  processing: boolean;
  error: string | null;
  processCSVForConflicts: (
    csvContent: string,
    fileName: string
  ) => Promise<{
    validTranscripts: TranscriptData[];
    conflicts: StudentConflict[];
  }>;
  resolveConflict: (
    chosenEntry: TranscriptEntryDetails,
    originalConflict: StudentConflict
  ) => Promise<TranscriptData>;
  removeConflict: (conflictId: string) => void;
  clearConflicts: () => void;
  clearError: () => void;
}

export const useTranscriptConflicts = (): UseTranscriptConflictsReturn => {
  const [conflicts, setConflicts] = useState<StudentConflict[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processCSVForConflicts = useCallback(
    async (csvContent: string, fileName: string) => {
      setProcessing(true);
      setError(null);

      try {
        const result = parseCSVForConflicts(csvContent, fileName);

        // Update conflicts state
        setConflicts((prev) => [...prev, ...result.conflicts]);

        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to process CSV";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  const resolveConflict = useCallback(
    async (
      chosenEntry: TranscriptEntryDetails,
      originalConflict: StudentConflict
    ): Promise<TranscriptData> => {
      setProcessing(true);
      setError(null);

      try {
        // Create confirmed transcript from the chosen entry
        const confirmedTranscript = createConfirmedTranscriptFromResolution(
          chosenEntry,
          originalConflict
        );

        // Remove the resolved conflict from state
        setConflicts((prev) =>
          prev.filter((conflict) => conflict.id !== originalConflict.id)
        );

        return confirmedTranscript;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to resolve conflict";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setProcessing(false);
      }
    },
    []
  );

  const removeConflict = useCallback((conflictId: string) => {
    setConflicts((prev) =>
      prev.filter((conflict) => conflict.id !== conflictId)
    );
  }, []);

  const clearConflicts = useCallback(() => {
    setConflicts([]);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    conflicts,
    processing,
    error,
    processCSVForConflicts,
    resolveConflict,
    removeConflict,
    clearConflicts,
    clearError,
  };
};
