# OUR DATE — DATABASE SCHEMA

**Phiên bản:** 1.0  
**Nền tảng dữ liệu:** Supabase PostgreSQL + Supabase Storage  
**Trạng thái:** Đề xuất schema MVP; phải review trước khi migration production.

## 1. Nguyên tắc thiết kế

- Dùng `auth.users` của Supabase Auth làm nguồn định danh.
- Mọi bảng có dữ liệu couple phải có `couple_id` và policy RLS kiểm tra membership.
- Không tin `user_id`, `couple_id` hoặc role do client tự gửi; server/database phải xác minh.
- UUID cho khóa chính.
- Timestamp lưu UTC (`timestamptz`), hiển thị theo timezone thiết bị/couple.
- Tiền lưu bằng integer đơn vị nhỏ nhất (VND đồng) hoặc `numeric` có kiểm soát; không dùng float.
- Dữ liệu từ Google Places/Routes phải lưu nguồn, thời điểm lấy và ID provider; không lưu bản sao dư thừa nếu điều khoản provider không cho phép.
- Không lưu địa chỉ nhà riêng trong bảng `profiles`, `date_plans`, `memories` hoặc bảng chia sẻ.
- Mọi migration phải được version control và review.
- Không bật quyền truy cập public cho dữ liệu cá nhân.

## 2. Quan hệ tổng quát

```text
auth.users
   └── profiles (1:1)
          ├── private_locations (1:N, owner-only)
          └── couple_members (N:1) ── couples
                                      ├── couple_invitations
                                      ├── couple_preferences
                                      ├── saved_places
                                      ├── date_plans
                                      │     └── itinerary_stops
                                      └── memories
                                            └── memory_media
```

`couple_members` là bảng xác định membership. Không dùng một `couple_id` do client tự khai báo làm bằng chứng quyền truy cập.

## 3. Bảng đề xuất

### 3.1 `profiles`

Hồ sơ hiển thị cơ bản của user.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | FK `auth.users.id`, cascade theo chính sách xóa |
| `display_name` | text | Tên hiển thị |
| `avatar_path` | text nullable | Path trong private storage |
| `created_at` | timestamptz | default now |
| `updated_at` | timestamptz | cập nhật server |

Không lưu email nếu không cần; email chính thức lấy từ Auth. Không lưu địa chỉ nhà.

### 3.2 `couples`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `display_name` | text nullable | Tên không gian chung |
| `anniversary_date` | date nullable | Người dùng tự nhập |
| `timezone` | text | IANA timezone, default cấu hình phù hợp |
| `created_by` | uuid FK profiles | |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

Giới hạn tối đa hai active members bằng transaction/RPC và constraint/logic server phù hợp.

### 3.3 `couple_members`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `couple_id` | uuid FK couples | |
| `user_id` | uuid FK profiles | |
| `role` | text | MVP: `member` hoặc `owner` nếu cần |
| `status` | text | `active`, `left`, `removed` |
| `joined_at` | timestamptz nullable | |
| `created_at` | timestamptz | |

Constraints:
- Unique active membership theo user (một couple active/user trong MVP).
- Unique `(couple_id, user_id)` nếu không lưu lịch sử membership; nếu lưu lịch sử, dùng chiến lược partial unique index.
- Chỉ server-side RPC được phép thêm thành viên từ invitation.

### 3.4 `couple_invitations`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `couple_id` | uuid FK couples | |
| `created_by` | uuid FK profiles | |
| `token_hash` | text unique | Chỉ lưu hash, không lưu token thô |
| `status` | text | `pending`, `accepted`, `revoked`, `expired` |
| `expires_at` | timestamptz | |
| `accepted_by` | uuid nullable FK profiles | |
| `accepted_at` | timestamptz nullable | |
| `created_at` | timestamptz | |

Token ngẫu nhiên đủ entropy, chỉ trả token thô một lần khi tạo. Rate limit thử mã; không log token.

### 3.5 `couple_preferences`

| Column | Type | Notes |
|---|---|---|
| `couple_id` | uuid PK/FK couples | |
| `default_radius_m` | integer | Default đề xuất 15000 |
| `default_transport_mode` | text | `driving`, `walking`, `transit`, `two_wheeler` (mode nội bộ; mapping provider phải rõ) |
| `default_budget_minor` | bigint nullable | VND đồng |
| `currency` | text | MVP `VND` |
| `interests` | jsonb | Danh sách mã sở thích đã validate |
| `updated_by` | uuid FK profiles | |
| `updated_at` | timestamptz | |

### 3.6 `user_preferences`

| Column | Type | Notes |
|---|---|---|
| `user_id` | uuid PK/FK profiles | |
| `theme` | text | `system`, `light`, `dark` |
| `locale` | text | default `vi-VN` |
| `default_transport_mode` | text nullable | |
| `updated_at` | timestamptz | |

### 3.7 `private_locations`

