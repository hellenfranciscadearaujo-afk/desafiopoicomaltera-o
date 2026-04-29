/**
 * Diagnosis.tsx — Diagnóstico comportamental personalizado
 *
 * Estrutura:
 * 1. Header com logo + barra de progresso
 * 2. Headline + subheadline (com nome do cão)
 * 3. Card "Perfil identificado" — Raça + Idade
 * 4. Card "Nível atual" — bolinhas + label + sintomas (do passo 1)
 * 5. Card "Análise do comportamento" — 4 bullets verdes (dinâmicos)
 * 6. Card "Evolução em 21 Dias" — gráfico com 3 marcos
 * 7. Card "Boa notícia!" — copy + badge +12.000 cães
 * 8. Footer fixo: botão CTA verde
 */

import { useMemo } from "react";
import { ChevronLeft, User, PawPrint, Calendar, BarChart3, AlertTriangle, Search, TrendingUp, Shield, CheckCircle2, Lock } from "lucide-react";
import logo from "@/assets/logo.png";

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

// Mapa challenges → sintoma curto para o card "Nível atual"
const challengeSymptom: Record<string, string> = {
  "Morde mãos, pés ou objetos o tempo todo.": "Mordidas frequentes",
  "Destrói objetos em casa quando fica sozinho.": "Ansiedade quando sozinho",
  "Faz as necessidades no lugar errado.": "Eliminação fora do lugar",
  "Late excessivamente para visitas ou outros cães.": "Reage antes de obedecer",
  "Ignora completamente quando eu chamo.": "Ignora comandos em distrações",
  "Rosna ou demonstra agressividade.": "Reatividade desregulada",
  "Não obedece comandos básicos.": "Dificuldade em manter foco",
};

