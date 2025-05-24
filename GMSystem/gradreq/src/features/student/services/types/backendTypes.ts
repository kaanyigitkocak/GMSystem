// Backend API Response Types

export interface BackendUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentNumber?: string;
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
}

export interface BackendCourseTakenItem {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  credits: number;
  grade: string;
  semester: string;
}
