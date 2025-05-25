import { useState, useEffect } from "react";
import { useStudentAffairs } from "../contexts/StudentAffairsContext";
import { getNotifications, getGraduationDecisions } from "../services";
import type { Notification } from "../types";
import type { StudentAffairsDashboardStats } from "../services/studentsApi";

interface GraduationDecision {
  id: string;
  meetingDate: string;
  decisionNumber: string;
  faculty: string;
  department: string;
  academicYear: string;
  semester: string;
  students: Array<{
    id: string;
    name: string;
    studentId: string;
    status: string;
  }>;
}

interface UseDashboardReturn {
  loading: boolean;
  stats: StudentAffairsDashboardStats | null;
  recentNotifications: Notification[];
  recentDecisions: GraduationDecision[];
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStudentAffairsDashboard = (): UseDashboardReturn => {
  const {
    dashboardStats,
    loading: studentsLoading,
    error: studentsError,
    fetchStudentsData,
  } = useStudentAffairs();
  const [loading, setLoading] = useState(true);
  const [recentNotifications, setRecentNotifications] = useState<
    Notification[]
  >([]);
  const [recentDecisions, setRecentDecisions] = useState<GraduationDecision[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch students data from context if not already loaded
      if (!dashboardStats && !studentsLoading) {
        await fetchStudentsData();
      }

      // Fetch notifications
      try {
        const notificationsData = await getNotifications();
        setRecentNotifications(notificationsData.slice(0, 5));
      } catch (err) {
        console.warn("Failed to fetch notifications:", err);
        setRecentNotifications([]);
      }

      // Fetch graduation decisions
      try {
        const decisionsData = await getGraduationDecisions();
        setRecentDecisions(decisionsData.slice(0, 3));
      } catch (err) {
        console.warn("Failed to fetch graduation decisions:", err);
        setRecentDecisions([]);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [dashboardStats]);

  // Combine loading states and errors
  const combinedLoading = loading || studentsLoading;
  const combinedError = error || studentsError;

  return {
    loading: combinedLoading,
    stats: dashboardStats,
    recentNotifications,
    recentDecisions,
    error: combinedError,
    refetch: fetchDashboardData,
  };
};
