---
id: source.UNTCH.dump-comment-ao3
type: source
scope: project
lane: personal
project: UNTCH
canon_layer: author_confirmed
status: active
aliases: ["dump comment UNTCH", "comment Untouchable", "loi Mina37", "author reply Untouchable", "word of god Untouchable"]
related: ["[[UNTCH]]", "[[UNTCH-MOC]]", "[[nguyen-tac-ao3]]"]
source:
  type: author_comment
  ref: "AO3 work 28933989 — toan bo comment, 108/108 trang, xuat 2026-08-22 06:51:50 bang cong cu dump cua Aurel"
asset:
  store: library
  path_rel: 01_Fandoms/[KHR] Katekyo Hitman Reborn/Novel/comment/AO3-28933989-Untouchable-comments-2026-08-22_0651.txt
  format: txt
  bytes: 1066638
  sha256_16: "E190D16B9734BBFE"
  seen_at: 2026-11-14
  file_mtime: 2026-09-09
authority: original_author
confidence: 1.0
immutable: true
always_load: false
tags: [d/fanfic, k/source, p/personal]
last_updated: 2026-11-14
---

# Nguồn — dump comment AO3 của *Untouchable*

> ⚠️ **Bất biến.** Đây là tầng `author_confirmed`: **dưới** văn bản fic,
> **trên** canon franchise BNHA/KHR, và **trên** mọi suy luận đã viết thành chương.

## Mô tả

Bản xuất toàn bộ khu comment, **108/108 trang**, lấy 2026-08-22 06:51.
Có cấu trúc: tách theo `### Chapter N`, mỗi mục có số thứ tự, tên người, ngày UTC,
URL comment, và dấu `↳` cho reply lồng nhau.

| Đo 23/08/2026 | Số | Ghi chú |
|---|---|---|
| Tổng comment | **2.493** | Header của file khai |
| Chương có mục comment | **127** | Khớp số chương của nguyên tác |
| Lượt của **Mina37** | **150** | Đếm lại — khớp con số Aurel đưa |
| Số từ trong lời Mina37 | ~**13.300** | Đếm lại. Aurel đưa ~14.239 |

⚠️ Hai chỗ số của tôi **thấp hơn** nguồn, đừng coi là mâu thuẫn:

- Regex bắt được **2.178/2.493** mục. 315 mục còn lại nhiều khả năng là tên người dùng
  có khoảng trắng hoặc tài khoản đã xoá. **Số đúng là 2.493** (do công cụ dump khai),
  không phải 2.178.
- ~13.300 vs ~14.239 từ lệch ~6 %, do cách đếm dòng tiêu đề/URL khác nhau. Không đổi
  kết luận: **150 lượt trả lời của tác giả là mỏ vàng cơ chế của project này.**

## Vì sao nguồn này đắt

Ở EMB, **24** reply của tác giả đủ để lật đổ bốn tiền đề nền và làm mất bốn chương.
Ở đây có **150** — gấp hơn sáu lần, trên một fic dài gấp tám. Đọc sau khi đã viết là
cách chắc chắn nhất để phải xoá lại.

Aurel nêu (chưa xác minh trong file): tác giả **mở lời mời đề xuất quirk cho dàn KHR**.
Nếu đúng, đó là chỗ tác giả tự phát biểu luật crossover — thứ không tồn tại trong
nguyên tác dưới dạng đầy đủ.

## Rủi ro của nguồn này

Đây là **bản dump một thời điểm**, không phải bản lưu trang. Tác giả sửa hoặc xoá
comment thì không truy lại được. Fic dừng cập nhật 2021 nhưng khu comment vẫn có thể
có mục mới sau 2026-08-22 — thấy mục mới thì chạy `check-conflicts`, đừng chỉ thêm vào.

## Phạm vi đã trích xuất

- [x] **Luật thế giới / cơ chế crossover** — khối 2, 23/08/2026
- [x] **Xác nhận nhân vật** — khối 2
- [x] **Hook / lời hứa chưa giải** — khối 2
- [x] Điểm dừng + ghi chú cuối 2021 — 23/08/2026 → [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]]

**Đã đọc: 150/150 lượt tác giả (100 %)** · ~300/2.493 comment.
Biên bản: [[bien-ban-doc-untch]] khối 2 — bảng fact đầy đủ ở đó, chia **ba mức** và
không được trộn: tác giả khẳng định · tác giả nói là **dự định** (`planned`) · câu hỏi
tác giả tự nêu mà chưa trả lời.

⚠️ **2.343 comment còn lại không đáng ưu tiên.** Đó là comment độc giả thuần —
`authority: fandom`, dưới cả `high_confidence_inference`. Chỉ mở lại khi cần tra một câu
cụ thể mà ngữ cảnh 500 ký tự đã trích không đủ.

Phân bố 150 lượt của Mina37 theo tháng — dùng để chia khối:
2021-01 **2** · 02 **7** · 03 **57** · 04 **9** · 05 **13** · 06 **28** · 07 **17** ·
08 **6** · 09 **1** · 10 **6** · 11 **0** · 12 **4**. Sau 2021-12-14 **không còn lượt nào**.

Bốn lượt cuối (khối 1) không có lore mới: hai lượt nhắc độc giả đừng viết suy đoán như
sự thật, một xác nhận **Marco Gagliardi = Gamma**, một xác nhận **Nedzu là người**.
