# Plano — Aplicar Design System O2 Inc. v1.0 à plataforma

Hoje a plataforma usa um tema dark "neon-mint" genérico (verde `#00E676`, fontes Space Grotesk + Inter). Vamos substituir pela identidade oficial **O2 Inc.**: editorial técnico, Tusker Grotesk em caixa-alta, Montserrat para body, JetBrains Mono para eyebrows, e a paleta Lima sobre cinzas profundos.

## 1. Assets (logos e fontes)

- Copiar logos enviadas para o projeto:
  - `src/assets/o2-logo-white.png` (Logo O2 - White.png) — uso padrão (dark mode)
  - `src/assets/o2-logo-black.png` — light mode/PDF
  - `public/o2-icon.png` (Icon.png) — favicon e símbolo da marca
- Atualizar `index.html`: novo favicon, título, e `<link>` Google Fonts (Montserrat + JetBrains Mono + Anton + Barlow Condensed como fallback de display).
- Tusker Grotesk é fonte paga e o link é Google Drive (não automatizável). Vou:
  - Declarar `@font-face` apontando para `/fonts/tusker-grotesk/*.woff2` (3 pesos: 600, 700, 900).
  - Usar `Anton` + `Barlow Condensed` como fallback automático até o usuário subir os `.woff2` na pasta `public/fonts/tusker-grotesk/`.
  - Avisar no chat com instrução clara de como subir os 3 arquivos.

## 2. Tokens de design (`src/index.css` + `tailwind.config.ts`)

Substituir totalmente a paleta atual pela oficial O2:

```text
Dark (padrão):
  --bg #3A3A3A   --bg-elev #2E2E2E   --bg-elev-2 #252525
  --surface #4A4A4A
  --fg #FAFAFA   --fg-muted #C4C4C4   --fg-subtle #9A9A9A
  --border rgba(255,255,255,.10)   --border-strong rgba(255,255,255,.20)
  --accent #63F161 (Lima 400)   --accent-ink #0A0A0A
  --accent-soft rgba(99,241,97,.14)

Light:
  --bg #FBFBFA   --accent #00D842 (Lima 500)   --accent-ink #FFF   --fg #111

Forma: --radius 12 / --radius-lg 20 / --radius-pill 999
Easing: cubic-bezier(0.2,0.8,0.2,1)
Container: 1320 / wide 1480, padding 20→48
Seções: 48→80px verticais
```

Mapear para shadcn (`--background`, `--foreground`, `--primary`, etc.) para que todos os componentes UI existentes herdem automaticamente o novo tema. Adicionar tokens custom (`--lima-400`, `--ink-900`, etc.) preservando compat retroativa.

Atualizar `tailwind.config.ts`:
- `fontFamily.display = ['Tusker Grotesk', 'Anton', 'Barlow Condensed', ...]`
- `fontFamily.sans = ['Montserrat', ...]`
- `fontFamily.mono = ['JetBrains Mono', ...]`
- Tokens `lima`, `ink`, `accent-soft`.

## 3. Componentes utilitários (`src/index.css`)

Adicionar classes da spec O2 mantendo as `lp-*` antigas como aliases:
- `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-sm` (pill)
- `.icon-btn`, `.chip`, `.eyebrow` (mono 11px, tracking 0.14em uppercase, com risco de 18×1px)
- `.card` (radius-lg, padding 28px, hover border-strong)
- `.explore-card` (hover vira Lima 500, scale 0.97, ícone-fantasma)
- `.site-header` (sticky, blur 12px, nav pills com hover Lima)
- `.site-footer` (grid 1.5fr 1fr, meta mono uppercase)
- `.page-head` (h1 clamp 64→180px)
- `@keyframes breathe` para o símbolo da marca

Regra global: `h1,h2,h3,h4 { font-family: var(--font-display); text-transform: uppercase; letter-spacing: .005em; font-weight: 400 }`.

## 4. Landing page (refatorar com voz O2)

A landing atual tem um Hero "neon-mint" + áreas + how-it-works + results + testimonials + FAQ + footer. Vou redesenhar **mantendo as seções**, mas com a linguagem editorial O2:

