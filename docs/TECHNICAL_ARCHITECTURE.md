# Our Date — Kiến trúc kỹ thuật

## 1. Stack đã chọn (Milestone 1)

| Thành phần | Lựa chọn | Phiên bản (tại thời điểm audit 2026-11-09) |
| --- | --- | --- |
| Framework | Expo (managed) | SDK 58 (`expo@~58.0.23`) |
| Ngôn ngữ | TypeScript (strict mode) | `~6.0.3` |
| Điều hướng | Expo Router (file-based) | `~58.0.30` |
| React / React Native | `react@19.3.0`, `react-native@0.88.1` |
| Styling | `StyleSheet` thuần của React Native, không dùng NativeWind/Tailwind | — |
| Icon | `@expo/vector-icons` (Ionicons) | `^15.1.1` |
| Lint | ESLint flat config + `eslint-config-expo/flat` + `eslint-config-prettier` | ESLint `^10` |
| Format | Prettier | `^3.9` |
| Test | Jest + `jest-expo` preset + `@testing-library/react-native` | Jest `^30` |

Lý do chọn các phiên bản trên: đây là phiên bản mới nhất khả dụng trên npm
registry tại thời điểm khởi tạo dự án (kiểm tra bằng `npm view <package>
version`) và là phiên bản mặc định do `create-expo-app@latest` (template
`default`) tạo ra, đã được Expo kiểm chứng tương thích với nhau.

## 2. Các quyết định kỹ thuật và lý do

### 2.1. Route sống trong `src/app/`, không phải `app/` ở thư mục gốc

`OUR_DATE_BLUEPRINT.md` mục 10 đề xuất `app/` ở gốc repo. Tuy nhiên,
`create-expo-app@latest` (bản mới nhất tại thời điểm triển khai) đã chuyển
quy ước mặc định sang `src/app/` để toàn bộ mã nguồn (trừ asset/config) nằm
gọn trong `src/`. Blueprint cho phép điều chỉnh cấu trúc khi có lý do kỹ
thuật hợp lý (mục 10: "Claude được phép điều chỉnh nếu có lý do kỹ thuật").
Quyết định: giữ `src/app/` theo quy ước hiện hành của Expo để khớp với tool
`expo lint`, `expo-doctor` và plugin Claude Code chính thức của Expo.

### 2.2. Không dùng NativeWind/Tailwind

Blueprint cho phép "React Native StyleSheet hoặc một giải pháp styling
tương thích Expo đã được kiểm chứng". Milestone 1 dùng `StyleSheet` thuần để
giảm số dependency và tránh rủi ro tương thích của một bản build NativeWind
mới với Expo SDK 58 (React 19.3 + React Compiler). Có thể xem xét lại nếu
khối lượng style tăng nhiều ở các milestone sau.

### 2.3. Không tải font tuỳ chỉnh

Font hệ thống (San Francisco trên iOS, Roboto trên Android) đã hỗ trợ đầy đủ
dấu tiếng Việt và không cần đóng gói thêm asset. `src/theme/typography.ts`
dùng `Platform.select` để chọn font hệ thống theo nền tảng.

### 2.4. `react-compiler` và `typedRoutes` đang bật (experiments trong `app.json`)

Đây là cấu hình mặc định của template `default` cho SDK 58. Giữ nguyên vì là
khuyến nghị chính thức của Expo cho dự án mới; sẽ tắt nếu phát sinh lỗi
tương thích với thư viện cần dùng sau này (ví dụ một số thư viện bản đồ).

### 2.5. ESLint dùng flat config

ESLint 10 chỉ hỗ trợ flat config (`eslint.config.js`), không còn hỗ trợ
`.eslintrc`. `eslint-config-expo` phiên bản dùng cho SDK 58 export cấu hình
flat tại `eslint-config-expo/flat`. Đã cấu hình thêm
`eslint-config-prettier/flat` để tắt các rule format trùng với Prettier.

