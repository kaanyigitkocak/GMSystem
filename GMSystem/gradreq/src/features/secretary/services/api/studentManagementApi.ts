import type {
  TranscriptData,
  CreateStudentFromTranscriptRequest,
  CreateTranscriptDataRequest,
} from "../types";
import {
  getServiceConfig,
  handleApiResponse,
  ServiceError,
} from "../utils/serviceUtils";

// Get service configuration
const { apiBaseUrl } = getServiceConfig();

// Default fetch options
const fetchOptions = {
  mode: "cors" as RequestMode,
  headers: {
    "Content-Type": "application/json",
  },
};

// Get departments for dropdown selection
export const getDepartmentsApi = async (): Promise<
  { id: string; name: string; facultyId: string }[]
> => {
  try {
    const response = await fetch(`${apiBaseUrl}/Departments`, {
      ...fetchOptions,
      method: "GET",
    });

    const data = await handleApiResponse<{
      items: any[];
    }>(response);

    return data.items.map((item) => ({
      id: item.id,
      name: item.name,
      facultyId: item.facultyId,
    }));
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    throw new ServiceError("Failed to fetch departments");
  }
};

// Create user for student
export const createUserApi = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{ id: string }> => {
  try {
    const response = await fetch(`${apiBaseUrl}/Users`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify(userData),
    });

    return await handleApiResponse<{ id: string }>(response);
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new ServiceError("Failed to create user");
  }
};

// Create student profile
export const createStudentApi = async (studentData: {
  studentNumber: string;
  departmentId: string;
  programName: string;
  enrollDate: string;
  currentGpa?: number;
  currentEctsCompleted?: number;
  graduationStatus: number; // StudentGraduationStatus enum value
  assignedAdvisorUserId?: string;
}): Promise<{ id: string }> => {
  try {
    const response = await fetch(`${apiBaseUrl}/Students`, {
      ...fetchOptions,
      method: "POST",
      body: JSON.stringify({
        ...studentData,
        enrollDate: new Date(studentData.enrollDate).toISOString(),
      }),
    });

    return await handleApiResponse<{ id: string }>(response);
  } catch (error) {
    console.error("Failed to create student:", error);
    throw new ServiceError("Failed to create student");
  }
};

// Process parsed transcript: Create User, Student, and TranscriptData
export const processCompleteTranscriptApi = async (
  parsedData: TranscriptData
): Promise<{
  userId: string;
  studentId: string;
  transcriptDataId: string;
}> => {
  try {
    // Extract parsed information
    const firstName = parsedData.studentName?.split(" ")[0] || "";
    const lastName =
      parsedData.studentName?.split(" ").slice(1).join(" ") || "";
    const email = `${parsedData.ogrenciNo || parsedData.studentId}@iyte.edu.tr`;
    const defaultPassword = `${parsedData.tcKimlikNo || "123456"}`;

    // 1. Create User
    const createdUser = await createUserApi({
      firstName,
      lastName,
      email,
      password: defaultPassword,
    });

    // 2. Find department by name (simplified - you might need a more sophisticated mapping)
    const departments = await getDepartmentsApi();
    const department = departments.find(
      (d) =>
        d.name.toLowerCase().includes("bilgisayar") ||
        d.name
          .toLowerCase()
          .includes(parsedData.department?.toLowerCase() || "")
    );

    if (!department) {
      throw new ServiceError(
        `Department not found for: ${parsedData.department}`
      );
    }

    // 3. Create Student
    const createdStudent = await createStudentApi({
      studentNumber: parsedData.ogrenciNo || parsedData.studentId,
      departmentId: department.id,
      programName: parsedData.program || parsedData.department,
      enrollDate: parsedData.kayitTarihi || new Date().toISOString(),
      currentGpa: parsedData.gpa
        ? parseFloat(parsedData.gpa.replace(",", "."))
        : undefined,
      currentEctsCompleted: parsedData.totalCredits
        ? parseInt(parsedData.totalCredits)
        : undefined,
      graduationStatus: 0, // Assuming 0 = Active/InProgress
    });

    // 4. Create TranscriptData - Import from transcriptsApi
    const { createTranscriptDataApi } = await import("./transcriptsApi");
    const createdTranscriptData = await createTranscriptDataApi({
      studentUserId: createdUser.id,
      sourceDocumentId: parsedData.id, // Assuming this is the file attachment ID
      parsingDate: new Date().toISOString(),
      parsedGpa: parsedData.gpa
        ? parseFloat(parsedData.gpa.replace(",", "."))
        : 0,
      parsedEcts: parsedData.totalCredits
        ? parseInt(parsedData.totalCredits)
        : 0,
      isValidForProcessing: true,
    });

    return {
      userId: createdUser.id,
      studentId: createdStudent.id,
      transcriptDataId: createdTranscriptData.id,
    };
  } catch (error) {
    console.error("Failed to process complete transcript:", error);
    throw new ServiceError("Failed to process complete transcript");
  }
};

