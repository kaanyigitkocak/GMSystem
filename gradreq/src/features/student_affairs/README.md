# Secretary Feature

This directory contains all the components, services, and utilities related to the secretary functionality of the Graduation Management System.

## Purpose

The secretary feature provides functionality for departmental secretaries to:

- Process student graduation requests
- Upload and verify student transcripts
- Create department graduation ranking lists
- Manage notifications related to the graduation process

## Directory Structure

The feature follows a modular architecture with the following structure:

- **components/**: Reusable UI components specific to the secretary feature
- **hooks/**: Custom React hooks used by secretary components
- **layout/**: Layout components like SecretaryDashboardLayout
- **pages/**: Page components that represent full screens in the application
- **services/**: API service functions for data fetching and mutations
- **types/**: TypeScript interfaces and types for the secretary feature

## Pages

- **SecretaryDashboardPage**: Main dashboard showing summary information
- **TranscriptProcessingPage**: Upload and process student transcripts
- **DepartmentRankingPage**: Create and manage graduation ranking lists
- **NotificationsPage**: View and manage notifications

## Usage

Import components and hooks from their respective folders:

```tsx
// Importing components
import { SomeComponent } from "features/secretary/components";

// Importing services
import { getNotifications } from "features/secretary/services/secretaryService";

// Importing types
import type { Notification } from "features/secretary/types/secretary";
```
