import type {
  StudentRanking,
  RankingMetadata,
  UploadedFile,
  ValidationSummary,
  FileValidationResult,
} from "../types";
import { getServiceConfig } from "../utils/serviceUtils";

const { apiBaseUrl: _apiBaseUrl } = getServiceConfig();

/**
 * Get faculty-wide student rankings
 */
export const getFacultyRankingsApi = async (): Promise<{
  rankings: StudentRanking[];
  metadata: RankingMetadata;
}> => {
  throw new Error("Not implemented");
};

/**
 * Process uploaded department ranking files
 */
export const processDepartmentFilesApi = async (
  _files: File[]
): Promise<FileValidationResult> => {
  throw new Error("Not implemented");
};

/**
 * Process CSV files and extract UploadedFile objects
 */
export const processCSVFilesApi = (): UploadedFile[] => {
  throw new Error("Not implemented");
};

/**
 * Export faculty rankings to CSV
 */
export const exportFacultyRankingsToCSVApi = async (): Promise<boolean> => {
  throw new Error("Not implemented");
};

/**
 * Generate a validation summary from uploaded files
 */
export const generateValidationSummaryApi = (): ValidationSummary => {
  throw new Error("Not implemented");
};
