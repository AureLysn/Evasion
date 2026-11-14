---
id: decision.EMB.emb-lam-lai-tu-nguon
type: decision
scope: project
lane: personal
project: EMB
canon_layer: user_canon
status: locked
decided_at: 2026-09-15
aliases: ["lam lai EMB", "bat dau lai EMB tu nguon", "EMB restart", "dot lam lai 15/09", "làm lại EMB từ nguồn sơ cấp", "lam lai KOHAKU"]
related: ["[[EMB]]", "[[EMB-MOC]]", "[[sources/_MOC|sources]]", "[[emb-la-kohaku]]", "[[Harmonization]]", "[[gia-thuyet-aurel]]", "[[gia-thuyet-aurel-2]]"]
source:
  type: user_input
  ref: "Aurel, chat 15/09/2026, sau bao cao project-status: 'bao cao nhieu lo hong hon minh nghi nen minh muon chay lai tu dau' + tra loi 4 cau hoi cung ngay (pham vi: tu nguon so cap; decisions: giu emb-la-kohaku, Harmonization va 2 note gia thuyet, doi dot7 + dot8d thanh questions; style: do lai tu nguyen tac; nhanh: emb/2026-09-15-lam-lai-tu-nguon)"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-17
---

# Quyết định — Làm lại EMB từ nguồn sơ cấp; tầng phái sinh cũ chỉ còn để đối chiếu

## Quyết định

1. Chạy lại quy trình từ đầu: nạp nguồn → trích thực thể → điểm dừng → đối chiếu canon → đo văn phong → dàn ý → **dừng chờ Aurel duyệt** → viết.
2. Bảy chương nháp Arc 2 (`draft-p3-ch1..7`) và bốn note arc do AI đề xuất (`brat-con-lai`, `brat-dan-y-chuong`, `khung-sau-arc`, `y-chinh-cac-arc`) chuyển vào `05_Management/snapshots/`. **Không dùng làm bằng chứng, không dùng làm mẫu giọng văn.**
3. Tầng phái sinh hiện có (`Characters/`, `canon/`, `events/`, `secrets/`, `hooks/`, `relationships/`, `locations/`, `organizations/`, `Timeline/`, `structure/`) **giữ nguyên chỗ cho tới khi được trích lại**. Mỗi note được thay bằng bản dựng từ nguồn thì mới đánh `superseded`. Trong lúc chờ, chỉ đọc để *đặt câu hỏi*.
4. `style/` **đo lại** từ nguyên tác bằng `style_metrics`, rồi so với số cũ.

### Giữ nguyên hiệu lực

- [[emb-la-kohaku]] · [[Harmonization]] · [[gia-thuyet-aurel]] · [[gia-thuyet-aurel-2]] — ý của Aurel, không phải kết luận của AI
- [[truc-chinh]] · [[nguoi-lon-co-trach-nhiem]] · [[bon-lan-can]] · [[tuyen-xanxus]] — `authority: user`
- `sources/` — bất biến

### Chuyển thành câu hỏi

`dot7-quyet-dinh` và `dot8d-thu-tu-p2` gồm các lựa chọn Aurel chốt **trên phương án AI đề xuất**, dựa trên tầng phái sinh sắp dựng lại. Mỗi mục thành một note `question` (`status: unresolved`), xét lại khi lập dàn ý mới. Hai note gốc đánh `superseded`.

| Mục cũ | Thành |
|---|---|
| dot7 A1 · A2 — bỏ chương cũ, mở lại dàn ý | nhập vào chính quyết định này |
| dot7 B1 — "problem" | [[ong-tre-giai-quyet-gi]] *(mở lại)* |
| dot7 B2 — sessha | [[ai-o-sessha]] *(mở lại)* |
| dot7 B3 — bigger carnivore | [[bigger-carnivore-la-ai]] *(mở lại)* |
| dot7 C2-2 — Tsunashige | [[q-tsunashige-biet-anh]] |
| dot7 D1 — lời tiên tri "người thứ mười" | không thành câu hỏi: là **câu chữ nguyên tác**, kiểm lại ở `extract-entities` |
| dot7 D2 — Sukunabikona | [[q-sukunabikona-va-reborn]] |
| dot7 F1 — Xanxus | [[q-xanxus-la-storm]] |
| dot7 F2 — giới hạn Kimiko | [[q-gioi-han-kimiko]] |
| dot7 F3 — cái giá lời tiên tri | [[q-cai-gia-loi-tien-tri]] |
| dot8d — thứ tự P2 | [[q-thu-tu-p2]] |

