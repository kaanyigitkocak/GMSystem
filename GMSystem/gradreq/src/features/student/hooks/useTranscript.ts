import { useState, useEffect } from "react";
import {
  getTranscript,
  // reportMissingDocuments,
} from "../services";
import type { TranscriptData } from "../services";

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
        const data = await getTranscript();
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

  const submitMissingDocumentReport = async (_message: string) => {
    setReportState({
      isSubmitting: true,
      error: null,
      success: false,
    });
    try {
      // await reportMissingDocuments(message); // This still needs to be wired up to the actual API call
      // For now, let's simulate success for UI testing
      console.warn(
        "Missing document reporting is not fully implemented yet. Simulating success."
      );
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
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
