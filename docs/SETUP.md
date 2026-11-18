# Our Date — Hướng dẫn cài đặt

Tài liệu này dành cho người chưa quen lập trình app. Làm theo đúng thứ tự.

## Bước 1 — Cài công cụ trên máy tính (đã hoàn thành)

Máy tính đang dùng để phát triển đã có sẵn:

- Node.js v22.22.3
- npm v10.9.8
- Git v2.53.0

Không cần cài lại các mục này.

## Bước 2 — Cài đặt thư viện của dự án

Mở terminal tại thư mục dự án (`d:\Game\OurDate`) và chạy:

```bash
npm install
```

Chỉ cần chạy lại lệnh này khi có người báo "đã thêm thư viện mới".

## Bước 3 — Cài Expo Go trên điện thoại

- **Android:** vào Google Play, tìm "Expo Go", cài đặt.
- **iPhone:** vào App Store, tìm "Expo Go", cài đặt.

Không cần tạo tài khoản Expo để dùng Expo Go ở bước xem thử này.

## Bước 4 — Chạy app

Trên máy tính:

```bash
npm run start
```

Terminal sẽ hiện một mã QR.

- **Android:** mở Expo Go → chọn "Scan QR code" → quét mã QR.
- **iPhone:** mở app Camera có sẵn của máy → quét mã QR → chạm vào thông báo
  để mở bằng Expo Go.

Điện thoại và máy tính cần ở cùng mạng Wi-Fi. Nếu không quét được (ví dụ
mạng công ty/mạng khách chặn), chạy:

```bash
npx expo start --tunnel
```

rồi quét lại mã QR mới hiện ra (cách này chậm hơn nhưng không cần cùng mạng).

## Bước 5 — Những gì bạn sẽ thấy ở Milestone 1

- 5 tab: Trang chủ, AI Date, Khám phá, Lịch hẹn, Kỷ niệm.
- Toàn bộ địa điểm/lịch trình hiển thị là **dữ liệu mẫu** (có ghi nhãn rõ
  trong app) — chưa phải địa điểm hay lịch trình thật.
- Nút "Tạo lịch trình" ở tab AI Date hiện thông báo "Sắp ra mắt" vì bộ lập
  lịch trình thật sẽ được nối ở Milestone 6.

## Những thứ CHƯA cần chuẩn bị ở Milestone 1

Bạn **chưa cần** tạo các tài khoản dưới đây. Khi đến đúng milestone, Claude
sẽ hướng dẫn cụ thể từng bước:

| Dịch vụ | Cần ở Milestone | Việc bạn cần làm khi đến lúc |
| --- | --- | --- |
| Supabase (database + đăng nhập) | Milestone 2 | Tạo project miễn phí tại supabase.com, cung cấp Project URL và anon/publishable key |
| Google Cloud (Places/Routes API) | Milestone 4-5 | Tạo project, bật billing (Google yêu cầu thẻ nhưng có gói miễn phí hàng tháng), tạo API key giới hạn phạm vi |
| Nhà cung cấp AI (ví dụ OpenAI) | Milestone 6 | Chọn provider, tạo API key, đặt giới hạn chi phí |
| Apple Developer | Khi cần build thử trên iPhone qua TestFlight hoặc phát hành | Đăng ký tài khoản Apple Developer |

Không có bước nào trong danh sách trên phát sinh chi phí nếu bạn chưa thực
hiện — ứng dụng Milestone 1 chạy hoàn toàn miễn phí bằng Expo Go.

## Milestone 4 — Khám phá địa điểm: đổi từ Google Places sang OpenStreetMap

**Cập nhật 2026-11-18**: Ban đầu dự định dùng Google Places API (xem lịch
sử bên dưới), nhưng Google bắt buộc phải có thẻ tín dụng/ghi nợ để bật
billing, và chủ dự án hiện không có thẻ. Đã xác nhận với chủ dự án qua
AskUserQuestion: **chuyển sang OpenStreetMap (Overpass API)** — miễn phí
hoàn toàn, không cần tài khoản, không cần thẻ, không cần API key.

Đánh đổi đã xác nhận: dữ liệu địa điểm từ OpenStreetMap ít chi tiết hơn
Google — không có rating/review/giờ mở cửa chuẩn hoá cho mọi địa điểm
(một số nơi có tag `opening_hours` nhưng không phải lúc nào cũng có).
Ứng dụng sẽ hiển thị "không có dữ liệu" cho các trường còn thiếu, không
bịa ra số liệu.

**Không cần bạn làm gì thêm cho mục này** — Claude tự gọi được Overpass
API công khai để test, không cần key/billing/tài khoản nào từ bạn.

Nếu sau này muốn chuyển lại dùng Google Places (ví dụ khi có thẻ, hoặc
cần dữ liệu rating/review đầy đủ hơn), hướng dẫn cũ vẫn còn dùng được:

<details>
<summary>Hướng dẫn Google Cloud (lưu lại phòng khi cần dùng sau)</summary>

1. Vào https://console.cloud.google.com, tạo project mới (hoặc dùng
   project có sẵn).
2. Vào **Billing** → liên kết một tài khoản thanh toán (cần thẻ).
3. Vào **Billing → Budgets & alerts**, tạo ngân sách (ví dụ 5-10
   USD/tháng) kèm cảnh báo email khi gần đạt mức đó.
4. Vào **APIs & Services → Library**, tìm và bật **"Places API (New)"**.
5. Vào **APIs & Services → Credentials**, tạo **API key** mới.
6. Giới hạn API key: **"Restrict key"** → chỉ cho phép **Places API
   (New)**; **Application restrictions** chọn **None** (key chạy ở
   server, không phải trình duyệt/app).
7. Đặt key vào `.env` (`GOOGLE_MAPS_SERVER_API_KEY=...`), không gửi qua
   chat.

</details>

## Milestone 4 — cập nhật: gọi OpenStreetMap trực tiếp từ app

**Cập nhật 2026-11-18**: Ban đầu định gọi OpenStreetMap (Nominatim) qua
một Edge Function trên Supabase (đã deploy thử). Nhưng test thật phát
hiện Nominatim từ chối request đến từ hạ tầng server của Supabase (lỗi
403) — họ chặn IP cloud/datacenter theo chính sách chống lạm dụng, dù
cùng request đó chạy bình thường từ máy khác.

**Đã sửa**: app gọi thẳng Nominatim từ điện thoại (không qua server
nữa) — an toàn vì Nominatim không cần API key bí mật nào để bảo vệ.
Edge Function đã deploy có thể xoá đi (không còn dùng) qua Supabase
Dashboard → Edge Functions → xoá function "places-search" nếu muốn dọn
dẹp, không bắt buộc.

**Không cần bạn làm gì thêm** cho mục này.

## Xử lý sự cố thường gặp

- **"Could not connect to development server"**: kiểm tra điện thoại và máy
  tính cùng Wi-Fi, hoặc dùng `npx expo start --tunnel`.
- **Mã QR quét xong không mở được app**: đóng Expo Go, mở lại, quét lại.
- **Màn hình trắng/đứng yên**: trên terminal, nhấn phím `r` để tải lại
  (reload) ứng dụng.
