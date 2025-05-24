import { useState, useEffect, useCallback } from "react";
import type { TranscriptData } from "../services/types";
import {
  getDashboardStats,
  getEligibleGraduates,
  exportEligibleGraduatesCSV,
  exportEligibleGraduatesPDF,
} from "../services"; // Updated import

interface DashboardStats {
  graduatesCount: number;
  graduationDate: string;
}

interface UseDashboardReturn {
  stats: DashboardStats | null;
  eligibleGraduates: TranscriptData[];
  loading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  exportCSV: () => Promise<string>;
  exportPDF: () => Promise<Blob>;
  clearError: () => void;
}

export const useDashboard = (): UseDashboardReturn => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [eligibleGraduates, setEligibleGraduates] = useState<TranscriptData[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, graduatesData] = await Promise.all([
        getDashboardStats(), // Use service router
        getEligibleGraduates(), // Use service router
      ]);

      setStats(statsData);
      setEligibleGraduates(graduatesData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const exportCSV = useCallback(async (): Promise<string> => {
    try {
      return await exportEligibleGraduatesCSV(); // Use service router
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export CSV");
      throw err;
    }
  }, []);

  const exportPDF = useCallback(async (): Promise<Blob> => {
    try {
      return await exportEligibleGraduatesPDF(); // Use service router
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export PDF");
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    eligibleGraduates,
    loading,
    error,
    fetchDashboardData,
    exportCSV,
    exportPDF,
    clearError,
  };
};
