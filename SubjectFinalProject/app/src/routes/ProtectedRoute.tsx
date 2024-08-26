import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "../context/UseAuthContext";

interface ProtectedRouteProps {
  component: React.ComponentType;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  path,
  exact = false,
}) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        isAuthenticated ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};
