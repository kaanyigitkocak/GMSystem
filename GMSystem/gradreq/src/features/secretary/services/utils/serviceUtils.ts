import type { ServiceConfig } from "../types";

// Service configuration
export const getServiceConfig = (): ServiceConfig => {
  console.log("API Source:", import.meta.env.VITE_API_SOURCE);
  return {
    apiBaseUrl: "http://localhost:5278/api", // FORCE: Always use 5278
    useMock: import.meta.env.VITE_API_SOURCE === "mock",
  };
};

// Error handling utility
export class ServiceError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

// Response handling utility
export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorMessage = `API error: ${response.statusText}`;
    let errorDetails = null;

    try {
      // Try to parse error response body for more details
      const errorData = await response.text();
      console.error("API Error Response Body:", errorData);

      // Try to parse as JSON if possible
      try {
        errorDetails = JSON.parse(errorData);
        console.error("Parsed API Error Details:", errorDetails);

        // Use more detailed error message if available
        if (errorDetails.detail) {
          errorMessage += ` - ${errorDetails.detail}`;
        } else if (errorDetails.message) {
          errorMessage += ` - ${errorDetails.message}`;
        } else if (errorDetails.errors) {
          const validationErrors = Object.entries(errorDetails.errors)
            .map(
              ([field, errors]) =>
                `${field}: ${
                  Array.isArray(errors) ? errors.join(", ") : errors
                }`
            )
            .join("; ");
          errorMessage += ` - Validation errors: ${validationErrors}`;
        }
      } catch {
        // If not JSON, just append the raw text
        errorMessage += ` - ${errorData}`;
      }
    } catch (readError) {
      console.error("Could not read error response body:", readError);
    }

    throw new ServiceError(errorMessage, response.status);
  }
  return response.json() as Promise<T>;
};

// File handling utility
export const createFormData = (file: File): FormData => {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
};
