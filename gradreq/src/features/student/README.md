# Student Feature

This directory contains all the components, services, and utilities related to the student functionality of the Graduation Management System.

## Purpose

The student feature provides functionality for students to:

- View their graduation requirements and progress
- Access their academic transcripts
- Request manual graduation checks for special cases
- Upload disengagement certificates for graduation clearance

## Directory Structure

The feature follows a modular architecture with the following structure:

- **components/**: Reusable UI components specific to the student feature
- **hooks/**: Custom React hooks used by student components
- **layout/**: Layout components like StudentDashboardLayout
- **pages/**: Page components that represent full screens in the application
- **services/**: API service functions for data fetching and mutations
- **types/**: TypeScript interfaces and types for the student feature

## Pages

- **StudentDashboardPage**: Main dashboard showing summary information
- **TranscriptPage**: View academic transcript and course history
- **GraduationRequirementsPage**: Track progress towards graduation requirements
- **ManualCheckPage**: Request manual graduation checks for special cases
- **DisengagementCertificatesPage**: Upload disengagement certificates from departments

## Usage

Import components and hooks from their respective folders:

```tsx
// Importing components
import { SomeComponent } from "features/student/components";

// Importing layout
import { StudentDashboardLayout } from "features/student/layout/StudentDashboardLayout";

// Importing types
import type { StudentTranscript } from "features/student/types";
```
