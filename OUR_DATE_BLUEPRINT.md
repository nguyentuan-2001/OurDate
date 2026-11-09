# OUR DATE --- Product Vision & Development Blueprint

> **Tên sản phẩm:** Our Date\
> **Repository:** `our-date`\
> **Tagline:** Your little world, your next adventure.\
> **Loại sản phẩm:** Ứng dụng di động đa nền tảng dành cho hai người yêu
> nhau\
> **Nền tảng mục tiêu:** Android và iOS\
> **Ngôn ngữ giao diện ban đầu:** Tiếng Việt\
> **Tài liệu này dành cho:** Claude Code làm tài liệu định hướng để phân
> tích, lập kế hoạch và triển khai dự án.

------------------------------------------------------------------------

## 0. Hướng dẫn quan trọng dành cho Claude Code

Đọc toàn bộ tài liệu này trước khi thay đổi hoặc tạo mã nguồn.

### Vai trò của Claude

Bạn là kỹ sư phần mềm chính phụ trách xây dựng Our Date. Người dùng
không có kiến thức phát triển ứng dụng di động, vì vậy:

1.  Giải thích ngắn gọn trước các thao tác mà người dùng cần thực hiện,
    đặc biệt là tạo tài khoản, lấy API key, cấu hình dịch vụ hoặc chạy
    lệnh.
2.  Không yêu cầu người dùng tự viết code.
3.  Ưu tiên thực hiện công việc trực tiếp trong repository, tạo/sửa file
    và chạy kiểm tra khi có thể.
4.  Không giả định rằng người dùng đã có API key hoặc tài khoản dịch vụ.
5.  Không tự ý tạo chi phí, bật dịch vụ thanh toán, triển khai
    production hoặc phát hành ứng dụng khi chưa được người dùng đồng ý.
6.  Không đưa secret/API key vào mã nguồn, ứng dụng client, Git hoặc
    log.
7.  Không hardcode địa chỉ nhà riêng, thông tin cá nhân, API key hoặc dữ
    liệu riêng tư trong source code. Địa chỉ phải được người dùng nhập
    và lưu trong cấu hình riêng tư.
8.  Khi thiếu thông tin, chọn phương án an toàn, có thể cấu hình và ghi
    rõ giả định. Chỉ hỏi người dùng khi thiếu thông tin thực sự chặn
    tiến độ.
9.  Làm theo từng giai đoạn nhỏ. Sau mỗi giai đoạn, chạy
    lint/typecheck/test phù hợp và báo cáo file đã tạo, kết quả kiểm
    tra, việc người dùng cần làm tiếp theo.
10. Không tuyên bố một chức năng đã hoàn thành nếu chưa chạy thử hoặc
    chưa xác minh được.

### Quy tắc làm việc

-   Bắt đầu bằng việc kiểm tra repository hiện tại: cấu trúc thư mục,
    `package.json`, README, git status và các file đã tồn tại.
-   Không xóa hoặc ghi đè công việc có sẵn khi chưa kiểm tra.
-   Nếu repository trống, khởi tạo project theo kiến trúc đề xuất bên
    dưới.
-   Trước khi cài thư viện, kiểm tra phiên bản Expo/React Native hiện
    hành và chọn các phiên bản tương thích.
-   Ưu tiên tài liệu chính thức của Expo, React Native, Supabase và
    Google Maps Platform.
-   Tạo `README.md`, `.env.example`, tài liệu thiết lập và danh sách
    công việc.
-   Nếu chưa có credential, xây dựng giao diện và dữ liệu mẫu trước;
    không để thiếu API key khiến app không chạy được.
-   Dữ liệu demo phải được ghi nhãn rõ là dữ liệu mẫu, không được trình
    bày như địa điểm hoặc thời gian di chuyển thực tế.

### Việc đầu tiên Claude phải làm

**Chưa triển khai toàn bộ ứng dụng ngay.** Hãy:

1.  Kiểm tra repository.
2.  Đề xuất cấu trúc thư mục và các package cần dùng.
3.  Xác nhận các giả định quan trọng trong tài liệu.
4.  Tạo kế hoạch triển khai theo milestone.
5.  Bắt đầu Milestone 1: khởi tạo ứng dụng, cấu hình chất lượng code và
    dựng giao diện nền tảng có thể chạy được.
6.  Báo cáo cách chạy app trên Android và iOS bằng Expo Go.

------------------------------------------------------------------------

# 1. Tầm nhìn sản phẩm

## 1.1. Vấn đề cần giải quyết

Hai người thường không biết nên đi đâu, làm gì và sắp xếp lịch trình ra
sao. Một người thường di chuyển đến đón người còn lại trước khi bắt đầu
buổi hẹn. Hai người muốn tìm hoạt động phù hợp với thời gian rảnh, ngân
sách, sở thích và vị trí.

Our Date là trợ lý lập kế hoạch hẹn hò giúp hai người:

-   Khám phá địa điểm ăn uống, cà phê, vui chơi và trải nghiệm.
-   Tạo lịch trình hẹn hò theo thời gian và ngân sách.
-   Tính quãng đường và thời gian di chuyển giữa các điểm.
-   Tối ưu thứ tự các điểm đến để tránh đi vòng hoặc quay lại nhiều lần.
-   Chia sẻ và chỉnh sửa lịch trình trên cả hai điện thoại.
-   Lưu lại những địa điểm yêu thích và kỷ niệm đã có.

## 1.2. Nguyên tắc sản phẩm

1.  **Dễ sử dụng:** Người không rành công nghệ có thể tạo lịch trình
    trong vài thao tác.
2.  **Thực tế:** Địa điểm phải tồn tại và thông tin cần được lấy từ
    nguồn dữ liệu đáng tin cậy.
3.  **Minh bạch:** Phân biệt thời gian di chuyển thực tế từ API với ước
    tính hoặc dữ liệu mẫu.
4.  **Tối ưu hành trình:** Ưu tiên tuyến đường hợp lý, không chỉ chọn
    địa điểm nổi tiếng.
5.  **Dành cho hai người:** Hai tài khoản cùng thuộc một không gian
    Couple và nhìn thấy dữ liệu được chia sẻ.
6.  **Tiết kiệm:** Hạn chế gọi API không cần thiết, có cache, giới hạn
    sử dụng và cảnh báo chi phí.
