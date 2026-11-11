# OUR DATE --- UI DESIGN SPECIFICATION

**Version:** 1.0\
**Product:** Our Date --- ứng dụng lập kế hoạch hẹn hò dành riêng cho
hai người\
**Platforms:** Android và iOS\
**Ngôn ngữ mặc định:** Tiếng Việt\
**Phong cách đã chọn:** Cute Romantic (B)\
**Theme:** Light Mode + Dark Mode\
**Navigation:** 5 tab --- Home, Planner, Explore, Dates, Memories

## 1. Mục đích và thứ tự ưu tiên

Đây là đặc tả giao diện chính thức để Claude Code triển khai UI Our
Date. Đọc tài liệu này cùng `CLAUDE.md`, `OUR_DATE_BLUEPRINT.md` và
`PROGRESS.md` trước khi sửa code.

Ưu tiên khi có mâu thuẫn: 1. Quy tắc bảo mật/kỹ thuật trong `CLAUDE.md`.
2. Phạm vi sản phẩm/kiến trúc trong `OUR_DATE_BLUEPRINT.md`. 3. Quyết
định giao diện đã xác nhận trong file này. 4. `PROGRESS.md` là nguồn
trạng thái tiến độ thực tế.

Không tự ý đổi phong cách Cute Romantic, hai theme hoặc cấu trúc 5 tab.
Nếu cần thay đổi lớn, phải giải thích và xin xác nhận.

## 2. Design direction

Our Date là không gian riêng tư, ấm áp của một cặp đôi. Giao diện cần: -
Ngọt ngào, đáng yêu, hiện đại; lãng mạn vừa phải, không quá sến hoặc trẻ
con. - Dễ dùng bằng một tay, mobile-first, nhất quán Android/iOS. - Card
bo góc, bóng đổ nhẹ, nhiều khoảng trắng. - Ảnh địa điểm thật là trọng
tâm ở Explore và lịch trình. - Minh họa couple/mascot và trái tim chỉ là
điểm nhấn, không lấn át nội dung.

Tránh lạm dụng hồng đậm, gradient, sticker, animation; tránh chữ nhỏ/độ
tương phản thấp; không dùng emoji thay toàn bộ icon hệ thống.

## 3. Design tokens

Tạo theme/token tập trung; không hardcode màu rải rác trong từng
screen/component.

### 3.1 Light Mode

  Token                Value       Usage
  -------------------- ----------- ----------------------
  `background`         `#FFF7F8`   Nền màn hình
  `surface`            `#FFFFFF`   Card/sheet
  `surfaceSecondary`   `#FFF0F4`   Nền phụ
  `primary`            `#FF6F91`   CTA/tab active
  `primaryPressed`     `#E9577D`   Trạng thái nhấn
  `primarySoft`        `#FFD6E2`   Chip/icon background
  `secondary`          `#B86A83`   Nhấn phụ
  `textPrimary`        `#49313B`   Chữ chính
  `textSecondary`      `#866D78`   Chữ phụ
  `border`             `#F1DDE4`   Viền
  `success`            `#3D9B75`   Thành công
  `warning`            `#E5A33B`   Cảnh báo
  `danger`             `#D94D67`   Lỗi/nguy hiểm
  `tabBar`             `#FFFFFF`   Thanh tab

### 3.2 Dark Mode

  Token                Value       Usage
  -------------------- ----------- ----------------------
  `background`         `#171317`   Nền màn hình
  `surface`            `#241D23`   Card/sheet
  `surfaceSecondary`   `#30232C`   Nền phụ
  `primary`            `#FF789B`   CTA/tab active
  `primaryPressed`     `#E85E83`   Trạng thái nhấn
  `primarySoft`        `#593344`   Chip/icon background
  `secondary`          `#D58BA2`   Nhấn phụ
  `textPrimary`        `#FFF0F4`   Chữ chính
  `textSecondary`      `#C2AAB5`   Chữ phụ
  `border`             `#493541`   Viền
  `success`            `#75C6A2`   Thành công
  `warning`            `#F0BE65`   Cảnh báo
  `danger`             `#F17B91`   Lỗi/nguy hiểm
  `tabBar`             `#211A20`   Thanh tab

### 3.3 Typography và layout

