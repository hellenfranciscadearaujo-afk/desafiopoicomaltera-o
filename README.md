# DesafioPOI — Quiz / Funil

Funil de quiz comportamental canino com Meta Pixel + CAPI híbrido.

## Stack

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** + shadcn/ui (Radix)
- **TanStack Query** (lazy)
- **Vercel Serverless Functions** para a CAPI da Meta

---

## Setup local

```bash
npm install
npm run dev      # http://localhost:8080
npm run build    # build de produção
npm run lint     # ESLint
```

---

## Configuração de produção (Vercel)

### 1. Variáveis de ambiente — OBRIGATÓRIO

Vá em **Project Settings → Environment Variables** e adicione:

| Nome | Valor | Obrigatório |
|------|-------|-------------|
| `META_ACCESS_TOKEN` | Token gerado no Business Manager → Pixel → Configurações → Conversions API | ✅ Sim |
| `META_PIXEL_ID` | ID do Pixel (cai no padrão `1647727386472022` se omitido) | Não |
| `META_TEST_EVENT_CODE` | Apenas para testar com "Eventos de Teste". Remova em produção. | Não |

> ⚠️ **IMPORTANTE:** o token de acesso anterior estava hardcodado no código. Se este projeto já estava em produção, **revogue o token antigo no Meta Business Manager imediatamente** e gere um novo, configurando-o como variável de ambiente.

Após configurar, faça **Redeploy** do projeto para aplicar.

### 2. Domínio do checkout

O CTA da página de oferta aponta para:

```
https://pagar.desafiopoi21dais.shop/checkout/v4/EpF3xss3IQLLcBfcFcD3
```

⚠️ Verifique se este domínio está correto (note: `21dais`, não `21dias`). Se for typo, edite em `src/pages/Offer.tsx` (procure por `21dais`).

---

## Estrutura do funil

```
Home (splash) → Quiz (steps 1-7) → Loading → Diagnosis
                                                 ↓
                              Quiz step 8 (depoimentos) → Quiz step 9 (email)
                                                 ↓
                                              Gift → Offer
```

Toda a navegação é feita via state em `App.tsx` (não há roteador real).

---

## Eventos de tracking disparados

| Evento | Quando dispara |
|--------|----------------|
| `PageView` | Entrada no site |
| `QuizStart` (custom) | Clique no 1º CTA da Home |
| `QuizProgress` (custom) | Chegou no Diagnóstico (após Loading) |
| `Lead` | Concluiu o quiz e chegou na Oferta |

Cada evento dispara em **paralelo no Pixel (browser) e na CAPI (servidor)** com o mesmo `event_id` para deduplicação automática pela Meta.

---

## Mudanças desta versão (correções aplicadas)

- 🔒 **Token CAPI** movido para variável de ambiente (`META_ACCESS_TOKEN`)
- 🔧 **Tela branca corrigida**: o splash inline agora é removido apenas após o React montar, com fallback de erro se demorar mais de 12s
- ♿ Removido `maximum-scale=1` do viewport (acessibilidade — permite zoom)
- ✏️ Corrigido espaçamento do título (`DesafioPOI — Diagnóstico`)
- 🧹 Removido `react-router-dom` (não era usado)
- 🧹 Removidos arquivos órfãos: `NavLink.tsx`, `NotFound.tsx`, `quiz-1-sad.webp`
- 🧹 Removidos imports e componentes não usados em `Index.tsx` e `Offer.tsx`
- 🐛 Corrigidos 4 erros de ESLint que bloqueavam o lint
- 🎨 Sintaxe `hsl(...,a)` substituída por `hsla(...)` válido em `Loading.tsx`
