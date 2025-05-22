import type { ServiceConfig } from "../types";

// Service configuration
export const getServiceConfig = (): ServiceConfig => {
  console.log("API Source:", import.meta.env.VITE_API_SOURCE);
  return {
    apiBaseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
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
