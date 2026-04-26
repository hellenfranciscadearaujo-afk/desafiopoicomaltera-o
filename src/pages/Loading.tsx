import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

interface LoadingState {
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

const Loading = ({ _navigate, _initialState = {} }: { _navigate: NavigateFn; _initialState?: LoadingState }) => {
  const navigate = _navigate;
  const s = _initialState as LoadingState;
  const dogName = s.dogName?.trim() || "seu cão";

  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    "Analisando o perfil comportamental…",
    "Ajustando para a idade e raça…",
    "Mapeando os instintos naturais…",
    "Finalizando seu plano personalizado…",
  ];

  const steps = [
    { label: "Perfil comportamental", done: progress >= 25 },
    { label: "Raça e idade", done: progress >= 50 },
    { label: "Instintos identificados", done: progress >= 75 },
    { label: "Plano gerado", done: progress >= 100 },
  ];

  useEffect(() => {
    const total = 12000;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / total) * 100);
      setProgress(pct);
      if (elapsed < 3000) setMsgIndex(0);
      else if (elapsed < 6000) setMsgIndex(1);
      else if (elapsed < 9000) setMsgIndex(2);
      else setMsgIndex(3);
      if (elapsed >= total) {
        clearInterval(tick);
        navigate("/diagnostico", { state: s as unknown as Record<string, unknown>, replace: true });
      }
    }, 80);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const circumference = 2 * Math.PI * 42;

  return (
    <div className="quiz-shell">
      <header className="quiz-header">
        <div className="flex items-center justify-center">
          <img src={logo} alt="DesafioPOI" className="h-5 w-auto" />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">

        <h1 className="text-[18px] font-bold leading-tight text-foreground">
          Criando o plano de {dogName}…
        </h1>

        {/* Loader circular elegante com gradiente */}
        <div className="relative" style={{ width: 140, height: 140 }}>
          <svg width="140" height="140" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
            {/* Trilha */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
            {/* Gradiente */}
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(218,80%,38%)" />
                <stop offset="100%" stopColor="hsl(142,70%,38%)" />
              </linearGradient>
            </defs>
            {/* Progresso */}
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              style={{ transition: "stroke-dashoffset 0.15s linear" }}
            />
          </svg>
          {/* Percentual no centro */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
            <span className="text-[26px] font-extrabold text-primary leading-none">{Math.floor(progress)}%</span>
            <span className="text-[10px] text-muted-foreground font-medium">concluído</span>
          </div>
        </div>

        {/* Mensagem atual */}
        <p className="text-[13px] font-medium text-foreground/80 min-h-[20px]">
          {messages[msgIndex]}
        </p>

        {/* Checklist de etapas */}
        <div className="w-full max-w-xs flex flex-col gap-2">
          {steps.map((step) => (
            <div key={step.label} className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all"
              style={{ background: step.done ? "hsl(142,70%,38%,0.1)" : "hsl(var(--muted))", border: step.done ? "1px solid hsl(142,70%,38%,0.3)" : "1px solid hsl(var(--border))" }}>
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-all"
                style={{ background: step.done ? "hsl(142,70%,38%)" : "hsl(var(--border))" }}>
                {step.done
                  ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <div style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(var(--muted-foreground))" }} />
                }
              </div>
              <span className="text-[13px] font-medium" style={{ color: step.done ? "hsl(142,70%,32%)" : "hsl(var(--muted-foreground))" }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Loading;
