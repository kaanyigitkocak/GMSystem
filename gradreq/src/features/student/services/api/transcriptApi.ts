import type { TranscriptData } from "../types";
import { getServiceConfig } from "../utils/serviceUtils";

const { apiBaseUrl } = getServiceConfig();

// Get transcript data
export const getTranscriptApi = async (): Promise<TranscriptData> => {
  throw new Error("Not implemented");
};
