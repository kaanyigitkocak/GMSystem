import type {
  Student,
  CourseTaken,
  EligibilityCheckResult,
  StudentEligibilityStatus,
} from "../types"; // This might be unused now, will check after removing functions
// import { getServiceConfig } from "../utils/serviceUtils"; // Likely unused
// import {
//   handleApiResponse,
//   ServiceError,
// } from "../../../common/utils/serviceUtils"; // Likely unused
// import { getUserFromAuthApi } from "./usersApi"; // Likely unused
// import { getEnvironmentConfig } from "../../../../core/utils/environment"; // Likely unused
// import { executeWithRetry, executeWithRateLimit } from "../../../common/utils/rateLimitUtils"; // Likely unused
// import type { UserFromAuth } from "./usersApi"; // Likely unused

// Get service configuration - MOVED or UNUSED
// const { apiBaseUrl, fetchOptions } = getServiceConfig();

// All functions and constants have been moved to:
// - advisorStudentDataApi.ts
// - advisorStudentCourseApi.ts
// - advisorStudentEligibilityApi.ts

// This file can be removed or used for re-exporting from the new files.
// For now, leaving it with an empty export to satisfy TypeScript module system.
export {};
