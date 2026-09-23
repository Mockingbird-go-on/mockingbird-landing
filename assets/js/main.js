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
      desc: "Не видно при расшаривании экрана и стриминге",
      question: "меня видно на демонстрации экрана?",
      live: "● режим невидимка · скрыт",
      answer: "Окно ассистента исключено из захвата: при шаринге экрана и стриминге его не видно ни в записи, ни у зрителей — подсказки остаются только на вашем мониторе.",
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
    ansEl.setAttribute("aria-live", "polite");
  }

  TABS.forEach((t) => t.addEventListener("click", () => render(t.dataset.feature)));

  /* стрелочная навигация по табам (role=tablist) */
  TABS.forEach((t, i) => {
    t.addEventListener("keydown", (e) => {
      let j = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") j = (i + 1) % TABS.length;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") j = (i - 1 + TABS.length) % TABS.length;
      if (e.key === "Home") j = 0;
      if (e.key === "End") j = TABS.length - 1;
      if (j !== null) {
        e.preventDefault();
        TABS[j].focus();
        render(TABS[j].dataset.feature);
      }
    });
  });

  render("stt");

  /* ---------- «губка наоборот»: замазано → открывается → «собесов» зачёркнуто ----------
     1) марка (лого+Mockingbird) стоит справа, тэглайн под ней замазан
     2) марка уезжает влево, открывая текст слева направо
     3) пауза — красный маркер зачёркивает «собесов» */
  const brand = document.querySelector(".brand");
  const mark = document.querySelector(".brand__mark");
  const tagline = document.querySelector(".brand__tagline");
  const strike = document.querySelector(".strike");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = matchMedia("(max-width: 1020px)").matches;

  if (brand && mark && tagline && !reduceMotion && !isMobile) {
    const start = () => {
      const dist = tagline.offsetWidth + 6;
      if (dist <= 6) return;
      const EASE = "cubic-bezier(.62,.02,.22,1)";
      const DUR = 1800; /* медленнее */
      /* исходное состояние: замазано, лого отзеркален */
      brand.style.setProperty("--wipe", dist + "px");
      mark.style.transform = `translateX(${dist}px)`;
      /* кадр отрисован — запускаем «открывание» */
      setTimeout(() => {
        const slide = mark.animate(
          [{ transform: `translateX(${dist}px)` }, { transform: "translateX(0px)" }],
          { duration: DUR, easing: EASE, fill: "forwards" }
        );
        tagline.animate(
          [
            { clipPath: `inset(0 0 0 ${dist}px)` },
            { clipPath: "inset(0 0 0 0px)" },
          ],
          { duration: DUR, easing: EASE, fill: "forwards" }
        );
        /* марка доехала влево — лого меняется на нормальный */
        slide.onfinish = () => mark.classList.add("is-arrived");
        setTimeout(() => strike?.classList.add("is-struck"), DUR + 750);
      }, 80);
    };
    (document.fonts?.ready || Promise.resolve()).then(() => setTimeout(start, 150));
  }
})();
