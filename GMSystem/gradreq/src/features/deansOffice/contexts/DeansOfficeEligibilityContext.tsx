import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import {
  getFacultyStudentsWithEligibilityApi,
  performFacultyEligibilityChecksForMissingStudentsApi,
  clearDeansOfficeEligibilityCache,
} from '../services/api/studentsApi';
import type { Student } from '../../advisor/services/types';

// Types for eligibility data
export interface EligibilityData {
  studentsWithEligibility: Student[];
  eligibleCount: number;
  ineligibleCount: number;
  pendingCheckCount: number;
  unknownCount: number;
}

// Context interface - Updated to match new API that gets facultyId automatically
interface DeansOfficeEligibilityContextType {
  eligibilityData: EligibilityData | null;
  loading: boolean;
  performingChecks: boolean;
  dataLoaded: boolean;
  error: string | null;
  fetchEligibilityData: (forceRefresh?: boolean) => Promise<void>;
  performEligibilityChecksForMissingStudents: () => Promise<{
    success: boolean;
    processedStudents: string[];
    studentsWithoutResults: string[];
  }>;
  refreshEligibilityData: (clearCache?: boolean) => Promise<void>;
  clearError: () => void;
}

const DeansOfficeEligibilityContext = createContext<DeansOfficeEligibilityContextType | undefined>(undefined);

interface DeansOfficeEligibilityProviderProps {
  children: ReactNode;
}

export const DeansOfficeEligibilityProvider: React.FC<DeansOfficeEligibilityProviderProps> = ({ children }) => {
  const [eligibilityData, setEligibilityData] = useState<EligibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [performingChecks, setPerformingChecks] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateEligibilityStats = useCallback((students: Student[]): EligibilityData => {
    const eligibleCount = students.filter(
      (s) => s.eligibilityStatus?.hasResults && s.eligibilityStatus.isEligible
    ).length;
    const ineligibleCount = students.filter(
      (s) => s.eligibilityStatus?.hasResults && !s.eligibilityStatus.isEligible
    ).length;
    const unknownCount = students.filter(
      (s) => !s.eligibilityStatus?.hasResults
    ).length;
    const pendingCheckCount = unknownCount;
    return {
      studentsWithEligibility: students,
      eligibleCount,
      ineligibleCount,
      pendingCheckCount,
      unknownCount,
    };
  }, []);

  const fetchEligibilityData = useCallback(async (forceRefresh = false): Promise<void> => {
    console.log(`🔍 [DeansOfficeEligibilityContext] Fetching eligibility data (forceRefresh: ${forceRefresh})...`);
    setLoading(true);
    setError(null);
    try {
      if (forceRefresh) {
        console.log('🔍 [DeansOfficeEligibilityContext] Force refresh - clearing cache');
        await clearDeansOfficeEligibilityCache();
      }
      // New API automatically gets facultyId from GetFromAuth
      const studentsWithEligibility = await getFacultyStudentsWithEligibilityApi();
      console.log(`🔍 [DeansOfficeEligibilityContext] Fetched ${studentsWithEligibility.length} students`);
      const eligibilityStats = calculateEligibilityStats(studentsWithEligibility);
      setEligibilityData(eligibilityStats);
      setDataLoaded(true);
      console.log(`🔍 [DeansOfficeEligibilityContext] Eligibility stats:`, {
        total: studentsWithEligibility.length,
        eligible: eligibilityStats.eligibleCount,
        ineligible: eligibilityStats.ineligibleCount,
        pending: eligibilityStats.pendingCheckCount,
      });
    } catch (err) {
      console.error(`❌ [DeansOfficeEligibilityContext] Failed to fetch eligibility data:`, err);
      setError(err instanceof Error ? err.message : `Failed to fetch eligibility data`);
      setEligibilityData(null);
      setDataLoaded(false);
    } finally {
      setLoading(false);
    }
  }, [calculateEligibilityStats]);

  const performEligibilityChecksForMissingStudents = useCallback(async () => {
    console.log(`[DeansOfficeEligibilityContext] Starting eligibility checks for missing students...`);
    setPerformingChecks(true);
    setError(null);
    try {
      // New API automatically gets facultyId from GetFromAuth
      const result = await performFacultyEligibilityChecksForMissingStudentsApi();
      console.log(`🔍 [DeansOfficeEligibilityContext] Eligibility checks completed:`, result);
      if (result.processedStudents.length > 0) {
        console.log(`🔍 [DeansOfficeEligibilityContext] Refreshing data after eligibility checks...`);
        await fetchEligibilityData(true);
      }
      return result;
    } catch (err) {
      console.error(`❌ [DeansOfficeEligibilityContext] Failed to perform eligibility checks:`, err);
      const errorMessage = err instanceof Error ? err.message : `Failed to perform eligibility checks`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setPerformingChecks(false);
    }
  }, [fetchEligibilityData]);

  const refreshEligibilityData = useCallback(async (clearCache = false): Promise<void> => {
    console.log(`🔍 [DeansOfficeEligibilityContext] Refreshing eligibility data (clearCache: ${clearCache})...`);
    await fetchEligibilityData(clearCache);
  }, [fetchEligibilityData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue: DeansOfficeEligibilityContextType = {
    eligibilityData,
    loading,
    performingChecks,
    dataLoaded,
    error,
    fetchEligibilityData,
    performEligibilityChecksForMissingStudents,
    refreshEligibilityData,
    clearError,
  };

  return (
    <DeansOfficeEligibilityContext.Provider value={contextValue}>
      {children}
    </DeansOfficeEligibilityContext.Provider>
  );
};

export const useDeansOfficeEligibility = (): DeansOfficeEligibilityContextType => {
  const context = useContext(DeansOfficeEligibilityContext);
  if (context === undefined) {
    throw new Error('useDeansOfficeEligibility must be used within an DeansOfficeEligibilityProvider');
  }
  return context;
}; 