- **`LPNavbar`**: nova logo branca à esquerda + separador + brand name "GRAU DE MATURIDADE" em mono. Nav pills com hover Lima. CTA único `btn-primary` "FAZER DIAGNÓSTICO".
- **`LPHero`**:
  - Eyebrow mono `— DIAGNÓSTICO O2 INC.`
  - H1 display gigante uppercase: **"DESCUBRA O GRAU DE MATURIDADE FINANCEIRA DA SUA EMPRESA"**
  - Lede em Montserrat: explicação curta sobre o método (5 áreas, 30 min, relatório executivo).
  - CTA `btn-primary`: "COMEÇAR DIAGNÓSTICO" → `/login`
  - Símbolo O2 (ícone) com animação `breathe` ao lado.
  - Remover qualquer menção a preço, compra, "já comprei".
- **`LPAreas` / `LPHowItWorks` / `LPResults`**: converter cards em `.card` ou `.explore-card`, eyebrows mono, headlines display uppercase.
- **`LPSocialProof` / `LPTestimonials` / `LPFAQ`**: manter estrutura, aplicar tokens novos.
- **`LPFooter`**: layout O2 com botões "VOLTAR AO TOPO" + "VOLTAR PARA O2INC.COM", meta mono.

Comunicação ajustada: zero menção a "comprar", "preço", "checkout". Mensagem é "clique e descubra o grau de maturidade".

## 5. Login (`src/pages/LoginPage.tsx`)

Já está sem trava de verificação. Vou apenas:
- Aplicar tokens O2 (background `--bg`, card `--bg-elev`, inputs `lp-input` → `.lp-input` reestilizado, botão Google + email/senha como `.btn-primary` / `.btn-ghost`).
- Logo O2 branca no topo.
- H1 display uppercase "ENTRAR".

## 6. Páginas internas (Index, Questionnaire, Results, Presentation)

Como tudo usa tokens shadcn (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-primary`...), a troca de tokens em `index.css` propaga automaticamente. Não vou refatorar o markup dessas páginas — apenas validar visualmente que ficaram coerentes (cor de progresso, badges de maturidade, gauge etc. continuam usando `--maturity-*` que mantenho).

Ajustes pontuais:
- Headers das páginas internas ganham logo O2.
- Headings usam `font-display` uppercase via classe utilitária.

## 7. Memória

Atualizar `mem://style/branding` com a nova spec O2 (paleta Lima, Tusker Grotesk, easing único, regra dark-padrão). Atualizar `mem://index.md` Core: trocar "neon green #00E676" por "Lima #63F161 dark / #00D842 light, Tusker Grotesk display uppercase, Montserrat body, JetBrains Mono eyebrows".

## 8. Detalhes técnicos

- Não tocar em `src/integrations/supabase/*`, `.env`, `supabase/config.toml`.
- Não reintroduzir Stripe.
- Manter `@/lib/supabase` (com fallback) como cliente.
- Validar build/typecheck após mudanças.
- Após implementação, instruir usuário a:
  1. Baixar Tusker Grotesk em https://drive.google.com/drive/folders/17lPQpGGy9ul1R6fnOGKa3K3yM3AuOpIm
  2. Subir os 3 `.woff2` em `public/fonts/tusker-grotesk/`
  3. Clicar em **Publish → Update**

## Arquivos afetados

- `index.html` (favicon, fonts, title)
- `src/index.css` (rewrite paleta + utilitários O2, mantém animações existentes)
- `tailwind.config.ts` (fontFamily + tokens lima/ink)
- `src/assets/o2-logo-*.png`, `public/o2-icon.png`, `public/fonts/tusker-grotesk/.gitkeep`
- `src/components/landing/LP*.tsx` (Navbar, Hero, Areas, HowItWorks, Results, SocialProof, Testimonials, FAQ, Footer)
- `src/pages/LoginPage.tsx`
- Headers de `Index.tsx` / `Questionnaire.tsx` / `Results.tsx` (apenas logo + tipografia display)
- `mem://style/branding`, `mem://index.md`