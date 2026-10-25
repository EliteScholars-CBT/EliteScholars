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

-- ----------------------------------------------------------------- statuses --
-- 24-hour student status updates. privacy: me | squad | public.
create table if not exists statuses (
  id           uuid primary key default gen_random_uuid(),
  email        text not null,
  display_name text not null default '',
  text         text not null,
  bg           text not null default 'violet',
  privacy      text not null default 'me' check (privacy in ('me','squad','public')),
  created_at   timestamptz not null default now(),
  expires_at   timestamptz not null default (now() + interval '24 hours')
);
create index if not exists idx_statuses_expires on statuses (expires_at desc);
create index if not exists idx_statuses_email on statuses (email, created_at desc);
alter table statuses enable row level security;


-- ------------------------------------------------------- media + squad chat --
-- Small compressed images (JPEG/PNG/WebP, <= ~200 KB) for statuses and chat.
create table if not exists media (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  data       text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_media_created on media (created_at);
alter table media enable row level security;
alter table statuses add column if not exists media_id uuid;
alter table statuses alter column text drop not null;
alter table statuses alter column text set default '';
create table if not exists squad_messages (
  id           uuid primary key default gen_random_uuid(),
  squad_id     uuid not null references squads(id) on delete cascade,
  email        text not null,
  display_name text not null default '',
  kind         text not null default 'text' check (kind in ('text','image','sticker')),
  text         text not null default '',
  media_id     uuid,
  created_at   timestamptz not null default now()
);
create index if not exists idx_squad_messages_squad on squad_messages (squad_id, created_at desc);
alter table squad_messages enable row level security;
create table if not exists squad_chat_reads (
  squad_id uuid not null references squads(id) on delete cascade,
  email    text not null,
  seen_at  timestamptz not null default now(),
  primary key (squad_id, email)
);
alter table squad_chat_reads enable row level security;

-- ------------------------------------------------------------- admin email --
create table if not exists email_optouts (
  email      text primary key,
  created_at timestamptz not null default now()
);
create table if not exists email_campaigns (
  id          uuid primary key default gen_random_uuid(),
  subject     text not null,
  channel     text not null default 'direct',   -- direct | campmailer
  audience    text not null default 'students', -- students | partners
  recipients  integer not null default 0,
  sent        integer not null default 0,
  failed      integer not null default 0,
  status      text not null default 'done',
  external_id text,
  error       text,
  created_at  timestamptz not null default now()
);
alter table email_optouts   enable row level security;
alter table email_campaigns enable row level security;

-- ------------------------------------------------------------ push alerts --
create table if not exists push_subscriptions (
  endpoint   text primary key,
  email      text not null,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_push_email on push_subscriptions (email);
alter table push_subscriptions enable row level security;

-- ----------------------------------------------------------- school classes --
create table if not exists classes (
  id            uuid primary key default gen_random_uuid(),
  teacher_email text not null,
  name          text not null,
  school_name   text not null default '',
  code          text not null unique,
  created_at    timestamptz not null default now()
);
create index if not exists idx_classes_teacher on classes (teacher_email);
create table if not exists class_members (
  id           uuid primary key default gen_random_uuid(),
  class_id     uuid not null references classes(id) on delete cascade,
  email        text not null,
  display_name text not null default '',
  joined_at    timestamptz not null default now(),
  unique (class_id, email)
);
create index if not exists idx_class_members_email on class_members (email);
create table if not exists assignments (
  id            uuid primary key default gen_random_uuid(),
  class_id      uuid not null references classes(id) on delete cascade,
  teacher_email text not null,
  title         text not null,
  body          text not null default '',
  images        jsonb not null default '[]'::jsonb,
  due_at        timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists idx_assignments_class on assignments (class_id, created_at desc);
create table if not exists assignment_done (
  id            uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references assignments(id) on delete cascade,
  email         text not null,
  done_at       timestamptz not null default now(),
  unique (assignment_id, email)
);
alter table classes         enable row level security;
alter table class_members   enable row level security;
alter table assignments     enable row level security;
alter table assignment_done enable row level security;

-- --------------------------------------------------------- question reports --
create table if not exists question_reports (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  qkey       text not null,
  subject    text not null default '',
  exam       text not null default '',
  qi         integer,
  question   text not null,
  options    jsonb not null default '[]'::jsonb,
  reason     text not null default 'other',
  note       text not null default '',
  status     text not null default 'open',   -- open | resolved
  created_at timestamptz not null default now()
);
create index if not exists idx_qreports_status on question_reports (status, created_at desc);
create index if not exists idx_qreports_user on question_reports (email, qkey);
alter table question_reports enable row level security;

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

-- ------------------------------------------------------ admin team + plans --
create table if not exists admin_users (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  pass_hash   text not null,
  perms       jsonb not null default '[]'::jsonb,
  role        text not null default 'custom',
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  last_login  timestamptz
);
alter table admin_users enable row level security;
create table if not exists admin_audit (
  id         bigint generated always as identity primary key,
  admin_name text not null default '',
  action     text not null,
  detail     text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists idx_admin_audit_created on admin_audit (created_at desc);
alter table admin_audit enable row level security;
-- One row per school (teacher account): free trial, then an active plan once paid.
create table if not exists school_accounts (
  teacher_email    text primary key,
  school_name      text not null default '',
  trial_started_at timestamptz not null default now(),
  trial_ends_at    timestamptz,
  paid_until       timestamptz,
  amount_paid      numeric not null default 0,
  notes            text not null default '',
  created_at       timestamptz not null default now()
);
alter table school_accounts enable row level security;

-- ----------------------------------------------------------- shop_items --
-- Items you add in Admin → Shop (images live in `media`, email = 'shop-admin').
create table if not exists shop_items (
  id          text primary key,
  title       text not null,
  description text not null default '',
  price_ngn   integer not null check (price_ngn > 0),
  category    text not null default 'Notes',
  badge       text,
  link        text,
  image_id    uuid,
  show_app     boolean not null default true,
  show_blog    boolean not null default false,
  show_landing boolean not null default true,
  active      boolean not null default true,
  sort        integer not null default 0,
  created_at  timestamptz not null default now()
);
alter table shop_items enable row level security;


-- ----------------------------------------------- status reactions / replies --
-- Safe to re-run. Reshared statuses show "Reshared from <name>".
alter table statuses add column if not exists reshared_from text;
alter table statuses add column if not exists reshared_id   uuid;
create index if not exists idx_statuses_reshared on statuses (email, reshared_id);
create table if not exists status_reactions (
  status_id    uuid not null references statuses(id) on delete cascade,
  email        text not null,
  display_name text not null default '',
  kind         text not null default 'like',
  created_at   timestamptz not null default now(),
  primary key (status_id, email)
);
alter table status_reactions enable row level security;
create table if not exists status_replies (
  id           uuid primary key default gen_random_uuid(),
  status_id    uuid not null references statuses(id) on delete cascade,
  email        text not null,
  display_name text not null default '',
  text         text not null,
  created_at   timestamptz not null default now()
);
create index if not exists idx_status_replies_status on status_replies (status_id, created_at desc);
alter table status_replies enable row level security;

-- ------------------------------------------------------------------ presence --
-- "Online now" dots in squads. Safe to re-run.
alter table profiles add column if not exists last_seen timestamptz;

-- ----------------------------------------------------- status moderation --
-- Safe to re-run. Reports from students, photo-scan result, admin review, account suspension.
alter table statuses add column if not exists flag     text;
alter table statuses add column if not exists scan     text;
alter table statuses add column if not exists reports  int not null default 0;
alter table statuses add column if not exists reviewed boolean not null default false;
alter table profiles add column if not exists suspended boolean not null default false;
alter table profiles add column if not exists suspended_reason text;
create table if not exists status_reports (
  status_id  uuid not null references statuses(id) on delete cascade,
  email      text not null,
  reason     text not null default '',
  created_at timestamptz not null default now(),
  primary key (status_id, email)
);
alter table status_reports enable row level security;

-- ------------------------------------------------------------ group plans --
-- One payer buys a 50 or 100 seat plan for a year, then adds members by email.
create table if not exists group_plans (
  id          uuid primary key default gen_random_uuid(),
  owner_email text not null,
  seats       int  not null,
  plan        text not null default '',
  tx_ref      text unique,
  amount      numeric not null default 0,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now()
);
create index if not exists idx_group_plans_owner on group_plans (owner_email);
create table if not exists group_members (
  id         bigint generated always as identity primary key,
  group_id   uuid not null references group_plans(id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now(),
  unique (group_id, email)
);
create index if not exists idx_group_members_email on group_members (email);
alter table group_plans   enable row level security;
alter table group_members enable row level security;

-- ------------------------------------------------- chat: reactions, pins, edits, typing --
alter table squad_messages add column if not exists updated_at timestamptz not null default now();
alter table squad_messages add column if not exists edited_at  timestamptz;
alter table squad_messages add column if not exists reactions  jsonb not null default '{}'::jsonb;
alter table squad_messages add column if not exists pinned_at  timestamptz;
create index if not exists idx_squad_messages_updated on squad_messages (squad_id, updated_at);
alter table squad_chat_reads add column if not exists typing_at timestamptz;

-- ------------------------------------------------------ status reply threads --
-- The author can answer a reply; only the author and that student see the thread.
alter table status_replies add column if not exists to_email  text;
alter table status_replies add column if not exists parent_id uuid;
create index if not exists idx_status_replies_to on status_replies (status_id, to_email);


-- ------------------------------------------------------------ status views --
-- Who opened a status (one row per student per status). The owner sees the list and the count.
create table if not exists status_views (
  status_id    uuid not null references statuses(id) on delete cascade,
  email        text not null,
  display_name text not null default '',
  created_at   timestamptz not null default now(),
  primary key (status_id, email)
);
create index if not exists idx_status_views_status on status_views (status_id, created_at desc);
alter table status_views enable row level security;
