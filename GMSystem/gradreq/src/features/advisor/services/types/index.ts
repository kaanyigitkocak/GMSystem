// Types for advisor feature

// Types for student data
export interface Student {
  id: string;
  name: string;
  department: string;
  gpa: string;
  status: "Normal Öğrenim" | "Şartlı Geçme" | "Mezuniyet Aşaması";
  email?: string;
  phone?: string;
  lastMeeting?: string;
}

// Types for petition
export type PetitionStudent = Pick<Student, "id" | "name" | "department">;

export interface PetitionData {
  type: string;
  studentId: string;
  content: string;
}

export interface PetitionResult {
  id: string;
  type: string;
  studentId: string;
  content: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
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
