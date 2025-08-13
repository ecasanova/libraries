import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Cargar las variables de entorno
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      global: "globalThis",
      "process.env.NEXTAUTH_URL": JSON.stringify(
        env.NEXTAUTH_URL || "http://localhost:5174"
      ),
      "process.env.NEXTAUTH_SECRET": JSON.stringify(env.NEXTAUTH_SECRET),
      "process.env.GITHUB_CLIENT_ID": JSON.stringify(env.GITHUB_CLIENT_ID),
      "process.env.GITHUB_CLIENT_SECRET": JSON.stringify(env.GITHUB_CLIENT_SECRET),
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  };
});
