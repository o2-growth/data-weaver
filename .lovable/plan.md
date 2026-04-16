
## Objetivo

Replicar o design system premium da Landing Page (dark absoluto + verde neon + glassmorphism + motion) em toda a plataforma autenticada: Login, Index (iniciar diagnóstico), Questionnaire, Results e PresentationMode.

## Princípios visuais a propagar

- **Background**: `#0A0A0A` absoluto (alternando com `#0D0D0D` em sections)
- **Cards**: `bg-white/[0.02]` + `border border-white/6` + `backdrop-blur` + hover `border-[#7EBF8E]/30`
- **CTAs primários**: gradiente `from-[#4CAF50] to-[#00E676]`, texto preto, `rounded-2xl`, `shadow-xl shadow-[#4CAF50]/30`, `animate-glow-pulse`
- **CTAs secundários**: outline `border-white/12` + hover `border-white/25 bg-white/4`
- **Eyebrows**: badge pill `border-[#7EBF8E]/30 bg-[#7EBF8E]/8` + texto uppercase `tracking-widest text-[#7EBF8E]`
- **Headlines**: `font-black tracking-tight` com gradient text `from-[#7EBF8E] to-[#00E676]` no destaque
- **Tipografia**: Space Grotesk (display) + Inter (body) — já carregadas
- **Motion**: scroll-reveal, count-up, mouse-glow sutil em hero areas, transições 300ms

## Páginas a refatorar

### 1. `src/pages/LoginPage.tsx`
- Fundo `#0A0A0A` com partículas sutis (densidade reduzida)
- Card central glassmorphism centralizado
- Logo "O2" gradient verde no topo
- Botão login com gradient + glow

### 2. `src/pages/Index.tsx` (dashboard pré-diagnóstico)
- Reescrever no estilo dark premium
- Hero compacto com eyebrow + headline gradient
- Card "Iniciar Diagnóstico" como glass-card
- Features grid: cards translucentes com ícones em containers `bg-[#4CAF50]/10`
- "Como funciona" com cards numerados (igual LPHowItWorks)
- Footer dark consistente

### 3. `src/pages/Questionnaire.tsx`
- Background `#0A0A0A` + sticky header glassmorphism (`bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/8`)
- Progress bar verde neon
- QuestionCard reformulado: glass-card, opções como pills outline com hover verde
- Botões nav (anterior/próximo) no estilo LP

### 4. `src/components/QuestionCard.tsx`
- Container glass + bordas brancas sutis
- Botões de grau (1-5): outline base, ativo com `border-[#00E676] bg-[#00E676]/10 text-white`
- Número grande + descrição embaixo

### 5. `src/pages/Results.tsx`
- Background `#0A0A0A`
- Hero com score grande + count-up
- Cards de área (10) usando TiltCard reaproveitado
- RadarChart com cores neon adaptadas
- Quick wins, riscos: glass-cards
- Botões PDF/PPTX com gradient

### 6. `src/pages/PresentationMode.tsx`
- Slides em `#0A0A0A` puro
- Tipografia Space Grotesk gigante
- Eyebrows e headlines gradient
- Controles de navegação outline brancos sutis

## Componentes auxiliares

- **`src/components/ui/glass-card.tsx`** (novo): wrapper reutilizável com classes glassmorphism
- **`src/components/ui/neon-button.tsx`** (novo): variantes `primary` (gradient + glow) e `outline` (white/12)
- **`MaturityBadge`, `QuickWinCard`, `RiskCard`, `RadarChart`**: ajustar paleta para neon + glass

## Ajustes globais

- **`src/index.css`**: adicionar utilitários `.glass-card`, `.btn-neon-primary`, `.btn-neon-outline`, `.eyebrow-pill`, `.gradient-text-neon` — assim a refatoração das páginas vira aplicação de classes, não duplicação de Tailwind
- **`src/App.tsx`**: garantir que `body` herda `bg-[#0A0A0A]` em todas as rotas autenticadas

## Fora de escopo

- Não mexer em PDF/PPTX (geradores precisam de paleta clara para impressão/projeção corporativa)
- Não trocar a estrutura de rotas
- Não criar tema light alternativo (dark-only, conforme decisão anterior)

## Ordem de execução

1. Criar utilitários CSS reutilizáveis em `index.css`
2. Criar `GlassCard` e `NeonButton` (opcional, se ajudar consistência)
3. Refatorar Login → Index → Questionnaire (+ QuestionCard) → Results (+ cards filhos) → PresentationMode
4. Validar visual end-to-end
