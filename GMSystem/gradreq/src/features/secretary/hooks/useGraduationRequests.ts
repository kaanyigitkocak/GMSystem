import { useState, useEffect, useCallback } from "react";
import type { GraduationRequest } from "../services/types";
import {
  getGraduationRequestsApi,
  updateGraduationRequestStatusApi,
} from "../services/api/graduationRequestsApi";

interface UseGraduationRequestsReturn {
  requests: GraduationRequest[];
  loading: boolean;
  error: string | null;
  fetchRequests: () => Promise<void>;
  updateRequestStatus: (
    id: string,
    status: string,
    notes?: string
  ) => Promise<void>;
  clearError: () => void;
}

export const useGraduationRequests = (): UseGraduationRequestsReturn => {
  const [requests, setRequests] = useState<GraduationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGraduationRequestsApi();
      setRequests(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch graduation requests"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRequestStatus = useCallback(
    async (id: string, status: string, notes?: string) => {
      try {
        const updatedRequest = await updateGraduationRequestStatusApi(
          id,
          status,
          notes
        );
        setRequests((prev) =>
          prev.map((request) => (request.id === id ? updatedRequest : request))
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to update graduation request status"
        );
        throw err;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    fetchRequests,
    updateRequestStatus,
    clearError,
  };
};
