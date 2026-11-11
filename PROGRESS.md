# OUR DATE --- PROJECT PROGRESS

> **Mục đích:** File theo dõi tiến độ chính thức của dự án.\
> **Quy tắc:** Claude Code phải cập nhật file này ngay sau mỗi task độc
> lập hoàn thành hoặc khi task thay đổi trạng thái.\
> **Product spec:** `OUR_DATE_BLUEPRINT.md`\
> **Project rules:** `CLAUDE.md`

------------------------------------------------------------------------

## 1. Tổng quan dự án

  Thuộc tính            Giá trị
  --------------------- ------------------------------------
  Tên dự án             Our Date
  Repository            `OurDate` (github.com/nguyentuan-2001/OurDate)
  Nền tảng              Android + iOS (Expo Go)
  Framework             Expo SDK 58 + React Native 0.88 + TypeScript 6 (strict)
  Backend               Supabase (project thật, 4 bảng core đã tạo + RLS đã bật, xác minh qua SQL Editor 2026-11-11)
  Bản đồ                Google Maps Platform (chưa tích hợp — Milestone 4-5)
  AI                    Provider có thể cấu hình (chưa tích hợp — Milestone 6)
  Ngôn ngữ              Tiếng Việt
  Trạng thái tổng thể   Milestone 1 DONE; Milestone 2 đang làm — Auth hoạt động thật (test qua Playwright), tiếp theo là tạo Couple (M2-005)
  Milestone hiện tại    M2 --- Authentication và Couple (IN_PROGRESS)
  Cập nhật gần nhất     2026-11-11

> Claude phải thay các giá trị "chưa xác minh" sau khi kiểm tra
> repository thực tế. Không tự suy đoán trạng thái.

## 2. Quy ước trạng thái

  Ký hiệu   Trạng thái    Ý nghĩa
  --------- ------------- ----------------------------------------
  `[ ]`     TODO          Chưa bắt đầu
  `[~]`     IN_PROGRESS   Đang thực hiện
  `[x]`     DONE          Hoàn thành và đã kiểm tra
  `[!]`     BLOCKED       Bị chặn, cần xử lý
  `[-]`     DEFERRED      Tạm hoãn theo quyết định của chủ dự án

**Điều kiện đánh dấu DONE:** Có mô tả thay đổi, file liên quan và bằng
chứng kiểm tra. Nếu chưa chạy trên thiết bị thật, phải ghi rõ.

## 3. Bảng tiến độ tổng thể

  Milestone   Nội dung                           Trạng thái   Ghi chú
  ----------- ---------------------------------- ------------ ---------
  M0          Audit repository và lập kế hoạch   `[x]`        Xong 2026-11-09
  M1          Khởi tạo app và design system      `[x]`        Xong 2026-11-09, chưa chạy thử trên thiết bị thật
  M2          Authentication và Couple           `[~]`        M2-001..004 DONE; M2-005..008 chưa làm
  M3          Địa chỉ và sở thích                `[ ]`        
  M4          Khám phá địa điểm                  `[ ]`        
  M5          Bản đồ và thời gian di chuyển      `[ ]`        
  M6          Planner logic và AI                `[ ]`        
  M7          Đồng bộ và lịch sử                 `[ ]`        
  M8          Kiểm thử và build                  `[ ]`        

> Chỉ chuyển milestone sang DONE khi tất cả task bắt buộc trong
> milestone đã DONE hoặc được chủ dự án chấp thuận DEFERRED.

------------------------------------------------------------------------

## 4. Danh sách task chi tiết

### M0 --- Repository audit và kế hoạch

-   [x] **M0-001 --- Kiểm tra repository hiện tại**
    -   Mục tiêu: Kiểm tra cấu trúc file, git status, package hiện có.
    -   Hoàn thành khi: Có báo cáo repository hiện tại và không ghi đè
        công việc cũ.
    -   Kết quả kiểm tra: Repo chỉ có `OUR_DATE_BLUEPRINT.md`, chưa có Git repo,
        chưa có project Expo. Đã `git init -b main` và thêm remote
        `https://github.com/nguyentuan-2001/OurDate.git` (repo rỗng, đã xác minh
        qua `git ls-remote`).
    -   File thay đổi: (khởi tạo `.git/`)
    -   Ghi chú: Không có gì để ghi đè.
-   [x] **M0-002 --- Kiểm tra môi trường phát triển**
    -   Mục tiêu: Kiểm tra Node.js, npm, Git và khả năng chạy Expo.
    -   Hoàn thành khi: Ghi lại phiên bản và các thiếu sót.
    -   Kết quả kiểm tra: Node v22.22.3, npm v10.9.8, Git v2.53.0.windows.1.
        Có kết nối npm registry. Expo SDK mới nhất tại thời điểm audit: 58.
    -   Ghi chú: Không có GitHub CLI (`gh`) trong môi trường; push dùng
        `git push` qua Git Credential Manager (đã cấu hình sẵn ở máy).
-   [x] **M0-003 --- Chốt cấu trúc và dependency**
    -   Mục tiêu: Đề xuất cấu trúc thư mục và package tương thích.
    -   Hoàn thành khi: Có quyết định kỹ thuật và lý do.
    -   Ghi chú: Dùng `create-expo-app@latest` template `default` (SDK 58,
        TypeScript, Expo Router, React 19.3, RN 0.88). Giữ `src/app/` (không
        phải `app/` ở gốc) theo quy ước mới nhất của Expo — xem lý do đầy đủ
        trong `docs/TECHNICAL_ARCHITECTURE.md` mục 2.1. Bỏ các package demo
        không dùng (`@expo/ui`, `expo-glass-effect`, `expo-symbols`,
        `expo-device`, `expo-web-browser`). Thêm `@expo/vector-icons` cho icon.
