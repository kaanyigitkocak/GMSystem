import { UserType } from "../../../auth/types";
import type { User, AuthResponse } from "../types";

// Mock user data for testing
const MOCK_USERS = [
  {
    email: "student@example.com",
    password: "student123",
    user: {
      id: "1",
      email: "student@example.com",
      role: UserType.STUDENT,
      name: "Test Student",
    },
  },
  {
    email: "secretary@example.com",
    password: "secretary123",
    user: {
      id: "2",
      email: "secretary@example.com",
      role: UserType.SECRETARY,
      name: "Test Secretary",
      department: "Computer Engineering",
    },
  },
  {
    email: "advisor@example.com",
    password: "advisor123",
    user: {
      id: "3",
      email: "advisor@example.com",
      role: UserType.ADVISOR,
      name: "Test Advisor",
    },
  },
  {
    email: "dean@example.com",
    password: "dean123",
    user: {
      id: "4",
      email: "dean@example.com",
      role: UserType.DEANS_OFFICE,
      name: "Test Dean",
    },
  },
  {
    email: "deansoffice@example.com",
    password: "deansoffice123",
    user: {
      id: "5",
      email: "deansoffice@example.com",
      role: UserType.DEANS_OFFICE,
      name: "Dean's Office",
    },
  },
  {
    email: "affairs@example.com",
    password: "affairs123",
    user: {
      id: "6",
      email: "affairs@example.com",
      role: UserType.STUDENT_AFFAIRS,
      name: "Test Student Affairs",
    },
  },
  {
    email: "admin@example.com",
    password: "admin123",
    user: {
      id: "7",
      email: "admin@example.com",
      role: UserType.ADMIN,
      name: "Test Admin",
    },
  },
];

// Login API service function
export const loginUserMock = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  console.log("loginUserMock called with email:", email, "password:", password);
  // Simulate network request delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find matching user
      const matchedUser = MOCK_USERS.find(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );

      if (!matchedUser) {
        reject(new Error("Invalid credentials"));
        return;
      }

      // Return mock auth data
      resolve({
        user: matchedUser.user,
        token: `mock-jwt-token-${matchedUser.user.id}-${Date.now()}`,
      });
    }, 600);
  });
};

// Function to check if a token is valid
export const validateTokenMock = async (token: string): Promise<User> => {
  // No longer validating token
  throw new Error("Token validation has been disabled");
};

// Registration API service functions
export const sendVerificationEmailMock = async (
  email: string
): Promise<{ success: boolean }> => {
  // Simulate network request delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if email is already registered
      if (
        MOCK_USERS.some(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        )
      ) {
        reject(new Error("Email already registered"));
        return;
      }

      resolve({ success: true });
    }, 800);
  });
};

export const verifyCodeMock = async (
  email: string,
  code: string
): Promise<{ success: boolean }> => {
  // Simulate network request delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For mock purposes, any 6-digit code is considered valid
      if (!/^\d{6}$/.test(code)) {
        reject(new Error("Invalid verification code"));
        return;
      }

      resolve({ success: true });
    }, 500);
  });
};

export const registerUserMock = async (
  userData: any
): Promise<AuthResponse> => {
  // Simulate network request delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a new user with the provided data
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        email: userData.email,
        role: userData.type,
        name: `${userData.firstName} ${userData.lastName}`,
      };

      // Return mock auth data
      resolve({
        user: newUser,
        token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
      });
    }, 1000);
  });
};
