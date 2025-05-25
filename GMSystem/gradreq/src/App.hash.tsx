import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './core/styles/theme';
import { QueryProvider } from './core/providers/QueryProvider';
import AppRoutes from './routes/AppRoutes';

/**
 * Alternative App component using HashRouter
 * Use this if you're having issues with BrowserRouter in production
 * 
 * To use this:
 * 1. Rename App.tsx to App.browser.tsx
 * 2. Rename App.hash.tsx to App.tsx
 * 3. Rebuild and deploy
 * 
 * HashRouter uses URL hash (#) to handle routing client-side,
 * which prevents 404 errors on page refresh since the server
 * only sees the base URL without the hash part.
 */
function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryProvider>
          <AppRoutes />
        </QueryProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App; 