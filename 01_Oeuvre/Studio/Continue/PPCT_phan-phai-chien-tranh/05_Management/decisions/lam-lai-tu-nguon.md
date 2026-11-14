---
id: decision.PPCT.lam-lai-tu-nguon
type: decision
scope: project
lane: personal
project: PPCT
canon_layer: user_canon
status: locked
decided_at: 2026-09-13
aliases: ["lam lai PPCT", "bat dau lai PPCT tu dau", "PPCT restart", "ban cu PPCT la ban test", "ban thu nghiem PPCT", "làm lại phản phái chiến tranh"]
related: ["[[PPCT]]", "[[PPCT-MOC]]"]
source:
  type: user_input
  ref: "Aurel, chat 13/09/2026: 'minh muon bat dau lai tu dau, ban nay la mot trong nhung ban test dau tien va no co rat nhieu loi' + tra loi 3 cau hoi cung ngay (pham vi: toan bo tu nguon; quyet dinh cu: giu lam de xuat, xet lai; nguyen tac: Aurel tai lai tu Lofter)"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-13
---

# Quyết định — Làm lại toàn bộ PPCT từ nguồn; bản cũ chỉ còn là tài liệu tham khảo

## Quyết định

1. Toàn bộ phần viết tiếp cũ là **bản thử nghiệm đầu tiên, nhiều lỗi**: 22 chương (ch16–37), 9 phiên ngoại (I.1–I.3, II.1–II.6) và 7 file phân tích/dàn ý. **Không dùng làm bằng chứng.**
2. Chạy lại quy trình từ đầu: nạp nguyên tác → trích hồ sơ → đo văn phong → phân tích điểm dừng → đối chiếu canon → dàn ý → viết.
3. Các quyết định cốt truyện từng "khóa" ở giai đoạn cũ **không** vào `decisions/`. Mỗi cái thành một note `question` (`status: unresolved`), xét lại khi lập dàn ý mới.
4. Nguyên tác: Aurel tải lại từ Lofter.

## Lý do chọn

- Aurel xác nhận bản cũ là bản test, có nhiều lỗi.
- Những gì kiểm được trong phiên 13/09/2026 *(inspected)*:
  - Nguyên tác của 西州 **không có** trong vault lẫn kho. Số đo văn phong cũ (`VANPHONG.md`) vì thế không kiểm lại được.
  - Tỷ lệ thoại ghi trong ghi chú kỹ thuật cũ (~45–58%) lệch so với số đo thực trên chính các chương đó: 21,7–38,9% theo ký tự trong 「」.
  - Xưng hô không thống nhất giữa các chương: I.1, II.3, II.5 dùng anh/em/tôi/cậu/bà, trái với quy ước convert.
  - Tên file bị lệch số (`Bonus 1_Chapter 31–36` là II.1–II.6); một câu lọt tiếng Anh ở II.6.
- Bất biến 5: kết luận của một lần chạy AI trước **không phải bằng chứng**, dù nằm trong file có tên nghe như hồ sơ.

## Phương án đã loại và vì sao

- **Giữ phân tích, chỉ viết lại chương.** Lỗi trong các file phân tích sẽ đi theo sang bản mới.
- **Chỉ bỏ bản II.7.** Không đụng đến gốc của lỗi.

## Ràng buộc kéo theo

- **Không** chép nội dung từ 46 chương hoặc 7 file cũ vào `canon/`, `Characters/`, `style/`. Được đọc để *đặt câu hỏi*, rồi phải kiểm lại trên nguyên tác.
- Bản cũ giữ nguyên trong kho, chỉ đọc, không sửa, không xóa: store `personal-archive`, `03_Fandom/[KHR] Katekyo Hitman Reborn/AI_Continue/00_OldVer/[PPCT] Phản phái chiến tranh/`.
- Briefing Aurel gửi ngày 13/09 được lưu nguyên văn ở `sources/user-input/20260913-briefing-giai-doan-cu.md`.
- Bản nháp II.7 viết ngày 13/09/2026 dựa trên bản cũ → `status: archived`.
- Quy ước viết trong briefing (danh xưng, định dạng chương, tỷ lệ thoại) **chưa khóa lại**; xét ở bước đo văn phong.
- Các quyết định cũ đang chờ xét lại — toàn bộ nằm trong `questions/`:
  - [[q-loi-moi-hien-the]]
  - [[q-ket-cuc-lancer]]
  - [[q-tsuna-mo-quan-ca-phe]]
  - [[q-akutagawa-gap-tsuna-truoc-cf]]
  - [[q-loi-giai-bi-an-trung-tam]]
  - [[q-khung-arc-v]]
  - [[q-bach-ki-lan]]
  - [[q-tiem-ca-ri-va-oda]]
  - [[q-cach-do-ty-le-thoai]] — vấn đề mới, phát hiện 13/09
