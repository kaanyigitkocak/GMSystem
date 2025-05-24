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
  type CreateCourseTakenRequest,
} from "../utils/pdfParser";

// Course interface to match backend response
export interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  departmentId: string;
  ects: number;
  courseType: number; // Enum: MANDATORY = 0, ELECTIVE_TECHNICAL = 1, ELECTIVE_NON_TECHNICAL = 2
  createdDate: string;
}

// Get service configuration
const { apiBaseUrl } = getServiceConfig();

// Default fetch options
const fetchOptions = {
  mode: "cors" as RequestMode,
  headers: {
    "Content-Type": "application/json",
  },
};

// Courses API functions
export const getCoursesApi = async (): Promise<Course[]> => {
  try {
    const response = await fetch(
      `${apiBaseUrl}/Courses?PageRequest.PageIndex=0&PageRequest.PageSize=1000`,
      {
        ...fetchOptions,
        method: "GET",
      }
    );

    const data = await handleApiResponse<{
      items: any[];
      index: number;
      size: 300;
      count: number;
      pages: number;
      hasPrevious: boolean;
      hasNext: boolean;
    }>(response);

    // Map the backend response to our frontend model
    return data.items.map((item) => ({
      id: item.id,
      courseCode: item.courseCode,
      courseName: item.courseName,
      departmentId: item.departmentId,
      ects: item.ects,
      courseType: item.courseType,
      createdDate: item.createdDate,
    }));
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw new ServiceError("Failed to fetch courses");
  }
};

// Function to match parsed courses with existing courses from API
const matchCoursesWithApiData = (
  parsedCourses: CreateCourseTakenRequest[],
  apiCourses: Course[]
): CreateCourseTakenRequest[] => {
  return parsedCourses.map((parsedCourse) => {
    // First try exact course code match
    let matchedCourse = apiCourses.find(
      (apiCourse) =>
        apiCourse.courseCode.toLowerCase() ===
        parsedCourse.courseCodeInTranscript.toLowerCase()
    );

    // If no exact match, try fuzzy matching by course name
    if (!matchedCourse) {
      matchedCourse = apiCourses.find((apiCourse) => {
        const apiCourseName = apiCourse.courseName.toLowerCase();
        const parsedCourseName =
          parsedCourse.courseNameInTranscript.toLowerCase();

        // Check if names are similar (contains significant portion)
        return (
          apiCourseName.includes(parsedCourseName) ||
          parsedCourseName.includes(apiCourseName) ||
          // Check if they share significant words (more than 50% overlap)
          calculateNameSimilarity(apiCourseName, parsedCourseName) > 0.5
        );
      });
    }

    console.log(
      `Course matching: ${parsedCourse.courseCodeInTranscript} -> ${
        matchedCourse
          ? `${matchedCourse.courseCode} (${matchedCourse.id})`
          : "NO MATCH"
      }`
    );

    return {
      ...parsedCourse,
      matchedCourseId: matchedCourse?.id,
    };
  });
};

// Helper function to calculate name similarity
const calculateNameSimilarity = (name1: string, name2: string): number => {
  const words1 = name1.split(/\s+/).filter((word) => word.length > 2);
  const words2 = name2.split(/\s+/).filter((word) => word.length > 2);

  if (words1.length === 0 || words2.length === 0) return 0;

  let matchCount = 0;
  words1.forEach((word1) => {
    if (
      words2.some((word2) => word1.includes(word2) || word2.includes(word1))
    ) {
      matchCount++;
    }
  });

  return matchCount / Math.max(words1.length, words2.length);
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
  file: File,
  onProgress?: (progress: number) => void // Add optional onProgress callback
): Promise<TranscriptData> => {
  try {
    // Simulate progress for API call if onProgress is provided
    if (onProgress) {
      onProgress(0);
      // Simulate some async work
      await new Promise((resolve) => setTimeout(resolve, 100));
      onProgress(50);
      await new Promise((resolve) => setTimeout(resolve, 100));
      onProgress(100);
    }

    // Parse PDF on frontend
    const parsedData = await parsePDFTranscript(file);
    console.log("Parsed PDF data:", parsedData);

    // Create transcript data request
    // Use an existing student user ID from the backend seed data
    const studentUserId = "22222222-2222-2222-2222-22222222222A"; // From UserConfiguration.StudentUserId

    const transcriptDataRequest = convertToTranscriptDataRequest(
      parsedData,
      studentUserId
    );

    console.log("Sending transcript data request:", transcriptDataRequest);

    // Create transcript data record
    const transcriptResponse = await fetch(`${apiBaseUrl}/TranscriptDatas`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify(transcriptDataRequest),
    });

    const transcriptData = await handleApiResponse<{ id: string }>(
      transcriptResponse
    );

    // Fetch all courses from API for matching
    console.log("Fetching courses from API for matching...");
    const apiCourses = await getCoursesApi();
    console.log(`Fetched ${apiCourses.length} courses from API`);

    // Create course taken records
    const courseTakenRequests = convertToCourseTakenRequests(
      parsedData,
      studentUserId
    );

    // Match courses with API data
    const matchedCourseTakenRequests = matchCoursesWithApiData(
      courseTakenRequests,
      apiCourses
    );

    console.log("Matched courses:", matchedCourseTakenRequests);

    // Submit each course with matched IDs
    for (const courseRequest of matchedCourseTakenRequests) {
      try {
        // Convert to backend expected format (PascalCase)
        const backendRequest = {
          StudentUserId: courseRequest.studentUserId,
          CourseCodeInTranscript: courseRequest.courseCodeInTranscript,
          CourseNameInTranscript: courseRequest.courseNameInTranscript,
          MatchedCourseId: courseRequest.matchedCourseId,
          Grade: courseRequest.grade,
          SemesterTaken: courseRequest.semesterTaken,
          CreditsEarned: courseRequest.creditsEarned,
          IsSuccessfullyCompleted: courseRequest.isSuccessfullyCompleted,
        };

        const courseResponse = await fetch(`${apiBaseUrl}/CourseTakens`, {
          ...fetchOptions,
          method: "POST",
          body: JSON.stringify(backendRequest),
        });

        await handleApiResponse<any>(courseResponse);
        console.log(
          `Successfully submitted course: ${courseRequest.courseCodeInTranscript}`
        );
      } catch (error) {
        console.error(
          `Failed to submit course ${courseRequest.courseCodeInTranscript}:`,
          error
        );
        // Continue with other courses even if one fails
      }
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
