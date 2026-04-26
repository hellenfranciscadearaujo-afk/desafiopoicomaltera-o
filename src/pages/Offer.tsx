import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ShieldCheck, Gift, Plus, Minus, Zap } from "lucide-react";
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

  const ctaLabel = `Quero transformar ${dogName} agora`;

  return (
    <div className="mx-auto min-h-dvh max-w-md bg-secondary">
      {/* Urgência */}
      <div className="bg-primary px-4 py-2.5 text-center text-primary-foreground">
        <div className="flex items-center justify-center gap-1.5 text-[14px] font-bold uppercase tracking-widest">
          <Zap className="h-4 w-4" /> Oferta por tempo limitado
        </div>
        <div className="mt-1 flex items-center justify-center gap-2">
          <span className="text-[14px] opacity-90">Seu desconto expira em:</span>
          <span className="text-xl font-extrabold tracking-wide tabular-nums">{mm}:{ss}</span>
        </div>
      </div>

      {/* Hero */}
      <Section>
        <h1 className="text-center text-[21px] font-extrabold leading-tight text-foreground">
          O diagnóstico de {dogName} está pronto!
        </h1>
        <p className="mt-2 text-center text-[14px] leading-relaxed text-muted-foreground">
          O Protocolo POI é o caminho mais rápido para transformar {dogName} em um companheiro exemplar.
        </p>
      </Section>

      {/* Antes / Depois */}
      <Section>
        <div className="grid grid-cols-2 gap-2.5">
          <BACard tone="bad" label="AGORA" img={beforeImg} alt={`${dogName} antes do POI`} />
          <BACard tone="good" label="COM O POI" img={afterImg} alt={`${dogName} com o POI`} />
        </div>
        <BarRow label="Nível atual" value={`${level}/5`} tone="bad" pct={(level / 5) * 100} />
        <BarRow label="Com o POI" value="5/5" tone="good" pct={100} />
      </Section>

      {/* Resumo do diagnóstico */}
      <Section>
        <p className="mb-3 text-[14px] font-bold uppercase tracking-widest text-muted-foreground">
          Resumo do diagnóstico
        </p>
        <DRow k="Objetivo" v={goal} />
        <DRow k="Raça" v={breed} />
        <DRow k="Idade" v={age} />
        <DRow k="Personalidade" v="Perfil Único POI" hot />
        <div className="flex items-center justify-between py-2">
          <span className="text-[14px] text-muted-foreground">Nível atual</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${i <= level ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Preço + CTA */}
      <Section>
        <PriceBlock />
        <CTA label={ctaLabel} />
        <p className="mb-3 text-center text-[14px] text-muted-foreground">
          Acesso imediato após o pagamento
        </p>
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

      {/* Preço 2 */}
      <Section>
        <div className="mb-3 text-center">
          <p className="text-[14px] font-medium text-muted-foreground line-through">De R$ 118,00</p>
          <p className="text-[28px] font-extrabold leading-none text-success">R$ 37,00</p>
          <p className="mt-1 text-[14px] text-muted-foreground">
            Pagamento único · Acesso vitalício
          </p>
        </div>
        <CTA label={ctaLabel} />
        <p className="mb-3 text-center text-[14px] text-muted-foreground">
          Acesso imediato após o pagamento
        </p>
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
      className={`py-1.5 text-center text-[14px] font-bold tracking-widest ${
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
    <div className="mb-1 mt-2.5 flex justify-between text-[14px]">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-bold ${tone === "bad" ? "text-destructive" : "text-success"}`}>{value}</span>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-muted">
      <div
        className={`h-full rounded-full ${tone === "bad" ? "bg-destructive" : "bg-success"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  </>
);

const DRow = ({ k, v, hot }: { k: string; v: string; hot?: boolean }) => (
  <div className="flex items-center justify-between border-b border-border/50 py-2.5 last:border-0">
    <span className="text-[14px] text-muted-foreground">{k}</span>
    <span className={`text-[14px] font-semibold ${hot ? "italic text-primary" : "text-foreground"}`}>{v}</span>
  </div>
);

const PriceBlock = () => (
  <div className="mb-3 rounded-2xl border border-border bg-muted/20 p-4 text-center">
    <p className="mb-1 text-[14px] font-bold uppercase tracking-widest text-muted-foreground">
      Oferta especial de hoje
    </p>
    <p className="text-[14px] font-medium text-muted-foreground line-through">De R$ 118,00</p>
    <p className="my-1 text-[32px] font-extrabold leading-none text-success">R$ 37,00</p>
    <p className="text-[14px] text-muted-foreground">Pagamento único · Acesso vitalício</p>
    <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-[14px] font-bold text-success">
      <Check className="h-3.5 w-3.5" /> Economia de R$ 81 — 68% off
    </span>
  </div>
);

const CTA = ({ label }: { label: string }) => (
  <a
    href="https://ggcheckout.app/checkout/v4/JJu2MWXXZXKnPDHywq3d"
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
