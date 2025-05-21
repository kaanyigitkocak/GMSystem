import axios from 'axios';
import { 
  Student, 
  ManualCheckRequest, 
  Notification, 
  UpcomingDeadline, 
  AdvisorStatistics, 
  PetitionType,
  Petition
} from '../types';

// Base API URL would typically come from environment config
const API_BASE_URL = '/api';

// Mock data for development purposes
// In production, these would be actual API calls
const mockStudents: Student[] = [
  { id: 1, studentId: '240201002', name: 'Ahmet', surname: 'Yılmaz', department: 'Computer Engineering', gpa: 3.42, academicStatus: 'Active' },
  { id: 2, studentId: '240201003', name: 'Ayşe', surname: 'Kaya', department: 'Computer Engineering', gpa: 3.85, academicStatus: 'Active' },
  { id: 3, studentId: '240201005', name: 'Mehmet', surname: 'Demir', department: 'Computer Engineering', gpa: 2.75, academicStatus: 'Active' },
  { id: 4, studentId: '240201008', name: 'Zeynep', surname: 'Öztürk', department: 'Computer Engineering', gpa: 3.21, academicStatus: 'Active' },
  { id: 5, studentId: '240201012', name: 'Can', surname: 'Yıldız', department: 'Computer Engineering', gpa: 2.95, academicStatus: 'Probation' }
];

const mockManualCheckRequests: ManualCheckRequest[] = [
  { 
    id: 1, 
    studentId: '240201002', 
    studentName: 'Ahmet Yılmaz', 
    requestType: 'Article 19 Evaluation', 
    date: '2023-05-15', 
    reason: 'Need evaluation for summer school courses', 
    status: 'pending' 
  },
  { 
    id: 2, 
    studentId: '240201003', 
    studentName: 'Ayşe Kaya', 
    requestType: 'Special Case Graduation Check', 
    date: '2023-05-14', 
    reason: 'Erasmus exchange credits need to be manually checked', 
    status: 'reviewing' 
  },
  { 
    id: 3, 
    studentId: '240201008', 
    studentName: 'Zeynep Öztürk', 
    requestType: 'Summer School Credits', 
    date: '2023-05-10', 
    reason: 'Summer school courses from another university', 
    status: 'pending' 
  }
];

const mockNotifications: Notification[] = [
  { 
    id: 1, 
    title: 'New Manual Check Request', 
    message: 'Ahmet Yılmaz has submitted a new manual check request', 
    date: '2023-05-15', 
    type: 'info', 
    read: false 
  },
  { 
    id: 2, 
    title: 'Graduation Approval Deadline', 
    message: 'Graduation approval deadline is approaching. Please review all pending requests.', 
    date: '2023-05-14', 
    type: 'warning', 
    read: false 
  },
  { 
    id: 3, 
    title: 'Transcript Updated', 
    message: 'Transcript has been updated for Zeynep Öztürk', 
    date: '2023-05-10', 
    type: 'success', 
    read: true 
  }
];

const mockUpcomingDeadlines: UpcomingDeadline[] = [
  { 
    id: 1, 
    title: 'Graduation Approval Deadline', 
    date: '2023-06-01', 
    description: 'Last day to approve graduation requests for this semester' 
  },
  { 
    id: 2, 
    title: 'Petition Submission Deadline', 
    date: '2023-05-25', 
    description: 'Last day for students to submit petitions for graduation exceptions' 
  }
];

const mockPetitionTypes: PetitionType[] = [
  {
    id: 1,
    name: 'Course Substitution',
    description: 'Request to substitute one course for another in graduation requirements'
  },
  {
    id: 2,
    name: 'Graduation Time Extension',
    description: 'Request for extension of graduation deadline'
  },
  {
    id: 3,
    name: 'Credit Transfer',
    description: 'Request to transfer credits from another institution'
  },
  {
    id: 4,
    name: 'Special Case Evaluation',
    description: 'Request for evaluation of special circumstances not covered by other petition types'
  }
];

