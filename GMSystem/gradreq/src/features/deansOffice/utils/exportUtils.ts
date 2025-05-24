import type { StudentRecord } from "../types";

/**
 * Export university rankings to CSV
 */
export const exportUniversityRankingsToCSV = (students: StudentRecord[]) => {
  if (students.length === 0) {
    throw new Error("No data to export");
  }

  const headers = [
    "Rank",
    "Student ID",
    "Name",
    "Surname",
    "Department",
    "Faculty",
    "GPA",
    "Total Credits",
    "Completed Credits",
    "Graduation Eligible",
    "Transcript Status",
    "Submission Date",
    "Review Date",
    "Review Note",
  ];

  const csvData = students.map((student) => [
    student.rank || "-",
    student.studentId,
    student.name,
    student.surname,
    student.department,
    student.faculty,
    student.gpa.toFixed(2),
    student.totalCredits,
    student.completedCredits,
    student.graduationEligible ? "Yes" : "No",
    student.transcriptStatus.toUpperCase(),
    new Date(student.submissionDate).toLocaleDateString(),
    student.reviewDate
      ? new Date(student.reviewDate).toLocaleDateString()
      : "-",
    student.reviewNote || "-",
  ]);

  const csvContent = [
    headers.join(","),
    ...csvData.map((row) =>
      row
        .map((cell) =>
          typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell
        )
        .join(",")
    ),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `university_rankings_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
