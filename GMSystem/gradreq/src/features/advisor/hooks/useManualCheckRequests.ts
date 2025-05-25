import { useState, useEffect } from 'react';
import type { ManualCheckRequest } from '../services/types/dashboard';
import { manualCheckRequestsService } from '../services';

export const useManualCheckRequests = () => {
  const [requests, setRequests] = useState<ManualCheckRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await manualCheckRequestsService.getManualCheckRequests();
      setRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch manual check requests');
    } finally {
      setLoading(false);
    }
  };

  const updateRequest = async (id: string, updates: Partial<ManualCheckRequest>) => {
    try {
      const updatedRequest = await manualCheckRequestsService.updateManualCheckRequest(id, updates);
      setRequests(prev => prev.map(req => req.id === id ? updatedRequest : req));
      return updatedRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update request');
      throw err;
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    error,
    updateRequest,
    refetch: fetchRequests
  };
};