7.  **Riêng tư:** Địa chỉ nhà, vị trí và ảnh cá nhân chỉ hiển thị cho
    thành viên được cấp quyền.

## 1.3. Người dùng mục tiêu ban đầu

-   Một cặp đôi gồm hai tài khoản.
-   Một người dùng Android.
-   Một người dùng iOS.
-   Giao diện tiếng Việt.
-   Dùng trong khu vực Hà Nội, với bán kính khám phá mặc định 15 km
    quanh khu vực do người dùng thiết lập.
-   Một người thường đón người còn lại trước khi đi chơi.

Không giới hạn kiến trúc ở đúng hai tài khoản. Mỗi Couple có hai thành
viên trong MVP, nhưng dữ liệu cần được thiết kế để phân quyền rõ ràng.

------------------------------------------------------------------------

# 2. Phạm vi MVP

MVP là phiên bản đầu tiên có thể sử dụng thực tế. Không xây dựng tất cả
ý tưởng nâng cao ngay từ đầu.

## 2.1. Chức năng bắt buộc trong MVP

### A. Onboarding và thiết lập Couple

-   Màn hình giới thiệu Our Date.
-   Đăng ký/đăng nhập bằng email.
-   Tạo Couple mới.
-   Tạo mã mời hoặc liên kết mời người còn lại.
-   Người thứ hai đăng nhập và tham gia Couple.
-   Chỉ thành viên Couple mới được xem lịch trình và dữ liệu riêng tư
    của Couple.
-   Có trạng thái chờ người kia tham gia.

### B. Hồ sơ và địa điểm cá nhân

Mỗi người có thể cấu hình:

-   Tên hiển thị.
-   Ảnh đại diện (không bắt buộc).
-   Địa chỉ xuất phát của mình.
-   Địa chỉ nhà người còn lại.
-   Phương tiện thường dùng: xe máy, ô tô, đi bộ hoặc tùy từng chuyến.
-   Bán kính khám phá mặc định: 15 km.
-   Ngân sách mặc định.
-   Sở thích và loại địa điểm yêu thích.

**Lưu ý quyền riêng tư:** Địa chỉ nhà là dữ liệu nhạy cảm. Không đặt sẵn
địa chỉ cụ thể trong source code, file seed công khai, log hoặc
analytics. Người dùng tự nhập trong app. Có thể lưu hai điểm nhà dưới
dạng các địa điểm riêng tư thuộc Couple.

### C. Tạo lịch trình hẹn hò

Người dùng nhập:

-   Ngày đi.
-   Giờ bắt đầu dự kiến.
-   Giờ kết thúc dự kiến hoặc tổng thời gian rảnh.
-   Điểm bắt đầu: nhà người tạo, nhà người còn lại, địa điểm tự chọn.
-   Quy tắc đón: mặc định người tạo đi đón người còn lại trước.
-   Phương tiện.
-   Ngân sách cho cả hai.
-   Sở thích/hoạt động mong muốn.
-   Bán kính khám phá.
-   Ghi chú hoặc điều cần tránh.

Ứng dụng tạo một lịch trình gồm nhiều chặng. Mỗi chặng có:

-   Thứ tự.
-   Địa điểm.
-   Địa chỉ.
-   Thời gian đến dự kiến.
-   Thời lượng tham quan/dùng bữa.
-   Thời gian di chuyển từ điểm trước.
-   Khoảng cách nếu API trả về.
-   Chi phí dự kiến nếu có dữ liệu.
-   Lý do đề xuất.
-   Nguồn dữ liệu và thời điểm cập nhật.

Người dùng có thể: - Chấp nhận lịch trình. - Tạo lại lịch trình. - Đổi
một địa điểm. - Xóa/thêm địa điểm. - Kéo thả hoặc thay đổi thứ tự nếu
thư viện hỗ trợ ổn định. - Chỉnh giờ và thời lượng dừng. - Lưu lịch
trình. - Chia sẻ với người còn lại.

### D. Bản đồ và di chuyển

-   Hiển thị các điểm đến theo thứ tự.
-   Hiển thị điểm đón người yêu trước nếu bật chế độ đón.
-   Hiển thị tuyến đường/chặng đi nếu API hỗ trợ.
-   Danh sách chặng di chuyển với thời gian và khoảng cách.
-   Nút mở Google Maps hoặc ứng dụng bản đồ tương thích để điều hướng.
-   Không tự tuyên bố thời gian chính xác nếu chưa gọi được Routes API.
-   Nếu API lỗi, hiển thị trạng thái "Chưa tính được thời gian" và cho
    phép mở bản đồ bên ngoài.

### E. Đồng bộ hai điện thoại

-   Lịch trình được lưu trên Supabase.
-   Khi một người tạo hoặc sửa lịch trình, người còn lại thấy thay đổi.
-   Có trạng thái đồng bộ/loading/error.
-   Không ghi đè thay đổi mới hơn một cách âm thầm.
-   MVP có thể dùng Supabase Realtime cho các thay đổi lịch trình quan
    trọng.
-   Nếu realtime không kết nối, vẫn có thể tải lại dữ liệu từ database.

### F. Lưu địa điểm yêu thích và lịch sử

-   Lưu địa điểm yêu thích.
-   Lưu lịch trình đã hoàn thành.
-   Đánh dấu đã đi/chưa đi.
-   Lưu ngày đi và các địa điểm.
-   Ghi chú ngắn về buổi hẹn.
-   Ảnh kỷ niệm là tính năng sau MVP nếu cần giảm độ phức tạp.

## 2.2. Chưa làm trong MVP

Các chức năng sau để giai đoạn sau:

-   Đưa app lên Google Play/App Store.
-   Thanh toán hoặc chia hóa đơn.
-   Chat riêng trong app.
-   Push notification nâng cao.
-   AI tự động học sâu sở thích theo thời gian.
-   Surprise Date và thiệp mời.
-   Album ảnh dung lượng lớn.
-   Đặt bàn/đặt vé trực tiếp.
-   Theo dõi vị trí trực tiếp của hai người.
-   Tự động đọc lịch cá nhân.
-   Social feed hoặc chia sẻ công khai.

------------------------------------------------------------------------

# 3. Luồng sử dụng chính

