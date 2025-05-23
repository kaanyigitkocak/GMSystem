import { useState, useEffect } from "react";
import {
  getStudents,
  getNotifications,
  getGraduationDecisions,
} from "../services";
import type { Notification } from "../types";

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

interface DashboardStats {
  totalStudents: number;
  eligibleStudents: number;
  pendingStudents: number;
  notEligibleStudents: number;
}

interface UseDashboardReturn {
  loading: boolean;
  stats: DashboardStats;
  recentNotifications: Notification[];
  recentDecisions: GraduationDecision[];
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStudentAffairsDashboard = (): UseDashboardReturn => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    eligibleStudents: 0,
    pendingStudents: 0,
    notEligibleStudents: 0,
  });
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

      // Fetch students data
      const studentsData = await getStudents();

      // Calculate statistics
      const eligible = studentsData.filter(
        (s) => s.graduationStatus === "Eligible"
      ).length;
      const pending = studentsData.filter(
        (s) => s.graduationStatus === "Pending"
      ).length;
      const notEligible = studentsData.filter(
        (s) => s.graduationStatus === "Not Eligible"
      ).length;

      setStats({
        totalStudents: studentsData.length,
        eligibleStudents: eligible,
        pendingStudents: pending,
        notEligibleStudents: notEligible,
      });

      // Fetch notifications
      const notificationsData = await getNotifications();
      setRecentNotifications(notificationsData.slice(0, 5));

      // Fetch graduation decisions
      const decisionsData = await getGraduationDecisions();
      setRecentDecisions(decisionsData.slice(0, 3));
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    loading,
    stats,
    recentNotifications,
    recentDecisions,
    error,
    refetch: fetchDashboardData,
  };
};
