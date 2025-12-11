import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const allowedHosts = env.VITE_ALLOWED_HOSTS
    ? env.VITE_ALLOWED_HOSTS.split(",").map(h => h.trim())
    : [];

  return {
    base: "./",
    plugins: [react(), tailwindcss()],
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
        "@helpers": "/src/helpers",
      },
    },
    server: {
      host: true,
      allowedHosts,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            icons: ["lucide-react"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
