import type { Theme } from "@mui/material";

// Types for our graduation data
export interface GraduationStep {
  label: string;
  description: string;
}

export interface DisconnectionItem {
  name: string;
  completed: boolean;
}

// Mock API functions that simulate backend calls
export const getGraduationProgressData = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    activeStep: 0, // 0-indexed, so this is "Disconnection Procedures"
    steps: [
      {
        label: "Application & Academic Assessment",
        description:
          "Your application is being reviewed by your advisor and department secretary.",
      },
      {
        label: "Dean's Office Approval",
        description:
          "Your graduation application is being reviewed by the dean's office.",
      },
      {
        label: "Disconnection Procedures",
        description:
          "You need to complete disconnection procedures with Library, IT, Student Affairs, etc.",
      },
      {
        label: "Rectorate Approval",
        description:
          "Your graduation is awaiting final approval from the rectorate.",
      },
      {
        label: "Graduation Approved",
        description:
          "Congratulations! Your graduation has been approved and your documents are being prepared.",
      },
    ],
  };
};

export const getDisconnectionProcedures = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { name: "Library", completed: true },
    { name: "IT Department", completed: false },
    { name: "Student Affairs", completed: false },
    { name: "Graduate Office", completed: false },
    { name: "Sports & Culture Dept.", completed: false },
  ];
};

// Helper function for step icons
export const getStepIcon = (index: number, icons: React.ReactNode[]) => {
  return icons[index];
};
