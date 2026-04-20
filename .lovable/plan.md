
## Objetivo

Adicionar checkout Stripe na Landing Page com CTA "Obter o Grau de Maturidade" (sem valor exibido). Após pagamento bem-sucedido, redirecionar para `/login` para o cliente acessar a plataforma.

## Etapas

### 1. Habilitar Lovable Cloud + Stripe Payments built-in
- Ativar Lovable Cloud (necessário para edge functions)
- Habilitar `enable_stripe_payments` (sem necessidade de API key — Lovable gerencia)
- Configurar 1 produto: **"Grau de Maturidade — Diagnóstico Completo"** (preço definido pelo usuário no painel Stripe depois; por ora preço placeholder editável)

### 2. Edge Function `create-checkout`
- `supabase/functions/create-checkout/index.ts`
- Cria Stripe Checkout Session em modo `payment` (one-time)
- `success_url`: `{origin}/login?paid=true`
- `cancel_url`: `{origin}/landing`
- Retorna `{ url }` para redirect client-side
- CORS habilitado para chamada do browser

### 3. Hook client `useCheckout`
- `src/hooks/useCheckout.ts`
- Chama a edge function via `supabase.functions.invoke('create-checkout')`
- Estado de loading, abre `data.url` em `window.location.href`
- Toast de erro em caso de falha

### 4. Atualizar CTAs da LP (sem mudança visual)
Trocar `navigate("/login")` por `startCheckout()` nos botões de **compra**:
- `LPHero.tsx` — botão "Fazer o Diagnóstico →" → **"Obter Grau de Maturidade →"**
- `LPPricing.tsx` — botão "Começar agora →" → **"Obter Grau de Maturidade →"**
- `LPFooter.tsx` — botão "Avaliar minha empresa →" → **"Obter Grau de Maturidade →"**
- `LPNavbar.tsx`:
  - "Começar" (CTA primário) → **"Obter Grau de Maturidade"** → checkout
  - "Já comprei" (outline) → mantém `navigate("/login")` ✅

Botões secundários (`"Ver como funciona ↓"`, scroll interno) permanecem inalterados.

Estilo, gradientes, glow-pulse, rounded-2xl — **100% preservados**, apenas o `onClick` e o label mudam.

### 5. LPPricing — remover preço
- Já está sem valor numérico ✅
- Trocar selo "Plano Único" por **"Acesso Completo"**
- Texto rodapé "Acesso completo após cadastro" → **"Acesso liberado após o pagamento"**

## Fora de escopo
- Webhook de confirmação de pagamento (Lovable's built-in já trata)
- Tabela de pedidos / histórico (pode vir depois se necessário)
- Mudanças visuais (paleta, motion, layout — intactos)

## Pergunta ao usuário durante execução
Após habilitar Stripe Payments, perguntarei o **valor do produto** (em BRL) para configurar no Stripe — já que o CTA não mostra preço, mas o checkout precisa de um valor real cobrado.
