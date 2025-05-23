import { useState } from "react";

interface NotificationState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

interface UseUploadGraduationDecisionsReturn {
  uploadedFiles: Record<string, File | null>;
  notification: NotificationState;
  handleFileUpload: (
    department: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleCloseNotification: () => void;
}

export const useUploadGraduationDecisions =
  (): UseUploadGraduationDecisionsReturn => {
    const [uploadedFiles, setUploadedFiles] = useState<
      Record<string, File | null>
    >({});
    const [notification, setNotification] = useState<NotificationState>({
      open: false,
      message: "",
      severity: "success",
    });

    const handleFileUpload = (
      department: string,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setUploadedFiles((prev) => ({
          ...prev,
          [department]: file,
        }));
        console.log(`File uploaded for ${department}:`, file);

        // Show success notification
        setNotification({
          open: true,
          message: `File uploaded successfully for ${department}`,
          severity: "success",
        });
      }
    };

    const handleCloseNotification = () => {
      setNotification((prev) => ({ ...prev, open: false }));
    };

    return {
      uploadedFiles,
      notification,
      handleFileUpload,
      handleCloseNotification,
    };
  };
