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

## Xử lý sự cố thường gặp

- **"Could not connect to development server"**: kiểm tra điện thoại và máy
  tính cùng Wi-Fi, hoặc dùng `npx expo start --tunnel`.
- **Mã QR quét xong không mở được app**: đóng Expo Go, mở lại, quét lại.
- **Màn hình trắng/đứng yên**: trên terminal, nhấn phím `r` để tải lại
  (reload) ứng dụng.