### 2.6. Theme token thay vì theme mặc định của template

Template mặc định có bảng màu xanh trung tính riêng cho demo. Đã thay bằng
bảng màu trong blueprint mục 4.1 (`src/theme/colors.ts`), có thêm bộ màu dark
mode tương ứng (blueprint chỉ yêu cầu có dark mode nếu không làm chậm tiến
độ, chưa quy định màu cụ thể — màu dark được chọn giữ tinh thần ấm áp/lãng
mạn tương tự bản sáng).

## 3. Cấu trúc thư mục hiện tại

```text
our-date/
├── src/
│   ├── app/
│   │   ├── _layout.tsx         # Root layout: splash, theme, status bar, gesture handler
│   │   └── (tabs)/
│   │       ├── _layout.tsx     # Bottom tab navigator (5 tab)
│   │       ├── index.tsx       # Home
│   │       ├── planner.tsx     # AI Date (form, chưa nối backend)
│   │       ├── explore.tsx     # Khám phá (lọc client-side trên dữ liệu mẫu)
│   │       ├── dates.tsx       # Lịch hẹn (lọc theo trạng thái)
│   │       └── memories.tsx    # Kỷ niệm
│   ├── components/ui/          # Button, Input, Card, Chip, EmptyState, ErrorState, Loading, Screen, Text
│   ├── theme/                   # colors.ts, typography.ts, spacing.ts, index.ts (navigation theme)
│   ├── constants/mock-data.ts   # Toàn bộ dữ liệu demo, ghi nhãn rõ "Dữ liệu mẫu"
│   └── hooks/                   # use-theme.ts, use-color-scheme.ts
├── docs/                        # Tài liệu này + PRODUCT_SPEC.md + SETUP.md
├── eslint.config.js
├── jest.config.js
├── .prettierrc.json
├── .env.example
└── app.json / package.json / tsconfig.json
```

`src/features/`, `src/lib/`, `src/services/`, `src/store/`, `src/types/`
chưa được tạo vì chưa có logic thật để đặt vào — sẽ tạo khi Milestone 2+ cần
(auth, Supabase client, data fetching, Zustand store nếu cần state toàn cục).
Không tạo thư mục rỗng chỉ để khớp cây thư mục tham khảo.

## 4. Luồng dữ liệu dự kiến (từ Milestone 2 trở đi)

```text
Android App                 iOS App
     |                         |
     +-----------+-------------+
                 |
          Expo / React Native (src/app, src/components, src/theme)
                 |
        Authenticated requests
                 |
        Supabase Auth + RLS
                 |
       Supabase Database (profiles, couples, couple_members, itineraries, ...)
                 |
        Edge Function / API
          |       |       |
       Places   Routes   AI API
          |       |       |
          +-------+-------+
                  |
          Validated itinerary
                  |
            Both devices
```

Milestone 1 chưa triển khai phần dưới `Authenticated requests` — toàn bộ màn
hình hiện tại chỉ đọc `src/constants/mock-data.ts`.

## 5. Bảo mật (áp dụng từ Milestone 2 trở đi, chuẩn bị sẵn quy ước)

- `.env` không commit (đã thêm vào `.gitignore`); `.env.example` chỉ chứa
  placeholder.
- Biến `EXPO_PUBLIC_*` là biến duy nhất được phép đóng gói vào client; mọi
  secret server-side (Google server key, AI key) đặt ở biến không có tiền
  tố này và chỉ dùng trong Supabase Edge Function.
- Không service role key trong app client dưới bất kỳ hình thức nào.

## 6. Việc chưa làm (có chủ đích)

- Chưa có Supabase project/migration/RLS (Milestone 2).
- Chưa có tích hợp Google Places/Routes (Milestone 4-5).
- Chưa có AI provider (Milestone 6).
- Chưa có app icon/splash thương hiệu thật — đang dùng icon placeholder mặc
  định của Expo, màu nền splash đã đổi theo theme (`#FFF9F7`).
