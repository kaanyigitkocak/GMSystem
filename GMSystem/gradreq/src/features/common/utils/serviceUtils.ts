// Common service utilities that can be used across different features

/**
 * Common service configuration interface
 */
export interface ServiceConfig {
  apiBaseUrl: string;
  useMock: boolean;
  fetchOptions: RequestInit;
}

/**
 * Get service configuration based on environment variables
 * This is a common utility that can be used by all features
 */
export const getServiceConfig = (): ServiceConfig => {
  const useMock = import.meta.env.VITE_API_SOURCE === "mock";

  // FORCE: Always use port 5278 for backend API calls
  const apiBaseUrl = "http://localhost:5278/api";

  console.log("Service Config:", {
    useMock,
    apiBaseUrl,
    VITE_API_SOURCE: import.meta.env.VITE_API_SOURCE,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  });

  return {
    apiBaseUrl,
    useMock,
    fetchOptions: {
      credentials: "omit", // Changed from 'include' to 'omit' to fix CORS issues
      mode: "cors", // Enable CORS
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};

/**
 * Service error class for handling API errors
 */
export class ServiceError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;
  }
}

/**
 * Response handling utility for API responses
 */
export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ServiceError(
      `API error: ${response.statusText}`,
      response.status
    );
  }
  return response.json() as Promise<T>;
};

// File handling utility
export const createFormData = (file: File): FormData => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};
