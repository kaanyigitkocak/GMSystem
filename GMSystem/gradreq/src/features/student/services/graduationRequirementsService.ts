// Export types
export interface RequirementItem {
  id: string;
  name: string;
  credits: number;
  completed: boolean;
}

export interface RequirementCategory {
  category: string;
  progress: number;
  completed: number;
  total: number;
  items: RequirementItem[];
}

export interface StudentProgramInfo {
  department: string;
  requiredCredits: number;
  completedCredits: number;
}

export interface GraduationRequirementsData {
  studentInfo: StudentProgramInfo;
  requirements: RequirementCategory[];
  overallProgress: number;
}

// Import real services
import {
  getGraduationRequirements as getGraduationRequirementsService,
  reportMissingFiles as reportMissingFilesService,
} from "./index";

// Export API functions that delegate to service layer
export const getGraduationRequirements = getGraduationRequirementsService;
export const reportMissingFiles = reportMissingFilesService;
