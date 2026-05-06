## Causa

O build publicado está sem as variáveis `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` em runtime. O arquivo auto-gerado `src/integrations/supabase/client.ts` não tem fallback — chama `createClient(undefined, undefined)` e quebra a aplicação inteira na inicialização.

Você já tem um wrapper seguro em `src/lib/supabase.ts` com URL/anon key hardcoded como fallback. O problema é que `src/lib/diagnosticsRepo.ts` (criado na implementação anterior) importa do client auto-gerado em vez do wrapper.

## Plano (1 mudança)

### `src/lib/diagnosticsRepo.ts`
- Trocar `import { supabase } from "@/integrations/supabase/client";` por `import { supabase } from "@/lib/supabase";`.

Isso resolve o crash imediato porque o wrapper sempre tem credenciais válidas (fallback hardcoded para o projeto Cloud), independente das env vars do build.

## Bônus (mesma sessão, opcional)

Posso aproveitar e aplicar também as melhorias do plano anterior que ainda não foram feitas:
- **Safety timeout no `AuthContext`** para evitar loading infinito caso `getSession()` não resolva.
- **Navegar para `/resultados?id=...`** após save bem-sucedido, para que F5 recupere do banco.
- **Logs em `saveDiagnostic`** para diagnosticar por que a tabela `diagnostics` está vazia hoje.

Diz se quer só o fix do crash ou o pacote completo.