## Lý do chọn

Những gì kiểm được trong phiên 15/09/2026 *(inspected)*:

- Bảy chương Arc 2 (~58.800 từ) **viết trên dàn ý chưa duyệt** — `brat-dan-y-chuong` và `y-chinh-cac-arc` vẫn `status: proposed`, đợt 10 trong [[EMB]] vẫn "⬜ chờ Aurel". Trái mốc dừng bắt buộc sau OUTLINE.
- Bảy chương khai `type: chapter_plan` dù là văn xuôi, nên `project_table` đếm thành "7 dàn ý".
- `q-cha-me-nagi` còn `unresolved`, tự khai chặn "chương đầu tiên có Nagi trong POV" — đúng là `draft-p3-ch1`.
- Cả bảy chương dưới sàn 11.000 từ của chính dàn ý (5.200–9.900). Chương duy nhất từng qua `chapter_gate` được **3/10** (báo cáo 21/08).
- `devan.md` không tồn tại dù Devan là POV Ch5.
- [[EMB]] tự mâu thuẫn: đợt 9 ✅ nhưng "Nợ kỹ thuật" vẫn ghi chưa đọc 40% P2 Ch2; mục "Cổng kiểm chưa chạy được" đã cũ.
- 🔴 **Mọi sidecar nguồn EMB trỏ vào chỗ không còn tồn tại** (`asset_scan --check` exit 2). Thư mục `fiction/` trên D: đã mất; 14 file thật nằm trên Drive, store `personal-bulk`. Kích thước khớp danh mục cũ *(so kích thước, chưa so hash)*.
- Bất biến 5: kết luận của một lượt AI trước **không phải bằng chứng**.

## Phương án đã loại và vì sao

- **Chỉ làm lại từ dàn ý.** Nhanh hơn, và `vault_doctor` báo 0 lỗi ở tầng dữ kiện. Aurel chọn làm từ nguồn vì số lỗ hổng lộ ra nhiều hơn dự tính — một cổng không báo lỗi chưa chứng minh tầng đó sạch.
- **Kiểm sâu trước rồi mới chọn tầng.** Tốn một đợt mà kết quả đằng nào cũng dẫn tới trích lại.

## Ràng buộc kéo theo

- **Không** chép nội dung từ 11 file lưu trữ hoặc tầng phái sinh cũ vào note mới. Đọc để hỏi, rồi kiểm trên nguyên tác.
  - ✅ **Ngoại lệ, Aurel chốt 17/09/2026** — [[emb-duyet-khung-nam-arc]] mục B: **vật liệu do chính Aurel viết** trong 11 file ấy *(tên arc, dòng tông, ý tưởng cảnh)* **được mượn lại**, với điều kiện **ghi rõ chỗ mượn**. Lý do: lệnh cấm này sinh ra để chặn **kết luận của AI** đội lốt dữ kiện — `authority: ai`; vật liệu của Aurel là `authority: user`, không cùng loại. Ngoại lệ **không** mở cho dàn ý, hồ sơ hay phân tích do AI viết.
- `sources/knowledge-data/` (`TRITHUC` · `HOSO` · `DANY`) vẫn là **dẫn xuất** — chỉ dùng đối chứng sau mỗi giai đoạn.
- Sáu tóm tắt `BratArc-Chuong3..8` giữ nguyên chỗ: đã `superseded` từ 16/08 và vẫn là sidecar của văn xuôi trên Drive.
- Sidecar nguồn trỏ lại sang store `personal-bulk` cùng ngày.
- File nguồn trên Drive có thể là **bản duy nhất** — cần bản sao thứ hai trước khi làm gì khác với kho.