-   Font ưu tiên: Be Vietnam Pro; có thể dùng Nunito cho tiêu đề nếu
    tích hợp ổn định.
-   Display: 28--32px / 700.
-   Screen title: 22--26px / 700.
-   Section title: 17--20px / 700.
-   Card title: 15--17px / 600--700.
-   Body: 14--16px / 400--500.
-   Caption: 12--13px / 400--500.
-   Button: 14--16px / 600--700.
-   Không dùng caption dưới 12px cho thông tin quan trọng; hỗ trợ tiếng
    Việt có dấu và font scaling.

Spacing theo bội số 4: 4, 8, 12, 16, 20, 24, 32px.\
Radius: chip 999; input 14--16; button 16--20; card 18--22; bottom sheet
từ 24px ở cạnh trên.\
Shadow nhẹ. Tôn trọng safe area, notch, status bar và gesture bar.

## 4. Điều hướng 5 tab

    Thứ tự Tab        Icon gợi ý         Route gợi ý
  -------- ---------- ------------------ --------------------
         1 Home       `house`            `/(tabs)/home`
         2 Planner    `sparkles`         `/(tabs)/planner`
         3 Explore    `compass`          `/(tabs)/explore`
         4 Dates      `calendar-heart`   `/(tabs)/dates`
         5 Memories   `images`           `/(tabs)/memories`

Quy tắc: - Bottom tab bar cố định, active dùng `primary`, inactive dùng
`textSecondary`. - Có label dưới icon, nền theo theme và đường phân cách
nhẹ. - Nội dung không bị tab bar che; dùng safe-area/insets. - Chỉ ẩn
tab bar ở flow toàn màn hình/chi tiết khi thực sự cần. - Chuyển tab
không làm mất dữ liệu form đang nhập ngoài ý muốn. - Cả 5 tab phải điều
hướng được, không tạo tab trang trí.

## 5. Chi tiết màn hình

### 5.1 Home

**Mục tiêu:** màn hình đầu tiên, giúp hai người nắm nhanh tình trạng kế
hoạch và bắt đầu buổi hẹn.

Bố cục từ trên xuống: 1. Header: wordmark `Our Date ♡`, lời chào theo
thời gian, tên hiển thị nếu có, trạng thái kết nối couple/thông báo. 2.
Couple card: ảnh đại diện hai người hoặc minh họa; thời gian bên nhau
chỉ khi người dùng đã nhập ngày kỷ niệm. Không tự suy đoán ngày yêu. 3.
Today card: thời tiết chỉ hiển thị khi có nguồn dữ liệu hợp lệ. Nếu chưa
tích hợp, thay bằng nội dung tĩnh hữu ích, không bịa số liệu. 4.
Upcoming date: lịch hẹn gần nhất, ngày/giờ, số điểm dừng, trạng thái;
chạm để mở chi tiết. 5. Suggested for you: card ảnh địa điểm, tên và
loại địa điểm; rating/giá/khoảng cách chỉ khi có dữ liệu nguồn. 6. CTA
nổi bật: `Lên kế hoạch hẹn hò` dẫn tới Planner.

States: loading skeleton, empty state mời tạo buổi hẹn đầu tiên, error
có nút thử lại, offline hiển thị cache nếu có và thông báo mất kết nối.

### 5.2 Planner --- AI Date Planner

**Mục tiêu:** nhập mong muốn và nhận lịch trình có thể thực hiện được.

Bố cục: 1. Header `AI Date Planner ✨` và mô tả ngắn. 2. Form: ngày hẹn,
giờ bắt đầu, giờ kết thúc/thời lượng, ngân sách, phương tiện, bán kính
tìm kiếm (mặc định 15km, cho phép đổi). 3. Phương tiện: xe máy, ô tô, đi
bộ, phương tiện công cộng. 4. Sở thích multi-select chips: ăn uống,
cafe, chụp ảnh, đi dạo, vui chơi, xem phim, thiên nhiên, mua sắm. 5. Tùy
chọn thêm: trong nhà/ngoài trời, yên tĩnh/sôi động, lưu ý ăn uống nếu
người dùng chủ động cung cấp. 6. CTA `Tạo lịch trình bằng AI`.

