-- Milestone 2 — M2-002: bảng cốt lõi cho Auth + Couple.
-- Tham chiếu: docs/DATABASE_SCHEMA.md mục 3.1-3.4 (tên bảng/cột đã xác nhận
-- 2026-11-11 để thay cho bản nháp theo OUR_DATE_BLUEPRINT.md mục 7.1-7.4).
--
-- Phạm vi "kết hợp tối thiểu" đã chốt: lấy tên bảng/cột theo DATABASE_SCHEMA.md,
-- nhưng CHƯA thêm cột `status` cho couple_members (phục vụ luồng rời-couple)
-- và CHƯA thêm cơ chế mã hoá cho private_locations — hai phần đó để dành cho
-- M7 và M3 khi thực sự cần, tránh làm phức tạp M2.
--
-- CHƯA áp dụng lên Supabase thật — sẽ áp dụng ở task kế tiếp.

create extension if not exists pgcrypto;

-- 3.1. profiles: 1-1 với auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3.2. couples
create table if not exists public.couples (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  anniversary_date date,
  timezone text not null default 'Asia/Ho_Chi_Minh',
  created_by uuid not null references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3.3. couple_members — mỗi user chỉ thuộc một couple, mỗi couple tối đa 2 người.
create table if not exists public.couple_members (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  joined_at timestamptz not null default now(),
  unique (couple_id, user_id)
);

-- Ràng buộc: một user chỉ thuộc một couple đang hoạt động (blueprint 7.3).
-- Lưu ý: chưa có cột `status`, nên ràng buộc này áp dụng cho MỌI membership.
-- Khi thêm luồng rời-couple (M7) sẽ cần đổi thành partial unique index theo status.
create unique index if not exists couple_members_one_couple_per_user
  on public.couple_members (user_id);

-- Ràng buộc: một couple tối đa 2 thành viên. Postgres không hỗ trợ CHECK đếm
-- theo nhóm nên dùng trigger.
create or replace function public.enforce_couple_member_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.couple_members where couple_id = new.couple_id) >= 2 then
    raise exception 'couple_already_has_two_members';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_couple_member_limit on public.couple_members;
create trigger trg_couple_member_limit
  before insert on public.couple_members
  for each row execute function public.enforce_couple_member_limit();

-- 3.4. couple_invitations — mã mời có hạn dùng, không lưu plain text.
create table if not exists public.couple_invitations (
  id uuid primary key default gen_random_uuid(),
  couple_id uuid not null references public.couples (id) on delete cascade,
  token_hash text not null unique,
  created_by uuid not null references auth.users (id),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'revoked', 'expired')),
  expires_at timestamptz not null,
  accepted_by uuid references auth.users (id),
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists couple_invitations_couple_id_idx on public.couple_invitations (couple_id);
