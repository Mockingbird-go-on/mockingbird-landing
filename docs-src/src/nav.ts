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
  { label: "Установка", href: "/docs/install/", desc: "Требования, установка и первый запуск на Windows и Linux." },
  {
    label: "Настройка",
    desc: "Выбор модели, режимы работы и тонкая настройка под себя.",
    items: [
      {
        label: "Выбор STT-модели",
        href: "/docs/setup/stt-model/",
        desc: "На что обратить внимание при выборе модели распознавания речи.",
      },
      {
        label: "Режимы работы",
        href: "/docs/setup/modes/",
        desc: "Настройка источника вопросов и проверка работы.",
      },
    ],
  },
  { label: "База знаний", href: "/docs/knowledge-base/", desc: "Как загрузить PDF-резюме и управлять контекстом ответов." },
  { label: "FAQ", href: "/docs/faq/", desc: "Ответы на частые вопросы." },
];

export const isGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

export const flatNav: NavItem[] = nav.flatMap((entry) =>
  isGroup(entry) ? entry.items : [entry]
);
