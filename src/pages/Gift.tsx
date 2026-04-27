/**
 * Gift.tsx — Tela de presente surpresa antes da oferta
 *
 * Fluxo:
 * - Headline personalizada com nome do cão
 * - Caixa de presente azul com animação de brilho/sparkles
 * - Texto "Clique aqui" piscando em cima
 * - Ao clicar: zoom + abre revelando "68% OFF"
 * - Botão "Receber meu presente" → dispara Lead → vai para /oferta
 */

import { useState } from "react";
import logo from "@/assets/logo.png";

interface GiftState {
  dogName?: string;
  challenges?: string[];
  frequency?: string;
  ignored?: string;
  age?: string;
  breed?: string;
  level?: number;
  email?: string;
}

type NavigateFn = (to: string, opts?: { state?: Record<string, unknown>; replace?: boolean }) => void;

const Gift = ({ _navigate, _initialState = {} }: { _navigate: NavigateFn; _initialState?: GiftState }) => {
  const navigate = _navigate;
  const s = _initialState as GiftState;
  const dogName = s.dogName?.trim() || "seu cão";

  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
  };

  const handleClaim = () => {
    // Dispara Lead via App.tsx (rota /oferta)
    navigate("/oferta", { state: s as unknown as Record<string, unknown> });
  };

  return (
    <div className="quiz-shell">
      <header className="quiz-header">
        <div className="flex items-center justify-center">
          <img src={logo} alt="DesafioPOI" className="h-5 w-auto" />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        {/* Headline */}
        <h1 className="text-[18px] font-bold leading-tight text-foreground mb-1">
          Por ter chegado até aqui, separamos um presente especial para <span className="text-primary">{dogName}</span>
        </h1>
        <p className="text-[13px] leading-relaxed text-muted-foreground mb-8">
          {opened ? "Parabéns! Aqui está o seu presente." : "Clique e garanta o seu presente."}
        </p>

        {/* Caixa de presente com animação */}
        <div
          className="relative mb-8 cursor-pointer"
          style={{
            width: opened ? "240px" : "180px",
            height: opened ? "240px" : "180px",
            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          onClick={handleOpen}
        >
          {/* Sparkles ao redor */}
          {!opened && (
            <>
              {[
                { top: "-8px", left: "20%", delay: "0s" },
                { top: "10%", right: "-12px", delay: "0.4s" },
                { bottom: "20%", left: "-10px", delay: "0.8s" },
                { bottom: "-6px", right: "25%", delay: "1.2s" },
                { top: "30%", left: "-14px", delay: "0.2s" },
                { top: "-4px", right: "30%", delay: "1s" },
              ].map((p, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{
                    ...p,
                    fontSize: "20px",
                    animation: "sparkle 1.6s ease-in-out infinite",
                    animationDelay: p.delay,
                  }}
                >
                  ✨
                </span>
              ))}
            </>
          )}

          {/* Caixa fechada */}
          {!opened && (
            <div
              className="relative h-full w-full"
              style={{
                animation: "bounce-soft 2s ease-in-out infinite",
              }}
            >
              {/* Corpo do presente */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #2B6CF0 0%, #6B4FD8 100%)",
                  boxShadow: "0 12px 40px rgba(43,108,240,0.4), inset 0 -8px 16px rgba(0,0,0,0.1)",
                  top: "30%",
                }}
              />
              {/* Tampa */}
              <div
                className="absolute left-0 right-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #4080FF 0%, #7B5FE8 100%)",
                  boxShadow: "0 6px 20px rgba(43,108,240,0.3)",
                  top: "20%",
                  height: "20%",
                }}
              />
              {/* Faixa vertical */}
              <div
                className="absolute"
                style={{
                  background: "#FFD700",
                  width: "16%",
                  left: "42%",
                  top: "20%",
                  bottom: 0,
                  boxShadow: "inset -2px 0 4px rgba(0,0,0,0.15)",
                }}
              />
              {/* Faixa horizontal */}
              <div
                className="absolute"
                style={{
                  background: "#FFD700",
                  height: "8%",
                  left: 0,
                  right: 0,
                  top: "30%",
                  boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.15)",
                }}
              />
              {/* Laço */}
              <div
                className="absolute"
                style={{
                  top: "5%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50%",
                  height: "30%",
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    background: "#FFD700",
                    width: "40%",
                    height: "70%",
                    left: 0,
                    top: "15%",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    background: "#FFD700",
                    width: "40%",
                    height: "70%",
                    right: 0,
                    top: "15%",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    background: "#E6B800",
                    width: "26%",
                    height: "26%",
                    left: "37%",
                    top: "37%",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                />
              </div>

              {/* "Clique aqui" piscando */}
              <div
                className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[12px] font-bold text-white whitespace-nowrap"
                style={{
                  background: "#FF4757",
                  boxShadow: "0 4px 12px rgba(255,71,87,0.4)",
                  animation: "blink 1s ease-in-out infinite",
                }}
              >
                👆 Clique aqui
              </div>
            </div>
          )}

          {/* Presente aberto - 68% OFF */}
          {opened && (
            <div
              className="relative flex h-full w-full flex-col items-center justify-center rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #2B6CF0 0%, #6B4FD8 100%)",
                boxShadow: "0 20px 60px rgba(43,108,240,0.5)",
                animation: "burst-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-widest text-white/80">
                Desconto exclusivo
              </p>
              <p className="text-[64px] font-extrabold leading-none text-white mt-2">
                68%
              </p>
              <p className="text-[20px] font-bold text-white">OFF</p>
              <p className="mt-2 text-[12px] text-white/85">para {dogName}</p>

              {/* Sparkles ao abrir */}
              {[
                { top: "5%", left: "10%" },
                { top: "10%", right: "10%" },
                { bottom: "10%", left: "8%" },
                { bottom: "8%", right: "12%" },
              ].map((p, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{
                    ...p,
                    fontSize: "22px",
                    animation: "sparkle 1.6s ease-in-out infinite",
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  ✨
                </span>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer
        className="quiz-footer"
        style={{
          opacity: opened ? 1 : 0,
          transition: "opacity 0.5s ease-in-out 0.4s",
          pointerEvents: opened ? "auto" : "none",
        }}
      >
        <button className="cta-success" onClick={handleClaim}>
          🎁 Receber meu presente
        </button>
      </footer>

      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50%      { opacity: 1;   transform: scale(1.2) rotate(180deg); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50%      { opacity: 0.7; transform: translateX(-50%) scale(1.06); }
        }
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes burst-in {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Gift;
