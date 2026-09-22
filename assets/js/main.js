// Mockingbird landing — статичный скриншот-макет (Web 2.0).
// Никакой анимации: контент фиксирован. Клик по фиче лишь меняет
// состояние без переходов, чтобы посмотреть варианты.
(() => {
  "use strict";

  const SCENES = {
    stt: {
      desc: "faster-whisper large-v3-turbo, adaptive VAD, фонетическая коррекция терминов",
      question: "расскажи про настройку прометheus алертов",
      live: "● слушать…",
      answer: "Prometheus алерты настраиваются через rules-файлы: группы правил с выражениями <b>expr</b> и порогами <b>for</b>. Alertmanager дальше маршрутизирует срабатывания по severity и receiver'ам…",
    },
    kb: {
      desc: "PDF-резюме → база знаний; DevOps-топики как контекст для ответов",
      question: "у тебя в резюме указан kubernetes — подробнее?",
      live: "● резюме загружено · 12 блоков",
      answer: "Судя по резюме, Kubernetes использовался для оркестрации микросервисов: helm-чарты, HPA по RPS, blue-green деплой через ArgoCD, сетевые политики Calico…",
    },
    llm: {
      desc: "стрим ответа в реальном времени, single-flight приоритет вопроса",
      question: "чем отличается ingress от service?",
      live: "● llm streaming…",
      answer: "Service — это абстракция, дающая стабильный адрес (ClusterIP) подгруппе подов. Ingress — слой L7 поверх: маршрутизация по HTTP-хосту и пути, TLS-терминация, всё через Ingress Controller…",
    },
    priv: {
      desc: "STT, VAD и база — локально; в облако уходит только запрос к LLM",
      question: "всё работает на моей машине",
      live: "● GPU · без облака для STT",
      answer: "Распознавание, VAD и база знаний выполняются локально — аудио не покидает машину. Наружу уходит только текстовый запрос к LLM, и его можно ограничить.",
    },
  };

  const TABS = document.querySelectorAll(".feature");
  const SPOTS = document.querySelectorAll(".spot");
  const qEl = document.getElementById("appQuestion");
  const liveEl = document.getElementById("appLive");
  const ansEl = document.getElementById("appAnswer");
  const descMap = {
    stt: "[data-text-stt]",
    kb: "[data-text-kb]",
    llm: "[data-text-llm]",
    priv: "[data-text-priv]",
  };

  function render(key) {
    const data = SCENES[key];
    if (!data) return;

    TABS.forEach((t) => {
      const on = t.dataset.feature === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    SPOTS.forEach((s) => s.classList.toggle("is-on", s.dataset.spot === key));

    const descEl = document.querySelector(descMap[key]);
    if (descEl) descEl.textContent = data.desc;

    qEl.textContent = data.question;
    liveEl.textContent = data.live;
    ansEl.innerHTML = "<p>" + data.answer + "</p>";
  }

  TABS.forEach((t) => t.addEventListener("click", () => render(t.dataset.feature)));

  render("stt");
})();
