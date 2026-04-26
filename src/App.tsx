/**
 * App.tsx — SPA de URL única com rastreamento híbrido Meta (Pixel + CAPI)
 *
 * Fluxo de estados:
 * home → quiz (passos 1-9) → loading → diagnosis → offer
 *
 * Eventos Meta:
 * - PageView    → ao montar o App (1x)
 * - QuizStart   → ao clicar no CTA da home (home → quiz)
 * - QuizProgress → ao chegar no diagnóstico
 * - Lead        → ao chegar na oferta
 */

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useMetaEvents } from "@/hooks/useMetaEvents";

import Home from "./pages/Home.tsx";
import Index from "./pages/Index.tsx";
import Loading from "./pages/Loading.tsx";
import Diagnosis from "./pages/Diagnosis.tsx";
import Offer from "./pages/Offer.tsx";

export type FunnelStage = "home" | "quiz" | "loading" | "diagnosis" | "offer";

export interface QuizData {
  dogName?: string;
  challenges?: string[];
  frequency?: string;
  ignored?: string;
  age?: string;
  breed?: string;
  level?: number;
  email?: string;
  step?: number;
}

const queryClient = new QueryClient();

function FunnelOrchestrator() {
  const [stage, setStage] = useState<FunnelStage>("home");
  const [quizData, setQuizData] = useState<QuizData>({});
  const { trackPageView, trackQuizStart, trackQuizProgress, trackLead } = useMetaEvents();

  // PageView 1x ao entrar
  useEffect(() => {
    trackPageView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (to: string, opts?: { state?: QuizData; replace?: boolean }) => {
    const data = opts?.state ?? {};
    setQuizData((prev) => ({ ...prev, ...data }));

    if (to === "/" || to === "/quiz") {
      // Se saiu da home para o quiz (step 1), dispara QuizStart
      if (stage === "home") trackQuizStart();
      setStage("quiz");
    } else if (to === "/carregando") {
      setStage("loading");
    } else if (to === "/diagnostico") {
      trackQuizProgress();
      setStage("diagnosis");
    } else if (to === "/oferta") {
      trackLead();
      setStage("offer");
    }
  };

  switch (stage) {
    case "home":
      return <Home _navigate={navigate} />;
    case "quiz":
      return <Index _navigate={navigate} _initialState={quizData} />;
    case "loading":
      return <Loading _navigate={navigate} _initialState={quizData} />;
    case "diagnosis":
      return <Diagnosis _navigate={navigate} _initialState={quizData} />;
    case "offer":
      return <Offer _initialState={quizData} />;
    default:
      return <Home _navigate={navigate} />;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FunnelOrchestrator />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
