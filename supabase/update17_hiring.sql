-- ── update 17: hiring (promoter roles) ──
create table if not exists hiring_jobs (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,                 -- public link: /hire/<slug>
  title             text not null,
  description       text not null default '',
  commission_pct    integer not null default 40,
  open              boolean not null default true,
  apply_deadline    timestamptz,                          -- applications close here
  research_deadline timestamptz,                          -- research must be sent in by here
  auto_email        boolean not null default true,        -- email the research brief automatically at apply_deadline
  auto_approve      boolean not null default false,       -- approve everyone who submitted research at research_deadline
  group_url         text not null default '',             -- group chat link sent with the approval email
  invites_sent_at   timestamptz,
  approvals_run_at  timestamptz,
  created_at        timestamptz not null default now()
);
create table if not exists hiring_applications (
  id            uuid primary key default gen_random_uuid(),
  job_id        uuid not null references hiring_jobs(id) on delete cascade,
  name          text not null,
  email         text not null,
  whatsapp      text not null default '',
  why           text not null default '',
  accepts_commission boolean not null default false,
  status        text not null default 'applied' check (status in ('applied','invited','submitted','approved','joined','rejected')),
  token         text not null unique,
  research      text not null default '',
  invited_at    timestamptz,
  submitted_at  timestamptz,
  approved_at   timestamptz,
  created_at    timestamptz not null default now(),
  unique (job_id, email)
);
create index if not exists idx_hiring_apps_job on hiring_applications (job_id, status, created_at desc);
alter table hiring_jobs enable row level security;
alter table hiring_applications enable row level security;
