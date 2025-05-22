import type {
  TranscriptData,
  StudentConflict,
  TranscriptEntryDetails,
} from "../services/types";

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
