import type { Notification, GraduationRequest } from "../types";

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "New Graduation Request",
    message: "John Doe has submitted a manual graduation check request.",
    type: "info",
    read: false,
    date: "2023-05-15T10:30:00",
  },
  {
    id: "n2",
    title: "Transcript Processing Complete",
    message: "Jane Smith's transcript has been processed successfully.",
    type: "success",
    read: false,
    date: "2023-05-14T16:45:00",
  },
  {
    id: "n3",
    title: "Missing Documents",
    message: "Mike Johnson is missing disengagement certificates.",
    type: "warning",
    read: false,
    date: "2023-05-13T09:15:00",
  },
  {
    id: "n4",
    title: "System Notification",
    message: "The graduation approval deadline is approaching (May 30).",
    type: "info",
    read: true,
    date: "2023-05-12T14:20:00",
  },
  {
    id: "n5",
    title: "Error in Transcript",
    message: "Error found in Emily Brown's transcript - missing courses.",
    type: "error",
    read: true,
    date: "2023-05-11T11:05:00",
  },
];

// Mock data for graduation requests
const mockGraduationRequests: GraduationRequest[] = [
  {
    id: "r1",
    studentId: "20190001",
    studentName: "John Doe",
    requestType: "Manual Check",
    status: "pending",
    date: "2023-05-15",
    notes: "Student is requesting a manual check for Article 19.",
  },
  {
    id: "r2",
    studentId: "20190023",
    studentName: "Jane Smith",
    requestType: "Transcript Verification",
    status: "approved",
    date: "2023-05-14",
    notes: "Transcript has been verified and approved.",
  },
  {
    id: "r3",
    studentId: "20190045",
    studentName: "Mike Johnson",
    requestType: "Disengagement Certificate",
    status: "pending",
    date: "2023-05-13",
    notes: "Missing library clearance certificate.",
  },
  {
    id: "r4",
    studentId: "20190078",
    studentName: "Emily Brown",
    requestType: "Manual Check",
    status: "rejected",
    date: "2023-05-10",
    notes: "Student has not completed all required courses.",
  },
];

// Function to fetch notifications (simulated API call)
export const getNotifications = async (): Promise<Notification[]> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNotifications);
    }, 500);
  });
};

// Function to fetch graduation requests (simulated API call)
export const getGraduationRequests = async (): Promise<GraduationRequest[]> => {
  // Simulating API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGraduationRequests);
    }, 500);
  });
};
