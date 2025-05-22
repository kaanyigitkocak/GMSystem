import { getServiceConfig } from "./utils/serviceUtils";

// Import API services
import {
  getNotificationsApi,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  deleteNotificationApi,
} from "./api/notificationApi";

import { getGraduationRequirementsApi } from "./api/graduationRequirementsApi";
import { getTranscriptApi } from "./api/transcriptApi";
import {
  getGraduationProgressApi,
  getDisconnectionProceduresApi,
} from "./api/graduationProgressApi";

// Import mock services
import {
  getNotificationsMock,
  markNotificationAsReadMock,
  markAllNotificationsAsReadMock,
  deleteNotificationMock,
} from "./mock/notificationMock";

import { getGraduationRequirementsMock } from "./mock/graduationRequirementsMock";
import { getTranscriptMock } from "./mock/transcriptMock";
import {
  getGraduationProgressMock,
  getDisconnectionProceduresMock,
} from "./mock/graduationProgressMock";

// Import types
import type {
  Notification,
  GraduationRequirementsData,
  TranscriptData,
  GraduationStep,
  DisconnectionItem,
} from "./types";

// Get service configuration
const { useMock } = getServiceConfig();

// Notification services
export const getNotifications = async (): Promise<Notification[]> => {
  if (useMock) {
    return getNotificationsMock();
  }
  return getNotificationsApi();
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  if (useMock) {
    return markNotificationAsReadMock(id);
  }
  return markNotificationAsReadApi(id);
};

export const markAllNotificationsAsRead = async (): Promise<void> => {
  if (useMock) {
    return markAllNotificationsAsReadMock();
  }
  return markAllNotificationsAsReadApi();
};

export const deleteNotification = async (id: string): Promise<void> => {
  if (useMock) {
    return deleteNotificationMock(id);
  }
  return deleteNotificationApi(id);
};

// Graduation requirements services
export const getGraduationRequirements =
  async (): Promise<GraduationRequirementsData> => {
    if (useMock) {
      return getGraduationRequirementsMock();
    }
    return getGraduationRequirementsApi();
  };

// Transcript services
export const getTranscript = async (): Promise<TranscriptData> => {
  if (useMock) {
    return getTranscriptMock();
  }
  return getTranscriptApi();
};

// Graduation progress services
export const getGraduationProgress = async (): Promise<{
  steps: GraduationStep[];
  activeStep: number;
}> => {
  if (useMock) {
    return getGraduationProgressMock();
  }
  // API implementation would go here - for now just return mock data
  return getGraduationProgressApi();
};

// Disconnection procedures services
export const getDisconnectionProcedures = async (): Promise<
  DisconnectionItem[]
> => {
  if (useMock) {
    return getDisconnectionProceduresMock();
  }
  // API implementation would go here - for now just return mock data
  return getDisconnectionProceduresApi();
};
