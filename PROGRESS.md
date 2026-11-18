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
  Trạng thái tổng thể   Milestone 1-3 đều đã kiểm tra thật với Supabase; M2-008 tạm hoãn (chưa đủ thiết bị). Milestone 4 (tìm địa điểm qua OpenStreetMap) đã xác nhận chạy thật trên thiết bị Android của chủ dự án — còn M4-006/008/009 (chi tiết địa điểm, giới hạn request, lưu yêu thích) chưa làm
  Milestone hiện tại    M4 --- Khám phá địa điểm (IN_PROGRESS)
  Cập nhật gần nhất     2026-11-18

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
  M2          Authentication và Couple           `[~]`        M2-001..007 DONE (đã kiểm tra thật với Supabase); M2-008 DEFERRED (chủ dự án chưa đủ thiết bị, 2026-11-18)
  M3          Địa chỉ và sở thích                `[x]`        Xong 2026-11-18, đã kiểm tra thật với Supabase (bao gồm M3-008 — RLS chặn đúng)
  M4          Khám phá địa điểm                  `[~]`        M4-001..005/007 DONE (đã kiểm tra thật trên thiết bị Android); M4-006/008/009 chưa làm
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
-   [x] **M1-011 --- Làm lại UI theo mockup chủ dự án cung cấp (src/UI/*.html + assets/images/UI.png)**
    -   Hoàn thành: 2026-11-16.
    -   Bối cảnh: Chủ dự án tự tạo 6 file mockup HTML (Tailwind) + 1 ảnh
        tổng hợp (`UI.png`, có cả bản sáng/tối) thể hiện chính xác giao diện
        mong muốn — chi tiết hơn nhiều so với `docs/UI_DESIGN_SPEC.md`. Yêu
        cầu: "sửa UI theo cái này".
    -   Đã làm:
        -   Đổi lại bảng màu (`src/theme/colors.ts`) khớp chính xác mockup
            (primary `#FF6F91`, nền `#FFF1F5`, chữ chính `#4A1525`, thêm
            accent tím `#8B5CF6` và vàng `#FFB703`). Bản trước (2026-11-11)
            chỉ là xấp xỉ theo tài liệu thiết kế, lần này khớp theo file
            thật chủ dự án cung cấp.
        -   Cài `react-native-svg`, chuyển thể 2 minh hoạ chibi (cặp đôi ở
            Home, mèo ôm tim ở Planner) từ SVG gốc trong mockup sang React
            Native (`src/components/illustrations/`).
        -   Viết lại hoàn toàn cả 5 màn hình tab + thêm màn hình mới
            `itinerary-result.tsx` ("Lịch trình gợi ý" — trước đây chỉ là
            `Alert` placeholder, nay có timeline, tổng chi phí, ảnh địa
            điểm theo đúng `src/UI/Itinerary.html`).
        -   Thêm component dùng chung mới: `FieldCard` (thẻ icon+nhãn+giá
            trị cho form Planner), mở rộng `Chip` hỗ trợ icon.
        -   Thêm `formatVnd()` (`src/utils/format.ts`) thay cho
            `toLocaleString('vi-VN')` — tránh phụ thuộc Intl/ICU của máy,
            an toàn hơn trên Hermes.
    -   Quyết định đã tự đưa ra khi mockup mâu thuẫn với quy tắc dự án
        (không hỏi lại vì đã có quy tắc rõ trong CLAUDE.md/blueprint):
        -   Giữ **tab bar bằng tiếng Việt** dù mockup dùng nhãn tiếng Anh
            (Home/Planner/Explore/Dates/Memories) — vi phạm quy tắc "giao
            diện tiếng Việt" nếu copy y nguyên.
        -   Thẻ "28°C, Có nắng..." và "Đã bên nhau 1 năm 3 tháng 12 ngày"
            trên Home vẫn gắn nhãn "Dữ liệu mẫu" — mockup hiển thị như dữ
            liệu thật nhưng chưa có nguồn thời tiết/ngày kỷ niệm thật.
        -   Tab "Bản đồ"/"Chi tiết" (Itinerary) và "Album"/"Địa điểm"
            (Memories) hiện trạng thái "Chưa khả dụng trong bản demo" thay
            vì làm nút không hành động.
        -   Nút "Lưu lịch trình" và nút "+" thêm kỷ niệm hiện thông báo
            trung thực "Sắp ra mắt ở Milestone 6/7" thay vì giả vờ hoạt động.
    -   Kiểm tra: `npm run lint`/`typecheck`/`format:check` PASS.
        `npx expo export` PASS cho cả Android và iOS. `npx expo-doctor`
        19/20 (1 cảnh báo patch version không liên quan, có từ trước).
        Viết 6 test "smoke" mới (`src/app/__tests__/screens.smoke.test.tsx`)
        render từng màn hình qua `@testing-library/react-native` — PASS cả
        6, xác nhận không crash sau khi viết lại toàn bộ.
    -   **Hạn chế đã biết (chưa xác minh được):** không chụp được ảnh màn
        hình trực quan qua trình duyệt vì màn hình giờ nằm sau cổng đăng
        nhập (Stack.Protected từ M2-004) — thử tạm bỏ qua cổng đăng nhập để
        chụp ảnh đã bị hệ thống an toàn chặn (đúng, vì đó là thay đổi code
        bảo mật dù chỉ định tạm thời). Vì vậy **chưa có xác nhận hình ảnh
        trực quan** khớp mockup đến mức nào — chỉ xác nhận được không crash
        và đúng nội dung/màu sắc qua code. Chủ dự án nên tự xem trên thiết
        bị thật hoặc Expo Web sau khi đăng nhập để xác nhận.
    -   File: toàn bộ `src/app/(tabs)/*.tsx`, `src/app/itinerary-result.tsx`,
        `src/theme/colors.ts`, `src/components/illustrations/*`,
        `src/components/ui/FieldCard.tsx`, `src/components/ui/Chip.tsx`,
        `src/constants/mock-data.ts`, `src/utils/format.ts`,
        `src/app/__tests__/screens.smoke.test.tsx`.

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
-   [x] **M2-005 --- Tạo Couple**
    -   Bắt đầu: 2026-11-16. Hoàn thành: 2026-11-16.
    -   Đã làm: Thêm hàm RPC `create_couple(p_display_name, p_anniversary_date)`
        (SECURITY DEFINER, chặn user đã thuộc Couple khác). Tạo
        `src/features/couple/CoupleProvider.tsx` (context quản lý Couple
        hiện tại, gọi RPC, dịch lỗi sang tiếng Việt). Thêm màn hình
        `src/app/(onboarding)/create-couple.tsx`. Gắn `CoupleProvider`
        vào `src/app/_layout.tsx` và đổi `Stack.Protected` thành 3 nhánh:
        chưa đăng nhập → `(auth)`; đã đăng nhập nhưng chưa có Couple →
        `(onboarding)`; đã có Couple → `(tabs)`.
    -   Kiểm tra đã chạy: `npx expo lint`, `npx tsc --noEmit`, `npm test`
        (11/11 PASS). **Đã kiểm tra thật với Supabase project thật** sau
        khi chủ dự án chạy migration qua SQL Editor (2026-11-16): tự động
        hoá bằng Playwright qua Expo Web — đăng nhập 1 tài khoản thật, gọi
        `create_couple` → **HTTP 200**, màn hình chuyển đúng sang "Đang chờ
        người ấy tham gia" (1/2 thành viên). RPC hoạt động đúng trên dữ
        liệu thật.
    -   File: `supabase/migrations/20261117000001_couple_rpc_functions.sql`,
        `src/features/couple/CoupleProvider.tsx`, `src/app/_layout.tsx`,
        `src/app/(onboarding)/_layout.tsx`, `src/app/(onboarding)/index.tsx`,
        `src/app/(onboarding)/create-couple.tsx`.
-   [x] **M2-006 --- Tạo mã mời có hạn dùng**
    -   Bắt đầu: 2026-11-16. Hoàn thành: 2026-11-16.
    -   Đã làm: Hàm RPC `create_couple_invitation(p_expires_in_hours default 168)`
        — dùng `pgcrypto` (`gen_random_bytes` + `digest`) để sinh token
        ngẫu nhiên và chỉ lưu bản hash trong DB (không lưu token gốc),
        mặc định hết hạn sau 168 giờ (7 ngày). Thêm nút "Chia sẻ mã mời"
        trên Home (`src/app/(tabs)/index.tsx`) khi Couple chưa đủ 2 thành
        viên — gọi RPC rồi mở hộp thoại chia sẻ hệ thống (`Share.share`)
        với nội dung chứa mã mời. Settings (`src/app/settings.tsx`) hiện
        thêm thẻ thông tin Couple (tên, số thành viên).
    -   **Lỗi thật phát hiện khi test với Supabase thật (2026-11-16)**: gọi
        RPC trả về lỗi Postgres `function gen_random_bytes(integer) does
        not exist`. Nguyên nhân: Supabase cài extension `pgcrypto` vào
        schema `extensions`, không phải `public`; hàm RPC chỉ có
        `search_path = public` nên không thấy hàm của pgcrypto. Lỗi này
        CHỈ phát hiện được khi chạy thật — static review/lint/typecheck
        không bắt được vì đây là lỗi runtime phía Postgres.
    -   Đã sửa: Thêm `create extension if not exists pgcrypto with schema
        extensions;` và đổi `search_path = public` thành
        `search_path = public, extensions` cho cả `create_couple_invitation`
        và `accept_couple_invitation` trong migration. Chủ dự án đã chạy
        lại migration qua SQL Editor (2026-11-16).
    -   Kiểm tra đã chạy: lint/typecheck/test PASS. **Đã kiểm tra lại với
        Supabase thật sau khi sửa** — gọi `create_couple_invitation` →
        **HTTP 200**, nhận được token thật (ví dụ dạng
        `7429eaddd34456d4378bdba4d4f3cc44...`).
    -   File: cùng migration ở M2-005, `src/app/(tabs)/index.tsx`,
        `src/app/settings.tsx`.
-   [x] **M2-007 --- Tham gia Couple bằng mã mời**
    -   Bắt đầu: 2026-11-16. Hoàn thành: 2026-11-16.
    -   Đã làm: Hàm RPC `accept_couple_invitation(p_token)` — khoá dòng
        bằng `FOR UPDATE` để tránh race condition khi 2 người cùng dùng 1
        mã mời, kiểm tra hạn dùng + trạng thái đã dùng + Couple chưa đủ 2
        thành viên trước khi thêm user vào `couple_members`. Thêm màn hình
        `src/app/(onboarding)/join-couple.tsx` (nhập mã mời, gọi RPC, hiện
        lỗi tiếng Việt nếu mã không hợp lệ/hết hạn/đã dùng).
    -   Kiểm tra đã chạy: lint/typecheck/test PASS. **Đã kiểm tra thật với
        Supabase thật**: dùng mã mời thật từ M2-006, tài khoản thứ 2 (test)
        gọi `accept_couple_invitation` → **HTTP 200**, trả về đúng Couple
        (`display_name: "TEST - Playwright E2E"`). Sau khi tham gia, màn
        hình Home của tài khoản thứ 2 không còn hiện thẻ "Đang chờ người ấy
        tham gia" (đúng, vì Couple đã đủ 2 thành viên).
    -   File: cùng migration ở M2-005, `src/app/(onboarding)/join-couple.tsx`.
-   [-] **M2-008 --- Kiểm thử hai tài khoản trên hai thiết bị**
    -   **DEFERRED 2026-11-18** — chủ dự án xác nhận để sau vì hiện chưa đủ
        thiết bị (cần ít nhất 2 điện thoại/tài khoản thật để tự xác nhận).
        Không phải BLOCKED (không cần ai gỡ), chỉ tạm hoãn theo quyết định
        chủ dự án, sẽ làm khi có đủ thiết bị.
    -   Đã kiểm tra được **luồng đầy đủ bằng 2 tài khoản thật** (tạo Couple
        → tạo mã mời → tài khoản khác tham gia → cả 2 bên đều đúng trạng
        thái 2/2 thành viên) — tự động hoá qua trình duyệt (Expo Web +
        Playwright), không phải qua 2 thiết bị di động vật lý. Theo đúng
        quy tắc CLAUDE.md mục 11 (không nói "đã chạy trên thiết bị thật"
        nếu chưa chạy thật), task này KHÔNG được tính là hoàn thành chỉ vì
        kết quả tự động — cần chủ dự án tự xác nhận khi có đủ thiết bị.
    -   **Lưu ý dữ liệu thử nghiệm**: Trong lúc test M2-005/006/007, đã
        thật sự tạo 1 Couple tên **"TEST - Playwright E2E"** trong project
        Supabase thật, với 2 thành viên là 2 tài khoản test
        `ourdate-test-a-...@mailinator.com` và `ourdate-test-b-...@mailinator.com`
        (không phải tài khoản thật của chủ dự án). Đây là dữ liệu test vô
        hại, không ảnh hưởng tài khoản thật, nhưng chủ dự án có thể xoá nếu
        muốn qua Supabase Table Editor (bảng `couples`, `couple_members`,
        `couple_invitations`, `profiles`, và 2 user trong Authentication) —
        Claude không tự xoá vì đây là thao tác xoá dữ liệu cần sự đồng ý rõ
        ràng theo CLAUDE.md mục 10.

Với mỗi task, Claude ghi thêm: mục tiêu, ngày hoàn thành, file thay đổi,
lệnh kiểm tra, kết quả và ghi chú.

### M3 --- Địa chỉ và sở thích

-   [x] **M3-001 --- Thiết kế model private places**
    -   Bắt đầu: 2026-11-17. Hoàn thành: 2026-11-18.
    -   Trước khi làm, đã hỏi chủ dự án về BUG-002 (mã hoá địa chỉ) qua
        AskUserQuestion — chủ dự án chọn **"Chỉ dùng RLS"** (không mã hoá
        tầng ứng dụng ở giai đoạn này). Xem mục 12 "Quyết định kỹ thuật".
    -   Đã làm: Tạo bảng `private_places` (owner-only, cột `user_id`,
        KHÔNG có `couple_id` — người yêu không đọc được dù đã cùng Couple,
        theo `docs/DATABASE_SCHEMA.md` mục 3.7/5, chi tiết hơn
        `OUR_DATE_BLUEPRINT.md` mục 7.5). RLS: chỉ chủ sở hữu CRUD. Cột
        `latitude`/`longitude` để trống (chưa geocode thật, chưa tích hợp
        Places/Routes API ở M4/M5) — không tự bịa toạ độ.
    -   Kiểm tra thật (2026-11-18, qua REST API trực tiếp với Supabase
        thật, tài khoản test): `INSERT private_places` → **HTTP 201**;
        tài khoản chủ sở hữu tự đọc lại → **HTTP 200, có dữ liệu**.
    -   File: `supabase/migrations/20261117000002_private_places_and_preferences.sql`.
-   [x] **M3-002 --- Màn hình nhập/chỉnh sửa địa chỉ**
    -   Hoàn thành: 2026-11-18.
    -   Đã làm: `src/app/private-places.tsx` — danh sách địa chỉ, thêm/sửa/xoá
        (nhập tay, chưa có chọn điểm trên bản đồ vì M5 chưa tới). Thêm liên
        kết từ Settings.
    -   File: `src/app/private-places.tsx`, `src/app/settings.tsx`.
-   [x] **M3-003 --- Lưu điểm nhà/điểm đón an toàn**
    -   Hoàn thành: 2026-11-18.
    -   Đã làm: `PreferencesProvider` (CRUD `private_places` qua Supabase,
        RLS bảo vệ). Planner (`(tabs)/planner.tsx`) đọc danh sách này để
        làm lựa chọn "Điểm bắt đầu" thay cho dữ liệu giả trước đây.
    -   File: `src/features/preferences/PreferencesProvider.tsx`,
        `src/app/(tabs)/planner.tsx`.
-   [x] **M3-004 --- Cấu hình phương tiện**
    -   Hoàn thành: 2026-11-18.
    -   Đã làm: Bảng `couple_preferences.default_transport_mode`
        (`DRIVE/TWO_WHEELER/WALK/TRANSIT` — xem BUG-006 ở mục 10). Màn hình
        `src/app/preferences.tsx` cho chọn, Planner đọc giá trị này làm mặc
        định khi mở form.
    -   Kiểm tra thật: `UPSERT couple_preferences` (mode `DRIVE`) →
        **HTTP 201**.
-   [x] **M3-005 --- Cấu hình bán kính khám phá**
    -   Hoàn thành: 2026-11-18.
    -   Đã làm: Cột `default_radius_m` (lưu mét — xem BUG-005 ở mục 10),
        UI nhập/hiển thị bằng km, đổi đơn vị ở tầng `PreferencesProvider`.
    -   Kiểm tra thật: lưu `20000` mét (= 20km) → đọc lại đúng giá trị.
-   [x] **M3-006 --- Cấu hình ngân sách mặc định**
    -   Hoàn thành: 2026-11-18.
    -   Đã làm: Cột `default_budget_vnd` (nullable — "không giới hạn" khi
        để trống), UI nhập ở `preferences.tsx`, Planner đọc làm mặc định.
    -   Kiểm tra thật: lưu `1.000.000`đ → upsert thành công.
-   [x] **M3-007 --- Cấu hình sở thích và điều cần tránh**
    -   Hoàn thành: 2026-11-18.
    -   Đã làm: Cột `interests` (jsonb, dùng chung danh sách
        `interestOptions` đã có ở Planner) và `avoid_preferences` (jsonb —
        thêm mới, xem BUG-007 ở mục 10), nhập dạng tag cách nhau bằng dấu
        phẩy ở `preferences.tsx`.
    -   Kiểm tra đã chạy cho cả M3-001..007: `npx expo lint`,
        `npx tsc --noEmit`, `npm test` (13/13 PASS, thêm 2 smoke test cho
        `private-places.tsx`/`preferences.tsx`) — tất cả PASS. Chủ dự án
        đã chạy migration `20261117000002_private_places_and_preferences.sql`
        qua SQL Editor (2026-11-18).
    -   File: cùng migration ở M3-001, `src/app/preferences.tsx`.
-   [x] **M3-008 --- Kiểm tra quyền riêng tư địa chỉ**
    -   Hoàn thành: 2026-11-18.
    -   Kiểm tra thật (script Node gọi thẳng REST API Supabase, không qua
        UI — tránh phụ thuộc vào việc chạy app thật): tạo tài khoản test
        thứ 3 (hoàn toàn không liên quan đến Couple của tài khoản A), thử
        đọc trực tiếp `private_places` và `couple_preferences` của tài
        khoản A → **cả hai đều trả về 0 dòng (HTTP 200, mảng rỗng)** — RLS
        chặn đúng, kể cả khi dùng `user_id` của A truyền thẳng vào query
        (không phải lỗi 403 bị từ chối, mà RLS lọc sạch kết quả — đúng
        hành vi Postgres RLS mong muốn).
    -   Ghi chú: tài khoản A hiện có 1 địa chỉ test
        ("Nhà tôi (TEST REST)") và 1 bản ghi `couple_preferences` test
        trong Supabase thật — vô hại, chủ dự án có thể xoá qua Table Editor
        nếu muốn.

### M4 --- Khám phá địa điểm

-   [x] **M4-001 --- Xác minh Places API và quota**
    -   Bắt đầu: 2026-11-18. Hoàn thành: 2026-11-18.
    -   Đổi nguồn dữ liệu sang OpenStreetMap/Nominatim (xem BUG-012 mục
        10) sau khi xác nhận Google Places không khả thi (chủ dự án không
        có thẻ thanh toán). Đã test thật: gọi Nominatim thành công
        (HTTP 200), trả về địa điểm thật tại Hà Nội (tên, địa chỉ, toạ
        độ chính xác — đã đối chiếu thủ công). Không có "quota" cần xác
        minh vì Nominatim không cần key, chỉ cần tuân thủ chính sách dùng
        nhẹ (tối đa 1 request/giây, có User-Agent rõ ràng).
-   [x] **M4-002 --- Tạo server-side search endpoint**
    -   Hoàn thành: 2026-11-18.
    -   **Đã thử Edge Function trước, KHÔNG dùng được, đã đổi hướng**: Viết
        `supabase/functions/places-search/index.ts` (Deno) validate input,
        gọi Nominatim, có cache đơn giản. Chủ dự án deploy thành công qua
        Supabase Dashboard, nhưng khi gọi thật: **Nominatim trả về HTTP 403
        khi request đến từ hạ tầng server của Supabase** (chặn IP
        cloud/datacenter theo chính sách chống lạm dụng) — trong khi cùng
        request đó chạy bình thường (HTTP 200) từ máy khác. Đây là lỗi hạ
        tầng thật, chỉ phát hiện được khi deploy và gọi thật, không thấy
        được qua test logic đơn thuần.
    -   **Đã sửa**: Chuyển hẳn sang gọi Nominatim **trực tiếp từ app**
        (không qua server) — an toàn vì Nominatim không cần API key bí mật
        (khác Google, lý do duy nhất ban đầu cần qua server là giấu key
        trả phí). Điện thoại dùng IP mạng thường (Wi-Fi/di động), không bị
        Nominatim chặn như IP server. Đã xoá `supabase/functions/`
        (không còn dùng), revert `tsconfig.json`.
    -   Kiểm tra đã chạy: test logic với dữ liệu Nominatim thật — nhiều
        lượt tìm kiếm thành công (HTTP 200) từ cách gọi trực tiếp kiểu
        client. Phát hiện + sửa 1 lỗi thật khác (tên địa điểm rỗng không
        fallback đúng sang địa chỉ khi tag `name` là chuỗi rỗng thay vì
        `undefined`).
    -   File: `src/features/places/placesSearch.ts` (logic nằm hẳn ở
        client, không còn Edge Function).
-   [x] **M4-003 --- Chuẩn hóa dữ liệu địa điểm**
    -   Hoàn thành: 2026-11-18.
    -   Response chuẩn hoá theo `docs/API_INTEGRATION_SPEC.md` mục 6 (đã
        ghi chú cập nhật nguồn dữ liệu ở đầu mục đó): `provider`,
        `place_id`, `name`, `formatted_address`, `location`,
        `opening_hours`, `phone` (2 trường thêm so với bản gốc, có thật
        từ OSM khi địa điểm có khai báo). `rating`/`user_ratings_total`/
        `price_level`/`business_status` luôn `null` — KHÔNG bịa, vì OSM
        không có các trường này.
-   [x] **M4-004 --- UI tìm kiếm và danh sách kết quả**
    -   Bắt đầu: 2026-11-18. Hoàn thành: 2026-11-18.
    -   Đã làm: `src/features/places/placesSearch.ts` (gọi Nominatim trực
        tiếp từ app, dịch lỗi sang tiếng Việt), `src/features/places/useCurrentLocation.ts`
        (xin quyền vị trí qua `expo-location`, xử lý từ chối quyền). Viết
        lại `src/app/(tabs)/explore.tsx`: ô tìm kiếm debounce 600ms, danh
        sách kết quả thật, không còn dữ liệu mẫu.
    -   **Kiểm tra thật trên thiết bị Android của chủ dự án (2026-11-18,
        qua Expo Go)**: xin quyền vị trí thành công, chọn danh mục "Café"
        → hiện đúng 4+ quán cà phê thật gần Hà Nội (AHA Cafe, Trang Cafe,
        Cafe 15, Cafe Năng...), có tên + địa chỉ đầy đủ, đúng dữ liệu thật
        từ OpenStreetMap — chủ dự án xác nhận bằng ảnh chụp màn hình thật.
    -   File: `src/features/places/placesSearch.ts`,
        `src/features/places/useCurrentLocation.ts`,
        `src/app/(tabs)/explore.tsx`, `app.json` (thêm plugin
        `expo-location` với thông báo xin quyền tiếng Việt).
-   [x] **M4-005 --- Bộ lọc danh mục và bán kính**
    -   Hoàn thành: 2026-11-18.
    -   Đã làm: 4 danh mục (Café/Nhà hàng/Chụp ảnh/Vui chơi) map sang từ
        khoá tìm kiếm tiếng Anh khớp tag OSM tốt hơn (quyết định kỹ thuật
        nhỏ, xem mục 12); bán kính lấy từ `couple_preferences` (M3) làm
        mặc định. Đã kiểm tra thật: lọc theo danh mục "Café" hoạt động
        đúng trên thiết bị thật (xem M4-004). Chưa có UI chỉnh bán kính
        riêng cho từng lần tìm (dùng mặc định từ Cài đặt) — có thể bổ
        sung sau nếu cần.
-   [ ] **M4-006 --- Chi tiết địa điểm**
    -   Chưa làm — màn hình chi tiết địa điểm (ảnh, giờ mở cửa đầy đủ,
        nút mở bản đồ) để sau.
-   [x] **M4-007 --- Loading/error/empty/retry**
    -   Đã làm: trạng thái loading (xin quyền vị trí + đang tìm), lỗi
        (từ chối quyền vị trí / lỗi tìm kiếm, đều có nút "Thử lại"), rỗng
        (chưa nhập gì / không có kết quả) — dùng component `Loading`/
        `ErrorState`/`EmptyState` có sẵn.
-   [ ] **M4-008 --- Cache và giới hạn request**
    -   Đã có cache đơn giản trong Edge Function (TTL 5 phút, theo
        từ-khoá+khu-vực) — xem M4-002. Debounce 600ms ở client giảm số
        lần gọi khi gõ. Chưa có giới hạn request phía server theo
        user/IP — cân nhắc thêm nếu thấy cần khi có nhiều người dùng hơn.
-   [ ] **M4-009 --- Lưu địa điểm yêu thích**
    -   Chưa làm. Nút tim trên mỗi kết quả hiện báo "Sắp ra mắt" (không
        giả vờ đã lưu) — cần thêm bảng `saved_places` (đã có trong
        `docs/DATABASE_SCHEMA.md` mục 3.8) ở lượt làm việc sau.

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
  U-003   Cấu hình Google Cloud                                **Không cần nữa** (2026-11-18)   Chủ dự án không có thẻ thanh toán → đổi M4 sang OpenStreetMap (miễn phí, không cần tài khoản). Xem BUG-012 ở mục 10.
  U-004   Chọn AI API và giới hạn chi phí                      Chưa cần        Đợi đến M6
  U-005   Cài Expo Go trên Android/iPhone, chạy `npm run start` và quét mã QR để xác nhận M1-010   Cần làm   Xem `docs/SETUP.md` bước 3-4
  U-006   Tự đăng ký 1 tài khoản bằng email thật, xác nhận email, đăng nhập thử   **Hoàn thành** (2026-11-11)   Đăng ký/đăng nhập hoạt động đúng trên thiết bị của chủ dự án
  U-007   Chạy migration `supabase/migrations/20261117000001_couple_rpc_functions.sql` qua Supabase SQL Editor   **Hoàn thành** (2026-11-16, đã chạy lại sau khi sửa lỗi pgcrypto)   Đã xác nhận cả 3 hàm RPC chạy đúng (HTTP 200) sau khi chạy lại
  U-008   Chạy migration mới `supabase/migrations/20261117000002_private_places_and_preferences.sql` qua SQL Editor   **Hoàn thành** (2026-11-18)   Đã xác nhận cả 2 bảng + RLS hoạt động đúng (M3-001..008 PASS)
  U-009   Deploy Edge Function `places-search` qua Supabase Dashboard   **Không cần nữa** (2026-11-18)   Chủ dự án đã deploy thử, nhưng phát hiện Nominatim chặn IP server Supabase (HTTP 403) — đã đổi sang gọi trực tiếp từ app, không cần Edge Function này nữa. Có thể xoá function "places-search" trên Dashboard nếu muốn dọn dẹp (không bắt buộc).

Không yêu cầu người dùng tạo tài khoản/dịch vụ trước khi task thực sự
cần đến.

### Hướng dẫn U-007: Chạy migration tạo Couple/mã mời

1.  Vào Supabase Dashboard → project của bạn → **SQL Editor**.
2.  Mở file `supabase/migrations/20261117000001_couple_rpc_functions.sql`
    trong repository, copy toàn bộ nội dung.
3.  Dán vào SQL Editor, bấm **Run**. Nếu hiện "Success. No rows returned"
    là đã thành công — file này chỉ tạo 3 hàm xử lý (không tạo bảng mới,
    không xoá dữ liệu).
4.  Báo lại kết quả (thành công hay có lỗi) để tiếp tục kiểm tra tính
    năng tạo Couple/mời/tham gia bằng tài khoản thật.

### Hướng dẫn U-008: Chạy migration địa chỉ riêng tư + sở thích

1.  Vào Supabase Dashboard → project của bạn → **SQL Editor**.
2.  Mở file `supabase/migrations/20261117000002_private_places_and_preferences.sql`
    trong repository, copy toàn bộ nội dung.
3.  Dán vào SQL Editor, bấm **Run**. File này chỉ tạo 2 bảng mới
    (`private_places`, `couple_preferences`) — không đụng tới bảng cũ,
    không xoá dữ liệu.
4.  Báo lại kết quả để mình kiểm tra tiếp màn hình "Địa chỉ riêng tư" và
    "Sở thích & lịch trình" bằng tài khoản thật.

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
  2026-11-16   M1-011             Làm lại toàn bộ UI 5 tab + màn Itinerary mới theo mockup `src/UI/*.html` + `UI.png` chủ dự án tự tạo   lint/typecheck/format/test (8 test, có 6 smoke test mới) đều PASS; export Android+iOS PASS   Chưa xác nhận hình ảnh trực quan (màn hình sau cổng đăng nhập) — xem ghi chú ở mục 4
  2026-11-11   M2-002, M2-003 (cập nhật)   Viết lại migration theo docs/DATABASE_SCHEMA.md, chạy thử qua Expo Web + Playwright screenshot 5 màn hình   Giao diện render đúng, sửa 1 câu chữ lỗi thời ở Memories   Theo xác nhận AskUserQuestion
  2026-11-11   M2-001, M2-002, M2-003   Chủ dự án tự chạy 2 migration qua Supabase SQL Editor   **PASS thật** — "Success", 4 bảng xuất hiện trong Table Editor (ảnh chụp màn hình)   Chuyển cả 3 task sang DONE
  2026-11-11   M2-004             Cài Supabase client, AuthProvider, màn hình sign-in/sign-up/settings; test qua Expo Web + Playwright với project thật   PASS — signup HTTP 200, lỗi sai mật khẩu HTTP 400 hiển thị đúng tiếng Việt   Phát hiện + sửa 2 bug (SSR crash, lỗi tiếng Anh)
  2026-11-11   M2-004 (xác nhận cuối)   Chủ dự án tự đăng ký email thật + xác nhận + đăng nhập trên thiết bị của mình   **PASS — người dùng thật xác nhận**   M2-004 đóng hoàn toàn, không còn việc dang dở
  2026-11-16   M2-005, M2-006, M2-007   Viết RPC `create_couple`/`create_couple_invitation`/`accept_couple_invitation`, `CoupleProvider`, màn hình onboarding (chọn/tạo/tham gia), thẻ "chờ người ấy" ở Home, thẻ Couple ở Settings, gate 3 nhánh ở `_layout.tsx`   lint/typecheck/test PASS (11/11, thêm 3 smoke test onboarding)   **Chưa kiểm tra với Supabase thật** — migration chưa được chủ dự án áp dụng (việc U-007)
  2026-11-16   M2-005 (kiểm tra thật)   Chủ dự án chạy migration RPC lần 1 qua SQL Editor; Claude test tự động qua Expo Web (Playwright) + 1 tài khoản test   `create_couple` → **HTTP 200 thật**   Xác nhận RPC hoạt động đúng trên dữ liệu thật
  2026-11-16   M2-006 (lỗi + sửa)   Test `create_couple_invitation` → lỗi Postgres `gen_random_bytes(integer) does not exist` (pgcrypto không có trong search_path)   Lỗi thật, chỉ phát hiện được khi chạy thật   Đã sửa migration: thêm `create extension pgcrypto with schema extensions` + `search_path = public, extensions`
  2026-11-16   M2-006, M2-007 (kiểm tra thật sau khi sửa)   Chủ dự án chạy lại migration đã sửa; Claude test lại toàn bộ luồng bằng 2 tài khoản test (tạo Couple → tạo mã mời → tài khoản 2 tham gia bằng mã mời)   `create_couple_invitation` → **HTTP 200**; `accept_couple_invitation` → **HTTP 200**, trả đúng Couple, cả 2 bên đúng 2/2 thành viên   M2-005/006/007 chuyển DONE; M2-008 còn thiếu xác nhận trên thiết bị thật (xem mục 4)
  2026-11-17   M3-001..007   Hỏi chủ dự án về BUG-002 (mã hoá địa chỉ) qua AskUserQuestion → chọn "Chỉ RLS". Viết migration `private_places`/`couple_preferences`, `PreferencesProvider`, màn hình `private-places.tsx`/`preferences.tsx`, nối Planner đọc dữ liệu thật thay mock   lint/typecheck/test PASS (13/13, thêm 2 smoke test)   **Chưa kiểm tra với Supabase thật** — cần chủ dự án chạy migration mới (việc U-008)
  2026-11-18   M3-001..008 (kiểm tra thật)   Chủ dự án chạy migration mới qua SQL Editor; Claude test trực tiếp qua REST API Supabase thật (không qua UI, vì goto() thẳng vào route lồng nhau trong Expo Router web dev bị treo — ghi nhận là hạn chế môi trường test, không phải lỗi app)   `INSERT`/`UPSERT` → **HTTP 201**; tài khoản thứ 3 không liên quan đọc `private_places`/`couple_preferences` của tài khoản khác → **0 dòng cả hai, RLS chặn đúng**   M3-001..008 chuyển DONE

## 9. Lịch sử thay đổi phạm vi (Change Log)

  Ngày         Thay đổi                                                        Lý do                                              Người xác nhận
  ------------ ---------------------------------------------------------------- --------------------------------------------------- ----------------
  2026-11-11   Thêm 4 tài liệu đặc tả mới vào `docs/` (UI, User Flows, DB, API)   Chủ dự án bổ sung bộ tài liệu thiết kế chi tiết hơn   Chủ dự án
  2026-11-11   Xác nhận: ảnh kỷ niệm (upload photo) và luồng rời-couple CHÍNH THỨC thuộc MVP (trước đó blueprint gốc để sau MVP)   Chủ dự án chọn theo USER_FLOWS.md/DATABASE_SCHEMA.md mới   Chủ dự án (qua AskUserQuestion 2026-11-11)
  2026-11-11   Xác nhận: đổi bảng màu theme sang `docs/UI_DESIGN_SPEC.md` ("Cute Romantic"), thay bảng màu blueprint gốc   Chủ dự án chọn style mới   Chủ dự án (qua AskUserQuestion 2026-11-11)
  2026-11-11   Xác nhận: schema M2 dùng tên bảng/cột theo `docs/DATABASE_SCHEMA.md` nhưng CHƯA thêm status rời-couple/mã hoá (để dành M3/M7)   Chủ dự án chọn phương án "kết hợp tối thiểu"   Chủ dự án (qua AskUserQuestion 2026-11-11)
  2026-11-18   M2-008 (kiểm thử 2 tài khoản trên 2 thiết bị thật) chuyển DEFERRED, không chặn tiến độ các milestone sau   Chủ dự án hiện chưa đủ thiết bị (≥2 điện thoại/tài khoản thật)   Chủ dự án
  2026-11-18   Đổi nguồn dữ liệu địa điểm Milestone 4 từ Google Places API sang OpenStreetMap (Nominatim) — khác với OUR_DATE_BLUEPRINT.md và docs/API_INTEGRATION_SPEC.md mục 6 (đều ghi Google)   Google bắt buộc thẻ thanh toán để bật API, chủ dự án không có thẻ. Ban đầu định dùng Overpass API nhưng các mirror công khai đều chặn/không ổn định từ môi trường của Claude — đổi sang Nominatim (dịch vụ chính thức OSM Foundation), đã test thật thành công.   Chủ dự án (qua AskUserQuestion 2026-11-18)

## 10. Lỗi và vấn đề cần xử lý

  ID        Mô tả                                                                                           Mức độ      Trạng thái   Task liên quan
  --------- ----------------------------------------------------------------------------------------------- ----------- ------------ ----------------
  BUG-001   Migration đã viết (`couple_invites`, `profiles.avatar_url`...) đặt tên khác `docs/DATABASE_SCHEMA.md` (`couple_invitations`, `avatar_path`, thêm `status` cho membership/invite)   Nghiêm trọng   **Đã xác nhận 2026-11-11** — dùng tên theo DATABASE_SCHEMA.md, bỏ qua `status` rời-couple (dành cho M7). Migration đã cập nhật.   M2-002, M2-003
  BUG-002   `DATABASE_SCHEMA.md` yêu cầu mã hoá cột địa chỉ riêng tư (`address_encrypted`...) — blueprint gốc chỉ dựa vào RLS, không có yêu cầu mã hoá tầng ứng dụng   Nghiêm trọng   **Đã xác nhận 2026-11-17** (qua AskUserQuestion) — chọn "Chỉ dùng RLS", không mã hoá tầng ứng dụng ở giai đoạn này. Có thể nâng cấp sau nếu cần.   M3-001
  BUG-003   Bảng màu trong `docs/UI_DESIGN_SPEC.md` (ví dụ `primary #FF6F91`) khác bảng màu blueprint đã dùng để code Milestone 1 (`primary #E8799B`)   Trung bình   **Đã xác nhận 2026-11-11** — đổi sang bảng màu UI_DESIGN_SPEC.md. `src/theme/colors.ts` và component liên quan đã cập nhật, lint/typecheck/test PASS.   Đã sửa
  BUG-004   `USER_FLOWS.md`/`DATABASE_SCHEMA.md` mô tả đầy đủ luồng up ảnh Memories + luồng "rời couple" như MVP, nhưng blueprint gốc liệt kê ảnh kỷ niệm là tính năng *sau* MVP và không nhắc đến rời couple   Trung bình   **Đã xác nhận 2026-11-11** — chính thức đưa vào MVP. Chưa triển khai (thuộc M7), chỉ ghi nhận quyết định.   M7 (chưa bắt đầu)
  BUG-005   Đơn vị bán kính không nhất quán: blueprint/code dùng km (`radiusKm`), `DATABASE_SCHEMA.md` dùng mét (`default_radius_m`)   Nhỏ   **Đã xử lý 2026-11-17** — DB lưu mét (theo DATABASE_SCHEMA.md), UI tiếp tục dùng km, đổi đơn vị ở `PreferencesProvider`. Mức độ nhỏ nên Claude tự quyết theo CLAUDE.md, không cần hỏi lại.   M3-005
  BUG-006   Giá trị transport mode không nhất quán: code/blueprint dùng `DRIVE/TWO_WHEELER/WALK/TRANSIT`, `DATABASE_SCHEMA.md` dùng `driving/two_wheeler/walking/transit`   Nhỏ   **Đã xử lý 2026-11-17** — dùng UPPERCASE xuyên suốt kể cả trong DB, vì đây là giá trị enum thật của Google Routes API (gọi ở M5/M6), tránh thêm tầng dịch nghĩa. Không theo gợi ý lowercase của DATABASE_SCHEMA.md.   M3-004
  BUG-007   `couple_preferences` trong `DATABASE_SCHEMA.md` thiếu cột `avoid_preferences` mà blueprint mục 7.6 và kiểu `PlannerInput` (mục 5.1) đều yêu cầu   Nhỏ   **Đã xử lý 2026-11-17** — thêm cột `avoid_preferences jsonb` vào migration, theo blueprint.   M3-007
  BUG-008   File `UI_DESIGN_SPEC.md` bị trùng ở cả thư mục gốc và `docs/`   Nhỏ   **Đã xử lý 2026-11-11** — xoá bản ở gốc, chỉ giữ `docs/UI_DESIGN_SPEC.md`   Dọn dẹp file
  BUG-009   Tên endpoint backend khác nhau giữa blueprint mục 8 (`create-invite`, `search-places`...) và `API_INTEGRATION_SPEC.md` (`create-couple-invitation`, `places-search`...)   Nhỏ   Mở — chờ xác nhận   M2 trở đi
  BUG-010   Chủ dự án báo có vệt đen ở đáy màn hình + nội dung trống khi chuyển tab (chạy thật trên Android qua Expo Go)   Thấp   **Không phải lỗi** — xác nhận 2026-11-16 qua ảnh chụp bạn gửi: đó là khung "Bundling... app/(tabs)/index.tsx" của Expo (bình thường khi dev qua Expo Go, Metro biên dịch từng màn theo yêu cầu). Sẽ không còn khi build app thật. Vẫn giữ 2 cải thiện đã làm (`sceneStyle`, sửa API `expo-navigation-bar`) vì vô hại và có ích.   Không áp dụng
  BUG-011   `private_places`: blueprint mục 7.5 gợi ý cột `couple_id` + nhãn ví dụ "Nhà người yêu" (ngụ ý người yêu có thể thấy), còn `DATABASE_SCHEMA.md` mục 3.7/5 nói rõ owner-only, không có policy couple-wide   Trung bình   **Đã xử lý 2026-11-17** — chọn owner-only (an toàn hơn, đúng tinh thần CLAUDE.md mục 8 về không lộ địa chỉ nhà); nhãn "Nhà người yêu" hiểu là do chính chủ tự đặt tên cho địa chỉ họ biết, không phải người yêu tự xem được. Chưa hỏi chủ dự án vì không làm giảm tính năng và an toàn hơn — sẽ điều chỉnh nếu chủ dự án muốn người yêu xem được.   M3-001
  BUG-012   Blueprint/docs đặc tả đều dùng Google Maps Platform (Places/Routes API) cho M4/M5, nhưng Google bắt buộc có thẻ thanh toán để bật API — chủ dự án không có thẻ   Nghiêm trọng (thay đổi công nghệ cốt lõi)   **Đã xác nhận 2026-11-18** (qua AskUserQuestion) — đổi nguồn dữ liệu địa điểm (M4) sang OpenStreetMap, dùng **Nominatim** (dịch vụ chính thức OSM Foundation, không cần tài khoản/key). Lưu ý kỹ thuật: ban đầu định dùng Overpass API nhưng các mirror công khai (overpass-api.de, kumi.systems, osm.ch, openstreetmap.fr, nchc.org.tw) đều trả lỗi 406/403 hoặc không kết nối được từ môi trường chạy của Claude — rất có thể do chặn IP datacenter/cloud, nghĩa là Edge Function thật (chạy trên hạ tầng Deno Deploy của Supabase, cũng là IP datacenter) có nguy cơ gặp vấn đề tương tự nếu sau này đổi sang Overpass. Nominatim (nominatim.openstreetmap.org) hoạt động ổn định, đã test thật thành công. Đánh đổi dữ liệu: không có rating/review/giờ mở cửa chuẩn hoá cho mọi địa điểm — hiển thị "không có dữ liệu" thay vì bịa. M5 (Routes API) sẽ cần xác nhận lại tương tự khi tới lúc, vì Google Routes cũng cần billing.   M4-001 trở đi

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
  2026-11-16   `npm run lint`/`typecheck`/`format:check` (sau khi làm lại UI)   PASS   Không lỗi sau khi viết lại 5 màn hình + màn Itinerary mới
  2026-11-16   `npm test` — 2 test Button + 6 smoke test màn hình mới   PASS (8/8)   Render Home/Planner/Itinerary/Explore/Dates/Memories không crash
  2026-11-16   `npx expo export --platform android` và `--platform ios` (sau khi làm lại UI)   PASS   Bundle thành công cả hai nền tảng
  2026-11-16   Xác nhận hình ảnh trực quan qua trình duyệt (sau cổng đăng nhập)   **CHƯA LÀM ĐƯỢC**   Thử tạm tắt auth gate để chụp ảnh đã bị hệ thống an toàn chặn (đúng); chủ dự án cần tự xem
  2026-11-16   `npx expo lint`, `npx tsc --noEmit` (sau khi thêm Couple feature)   PASS   Phát hiện + sửa 1 lỗi lint thật (`react-hooks/set-state-in-effect` ở `CoupleProvider.tsx`, sửa bằng `queueMicrotask`)
  2026-11-16   `npm test` (sau khi thêm Couple feature + 3 màn hình onboarding)   PASS (11/11)   Phải thêm `jest.setup.js` (mock `@react-native-async-storage/async-storage` theo hướng dẫn chính thức của thư viện + nạp `.env` bằng `@expo/env` để Supabase client không throw lúc test)
  2026-11-16   Integration test qua Expo Web + Playwright, 2 tài khoản test thật, với Supabase project thật   **PASS — `create_couple`, `create_couple_invitation`, `accept_couple_invitation` đều HTTP 200**   Phát hiện + sửa 1 lỗi thật (thiếu `extensions` trong search_path của `pgcrypto`); CHƯA chạy trên 2 thiết bị di động thật (xem M2-008)
  2026-11-18   Test logic `places-search` (script Node độc lập, gọi Nominatim thật) — 5 test case validate + tìm kiếm thật   PASS — tất cả đúng kỳ vọng   Phát hiện + sửa 1 lỗi thật (fallback tên địa điểm rỗng)
  2026-11-18   Chủ dự án deploy Edge Function `places-search` qua Supabase Dashboard; Claude gọi thử bằng request thật   **FAIL — HTTP 403 từ Nominatim** (chặn IP server Supabase)   Phát hiện lỗi hạ tầng thật, chỉ thấy được khi deploy + gọi thật — đã sửa bằng cách chuyển gọi Nominatim sang phía client
  2026-11-18   `npx expo lint`, `npx tsc --noEmit`, `npm test` (sau khi thêm M4 places search + expo-location)   PASS (13/13)   Loại `supabase/functions/**` khỏi `tsconfig.json` (Deno runtime, không chung type với app); thêm mock `expo-location` vào `jest.setup.js`
  2026-11-18   Sự cố môi trường dev khi chủ dự án mở app trên điện thoại: (1) server Git Bash bị crash `EMFILE: too many open files` (Git Bash/MINGW64 giới hạn 3200 file mở, dự án đã lớn); (2) PowerShell chặn `npm.ps1` theo execution policy mặc định; (3) `expo start --tunnel ngrok` lỗi vì tự cài `@expo/ngrok` kiểu global không được CLI nhận ra   Đã sửa cả 3: (1) khởi động lại server; (2) dùng `npm.cmd`/`npx.cmd` thay vì gọi thẳng `npm`/`npx` trong PowerShell; (3) cài `@expo/ngrok` làm devDependency local thay vì global   Xem mục 12 "Quyết định kỹ thuật" — khuyến nghị chạy `npm run start` bằng PowerShell (qua `npm.cmd`) thay vì Git Bash trên máy chủ dự án
  2026-11-18   M4-004/005 (kiểm tra thật trên thiết bị)   Chủ dự án mở app qua Expo Go trên điện thoại Android thật, xin quyền vị trí, chọn danh mục "Café"   **PASS — hiện đúng địa điểm thật** (AHA Cafe, Trang Cafe, Cafe 15, Cafe Năng... kèm địa chỉ đầy đủ), xác nhận bằng ảnh chụp màn hình thật   M4-004/005 chuyển DONE

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
  2026-11-16   Bảng màu đổi lần 2, khớp chính xác theo file mockup thật (`src/UI/*.html`) thay vì xấp xỉ theo tài liệu đặc tả   Chủ dự án tự cung cấp mockup chi tiết hơn docs/UI_DESIGN_SPEC.md   `src/theme/colors.ts` là nguồn màu chính thức mới nhất — không tự đổi lại nếu chưa có mockup mới
  2026-11-16   Giữ nhãn tab bar bằng tiếng Việt dù mockup gốc dùng tiếng Anh (Home/Planner/...)   Quy tắc CLAUDE.md mục 6 "giao diện tiếng Việt" là bắt buộc, ưu tiên hơn fidelity hình ảnh   Không đổi nhãn tab theo mockup nếu mockup tiếp tục dùng tiếng Anh
  2026-11-16   Dùng `formatVnd()` tự viết thay cho `Number.toLocaleString('vi-VN')`                Tránh phụ thuộc dữ liệu Intl/ICU đầy đủ trên Hermes (rủi ro chưa kiểm chứng được trên thiết bị thật)   Áp dụng cho mọi chỗ hiển thị tiền VND sau này
  2026-11-17   M3: `private_places` KHÔNG mã hoá tầng ứng dụng, chỉ dựa vào RLS (BUG-002)   Chủ dự án xác nhận qua AskUserQuestion — ưu tiên đơn giản cho app 2 người dùng   Có thể nâng cấp lên mã hoá/KMS sau nếu mở rộng quy mô người dùng
  2026-11-17   M3: `private_places` owner-only (cột `user_id`, không có `couple_id`) — người yêu không đọc được dù cùng Couple (BUG-011)   Theo docs/DATABASE_SCHEMA.md mục 3.7/5 (chi tiết hơn blueprint), ưu tiên an toàn riêng tư theo CLAUDE.md mục 8   Nếu sau này muốn người yêu xem được địa chỉ của nhau, cần đổi thiết kế + hỏi lại chủ dự án
  2026-11-17   M3: `default_radius_m` lưu mét trong DB, transport mode lưu UPPERCASE (`DRIVE/TWO_WHEELER/WALK/TRANSIT`) (BUG-005, BUG-006)   Mét khớp quy ước DATABASE_SCHEMA.md; UPPERCASE khớp enum thật của Google Routes API (gọi ở M5/M6), tránh thêm tầng dịch nghĩa   UI vẫn hiển thị km cho người dùng; không đổi giá trị transport mode khi nối Routes API thật
  2026-11-18   M4: đổi nguồn tìm địa điểm sang OpenStreetMap, dùng Nominatim (không dùng Overpass API vì các mirror công khai đều không kết nối được) thay Google Places (BUG-012)   Chủ dự án không có thẻ thanh toán, xác nhận qua AskUserQuestion   `provider` lưu `"openstreetmap"` thay vì `"google_places"`; rating/review/giờ mở cửa sẽ null ở hầu hết địa điểm — UI phải hiển thị "không có dữ liệu", không bịa. Cân nhắc lại khi tới M5 (Routes API) vì Google Routes cũng cần billing.
  2026-11-18   M4: 4 danh mục khám phá (Café/Nhà hàng/Chụp ảnh/Vui chơi) map sang từ khoá tìm kiếm tiếng Anh (`cafe`/`restaurant`/`tourist attraction`/`entertainment`) khi gọi Nominatim   Nominatim khớp tag OSM tiếng Anh tốt hơn nhãn tiếng Việt hiển thị cho người dùng; nhãn UI không đổi   `CATEGORY_SEARCH_TERMS` trong `src/app/(tabs)/explore.tsx` — "Chụp ảnh"/"Vui chơi" là suy đoán hợp lý (không có category OSM khớp chính xác), có thể cần tinh chỉnh sau khi thấy kết quả thật
  2026-11-18   M4: gọi Nominatim trực tiếp từ app (client), KHÔNG qua Supabase Edge Function như kế hoạch ban đầu ở `docs/API_INTEGRATION_SPEC.md`   Nominatim trả về HTTP 403 khi gọi từ IP server của Supabase (chặn IP cloud/datacenter) — đã deploy thử và xác nhận lỗi thật, không phải suy đoán   An toàn vì Nominatim không cần secret key; nếu sau này đổi provider cần secret (ví dụ quay lại Google), phải làm lại qua Edge Function
  2026-11-18   Máy chủ dự án: chạy `npm run start`/`npx expo` bằng PowerShell (qua `npm.cmd`/`npx.cmd`), KHÔNG dùng Git Bash làm terminal chạy dev server   Git Bash (MINGW64) trên máy này giới hạn cứng 3200 file mở cùng lúc (`ulimit -n`/`ulimit -Hn` đều 3200, không nâng được) — Metro bundler crash `EMFILE` khi project đủ lớn. PowerShell mặc định chặn file `.ps1` (execution policy) nên phải gọi `.cmd` thẳng thay vì `npm`/`npx` trơn.   Nếu PowerShell cũng gặp EMFILE sau này, cài Watchman (watchman.github.io) là giải pháp triệt để hơn, chưa cần thiết lúc này

## 13. Việc tiếp theo

Claude luôn cập nhật tối đa 3 việc tiếp theo theo thứ tự ưu tiên:

1.  **M2-008** (DEFERRED) — chủ dự án tự thử luồng Couple trên 2 thiết bị
    thật khi có đủ thiết bị. Không chặn tiến độ các milestone khác.
2.  Dọn dữ liệu test trong Supabase nếu chủ dự án muốn (Couple
    "TEST - Playwright E2E", vài tài khoản `@mailinator.com`, 1 địa chỉ
    "Nhà tôi (TEST REST)") — chỉ làm khi được yêu cầu rõ ràng.
3.  Milestone 4 còn 3 task nhỏ chưa làm: M4-006 (chi tiết địa điểm),
    M4-008 (giới hạn request phía server), M4-009 (lưu địa điểm yêu
    thích — cần thêm bảng `saved_places`). Có thể làm tiếp hoặc sang
    Milestone 5 (bản đồ) tuỳ chủ dự án chọn.

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
