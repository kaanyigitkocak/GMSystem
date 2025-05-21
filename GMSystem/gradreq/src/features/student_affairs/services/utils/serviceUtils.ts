import { getServiceConfig as getCommonServiceConfig } from "../../../../features/common/utils/serviceUtils";
import type { CourseInfo } from "../types";

// Re-export common service config
export const getServiceConfig = getCommonServiceConfig;

// Grade point mapping for GPA calculation
export const GRADE_POINTS: Record<string, number> = {
  AA: 4.0,
  A: 4.0,
  BA: 3.5,
  BB: 3.0,
  B: 3.0,
  CB: 2.5,
  C: 2.0,
  DC: 1.5,
  DD: 1.0,
  D: 1.0,
  FF: 0.0,
  F: 0.0,
};

// Department code mapping
export const DEPARTMENT_MAP: Record<string, string> = {
  CENG: "Computer Engineering",
  CSE: "Computer Engineering",
  EE: "Electrical Engineering",
  ME: "Mechanical Engineering",
  CE: "Civil Engineering",
  MATH: "Mathematics",
  PHYS: "Physics",
  CHEM: "Chemistry",
};

// Calculate GPA from grades
export const calculateGPA = (
  grades: string[]
): { gpa: number; credits: number } => {
  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach((grade) => {
    // Parse only valid grades
    if (GRADE_POINTS[grade]) {
      const points = GRADE_POINTS[grade];
      totalPoints += points;
      totalCredits += 1; // Assuming each grade represents one credit for simplicity
    }
  });

  // Calculate GPA
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return { gpa, credits: totalCredits };
};

// Determine department from course codes
export const determineDepartment = (courses: CourseInfo[]): string => {
  // Extract department codes (usually first 2-4 letters of course code)
  const departmentCodes = courses.map((course) => {
    const match = course.courseCode.match(/^[A-Z]+/);
    return match ? match[0] : "";
  });

  // Find the most common department code
  const codeCounts: Record<string, number> = {};
  let mostCommonCode = "";
  let maxCount = 0;

  departmentCodes.forEach((code) => {
    if (!code) return;

    codeCounts[code] = (codeCounts[code] || 0) + 1;

    if (codeCounts[code] > maxCount) {
      maxCount = codeCounts[code];
      mostCommonCode = code;
    }
  });

  // Map to department name, or return "Unknown Department" if not found
  return DEPARTMENT_MAP[mostCommonCode] || "Unknown Department";
};
