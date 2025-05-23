import { useState, useCallback, useEffect } from "react";
import type { TranscriptData } from "../services/types";
import {
  getTranscriptsApi,
  uploadAndParsePDFTranscriptApi,
  parseTranscriptCSVApi,
  uploadTranscriptApi,
  deleteTranscriptApi,
  processTranscriptApi,
} from "../services/api/transcriptsApi";
import { submitParsedTranscriptApi } from "../services/api/studentManagementApi";

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
  uploadAndParsePDF: (file: File) => Promise<TranscriptData>;
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
      const apiData = await getTranscriptsApi();

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
    async (file: File): Promise<TranscriptData> => {
      setLoading(true);
      setError(null);
      setUploadProgress(0);
      try {
        const result = await uploadAndParsePDFTranscriptApi(file);
        setUploadProgress(100);
        // Add to local state
        setTranscripts((prev) => [...prev, result]);
        return result;
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
        const results = await parseTranscriptCSVApi(file);
        // Add to local state
        setTranscripts((prev) => [...prev, ...results]);
        return results;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to parse CSV");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const uploadTranscript = useCallback(
    async (file: File): Promise<TranscriptData> => {
      setLoading(true);
      setError(null);
      try {
        const result = await uploadTranscriptApi(file);
        // Add to local state
        setTranscripts((prev) => [...prev, result]);
        return result;
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

  const deleteTranscript = useCallback(async (id: string) => {
    try {
      await deleteTranscriptApi(id);
      // Remove from local state
      setTranscripts((prev) =>
        prev.filter((transcript) => transcript.id !== id)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete transcript"
      );
      throw err;
    }
  }, []);

  const processTranscript = useCallback(
    async (id: string): Promise<TranscriptData> => {
      setLoading(true);
      setError(null);
      try {
        const result = await processTranscriptApi(id);
        // Update local state
        setTranscripts((prev) =>
          prev.map((transcript) => (transcript.id === id ? result : transcript))
        );
        return result;
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

  const submitParsedTranscript = useCallback(
    async (transcriptData: TranscriptData) => {
      setLoading(true);
      setError(null);
      try {
        const result = await submitParsedTranscriptApi(transcriptData);
        // Update local state with enhanced transcript data
        setTranscripts((prev) =>
          prev.map((transcript) =>
            transcript.id === transcriptData.id
              ? result.transcriptData
              : transcript
          )
        );
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
    uploadTranscript,
    deleteTranscript,
    processTranscript,
    submitParsedTranscript,
    addTranscript,
    clearStoredTranscripts,
    clearError,
  };
};
