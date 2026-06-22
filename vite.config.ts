import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three") || id.includes("@react-three")) {
              return "three";
            }
            if (id.includes("framer-motion")) {
              return "framer";
            }
            if (id.includes("react-tilt") || id.includes("react-vertical-timeline-component")) {
              return "ui-libs";
            }
          }
        },
      },
    },
    // Optimize chunk sizes
    chunkSizeWarningLimit: 1000,
  },
  // Development server optimizations
  server: {
    middlewareMode: false,
    hmr: {
      host: "localhost",
      port: 5173,
    },
  },
});
