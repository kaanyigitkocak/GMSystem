import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import type { Student } from "../services/types"; // Used in function signatures
import {
  getFacultyStudentsWithEligibilityApi,
  setDeansOfficeApprovedApi,
  setDeansOfficeRejectedApi,
  clearDeansOfficeEligibilityCache,
  getDeanFacultyInfo,
  performFacultyEligibilityChecksForMissingStudentsApi,
  getStudentCourseTakensApi,
} from "../services/api/studentsApi";

// Query Keys
export const studentKeys = {
  all: ["students"] as const,
  faculty: (facultyId: string) =>
    [...studentKeys.all, "faculty", facultyId] as const,
  eligibility: (facultyId: string) =>
    [...studentKeys.faculty(facultyId), "eligibility"] as const,
  transcript: (studentId: string) =>
    [...studentKeys.all, "transcript", studentId] as const,
};

// Hook for getting dean faculty info
export const useDeanFacultyInfo = () => {
  return useQuery({
    queryKey: ["dean", "faculty", "info"],
    queryFn: getDeanFacultyInfo,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for fetching students with eligibility
export const useStudentsWithEligibility = (facultyId?: string) => {
  return useQuery({
    queryKey: studentKeys.eligibility(facultyId || "default"),
    queryFn: () => getFacultyStudentsWithEligibilityApi(facultyId),
    enabled: !!facultyId,
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter for real-time updates)
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true, // Refetch when user comes back to tab
  });
};

// Hook for fetching student transcript
export const useStudentTranscript = (studentId?: string) => {
  return useQuery({
    queryKey: studentKeys.transcript(studentId || ""),
    queryFn: () => getStudentCourseTakensApi(studentId!),
    enabled: !!studentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook for approving students
export const useApproveStudents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      studentUserIds,
      deansOfficeUserId,
    }: {
      studentUserIds: string[];
      deansOfficeUserId: string;
    }) => {
      return setDeansOfficeApprovedApi(studentUserIds, deansOfficeUserId);
    },

    onSuccess: () => {
      // Invalidate all student queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: studentKeys.all });
    },

    onError: (error: any) => {
      console.error("Failed to approve students:", error);
    },
  });
};

// Hook for rejecting students
export const useRejectStudents = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      studentUserIds,
      deansOfficeUserId,
      rejectionReason,
    }: {
      studentUserIds: string[];
      deansOfficeUserId: string;
      rejectionReason?: string;
    }) => {
      return setDeansOfficeRejectedApi(
        studentUserIds,
        deansOfficeUserId,
        rejectionReason
      );
    },

    onSuccess: () => {
      // Invalidate all student queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: studentKeys.all });
    },

    onError: (error: any) => {
      console.error("Failed to reject students:", error);
    },
  });
};

// Hook for performing eligibility checks
export const usePerformEligibilityChecks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (facultyId: string) => {
      return performFacultyEligibilityChecksForMissingStudentsApi(facultyId);
    },

    onSuccess: (_, facultyId) => {
      // Invalidate student queries for this faculty after a delay
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: studentKeys.eligibility(facultyId),
        });
      }, 2000);
    },

    onError: (error: any) => {
      console.error("Failed to perform eligibility checks:", error);
    },
  });
};

// Hook for clearing cache
export const useClearStudentCache = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (facultyId?: string) => {
      return clearDeansOfficeEligibilityCache(facultyId);
    },

    onSuccess: (_, facultyId) => {
      // Clear React Query cache as well
      if (facultyId) {
        queryClient.invalidateQueries({
          queryKey: studentKeys.eligibility(facultyId),
        });
        queryClient.removeQueries({
          queryKey: studentKeys.eligibility(facultyId),
        });
      } else {
        queryClient.invalidateQueries({ queryKey: studentKeys.all });
        queryClient.removeQueries({ queryKey: studentKeys.all });
      }
    },
  });
};
