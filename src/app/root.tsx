import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginPage from "@/features/auth/pages/Login";
import AuthLayout from "@/features/auth/_layout";
import TaskLayout from "@/features/task/_layout";
import HomePage from "@/features/task/pages/Home";
import ManageTaskPage from "@/features/task/pages/Manage";
import AboutPage from "@/features/task/pages/About";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="/tasks" element={<TaskLayout />}>
          <Route index element={<HomePage />} />
          <Route path="manage" element={<ManageTaskPage />} />
          <Route path="about" element={<AboutPage />} />
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
