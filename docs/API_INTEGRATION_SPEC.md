# OUR DATE — API INTEGRATION SPECIFICATION

**Phiên bản:** 1.0  
**Phạm vi:** Supabase, Google Places, Google Routes và AI provider  
**Trạng thái:** Đặc tả tích hợp MVP; kiểm tra tài liệu nhà cung cấp trước khi triển khai.

## 1. Nguyên tắc kiến trúc

- Mobile app không gọi Google server-side APIs hoặc AI provider bằng secret key.
- Các request cần secret đi qua Supabase Edge Functions hoặc backend server được kiểm soát.
- Supabase Auth xác thực user; backend xác minh JWT và quyền couple.
- Database RLS là lớp bảo vệ dữ liệu, không thay thế authorization ở server.
- Không tin các trường `user_id`, `couple_id`, `role`, giá, tọa độ hoặc place ID do client gửi mà không validate.
- Không để secret trong source, Git, app bundle, log, screenshot hoặc `EXPO_PUBLIC_` variables.
- Dữ liệu bên thứ ba phải có nguồn, thời điểm lấy và giới hạn lưu trữ phù hợp điều khoản provider.
- Không bịa địa điểm, rating, giá, giờ mở cửa, route, khoảng cách hoặc ETA.

## 2. Sơ đồ luồng tổng quát

```text
Expo App (Android/iOS)
  |
  | Supabase Auth JWT
  v
Supabase Edge Functions / trusted backend
  |                 |                  |
  |                 |                  |
  v                 v                  v
Supabase DB     Google Places      Google Routes
  |                                    |
  |                                    v
  |                              Route results
  |
  v
AI Provider (optional, server-side only)
  |
  v
Validation + deterministic itinerary scheduler
  |
  v
Response to app
```

AI không phải nguồn dữ kiện địa lý. Backend phải kiểm tra output AI đối chiếu với danh sách địa điểm/route hợp lệ.

## 3. Environment và secrets

### 3.1 Client-safe variables

