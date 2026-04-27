import { useMemo } from "react";
import { ChevronLeft } from "lucide-react";
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

const Diagnosis = ({ _navigate, _initialState = {} }: { _navigate: NavigateFn; _initialState?: DiagState }) => {
  const navigate = _navigate;
  const s = _initialState as DiagState;
  const dogName = s.dogName?.trim() || "seu cão";
  const level = s.level || 2;

  // Goal derived from challenges
  const goal = useMemo(() => {
    const ch = s.challenges || [];
    if (ch.some((c) => c.toLowerCase().includes("late"))) return "Modulação de Reatividade e Latidos";
    if (ch.some((c) => c.toLowerCase().includes("puxa"))) return "Controle de Guia e Passeios";
    if (ch.some((c) => c.toLowerCase().includes("destrói"))) return "Ansiedade e Foco em Casa";
    if (ch.some((c) => c.toLowerCase().includes("ignora"))) return "Atenção e Comandos Básicos";
    if (ch.some((c) => c.toLowerCase().includes("necessidades"))) return "Treino de Higiene e Rotina";
    return "Obediência POI Personalizada";
  }, [s.challenges]);

  return (
    <div className="quiz-shell">
      <header className="quiz-header">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/quiz", { state: { ...s, step: 6 } as Record<string, unknown> })}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"
            aria-label="Voltar"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img src={logo} alt="DesafioPOI" className="h-5 w-auto" />
          <div className="h-9 w-9" />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-5 pb-4">
        <div className="flex flex-col gap-2 py-2">

          {/* Badge */}
          <div className="self-center rounded-full bg-success/15 px-3 py-0.5 text-[12px] font-bold tracking-wider text-success">
            ✅ DIAGNÓSTICO CONCLUÍDO
          </div>

          {/* Headline */}
          <h2 className="text-[17px] font-bold leading-tight text-foreground">
            Parabéns! O plano de {dogName} está pronto!
          </h2>
          <p className="text-[13px] text-muted-foreground">
            O Protocolo POI vai transformar {dogName} em apenas 21 dias!
          </p>

          {/* Resumo */}
          <div className="rounded-2xl border border-border bg-card px-4 py-3">
            <p className="mb-1.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              Resumo do diagnóstico
            </p>
            <div className="space-y-1.5 text-[13px]">
              <Row k="Objetivo:" v={goal} />
              <Row k="Raça:" v={s.breed || "—"} />
              <Row k="Idade:" v={s.age || "—"} />
              <Row k="Nível atual:" v={level ? `${level}/5` : "—"} />
              <Row k="Personalidade:" v="Perfil Único POI" highlight />
            </div>
          </div>

          {/* Gráfico */}
          <div className="rounded-2xl border border-border bg-card px-4 py-3">
            <p className="text-[14px] font-bold text-foreground">Evolução em 21 Dias</p>
            <p className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Projeção de obediência POI
            </p>
            <EvolutionChart />
          </div>

          {/* Mensagem */}
          <div className="rounded-2xl bg-accent p-3 text-center text-[12px] text-foreground">
            Com o POI, você vai se comunicar com <strong>{dogName}</strong> na linguagem que ele entende: a do instinto.
          </div>

        </div>
      </main>

      <footer className="quiz-footer">
        <button
          className="cta-success"
          onClick={() => navigate("/quiz", { state: { ...s, step: 7 } as Record<string, unknown> })}
        >
          Continuar
        </button>
      </footer>
    </div>
  );
};

const Row = ({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) => (
  <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-2 last:border-0 last:pb-0">
    <span className="text-muted-foreground">{k}</span>
    <span className={`text-right font-bold ${highlight ? "italic text-primary" : "text-foreground"}`}>
      {v}
    </span>
  </div>
);

const EvolutionChart = () => {
  // Curve from low to high — three labeled points
  const w = 320;
  const h = 140;
  const pad = 16;
  // points (x, y) where y is "obedience" (higher = up)
  const p1 = { x: pad, y: h - pad - 8, label: "Dia 1-7", color: "#ef4444" };
  const p2 = { x: w / 2, y: h * 0.45, label: "Dia 8-14", color: "#f59e0b" };
  const p3 = { x: w - pad, y: pad + 6, label: "Dia 15-21", color: "#22c55e" };

  const path = `M ${p1.x} ${p1.y} Q ${(p1.x + p2.x) / 2} ${p2.y + 30}, ${p2.x} ${p2.y} T ${p3.x} ${p3.y}`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full">
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        {/* baseline */}
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1={pad} y1={h / 2} x2={w - pad} y2={h / 2} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 3" />
        {/* curve */}
        <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
        {/* points */}
        {[p1, p2, p3].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill={p.color} />
            <text
              x={p.x}
              y={p.y - 10}
              textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}
              fontSize="10"
              fontWeight="700"
              fill={p.color}
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Diagnosis;
