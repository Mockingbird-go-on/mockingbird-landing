export interface HubQuestionEn {
  q: string;
  a: string;
  link?: { href: string; label: string };
}

export const hubQuestionsEn: HubQuestionEn[] = [
  {
    q: "Is there a neural network for interviews that answers questions?",
    a: "Yes. Such programs listen to the interviewer's question, recognize it and show a ready answer on screen in real time. You do the talking — the neural network works as a teleprompter.",
    link: { href: "/articles/en/neural-network-for-interview/", label: "Neural network for interviews" },
  },
  {
    q: "What is an interview assistant?",
    a: "It's a program that recognizes the interviewer's question in real time and shows an answer hint on screen. It doesn't speak for you — you read the gist and answer in your own words.",
    link: { href: "/articles/en/ai-assistant-for-interviews/", label: "Details: AI at interviews" },
  },
  {
    q: "How does an AI assistant help pass an interview?",
    a: "It relieves anxiety and helps recall the answer structure: definition, example from practice, nuances. It works faster than searching for an answer in a browser by hand.",
    link: { href: "/articles/en/pass-interview-with-ai/", label: "Step-by-step instructions" },
  },
  {
    q: "Does the assistant answer in my voice?",
    a: "No. It's a teleprompter: the hint is shown as text on your monitor, and you speak yourself. A voice answer would sound unnatural and be noticed immediately.",
    link: { href: "/articles/en/teleprompter/", label: "A teleprompter for interviews" },
  },
  {
    q: "Can the employer tell I'm using an assistant?",
    a: "On a regular call — no, if the window is hidden by Invisible Mode. Under proctoring, third-party tools can be detected, and if the rules ban them it's a violation.",
    link: { href: "/articles/en/privacy-invisible-mode/", label: "Invisible Mode" },
  },
  {
    q: "Can I use an assistant in a proctored interview?",
    a: "As a rule, no. If the rules explicitly forbid third-party tools, the assistant must not be used regardless of whether it is technically detected. In that case use it only for preparation.",
    link: { href: "/articles/en/proctoring/", label: "All about proctoring" },
  },
  {
    q: "Do I need knowledge, or will the assistant do everything for me?",
    a: "You need knowledge. The assistant suggests facts and structure, but personal experience and understanding come only from the candidate. The tool amplifies a prepared specialist, it doesn't replace one.",
  },
  {
    q: "Do I need internet for the assistant to work?",
    a: "Speech recognition can run fully offline. Internet is usually only needed for the language model request that generates the answer.",
    link: { href: "/articles/en/offline-vs-cloud-stt/", label: "Offline or cloud" },
  },
  {
    q: "Does my data go to the cloud?",
    a: "In Mockingbird — not the audio or the résumé: speech, the PDF and the knowledge base are processed locally. Only the LLM request text goes out.",
    link: { href: "/articles/en/offline-vs-cloud-stt/", label: "Privacy analysis" },
  },
  {
    q: "What's the latency from question to answer?",
    a: "On a GPU with CUDA — about 3–6 seconds. On CPU it's longer, so an NVIDIA card is recommended for comfortable use.",
    link: { href: "/docs/en/setup/stt-model/", label: "Choosing a model" },
  },
  {
    q: "Do I need an NVIDIA GPU?",
    a: "Not necessarily, but it's desirable. Without CUDA, speech recognition runs on CPU — slower. The app switches to CPU automatically when no GPU is present.",
  },
  {
    q: "Which speech recognition model should I choose?",
    a: "The default is faster-whisper large-v3-turbo — the optimum of accuracy and speed on GPU. On weak hardware pick smaller models.",
    link: { href: "/articles/en/whisper-large-v3-turbo/", label: "Why large-v3-turbo" },
  },
  {
    q: "Can I use an assistant in a technical interview with coding?",
    a: "Yes, it helps with theory and explanations while you write the code yourself. Show your thinking instead of copying a ready solution — that matters for the assessment.",
    link: { href: "/articles/en/interview-questions-answers/", label: "How to answer questions" },
  },
  {
    q: "Is there an interview bot that helps answer?",
    a: "Yes, but full-fledged solutions aren't chatbots with manual input — they're programs with automatic speech recognition: they hear the question themselves and show the answer in 3–6 seconds.",
    link: { href: "/articles/en/neural-network-for-interview/", label: "How it works" },
  },
  {
    q: "Does the neural network answer in an interview by voice?",
    a: "No — and it shouldn't. Voice synthesis sounds unnatural and is immediately noticeable. The working mode is a text hint on your screen.",
    link: { href: "/articles/en/teleprompter/", label: "Teleprompter" },
  },
  {
    q: "How much does a neural network for interviews cost?",
    a: "Mockingbird is free and distributed as open source. You can download it from the GitHub releases page.",
    link: { href: "https://github.com/Mockingbird-go-on/mockingbird/releases", label: "Download" },
  },
  {
    q: "Which platforms does the assistant support?",
    a: "Mockingbird supports Windows 10/11 and Linux (x86_64).",
    link: { href: "/docs/en/install/", label: "Installation" },
  },
];