## 3.1. Luồng lần đầu mở app

1.  Người dùng mở Our Date.
2.  Xem giới thiệu ngắn.
3.  Đăng ký/đăng nhập.
4.  Chọn "Tạo không gian của hai người".
5.  Đặt tên Couple (ví dụ: "Our Little World").
6.  App tạo mã mời.
7.  Người dùng gửi mã/link cho người yêu.
8.  Người yêu cài app, đăng nhập và nhập mã.
9.  Hai tài khoản trở thành thành viên của cùng Couple.
10. Cả hai cấu hình địa chỉ riêng tư và sở thích.

## 3.2. Luồng tạo một buổi hẹn

1.  Mở tab "AI Date".
2.  Chọn ngày và khoảng thời gian.
3.  Chọn ngân sách.
4.  Chọn phương tiện.
5.  Chọn sở thích.
6.  Chọn điểm xuất phát và cách đón.
7.  Nhấn "Tạo lịch trình".
8.  Backend tìm địa điểm phù hợp.
9.  Backend tính thời gian/đường đi.
10. Bộ lập lịch sắp xếp các điểm.
11. AI tạo phần giải thích và gợi ý lịch trình dựa trên dữ liệu địa điểm
    có thật.
12. App hiển thị timeline và bản đồ.
13. Người dùng chỉnh sửa và lưu.
14. Người còn lại nhận được lịch trình đồng bộ.

## 3.3. Luồng đánh dấu hoàn thành buổi hẹn

1.  Mở lịch trình đã lưu.
2.  Đánh dấu "Bắt đầu buổi hẹn" (không bắt buộc).
3.  Có thể đánh dấu từng điểm đã ghé.
4.  Kết thúc buổi hẹn.
5.  Đánh dấu lịch trình hoàn thành.
6.  Ghi chú cảm nhận và lưu ảnh ở phiên bản sau.

------------------------------------------------------------------------

# 4. Thiết kế UX/UI

## 4.1. Định hướng hình ảnh

Phong cách:

-   Ấm áp, lãng mạn, hiện đại.
-   Không quá trẻ con hoặc quá nhiều hình trái tim.
-   Ưu tiên cảm giác một ứng dụng lifestyle cao cấp.
-   Giao diện sạch, dễ đọc, thao tác bằng một tay.
-   Có dark mode nếu không làm chậm MVP.

Bảng màu gợi ý (có thể điều chỉnh sau khi dựng prototype):

-   Background sáng: `#FFF9F7`
-   Surface/card: `#FFFFFF`
-   Primary rose: `#E8799B`
-   Primary dark: `#BE5678`
-   Text chính: `#29252A`
-   Text phụ: `#817780`
-   Border: `#F0E6E9`
-   Success: màu xanh dịu, chỉ dùng cho trạng thái.

Không sử dụng màu hồng ở mọi thành phần. Dùng màu trung tính làm nền,
hồng làm màu nhấn.

Typography: - Dùng font hỗ trợ tiếng Việt tốt. - Phân cấp rõ ràng giữa
tiêu đề, nội dung, metadata. - Tránh chữ quá nhỏ.

## 4.2. Điều hướng chính

Dùng bottom tab bar với 5 mục:

1.  **Trang chủ** (`Home`)
2.  **AI Date** (`Planner`)
3.  **Khám phá** (`Explore`)
4.  **Lịch hẹn** (`Dates`)
5.  **Kỷ niệm** (`Memories`)

Nếu MVP chưa đủ chức năng cho tab Kỷ niệm, có thể hiển thị trang "Sắp ra
mắt" hoặc tạm ẩn tab. Không tạo tab giả có nút không hoạt động.

## 4.3. Màn hình cần thiết

### 1. Splash / Onboarding

-   Logo Our Date.
-   Tagline.
-   Giới thiệu giá trị sản phẩm.
-   Nút bắt đầu.

### 2. Authentication

-   Đăng nhập.
-   Đăng ký.
-   Quên mật khẩu.
-   Xử lý trạng thái loading và lỗi.

### 3. Couple setup

-   Tạo Couple.
-   Nhập mã mời.
-   Chờ người còn lại tham gia.
-   Hiển thị hai thành viên.

### 4. Home

-   Lời chào.
-   Thẻ "Hôm nay mình đi đâu nhỉ?"
-   Lịch hẹn sắp tới.
-   Gợi ý hoạt động.
-   Địa điểm đã lưu gần đây.
-   Trạng thái thời tiết chỉ khi đã tích hợp nguồn dữ liệu đáng tin cậy;
    nếu chưa có thì không hiển thị dữ liệu giả.

### 5. Planner form

-   Ngày.
-   Giờ bắt đầu/kết thúc.
-   Ngân sách.
-   Phương tiện.
-   Sở thích.
-   Bán kính.
-   Điểm bắt đầu.
-   Tùy chọn đón người yêu.
-   Ghi chú.
-   Nút tạo lịch trình.

### 6. Planner result

-   Tên/chủ đề lịch trình.
-   Tổng thời gian.
-   Tổng ngân sách ước tính.
-   Timeline.
-   Từng địa điểm.
-   Các chặng di chuyển.
-   Bản đồ.
-   Nút lưu/chỉnh sửa/tạo lại.

### 7. Explore

-   Tìm kiếm địa điểm.
-   Bộ lọc loại địa điểm.
-   Bộ lọc khoảng cách.
-   Danh sách kết quả.
-   Chi tiết địa điểm.
-   Thêm vào yêu thích.
-   Không tạo review/rating giả.

### 8. Dates

-   Lịch trình sắp tới.
-   Lịch trình đã hoàn thành.
-   Lịch trình đã hủy.
-   Bộ lọc theo thời gian.

### 9. Memories

-   Lịch sử buổi hẹn.
-   Ghi chú.
-   Ảnh (sau MVP).

### 10. Settings

-   Hồ sơ.
-   Địa chỉ riêng tư.
-   Phương tiện mặc định.
-   Ngân sách mặc định.
-   Sở thích.
-   Quản lý Couple.
-   Đăng xuất.
-   Xóa tài khoản và dữ liệu theo quy trình an toàn.

## 4.4. Trạng thái UI bắt buộc

Mỗi màn hình có dữ liệu bất đồng bộ cần có:

