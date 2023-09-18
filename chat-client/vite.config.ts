import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser",
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  mode: "development",
  build: {
    outDir: "dist",
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: [".js", ".cjs"],
      strictRequires: true,
      transformMixedEsModules: true,
    },
  },
});
