import { useState, useEffect } from "react";
import type { DashboardData } from "../services/types/dashboard";
import { dashboardService } from "../services";
import { useEligibility } from "../contexts/EligibilityContext";

export const useAdvisorDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use eligibility context instead of local state
  const {
    eligibilityData,
    loading: eligibilityLoading,
    performingChecks,
    dataLoaded: eligibilityDataLoaded,
    fetchEligibilityData,
    performEligibilityChecksForMissingStudents,
    refreshEligibilityData,
  } = useEligibility();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dashboardService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  const manualRefreshEligibility = async () => {
    console.log("🔍 [DashboardHook] Manual refresh requested");
    await fetchEligibilityData(true);
  };

  useEffect(() => {
    // Only fetch dashboard data, eligibility is handled by context
    fetchDashboardData();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    eligibilityData,
    eligibilityLoading,
    performingChecks,
    eligibilityDataLoaded,
    refetch: async () => {
      await fetchDashboardData();
      // Don't automatically refresh eligibility data on dashboard refetch
    },
    refreshEligibility: manualRefreshEligibility,
    performEligibilityChecksForMissingStudents,
    refreshEligibilityData,
  };
};
