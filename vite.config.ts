import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/lista-de-tarefas-paia/",
  build: { outDir: "build" },
  resolve: { alias: { "@": path.resolve(__dirname, "./src/") } },
});
