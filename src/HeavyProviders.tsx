/**
 * HeavyProviders.tsx — providers carregados sob demanda
 *
 * QueryClient, Tooltip e Toasters não são necessários na Home,
 * então ficam aqui para serem lazy-carregados junto com o restante do funil.
 */

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const HeavyProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {children}
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default HeavyProviders;
