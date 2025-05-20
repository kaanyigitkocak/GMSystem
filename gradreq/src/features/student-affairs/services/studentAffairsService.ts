import type { Student, GraduationRequest, Application, DashboardStats, Department, DepartmentGradRequirement, FacultyRankingFile, UniversityRankingResult, SystemFacultyRanking, Faculty } from '../types';

// Mock data - Bu veriler gerçek API entegrasyonu ile değiştirilecek
const mockStudents: Student[] = [
  {
    id: '1',
    studentId: '20230001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Computer Science',
    program: 'Bachelor',
    enrollmentDate: '2023-09-01',
    status: 'active',
    gpa: 3.5,
  },
  // Daha fazla mock veri eklenebilir
];

const mockGraduationRequests: GraduationRequest[] = [
  {
    id: '1',
    studentId: '20230001',
    studentName: 'John Doe',
    department: 'Computer Science',
    program: 'Bachelor',
    submissionDate: '2024-03-15',
    status: 'pending',
    gpa: 3.5,
    creditsCompleted: 120,
    requiredCredits: 120,
    advisorApproval: true,
    departmentApproval: true,
    studentAffairsApproval: false,
  },
  // Daha fazla mock veri eklenebilir
];

const mockApplications: Application[] = [
  {
    id: '1',
    studentId: '20230001',
    studentName: 'John Doe',
    type: 'course_registration',
    status: 'pending',
    submissionDate: '2024-03-15',
    details: 'Requesting registration for CS401',
  },
  // Daha fazla mock veri eklenebilir
];

const mockDepartments: Department[] = [
  { id: 'cs', name: 'Computer Science' },
  { id: 'ee', name: 'Electrical Engineering' },
  { id: 'me', name: 'Mechanical Engineering' },
];

let mockDepartmentGradRequirements: DepartmentGradRequirement[] = [];
let mockFacultyRankingFiles: FacultyRankingFile[] = [];
let mockUniversityRankingResult: UniversityRankingResult | null = null;

const mockSystemFacultyRankings: SystemFacultyRanking[] = [
  {
    id: 'sys-1',
    facultyName: 'Faculty of Engineering',
    fileName: 'engineering_faculty_ranking.xlsx',
    fileUrl: 'https://example.com/engineering_faculty_ranking.xlsx',
  },
  {
    id: 'sys-2',
    facultyName: 'Faculty of Architecture',
    fileName: 'architecture_faculty_ranking.xlsx',
    fileUrl: 'https://example.com/architecture_faculty_ranking.xlsx',
  },
  {
    id: 'sys-3',
    facultyName: 'Faculty of Scinece',
    fileName: 'science_faculty_ranking.xlsx',
    fileUrl: 'https://example.com/science_faculty_ranking.xlsx',
  },
];

const faculties: Faculty[] = [
  {
    id: 'science',
    name: 'Faculty of Science',
    departments: [
      { id: 'physics', name: 'Physics' },
      { id: 'photonics', name: 'Photonics' },
      { id: 'chemistry', name: 'Chemistry' },
      { id: 'mathematics', name: 'Mathematics' },
      { id: 'mbg', name: 'Molecular Biology and Genetics' },
    ],
  },
  {
    id: 'engineering',
    name: 'Faculty of Engineering',
    departments: [
      { id: 'computer', name: 'Computer Engineering' },
      { id: 'bioengineering', name: 'Bioengineering' },
      { id: 'environmental', name: 'Environmental Engineering' },
      { id: 'energy', name: 'Energy Systems Engineering' },
      { id: 'electrical', name: 'Electrical-Electronics Engineering' },
      { id: 'food', name: 'Food Engineering' },
      { id: 'civil', name: 'Civil Engineering' },
      { id: 'chemical', name: 'Chemical Engineering' },
      { id: 'mechanical', name: 'Mechanical Engineering' },
      { id: 'materials', name: 'Materials Science and Engineering' },
    ],
  },
  {
    id: 'architecture',
    name: 'Faculty of Architecture',
    departments: [
      { id: 'industrial', name: 'Industrial Design' },
      { id: 'architecture', name: 'Architecture' },
      { id: 'crp', name: 'City and Regional Planning' },
    ],
  },
];

// API çağrılarını simüle eden fonksiyonlar
export const getStudents = async (): Promise<Student[]> => {
  // Simüle edilmiş API gecikmesi
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockStudents;
};

export const getGraduationRequests = async (): Promise<GraduationRequest[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockGraduationRequests;
};

export const getApplications = async (): Promise<Application[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockApplications;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    totalStudents: mockStudents.length,
    pendingGraduationRequests: mockGraduationRequests.filter(req => req.status === 'pending').length,
    activeApplications: mockApplications.filter(app => app.status === 'pending').length,
  };
};

