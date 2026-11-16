-- Milestone 2 — M2-005/M2-006/M2-007: RPC function tạo Couple, tạo mã mời, tham gia bằng mã mời.
-- Tham chiếu: docs/DATABASE_SCHEMA.md mục 6, docs/API_INTEGRATION_SPEC.md mục 5.
-- CHƯA áp dụng lên Supabase thật — áp dụng qua SQL Editor như 2 migration trước.
--
-- Cả 3 hàm đều SECURITY DEFINER vì client không có quyền insert trực tiếp vào
-- couple_members/couple_invitations (xem migration RLS) — hàm tự kiểm tra
-- auth.uid() và quyền trước khi ghi, không tin tham số do client gửi cho
-- danh tính người gọi.
--
-- pgcrypto cung cấp gen_random_bytes/digest dùng để sinh + băm mã mời.
-- Supabase thường cài extension vào schema `extensions`, không phải
-- `public` — phải thêm `extensions` vào search_path của hàm, nếu không
-- Postgres báo "function gen_random_bytes(integer) does not exist" dù
-- extension đã bật (lỗi này chỉ phát hiện được khi chạy thật, không thấy
-- qua static review/lint).
create extension if not exists pgcrypto with schema extensions;

-- M2-005: tạo Couple + thêm người tạo làm thành viên đầu tiên (owner), nguyên tử.
create or replace function public.create_couple(
  p_display_name text default null,
  p_anniversary_date date default null
)
returns public.couples
language plpgsql
security definer
set search_path = public
as $$
declare
  v_couple public.couples;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated';
  end if;

  if exists (select 1 from public.couple_members where user_id = auth.uid()) then
    raise exception 'already_in_couple';
  end if;

  insert into public.couples (display_name, anniversary_date, created_by)
  values (p_display_name, p_anniversary_date, auth.uid())
  returning * into v_couple;

  insert into public.couple_members (couple_id, user_id, role)
  values (v_couple.id, auth.uid(), 'owner');

  return v_couple;
end;
$$;

-- M2-006: sinh mã mời ngẫu nhiên, chỉ lưu bản băm (sha256 qua pgcrypto), trả
-- token thô đúng một lần cho client hiển thị/chia sẻ.
create or replace function public.create_couple_invitation(
  p_expires_in_hours int default 168
)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_couple_id uuid;
  v_member_count int;
  v_raw_token text;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated';
  end if;

  select couple_id into v_couple_id from public.couple_members where user_id = auth.uid();
  if v_couple_id is null then
    raise exception 'no_couple';
  end if;

  select count(*) into v_member_count from public.couple_members where couple_id = v_couple_id;
  if v_member_count >= 2 then
    raise exception 'couple_already_has_two_members';
  end if;

  v_raw_token := encode(gen_random_bytes(16), 'hex');

  insert into public.couple_invitations (couple_id, token_hash, created_by, expires_at)
  values (
    v_couple_id,
    encode(digest(v_raw_token, 'sha256'), 'hex'),
    auth.uid(),
    now() + (p_expires_in_hours || ' hours')::interval
  );

  return v_raw_token;
end;
$$;

-- M2-007: xác thực mã mời (so khớp hash, kiểm tra hạn dùng/trạng thái/giới
-- hạn 2 thành viên) rồi thêm người gọi vào Couple, nguyên tử. Khoá dòng
-- invitation bằng FOR UPDATE để tránh race condition khi 2 người cùng dùng
-- một mã cùng lúc.
create or replace function public.accept_couple_invitation(p_token text)
returns public.couples
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_invitation public.couple_invitations;
  v_couple public.couples;
  v_member_count int;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated';
  end if;

  if exists (select 1 from public.couple_members where user_id = auth.uid()) then
    raise exception 'already_in_couple';
  end if;

  select * into v_invitation
  from public.couple_invitations
  where token_hash = encode(digest(p_token, 'sha256'), 'hex')
  for update;

  if v_invitation.id is null or v_invitation.status <> 'pending' or v_invitation.expires_at < now() then
    raise exception 'invitation_invalid';
  end if;

  select count(*) into v_member_count from public.couple_members where couple_id = v_invitation.couple_id;
  if v_member_count >= 2 then
    raise exception 'couple_already_has_two_members';
  end if;

  insert into public.couple_members (couple_id, user_id, role)
  values (v_invitation.couple_id, auth.uid(), 'member');

  update public.couple_invitations
  set status = 'accepted', accepted_by = auth.uid(), accepted_at = now()
  where id = v_invitation.id;

  select * into v_couple from public.couples where id = v_invitation.couple_id;
  return v_couple;
end;
$$;

grant execute on function public.create_couple(text, date) to authenticated;
grant execute on function public.create_couple_invitation(int) to authenticated;
grant execute on function public.accept_couple_invitation(text) to authenticated;
