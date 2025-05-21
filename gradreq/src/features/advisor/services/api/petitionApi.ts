import type { PetitionData, PetitionResult, PetitionStudent } from "../types";

// API function to get students for petition
export const getStudentsForPetitionApi = async (): Promise<
  PetitionStudent[]
> => {
  throw new Error("Not implemented");
};

// API function to create a petition
export const createPetitionApi = async (
  petitionData: PetitionData
): Promise<PetitionResult> => {
  throw new Error("Not implemented");
};
