import { getServiceConfig as getCommonServiceConfig } from "../../../common/utils/serviceUtils";

// Re-export common service config if it exists, otherwise define a basic one.
// This assumes a common/utils/serviceUtils.ts similar to secretary's setup.
// If this path is incorrect, getServiceConfig will need to be adjusted or defined locally.
export const getServiceConfig = getCommonServiceConfig;

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
    let errorMessage = `API error: ${response.statusText} (Status: ${response.status})`;
    let errorDetails: any = null; // Changed to any for broader compatibility

    try {
      const errorData = await response.text();
      // console.error("[ServiceUtils] API Error Response Body:", errorData); // Potentially verbose

      try {
        errorDetails = JSON.parse(errorData);
        // console.error("[ServiceUtils] Parsed API Error Details:", errorDetails); // Potentially verbose

        if (errorDetails && typeof errorDetails === "object") {
          if (errorDetails.detail) {
            errorMessage = `${errorDetails.detail} (Status: ${response.status})`;
          } else if (errorDetails.message) {
            errorMessage = `${errorDetails.message} (Status: ${response.status})`;
          } else if (
            errorDetails.title &&
            typeof errorDetails.title === "string"
          ) {
            errorMessage = `${errorDetails.title} (Status: ${response.status})`;
          } else if (
            errorDetails.errors &&
            typeof errorDetails.errors === "object"
          ) {
            const validationErrors = Object.entries(errorDetails.errors)
              .map(
                ([field, errors]) =>
                  `${field}: ${
                    Array.isArray(errors) ? errors.join(", ") : String(errors)
                  }`
              )
              .join("; ");
            errorMessage = `Validation errors: ${validationErrors} (Status: ${response.status})`;
          } else if (errorData) {
            // Fallback to raw text if specific fields not found
            errorMessage = `${errorData.substring(0, 200)} (Status: ${
              response.status
            })`; // Limit length
          }
        } else if (errorData) {
          // If not an object, or parsing failed but got text
          errorMessage = `${errorData.substring(0, 200)} (Status: ${
            response.status
          })`;
        }
      } catch (parseError) {
        // If not JSON, use the raw text if available and not too long
        if (errorData) {
          errorMessage = `${errorData.substring(0, 200)} (Status: ${
            response.status
          })`;
        }
        // console.warn("[ServiceUtils] Could not parse API error response as JSON:", parseError);
      }
    } catch (readError) {
      console.error(
        "[ServiceUtils] Could not read error response body:",
        readError
      );
    }
    console.error(`[ServiceUtils] Throwing ServiceError: ${errorMessage}`);
    throw new ServiceError(errorMessage, response.status);
  }
  // If response is ok, try to parse as JSON.
  // Handle cases where response might be ok but empty (e.g., 204 No Content)
  const contentType = response.headers.get("content-type");
  if (
    response.status === 204 ||
    !contentType ||
    !contentType.includes("application/json")
  ) {
    return Promise.resolve(null as unknown as T); // Return null or undefined for non-JSON or empty responses
  }
  return response.json() as Promise<T>;
};

// You might need other utilities like createFormData if file uploads are needed for deansoffice
