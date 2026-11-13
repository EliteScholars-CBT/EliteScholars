-- Payroll (owner-only admin tab): people on payroll and one payment row per person per month.
create table if not exists payroll_staff (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  role           text not null default '',
  email          text not null default '',
  pay_type       text not null default 'monthly',
  amount         numeric not null default 0,
  bank_name      text not null default '',
  account_name   text not null default '',
  account_number text not null default '',
  start_date     date,
  active         boolean not null default true,
  notes          text not null default '',
  created_at     timestamptz not null default now()
);
create table if not exists payroll_payments (
  id         uuid primary key default gen_random_uuid(),
  staff_id   uuid not null references payroll_staff(id) on delete cascade,
  period     text not null,
  amount     numeric not null default 0,
  bonus      numeric not null default 0,
  deduction  numeric not null default 0,
  paid_at    timestamptz not null default now(),
  method     text not null default '',
  note       text not null default '',
  created_at timestamptz not null default now(),
  unique (staff_id, period)
);
create index if not exists idx_payroll_payments_period on payroll_payments (period);
alter table payroll_staff enable row level security;
alter table payroll_payments enable row level security;
