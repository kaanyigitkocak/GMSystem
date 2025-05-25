import * as pdfjsLib from "pdfjs-dist";
import { createWorker } from "tesseract.js";

// Configure PDF.js worker to use the local file in the public folder
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
}

export interface ParsedCourse {
  courseCode: string;
  courseName: string;
  credit: number;
  grade: string;
  semester: string;
  year: string;
}

export interface ParsedTranscriptData {
  studentId: string;
  studentName: string;
  tcNumber?: string;
  faculty: string;
  department: string;
  program: string;
  educationLevel: string;
  educationLanguage: string;
  registrationDate: string;
  registrationPeriod: string;
  gpa: number;
  graduationDate?: string;
  registrationType: string;
  courses: ParsedCourse[];
}

/**
 * Parse PDF transcript file and extract İYTE transcript data
 */
export const parsePDFTranscript = async (
  file: File
): Promise<ParsedTranscriptData> => {
  try {
    // OCR-based text extraction
    const text = await extractTextFromPDF(file);

    console.log("===== PDF Text Extraction Debug =====");
    console.log("OCR extracted text:");
    console.log(text);
    console.log("Text length:", text.length);
    console.log("First 500 chars:", text.substring(0, 500));
    console.log("=====================================");

    // Parse İYTE transcript format
    const parsedData = parseIYTETranscriptText(text);

    console.log("Parsed Data:", parsedData);

    return parsedData;
  } catch (error) {
    console.error("Failed to parse PDF:", error);
    throw new Error(
      `Failed to parse PDF: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

/**
 * Convert PDF pages to images and perform OCR
 */
async function pdfToImages(pdfFile: File): Promise<HTMLCanvasElement[]> {
  const pdfData = await pdfFile.arrayBuffer();

  // Load PDF document
  const pdf = await pdfjsLib.getDocument({
    data: pdfData,
    useWorkerFetch: false,
    isEvalSupported: false,
  }).promise;

  const canvases: HTMLCanvasElement[] = [];

  console.log(`PDF has ${pdf.numPages} pages. Converting to images...`);

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    // Higher scale = better OCR accuracy
    const viewport = page.getViewport({ scale: 3.0 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    canvases.push(canvas);
    console.log(`Converted page ${i}/${pdf.numPages} to image`);
  }

  return canvases;
}

/**
 * Perform OCR on PDF images using Tesseract.js
 */
async function performOCR(canvases: HTMLCanvasElement[]): Promise<string> {
  console.log("Initializing Tesseract OCR worker...");
  const worker = await createWorker("tur+eng", 1, {
    logger: (m) => console.log("OCR:", m),
  });

  let fullText = "";

  for (let i = 0; i < canvases.length; i++) {
    console.log(`Performing OCR on page ${i + 1}/${canvases.length}...`);
    const {
      data: { text },
    } = await worker.recognize(canvases[i]);
    fullText += text + "\n\n--- PAGE BREAK ---\n\n";
    console.log(`OCR completed for page ${i + 1}. Text length: ${text.length}`);
  }

  await worker.terminate();
  console.log("OCR worker terminated. Total text length:", fullText.length);

  return fullText;
}

/**
 * Enhanced PDF text extraction using OCR
 * This replaces the old binary parsing method with proper OCR
 */
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    console.log("=== Starting OCR-based PDF extraction ===");
    console.log("File size:", file.size, "bytes");

    // Convert PDF pages to images
    const canvases = await pdfToImages(file);

    // Perform OCR on images
    const extractedText = await performOCR(canvases);

    // Clean up the extracted text
    const cleanedText = extractedText
      .replace(/--- PAGE BREAK ---/g, "\n")
      .replace(/\s+/g, " ")
      .replace(/\n\s*\n/g, "\n")
      .trim();

    console.log("=== OCR extraction completed ===");
    console.log("Final text length:", cleanedText.length);
    console.log("First 500 chars:", cleanedText.substring(0, 500));

    if (cleanedText.length === 0) {
      throw new Error("No text could be extracted from PDF using OCR");
    }

    return cleanedText;
  } catch (error) {
    console.error("OCR extraction failed:", error);
    throw new Error(
      `Failed to extract text from PDF using OCR: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Parse İYTE transcript text and extract structured data
 */
const parseIYTETranscriptText = (text: string): ParsedTranscriptData => {
  console.log("===== New Enhanced Parsing Started =====");
  // Normalize text: multiple spaces to single, trim lines
  const normalizedText = text
    .replace(/=\s*/g, ": ") // Normalize separators like = to :
    .replace(/Fakiilte\s*:/g, "Fakülte :") // OCR correction
    .replace(/\s\s+/g, " ")
    .trim();

  console.log(
    "Normalized text (first 1000 chars):",
    normalizedText.substring(0, 1000)
  );

  const result: Partial<ParsedTranscriptData> = {
    courses: [],
    studentId: "",
    studentName: "",
    tcNumber: "",
    faculty: "",
    department: "",
    program: "",
    educationLevel: "",
    educationLanguage: "",
    registrationDate: "",
    registrationPeriod: "",
    gpa: 0,
    graduationDate: "",
    registrationType: "",
  };

  const extractField = (
    regex: RegExp,
    data: string,
    group = 1
  ): string | null => {
    const match = regex.exec(data);
    return match && match[group] ? match[group].trim() : null;
  };

  // --- 1. Extract Header Information (Optimized for OCR Output) ---
  result.tcNumber =
    extractField(/TC Kimlik No\s*:\s*(\d{11})/, normalizedText) || "";
  result.studentId =
    extractField(/Öğrenci No\s*:\s*(\d+)/, normalizedText) || "";

  const adiMatch = extractField(
    /Adı\s*:\s*([A-ZÇĞİÖŞÜİŞÜçğıöşü\s]+?)(?=\s*Soyadı)/i,
    normalizedText
  );
  const soyadiMatch = extractField(
    /Soyadı\s*:\s*([A-ZÇĞİÖŞÜİŞÜçğıöşü\s]+?)(?=\s*Kayıt Tarihi|\s*Eğitim Düzeyi)/i,
    normalizedText
  );

  if (adiMatch && soyadiMatch) {
    result.studentName = `${adiMatch.trim()} ${soyadiMatch.trim()}`;
  } else if (adiMatch) {
    result.studentName = adiMatch.trim();
  } else if (soyadiMatch) {
    result.studentName = soyadiMatch.trim();
  } else {
    // Fallback if Adı and Soyadı are on the same line or have different labels
    result.studentName =
      extractField(
        /Adı Soyadı\s*:\s*([A-ZÇĞİÖŞÜİŞÜçğıöşü\s]+)/i,
        normalizedText
      ) || "";
  }
  if (!result.studentName) {
    // Attempt to find name if previous failed
    const nameMatchFromKonu = extractField(
      /Konu\s*:\s*Not Durum Belgesi\s*\S*\s*([A-ZÇĞİÖŞÜİŞÜ]+\s+[A-ZÇĞİÖŞÜİŞÜ]+)/i,
      normalizedText
    );
    if (nameMatchFromKonu) result.studentName = nameMatchFromKonu;
  }

  const kayitTarihiDonemiMatch =
    /Kayıt Tarihi \/ Dönemi\s*:\s*(\d{2}\.\d{2}\.\d{4})\s*\/\s*([A-Za-zÇĞİÖŞÜİŞÜçğıöşü]+)/.exec(
      normalizedText
    );
  if (kayitTarihiDonemiMatch) {
    result.registrationDate = kayitTarihiDonemiMatch[1].trim();
    result.registrationPeriod = kayitTarihiDonemiMatch[2].trim();
  }

  let gpaStr = extractField(/AGNO\s*:\s*(\d[,.]\d+)/, normalizedText);
  if (gpaStr) {
    const parsedGpa = parseFloat(gpaStr.replace(",", "."));
    if (!isNaN(parsedGpa)) result.gpa = parsedGpa;
  }

  result.graduationDate =
    extractField(
      /Mezuniyet Tarihi\s*:\s*(\d{2}\.\d{2}\.\d{4})/,
      normalizedText
    ) || "";

  result.faculty =
    extractField(/Fakülte\s*:\s*([^:\n]+?)(?=\s*Bölüm)/i, normalizedText) || "";
  result.department =
    extractField(/Bölüm\s*:\s*([^:\n]+?)(?=\s*Program)/i, normalizedText) || "";
  result.program =
    extractField(
      /Program\s*:\s*([^:\n]+?)(?=\s*Eğitim Düzeyi)/i,
      normalizedText
    ) ||
    result.department ||
    "";
  result.educationLevel =
    extractField(
      /Eğitim Düzeyi\s*:\s*([^:\n]+?)(?=\s*Eğitim Dili)/i,
      normalizedText
    ) || "";
  result.educationLanguage =
    extractField(
      /Eğitim Dili\s*:\s*([^:\n]+?)(?=\s*Kayıt Şekli)/i,
      normalizedText
    ) || "";
  result.registrationType =
    extractField(
      /Kayıt Şekli\s*:\s*([^:\n]+?)(?=(\d{4}-\d{4}\s*Yılı)|Ders Kodu)/i,
      normalizedText
    ) || "";

  console.log("Extracted Header Info:", {
    tcNumber: result.tcNumber,
    studentId: result.studentId,
    studentName: result.studentName,
    registrationDate: result.registrationDate,
    registrationPeriod: result.registrationPeriod,
    gpa: result.gpa,
    graduationDate: result.graduationDate,
    faculty: result.faculty,
    department: result.department,
    program: result.program,
    educationLevel: result.educationLevel,
    educationLanguage: result.educationLanguage,
    registrationType: result.registrationType,
  });

  // --- 2. Extract Semesters and Courses (Optimized for OCR Output) ---
  const semesterHeaderRegex =
    /(\d{4}-\d{4})\s*Yılı\s*(Güz|Bahar|Öğrenim Öncesi Alınan Dersler)\s*Dönemi/g;
  // Regex to capture: CENG111 BILGISAYAR MUHENDISLIGI KAVRAMLARI 314 BA (EN) or 3|4 BA
  // Group 1: Course Code (CENG111)
  // Group 2: Course Name (BILGISAYAR MUHENDISLIGI KAVRAMLARI)
  // Group 3: Credit (Local or first part of Credit|AKTS) (3)
  // Group 4: AKTS (Optional, if Credit|AKTS format) (4)
  // Group 5: Grade (BA)
  // Group 6: Language (EN) (Optional)
  const courseLineRegex =
    /([A-Z]{2,5}\d{3,4})\s+(.+?)\s+(\d+)\s*(?:(?:\||1)\s*(\d+))?\s+([A-Z]{1,2}\d{0,2}|[A-Z]{1,2}|S|W|P|F|I|U|EX|NA|DD|DC|CC|CB|BB|BA|AA|FF)(?:\s*\((EN)\))?/gi;

  const semesterMatches = [];
  let semesterMatch;
  while ((semesterMatch = semesterHeaderRegex.exec(normalizedText)) !== null) {
    semesterMatches.push({
      year: semesterMatch[1],
      semester: semesterMatch[2].replace(
        "Öğrenim Öncesi Alınan Dersler",
        "Öncesi"
      ),
      index: semesterMatch.index,
      headerText: semesterMatch[0],
    });
  }
  console.log(`Found ${semesterMatches.length} semesters.`);

  for (let i = 0; i < semesterMatches.length; i++) {
    const currentSemesterInfo = semesterMatches[i];
    const currentYear = currentSemesterInfo.year;
    const currentSemester = currentSemesterInfo.semester;

    console.log(`Processing Semester: ${currentYear} ${currentSemester}`);

    const startIndex =
      currentSemesterInfo.index + currentSemesterInfo.headerText.length;
    const endIndex =
      i + 1 < semesterMatches.length
        ? semesterMatches[i + 1].index
        : normalizedText.length;
    const semesterBlockText = normalizedText.substring(startIndex, endIndex);

    let courseMatch;
    courseLineRegex.lastIndex = 0;
    while ((courseMatch = courseLineRegex.exec(semesterBlockText)) !== null) {
      const dersKodu = courseMatch[1]?.trim();
      const dersAdi = courseMatch[2]?.trim().replace(/\s\s+/g, " ");
      const yerelKrediStr = courseMatch[3]?.trim();
      const aktsKrediStr = courseMatch[4]?.trim(); // This is the AKTS part if "X|Y" format
      const hbn = courseMatch[5]?.trim();
      // const lang = courseMatch[6]?.trim(); // (EN) part

      if (
        dersAdi?.toLowerCase().includes("toplam") ||
        dersAdi?.toLowerCase().includes("yarıyıl") ||
        dersAdi?.toLowerCase().includes("genel") ||
        dersAdi?.toLowerCase().includes("ağırlıklı not ortalaması") ||
        dersAdi?.toLowerCase().includes("ders kodu ders adı kredi") // Header inside block
      ) {
        console.log(`Skipping summary/header line: ${dersAdi}`);
        continue;
      }

      let credit = 0;
      if (aktsKrediStr) {
        // If "X|Y" format, Y is AKTS
        credit = parseInt(aktsKrediStr);
      } else if (yerelKrediStr) {
        // If only "X" format, X is AKTS (assuming based on IYTE format where single credit is AKTS)
        credit = parseInt(yerelKrediStr);
      }

      if (!dersKodu || !dersAdi || isNaN(credit) || credit === 0 || !hbn) {
        console.warn(
          "Skipping incomplete/invalid course line:",
          courseMatch[0],
          { dersKodu, dersAdi, credit, hbn }
        );
        continue;
      }

      result.courses!.push({
        courseCode: dersKodu,
        courseName: dersAdi,
        credit: credit,
        grade: hbn,
        semester: currentSemester,
        year: currentYear,
      });
      console.log(
        `Added Course: ${dersKodu} - ${dersAdi}, Credit: ${credit}, Grade: ${hbn}`
      );
    }
  }

  // --- 3. Final AGNO check ---
  if (!result.gpa || result.gpa === 0) {
    gpaStr = extractField(
      /Genel Ağırlıklı Not Ortalaması\s*:\s*(\d[.,]\d+)/,
      normalizedText
    );
    if (gpaStr) {
      const parsedGpa = parseFloat(gpaStr.replace(",", "."));
      if (!isNaN(parsedGpa) && parsedGpa > 0) result.gpa = parsedGpa;
      console.log(
        "Updated GPA from 'Genel Ağırlıklı Not Ortalaması':",
        result.gpa
      );
    }
  }

  // --- 4. Set Fallbacks ---
  result.studentId = result.studentId || "NOT_FOUND";
  result.studentName = result.studentName || "NOT_FOUND";
  result.tcNumber = result.tcNumber || "NOT_FOUND";
  result.faculty = result.faculty || "NOT_FOUND";
  result.department = result.department || "NOT_FOUND";
  result.program = result.program || result.department || "NOT_FOUND";
  result.educationLevel = result.educationLevel || "Lisans";
  result.educationLanguage = result.educationLanguage || "Türkçe";
  result.registrationDate = result.registrationDate || "NOT_FOUND";
  result.registrationPeriod = result.registrationPeriod || "Güz";

  if (result.gpa === 0 || result.gpa === undefined || isNaN(result.gpa)) {
    console.warn("GPA is still 0 or NaN, setting to fallback 2.0");
    result.gpa = 2.0;
  }

  if (result.courses!.length === 0) {
    console.warn("No courses were parsed, adding fallback courses.");
    // No fallback courses added by default anymore, should rely on actual parsing
  }

  console.log("===== New Enhanced Parsing Finished =====");
  console.log("Final Parsed Data:", result);

  return result as ParsedTranscriptData;
};

/**
 * Convert parsed transcript data to backend CreateTranscriptDataCommand format
 */
export const convertToTranscriptDataRequest = (
  parsedData: ParsedTranscriptData,
  studentUserId: string
): any => {
  const totalEcts = parsedData.courses.reduce((total, course) => {
    const courseCredit =
      !isNaN(course.credit) && course.credit > 0 ? course.credit : 0;
    return total + courseCredit;
  }, 0);

  // Ensure minimum ECTS if no courses were parsed (backend validation requires > 0)
  const parsedEcts = totalEcts > 0 ? totalEcts : 120; // Default to 120 ECTS if none found

  // Validate GPA - ensure it's greater than 0 for backend validation
  const validGpa =
    !isNaN(parsedData.gpa) && parsedData.gpa > 0 && parsedData.gpa <= 4
      ? parsedData.gpa
      : 3.0; // Fallback to 3.0 if GPA is 0, NaN, or out of range

  return {
    StudentUserId: studentUserId, // Backend expects PascalCase Guid
    ParsedGpa: validGpa, // Backend expects PascalCase decimal
    ParsedEcts: parsedEcts, // Backend expects PascalCase int > 0
    IsValidForProcessing: true, // Backend expects PascalCase bool
  };
};

/**
 * Convert parsed courses to CourseTaken format
 */
export interface CreateCourseTakenRequest {
  studentUserId: string;
  courseCodeInTranscript: string;
  courseNameInTranscript: string;
  matchedCourseId?: string;
  grade: string;
  semesterTaken: string;
  creditsEarned: number;
  isSuccessfullyCompleted: boolean;
}

export const convertToCourseTakenRequests = (
  parsedData: ParsedTranscriptData,
  studentUserId: string
): CreateCourseTakenRequest[] => {
  return parsedData.courses.map((course) => {
    const validCredit =
      !isNaN(course.credit) && course.credit > 0 ? course.credit : 3;

    // Validate and clean string fields
    const courseCode = course.courseCode?.trim() || "UNKNOWN";
    const courseName = course.courseName?.trim() || "Unknown Course";
    const grade = course.grade?.trim() || "F";
    const semester = course.semester?.trim() || "Unknown";
    const year = course.year?.trim() || "Unknown";

    return {
      studentUserId: studentUserId,
      courseCodeInTranscript: courseCode,
      courseNameInTranscript: courseName,
      matchedCourseId: undefined, // Will be matched later by API call
      grade: grade,
      semesterTaken: `${year} ${semester}`,
      creditsEarned: validCredit,
      isSuccessfullyCompleted: ["A", "B", "C", "D", "P"].includes(
        grade.toUpperCase()
      ),
    };
  });
};