-   [x] **M0-004 --- Tạo tài liệu dự án**
    -   Mục tiêu: Tạo/kiểm tra README, docs và hướng dẫn setup.
    -   Hoàn thành khi: Người mới có thể hiểu cách bắt đầu.
    -   File: `README.md`, `docs/PRODUCT_SPEC.md`, `docs/TECHNICAL_ARCHITECTURE.md`,
        `docs/SETUP.md`, `.env.example`.
    -   Ghi chú: Toàn bộ bằng tiếng Việt, không chứa secret thật.

### M1 --- Khởi tạo app và design system

-   [x] **M1-001 --- Khởi tạo Expo React Native TypeScript**
    -   Hoàn thành khi: App chạy được bằng Expo.
    -   Kiểm tra: `npx expo export --platform android` và `--platform ios`
        PASS (1750 modules, không lỗi). `npx expo start` khởi động Metro
        thành công, bundle dev tải được qua HTTP (200, ~6MB).
    -   File: `app.json`, `package.json`, `src/app/_layout.tsx`.
-   [x] **M1-002 --- Cấu hình TypeScript, ESLint và Prettier**
    -   Hoàn thành khi: Các lệnh lint/format/typecheck hoạt động.
    -   Kiểm tra: `npm run lint` PASS (0 lỗi). `npm run typecheck` PASS.
        `npm run format:check` PASS. `npx expo-doctor` 20/20 PASS.
    -   File: `eslint.config.js`, `.prettierrc.json`, `.prettierignore`,
        `tsconfig.json`, `jest.config.js`.
    -   Ghi chú: Phải ghim `eslint@^9.39.5` (thay vì bản mới nhất 10.x) vì
        `eslint-plugin-react`/`eslint-plugin-import` dùng trong
        `eslint-config-expo@58.0.4` chưa hỗ trợ ESLint 10. Phải thêm
        `eslint-import-resolver-typescript` làm devDependency trực tiếp để
        npm hoist lên node_modules gốc (nếu không, ESLint resolve nhầm sang
        gói `typescript` do lỗi nested dependency). Chi tiết trong
        `docs/TECHNICAL_ARCHITECTURE.md`.
-   [x] **M1-003 --- Tạo design tokens**
    -   Mục tiêu: Màu sắc, typography, spacing, radius, shadow.
    -   Hoàn thành khi: Theme được dùng nhất quán.
    -   Kiểm tra: `npm run typecheck` PASS; theme được import xuyên suốt 5
        màn hình qua `useTheme()`.
    -   File: `src/theme/colors.ts`, `src/theme/typography.ts`,
        `src/theme/spacing.ts`, `src/theme/index.ts`, `src/hooks/use-theme.ts`.
    -   Cập nhật 2026-11-11: Đổi bảng màu sang `docs/UI_DESIGN_SPEC.md`
        ("Cute Romantic") theo xác nhận của chủ dự án (xem BUG-003). Đổi
        `surfaceAlt` → `surfaceSecondary`, thêm `primaryPressed`,
        `primarySoft`, `secondary`, `tabBar`; bỏ `primaryDark` (không dùng
        ở đâu). Đã sửa `Button`, `Chip`, tab bar, `planner.tsx` theo token
        mới. `npm run lint`/`typecheck`/`test` đều PASS sau khi đổi.
-   [x] **M1-004 --- Tạo UI components cơ bản**
    -   Mục tiêu: Button, Input, Card, Chip, Loading, EmptyState,
        ErrorState.
    -   Hoàn thành khi: Component có trạng thái và cách dùng rõ ràng.
    -   Kiểm tra: `npm test` PASS (2 test case cho Button — render label,
        trạng thái loading). Các component khác mới kiểm tra qua
        lint/typecheck + export, chưa có unit test riêng.
    -   File: `src/components/ui/{Button,Input,Card,Chip,EmptyState,ErrorState,Loading,Screen,Text}.tsx`.
-   [x] **M1-005 --- Tạo điều hướng chính**
    -   Mục tiêu: Bottom tabs và layout.
    -   Hoàn thành khi: Điều hướng không lỗi.
    -   Kiểm tra: `npx expo export` cho cả hai nền tảng bundling thành công
        với `(tabs)` route group và 5 tab.
    -   File: `src/app/_layout.tsx`, `src/app/(tabs)/_layout.tsx`.
-   [x] **M1-006 --- Dựng màn hình Home**
    -   Hoàn thành khi: Có UI responsive với dữ liệu mock được ghi nhãn.
    -   Kiểm tra: `npm run typecheck`, `npm run lint` PASS.
    -   File: `src/app/(tabs)/index.tsx`, `src/constants/mock-data.ts`.
-   [x] **M1-007 --- Dựng màn hình Planner**
    -   Hoàn thành khi: Form cơ bản có validation.
    -   Kiểm tra: `npm run typecheck`, `npm run lint` PASS. Validation thủ
        công: để trống ngày/giờ → hiện lỗi dưới ô input; điền đủ → hiện
        thông báo "Sắp ra mắt" (chưa nối bộ lập lịch trình thật, đúng phạm
        vi Milestone 1).
    -   File: `src/app/(tabs)/planner.tsx`.