UX: - Validate ngày/giờ/ngân sách. - Tùy chọn nâng cao không bắt buộc. -
Thể hiện rõ các bước đang tìm địa điểm/tính tuyến đường/tạo lịch
trình. - Không giả lập phần trăm tiến độ nếu backend không cung cấp. -
Khi thiếu dữ liệu/API lỗi, giải thích và cho phép thử lại/điều chỉnh. -
Không gửi địa chỉ nhà riêng cho AI provider. Xử lý điểm xuất phát riêng
tư qua backend và chỉ gửi dữ liệu tối thiểu cần thiết.

**Màn hình kết quả** có ba chế độ: `Tổng quan`, `Bản đồ`, `Chi tiết`.

Mỗi stop card: - Ảnh, tên địa điểm, địa chỉ đủ nhận biết. -
Rating/review count nếu Places API trả về. - Khoảng thời gian dự kiến ở
đó. - Khoảng di chuyển từ điểm trước. - Chi phí ước tính và nguồn/độ tin
cậy nếu có. - Nút thay địa điểm/bỏ điểm dừng.

Tóm tắt cuối lịch trình: tổng thời lượng, tổng quãng đường, tổng chi phí
dự kiến; nút `Lưu lịch trình`, `Chỉnh sửa`, `Chia sẻ với người ấy`.

**Quy tắc dữ liệu:** AI không được bịa địa điểm, giờ mở cửa, rating,
giá, khoảng cách hoặc thời gian di chuyển. Dữ liệu phải lấy từ
Places/Routes hoặc nguồn xác định. Logic xếp lịch, kiểm tra thời
gian/ngân sách xử lý bằng code xác định; AI hỗ trợ hiểu sở thích, giải
thích và diễn đạt. Không lấy thời gian ô tô rồi gắn nhãn xe máy nếu
provider không hỗ trợ mode xe máy.

### 5.3 Explore

**Mục tiêu:** khám phá địa điểm thực tế trong khu vực hai người quan
tâm.

Bố cục: 1. Header `Khám phá`. 2. Search bar tìm nhà hàng/cafe/địa điểm
vui chơi và nút filter. 3. Category chips: Cafe, Nhà hàng, Chụp ảnh, Vui
chơi, Rạp phim, Ngoài trời. 4. Chuyển chế độ `Danh sách` / `Bản đồ`. 5.
Nearby places: ảnh, tên, loại, rating/review count nếu có, khoảng cách
nếu tính được, price level nếu nguồn có, nút lưu yêu thích.

Filters: bán kính, danh mục, khoảng giá, rating tối thiểu, đang mở cửa
(chỉ khi giờ mở cửa đủ mới), sắp xếp phù hợp/khoảng cách/đánh giá.

Map: - Marker phải tương ứng với địa điểm thực tế trong kết quả. - Chạm
marker mở preview card. - Không tự tạo địa điểm/tọa độ. - Xin quyền vị
trí đúng ngữ cảnh; nếu từ chối, cho phép chọn khu vực. - Không hiển thị
vị trí nhà riêng công khai.

### 5.4 Dates

**Mục tiêu:** quản lý lịch hẹn chung và xem lại những buổi hẹn đã qua.

Bố cục: 1. Header `Lịch hẹn`. 2. Segmented switch `Lịch của chúng ta` /
`Đã qua`. 3. Calendar tháng: ngày có lịch được đánh dấu, ngày chọn được
highlight, hỗ trợ đổi tháng. 4. Danh sách lịch: ngày/giờ, tên buổi hẹn,
số điểm dừng, trạng thái. 5. Floating action button `+` để tạo lịch thủ
công hoặc mở Planner.

Chi tiết buổi hẹn: tên, ngày giờ, địa điểm, bản đồ/tuyến đường, ngân
sách, ghi chú, người tạo, trạng thái xác nhận, chỉnh sửa/hủy theo quyền,
đánh dấu hoàn thành và tạo kỷ niệm.

Trạng thái có thể gồm: nháp, chờ xác nhận, đã xác nhận, hoàn thành, đã
hủy. Khi một người chỉnh sửa, người còn lại nhận cập nhật; không ghi đè
thay đổi đồng thời mà không thông báo.

### 5.5 Memories

