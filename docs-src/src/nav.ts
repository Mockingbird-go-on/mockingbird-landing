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

export const nav: NavEntry[] = [
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

export const isGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

export const flatNav: NavItem[] = nav.flatMap((entry) =>
  isGroup(entry) ? entry.items : [entry]
);
