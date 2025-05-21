# Authentication Feature

This directory contains all the components, services, and utilities related to the authentication functionality of the Graduation Management System.

## Purpose

The authentication feature provides functionality for:

- User login and authentication
- Registration for different user types (student, secretary, advisor, etc.)
- Password reset and recovery
- Managing user sessions and authorization

## Directory Structure

The feature follows a modular architecture with the following structure:

- **components/**: Reusable UI components specific to authentication
  - **forms/**: Registration and login form components for different user types
- **contexts/**: React context providers for authentication state
- **hooks/**: Custom React hooks for authentication (e.g., useAuth)
- **pages/**: Page components like LoginPage
- **services/**: API service functions for authentication operations
- **types/**: TypeScript interfaces and types for authentication

## Components

- **LoginForm**: Form for user login
- **RegisterDialog**: Registration dialog with multi-step process
- **ForgotPasswordDialog**: Dialog for password recovery
- **User type registration forms**:
  - StudentRegistrationForm
  - SecretaryRegistrationForm
  - AdvisorRegistrationForm
  - DeansOfficeRegistrationForm

## Usage

Import components, hooks, and context from their respective folders:

```tsx
// Importing auth context
import { useAuth } from "features/auth/contexts/AuthContext";

// Importing components
import { LoginForm } from "features/auth/components/LoginForm";

// Importing types
import { UserType } from "features/auth/types";
```
