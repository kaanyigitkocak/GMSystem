import { useState, useEffect } from "react";
import type { DashboardStats } from "../services/types";
import { getDashboardStats } from "../services";
import { useEligibility } from "../contexts/EligibilityContext";

export interface SecretaryDashboardData {
  stats: DashboardStats;
  alerts: Array<{
    id: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
  }>;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    read: boolean;
    createdAt: string;
  }>;
  pendingRequests: Array<{
    id: string;
    studentName: string;
    requestType: string;
    date: string;
    priority: 'low' | 'medium' | 'high';
  }>;
}

export const useSecretaryDashboard = () => {
  const [dashboardData, setDashboardData] = useState<SecretaryDashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use eligibility context for student eligibility data
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
      
      // Fetch dashboard stats
      const stats = await getDashboardStats();
      
      // Create dashboard data structure similar to advisor
      const dashboardData: SecretaryDashboardData = {
        stats: {
          graduatesCount: stats.graduatesCount || 0,
          graduationDate: stats.graduationDate || '',
          totalStudents: eligibilityData?.studentsWithEligibility?.length || 0,
          eligibleStudents: eligibilityData?.eligibleCount || 0,
          ineligibleStudents: eligibilityData?.ineligibleCount || 0,
          pendingChecks: eligibilityData?.pendingCheckCount || 0,
        },
        alerts: [],
        notifications: [],
        pendingRequests: [],
      };

      setDashboardData(dashboardData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  const manualRefreshEligibility = async () => {
    console.log("🔍 [SecretaryDashboardHook] Manual refresh requested");
    await fetchEligibilityData(true);
  };

  useEffect(() => {
    // Fetch dashboard data when eligibility data changes
    if (eligibilityDataLoaded) {
      fetchDashboardData();
    }
  }, [eligibilityDataLoaded, eligibilityData]);

  useEffect(() => {
    // Initial fetch
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
    },
    refreshEligibility: manualRefreshEligibility,
    performEligibilityChecksForMissingStudents,
    refreshEligibilityData,
  };
};
