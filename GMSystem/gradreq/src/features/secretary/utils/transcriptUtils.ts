import type {
  TranscriptData,
  StudentConflict,
  TranscriptEntryDetails,
} from "../services/types";

// Grade to GPA mapping for Turkish system
const GRADE_GPA_MAPPING: Record<string, number> = {
  AA: 4.0,
  BA: 3.5,
  BB: 3.0,
  CB: 2.5,
  CC: 2.0,
  DC: 1.5,
  DD: 1.0,
  FF: 0.0,
};

// Course type classification
export const COURSE_TYPES = {
  MANDATORY: "Mandatory",
  TECHNICAL_ELECTIVE: "Technical Elective",
  NON_TECHNICAL_ELECTIVE: "Non-Technical Elective",
} as const;

// Parsed course data interface
export interface ParsedCourse {
  courseCode: string;
  courseName: string;
  grade: string;
  credits: number;
  semester: string;
  courseType: string;
  gpaPoints: number;
}

// Parsed student transcript interface
export interface ParsedStudentTranscript {
  studentId: string;
  studentName: string;
  department: string;
  courses: ParsedCourse[];
  calculatedGpa: number;
  totalCredits: number;
  totalEcts: number;
  mandatoryCourses: ParsedCourse[];
  technicalElectives: ParsedCourse[];
  nonTechnicalElectives: ParsedCourse[];
  // Graduation eligibility analysis
  analysis: {
    hasAllMandatoryCourses: boolean;
    hasMinimumTechnicalElectives: boolean;
    hasMinimumNonTechnicalElectives: boolean;
    hasMinimumCredits: boolean;
    hasMinimumGpa: boolean;
    isEligibleForGraduation: boolean;
    missingRequirements: string[];
  };
}

/**
 * Validates file type for transcript uploads
 */
export const validateTranscriptFile = (
  file: File
): { isValid: boolean; error?: string } => {
  const fileType = file.name.split(".").pop()?.toLowerCase();

  if (fileType !== "pdf" && fileType !== "csv") {
    return {
      isValid: false,
      error: "Please upload a PDF or CSV file.",
    };
  }

  return { isValid: true };
};

/**
 * Calculates GPA from course grades and credits
 */
export const calculateGPA = (courses: ParsedCourse[]): number => {
  let totalGradePoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    if (course.grade !== "FF" && course.credits > 0) {
      // Only count passed courses with credits
      totalGradePoints += course.gpaPoints * course.credits;
      totalCredits += course.credits;
    }
  });

  return totalCredits > 0
    ? Number((totalGradePoints / totalCredits).toFixed(2))
    : 0;
};

/**
 * Analyzes graduation eligibility based on Computer Engineering requirements
 */
export const analyzeGraduationEligibility = (
  transcript: ParsedStudentTranscript
): ParsedStudentTranscript["analysis"] => {
  const {
    mandatoryCourses,
    technicalElectives,
    nonTechnicalElectives,
    calculatedGpa,
    totalCredits,
  } = transcript;

  // Required courses list (simplified for demo)
  const requiredMandatoryCourses = [
    "CENG 415",
    "CENG 416",
    "CENG 411",
    "CENG 322",
    "CENG 318",
    "CENG 316",
    "CENG 315",
    "CENG 312",
    "CENG 311",
    "CENG 222",
    "CENG 218",
    "CENG 216",
    "CENG 214",
    "CENG 213",
    "CENG 212",
    "CENG 211",
    "CENG 115",
    "CENG 113",
    "CENG 112",
    "CENG 111",
    "MATH 255",
    "MATH 144",
    "MATH 142",
    "MATH 141",
    "PHYS 122",
    "PHYS 121",
    "ENG 102",
    "ENG 101",
    "ECON 106",
    "ECON 205",
    "HIST 201",
    "HIST 202",
    "TURK 201",
    "TURK 202",
    "GCC 101",
    "CENG 246",
    "CENG 400",
  ];

  const missingRequirements: string[] = [];

  // Check mandatory courses
  const completedMandatoryCodes = mandatoryCourses
    .filter((c) => c.grade !== "FF")
    .map((c) => c.courseCode);
  const missingMandatoryCourses = requiredMandatoryCourses.filter(
    (code) => !completedMandatoryCodes.includes(code)
  );

  const hasAllMandatoryCourses = missingMandatoryCourses.length === 0;
  if (!hasAllMandatoryCourses) {
    missingRequirements.push(
      `Missing mandatory courses: ${missingMandatoryCourses.join(", ")}`
    );
  }

  // Check technical electives (minimum 6 courses, 18 ECTS)
  const passedTechnicalElectives = technicalElectives.filter(
    (c) => c.grade !== "FF"
  );
  const hasMinimumTechnicalElectives = passedTechnicalElectives.length >= 6;
  if (!hasMinimumTechnicalElectives) {
    missingRequirements.push(
      `Need ${
        6 - passedTechnicalElectives.length
      } more technical elective courses`
    );
  }

  // Check non-technical electives (minimum 3 courses, 9 ECTS)
  const passedNonTechnicalElectives = nonTechnicalElectives.filter(
    (c) => c.grade !== "FF"
  );
  const hasMinimumNonTechnicalElectives =
    passedNonTechnicalElectives.length >= 3;
  if (!hasMinimumNonTechnicalElectives) {
    missingRequirements.push(
      `Need ${
        3 - passedNonTechnicalElectives.length
      } more non-technical elective courses`
    );
  }

  // Check minimum credits (240 ECTS)
  const hasMinimumCredits = totalCredits >= 240;
  if (!hasMinimumCredits) {
    missingRequirements.push(`Need ${240 - totalCredits} more ECTS credits`);
  }

  // Check minimum GPA (2.0)
  const hasMinimumGpa = calculatedGpa >= 2.0;
  if (!hasMinimumGpa) {
    missingRequirements.push(
      `GPA must be at least 2.0 (current: ${calculatedGpa})`
    );
  }

  const isEligibleForGraduation =
    hasAllMandatoryCourses &&
    hasMinimumTechnicalElectives &&
    hasMinimumNonTechnicalElectives &&
    hasMinimumCredits &&
    hasMinimumGpa;

  return {
    hasAllMandatoryCourses,
    hasMinimumTechnicalElectives,
    hasMinimumNonTechnicalElectives,
    hasMinimumCredits,
    hasMinimumGpa,
    isEligibleForGraduation,
    missingRequirements,
  };
};

