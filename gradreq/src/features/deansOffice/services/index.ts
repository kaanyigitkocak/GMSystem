import { getServiceConfig } from "./utils/serviceUtils";

// Import API services
import {
  getFacultyRankingsApi,
  processDepartmentFilesApi,
  processCSVFilesApi,
  exportFacultyRankingsToCSVApi,
  generateValidationSummaryApi,
} from "./api/deansOfficeApi";

// Import mock services
import {
  getFacultyRankingsMock,
  processDepartmentFilesMock,
  processCSVFilesMock,
  exportFacultyRankingsToCSVMock,
  generateValidationSummaryMock,
} from "./mock/deansOfficeMock";

// Import types
import type {
  StudentRanking,
  RankingMetadata,
  UploadedFile,
  ValidationSummary,
  FileValidationResult,
} from "./types";

// Get service configuration
const { useMock } = getServiceConfig();

/**
 * Get faculty-wide student rankings
 */
export const getFacultyRankings = async (): Promise<{
  rankings: StudentRanking[];
  metadata: RankingMetadata;
}> => {
  if (useMock) {
    return getFacultyRankingsMock();
  }
  return getFacultyRankingsApi();
};

/**
 * Process uploaded department ranking files
 */
export const processDepartmentFiles = async (
  files: File[]
): Promise<FileValidationResult> => {
  if (useMock) {
    return processDepartmentFilesMock(files);
  }
  return processDepartmentFilesApi(files);
};

/**
 * Process CSV files and extract UploadedFile objects
 */
export const processCSVFiles = (selectedFiles: File[]): UploadedFile[] => {
  if (useMock) {
    return processCSVFilesMock(selectedFiles);
  }
  return processCSVFilesApi(selectedFiles);
};

/**
 * Export faculty rankings to CSV
 */
export const exportFacultyRankingsToCSV = async (): Promise<boolean> => {
  if (useMock) {
    return exportFacultyRankingsToCSVMock();
  }
  return exportFacultyRankingsToCSVApi();
};

/**
 * Generate a validation summary from uploaded files
 */
export const generateValidationSummary = (
  files: UploadedFile[]
): ValidationSummary => {
  if (useMock) {
    return generateValidationSummaryMock(files);
  }
  return generateValidationSummaryApi(files);
};
