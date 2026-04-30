import { useEffect, useMemo, useState } from "react";
import { Check, ShieldCheck, Gift, Plus, Minus, Zap, PawPrint, Calendar, BarChart3 } from "lucide-react";
import beforeImg from "@/assets/before.webp";
import afterImg from "@/assets/after.webp";

interface OfferState {
  dogName?: string;
  breed?: string;
  age?: string;
  level?: number;
  challenges?: string[];
}

const Offer = ({ _initialState = {} }: { _initialState?: OfferState }) => {
  const s = _initialState as OfferState;
  const dogName = s.dogName?.trim() || "seu cão";
  // Cupom igual ao da página Gift: POI68 + 4 primeiras letras do nome
  const couponSuffix = (s.dogName || "").trim().slice(0, 4).toUpperCase().replace(/[^A-ZÀ-Ú]/g, "");
  const coupon = `POI68${couponSuffix}`;
  const breed = s.breed || "—";
  const age = s.age || "—";
  const level = s.level || 3;

  const goal = useMemo(() => {
    const ch = s.challenges || [];
    if (ch.some((c) => c.toLowerCase().includes("late"))) return "Modulação de Reatividade e Latidos";
    if (ch.some((c) => c.toLowerCase().includes("puxa"))) return "Controle de Guia e Passeios";
    if (ch.some((c) => c.toLowerCase().includes("destrói"))) return "Ansiedade e Foco em Casa";
    if (ch.some((c) => c.toLowerCase().includes("ignora"))) return "Atenção e Comandos Básicos";
    if (ch.some((c) => c.toLowerCase().includes("necessidades"))) return "Treino de Higiene e Rotina";
    return "Obediência POI Personalizada";
  }, [s.challenges]);

  const [seconds, setSeconds] = useState(10 * 60);


  useEffect(() => {
    const id = setInterval(() => setSeconds((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const ctaLabel = `Quero o desafio personalizado ${dogName} agora`;

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-secondary">
      {/* Urgência — timer fino com azul mais claro */}
      <div
        className="px-4 py-1.5 text-center"
        style={{
          background: "linear-gradient(90deg, hsl(218,80%,42%) 0%, hsl(216,85%,52%) 100%)",
          color: "#fff",
        }}
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider">
            <Zap className="h-3.5 w-3.5" /> Oferta por tempo limitado
          </span>
          <span className="text-white/30">·</span>
          <span className="text-[12px] opacity-95">Expira em</span>
          <span
            className="rounded-md px-2 py-0.5 text-[13px] font-extrabold tracking-wide tabular-nums"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            {mm}:{ss}
          </span>
        </div>
      </div>

      {/* Hero — Parabéns + Presente resgatado (compacto) */}
      <Section>
        <div className="grid grid-cols-[1.4fr_1fr] gap-2 items-center">
          {/* Coluna esquerda: parabéns */}
          <div>
            <div className="flex items-start gap-1.5 mb-1">
              <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full mt-0.5" style={{ background: "hsl(142,70%,38%)" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h1 className="text-[16px] font-extrabold leading-tight text-foreground">
                Parabéns, {dogName}!
              </h1>
            </div>
            <h2 className="text-[15px] font-extrabold leading-tight text-foreground mb-1.5">
              Seu desafio está pronto
            </h2>
            <p className="text-[11px] leading-snug text-muted-foreground">
              Com base nas suas respostas, criamos um plano personalizado para transformar o {dogName}.
            </p>
          </div>

          {/* Coluna direita: presente resgatado */}
          <div className="flex flex-col items-center text-center">
            {/* Mini-presente igual ao da página Gift */}
            <div className="relative" style={{ width: "84px", height: "84px" }}>
              {/* Sparkles */}
              {[
                { top: "-4px", left: "12%" },
                { top: "20%", right: "-6px" },
                { bottom: "10%", left: "-5px" },
                { bottom: "-2px", right: "20%" },
              ].map((p, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{ ...p, fontSize: "11px", animation: `sparkle 1.6s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
                >✨</span>
              ))}
              <div className="relative h-full w-full" style={{ filter: "drop-shadow(0 6px 12px rgba(43,108,240,0.35))" }}>
                {/* Corpo */}
                <div className="absolute" style={{
                  background: "linear-gradient(135deg, hsl(220,70%,22%) 0%, hsl(218,80%,38%) 100%)",
                  boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.18), inset 0 2px 4px rgba(255,255,255,0.1)",
                  top: "30%", left: 0, right: 0, bottom: 0, borderRadius: "6px",
                }} />
                {/* Tampa */}
                <div className="absolute" style={{
                  background: "linear-gradient(135deg, hsl(218,75%,32%) 0%, hsl(216,85%,48%) 100%)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15), inset 0 -2px 3px rgba(0,0,0,0.1)",
                  top: "20%", left: "-3%", right: "-3%", height: "16%", borderRadius: "5px",
                }} />
                {/* Faixa vertical gold */}
                <div className="absolute" style={{
                  background: "linear-gradient(90deg, #FFB800 0%, #FFDF40 50%, #FFB800 100%)",
                  width: "16%", left: "42%", top: "20%", bottom: 0,
                  boxShadow: "inset -1px 0 2px rgba(0,0,0,0.2)",
                }} />
                {/* Faixa horizontal gold */}
                <div className="absolute" style={{
                  background: "linear-gradient(180deg, #FFB800 0%, #FFDF40 50%, #FFB800 100%)",
                  height: "8%", left: 0, right: 0, top: "30%",
                  boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.18)",
                }} />
                {/* Laço */}
                <div className="absolute" style={{ top: "0%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "32%" }}>
                  <div className="absolute" style={{
                    background: "linear-gradient(135deg, #FFDF40 0%, #FFB800 100%)",
                    width: "42%", height: "75%", left: 0, top: "12%",
                    borderRadius: "50% 20% 20% 50%",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.18), inset 0 -1px 2px rgba(0,0,0,0.1)",
                    transform: "rotate(-8deg)",
                  }} />
                  <div className="absolute" style={{
                    background: "linear-gradient(225deg, #FFDF40 0%, #FFB800 100%)",
                    width: "42%", height: "75%", right: 0, top: "12%",
                    borderRadius: "20% 50% 50% 20%",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.18), inset 0 -1px 2px rgba(0,0,0,0.1)",
                    transform: "rotate(8deg)",
                  }} />
                  <div className="absolute rounded-full" style={{
                    background: "linear-gradient(135deg, #E69E00 0%, #FFB800 100%)",
                    width: "26%", height: "32%", left: "37%", top: "35%",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.25), inset -1px -1px 1px rgba(0,0,0,0.15)",
                  }} />
                </div>
              </div>
            </div>

            <p className="text-[10px] mt-1.5 leading-tight text-muted-foreground">
              Você resgatou seu
            </p>
            <p className="text-[12px] font-extrabold leading-tight text-foreground tracking-wide">
              PRESENTE EXCLUSIVO!
            </p>
            <div className="mt-1 rounded-md border border-dashed border-primary px-1.5 py-0.5">
              <p className="text-[10px] font-extrabold tracking-widest text-primary">{coupon}</p>
            </div>
            <p className="text-[10px] mt-1.5 leading-tight text-muted-foreground">
              Acesso completo ao
            </p>
            <p className="text-[12px] font-bold leading-tight text-foreground">
              <span className="text-foreground">Desafio</span><span className="text-primary">POI</span>
            </p>
          </div>
        </div>

        <style>{`
          @keyframes sparkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
            50%      { opacity: 1;   transform: scale(1.2) rotate(180deg); }
          }
        `}</style>
      </Section>

      {/* Antes / Depois (mais compacto) */}
      <Section>
        <div className="mx-auto grid max-w-[280px] grid-cols-2 gap-2">
          <BACard tone="bad" label="AGORA" img={beforeImg} alt={`${dogName} antes do POI`} />
          <BACard tone="good" label="COM O POI" img={afterImg} alt={`${dogName} com o POI`} />
        </div>
        <BarRow label="Nível atual" value={`${level}/5`} tone="bad" pct={(level / 5) * 100} />
        <BarRow label="Com o POI" value="5/5" tone="good" pct={100} />
      </Section>

      {/* Resumo do diagnóstico — espelha a página de Diagnóstico (compacto) */}
      <Section>
        <div className="rounded-2xl border border-border bg-card p-2.5 shadow-sm">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            📋 Resumo do diagnóstico
          </p>

          {/* Linha 1: Raça + Idade + Nível X/5 */}
          <div className="grid grid-cols-3 gap-1.5 mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <PawPrint className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground leading-none">Raça</p>
                <p className="text-[11px] font-bold text-foreground leading-tight truncate">{breed}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-l border-border pl-2">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <Calendar className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground leading-none">Idade</p>
                <p className="text-[11px] font-bold text-foreground leading-tight truncate">{age}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 border-l border-border pl-2">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                <BarChart3 className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground leading-none">Nível</p>
                <p className="text-[11px] font-bold text-primary leading-tight">{level}/5</p>
              </div>
            </div>
          </div>

          {/* Linha 2: Bolinhas mais finas */}
          <div className="flex items-center gap-1 mb-2 px-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-1 flex-1 rounded-full"
                style={{
                  background: n <= level ? "hsl(218,80%,42%)" : "hsl(var(--muted))",
                }}
              />
            ))}
          </div>

          {/* Linha 3: Objetivo (igual ao Diagnóstico) */}
          <div className="border-t border-border pt-2">
            <p className="text-[10px] font-bold text-muted-foreground mb-1">Objetivo:</p>
            {(() => {
              const ch = s.challenges || [];
              const map: Record<string, { title: string; desc: string }> = {
                "Ignora completamente quando eu chamo.": { title: "Atenção e Comandos Básicos", desc: "Reforçar atenção e resposta ao comando, ativando o instinto correto." },
                "Não obedece comandos básicos.": { title: "Atenção e Comandos Básicos", desc: "Reforçar atenção e resposta ao comando, ativando o instinto correto." },
                "Late excessivamente para visitas ou outros cães.": { title: "Modulação de Reatividade", desc: "Reduzir reações excessivas e ensinar controle diante de estímulos." },
                "Rosna ou demonstra agressividade.": { title: "Modulação de Reatividade", desc: "Reduzir reações excessivas e ensinar controle diante de estímulos." },
                "Destrói objetos em casa quando fica sozinho.": { title: "Ansiedade e Comportamento em Casa", desc: "Diminuir ansiedade e redirecionar o comportamento dentro de casa." },
                "Morde mãos, pés ou objetos o tempo todo.": { title: "Ansiedade e Comportamento em Casa", desc: "Diminuir ansiedade e redirecionar o comportamento dentro de casa." },
                "Faz as necessidades no lugar errado.": { title: "Treino de Higiene", desc: "Ensinar o local correto e criar consistência no comportamento." },
              };
              if (ch.length === 1 && map[ch[0]]) {
                return (
                  <p className="text-[12px] font-bold text-foreground leading-snug">
                    Treino de {map[ch[0]].title}
                  </p>
                );
              }
              if (ch.length >= 2) {
                const labels: Record<string, string> = {
                  "Morde mãos, pés ou objetos o tempo todo.": "morder",
                  "Destrói objetos em casa quando fica sozinho.": "destruir",
                  "Faz as necessidades no lugar errado.": "necessidades no lugar errado",
                  "Late excessivamente para visitas ou outros cães.": "latir",
                  "Ignora completamente quando eu chamo.": "ignorar comandos",
                  "Rosna ou demonstra agressividade.": "agressividade",
                  "Não obedece comandos básicos.": "não obedecer",
                };
                const items = ch.map((c) => labels[c]).filter(Boolean);
                let listStr = "";
                if (items.length === 2) listStr = `${items[0]} e ${items[1]}`;
                else listStr = items.slice(0, -1).join(", ") + " e " + items[items.length - 1];
                return (
                  <p className="text-[12px] font-bold text-foreground leading-snug">
                    Corrigir: {listStr}
                  </p>
                );
              }
              return (
                <p className="text-[12px] font-bold text-foreground leading-snug">
                  Obediência POI Personalizada
                </p>
              );
            })()}
          </div>
        </div>
      </Section>

      {/* Preço + CTA (card laranja unificado) */}
      <Section>
        <OfferCard ctaLabel={ctaLabel} coupon={coupon} mm={mm} ss={ss} />
        <Guarantee />
      </Section>

      {/* Culpa não é sua */}
      <Section>
        <div className="rounded-2xl border-l-4 border-primary bg-accent/60 p-4">
          <p className="mb-2 text-[14px] font-bold text-primary">
            A culpa não é sua (e nem do {dogName})
          </p>
          <p className="text-[14px] leading-relaxed text-foreground/80">
            Os problemas que você enfrenta são reflexos de métodos tradicionais que tentam "humanizar" o cão. Gritos e punições não funcionam porque ignoram o que realmente move um cachorro:{" "}
            <strong className="text-foreground">o instinto natural.</strong>
          </p>
        </div>
      </Section>

      {/* O que é o POI */}
      <Section>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <p className="mb-2 text-center text-[15px] font-extrabold text-primary">
            O que é o Protocolo POI?
          </p>
          <p className="text-center text-[14px] leading-relaxed text-foreground/80">
            POI é um <strong className="text-primary">Plano de Adestramento Personalizado</strong> que para de tentar "humanizar" o seu cão e passa a falar a língua dele. Através da ciência do comportamento, nós ativamos os instintos naturais de obediência para que ele te atenda por <strong className="text-primary">respeito</strong>, não por medo ou suborno.
          </p>
          <hr className="my-3 border-primary/15" />
          {[
            "Passeios tranquilos com guia frouxa",
            "Comandos atendidos de primeira",
            "Uma casa em paz, sem destruição",
            "Uma conexão inquebrável com seu cão",
          ].map((t) => (
            <div key={t} className="mb-2 flex items-start gap-2.5 last:mb-0">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
              </span>
              <span className="text-[14px] text-foreground/90">{t}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Preço 2 (card laranja unificado) */}
      <Section>
        <OfferCard ctaLabel={ctaLabel} coupon={coupon} mm={mm} ss={ss} />
        <Guarantee />
      </Section>

      {/* Bônus */}
      <Section>
        <SecTag>Bônus exclusivos</SecTag>
        {[
          { n: "Guia DoggyGames", d: "50 jogos para cansar seu cão mentalmente em 10 min" },
          { n: "Adeus Ansiedade", d: "Deixe seu cão sozinho sem destruir a casa" },
          { n: "Controle de Latidos", d: "O segredo para o silêncio e paz em casa" },
          { n: "Foco e Atenção", d: "Faça ele obedecer mesmo com distrações" },
        ].map((b) => (
          <div key={b.n} className="flex items-center gap-3 border-b border-border/60 py-3 last:border-0">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <Gift className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-foreground">{b.n}</p>
              <p className="mt-0.5 text-[14px] leading-tight text-muted-foreground">{b.d}</p>
            </div>
            <span className="text-[14px] font-bold text-success">GRÁTIS</span>
          </div>
        ))}
      </Section>

      {/* FAQ */}
      <Section>
        <SecTag>Dúvidas frequentes</SecTag>
        <FAQ />
      </Section>

      {/* CTA final */}
      <Section last>
        <CTA label={ctaLabel} />
        <p className="text-center text-[14px] text-muted-foreground">
          Garantia de 7 dias · Acesso imediato
        </p>
      </Section>

      <div className="px-4 pb-6 pt-2 text-center">
        <a href="/" className="text-[14px] text-muted-foreground underline">
          Refazer diagnóstico
        </a>
      </div>
    </div>
  );
};

const Section = ({ children, last }: { children: React.ReactNode; last?: boolean }) => (
  <section className={`bg-card p-4 ${last ? "" : "mb-1.5"}`}>{children}</section>
);

const SecTag = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 text-center text-[14px] font-bold uppercase tracking-widest text-muted-foreground">
    {children}
  </p>
);

const BACard = ({ tone, label, img, alt }: { tone: "bad" | "good"; label: string; img: string; alt: string }) => (
  <div className="overflow-hidden rounded-xl border border-border bg-card">
    <div
      className={`py-1 text-center text-[11px] font-bold tracking-widest ${
        tone === "bad" ? "bg-destructive/10 text-destructive" : "bg-success/15 text-success"
      }`}
    >
      {label}
    </div>
    <div className="w-full overflow-hidden">
      <img src={img} alt={alt} className="w-full h-auto block" />
    </div>
  </div>
);

const BarRow = ({ label, value, tone, pct }: { label: string; value: string; tone: "bad" | "good"; pct: number }) => (
  <>
    <div className="mb-0.5 mt-2 flex justify-between text-[12px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold ${tone === "bad" ? "text-destructive" : "text-success"}`}>{value}</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
      <div
        className={`h-full rounded-full ${tone === "bad" ? "bg-destructive" : "bg-success"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  </>
);

const OfferCard = ({ ctaLabel, coupon, mm, ss }: { ctaLabel: string; coupon: string; mm: string; ss: string }) => (
  <div
    className="relative mb-3 rounded-2xl border-2"
    style={{
      borderColor: "#F59E0B",
      background: "linear-gradient(180deg, #FFF4E6 0%, #FFEED5 100%)",
      boxShadow: "0 8px 24px rgba(245,158,11,0.18)",
    }}
  >
    {/* Topo — timer + cupom + 68% (com overflow hidden só na faixa colorida) */}
    <div
      className="flex items-center justify-center gap-1.5 px-3 py-2 text-white text-[12px] font-extrabold flex-wrap rounded-t-xl"
      style={{
        background: "linear-gradient(90deg, #F59E0B 0%, #EF4444 100%)",
        margin: "-2px -2px 0",
      }}
    >
      <span>🔥</span>
      <span className="tabular-nums">{mm}:{ss}</span>
      <span style={{ opacity: 0.7 }}>·</span>
      <span className="tracking-widest">{coupon}</span>
      <span style={{ opacity: 0.7 }}>·</span>
      <span>68% DE DESCONTO</span>
    </div>

    {/* Corpo — 2 colunas (preço) */}
    <div className="relative px-4 pt-4 pb-3">
      {/* Selo 68% OFF circular — flutuante acima do card, sem sobrepor preços */}
      <div
        className="absolute flex h-14 w-14 items-center justify-center rounded-full text-white text-[11px] font-extrabold leading-tight text-center"
        style={{
          background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
          boxShadow: "0 4px 12px rgba(239,68,68,0.4)",
          top: "-22px",
          right: "12px",
          transform: "rotate(8deg)",
          zIndex: 2,
        }}
      >
        68%<br />OFF
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="text-center">
          <p className="text-[12px] font-medium text-muted-foreground mb-1">De:</p>
          <p className="text-[18px] font-bold text-muted-foreground line-through">R$ 118,00</p>
        </div>
        <div className="text-center">
          <p className="text-[12px] font-medium text-muted-foreground mb-1">Por apenas:</p>
          <p className="text-[24px] font-extrabold leading-none" style={{ color: "hsl(142,70%,38%)" }}>
            R$ 37,90
          </p>
        </div>
      </div>

      {/* CTA dentro do card */}
      <a
        href="https://pagar.desafiopoi21dais.shop/checkout/v4/EpF3xss3IQLLcBfcFcD3"
        className="mt-3 block w-full rounded-full py-3 text-center text-[14px] font-bold text-white no-underline"
        style={{
          background: "linear-gradient(135deg, hsl(142,70%,38%) 0%, hsl(140,75%,32%) 100%)",
          boxShadow: "0 6px 20px rgba(34,197,94,0.35)",
        }}
      >
        {ctaLabel}
      </a>
    </div>

    {/* Selos */}
    <div className="flex items-center justify-around border-t border-orange-200 px-2 py-2.5 text-[10px] text-muted-foreground">
      <div className="flex items-center gap-1">
        <ShieldCheck className="h-3 w-3" style={{ color: "hsl(142,70%,38%)" }} />
        <span>Compra 100% segura</span>
      </div>
      <div className="flex items-center gap-1">
        <Check className="h-3 w-3" style={{ color: "hsl(142,70%,38%)" }} />
        <span>Privacidade protegida</span>
      </div>
      <div className="flex items-center gap-1">
        <Zap className="h-3 w-3" style={{ color: "hsl(142,70%,38%)" }} />
        <span>Acesso imediato</span>
      </div>
    </div>
  </div>
);

const CTA = ({ label }: { label: string }) => (
  <a
    href="https://pagar.desafiopoi21dais.shop/checkout/v4/EpF3xss3IQLLcBfcFcD3"
    className="cta-success mb-2 py-3.5 text-[14px] block text-center no-underline"
  >{label}</a>
);

const Guarantee = () => (
  <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 px-3 py-3">
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-success/15">
      <ShieldCheck className="h-5 w-5 text-success" />
    </div>
    <div className="text-[14px] leading-snug text-foreground/80">
      <strong className="block text-[14px] text-success">Garantia de 7 dias</strong>
      Se não funcionar, devolvemos 100% do valor. Sem perguntas.
    </div>
  </div>
);

const faqItems = [
  {
    q: "Quanto tempo por dia preciso dedicar?",
    a: "Apenas 10 a 15 minutos por dia. O Protocolo POI é feito para tutores com rotina corrida — pequenas sessões de alta qualidade rendem mais que horas de treino tradicional.",
  },
  {
    q: "Funciona para cães adultos ou idosos?",
    a: "Sim. O POI funciona em qualquer idade — filhotes, adultos e idosos. O instinto está presente em todo cão, basta ativá-lo da forma correta.",
  },
  {
    q: "E se meu cão for muito teimoso ou reativo?",
    a: "O Protocolo POI foi criado justamente para os casos mais difíceis: cães que ignoram, latem demais, puxam a guia ou são reativos. Ele trabalha a raiz comportamental, não apenas o sintoma.",
  },
  {
    q: "Preciso ter experiência com adestramento?",
    a: "Não. O passo a passo é em vídeo, simples e direto. Mesmo quem nunca treinou um cão consegue aplicar desde o primeiro dia.",
  },
  {
    q: "O acesso é vitalício mesmo?",
    a: "Sim. Você paga uma única vez e tem acesso para sempre, incluindo todas as atualizações futuras do Protocolo POI e dos bônus.",
  },
  {
    q: "E se eu não ver resultado? Tem garantia?",
    a: "Sim. Você tem 7 dias de garantia incondicional. Se não gostar por qualquer motivo, devolvemos 100% do valor — sem perguntas.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {faqItems.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-border/60 py-3 last:border-0">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <span className="text-[14px] font-bold text-foreground">{item.q}</span>
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            {isOpen && (
              <p className="mt-2 text-[14px] leading-snug text-muted-foreground">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Offer;
