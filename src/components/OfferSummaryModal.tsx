/**
 * OfferSummaryModal — bottom sheet exibido ao clicar nos CTAs de compra.
 *
 * - Sobe de baixo com animação suave
 * - Ocupa 80vh (4/5 da tela)
 * - O botão "Continuar para pagamento" fica em rodapé STICKY,
 *   sempre visível na primeira dobra mesmo se o conteúdo for longo.
 * - Fecha com X, ESC, ou clique no overlay
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

const TOTAL_SAVED = "R$ 97,60";

export default function OfferSummaryModal({ open, onClose, checkoutUrl, dogName, artDe, coupon, timer }: Props) {
  // Para a animação de entrada/saída funcionar, mantemos o nó montado
  // por um pequeno tempo após o `open` virar false.
  const [shouldRender, setShouldRender] = useState(open);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      // dois rAFs para garantir que o nó já está pintado antes de aplicar a transform final
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
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-slate-300" />
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[16px] font-bold leading-tight text-foreground">
              Seu plano para <span className="text-primary">{dogName}</span>
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
          {/* Cupom + timer */}
          <div
            className="mb-3 flex items-center justify-between rounded-xl px-3 py-2"
            style={{
              background: "linear-gradient(135deg, hsl(142,70%,38%) 0%, hsl(140,75%,32%) 100%)",
              color: "white",
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-base">🎁</span>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold uppercase tracking-wider opacity-90">
                  Cupom ativo
                </p>
                <p className="truncate text-[12px] font-extrabold tracking-wider">{coupon}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-wider opacity-90">
                Reservado por
              </p>
              <p className="text-[16px] font-extrabold tabular-nums leading-none">{timer}</p>
            </div>
          </div>

          {/* Item principal */}
          <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <p className="text-[13px] font-bold text-foreground">
              Desafio personalizado {artDe} {dogName}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Programa de 21 dias · Acesso total
            </p>
          </div>

          {/* Headline dos bônus */}
          <p className="mb-2 text-[12px] leading-snug text-foreground">
            Para chegarmos no potencial máximo {artDe} <strong>{dogName}</strong>, adicionamos esses bônus especiais:
          </p>

          {/* Lista de bônus */}
          <div className="mb-2 space-y-1.5">
            {BONUSES.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-2.5 py-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: "hsl(142,70%,38%)" }}
                  >
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="truncate text-[12px] font-medium text-foreground">{b.label}</span>
                </div>
                <div className="flex flex-shrink-0 items-baseline gap-1.5">
                  <span className="text-[11px] text-slate-400 line-through">{b.oldPrice}</span>
                  <span className="text-[11px] font-bold" style={{ color: "hsl(142,70%,38%)" }}>
                    GRÁTIS
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER STICKY — botão sempre visível na primeira dobra */}
        <div
          className="flex-shrink-0 border-t border-slate-200 bg-white px-5 pt-3 pb-4"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Você está economizando</span>
            <span className="text-[15px] font-extrabold" style={{ color: "hsl(142,70%,38%)" }}>
              {TOTAL_SAVED}
            </span>
          </div>

          <a
            href={checkoutUrl}
            className="block w-full rounded-full py-3 text-center text-[14px] font-bold text-white no-underline"
            style={{
              background: "linear-gradient(135deg, hsl(142,70%,38%) 0%, hsl(140,75%,32%) 100%)",
              boxShadow: "0 6px 20px rgba(34,197,94,0.35)",
            }}
          >
            CONTINUAR PARA O PAGAMENTO →
          </a>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>Pagamento 100% seguro · Garantia de 7 dias</span>
          </div>
        </div>
      </div>
    </div>
  );
}
