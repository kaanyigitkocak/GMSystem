import type {
  SetDeptSecretaryRejectedRequest,
  SetDeptSecretaryRejectedResponse,
} from "../types/graduationProcessTypes";

const API_BASE_URL = "https://gradsysbackend.onrender.com/api";

export const setDeptSecretaryRejected = async (
  data: SetDeptSecretaryRejectedRequest
): Promise<SetDeptSecretaryRejectedResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/GraduationProcesses/SetDeptSecretaryRejected`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        Accept: "*/*",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    // It's good practice to try and parse the error response body
    // as it might contain useful information from the backend.
    let errorDetails = "Network response was not ok";
    try {
      const errorData = await response.json();
      errorDetails = errorData.message || JSON.stringify(errorData);
    } catch (e) {
      // If parsing fails, use the status text
      errorDetails = response.statusText;
    }
    throw new Error(`API Error: ${errorDetails}`);
  }

  return response.json();
};
