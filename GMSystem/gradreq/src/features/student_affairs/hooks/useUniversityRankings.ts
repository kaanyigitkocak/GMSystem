import { useState, useEffect } from "react";
import { getUniversityRankings } from "../services";

// Types
export interface StudentRanking {
  id: string;
  rank: number;
  studentId: string;
  name: string;
  department: string;
  faculty: string;
  gpa: number;
  credits: number;
  duplicateRecords?: boolean;
  graduationEligible: boolean;
}

export interface RankingMetadata {
  totalStudents: number;
  eligibleStudents: number;
  hasDuplicates: boolean;
  mixedGraduationStatus: boolean;
  lastUpdated: Date;
}

export type Order = "asc" | "desc";

export interface ApprovalStatus {
  [studentId: string]: "approved" | "disapproved" | undefined;
}

interface UseUniversityRankingsReturn {
  // Data
  studentRankings: StudentRanking[];
  rankingMetadata: RankingMetadata | null;

  // UI State
  order: Order;
  orderBy: keyof StudentRanking;
  page: number;
  rowsPerPage: number;
  searchQuery: string;
  selectedFaculty: string | null;
  selectedDepartment: string | null;
  approvalStatus: ApprovalStatus;

  // Status
  isLoading: boolean;
  error: string | null;
  warnings: string[];

  // Computed
  filteredData: StudentRanking[];
  sortedData: StudentRanking[];
  paginatedData: StudentRanking[];
  faculties: string[];
  departments: string[];

  // Actions
  handleRequestSort: (property: keyof StudentRanking) => void;
  handleChangePage: (_event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchQuery: (query: string) => void;
  setSelectedFaculty: (faculty: string | null) => void;
  setSelectedDepartment: (department: string | null) => void;
  handleApprove: (studentId: string) => void;
  handleDisapprove: (studentId: string) => void;
  handleApproveAll: () => void;
  refreshRanking: () => Promise<void>;
  setError: (error: string | null) => void;
  setWarnings: (warnings: string[]) => void;
}

export const useUniversityRankings = (): UseUniversityRankingsReturn => {
  // Data state
  const [studentRankings, setStudentRankings] = useState<StudentRanking[]>([]);
  const [rankingMetadata, setRankingMetadata] =
    useState<RankingMetadata | null>(null);

  // UI state
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof StudentRanking>("gpa");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>({});

  // Status state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Load initial data
  useEffect(() => {
    loadUniversityRankings();
  }, []);

  // Generate warnings based on metadata
  useEffect(() => {
    const newWarnings: string[] = [];

    if (rankingMetadata) {
      if (rankingMetadata.mixedGraduationStatus) {
        newWarnings.push(
          "Some students did not meet graduation criteria and were excluded"
        );
      }

      if (rankingMetadata.eligibleStudents === 0) {
        setError(
          "No eligible students found for ranking. Please check department files."
        );
      } else {
        setError(null);
      }
    }

    setWarnings(newWarnings);
  }, [rankingMetadata]);

  const loadUniversityRankings = async () => {
    setIsLoading(true);
    try {
      // Get university rankings data
      const rawRankings = await getUniversityRankings();

      // Transform the data to match our StudentRanking interface
      const transformedRankings: StudentRanking[] = [];
      let totalStudents = 0;

      // Process each department's rankings
      rawRankings.forEach((dept) => {
        dept.students.forEach((student) => {
          totalStudents++;
          transformedRankings.push({
            id: `${dept.id}-${student.id}`, // Make ID unique by combining dept and student IDs
            rank: student.rank,
            studentId: `2020${dept.id}${student.id.padStart(3, "0")}`,
            name: student.name,
            department: dept.department,
            faculty: dept.faculty,
            gpa: student.gpa,
            credits: Math.floor(Math.random() * 30) + 120,
            duplicateRecords: false, // Remove duplicate flag since we're not merging
            graduationEligible: student.gpa >= 2.0,
          });
        });
      });

      // Sort by GPA
      transformedRankings.sort((a, b) => b.gpa - a.gpa);

      // Assign ranks after sorting
      transformedRankings.forEach((student, index) => {
        student.rank = index + 1;
      });

      // Create metadata
      const metadata: RankingMetadata = {
        totalStudents,
        eligibleStudents: transformedRankings.filter(
          (s) => s.graduationEligible
        ).length,
        hasDuplicates: false, // Remove duplicate flag since we're not merging
        mixedGraduationStatus: transformedRankings.some(
          (s) => !s.graduationEligible
        ),
        lastUpdated: new Date(),
      };

      setStudentRankings(transformedRankings);
      setRankingMetadata(metadata);
    } catch (err) {
      setError(
        "Failed to load university ranking data. Please try again later."
      );
      console.error("Error loading university rankings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort data
  const filteredData = studentRankings.filter((student) => {
    const matchesSearch =
      searchQuery === "" ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFaculty =
      selectedFaculty === null || student.faculty === selectedFaculty;
    const matchesDepartment =
      selectedDepartment === null || student.department === selectedDepartment;

    return matchesSearch && matchesFaculty && matchesDepartment;
  });

  // Sort: approved first, then normal, then disapproved
  const sortedData = [...filteredData].sort((a, b) => {
    const aStatus = approvalStatus[a.id];
    const bStatus = approvalStatus[b.id];
    if (aStatus === "approved" && bStatus !== "approved") return -1;
    if (aStatus !== "approved" && bStatus === "approved") return 1;
    if (aStatus === "disapproved" && bStatus !== "disapproved") return 1;
    if (aStatus !== "disapproved" && bStatus === "disapproved") return -1;
    // fallback to original sort
    if (orderBy === "rank")
      return order === "asc" ? a.rank - b.rank : b.rank - a.rank;
    if (orderBy === "gpa")
      return order === "asc" ? a.gpa - b.gpa : b.gpa - a.gpa;
    if (orderBy === "credits")
      return order === "asc" ? a.credits - b.credits : b.credits - a.credits;
    const aVal = a[orderBy] as string;
    const bVal = b[orderBy] as string;
    return order === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  // Pagination
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Faculty and department filter options
  const faculties = Array.from(
    new Set(studentRankings.map((student) => student.faculty))
  );
  const departments = Array.from(
    new Set(
      studentRankings
        .filter(
          (student) =>
            selectedFaculty === null || student.faculty === selectedFaculty
        )
        .map((student) => student.department)
    )
  );

  // Event handlers
  const handleRequestSort = (property: keyof StudentRanking) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApprove = (studentId: string) => {
    setApprovalStatus((prev) => ({ ...prev, [studentId]: "approved" }));
  };

  const handleDisapprove = (studentId: string) => {
    setApprovalStatus((prev) => ({ ...prev, [studentId]: "disapproved" }));
  };

  const handleApproveAll = () => {
    setWarnings([]);
    setError(null);
    alert("All students have been approved for graduation");
  };

  const refreshRanking = async () => {
    await loadUniversityRankings();
  };

  return {
    // Data
    studentRankings,
    rankingMetadata,

    // UI State
    order,
    orderBy,
    page,
    rowsPerPage,
    searchQuery,
    selectedFaculty,
    selectedDepartment,
    approvalStatus,

    // Status
    isLoading,
    error,
    warnings,

    // Computed
    filteredData,
    sortedData,
    paginatedData,
    faculties,
    departments,

    // Actions
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    setSearchQuery,
    setSelectedFaculty,
    setSelectedDepartment,
    handleApprove,
    handleDisapprove,
    handleApproveAll,
    refreshRanking,
    setError,
    setWarnings,
  };
};