**Mục tiêu:** nhật ký riêng lưu khoảnh khắc và địa điểm đặc biệt.

Bố cục: 1. Header `Kỷ niệm`. 2. Hero card ảnh nổi bật; số lượng kỷ niệm
chỉ dùng dữ liệu thật. 3. Tabs nội bộ `Timeline`, `Album`, `Địa điểm`.
4. Timeline: ngày, tên buổi hẹn, ảnh, ghi chú. 5. Album: grid ảnh, mở
ảnh toàn màn hình. 6. Địa điểm: danh sách/map những nơi đã đánh dấu đã
đến.

Tạo kỷ niệm: - Chọn ảnh từ thư viện/camera sau khi xin quyền. - Chọn
buổi hẹn liên quan (không bắt buộc). - Ngày, địa điểm, caption. - Mặc
định chỉ hai thành viên couple xem được. - Sửa/xóa theo quyền; thao tác
xóa phải có xác nhận.

States: empty, loading, uploading, upload failed có nút thử lại, offline
có thể xem cache nhưng không giả vờ upload thành công.

## 6. Components dùng chung

Tạo component tái sử dụng, hỗ trợ theme qua tokens: - `AppScreen`,
`AppHeader`, `BottomTabBar` - `PrimaryButton`, `SecondaryButton`,
`IconButton` - `SearchInput`, `FormField`, `DatePickerField`,
`TimePickerField`, `BudgetInput` - `TransportSelector`,
`PreferenceChip` - `SectionHeader`, `PlaceCard`, `PlaceListItem` -
`DatePlanCard`, `ItineraryStopCard`, `CalendarMonthView` - `EmptyState`,
`ErrorState`, `LoadingSkeleton` - `ConfirmDialog`, `BottomSheet`,
`ThemeToggle`

Không tạo hai bản component Light/Dark nếu chỉ cần dùng theme tokens.

## 7. Theme behavior

Settings cần có `Light`, `Dark`, `System`. Mặc định theo thiết lập hệ
thống hoặc lựa chọn đã lưu. Lưu lựa chọn cục bộ. Khi đổi theme, cập nhật
toàn bộ app: background, surface, border, text, icon, input, modal, tab
bar, skeleton, status/navigation bar. Không phủ tint làm sai màu ảnh.
Kiểm tra tương phản ở cả hai theme.

## 8. Responsive, accessibility và motion

-   Hỗ trợ nhiều kích thước điện thoại Android/iOS.
-   Safe area cho notch, Dynamic Island, status bar và gesture bar.
-   Mục tiêu vùng chạm khoảng 44--48dp.
-   Không chỉ dùng màu biểu thị trạng thái; thêm icon/label.
-   Có accessibility label cho icon button và control không có text.
-   Keyboard không che input/CTA.
-   Nội dung dài phải scroll, tránh fixed height cắt nội dung.
-   Animation nhẹ: tab transition, button press, favorite toggle, bottom
    sheet, skeleton, lưu thành công.
-   Không lạm dụng animation; tôn trọng Reduce Motion nếu hỗ trợ.

## 9. Dữ liệu, privacy và tích hợp

Trong giai đoạn prototype, dữ liệu demo phải nằm trong mock/fixtures và
được nhận diện rõ là dữ liệu mẫu. Không trình bày dữ liệu giả như dữ
liệu thật.

Khi tích hợp: - Places API cung cấp dữ liệu địa điểm. - Routes API cung
cấp tuyến đường/thời gian trong phạm vi mode được hỗ trợ. - Supabase lưu
tài khoản, couple, preferences, date plans, saved places và memories. -
Realtime đồng bộ giữa hai thành viên. - AI chỉ gọi qua server/Edge
Function. - Google server-side key và AI key không được đưa vào mobile
client hoặc `EXPO_PUBLIC_`. - Supabase `service_role` key tuyệt đối
không ở client. - Không đưa địa chỉ nhà riêng vào source code, mock
data, screenshot, log, analytics hoặc tài liệu công khai. - Dữ liệu
riêng tư phải được bảo vệ bằng authentication và Row Level Security.

## 10. Kỹ thuật triển khai

Tuân theo blueprint: Expo, React Native, TypeScript, Expo Router,
Supabase, Google Places/Routes qua backend phù hợp, EAS khi cần build.