-   Loading state.
-   Empty state.
-   Error state.
-   Retry action.
-   Success feedback.
-   Offline hoặc mất kết nối nếu phù hợp.

Không để màn hình trắng khi API lỗi.

------------------------------------------------------------------------

# 5. Logic lập lịch trình

Đây là phần cốt lõi của Our Date. Không để LLM tự bịa địa điểm hoặc tự
ước lượng thời gian di chuyển.

## 5.1. Dữ liệu đầu vào

``` ts
type PlannerInput = {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  budgetVnd?: number;
  transportMode: "DRIVE" | "TWO_WHEELER" | "WALK" | "TRANSIT";
  radiusKm: number; // default 15
  interests: string[];
  avoid?: string[];
  startPointId?: string;
  pickupPartnerFirst: boolean;
  notes?: string;
};
```

Lưu ý: Google Routes API có thể không hỗ trợ riêng chế độ xe máy ở mọi
API/region. Không được ánh xạ `TWO_WHEELER` thành một chế độ không được
API hỗ trợ. Hãy: - Kiểm tra khả năng hỗ trợ thực tế của API tại thời
điểm tích hợp. - Nếu không hỗ trợ, dùng chế độ gần nhất có thể và ghi rõ
đây là ước tính thay thế. - Cho phép mở Google Maps để người dùng chọn
xe máy khi điều hướng nếu phù hợp. - Không gắn nhãn kết quả ô tô thành
kết quả xe máy.

## 5.2. Quy tắc tạo tuyến

Khi `pickupPartnerFirst = true`:

1.  Điểm xuất phát là địa chỉ của người tạo.
2.  Điểm tiếp theo là địa chỉ người yêu.
3.  Sau đó mới bắt đầu các hoạt động.
4.  Các điểm vui chơi nên được chọn theo hướng hợp lý so với vị trí hiện
    tại.
5.  Kết thúc tại địa điểm cuối cùng hoặc quay về điểm do người dùng
    chọn.

Khi `pickupPartnerFirst = false`: - Dùng điểm xuất phát người dùng
chọn. - Không tự thêm điểm nhà của thành viên khác.

## 5.3. Nguyên tắc chọn địa điểm

-   Tìm địa điểm theo loại hoạt động và vị trí.
-   Lọc theo bán kính thực tế tính từ điểm tham chiếu đã chọn.
-   Kiểm tra địa điểm có đủ thông tin định danh và tọa độ.
-   Ưu tiên địa điểm còn hoạt động và có dữ liệu cập nhật.
-   Không đưa địa điểm không xác minh được vào lịch trình như một kết
    quả chắc chắn.
-   Có thể dùng rating/review từ provider nếu có, nhưng phải thể hiện
    đúng nguồn và không tự tạo rating.
-   Ưu tiên nhiều hoạt động khác nhau thay vì lặp lại cùng một loại.
-   Tính đến thời gian lưu lại tại mỗi địa điểm.
-   Ưu tiên các điểm gần nhau để giảm thời gian di chuyển.
-   Không cố nhồi quá nhiều điểm vào một buổi hẹn.

## 5.4. Thứ tự xử lý đề xuất

1.  Validate đầu vào.
2.  Lấy điểm bắt đầu và điểm đón nếu cần.
3.  Tìm candidate places từ Places API.
4.  Chuẩn hóa kết quả thành cấu trúc nội bộ.
5.  Loại bỏ trùng lặp.
6.  Lọc theo khoảng cách, ngân sách và sở thích.
7.  Tính ma trận thời gian/quãng đường giữa các candidate cần thiết.
8.  Tìm thứ tự phù hợp bằng heuristic đơn giản (nearest-neighbor + kiểm
    tra tổng thời gian) hoặc thuật toán tối ưu phù hợp.
9.  Tính thời gian đến và thời lượng dừng.
10. Loại bỏ lịch trình vượt quá thời gian rảnh.
11. Tạo tổng kết chi phí dưới dạng khoảng ước tính nếu dữ liệu giá không
    chính xác.
12. Gửi dữ liệu địa điểm đã xác minh sang AI để viết phần giới thiệu và
    giải thích.
13. Trả kết quả có nguồn dữ liệu, thời điểm tính và cảnh báo cần thiết.

## 5.5. Vai trò của AI

AI được dùng để:

-   Hiểu yêu cầu tự nhiên của người dùng.
-   Phân loại sở thích.
-   Gợi ý chủ đề buổi hẹn.
-   Giải thích vì sao lịch trình phù hợp.
-   Tóm tắt lịch trình dễ đọc.
-   Đề xuất phương án thay thế dựa trên candidate places thực tế.

AI **không được**:

-   Tự bịa địa điểm.
-   Bịa giờ mở cửa, rating, giá hoặc địa chỉ.
-   Tự khẳng định thời gian di chuyển là dữ liệu Google nếu chưa gọi
    API.
-   Tự tạo booking hoặc đặt chỗ.
-   Đưa địa chỉ riêng tư vào prompt nếu không cần thiết.

Nếu AI API chưa được cấu hình, vẫn phải có planner cơ bản dựa trên
rule/heuristic và dữ liệu mẫu. Người dùng có thể xem được app mà không
cần AI API.

## 5.6. Tính thời gian di chuyển

-   Ưu tiên Routes API/route matrix phù hợp.
-   Thời gian phải gắn với phương tiện thực tế được hỗ trợ.
-   Nếu API trả duration có xét giao thông, lưu rõ metadata đó.
-   Không dùng khoảng cách đường chim bay để hiển thị như thời gian đi
    thực tế.
-   Cache kết quả theo origin, destination, mode và thời điểm phù hợp.
-   Không cache quá lâu các dữ liệu có thể thay đổi do giao thông.
-   Hiển thị "ước tính" và nhắc người dùng kiểm tra lại trước khi đi.
-   Nếu API lỗi, hiển thị trạng thái chưa có dữ liệu thay vì tự bịa.

------------------------------------------------------------------------

# 6. Kiến trúc kỹ thuật đề xuất

## 6.1. Stack

### Mobile

-   React Native.
-   Expo.
-   TypeScript.
-   Expo Router.
-   React Native StyleSheet hoặc một giải pháp styling tương thích Expo
    đã được kiểm chứng.
