-- Milestone 2 — M2-003: Row Level Security cho các bảng tạo ở migration trước.
-- Tham chiếu: docs/DATABASE_SCHEMA.md mục 5, 6.
-- CHƯA áp dụng lên Supabase thật — sẽ áp dụng ở task kế tiếp.
--
-- Nguyên tắc: user chỉ đọc dữ liệu Couple mình là thành viên. KHÔNG có policy
-- insert/update/delete cho couple_members và couple_invitations ở migration
-- này — việc tạo invite và tham gia Couple phải đi qua RPC function security
-- definer (task M2-006/M2-007), để server xác minh mã mời trước khi ghi dữ
-- liệu, không cho client tự ý sửa couple_members.
--
-- Helper function đặt tên `is_couple_member` (không phải `is_active_couple_member`
-- như docs/DATABASE_SCHEMA.md gợi ý) vì M2 chưa có cột `status` cho membership —
-- sẽ đổi tên/logic khi thêm luồng rời-couple ở M7.

alter table public.profiles enable row level security;
alter table public.couples enable row level security;
alter table public.couple_members enable row level security;
alter table public.couple_invitations enable row level security;

-- Helper: user có phải thành viên của couple này không.
create or replace function public.is_couple_member(target_couple_id uuid, target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.couple_members
    where couple_id = target_couple_id and user_id = target_user_id
  );
$$;

-- profiles: xem được hồ sơ của mình hoặc của người cùng Couple (để hiển thị tên bạn đời).
drop policy if exists profiles_select_own_or_partner on public.profiles;
create policy profiles_select_own_or_partner
  on public.profiles for select
  using (
    id = auth.uid()
    or exists (
      select 1
      from public.couple_members me
      join public.couple_members partner on partner.couple_id = me.couple_id
      where me.user_id = auth.uid() and partner.user_id = public.profiles.id
    )
  );

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
  on public.profiles for insert
  with check (id = auth.uid());

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- couples: thành viên xem/sửa được couple của mình. Bất kỳ user đăng nhập nào
-- cũng tạo được couple mới (created_by phải đúng chính họ).
drop policy if exists couples_select_member on public.couples;
create policy couples_select_member
  on public.couples for select
  using (public.is_couple_member(id, auth.uid()));

drop policy if exists couples_insert_authenticated on public.couples;
create policy couples_insert_authenticated
  on public.couples for insert
  with check (created_by = auth.uid());

drop policy if exists couples_update_member on public.couples;
create policy couples_update_member
  on public.couples for update
  using (public.is_couple_member(id, auth.uid()))
  with check (public.is_couple_member(id, auth.uid()));

-- couple_members: chỉ đọc. Không có insert/update/delete policy ở đây —
-- xem ghi chú ở đầu file.
drop policy if exists couple_members_select_member on public.couple_members;
create policy couple_members_select_member
  on public.couple_members for select
  using (public.is_couple_member(couple_id, auth.uid()));

-- couple_invitations: chỉ thành viên của couple mới xem được invite của couple đó.
-- Không có insert/update policy — tạo/dùng invite qua RPC function ở task sau.
drop policy if exists couple_invitations_select_member on public.couple_invitations;
create policy couple_invitations_select_member
  on public.couple_invitations for select
  using (public.is_couple_member(couple_id, auth.uid()));
