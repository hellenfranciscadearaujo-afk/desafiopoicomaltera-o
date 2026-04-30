import { useMemo, useState } from "react";
import { QuizShell } from "@/components/quiz/QuizShell";
import quiz1 from "@/assets/quiz-1-sad.webp";
import quiz3 from "@/assets/quiz-3-sit.webp";
import quiz4 from "@/assets/quiz-4-walk.webp";
import beforeImg from "@/assets/before.webp";
import afterImg from "@/assets/after.webp";
import logo from "@/assets/logo.png";
import avatarJuliana from "@/assets/avatar-juliana.png";
import avatarAna from "@/assets/avatar-ana.png";
import avatarBruno from "@/assets/avatar-bruno.png";
import whatsappReviews from "@/assets/whatsapp-reviews.webp";

type Answers = {
  challenges: string[];
  frequency: string;
  ignored: string;
  age: string;
  breed: string;
  dogName: string;
  level: number;
  email: string;
};

type NavigateFn = (to: string, opts?: { state?: Record<string, unknown>; replace?: boolean }) => void;

const TOTAL = 9;

const initial: Answers = {
  challenges: [],
  frequency: "",
  ignored: "",
  age: "",
  breed: "",
  dogName: "",
  level: 0,
  email: "",
};

const QuizImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="overflow-hidden w-full mx-auto" style={{ maxWidth: "240px" }}>
    <img
      src={src}
      alt={alt}
      className="w-full h-auto block"
      loading="eager"
      decoding="sync"
      fetchPriority="high"
    />
  </div>
);

