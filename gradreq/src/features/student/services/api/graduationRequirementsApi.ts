import type { GraduationRequirementsData } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";

const { apiBaseUrl } = getServiceConfig();

// Get graduation requirements data
export const getGraduationRequirementsApi =
  async (): Promise<GraduationRequirementsData> => {
    throw new Error("Not implemented");
  };