// Submit parsed transcript data to create a complete student record
export const submitParsedTranscriptApi = async (
  transcriptData: TranscriptData
): Promise<{
  transcriptData: TranscriptData;
  studentCreated: {
    userId: string;
    studentId: string;
    transcriptDataId: string;
  };
}> => {
  try {
    // Extract information from metaInfo according to İYTE transcript format
    let gpa = "0.00";
    let registrationDate = "";
    let faculty = "";
    let totalCredits = "";
    let tcKimlikNo = "";
    let ogrenciNo = "";
    let program = "";
    let egitimDuzeyi = "";
    let egitimDili = "";
    let mezuniyetTarihi = "";
    let kayitSekli = "";

    if (transcriptData.metaInfo) {
      // İYTE specific patterns based on the transcript format

      // AGNO (GPA) - format: "3,64" (Turkish decimal comma)
      const agnoMatch = transcriptData.metaInfo.match(/AGNO\s*:\s*([\d,]+)/);
      if (agnoMatch) {
        gpa = agnoMatch[1].replace(",", "."); // Convert Turkish comma to decimal point
      }

      // TC Kimlik No
      const tcMatch = transcriptData.metaInfo.match(
        /TC\s*Kimlik\s*No\s*:\s*([^\s]+)/
      );
      if (tcMatch) tcKimlikNo = tcMatch[1];

      // Öğrenci No
      const ogrenciNoMatch = transcriptData.metaInfo.match(
        /Öğrenci\s*No\s*:\s*([^\s]+)/
      );
      if (ogrenciNoMatch) ogrenciNo = ogrenciNoMatch[1];

      // Fakülte
      const facultyMatch = transcriptData.metaInfo.match(
        /Fakülte\s*:\s*([^\n\r]+)/
      );
      if (facultyMatch) faculty = facultyMatch[1].trim();

      // Program
      const programMatch = transcriptData.metaInfo.match(
        /Program\s*:\s*([^\n\r]+)/
      );
      if (programMatch) program = programMatch[1].trim();

      // Eğitim Düzeyi
      const egitimDuzeyiMatch = transcriptData.metaInfo.match(
        /Eğitim\s*Düzeyi\s*:\s*([^\n\r]+)/
      );
      if (egitimDuzeyiMatch) egitimDuzeyi = egitimDuzeyiMatch[1].trim();

      // Eğitim Dili
      const egitimDiliMatch = transcriptData.metaInfo.match(
        /Eğitim\s*Dili\s*:\s*([^\n\r]+)/
      );
      if (egitimDiliMatch) egitimDili = egitimDiliMatch[1].trim();

      // Kayıt Tarihi/Dönemi - format: "14.09.2021 / Güz"
      const dateMatch = transcriptData.metaInfo.match(
        /Kayıt\s*Tarihi\s*\/\s*Dönemi\s*:\s*([^\n\r]+)/
      );
      if (dateMatch) registrationDate = dateMatch[1].trim();

      // Mezuniyet Tarihi - format: "05.07.2024"
      const mezuniyetMatch = transcriptData.metaInfo.match(
        /Mezuniyet\s*Tarihi\s*:\s*([^\n\r]+)/
      );
      if (mezuniyetMatch) mezuniyetTarihi = mezuniyetMatch[1].trim();

      // Kayıt Şekli
      const kayitSekliMatch = transcriptData.metaInfo.match(
        /Kayıt\s*Şekli\s*:\s*([^\n\r]+)/
      );
      if (kayitSekliMatch) kayitSekli = kayitSekliMatch[1].trim();

      // Toplam AKTS - from semester summary tables
      const creditsMatch = transcriptData.metaInfo.match(
        /Toplam.*?AKTS[:\s]*(\d+)/i
      );
      if (creditsMatch) totalCredits = creditsMatch[1];
    }

    // Create enhanced transcript data object with parsed fields
    const enhancedTranscriptData: TranscriptData = {
      ...transcriptData,
      tcKimlikNo,
      ogrenciNo,
      program,
      egitimDuzeyi,
      egitimDili,
      mezuniyetTarihi,
      kayitSekli,
      kayitTarihi: registrationDate,
      gpa,
      totalCredits,
      faculty,
      studentId: transcriptData.studentId || ogrenciNo,
    };

    // Process the complete student creation (User + Student + TranscriptData)
    const studentCreated = await processCompleteTranscriptApi(
      enhancedTranscriptData
    );

    return {
      transcriptData: enhancedTranscriptData,
      studentCreated,
    };
  } catch (error) {
    console.error("Failed to submit parsed transcript data:", error);
    throw new ServiceError("Failed to submit parsed transcript data");
  }
};
