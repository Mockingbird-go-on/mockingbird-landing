# mockingbird-landing

Лендинг проекта **Mockingbird** — офлайн-ассистент для технических интервью:
локальный STT (faster-whisper), база знаний из PDF-резюме, ответы LLM в реальном
времени. Всё локально, кроме запроса к LLM.

- Сайт: **https://mocking.ru**
- Репозиторий приложения: https://github.com/Mockingbird-go-on/mockingbird
- Скачать: https://github.com/Mockingbird-go-on/mockingbird/releases

## Структура

- `index.html` + `assets/` — лендинг (чистый HTML/CSS/JS, без сборки).
- `docs-src/` — исходники документации на Astro.
- `docs/` — собранная документация (генерируется, не править руками).
- `robots.txt`, `sitemap.xml`, `llms.txt` — SEO/AI-индексация.
- `seo/SEO.md` — семантическое ядро и правила текстов (внутреннее, не публикуется).

Локальный просмотр лендинга: `bash serve.sh` → http://localhost:8080

## Документация

Исходники — `docs-src/src/pages/*.astro`, навигация — `docs-src/src/nav.ts`,
стили — `docs-src/src/styles/docs.css`.

```bash
cd docs-src
npm install          # первый раз
npm run dev          # превью docs на localhost:4321/docs/
npm run build        # собрать в ../docs
```

При пуше изменений в `docs-src/**` GitHub Action **Build docs** сам собирает и
коммитит `docs/`. Руками собирать нужно только для локальной проверки.
