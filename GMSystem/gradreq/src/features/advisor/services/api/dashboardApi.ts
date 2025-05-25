import type {
  DashboardData,
  DashboardStats,
  PendingRequest,
} from "../types/dashboard";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import { getUserFromAuthApi, type UserFromAuth } from "./usersApi";
import { executeWithRetry } from "../../../common/utils/rateLimitUtils";

// Get service configuration
const { apiBaseUrl } = getServiceConfig();

// Default fetch options
const fetchOptions = {
  mode: "cors" as RequestMode,
  headers: {
    "Content-Type": "application/json",
  },
};

// Interface for backend student response
interface BackendStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentNumber: string;
  graduationStatus: number;
  assignedAdvisorUserId: string;
  currentGpa?: number;
  currentEctsCompleted?: number;
  departmentId: string;
  departmentName: string;
}

// Interface for backend notification response
interface BackendNotification {
  id: string;
  title: string;
  message: string;
  recipientUserId: string;
  isRead: boolean;
  createdDate: string;
  type?: string;
}

// Interface for backend graduation process response
interface BackendGraduationProcess {
  id: string;
  studentId: string;
  status: number;
  advisorDecision?: boolean;
  advisorDecisionDate?: string;
  createdDate: string;
}

// API dashboard service implementation
export const getDashboardDataApi = async (): Promise<DashboardData> => {
  return await executeWithRetry(async () => {
    try {
      // Get auth token from localStorage
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new ServiceError("No authentication token found");
      }

      const headers = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authToken}`,
      };

      // Step 1: Get current advisor info
      const currentAdvisor: UserFromAuth = await getUserFromAuthApi();

      if (currentAdvisor.userRole !== "ADVISOR") {
        throw new ServiceError("User is not an advisor");
      }

      // Step 2: Get students from advisor's department
      const studentsResponse = await fetch(
        `${apiBaseUrl}/Students?departmentId=${currentAdvisor.departmentId}&PageRequest.PageIndex=0&PageRequest.PageSize=1000`,
        {
          ...fetchOptions,
          method: "GET",
          headers,
        }
      );

      const studentsData = await handleApiResponse<{
        items: BackendStudent[];
        count: number;
      }>(studentsResponse);

      // Filter students assigned to this advisor
      const advisorStudents = studentsData.items.filter(
        (student) => student.assignedAdvisorUserId === currentAdvisor.id
      );

      // Step 3: Get notifications for the advisor
      const notificationsResponse = await fetch(
        `${apiBaseUrl}/Notifications?recipientUserId=${currentAdvisor.id}&PageRequest.PageIndex=0&PageRequest.PageSize=50`,
        {
          ...fetchOptions,
          method: "GET",
          headers,
        }
      );

      const notificationsData = await handleApiResponse<{
        items: BackendNotification[];
      }>(notificationsResponse);

      // Step 4: Get graduation processes for advisor's students
      const graduationResponse = await fetch(
        `${apiBaseUrl}/GraduationProcesses?PageRequest.PageIndex=0&PageRequest.PageSize=1000`,
        {
          ...fetchOptions,
          method: "GET",
          headers,
        }
      );

      const graduationData = await handleApiResponse<{
        items: BackendGraduationProcess[];
      }>(graduationResponse);

      // Filter graduation processes for advisor's students
      const advisorStudentIds = advisorStudents.map((student) => student.id);
      const advisorGraduationProcesses = graduationData.items.filter(
        (process) => advisorStudentIds.includes(process.studentId)
      );

      // Calculate dashboard statistics
      const stats: DashboardStats = {
        totalStudents: advisorStudents.length,
        pendingGraduation: advisorGraduationProcesses.filter(
          (process) => process.status >= 8 && process.status <= 9 // Graduation stages
        ).length,
        manualCheckRequests: advisorGraduationProcesses.filter(
          (process) => process.advisorDecision === null && process.status >= 6 // Waiting for advisor decision
        ).length,
        totalPetitions: 0, // Will be updated when petition system is ready
      };

      // Create pending requests from graduation processes waiting for advisor decision
      const pendingRequests: PendingRequest[] = advisorGraduationProcesses
        .filter(
          (process) => process.advisorDecision === null && process.status >= 6
        )
        .slice(0, 10) // Limit to 10 most recent
        .map((process) => {
          const student = advisorStudents.find(
            (s) => s.id === process.studentId
          );
          return {
            id: process.id,
            studentName: student
              ? `${student.firstName} ${student.lastName}`
              : "Unknown Student",
            requestType: "Graduation Review",
            date: process.createdDate,
            priority: "medium" as const,
          };
        });

      // Map notifications to frontend format
      const notifications = notificationsData.items
        .slice(0, 10) // Limit to 10 most recent
        .map((notification) => ({
          id: notification.id,
          title: notification.title,
          message: notification.message,
          type:
            (notification.type as "info" | "warning" | "error" | "success") ||
            "info",
          date: notification.createdDate,
          read: notification.isRead,
        }));

      // Create alerts based on students at risk
      const alerts = [];
      const studentsAtRisk = advisorStudents.filter(
        (student) => student.currentGpa && student.currentGpa < 2.0
      );

      if (studentsAtRisk.length > 0) {
        alerts.push({
          id: "low-gpa-alert",
          message: `${studentsAtRisk.length} student(s) have GPA below 2.0`,
          type: "warning" as const,
        });
      }

      const graduatingStudents = advisorGraduationProcesses.filter(
        (process) => process.status >= 8
      );

      if (graduatingStudents.length > 0) {
        alerts.push({
          id: "graduation-alert",
          message: `${graduatingStudents.length} student(s) are in graduation process`,
          type: "info" as const,
        });
      }

      return {
        stats,
        alerts,
        notifications,
        pendingRequests,
      };
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      throw new ServiceError("Failed to fetch dashboard data from backend");
    }
  });
};