-   TanStack Query hoặc giải pháp quản lý server state tương đương.
-   React Hook Form + Zod (nếu phù hợp).
-   Zustand chỉ khi cần state client toàn cục.
-   Expo SecureStore cho token/secret phía client được phép lưu cục bộ;
    không dùng để bảo vệ API key bí mật nhúng trong app.

### Backend và database

-   Supabase Auth.
-   Supabase PostgreSQL.
-   Supabase Realtime.
-   Supabase Storage ở giai đoạn cần lưu ảnh.
-   Supabase Edge Functions hoặc backend server-side riêng để xử lý
    request cần secret.

### External services

-   Google Places API để tìm địa điểm.
-   Google Routes API để tính tuyến đường và thời gian.
-   OpenAI API hoặc nhà cung cấp LLM có thể cấu hình để tạo nội dung
    lịch trình.
-   Không khóa kiến trúc vào một nhà cung cấp AI duy nhất nếu không cần
    thiết.

### Tooling

-   GitHub private repository.
-   ESLint.
-   Prettier.
-   TypeScript strict.
-   Jest/Vitest hoặc công cụ test phù hợp với stack đã chọn.
-   Expo EAS để build Android/iOS khi đến giai đoạn cần.

## 6.2. Kiến trúc tổng quan

``` text
Android App                 iOS App
     |                         |
     +-----------+-------------+
                 |
          Expo / React Native
                 |
        Authenticated requests
                 |
        Supabase Auth + RLS
                 |
       Supabase Database
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

## 6.3. Quy tắc bảo mật

-   Không commit `.env`.
-   Tạo `.env.example` chỉ chứa tên biến và placeholder.
-   Không đưa Google server-side key hoặc AI secret key vào app bundle.
-   Supabase anon/publishable key có thể dùng phía client khi RLS được
    cấu hình đúng; tuyệt đối không dùng service role key trong app.
-   API key Google phải giới hạn theo API và môi trường; dùng
    server-side proxy cho các API cần bảo vệ.
-   Thêm rate limiting cho endpoint tạo lịch trình.
-   Validate mọi input ở backend.
-   Kiểm tra quyền thành viên Couple trước khi đọc/ghi dữ liệu.
-   Không log địa chỉ nhà, access token, API key hoặc nội dung riêng tư
    không cần thiết.
-   Có thể bật billing cho Google Cloud nhưng phải đặt quota/budget
    alert và giới hạn API trước khi dùng.
-   Không tự động bật dịch vụ tính phí khi chưa được người dùng xác
    nhận.

------------------------------------------------------------------------

# 7. Mô hình dữ liệu đề xuất

Thiết kế database cần hỗ trợ hai thành viên dùng chung một Couple, với
quyền truy cập chỉ trong Couple của họ.

## 7.1. Bảng `profiles`

-   `id` UUID, liên kết `auth.users.id`.
-   `display_name`.
-   `avatar_url` nullable.
-   `created_at`.
-   `updated_at`.

## 7.2. Bảng `couples`

-   `id` UUID.
-   `name`.
-   `created_by`.
-   `created_at`.
-   `updated_at`.

## 7.3. Bảng `couple_members`

-   `id` UUID.
-   `couple_id`.
-   `user_id`.
-   `role` (owner/member).
-   `joined_at`.

Ràng buộc: - Một user không được tham gia nhiều Couple đang hoạt động
trong MVP, trừ khi có quyết định sản phẩm khác. - Một Couple tối đa hai
thành viên trong MVP. - Unique constraint phù hợp cho
`couple_id + user_id`.

## 7.4. Bảng `couple_invites`

-   `id` UUID.
-   `couple_id`.
-   `invite_code_hash` hoặc token hash.
-   `created_by`.
-   `expires_at`.
-   `used_at`.
-   `created_at`.

Không lưu mã mời có quyền truy cập lâu dài dưới dạng plain text. Mã mời
cần hết hạn và chỉ dùng một lần nếu phù hợp.

## 7.5. Bảng `private_places`

Dùng lưu địa chỉ nhà/điểm riêng tư.

-   `id` UUID.
-   `couple_id`.
-   `owner_user_id` nullable.
-   `label` (Nhà tôi, Nhà người yêu, Điểm đón...).
-   `address`.
-   `latitude`.
-   `longitude`.
-   `place_type`.
-   `created_at`.
-   `updated_at`.

Phân quyền: chỉ thành viên Couple được truy cập. Không expose cho
public.

## 7.6. Bảng `couple_preferences`

-   `id` UUID.
-   `couple_id`.
-   `default_radius_km`.
-   `default_transport_mode`.
-   `default_budget_vnd`.
-   `interests` JSONB hoặc bảng quan hệ riêng.
-   `avoid_preferences` JSONB.
-   `created_at`.
-   `updated_at`.

## 7.7. Bảng `itineraries`

-   `id` UUID.
-   `couple_id`.
-   `created_by`.
-   `title`.
-   `date`.
-   `start_time`.
-   `end_time`.
-   `budget_vnd`.
-   `transport_mode`.
-   `status`: draft, planned, completed, cancelled.
-   `pickup_partner_first`.
-   `total_distance_meters` nullable.
-   `total_travel_seconds` nullable.
-   `estimated_total_cost_vnd` nullable.
-   `currency` default VND.
-   `notes`.
-   `created_at`.
-   `updated_at`.
-   `version` integer để hỗ trợ kiểm soát cập nhật đồng thời.

## 7.8. Bảng `itinerary_stops`

-   `id` UUID.
-   `itinerary_id`.
-   `sequence`.
-   `provider_place_id` nullable.
-   `name`.
-   `address`.
-   `latitude`.
-   `longitude`.
-   `category`.
-   `arrival_time`.
-   `departure_time`.
-   `duration_minutes`.
-   `estimated_cost_vnd` nullable.
-   `notes`.
-   `source`.
-   `source_updated_at`.
-   `created_at`.
-   `updated_at`.

Lưu snapshot thông tin cần thiết để lịch sử vẫn đọc được nếu dữ liệu
provider thay đổi. Tuân thủ điều khoản lưu trữ của provider.

## 7.9. Bảng `itinerary_legs`

-   `id` UUID.
-   `itinerary_id`.
-   `from_stop_id`.
-   `to_stop_id`.
-   `distance_meters` nullable.
-   `duration_seconds` nullable.
-   `transport_mode`.
-   `provider`.
-   `traffic_aware` boolean nullable.
-   `calculated_at`.
-   `status`.

## 7.10. Bảng `favorite_places`

-   `id` UUID.
-   `couple_id`.
-   `added_by`.
-   `provider_place_id` nullable.
-   `name`.
-   `address`.
-   `latitude`.
-   `longitude`.
-   `category`.
-   `created_at`.

## 7.11. Bảng `memories` (có thể để giai đoạn sau)

-   `id` UUID.
-   `couple_id`.
-   `itinerary_id` nullable.
-   `title`.
-   `note`.
-   `photo_paths` JSONB hoặc bảng riêng.
-   `created_by`.
-   `created_at`.

## 7.12. Row Level Security (RLS)

Claude phải tạo và kiểm tra RLS policies cho tất cả bảng có dữ liệu
người dùng.

Quy tắc chung:

-   User chỉ đọc dữ liệu Couple mà mình là thành viên.
-   User chỉ tạo/cập nhật dữ liệu thuộc Couple mình tham gia.
-   Không tin `couple_id` do client gửi; backend/database policy phải
    xác minh membership.
-   Chỉ owner hoặc quyền được định nghĩa mới quản lý thành viên/invite.
-   Không cho user tự thêm mình vào Couple bằng cách sửa trực tiếp
    `couple_members`.
-   Mã mời phải được xác minh server-side.
-   Kiểm thử cả trường hợp user ngoài Couple cố truy cập ID của Couple
    khác.

------------------------------------------------------------------------

# 8. API và service layer

Không gọi trực tiếp các API cần secret từ app.

Các service/endpoint gợi ý:

## 8.1. `create-invite`

-   Kiểm tra người tạo là thành viên Couple.
-   Tạo mã mời ngẫu nhiên, có hạn dùng.
-   Không trả secret nội bộ.

## 8.2. `redeem-invite`

-   Xác minh mã mời.
-   Kiểm tra hết hạn/đã sử dụng.
-   Kiểm tra Couple còn chỗ.
-   Thêm thành viên theo transaction an toàn.

## 8.3. `search-places`

Input: - query/category. - location reference hoặc tọa độ đã được quyền
sử dụng. - radius. - optional filters.

Output: - place ID. - name. - address. - coordinates. - categories. -
rating/review count nếu provider trả về và được phép hiển thị. - opening
hours nếu có. - price level nếu có. - source metadata.

## 8.4. `calculate-route`

Input: - origin. - destination. - transport mode. - departure time nếu
API hỗ trợ.

Output: - distance. - duration. - route metadata. - provider. -
calculated timestamp. - warning nếu mode là fallback.

## 8.5. `generate-itinerary`

Input: - PlannerInput. - Couple context/preferences tối thiểu cần thiết.

Quy trình: 1. Authenticate user. 2. Verify Couple membership. 3.
Validate request. 4. Search places. 5. Calculate route matrix/legs. 6.
Build itinerary candidates. 7. Use deterministic scheduling logic. 8.
Call LLM only with verified candidates if configured. 9. Validate LLM
output against candidate IDs and time constraints. 10. Save itinerary if
user requests save, hoặc trả draft trước. 11. Return itinerary with
source/estimate metadata.

## 8.6. `update-itinerary`

-   Kiểm tra membership.
-   Kiểm tra quyền sửa.
-   Dùng version/updated_at để tránh ghi đè đồng thời.
-   Recalculate affected legs nếu thay đổi điểm/thứ tự/thời gian.

------------------------------------------------------------------------

# 9. Chiến lược chi phí và giới hạn sử dụng

Mục tiêu là vận hành cho hai người với chi phí thấp.

1.  Dùng gói miễn phí của Expo/Supabase trong giới hạn phù hợp.
2.  Không cần domain riêng trong giai đoạn đầu.
3.  Không cần phát hành lên App Store/Google Play để kiểm thử.
4.  Chỉ gọi Places khi người dùng tìm kiếm hoặc tạo lịch trình.
5.  Cache kết quả tìm kiếm trong giới hạn điều khoản của provider.
6.  Chỉ tính lại những chặng bị ảnh hưởng khi chỉnh lịch.
7.  Không gọi AI cho các thao tác chỉ cần logic thông thường.
8.  Giới hạn số lần generate itinerary theo user/Couple.
9.  Giới hạn số candidate places và số route matrix elements mỗi
    request.
10. Có timeout, retry có giới hạn và xử lý lỗi.
11. Thêm cảnh báo khi gần đạt quota.
12. Không tự nâng cấp gói dịch vụ.

Mọi giá dịch vụ và hạn mức có thể thay đổi. Claude cần kiểm tra trang
pricing chính thức khi triển khai, không hardcode thông tin giá vào app.

------------------------------------------------------------------------

# 10. Cấu trúc thư mục đề xuất

Claude được phép điều chỉnh nếu có lý do kỹ thuật, nhưng phải giữ ranh
giới module rõ ràng.

``` text
our-date/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── (auth)/
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   ├── (onboarding)/
│   │   ├── create-couple.tsx
│   │   ├── join-couple.tsx
│   │   └── preferences.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── planner.tsx
│       ├── explore.tsx
│       ├── dates.tsx
│       └── memories.tsx
├── src/
│   ├── components/
│   │   ├── ui/
│   │   ├── itinerary/
│   │   ├── places/
│   │   └── map/
│   ├── features/
│   │   ├── auth/
│   │   ├── couple/
│   │   ├── planner/
│   │   ├── explore/
│   │   ├── itinerary/
│   │   ├── favorites/
│   │   └── memories/
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── api/
│   │   ├── maps/
│   │   └── validation/
│   ├── services/
│   ├── store/
│   ├── theme/
│   ├── types/
│   └── utils/
├── supabase/
│   ├── migrations/
│   └── functions/
├── assets/
├── docs/
│   ├── PRODUCT_SPEC.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   └── SETUP.md
├── .env.example
├── .gitignore
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

