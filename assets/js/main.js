// Mockingbird landing — табы фич, живая реплика окна, терминал, глитч
(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- сценарии: как в реальном приложении ---------- */
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

  /* ---------- typing ---------- */
  let typingTimer = null;
  function typeText(el, text, done) {
    clearInterval(typingTimer);
    el.textContent = "";
    let i = 0;
    typingTimer = setInterval(() => {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(typingTimer); done?.(); }
    }, 42);
  }

  /* ---------- «стрим» ответа по словам ---------- */
  let streamTimer = null;
  function streamAnswer(html) {
    clearInterval(streamTimer);
    ansEl.innerHTML = '<p class="dim">Ответ ИИ задерживается…</p>';
    const words = html.split(" ");
    let i = 0;
    setTimeout(() => {
      streamTimer = setInterval(() => {
        i++;
        ansEl.innerHTML = "<p>" + words.slice(0, i).join(" ") +
          (i < words.length ? ' <span class="caret"></span>' : "") + "</p>";
        if (i >= words.length) clearInterval(streamTimer);
      }, 90);
    }, 1200);
  }

  /* ---------- табы ---------- */
  function activate(key) {
    const data = SCENES[key];
    if (!data) return;

    TABS.forEach((t) => {
      const on = t.dataset.feature === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    SPOTS.forEach((s) => s.classList.toggle("is-on", s.dataset.spot === key));

    const map = { stt: "[data-text-stt]", kb: "[data-text-kb]", llm: "[data-text-llm]", priv: "[data-text-priv]" };
    const descEl = document.querySelector(map[key]);
    if (descEl) descEl.textContent = data.desc;

    liveEl.textContent = data.live;
    liveEl.classList.add("is-on");

    if (reduceMotion) {
      qEl.textContent = data.question;
      ansEl.innerHTML = "<p>" + data.answer + "</p>";
      return;
    }
    typeText(qEl, data.question, () => streamAnswer(data.answer));
  }

  TABS.forEach((t) => t.addEventListener("click", () => activate(t.dataset.feature)));

  TABS.forEach((t, i) => {
    t.addEventListener("keydown", (e) => {
      let j = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (i + 1) % TABS.length;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = (i - 1 + TABS.length) % TABS.length;
      if (j !== null) { e.preventDefault(); TABS[j].focus(); activate(TABS[j].dataset.feature); }
    });
  });

  /* ---------- таймер сессии 00:00 ---------- */
  const timerEl = document.getElementById("appTimer");
  if (timerEl) {
    let sec = 14 * 60 + 7; // выглядит «живой» сессией
    setInterval(() => {
      sec++;
      timerEl.textContent =
        String(Math.floor(sec / 60)).padStart(2, "0") + ":" + String(sec % 60).padStart(2, "0");
    }, 1000);
  }

  /* ---------- терминал ---------- */
  const STAGES = document.querySelectorAll(".terminal__stage");
  if (STAGES.length && !reduceMotion) {
    const CYCLE = 3200, PER = CYCLE / (STAGES.length + 1);
    let t0 = performance.now();
    (function tick(now) {
      const k = Math.floor(((now - t0) % CYCLE) / PER);
      STAGES.forEach((s, i) => s.classList.toggle("is-hot", i === k));
      requestAnimationFrame(tick);
    })(t0);
  }

  /* ---------- глитч заголовка ---------- */
  const brand = document.getElementById("brandName");
  if (brand && !reduceMotion) {
    const glitchOnce = () => {
      brand.classList.add("glitch");
      setTimeout(() => brand.classList.remove("glitch"), 320);
    };
    setInterval(glitchOnce, 10000);
    setTimeout(glitchOnce, 1800);
  }

  /* ---------- авто-ротация ---------- */
  const keys = Object.keys(SCENES);
  let idx = 0;
  let auto = setInterval(() => activate(keys[++idx % keys.length]), 12000);
  const stopAuto = () => { clearInterval(auto); auto = null; };
  ["click", "keydown", "touchstart"].forEach((ev) =>
    addEventListener(ev, stopAuto, { once: true, passive: true })
  );

  activate("stt");
})();
