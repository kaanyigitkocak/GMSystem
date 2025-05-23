import type { StudentRanking } from "../hooks/useUniversityRankings";

export const exportRankingsToCSV = (data: StudentRanking[]) => {
  if (data.length === 0) {
    throw new Error("No data to export");
  }

  const headers = [
    "Rank",
    "Student ID",
    "Name",
    "Department",
    "Faculty",
    "GPA",
    "Credits",
    "Graduation Eligible",
  ];

  const csvContent = [
    headers.join(","),
    ...data.map((student) =>
      [
        student.rank,
        student.studentId,
        `"${student.name}"`,
        `"${student.department}"`,
        `"${student.faculty}"`,
        student.gpa,
        student.credits,
        student.graduationEligible ? "Yes" : "No",
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `university_rankings_${new Date().toISOString().split("T")[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
