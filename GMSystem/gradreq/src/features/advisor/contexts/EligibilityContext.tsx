import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  getStudentsWithEligibilityStatusApi,
  performEligibilityChecksForMissingStudentsApi,
  performEligibilityChecksForAllStudentsApi,
  clearEligibilityCache
} from '../services/api/studentApi';
import type { Student } from '../services/types';

interface EligibilityData {
  studentsWithEligibility: Student[];
  eligibleCount: number;
  ineligibleCount: number;
  pendingCheckCount: number;
}

interface EligibilityContextType {
  eligibilityData: EligibilityData | null;
  loading: boolean;
  performingChecks: boolean;
  dataLoaded: boolean;
  error: string | null;
  
  // Actions
  fetchEligibilityData: (forceRefresh?: boolean) => Promise<void>;
  performEligibilityChecksForMissingStudents: () => Promise<{ success: boolean; processedStudents: string[]; studentsWithoutResults: string[]; }>;
  performEligibilityChecksForAllStudents: () => Promise<{ success: boolean; processedStudents: string[]; }>;
  refreshEligibilityData: (clearCache?: boolean) => Promise<void>;
  clearError: () => void;
}

const EligibilityContext = createContext<EligibilityContextType | undefined>(undefined);

// Cache key for eligibility context data
const ELIGIBILITY_CONTEXT_CACHE_KEY = 'advisor_eligibility_context_data';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

interface CachedEligibilityContextData {
  data: EligibilityData;
  timestamp: number;
}

// Get cached data from localStorage
const getCachedEligibilityData = (): EligibilityData | null => {
  try {
    const cached = localStorage.getItem(ELIGIBILITY_CONTEXT_CACHE_KEY);
    if (cached) {
      const parsedCache: CachedEligibilityContextData = JSON.parse(cached);
      const isValid = Date.now() - parsedCache.timestamp < CACHE_DURATION;
      if (isValid) {
        console.log("🔍 [EligibilityContext] Using cached eligibility data");
        return parsedCache.data;
      } else {
        console.log("🔍 [EligibilityContext] Cache expired, removing old data");
        localStorage.removeItem(ELIGIBILITY_CONTEXT_CACHE_KEY);
      }
    }
  } catch (error) {
    console.warn("Failed to parse cached eligibility data:", error);
    localStorage.removeItem(ELIGIBILITY_CONTEXT_CACHE_KEY);
  }
  return null;
};

// Set data to cache in localStorage
const setCachedEligibilityData = (data: EligibilityData): void => {
  try {
    const cacheData: CachedEligibilityContextData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(ELIGIBILITY_CONTEXT_CACHE_KEY, JSON.stringify(cacheData));
    console.log("🔍 [EligibilityContext] Eligibility data cached successfully");
  } catch (error) {
    console.warn("Failed to cache eligibility data:", error);
  }
};

// Clear cached data
const clearCachedEligibilityData = (): void => {
  localStorage.removeItem(ELIGIBILITY_CONTEXT_CACHE_KEY);
  console.log("🔍 [EligibilityContext] Eligibility cache cleared");
};

