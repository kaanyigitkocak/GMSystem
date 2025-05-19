import { UserType } from "../types";

// Types for user authentication
export interface User {
  id: string;
  email: string;
  role: UserType;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

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
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  // Simulate network request delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Find matching user
  const matchedUser = MOCK_USERS.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!matchedUser) {
    throw new Error("Invalid credentials");
  }

  // Return mock auth data
  return {
    user: matchedUser.user,
    token: `mock-jwt-token-${matchedUser.user.id}-${Date.now()}`,
  };
};

// Function to check if a token is valid
export const validateToken = async (token: string): Promise<User> => {
  // Simulate network request delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // In a real app, this would validate the token with the server
  // For mock purposes, we'll just check if it starts with our prefix
  if (!token || !token.startsWith("mock-jwt-token-")) {
    throw new Error("Invalid token");
  }

  // Extract user ID from token (in a real app, this would be decoded from JWT)
  const tokenParts = token.split("-");
  const userId = tokenParts[2];

  const matchedUser = MOCK_USERS.find((user) => user.user.id === userId);

  if (!matchedUser) {
    throw new Error("User not found");
  }

  return matchedUser.user;
};

// Registration API service functions
export const sendVerificationEmail = async (
  email: string
): Promise<{ success: boolean }> => {
  // Simulate network request delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if email is already registered
  if (
    MOCK_USERS.some((user) => user.email.toLowerCase() === email.toLowerCase())
  ) {
    throw new Error("Email already registered");
  }

  return { success: true };
};

export const verifyCode = async (
  email: string,
  code: string
): Promise<{ success: boolean }> => {
  // Simulate network request delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For mock purposes, any 6-digit code is considered valid
  if (!/^\d{6}$/.test(code)) {
    throw new Error("Invalid verification code");
  }

  return { success: true };
};

export const registerUser = async (userData: any): Promise<AuthResponse> => {
  // Simulate network request delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Create a new user with the provided data
  const newUser = {
    id: `${MOCK_USERS.length + 1}`,
    email: userData.email,
    role: userData.type,
    name: `${userData.firstName} ${userData.lastName}`,
  };

  // Return mock auth data
  return {
    user: newUser,
    token: `mock-jwt-token-${newUser.id}-${Date.now()}`,
  };
};
