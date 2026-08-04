import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  root: ".",
  publicDir: "public",
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // CSS minification is disabled for portability: the default (lightningcss)
    // ships as a platform-specific native binary, which can be missing when
    // node_modules is copied between machines/OSes (e.g. Windows -> Linux CI).
    // Re-enable ("lightningcss" or "esbuild") if your environment supports it.
    cssMinify: false,
  },
});
