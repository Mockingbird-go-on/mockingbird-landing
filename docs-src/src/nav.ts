import type { Locale } from "./i18n";

export interface NavItem {
  label: string;
  href: string;
  desc?: string;
}

export interface NavGroup {
  label: string;
  desc?: string;
  items: NavItem[];
}

export type NavEntry = NavItem | NavGroup;

const ru: NavEntry[] = [
  { label: "Обзор", href: "/docs/" },
  {
    label: "Установка",
    href: "/docs/install/",
    desc: "Скачивание и установка Mockingbird на Windows 10/11 и Linux, первый запуск.",
  },
  {
    label: "Настройка",
    desc: "Выбор модели распознавания речи, режимы работы и проверка.",
    items: [
      {
        label: "Выбор STT-модели",
        href: "/docs/setup/stt-model/",
        desc: "Как выбрать модель faster-whisper: точность, скорость, требования к GPU.",
      },
      {
        label: "Режимы работы",
        href: "/docs/setup/modes/",
        desc: "Источник вопросов (системный звук, микрофон), проверка работы и режим Невидимка.",
      },
    ],
  },
  {
    label: "База знаний",
    href: "/docs/knowledge-base/",
    desc: "Как загрузить PDF-резюме и управлять контекстом ответов LLM.",
  },
  {
    label: "FAQ",
    href: "/docs/faq/",
    desc: "Частые вопросы: приватность, CUDA, режим Невидимка, цена.",
  },
];

const en: NavEntry[] = [
  { label: "Overview", href: "/docs/en/" },
  {
    label: "Installation",
    href: "/docs/en/install/",
    desc: "Download and install Mockingbird on Windows 10/11 and Linux, first launch.",
  },
  {
    label: "Setup",
    desc: "Choosing a speech recognition model, operating modes and testing.",
    items: [
      {
        label: "Choosing an STT model",
        href: "/docs/en/setup/stt-model/",
        desc: "How to pick a faster-whisper model: accuracy, speed, GPU requirements.",
      },
      {
        label: "Operating modes",
        href: "/docs/en/setup/modes/",
        desc: "Question source (system audio, microphone), testing and Invisible Mode.",
      },
    ],
  },
  {
    label: "Knowledge base",
    href: "/docs/en/knowledge-base/",
    desc: "How to load a PDF résumé and manage the LLM answer context.",
  },
  {
    label: "FAQ",
    href: "/docs/en/faq/",
    desc: "Common questions: privacy, CUDA, Invisible Mode, price.",
  },
];

export const navByLocale: Record<Locale, NavEntry[]> = { ru, en };

export const isGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

export const flatNav = (locale: Locale): NavItem[] =>
  navByLocale[locale].flatMap((entry) => (isGroup(entry) ? entry.items : [entry]));

/* Карта соответствия RU ↔ EN страниц (для hreflang и переключателя) */
export const hreflangMap: { ru: string; en: string }[] = [
  { ru: "/docs/", en: "/docs/en/" },
  { ru: "/docs/install/", en: "/docs/en/install/" },
  { ru: "/docs/setup/stt-model/", en: "/docs/en/setup/stt-model/" },
  { ru: "/docs/setup/modes/", en: "/docs/en/setup/modes/" },
  { ru: "/docs/knowledge-base/", en: "/docs/en/knowledge-base/" },
  { ru: "/docs/faq/", en: "/docs/en/faq/" },
];

const norm = (p: string) => p.replace(/\/+$/, "") || "/";

export const counterpart = (pathname: string): string | undefined => {
  const p = norm(pathname);
  const pair = hreflangMap.find((m) => norm(m.ru) === p || norm(m.en) === p);
  if (!pair) return undefined;
  return norm(pair.ru) === p ? pair.en : pair.ru;
};
