import { useState, useRef } from "react";

export interface StudentData {
  name: string;
  id: string;
  department: string;
  gpa: number;
  certificateType: string;
}

interface NotificationState {
  showSuccess: boolean;
  showError: boolean;
  showDetermineSuccess: boolean;
  showExportSuccess: boolean;
  errorMessage: string;
}

interface UseDetermineCertificatesReturn {
  // Data state
  combinedRankings: StudentData[];
  filesLoaded: boolean;
  showRankings: boolean;

  // Notification state
  notifications: NotificationState;

  // Refs
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  // Actions
  handleLoadRankings: () => void;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleDetermineCertificates: () => void;
  handleExportToExcel: () => void;
  handleCloseSuccess: () => void;
  handleCloseError: () => void;
  handleCloseDetermineSuccess: () => void;
  handleCloseExportSuccess: () => void;
}

export const useDetermineCertificates = (): UseDetermineCertificatesReturn => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Data state
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [combinedRankings, setCombinedRankings] = useState<StudentData[]>([]);
  const [showRankings, setShowRankings] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState<NotificationState>({
    showSuccess: false,
    showError: false,
    showDetermineSuccess: false,
    showExportSuccess: false,
    errorMessage: "",
  });

  const determineCertificateType = (gpa: number): string => {
    if (gpa >= 3.5 && gpa <= 4.0) return "High Honors";
    if (gpa >= 3.0 && gpa < 3.5) return "Honors";
    return "";
  };

  const handleLoadRankings = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    let allStudents: StudentData[] = [];
    let hasError = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setNotifications((prev) => ({
          ...prev,
          errorMessage: "Please select valid CSV files only.",
          showError: true,
        }));
        hasError = true;
        break;
      }

      try {
        const content = await file.text();
        const lines = content.split("\n");
        const headers = lines[0].toLowerCase().split(",");

        for (let j = 1; j < lines.length; j++) {
          if (!lines[j].trim()) continue;

          const values = lines[j].split(",");
          if (values.length !== headers.length) continue;

          const student: StudentData = {
            name: values[headers.indexOf("name")].trim(),
            id: values[headers.indexOf("id")].trim(),
            department: values[headers.indexOf("department")].trim(),
            gpa: parseFloat(values[headers.indexOf("gpa")].trim()),
            certificateType: determineCertificateType(
              parseFloat(values[headers.indexOf("gpa")].trim())
            ),
          };

          if (!isNaN(student.gpa)) {
            allStudents.push(student);
          }
        }
      } catch (error) {
        setNotifications((prev) => ({
          ...prev,
          errorMessage: "Error reading file: " + file.name,
          showError: true,
        }));
        hasError = true;
        break;
      }
    }

    if (!hasError && allStudents.length > 0) {
      setCombinedRankings(allStudents);
      setFilesLoaded(true);
      setNotifications((prev) => ({ ...prev, showSuccess: true }));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDetermineCertificates = () => {
    setShowRankings(true);
    setNotifications((prev) => ({ ...prev, showDetermineSuccess: true }));
  };

  const handleExportToExcel = () => {
    if (combinedRankings.length === 0) return;

    // Create CSV content
    const headers = ["Name", "ID", "Department", "GPA", "Certificate Type"];
    const rows = combinedRankings.map((student) => [
      student.name,
      student.id,
      student.department,
      student.gpa.toFixed(2),
      student.certificateType,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `certificate_determinations_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setNotifications((prev) => ({ ...prev, showExportSuccess: true }));
  };

  const handleCloseSuccess = () => {
    setNotifications((prev) => ({ ...prev, showSuccess: false }));
  };

  const handleCloseError = () => {
    setNotifications((prev) => ({ ...prev, showError: false }));
  };

  const handleCloseDetermineSuccess = () => {
    setNotifications((prev) => ({ ...prev, showDetermineSuccess: false }));
  };

  const handleCloseExportSuccess = () => {
    setNotifications((prev) => ({ ...prev, showExportSuccess: false }));
  };

  return {
    // Data state
    combinedRankings,
    filesLoaded,
    showRankings,

    // Notification state
    notifications,

    // Refs
    fileInputRef,

    // Actions
    handleLoadRankings,
    handleFileChange,
    handleDetermineCertificates,
    handleExportToExcel,
    handleCloseSuccess,
    handleCloseError,
    handleCloseDetermineSuccess,
    handleCloseExportSuccess,
  };
};
