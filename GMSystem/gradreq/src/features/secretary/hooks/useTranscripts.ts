import { useState, useCallback } from "react";
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
  clearError: () => void;
}

export const useTranscripts = (): UseTranscriptsReturn => {
  const [transcripts, setTranscripts] = useState<TranscriptData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fetchTranscripts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTranscriptsApi();
      setTranscripts(data);
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
    clearError,
  };
};
