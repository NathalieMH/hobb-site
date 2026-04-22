import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://nathaliemh.github.io",
  base: "/hobb-site/",
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
});