const Diagnosis = ({ _navigate, _initialState = {} }: { _navigate: NavigateFn; _initialState?: DiagState }) => {
  const navigate = _navigate;
  const s = _initialState as DiagState;
  const dogName = s.dogName?.trim() || "seu cão";
  const level = s.level || 3;
  const breed = s.breed || "—";
  const age = s.age || "—";
  const challenges = s.challenges || [];

  // Label e subtexto do nível atual (1 a 5)
  const levelInfo = useMemo(() => {
    switch (level) {
      case 1: return { label: "Crítico", desc: "Seu cão ainda não responde aos comandos básicos." };
      case 2: return { label: "Aprendiz", desc: "Seu cão está começando, mas precisa de mais consistência." };
      case 3: return { label: "Intermediário com falhas", desc: "Seu cão já entende alguns estímulos, mas ainda apresenta dificuldades em momentos importantes." };
      case 4: return { label: "Bom comportamento", desc: "Seu cão obedece bem, com alguns deslizes pontuais." };
      case 5: return { label: "Excelente", desc: "Seu cão tem ótimo desempenho — vamos refinar ainda mais." };
      default: return { label: "Intermediário", desc: "Seu cão precisa de um plano estruturado para evoluir." };
    }
  }, [level]);

  // Sintomas (3 primeiros challenges marcados)
  const symptoms = useMemo(() => {
    const list = challenges
      .map((c) => challengeSymptom[c])
      .filter(Boolean)
      .slice(0, 3);
    if (list.length === 0) return ["Baixa consistência", "Falta de foco", "Reação a estímulos"];
    return list;
  }, [challenges]);

  // Análise do comportamento — 4 bullets dinâmicos
  const analysis = useMemo(() => {
    const items: string[] = ["Baixa consistência nos comandos"];
    const hasAnxiety = challenges.some((c) =>
      c.includes("Destrói") || c.includes("Morde")
    );
    const hasIgnore = challenges.some((c) =>
      c.includes("Ignora") || c.includes("Não obedece")
    );
    if (hasAnxiety) items.push("Ansiedade em ambientes com estímulos");
    if (hasIgnore) items.push("Dependência emocional do tutor");
    if (!hasAnxiety && !hasIgnore) {
      items.push("Reatividade a estímulos do ambiente");
      items.push("Falta de direcionamento do instinto");
    }
    items.push("Dificuldade em seguir rotina estruturada");
    return items.slice(0, 4);
  }, [challenges]);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
      {/* Header */}
      <header className="flex flex-col gap-1.5 px-5 pt-3 pb-2 flex-shrink-0">
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

      {/* Body com scroll */}
      <main className="flex-1 overflow-y-auto px-5 pb-3 pt-2">
        {/* Headline */}
        <h1 className="text-center text-[20px] font-extrabold leading-tight text-foreground">
          Diagnóstico comportamental do <span className="text-primary">{dogName}</span>
        </h1>
        <p className="mt-1.5 text-center text-[12px] leading-relaxed text-muted-foreground">
          Com base nas suas respostas, analisamos o perfil do seu cão para criar o melhor plano de treino.
        </p>

        {/* Card 1 - Perfil identificado */}
        <div className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
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

        {/* Card 2 - Nível atual */}
        <div className="mt-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h2 className="text-[14px] font-bold text-foreground">Nível atual</h2>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: n <= level ? "hsl(218,80%,42%)" : "hsl(var(--muted))",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
            <div className="flex flex-col">
              <p className="text-[28px] font-extrabold leading-none text-primary">
                {level}/5
              </p>
              <p className="text-[13px] font-bold text-foreground mt-1.5 leading-tight">
                {levelInfo.label}
              </p>
              <p className="text-[11px] text-muted-foreground leading-snug mt-1">
                {levelInfo.desc}
              </p>
            </div>

            <div className="rounded-xl bg-accent p-2.5">
              <div className="flex items-start gap-1.5 mb-1">
                <AlertTriangle className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
              </div>
              <ul className="space-y-1">
                {symptoms.map((sym, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px] leading-snug text-foreground">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-foreground" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3 - Análise do comportamento */}
        <div className="mt-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-4 w-4 text-primary" />
            <h2 className="text-[14px] font-bold text-foreground">Análise do comportamento</h2>
          </div>
          <p className="text-[12px] text-muted-foreground mb-2.5 leading-snug">
            Com base nas suas respostas, seu cão apresenta um padrão comum de:
          </p>
          <ul className="space-y-2">
            {analysis.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(142,70%,38%)" }} />
                <span className="text-[12px] leading-snug text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 4 - Evolução em 21 Dias */}
        <div className="mt-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
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
        <div className="mt-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "var(--gradient-primary)" }}>
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[15px] font-bold text-foreground leading-tight">Boa notícia! 🎉</h2>
              <p className="text-[13px] font-semibold text-foreground mt-1 leading-snug">
                Seu cão tem grande potencial de evolução!
              </p>
              <p className="text-[12px] text-foreground/80 mt-1.5 leading-relaxed">
                Com o Protocolo POI, cães com esse perfil apresentam resultados reais em até 21 dias, quando o método é aplicado da forma correta.
              </p>
            </div>
          </div>

          <div className="mt-3 rounded-xl px-3 py-2.5 text-center" style={{ background: "hsl(142,70%,95%)", border: "1px solid hsl(142,60%,75%)" }}>
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <CheckCircle2 className="h-4 w-4" style={{ color: "hsl(142,70%,38%)" }} />
              <p className="text-[13px] font-extrabold" style={{ color: "hsl(142,70%,28%)" }}>
                +12.000 cães já transformados
              </p>
            </div>
            <p className="text-[11px]" style={{ color: "hsl(142,50%,30%)" }}>
              com o Protocolo POI
            </p>
          </div>
        </div>
      </main>

      {/* Footer fixo */}
      <footer className="px-5 pt-2 pb-3 flex-shrink-0">
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
          🎁 Quero aplicar o Protocolo POI
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
