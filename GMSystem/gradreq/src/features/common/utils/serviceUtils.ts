// Common service utilities that can be used across different features
import { getEnvironmentConfig } from '../../../core/utils/environment';

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
  const envConfig = getEnvironmentConfig();
  
  return {
    apiBaseUrl: envConfig.apiBaseUrl,
    useMock: envConfig.useMock,
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
  responseBody?: any;

  constructor(message: string, statusCode: number = 500, responseBody?: any) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;
    this.responseBody = responseBody;
  }
}

/**
 * Debug utility to log request details
 */
const logRequestDetails = (url: string, options: RequestInit) => {
  console.group(`🚀 API Request: ${options.method || "GET"} ${url}`);
  console.log("Headers:", options.headers);
  if (options.body) {
    console.log("Body:", options.body);
  }

  // Check if Authorization header is present
  const headers = options.headers as Record<string, string>;
  const authHeader = headers?.Authorization || headers?.authorization;

  if (authHeader) {
    console.log(
      "✅ Authorization header present:",
      authHeader.substring(0, 20) + "..."
    );
  } else {
    console.warn("⚠️ No Authorization header found!");
  }

  console.groupEnd();
};

/**
 * Debug utility to log response details
 */
const logResponseDetails = async (response: Response, url: string) => {
  console.group(`📥 API Response: ${response.status} ${url}`);
  console.log("Status:", response.status, response.statusText);
  console.log("Headers:", Object.fromEntries(response.headers.entries()));

  // Clone response to read body for logging without consuming it
  const responseClone = response.clone();
  try {
    const responseText = await responseClone.text();
    if (responseText) {
      try {
        const responseJson = JSON.parse(responseText);
        console.log("Response Body:", responseJson);
      } catch {
        console.log("Response Body (text):", responseText.substring(0, 200));
      }
    }
  } catch (error) {
    console.log("Could not read response body:", error);
  }

  console.groupEnd();
};

/**
 * Response handling utility for API responses with enhanced debugging
 */
export const handleApiResponse = async <T>(
  response: Response,
  requestUrl?: string
): Promise<T> => {
  // Log response details for debugging
  if (requestUrl) {
    await logResponseDetails(response, requestUrl);
  }

  if (!response.ok) {
    let errorMessage = `API error: ${response.status} ${response.statusText}`;
    let responseBody;

    try {
      responseBody = await response.text();
      if (responseBody) {
        try {
          const errorData = JSON.parse(responseBody);
          errorMessage = errorData.message || errorData.title || errorMessage;
          responseBody = errorData;
        } catch {
          // If not JSON, use text as is
          errorMessage = responseBody || errorMessage;
        }
      }
    } catch (error) {
      console.error("Error reading response body:", error);
    }

    console.error(`❌ API Error [${response.status}]:`, errorMessage);
    throw new ServiceError(errorMessage, response.status, responseBody);
  }

  return response.json() as Promise<T>;
};

/**
 * Enhanced fetch wrapper with debugging
 */
export const debugFetch = async (url: string, options: RequestInit = {}) => {
  // Log request details
  logRequestDetails(url, options);

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error(`❌ Network Error for ${url}:`, error);
    throw error;
  }
};

// File handling utility
export const createFormData = (file: File): FormData => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};
