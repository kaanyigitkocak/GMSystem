// Register process stages
export enum RegisterStage {
  EMAIL_VERIFICATION = 0,
  CODE_VERIFICATION = 1,
  USER_TYPE_SELECTION = 2,
  REGISTRATION_FORM = 3,
  COMPLETE = 4,
}

// User types
export enum UserType {
  STUDENT = "student",
  ADMIN = "admin",
  ADVISOR = "advisor",
  SECRETARY = "secretary",
  DEANS_OFFICE = "deans_office",
  STUDENT_AFFAIRS = "student_affairs",
}

// Faculty options
export const faculties = [
  { value: "science", label: "Faculty of Science" },
  { value: "engineering", label: "Faculty of Engineering" },
  { value: "architecture", label: "Faculty of Architecture" },
];

// Department options - organized by faculty
export const departments = [
  // Faculty of Science
  { value: "physics", label: "Physics", faculty: "science" },
  { value: "photonics", label: "Photonics", faculty: "science" },
  { value: "chemistry", label: "Chemistry", faculty: "science" },
  { value: "mathematics", label: "Mathematics", faculty: "science" },
  {
    value: "molecular-biology",
    label: "Molecular Biology and Genetics",
    faculty: "science",
  },

  // Faculty of Engineering
  {
    value: "computer-engineering",
    label: "Computer Engineering",
    faculty: "engineering",
  },
  { value: "bioengineering", label: "Bioengineering", faculty: "engineering" },
  {
    value: "environmental-engineering",
    label: "Environmental Engineering",
    faculty: "engineering",
  },
  {
    value: "energy-systems",
    label: "Energy Systems Engineering",
    faculty: "engineering",
  },
  {
    value: "electronics-communication",
    label: "Electronics and Communication Engineering",
    faculty: "engineering",
  },
  {
    value: "food-engineering",
    label: "Food Engineering",
    faculty: "engineering",
  },
  {
    value: "civil-engineering",
    label: "Civil Engineering",
    faculty: "engineering",
  },
  {
    value: "chemical-engineering",
    label: "Chemical Engineering",
    faculty: "engineering",
  },
  {
    value: "mechanical-engineering",
    label: "Mechanical Engineering",
    faculty: "engineering",
  },
  {
    value: "materials-engineering",
    label: "Materials Science and Engineering",
    faculty: "engineering",
  },

  // Faculty of Architecture
  {
    value: "industrial-design",
    label: "Industrial Design",
    faculty: "architecture",
  },
  { value: "architecture", label: "Architecture", faculty: "architecture" },
  {
    value: "city-planning",
    label: "Urban and Regional Planning",
    faculty: "architecture",
  },
];

// Email validation function
export const validateEmail = (email: string): boolean => {
  if (!email.trim()) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
