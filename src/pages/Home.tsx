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
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
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
  }, []);

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
        <button
          onClick={handleStart}
          className="w-full rounded-full font-semibold text-primary-foreground"
          style={{
            height: "48px",
            background: "var(--gradient-primary)",
            boxShadow: "var(--shadow-cta)",
            fontSize: "14px",
          }}
        >
          Começar agora →
        </button>

        <p className="mt-1.5 text-center text-[10px]" style={{ color: "hsl(142,70%,38%)", fontWeight: 600 }}>
          Pronto! Vamos começar 🐾
        </p>

        <div className="mt-0.5 flex justify-center gap-3">
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
