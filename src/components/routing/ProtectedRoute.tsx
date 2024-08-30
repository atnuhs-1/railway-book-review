import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type ProtectedRouteProps = {
  redirectHome?: boolean;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectHome = false,
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    if (redirectHome) {
      return <Navigate to="/" replace state={{ from: location }} />;
    } else {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }
  }

  return <Outlet />;
};
