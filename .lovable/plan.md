

## Objetivo

1. Renomear plataforma: "Diagnóstico 360°" → **"Grau de Maturidade"** em toda a UI (logo, títulos, headers, footer, `document.title`).
2. Corrigir incongruências internas na plataforma autenticada (Index, Results, Questionnaire, PresentationMode) para refletir os números reais: **6 áreas, 54 perguntas, 270 riscos, 5 graus**.
3. Reescrever a copy da Landing Page para vender **exatamente** o que a plataforma entrega — sem mexer no visual (paleta, motion, glassmorphism, estrutura de sections permanecem idênticos).

## Mudança 1 — Renomear para "Grau de Maturidade"

Substituir em todos os componentes onde aparece "Diagnóstico 360°" / "Diagnóstico 360":

- `LandingPage.tsx` (`document.title`, `<h1 sr-only>`)
- `LPNavbar.tsx` (wordmark "Diagnóstico 360")
- `Index.tsx` (header, hero h1, eyebrow)
- `Results.tsx` (header, hero subtítulo)
- `Questionnaire.tsx` (header, se houver)
- `PresentationMode.tsx` (slides de capa)
- `LoginPage.tsx` (se houver título)

Novo wordmark: **"Grau de"** (branco) + **"Maturidade"** (gradient verde).
Manter o badge "O2" e a tagline "CFOs as a Service".

## Mudança 2 — Corrigir plataforma

### `src/pages/Index.tsx`
- Hero subtítulo: já diz "6 áreas / 54 perguntas" → manter ✅
- `features[]` array: corrigir
  - "5 Áreas Estratégicas" → **"6 Áreas Estratégicas"** + lista: Contabilidade, Controladoria, Financeiro, Fiscal, Planejamento, Comercial
  - "48 Perguntas Especializadas" → **"54 Perguntas Especializadas"**
  - "240 análises de risco" → **"270 análises de risco pré-configuradas"**

### `src/pages/Results.tsx`
- Hero subtítulo já usa `result.totalQuestions` dinâmico ✅
- Verificar se "360°" aparece em algum subtítulo → trocar por "Grau de Maturidade"

### `src/pages/Questionnaire.tsx` e `PresentationMode.tsx`
- Usar valores derivados de `areas`, `questions` (já dinâmicos). Apenas trocar o nome da plataforma.

## Mudança 3 — Adaptar Landing Page (copy only, zero visual)

### `LPHero.tsx`
- Eyebrow: "Diagnóstico 360° · O2 Inc" → **"Grau de Maturidade · O2 Inc"**
- Headline: manter conceito, ajustar para alinhar com diagnóstico financeiro/contábil
  - "Descubra o **grau de maturidade** financeira da sua empresa."
- Subhead: "10 áreas críticas" → **"6 áreas estratégicas (Contabilidade, Controladoria, Financeiro, Fiscal, Planejamento e Comercial)"**
- Stats: substituir números fictícios (2.000 empresas / 88 NPS / 2 Bi) por números reais e verificáveis do produto:
  - **54** perguntas especializadas
  - **6** áreas estratégicas
  - **270** análises de risco
- Manter motion (count-up funciona com qualquer número).

### `LPSocialProof.tsx`
- Marquee de 12 segmentos genéricos → manter ou enxugar. **Trocar headline** "Empresas de todos os segmentos confiam no diagnóstico" para algo mais honesto: **"Aplicável a empresas de qualquer porte e segmento"**. Manter visual marquee.

### `LPHowItWorks.tsx`
- Steps já estão genéricos e corretos. Pequeno ajuste no step 1: "10 áreas" → **"6 áreas"**.

### `LPAreas.tsx` ⚠️ **maior reescrita**
- Atualmente lista 10 áreas inventadas (Societário, Tecnologia, Marketing, RH, etc.) que **não existem** na engine.
- Substituir pelas **6 áreas reais** com pesos reais:
  - Contabilidade (15%) — `BookOpen`
  - Controladoria (25%) — `PieChart`
  - Financeiro (25%) — `DollarSign`
  - Fiscal (15%) — `Receipt`
  - Planejamento (10%) — `Target`
  - Comercial (10%) — `ShoppingCart`
- Atualizar eyebrow: "10 áreas avaliadas" → **"6 áreas avaliadas"**
- Mostrar peso de cada área no card (badge sutil com %).
- Grid muda de `lg:grid-cols-5` para `lg:grid-cols-3 md:grid-cols-2` (6 itens). Mantém TiltCard, hover neon, animação stagger.

### `LPResults.tsx`
- Mockup dashboard: trocar áreas fictícias (Tecnologia, Marketing) pelas 6 reais.
- Lista de deliverables: "10 áreas" → **"6 áreas"**, manter o resto (PDF, PPTX, modo apresentação, quick wins, mapa de risco) — já bate com o que a plataforma entrega.

### `LPTestimonials.tsx`
- Depoimentos fictícios. **Manter visual** mas trocar copy para depoimentos genéricos/anonimizados ou substituir por **3 cards de "Para quem é"** (CFO, Controller, Founder) com visual idêntico (avatar com iniciais, stars, quote em itálico). Pergunta: o usuário pediu para não mexer no visual — manter os 3 cards no mesmo layout, só ajustar texto para mensagens neutras tipo "Material direto e acionável" / "Estrutura clara para reunião de board" / "Identifica gargalos rapidamente", sem nomes inventados (usar funções: "CFO · Indústria", "Controller · Varejo", "Founder · SaaS").

### `LPPricing.tsx`
- Lista de benefícios: "10 áreas" → **"6 áreas"**.
- Demais itens (PDF, PPTX, modo apresentação, mapa de risco, quick wins) batem ✅.
- "Garantia incondicional 7 dias" → manter se for política real; se não, trocar por **"Acesso completo após cadastro"**. Vou trocar por neutra para evitar promessa não suportada.

### `LPFAQ.tsx`
- "30 a 45 minutos" → ajustar para tempo real (54 perguntas ≈ 25-35 min). Manter resto.

### `LPFooter.tsx`
- Headline final: "raio-X da sua empresa" → manter (alinhado).
- Wordmark: aplicar mudança 1.

## Fora de escopo (preservado intacto)

- Paleta `#0A0A0A` / `#00E676` / `#7EBF8E` — **inalterada**
- Glassmorphism, bordas, transparências — **inalteradas**
- Motion (particles, tilt, count-up, scroll-reveal, marquee, glow-pulse) — **inalterada**
- Estrutura de sections da LP — **inalterada**
- Componentes de motion (`useMouseGlow`, `FloatingParticles`, `TiltCard`) — **inalterados**
- PDF/PPTX generators — **inalterados**

## Ordem de execução

1. Renomear "Diagnóstico 360°" → "Grau de Maturidade" em todos os arquivos (busca global).
2. Corrigir `Index.tsx features[]` (5→6, 48→54, 240→270).
3. Reescrever `LPAreas.tsx` (10 → 6 áreas reais).
4. Atualizar `LPHero.tsx` stats e copy.
5. Atualizar `LPResults.tsx`, `LPPricing.tsx`, `LPHowItWorks.tsx`, `LPSocialProof.tsx`, `LPTestimonials.tsx`, `LPFAQ.tsx`, `LPFooter.tsx`.
6. Validar visualmente que nada visual mudou — só copy/números.

