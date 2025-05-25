import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { 
  Student
} from '../services/types';
import type { 
  StudentAffairsDashboardStats 
} from '../services/studentsApi';
import { 
  getStudentsWithEligibility, 
  calculateDashboardStats 
} from '../services/studentsApi';

interface StudentAffairsContextType {
  // State
  students: Student[];
  dashboardStats: StudentAffairsDashboardStats | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchStudentsData: () => Promise<void>;
  refreshStudentsData: () => Promise<void>;
  getStudentById: (studentId: string) => Student | undefined;
  clearError: () => void;
}

const StudentAffairsContext = createContext<StudentAffairsContextType | undefined>(undefined);

interface StudentAffairsProviderProps {
  children: ReactNode;
}

export const StudentAffairsProvider: React.FC<StudentAffairsProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [dashboardStats, setDashboardStats] = useState<StudentAffairsDashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('[StudentAffairsContext] Fetching students with eligibility data...');
      const studentsData = await getStudentsWithEligibility();
      
      console.log(`[StudentAffairsContext] Fetched ${studentsData.length} students`);
      setStudents(studentsData);
      
      // Calculate dashboard statistics
      const stats = calculateDashboardStats(studentsData);
      setDashboardStats(stats);
      
      console.log('[StudentAffairsContext] Dashboard stats calculated:', stats);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch students data';
      console.error('[StudentAffairsContext] Error fetching students:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshStudentsData = useCallback(async () => {
    console.log('[StudentAffairsContext] Refreshing students data...');
    await fetchStudentsData();
  }, [fetchStudentsData]);

  const getStudentById = useCallback((studentId: string): Student | undefined => {
    return students.find(student => student.studentId === studentId);
  }, [students]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: StudentAffairsContextType = {
    students,
    dashboardStats,
    loading,
    error,
    fetchStudentsData,
    refreshStudentsData,
    getStudentById,
    clearError
  };

  return (
    <StudentAffairsContext.Provider value={value}>
      {children}
    </StudentAffairsContext.Provider>
  );
};

export const useStudentAffairs = (): StudentAffairsContextType => {
  const context = useContext(StudentAffairsContext);
  if (context === undefined) {
    throw new Error('useStudentAffairs must be used within a StudentAffairsProvider');
  }
  return context;
}; 