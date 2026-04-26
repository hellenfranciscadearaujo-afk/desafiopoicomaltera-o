/**
 * Home.tsx — Splash inicial antes do quiz
 *
 * Estrutura:
 * 1. Logo DesafioPOI (padrão)
 * 2. Slideshow de 4 imagens (2s cada, transição opacity 0.6s, loop infinito)
 * 3. Barra de progresso animada 5s → transita para botão CTA
 *
 * O botão CTA dispara QuizStart e navega para a página 1 do quiz.
 */

import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import slide1 from "@/assets/slideshow/slide-1.png";
import slide2 from "@/assets/slideshow/slide-2.png";
import slide3 from "@/assets/slideshow/slide-3.png";
import slide4 from "@/assets/slideshow/slide-4.png";

type NavigateFn = (to: string, opts?: { state?: Record<string, unknown>; replace?: boolean }) => void;

const slides = [slide1, slide2, slide3, slide4];

const Home = ({ _navigate }: { _navigate: NavigateFn }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const startedAt = useRef<number>(Date.now());

  // Slideshow — troca a cada 2s, loop infinito
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Barra de progresso — 5s total, 100 passos de 50ms
  useEffect(() => {
    const total = 5000;
    const step = 50;
    const tick = setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      const pct = Math.min(100, (elapsed / total) * 100);
      setProgress(pct);
      if (elapsed >= total) {
        clearInterval(tick);
        setReady(true);
      }
    }, step);
    return () => clearInterval(tick);
  }, []);

  const handleStart = () => {
    // step=1 indica entrada no quiz → dispara QuizStart no App.tsx
    _navigate("/quiz", { state: { step: 1 } });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Logo */}
      <header className="flex items-center justify-center px-5 pt-6 pb-4">
        <img src={logo} alt="DesafioPOI" className="h-5 w-auto" />
      </header>

      {/* Slideshow */}
      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <div
          className="relative w-full max-w-[320px]"
          style={{ aspectRatio: "1 / 1" }}
        >
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                opacity: i === current ? 1 : 0,
                transition: "opacity 0.6s ease-in-out",
              }}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          ))}
        </div>

        {/* Container fixo: barra OU botão — sem deslocamento */}
        <div className="mt-8 w-full max-w-[320px]">
          <div className="relative" style={{ height: "52px" }}>
            {/* Barra de progresso */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[12px]"
              style={{
                background: "#DDD8EC",
                opacity: ready ? 0 : 1,
                transition: "opacity 0.4s ease-in-out",
                pointerEvents: ready ? "none" : "auto",
              }}
            >
              <div
                className="relative h-full rounded-[12px]"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #6B4FD8 0%, #A78BF7 100%)",
                  transition: "width 50ms linear",
                }}
              >
                {progress > 5 && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      right: "8px",
                      fontSize: "18px",
                      lineHeight: 1,
                    }}
                  >
                    🐾
                  </span>
                )}
              </div>
            </div>

            {/* Botão CTA */}
            <button
              onClick={handleStart}
              className="absolute inset-0 rounded-[12px] font-bold text-white"
              style={{
                background: "linear-gradient(90deg, #6B4FD8 0%, #2B6CF0 100%)",
                boxShadow: "0 6px 20px rgba(43,108,240,0.3)",
                fontSize: "16px",
                opacity: ready ? 1 : 0,
                transition: "opacity 0.4s ease-in-out",
                pointerEvents: ready ? "auto" : "none",
              }}
            >
              Começar agora →
            </button>
          </div>

          {/* Label abaixo */}
          <p
            className="mt-3 text-center"
            style={{
              fontSize: "11px",
              color: ready ? "#1CB46A" : "#9AA0BC",
              fontWeight: ready ? 600 : 400,
              transition: "color 0.4s ease-in-out",
            }}
          >
            {ready ? "Pronto! Vamos começar 🐾" : "A carregar o questionário..."}
          </p>

          {/* Badges de confiança — aparecem junto com o botão */}
          <p
            className="mt-2 text-center"
            style={{
              fontSize: "11px",
              color: "#9AA0BC",
              opacity: ready ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
            }}
          >
            ✓ Gratuito · ✓ Menos de 2 minutos
          </p>
        </div>
      </main>

      <div style={{ height: "24px" }} />
    </div>
  );
};

export default Home;
