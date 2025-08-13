import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
    "process.env": {
      NEXTAUTH_URL: JSON.stringify(
        process.env.NEXTAUTH_URL || "http://localhost:5174"
      ),
      NEXTAUTH_SECRET: JSON.stringify(process.env.NEXTAUTH_SECRET),
      GITHUB_CLIENT_ID: JSON.stringify(process.env.GITHUB_CLIENT_ID),
      GITHUB_CLIENT_SECRET: JSON.stringify(process.env.GITHUB_CLIENT_SECRET),
    },
  },
});
