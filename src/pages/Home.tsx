/**
 * Home.tsx — Splash inicial antes do quiz
 *
 * Estrutura otimizada para mobile:
 * 1. Logo no topo
 * 2. Slideshow compacto (220px) logo abaixo
 * 3. Bloco de prova social próximo (estrelas + headline + subheadline)
 * 4. Barra de carregamento → Botão CTA (estilo navy do quiz)
 *
 * O botão CTA dispara QuizStart (App.tsx) e navega para o quiz.
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const total = 5000;
    const tick = setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      const pct = Math.min(100, (elapsed / total) * 100);
      setProgress(pct);
      if (elapsed >= total) {
        clearInterval(tick);
        setReady(true);
      }
    }, 50);
    return () => clearInterval(tick);
  }, []);

  const handleStart = () => {
    _navigate("/quiz", { state: { step: 1 } });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Logo */}
      <header className="flex items-center justify-center px-5 pt-4 pb-1">
        <img src={logo} alt="DesafioPOI" className="h-5 w-auto" />
      </header>

      {/* Slideshow compacto */}
      <div className="px-5 pt-1">
        <div
          className="relative mx-auto w-full"
          style={{ maxWidth: "220px", aspectRatio: "1 / 1" }}
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
      </div>

      {/* Bloco de prova social — compacto, próximo do slideshow */}
      <div className="flex flex-col gap-2 px-5 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#e8a400">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            ))}
          </div>
          <p className="text-[13px] text-foreground leading-snug">
            <strong>+10.000 tutores</strong> já transformaram seus cães
          </p>
        </div>

        <h1 className="text-[17px] font-bold leading-tight text-foreground">
          Por que seu cão ignora você — mesmo depois de tanto tentar?
        </h1>

        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Descubra em 2 minutos o bloqueio instintivo que impede seu cão de obedecer e receba um plano personalizado para resolver isso.
        </p>
      </div>

      {/* Barra/Botão — empurrados para baixo, estilo navy do quiz */}
      <div className="px-5 pb-5 mt-auto pt-6">
        <div className="relative" style={{ height: "52px" }}>
          {/* Barra de carregamento (navy do quiz) */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              background: "hsl(var(--muted))",
              opacity: ready ? 0 : 1,
              transition: "opacity 0.4s ease-in-out",
              pointerEvents: ready ? "none" : "auto",
            }}
          >
            <div
              className="relative h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "var(--gradient-primary)",
                transition: "width 50ms linear",
              }}
            >
              {progress > 5 && (
                <span
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ right: "10px", fontSize: "18px", lineHeight: 1 }}
                >
                  🐾
                </span>
              )}
            </div>
          </div>

          {/* Botão CTA (mesmo estilo cta-primary do quiz) */}
          <button
            onClick={handleStart}
            className="absolute inset-0 rounded-full font-semibold text-primary-foreground"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "var(--shadow-cta)",
              fontSize: "14px",
              opacity: ready ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
              pointerEvents: ready ? "auto" : "none",
            }}
          >
            Começar agora →
          </button>
        </div>

        {/* Label de status */}
        <p
          className="mt-2 text-center text-[11px]"
          style={{
            color: ready ? "hsl(142,70%,38%)" : "hsl(var(--muted-foreground))",
            fontWeight: ready ? 600 : 400,
            transition: "color 0.4s ease-in-out",
          }}
        >
          {ready ? "Pronto! Vamos começar 🐾" : "A carregar o questionário..."}
        </p>

        {/* Badges */}
        <p
          className="mt-1 text-center text-[11px] text-muted-foreground"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
          }}
        >
          ✓ Gratuito · ✓ Menos de 2 minutos
        </p>
      </div>
    </div>
  );
};

export default Home;
