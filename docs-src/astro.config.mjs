// @ts-check
import { defineConfig } from "astro/config";

// Собираем доки в /docs репозитория, чтобы GitHub Pages отдавал их
// по адресу https://mocking.ru/docs/
export default defineConfig({
  site: "https://mocking.ru",
  base: "/docs",
  outDir: "../docs",
  publicDir: "./public",
  trailingSlash: "ignore",
  build: {
    assets: "_assets",
  },
});
