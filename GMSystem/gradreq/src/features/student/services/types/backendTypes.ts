// Backend API Response Types

export interface BackendUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentNumber?: string;
  departmentName?: string;
}

export interface BackendStudentResponse {
  id: string;
  departmentName: string;
  facultyName: string;
  userId: string;
}

export interface BackendTranscriptDataResponse {
  items: BackendTranscriptItem[];
}

export interface BackendTranscriptItem {
  id: string;
  studentId: string;
  // Add more fields as needed based on actual backend response
}

export interface BackendCourseTakensResponse {
  items: BackendCourseTakenItem[];
  count: number;
  hasNext: boolean;
  hasPrevious: boolean;
  index: number;
  size: number;
  pages: number;
}

export interface BackendCourseTakenItem {
  id: string;
  studentUserId: string;
  courseCodeInTranscript: string;
  courseNameInTranscript: string;
  matchedCourseId: string;
  grade: string;
  semesterTaken: string;
  creditsEarned: number;
  isSuccessfullyCompleted: boolean;
}

// Types for Eligibility Check API
export interface BackendEligibilityCheckItem {
  id: string;
  processId: string;
  checkType: number; // 1 for GPA, 2 for ECTS, etc.
  isMet: boolean;
  actualValue: string;
  requiredValue: string;
  notesOrMissingItems: string | null;
  checkDate: string;
}

export interface BackendEligibilityCheckResponse {
  items: BackendEligibilityCheckItem[];
  // Assuming pagination properties similar to BackendCourseTakensResponse if needed
  // count?: number;
  // hasNext?: boolean;
  // hasPrevious?: boolean;
  // index?: number;
  // size?: number;
  // pages?: number;
}

// Types for Courses API
export interface BackendCourseItem {
  id: string;
  courseCode: string;
  courseName: string;
  departmentId: string;
  ects: number;
  courseType: number; // 1 for mandatory, 2 for elective, etc.
}

export interface BackendCoursesResponse {
  items: BackendCourseItem[];
  count: number;
  hasNext: boolean;
  hasPrevious: boolean;
  index: number;
  size: number;
  pages: number;
}
