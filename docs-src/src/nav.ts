export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: "Обзор", href: "/docs/" },
  { label: "Установка", href: "/docs/install/" },
  { label: "База знаний", href: "/docs/knowledge-base/" },
  { label: "FAQ", href: "/docs/faq/" },
];
