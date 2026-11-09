# Our Date — Tóm tắt phạm vi sản phẩm (MVP)

> Bản tóm tắt này trích từ `OUR_DATE_BLUEPRINT.md`. Khi có mâu thuẫn, blueprint
> gốc là nguồn chính xác; tài liệu này chỉ giúp tra cứu nhanh.

## Vấn đề cần giải quyết

Hai người yêu nhau thường không biết nên đi đâu, làm gì, sắp xếp lịch trình
ra sao, và ai đón ai trước. Our Date giúp hai người tạo lịch trình hẹn hò
dựa trên thời gian, ngân sách, sở thích và vị trí thật — không phải dữ liệu
bịa.

## Người dùng mục tiêu (giai đoạn đầu)

- Một Couple gồm đúng hai tài khoản: một người dùng Android, một người dùng iOS.
- Giao diện tiếng Việt, khu vực sử dụng ban đầu là Hà Nội, bán kính khám phá
  mặc định 15 km.
- Một người thường đi đón người còn lại trước khi bắt đầu buổi hẹn.

## Phạm vi bắt buộc trong MVP

1. **Onboarding & Couple** — đăng ký/đăng nhập email, tạo Couple, mời/tham
   gia bằng mã mời, chỉ thành viên Couple mới xem được dữ liệu riêng tư.
2. **Hồ sơ & địa điểm cá nhân** — tên hiển thị, địa chỉ xuất phát/địa chỉ nhà
   người yêu (lưu riêng tư, không hardcode), phương tiện, bán kính, ngân
   sách, sở thích.
3. **Tạo lịch trình hẹn hò** — nhập ngày/giờ/ngân sách/phương tiện/sở thích,
   nhận lịch trình nhiều chặng với thời gian đến, thời lượng, chi phí ước
   tính và nguồn dữ liệu rõ ràng.
4. **Bản đồ & di chuyển** — hiển thị điểm đến, tuyến đường nếu API hỗ trợ,
   không tự bịa thời gian di chuyển, có nút mở Google Maps.
5. **Đồng bộ hai điện thoại** — lưu trên Supabase, realtime cho thay đổi quan
   trọng, không âm thầm ghi đè thay đổi mới hơn.
6. **Lưu yêu thích & lịch sử** — địa điểm yêu thích, lịch trình đã hoàn
   thành, đánh dấu đã đi, ghi chú ngắn.

## Chưa làm trong MVP

Phát hành store, thanh toán/chia hoá đơn, chat trong app, push notification
nâng cao, AI học sâu sở thích, Surprise Date, album ảnh dung lượng lớn, đặt
bàn/vé trực tiếp, theo dõi vị trí trực tiếp, đọc lịch cá nhân tự động, social
feed công khai.

## Nguyên tắc không thương lượng

- Không bịa địa điểm, địa chỉ, giờ mở cửa, rating, giá hoặc thời gian di
  chuyển. Mọi dữ liệu phải có nguồn (provider, người dùng nhập, hoặc ước
  tính được ghi rõ là ước tính).
- Không log hoặc hardcode địa chỉ nhà, token, hoặc API key.
- Không bật dịch vụ tính phí, triển khai production hoặc phát hành app khi
  chưa được chủ dự án đồng ý rõ ràng.
- Dữ liệu demo luôn được ghi nhãn "Dữ liệu mẫu", không bao giờ trình bày như
  dữ liệu thật.

## Điều hướng chính (5 tab)

Trang chủ (Home) · AI Date (Planner) · Khám phá (Explore) · Lịch hẹn (Dates)
· Kỷ niệm (Memories).

## Tiêu chí nghiệm thu MVP

Xem đầy đủ 18 tiêu chí tại `OUR_DATE_BLUEPRINT.md` mục 12. Tóm tắt: app chạy
trên Android và iOS; hai tài khoản tham gia một Couple; người ngoài không
đọc được dữ liệu riêng tư; tạo/lưu/sửa/đồng bộ được lịch trình với địa điểm
và thời gian di chuyển thật; có xử lý loading/empty/error; không có secret
trong repo; có README/`.env.example`/hướng dẫn cài đặt.
