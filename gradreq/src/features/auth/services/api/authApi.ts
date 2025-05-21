import type { User, AuthResponse } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import {
  handleApiResponse,
  ServiceError,
} from "../../../../features/common/utils/serviceUtils";

// Force using port 5278 for API calls
const { useMock, fetchOptions } = getServiceConfig();
const apiBaseUrl = useMock
  ? "http://localhost:5000/api" // Not used in mock mode
  : "http://localhost:5278/api"; // Force using port 5278

// Login API service
export const loginUserApi = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
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

    // Map backend response to our AuthResponse format - adapt based on actual API response
    return {
      user: {
        id: data.id || "",
        email: email, // Use the email we know
        name: "", // We might not have this info yet
        role: userRole || 0,
        department: data.department || "",
      },
      token: token,
    };
  } catch (error) {
    console.error("Login API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(
      error instanceof Error ? error.message : "Failed to login",
      500
    );
  }
};

// Token validation API service
export const validateTokenApi = async (token: string): Promise<User> => {
  try {
    // First, check if token is valid by making an authenticated request
    const response = await fetch(`${apiBaseUrl}/Auth/RefreshToken`, {
      ...fetchOptions,
      method: "GET",
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new ServiceError(
        `Token validation failed: ${response.statusText}`,
        response.status
      );
    }

    // Get new token and extract user information from it
    const data = await handleApiResponse<any>(response);

    // The response structure needs to be adjusted based on actual API
    // This is a placeholder implementation
    return {
      id: data.userId || "",
      email: data.email || "",
      name: data.fullName || "",
      role: data.role || 0,
      department: data.department || "",
    };
  } catch (error) {
    console.error("Token validation API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(
      error instanceof Error ? error.message : "Failed to validate token",
      500
    );
  }
};

// Registration API services
export const sendVerificationEmailApi = async (
  email: string
): Promise<{ success: boolean }> => {
  try {
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
  } catch (error) {
    console.error("Send verification email API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(
      error instanceof Error
        ? error.message
        : "Failed to send verification email",
      500
    );
  }
};

export const verifyCodeApi = async (
  email: string,
  code: string
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${apiBaseUrl}/Auth/verify-code`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({
        email,
        code,
      }),
    });

    await handleApiResponse<any>(response);
    return { success: true };
  } catch (error) {
    console.error("Verify code API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(
      error instanceof Error ? error.message : "Failed to verify code",
      500
    );
  }
};

export const registerUserApi = async (userData: any): Promise<AuthResponse> => {
  try {
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
  } catch (error) {
    console.error("Register API error:", error);
    if (error instanceof ServiceError) {
      throw error;
    }
    throw new ServiceError(
      error instanceof Error ? error.message : "Failed to register",
      500
    );
  }
};
