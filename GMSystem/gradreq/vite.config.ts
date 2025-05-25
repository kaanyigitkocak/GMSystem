import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  // Determine proxy target based on environment
  const getProxyTarget = () => {
    const apiSource = env.VITE_API_SOURCE || "mock";

    switch (apiSource) {
      case "test":
      case "development":
        return "http://localhost:5278";
      case "production":
        return "https://gradsysbackend.onrender.com";
      default:
        // Mock mode - no proxy needed
        return null;
    }
  };

  const proxyTarget = getProxyTarget();

  // Build the config object properly
  const serverConfig: any = {
    host: true, // Allow connections from any host
    port: 5173, // Explicit port configuration
    allowedHosts: ["5d24-193-140-250-85.ngrok-free.app"],
  };

  // Add SPA fallback for development
  serverConfig.historyApiFallback = true;

  // Only add proxy if we're not in mock mode
  if (proxyTarget) {
    serverConfig.proxy = {
      "/api": {
        target: proxyTarget,
        changeOrigin: true,
        secure: true,
        rewrite: (path: string) => path.replace(/^\/api/, "/api"),
      },
    };
  }

  console.log("Vite Config:", {
    mode,
    apiSource: env.VITE_API_SOURCE,
    proxyTarget,
    hasProxy: !!proxyTarget,
  });

  return {
    plugins: [react()],
    server: serverConfig,
    base: "/",
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    preview: {
      port: 4173,
      host: true,
      historyApiFallback: true,
    },
  };
});
