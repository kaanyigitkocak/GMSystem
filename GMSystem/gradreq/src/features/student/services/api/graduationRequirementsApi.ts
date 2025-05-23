import type { GraduationRequirementsData } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";
import { handleApiResponse } from "../../../../features/common/utils/serviceUtils";

const { apiBaseUrl, fetchOptions } = getServiceConfig();

// Get graduation requirements data
export const getGraduationRequirementsApi =
  async (): Promise<GraduationRequirementsData> => {
    const response = await fetch(
      `${apiBaseUrl}/student/graduation-requirements`,
      {
        method: "GET",
        ...fetchOptions,
      }
    );

    return handleApiResponse<GraduationRequirementsData>(response);
  };

// Report missing files to advisor
export const reportMissingFilesApi = async (
  message: string
): Promise<{ success: boolean }> => {
  const response = await fetch(`${apiBaseUrl}/student/report-missing-files`, {
    method: "POST",
    ...fetchOptions,
    body: JSON.stringify({ message }),
  });

  return handleApiResponse<{ success: boolean }>(response);
};
