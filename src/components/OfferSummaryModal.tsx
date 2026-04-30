/**
 * OfferSummaryModal — bottom sheet exibido ao clicar nos CTAs de compra.
 *
 * Comportamento:
 * - Sobe de baixo com animação suave (320ms cubic-bezier)
 * - Ocupa 80vh / 80dvh (4/5 da tela)
 * - Botão "Continuar para pagamento" em rodapé STICKY,
 *   sempre visível na primeira dobra mesmo se o conteúdo do meio rolar
 * - Fecha com X, ESC, ou clique no overlay
 *
 * Paleta:
 * - Cores informativas (cupom, item, headline, "GRÁTIS") usam o azul navy
 *   gradient da identidade do site (#0a1638 → #2b6cf0).
 * - Verde aparece APENAS em dois lugares de destaque: ícones ✓ dos bônus
 *   e o botão CTA "Continuar para o pagamento" (sucesso/ação).
 */

import { useEffect, useState } from "react";
import { X, Check, Lock } from "lucide-react";

interface Bonus {
  label: string;
  oldPrice: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  /** URL do checkout — quando o usuário confirma, é pra lá que vai. */
  checkoutUrl: string;
  /** Nome do cão (com fallback "seu cão" do chamador) */
  dogName: string;
  /** "do" ou "da" — preposição com artigo já flexionada */
  artDe: "do" | "da";
  /** Cupom ex: POI68LUNA */
  coupon: string;
  /** Tempo restante já formatado, ex "09:42" */
  timer: string;
}

const BONUSES: Bonus[] = [
  { label: "50 jogos caninos", oldPrice: "R$ 17,90" },
  { label: "Controle máximo de latidos", oldPrice: "R$ 24,90" },
  { label: "Foco + Atenção", oldPrice: "R$ 19,90" },
  { label: "Adeus ansiedade", oldPrice: "R$ 34,90" },
];

// Gradient azul navy oficial do site (var(--gradient-primary))
const NAVY_GRADIENT = "linear-gradient(135deg, hsl(220 70% 22%), hsl(218 80% 38%))";
const NAVY_SOLID = "hsl(220 70% 22%)";

// Verde mantido SOMENTE para ícones ✓ e botão CTA
const GREEN_GRADIENT = "linear-gradient(135deg, hsl(142,70%,38%) 0%, hsl(140,75%,32%) 100%)";
const GREEN_SOLID = "hsl(142,70%,38%)";

