# OUR DATE — Complete Documentation Pack

Bộ tài liệu bổ sung cho repository Our Date.

## Files
- `USER_FLOWS.md`: luồng người dùng end-to-end.
- `DATABASE_SCHEMA.md`: schema PostgreSQL/Supabase, RLS, storage và migration guidance.
- `API_INTEGRATION_SPEC.md`: hợp đồng tích hợp Auth, Places, Routes, AI, bảo mật và kiểm soát chi phí.
- `UI_DESIGN_SPEC.md`: đặc tả UI Cute Romantic, Light/Dark và 5 tab (nếu có trong gói).

## Cách cài đặt
Sao chép các file Markdown vào thư mục `docs/` trong repository `our-date/`.

Giữ `CLAUDE.md` và `PROGRESS.md` ở thư mục gốc. Nếu `OUR_DATE_BLUEPRINT.md` hiện đang ở thư mục gốc thì có thể giữ nguyên; cập nhật đường dẫn trong `CLAUDE.md` nếu bạn chuyển tài liệu vào `docs/`.

## Lưu ý quan trọng
`DATABASE_SCHEMA.md` và `API_INTEGRATION_SPEC.md` là đặc tả thiết kế, không phải migration/code đã được chạy. Claude phải kiểm tra tài liệu nhà cung cấp hiện hành, review RLS và cơ chế mã hóa địa chỉ riêng tư trước khi triển khai production.
