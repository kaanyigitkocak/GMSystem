import type { Student } from "./types";

// Student Affairs Dashboard Statistics interface
export interface StudentAffairsDashboardStats {
  totalStudents: number;
  eligibleStudents: number;
  notEligibleStudents: number;
  pendingStudents: number;
  byDepartment: {
    [department: string]: {
      total: number;
      eligible: number;
      notEligible: number;
      pending: number;
    };
  };
  byFaculty: {
    [faculty: string]: {
      total: number;
      eligible: number;
      notEligible: number;
      pending: number;
    };
  };
}

// Get students with their eligibility details
export const getStudentsWithEligibility = async (): Promise<Student[]> => {
  try {
    // Use the main service to get students which already includes eligibility data
    const { getStudents } = await import('./index');
    return await getStudents();
  } catch (error) {
    console.error("Error fetching students with eligibility:", error);
    throw new Error("Failed to fetch students with eligibility data");
  }
};

// Calculate dashboard statistics
export const calculateDashboardStats = (
  students: Student[]
): StudentAffairsDashboardStats => {
  const stats: StudentAffairsDashboardStats = {
    totalStudents: students.length,
    eligibleStudents: 0,
    notEligibleStudents: 0,
    pendingStudents: 0,
    byDepartment: {},
    byFaculty: {},
  };

  students.forEach((student) => {
    // Count by graduation status
    switch (student.graduationStatus) {
      case "Eligible":
        stats.eligibleStudents++;
        break;
      case "Not Eligible":
        stats.notEligibleStudents++;
        break;
      default:
        stats.pendingStudents++;
        break;
    }

    // Count by department
    if (!stats.byDepartment[student.department]) {
      stats.byDepartment[student.department] = {
        total: 0,
        eligible: 0,
        notEligible: 0,
        pending: 0,
      };
    }
    stats.byDepartment[student.department].total++;
    if (student.graduationStatus === "Eligible") {
      stats.byDepartment[student.department].eligible++;
    } else if (student.graduationStatus === "Not Eligible") {
      stats.byDepartment[student.department].notEligible++;
    } else {
      stats.byDepartment[student.department].pending++;
    }

    // Count by faculty
    if (!stats.byFaculty[student.faculty]) {
      stats.byFaculty[student.faculty] = {
        total: 0,
        eligible: 0,
        notEligible: 0,
        pending: 0,
      };
    }
    stats.byFaculty[student.faculty].total++;
    if (student.graduationStatus === "Eligible") {
      stats.byFaculty[student.faculty].eligible++;
    } else if (student.graduationStatus === "Not Eligible") {
      stats.byFaculty[student.faculty].notEligible++;
    } else {
      stats.byFaculty[student.faculty].pending++;
    }
  });

  return stats;
};
