---
id: source.EMB.ao3-comments
type: source
scope: project
lane: personal
project: EMB
canon_layer: author_confirmed
status: active
aliases: ["comment AO3", "AO3 comments", "loi tac gia", "author reply", "word of god", "comment tac gia"]
related: ["[[sources/_MOC|sources]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/world-rules/_MOC|canon]]"]
source:
  type: author_comment
  ref: "AO3 comment section, Part 1 (work 46590334) + Part 2 (work 57740797). Aurel copy-paste 2026-08-15. Hai file nay gio o Novel/comment/, doi ten 16/09/2026 theo khuon AO3-<workid>-<tua de>-comments-<...>.txt"
asset:
  # Note nay phu HAI file dump comment. Truoc 16/09 chung nam trong sources/ao3/
  # cua chinh project va path_rel tro vao THU MUC do. Tu 16/09 Aurel gom moi file
  # comment ve Novel/comment/, ma thu muc do chua comment cua NHIEU tac pham khac
  # nhau — tro vao no thi khong con chi dung cai gi. Nen path_rel tro FILE Part 1,
  # kem count: 2; ten day du ca hai file o than bai.
  store: library
  path_rel: 01_Fandoms/[KHR] Katekyo Hitman Reborn/Novel/comment/AO3-46590334-Local-Mafia-Boss-Blames-comments-Part1-BabyArc.txt
  format: txt
  count: 2
  bytes: 113856
  seen_at: 2026-08-22
  file_mtime: 2026-08-15
authority: original_author
confidence: 1.0
immutable: true
always_load: false
tags: []
legacy_tags: [source, author-confirmed, high-value]
last_updated: 2026-11-21
---

# Nguồn — comment AO3 của tác giả

> ⚠️ **Bất biến.** Đây là tầng `author_confirmed`: dưới văn bản fic, **trên canon franchise**, và **trên mọi suy luận đã viết thành chương**.

## Mô tả

**24 reply** của Whymystwedolife, trích từ hai file copy-paste Aurel gửi 2026-08-15 (AO3 không có API export comment).

| Part | Số reply |
|---|---|
| Part 1 (Baby Arc) | 9 |
| Part 2 (Brat Arc) | 15 |

Hai file dump, đổi tên và gom về `Novel/comment/` ngày 16/09/2026:

| Part | File |
|---|---|
| Part 1 (Baby Arc) | `AO3-46590334-Local-Mafia-Boss-Blames-comments-Part1-BabyArc.txt` |
| Part 2 (Brat Arc) | `AO3-57740797-Ex-Mafia-Boss-Spends-comments-Part2-BratArc.txt` |

Work ID lấy từ URL trong chính bản HTML truyện gốc, không suy đoán. Hai file này **không
có header ghi Work ID** như các dump khác, nên tên cũng không mang ngày dump — không có
ngày nào đáng tin để ghi.

Bản trích sạch **vẫn nằm tại chỗ cũ**, không chuyển: `[EMB] …/sources/ao3/AO3-author-replies.md`
— đó là bản đã lọc chỉ lời tác giả, không phải dump thô.

## Vì sao nguồn này là thứ đắt nhất

Bốn tiền đề nền của hai đợt viết trước bị **chính bốn reply này** bác bỏ, và hậu quả là **toàn bộ chương v1 + v2 bị xoá**. Xem [[Uu-Tien-Nguon]].

Và reply dài nhất — **631 từ, 14/08/2024** — giải thích **toàn bộ cơ chế Sanctuary**, thứ không tồn tại ở dạng đầy đủ trong bất kỳ file dẫn xuất nào.

## Bảy reply có nội dung lore

| Ngày | Nội dung | Fact note |
|---|---|---|
| 2024-08-14 (631 từ) | Cơ chế Sanctuary, purity, Iemitsu, dòng Sawada thứ hai | [[fact-sanctuary]] · [[fact-iemitsu-sky-ngoai]] · [[fact-sawada-thu-hai]] |
| 2025-03-15 (127 từ) | Lõi Flame, floaty episodes, giải pháp nhân tạo | [[fact-loi-flame]] |
| 2025-02-19 (82 từ) | Nếu Tsuna không tái sinh; trang phục Tsuna | [[fact-neu-khong-tai-sinh]] · [[fact-trang-phuc-tsuna]] |
| 2024-12-03 (56 từ) | Con cáo & Natsu; Bermuda | [[fact-cao-la-natsu]] |
| 2024-09-11 | Kyouya là **anh em họ**, không phải chú | [[fact-kyouya-anh-em-ho]] |
| 2024-08-01 (65 từ) | Bộ Guardian mới có Indra "và một người nữa" | [[fact-guardian-hien-co]] |
| 2024-07-08 | *"Tsuna is very much an old man and his guardians will reflect that"* | [[fact-guardian-hien-co]] |

## Phạm vi đã trích xuất

- [x] Luật thế giới → `canon/`
- [x] Xác nhận nhân vật → `canon/`
- [ ] Hook / lời hứa chưa giải
- [ ] Manh mối về Guardian còn lại

## ⚠️ Hạn chế của nguồn này

Đây là **bản copy-paste**, không phải bản lưu trang. Nếu tác giả sửa hoặc xoá comment thì không truy lại được. Và có thể còn reply mới sau 2026-08-15.

Nên: **chụp lại trang comment định kỳ**, và khi thấy reply mới thì chạy `check-conflicts` chứ đừng chỉ thêm vào.
