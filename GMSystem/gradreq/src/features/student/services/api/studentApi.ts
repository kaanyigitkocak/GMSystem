import {
  getServiceConfig,
  handleApiResponse,
  debugFetch,
} from "../../../common/utils/serviceUtils";

const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Helper function to get access token with debug
const getAccessToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  console.log("🔑 Access Token Check:", {
    tokenExists: !!token,
    tokenPreview: token ? `${token.substring(0, 20)}...` : "null",
    localStorage: Object.keys(localStorage),
  });
  return token;
};

// Helper function to create headers with debug
const createAuthHeaders = () => {
  const token = getAccessToken();
  const headers = {
    ...fetchOptions.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  console.log("📋 Request Headers:", headers);
  return headers;
};

// Get current user info from auth token
export const getCurrentUserApi = async () => {
  const url = `${apiBaseUrl}/users/GetFromAuth`;

  console.log("🔍 Getting current user from:", url);

  const options = {
    ...fetchOptions,
    headers: createAuthHeaders(),
  };

  try {
    const response = await debugFetch(url, options);
    return await handleApiResponse(response, url);
  } catch (error) {
    console.error("❌ getCurrentUserApi failed:", error);
    throw error;
  }
};

// Get student by ID
export const getStudentByIdApi = async (studentId: string) => {
  const url = `${apiBaseUrl}/students/${studentId}`;

  console.log("🎓 Getting student by ID:", studentId);

  const options = {
    ...fetchOptions,
    headers: createAuthHeaders(),
  };

  try {
    const response = await debugFetch(url, options);
    return await handleApiResponse(response, url);
  } catch (error) {
    console.error("❌ getStudentByIdApi failed:", error);
    throw error;
  }
};
