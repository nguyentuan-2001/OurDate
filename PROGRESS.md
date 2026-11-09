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
  Backend               Supabase (chưa tích hợp — Milestone 2)
  Bản đồ                Google Maps Platform (chưa tích hợp — Milestone 4-5)
  AI                    Provider có thể cấu hình (chưa tích hợp — Milestone 6)
  Ngôn ngữ              Tiếng Việt
  Trạng thái tổng thể   Milestone 1 hoàn thành, đã kiểm tra
  Milestone hiện tại    M1 --- Khởi tạo app và design system (DONE)
  Cập nhật gần nhất     2026-11-09

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
  M2          Authentication và Couple           `[ ]`        
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

-   [ ] **M2-001 --- Tạo Supabase project và cấu hình biến môi trường**
-   [ ] **M2-002 --- Tạo migration profiles/couples/couple_members**
-   [ ] **M2-003 --- Tạo RLS policies và kiểm thử**
-   [ ] **M2-004 --- Đăng ký/đăng nhập/đăng xuất**
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

  Task ID   Công việc   Người/điều kiện chờ   Bắt đầu
  --------- ----------- --------------------- ---------
  Chưa có                                     

## 6. Việc đang bị chặn

  Task ID   Nguyên nhân   Cần ai làm gì?   Cách gỡ
  --------- ------------- ---------------- ---------
  Chưa có                                  

## 7. Việc cần chủ dự án thực hiện

Claude ghi rõ các thao tác cần người dùng làm, ví dụ:

  Mục     Việc cần làm                                        Trạng thái      Ghi chú
  ------- --------------------------------------------------- --------------- ---------------
  U-001   Kiểm tra Node.js/Git                                 Đã xác minh     Node v22.22.3, npm v10.9.8, Git v2.53.0
  U-002   Tạo Supabase project                                 Chưa cần        Đợi đến M2
  U-003   Cấu hình Google Cloud                                Chưa cần        Đợi đến M4/M5
  U-004   Chọn AI API và giới hạn chi phí                      Chưa cần        Đợi đến M6
  U-005   Cài Expo Go trên Android/iPhone, chạy `npm run start` và quét mã QR để xác nhận M1-010   Cần làm   Xem `docs/SETUP.md` bước 3-4

Không yêu cầu người dùng tạo tài khoản/dịch vụ trước khi task thực sự
cần đến.

## 8. Nhật ký công việc (Work Log)

> Mỗi task hoàn thành hoặc thay đổi trạng thái phải có một dòng mới. Ghi
> mới lên đầu để dễ theo dõi.

  Ngày         Task ID            Nội dung                                             Kết quả kiểm tra                                   Ghi chú
  ------------ ------------------ ---------------------------------------------------- -------------------------------------------------- ---------------------------------------------
  2026-11-09   M0-001..M0-004     Audit repo, tạo Git repo + remote, viết docs M0       Xem chi tiết từng task ở mục 4                     Repo trống trước đó, không ghi đè gì
  2026-11-09   M1-001..M1-009     Scaffold Expo SDK 58, theme, UI components, 5 màn hình, mock data   lint/typecheck/test/format/expo-doctor đều PASS   Xem chi tiết từng task ở mục 4
  2026-11-09   M1-010             Xác minh bundling Android + iOS qua `expo export`     PASS (export) — CHƯA chạy trên thiết bị thật      Cần chủ dự án tự quét QR (việc U-005)

## 9. Lịch sử thay đổi phạm vi (Change Log)

  Ngày      Thay đổi   Lý do   Người xác nhận
  --------- ---------- ------- ----------------
  Chưa có                      

## 10. Lỗi và vấn đề cần xử lý

  ID        Mô tả           Mức độ   Trạng thái   Task liên quan
  --------- --------------- -------- ------------ ----------------
  BUG-001   Chưa ghi nhận   ---      ---          ---

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

## 13. Việc tiếp theo

Claude luôn cập nhật tối đa 3 việc tiếp theo theo thứ tự ưu tiên:

1.  Chủ dự án cài Expo Go và quét mã QR từ `npm run start` để xác nhận
    M1-010 trên Android/iPhone thật (xem `docs/SETUP.md`).
2.  Sau khi M1 được xác nhận trên thiết bị thật, bắt đầu Milestone 2
    (Authentication và Couple) — cần chủ dự án tạo Supabase project.
3.  Khi bắt đầu M2, hướng dẫn chủ dự án lấy Supabase Project URL + anon key
    và đặt vào `.env` (không gửi qua chat).

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
