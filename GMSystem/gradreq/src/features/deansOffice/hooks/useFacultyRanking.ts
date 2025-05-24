// As per CODING_GUIDELINES.md: camelCase.ts for TS files.
import { useState, useCallback, useEffect } from "react";
import type {
  StudentRecord,
  UniversityRankingResult,
  ApprovalAction,
  FilterOptions,
  SortOptions,
  TranscriptReview,
} from "../types";

export const useFacultyRanking = () => {
  const [universityRanking, setUniversityRanking] =
    useState<UniversityRankingResult | null>(null);
  const [filteredRankings, setFilteredRankings] = useState<StudentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "rank",
    direction: "asc",
  });

  // Fetch university ranking data
  const fetchUniversityRanking = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await universityRankingService.getRanking();

      // Mock data for now
      const mockData: UniversityRankingResult = {
        rankings: [
          {
            id: "1",
            studentId: "20201001",
            name: "Ali",
            surname: "Veli",
            department: "Computer Engineering",
            faculty: "Faculty of Engineering",
            gpa: 3.95,
            totalCredits: 240,
            completedCredits: 238,
            rank: 1,
            graduationEligible: true,
            transcriptStatus: "pending",
            submissionDate: "2024-01-15",
          },
          {
            id: "2",
            studentId: "20201002",
            name: "Ayşe",
            surname: "Kaya",
            department: "Electronics Engineering",
            faculty: "Faculty of Engineering",
            gpa: 3.87,
            totalCredits: 240,
            completedCredits: 240,
            rank: 2,
            graduationEligible: true,
            transcriptStatus: "approved",
            submissionDate: "2024-01-10",
            reviewDate: "2024-01-12",
            reviewNote: "All requirements met.",
          },
        ],
        metadata: {
          totalStudents: 150,
          pendingReviews: 45,
          approvedStudents: 89,
          rejectedStudents: 16,
          lastUpdated: new Date().toISOString(),
        },
      };

      setUniversityRanking(mockData);
      setFilteredRankings(mockData.rankings);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch university ranking"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply filters and sorting
  const applyFiltersAndSort = useCallback(() => {
    if (!universityRanking) return;

    let filtered = [...universityRanking.rankings];

    // Apply filters
    if (filters.faculty) {
      filtered = filtered.filter(
        (student) => student.faculty === filters.faculty
      );
    }
    if (filters.department) {
      filtered = filtered.filter(
        (student) => student.department === filters.department
      );
    }
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter(
        (student) => student.transcriptStatus === filters.status
      );
    }
    if (typeof filters.minGpa === "number") {
      filtered = filtered.filter((student) => student.gpa >= filters.minGpa!);
    }
    if (typeof filters.maxGpa === "number") {
      filtered = filtered.filter((student) => student.gpa <= filters.maxGpa!);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortOptions.field];
      let bValue: any = b[sortOptions.field];

      if (sortOptions.field === "name") {
        aValue = `${a.name} ${a.surname}`;
        bValue = `${b.name} ${b.surname}`;
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOptions.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredRankings(filtered);
  }, [universityRanking, filters, sortOptions]);

  // Handle transcript approval/rejection
  const handleTranscriptAction = useCallback(
    async (action: ApprovalAction) => {
      setIsLoading(true);
      setError(null);

      try {
        // TODO: Replace with actual API call
        // await transcriptService.updateStatus(action);

        // Update local state
        if (universityRanking) {
          const updatedRankings = universityRanking.rankings.map((student) => {
            if (student.studentId === action.studentId) {
              return {
                ...student,
                transcriptStatus:
                  action.action === "approve"
                    ? ("approved" as const)
                    : ("rejected" as const),
                reviewDate: new Date().toISOString(),
                reviewNote: action.note || "",
              };
            }
            return student;
          });

          const updatedMetadata = {
            ...universityRanking.metadata,
            pendingReviews: universityRanking.metadata.pendingReviews - 1,
            approvedStudents:
              action.action === "approve"
                ? universityRanking.metadata.approvedStudents + 1
                : universityRanking.metadata.approvedStudents,
            rejectedStudents:
              action.action === "reject"
                ? universityRanking.metadata.rejectedStudents + 1
                : universityRanking.metadata.rejectedStudents,
            lastUpdated: new Date().toISOString(),
          };

          setUniversityRanking({
            rankings: updatedRankings,
            metadata: updatedMetadata,
          });
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to update transcript status"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [universityRanking]
  );

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Update sort options
  const updateSort = useCallback((newSort: Partial<SortOptions>) => {
    setSortOptions((prev) => ({ ...prev, ...newSort }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  // Initial fetch
  useEffect(() => {
    fetchUniversityRanking();
  }, [fetchUniversityRanking]);

  return {
    universityRanking,
    filteredRankings,
    isLoading,
    error,
    filters,
    sortOptions,
    fetchUniversityRanking,
    handleTranscriptAction,
    updateFilters,
    updateSort,
    clearFilters,
  };
};