export const EligibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [eligibilityData, setEligibilityData] = useState<EligibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [performingChecks, setPerformingChecks] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateStatistics = (students: Student[]): EligibilityData => {
    const eligibleCount = students.filter(
      (student) =>
        student.eligibilityStatus?.hasResults &&
        student.eligibilityStatus.isEligible
    ).length;

    const ineligibleCount = students.filter(
      (student) =>
        student.eligibilityStatus?.hasResults &&
        !student.eligibilityStatus.isEligible
    ).length;

    const pendingCheckCount = students.filter(
      (student) => !student.eligibilityStatus?.hasResults
    ).length;

    return {
      studentsWithEligibility: students,
      eligibleCount,
      ineligibleCount,
      pendingCheckCount,
    };
  };

  const fetchEligibilityData = async (forceRefresh: boolean = false) => {
    // If data is already loaded and not forcing refresh, skip
    if (dataLoaded && !forceRefresh) {
      console.log("🔍 [EligibilityContext] Using existing eligibility data (no refresh needed)");
      return;
    }

    // Check cache first if not forcing refresh
    if (!forceRefresh) {
      const cachedData = getCachedEligibilityData();
      if (cachedData) {
        setEligibilityData(cachedData);
        setDataLoaded(true);
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      console.log(
        "🔍 [EligibilityContext] Fetching eligibility data from API...",
        forceRefresh ? "(forced refresh)" : "(initial load)"
      );

      const studentsWithEligibility = await getStudentsWithEligibilityStatusApi();
      const calculatedData = calculateStatistics(studentsWithEligibility);

      setEligibilityData(calculatedData);
      setDataLoaded(true);

      // Cache the data
      setCachedEligibilityData(calculatedData);

      console.log(
        `✅ [EligibilityContext] Eligibility data loaded. Eligible: ${calculatedData.eligibleCount}, Ineligible: ${calculatedData.ineligibleCount}, Pending: ${calculatedData.pendingCheckCount}`
      );
    } catch (err) {
      console.error("❌ [EligibilityContext] Failed to fetch eligibility data:", err);
      setError("Failed to fetch eligibility data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const performEligibilityChecksForMissingStudents = async () => {
    try {
      setPerformingChecks(true);
      console.log("🔍 [EligibilityContext] Starting eligibility checks for students without results...");

      const result = await performEligibilityChecksForMissingStudentsApi();

      if (result.processedStudents.length > 0) {
        console.log(
          `✅ [EligibilityContext] Performed eligibility checks for ${result.processedStudents.length} students`
        );
        
        // Wait a bit for the checks to complete
        await new Promise((resolve) => setTimeout(resolve, 3000));
        
        // Force refresh eligibility data after performing checks
        await fetchEligibilityData(true);
      } else {
        console.log("ℹ️ [EligibilityContext] All students already have eligibility results");
      }

      return result;
    } catch (err) {
      console.error("❌ [EligibilityContext] Failed to perform eligibility checks:", err);
      throw err;
    } finally {
      setPerformingChecks(false);
    }
  };

  const performEligibilityChecksForAllStudents = async () => {
    try {
      setPerformingChecks(true);
      console.log("🔍 [EligibilityContext] Starting eligibility checks for all students...");

      // Get all student IDs
      const allStudentIds = eligibilityData?.studentsWithEligibility.map(student => student.id) || [];
      
      if (allStudentIds.length === 0) {
        throw new Error("No students found to perform checks");
      }

      const result = await performEligibilityChecksForAllStudentsApi(allStudentIds);

      console.log(
        `✅ [EligibilityContext] Performed eligibility checks for ${result.processedStudents.length} students`
      );
      
      // Wait a bit for the checks to complete
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Force refresh eligibility data after performing checks
      await fetchEligibilityData(true);

      return result;
    } catch (err) {
      console.error("❌ [EligibilityContext] Failed to perform eligibility checks for all students:", err);
      throw err;
    } finally {
      setPerformingChecks(false);
    }
  };

  const refreshEligibilityData = async (clearCache: boolean = false) => {
    if (clearCache) {
      clearEligibilityCache();
      clearCachedEligibilityData();
      setDataLoaded(false);
    }
    await fetchEligibilityData(true);
  };

  const clearError = () => {
    setError(null);
  };

  // Load data on mount
  useEffect(() => {
    fetchEligibilityData(false);
  }, []);

  const value: EligibilityContextType = {
    eligibilityData,
    loading,
    performingChecks,
    dataLoaded,
    error,
    fetchEligibilityData,
    performEligibilityChecksForMissingStudents,
    performEligibilityChecksForAllStudents,
    refreshEligibilityData,
    clearError,
  };

  return (
    <EligibilityContext.Provider value={value}>
      {children}
    </EligibilityContext.Provider>
  );
};

export const useEligibility = (): EligibilityContextType => {
  const context = useContext(EligibilityContext);
  if (context === undefined) {
    throw new Error('useEligibility must be used within an EligibilityProvider');
  }
  return context;
}; 