/**
 * Parses our CSV format and returns parsed transcript data
 * Expected format: Student ID,Student Name,Department,Course Code,Course Name,Grade,Credits,Semester,Course Type
 */
export const parseTranscriptCSV = (
  csvContent: string,
  fileName: string
): ParsedStudentTranscript => {
  const lines = csvContent.trim().split("\n");

  if (lines.length < 2) {
    throw new Error("CSV file is empty or has no data rows");
  }

  // Parse header
  const headers = lines[0].split(",").map((h) => h.trim());
  const requiredHeaders = [
    "Student ID",
    "Student Name",
    "Department",
    "Course Code",
    "Course Name",
    "Grade",
    "Credits",
    "Semester",
    "Course Type",
  ];

  const missingHeaders = requiredHeaders.filter(
    (header) => !headers.includes(header)
  );
  if (missingHeaders.length > 0) {
    throw new Error(
      `CSV file is missing required headers: ${missingHeaders.join(", ")}`
    );
  }

  // Parse data rows
  let studentId = "";
  let studentName = "";
  let department = "";
  const courses: ParsedCourse[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(",").map((v) => v.trim());
    if (values.length !== headers.length) {
      console.warn(`Skipping invalid line ${i + 1}: ${line}`);
      continue;
    }

    // Create record object
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = values[index];
    });

    // Extract student info (should be same for all rows)
    if (!studentId) {
      studentId = record["Student ID"];
      studentName = record["Student Name"];
      department = record["Department"];
    }

    // Validate grade and get GPA points
    const grade = record["Grade"].toUpperCase();
    const gpaPoints = GRADE_GPA_MAPPING[grade];
    if (gpaPoints === undefined) {
      console.warn(
        `Unknown grade '${grade}' on line ${i + 1}, skipping course`
      );
      continue;
    }

    // Parse course data
    const course: ParsedCourse = {
      courseCode: record["Course Code"],
      courseName: record["Course Name"],
      grade,
      credits: parseInt(record["Credits"]) || 0,
      semester: record["Semester"],
      courseType: record["Course Type"],
      gpaPoints,
    };

    courses.push(course);
  }

  if (!studentId || courses.length === 0) {
    throw new Error("No valid course data found in CSV file");
  }

  // Categorize courses
  const mandatoryCourses = courses.filter(
    (c) => c.courseType === COURSE_TYPES.MANDATORY
  );
  const technicalElectives = courses.filter(
    (c) => c.courseType === COURSE_TYPES.TECHNICAL_ELECTIVE
  );
  const nonTechnicalElectives = courses.filter(
    (c) => c.courseType === COURSE_TYPES.NON_TECHNICAL_ELECTIVE
  );

  // Calculate totals
  const calculatedGpa = calculateGPA(courses);
  const totalCredits = courses
    .filter((c) => c.grade !== "FF")
    .reduce((sum, c) => sum + c.credits, 0);
  const totalEcts = totalCredits; // Assuming ECTS = Credits for this system

  // Create parsed transcript
  const parsedTranscript: ParsedStudentTranscript = {
    studentId,
    studentName,
    department,
    courses,
    calculatedGpa,
    totalCredits,
    totalEcts,
    mandatoryCourses,
    technicalElectives,
    nonTechnicalElectives,
    analysis: {
      hasAllMandatoryCourses: false,
      hasMinimumTechnicalElectives: false,
      hasMinimumNonTechnicalElectives: false,
      hasMinimumCredits: false,
      hasMinimumGpa: false,
      isEligibleForGraduation: false,
      missingRequirements: [],
    },
  };

  // Analyze graduation eligibility
  parsedTranscript.analysis = analyzeGraduationEligibility(parsedTranscript);

  return parsedTranscript;
};