-   TypeScript strict.
-   Tách screen, component, theme, hooks, services và mock data.
-   Tránh screen quá lớn.
-   Không thêm dependency nếu chưa có lý do.
-   Không sửa/xóa file không liên quan.
-   Không tạo API key giả/hardcode secret.
-   Tuân thủ toàn bộ `CLAUDE.md`.

## 11. Thứ tự triển khai

Làm từng task nhỏ, không tạo toàn bộ app trong một lần.

    Thứ tự Task                           Tiêu chí hoàn thành
  -------- ------------------------------ -----------------------------------------
         1 Audit repo                     Báo cáo cấu trúc, dependency, lệnh chạy
         2 Design tokens/theme provider   Light/Dark/System hoạt động
         3 Navigation 5 tab               Chuyển tab, safe area đúng
         4 Shared components              Tái sử dụng và hỗ trợ theme
         5 Home                           Có loading/empty/error/demo state
         6 Planner form                   Nhập liệu và validate
         7 Planner result                 Hiển thị itinerary demo rõ ràng
         8 Explore                        Search/filter/list/map UI
         9 Dates                          Calendar, upcoming, history
        10 Memories                       Timeline, album, create flow
        11 UI QA                          Kiểm tra Android/iOS và hai theme
        12 Cập nhật tiến độ               `PROGRESS.md` phản ánh đúng thực tế

Sau mỗi task độc lập: chạy kiểm tra phù hợp và cập nhật `PROGRESS.md`
ngay. Chỉ đánh dấu DONE khi có bằng chứng test.

## 12. Acceptance criteria

-   [ ] Đủ 5 tab, điều hướng hoạt động.
-   [ ] Có Light, Dark và System theme.
-   [ ] Màu/font/radius/spacing dùng tokens tập trung.
-   [ ] Home có loading, empty, error.
-   [ ] Planner form validate và có màn hình kết quả.
-   [ ] Explore có search, filter, list/map UI.
-   [ ] Dates có calendar, upcoming và history.
-   [ ] Memories có timeline, album và flow thêm kỷ niệm.
-   [ ] Components dùng chung được tái sử dụng.
-   [ ] Không có nút giả hoặc hành động không hoạt động.
-   [ ] Dữ liệu demo không bị trình bày như dữ liệu thật.
-   [ ] Không có secret/địa chỉ riêng tư trong source, mock hoặc log.
-   [ ] Không có lỗi TypeScript/lint nghiêm trọng.
-   [ ] Đã kiểm tra Android và iOS nếu môi trường hỗ trợ; nếu không, ghi
    rõ giới hạn.
-   [ ] `PROGRESS.md` có task, kết quả kiểm tra và bước tiếp theo.

## 13. Prompt giao việc cho Claude Code

Sau khi đặt file này ở thư mục gốc repository với tên
`UI_DESIGN_SPEC.md`, gửi Claude:

> Đọc `CLAUDE.md`, `OUR_DATE_BLUEPRINT.md`, `PROGRESS.md` và
> `UI_DESIGN_SPEC.md` trước khi làm việc.
>
> Đặc tả giao diện đã được người dùng chọn: Cute Romantic, Light + Dark
> Mode, 5 tab Home / Planner / Explore / Dates / Memories.
>
> Trước tiên kiểm tra repository và trạng thái thực tế. Đối chiếu với
> `PROGRESS.md`, không giả định task đã hoàn thành nếu chưa kiểm tra.
>
> Bắt đầu từ task UI đầu tiên còn phù hợp. Làm từng task nhỏ, chạy kiểm
> tra, cập nhật `PROGRESS.md` ngay sau mỗi task độc lập.
>
> Không triển khai toàn bộ app trong một lần. Không tự ý đổi thiết
> kế/kiến trúc hoặc thêm tính năng ngoài phạm vi. Nếu cần quyết định sản
> phẩm, hỏi tôi bằng tiếng Việt trước.
>
> Báo cáo bằng tiếng Việt: file đã tạo/sửa, hành vi hoàn thành, lệnh
> test và kết quả, task tiếp theo, việc tôi cần làm (nếu có).

------------------------------------------------------------------------

**OUR DATE UI DESIGN SPECIFICATION --- v1.0**
