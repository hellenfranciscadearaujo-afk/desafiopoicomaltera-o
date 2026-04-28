import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Pré-carrega APENAS as imagens da Home (slideshow + logo)
import slide1 from "@/assets/slideshow/slide-1.webp";
import slide2 from "@/assets/slideshow/slide-2.webp";
import slide3 from "@/assets/slideshow/slide-3.webp";
import slide4 from "@/assets/slideshow/slide-4.webp";
import logo from "@/assets/logo.png";

[slide1, slide2, slide3, slide4, logo].forEach((src) => {
  const img = new Image();
  img.src = src;
});

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
  
  // Remove o splash após o primeiro render
  setTimeout(() => {
    const splash = document.getElementById("initial-splash");
    if (splash) splash.remove();
  }, 0);
}