Địa chỉ riêng tư của từng người. Bảng này owner-only, không phải couple-shared.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `user_id` | uuid FK profiles | Chủ sở hữu |
| `label` | text | Ví dụ: Nhà, Công ty |
| `address_encrypted` | bytea/text | Mã hóa phía server hoặc dùng vault/KMS; không trả dữ liệu giải mã cho client ngoài lúc cần |
| `place_id` | text nullable | Chỉ lưu khi cần và phù hợp điều khoản provider |
| `latitude_encrypted` | bytea/text nullable | Mã hóa |
| `longitude_encrypted` | bytea/text nullable | Mã hóa |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

Bắt buộc xác định cơ chế mã hóa, quản lý key và quyền giải mã trước khi triển khai. Nếu chưa có cơ chế an toàn, không lưu địa chỉ nhà riêng trên server; cho phép nhập tạm thời và xử lý tối thiểu. Không ghi địa chỉ vào logs/analytics/AI prompts.

### 3.8 `saved_places`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `couple_id` | uuid FK couples | |
| `provider` | text | Ví dụ `google_places` |
| `provider_place_id` | text | ID địa điểm |
| `saved_by` | uuid FK profiles | |
| `note` | text nullable | Ghi chú của couple |
| `created_at` | timestamptz | |

Unique `(couple_id, provider, provider_place_id)`. Lưu metadata provider tối thiểu và tuân thủ điều khoản lưu trữ/caching của Google. Không giả định có quyền lưu toàn bộ nội dung Places vĩnh viễn.

### 3.9 `date_plans`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `couple_id` | uuid FK couples | |
| `created_by` | uuid FK profiles | |
| `title` | text | |
| `status` | text | `draft`, `pending_confirmation`, `confirmed`, `completed`, `cancelled` |
| `starts_at` | timestamptz | |
| `ends_at` | timestamptz nullable | |
| `timezone` | text | |
| `budget_minor` | bigint nullable | VND đồng |
| `estimated_total_minor` | bigint nullable | |
| `currency` | text | `VND` |
| `transport_mode` | text | Mode nội bộ đã validate |
| `origin_type` | text | `current_location`, `selected_place`, `private_location` |
| `origin_place_id` | text nullable | Không chứa địa chỉ nhà riêng thô |
| `origin_private_location_id` | uuid nullable | Chỉ tham chiếu owner private location; kiểm tra quyền khi tính route |
| `preferences_snapshot` | jsonb | Chỉ dữ liệu không nhạy cảm cần để tái hiện yêu cầu |
| `generation_source` | text | `manual`, `ai_assisted` |
| `version` | integer | Optimistic concurrency |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

Không lưu raw home address/coordinates trong plan dùng chung. Nếu cần route từ địa chỉ riêng tư, backend xử lý rồi chỉ trả thông tin tối thiểu theo lựa chọn của người dùng; tránh lưu origin chính xác trong plan chia sẻ.

### 3.10 `itinerary_stops`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `date_plan_id` | uuid FK date_plans | |
| `sequence` | integer | Thứ tự |
| `provider` | text nullable | |
| `provider_place_id` | text nullable | |
| `place_name_snapshot` | text | Tên tại thời điểm tạo, nếu được phép lưu |
| `place_address_snapshot` | text nullable | Theo chính sách provider; không phải địa chỉ nhà |
| `starts_at` | timestamptz nullable | |
| `ends_at` | timestamptz nullable | |
| `duration_minutes` | integer nullable | |
| `travel_from_previous_minutes` | integer nullable | |
| `distance_from_previous_m` | integer nullable | |
| `estimated_cost_minor` | bigint nullable | |
| `currency` | text | |
| `notes` | text nullable | |
| `data_source` | text nullable | |
| `data_fetched_at` | timestamptz nullable | |

Unique `(date_plan_id, sequence)`. Thời gian/đường đi phải gắn với mode và dữ liệu nguồn; không gắn nhãn xe máy nếu provider không hỗ trợ.

### 3.11 `memories`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `couple_id` | uuid FK couples | |
| `created_by` | uuid FK profiles | |
| `date_plan_id` | uuid nullable FK date_plans | |
| `title` | text nullable | |
| `caption` | text nullable | |
| `memory_date` | date | |
| `place_name` | text nullable | |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

### 3.12 `memory_media`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid PK | |
| `memory_id` | uuid FK memories | |
| `storage_path` | text unique | Private bucket path |
| `media_type` | text | MIME allowlist |
| `file_size_bytes` | bigint | Có giới hạn |
| `width` | integer nullable | |
| `height` | integer nullable | |
| `created_at` | timestamptz | |

Dùng private bucket, signed URL có thời hạn, kiểm tra quyền trước khi tạo URL. Validate MIME thực tế, dung lượng, tên file; không tin metadata client.

### 3.13 `activity_events` (tùy chọn sau MVP)

Chỉ lưu event cần cho hoạt động sản phẩm, không chứa địa chỉ, token, nội dung nhạy cảm hoặc tọa độ chính xác. Cân nhắc retention và consent.

## 4. Indexes đề xuất

