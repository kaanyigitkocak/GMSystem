// Faculties and their departments
export const faculties = [
  {
    name: 'Faculty of Science',
    departments: [
      'Physics',
      'Photonics',
      'Chemistry',
      'Mathematics',
      'Molecular Biology and Genetics',
    ],
  },
  {
    name: 'Faculty of Engineering',
    departments: [
      'Computer Engineering',
      'Bioengineering',
      'Environmental Engineering',
      'Energy Systems Engineering',
      'Electrical-Electronics Engineering',
      'Food Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Mechanical Engineering',
      'Materials Science and Engineering',
    ],
  },
  {
    name: 'Faculty of Architecture',
    departments: [
      'Industrial Design',
      'Architecture',
      'City and Regional Planning',
    ],
  },
];

export const facultyNames = faculties.map(f => f.name);
export const allDepartments = faculties.flatMap(f => f.departments);
export const departmentToFaculty: Record<string, string> = Object.fromEntries(
  faculties.flatMap(f => f.departments.map(d => [d, f.name]))
); 