// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Статьи собираются в /articles репозитория, чтобы GitHub Pages отдавал их
// по адресу https://mocking.ru/articles/
export default defineConfig({
  site: "https://mocking.ru",
  base: "/articles",
  outDir: "../articles",
  publicDir: "./public",
  trailingSlash: "ignore",
  build: {
    assets: "_assets",
  },
  integrations: [
    sitemap({
      lastmod: new Date(),
    }),
  ],
});