- `couple_members(user_id, status)`
- `couple_members(couple_id, status)`
- `date_plans(couple_id, starts_at)`
- `date_plans(couple_id, status)`
- `itinerary_stops(date_plan_id, sequence)`
- `saved_places(couple_id, created_at)`
- `memories(couple_id, memory_date desc)`
- `memory_media(memory_id)`
- `couple_invitations(token_hash)` unique

Tạo index bổ sung dựa trên query thực tế; tránh index mọi cột.

## 5. RLS và authorization

Bật RLS cho tất cả bảng được truy cập từ client.

### Quy tắc khái quát

- `profiles`: user chỉ đọc/sửa profile của chính mình; dữ liệu hiển thị cho thành viên couple có thể qua view/function giới hạn cột.
- `private_locations`: chỉ owner được CRUD; không có policy couple-wide.
- `couples`: chỉ active members được select; update giới hạn trường và quyền.
- `couple_members`: thành viên active được xem danh sách membership trong couple; thay đổi membership chỉ qua RPC server-side.
- `couple_invitations`: chỉ thành viên có quyền tạo/revoke; chấp nhận qua RPC bảo vệ token.
- `couple_preferences`: active members được select/update theo quyền.
- `saved_places`, `date_plans`, `memories`: active members cùng couple được truy cập.
- `itinerary_stops`: quyền kế thừa qua `date_plan_id` và membership của plan's couple.
- `memory_media`: quyền kế thừa từ memory và private storage policies.

Tạo helper SQL `is_active_couple_member(target_couple_id uuid)` với `SECURITY DEFINER` chỉ khi cần; set `search_path` cố định, quyền execute tối thiểu và review chống recursion/escalation. Không cho client tự set role.

### Storage

Buckets:
- `avatars` — private hoặc public có chủ đích; ưu tiên private nếu chưa cần public.
- `memories` — private.
- Không dùng public bucket cho ảnh kỷ niệm riêng tư.

Storage policies phải xác minh user là active member của couple được suy ra từ metadata/path đã được server kiểm soát. Không tin `couple_id` do client tự ghi vào object path mà không xác minh.

## 6. RPC/transaction cần thiết

- `create_couple(...)`: tạo couple + membership nguyên tử.
- `create_couple_invitation(...)`: sinh token ngẫu nhiên, lưu hash, trả token một lần.
- `accept_couple_invitation(token)`: khóa/kiểm tra lời mời, membership, hạn dùng và capacity; thêm member nguyên tử.
- `leave_couple(...)`: cập nhật membership và xử lý dữ liệu theo policy.
- `save_date_plan(...)` hoặc dùng transaction server-side để lưu plan + stops nguyên tử.
- `update_date_plan_with_version(...)`: kiểm tra version để tránh ghi đè đồng thời.

Không expose RPC có thể nâng quyền tùy ý. Mọi function có quyền cao phải được review.

## 7. Retention, deletion và privacy

- Xây dựng quy trình export/xóa account theo yêu cầu và luật áp dụng.
- Xác định rõ điều gì xảy ra với dữ liệu chung khi một thành viên rời couple/xóa tài khoản.
- Không xóa dữ liệu chung tự động nếu chưa có policy đã duyệt.
- Xóa ảnh phải xóa object storage và metadata theo transaction/workflow có thể retry.
- Không ghi PII, địa chỉ, token, signed URL hoặc raw request nhạy cảm vào logs.
- Có retention policy cho logs và temporary files.

## 8. Migration plan

1. Tạo profiles trigger sau Auth signup hoặc server workflow an toàn.
2. Tạo couples và couple_members.
3. Tạo invitations + RPC.
4. Tạo preferences và private locations sau khi quyết định encryption.
5. Tạo saved_places.
6. Tạo date_plans và itinerary_stops.
7. Tạo memories và memory_media.
8. Bật RLS, storage policies, indexes.
9. Viết tests cho quyền user A/B, outsider, user rời couple, token hết hạn.
10. Chạy migration trên dev project trước; không chạy production migration khi chưa có backup/review.

## 9. Test cases bảo mật bắt buộc

- User ngoài couple không đọc được plan/memory.
- Thành viên couple A không đọc được private location của B.
- User không thể sửa membership/role qua REST.
- Invitation hết hạn/đã dùng không thể accept.
- Không thể thêm thành viên thứ ba.
- User rời couple mất quyền truy cập ngay.
- Storage object không thể đọc bằng URL công khai.
- Không thể update plan của couple khác bằng cách sửa ID.
- Race condition accept invitation không tạo membership trùng.
- Version conflict được phát hiện, không âm thầm ghi đè.

## 10. Quyết định cần xác nhận trước production

- Cơ chế mã hóa địa chỉ riêng tư và quản lý encryption key.
- Chính sách dữ liệu chung khi một người rời couple/xóa tài khoản.
- Thời hạn lời mời.
- Có cho phép đổi couple hay không và quy trình xử lý dữ liệu.
- Google Places content nào được phép lưu/caching theo điều khoản hiện hành.
- Retention của ảnh, log và bản sao lưu.

Không tạo migration production cho `private_locations` trước khi chốt phương án mã hóa.
