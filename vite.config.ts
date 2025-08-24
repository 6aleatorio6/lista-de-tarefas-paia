import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  base: "/lista-de-tarefas-paia/",
  build: { outDir: "build" },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
