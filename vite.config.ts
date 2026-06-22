import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import contactHandler from "./api/contact";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load local env variables (including non-VITE_ prefixed ones)
  const env = loadEnv(mode, process.cwd(), "");
  process.env.RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  process.env.SENDER_EMAIL = env.SENDER_EMAIL || process.env.SENDER_EMAIL;
  process.env.RECEIVER_EMAIL = env.RECEIVER_EMAIL || process.env.RECEIVER_EMAIL;

  return {
    plugins: [
      react(),
      {
        name: "api-contact-local",
        configureServer(server) {
          server.middlewares.use("/api/contact", (req: any, res: any) => {
            let body = "";
            req.on("data", (chunk: any) => {
              body += chunk;
            });
            req.on("end", async () => {
              try {
                req.body = body ? JSON.parse(body) : {};
              } catch (err) {
                req.body = {};
              }

              // Mock Vercel serverless helper methods
              res.status = (code: number) => {
                res.statusCode = code;
                return res;
              };
              res.json = (data: any) => {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(data));
                return res;
              };

              try {
                // Call the actual contact handler
                await contactHandler(req, res);
              } catch (err) {
                console.error("Local API Handler Error:", err);
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ success: false, error: "Internal Server Error" }));
              }
            });
          });
        },
      },
    ],
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
  };
});
