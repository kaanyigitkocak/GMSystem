// As per CODING_GUIDELINES.md: camelCase.ts for TS files.
import { useState, useCallback, useEffect } from "react";
import type {
  StudentRecord,
  UniversityRankingResult,
  ApprovalAction,
  FilterOptions,
  SortOptions,
} from "../types";
import { getFacultyRankings } from "../services"; // Import the service
import type { StudentRanking } from "../services/types"; // Import service types

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
      const serviceData = await getFacultyRankings();

      const transformedRankings: StudentRecord[] = serviceData.rankings.map(
        (sr: StudentRanking): StudentRecord => ({
          id: sr.id,
          studentId: sr.studentId,
          name: sr.name?.split(" ")[0] || "", // Use sr.name
          surname: sr.name?.split(" ").slice(1).join(" ") || "", // Use sr.name
          department: sr.department,
          faculty: sr.faculty, // StudentRanking now has faculty
          gpa: sr.gpa,
          totalCredits: sr.credits, // Map from sr.credits
          completedCredits: sr.credits, // Assuming completedCredits is same as total credits from service type
          rank: sr.rank,
          graduationEligible: sr.graduationEligible, // StudentRanking now has graduationEligible
          transcriptStatus: "pending", // Placeholder - service type doesn't have this
          submissionDate: new Date().toISOString(), // Placeholder - service type doesn't have this
        })
      );

      const transformedData: UniversityRankingResult = {
        rankings: transformedRankings,
        metadata: {
          totalStudents: serviceData.metadata.totalStudents || 0,
          pendingReviews: 0, // Placeholder - RankingMetadata doesn't have this
          approvedStudents: serviceData.metadata.eligibleStudents || 0, // Map from eligibleStudents
          rejectedStudents:
            (serviceData.metadata.totalStudents || 0) -
            (serviceData.metadata.eligibleStudents || 0), // Calculate based on total and eligible
          lastUpdated: serviceData.metadata.lastUpdated.toISOString(), // Convert Date to string
        },
      };

      setUniversityRanking(transformedData);
      setFilteredRankings(transformedData.rankings);
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
