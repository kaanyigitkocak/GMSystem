import { useState, useRef } from "react";
import { processCSVFiles, generateValidationSummary } from "../services";
import type { UploadedFile, ValidationSummary } from "../services/types";

interface UseFileUploadReturn {
  // Data state
  files: UploadedFile[];
  validationSummary: ValidationSummary | null;

  // UI state
  dragActive: boolean;
  uploading: boolean;
  success: boolean;
  error: string | null;
  warnings: string[];

  // Refs
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  // Actions
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFiles: (selectedFiles: File[]) => void;
  handleRemoveFile: (id: string) => void;
  handleProcessFiles: () => void;
  clearError: () => void;
  clearWarnings: () => void;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [validationSummary, setValidationSummary] =
    useState<ValidationSummary | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (selectedFiles: File[]) => {
    // Filter for CSV files
    const csvFiles = selectedFiles.filter((file) =>
      file.name.toLowerCase().endsWith(".csv")
    );

    if (csvFiles.length === 0) {
      setError("Please select CSV files only");
      return;
    }

    // Use the service to process the files
    const newFiles = processCSVFiles(csvFiles);

    setFiles((prev) => [...prev, ...newFiles]);

    // Count invalid files
    const invalidFileCount = newFiles.filter(
      (file) => file.status === "invalid"
    ).length;

    // Update validation summary using the service
    const summary = generateValidationSummary(newFiles);
    setValidationSummary(summary);

    // Set warnings based on validation
    const newWarnings: string[] = [];
    if (invalidFileCount > 0) {
      newWarnings.push(
        `${invalidFileCount} of ${newFiles.length} files have format issues`
      );
    }

    if (newWarnings.length > 0) {
      setWarnings(newWarnings);
    } else {
      setWarnings([]);
    }

    // Clear error if we have at least some valid files
    if (newFiles.length > invalidFileCount) {
      setError(null);
    } else if (invalidFileCount === newFiles.length) {
      setError("All uploaded files are invalid. Please check the file format.");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));

    // Re-evaluate warnings after file removal
    setTimeout(() => {
      const invalidCount = files.filter((f) => f.status === "invalid").length;
      if (invalidCount === 0) {
        setWarnings([]);
      }
    }, 0);
  };

  const handleProcessFiles = () => {
    if (files.length === 0) {
      setError("Please upload at least one file");
      return;
    }

    // Count valid files
    const validFiles = files.filter((file) => file.status === "valid");

    if (validFiles.length === 0) {
      setError(
        "No valid files to process. Please upload at least one valid file."
      );
      return;
    }

    setUploading(true);
    setError(null);

    // Simulate processing delay
    setTimeout(() => {
      setUploading(false);

      // Check if we have special conditions to demonstrate
      if (validationSummary && validationSummary.eligibleStudents === 0) {
        setError(
          "No eligible students found for ranking. Please check the files."
        );
      } else {
        setSuccess(true);
        // If we have warnings, show a different message
        if (warnings.length > 0) {
          setWarnings([
            ...warnings,
            "Files imported with warnings. Only valid files were processed.",
          ]);
        }
      }

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 2000);
  };

  const clearError = () => {
    setError(null);
  };

  const clearWarnings = () => {
    setWarnings([]);
  };

  return {
    files,
    validationSummary,
    dragActive,
    uploading,
    success,
    error,
    warnings,
    fileInputRef,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleFiles,
    handleRemoveFile,
    handleProcessFiles,
    clearError,
    clearWarnings,
  };
};
