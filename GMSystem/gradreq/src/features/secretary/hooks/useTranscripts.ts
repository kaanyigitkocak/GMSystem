import { useState, useCallback, useEffect } from "react";
import type { TranscriptData } from "../services/types";
import {
  getTranscripts,
  uploadAndParsePDFTranscript,
  parseTranscriptCSV,
  uploadTranscript,
  deleteTranscript,
  processTranscript,
  submitParsedTranscript,
} from "../services"; // Updated import

// localStorage key for transcripts
const TRANSCRIPTS_STORAGE_KEY = "secretary_transcripts";

// Helper functions for localStorage
const saveTranscriptsToStorage = (transcripts: TranscriptData[]) => {
  try {
    localStorage.setItem(TRANSCRIPTS_STORAGE_KEY, JSON.stringify(transcripts));
  } catch (error) {
    console.warn("Failed to save transcripts to localStorage:", error);
  }
};

const loadTranscriptsFromStorage = (): TranscriptData[] => {
  try {
    const stored = localStorage.getItem(TRANSCRIPTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to load transcripts from localStorage:", error);
    return [];
  }
};

const clearTranscriptsFromStorage = () => {
  try {
    localStorage.removeItem(TRANSCRIPTS_STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear transcripts from localStorage:", error);
  }
};

interface UseTranscriptsReturn {
  transcripts: TranscriptData[];
  loading: boolean;
  error: string | null;
  uploadProgress: number;
  fetchTranscripts: () => Promise<void>;
  uploadAndParsePDF: (file: File, onProgress: (progress: number) => void) => Promise<TranscriptData>; // Add onProgress to type
  parseCSV: (file: File) => Promise<TranscriptData[]>;
  uploadTranscript: (file: File) => Promise<TranscriptData>;
  deleteTranscript: (id: string) => Promise<void>;
  processTranscript: (id: string) => Promise<TranscriptData>;
  submitParsedTranscript: (transcriptData: TranscriptData) => Promise<{
    transcriptData: TranscriptData;
    studentCreated: {
      userId: string;
      studentId: string;
      transcriptDataId: string;
    };
  }>;
  addTranscript: (transcript: TranscriptData) => void;
  clearStoredTranscripts: () => void;
  clearError: () => void;
}

export const useTranscripts = (): UseTranscriptsReturn => {
  // Initialize state from localStorage
  const [transcripts, setTranscripts] = useState<TranscriptData[]>(() =>
    loadTranscriptsFromStorage()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sync transcripts to localStorage whenever state changes
  useEffect(() => {
    saveTranscriptsToStorage(transcripts);
  }, [transcripts]);

  const fetchTranscripts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiData = await getTranscripts(); // Use service router

      // Get current local transcripts
      const localTranscripts = loadTranscriptsFromStorage();

      // Merge API data with local transcripts (avoid duplicates by ID)
      const existingIds = new Set(localTranscripts.map((t) => t.id));
      const newApiTranscripts = apiData.filter((t) => !existingIds.has(t.id));

      // Set combined data
      const combinedTranscripts = [...localTranscripts, ...newApiTranscripts];
      setTranscripts(combinedTranscripts);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch transcripts"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadAndParsePDF = useCallback(
    async (file: File, onProgress: (progress: number) => void): Promise<TranscriptData> => {
      setLoading(true);
      setError(null);
      setUploadProgress(0);
      try {
        const newTranscript = await uploadAndParsePDFTranscript(file, (progress: number) => { // Use service router and type progress
          setUploadProgress(progress);
          if (onProgress) onProgress(progress); // Call the passed onProgress
        });
        setTranscripts((prev) => {
          const updatedTranscripts = [newTranscript, ...prev];
          saveTranscriptsToStorage(updatedTranscripts); // Ensure storage is updated
          return updatedTranscripts;
        });
        return newTranscript;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to upload and parse PDF"
        );
        throw err;
      } finally {
        setLoading(false);
        setUploadProgress(0);
      }
    },
    []
  );

  const parseCSV = useCallback(
    async (file: File): Promise<TranscriptData[]> => {
      setLoading(true);
      setError(null);
      try {
        const newTranscripts = await parseTranscriptCSV(file); // Use service router
        setTranscripts((prev) => {
          // Filter out any potential duplicates if re-parsing
          const existingIds = new Set(prev.map((t) => t.id));
          const uniqueNewTranscripts = newTranscripts.filter(
            (t) => !existingIds.has(t.id)
          );
          const updatedTranscripts = [...uniqueNewTranscripts, ...prev];
          saveTranscriptsToStorage(updatedTranscripts); // Ensure storage is updated
          return updatedTranscripts;
        });
        return newTranscripts;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to parse CSV");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const uploadLocalTranscript = useCallback(
    async (file: File): Promise<TranscriptData> => {
      setLoading(true);
      setError(null);
      setUploadProgress(0);
      try {
        const newTranscript = await uploadTranscript(file); // Use service router
        setTranscripts((prev) => {
          const updatedTranscripts = [newTranscript, ...prev];
          saveTranscriptsToStorage(updatedTranscripts); // Ensure storage is updated
          return updatedTranscripts;
        });
        return newTranscript;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to upload transcript"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteLocalTranscript = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        await deleteTranscript(id); // Use service router
        setTranscripts((prev) => {
          const updatedTranscripts = prev.filter(
            (transcript) => transcript.id !== id
          );
          saveTranscriptsToStorage(updatedTranscripts); // Ensure storage is updated
          return updatedTranscripts;
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete transcript"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const processLocalTranscript = useCallback(
    async (id: string): Promise<TranscriptData> => {
      setLoading(true);
      setError(null);
      try {
        const processedTranscript = await processTranscript(id); // Use service router
        setTranscripts((prev) => {
          const updatedTranscripts = prev.map((transcript) =>
            transcript.id === id ? processedTranscript : transcript
          );
          saveTranscriptsToStorage(updatedTranscripts); // Ensure storage is updated
          return updatedTranscripts;
        });
        return processedTranscript;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process transcript"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const submitLocalParsedTranscript = useCallback(
    async (transcriptData: TranscriptData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await submitParsedTranscript(transcriptData); // Use service router
        // Update local transcript status or remove if successfully submitted
        setTranscripts((prev) => {
          const updatedTranscripts = prev.map((t) =>
            t.id === transcriptData.id
              ? { ...t, status: "Processed" } // Or remove, depending on desired UX
              : t
          );
          saveTranscriptsToStorage(updatedTranscripts); // Ensure storage is updated
          return updatedTranscripts;
        });
        return result;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to submit parsed transcript"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const addTranscript = useCallback((transcript: TranscriptData) => {
    setTranscripts((prev) => [...prev, transcript]);
  }, []);

  const clearStoredTranscripts = useCallback(() => {
    clearTranscriptsFromStorage();
    setTranscripts([]);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    transcripts,
    loading,
    error,
    uploadProgress,
    fetchTranscripts,
    uploadAndParsePDF,
    parseCSV,
    uploadTranscript: uploadLocalTranscript,
    deleteTranscript: deleteLocalTranscript,
    processTranscript: processLocalTranscript,
    submitParsedTranscript: submitLocalParsedTranscript,
    addTranscript,
    clearStoredTranscripts,
    clearError,
  };
};
