import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Pré-carrega imagens da Home
import slide1 from "@/assets/slideshow/slide-1.webp";
import slide2 from "@/assets/slideshow/slide-2.webp";
import slide3 from "@/assets/slideshow/slide-3.webp";
import slide4 from "@/assets/slideshow/slide-4.webp";
import logo from "@/assets/logo.png";

[slide1, slide2, slide3, slide4, logo].forEach((src) => {
  const img = new Image();
  img.src = src;
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
