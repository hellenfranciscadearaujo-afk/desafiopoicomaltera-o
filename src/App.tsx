/**
 * App.tsx — SPA com lazy loading agressivo
 *
 * Apenas a Home (+ providers mínimos) carrega no bundle inicial.
 * Tooltip, Toaster, QueryClient e demais páginas são lazy.
 */

import { lazy, Suspense, useEffect, useState } from "react";
import { useMetaEvents } from "@/hooks/useMetaEvents";

import Home from "./pages/Home.tsx";

// Lazy — só carrega após o usuário sair da Home
const Index = lazy(() => import("./pages/Index.tsx"));
const Loading = lazy(() => import("./pages/Loading.tsx"));
const Diagnosis = lazy(() => import("./pages/Diagnosis.tsx"));
const Gift = lazy(() => import("./pages/Gift.tsx"));
const Offer = lazy(() => import("./pages/Offer.tsx"));

// Providers pesados também lazy
const HeavyProviders = lazy(() => import("./HeavyProviders.tsx"));

export type FunnelStage = "home" | "quiz" | "loading" | "diagnosis" | "gift" | "offer";

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

function FunnelOrchestrator() {
  const [stage, setStage] = useState<FunnelStage>("home");
  const [quizData, setQuizData] = useState<QuizData>({});
  const { trackPageView, trackQuizStart, trackQuizProgress, trackLead } = useMetaEvents();

  useEffect(() => {
    trackPageView();
    // Pré-carrega Index em background 1.5s depois (sem competir com first paint)
    const t = setTimeout(() => { import("./pages/Index.tsx"); }, 1500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sempre que mudar de página (stage), volta ao topo
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [stage]);

  const navigate = (to: string, opts?: { state?: QuizData; replace?: boolean }) => {
    const data = opts?.state ?? {};
    setQuizData((prev) => ({ ...prev, ...data }));

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (to === "/" || to === "/quiz") {
      if (stage === "home") trackQuizStart();
      setStage("quiz");
    } else if (to === "/carregando") {
      setStage("loading");
    } else if (to === "/diagnostico") {
      trackQuizProgress();
      setStage("diagnosis");
    } else if (to === "/presente") {
      setStage("gift");
    } else if (to === "/oferta") {
      trackLead();
      setStage("offer");
    }
  };

  if (stage === "home") {
    return <Home _navigate={navigate} />;
  }

  return (
    <Suspense fallback={null}>
      <HeavyProviders>
        {stage === "quiz" && <Index _navigate={navigate} _initialState={quizData} />}
        {stage === "loading" && <Loading _navigate={navigate} _initialState={quizData} />}
        {stage === "diagnosis" && <Diagnosis _navigate={navigate} _initialState={quizData} />}
        {stage === "gift" && <Gift _navigate={navigate} _initialState={quizData} />}
        {stage === "offer" && <Offer _initialState={quizData} />}
      </HeavyProviders>
    </Suspense>
  );
}

const App = () => <FunnelOrchestrator />;

export default App;
