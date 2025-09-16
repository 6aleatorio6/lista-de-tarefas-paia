import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() =>
  import("@/features/auth/pages/Login").then((m) => ({ default: m.LoginPage }))
);
const AuthLayout = lazy(() =>
  import("@/features/auth/_layout").then((m) => ({ default: m.AuthLayout }))
);
const TaskLayout = lazy(() => import("@/features/task/_layout"));
const HomePage = lazy(() =>
  import("@/features/task/pages/Home").then((m) => ({ default: m.HomePage }))
);
const ManageTaskPage = lazy(() => import("@/features/task/pages/Manage"));

const AboutPage = lazy(() =>
  import("@/features/task/pages/About").then((m) => ({ default: m.AboutPage }))
);

export function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </HashRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
