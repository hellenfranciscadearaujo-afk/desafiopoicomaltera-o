/**
 * Gift.tsx — Tela de presente surpresa antes da oferta
 *
 * Headline → Caixa de presente azul navy + animação → ao clicar abre revelando 68% OFF
 * → Cupom personalizado POI68[NOME] → Botão "Receber meu presente" dispara Lead → /oferta
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

  // Cupom: POI68 + 4 primeiras letras do nome em maiúsculo (ou POI68 sozinho se vazio)
  const couponSuffix = (s.dogName || "").trim().slice(0, 4).toUpperCase().replace(/[^A-ZÀ-Ú]/g, "");
  const coupon = `POI68${couponSuffix}`;

  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
  };

  const handleClaim = () => {
    navigate("/oferta", { state: s as unknown as Record<string, unknown> });
  };

  return (
    <div className="quiz-shell">
      <header className="quiz-header">
        <div className="flex items-center justify-center mb-1.5">
          <img src={logo} alt="DesafioPOI" className="h-4 w-auto" />
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-5 pt-2 text-center overflow-hidden">
        {/* Headline + subheadline (sempre no topo) */}
        <h1 className="text-[17px] font-bold leading-tight text-foreground">
          Por ter chegado até aqui, separamos um presente especial para <span className="text-primary">{dogName}</span>
        </h1>
        <p className="text-[12px] leading-relaxed text-muted-foreground mt-1.5">
          {opened ? "Aqui está o seu presente!" : "Clique e garanta o seu presente."}
        </p>

        {/* Caixa de presente */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            className="relative cursor-pointer"
            style={{
              width: opened ? "230px" : "180px",
              height: opened ? "230px" : "180px",
              transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onClick={handleOpen}
          >
            {/* Sparkles ao redor */}
            {!opened && (
              <>
                {[
                  { top: "-10px", left: "20%", delay: "0s" },
                  { top: "10%", right: "-14px", delay: "0.4s" },
                  { bottom: "20%", left: "-12px", delay: "0.8s" },
                  { bottom: "-8px", right: "25%", delay: "1.2s" },
                  { top: "30%", left: "-16px", delay: "0.2s" },
                  { top: "-6px", right: "30%", delay: "1s" },
                ].map((p, i) => (
                  <span
                    key={i}
                    className="absolute"
                    style={{
                      ...p,
                      fontSize: "22px",
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
                  filter: "drop-shadow(0 12px 24px rgba(43,108,240,0.35))",
                }}
              >
                {/* Corpo do presente */}
                <div
                  className="absolute"
                  style={{
                    background: "linear-gradient(135deg, hsl(220,70%,22%) 0%, hsl(218,80%,38%) 100%)",
                    boxShadow: "inset 0 -8px 16px rgba(0,0,0,0.18), inset 0 4px 8px rgba(255,255,255,0.1)",
                    top: "30%",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "12px",
                  }}
                />
                {/* Tampa */}
                <div
                  className="absolute"
                  style={{
                    background: "linear-gradient(135deg, hsl(218,75%,32%) 0%, hsl(216,85%,48%) 100%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 -3px 6px rgba(0,0,0,0.1)",
                    top: "20%",
                    left: "-3%",
                    right: "-3%",
                    height: "16%",
                    borderRadius: "10px",
                  }}
                />
                {/* Faixa vertical (gold) */}
                <div
                  className="absolute"
                  style={{
                    background: "linear-gradient(90deg, #FFB800 0%, #FFDF40 50%, #FFB800 100%)",
                    width: "16%",
                    left: "42%",
                    top: "20%",
                    bottom: 0,
                    boxShadow: "inset -2px 0 4px rgba(0,0,0,0.2)",
                  }}
                />
                {/* Faixa horizontal (gold) */}
                <div
                  className="absolute"
                  style={{
                    background: "linear-gradient(180deg, #FFB800 0%, #FFDF40 50%, #FFB800 100%)",
                    height: "8%",
                    left: 0,
                    right: 0,
                    top: "30%",
                    boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.18)",
                  }}
                />
                {/* Laço bonito */}
                <div
                  className="absolute"
                  style={{
                    top: "0%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: "32%",
                  }}
                >
                  {/* Pétala esquerda */}
                  <div
                    className="absolute"
                    style={{
                      background: "linear-gradient(135deg, #FFDF40 0%, #FFB800 100%)",
                      width: "42%",
                      height: "75%",
                      left: 0,
                      top: "12%",
                      borderRadius: "50% 20% 20% 50%",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.18), inset 0 -2px 4px rgba(0,0,0,0.1)",
                      transform: "rotate(-8deg)",
                    }}
                  />
                  {/* Pétala direita */}
                  <div
                    className="absolute"
                    style={{
                      background: "linear-gradient(225deg, #FFDF40 0%, #FFB800 100%)",
                      width: "42%",
                      height: "75%",
                      right: 0,
                      top: "12%",
                      borderRadius: "20% 50% 50% 20%",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.18), inset 0 -2px 4px rgba(0,0,0,0.1)",
                      transform: "rotate(8deg)",
                    }}
                  />
                  {/* Nó central */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #E69E00 0%, #FFB800 100%)",
                      width: "26%",
                      height: "32%",
                      left: "37%",
                      top: "35%",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.25), inset -1px -1px 2px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>

                {/* Balão "Clique aqui" piscando */}
                <div
                  className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold text-white whitespace-nowrap"
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

            {/* Presente aberto - 68% OFF + cupom */}
            {opened && (
              <div
                className="relative flex h-full w-full flex-col items-center justify-center rounded-3xl overflow-hidden px-3"
                style={{
                  background: "linear-gradient(135deg, hsl(220,70%,22%) 0%, hsl(218,80%,38%) 100%)",
                  boxShadow: "0 20px 60px rgba(43,108,240,0.5)",
                  animation: "burst-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/85">
                  Desconto exclusivo
                </p>
                <p className="text-[60px] font-extrabold leading-none text-white mt-1">
                  68%
                </p>
                <p className="text-[18px] font-bold text-white">OFF</p>

                {/* Sparkles */}
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
                      fontSize: "20px",
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
        </div>

        {/* Cupom (visível só após abrir) */}
        {opened && (
          <div className="w-full mb-2" style={{ animation: "fade-in 0.5s ease-in-out 0.5s both" }}>
            <p className="text-[11px] text-muted-foreground mb-1">Seu cupom personalizado:</p>
            <div className="rounded-xl border-2 border-dashed border-primary bg-accent px-3 py-2 text-center">
              <p className="text-[16px] font-extrabold tracking-widest text-primary">{coupon}</p>
            </div>
          </div>
        )}
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
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Gift;
