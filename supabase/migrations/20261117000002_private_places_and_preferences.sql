-- Milestone 3 — M3-001/003/004/005/006/007: bảng địa chỉ riêng tư + cấu hình
-- mặc định của Couple (phương tiện, bán kính, ngân sách, sở thích).
-- Tham chiếu: OUR_DATE_BLUEPRINT.md mục 7.5/7.6, docs/DATABASE_SCHEMA.md
-- mục 3.5/3.7.
--
-- Quyết định đã xác nhận với chủ dự án (2026-11-17, xem PROGRESS.md mục 12):
-- 1. KHÔNG mã hoá cột địa chỉ (chỉ dựa vào RLS) — theo phương án "RLS only",
--    phù hợp app 2 người dùng, có thể nâng cấp lên mã hoá sau nếu cần.
-- 2. private_places là owner-only (cột user_id, không có couple_id) — theo
--    docs/DATABASE_SCHEMA.md mục 3.7/5 (chi tiết hơn OUR_DATE_BLUEPRINT.md
--    mục 7.5): địa chỉ riêng tư KHÔNG hiện trực tiếp cho người yêu qua
--    client, kể cả khi đã ở cùng Couple — chỉ chủ sở hữu mới đọc/sửa được.
-- 3. default_radius lưu đơn vị MÉT trong DB (theo DATABASE_SCHEMA.md,
--    quy ước geo-schema phổ biến); tầng UI tiếp tục hiển thị/nhập bằng km.
-- 4. transport mode lưu giá trị UPPERCASE (DRIVE/TWO_WHEELER/WALK/TRANSIT)
--    xuyên suốt kể cả trong DB — đây là giá trị enum thật của Google Routes
--    API (sẽ gọi ở M5/M6), tránh thêm một tầng dịch nghĩa không cần thiết.
--    Không theo gợi ý lowercase của DATABASE_SCHEMA.md.
-- 5. Thêm cột avoid_preferences (thiếu trong DATABASE_SCHEMA.md nhưng có ở
--    OUR_DATE_BLUEPRINT.md mục 7.6 và kiểu PlannerInput mục 5.1).

-- M3-001/003: địa chỉ riêng tư (Nhà tôi, Điểm đón...) — chỉ chủ sở hữu CRUD.
create table if not exists public.private_places (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  label text not null,
  address text not null,
  -- Chưa geocode thật (chưa tích hợp Places/Routes API ở M4/M5) nên để trống;
  -- không tự bịa toạ độ. Sẽ điền khi có geocoding thật.
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists private_places_user_id_idx on public.private_places (user_id);

alter table public.private_places enable row level security;

drop policy if exists private_places_owner_all on public.private_places;
create policy private_places_owner_all
  on public.private_places for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- M3-004/005/006/007: cấu hình mặc định dùng chung cho cả Couple.
create table if not exists public.couple_preferences (
  couple_id uuid primary key references public.couples (id) on delete cascade,
  default_radius_m integer not null default 15000,
  default_transport_mode text not null default 'TWO_WHEELER'
    check (default_transport_mode in ('DRIVE', 'TWO_WHEELER', 'WALK', 'TRANSIT')),
  default_budget_vnd bigint,
  interests jsonb not null default '[]'::jsonb,
  avoid_preferences jsonb not null default '[]'::jsonb,
  updated_by uuid references auth.users (id),
  updated_at timestamptz not null default now()
);

alter table public.couple_preferences enable row level security;

-- Dùng lại helper is_couple_member đã tạo ở migration RLS trước (M2-003).
drop policy if exists couple_preferences_member_select on public.couple_preferences;
create policy couple_preferences_member_select
  on public.couple_preferences for select
  using (public.is_couple_member(couple_id, auth.uid()));

drop policy if exists couple_preferences_member_insert on public.couple_preferences;
create policy couple_preferences_member_insert
  on public.couple_preferences for insert
  with check (public.is_couple_member(couple_id, auth.uid()));

drop policy if exists couple_preferences_member_update on public.couple_preferences;
create policy couple_preferences_member_update
  on public.couple_preferences for update
  using (public.is_couple_member(couple_id, auth.uid()))
  with check (public.is_couple_member(couple_id, auth.uid()));
