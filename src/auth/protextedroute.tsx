import { Navigate } from "react-router-dom";
import { useAuth } from "./authcontext";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};

export default ProtectedRoute;
