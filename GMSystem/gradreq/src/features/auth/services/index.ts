import { getServiceConfig } from "./utils/serviceUtils";

// Import API services
import {
  loginUserApi,
  validateTokenApi,
  sendVerificationEmailApi,
  verifyCodeApi,
  registerUserApi,
} from "./api/authApi";

// Import mock services
import {
  loginUserMock,
  validateTokenMock,
  sendVerificationEmailMock,
  verifyCodeMock,
  registerUserMock,
} from "./mock/authMock";

// Import types
import type { User, AuthResponse } from "./types";

// Export types
export type { User, AuthResponse };

// Get service configuration
const { useMock } = getServiceConfig();

// Authentication services
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  console.log("loginUser called in index.ts. useMock:", useMock);
  if (useMock) {
    return loginUserMock(email, password);
  }
  return loginUserApi(email, password);
};

export const validateToken = async (token: string): Promise<User> => {
  if (useMock) {
    return validateTokenMock(token);
  }
  return validateTokenApi(token);
};

// Registration services
export const sendVerificationEmail = async (
  email: string
): Promise<{ success: boolean }> => {
  if (useMock) {
    return sendVerificationEmailMock(email);
  }
  return sendVerificationEmailApi(email);
};

export const verifyCode = async (
  email: string,
  code: string
): Promise<{ success: boolean }> => {
  if (useMock) {
    return verifyCodeMock(email, code);
  }
  return verifyCodeApi(email, code);
};

export const registerUser = async (userData: any): Promise<AuthResponse> => {
  if (useMock) {
    return registerUserMock(userData);
  }
  return registerUserApi(userData);
};
