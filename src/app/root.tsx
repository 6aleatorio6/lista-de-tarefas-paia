import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LoginPage } from "@/features/auth/pages/Login";
import { AuthLayout } from "@/features/auth/_layout";
import CreateTaskPage from "@/features/task/pages/Create";
import TaskLayout from "@/features/task/_layout";
import { HomePage } from "@/features/task/pages/Home";
import RemoveTaskPage from "@/features/task/pages/Remove";

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/tasks" element={<TaskLayout />}>
          <Route index element={<HomePage />} />
          <Route path="new" element={<CreateTaskPage />} />
          <Route path="remove" element={<RemoveTaskPage />} />
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
