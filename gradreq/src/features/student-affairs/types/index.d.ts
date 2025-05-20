export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  department: string;
  program: string;
  enrollmentDate: string;
  status: 'active' | 'graduated' | 'on_leave' | 'suspended';
  gpa: number;
}

export interface GraduationRequest {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  program: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  gpa: number;
  creditsCompleted: number;
  requiredCredits: number;
  advisorApproval: boolean;
  departmentApproval: boolean;
  studentAffairsApproval: boolean;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  type: 'course_registration' | 'course_drop' | 'leave_of_absence' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  details: string;
}

export interface DashboardStats {
  totalStudents: number;
  pendingGraduationRequests: number;
  activeApplications: number;
}

export interface Faculty {
  id: string;
  name: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
}

export interface DepartmentGradRequirement {
  id: string;
  facultyId: string;
  departmentId: string;
  createdAt: string;
  fileName: string;
  fileUrl: string;
}

export interface FacultyRankingFile {
  id: string;
  fileName: string;
  file: File;
}

export interface UniversityRankingResult {
  honorsFileName: string;
  honorsFileUrl: string;
  highHonorsFileName: string;
  highHonorsFileUrl: string;
}

export interface SystemFacultyRanking {
  id: string;
  facultyName: string;
  fileName: string;
  fileUrl: string;
} 