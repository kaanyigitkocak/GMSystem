import { useState, useEffect } from "react";

interface DepartmentStatus {
  department: string;
  filesUploaded: boolean;
  lastUpdate: string;
}

interface RecentActivity {
  id: number;
  action: string;
  timestamp: string;
  user: string;
}

interface DashboardStats {
  uploadedCount: number;
  totalDepartments: number;
  uploadProgress: number;
}

interface UseDeansOfficeDashboardReturn {
  // Data
  departmentStats: DepartmentStatus[];
  recentActivities: RecentActivity[];
  stats: DashboardStats;

  // State
  statusMessage: string | null;

  // Actions
  clearStatusMessage: () => void;
}

export const useDeansOfficeDashboard = (
  userName?: string
): UseDeansOfficeDashboardReturn => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  const departmentStats: DepartmentStatus[] = [
    {
      department: "Computer Engineering",
      filesUploaded: true,
      lastUpdate: "1 day ago",
    },
    {
      department: "Mathematics",
      filesUploaded: true,
      lastUpdate: "2 days ago",
    },
    { department: "Physics", filesUploaded: false, lastUpdate: "N/A" },
    { department: "Chemistry", filesUploaded: false, lastUpdate: "N/A" },
    {
      department: "Mechanical Engineering",
      filesUploaded: false,
      lastUpdate: "N/A",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: 1,
      action: "Faculty ranking updated",
      timestamp: "2 hours ago",
      user: "Dean's Office",
    },
    {
      id: 4,
      action: "Faculty ranking updated",
      timestamp: "1 week ago",
      user: "Dean's Office",
    },
  ];

  // Calculate statistics
  const uploadedCount = departmentStats.filter(
    (dept) => dept.filesUploaded
  ).length;
  const totalDepartments = departmentStats.length;
  const uploadProgress = (uploadedCount / totalDepartments) * 100;

  const stats: DashboardStats = {
    uploadedCount,
    totalDepartments,
    uploadProgress,
  };

  useEffect(() => {
    // Set welcome message when component mounts
    setStatusMessage(
      `Welcome back, ${
        userName || "Dean"
      }. ${uploadedCount} out of ${totalDepartments} departments have uploaded their ranking files.`
    );

    // Clear message after 5 seconds
    const timer = setTimeout(() => {
      setStatusMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [userName, uploadedCount, totalDepartments]);

  const clearStatusMessage = () => {
    setStatusMessage(null);
  };

  return {
    departmentStats,
    recentActivities,
    stats,
    statusMessage,
    clearStatusMessage,
  };
};
