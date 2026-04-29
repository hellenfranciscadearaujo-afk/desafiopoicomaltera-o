import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import logo from "@/assets/logo.png";

interface QuizShellProps {
  step: number;
  totalSteps: number;
  onBack?: () => void;
  showBack?: boolean;
  headline?: string;
  subheadline?: string;
  image?: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

export const QuizShell = ({
  step,
  totalSteps,
  onBack,
  showBack = true,
  headline,
  subheadline,
  image,
  children,
  footer,
}: QuizShellProps) => {
  const progress = Math.min(100, Math.max(0, (step / totalSteps) * 100));

  return (
    <div className="quiz-shell">
      <header className="quiz-header">
        <div className="flex items-center justify-between mb-1.5">
          <button
            onClick={onBack}
            className="flex h-7 w-7 items-center justify-center rounded-full text-foreground disabled:opacity-30"
            disabled={!showBack || !onBack}
            aria-label="Voltar"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <img src={logo} alt="DesafioPOI" className="h-4 w-auto" />
          <div className="h-7 w-7" />
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--gradient-primary)" }}
          />
        </div>
      </header>

      <main className="quiz-body">
        <div className="quiz-content-fixed">
          {headline && <h1 className="quiz-headline">{headline}</h1>}
          {subheadline && <p className="quiz-subheadline">{subheadline}</p>}
          {image && <div className="mt-2">{image}</div>}
        </div>
        <div className="quiz-answers">{children}</div>
      </main>

      <footer className="quiz-footer">{footer}</footer>
    </div>
  );
};