Đây là cấu trúc tham khảo. Không tạo tất cả file rỗng chỉ để khớp cây
thư mục. Chỉ tạo module khi có chức năng thực tế.

------------------------------------------------------------------------

# 11. Các milestone triển khai

## Milestone 0 --- Repository audit và kế hoạch

-   [ ] Kiểm tra repository.
-   [ ] Kiểm tra Node, npm, Git.
-   [ ] Kiểm tra project hiện có.
-   [ ] Đề xuất cấu trúc.
-   [ ] Ghi lại các giả định.
-   [ ] Tạo `docs/PRODUCT_SPEC.md`.
-   [ ] Tạo `docs/TECHNICAL_ARCHITECTURE.md`.
-   [ ] Tạo `docs/SETUP.md`.

**Điều kiện hoàn thành:** Có kế hoạch rõ ràng, không ghi đè công việc
hiện có.

## Milestone 1 --- Khởi tạo app và design system

-   [ ] Tạo Expo project với TypeScript và Expo Router.
-   [ ] Cấu hình lint, format, typecheck.
-   [ ] Thiết lập theme, màu sắc, typography, spacing.
-   [ ] Tạo component Button, Input, Card, Chip, EmptyState, Loading.
-   [ ] Tạo bottom tab navigation.
-   [ ] Dựng Home, Planner, Explore, Dates, Memories ở mức UI cơ bản.
-   [ ] Dùng dữ liệu mock có ghi chú rõ.
-   [ ] Chạy được bằng Expo Go trên Android và iOS.

