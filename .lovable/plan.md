## Habilitar "Esqueci minha senha" funcional

### Fluxo
1. Login: novo link "Esqueci minha senha" abre o modo `forgot` no mesmo card. Usuário digita e-mail → `supabase.auth.resetPasswordForEmail(email, { redirectTo: ${origin}/reset-password })` → mostra mensagem de sucesso.
2. Usuário recebe e-mail (template padrão Lovable Auth — já funcional, sem custom domain) e clica no link.
3. Link aterrissa em `/reset-password` com token no hash. O Supabase processa o hash e dispara `PASSWORD_RECOVERY` em `onAuthStateChange`.
4. Página exibe formulário "nova senha + confirmar". Submete com `supabase.auth.updateUser({ password })`. Em sucesso, redireciona para `/app`.

### Mudanças

**1. `src/pages/LoginPage.tsx`** — adicionar modo `forgot`:
- Tipo `Mode = 'login' | 'signup' | 'forgot'`
- Estado `info` para mensagem de sucesso (verde)
- `handleSubmit`: branch `forgot` chama `resetPasswordForEmail` com `redirectTo: ${origin}/reset-password`; em sucesso, exibe `info` "Enviamos um link de recuperação..."
- No modo `forgot`: esconder campo senha/nome, esconder botão Google e divisor, mudar label do submit para "Enviar link de recuperação"
- Abaixo do campo senha (modo `login`), link discreto "Esqueci minha senha" → `setMode('forgot')`
- No header do modo `forgot`, link "← Voltar" para `setMode('login')`

**2. `src/pages/ResetPasswordPage.tsx`** (novo):
- Página pública (sem `ProtectedRoute`)
- `useEffect`: `supabase.auth.onAuthStateChange` escuta `PASSWORD_RECOVERY`/`SIGNED_IN` → marca `hasRecoverySession=true`. Também checa `getSession()` no mount.
- Form com nova senha + confirmação (≥6 chars, devem coincidir)
- Submit: `supabase.auth.updateUser({ password })` → mostra sucesso → redireciona `/app` em 1.5s
- Aviso amarelo se aberto sem sessão de recovery
- Visual coerente com LoginPage (lp-bg, GlassCard, logo O2)

**3. `src/App.tsx`** — registrar rota pública:
```tsx
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";
<Route path="/reset-password" element={<ResetPasswordPage />} />
```

### Observações técnicas
- Usa templates de e-mail padrão do Lovable Auth — não precisa configurar custom domain nem scaffold de auth-email-hook. Funcional out-of-the-box.
- Não toca em `AuthContext` — `onAuthStateChange` global já vai logar o usuário ao processar o token de recovery, mas a `ResetPasswordPage` sobrescreve o `Navigate` porque é rota pública e o user permanece nela até atualizar a senha.
- `redirectTo` aponta para `window.location.origin` (funciona tanto em preview quanto em produção `graudematuridade.lovable.app`).