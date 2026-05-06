import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Pré-carrega imagens da Home com PRIORIDADE MÁXIMA
// (link rel=preload é mais agressivo que new Image() — força download paralelo)
import slide1 from "@/assets/slideshow/slide-1.webp";
import slide2 from "@/assets/slideshow/slide-2.webp";
import slide3 from "@/assets/slideshow/slide-3.webp";
import slide4 from "@/assets/slideshow/slide-4.webp";
import logo from "@/assets/logo.png";

// Slide 1 e logo são CRÍTICOS (visíveis no first paint) — preload com fetchpriority high
[
  { src: logo, priority: "high" as const },
  { src: slide1, priority: "high" as const },
  { src: slide2, priority: "low" as const },
  { src: slide3, priority: "low" as const },
  { src: slide4, priority: "low" as const },
].forEach(({ src, priority }) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  link.fetchPriority = priority;
  document.head.appendChild(link);
});

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Elemento #root não encontrado no index.html");
}

// Renderiza o App primeiro
createRoot(rootEl).render(<App />);

// Some com o splash apenas DEPOIS que o React montou (próximo frame).
// Como o splash agora é position:fixed FORA do #root, ele convive com
// o React montando e some com fade quando ganha a classe `hidden`.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const splash = document.getElementById("initial-splash");
    if (splash) {
      splash.classList.add("hidden");
      // Remove do DOM após o fade
      setTimeout(() => splash.remove(), 400);
    }
  });
});
