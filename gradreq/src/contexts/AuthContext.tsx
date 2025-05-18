import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'student' | 'admin' | 'advisor' | 'secretary' | 'deans_office' | 'student_affairs';
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // If we have a token, try to get the user info
      // In a real app, we would validate the token with the server
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } catch (error) {
          console.error('Failed to parse stored user', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
        }
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // TODO: API call will be implemented here
      // For now, simulate successful login
      console.log('Login attempt with:', email, password);
      
      // Determine role based on email for testing
      let role: User['role'] = 'student';
      
      if (email.includes('secretary') || email.includes('sekreter')) {
        role = 'secretary';
      } else if (email.includes('advisor') || email.includes('danisman')) {
        role = 'advisor';
      } else if (email.includes('dean') || email.includes('dekan')) {
        role = 'deans_office';
      } else if (email.includes('affairs') || email.includes('isleri')) {
        role = 'student_affairs';
      } else if (email.includes('admin')) {
        role = 'admin';
      }
      
      // Simulated response
      const mockUser: User = {
        id: '1',
        email,
        role,
        name: email.split('@')[0], // Use part of email as name for simplicity
      };
      
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      
      // Store token and user in localStorage for persistence
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('authUser', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };
  
  const value = {
    user,
    token,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 