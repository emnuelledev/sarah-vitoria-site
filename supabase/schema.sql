-- ============================================================================
-- schema.sql — Sarah Vitória (backend)
-- Rode este arquivo inteiro no SQL Editor do painel Supabase (ou via
-- `supabase db push` com a CLI) antes de usar o site com o backend real.
-- Idempotente: pode rodar de novo sem duplicar nada.
-- ============================================================================

create extension if not exists pgcrypto;

-- ============================================================================
-- AGENDAMENTO
-- ============================================================================

create table if not exists availability_rules (
  id uuid primary key default gen_random_uuid(),
  dia_semana smallint not null check (dia_semana between 0 and 6), -- 0 = domingo (igual EXTRACT(DOW) do Postgres)
  hora_inicio time not null,
  hora_fim time not null,
  duracao_minutos integer not null default 60 check (duracao_minutos > 0),
  modalidade text not null check (modalidade in ('Presencial', 'Online')),
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  check (hora_fim > hora_inicio)
);

create table if not exists availability_exceptions (
  id uuid primary key default gen_random_uuid(),
  data date not null,
  tipo text not null check (tipo in ('bloqueio', 'liberacao')), -- bloqueio = dia/horário indisponível; liberacao = horário extra fora da regra semanal
  hora_inicio time, -- null em 'bloqueio' de dia inteiro
  hora_fim time,
  modalidade text check (modalidade in ('Presencial', 'Online')),
  motivo text,
  created_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  contato text not null,
  modalidade text not null check (modalidade in ('Presencial', 'Online')),
  data date not null,
  horario time not null,
  mensagem text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Um mesmo horário não pode ter dois agendamentos ativos ao mesmo tempo —
-- mas um horário cancelado libera o slot para outra pessoa.
create unique index if not exists appointments_slot_ativo_key
  on appointments (data, horario)
  where status <> 'cancelled';

-- ============================================================================
-- CONTEÚDO (CMS)
-- ============================================================================

create table if not exists contents (
  id text primary key, -- mesmo slug usado hoje em src/data/contents.js (mantém as URLs /conteudos/:id)
  categoria text not null,
  titulo text not null,
  descricao text not null,
  corpo text not null default '',
  imagem_url text,
  url text, -- link externo opcional (ex.: post no Instagram)
  publicado boolean not null default true,
  ordem integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists testimonials (
  id text primary key,
  nome text not null,
  estrelas smallint not null default 5 check (estrelas between 1 and 5),
  texto text not null,
  publicado boolean not null default true,
  ordem integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists faq (
  id uuid primary key default gen_random_uuid(),
  pergunta text not null,
  resposta text not null,
  download_label text,
  download_href text,
  ordem integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- Regra geral: visitante do site (anon) só lê o que é público e só insere
-- pedido de agendamento (sempre como 'pending'); qualquer escrita/leitura
-- administrativa exige estar autenticado (login da Sarah no /admin).
-- ============================================================================

alter table availability_rules enable row level security;
alter table availability_exceptions enable row level security;
alter table appointments enable row level security;
alter table contents enable row level security;
alter table testimonials enable row level security;
alter table faq enable row level security;

-- Postgres não tem "CREATE POLICY IF NOT EXISTS" — o padrão idempotente é
-- derrubar e recriar. Seguro rodar este arquivo mais de uma vez.

-- availability_rules: leitura pública (necessária para calcular horários
-- livres no site), escrita só autenticado.
drop policy if exists "public read availability_rules" on availability_rules;
create policy "public read availability_rules" on availability_rules
  for select using (true);
drop policy if exists "admin manage availability_rules" on availability_rules;
create policy "admin manage availability_rules" on availability_rules
  for all to authenticated using (true) with check (true);

-- availability_exceptions: idem.
drop policy if exists "public read availability_exceptions" on availability_exceptions;
create policy "public read availability_exceptions" on availability_exceptions
  for select using (true);
drop policy if exists "admin manage availability_exceptions" on availability_exceptions;
create policy "admin manage availability_exceptions" on availability_exceptions
  for all to authenticated using (true) with check (true);

-- appointments: visitante só pode criar um pedido pendente — nunca ler
-- (nem o próprio, nem de terceiros) nem alterar status. Painel admin faz
-- tudo.
drop policy if exists "public insert appointments" on appointments;
create policy "public insert appointments" on appointments
  for insert to anon with check (status = 'pending');
drop policy if exists "admin manage appointments" on appointments;
create policy "admin manage appointments" on appointments
  for all to authenticated using (true) with check (true);

-- contents: público só vê publicado = true; admin vê e edita tudo.
drop policy if exists "public read published contents" on contents;
create policy "public read published contents" on contents
  for select using (publicado = true);
drop policy if exists "admin manage contents" on contents;
create policy "admin manage contents" on contents
  for all to authenticated using (true) with check (true);

-- testimonials: mesmo padrão de contents.
drop policy if exists "public read published testimonials" on testimonials;
create policy "public read published testimonials" on testimonials
  for select using (publicado = true);
drop policy if exists "admin manage testimonials" on testimonials;
create policy "admin manage testimonials" on testimonials
  for all to authenticated using (true) with check (true);

-- faq: sempre público (não tem rascunho), edição só autenticado.
drop policy if exists "public read faq" on faq;
create policy "public read faq" on faq
  for select using (true);
drop policy if exists "admin manage faq" on faq;
create policy "admin manage faq" on faq
  for all to authenticated using (true) with check (true);
