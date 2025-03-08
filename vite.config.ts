import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@/": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@config": "/src/config",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@services": "/src/services",
      "@contexts": "/src/contexts",
      "@assets": "/src/assets",
      "@layouts": "/src/layouts",
      "@features": "/src/features",




    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"], // Separate React libraries
          icons: ["lucide-react"], // Separate icon libraries
        },
      },
    },
    chunkSizeWarningLimit: 1000, // (Optional) Increase warning limit to 1MB
  },
});
