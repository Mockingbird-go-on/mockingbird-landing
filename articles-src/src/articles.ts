export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tag: string;
}

export const articles: Article[] = [
  {
    slug: "how-to-choose-assistant",
    title: "Как выбрать ассистента для собеседований в 2026 году",
    description:
      "На что смотреть при выборе ассистента для технических интервью: локальность, точность распознавания речи, задержка ответа, приватность и поддержка платформ.",
    date: "2026-09-24",
    readingTime: "6 мин",
    tag: "Гайд",
  },
  {
    slug: "offline-vs-cloud-stt",
    title: "Офлайн или облако: где обрабатывать речь на собеседовании",
    description:
      "Сравнение локального и облачного распознавания речи: приватность, задержка, стоимость, зависимость от интернета и риски утечки.",
    date: "2026-09-24",
    readingTime: "5 мин",
    tag: "Разбор",
  },
  {
    slug: "whisper-large-v3-turbo",
    title: "Почему faster-whisper large-v3-turbo — оптимальная модель",
    description:
      "Разбор модели распознавания речи large-v3-turbo: точность, скорость, требования к GPU и сравнение с small/medium/large-v3.",
    date: "2026-09-24",
    readingTime: "6 мин",
    tag: "Технологии",
  },
  {
    slug: "privacy-invisible-mode",
    title: "Режим Невидимка: как скрыть ассистента при шаринге экрана",
    description:
      "Как работает режим Невидимка в Mockingbird и как окно ассистента исключается из записи, стриминга и демонстрации экрана.",
    date: "2026-09-24",
    readingTime: "4 мин",
    tag: "Приватность",
  },
];

export const byDate = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));

export const articlePath = (slug: string) => `/articles/${slug}/`;
