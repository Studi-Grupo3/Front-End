// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// const ProtectedByRoleRoute = ({ allowedRoles }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <p>Verificando autenticação...</p>;
//   }

//   if (!user) {
//     return <Navigate to="/entrar" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />; 
//   }

//   return <Outlet />;
// };

// export default ProtectedByRoleRoute;