export default function OfferSummaryModal({ open, onClose, checkoutUrl, dogName, artDe, coupon, timer }: Props) {
  const [shouldRender, setShouldRender] = useState(open);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
      document.body.style.overflow = "hidden";
    } else {
      setAnimateIn(false);
      document.body.style.overflow = "";
      const t = setTimeout(() => setShouldRender(false), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Fechar com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resumo da sua oferta"
      className="fixed inset-0 z-[1000] flex items-end justify-center"
      style={{ pointerEvents: animateIn ? "auto" : "none" }}
    >
      {/* Overlay escuro */}
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 cursor-default border-0 p-0"
        style={{
          background: "rgba(8, 12, 30, 0.55)",
          opacity: animateIn ? 1 : 0,
          transition: "opacity 280ms ease",
        }}
      />

      {/* Folha de baixo */}
      <div
        className="relative flex w-full max-w-[480px] flex-col overflow-hidden rounded-t-3xl bg-white"
        style={{
          height: "80vh",
          maxHeight: "80dvh",
          transform: animateIn ? "translateY(0)" : "translateY(100%)",
          transition: "transform 320ms cubic-bezier(0.32, 0.72, 0.24, 1)",
          boxShadow: "0 -16px 50px rgba(0,0,0,0.25)",
        }}
      >
        {/* HEADER — alça + título + close */}
        <div className="flex-shrink-0 px-5 pt-2 pb-3">
          <div className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-slate-300" />
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[18px] font-extrabold leading-tight" style={{ color: NAVY_SOLID }}>
              Desafio POI personalizado {artDe} <span style={{ color: "hsl(218 80% 45%)" }}>{dogName}</span>
            </h2>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* BODY — conteúdo scrollável */}
        <div className="flex-1 overflow-y-auto px-5 pb-3">
          {/* Cupom + timer (azul navy) */}
          <div
            className="mb-3 flex items-center justify-between rounded-xl px-3.5 py-2.5"
            style={{
              background: NAVY_GRADIENT,
              color: "white",
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base">🎁</span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold uppercase tracking-wider opacity-90">
                  Cupom ativo
                </p>
                <p className="truncate text-[14px] font-extrabold tracking-wider">{coupon}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                Reservado por
              </p>
              <p className="text-[18px] font-extrabold tabular-nums leading-none">{timer}</p>
            </div>
          </div>

          {/* Item principal — destaque azul claro */}
          <div
            className="mb-3 rounded-xl px-3.5 py-3"
            style={{
              background: "hsl(218 80% 96%)",
              border: "1px solid hsl(218 80% 88%)",
            }}
          >
            <p className="text-[14px] font-bold" style={{ color: NAVY_SOLID }}>
              Programa de 21 dias · Acesso total
            </p>
            <p className="text-[12px] mt-0.5" style={{ color: "hsl(220 25% 35%)" }}>
              Plano completo personalizado para {artDe} {dogName}.
            </p>
          </div>

          {/* Headline dos bônus */}
          <p className="mb-2.5 text-[13px] leading-snug" style={{ color: NAVY_SOLID }}>
            Para chegarmos no potencial máximo {artDe} <strong>{dogName}</strong>, adicionamos esses bônus especiais:
          </p>

          {/* Lista de bônus */}
          <div className="mb-2 space-y-2">
            {BONUSES.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5"
                style={{ borderColor: "hsl(220 15% 88%)" }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* CHECK VERDE — destaque intencional */}
                  <span
                    className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: GREEN_SOLID }}
                  >
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="truncate text-[13px] font-semibold" style={{ color: NAVY_SOLID }}>
                    {b.label}
                  </span>
                </div>
                <div className="flex flex-shrink-0 items-baseline gap-1.5">
                  <span className="text-[12px] text-slate-400 line-through">{b.oldPrice}</span>
                  <span className="text-[12px] font-extrabold" style={{ color: "hsl(218 80% 45%)" }}>
                    GRÁTIS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER STICKY — botão sempre visível na primeira dobra */}
        <div
          className="flex-shrink-0 border-t bg-white px-5 pt-3 pb-4"
          style={{
            borderColor: "hsl(220 15% 90%)",
            paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
          }}
        >
          {/* Resumo de preço — De R$118,00 por apenas R$37,90 */}
          <p className="mb-2.5 text-center text-[14px] font-medium" style={{ color: "hsl(220 25% 35%)" }}>
            De{" "}
            <span className="text-slate-400 line-through">R$ 118,00</span>{" "}
            <span style={{ color: "hsl(220 25% 35%)" }}>por apenas</span>{" "}
            <span className="text-[17px] font-extrabold" style={{ color: GREEN_SOLID }}>
              R$ 37,90
            </span>
          </p>

          {/* CTA — VERDE (destaque de ação) */}
          <a
            href={checkoutUrl}
            className="block w-full rounded-full py-3.5 text-center text-[15px] font-extrabold text-white no-underline"
            style={{
              background: GREEN_GRADIENT,
              boxShadow: "0 6px 20px rgba(34,197,94,0.35)",
            }}
          >
            CONTINUAR PARA O PAGAMENTO →
          </a>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px]" style={{ color: "hsl(220 20% 45%)" }}>
            <Lock className="h-3 w-3" />
            <span>Pagamento 100% seguro · Garantia de 7 dias</span>
          </div>
        </div>
      </div>
    </div>
  );
}
