import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    // three.js alone is ~750 kB; it is lazy-loaded after first paint
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three";
          }
          if (
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/drei")
          ) {
            return "react-three";
          }
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion";
          }
        },
      },
    },
  },
});
