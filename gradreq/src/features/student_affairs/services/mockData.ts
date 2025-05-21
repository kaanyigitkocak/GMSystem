// Mock data for Student Affairs module

// Certificate types
export const certificateTypes = [
  {
    id: "1",
    name: "Graduation Certificate",
    description: "Official graduation certificate",
  },
  { id: "2", name: "Diploma", description: "Official diploma" },
  { id: "3", name: "Transcript", description: "Official transcript" },
  {
    id: "4",
    name: "Disengagement Certificate",
    description: "Certificate of disengagement from university",
  },
  {
    id: "5",
    name: "Honor Certificate",
    description: "Certificate for honor students",
  },
  {
    id: "6",
    name: "High Honor Certificate",
    description: "Certificate for high honor students",
  },
];

// Mock students with graduation status
export const students = [
  {
    id: "1",
    name: "John Doe",
    studentId: "2020123001",
    department: "Computer Engineering",
    faculty: "Engineering",
    gpa: 3.75,
    graduationStatus: "Eligible",
    certificateStatus: [
      { certificateId: "1", status: "Ready", issueDate: "2023-06-15" },
      { certificateId: "2", status: "Processing", issueDate: null },
      { certificateId: "3", status: "Ready", issueDate: "2023-06-10" },
      { certificateId: "4", status: "Not Started", issueDate: null },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    studentId: "2020123002",
    department: "Computer Engineering",
    faculty: "Engineering",
    gpa: 3.95,
    graduationStatus: "Eligible",
    certificateStatus: [
      { certificateId: "1", status: "Ready", issueDate: "2023-06-15" },
      { certificateId: "2", status: "Ready", issueDate: "2023-06-20" },
      { certificateId: "3", status: "Ready", issueDate: "2023-06-10" },
      { certificateId: "4", status: "Ready", issueDate: "2023-06-25" },
      { certificateId: "5", status: "Ready", issueDate: "2023-06-15" },
      { certificateId: "6", status: "Ready", issueDate: "2023-06-15" },
    ],
  },
  {
    id: "3",
    name: "Robert Johnson",
    studentId: "2020123003",
    department: "Electrical Engineering",
    faculty: "Engineering",
    gpa: 2.85,
    graduationStatus: "Pending",
    certificateStatus: [
      { certificateId: "1", status: "Not Started", issueDate: null },
      { certificateId: "2", status: "Not Started", issueDate: null },
      { certificateId: "3", status: "Ready", issueDate: "2023-06-10" },
      { certificateId: "4", status: "Not Started", issueDate: null },
    ],
  },
  {
    id: "4",
    name: "Emily Davis",
    studentId: "2020123004",
    department: "Physics",
    faculty: "Science",
    gpa: 3.45,
    graduationStatus: "Eligible",
    certificateStatus: [
      { certificateId: "1", status: "Processing", issueDate: null },
      { certificateId: "2", status: "Not Started", issueDate: null },
      { certificateId: "3", status: "Ready", issueDate: "2023-06-10" },
      { certificateId: "4", status: "Not Started", issueDate: null },
    ],
  },
  {
    id: "5",
    name: "Michael Wilson",
    studentId: "2020123005",
    department: "Architecture",
    faculty: "Architecture",
    gpa: 3.15,
    graduationStatus: "Not Eligible",
    certificateStatus: [
      { certificateId: "1", status: "Not Started", issueDate: null },
      { certificateId: "2", status: "Not Started", issueDate: null },
      { certificateId: "3", status: "Ready", issueDate: "2023-06-10" },
      { certificateId: "4", status: "Not Started", issueDate: null },
    ],
  },
];

// University rankings data
export const universityRankings = [
  {
    id: "1",
    year: "2023",
    department: "Computer Engineering",
    faculty: "Engineering",
    students: [
      { id: "1", name: "Jane Smith", gpa: 3.95, rank: 1 },
      { id: "2", name: "John Doe", gpa: 3.75, rank: 2 },
      { id: "3", name: "Alex Brown", gpa: 3.70, rank: 3 },
      { id: "4", name: "Sarah Johnson", gpa: 3.65, rank: 4 },
      { id: "5", name: "David Lee", gpa: 3.60, rank: 5 },
    ],
  },
  {
    id: "2",
    year: "2023",
    department: "Electrical Engineering",
    faculty: "Engineering",
    students: [
      { id: "1", name: "Lisa Wang", gpa: 3.92, rank: 1 },
      { id: "2", name: "Tom Harris", gpa: 3.85, rank: 2 },
      { id: "3", name: "Robert Johnson", gpa: 2.85, rank: 3 },
      { id: "4", name: "John Doe", gpa: 3.80, rank: 2 },
    ],
  },
  {
    id: "3",
    year: "2023",
    department: "Physics",
    faculty: "Science",
    students: [
      { id: "1", name: "Emily Davis", gpa: 3.45, rank: 1 },
      { id: "2", name: "Mark Thompson", gpa: 3.40, rank: 2 },
    ],
  },
];

// Graduation decisions data
export const graduationDecisions = [
  {
    id: "1",
    meetingDate: "2023-06-01",
    decisionNumber: "GD-2023-001",
    faculty: "Engineering",
    department: "Computer Engineering",
    academicYear: "2022-2023",
    semester: "Spring",
    students: [
      {
        id: "1",
        name: "John Doe",
        studentId: "2020123001",
        status: "Approved",
      },
      {
        id: "2",
        name: "Jane Smith",
        studentId: "2020123002",
        status: "Approved",
      },
    ],
  },
  {
    id: "2",
    meetingDate: "2023-06-05",
    decisionNumber: "GD-2023-002",
    faculty: "Engineering",
    department: "Electrical Engineering",
    academicYear: "2022-2023",
    semester: "Spring",
    students: [
      {
        id: "3",
        name: "Robert Johnson",
        studentId: "2020123003",
        status: "Pending",
      },
    ],
  },
  {
    id: "3",
    meetingDate: "2023-06-10",
    decisionNumber: "GD-2023-003",
    faculty: "Science",
    department: "Physics",
    academicYear: "2022-2023",
    semester: "Spring",
    students: [
      {
        id: "4",
        name: "Emily Davis",
        studentId: "2020123004",
        status: "Approved",
      },
    ],
  },
];

// Notifications data
export const notifications = [
  {
    id: "1",
    title: "New graduation request",
    message: "New graduation request from John Doe",
    date: "2023-06-15T10:30:00",
    read: false,
    type: "request",
  },
  {
    id: "2",
    title: "Transcript uploaded",
    message: "Transcript uploaded for Jane Smith",
    date: "2023-06-14T14:45:00",
    read: true,
    type: "upload",
  },
  {
    id: "3",
    title: "Disengagement certificate confirmed",
    message: "Disengagement certificate confirmed for Robert Johnson",
    date: "2023-06-13T09:15:00",
    read: false,
    type: "certificate",
  },
  {
    id: "4",
    title: "Faculty meeting scheduled",
    message: "Faculty meeting scheduled for June 20, 2023",
    date: "2023-06-12T16:20:00",
    read: true,
    type: "meeting",
  },
  {
    id: "5",
    title: "Graduation ceremony details",
    message: "Graduation ceremony details have been updated",
    date: "2023-06-11T11:05:00",
    read: false,
    type: "ceremony",
  },
];
