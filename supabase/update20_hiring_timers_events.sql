-- update 20: hiring timers (start when the link is first opened) + activity log
alter table hiring_jobs add column if not exists apply_duration_h integer;
alter table hiring_jobs add column if not exists research_duration_h integer;
alter table hiring_jobs add column if not exists opened_at timestamptz;
create table if not exists hiring_events (
  id         bigint generated always as identity primary key,
  job_id     uuid references hiring_jobs(id) on delete cascade,
  app_id     uuid,
  type       text not null,
  text       text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists idx_hiring_events_job on hiring_events (job_id, created_at desc);
alter table hiring_events enable row level security;
