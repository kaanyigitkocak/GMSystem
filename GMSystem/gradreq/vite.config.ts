import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow connections from any host
    port: 5173, // Explicit port configuration
    allowedHosts: ["5d24-193-140-250-85.ngrok-free.app"],
    // Configure proxy if needed for backend API calls
    proxy: {
      '/api': {
        target: 'http://localhost:5278',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
