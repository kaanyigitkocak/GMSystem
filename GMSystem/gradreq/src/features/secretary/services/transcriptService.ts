import type { StudentTranscript } from "../components/rankings/TranscriptDialog";

// Mock data generator for student transcripts
export const generateMockTranscript = (
  studentId: string,
  studentName: string,
  department: string,
  faculty: string,
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
    const generateGrade = () => {
      const baseGrade = gpa * 25; // Convert 4.0 scale to 100 scale approximately
      const variation = (Math.random() - 0.5) * 20; // ±10 points variation
      const grade = Math.max(40, Math.min(100, baseGrade + variation));
      return grade.toFixed(0);
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
      grade: generateGrade(),
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
