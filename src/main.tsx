import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Pré-carrega TODAS as imagens do funil para que apareçam instantaneamente
// quando o usuário chegar em cada tela, sem flash branco.
import slide1 from "@/assets/slideshow/slide-1.png";
import slide2 from "@/assets/slideshow/slide-2.png";
import slide3 from "@/assets/slideshow/slide-3.png";
import slide4 from "@/assets/slideshow/slide-4.png";
import quiz1 from "@/assets/quiz-1-sad.webp";
import quiz3 from "@/assets/quiz-3-sit.webp";
import quiz4 from "@/assets/quiz-4-walk.webp";
import beforeImg from "@/assets/before.webp";
import afterImg from "@/assets/after.webp";
import whatsapp from "@/assets/whatsapp-reviews.webp";
import avatarJ from "@/assets/avatar-juliana.png";
import avatarA from "@/assets/avatar-ana.png";
import avatarB from "@/assets/avatar-bruno.png";
import logo from "@/assets/logo.png";

const allImages = [
  slide1, slide2, slide3, slide4,
  quiz1, quiz3, quiz4,
  beforeImg, afterImg, whatsapp,
  avatarJ, avatarA, avatarB,
  logo,
];

allImages.forEach((src) => {
  const img = new Image();
  img.src = src;
});

createRoot(document.getElementById("root")!).render(<App />);
