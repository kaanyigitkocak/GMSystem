import type { StudentTranscript } from "../types";

// Mock data generator for student transcripts
export const generateMockTranscript = (
  studentId: string,
  studentName: string,
  department: string,
  _faculty: string,
  gpa: number,
  credits: number
): StudentTranscript => {
  // Generate mock courses based on department and GPA
  const generateCourses = () => {
    const mandatoryCourses = [
      {
        code: "MATH101",
        name: "Calculus I",
        credit: 4,
        type: "Mandatory" as const,
      },
      {
        code: "MATH102",
        name: "Calculus II",
        credit: 4,
        type: "Mandatory" as const,
      },
      {
        code: "PHYS101",
        name: "Physics I",
        credit: 4,
        type: "Mandatory" as const,
      },
      {
        code: "PHYS102",
        name: "Physics II",
        credit: 4,
        type: "Mandatory" as const,
      },
      {
        code: "CHEM101",
        name: "General Chemistry",
        credit: 3,
        type: "Mandatory" as const,
      },
      {
        code: "ENG101",
        name: "English I",
        credit: 3,
        type: "Mandatory" as const,
      },
      {
        code: "ENG102",
        name: "English II",
        credit: 3,
        type: "Mandatory" as const,
      },
    ];

    const technicalElectives = [
      {
        code: "CS201",
        name: "Data Structures",
        credit: 3,
        type: "Technical Elective" as const,
      },
      {
        code: "CS301",
        name: "Algorithms",
        credit: 3,
        type: "Technical Elective" as const,
      },
      {
        code: "CS401",
        name: "Machine Learning",
        credit: 3,
        type: "Technical Elective" as const,
      },
      {
        code: "EE201",
        name: "Digital Circuits",
        credit: 3,
        type: "Technical Elective" as const,
      },
      {
        code: "EE301",
        name: "Signal Processing",
        credit: 3,
        type: "Technical Elective" as const,
      },
    ];

    const nonTechnicalElectives = [
      {
        code: "HIST101",
        name: "History of Science",
        credit: 2,
        type: "Non-Technical Elective" as const,
      },
      {
        code: "PHIL101",
        name: "Philosophy of Science",
        credit: 2,
        type: "Non-Technical Elective" as const,
      },
      {
        code: "SOC101",
        name: "Sociology",
        credit: 2,
        type: "Non-Technical Elective" as const,
      },
      {
        code: "ECON101",
        name: "Economics",
        credit: 3,
        type: "Non-Technical Elective" as const,
      },
    ];

    const allCourses = [
      ...mandatoryCourses,
      ...technicalElectives,
      ...nonTechnicalElectives,
    ];

    // Generate grades based on GPA
    const generateGradeForCourse = (studentGpa: number): string => {
      let randomIndex;
      // GPA\'ya göre not olasılıklarını ayarla
      if (studentGpa >= 3.5) {
        // Yüksek GPA: AA, BA, BB, CB olasılığı daha yüksek
        const highGpaGrades = ["AA", "BA", "BB", "CB", "AA", "BA", "BB"]; // AA, BA, BB daha sık
        randomIndex = Math.floor(Math.random() * highGpaGrades.length);
        return highGpaGrades[randomIndex];
      } else if (studentGpa >= 2.8) {
        // Orta-Yüksek GPA: BA, BB, CB, CC
        const midHighGpaGrades = ["BA", "BB", "CB", "CC", "BA", "BB"];
        randomIndex = Math.floor(Math.random() * midHighGpaGrades.length);
        return midHighGpaGrades[randomIndex];
      } else if (studentGpa >= 2.0) {
        // Orta GPA: BB, CB, CC, DC, DD
        const midGpaGrades = ["BB", "CB", "CC", "DC", "DD", "CB", "CC"];
        randomIndex = Math.floor(Math.random() * midGpaGrades.length);
        return midGpaGrades[randomIndex];
      } else if (studentGpa >= 1.5) {
        // Düşük-Orta GPA: CC, DC, DD, FD
        const lowMidGpaGrades = ["CC", "DC", "DD", "FD", "DC", "DD"];
        randomIndex = Math.floor(Math.random() * lowMidGpaGrades.length);
        return lowMidGpaGrades[randomIndex];
      } else {
        // Düşük GPA: DD, FD, FF
        const lowGpaGrades = ["DD", "FD", "FF", "FD", "FF", "FF"];
        randomIndex = Math.floor(Math.random() * lowGpaGrades.length);
        return lowGpaGrades[randomIndex];
      }
    };

    const generateSemester = (index: number) => {
      const year = Math.floor(index / 6) + 1;
      const sem = (index % 2) + 1;
      return `${2020 + year - 1}-${2020 + year} Fall/Spring ${sem}`;
    };

    return allCourses.map((course, index) => ({
      courseCode: course.code,
      courseName: course.name,
      credit: course.credit,
      grade: generateGradeForCourse(gpa),
      semester: generateSemester(index),
      courseType: course.type,
    }));
  };

  const courses = generateCourses();

  // Calculate graduation requirements
  const mandatoryCredits = courses
    .filter((c) => c.courseType === "Mandatory")
    .reduce((sum, c) => sum + c.credit, 0);

  const technicalElectiveCredits = courses
    .filter((c) => c.courseType === "Technical Elective")
    .reduce((sum, c) => sum + c.credit, 0);

  const nonTechnicalElectiveCredits = courses
    .filter((c) => c.courseType === "Non-Technical Elective")
    .reduce((sum, c) => sum + c.credit, 0);

  const graduationRequirements = {
    mandatoryCredits: { required: 30, completed: mandatoryCredits },
    technicalElectives: { required: 15, completed: technicalElectiveCredits },
    nonTechnicalElectives: {
      required: 9,
      completed: nonTechnicalElectiveCredits,
    },
    totalRequired: 140,
  };

  // Determine graduation eligibility
  const meetsRequirements =
    mandatoryCredits >= graduationRequirements.mandatoryCredits.required &&
    technicalElectiveCredits >=
      graduationRequirements.technicalElectives.required &&
    nonTechnicalElectiveCredits >=
      graduationRequirements.nonTechnicalElectives.required &&
    credits >= graduationRequirements.totalRequired &&
    gpa >= 2.0;

  return {
    studentId,
    studentName,
    department,
    faculty: "Engineering",
    gpa,
    totalCredits: credits,
    graduationEligible: meetsRequirements,
    courses,
    graduationRequirements,
  };
};

// Get transcript for a specific student
export const getStudentTranscript = async (
  studentId: string,
  studentName?: string,
  department?: string,
  faculty?: string,
  gpa?: number,
  credits?: number
): Promise<StudentTranscript> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Use provided data or mock defaults
  return generateMockTranscript(
    studentId,
    studentName || "John Doe",
    department || "Computer Engineering",
    faculty || "Engineering",
    gpa || 3.5,
    credits || 145
  );
};
