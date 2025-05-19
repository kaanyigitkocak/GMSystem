
// Types
export interface StudentRanking {
  id: string;
  rank: number;
  studentId: string;
  name: string;
  department: string;
  faculty: string;
  gpa: number;
  credits: number;
  duplicateRecords?: boolean;
  graduationEligible: boolean;
}

export interface RankingMetadata {
  totalStudents: number;
  eligibleStudents: number;
  hasDuplicates: boolean;
  mixedGraduationStatus: boolean;
  lastUpdated: Date;
}

export type FileStatus = 'valid' | 'invalid' | 'pending';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  department: string;
  uploaded: Date;
  status: FileStatus;
  issues?: string[];
}

export interface ValidationSummary {
  validFiles: number;
  invalidFiles: number;
  totalStudents: number;
  eligibleStudents: number;
  duplicateStudents: boolean;
  mixedGraduationStatus: boolean;
}

export interface FileValidationResult {
  isValid: boolean;
  invalidReason?: string;
  studentCount: number;
  eligibleStudentCount: number;
  hasDuplicates: boolean;
  mixedGraduationStatus: boolean;
}

// Sample data for student rankings
export const sampleStudentRankings: StudentRanking[] = [
  { id: '1', rank: 1, studentId: '220202101', name: 'Ali Yılmaz', department: 'Computer Engineering', faculty: 'Engineering', gpa: 3.98, credits: 144, duplicateRecords: false, graduationEligible: true },
  { id: '2', rank: 2, studentId: '220202056', name: 'Ayşe Kaya', department: 'Computer Engineering', faculty: 'Engineering', gpa: 3.97, credits: 148, duplicateRecords: false, graduationEligible: true },
  { id: '3', rank: 3, studentId: '210201089', name: 'Mehmet Demir', department: 'Electrical Engineering', faculty: 'Engineering', gpa: 3.95, credits: 152, duplicateRecords: true, graduationEligible: true },
  { id: '4', rank: 4, studentId: '210305062', name: 'Zeynep Yıldız', department: 'Physics', faculty: 'Science', gpa: 3.93, credits: 138, duplicateRecords: false, graduationEligible: true },
  { id: '5', rank: 5, studentId: '220401023', name: 'Mustafa Şahin', department: 'Architecture', faculty: 'Architecture', gpa: 3.91, credits: 160, duplicateRecords: false, graduationEligible: true },
  { id: '6', rank: 6, studentId: '210301045', name: 'Fatma Çelik', department: 'Chemistry', faculty: 'Science', gpa: 3.89, credits: 136, duplicateRecords: false, graduationEligible: true },
  { id: '7', rank: 7, studentId: '220205078', name: 'Ahmet Aksoy', department: 'Mechanical Engineering', faculty: 'Engineering', gpa: 3.88, credits: 142, duplicateRecords: false, graduationEligible: true },
  { id: '8', rank: 8, studentId: '210208091', name: 'Sema Yılmaz', department: 'Civil Engineering', faculty: 'Engineering', gpa: 3.86, credits: 146, duplicateRecords: true, graduationEligible: true },
  { id: '9', rank: 9, studentId: '220301012', name: 'Emre Koç', department: 'Mathematics', faculty: 'Science', gpa: 3.85, credits: 134, duplicateRecords: false, graduationEligible: true },
  { id: '10', rank: 10, studentId: '210204067', name: 'Elif Şahin', department: 'Industrial Design', faculty: 'Architecture', gpa: 3.84, credits: 150, duplicateRecords: false, graduationEligible: true },
  { id: '11', rank: 11, studentId: '220203045', name: 'Burak Demir', department: 'Bioengineering', faculty: 'Engineering', gpa: 3.83, credits: 140, duplicateRecords: false, graduationEligible: true },
  { id: '12', rank: 12, studentId: '210307034', name: 'Gizem Yılmaz', department: 'Molecular Biology', faculty: 'Science', gpa: 3.82, credits: 138, duplicateRecords: false, graduationEligible: true },
  { id: '13', rank: 13, studentId: '220207089', name: 'Oğuz Kaya', department: 'Materials Engineering', faculty: 'Engineering', gpa: 3.80, credits: 144, duplicateRecords: false, graduationEligible: true },
  { id: '14', rank: 14, studentId: '210401032', name: 'Ceren Arslan', department: 'Urban Planning', faculty: 'Architecture', gpa: 3.79, credits: 156, duplicateRecords: false, graduationEligible: true },
  { id: '15', rank: 15, studentId: '220302056', name: 'Onur Öztürk', department: 'Physics', faculty: 'Science', gpa: 3.78, credits: 132, duplicateRecords: false, graduationEligible: true },
];

// Sample metadata for ranking
export const mockRankingMetadata: RankingMetadata = {
  totalStudents: 42,
  eligibleStudents: 15,
  hasDuplicates: true,
  mixedGraduationStatus: true,
  lastUpdated: new Date('2025-05-15T14:30:00')
};

// Mock API functions to simulate backend calls

/**
 * Get faculty-wide student rankings
 */
export const getFacultyRankings = async (): Promise<{
  rankings: StudentRanking[];
  metadata: RankingMetadata;
}> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  return {
    rankings: sampleStudentRankings,
    metadata: mockRankingMetadata
  };
};

/**
 * Process uploaded department ranking files
 */
export const processDepartmentFiles = async (files: File[]): Promise<FileValidationResult> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Simulate random validation results for demo purposes
  const randomValue = Math.random();
  const fileCount = files.length; // Use files to avoid unused parameter warning
  
  return {
    isValid: randomValue > 0.3,
    invalidReason: randomValue <= 0.3 ? 'Invalid file format or missing required columns' : undefined,
    studentCount: Math.floor(Math.random() * 100) + 50 + fileCount,
    eligibleStudentCount: Math.floor(Math.random() * 50) + 20,
    hasDuplicates: Math.random() > 0.5,
    mixedGraduationStatus: Math.random() > 0.4
  };
};

/**
 * Process CSV files and extract UploadedFile objects
 */
export const processCSVFiles = (selectedFiles: File[]): UploadedFile[] => {
  // Map files to our data structure with validation simulation
  const processedFiles = selectedFiles.map(file => {
    // Extract department name from filename (assuming format like "department_ranking.csv")
    const departmentName = file.name.split('_')[0] || 'Unknown';
    
    // Simulate random validation to demonstrate functionality
    // In a real app, this would be based on actual file content validation
    const randomValue = Math.random();
    let fileStatus: FileStatus = 'valid';
    let issues: string[] = [];
    
    if (randomValue < 0.3) {
      fileStatus = 'invalid';
      issues = ['Invalid file format', 'Missing required columns'];
    }
    
    return {
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      department: departmentName.charAt(0).toUpperCase() + departmentName.slice(1),
      uploaded: new Date(),
      status: fileStatus,
      issues
    };
  });
  
  return processedFiles;
};

/**
 * Export faculty rankings to CSV
 */
export const exportFacultyRankingsToCSV = async (): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Always succeed in this mock
  return true;
};

/**
 * Generate a validation summary from uploaded files
 */
export const generateValidationSummary = (files: UploadedFile[]): ValidationSummary => {
  const validFiles = files.filter(file => file.status === 'valid').length;
  const invalidFiles = files.filter(file => file.status === 'invalid').length;
  
  return {
    validFiles,
    invalidFiles,
    totalStudents: Math.floor(Math.random() * 100) + 50,
    eligibleStudents: Math.floor(Math.random() * 50) + 20,
    duplicateStudents: Math.random() > 0.5,
    mixedGraduationStatus: Math.random() > 0.4
  };
};