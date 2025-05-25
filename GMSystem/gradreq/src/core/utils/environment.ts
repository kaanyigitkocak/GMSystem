/**
 * Environment validation and utilities
 */

export type Environment = 'mock' | 'test' | 'development' | 'production';

export interface EnvironmentConfig {
  environment: Environment;
  apiSource: string;
  apiBaseUrl: string;
  useMock: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
}

/**
 * Get current environment configuration with validation
 */
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const mode = import.meta.env.MODE || 'development';
  const apiSource = import.meta.env.VITE_API_SOURCE || 'mock';
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Validate environment variables
  if (!['mock', 'test', 'development', 'production'].includes(apiSource)) {
    console.warn(`Invalid VITE_API_SOURCE: ${apiSource}. Falling back to 'mock'.`);
  }

  const environment = determineEnvironment(mode, apiSource);
  const useMock = apiSource === 'mock';
  const isDevelopment = mode === 'development' || mode === 'mock';
  const isProduction = mode === 'production';

  let apiBaseUrl: string;

  switch (apiSource) {
    case 'mock':
      apiBaseUrl = 'http://localhost:5173'; // Not used in mock mode
      break;
    case 'test':
    case 'development':
      apiBaseUrl = configuredBaseUrl || 'http://localhost:5278/api';
      break;
    case 'production':
      apiBaseUrl = configuredBaseUrl || 'https://gradsysbackend.onrender.com/api';
      break;
    default:
      apiBaseUrl = 'http://localhost:5278/api';
  }

  return {
    environment,
    apiSource,
    apiBaseUrl,
    useMock,
    isDevelopment,
    isProduction,
  };
};

/**
 * Determine environment based on mode and API source
 */
function determineEnvironment(mode: string, apiSource: string): Environment {
  if (apiSource === 'mock') return 'mock';
  if (apiSource === 'production') return 'production';
  if (apiSource === 'test') return 'test';
  
  // Fallback logic
  if (mode === 'production') return 'production';
  if (mode === 'development') return 'development';
  
  return 'mock';
}

/**
 * Validate environment configuration
 */
export const validateEnvironment = (): boolean => {
  try {
    const config = getEnvironmentConfig();
    
    // Check if required environment variables are set
    if (config.apiSource !== 'mock' && !config.apiBaseUrl) {
      console.error('API base URL is required for non-mock environments');
      return false;
    }

    // Check URL validity for non-mock environments
    if (config.apiSource !== 'mock') {
      try {
        new URL(config.apiBaseUrl);
      } catch (error) {
        console.error('Invalid API base URL:', config.apiBaseUrl);
        return false;
      }
    }

    console.log('Environment validation passed:', config);
    return true;
  } catch (error) {
    console.error('Environment validation failed:', error);
    return false;
  }
};

/**
 * Log environment information
 */
export const logEnvironmentInfo = (): void => {
  const config = getEnvironmentConfig();
  
  console.group('🌍 Environment Configuration');
  console.log('Environment:', config.environment);
  console.log('Mode:', import.meta.env.MODE);
  console.log('API Source:', config.apiSource);
  console.log('API Base URL:', config.apiBaseUrl);
  console.log('Use Mock:', config.useMock);
  console.log('Is Development:', config.isDevelopment);
  console.log('Is Production:', config.isProduction);
  console.log('All Env Vars:', {
    VITE_API_SOURCE: import.meta.env.VITE_API_SOURCE,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD,
  });
  console.groupEnd();
};
