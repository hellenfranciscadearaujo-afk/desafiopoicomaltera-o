/**
 * Diagnosis.tsx — Diagnóstico comportamental personalizado
 *
 * Header e footer FIXOS via position:fixed (mesma lógica do QuizShell).
 * Body rola entre eles, mas logo/barra/CTA ficam travados.
 */

import { useEffect, useMemo, useRef } from "react";
import { ChevronLeft, User, PawPrint, Calendar, BarChart3, Search, TrendingUp, Shield, CheckCircle2, Lock } from "lucide-react";
import logo from "@/assets/logo.png";
import { HighlightInstinto } from "@/components/HighlightInstinto";
import { getDogGender, articleDe } from "@/lib/dogGender";

interface DiagState {
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

// Mapa challenge → Objetivo (com título e descrição)
const challengeToGoal: Record<string, { title: string; desc: string }> = {
  "Ignora completamente quando eu chamo.": {
    title: "Atenção e Comandos Básicos",
    desc: "Reforçar atenção e resposta ao comando, ativando o instinto correto.",
  },
  "Não obedece comandos básicos.": {
    title: "Atenção e Comandos Básicos",
    desc: "Reforçar atenção e resposta ao comando, ativando o instinto correto.",
  },
  "Late excessivamente para visitas ou outros cães.": {
    title: "Modulação de Reatividade",
    desc: "Reduzir reações excessivas e ensinar controle diante de estímulos.",
  },
  "Rosna ou demonstra agressividade.": {
    title: "Modulação de Reatividade",
    desc: "Reduzir reações excessivas e ensinar controle diante de estímulos.",
  },
  "Destrói objetos em casa quando fica sozinho.": {
    title: "Ansiedade e Comportamento em Casa",
    desc: "Diminuir ansiedade e redirecionar o comportamento dentro de casa.",
  },
  "Morde mãos, pés ou objetos o tempo todo.": {
    title: "Ansiedade e Comportamento em Casa",
    desc: "Diminuir ansiedade e redirecionar o comportamento dentro de casa.",
  },
  "Faz as necessidades no lugar errado.": {
    title: "Treino de Higiene",
    desc: "Ensinar o local correto e criar consistência no comportamento.",
  },
};

const Diagnosis = ({ _navigate, _initialState = {} }: { _navigate: NavigateFn; _initialState?: DiagState }) => {
  const navigate = _navigate;
  const s = _initialState as DiagState;
  const dogName = s.dogName?.trim() || "seu cão";
  const hasName = !!s.dogName?.trim();
  const dogG = hasName ? getDogGender(s.dogName) : "m";
  const _do = articleDe(dogG); // "do" ou "da"
  const level = s.level || 3;
  const breed = s.breed || "—";
  const age = s.age || "—";
  const challenges = s.challenges || [];

  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  // Mede header/footer
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

  // Objetivo dinâmico:
  // 1 resposta → mostra o título + descrição daquele comportamento
  // 2+ respostas → "Seu plano vai corrigir: X, Y e Z" + subheadline padrão
  const goalContent = useMemo(() => {
    if (challenges.length === 0) {
      return {
        h: "Obediência POI Personalizada",
        s: "O desafio será montado com base nas suas respostas.",
      };
    }
    if (challenges.length === 1) {
      const g = challengeToGoal[challenges[0]];
      if (g) return { h: g.title, s: g.desc };
      return {
        h: "Obediência POI Personalizada",
        s: "O desafio será montado com base nas suas respostas.",
      };
    }
    // 2+ respostas: lista resumo dos comportamentos
    const map: Record<string, string> = {
      "Morde mãos, pés ou objetos o tempo todo.": "morder",
      "Destrói objetos em casa quando fica sozinho.": "destruir",
      "Faz as necessidades no lugar errado.": "necessidades no lugar errado",
      "Late excessivamente para visitas ou outros cães.": "latir",
      "Ignora completamente quando eu chamo.": "ignorar comandos",
      "Rosna ou demonstra agressividade.": "agressividade",
      "Não obedece comandos básicos.": "não obedecer",
    };
    const items = challenges.map((c) => map[c]).filter(Boolean);
    let listStr = "";
    if (items.length === 2) listStr = `${items[0]} e ${items[1]}`;
    else listStr = items.slice(0, -1).join(", ") + " e " + items[items.length - 1];
    return {
      h: `Seu plano vai corrigir: ${listStr}`,
      s: "O desafio vai reorganizar o instinto do seu cão, criando controle e respostas consistentes em todas essas situações.",
    };
  }, [challenges]);

  return (
    <div className="quiz-shell">
      {/* Header fixo */}
      <header className="quiz-header" ref={headerRef}>
        <div className="flex items-center justify-between mb-1.5">
          <button
            onClick={() => navigate("/quiz", { state: { ...s, step: 7 } as Record<string, unknown> })}
            className="flex h-7 w-7 items-center justify-center rounded-full text-foreground"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <img src={logo} alt="DesafioPOI" className="h-4 w-auto" />
          <div className="h-7 w-7" />
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[85%] rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </div>
      </header>

      {/* Body */}
      <main className="quiz-body">
        <h1 className="text-center text-[18px] font-extrabold leading-tight text-foreground">
          Diagnóstico comportamental {_do} <span className="text-highlight">{dogName}</span>
        </h1>
        <p className="mt-1.5 text-center text-[12px] leading-relaxed text-muted-foreground">
          Com base nas suas respostas, analisamos o perfil do seu cão para criar o melhor plano de treino.
        </p>

        {/* Card 1 - Perfil identificado */}
        <div className="mt-3 rounded-2xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Perfil identificado</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <PawPrint className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Raça</p>
                <p className="text-[13px] font-bold text-foreground leading-tight">{breed}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border-l border-border pl-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">Idade</p>
                <p className="text-[13px] font-bold text-foreground leading-tight">{age}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Nível atual (simplificado) */}
        <div className="mt-2.5 rounded-2xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Nível atual</h2>
          </div>

          <div className="flex items-center justify-center gap-4">
            <p className="text-[36px] font-extrabold leading-none text-highlight">
              {level}/5
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="h-4 w-4 rounded-full"
                  style={{
                    background: n <= level ? "hsl(218,80%,42%)" : "hsl(var(--muted))",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card 3 - Objetivo (substitui Análise) */}
        <div className="mt-2.5 rounded-2xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Objetivo</h2>
          </div>
          <p className="text-[15px] font-bold text-foreground leading-snug mb-1.5">
            {goalContent.h}
          </p>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            <HighlightInstinto>{goalContent.s}</HighlightInstinto>
          </p>
        </div>

        {/* Card 4 - Evolução em 21 Dias */}
        <div className="mt-2.5 rounded-2xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Evolução em 21 Dias</h2>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">
            Projeção de obediência POI
          </p>

          <div className="relative mt-4 mb-1" style={{ height: "120px" }}>
            <svg width="100%" height="100%" viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#22C55E" />
                </linearGradient>
              </defs>
              <line x1="0" y1="115" x2="320" y2="115" stroke="hsl(var(--border))" strokeWidth="1" />
              <path
                d="M 20 100 Q 100 95, 160 65 T 300 20"
                stroke="url(#grad)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="20" cy="100" r="6" fill="#EF4444" />
              <circle cx="160" cy="65" r="6" fill="#F59E0B" />
              <circle cx="300" cy="20" r="6" fill="#22C55E" />
            </svg>

            <div className="absolute" style={{ left: "0%", top: "60px" }}>
              <span className="text-[10px] font-bold" style={{ color: "#EF4444" }}>Dia 1-7</span>
            </div>
            <div className="absolute" style={{ left: "44%", top: "20px" }}>
              <span className="text-[10px] font-bold" style={{ color: "#F59E0B" }}>Dia 8-14</span>
            </div>
            <div className="absolute" style={{ right: "0%", top: "-8px" }}>
              <span className="text-[10px] font-bold" style={{ color: "#22C55E" }}>Dia 15-21</span>
            </div>
          </div>
        </div>

        {/* Card 5 - Boa notícia! */}
        <div className="mt-2.5 rounded-2xl border border-border bg-card p-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[15px] font-bold text-foreground leading-tight">Boa notícia! 🎉</h2>
              <p className="text-[13px] font-semibold text-foreground mt-1 leading-snug">
                Seu cão tem grande potencial de evolução!
              </p>
              <p className="text-[13px] text-foreground/80 mt-1.5 leading-relaxed">
                Com o Protocolo POI, cães com esse perfil apresentam resultados reais em até 21 dias, quando o método é aplicado da forma correta.
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-xl px-3 py-2.5 text-center" style={{ background: "hsl(142,70%,95%)", border: "1px solid hsl(142,60%,75%)" }}>
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <CheckCircle2 className="h-4 w-4" style={{ color: "hsl(142,70%,38%)" }} />
              <p className="text-[13px] font-extrabold" style={{ color: "hsl(142,70%,28%)" }}>
                +10.000 cães já transformados
              </p>
            </div>
            <p className="text-[11px]" style={{ color: "hsl(142,50%,30%)" }}>
              com o Protocolo POI
            </p>
          </div>
        </div>
      </main>

      {/* Footer fixo */}
      <footer className="quiz-footer" ref={footerRef}>
        <button
          onClick={() => navigate("/quiz", { state: { ...s, step: 8 } as Record<string, unknown> })}
          className="w-full rounded-full font-bold text-white"
          style={{
            background: "linear-gradient(135deg, hsl(142,70%,38%) 0%, hsl(140,75%,32%) 100%)",
            boxShadow: "0 6px 20px rgba(34,197,94,0.35)",
            fontSize: "15px",
            padding: "14px 20px",
          }}
        >
          Continuar
        </button>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <Lock className="h-3 w-3" />
          Ambiente 100% seguro
        </p>
      </footer>
    </div>
  );
};

export default Diagnosis;
