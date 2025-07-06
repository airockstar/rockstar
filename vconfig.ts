import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"
import { buildAndCacheSearchIndex } from "./src/lib/build_index"
import devToolsJson from 'vite-plugin-devtools-json';
import path from 'path';


export default defineConfig({
  plugins: [
    devToolsJson({ }),
    sveltekit(),
    {
      name: "vite-build-search-index",
      writeBundle: {
        order: "post",
        sequential: false,
        handler: async () => {
          await buildAndCacheSearchIndex()
        },
      },
    },
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
    globals: true, /// allows to skip import of test functions like `describe`, `it`, `expect`, etc.
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@skunkworks": path.resolve(__dirname, "src/routes/production"),
      "@home": path.resolve(__dirname, "src/routes/(home)"),
      "@utils": path.resolve(__dirname, "src/utils")
    },
  },
})
