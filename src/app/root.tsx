import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { lazy } from "react";
import MigrateData from "@/shared/components/MigrateData";

const LoginPage = lazy(() => import("@/features/auth/pages/Login"));
const AuthLayout = lazy(() => import("@/features/auth/_layout"));
const TaskLayout = lazy(() => import("@/features/task/_layout"));
const HomePage = lazy(() => import("@/features/task/pages/Home"));
const ManageTaskPage = lazy(() => import("@/features/task/pages/Manage"));

const AboutPage = lazy(() => import("@/features/task/pages/About"));

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route element={<MigrateData />}>
          <Route path="/tasks" element={<TaskLayout />}>
            <Route index element={<HomePage />} />
            <Route path="manage" element={<ManageTaskPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