**Điều kiện hoàn thành:** App mở được trên cả hai nền tảng; điều hướng
hoạt động; không có màn hình chính trắng/lỗi.

## Milestone 2 --- Authentication và Couple

-   [ ] Tạo Supabase project (chờ người dùng cung cấp URL/key).
-   [ ] Tạo migrations.
-   [ ] Tạo Auth flow.
-   [ ] Tạo profile.
-   [ ] Tạo Couple.
-   [ ] Tạo invite/redeem invite.
-   [ ] Cấu hình RLS.
-   [ ] Kiểm thử hai tài khoản khác nhau.
-   [ ] Kiểm thử truy cập chéo Couple bị từ chối.

**Điều kiện hoàn thành:** Hai điện thoại đăng nhập hai tài khoản khác
nhau và cùng nhìn thấy Couple của mình.

## Milestone 3 --- Địa chỉ và sở thích

-   [ ] Màn hình nhập địa chỉ riêng tư.
-   [ ] Chọn/đặt điểm trên bản đồ hoặc nhập địa chỉ.
-   [ ] Lưu điểm nhà/điểm đón.
-   [ ] Cấu hình phương tiện.
-   [ ] Cấu hình bán kính mặc định.
-   [ ] Cấu hình ngân sách.
-   [ ] Chọn sở thích và điều cần tránh.
-   [ ] Xác nhận quyền riêng tư.

**Điều kiện hoàn thành:** App lưu và đọc lại cấu hình trên cả hai thiết
bị.

## Milestone 4 --- Khám phá địa điểm

-   [ ] Tạo backend endpoint tìm địa điểm.
-   [ ] Kết nối Places API.
-   [ ] Tạo danh sách kết quả.
-   [ ] Tạo chi tiết địa điểm.
-   [ ] Bộ lọc category/radius.
-   [ ] Loading/error/empty state.
-   [ ] Cache và giới hạn request.
-   [ ] Lưu yêu thích.

**Điều kiện hoàn thành:** Tìm được địa điểm thật, có địa chỉ và tọa độ;
không dùng dữ liệu giả để giả làm kết quả thật.

## Milestone 5 --- Bản đồ và thời gian di chuyển

-   [ ] Hiển thị map.
-   [ ] Hiển thị marker.
-   [ ] Kết nối Routes API.
-   [ ] Tính thời gian từng chặng.
-   [ ] Hiển thị khoảng cách.
-   [ ] Hỗ trợ chế độ phương tiện có thể xác minh.
-   [ ] Xử lý fallback.
-   [ ] Nút mở Google Maps.
-   [ ] Cache kết quả phù hợp.

**Điều kiện hoàn thành:** Người dùng xem được các điểm trên bản đồ và
thông tin thời gian di chuyển có nguồn.

## Milestone 6 --- Planner logic và AI

-   [ ] Tạo form planner.
-   [ ] Tạo deterministic planner trước.
-   [ ] Lọc candidate places.
-   [ ] Tính thời gian giữa các điểm.
-   [ ] Sắp xếp lịch trình theo giới hạn thời gian.
-   [ ] Kiểm tra ngân sách.
-   [ ] Tích hợp LLM qua backend.
-   [ ] Validate output của LLM.
-   [ ] Hiển thị timeline.
-   [ ] Cho phép thay đổi địa điểm.
-   [ ] Lưu draft và itinerary.

**Điều kiện hoàn thành:** Tạo được lịch trình có địa điểm xác minh,
không vượt khung giờ một cách vô lý và không bịa thời gian di chuyển.

## Milestone 7 --- Đồng bộ và lịch sử

-   [ ] Realtime updates.
-   [ ] Conflict handling.
-   [ ] Danh sách lịch trình.
-   [ ] Trạng thái planned/completed/cancelled.
-   [ ] Lịch sử đã đi.
-   [ ] Ghi chú buổi hẹn.
-   [ ] Favorite places.
-   [ ] Kiểm thử offline/reconnect.

**Điều kiện hoàn thành:** Thay đổi từ điện thoại Android xuất hiện trên
iPhone và ngược lại.

## Milestone 8 --- Kiểm thử và build

-   [ ] Test chức năng chính.
-   [ ] Test quyền truy cập.
-   [ ] Test lỗi mạng.
-   [ ] Test API timeout/quota.
-   [ ] Test layout trên nhiều kích thước màn hình.
-   [ ] Test Android thật.
-   [ ] Test iPhone thật.
-   [ ] Kiểm tra app không chứa secret.
-   [ ] Tạo EAS development/preview build.
-   [ ] Viết hướng dẫn cài đặt.

**Điều kiện hoàn thành:** Hai người có thể cài bản thử nghiệm và sử dụng
luồng tạo lịch trình cơ bản.

------------------------------------------------------------------------

# 12. Tiêu chí nghiệm thu MVP

MVP chỉ được coi là hoàn thành khi:

1.  App chạy trên Android và iOS.
2.  Hai người có thể tạo hai tài khoản riêng.
3.  Hai người tham gia cùng một Couple.
4.  Người ngoài Couple không thể đọc dữ liệu riêng tư.
5.  Hai người cấu hình được địa chỉ riêng.
6.  Có thể tạo lịch trình với ngày, giờ, ngân sách, phương tiện và sở
    thích.
7.  Có thể tìm địa điểm thật từ provider.
8.  Có thể xem địa điểm trên bản đồ.
9.  Có thời gian di chuyển cho các chặng khi API hỗ trợ.
10. Có timeline và tổng thời gian dự kiến.
11. Có thể chỉnh sửa và lưu lịch trình.
12. Lịch trình đồng bộ giữa hai thiết bị.
13. Có thể đánh dấu lịch trình đã hoàn thành.
14. Có xử lý loading, empty, error.
15. Không có secret key trong repository hoặc app bundle.
16. Có README hướng dẫn cài đặt, cấu hình và chạy app.
17. Có `.env.example` và hướng dẫn lấy credential.
18. Các dữ liệu demo được phân biệt rõ với dữ liệu thật.

------------------------------------------------------------------------

# 13. Những thông tin người dùng cần cung cấp trong quá trình triển khai

Không hỏi tất cả ngay từ đầu. Chỉ hỏi đúng thời điểm cần thiết.

### Trước khi tích hợp Supabase

-   Supabase project URL.
-   Supabase publishable/anon key phù hợp với cấu hình project.
-   Không bao giờ yêu cầu service role key đưa vào app client.

### Trước khi tích hợp Google Maps

-   Google Cloud project đã bật billing nếu Google yêu cầu.
-   API key được giới hạn đúng API.
-   Không gửi key qua chat nếu có thể cấu hình trực tiếp trong `.env`
    hoặc secret manager.
-   Cần xác nhận quota/budget.

### Trước khi tích hợp AI

-   Nhà cung cấp AI được chọn.
-   API key cấu hình ở backend secret.
-   Giới hạn ngân sách và số lần tạo lịch trình.

### Trước khi build iOS

-   Apple Developer account nếu cần phân phối qua TestFlight hoặc App
    Store.
-   Thiết bị iPhone để thử nghiệm.
-   Apple signing/distribution setup phù hợp.

### Trước khi phát hành

-   Tên hiển thị chính thức.
-   App icon.
-   Privacy policy.
-   Nội dung mô tả.
-   Tài khoản developer tương ứng.

------------------------------------------------------------------------

# 14. Quy tắc phản hồi sau mỗi milestone

Sau mỗi milestone, Claude phải báo cáo theo mẫu:

``` text
MILESTONE:
Trạng thái: Hoàn thành / Chưa hoàn thành / Bị chặn

Đã làm:
- ...

File quan trọng đã tạo/sửa:
- ...

Kiểm tra:
- Lệnh đã chạy:
- Kết quả lint:
- Kết quả typecheck:
- Kết quả test:
- Đã chạy thử trên thiết bị hay chưa:

Người dùng cần làm:
- ...

Rủi ro hoặc việc còn thiếu:
- ...

Milestone tiếp theo:
- ...
```

Không được đánh dấu hoàn thành nếu chưa có bằng chứng kiểm tra tương
ứng.

------------------------------------------------------------------------

# 15. Prompt khởi động cho Claude Code

Sau khi đặt file này trong repository, gửi Claude Code nội dung sau:

> Hãy đọc toàn bộ file `OUR_DATE_BLUEPRINT.md`. Đây là tài liệu định
> hướng sản phẩm và kỹ thuật chính của dự án Our Date.
>
> Bạn là kỹ sư chính phụ trách triển khai. Tôi không có kiến thức lập
> trình app, vì vậy hãy tự thực hiện các thay đổi code có thể làm được
> và hướng dẫn tôi rõ ràng với những bước cần thao tác bên ngoài.
>
> Trước tiên hãy audit repository và môi trường hiện tại. Không ghi đè
> file hoặc công việc có sẵn khi chưa kiểm tra. Sau đó hãy đề xuất kế
> hoạch cụ thể, cấu trúc thư mục và các dependency cần thiết.
>
> Bắt đầu triển khai Milestone 1 trước: khởi tạo hoặc hoàn thiện Expo
> React Native TypeScript app, cấu hình chất lượng code, thiết kế theme
> và dựng các màn hình nền tảng với dữ liệu mock. Chưa tích hợp API trả
> phí, chưa yêu cầu secret key, chưa triển khai production.
>
> Ưu tiên giao diện đẹp, hiện đại, lãng mạn tinh tế, tiếng Việt, trải
> nghiệm mobile-first. App phải có thể chạy trên Android và iOS bằng
> Expo Go.
>
> Sau khi làm xong, chạy các kiểm tra phù hợp, hướng dẫn tôi chạy app và
> báo cáo theo mẫu ở mục 14. Không tự chuyển sang milestone tiếp theo
> nếu milestone hiện tại chưa đạt điều kiện nghiệm thu.

------------------------------------------------------------------------

# 16. Quyết định sản phẩm đang được giả định

Những mục này có thể thay đổi khi người dùng phản hồi:

  Hạng mục               Giả định ban đầu
  ---------------------- ------------------------------------------------------
  Tên app                Our Date
  Repository             `our-date`
  Ngôn ngữ               Tiếng Việt
  Người dùng             Một Couple, hai thành viên
  Android/iOS            Cả hai
  Bán kính mặc định      15 km
  Phương tiện mặc định   Người dùng chọn; không mặc định cứng
  Quy trình đón          Có tùy chọn đón người yêu trước
  Database               Supabase
  Mobile framework       Expo + React Native + TypeScript
  Bản đồ/địa điểm        Google Maps Platform
  AI                     Có thể cấu hình provider; không bắt buộc để app chạy
  Chi phí                Ưu tiên free tier và kiểm soát quota
  Phát hành              Chưa phát hành store trong MVP

**Kết luận:** Hãy xây dựng Our Date như một sản phẩm thực tế có kiến
trúc an toàn, nhưng triển khai từng bước. Ưu tiên app chạy được, giao
diện tốt và trải nghiệm cốt lõi trước; sau đó mới kết nối dịch vụ bên
ngoài và AI.