const Index = ({ _navigate, _initialState = {} }: { _navigate: NavigateFn; _initialState?: Partial<Answers> & { step?: number } }) => {
  const navigate = _navigate;
  const locationState = _initialState;

  const [step, setStep] = useState(locationState.step || 1);
  const [a, setA] = useState<Answers>({
    ...initial,
    ...(locationState.challenges !== undefined && { challenges: locationState.challenges }),
    ...(locationState.frequency !== undefined && { frequency: locationState.frequency }),
    ...(locationState.ignored !== undefined && { ignored: locationState.ignored }),
    ...(locationState.age !== undefined && { age: locationState.age }),
    ...(locationState.breed !== undefined && { breed: locationState.breed }),
    ...(locationState.dogName !== undefined && { dogName: locationState.dogName }),
    ...(locationState.level !== undefined && { level: locationState.level }),
  });

  const next = () => {
    setStep((s) => Math.min(TOTAL, s + 1));
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };
  const back = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };
  const update = <K extends keyof Answers>(k: K, v: Answers[K]) =>
    setA((p) => ({ ...p, [k]: v }));

  const dogName = a.dogName.trim() || "seu cão";

  // Mapa de comportamentos para headlines/subheadlines dinâmicas (passo 2)
  const challengeContent: Record<string, { h: string; s: string }> = {
    "Morde mãos, pés ou objetos o tempo todo.": {
      h: "Pelas suas respostas, seu cão está mordendo com frequência",
      s: "Morder mãos, pés ou objetos não é só energia — é instinto mal direcionado. Quando ele não sabe onde descarregar isso, acaba mordendo tudo.",
    },
    "Destrói objetos em casa quando fica sozinho.": {
      h: "Seu cão está destruindo coisas quando fica sozinho",
      s: "Isso geralmente é ansiedade de separação — e sem direcionamento do instinto, ele tenta aliviar isso destruindo o que encontra.",
    },
    "Faz as necessidades no lugar errado.": {
      h: "Seu cão ainda está fazendo no lugar errado",
      s: "Isso não é teimosia — ele não associou corretamente o comportamento ao instinto natural de eliminação no lugar certo.",
    },
    "Late excessivamente para visitas ou outros cães.": {
      h: "Seu cão está latindo excessivamente nessas situações",
      s: "Esse tipo de reação vem do instinto de alerta mal direcionado — sem controle, qualquer estímulo vira motivo pra latir.",
    },
    "Ignora completamente quando eu chamo.": {
      h: "Seu cão está te ignorando quando você chama",
      s: "Isso acontece quando o comando não conversa com o instinto dele — então ele simplesmente não vê motivo pra responder.",
    },
    "Rosna ou demonstra agressividade.": {
      h: "Seu cão já está demonstrando sinais de agressividade",
      s: "Rosnar ou reagir geralmente é um instinto de defesa desregulado — sem direção, ele reage em vez de obedecer.",
    },
    "Não obedece comandos básicos.": {
      h: "Seu cão ainda não obedece nem o básico",
      s: "Sem ativar o instinto certo, o comando vira só um som — e o cão não entende por que deveria obedecer.",
    },
  };

  // Calcula headline/subheadline da página de frustração baseado nas respostas
  const frustrationContent = (() => {
    const count = a.challenges.length;
    if (count >= 3) {
      return {
        h: "Isso já virou um padrão de comportamento",
        s: "Quando vários problemas aparecem ao mesmo tempo, seu cão não está reagindo por acaso — ele está seguindo um padrão sem controle.",
      };
    }
    if (count === 2) {
      return {
        h: "Os problemas já estão começando a se acumular",
        s: "Quando mais de um comportamento aparece, não é coincidência — é sinal de que o instinto do seu cão não está sendo direcionado da forma certa.",
      };
    }
    if (count === 1) {
      return challengeContent[a.challenges[0]] || {
        h: "Entendemos sua frustração",
        s: "Muitos tutores se sentem exatamente como você. Mas há uma solução.",
      };
    }
    return {
      h: "Entendemos sua frustração",
      s: "Muitos tutores se sentem exatamente como você. Mas há uma solução.",
    };
  })();

  const breeds = [
    { e: "🐕", n: "Vira-Lata (SRD)" },
    { e: "🦴", n: "Labrador" },
    { e: "💪", n: "Pit Bull" },
    { e: "🐺", n: "Pastor Alemão" },
    { e: "🌟", n: "Golden Retriever" },
    { e: "🥐", n: "Buldogue Francês" },
    { e: "🐭", n: "Chihuahua" },
    { e: "🌀", n: "Poodle" },
    { e: "🧠", n: "Border Collie" },
    { e: "🌸", n: "Shih Tzu" },
    { e: "⚡", n: "Spitz Alemão" },
    { e: "🎀", n: "Yorkshire" },
    { e: "🐾", n: "Beagle" },
    { e: "🐩", n: "Pinscher" },
    { e: "🌈", n: "Misto" },
    { e: "➕", n: "Outra raça…" },
  ];

  const ages = [
    { emoji: "🐾", label: "Filhote", sub: "até 6 meses" },
    { emoji: "🐕", label: "Jovem", sub: "7 meses a 2 anos" },
    { emoji: "🐶", label: "Adulto", sub: "3 a 7 anos" },
    { emoji: "🐩", label: "Idoso", sub: "acima de 8 anos" },
  ];

  const challenges = [
    { e: "🦷", t: "Morde mãos, pés ou objetos o tempo todo." },
    { e: "🛋️", t: "Destrói objetos em casa quando fica sozinho." },
    { e: "💧", t: "Faz as necessidades no lugar errado." },
    { e: "🔊", t: "Late excessivamente para visitas ou outros cães." },
    { e: "🚫", t: "Ignora completamente quando eu chamo." },
    { e: "😡", t: "Rosna ou demonstra agressividade." },
    { e: "🙅", t: "Não obedece comandos básicos." },
  ];

  const frequencies = [
    { e: "🔥", l: "A", t: "Diariamente, é uma luta constante." },
    { e: "😩", l: "B", t: "Algumas vezes por semana, me sinto exausto." },
    { e: "😕", l: "C", t: "Raramente, mas quando acontece, é bem chato." },
    { e: "🛡️", l: "D", t: "Quase nunca, mas quero prevenir problemas futuros." },
  ];

  const ignoredOpts = [
    { e: "😤", t: "Sim, parece que falamos línguas diferentes!" },
    { e: "🤔", t: "Às vezes, mas acho que é falta de consistência minha." },
    { e: "😊", t: "Não, meu cão geralmente me obedece." },
  ];

  const content = useMemo(() => {
    switch (step) {
      // 1 — Challenges multi-select
      case 1:
        return (
          <QuizShell
            step={1}
            totalSteps={TOTAL}
            onBack={back}
            headline="Qual o maior desafio com o comportamento do seu cão?"
            subheadline="Selecione todas as opções que se aplicam."
            footer={
              <button
                className="cta-primary"
                disabled={a.challenges.length === 0}
                onClick={next}
              >
                Continuar
              </button>
            }
          >
            <div className="mb-2 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Comportamento
            </div>
            {challenges.map((c) => {
              const selected = a.challenges.includes(c.t);
              return (
                <button
                  key={c.t}
                  className="answer-card"
                  data-selected={selected}
                  onClick={() =>
                    update(
                      "challenges",
                      selected ? a.challenges.filter((x) => x !== c.t) : [...a.challenges, c.t]
                    )
                  }
                >
                  <span className="text-lg">{c.e}</span>
                  <span className="leading-snug flex-1">{c.t}</span>
                  <span
                    className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                      selected ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                  </span>
                </button>
              );
            })}
          </QuizShell>
        );

      // 2 — Frustration / frequency
      case 2:
        return (
          <QuizShell
            step={2}
            totalSteps={TOTAL}
            onBack={back}
            headline={frustrationContent.h}
            subheadline={frustrationContent.s}
            image={<QuizImage src={quiz3} alt="Cão sentado recebendo recompensa" />}
            footer={
              <button className="cta-primary" disabled={!a.frequency} onClick={next}>
                Continuar
              </button>
            }
          >
            <div className="mb-2 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Frequência
            </div>
            <p className="px-1 pb-1 text-[14px] font-bold text-foreground">
              Com que frequência o comportamento indesejado do seu cão causa estresse?
            </p>
            {frequencies.map((f) => {
              const sel = a.frequency === f.l;
              return (
                <button
                  key={f.l}
                  className="answer-card"
                  data-selected={sel}
                  onClick={() => { update("frequency", f.l); }}
                >
                  <span className="text-lg">{f.e}</span>
                  <span className="leading-snug">{f.t}</span>
                </button>
              );
            })}
          </QuizShell>
        );

      // 3 — Instinct / ignored
      case 3:
        return (
          <QuizShell
            step={3}
            totalSteps={TOTAL}
            onBack={back}
            headline="E se a culpa não fosse sua, nem do seu cão?"
            subheadline="A maioria dos métodos falha porque ignora o que realmente move seu cão: o Instinto."
            image={<QuizImage src={quiz4} alt="Tutora passeando com o cão tranquilamente" />}
            footer={
              <button className="cta-primary" disabled={!a.ignored} onClick={next}>
                Continuar
              </button>
            }
          >
            <div className="mb-2 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Conexão
            </div>
            <p className="px-1 pb-1 text-[14px] font-bold text-foreground">
              Você já sentiu que, por mais que tente, seu cão não entende o que você quer?
            </p>
            {ignoredOpts.map((o) => {
              const sel = a.ignored === o.t;
              return (
                <button
                  key={o.t}
                  className="answer-card"
                  data-selected={sel}
                  onClick={() => update("ignored", o.t)}
                >
                  <span className="text-lg">{o.e}</span>
                  <span className="leading-snug">{o.t}</span>
                </button>
              );
            })}
          </QuizShell>
        );

      // 4 — Age
      case 4:
        return (
          <QuizShell
            step={4}
            totalSteps={TOTAL}
            onBack={back}
            headline="Para um plano eficaz, precisamos conhecer seu parceiro de 4 patas!"
            subheadline="Cada cão é único e seu plano de obediência também deve ser."
            footer={
              <button className="cta-primary" disabled={!a.age} onClick={next}>
                Continuar
              </button>
            }
          >
            <div className="mb-2 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Idade
            </div>
            <p className="px-1 pb-1 text-[14px] font-bold text-foreground">
              Qual a idade do seu cão?
            </p>
            {ages.map((o) => {
              const sel = a.age === o.label;
              return (
                <button
                  key={o.label}
                  className="answer-card"
                  data-selected={sel}
                  onClick={() => update("age", o.label)}
                >
                  <span className="text-lg">{o.emoji}</span>
                  <span className="flex flex-col leading-tight">
                    <span className="font-bold">{o.label}</span>
                    <span className="text-[14px] font-normal text-muted-foreground">{o.sub}</span>
                  </span>
                </button>
              );
            })}
          </QuizShell>
        );

      // 5 — Nome do cão
      case 5:
        return (
          <QuizShell
            step={5}
            totalSteps={TOTAL}
            onBack={back}
            headline="Qual o nome do seu cão?"
            subheadline="Vamos personalizar o desafio com o nome do seu companheiro."
            footer={
              <button
                className="cta-primary"
                disabled={!a.dogName.trim()}
                onClick={next}
              >
                Continuar
              </button>
            }
          >
            <div className="mb-2 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Nome
            </div>
            <input
              type="text"
              value={a.dogName}
              onChange={(e) => update("dogName", e.target.value)}
              placeholder="Ex: Rex, Luna, Mel..."
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-[15px] outline-none focus:border-primary focus:bg-accent"
              autoFocus
            />
            <p className="px-1 pt-2 text-[12px] text-muted-foreground">
              {a.dogName.trim()
                ? <>O desafio será criado especialmente para <span className="font-bold text-primary">{a.dogName.trim()}</span>!</>
                : "O desafio será personalizado para o seu cão."
              }
            </p>
          </QuizShell>
        );

      // 6 — Raça
      case 6:
        return (
          <QuizShell
            step={6}
            totalSteps={TOTAL}
            onBack={back}
            headline={`Qual a raça do ${dogName}?`}
            subheadline="Esses detalhes ajudam a traçar o perfil ideal para o Protocolo POI."
            footer={
              <button
                className="cta-primary"
                disabled={!a.breed}
                onClick={next}
              >
                Continuar
              </button>
            }
          >
            <div className="mb-2 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Raça
            </div>
            <div className="flex flex-wrap gap-2 pb-2">
              {breeds.map((b) => (
                <button
                  key={b.n}
                  className="answer-chip"
                  data-selected={a.breed === b.n}
                  onClick={() => update("breed", b.n)}
                >
                  <span className="mr-1">{b.e}</span>{b.n}
                </button>
              ))}
            </div>
          </QuizShell>
        );

      // 7 — Obedience level slider
      case 7: {
        return (
          <QuizShell
            step={7}
            totalSteps={TOTAL}
            onBack={back}
            headline={`Qual o nível de obediência do ${dogName} hoje?`}
            subheadline="Não se preocupe — estamos aqui para ajudar a transformá-lo!"
            footer={
              <button
                className="cta-primary"
                disabled={a.level === 0}
                onClick={() =>
                  navigate("/carregando", {
                    state: {
                      dogName: a.dogName,
                      challenges: a.challenges,
                      frequency: a.frequency,
                      ignored: a.ignored,
                      breed: a.breed,
                      age: a.age,
                      level: a.level,
                    },
                  })
                }
              >
                Confirmar
              </button>
            }
          >
            <div className="mb-2 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Nível atual
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              {/* Emojis das extremidades */}
              <div className="mb-3 flex justify-between items-end">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[28px] leading-none">😤</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">Desobediente</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[28px] leading-none">😇</span>
                  <span className="text-[11px] font-semibold text-muted-foreground">Anjo</span>
                </div>
              </div>

              {/* Slider customizado */}
              <div className="relative px-1 py-3">
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={a.level || 1}
                  onChange={(e) => update("level", Number(e.target.value))}
                  className="quiz-range w-full"
                  style={{
                    background: a.level
                      ? `linear-gradient(to right, #6B4FD8 0%, #2B6CF0 ${((a.level - 1) / 4) * 100}%, #E3E6F0 ${((a.level - 1) / 4) * 100}%, #E3E6F0 100%)`
                      : "#E3E6F0",
                  }}
                />
              </div>

              {/* Marcadores numéricos */}
              <div className="flex justify-between px-1 mt-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => update("level", n)}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold transition-all"
                    style={{
                      background: a.level === n
                        ? "linear-gradient(135deg, #6B4FD8 0%, #2B6CF0 100%)"
                        : a.level && a.level > n
                          ? "hsl(var(--accent))"
                          : "hsl(var(--muted))",
                      color: a.level === n
                        ? "#fff"
                        : a.level && a.level > n
                          ? "hsl(var(--primary))"
                          : "hsl(var(--muted-foreground))",
                      transform: a.level === n ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-xl bg-accent/60 px-3 py-2.5">
              <span className="text-base flex-shrink-0">💡</span>
              <p className="text-[12px] leading-relaxed text-foreground/80">
                Independente do nível, o Protocolo POI foi desenvolvido para qualquer cão — do mais agitado ao verdadeiro anjinho.
              </p>
            </div>
          </QuizShell>
        );
      }

      // 8 — Depoimentos
      case 8:
        return (
          <div className="quiz-shell">
            <header className="quiz-header">
              <div className="flex items-center justify-between">
                <button onClick={back} className="flex h-9 w-9 items-center justify-center rounded-full text-foreground" aria-label="Voltar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <img src={logo} alt="DesafioPOI" className="h-5 w-auto" />
                <div className="h-9 w-9" />
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: "87.5%", background: "var(--gradient-primary)" }} />
              </div>
            </header>

            <main className="flex-1 overflow-y-auto px-5 pb-4">
              <div className="flex flex-col gap-3 py-2">

                {/* Headline */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-[15px] font-bold leading-tight text-foreground">+10.000 tutores já transformaram seus cães com o POI!</h1>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">Veja o que estão dizendo sobre o Desafio de Obediência por Instinto.</p>
                </div>

                {/* Contador 2x2 */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { n: "11.343", l: "tutores atendidos" },
                    { n: "92%", l: "viram resultado em até 14 dias" },
                    { n: "21", l: "dias para transformação completa" },
                    { n: "7 min", l: "por dia é tudo que precisa" },
                  ].map((item) => (
                    <div key={item.n} className="rounded-xl border border-border bg-accent p-3 text-center">
                      <p className="text-[17px] font-extrabold leading-tight text-primary">{item.n}</p>
                      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{item.l}</p>
                    </div>
                  ))}
                </div>

                {/* Depoimentos */}
                {[
                  {
                    avatar: avatarJuliana,
                    nome: "Juliana S.",
                    raca: "Golden Retriever",
                    idade: "4 anos",
                    cidade: "Ribeirão Preto (SP)",
                    dias: "8",
                    texto: "O meu cachorro destruía tudo quando ficava sozinho em casa. Depois do dia 8 ele parou completamente.",
                  },
                  {
                    avatar: avatarAna,
                    nome: "Ana C.",
                    raca: "Lhasa Apso",
                    idade: "4 anos",
                    cidade: "Uberlândia (MG)",
                    dias: "11",
                    texto: "A Mel latia por tudo, principalmente quando chegava visita. Era bem cansativo. Depois que comecei a fazer do jeito certo, ela ficou bem mais tranquila. A diferença já é enorme.",
                  },
                  {
                    avatar: avatarBruno,
                    nome: "Bruno F.",
                    raca: "Labrador",
                    idade: "1 ano",
                    cidade: "Belo Horizonte (MG)",
                    dias: "9",
                    texto: "O maior problema era no passeio, ele puxava demais e eu já estava evitando sair. Segui as orientações e melhorou rápido. Hoje consigo passear com mais controle e sem estresse.",
                  },
                ].map((d) => (
                  <div key={d.nome} className="rounded-2xl border border-border bg-card p-3">
                    <div className="mb-2 flex items-center gap-2.5">
                      <img src={d.avatar} alt={d.nome} className="h-9 w-9 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <p className="text-[13px] font-bold leading-tight text-foreground">
                          {d.nome} — <span className="italic">{d.raca}</span>, {d.idade}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{d.cidade} · resultado em {d.dias} dias</p>
                      </div>
                    </div>
                    <div className="mb-1.5 flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#e8a400"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                      ))}
                    </div>
                    <p className="text-[13px] italic leading-relaxed text-foreground/80">"{d.texto}"</p>
                  </div>
                ))}

                {/* Dr. Ricardo Silva — destaque azul */}
                <div className="rounded-2xl p-4" style={{ background: "var(--gradient-primary)" }}>
                  <p className="text-[13px] italic leading-relaxed text-white/90 mb-2">
                    "O POI é a abordagem mais inovadora que vi no adestramento canino. Respeita a natureza do cão e empodera o tutor."
                  </p>
                  <p className="text-[13px] font-bold text-white">— Dr. Ricardo Silva <span className="font-normal text-white/65">(Etologista)</span></p>
                </div>

                {/* Screenshot WhatsApp */}
                <div className="overflow-hidden rounded-2xl border border-border">
                  <img src={whatsappReviews} alt="Avaliações reais no WhatsApp" className="w-full h-auto object-contain" loading="lazy" />
                </div>

                {/* Contagem discreta */}
                <p className="text-center text-[11px] text-muted-foreground">Mais de 3.524 avaliações</p>

              </div>
            </main>

            <footer className="quiz-footer">
              <button className="cta-primary" onClick={next}>
                Receber Meu Desafio Personalizado
              </button>
            </footer>
          </div>
        );

      // 9 — Email
      case 9:
        return (
          <QuizShell
            step={9}
            totalSteps={TOTAL}
            onBack={back}
            headline={`Receba o plano completo de ${dogName} no seu e-mail!`}
            subheadline={`Digite seu melhor e-mail para ter acesso imediato ao plano personalizado e descobrir como o POI pode mudar sua vida com ${dogName}.`}
            footer={
              <div className="space-y-2">
                <button
                  className="cta-primary"
                  disabled={!/\S+@\S+\.\S+/.test(a.email)}
                  onClick={() =>
                    navigate("/presente", {
                      state: {
                        dogName: a.dogName,
                        challenges: a.challenges,
                        frequency: a.frequency,
                        ignored: a.ignored,
                        breed: a.breed,
                        age: a.age,
                        level: a.level,
                        email: a.email,
                      },
                    })
                  }
                >
                  Receber Meu Plano Agora!
                </button>
                <p className="text-center text-[14px] text-muted-foreground">
                  🔒 Seus dados estão seguros. Sem spam, prometemos!
                </p>
              </div>
            }
          >
            <div className="mb-2 inline-block self-start rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              Plano personalizado
            </div>
            <input
              type="email"
              value={a.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-[14px] outline-none focus:border-primary focus:bg-accent"
            />
          </QuizShell>
        );

      default:
        return null;
    }
  }, [step, a, dogName]);

  return content;
};

const Row = ({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-2 last:border-0 last:pb-0">
    <span className="text-muted-foreground">{k}</span>
    <span className={`font-bold text-right ${highlight ? "italic text-primary" : "text-foreground"}`}>
      {v}
    </span>
  </div>
);

export default Index;