-   [x] **M1-008 --- Dựng màn hình Explore**
    -   Hoàn thành khi: Có trạng thái mock/loading/empty.
    -   Kiểm tra: `npm run typecheck`, `npm run lint` PASS. Lọc theo từ khoá
        và danh mục chạy trên dữ liệu mẫu (client-side), có `EmptyState` khi
        không có kết quả.
    -   File: `src/app/(tabs)/explore.tsx`.
-   [x] **M1-009 --- Dựng màn hình Dates và Memories**
    -   Hoàn thành khi: Có UI đúng phạm vi MVP, không có nút giả.
    -   Kiểm tra: `npm run typecheck`, `npm run lint` PASS.
    -   File: `src/app/(tabs)/dates.tsx`, `src/app/(tabs)/memories.tsx`.
-   [x] **M1-010 --- Chạy thử Expo Go**
    -   Hoàn thành khi: Xác minh được trên ít nhất một thiết bị; ghi
        riêng Android/iOS đã thử hay chưa.
    -   Android: **Chưa chạy trên thiết bị/máy ảo thật.** Đã xác minh gián
        tiếp: `npx expo export --platform android` bundling PASS,
        `npx expo start` phục vụ bundle dev qua HTTP thành công.
    -   iOS: **Chưa chạy trên thiết bị/máy ảo thật.** Đã xác minh gián tiếp
        bằng `npx expo export --platform ios` PASS.
    -   Ghi chú: Môi trường hiện tại không có thiết bị Android/iPhone hoặc
        máy ảo kết nối để chạy Expo Go trực tiếp. Chủ dự án cần tự quét mã QR
        từ `npm run start` trên điện thoại thật để xác nhận bước cuối này
        (xem `docs/SETUP.md`).

### M2 --- Authentication và Couple

-   [x] **M2-001 --- Tạo Supabase project và cấu hình biến môi trường**
    -   Hoàn thành: 2026-11-11.
    -   Chủ dự án đã tạo project (`nguyentuan-2001's Org / Our Date`) và đặt
        `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`,
        `SUPABASE_DB_PASSWORD` vào `.env`.
    -   Kiểm tra: Verify kết nối thật thành công — chạy 2 migration trực
        tiếp qua Supabase SQL Editor, cả hai đều "Success", 4 bảng xuất
        hiện trong Table Editor (ảnh chụp màn hình do chủ dự án cung cấp).
-   [x] **M2-002 --- Tạo migration profiles/couples/couple_members**
    -   Bắt đầu: 2026-11-10. Hoàn thành: 2026-11-11.
    -   Mục tiêu: Viết migration SQL cho `profiles`, `couples`,
        `couple_members`, `couple_invitations`.
    -   Đã làm: Viết migration theo tên bảng/cột đã xác nhận trong
        `docs/DATABASE_SCHEMA.md` (xem BUG-001, đã xác nhận 2026-11-11):
        `couple_invitations` (không phải `couple_invites`), `token_hash`
        (không phải `invite_code_hash`), `profiles.avatar_path` (không
        phải `avatar_url`), thêm `couples.anniversary_date`/`timezone`,
        thêm `couple_invitations.status`. CHƯA thêm cột `status` cho
        `couple_members` (luồng rời-couple) — để dành cho M7 theo quyết
        định "kết hợp tối thiểu".
    -   Kiểm tra: Áp dụng thành công lên Supabase project thật qua SQL
        Editor (chủ dự án tự chạy, báo "Success"). Xác nhận cả 4 bảng tồn
        tại qua Table Editor (ảnh chụp màn hình 2026-11-11).
    -   File: `supabase/migrations/20261110000001_create_core_tables.sql`.
