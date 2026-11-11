# OUR DATE — USER FLOWS

**Phiên bản:** 1.0  
**Trạng thái:** Đặc tả luồng người dùng cho MVP  
**Ngôn ngữ:** Tiếng Việt

## 1. Mục đích

Tài liệu mô tả hành trình của hai thành viên trong một couple khi sử dụng Our Date. Đây là tài liệu bổ sung cho `OUR_DATE_BLUEPRINT.md` và `UI_DESIGN_SPEC.md`.

Nguyên tắc:
- Mọi luồng phải có trạng thái loading, thành công, lỗi và empty phù hợp.
- Không coi thao tác là thành công trước khi server xác nhận.
- Hai tài khoản chỉ nhìn thấy dữ liệu couple mà họ là thành viên.
- Không hiển thị hoặc chia sẻ địa chỉ nhà riêng nếu không có nhu cầu và sự đồng ý rõ ràng.
- MVP ưu tiên luồng cốt lõi hơn tính năng xã hội/phức tạp.

## 2. Vai trò và quyền

### 2.1 Người dùng chưa đăng nhập
Có thể:
- Xem màn hình giới thiệu.
- Đăng ký, đăng nhập, khôi phục mật khẩu.
- Chấp nhận lời mời couple sau khi xác thực.

Không thể:
- Xem kế hoạch, địa điểm đã lưu, kỷ niệm hoặc dữ liệu riêng tư.

### 2.2 Thành viên couple
Hai người có quyền ngang nhau đối với dữ liệu dùng chung, trừ khi một hành động có quy tắc riêng:
- Xem và tạo kế hoạch hẹn hò.
- Chỉnh sửa kế hoạch dùng chung.
- Lưu địa điểm yêu thích.
- Tạo và xem kỷ niệm.
- Mời thành viên còn lại bằng lời mời có thời hạn.

Thông tin cá nhân như tên hiển thị, avatar, tùy chọn theme và địa chỉ riêng tư thuộc quyền sở hữu của từng tài khoản.

### 2.3 Quy tắc couple
- Một tài khoản chỉ thuộc tối đa một couple đang hoạt động trong MVP.
- Một couple có tối đa hai thành viên.
- Không tự động ghép đôi bằng email hoặc số điện thoại.
- Việc tham gia couple phải qua lời mời và xác nhận.
- Thành viên có thể rời couple; cần xác nhận và giải thích hậu quả đối với dữ liệu chung.
- Không xóa dữ liệu couple ngay khi một người rời đi; áp dụng chính sách lưu trữ/xóa đã được xác nhận.

## 3. Luồng khởi động và xác thực

### 3.1 First launch
1. Người dùng mở app.
2. App hiển thị splash/brand.
3. Nếu chưa có session: hiển thị Welcome.
4. Nếu có session hợp lệ: kiểm tra hồ sơ và couple membership.
5. Điều hướng:
   - Chưa hoàn thiện hồ sơ → Profile setup.
   - Chưa có couple → Create/Join couple.
   - Đã có couple → Home.

### 3.2 Đăng ký
1. Nhập email và mật khẩu (hoặc phương thức được bật trong Supabase Auth).
2. Validate định dạng email và yêu cầu mật khẩu.
3. Gửi yêu cầu đăng ký qua Supabase Auth.
4. Nếu cần xác minh email, hiển thị màn hình chờ xác minh.
5. Sau khi xác minh và đăng nhập thành công, tạo/hoàn thiện profile.
6. Điều hướng sang Create/Join couple.

### 3.3 Đăng nhập
1. Nhập thông tin đăng nhập.
2. Gửi yêu cầu Supabase Auth.
3. Thành công → tải profile và membership.
4. Thất bại → thông báo an toàn, không tiết lộ tài khoản có tồn tại hay không nếu provider không hỗ trợ thông báo đó.

### 3.4 Khôi phục mật khẩu
1. Nhập email.
2. Gửi yêu cầu reset.
3. Hiển thị thông báo trung tính rằng nếu tài khoản hợp lệ, hướng dẫn sẽ được gửi.
4. Mở deep link đặt mật khẩu mới.
5. Sau khi hoàn tất, quay lại đăng nhập.

## 4. Luồng tạo hoặc tham gia couple

### 4.1 Tạo couple
1. Thành viên A chọn `Tạo không gian của chúng ta`.
2. Nhập tên couple tùy chọn và ngày kỷ niệm tùy chọn.
3. Server tạo couple và membership cho A trong một transaction/RPC an toàn.
4. App hiển thị mã/link mời.
5. A có thể chia sẻ lời mời qua chức năng share của hệ điều hành.
6. Trạng thái couple: đang chờ người còn lại tham gia.

