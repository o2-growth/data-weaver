## O que será feito

1. **Banco** — nova tabela `public.diagnostics` com RLS (cada usuário vê só os seus).
2. **Salvar no banco** ao concluir o questionário, com fallback para localStorage se falhar.
3. **Página Histórico** (`/historico`) listando diagnósticos do usuário.
4. **Resultados** carrega por `?id=` quando vindo do histórico.
5. **Fix loading infinito** no F5 (AuthContext: remove fetchRole inexistente, listener síncrono).
6. **Reativar botão Exportar PDF** na página de Resultados.

## Migration

```sql
create table public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_name text not null,
  date_performed timestamptz not null default now(),
  global_score numeric not null,
  maturity_level int not null,
  result jsonb not null,
  created_at timestamptz not null default now()
);
alter table public.diagnostics enable row level security;
create policy "diagnostics_own_select" on public.diagnostics for select to authenticated using (auth.uid() = user_id);
create policy "diagnostics_own_insert" on public.diagnostics for insert to authenticated with check (auth.uid() = user_id);
create policy "diagnostics_own_delete" on public.diagnostics for delete to authenticated using (auth.uid() = user_id);
create index diagnostics_user_created_idx on public.diagnostics (user_id, created_at desc);
```

## Arquivos

```text
[migration]                          new table public.diagnostics + RLS
src/lib/diagnosticsRepo.ts           new
src/pages/HistoryPage.tsx            new
src/App.tsx                          edit (rota /historico)
src/pages/Questionnaire.tsx          edit (saveDiagnostic)
src/pages/PresentationMode.tsx       edit (saveDiagnostic)
src/pages/Results.tsx                edit (?id, link Histórico, botão PDF)
src/pages/Index.tsx                  edit (atalho Histórico)
src/contexts/AuthContext.tsx         edit (fix loading infinito)
```

## Salvaguardas

- Save no banco com try/catch → cache local sempre mantido. Se banco falhar, fluxo segue normal.
- Histórico isolado em rota nova; não afeta fluxo existente.
- Fix do AuthContext só remove código quebrado (tabela `usuarios` não existe).
