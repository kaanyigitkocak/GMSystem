import { useState, useEffect } from "react";
import { getGraduationProgress, getDisconnectionProcedures } from "../services";
import type { GraduationStep, DisconnectionItem } from "../services";

interface GraduationProgressData {
  activeStep: number;
  steps: GraduationStep[];
  stepStatuses: Array<"pending" | "approved" | "rejected">;
  isLoading: boolean;
  error: Error | null;
}

interface DisconnectionProceduresData {
  items: DisconnectionItem[];
  isLoading: boolean;
  error: Error | null;
}

export const useGraduationProgress = () => {
  const [progressData, setProgressData] = useState<GraduationProgressData>({
    activeStep: 0,
    steps: [],
    stepStatuses: [],
    isLoading: true,
    error: null,
  });

  const [disconnectionData, setDisconnectionData] =
    useState<DisconnectionProceduresData>({
      items: [],
      isLoading: true,
      error: null,
    });

  // Removed mock data - now using centralized mock service

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const data = await getGraduationProgress();
        setProgressData((prev) => ({
          ...prev,
          activeStep: data.activeStep,
          steps: data.steps,
          stepStatuses: data.stepStatuses,
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        setProgressData((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Unknown error occurred"),
        }));
      }
    };

    fetchProgressData();
  }, []);

  useEffect(() => {
    // Only fetch disconnection data if we're at that step
    if (
      progressData.activeStep === 2 &&
      !disconnectionData.items.length &&
      !disconnectionData.error
    ) {
      const fetchDisconnectionData = async () => {
        try {
          setDisconnectionData((prev) => ({ ...prev, isLoading: true }));
          const items = await getDisconnectionProcedures();
          setDisconnectionData({
            items,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          setDisconnectionData((prev) => ({
            ...prev,
            isLoading: false,
            error:
              error instanceof Error
                ? error
                : new Error("Unknown error occurred"),
          }));
        }
      };

      fetchDisconnectionData();
    }
  }, [
    progressData.activeStep,
    disconnectionData.items.length,
    disconnectionData.error,
  ]);

  return {
    ...progressData,
    disconnectionProcedures: disconnectionData.items,
    isDisconnectionLoading: disconnectionData.isLoading,
    disconnectionError: disconnectionData.error,
  };
};
