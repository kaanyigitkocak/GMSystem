import React from 'react';
import { Box, Paper, Typography, Alert, Divider } from '@mui/material';
import { getEnvironmentConfig } from '../core/utils/environment';
import { getServiceConfig } from '../features/common/utils/serviceUtils';

const EnvDebugComponent: React.FC = () => {
  const envConfig = getEnvironmentConfig();
  const serviceConfig = getServiceConfig();

  return (
    <Box sx={{ mb: 3 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Environment Debug Information
        </Typography>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          Current Environment Configuration
        </Alert>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Vite Mode: {import.meta.env.MODE}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Environment: {envConfig.environment}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            API Source: {envConfig.apiSource}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Use Mock: {envConfig.useMock ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            API Base URL: {envConfig.apiBaseUrl}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Is Development: {envConfig.isDevelopment ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Is Production: {envConfig.isProduction ? 'Yes' : 'No'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Service Configuration
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Service API Base URL: {serviceConfig.apiBaseUrl}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Service Use Mock: {serviceConfig.useMock ? 'Yes' : 'No'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Environment Variables
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            VITE_API_SOURCE: {import.meta.env.VITE_API_SOURCE || 'undefined'}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            VITE_API_BASE_URL: {import.meta.env.VITE_API_BASE_URL || 'undefined'}
          </Typography>
        </Box>

        {envConfig.useMock && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Currently using MOCK data. Backend API calls are disabled.
          </Alert>
        )}

        {!envConfig.useMock && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Currently using API mode. Backend calls should be active.
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default EnvDebugComponent;
