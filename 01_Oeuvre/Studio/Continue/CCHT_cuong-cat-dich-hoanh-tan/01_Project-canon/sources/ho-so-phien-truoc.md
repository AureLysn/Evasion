---
id: source.CCHT.ho-so-phien-truoc
type: source
scope: project
lane: personal
project: CCHT
canon_layer: planned
status: active
aliases: ["ho so phien truoc CCHT", "khung phien xem v5", "bang anh xa CCHT", "quy uoc ten TsunaYoko", "ho so tong hop lo 1-16", "cong trinh phien truoc", "reaction fic R1-R72"]
related: ["[[CCHT]]", "[[CCHT-MOC]]", "[[nguyen-tac-convert]]", "[[quy-uoc-danh-so-chuong]]", "[[bo-qua-phien-ngoai-bay]]"]
source:
  type: user_input
  ref: "Aurel giao 13/09/2026 — bon file .md tu mot project Claude truoc, lam ngoai vault. Nguyen ban, khong sua mot chu"
authority: ai
confidence: 0.7
immutable: true
always_load: false
tags: [d/fanfic, k/source, p/personal]
last_updated: 2026-09-13
---

# Nguồn — công trình của phiên trước (4 file)

> ⚠️ **Bất biến.** Không sửa, không xoá.
>
> 🔴 **Và đây là PHÂN TÍCH PHÁI SINH, không phải bằng chứng.** Bất biến 5 của [[AGENTS]]:
> *"kết luận do một lượt AI trước tạo ra **không phải là bằng chứng**, bất kể file chứa nó
> nghe chính thức tới đâu."* Bốn file dưới đây nghe **rất** chính thức — có bảng, có nhãn
> `[Canon]`, có chữ "BẢN KHOÁ". Chúng vẫn là kết luận. `authority: ai`, `confidence: 0.7`.

## Bốn file

| File | Là gì | Cỡ |
|---|---|---|
| `ho-so-phien-truoc/khung-phien-xem-v5.md` | Khung phiên xem v5 (8 quyết định, cơ chế "Thư", dàn 16 người xem, kiến trúc kết) + phụ lục **chuỗi gieo–trả** (11 chuỗi loại A, 8 motif loại B, 32 chương bất khả xâm phạm) | 25.637 B |
| `ho-so-phien-truoc/bang-anh-xa-hoi-1-2-4.md` | Bảng ánh xạ Ch.1–191 → R1–R72, **Hồi 1 · 2 · 4** | 38.080 B |
| `ho-so-phien-truoc/doi-chieu-canon-va-quy-uoc-ten.md` | Quy ước tên nhân vật v1 + đối chiếu canon BSD/KHR/Storm Bringer/Fate | 65.408 B |
| `ho-so-phien-truoc/ho-so-tong-hop-lo-1-16.md` | Hồ sơ đọc truyện, lô 1–16, toàn bộ Ch.1–191 — sự kiện, nhân vật, sổ sợi dây | 588.019 B |

## ✅ Hệ đánh số KHỚP với nguồn đã nạp — kiểm 13/09/2026

Bốn file đánh số tới **Ch.191**, [[nguyen-tac-convert]] chỉ có **183 số chương**. Không mâu
thuẫn: `Ch.N` của các file này = **vị trí thứ N trong TOC** của epub. 20/20 mốc khớp.

Luật đọc và bảng bằng chứng: [[quy-uoc-danh-so-chuong]].

## 🔴 Ba lỗi đã phát hiện trong chính bốn file này

**1. "DROP tại Ch.191" — SAI.** `khung-phien-xem-v5.md` dòng 6 ghi *"Trạng thái tác phẩm gốc:
DROP tại Ch.191, giữa lúc tác giả còn cân nhắc Phiên ngoại 2."*

Đo trực tiếp trên TOC: sau vị trí 191 còn **18 mục** — Phiên ngoại hai (6) · ba (2) · bốn (1)
· năm (1) · sáu (4) · bảy (3) · *Ngày mai đàm luận* (1) — và mục cuối kết bằng
*"—— Toàn văn xong ——"*. **Truyện đã hoàn.**

⇒ Phiên trước làm việc trên một bản nguồn **thiếu đuôi**. Vị trí 191 chỉ là *"Phiên ngoại
một · Xong"*, không phải điểm dừng của tác giả.

**2. Hồi 3 chưa có bảng ánh xạ.** `bang-anh-xa-hoi-1-2-4.md` có Hồi 1 (R1–R16), Hồi 2
(R17–R38), Hồi 4 (R52–R72). **Hồi 3 (R39–R51, Ch.134–161, 13 chương) chỉ được nhắc tới, chưa
lập bảng** — kể cả R45 (Ch.152), chương mà chính file đó gọi là *"bản lề của toàn bộ cơ chế 2D"*.

**3. Ngân sách Hồi 4 tự mâu thuẫn.** Đầu file ghi Hồi 4 = 19 chương, sau đó nâng lên 21 và
tổng thành 72. Bảng tổng kết cuối dùng 21/72. Con số 19 còn sót ở dòng "Ngân sách toàn bộ"
của phần Hồi 1. **Dùng 21/72.**

## Dùng thế nào

| Được | Không được |
|---|---|
| Làm điểm xuất phát cho `plan-continuation` | Chép thẳng vào `canon/` — luật 2 của [[quy-uoc-ma-project]] |
| Tra nhanh vị trí một sự kiện trong 191 mục | Coi một dòng ở đây là fact đã xác minh |
| Lấy lại các quyết định Aurel đã chốt *(dàn người xem, không có Rimbaud, kết)* | Tin nhãn `[Canon]` mà không mở nguồn sơ cấp |

★ **Các quyết định của Aurel trong bốn file này vẫn là quyết định của Aurel** — chúng có
`authority: user`, không phải `ai`. Khi rút ra thành note `decision` riêng thì khai đúng
authority đó. Phần **phân tích** xung quanh chúng mới là `ai`.

## Phạm vi đã trích xuất

- [ ] 8 quyết định khung → `decisions/`
- [ ] Dàn 16 người xem → `Characters/`
- [ ] 11 chuỗi gieo–trả loại A → `canon/` *(sau khi đối chiếu nguồn sơ cấp)*
- [ ] Quy ước tên → `decisions/`
- [ ] Sổ sợi dây lô 1–16 → `hooks/` *(thư mục chưa tạo)*
