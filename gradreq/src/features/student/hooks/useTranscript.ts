import { useState, useEffect } from "react";
import {
  getTranscriptData,
  reportMissingDocuments,
  type TranscriptData,
} from "../services/transcriptService";

interface TranscriptState {
  data: TranscriptData | null;
  isLoading: boolean;
  error: Error | null;
}

export const useTranscript = () => {
  const [state, setState] = useState<TranscriptState>({
    data: null,
    isLoading: true,
    error: null,
  });

  const [reportState, setReportState] = useState({
    isSubmitting: false,
    error: null as Error | null,
    success: false,
  });

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const data = await getTranscriptData();
        setState({
          data,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Failed to fetch transcript data"),
        });
      }
    };

    fetchTranscript();
  }, []);

  const submitMissingDocumentReport = async (message: string) => {
    setReportState({
      isSubmitting: true,
      error: null,
      success: false,
    });

    try {
      await reportMissingDocuments(message);
      setReportState({
        isSubmitting: false,
        error: null,
        success: true,
      });
      return true;
    } catch (error) {
      setReportState({
        isSubmitting: false,
        error:
          error instanceof Error ? error : new Error("Failed to submit report"),
        success: false,
      });
      return false;
    }
  };

  return {
    ...state,
    submitMissingDocumentReport,
    isSubmitting: reportState.isSubmitting,
    reportError: reportState.error,
    reportSuccess: reportState.success,
  };
};
