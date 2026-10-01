# mockingbird-landing

**[English below](#english)**

Сайт проекта **Mockingbird** — ИИ-помощник на собеседовании: локально распознаёт
вопросы (faster-whisper), подмешивает контекст PDF-резюме и показывает ответы LLM
в реальном времени. Речь и резюме не покидают компьютер.

- Сайт: **https://mocking.ru** · English: **https://mocking.ru/en/**
- Репозиторий приложения: https://github.com/Mockingbird-go-on/mockingbird
- Скачать: https://github.com/Mockingbird-go-on/mockingbird/releases

## Структура

- `index.html` + `assets/` — лендинг RU; `en/index.html` — лендинг EN (чистый HTML/CSS/JS, без сборки).
- `docs-src/` — исходники документации на Astro (RU + EN, `src/pages/en/`).
- `docs/` — собранная документация (генерируется, не править руками).
- `articles-src/` / `articles/` — статьи-гайды (RU + EN).
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` — SEO/AI-индексация.
- `seo/SEO.md` — семантическое ядро и правила текстов (внутреннее, не публикуется).
- `seo/DISTRIBUTION.md` — план внешних упоминаний и метрики (внутреннее, не публикуется).

Локальный просмотр лендинга: `bash serve.sh` → http://localhost:8080

## Документация

Исходники — `docs-src/src/pages/*.astro` (+ `en/`), навигация — `docs-src/src/nav.ts`,
стили — `docs-src/src/styles/docs.css`.

```bash
cd docs-src
npm install          # первый раз
npm run dev          # превью docs на localhost:4321/docs/
npm run build        # собрать в ../docs
```

При пуше изменений в `docs-src/**` GitHub Action **Build docs** сам собирает и
коммитит `docs/`. Руками собирать нужно только для локальной проверки.

---

# English

The website of **Mockingbird** — an AI interview assistant that recognizes
questions locally (faster-whisper), mixes in PDF résumé context and streams
LLM answers in real time. Speech and résumé never leave your computer.

- Website: **https://mocking.ru/en/** · Russian: **https://mocking.ru/**
- App repository: https://github.com/Mockingbird-go-on/mockingbird
- Download: https://github.com/Mockingbird-go-on/mockingbird/releases

## Structure

- `index.html` + `assets/` — RU landing; `en/index.html` — EN landing (plain HTML/CSS/JS, no build).
- `docs-src/` — documentation sources on Astro (RU + EN under `src/pages/en/`).
- `docs/` — built documentation (generated, do not edit by hand).
- `articles-src/` / `articles/` — guide articles (RU + EN).
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` — SEO/AI indexing.

Local preview: `bash serve.sh` → http://localhost:8080

## Documentation

Sources — `docs-src/src/pages/*.astro` (+ `en/`), navigation — `docs-src/src/nav.ts`,
styles — `docs-src/src/styles/docs.css`.

```bash
cd docs-src
npm install          # first time
npm run dev          # docs preview at localhost:4321/docs/
npm run build        # build into ../docs
```

On push to `docs-src/**` the GitHub Action rebuilds and commits `docs/` automatically.
