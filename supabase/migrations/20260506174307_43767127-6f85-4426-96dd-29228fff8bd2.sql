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

create policy "diagnostics_own_select"
  on public.diagnostics for select
  to authenticated
  using (auth.uid() = user_id);

create policy "diagnostics_own_insert"
  on public.diagnostics for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "diagnostics_own_delete"
  on public.diagnostics for delete
  to authenticated
  using (auth.uid() = user_id);

create index diagnostics_user_created_idx
  on public.diagnostics (user_id, created_at desc);