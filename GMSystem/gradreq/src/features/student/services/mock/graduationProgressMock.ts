import type { GraduationStep, DisconnectionItem } from "../types";

// Mock data for graduation steps
export const getGraduationProgressMock = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockSteps: GraduationStep[] = [
    {
      label: "Transcript Upload",
      description: "Upload your transcript",
    },
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
    {
      label: "Student Affairs",
      description: "Student affairs final check",
    },
    {
      label: "Graduation Complete",
      description: "Congratulations! You have graduated",
    },
  ];

  // Current active step (0-based index)
  const activeStep = 1;

  // Mock step statuses
  const stepStatuses: Array<"pending" | "approved" | "rejected"> = [
    "approved", // Transcript Upload - completed
    "pending", // Advisor Check - current step
    "pending", // Department Approval
    "pending", // Dean's Office
    "pending", // Student Affairs
    "pending", // Graduation Complete
  ];

  return {
    steps: mockSteps,
    activeStep,
    stepStatuses,
  };
};

// Mock data for disconnection procedures
export const getDisconnectionProceduresMock = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  const mockDisconnectionItems: DisconnectionItem[] = [
    { name: "Library", completed: true },
    { name: "Dormitory", completed: true },
    { name: "Labs", completed: false },
    { name: "Sports Center", completed: true },
    { name: "IT Department", completed: false },
    { name: "Accounting", completed: true },
    { name: "Student Affairs", completed: false },
  ];

  return mockDisconnectionItems;
};
