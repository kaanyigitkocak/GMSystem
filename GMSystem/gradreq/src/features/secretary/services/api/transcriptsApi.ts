import type { TranscriptData, CreateTranscriptDataRequest } from "../types";
import {
  getServiceConfig,
  handleApiResponse,
  ServiceError,
} from "../utils/serviceUtils";
import {
  parsePDFTranscript,
  convertToTranscriptDataRequest,
  convertToCourseTakenRequests,
} from "../utils/pdfParser";

// Get service configuration
const { apiBaseUrl } = getServiceConfig();

// Default fetch options
const fetchOptions = {
  mode: "cors" as RequestMode,
  headers: {
    "Content-Type": "application/json",
  },
};

// Transcripts API functions
export const getTranscriptsApi = async (): Promise<TranscriptData[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/TranscriptDatas`, {
      ...fetchOptions,
      method: "GET",
    });

    const data = await handleApiResponse<{
      items: any[];
      index: number;
      size: number;
      count: number;
      pages: number;
      hasPrevious: boolean;
      hasNext: boolean;
    }>(response);

    // Map the backend response to our frontend model
    return data.items.map((item) => ({
      id: item.id,
      studentId: item.studentId,
      studentName: item.studentName,
      department: item.department,
      uploadDate: item.uploadDate,
      status: item.status,
      fileName: item.fileName,
      fileSize: item.fileSize,
      metaInfo: item.metaInfo,
    }));
  } catch (error) {
    console.error("Failed to fetch transcripts:", error);
    throw new ServiceError("Failed to fetch transcripts");
  }
};

// Upload and parse PDF transcript (frontend parsing)
export const uploadAndParsePDFTranscriptApi = async (
  file: File
): Promise<TranscriptData> => {
  try {
    // Parse PDF on frontend
    const parsedData = await parsePDFTranscript(file);
    console.log("Parsed PDF data:", parsedData);

    // Create transcript data request
    // Generate temporary GUID for now - should come from auth context
    const studentUserId = "12345678-1234-1234-1234-123456789012"; // TODO: Get actual user ID from auth context

    const transcriptDataRequest = convertToTranscriptDataRequest(
      parsedData,
      studentUserId
    );

    // Create transcript data record
    const transcriptResponse = await fetch(`${apiBaseUrl}/TranscriptDatas`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify(transcriptDataRequest),
    });

    const transcriptData = await handleApiResponse<{ id: string }>(
      transcriptResponse
    );

    // Create course taken records
    const courseTakenRequests = convertToCourseTakenRequests(
      parsedData,
      studentUserId
    );

    // Submit each course
    for (const courseRequest of courseTakenRequests) {
      const courseResponse = await fetch(`${apiBaseUrl}/CourseTakens`, {
        ...fetchOptions,
        method: "POST",
        body: JSON.stringify(courseRequest),
      });

      await handleApiResponse<any>(courseResponse);
    }

    // Return transcript data in expected format
    return {
      id: transcriptData.id,
      studentId: parsedData.studentId,
      studentName: parsedData.studentName,
      department: parsedData.department,
      uploadDate: new Date().toISOString(),
      status: "Processed",
      fileName: file.name,
      fileSize: file.size,
      metaInfo: JSON.stringify({
        tcNumber: parsedData.tcNumber,
        faculty: parsedData.faculty,
        program: parsedData.program,
        educationLevel: parsedData.educationLevel,
        educationLanguage: parsedData.educationLanguage,
        registrationDate: parsedData.registrationDate,
        registrationPeriod: parsedData.registrationPeriod,
        gpa: parsedData.gpa,
        graduationDate: parsedData.graduationDate,
        registrationType: parsedData.registrationType,
        totalCourses: parsedData.courses.length,
      }),
    };
  } catch (error) {
    console.error("Failed to parse PDF transcript:", error);
    throw new ServiceError("Failed to parse PDF transcript");
  }
};

// Parse CSV transcript
export const parseTranscriptCSVApi = async (
  file: File
): Promise<TranscriptData[]> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${apiBaseUrl}/TranscriptDatas/parse-csv`, {
      ...fetchOptions,
      method: "POST",
      headers: {}, // Clear default headers when using FormData
      body: formData,
    });

    return await handleApiResponse<TranscriptData[]>(response);
  } catch (error) {
    console.error("Failed to parse CSV:", error);
    throw new ServiceError("Failed to parse CSV file");
  }
};

export const uploadTranscriptApi = async (
  file: File
): Promise<TranscriptData> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${apiBaseUrl}/TranscriptDatas/upload`, {
      ...fetchOptions,
      method: "POST",
      headers: {}, // Clear default headers when using FormData
      body: formData,
    });

    return await handleApiResponse<TranscriptData>(response);
  } catch (error) {
    console.error("Failed to upload transcript:", error);
    throw new ServiceError("Failed to upload transcript");
  }
};

export const deleteTranscriptApi = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${apiBaseUrl}/TranscriptDatas/${id}`, {
      ...fetchOptions,
      method: "DELETE",
    });

    await handleApiResponse<any>(response);
    return true;
  } catch (error) {
    console.error(`Failed to delete transcript ${id}:`, error);
    throw new ServiceError(`Failed to delete transcript ${id}`);
  }
};

export const processTranscriptApi = async (
  id: string
): Promise<TranscriptData> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/TranscriptDatas/${id}/process`,
      {
        ...fetchOptions,
        method: "POST",
      }
    );

    return await handleApiResponse<TranscriptData>(response);
  } catch (error) {
    console.error(`Failed to process transcript ${id}:`, error);
    throw new ServiceError(`Failed to process transcript ${id}`);
  }
};

// Create transcript data record
export const createTranscriptDataApi = async (
  transcriptData: CreateTranscriptDataRequest
): Promise<{ id: string }> => {
  try {
    const response = await fetch(`${apiBaseUrl}/TranscriptDatas`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({
        ...transcriptData,
        parsingDate: new Date(transcriptData.parsingDate).toISOString(),
      }),
    });

    return await handleApiResponse<{ id: string }>(response);
  } catch (error) {
    console.error("Failed to create transcript data:", error);
    throw new ServiceError("Failed to create transcript data");
  }
};