/**
 * Formats transcript data for display in UI
 * Specific to Turkish transcript format
 */
export const formatTranscriptMetaInfo = (
  transcript: TranscriptData
): string => {
  if (!transcript.metaInfo) return "";

  // Extract key information
  const agnoMatch = transcript.metaInfo.match(/AGNO:\s*([\d.]+)/);
  const dateMatch = transcript.metaInfo.match(/Kayıt Tarihi:\s*([^|]+)/);
  const coursesMatch = transcript.metaInfo.match(/Courses:\s*([^]*)$/);

  // Format for display
  let displayInfo = "";
  if (agnoMatch) displayInfo += `GPA: ${agnoMatch[1]} | `;
  if (dateMatch) displayInfo += `Reg. Date: ${dateMatch[1].trim()} | `;
  displayInfo += `${transcript.department}`;

  // Add course count if available
  if (coursesMatch) {
    const courseText = coursesMatch[1];
    const courseCount = (courseText.match(/CENG/g) || []).length;
    if (courseCount > 0) {
      displayInfo += ` | ${courseCount} courses`;
    }
  }

  return displayInfo;
};

/**
 * Parses CSV content and detects conflicts between student records
 * Returns both valid transcripts and conflicts
 */
export const parseCSVForConflicts = (
  csvContent: string,
  fileName: string
): {
  validTranscripts: TranscriptData[];
  conflicts: StudentConflict[];
} => {
  // Parse CSV content
  const lines = csvContent.split("\n");
  const headers = lines[0].split(",");

  // Validate headers
  const requiredHeaders = [
    "StudentID",
    "StudentName",
    "CourseCode",
    "CourseName",
    "Credit",
    "Grade",
    "Semester",
    "GPA",
    "Department",
  ];
  const missingHeaders = requiredHeaders.filter(
    (header) => !headers.includes(header)
  );

  if (missingHeaders.length > 0) {
    throw new Error(
      `CSV file is missing required headers: ${missingHeaders.join(", ")}`
    );
  }

  // Group records by student
  const studentRecordsMap: Record<
    string,
    Array<{
      studentId: string;
      studentName: string;
      department: string;
      gpa: number;
      courses: Array<{
        courseCode: string;
        courseName: string;
        credit: number;
        grade: string;
        semester: string;
      }>;
      rawData: any;
    }>
  > = {};

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(",");
    if (values.length !== headers.length) {
      console.warn(`Skipping invalid line ${i + 1}: ${line}`);
      continue;
    }

    // Create a record object from CSV line
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = values[index];
    });

    const studentId = record.StudentID;
    const studentName = record.StudentName;
    const department = record.Department;
    const gpa = parseFloat(record.GPA);

    const course = {
      courseCode: record.CourseCode,
      courseName: record.CourseName,
      credit: parseFloat(record.Credit),
      grade: record.Grade,
      semester: record.Semester,
    };

    // Check if we've seen this student before
    if (!studentRecordsMap[studentId]) {
      studentRecordsMap[studentId] = [];
    }

    // Check if we've seen this student with this GPA before
    let existingRecordIndex = studentRecordsMap[studentId].findIndex(
      (r) => Math.abs(r.gpa - gpa) < 0.001
    );

    if (existingRecordIndex >= 0) {
      // Add course to existing record
      studentRecordsMap[studentId][existingRecordIndex].courses.push(course);
    } else {
      // Create new record for this student with this GPA
      studentRecordsMap[studentId].push({
        studentId,
        studentName,
        department,
        gpa,
        courses: [course],
        rawData: { originalLine: i + 1 },
      });
    }
  }

  // Identify conflicts and valid transcripts
  const conflicts: StudentConflict[] = [];
  const validTranscripts: TranscriptData[] = [];

  Object.entries(studentRecordsMap).forEach(([studentId, records]) => {
    if (records.length > 1) {
      // This student has multiple records with different GPAs - it's a conflict
      conflicts.push({
        id: `conflict_${studentId}_${new Date().getTime()}`,
        studentId,
        studentName: records[0].studentName,
        department: records[0].department,
        fileName,
        conflictingEntries: records,
      });
    } else {
      // This student has only one record - it's valid
      validTranscripts.push({
        id: `transcript_${studentId}_${new Date().getTime()}`,
        studentId,
        studentName: records[0].studentName,
        department: records[0].department,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "pending",
        fileName,
        fileSize: csvContent.length,
      });
    }
  });

  return { validTranscripts, conflicts };
};

/**
 * Creates a confirmed transcript from conflict resolution
 */
export const createConfirmedTranscriptFromResolution = (
  chosenEntry: TranscriptEntryDetails,
  originalConflict: StudentConflict
): TranscriptData => {
  return {
    id: `resolved_${new Date().getTime()}`,
    studentId: chosenEntry.studentId,
    studentName: chosenEntry.studentName,
    department: chosenEntry.department,
    uploadDate: new Date().toISOString().split("T")[0],
    status: "pending",
    fileName: originalConflict.fileName || "",
    fileSize: 0,
  };
};
