import type { DashboardData } from "../types/dashboard";

// Mock dashboard service implementation
export const getDashboardDataMock = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    stats: {
      totalStudents: 24,
      pendingGraduation: 3,
      totalPetitions: 8,
    },
    alerts: [
      { id: "1", message: "Petition deadline: May 30, 2025", type: "warning" },
      {
        id: "2",
        message: "Student John Doe is at risk of not graduating",
        type: "error",
      },
    ],
    notifications: [
      {
        id: "1",
        title: "Graduation approval pending",
        message: "3 students are waiting for your approval.",
        type: "info",
        date: "2025-05-25",
        read: false,
      },
      {
        id: "2",
        title: "Manual check request",
        message: "A new manual check request has been submitted.",
        type: "info",
        date: "2025-05-24",
        read: false,
      },
    ],
    pendingRequests: [
      {
        id: "1",
        studentName: "Ahmet Yilmaz",
        requestType: "Transcript Review",
        date: "2025-05-15",
        priority: "medium",
      },
      {
        id: "2",
        studentName: "Ayse Kaya",
        requestType: "Petition",
        date: "2025-05-17",
        priority: "high",
      },
      {
        id: "3",
        studentName: "Mehmet Demir",
        requestType: "Graduation Review",
        date: "2025-05-20",
        priority: "low",
      },
    ],
  };
};