const mockPetitions: Petition[] = [
  {
    id: 1,
    studentId: '240201003',
    studentName: 'Ayşe Kaya',
    type: 'Course Substitution',
    date: '2023-05-10',
    content: 'Request to substitute CENG3XX with CENG4XX',
    status: 'submitted'
  },
  {
    id: 2,
    studentId: '240201008',
    studentName: 'Zeynep Öztürk',
    type: 'Credit Transfer',
    date: '2023-05-05',
    content: 'Transfer credits from summer school at Istanbul Technical University',
    status: 'processed'
  }
];

// API service functions
export const getAdvisedStudents = async (): Promise<Student[]> => {
  // In production, this would be an actual API call
  // return axios.get(`${API_BASE_URL}/advisor/students`).then(response => response.data);
  
  // For development, return mock data
  return Promise.resolve(mockStudents);
};

export const getManualCheckRequests = async (): Promise<ManualCheckRequest[]> => {
  // return axios.get(`${API_BASE_URL}/advisor/manual-check-requests`).then(response => response.data);
  return Promise.resolve(mockManualCheckRequests);
};

export const updateManualCheckRequest = async (id: number, status: ManualCheckRequest['status']): Promise<ManualCheckRequest> => {
  // return axios.patch(`${API_BASE_URL}/advisor/manual-check-requests/${id}`, { status }).then(response => response.data);
  
  const request = mockManualCheckRequests.find(req => req.id === id);
  if (!request) {
    return Promise.reject(new Error('Request not found'));
  }
  
  request.status = status;
  return Promise.resolve({...request});
};

export const getNotifications = async (): Promise<Notification[]> => {
  // return axios.get(`${API_BASE_URL}/advisor/notifications`).then(response => response.data);
  return Promise.resolve(mockNotifications);
};

export const markNotificationAsRead = async (id: number): Promise<void> => {
  // return axios.patch(`${API_BASE_URL}/advisor/notifications/${id}`, { read: true }).then(() => {});
  
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
  return Promise.resolve();
};

export const getUpcomingDeadlines = async (): Promise<UpcomingDeadline[]> => {
  // return axios.get(`${API_BASE_URL}/advisor/deadlines`).then(response => response.data);
  return Promise.resolve(mockUpcomingDeadlines);
};

export const getAdvisorStatistics = async (): Promise<AdvisorStatistics> => {
  // return axios.get(`${API_BASE_URL}/advisor/statistics`).then(response => response.data);
  
  // Calculate stats from mock data
  return Promise.resolve({
    totalStudents: mockStudents.length,
    pendingGraduations: mockStudents.filter(s => s.gpa >= 2.0).length,
    manualCheckRequests: mockManualCheckRequests.filter(r => r.status === 'pending').length
  });
};

export const getStudentDetails = async (studentId: string): Promise<Student> => {
  // return axios.get(`${API_BASE_URL}/advisor/students/${studentId}`).then(response => response.data);
  
  const student = mockStudents.find(s => s.studentId === studentId);
  if (!student) {
    return Promise.reject(new Error('Student not found'));
  }
  
  return Promise.resolve({...student});
};

export const getPetitionTypes = async (): Promise<PetitionType[]> => {
  // return axios.get(`${API_BASE_URL}/advisor/petition-types`).then(response => response.data);
  return Promise.resolve(mockPetitionTypes);
};

export const createPetition = async (petition: Omit<Petition, 'id'>): Promise<Petition> => {
  // return axios.post(`${API_BASE_URL}/advisor/petitions`, petition).then(response => response.data);
  
  const newPetition: Petition = {
    ...petition,
    id: mockPetitions.length + 1
  };
  
  mockPetitions.push(newPetition);
  return Promise.resolve(newPetition);
};

export const getPetitions = async (): Promise<Petition[]> => {
  // return axios.get(`${API_BASE_URL}/advisor/petitions`).then(response => response.data);
  return Promise.resolve(mockPetitions);
};
