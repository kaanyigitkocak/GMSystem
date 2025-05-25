import type { ManualCheckRequest } from "../types/dashboard";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../common/utils/serviceUtils";
import { getUserFromAuthApi } from "./usersApi";
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

// Interface for backend graduation process response
interface BackendGraduationProcess {
  id: string;
  studentId: string;
  status: number;
  advisorDecision?: boolean;
  advisorDecisionDate?: string;
  advisorNotes?: string;
  createdDate: string;
  student?: {
    firstName: string;
    lastName: string;
    studentNumber: string;
  };
}

// Interface for backend student response
interface BackendStudent {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  assignedAdvisorUserId: string;
}

// API manual check requests service implementation
export const getManualCheckRequestsApi = async (): Promise<
  ManualCheckRequest[]
> => {
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

      // Get current advisor info
      const currentAdvisor = await getUserFromAuthApi();

      if (currentAdvisor.userRole !== "ADVISOR") {
        throw new ServiceError("User is not an advisor");
      }

      // Get all graduation processes
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

      // Get students to match with graduation processes
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
      }>(studentsResponse);

      // Filter students assigned to this advisor
      const advisorStudents = studentsData.items.filter(
        (student) => student.assignedAdvisorUserId === currentAdvisor.id
      );
      const advisorStudentIds = advisorStudents.map((student) => student.id);

      // Filter graduation processes for advisor's students that need manual review
      const manualCheckRequests = graduationData.items
        .filter(
          (process) =>
            advisorStudentIds.includes(process.studentId) &&
            process.advisorDecision === null &&
            process.status >= 6 // Status that requires advisor review
        )
        .map((process) => {
          const student = advisorStudents.find(
            (s) => s.id === process.studentId
          );

          // Determine priority based on status
          let priority: "low" | "medium" | "high" = "medium";
          if (process.status >= 8) priority = "high"; // Graduation stages
          else if (process.status >= 7) priority = "medium";
          else priority = "low";

          // Determine status description
          let status: "Pending" | "In Review" | "Completed" | "Rejected" =
            "Pending";
          if (process.advisorDecision === true) status = "Completed";
          else if (process.advisorDecision === false) status = "Rejected";
          else if (process.status >= 6) status = "In Review";

          return {
            id: process.id,
            student: student
              ? `${student.firstName} ${student.lastName}`
              : "Unknown Student",
            studentId: process.studentId,
            date: process.createdDate,
            reason: getReasonFromStatus(process.status),
            status,
            notes: process.advisorNotes || "",
            priority,
          };
        });

      return manualCheckRequests;
    } catch (error) {
      console.error("Failed to fetch manual check requests:", error);
      throw new ServiceError(
        "Failed to fetch manual check requests from backend"
      );
    }
  });
};

export const updateManualCheckRequestApi = async (
  id: string,
  updates: Partial<ManualCheckRequest>
): Promise<ManualCheckRequest> => {
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

      // Determine which graduation process command to use
      const isApproved = updates.status === "Completed";
      const endpoint = isApproved
        ? "SetAdvisorEligible"
        : "SetAdvisorNotEligible";

      const command = {
        graduationProcessId: id,
        notes: updates.notes || "",
      };

      const response = await fetch(
        `${apiBaseUrl}/GraduationProcesses/${endpoint}`,
        {
          ...fetchOptions,
          method: "POST",
          headers,
          body: JSON.stringify(command),
        }
      );

      await handleApiResponse(response);

      // Return updated manual check request
      return {
        id,
        student: "",
        studentId: "",
        date: new Date().toISOString(),
        reason: "",
        status: updates.status || "Pending",
        notes: updates.notes || "",
        priority: updates.priority || "medium",
        ...updates,
      };
    } catch (error) {
      console.error("Failed to update manual check request:", error);
      throw new ServiceError("Failed to update manual check request");
    }
  });
};

// Helper function to determine reason from graduation process status
const getReasonFromStatus = (status: number): string => {
  switch (status) {
    case 6:
      return "Awaiting advisor approval";
    case 7:
      return "Department secretary review";
    case 8:
      return "Dean's office review";
    case 9:
      return "Student affairs review";
    default:
      return "Manual review required";
  }
};
