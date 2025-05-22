import type { GraduationStep, DisconnectionItem } from "../types";

// Mock data for graduation steps
export const getGraduationProgressMock = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockSteps: GraduationStep[] = [
    {
      label: "Application Submitted",
      description: "Your graduation application has been received.",
    },
    {
      label: "Department Review",
      description: "Your application is under review by the department.",
    },
    {
      label: "Disconnection Procedures",
      description: "Complete necessary disconnection procedures.",
    },
    {
      label: "Dean's Office Approval",
      description: "Awaiting approval from the Dean's Office.",
    },
    {
      label: "Graduation Approved",
      description: "Congratulations! Your graduation is approved.",
    },
  ];

  // Current active step (0-based index)
  const activeStep = 1;

  return {
    steps: mockSteps,
    activeStep,
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
