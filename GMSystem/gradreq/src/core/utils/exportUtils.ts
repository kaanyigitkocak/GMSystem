import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Helper function to encode Turkish characters for PDF
const encodeTurkishText = (text: string): string => {
  if (!text) return text;

  // Replace Turkish characters with their closest ASCII equivalents for PDF compatibility
  return text
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");
};

export interface StudentExportData {
  rank: number;
  name: string;
  studentId: string;
  department: string;
  faculty?: string;
  gpa: number;
  eligibilityStatus: string;
  status?: string;
  lastCheckDate?: string;
}

/**
 * Export student data to CSV with Turkish character support
 */
export const exportStudentsToCSV = (
  students: StudentExportData[],
  filename: string = "student_approval_ranking",
  _panelType: string = "Approval Ranking"
): void => {
  if (students.length === 0) {
    throw new Error("No data to export");
  }

  // CSV Headers in Turkish
  const headers = [
    "Sıra",
    "Öğrenci Adı",
    "Öğrenci No",
    "Bölüm",
    "Fakülte",
    "GPA",
    "Uygunluk Durumu",
    "Durum",
    "Son Kontrol Tarihi",
  ];

  // Prepare CSV data
  const csvData = students.map((student) => [
    student.rank.toString(),
    student.name || "-",
    student.studentId || "-",
    student.department || "-",
    student.faculty || "-",
    student.gpa?.toFixed(2) || "0.00",
    student.eligibilityStatus || "-",
    student.status || "-",
    student.lastCheckDate || "-",
  ]);

  // Create CSV content with UTF-8 BOM for Turkish character support
  const csvContent = [
    headers.join(","),
    ...csvData.map((row) =>
      row
        .map((cell) => {
          // Escape commas and quotes in cell content
          const cellStr = String(cell);
          if (
            cellStr.includes(",") ||
            cellStr.includes('"') ||
            cellStr.includes("\n")
          ) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        })
        .join(",")
    ),
  ].join("\n");

  // Add UTF-8 BOM for proper Turkish character display
  const BOM = "\uFEFF";
  const csvWithBOM = BOM + csvContent;

  // Create and download file
  const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${filename}_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export student data to PDF with Turkish character support and modern design
 */
export const exportStudentsToPDF = (
  students: StudentExportData[],
  filename: string = "student_approval_ranking",
  panelType: string = "Approval Ranking",
  institutionName: string = "İzmir Yüksek Teknoloji Enstitüsü"
): void => {
  if (students.length === 0) {
    throw new Error("No data to export");
  }

  // Create new PDF document
  const doc = new jsPDF("landscape", "mm", "a4");

  // Set font for Turkish character support
  doc.setFont("helvetica");

  // Add header with institution info
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text(encodeTurkishText(institutionName), 20, 20);

  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text(encodeTurkishText(`${panelType} Raporu`), 20, 30);

  // Add generation date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const currentDate = new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.text(encodeTurkishText(`Olusturulma Tarihi: ${currentDate}`), 20, 40);

  // Add summary statistics
  const totalStudents = students.length;
  const eligibleStudents = students.filter(
    (s) =>
      s.eligibilityStatus?.toLowerCase().includes("eligible") ||
      s.eligibilityStatus?.toLowerCase().includes("uygun")
  ).length;
  const averageGPA =
    students.reduce((sum, s) => sum + (s.gpa || 0), 0) / totalStudents;

  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(encodeTurkishText(`Toplam Ogrenci: ${totalStudents}`), 20, 50);
  doc.text(encodeTurkishText(`Uygun Ogrenci: ${eligibleStudents}`), 80, 50);
  doc.text(
    encodeTurkishText(`Ortalama GPA: ${averageGPA.toFixed(2)}`),
    140,
    50
  );

  // Prepare table data with Turkish character encoding
  const tableHeaders = [
    encodeTurkishText("Sira"),
    encodeTurkishText("Ogrenci Adi"),
    encodeTurkishText("Ogrenci No"),
    encodeTurkishText("Bolum"),
    "GPA",
    encodeTurkishText("Uygunluk"),
    encodeTurkishText("Durum"),
  ];

  const tableData = students.map((student) => [
    student.rank.toString(),
    encodeTurkishText(student.name || "-"),
    student.studentId || "-",
    encodeTurkishText(student.department || "-"),
    student.gpa?.toFixed(2) || "0.00",
    encodeTurkishText(student.eligibilityStatus || "-"),
    encodeTurkishText(student.status || "-"),
  ]);

  // Add table with modern styling
  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
    startY: 60,
    theme: "striped",
    headStyles: {
      fillColor: [41, 128, 185], // Modern blue color
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [40, 40, 40],
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 12 }, // Rank
      1: { cellWidth: 45 }, // Name
      2: { halign: "center", cellWidth: 22 }, // Student ID
      3: { cellWidth: 35 }, // Department
      4: { halign: "center", cellWidth: 18 }, // GPA
      5: { halign: "center", cellWidth: 25 }, // Eligibility
      6: { halign: "center", cellWidth: 30 }, // Status
    },
    margin: { left: 20, right: 20 },
    styles: {
      overflow: "linebreak",
      cellPadding: 3,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
    },
  });

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      encodeTurkishText(`Sayfa ${i} / ${pageCount}`),
      doc.internal.pageSize.width - 30,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      encodeTurkishText(institutionName),
      20,
      doc.internal.pageSize.height - 10
    );
  }

  // Save the PDF
  doc.save(`${filename}_${new Date().toISOString().split("T")[0]}.pdf`);
};

/**
 * Format eligibility status for display
 */
export const formatEligibilityStatus = (status: string | undefined): string => {
  if (!status) return "Bilinmiyor";

  const statusLower = status.toLowerCase();
  if (statusLower.includes("eligible") || statusLower.includes("uygun")) {
    return "Uygun";
  } else if (
    statusLower.includes("not eligible") ||
    statusLower.includes("uygun degil")
  ) {
    return "Uygun Degil";
  } else if (
    statusLower.includes("pending") ||
    statusLower.includes("beklemede")
  ) {
    return "Beklemede";
  } else if (
    statusLower.includes("no results") ||
    statusLower.includes("sonuc yok")
  ) {
    return "Sonuc Yok";
  }

  return status;
};

/**
 * Format graduation process status for display
 */
export const formatGraduationStatus = (
  status: string | number | undefined
): string => {
  if (status === undefined || status === null) return "Bilinmiyor";

  // Handle numeric status codes
  if (typeof status === "number") {
    switch (status) {
      case 1:
        return "Basvuru Yapildi";
      case 5:
        return "Danisman Onayi";
      case 6:
        return "Sekreter Onayi";
      case 8:
        return "Dekan Onayi Bekliyor";
      case 18:
        return "Mezun";
      default:
        return `Durum ${status}`;
    }
  }

  // Handle string status
  const statusStr = String(status).toLowerCase();
  if (statusStr.includes("approved")) return "Onaylandi";
  if (statusStr.includes("rejected")) return "Reddedildi";
  if (statusStr.includes("pending")) return "Beklemede";
  if (statusStr.includes("waiting")) return "Bekliyor";

  return String(status);
};
