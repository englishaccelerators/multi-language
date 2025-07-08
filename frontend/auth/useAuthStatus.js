import { useAuthContext } from './AuthContext';

export function useAuthStatus() {
  const { user, loading } = useAuthContext();
  return {
    isAuthenticated: !!user,
    role: user?.role || null,
    loading,
  };
}
