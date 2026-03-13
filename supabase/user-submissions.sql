create table if not exists public.wishes (
  id text primary key,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx
  on public.wishes (created_at desc);

create table if not exists public.consultation_letters (
  id text primary key,
  nickname text null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists consultation_letters_created_at_idx
  on public.consultation_letters (created_at desc);
