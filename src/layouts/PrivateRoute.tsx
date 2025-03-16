import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "@contexts/AuthContext";


interface PrivateRouteProps {
  allowedRoles?: string[]; // ✅ Define roles that can access this route
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  return (
    <AuthProvider>
      <ProtectedContent allowedRoles={allowedRoles} />
    </AuthProvider>
  );
};

const ProtectedContent = ({ allowedRoles }: PrivateRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" replace />;

  // ✅ Role-based access control
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
