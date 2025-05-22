import { useState, useEffect, useCallback } from "react";
import type { StudentRanking } from "../services/types";
import {
  getStudentRankingsApi,
  updateStudentRankingApi,
  reorderStudentRankingsApi,
} from "../services/api/studentRankingsApi";

interface UseStudentRankingsReturn {
  rankings: StudentRanking[];
  loading: boolean;
  error: string | null;
  fetchRankings: (department: string) => Promise<void>;
  updateRanking: (student: StudentRanking) => Promise<void>;
  reorderRankings: (rankings: StudentRanking[]) => Promise<void>;
  setLocalRankings: (rankings: StudentRanking[]) => void;
}

export const useStudentRankings = (): UseStudentRankingsReturn => {
  const [rankings, setRankings] = useState<StudentRanking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = useCallback(async (department: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudentRankingsApi(department);
      setRankings(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch student rankings"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRanking = useCallback(async (student: StudentRanking) => {
    try {
      const updatedStudent = await updateStudentRankingApi(student);
      setRankings((prev) =>
        prev.map((ranking) =>
          ranking.id === updatedStudent.id ? updatedStudent : ranking
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update student ranking"
      );
    }
  }, []);

  const reorderRankings = useCallback(async (newRankings: StudentRanking[]) => {
    try {
      const updatedRankings = await reorderStudentRankingsApi(newRankings);
      setRankings(updatedRankings);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reorder student rankings"
      );
      // Revert to original state on error
      throw err;
    }
  }, []);

  const setLocalRankings = useCallback((newRankings: StudentRanking[]) => {
    setRankings(newRankings);
  }, []);

  return {
    rankings,
    loading,
    error,
    fetchRankings,
    updateRanking,
    reorderRankings,
    setLocalRankings,
  };
};
