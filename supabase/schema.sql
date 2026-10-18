-- ============================================================================
-- EliteScholars  Supabase schema  (safe to run more than once)
-- Paste into: Supabase Dashboard > SQL Editor > New query > Run
-- ============================================================================

create extension if not exists pgcrypto;

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------- profiles --
create table if not exists profiles (
  id                 uuid primary key default gen_random_uuid(),
  email              text not null unique,
  username           text unique,
  first_name         text not null default '',
  last_name          text not null default '',
  password_hash      text not null default '',
  student_type       text not null default '',
  selected_exams     jsonb not null default '[]'::jsonb,
  stats              jsonb not null default '{}'::jsonb,
  achievements       jsonb not null default '[]'::jsonb,
  subject_performance jsonb not null default '{}'::jsonb,
  total_xp           integer not null default 0,
  level              integer not null default 1,
  xp_to_next         integer not null default 100,
  quizzes_taken      integer not null default 0,
  total_correct      integer not null default 0,
  total_questions    integer not null default 0,
  perfect_rounds     integer not null default 0,
  challenges_won     integer not null default 0,
  challenges_lost    integer not null default 0,
  current_streak     integer not null default 0,
  best_streak        integer not null default 0,
  last_active        timestamptz,
  is_premium         boolean not null default false,
  subscription_plan  text check (subscription_plan is null or subscription_plan in ('annual','pro')),
  subscribed_at      timestamptz,
  expires_at         timestamptz,
  subscription_tx_ref text,
  reset_code         text,
  reset_expires      timestamptz,
  guardian_email     text,
  referred_by_code   text,
  created_at         timestamptz not null default now(),
  last_login         timestamptz,
  updated_at         timestamptz not null default now()
);
create index if not exists idx_profiles_referred_by on profiles (referred_by_code) where referred_by_code is not null;
drop trigger if exists trg_profiles_updated on profiles;
create trigger trg_profiles_updated before update on profiles
  for each row execute function set_updated_at();

