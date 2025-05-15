// src/features/auth/ProtectedRoute.tsx
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  children: ReactElement;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useAuth();

  if (loading) {
    return null; // or a loading spinner component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !(user.role === "admin" || user.isAdmin)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
