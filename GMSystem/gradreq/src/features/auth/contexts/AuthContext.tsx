import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginUser, type User } from '../services';

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
    // Check for stored token and user on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('Found stored token and user data:', userData);
        
        // Validate user data structure and role
        if (userData && userData.role && userData.email) {
          // Check if the role is valid
          const validRoles = ['student', 'admin', 'advisor', 'secretary', 'deans_office', 'student_affairs'];
          if (validRoles.includes(userData.role)) {
            console.log('Valid user data found, setting user:', userData);
            setUser(userData);
            setToken(storedToken);
          } else {
            console.warn('Invalid user role found in localStorage:', userData.role);
            // Clear invalid auth data
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
          }
        } else {
          console.warn('Incomplete user data found in localStorage');
          // Clear invalid auth data
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
        }
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        // Clear invalid auth data
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log(`Attempting login for: ${email}`);
      // Use our auth service to log in
      const { user: userData, token: authToken } = await loginUser(email, password);
      console.log('[AuthContext] Login successful, user:', userData);
      console.log('[AuthContext] User role:', userData.role);
      console.log('[AuthContext] User role type:', typeof userData.role);
      console.log('[AuthContext] Generated token:', authToken);
      
      // Store token and user in localStorage for persistence
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('authUser', JSON.stringify(userData));
      
      // Update state after successful storage
      setUser(userData);
      setToken(authToken);
    } catch (error) {
      console.error('Login failed:', error);
      // Clean up any potentially corrupted data
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      setUser(null);
      setToken(null);
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