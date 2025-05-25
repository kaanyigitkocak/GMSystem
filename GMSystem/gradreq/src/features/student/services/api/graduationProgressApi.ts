import { getServiceConfig } from "../../../common/utils/serviceUtils";
import { getCurrentStudentApi } from "./studentApi";

getServiceConfig();

// Helper function to get access token with debug

// Map graduation process status to step index and completion status
const mapStatusToProgress = (status: number) => {
  const steps: Array<{
    label: string;
    description: string;
    statuses: number[];
  }> = [
    {
      label: "Transcript Upload",
      description: "Upload your transcript",
      statuses: [1, 4], // AWAITING_DEPT_SECRETARY_TRANSCRIPT_UPLOAD, TRANSCRIPT_PARSE_ERROR_AWAITING_REUPLOAD
    },
    {
      label: "Advisor Check",
      description: "Advisor reviews your eligibility",
      statuses: [3, 5, 6], // TRANSCRIPT_PARSE_SUCCESSFUL_PENDING_ADVISOR_CHECK, ADVISOR_ELIGIBLE, ADVISOR_NOT_ELIGIBLE
    },
    {
      label: "Department Approval",
      description: "Department secretary approval",
      statuses: [8, 9], // DEPT_SECRETARY_APPROVED_PENDING_DEAN, DEPT_SECRETARY_REJECTED_PROCESS
    },
    {
      label: "Dean's Office",
      description: "Final approval from dean's office",
      statuses: [11, 12], // DEANS_OFFICE_APPROVED, DEANS_OFFICE_REJECTED
    },
    {
      label: "Student Affairs",
      description: "Student affairs final check",
      statuses: [14, 15], // STUDENT_AFFAIRS_APPROVED, STUDENT_AFFAIRS_REJECTED
    },
    {
      label: "Graduation Complete",
      description: "Congratulations! You have graduated",
      statuses: [18], // COMPLETED_GRADUATED
    },
  ];

  // Find current step based on status
  let activeStep = 0;
  let stepStatuses: Array<"pending" | "approved" | "rejected"> = [];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    if (step.statuses.includes(status)) {
      activeStep = i;

      // Determine step status based on specific status values
      if (
        status === 6 ||
        status === 9 ||
        status === 12 ||
        status === 15 ||
        status === 19
      ) {
        // ADVISOR_NOT_ELIGIBLE, DEPT_SECRETARY_REJECTED_PROCESS, DEANS_OFFICE_REJECTED, STUDENT_AFFAIRS_REJECTED, PROCESS_TERMINATED_BY_ADMIN
        stepStatuses[i] = "rejected";
      } else if (
        status === 5 ||
        status === 8 ||
        status === 11 ||
        status === 14 ||
        status === 18
      ) {
        // ADVISOR_ELIGIBLE, DEPT_SECRETARY_APPROVED_PENDING_DEAN, DEANS_OFFICE_APPROVED, STUDENT_AFFAIRS_APPROVED, COMPLETED_GRADUATED
        stepStatuses[i] = "approved";
      } else {
        stepStatuses[i] = "pending";
      }
      break;
    }
  }

  // Mark previous steps as approved if current step is beyond them
  for (let i = 0; i < activeStep; i++) {
    stepStatuses[i] = "approved";
  }

  return {
    steps: steps.map((step) => ({
      label: step.label,
      description: step.description,
    })),
    activeStep,
    stepStatuses,
  };
};

// Mock graduation progress for when student record doesn't exist
const createMockGraduationProgress = () => {
  console.log("📋 Creating mock graduation progress data");
  return {
    steps: [
      { label: "Transcript Upload", description: "Upload your transcript" },
      {
        label: "Advisor Check",
        description: "Advisor reviews your eligibility",
      },
      {
        label: "Department Approval",
        description: "Department secretary approval",
      },
      {
        label: "Dean's Office",
        description: "Final approval from dean's office",
      },
      { label: "Student Affairs", description: "Student affairs final check" },
      {
        label: "Graduation Complete",
        description: "Congratulations! You have graduated",
      },
    ],
    activeStep: 0,
    stepStatuses: [
      "pending",
      "pending",
      "pending",
      "pending",
      "pending",
      "pending",
    ] as Array<"pending" | "approved" | "rejected">,
  };
};

// Get graduation progress for current student
export const getGraduationProgressApi = async (): Promise<{
  steps: Array<{ label: string; description: string }>;
  activeStep: number;
  stepStatuses: Array<"pending" | "approved" | "rejected">;
}> => {
  console.log("🎓 Starting graduation progress API call...");

  try {
    // Get current student data with graduation process
    const studentData = await getCurrentStudentApi();

    if (studentData.graduationProcess && studentData.graduationProcess.status) {
      console.log(
        "✅ Got student graduation process status:",
        studentData.graduationProcess.status
      );

      // Map the status to progress
      const progress = mapStatusToProgress(
        studentData.graduationProcess.status
      );

      console.log(
        "🎉 Graduation progress API completed successfully:",
        progress
      );
      return progress;
    } else {
      console.log("⚠️ No graduation process found, using mock data");
      return createMockGraduationProgress();
    }
  } catch (error) {
    console.error("❌ Graduation progress API failed:", error);

    // If there's an error, return mock data
    console.log("📋 Returning mock graduation progress due to error");
    return createMockGraduationProgress();
  }
};

// Get disconnection procedures for current student
export const getDisconnectionProceduresApi = async (): Promise<
  Array<{
    name: string;
    completed: boolean;
  }>
> => {
  console.log("📋 Getting disconnection procedures...");

  // This endpoint might not exist yet, returning mock data for now
  const result = [
    { name: "Library", completed: false },
    { name: "Student Affairs", completed: false },
    { name: "Department", completed: false },
    { name: "Dormitory", completed: false },
  ];

  console.log("✅ Disconnection procedures (mock):", result);
  return result;
};
