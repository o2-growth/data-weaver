## Objetivo

1. Tornar a Landing Page (`/landing`) a página inicial pública do site (rota `/`).
2. Adicionar botão admin de **preenchimento automático** no questionário (com respostas fictícias) para gerar resultado e validar PPT/PDF.
3. Aplicar a **identidade visual atual** (dark premium + neon green #00E676, Space Grotesk/Inter, glassmorphism) aos exports PDF e PPTX.

---

## Etapa 1 — Landing como página inicial

**Reorganizar rotas em `src/App.tsx`:**

- `/` → `LandingPage` (pública, sem `ProtectedRoute`)
- `/app` → `Index` (tela atual de "Iniciar Diagnóstico", protegida)
- `/landing` → redirect para `/` (compatibilidade)
- `/login`, `/questionario`, `/resultados`, `/apresentacao` → mantidos

**Ajustar links internos:**

- `LPNavbar` "Já comprei" continua indo para `/login`
- Pós-login: `LoginPage` redireciona para `/app` (em vez de `/`)
- Pós-pagamento: redirect já vai para `/login?paid=true`, depois `/app`

Resultado: ao publicar e abrir `diagnostico360se.lovable.app`, o visitante cai direto na landing.

---

## Etapa 2 — Botão admin de preenchimento automático

Já existe memória `mem://features/admin-tools` sobre auto-fill via URL — vou consolidar em um **botão visível** no questionário, restrito a admin.

**Mecanismo de "admin":**

- Considerar admin o usuário cujo email termina em `@o2inc.com.br` (lê de `useAuth().user.email`).
- Sem nova tabela de roles agora (mantém simples; podemos migrar para `user_roles` depois se necessário).

**UI:**

- Em `src/pages/Questionnaire.tsx`, no header (ao lado do progresso), renderizar botão **"⚡ Preencher automaticamente"** apenas se `isAdmin`.
- Ao clicar: percorre todas as perguntas e atribui um grade aleatório ponderado (distribuição realista: 20% grade 2, 35% grade 3, 30% grade 4, 15% grade 5) via `answerQuestion` do `useDiagnostic`.
- Toast "Respostas fictícias aplicadas" + scroll para o final / botão "Ver resultados".

---

## Etapa 3 — Identidade visual nos exports

### PDF (`src/lib/pdf/DiagnosticReport.tsx` + `generatePdf.ts`)

Aplicar paleta dark premium:

- Fundo das páginas: `#0A0A0A` (capa e divisores) e `#FFFFFF` (páginas de conteúdo, para legibilidade impressa)
- Acento neon: `#00E676` em títulos, barras, ícones
- Verde sage `#7EBF8E` em subtítulos
- Tipografia: registrar **Space Grotesk** (headings) e **Inter** (body) via `Font.register` do `@react-pdf/renderer`
- Capa com gradiente sutil + logo "O2" em círculo verde, título "Grau de Maturidade" com palavra destacada em neon
- Footer com linha verde fina + "O2 Inc — CFOs as a Service"
- Cards de área com borda esquerda neon + score grande
- Tabela de riscos com header preto + acento verde

### PPTX (`src/lib/pptx/generatePptx.ts`)

Seguir guia executiva (mantém legibilidade McKinsey/BCG) **com a identidade O2**:

- Master slide com fundo `#0A0A0A`, accent `#00E676`
- Slides de capa e divisor: dark com título grande Space Grotesk + selo O2
- Slides de conteúdo: fundo claro `#F5F5F5` para charts/tabelas legíveis, accent verde nos headers e barras
- Footer: "O2 Inc · Grau de Maturidade · {empresa}" em verde
- Charts (radar, barras): cor primária `#00E676`, secundária `#7EBF8E`, fundo transparente

---

## Detalhes técnicos

**Arquivos a editar:**

- `src/App.tsx` — reorganizar rotas
- `src/pages/LoginPage.tsx` — pós-login redirect para `/app`
- `src/pages/Index.tsx` — sem mudança de conteúdo (só muda de rota)
- `src/pages/Questionnaire.tsx` — botão auto-fill admin
- `src/contexts/AuthContext.tsx` — expor helper `isAdmin` (email-based)
- `src/lib/pdf/DiagnosticReport.tsx` + `src/lib/pdf/generatePdf.ts` — rebrand visual
- `src/lib/pptx/generatePptx.ts` — rebrand visual

**Fora de escopo agora:**

- Tabela `user_roles` formal (admin por sufixo de email é suficiente para esta fase)
- Webhook Stripe / tabela orders
- Mudanças na estrutura do questionário ou cálculo

---

## Pergunta antes de executar

Apenas uma confirmação rápida sobre o critério de admin: quer que eu use **email terminado em `@o2inc.com.br**` como regra de admin (mais simples, funciona já), ou prefere **criar uma tabela de roles** agora (mais robusto, mas adiciona complexidade)? (respondendo aqui, deixe apenas este como owner e admin andrey.lopes@o2inc.com.br)