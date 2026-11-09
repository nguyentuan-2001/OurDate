# Our Date

> Your little world, your next adventure.

Ứng dụng di động dành cho hai người yêu nhau: lập kế hoạch hẹn hò, tìm địa
điểm, tính thời gian di chuyển và đồng bộ lịch trình giữa hai điện thoại.

Tài liệu định hướng sản phẩm đầy đủ: [`OUR_DATE_BLUEPRINT.md`](./OUR_DATE_BLUEPRINT.md).
Trạng thái triển khai hiện tại: [`PROGRESS.md`](./PROGRESS.md).
Quy tắc làm việc dành cho Claude Code: [`CLAUDE.md`](./CLAUDE.md).

## Trạng thái hiện tại

**Milestone 1 — Khởi tạo app và design system.** App chạy được bằng Expo Go,
có điều hướng 5 tab và dữ liệu mẫu (demo). Chưa kết nối Supabase, Google Maps
hoặc AI — các tích hợp này đến ở Milestone 2 trở đi.

## Yêu cầu môi trường

- Node.js 20 trở lên (môi trường phát triển hiện tại dùng Node v22.22.3).
- npm.
- Điện thoại Android hoặc iPhone đã cài ứng dụng **Expo Go** (tải miễn phí
  trên Google Play / App Store), hoặc máy ảo Android/iOS nếu bạn có.
- Máy tính và điện thoại nằm cùng mạng Wi-Fi.

## Cài đặt lần đầu

```bash
npm install
```

## Chạy app bằng Expo Go

```bash
npm run start
```

Lệnh trên mở Expo Dev Tools trong terminal và hiện một mã QR.

- **Android:** mở app Expo Go, chọn "Scan QR code" và quét mã QR hiện trên
  terminal.
- **iPhone:** mở Camera mặc định của iPhone, quét mã QR, rồi chọn mở bằng
  Expo Go khi được hỏi.

App sẽ tự tải và hiển thị trên điện thoại. Nếu điện thoại và máy tính không
cùng mạng Wi-Fi hoặc mạng công ty chặn kết nối, hãy chạy:

```bash
npx expo start --tunnel
```

(chậm hơn nhưng hoạt động qua mạng khác nhau).

## Script khác

| Lệnh | Mục đích |
| --- | --- |
| `npm run lint` | Kiểm tra code style bằng ESLint |
| `npm run typecheck` | Kiểm tra kiểu TypeScript (`tsc --noEmit`) |
| `npm run format` | Tự động format code bằng Prettier |
| `npm run format:check` | Kiểm tra format mà không sửa file |
| `npm test` | Chạy unit test bằng Jest |

## Cấu trúc thư mục

```text
our-date/
├── src/
│   ├── app/              # Màn hình và điều hướng (Expo Router)
│   │   └── (tabs)/       # 5 tab chính: Home, Planner, Explore, Dates, Memories
│   ├── components/ui/    # Component dùng chung: Button, Input, Card, Chip, EmptyState, Loading...
│   ├── theme/            # Màu sắc, typography, spacing dùng chung toàn app
│   ├── constants/        # Dữ liệu mẫu (có ghi nhãn rõ) và danh sách lựa chọn tĩnh
│   └── hooks/            # React hook dùng chung
├── docs/                 # Tài liệu sản phẩm và kỹ thuật
├── OUR_DATE_BLUEPRINT.md # Đặc tả sản phẩm gốc
├── CLAUDE.md             # Quy tắc làm việc cho Claude Code
└── PROGRESS.md           # Trạng thái tiến độ từng milestone
```

## Biến môi trường

Sao chép `.env.example` thành `.env` khi bắt đầu Milestone 2 (chưa cần ở
Milestone 1). Không commit file `.env` thật — xem hướng dẫn trong
`docs/SETUP.md`.

## Dữ liệu mẫu (demo data)

Ở Milestone 1, Home/Explore/Dates/Memories hiển thị dữ liệu mẫu được đánh dấu
rõ bằng nhãn "Dữ liệu mẫu" trong giao diện. Đây không phải địa điểm, lịch
trình hoặc thời gian di chuyển thật — sẽ được thay bằng dữ liệu thật khi kết
nối Supabase (Milestone 2+), Google Places/Routes (Milestone 4-5) và bộ lập
lịch trình (Milestone 6).

## Tài liệu khác

- [`docs/PRODUCT_SPEC.md`](./docs/PRODUCT_SPEC.md) — tóm tắt phạm vi sản phẩm MVP.
- [`docs/TECHNICAL_ARCHITECTURE.md`](./docs/TECHNICAL_ARCHITECTURE.md) — kiến trúc kỹ thuật và các quyết định đã chọn.
- [`docs/SETUP.md`](./docs/SETUP.md) — hướng dẫn cài đặt chi tiết và cách lấy credential cho từng dịch vụ.