### 4.2 Tham gia bằng lời mời
1. Thành viên B mở link hoặc nhập mã mời.
2. Nếu chưa đăng nhập, B đăng nhập/đăng ký trước.
3. App hiển thị thông tin lời mời tối thiểu (không lộ dữ liệu riêng tư).
4. B chọn chấp nhận hoặc từ chối.
5. Server xác thực token, hạn dùng, trạng thái và giới hạn thành viên.
6. Nếu hợp lệ, thêm B vào couple.
7. Cả hai thấy trạng thái đã kết nối.

### 4.3 Lời mời hết hạn/không hợp lệ
- Hiển thị lý do có thể xử lý: hết hạn, đã dùng, bị thu hồi hoặc không hợp lệ.
- Cho phép thành viên A tạo lời mời mới.
- Không hiển thị token mời trong log.

## 5. Luồng thiết lập cá nhân và riêng tư

1. Người dùng nhập tên hiển thị và avatar tùy chọn.
2. Chọn theme: System/Light/Dark.
3. Chọn phương tiện thường dùng và sở thích.
4. Có thể thiết lập điểm xuất phát riêng tư (ví dụ nhà riêng) trong phần cài đặt.
5. Địa chỉ riêng tư phải được lưu trong vùng dữ liệu cá nhân được bảo vệ, không lưu vào hồ sơ công khai hoặc bảng kế hoạch dùng chung dưới dạng địa chỉ thô.
6. Người dùng có thể sửa/xóa địa chỉ và chọn dùng làm điểm xuất phát cho một lần lập lịch.
7. Trước khi dùng địa chỉ để tính tuyến, app phải giải thích mục đích và gửi dữ liệu tối thiểu qua backend.

Không ghi địa chỉ riêng tư vào analytics, crash logs, debug logs, source code, fixtures hoặc prompt AI.

## 6. Luồng tạo lịch hẹn bằng AI

### 6.1 Nhập yêu cầu
1. Người dùng mở tab Planner.
2. Chọn ngày.
3. Chọn khung giờ hoặc tổng thời lượng.
4. Nhập ngân sách tổng và tiền tệ (MVP: VND).
5. Chọn phương tiện.
6. Chọn bán kính tìm kiếm (mặc định theo cấu hình, đề xuất 15 km).
7. Chọn một hoặc nhiều sở thích.
8. Chọn điểm xuất phát:
   - Vị trí hiện tại nếu đã cấp quyền.
   - Địa điểm đã chọn.
   - Điểm riêng tư đã lưu nếu người dùng chủ động chọn.
9. Xác nhận yêu cầu và bấm tạo lịch trình.

### 6.2 Xử lý
1. Client gửi input đã validate đến backend/Edge Function.
2. Backend xác thực session và couple membership.
3. Backend lấy địa điểm thật từ Places API.
4. Backend loại bỏ địa điểm không phù hợp/không đủ dữ liệu.
5. Backend lấy route/duration/distance từ Routes API cho mode được hỗ trợ.
6. Bộ lập lịch xác định thứ tự, thời lượng dừng và tính ngân sách dự kiến.
7. AI (nếu bật) diễn giải sở thích, hỗ trợ xếp hạng/giải thích dựa trên danh sách ứng viên đã có; không được tạo địa điểm hoặc dữ kiện mới.
8. Backend kiểm tra lại mọi ID, thời gian, mode, tổng ngân sách và nguồn dữ liệu.
9. Trả về itinerary cùng thông tin nguồn, cảnh báo và thời điểm cập nhật.

### 6.3 Hiển thị kết quả
1. App hiển thị Tổng quan/Bản đồ/Chi tiết.
2. Mỗi địa điểm hiển thị dữ kiện có nguồn.
3. Ước tính giá phải ghi rõ là ước tính, không phải báo giá.
4. Nếu thiếu dữ liệu, hiển thị `Chưa có thông tin`, không tự điền.
5. Người dùng có thể thay điểm, bỏ điểm hoặc yêu cầu tạo lại.
6. Khi chỉnh sửa, backend tính lại tuyến, thời gian và tổng chi phí liên quan.

