import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { validateEnvironment, logEnvironmentInfo } from './core/utils/environment'

// Validate and log environment configuration
validateEnvironment();
logEnvironmentInfo();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
