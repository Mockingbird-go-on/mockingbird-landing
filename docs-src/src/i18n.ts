export type Locale = "ru" | "en";

export const UI = {
  ru: {
    docsLabel: "docs",
    toMain: "на главную ↗",
    articles: "статьи",
    github: "GitHub ↗",
    toc: "Содержание",
    breadcrumbDocs: "Документация",
    releases: "релизы",
    telegram: "telegram",
    langSwitch: "EN",
    langSwitchHref: "",
  },
  en: {
    docsLabel: "docs",
    toMain: "home ↗",
    articles: "articles",
    github: "GitHub ↗",
    toc: "Contents",
    breadcrumbDocs: "Documentation",
    releases: "releases",
    telegram: "telegram",
    langSwitch: "RU",
    langSwitchHref: "",
  },
} as const;
