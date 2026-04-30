/**
 * Home.tsx — Splash inicial antes do quiz
 *
 * Header (logo + barra) e footer (barra/botão) FIXOS via position:fixed
 * — não se movem em nenhum dispositivo.
 *
 * Pixel: QuizStart dispara no clique do botão (via App.tsx).
 */

import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import slide1 from "@/assets/slideshow/slide-1.webp";
import slide2 from "@/assets/slideshow/slide-2.webp";
import slide3 from "@/assets/slideshow/slide-3.webp";
import slide4 from "@/assets/slideshow/slide-4.webp";

type NavigateFn = (to: string, opts?: { state?: Record<string, unknown>; replace?: boolean }) => void;

const slides = [slide1, slide2, slide3, slide4];

const Home = ({ _navigate }: { _navigate: NavigateFn }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const startedAt = useRef<number>(Date.now());
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

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

  // Mede header/footer e expõe como CSS vars (mesma lógica do QuizShell)
  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty(
          "--quiz-header-h",
          `${headerRef.current.offsetHeight}px`
        );
      }
      if (footerRef.current) {
        document.documentElement.style.setProperty(
          "--quiz-footer-h",
          `${footerRef.current.offsetHeight}px`
        );
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (headerRef.current) ro.observe(headerRef.current);
    if (footerRef.current) ro.observe(footerRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [ready]);

  const handleStart = () => {
    _navigate("/quiz", { state: { step: 1 } });
  };

  return (
    <div className="quiz-shell">
      {/* Header fixo */}
      <header className="quiz-header" ref={headerRef}>
        <div className="flex items-center justify-center mb-1.5">
          <img src={logo} alt="DesafioPOI" className="h-4 w-auto" />
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full"
            style={{ width: "8%", background: "var(--gradient-primary)" }}
          />
        </div>
      </header>

      {/* Body com padding-top/bottom dinâmico (já configurado em quiz-body) */}
      <main className="quiz-body items-center justify-start text-center">
        {/* Headline com palavras em azul */}
        <h1 className="text-[20px] font-extrabold leading-tight text-foreground mt-3">
          Receba um <span className="text-highlight">desafio de obediência personalizado</span> para o <span className="text-highlight">seu cão</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[14px] leading-relaxed text-muted-foreground mt-2.5">
          Responda a um questionário de 2 minutos e receba um desafio personalizado com base no objetivo, padrões comportamentais, idade e raça.
        </p>

        {/* Slideshow */}
        <div className="mt-4 w-full flex items-center justify-center">
          <div
            className="relative w-full"
            style={{ maxWidth: "300px", aspectRatio: "1 / 1" }}
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
      </main>

      {/* Footer fixo */}
      <footer className="quiz-footer" ref={footerRef}>
        <div className="relative" style={{ height: "48px" }}>
          {/* Barra */}
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
                  style={{ right: "10px", fontSize: "16px", lineHeight: 1 }}
                >
                  🐾
                </span>
              )}
            </div>
          </div>

          {/* Botão CTA */}
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

        <p
          className="mt-1.5 text-center text-[10px]"
          style={{
            color: ready ? "hsl(142,70%,38%)" : "hsl(var(--muted-foreground))",
            fontWeight: ready ? 600 : 400,
            transition: "color 0.4s ease-in-out",
          }}
        >
          {ready ? "Pronto! Vamos começar 🐾" : "A carregar o questionário..."}
        </p>

        <div
          className="mt-0.5 flex justify-center gap-3"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
          }}
        >
          <div className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="hsl(142,70%,38%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span className="text-[10px] text-muted-foreground">2 minutos</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="hsl(142,70%,38%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span className="text-[10px] text-muted-foreground">Plano personalizado</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
