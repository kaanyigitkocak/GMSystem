import type { User, AuthResponse } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../../features/common/utils/serviceUtils";
import { UserType } from "../../../auth/types";
import { executeWithRetry } from "../../../common/utils/rateLimitUtils";

// Get service configuration for API calls
const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Login API service
export const loginUserApi = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    return await executeWithRetry(async () => {
      // Backend ne beklediğini hata mesajlarından anlıyoruz
      // UserForLoginDto sınıfını doğrudan istiyor
      const url = `${apiBaseUrl}/Auth/Login`;

      const requestBody = {
        Email: email,
        Password: password,
      };

      console.log("Login API Request:", {
        url,
        method: "POST",
        body: requestBody,
        options: fetchOptions,
      });

      const response = await fetch(url, {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      console.log("Login API Response Status:", response.status);
      console.log("Login API Response Headers:", {
        contentType: response.headers.get("content-type"),
        headers: [...response.headers.entries()].reduce(
          (obj: Record<string, string>, [key, value]) => {
            obj[key] = value;
            return obj;
          },
          {}
        ),
      });

      const responseText = await response.text(); // Get response as text to log it
      console.log("Login API Response Text:", responseText);

      // Check if the response status is not successful
      if (!response.ok) {
        let errorMessage = "Login failed";

        try {
          // Try to parse error details from response
          const errorData = JSON.parse(responseText);
          errorMessage =
            errorData.detail || errorData.title || "Authentication failed";

          console.log("Login failed with error:", errorMessage);
          throw new ServiceError(errorMessage, response.status);
        } catch (parseError) {
          // If can't parse JSON, use the text response
          console.error("Failed to parse error response:", parseError);
          throw new ServiceError(
            responseText || "Authentication failed",
            response.status
          );
        }
      }

      let data: any;
      try {
        data = JSON.parse(responseText); // Try to parse it as JSON
        console.log("Login API Parsed Data:", JSON.stringify(data, null, 2));
      } catch (e) {
        console.error("Failed to parse login API response as JSON:", e);
        throw new ServiceError(
          "Invalid JSON response from login API",
          response.status
        );
      }

      console.log("Data type:", typeof data);
      console.log("Data structure:", Object.keys(data || {}));

      // Check response structure carefully
      if (!data) {
        console.error("API response data is null or undefined");
        throw new ServiceError("Empty API response", 500);
      }

      // Backend returns AccessToken object that might have token inside it
      // Access nested structure based on LoggedHttpResponse
      const accessTokenObj = data.accessToken || data.AccessToken;
      console.log("AccessToken object:", accessTokenObj);

      let token = null;

      // Try to find token in various possible structures
      if (typeof accessTokenObj === "object" && accessTokenObj !== null) {
        // The token might be in different properties of AccessToken
        token =
          accessTokenObj.token ||
          accessTokenObj.Token ||
          accessTokenObj.access_token ||
          accessTokenObj.jwt;
      } else if (typeof accessTokenObj === "string") {
        // AccessToken itself might be the token string
        token = accessTokenObj;
      } else {
        // Try direct token fields
        token =
          data.token ||
          data.Token ||
          data.access_token ||
          data.jwt ||
          data.auth_token;
      }

      if (!token) {
        console.error(
          "No token found in API response. Response structure:",
          data
        );
        throw new ServiceError(
          "Invalid response format from login API: No token found",
          500
        );
      }

      // Extract user role from response
      const userRole =
        data.userRole ||
        data.UserRole ||
        (accessTokenObj && accessTokenObj.userRole) ||
        (accessTokenObj && accessTokenObj.UserRole);

      // Map backend role names to frontend UserType enum values
      const normalizeRole = (backendRole: string): UserType => {
        // Map backend role names to frontend role names
        switch (backendRole) {
          case "DEPARTMENT_SECRETARY":
            return UserType.SECRETARY;
          case "STUDENT":
            return UserType.STUDENT;
          case "ADVISOR":
            return UserType.ADVISOR;
          case "DEANS_OFFICE_STAFF":
            return UserType.DEANS_OFFICE;
          case "STUDENT_AFFAIRS_STAFF":
            return UserType.STUDENT_AFFAIRS;
          case "SYSTEM_ADMIN":
            return UserType.ADMIN;
          default:
            // Default to student to avoid type errors, but this should be handled better in a real app
            console.warn(
              `Unknown role type received from backend: ${backendRole}`
            );
            return UserType.STUDENT;
        }
      };

      // Map backend response to our AuthResponse format - adapt based on actual API response
      return {
        user: {
          id: data.id || "",
          email: email, // Use the email we know
          name: "", // We might not have this info yet
          role: userRole ? normalizeRole(userRole) : UserType.STUDENT,
          department: data.department || "",
        },
        token: token,
      };
    });
  } catch (error) {
    console.error("Login API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Failed to login";
    throw new ServiceError(errorMessage, 500);
  }
};

// Token validation API service
// This is now a stub function that's no longer used
// It's kept for API consistency but should not be called
export const validateTokenApi = async (_token: string): Promise<User> => {
  // No longer validating token with the server
  throw new Error("Token validation has been disabled");
};

// Registration API services
export const sendVerificationEmailApi = async (
  email: string
): Promise<{ success: boolean }> => {
  try {
    return await executeWithRetry(async () => {
      const response = await fetch(`${apiBaseUrl}/Auth/send-email-validation`, {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify({
          email,
          returnUrl: window.location.origin + "/verify-email",
        }),
      });

      await handleApiResponse<any>(response);
      return { success: true };
    });
  } catch (error) {
    console.error("Send verification email API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send verification email";
    throw new ServiceError(errorMessage, 500);
  }
};

export const verifyCodeApi = async (
  email: string,
  code: string,
  validationType: number = 2 // Default to 2 for email verification
): Promise<{ success: boolean }> => {
  try {
    return await executeWithRetry(async () => {
      const response = await fetch(`${apiBaseUrl}/Auth/verify-code`, {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify({
          email,
          code,
          validationType, // Add validationType to the request body
        }),
      });

      await handleApiResponse<any>(response);
      return { success: true };
    });
  } catch (error) {
    console.error("Verify code API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Failed to verify code";
    throw new ServiceError(errorMessage, 500);
  }
};

export const registerUserApi = async (userData: any): Promise<AuthResponse> => {
  try {
    return await executeWithRetry(async () => {
      // Transform userData to match the backend StudentRegisterRequest format
      const requestBody = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber || "",
        studentNumber: userData.studentId || "",
        departmentId:
          userData.departmentId || "00000000-0000-0000-0000-000000000000", // Default GUID format
        facultyId: userData.facultyId || "00000000-0000-0000-0000-000000000000", // Default GUID format
      };

      const response = await fetch(`${apiBaseUrl}/Auth/Register`, {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      // Based on the controller, it should return an access token directly
      const accessToken = await handleApiResponse<string>(response);

      if (!accessToken) {
        throw new ServiceError(
          "Registration successful but no access token received",
          500
        );
      }

      // Create user object from registration data since API may not return it directly
      const user: User = {
        id: "", // We don't have the ID yet, it will be obtained on next login or token validation
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        role: userData.type,
        department: userData.department || "",
      };

      return {
        user,
        token: accessToken,
      };
    });
  } catch (error) {
    console.error("Register API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Failed to register";
    throw new ServiceError(errorMessage, 500);
  }
};

export const resetPasswordApi = async (
  email: string,
  newPassword: string
): Promise<{ success: boolean }> => {
  try {
    return await executeWithRetry(async () => {
      const response = await fetch(`${apiBaseUrl}/Auth/reset-password`, {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await handleApiResponse<{
        message: string;
        isSuccess: boolean;
      }>(response);

      // Check if the backend indicates success
      if (data && data.isSuccess) {
        console.log("Password reset successful:", data.message);
        return { success: true };
      } else {
        throw new ServiceError(
          data?.message || "Password reset failed",
          response.status
        );
      }
    });
  } catch (error) {
    console.error("Reset password API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error ? error.message : "Failed to reset password";
    throw new ServiceError(errorMessage, 500);
  }
};

// Send password reset verification email
export const sendPasswordResetEmailApi = async (
  email: string
): Promise<{ success: boolean }> => {
  try {
    return await executeWithRetry(async () => {
      console.log("Sending password reset email to:", email);
      const response = await fetch(`${apiBaseUrl}/Auth/send-password-reset`, {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });

      console.log("Password reset email API response status:", response.status);
      await handleApiResponse<any>(response);
      return { success: true };
    });
  } catch (error) {
    console.error("Send password reset email API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to send password reset email";
    throw new ServiceError(errorMessage, 500);
  }
};
