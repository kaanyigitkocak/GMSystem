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
