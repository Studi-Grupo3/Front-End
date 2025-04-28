import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Verificando autenticação...</p>; 
  }

  return user ? <Outlet /> : <Navigate to="/entrar" replace />;
};