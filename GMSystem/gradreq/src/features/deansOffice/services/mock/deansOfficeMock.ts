import type {
  StudentRanking,
  RankingMetadata,
  FileStatus,
  UploadedFile,
  ValidationSummary,
  FileValidationResult,
} from "../types";

// Sample data for student rankings
const sampleStudentRankings: StudentRanking[] = [
  {
    id: "1",
    rank: 1,
    studentId: "20201001",
    name: "Jane Smith",
    department: "Computer Engineering",
    faculty: "Faculty of Engineering",
    gpa: 3.95,
    credits: 149,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "2",
    rank: 2,
    studentId: "20202001",
    name: "Lisa Wang",
    department: "Electronics and Communication Engineering",
    faculty: "Faculty of Engineering",
    gpa: 3.92,
    credits: 146,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "3",
    rank: 3,
    studentId: "20202002",
    name: "Tom Harris",
    department: "Electronics and Communication Engineering",
    faculty: "Faculty of Engineering",
    gpa: 3.85,
    credits: 144,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "4",
    rank: 4,
    studentId: "20201002",
    name: "John Doe",
    department: "Computer Engineering",
    faculty: "Faculty of Engineering",
    gpa: 3.75,
    credits: 140,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "5",
    rank: 5,
    studentId: "20201003",
    name: "Alex Brown",
    department: "Computer Engineering",
    faculty: "Faculty of Engineering",
    gpa: 3.7,
    credits: 130,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "6",
    rank: 6,
    studentId: "20201004",
    name: "Sarah Johnson",
    department: "Computer Engineering",
    faculty: "Faculty of Engineering",
    gpa: 3.65,
    credits: 140,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "7",
    rank: 7,
    studentId: "20201005",
    name: "David Lee",
    department: "Computer Engineering",
    faculty: "Faculty of Engineering",
    gpa: 3.6,
    credits: 148,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "8",
    rank: 8,
    studentId: "20203001",
    name: "Emily Davis",
    department: "Physics",
    faculty: "Faculty of Science",
    gpa: 3.45,
    credits: 138,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "9",
    rank: 9,
    studentId: "20203002",
    name: "Mark Thompson",
    department: "Physics",
    faculty: "Faculty of Science",
    gpa: 3.4,
    credits: 138,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "10",
    rank: 10,
    studentId: "20202003",
    name: "Robert Johnson",
    department: "Electronics and Communication Engineering",
    faculty: "Faculty of Engineering",
    gpa: 2.85,
    credits: 148,
    duplicateRecords: false,
    graduationEligible: true,
  },
  {
    id: "11",
    rank: 11,
    studentId: "20201002",
    name: "John Doe",
    department: "Electronics and Communication Engineering",
    faculty: "Faculty of Engineering",
    gpa: 3.8,
    credits: 140,
    duplicateRecords: false,
    graduationEligible: true,
  },
];

// Sample metadata for ranking
const mockRankingMetadata: RankingMetadata = {
  totalStudents: 42,
  eligibleStudents: 15,
  hasDuplicates: true,
  mixedGraduationStatus: true,
  lastUpdated: new Date("2025-05-15T14:30:00"),
};

/**
 * Get faculty-wide student rankings
 */
export const getFacultyRankingsMock = async (): Promise<{
  rankings: StudentRanking[];
  metadata: RankingMetadata;
}> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        rankings: sampleStudentRankings,
        metadata: mockRankingMetadata,
      });
    }, 800);
  });
};

/**
 * Process uploaded department ranking files
 */
export const processDepartmentFilesMock = async (
  files: File[]
): Promise<FileValidationResult> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate random validation results for demo purposes
      const randomValue = Math.random();
      const fileCount = files.length; // Use files to avoid unused parameter warning

      resolve({
        isValid: randomValue > 0.3,
        invalidReason:
          randomValue <= 0.3
            ? "Invalid file format or missing required columns"
            : undefined,
        studentCount: Math.floor(Math.random() * 100) + 50 + fileCount,
        eligibleStudentCount: Math.floor(Math.random() * 50) + 20,
        hasDuplicates: Math.random() > 0.5,
        mixedGraduationStatus: Math.random() > 0.4,
      });
    }, 1500);
  });
};

/**
 * Process CSV files and extract UploadedFile objects
 */
export const processCSVFilesMock = (selectedFiles: File[]): UploadedFile[] => {
  // Map files to our data structure with validation simulation
  const processedFiles = selectedFiles.map((file) => {
    // Extract department name from filename (assuming format like "department_ranking.csv")
    const departmentName = file.name.split("_")[0] || "Unknown";

    // Simulate random validation to demonstrate functionality
    // In a real app, this would be based on actual file content validation
    const randomValue = Math.random();
    let fileStatus: FileStatus = "valid";
    let issues: string[] = [];

    if (randomValue < 0.3) {
      fileStatus = "invalid";
      issues = ["Invalid file format", "Missing required columns"];
    }

    return {
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      department:
        departmentName.charAt(0).toUpperCase() + departmentName.slice(1),
      uploaded: new Date(),
      status: fileStatus,
      issues,
    };
  });

  return processedFiles;
};

/**
 * Export faculty rankings to CSV
 */
export const exportFacultyRankingsToCSVMock = async (): Promise<boolean> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Always succeed in this mock
      resolve(true);
    }, 500);
  });
};

/**
 * Generate a validation summary from uploaded files
 */
export const generateValidationSummaryMock = (
  files: UploadedFile[]
): ValidationSummary => {
  const validFiles = files.filter((file) => file.status === "valid").length;
  const invalidFiles = files.filter((file) => file.status === "invalid").length;

  return {
    validFiles,
    invalidFiles,
    totalStudents: Math.floor(Math.random() * 100) + 50,
    eligibleStudents: Math.floor(Math.random() * 50) + 20,
    duplicateStudents: Math.random() > 0.5,
    mixedGraduationStatus: Math.random() > 0.4,
  };
};
