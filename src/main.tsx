import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Pré-carrega imagens da Home
import slide1 from "@/assets/slideshow/slide-1.webp";
import slide2 from "@/assets/slideshow/slide-2.webp";
import slide3 from "@/assets/slideshow/slide-3.webp";
import slide4 from "@/assets/slideshow/slide-4.webp";
import logo from "@/assets/logo.png";

// Remove o splash inline assim que o React começa a montar
const splash = document.getElementById("initial-splash");
if (splash) splash.remove();

[slide1, slide2, slide3, slide4, logo].forEach((src) => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById("root")!).render(<App />);
