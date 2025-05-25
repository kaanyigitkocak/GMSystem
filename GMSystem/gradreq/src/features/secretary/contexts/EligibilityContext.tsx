import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  getStudentsWithEligibilityStatusApi,
  performEligibilityChecksForMissingStudentsApi,
  clearEligibilityCache,
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

// Context interface
interface EligibilityContextType {
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
}

// Create context
const EligibilityContext = createContext<EligibilityContextType | undefined>(undefined);

// Provider component
interface EligibilityProviderProps {
  children: ReactNode;
}

export const EligibilityProvider: React.FC<EligibilityProviderProps> = ({ children }) => {
  const [eligibilityData, setEligibilityData] = useState<EligibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [performingChecks, setPerformingChecks] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("[EligibilityContext] Initial performingChecks:", performingChecks); // Initial log

  // Function to calculate eligibility statistics
  const calculateEligibilityStats = (students: Student[]): EligibilityData => {
    const eligibleCount = students.filter(
      (s) => s.eligibilityStatus?.hasResults && s.eligibilityStatus.isEligible
    ).length;
    const ineligibleCount = students.filter(
      (s) => s.eligibilityStatus?.hasResults && !s.eligibilityStatus.isEligible
    ).length;
    const unknownCount = students.filter(
      (s) => !s.eligibilityStatus?.hasResults
    ).length;
    // pendingCheckCount, durumu bilinmeyen (hasResults === false) öğrenci sayısıdır.
    const pendingCheckCount = unknownCount;

    return {
      studentsWithEligibility: students,
      eligibleCount,
      ineligibleCount,
      pendingCheckCount,
      unknownCount, // unknownCount ve pendingCheckCount aynı anlama geliyor bu mantıkta
    };
  };

  // Function to fetch eligibility data
  const fetchEligibilityData = async (forceRefresh = false): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 [SecretaryEligibilityContext] Fetching eligibility data...');

      if (forceRefresh) {
        console.log('🔍 [SecretaryEligibilityContext] Force refresh - clearing cache');
        clearEligibilityCache();
      }

      const studentsWithEligibility = await getStudentsWithEligibilityStatusApi();
      console.log(`🔍 [SecretaryEligibilityContext] Fetched ${studentsWithEligibility.length} students with eligibility status`);

      const eligibilityStats = calculateEligibilityStats(studentsWithEligibility);
      setEligibilityData(eligibilityStats);
      setDataLoaded(true);

      console.log('🔍 [SecretaryEligibilityContext] Eligibility stats:', {
        total: studentsWithEligibility.length,
        eligible: eligibilityStats.eligibleCount,
        ineligible: eligibilityStats.ineligibleCount,
        pending: eligibilityStats.pendingCheckCount,
      });
    } catch (err) {
      console.error('❌ [SecretaryEligibilityContext] Failed to fetch eligibility data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch eligibility data');
    } finally {
      setLoading(false);
    }
  };

  // Function to perform eligibility checks for missing students
  const performEligibilityChecksForMissingStudents = async () => {
    console.log("[EligibilityContext] Before setPerformingChecks(true):", performingChecks);
    setPerformingChecks(true);
    // React state güncellemeleri asenkron olabileceği için, bir sonraki render döngüsünde loglamak daha doğru olabilir
    // useEffect(() => { console.log("[EligibilityContext] performingChecks updated in useEffect:", performingChecks); }, [performingChecks]);
    console.log("[EligibilityContext] After setPerformingChecks(true) call, current value:", performingChecks); // Bu log hemen güncel değeri göstermeyebilir

    try {
      setError(null);
      console.log('🔍 [SecretaryEligibilityContext] Starting eligibility checks for missing students...');
      const result = await performEligibilityChecksForMissingStudentsApi();
      console.log('🔍 [SecretaryEligibilityContext] Eligibility checks completed:', result);
      if (result.processedStudents.length > 0) {
        console.log('🔍 [SecretaryEligibilityContext] Refreshing data after eligibility checks...');
        await fetchEligibilityData(true);
      }
      return result;
    } catch (err) {
      console.error('❌ [SecretaryEligibilityContext] Failed to perform eligibility checks:', err);
      setError(err instanceof Error ? err.message : 'Failed to perform eligibility checks');
      throw err;
    } finally {
      console.log("[EligibilityContext] Before setPerformingChecks(false) in finally:", performingChecks); // Bu log da bir önceki değeri gösterebilir
      setPerformingChecks(false);
      console.log("[EligibilityContext] After setPerformingChecks(false) call in finally, current value:", performingChecks); // Bu da
    }
  };

  // Function to refresh eligibility data
  const refreshEligibilityData = async (clearCache = false): Promise<void> => {
    console.log('🔍 [SecretaryEligibilityContext] Refreshing eligibility data...');
    await fetchEligibilityData(clearCache);
  };

  // Initial data fetch
  useEffect(() => {
    fetchEligibilityData();
  }, []);

  useEffect(() => {
    console.log("[EligibilityContext] performingChecks changed to:", performingChecks);
  }, [performingChecks]);

  const contextValue: EligibilityContextType = {
    eligibilityData,
    loading,
    performingChecks,
    dataLoaded,
    error,
    fetchEligibilityData,
    performEligibilityChecksForMissingStudents,
    refreshEligibilityData,
  };

  return (
    <EligibilityContext.Provider value={contextValue}>
      {children}
    </EligibilityContext.Provider>
  );
};

// Hook to use eligibility context
export const useEligibility = (): EligibilityContextType => {
  const context = useContext(EligibilityContext);
  if (context === undefined) {
    throw new Error('useEligibility must be used within an EligibilityProvider');
  }
  return context;
}; 