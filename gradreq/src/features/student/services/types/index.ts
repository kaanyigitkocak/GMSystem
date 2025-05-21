// Types for student feature

// Types for notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "warning" | "error" | "success";
}

// Types for graduation requirements data
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

// Types for graduation process
export interface GraduationStep {
  label: string;
  description: string;
}

export interface DisconnectionItem {
  name: string;
  completed: boolean;
}

// Types for transcript data
export interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  semester: string;
}

export interface StudentInfo {
  name: string;
  id: string;
  department: string;
}

export interface TranscriptData {
  studentInfo: StudentInfo;
  courses: Course[];
  gpa: string;
}
