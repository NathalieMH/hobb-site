import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://haderslebener.de",
  base: "/",
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
});