export const approveGraduationRequest = async (requestId: string): Promise<GraduationRequest> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const request = mockGraduationRequests.find(req => req.id === requestId);
  if (!request) {
    throw new Error('Graduation request not found');
  }
  request.status = 'approved';
  request.studentAffairsApproval = true;
  return request;
};

export const rejectGraduationRequest = async (requestId: string): Promise<GraduationRequest> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const request = mockGraduationRequests.find(req => req.id === requestId);
  if (!request) {
    throw new Error('Graduation request not found');
  }
  request.status = 'rejected';
  return request;
};

export const approveApplication = async (applicationId: string): Promise<Application> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const application = mockApplications.find(app => app.id === applicationId);
  if (!application) {
    throw new Error('Application not found');
  }
  application.status = 'approved';
  return application;
};

export const rejectApplication = async (applicationId: string): Promise<Application> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const application = mockApplications.find(app => app.id === applicationId);
  if (!application) {
    throw new Error('Application not found');
  }
  application.status = 'rejected';
  return application;
};

export const getDepartments = async (): Promise<Department[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockDepartments;
};

export const addDepartmentGradRequirement = async (
  departmentId: string,
  file: File,
  facultyId: string
): Promise<DepartmentGradRequirement> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const fileName = file.name;
  const fileUrl = URL.createObjectURL(file);
  const newReq: DepartmentGradRequirement = {
    id: `${Date.now()}`,
    facultyId,
    departmentId,
    createdAt: new Date().toISOString(),
    fileName,
    fileUrl,
  };
  mockDepartmentGradRequirements.push(newReq);
  return newReq;
};

export const getDepartmentGradRequirements = async (departmentId: string): Promise<DepartmentGradRequirement[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockDepartmentGradRequirements.filter(req => req.departmentId === departmentId);
};

export const deleteDepartmentGradRequirement = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  mockDepartmentGradRequirements = mockDepartmentGradRequirements.filter(req => req.id !== id);
};

export const sendGraduationMail = async (mailContent: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Burada gerçek sistemde mail gönderimi yapılırdı
  console.log('Mail content to send:', mailContent);
  return;
};

export const uploadFacultyRankingFiles = async (files: File[]): Promise<FacultyRankingFile[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const uploaded = files.map((file) => ({
    id: `${Date.now()}-${file.name}`,
    fileName: file.name,
    file,
  }));
  mockFacultyRankingFiles = [...mockFacultyRankingFiles, ...uploaded];
  return uploaded;
};

export const getUploadedFacultyRankingFiles = async (): Promise<FacultyRankingFile[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockFacultyRankingFiles;
};

export const removeFacultyRankingFile = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  mockFacultyRankingFiles = mockFacultyRankingFiles.filter(f => f.id !== id);
};

export const createUniversityRanking = async (): Promise<UniversityRankingResult> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  if (mockFacultyRankingFiles.length === 0) {
    throw new Error('No faculty ranking files uploaded.');
  }
  // Mock: honors ve high honors için iki ayrı CSV dosyası oluştur
  const honorsRows = [
    'student_id,gpa,faculty\n',
    '1001,3.2,CS\n',
    '1002,3.3,EE\n',
  ];
  const highHonorsRows = [
    'student_id,gpa,faculty\n',
    '2001,3.6,CS\n',
    '2002,3.8,EE\n',
  ];
  const honorsBlob = new Blob(honorsRows, { type: 'text/csv' });
  const highHonorsBlob = new Blob(highHonorsRows, { type: 'text/csv' });
  const honorsFileName = 'honors_list.csv';
  const highHonorsFileName = 'high_honors_list.csv';
  const honorsFileUrl = URL.createObjectURL(honorsBlob);
  const highHonorsFileUrl = URL.createObjectURL(highHonorsBlob);
  mockUniversityRankingResult = {
    honorsFileName,
    honorsFileUrl,
    highHonorsFileName,
    highHonorsFileUrl,
  };
  return mockUniversityRankingResult;
};

export const getUniversityRankingResult = async (): Promise<UniversityRankingResult | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockUniversityRankingResult;
};

export const getSystemFacultyRankings = async (): Promise<SystemFacultyRanking[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockSystemFacultyRankings;
};

export const getFaculties = async (): Promise<Faculty[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return faculties;
};

export interface Notification {
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  desc: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  await new Promise(res => setTimeout(res, 300));
  return [
    { type: 'info', title: 'Faculty Ranking Uploaded', desc: 'Faculty of Engineering uploaded a faculty ranking file.' },
    { type: 'info', title: 'Faculty Ranking Uploaded', desc: 'Faculty of Science uploaded a faculty ranking file.' },
  ];
}; 