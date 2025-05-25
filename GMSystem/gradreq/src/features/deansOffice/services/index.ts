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

/**
 * Get faculty-wide student rankings
 */
export const getFacultyRankings = async (): Promise<{
  rankings: StudentRanking[];
  metadata: RankingMetadata;
}> => {
  const { useMock } = getServiceConfig();
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
  const { useMock } = getServiceConfig();
  if (useMock) {
    return processDepartmentFilesMock(files);
  }
  return processDepartmentFilesApi(files);
};

/**
 * Process CSV files and extract UploadedFile objects
 */
export const processCSVFiles = (selectedFiles: File[]): UploadedFile[] => {
  const { useMock } = getServiceConfig();
  if (useMock) {
    return processCSVFilesMock(selectedFiles);
  }
  return processCSVFilesApi();
};

/**
 * Export faculty rankings to CSV
 */
export const exportFacultyRankingsToCSV = async (): Promise<boolean> => {
  const { useMock } = getServiceConfig();
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
  const { useMock } = getServiceConfig();
  if (useMock) {
    return generateValidationSummaryMock(files);
  }
  return generateValidationSummaryApi();
};

// Export types for external use
export type {
  StudentRanking,
  RankingMetadata,
  UploadedFile,
  ValidationSummary,
  FileValidationResult,
} from "./types";
