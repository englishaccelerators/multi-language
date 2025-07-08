// src/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

export default function ProtectedRoute({ children, role = null }) {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;

  return children;
}