Chỉ những biến thực sự công khai mới được đưa vào app config, ví dụ:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` (Supabase publishable/anon key; vẫn phải dùng RLS)

Không đưa các secret sau vào client:
- `GOOGLE_MAPS_SERVER_API_KEY`
- `OPENAI_API_KEY` hoặc Anthropic API key
- `SUPABASE_SERVICE_ROLE_KEY`
- encryption keys
- invitation signing secrets

### 3.2 Server secrets

Đặt trong Supabase Edge Function secrets hoặc secret manager:
- `GOOGLE_MAPS_SERVER_API_KEY`
- `AI_PROVIDER_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` chỉ nếu một function thực sự cần quyền service role; ưu tiên user-scoped client và RLS.
- `PRIVATE_LOCATION_ENCRYPTION_KEY` hoặc KMS reference (chỉ sau khi thiết kế encryption được duyệt).

Không commit `.env`. Dùng `.env.example` chỉ chứa tên biến và placeholder, không có giá trị thật. Rotate key nếu bị lộ.

## 4. Supabase Auth

### Chức năng
- Sign up, sign in, sign out.
- Email verification nếu bật.
- Password reset/deep link.
- Refresh session.
- Lấy user profile và couple membership.

### Luồng client
1. Supabase client được khởi tạo bằng URL + anon/publishable key.
2. Auth session lưu theo hướng dẫn an toàn cho Expo/React Native.
3. Khi gọi Edge Function, gửi access token qua Authorization header theo SDK.
4. Backend xác minh JWT; không chỉ tin user ID trong JSON body.

### Lỗi cần xử lý
- Invalid credentials.
- Email verification pending.
- Session expired/refresh failed.
- Network unavailable.
- Rate limit.

Không tiết lộ thông tin tài khoản quá mức trong thông báo lỗi.

## 5. Couple invitation API

Đề xuất các Edge Functions/RPC:

### `create-couple`
Input:
- `display_name` optional
- `anniversary_date` optional

Backend:
- Xác thực JWT.
- Kiểm tra user chưa có active couple.
- Tạo couple + membership trong transaction.
- Trả `couple_id` và dữ liệu hiển thị cần thiết.

### `create-couple-invitation`
Input:
- Không nhận `created_by` từ client; lấy từ JWT.
- `expires_in` chỉ nhận giá trị trong allowlist nếu cho phép client chọn.

Backend:
- Kiểm tra caller là active member có quyền.
- Tạo token ngẫu nhiên đủ entropy.
- Lưu hash token, status, expiry.
- Trả token thô một lần để tạo deep link.
- Không log token.

### `accept-couple-invitation`
Input:
- `token`

Backend:
- Xác thực user.
- Hash token và tìm invitation.
- Kiểm tra pending, chưa hết hạn, chưa dùng, couple còn slot.
- Chấp nhận trong transaction chống race condition.
- Trả membership status.

Rate limit endpoint. Token không được đưa vào analytics/log.

## 6. Google Places API

### Mục đích
- Tìm địa điểm theo từ khóa/danh mục/khu vực.
- Lấy thông tin địa điểm để hiển thị.
- Dùng Place ID làm tham chiếu khi phù hợp.

### Endpoint nội bộ đề xuất

`POST /functions/v1/places-search`

Request mẫu:
```json
{
  "query": "cafe",
  "category": "cafe",
  "center": {
    "latitude": 21.0,
    "longitude": 105.8
  },
  "radius_m": 15000,
  "filters": {
    "open_now": false,
    "min_rating": null
  },
  "page_token": null
}
```

Đây là schema nội bộ minh họa; backend phải validate và giới hạn:
- `radius_m` trong min/max cấu hình.
- Query length.
- Category allowlist.
- Lat/lng trong range hợp lệ.
- Page token theo provider.
- Field mask chỉ yêu cầu field cần thiết để kiểm soát cost.

Response nội bộ nên chuẩn hóa:
```json
{
  "items": [
    {
      "provider": "google_places",
      "place_id": "provider-place-id",
      "name": "Tên địa điểm",
      "formatted_address": "Địa chỉ địa điểm",
      "location": {
        "latitude": 21.0,
        "longitude": 105.8
      },
      "rating": null,
      "user_ratings_total": null,
      "price_level": null,
      "business_status": null,
      "opening_hours": null,
      "photo_reference": null,
      "fetched_at": "2026-01-01T00:00:00Z"
    }
  ],
  "next_page_token": null,
  "source": "Google Places API"
}
```

Ví dụ trên chỉ mô tả shape, không phải địa điểm thật. Không gửi các trường null như dữ kiện có thật.

### Quy tắc
- Không tự tạo rating/review count/price/opening hours.
- Nếu field không có, trả null và UI hiển thị không có dữ liệu.
- Dùng field mask theo API version hiện hành.
- Tuân thủ Google Maps Platform Terms, attribution, caching và photo requirements.
- Không lưu vĩnh viễn mọi field Places chỉ vì API trả về; kiểm tra điều khoản hiện hành.
- Dùng API key riêng cho server-side Places/Routes; API restriction chỉ cho API cần thiết.
- Application restriction phải phù hợp môi trường triển khai. Không dùng HTTP referrer restriction cho Edge Function. IP restriction chỉ dùng khi hạ tầng có egress IP ổn định; nếu không, giữ key server-side, giới hạn API, quotas và giám sát.

## 7. Google Routes API

### Mục đích
- Tính khoảng cách và thời gian giữa các điểm.
- Hỗ trợ xác định thứ tự itinerary và lịch trình.

### Endpoint nội bộ đề xuất

`POST /functions/v1/compute-routes`

Request:
```json
{
  "origin": {
    "latitude": 21.0,
    "longitude": 105.8
  },
  "destinations": [
    {
      "id": "stop-1",
      "latitude": 21.01,
      "longitude": 105.81
    }
  ],
  "travel_mode": "DRIVE",
  "departure_time": "2026-11-10T08:00:00+07:00"
}
```

Backend:
- Validate tọa độ và số lượng waypoint.
- Map mode nội bộ sang mode API thực sự hỗ trợ.
- Chỉ trả ETA/distance khi provider trả kết quả.
- Ghi rõ `travel_mode_used`, `duration_seconds`, `distance_meters`, `fetched_at`.
- Nếu mode yêu cầu không được provider hỗ trợ, trả lỗi có mã rõ ràng hoặc phương án fallback đã được duyệt; không âm thầm dùng mode khác.

### Lưu ý xe máy
UI có thể có lựa chọn xe máy như nhu cầu sản phẩm, nhưng backend chỉ được hiển thị thời gian xe máy khi có provider/dữ liệu thực sự hỗ trợ. Không đổi tên thời gian `DRIVE` thành xe máy. Nếu không hỗ trợ, cần nói rõ và hỏi/chọn fallback minh bạch.

### Route result shape nội bộ
```json
{
  "origin_id": "origin",
  "destination_id": "stop-1",
  "travel_mode_used": "DRIVE",
  "duration_seconds": 900,
  "distance_meters": 4200,
  "fetched_at": "2026-11-10T01:00:00Z",
  "provider": "Google Routes API"
}
```

## 8. AI itinerary service

### Mục đích
AI hỗ trợ diễn giải sở thích, giải thích vì sao một lịch trình phù hợp và viết nội dung thân thiện. AI không được là nguồn dữ liệu thật.

### Endpoint nội bộ
`POST /functions/v1/generate-date-plan`

Input đã validate:
```json
{
  "date": "2026-11-10",
  "start_time": "14:00",
  "end_time": "20:00",
  "budget_minor": 500000,
  "currency": "VND",
  "transport_mode": "two_wheeler",
  "radius_m": 15000,
  "interests": ["cafe", "food", "photography"],
  "origin": {
    "type": "selected_area",
    "opaque_reference": "server-managed-reference"
  }
}
```

Không đưa địa chỉ nhà riêng thô vào input AI. Dùng khu vực/điểm xuất phát đã được giảm độ chính xác hoặc xử lý route riêng ở backend.

### Pipeline bắt buộc
1. Authenticate và authorize user/couple.
2. Validate input và quota.
3. Resolve origin theo privacy policy.
4. Search Places.
5. Lọc kết quả và lấy route data.
6. Tạo candidate set có ID ổn định.
7. Scheduler deterministic kiểm tra giờ, thời lượng, khoảng cách, budget.
8. Gửi AI chỉ candidate set và sở thích tối thiểu.
9. AI chỉ được chọn candidate IDs và trả giải thích/đề xuất thứ tự.
10. Backend validate mọi ID AI trả về thuộc candidate set.
11. Backend tính lại route/time/budget; loại bỏ output không hợp lệ.
12. Trả itinerary cùng warnings và data freshness.

Nếu AI lỗi, có thể dùng deterministic fallback nếu có đủ dữ liệu. Không bịa dữ kiện để lấp chỗ trống.

### Output contract nội bộ
- `stops[]`: candidate IDs hợp lệ, sequence, planned duration, rationale.
- `warnings[]`: thiếu giá/giờ mở cửa/mode route/không đủ địa điểm.
- `summary`: văn bản giải thích, không chứa dữ kiện chưa được xác minh.
- `data_sources[]`: provider và fetched_at.

Validate JSON schema và giới hạn output/token. Không cho model tự gọi tool ngoài allowlist.

## 9. Lưu date plan

`POST /functions/v1/save-date-plan`

Backend:
- Xác thực user và membership.
- Validate toàn bộ stop IDs và thuộc tính.
- Kiểm tra version nếu update.
- Lưu plan + stops trong transaction.
- Không cho client tự gán `created_by`.
- Không lưu raw private address/precise home coordinates vào shared plan.
- Trả record và version mới.

## 10. Memories upload

Luồng:
1. Client xin quyền thư viện/camera.
2. Client yêu cầu signed upload URL hoặc upload theo cơ chế Supabase Storage được cấu hình.
3. Backend xác thực membership và giới hạn file.
4. Upload vào private bucket.
5. Tạo `memories` và `memory_media` metadata.
6. Tạo signed URL ngắn hạn khi user được phép xem.

Kiểm tra:
- MIME type thực tế/allowlist.
- Dung lượng tối đa cấu hình.
- Extension không đáng tin cậy.
- Filename do server tạo, không dùng path tùy ý client.
- Rate limit và quota.
- Xóa object/metadata có thể retry.

## 11. Error contract

Dùng shape thống nhất:
```json
{
  "error": {
    "code": "PLACES_RATE_LIMITED",
    "message": "Hiện chưa thể tìm địa điểm. Vui lòng thử lại sau.",
    "retryable": true,
    "request_id": "opaque-id"
  }
}
```

Không trả stack trace, secret, provider key hoặc raw internal error cho client.

Mã lỗi gợi ý:
- `UNAUTHENTICATED`
- `FORBIDDEN`
- `COUPLE_NOT_FOUND`
- `INVITATION_EXPIRED`
- `VALIDATION_ERROR`
- `PLACES_UNAVAILABLE`
- `PLACES_RATE_LIMITED`
- `ROUTE_MODE_UNSUPPORTED`
- `ROUTES_UNAVAILABLE`
- `AI_UNAVAILABLE`
- `ITINERARY_INFEASIBLE`
- `VERSION_CONFLICT`
- `UPLOAD_TOO_LARGE`
- `STORAGE_UNAVAILABLE`

## 12. Cost control và abuse prevention

- Giới hạn request/user/couple theo thời gian.
- Giới hạn bán kính, số kết quả, số waypoint và kích thước input.
- Dùng field masks để tránh lấy field không cần thiết.
- Cache chỉ khi điều khoản provider cho phép.
- Dùng debounce cho search và tránh gọi API mỗi lần gõ.
- Chỉ gọi Routes sau khi user chọn/đang lập itinerary, không tính mọi cặp địa điểm vô ích.
- Đặt quotas và budget alerts trong Google Cloud; budget alert không phải hard spending cap.
- Theo dõi usage theo endpoint/provider nhưng không log PII.
- Có timeout, retry có backoff và idempotency cho thao tác ghi.
- Không tự động retry vô hạn.
- Có kill switch tạm tắt AI/Places/Routes khi chi phí hoặc lỗi bất thường.

## 13. Observability và privacy

Log:
- Request ID.
- Endpoint/function.
- Latency.
- Provider status/error code.
- Usage/cost counters ở mức aggregate.
- User/couple opaque IDs khi thực sự cần và theo retention policy.

Không log:
- Password, access/refresh token, API key.
- Invitation token.
- Địa chỉ nhà riêng.
- Tọa độ chính xác của nhà.
- Signed storage URLs.
- Ảnh hoặc nội dung cá nhân.
- Prompt chứa PII.

## 14. Test và release checklist

- [ ] Không có server secret trong JS bundle.
- [ ] Edge Function xác thực JWT.
- [ ] RLS và authorization được test với user ngoài couple.
- [ ] API key chỉ được phép gọi API cần thiết.
- [ ] Quota/rate limit hoạt động.
- [ ] Places field masks tối thiểu.
- [ ] Null/missing provider fields hiển thị đúng.
- [ ] Route mode không bị gắn nhãn sai.
- [ ] AI output được validate theo candidate IDs.
- [ ] Scheduler kiểm tra time/budget feasibility.
- [ ] Lỗi provider có error contract thống nhất.
- [ ] Logs không chứa PII/secrets.
- [ ] Privacy policy/consent phù hợp trước khi phát hành.
- [ ] Dev/staging được kiểm tra trước production.

## 15. Tài liệu nhà cung cấp cần kiểm tra khi triển khai

API và điều khoản thay đổi theo thời gian. Trước khi code tích hợp, kiểm tra tài liệu chính thức hiện hành:
- Supabase Auth, Edge Functions, Database RLS, Storage.
- Google Places API (New), field masks, attribution, policies.
- Google Routes API, travel modes, route modifiers, quotas và pricing.
- AI provider API, data retention, privacy, rate limits và pricing.

Không giả định mọi field, travel mode, caching right hoặc giá API vẫn như lần đọc tài liệu trước.
