# Features Directory

This directory contains the feature-based architecture of the Graduation Management System application. Each subdirectory represents a major feature or domain within the application.

## Feature-Based Architecture

The application follows a feature-based architecture where code is organized by business domain rather than technical concern. This approach offers several benefits:

- **Improved Modularity**: Each feature is self-contained with its own components, services, and utilities
- **Better Maintainability**: Easier to understand the codebase as related code is grouped together
- **Enhanced Scalability**: New features can be added with minimal impact on existing code
- **Team Collaboration**: Different teams can work on different features with less coordination overhead

## Core Features

The application is divided into these main features:

- **auth/**: Authentication and user management
- **student/**: Student-facing features for managing graduation requirements
- **secretary/**: Secretary-facing features for managing student graduation processes
- **core/**: Shared utilities, components, and styles used across features

## Directory Structure

Each feature follows a consistent internal structure:

```
feature/
├── components/     # UI components specific to the feature
├── hooks/          # Custom React hooks
├── pages/          # Full page components
├── services/       # API services and data fetching
├── types/          # TypeScript types and interfaces
├── utils/          # Utility functions
├── contexts/       # React context providers (if needed)
└── README.md       # Documentation for the feature
```

## Core Directory

The `core/` directory contains application-wide shared resources:

```
core/
├── components/     # Shared UI components used across features
├── styles/         # Global styles and theme configuration
├── hooks/          # Shared hooks used across features
├── utils/          # Shared utility functions
└── assets/         # Images, fonts, and other static assets
```

## Best Practices

When working with this architecture:

1. Import directly from feature directories rather than relative paths
2. Keep feature-specific code within its feature directory
3. Move shared code to the core directory
4. Each feature should have its own types defined in its types directory
5. Follow the principle of least knowledge - features should not directly depend on internals of other features
