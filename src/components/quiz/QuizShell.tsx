import { ReactNode, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { HighlightInstinto } from "@/components/HighlightInstinto";

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
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  // Mede header/footer e expõe como CSS vars (--quiz-header-h / --quiz-footer-h)
  // assim o body pode reservar o espaço correto independente do tamanho do CTA
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
  }, [footer]);

  return (
    <div className="quiz-shell">
      <header className="quiz-header" ref={headerRef}>
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
          {headline && <h1 className="quiz-headline"><HighlightInstinto>{headline}</HighlightInstinto></h1>}
          {subheadline && <p className="quiz-subheadline"><HighlightInstinto>{subheadline}</HighlightInstinto></p>}
          {image && <div className="mt-2">{image}</div>}
        </div>
        <div className="quiz-answers">{children}</div>
      </main>

      <footer className="quiz-footer" ref={footerRef}>
        {footer}
      </footer>
    </div>
  );
};
