import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          // React essencial — carrega no first paint
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("/react/jsx-runtime")
          ) {
            return "react-core";
          }
          // Tudo do Radix em chunk próprio (lazy via HeavyProviders)
          if (id.includes("@radix-ui")) return "radix";
          // TanStack Query lazy
          if (id.includes("@tanstack")) return "tanstack";
          // Recharts/D3 lazy (só usado em Diagnosis)
          if (id.includes("recharts") || id.includes("d3-")) return "charts";
          // Formulários, ícones, etc
          if (
            id.includes("react-hook-form") ||
            id.includes("react-day-picker") ||
            id.includes("react-resizable") ||
            id.includes("zod") ||
            id.includes("date-fns") ||
            id.includes("embla-carousel") ||
            id.includes("input-otp") ||
            id.includes("cmdk") ||
            id.includes("vaul") ||
            id.includes("sonner")
          ) {
            return "ui-extras";
          }
          if (id.includes("lucide-react")) return "icons";
          return "vendor";
        },
      },
    },
    assetsInlineLimit: 4096,
    minify: "esbuild",
    cssMinify: true,
    cssCodeSplit: true,
    sourcemap: false,
    target: "es2020",
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
  },
}));