-- --------------------------------------------------------------- xp_events --
create table if not exists xp_events (
  id         bigint generated always as identity primary key,
  email      text not null,
  amount     integer not null,
  reason     text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists idx_xp_events_email_created on xp_events (email, created_at desc);
create index if not exists idx_xp_events_created on xp_events (created_at desc);

-- -------------------------------------------------------------- challenges --
create table if not exists challenges (
  challenge_id      text primary key,
  challenger_email  text not null,
  challenger_name   text not null default '',
  opponent_email    text not null,
  opponent_name     text not null default '',
  exam_type         text not null default '',
  university        text not null default '',
  subject           text not null default '',
  num_questions     integer,
  time_limit        integer,
  message_template  text not null default '',
  custom_message    text not null default '',
  status            text not null default 'pending'
                    check (status in ('pending','accepted','completed','declined','expired')),
  challenger_score  numeric,
  opponent_score    numeric,
  winner_email      text,
  expires_at        timestamptz not null,
  completed_at      timestamptz,
  created_at        timestamptz not null default now()
);
create index if not exists idx_challenges_opponent_status on challenges (opponent_email, status);
create index if not exists idx_challenges_challenger_status on challenges (challenger_email, status);

create table if not exists challenge_messages (
  message_id   text primary key,
  category     text not null default '',
  message_text text not null,
  is_active    boolean not null default true
);
insert into challenge_messages (message_id, category, message_text) values
  ('msg_001','friendly','Think you can beat me? 😊'),
  ('msg_002','competitive','I''m coming for your spot on the leaderboard! 👑'),
  ('msg_003','funny','Prepare to lose... or maybe win? Let''s play! 🎮'),
  ('msg_004','motivational','Let''s help each other improve! Best score wins! 💪'),
  ('msg_005','trash_talk','You''re going down! Hope you''ve been studying 😤')
on conflict (message_id) do nothing;

-- ------------------------------------------------------------------ squads --
create table if not exists squads (
  id         uuid primary key default gen_random_uuid(),
  code       text not null unique,
  name       text not null,
  owner_email text not null,
  created_at timestamptz not null default now()
);
create table if not exists squad_members (
  id             bigint generated always as identity primary key,
  squad_id       uuid not null references squads(id) on delete cascade,
  email          text not null,
  display_name   text not null default '',
  xp_contributed integer not null default 0,
  joined_at      timestamptz not null default now(),
  unique (squad_id, email)
);
create index if not exists idx_squad_members_email on squad_members (email);

-- --------------------------------------------------------------- referrals --
create table if not exists referrals (
  id             bigint generated always as identity primary key,
  code           text not null,
  referred_email text not null,
  created_at     timestamptz not null default now()
);
create index if not exists idx_referrals_code on referrals (code);

-- ---------------------------------------------------------------- payments --
create table if not exists payments (
  id         bigint generated always as identity primary key,
  tx_ref     text unique,
  email      text not null,
  plan       text not null default '',
  amount     numeric not null default 0,
  status     text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists idx_payments_email on payments (email);

-- ------------------------------------------------------------------ events --
create table if not exists events (
  id         bigint generated always as identity primary key,
  type       text not null,
  email      text,
  payload    jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists idx_events_type_created on events (type, created_at desc);
create index if not exists idx_events_email on events (email) where email is not null;
create index if not exists idx_events_created on events (created_at desc);
create index if not exists idx_events_referral_code on events ((payload->>'referral_code')) where type = 'referral_link_opened';

-- ---------------------------------------------------- settings (admin knobs) --
create table if not exists settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);
insert into settings (key, value) values
  ('default_commission_rate', '40'::jsonb),
  ('min_payout', '1000'::jsonb)
on conflict (key) do nothing;

-- ---------------------------------------------------------------- partners --
-- Affiliate partners (not students). They log in at /partner.
create table if not exists partners (
  id                 uuid primary key default gen_random_uuid(),
  email              text not null unique,
  password_hash      text not null,
  full_name          text not null,
  phone              text not null default '',
  referral_code      text not null unique,
  status             text not null default 'pending'
                     check (status in ('pending','active','suspended')),
  -- null = use the default rate from settings; otherwise this partner's own %
  commission_rate    numeric(5,2) check (commission_rate is null or (commission_rate >= 0 and commission_rate <= 100)),
  bank_name          text,
  account_name       text,
  account_number_enc text,          -- encrypted by the server, never stored in plain text
  notes              text not null default '',
  created_at         timestamptz not null default now(),
  approved_at        timestamptz,
  last_login         timestamptz,
  updated_at         timestamptz not null default now()
);
drop trigger if exists trg_partners_updated on partners;
create trigger trg_partners_updated before update on partners
  for each row execute function set_updated_at();

-- Who referred each student: the "referrer" column next to the student.
alter table profiles  add column if not exists referrer_partner_id uuid references partners(id) on delete set null;
alter table referrals add column if not exists partner_id uuid references partners(id) on delete set null;
create index if not exists idx_profiles_referrer_partner on profiles (referrer_partner_id) where referrer_partner_id is not null;
create index if not exists idx_referrals_partner on referrals (partner_id) where partner_id is not null;

create table if not exists partner_payouts (
  id                 uuid primary key default gen_random_uuid(),
  partner_id         uuid not null references partners(id) on delete restrict,
  amount             numeric(12,2) not null check (amount > 0),
  status             text not null default 'requested'
                     check (status in ('requested','paid','rejected')),
  bank_name          text,
  account_name       text,
  account_number_enc text,
  reference          text not null default '',
  note               text not null default '',
  requested_at       timestamptz not null default now(),
  processed_at       timestamptz
);
create index if not exists idx_partner_payouts_partner on partner_payouts (partner_id, status);
-- A partner can only have one open payout request at a time.
create unique index if not exists uq_partner_one_open_payout on partner_payouts (partner_id) where status = 'requested';

create table if not exists partner_commissions (
  id             uuid primary key default gen_random_uuid(),
  partner_id     uuid not null references partners(id) on delete restrict,
  payment_tx_ref text not null unique,       -- one commission per payment, ever
  referred_email text not null,
  payment_amount numeric(12,2) not null,
  rate           numeric(5,2) not null,      -- % in force when the payment happened
  amount         numeric(12,2) not null,     -- commission earned
  status         text not null default 'earned'
                 check (status in ('earned','in_payout','paid','cancelled')),
  payout_id      uuid references partner_payouts(id) on delete set null,
  created_at     timestamptz not null default now(),
  paid_at        timestamptz
);
create index if not exists idx_partner_commissions_partner on partner_commissions (partner_id, status);
create index if not exists idx_partner_commissions_email on partner_commissions (referred_email);

-- ------------------------------------------------------------ leaderboards --
-- Day/week/month boundaries are taken in Nigerian time (Africa/Lagos).
create or replace view leaderboard_daily as
  select e.email, p.username, p.first_name, sum(e.amount)::int as xp,
         max(p.level) as level, max(p.quizzes_taken) as quizzes
  from xp_events e left join profiles p on p.email = e.email
  where e.created_at >= (date_trunc('day', now() at time zone 'Africa/Lagos') at time zone 'Africa/Lagos')
  group by e.email, p.username, p.first_name;

create or replace view leaderboard_weekly as
  select e.email, p.username, p.first_name, sum(e.amount)::int as xp,
         max(p.level) as level, max(p.quizzes_taken) as quizzes
  from xp_events e left join profiles p on p.email = e.email
  where e.created_at >= (date_trunc('week', now() at time zone 'Africa/Lagos') at time zone 'Africa/Lagos')
  group by e.email, p.username, p.first_name;

create or replace view leaderboard_monthly as
  select e.email, p.username, p.first_name, sum(e.amount)::int as xp,
         max(p.level) as level, max(p.quizzes_taken) as quizzes
  from xp_events e left join profiles p on p.email = e.email
  where e.created_at >= (date_trunc('month', now() at time zone 'Africa/Lagos') at time zone 'Africa/Lagos')
  group by e.email, p.username, p.first_name;

create or replace view leaderboard_alltime as
  select email, username, first_name, total_xp as xp,
         level,
         case when total_questions > 0
              then round(total_correct::numeric * 100 / total_questions)
              else 0 end as avg_score,
         quizzes_taken as total_quizzes
  from profiles where total_xp > 0;

-- ---------------------------------------------- free limits, trial, grants --
-- Per-student access overrides. "Free access" is an admin gift (no payment, no
-- commission); a trial starts automatically at sign-up when switched on.
alter table profiles add column if not exists trial_ends_at          timestamptz;
alter table profiles add column if not exists free_access_until      timestamptz;
alter table profiles add column if not exists free_access_forever    boolean not null default false;
alter table profiles add column if not exists free_access_note       text;
alter table profiles add column if not exists free_access_granted_at timestamptz;

-- How much a free student has used. period = Lagos day (YYYY-MM-DD) or 'lifetime'.
create table if not exists usage_counters (
  email      text not null,
  kind       text not null,
  period     text not null,
  count      int  not null default 0,
  refs       jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (email, kind, period)
);

insert into settings (key, value) values
  ('access_config', '{"trialEnabled":false,"trialDays":14,"limits":{"topics":3,"cbt":3,"games":3,"fileStudy":2},"global":{"active":false,"forever":false,"until":null,"note":""}}'::jsonb)
on conflict (key) do nothing;

-- ------------------------------------------------------------ row security --
alter table profiles           enable row level security;
alter table xp_events          enable row level security;
alter table challenges         enable row level security;
alter table challenge_messages enable row level security;
alter table squads             enable row level security;
alter table squad_members      enable row level security;
alter table referrals          enable row level security;
alter table payments           enable row level security;
alter table events             enable row level security;
alter table settings            enable row level security;
alter table partners            enable row level security;
alter table partner_payouts     enable row level security;
alter table partner_commissions enable row level security;
alter table usage_counters      enable row level security;
-- No policies on purpose: only the server (service-role key) can read/write.
