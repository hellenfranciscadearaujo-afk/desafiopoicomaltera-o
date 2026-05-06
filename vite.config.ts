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
    // Deixamos o Vite/Rollup fazer o code-splitting automático.
    // O code-splitting manual estava quebrando a ordem de carregamento
    // (vendor carregava antes do react-core e dava erro createContext).
    rollupOptions: {
      output: {
        // Sem manualChunks: Vite cria chunks otimizados a partir
        // dos lazy imports já existentes em App.tsx (Index, Loading, etc.)
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
