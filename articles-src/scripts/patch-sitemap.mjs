// Добавляет xhtml:link hreflang-пары в sitemap-0.xml после сборки Astro.
// Пары: /articles/<slug>/ ↔ /articles/en/<slug>/ (+ questions, index).
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const outDir = resolve("../articles");
const file = resolve(outDir, "sitemap-0.xml");
let xml = readFileSync(file, "utf8");

const SITE = "https://mocking.ru";
const BASE = "/articles";

const urlBlockRe = /<url>([\s\S]*?)<\/url>/g;
xml = xml.replace(urlBlockRe, (_m, block) => {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!loc) return `<url>${block}</url>`;
  const path = loc.replace(SITE + BASE, "").replace(/\/+$/, "");
  const isEn = path.startsWith("/en");
  const other = isEn
    ? path.replace(/^\/en/, "") || "/"
    : "/en" + (path === "/" ? "" : path);
  const otherLoc = `${SITE}${BASE}${other === "/" ? "/" : other + "/"}`;
  const ruLoc = isEn ? otherLoc : loc;
  const enLoc = isEn ? loc : otherLoc;
  const alts =
    `    <xhtml:link rel="alternate" hreflang="ru" href="${ruLoc}"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>\n` +
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${ruLoc}"/>\n`;
  return `<url>\n${alts}${block.replace(/^\n/, "")}</url>`;
});

if (!xml.includes("xmlns:xhtml")) {
  xml = xml.replace(
    '<urlset xmlns=',
    '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns='
  );
}
writeFileSync(file, xml);
console.log("sitemap hreflang: patched", file);