### 6.4 Lưu và chia sẻ
1. Người dùng chọn `Lưu lịch trình`.
2. Server lưu plan và stops.
3. Khi lưu thành công, plan xuất hiện trong Dates của cả hai thành viên.
4. Thành viên còn lại nhận cập nhật realtime hoặc khi mở app tải dữ liệu mới.
5. Lưu trạng thái draft/awaiting confirmation/confirmed theo quyết định sản phẩm.
6. Không coi việc tạo plan thành công là việc đặt chỗ tại nhà hàng/địa điểm.

## 7. Luồng Explore và lưu địa điểm

1. Người dùng mở Explore.
2. Nhập từ khóa hoặc chọn danh mục.
3. Chọn bán kính và bộ lọc.
4. Client yêu cầu backend tìm địa điểm.
5. App hiển thị danh sách hoặc bản đồ từ kết quả thật.
6. Người dùng mở chi tiết địa điểm.
7. Chọn biểu tượng yêu thích.
8. Backend lưu place reference và metadata tối thiểu vào saved places.
9. Cả hai thành viên có thể xem danh sách yêu thích chung.
10. Nếu địa điểm đã đóng cửa/không còn tồn tại, hiển thị trạng thái dữ liệu cũ và cho phép refresh.

## 8. Luồng Dates

1. Người dùng mở Dates.
2. Xem lịch tháng và lịch sắp tới.
3. Chọn một ngày hoặc một kế hoạch.
4. Mở chi tiết itinerary.
5. Có thể chỉnh sửa theo quyền.
6. Thay đổi được xác thực và lưu server.
7. Thành viên còn lại nhận cập nhật.
8. Sau buổi hẹn, một trong hai chọn `Hoàn thành`.
9. App gợi ý tạo Memory từ buổi hẹn đã hoàn thành.

## 9. Luồng Memories

1. Người dùng mở Memories.
2. Chọn Timeline, Album hoặc Địa điểm.
3. Chọn `Thêm kỷ niệm`.
4. Chọn ảnh từ thư viện/camera và cấp quyền khi được yêu cầu.
5. Nhập caption, ngày và địa điểm (tùy chọn).
6. Chọn liên kết với một date plan (tùy chọn).
7. Upload ảnh vào storage riêng tư.
8. Server lưu metadata và quyền couple.
9. Chỉ thành viên couple được xem.
10. Sửa/xóa có xác nhận; lỗi upload phải có retry.

## 10. Luồng cài đặt và quyền thiết bị

Settings gồm:
- Hồ sơ cá nhân.
- Theme System/Light/Dark.
- Sở thích và phương tiện mặc định.
- Điểm xuất phát riêng tư.
- Quản lý couple/lời mời.
- Quyền vị trí, ảnh, camera.
- Đăng xuất.
- Yêu cầu xóa tài khoản/dữ liệu theo quy trình.

Chỉ xin quyền vị trí/camera/thư viện tại thời điểm tính năng cần dùng. Nếu từ chối, cung cấp đường đi thay thế phù hợp.

## 11. Đồng bộ, lỗi và tình huống biên

- Realtime không kết nối: hiển thị trạng thái và tải lại khi có mạng.
- Hai người sửa cùng plan: dùng `updated_at`/version để phát hiện xung đột; không âm thầm ghi đè.
- Lời mời được dùng hai lần: chỉ một lần thành công.
- Thành viên rời couple: chặn quyền truy cập ngay theo membership; dữ liệu được xử lý theo chính sách retention.
- API Places/Routes lỗi: thông báo thiếu dữ liệu, cho phép retry; không tạo kết quả giả.
- AI lỗi: có thể tiếp tục bằng logic deterministic nếu đủ dữ liệu, hoặc báo không thể tạo plan.
- Ảnh upload lỗi: giữ metadata nháp nếu an toàn và cho phép retry.
- Offline: chỉ cho xem dữ liệu cache; thao tác ghi cần báo rõ chưa đồng bộ.

## 12. MVP và ngoài phạm vi

### MVP
- Auth.
- Create/join couple.
- Profile và preferences cơ bản.
- Địa chỉ/điểm xuất phát riêng tư.
- Explore địa điểm thật.
- Planner và itinerary.
- Dates và đồng bộ.
- Memories cơ bản.
- Light/Dark/System.

### Chưa thuộc MVP nếu chưa được duyệt
- Chat trong app.
- Thanh toán/chia hóa đơn.
- Đặt chỗ trực tiếp.
- Mạng xã hội/công khai profile.
- Theo dõi vị trí liên tục.
- Gợi ý dựa trên theo dõi hành vi nhạy cảm.
- Chia sẻ vị trí nhà riêng cho người khác.
