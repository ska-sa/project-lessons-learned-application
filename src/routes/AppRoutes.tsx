// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../../src/components/navigation/Layout";
import DashboardPage from "../../src/pages/DashboardPage";
import LessonsPage from "../../src/pages/LessonsPage";
import ProjectsPage from "../../src/pages/ProjectPage";
import ReportsPage from "../../src/pages/ReportsPage";
import LoginPage from "../../src/pages/LoginPage";
import ProtectedRoute from "../../src/features/auth/ProtectedRoute";
import LessonDetailPage from "../../src/pages/LessonDetailPage";
import AdminPage from "../../src/pages/AdminPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons"
          element={
            <ProtectedRoute>
              <LessonsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lessons/:id"
          element={
            <ProtectedRoute>
              <LessonDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
