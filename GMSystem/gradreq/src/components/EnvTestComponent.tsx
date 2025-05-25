// Environment Test Component
import React from 'react';
import { getServiceConfig } from '../features/common/utils/serviceUtils';

export const EnvTestComponent: React.FC = () => {
  const config = getServiceConfig();
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 10, 
      right: 10, 
      background: '#f0f0f0', 
      padding: '10px', 
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999 
    }}>
      <strong>Environment Info:</strong>
      <br />
      <strong>Mode:</strong> {import.meta.env.MODE}
      <br />
      <strong>API Source:</strong> {import.meta.env.VITE_API_SOURCE}
      <br />
      <strong>API Base URL:</strong> {config.apiBaseUrl}
      <br />
      <strong>Use Mock:</strong> {config.useMock ? 'Yes' : 'No'}
      <br />
      <strong>Configured URL:</strong> {import.meta.env.VITE_API_BASE_URL}
    </div>
  );
};

export default EnvTestComponent;
