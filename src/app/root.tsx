import { Routes, BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

export function App() {
  return (
    <BrowserRouter basename="/lista-de-tarefas-paia">
      <Routes></Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
