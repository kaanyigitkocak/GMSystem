import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './core/styles/theme';
import { AuthProvider } from './features/auth/contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import EnvTestComponent from './components/EnvTestComponent';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AppRoutes />
          {/* Environment Test Component - sadece development amaçlı */}
          {import.meta.env.DEV && <EnvTestComponent />}
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
