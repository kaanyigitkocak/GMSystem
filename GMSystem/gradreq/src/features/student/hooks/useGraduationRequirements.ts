import { useState, useEffect } from "react";
import {
  getGraduationRequirements,
  reportMissingFiles,
} from "../services";
import type { GraduationRequirementsData } from "../services";

interface GraduationRequirementsState {
  data: GraduationRequirementsData | null;
  isLoading: boolean;
  error: Error | null;
}

export const useGraduationRequirements = () => {
  const [state, setState] = useState<GraduationRequirementsState>({
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
    const fetchGraduationRequirements = async () => {
      try {
        const data = await getGraduationRequirements();
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
              : new Error("Failed to fetch graduation requirements data"),
        });
      }
    };

    fetchGraduationRequirements();
  }, []);

  const submitMissingFilesReport = async (message: string) => {
    setReportState({
      isSubmitting: true,
      error: null,
      success: false,
    });

    try {
      await reportMissingFiles(message);
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
    submitMissingFilesReport,
    isSubmitting: reportState.isSubmitting,
    reportError: reportState.error,
    reportSuccess: reportState.success,
  };
};
