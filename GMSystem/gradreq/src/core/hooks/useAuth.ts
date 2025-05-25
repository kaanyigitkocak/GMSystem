import { useAuthStore } from "../stores/authStore";

// Modern useAuth hook that uses Zustand store
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
    setLoading,
    validateToken,
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
    setLoading,
    validateToken,
  };
};
