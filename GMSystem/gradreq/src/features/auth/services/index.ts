import { getServiceConfig } from "./utils/serviceUtils";

// Import API services
import {
  loginUserApi,
  // validateTokenApi,
  sendVerificationEmailApi,
  verifyCodeApi,
  registerUserApi,
  resetPasswordApi,
  sendPasswordResetEmailApi,
} from "./api/authApi";

// Import mock services
import {
  loginUserMock,
  // validateTokenMock,
  sendVerificationEmailMock,
  verifyCodeMock,
  registerUserMock,
  resetPasswordMock,
  sendPasswordResetEmailMock,
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

// Token validation removed as it's no longer needed

// Registration services
export const sendVerificationEmail = async (
  email: string,
  validationType: number = 2
): Promise<{ success: boolean }> => {
  if (useMock) {
    return sendVerificationEmailMock(email);
  }
  return sendVerificationEmailApi(email);
};

export const verifyCode = async (
  email: string,
  code: string,
  validationType: number = 2
): Promise<{ success: boolean }> => {
  if (useMock) {
    return verifyCodeMock(email, code, validationType);
  }
  return verifyCodeApi(email, code, validationType);
};

export const registerUser = async (userData: any): Promise<AuthResponse> => {
  if (useMock) {
    return registerUserMock(userData);
  }
  return registerUserApi(userData);
};

// Password Reset Service
export const resetPassword = async (
  email: string,
  newPassword: string
): Promise<{ success: boolean }> => {
  if (useMock) {
    return resetPasswordMock(email, newPassword);
  }
  return resetPasswordApi(email, newPassword);
};

// Send password reset email service
export const sendPasswordResetEmail = async (
  email: string
): Promise<{ success: boolean }> => {
  if (useMock) {
    return sendPasswordResetEmailMock(email);
  }
  return sendPasswordResetEmailApi(email);
};