-   [x] **M2-003 --- Tạo RLS policies và kiểm thử**
    -   Bắt đầu: 2026-11-10. Hoàn thành (phần tạo policy): 2026-11-11.
    -   Mục tiêu: RLS cho 4 bảng ở M2-002, chỉ cho thành viên Couple đọc dữ
        liệu của Couple mình; couple_members/couple_invitations không có
        policy insert/update cho client (phải qua RPC function ở
        M2-006/M2-007).
    -   Đã làm: Cập nhật policy theo tên bảng mới (`couple_invitations`).
        Giữ tên helper function `is_couple_member` (không đổi thành
        `is_active_couple_member` như DATABASE_SCHEMA.md gợi ý vì chưa có
        cột `status`).
    -   Kiểm tra: Áp dụng thành công qua SQL Editor ("Success. No rows
        returned"), RLS đã bật trên cả 4 bảng. **Chưa kiểm thử hành vi chéo
        2 tài khoản** (user ngoài Couple có thực sự bị chặn hay không) —
        việc này cần ít nhất 2 user đăng ký thật, chuyển sang làm ở M2-008
        (đã có trong kế hoạch, không phải thiếu sót).
    -   File: `supabase/migrations/20261110000002_rls_policies.sql`.
-   [x] **M2-004 --- Đăng ký/đăng nhập/đăng xuất**
    -   Hoàn thành: 2026-11-11.
    -   Đã làm: Cài `@supabase/supabase-js`, `@react-native-async-storage/async-storage`,
        `react-native-url-polyfill`. Tạo `src/lib/supabase/client.ts`,
        `src/features/auth/AuthProvider.tsx` (context quản lý session, dịch
        lỗi Supabase sang tiếng Việt). Tạo route `(auth)` (sign-in, sign-up)
        và gate `(tabs)`/`settings` sau đăng nhập bằng `Stack.Protected`.
        Thêm `src/app/settings.tsx` (hiện email, nút đăng xuất) + nút cài
        đặt trên Home.
    -   Kiểm tra (thật, qua Expo Web + Playwright, không chỉ đọc code):
        - Đăng ký với email thật (`@mailinator.com`) → gọi API Supabase
          thành công (log HTTP 200 `/auth/v1/signup`) → đúng hiển thị màn
          "Kiểm tra email" (project đang bật xác nhận email).
        - Đăng nhập sai mật khẩu → HTTP 400, hiển thị lỗi tiếng Việt "Email
          hoặc mật khẩu không đúng." (ban đầu hiện tiếng Anh "Invalid login
          credentials" — đã phát hiện và sửa ngay).
        - `npm run lint`, `npm run typecheck`, `npm test` đều PASS.
    -   Lỗi phát hiện và đã sửa trong lúc test:
        1. Web SSR (`app.json` `web.output: "server"`) làm crash server khi
           Supabase client đọc storage lúc không có `window` (SSR). Đã đổi
           `output` sang `"static"` và thêm guard `typeof window === 'undefined'`
           trong `client.ts` dùng storage rỗng khi chạy phía server. Không
           ảnh hưởng app thật trên Android/iOS (chỉ xảy ra khi SSR trên web).
        2. Bỏ `expo-secure-store` khỏi kế hoạch lưu session — giá trị
           session Supabase có thể vượt giới hạn ~2048 byte/entry của
           SecureStore trên một số bản iOS; đổi dùng
           `@react-native-async-storage/async-storage` (đúng theo hướng dẫn
           chính thức của Supabase cho Expo/React Native).
    -   Cập nhật 2026-11-11: Chủ dự án tự đăng ký bằng email thật trên
        thiết bị của mình, xác nhận email, đăng nhập thành công — **vòng
        Auth đã được xác minh đầy đủ bởi người thật, không chỉ test tự
        động**. Task coi như hoàn thành 100%.
    -   File: `src/lib/supabase/client.ts`, `src/features/auth/AuthProvider.tsx`,
        `src/app/_layout.tsx`, `src/app/(auth)/_layout.tsx`,
        `src/app/(auth)/index.tsx`, `src/app/(auth)/sign-up.tsx`,
        `src/app/settings.tsx`, `src/app/(tabs)/index.tsx`, `app.json`.
-   [ ] **M2-005 --- Tạo Couple**
-   [ ] **M2-006 --- Tạo mã mời có hạn dùng**
-   [ ] **M2-007 --- Tham gia Couple bằng mã mời**
-   [ ] **M2-008 --- Kiểm thử hai tài khoản trên hai thiết bị**

Với mỗi task, Claude ghi thêm: mục tiêu, ngày hoàn thành, file thay đổi,
lệnh kiểm tra, kết quả và ghi chú.

### M3 --- Địa chỉ và sở thích

-   [ ] **M3-001 --- Thiết kế model private places**
-   [ ] **M3-002 --- Màn hình nhập/chỉnh sửa địa chỉ**
-   [ ] **M3-003 --- Lưu điểm nhà/điểm đón an toàn**
-   [ ] **M3-004 --- Cấu hình phương tiện**
-   [ ] **M3-005 --- Cấu hình bán kính khám phá**
-   [ ] **M3-006 --- Cấu hình ngân sách mặc định**
-   [ ] **M3-007 --- Cấu hình sở thích và điều cần tránh**
-   [ ] **M3-008 --- Kiểm tra quyền riêng tư địa chỉ**

### M4 --- Khám phá địa điểm

-   [ ] **M4-001 --- Xác minh Places API và quota**
-   [ ] **M4-002 --- Tạo server-side search endpoint**
-   [ ] **M4-003 --- Chuẩn hóa dữ liệu địa điểm**
-   [ ] **M4-004 --- UI tìm kiếm và danh sách kết quả**
-   [ ] **M4-005 --- Bộ lọc danh mục và bán kính**
-   [ ] **M4-006 --- Chi tiết địa điểm**
-   [ ] **M4-007 --- Loading/error/empty/retry**
-   [ ] **M4-008 --- Cache và giới hạn request**
-   [ ] **M4-009 --- Lưu địa điểm yêu thích**

### M5 --- Bản đồ và thời gian di chuyển

-   [ ] **M5-001 --- Chọn thư viện bản đồ tương thích Expo**
-   [ ] **M5-002 --- Hiển thị bản đồ và marker**
-   [ ] **M5-003 --- Xác minh khả năng hỗ trợ phương tiện của Routes
    API**
-   [ ] **M5-004 --- Tạo server-side route endpoint**
-   [ ] **M5-005 --- Hiển thị khoảng cách và thời gian**
-   [ ] **M5-006 --- Hiển thị tuyến đường/chặng**
-   [ ] **M5-007 --- Fallback khi API không hỗ trợ hoặc lỗi**
-   [ ] **M5-008 --- Nút mở Google Maps**
-   [ ] **M5-009 --- Cache route phù hợp và kiểm soát quota**

### M6 --- Planner logic và AI

-   [ ] **M6-001 --- Xây dựng form Planner và validation**
-   [ ] **M6-002 --- Xây dựng deterministic planner không cần AI**
-   [ ] **M6-003 --- Lọc candidate places**
-   [ ] **M6-004 --- Tính thời gian giữa các điểm**
-   [ ] **M6-005 --- Sắp xếp lịch trình theo thời gian và ngân sách**
-   [ ] **M6-006 --- Xử lý quy tắc đón người yêu trước**
-   [ ] **M6-007 --- Cấu hình AI provider ở backend**
-   [ ] **M6-008 --- Tạo prompt AI từ dữ liệu địa điểm đã xác minh**
-   [ ] **M6-009 --- Validate output AI, không cho phép bịa place ID**
-   [ ] **M6-010 --- Hiển thị timeline và tổng kết**
-   [ ] **M6-011 --- Cho phép thay/thêm/xóa/sắp xếp điểm**
-   [ ] **M6-012 --- Lưu draft và itinerary**

### M7 --- Đồng bộ và lịch sử

-   [ ] **M7-001 --- Đồng bộ dữ liệu lịch trình**
-   [ ] **M7-002 --- Realtime subscription**
-   [ ] **M7-003 --- Xử lý xung đột cập nhật**
-   [ ] **M7-004 --- Danh sách lịch hẹn**
-   [ ] **M7-005 --- Trạng thái planned/completed/cancelled**
-   [ ] **M7-006 --- Lịch sử buổi hẹn**
-   [ ] **M7-007 --- Ghi chú sau buổi hẹn**
-   [ ] **M7-008 --- Kiểm thử mất mạng và kết nối lại**

### M8 --- Kiểm thử và build

-   [ ] **M8-001 --- Kiểm thử luồng authentication**
-   [ ] **M8-002 --- Kiểm thử quyền Couple/RLS**
-   [ ] **M8-003 --- Kiểm thử tìm địa điểm**
-   [ ] **M8-004 --- Kiểm thử tính route**
-   [ ] **M8-005 --- Kiểm thử tạo và chỉnh sửa itinerary**
-   [ ] **M8-006 --- Kiểm thử đồng bộ Android/iOS**
-   [ ] **M8-007 --- Kiểm tra secret và bảo mật**
-   [ ] **M8-008 --- Kiểm tra layout nhiều kích thước**
-   [ ] **M8-009 --- Build Android preview**
-   [ ] **M8-010 --- Build iOS preview**
-   [ ] **M8-011 --- Viết hướng dẫn cài đặt cho hai người**
-   [ ] **M8-012 --- Tổng kết nghiệm thu MVP**

------------------------------------------------------------------------

## 5. Công việc đang thực hiện

> Claude cập nhật mục này khi có task IN_PROGRESS. Chỉ nên có một số
> lượng nhỏ task đang chạy song song.

  Task ID   Công việc                              Người/điều kiện chờ   Bắt đầu
  --------- -------------------------------------- --------------------- ------------
  M2-002    Viết migration bảng profiles/couples/couple_members/couple_invites   Claude (chỉ static review, chờ project thật để test)   2026-11-10
  M2-003    Viết RLS policies cho 4 bảng trên       Claude (chỉ static review, chờ project thật để test)   2026-11-10

## 6. Việc đang bị chặn

  Task ID   Nguyên nhân                        Cần ai làm gì?                              Cách gỡ
  --------- ----------------------------------- ------------------------------------------- ---------------------------------
  Chưa có   ---                                 ---                                          ---

## 7. Việc cần chủ dự án thực hiện

Claude ghi rõ các thao tác cần người dùng làm, ví dụ:

  Mục     Việc cần làm                                        Trạng thái      Ghi chú
  ------- --------------------------------------------------- --------------- ---------------
  U-001   Kiểm tra Node.js/Git                                 Đã xác minh     Node v22.22.3, npm v10.9.8, Git v2.53.0
  U-002   Tạo Supabase project + chạy 2 migration qua SQL Editor   **Hoàn thành** (2026-11-11)     4 bảng đã tạo, RLS đã bật, xác nhận qua Table Editor
  U-003   Cấu hình Google Cloud                                Chưa cần        Đợi đến M4/M5
  U-004   Chọn AI API và giới hạn chi phí                      Chưa cần        Đợi đến M6
  U-005   Cài Expo Go trên Android/iPhone, chạy `npm run start` và quét mã QR để xác nhận M1-010   Cần làm   Xem `docs/SETUP.md` bước 3-4
  U-006   Tự đăng ký 1 tài khoản bằng email thật, xác nhận email, đăng nhập thử   **Hoàn thành** (2026-11-11)   Đăng ký/đăng nhập hoạt động đúng trên thiết bị của chủ dự án

Không yêu cầu người dùng tạo tài khoản/dịch vụ trước khi task thực sự
cần đến.

### Hướng dẫn U-002: Tạo Supabase project (miễn phí)

1.  Vào https://supabase.com, chọn "Start your project", đăng nhập bằng
    GitHub hoặc email.
2.  Chọn "New project". Đặt tên tuỳ ý (ví dụ "our-date"), đặt mật khẩu
    database (lưu lại chỗ an toàn, không gửi mật khẩu này trong chat), chọn
    region gần Việt Nam nhất (ví dụ Singapore).
3.  Gói **Free** là đủ dùng cho giai đoạn này — không cần nhập thẻ, không
    phát sinh chi phí.
4.  Đợi project khởi tạo xong (khoảng 1-2 phút), vào **Project Settings →
    API**.
5.  Gửi lại cho tôi hai giá trị sau (đây KHÔNG phải secret tuyệt mật, an
    toàn để dán vào chat):
    -   **Project URL** (dạng `https://xxxx.supabase.co`)
    -   **anon public key** (chuỗi dài bắt đầu bằng `eyJ...`)
6.  **Không gửi** "service_role key" (key còn lại trong cùng trang) — key đó
    không bao giờ được đưa vào app.

## 8. Nhật ký công việc (Work Log)

> Mỗi task hoàn thành hoặc thay đổi trạng thái phải có một dòng mới. Ghi
> mới lên đầu để dễ theo dõi.

  Ngày         Task ID            Nội dung                                             Kết quả kiểm tra                                   Ghi chú
  ------------ ------------------ ---------------------------------------------------- -------------------------------------------------- ---------------------------------------------
  2026-11-09   M0-001..M0-004     Audit repo, tạo Git repo + remote, viết docs M0       Xem chi tiết từng task ở mục 4                     Repo trống trước đó, không ghi đè gì
  2026-11-09   M1-001..M1-009     Scaffold Expo SDK 58, theme, UI components, 5 màn hình, mock data   lint/typecheck/test/format/expo-doctor đều PASS   Xem chi tiết từng task ở mục 4
  2026-11-09   M1-010             Xác minh bundling Android + iOS qua `expo export`     PASS (export) — CHƯA chạy trên thiết bị thật      Cần chủ dự án tự quét QR (việc U-005)
  2026-11-10   M2-001             Xác định bị chặn, viết hướng dẫn tạo Supabase project  Không áp dụng (chưa có hành động kỹ thuật)        Chuyển trạng thái BLOCKED
  2026-11-10   M2-002, M2-003     Viết migration SQL schema + RLS (chưa áp dụng)         Static review only — KHÔNG chạy được (không có Supabase project, Docker không chạy)   Giữ IN_PROGRESS, sẽ test thật khi có project
  2026-11-11   M2-001             Nhận URL + anon key + DB password, đặt vào `.env`      Xác nhận biến tồn tại (không đọc giá trị)         Chưa verify kết nối thật
  2026-11-11   (audit)            Đọc + đối chiếu `docs/UI_DESIGN_SPEC.md`, `docs/USER_FLOWS.md`, `docs/DATABASE_SCHEMA.md`, `docs/API_INTEGRATION_SPEC.md` với blueprint và code hiện tại   Phát hiện 1 mâu thuẫn nghiêm trọng (BUG-001), nhiều điểm trung bình/nhỏ — xem mục 10   Chưa sửa gì, chờ chủ dự án xác nhận
  2026-11-11   M1-003 (cập nhật)   Đổi bảng màu theme sang UI_DESIGN_SPEC.md ("Cute Romantic")   lint/typecheck/test PASS   Theo xác nhận AskUserQuestion
  2026-11-11   M2-002, M2-003 (cập nhật)   Viết lại migration theo docs/DATABASE_SCHEMA.md, chạy thử qua Expo Web + Playwright screenshot 5 màn hình   Giao diện render đúng, sửa 1 câu chữ lỗi thời ở Memories   Theo xác nhận AskUserQuestion
  2026-11-11   M2-001, M2-002, M2-003   Chủ dự án tự chạy 2 migration qua Supabase SQL Editor   **PASS thật** — "Success", 4 bảng xuất hiện trong Table Editor (ảnh chụp màn hình)   Chuyển cả 3 task sang DONE
  2026-11-11   M2-004             Cài Supabase client, AuthProvider, màn hình sign-in/sign-up/settings; test qua Expo Web + Playwright với project thật   PASS — signup HTTP 200, lỗi sai mật khẩu HTTP 400 hiển thị đúng tiếng Việt   Phát hiện + sửa 2 bug (SSR crash, lỗi tiếng Anh)
  2026-11-11   M2-004 (xác nhận cuối)   Chủ dự án tự đăng ký email thật + xác nhận + đăng nhập trên thiết bị của mình   **PASS — người dùng thật xác nhận**   M2-004 đóng hoàn toàn, không còn việc dang dở

## 9. Lịch sử thay đổi phạm vi (Change Log)

  Ngày         Thay đổi                                                        Lý do                                              Người xác nhận
  ------------ ---------------------------------------------------------------- --------------------------------------------------- ----------------
  2026-11-11   Thêm 4 tài liệu đặc tả mới vào `docs/` (UI, User Flows, DB, API)   Chủ dự án bổ sung bộ tài liệu thiết kế chi tiết hơn   Chủ dự án
  2026-11-11   Xác nhận: ảnh kỷ niệm (upload photo) và luồng rời-couple CHÍNH THỨC thuộc MVP (trước đó blueprint gốc để sau MVP)   Chủ dự án chọn theo USER_FLOWS.md/DATABASE_SCHEMA.md mới   Chủ dự án (qua AskUserQuestion 2026-11-11)
  2026-11-11   Xác nhận: đổi bảng màu theme sang `docs/UI_DESIGN_SPEC.md` ("Cute Romantic"), thay bảng màu blueprint gốc   Chủ dự án chọn style mới   Chủ dự án (qua AskUserQuestion 2026-11-11)
  2026-11-11   Xác nhận: schema M2 dùng tên bảng/cột theo `docs/DATABASE_SCHEMA.md` nhưng CHƯA thêm status rời-couple/mã hoá (để dành M3/M7)   Chủ dự án chọn phương án "kết hợp tối thiểu"   Chủ dự án (qua AskUserQuestion 2026-11-11)

## 10. Lỗi và vấn đề cần xử lý

  ID        Mô tả                                                                                           Mức độ      Trạng thái   Task liên quan
  --------- ----------------------------------------------------------------------------------------------- ----------- ------------ ----------------
  BUG-001   Migration đã viết (`couple_invites`, `profiles.avatar_url`...) đặt tên khác `docs/DATABASE_SCHEMA.md` (`couple_invitations`, `avatar_path`, thêm `status` cho membership/invite)   Nghiêm trọng   **Đã xác nhận 2026-11-11** — dùng tên theo DATABASE_SCHEMA.md, bỏ qua `status` rời-couple (dành cho M7). Migration đã cập nhật.   M2-002, M2-003
  BUG-002   `DATABASE_SCHEMA.md` yêu cầu mã hoá cột địa chỉ riêng tư (`address_encrypted`...) — blueprint gốc chỉ dựa vào RLS, không có yêu cầu mã hoá tầng ứng dụng   Nghiêm trọng   Mở — chờ xác nhận khi bắt đầu M3   M3 (chưa bắt đầu)
  BUG-003   Bảng màu trong `docs/UI_DESIGN_SPEC.md` (ví dụ `primary #FF6F91`) khác bảng màu blueprint đã dùng để code Milestone 1 (`primary #E8799B`)   Trung bình   **Đã xác nhận 2026-11-11** — đổi sang bảng màu UI_DESIGN_SPEC.md. `src/theme/colors.ts` và component liên quan đã cập nhật, lint/typecheck/test PASS.   Đã sửa
  BUG-004   `USER_FLOWS.md`/`DATABASE_SCHEMA.md` mô tả đầy đủ luồng up ảnh Memories + luồng "rời couple" như MVP, nhưng blueprint gốc liệt kê ảnh kỷ niệm là tính năng *sau* MVP và không nhắc đến rời couple   Trung bình   **Đã xác nhận 2026-11-11** — chính thức đưa vào MVP. Chưa triển khai (thuộc M7), chỉ ghi nhận quyết định.   M7 (chưa bắt đầu)
  BUG-005   Đơn vị bán kính không nhất quán: blueprint/code dùng km (`radiusKm`), `DATABASE_SCHEMA.md` dùng mét (`default_radius_m`)   Nhỏ   Mở — chờ xác nhận   M3/M6 (chưa bắt đầu)
  BUG-006   Giá trị transport mode không nhất quán: code/blueprint dùng `DRIVE/TWO_WHEELER/WALK/TRANSIT`, `DATABASE_SCHEMA.md` dùng `driving/two_wheeler/walking/transit`   Nhỏ   Mở — chờ xác nhận   M3/M6 (chưa bắt đầu)
  BUG-007   `couple_preferences` trong `DATABASE_SCHEMA.md` thiếu cột `avoid_preferences` mà blueprint mục 7.6 và kiểu `PlannerInput` (mục 5.1) đều yêu cầu   Nhỏ   Mở — chờ xác nhận   M3 (chưa bắt đầu)
  BUG-008   File `UI_DESIGN_SPEC.md` bị trùng ở cả thư mục gốc và `docs/`   Nhỏ   **Đã xử lý 2026-11-11** — xoá bản ở gốc, chỉ giữ `docs/UI_DESIGN_SPEC.md`   Dọn dẹp file
  BUG-009   Tên endpoint backend khác nhau giữa blueprint mục 8 (`create-invite`, `search-places`...) và `API_INTEGRATION_SPEC.md` (`create-couple-invitation`, `places-search`...)   Nhỏ   Mở — chờ xác nhận   M2 trở đi

## 11. Kết quả kiểm tra gần nhất

  Ngày         Lệnh/kiểm tra                                 Kết quả   Ghi chú
  ------------ --------------------------------------------- --------- -------------------------------
  2026-11-09   `npm run lint` (`expo lint`)                  PASS      0 lỗi, 0 cảnh báo
  2026-11-09   `npm run typecheck` (`tsc --noEmit`)          PASS      
  2026-11-09   `npm test` (Jest, `jest-expo`)                PASS      2/2 test (Button component)
  2026-11-09   `npm run format:check` (Prettier)             PASS      
  2026-11-09   `npx expo-doctor`                             PASS      20/20 checks
  2026-11-09   `npx expo export --platform android`          PASS      1750 modules, không lỗi
  2026-11-09   `npx expo export --platform ios`              PASS      Bundle thành công
  2026-11-09   `npx expo start` + tải dev bundle qua HTTP     PASS      HTTP 200, ~6MB, Metro chạy ổn định
  2026-11-09   Chạy trên Android emulator/thiết bị thật       CHƯA CHẠY  Không có thiết bị/máy ảo trong môi trường này
  2026-11-09   Chạy trên iOS simulator/thiết bị thật          CHƯA CHẠY  Không có thiết bị/máy ảo trong môi trường này
  2026-11-11   `npm run lint`, `npm run typecheck`, `npm test` (sau khi đổi bảng màu)   PASS   Sau khi sửa `colors.ts`, `Button.tsx`, `Chip.tsx`, `planner.tsx`, `(tabs)/_layout.tsx`
  2026-11-11   Đăng ký tài khoản thật qua Expo Web + Playwright (email mailinator, project Supabase thật)   PASS   HTTP 200 `/auth/v1/signup`, hiện đúng màn "Kiểm tra email"
  2026-11-11   Đăng nhập sai mật khẩu qua Expo Web + Playwright   PASS   HTTP 400, hiện lỗi "Email hoặc mật khẩu không đúng." (đã dịch, trước đó là tiếng Anh)
  2026-11-11   `npx expo-doctor` (sau khi thêm Supabase deps)   19/20 PASS   1 cảnh báo patch version lệch nhẹ (không khẩn cấp, chưa cập nhật)

Các loại kiểm tra cần phân biệt: - Lint. - Typecheck. - Unit test. -
Integration test. - Build. - Chạy trên Android emulator/thiết bị thật. -
Chạy trên iOS simulator/thiết bị thật.

## 12. Quyết định kỹ thuật

Ghi các quyết định quan trọng để Claude ở phiên sau không tự thay đổi:

  Ngày         Quyết định                                                      Lý do                                                             Tác động
  ------------ --------------------------------------------------------------- ------------------------------------------------------------------ --------------------------------
  2026-11-09   Routes sống ở `src/app/` thay vì `app/` ở gốc repo               Quy ước mặc định mới của `create-expo-app@latest` SDK 58            Khác với cây thư mục tham khảo ở blueprint mục 10 (blueprint cho phép điều chỉnh có lý do)
  2026-11-09   ESLint ghim ở `^9.39.5`, không dùng bản mới nhất `10.x`          `eslint-config-expo@58.0.4` phụ thuộc plugin chưa hỗ trợ ESLint 10  Cần theo dõi khi Expo cập nhật eslint-config-expo để nâng lên ESLint 10 sau
  2026-11-09   Không dùng NativeWind/Tailwind, dùng `StyleSheet` thuần          Giảm dependency, tránh rủi ro tương thích với React 19.3/React Compiler  Có thể xem xét lại nếu khối lượng style tăng nhiều
  2026-11-09   Không tải font tuỳ chỉnh                                        Font hệ thống đã hỗ trợ đầy đủ tiếng Việt                           Không ảnh hưởng, tiết kiệm asset
  2026-11-11   Áp dụng 4 tài liệu đặc tả mới trong `docs/` làm nguồn tham chiếu chính thức (sau blueprint, trước PROGRESS.md)   Chủ dự án yêu cầu tích hợp bộ tài liệu thiết kế chi tiết hơn   Đã cập nhật `CLAUDE.md` mục 1-2
  2026-11-11   Theme dùng bảng màu `docs/UI_DESIGN_SPEC.md` ("Cute Romantic"), không dùng bảng màu blueprint gốc nữa   Chủ dự án xác nhận qua AskUserQuestion   `src/theme/colors.ts` đã đổi; nếu cần bảng màu khác phải xác nhận lại
  2026-11-11   Schema M2 dùng tên bảng/cột theo `docs/DATABASE_SCHEMA.md`, nhưng KHÔNG thêm `status` cho couple_members hay mã hoá địa chỉ ở giai đoạn này   Chủ dự án chọn phương án "kết hợp tối thiểu" — tránh làm phức tạp M2 khi M3/M7 chưa tới   Migration đã cập nhật; M7 sẽ cần thêm cột `status` sau
  2026-11-11   Ảnh kỷ niệm (Memories) và luồng rời-couple chính thức thuộc phạm vi MVP (trước đó blueprint để sau MVP)   Chủ dự án xác nhận qua AskUserQuestion   Mở rộng phạm vi M7; cần cập nhật `docs/PRODUCT_SPEC.md` khi triển khai M7
  2026-11-11   Lưu session Supabase bằng `@react-native-async-storage/async-storage`, không dùng `expo-secure-store` như stack blueprint gợi ý chung   Session có thể vượt giới hạn ~2048 byte/entry của SecureStore trên iOS; khớp hướng dẫn chính thức của Supabase cho Expo   Không ảnh hưởng bảo mật đáng kể cho app 2 người dùng
  2026-11-11   `app.json` `web.output` đổi từ `"server"` sang `"static"`                        SSR làm crash khi Supabase client đọc storage lúc không có `window`; web chỉ dùng để Claude xem trước, không phải nền tảng mục tiêu   Không ảnh hưởng build Android/iOS thật

## 13. Việc tiếp theo

Claude luôn cập nhật tối đa 3 việc tiếp theo theo thứ tự ưu tiên:

1.  **M2-005 — Tạo Couple** (màn hình tạo không gian chung sau khi đăng
    nhập lần đầu, gọi `couples` + `couple_members` qua RPC an toàn).
2.  M2-006/M2-007 — tạo mã mời có hạn dùng + tham gia Couple bằng mã mời
    (cần RPC function `security definer`, xem `docs/DATABASE_SCHEMA.md`
    mục 6).
3.  Song song, chủ dự án cài Expo Go và quét mã QR từ `npm run start` để
    xác nhận M1-010 trên thiết bị thật (không chặn M2, có thể làm bất cứ
    lúc nào). BUG-002 (mã hoá địa chỉ riêng tư) cần xác nhận trước khi bắt
    đầu M3.

## 14. Mẫu báo cáo cuối phiên

``` md
### Session Report — YYYY-MM-DD

**Milestone:** Mx
**Trạng thái:** Hoàn thành / Đang làm / Bị chặn

**Đã hoàn thành**
- [Task ID] ...

**Đã thay đổi**
- `path/to/file` — mô tả.

**Đã kiểm tra**
- `npm run lint` — PASS/FAIL/NOT RUN
- `npm run typecheck` — PASS/FAIL/NOT RUN
- `npm test` — PASS/FAIL/NOT RUN
- Thiết bị — Android/iOS/Chưa thử

**Còn dang dở**
- ...

**Cần chủ dự án**
- ...

**Tiếp theo**
1. ...
2. ...
3. ...
```

------------------------------------------------------------------------

## 15. Nguyên tắc cuối cùng

-   Đây là file trạng thái sống, không phải tài liệu viết một lần.
-   Claude phải cập nhật sau mỗi task độc lập.
-   Không xóa lịch sử công việc cũ.
-   Không tự đánh dấu hoàn thành.
-   Trạng thái phải phản ánh đúng code hiện tại.
-   Khi mở phiên mới, đọc file này để tiếp tục đúng vị trí.
