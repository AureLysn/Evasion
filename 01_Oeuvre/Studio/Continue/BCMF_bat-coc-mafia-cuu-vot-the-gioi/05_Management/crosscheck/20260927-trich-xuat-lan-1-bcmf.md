---
id: note.BCMF.20260927-trich-xuat-lan-1-bcmf
type: note
scope: project
lane: personal
project: BCMF
canon_layer: high_confidence_inference
status: active
aliases: ["trich xuat lan 1 BCMF", "crosscheck BCMF", "doi chieu trich xuat BCMF", "extract-entities BCMF 27/09"]
related: ["[[BCMF]]", "[[nguyen-tac-bcmf]]", "[[crossover-bcmf]]", "[[watch-frame-bcmf]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/00_Overview/drop-point|drop-point-bcmf]]", "[[phan-biet-cung-ten-bcmf]]"]
source:
  type: measured
  ref: "Trich xuat lan 1 (Mode 1) 27/09/2026: doc toan van ch1-ch24 ban convert (nguyen-tac-bcmf, 54.892 tu) trong cung phien; doi chieu voi hop dong + drop-point cung ngay va voi MAIN-DATABASE KHR/BSD"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-27
---

# Trích xuất lần 1 — BCMF, đối chiếu

## Đã làm gì

- **Mode 1**, đọc toàn văn ch1–24 bản convert, **trong cùng phiên** đã dựng hợp đồng và drop-point. Không giao cho agent `researcher` — skill khuyên giao khi nguồn > 15.000 từ, nhưng toàn văn đã nằm sẵn trong ngữ cảnh phiên này; giao đi thì agent phải đọc lại từ đầu.
- **Không có hồ sơ cũ nào** cho BCMF (không có HOSO/TRITHUC, không có bản backfill). Nên đối chiếu với (a) ba note AI viết **cùng ngày** — [[crossover-bcmf]], [[watch-frame-bcmf]], [[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/00_Overview/drop-point|drop-point-bcmf]], và (b) canon trong `Database/Fandom/`.

⚠️ **Đối chiếu (a) có giới hạn:** cùng một người đọc, cùng một lần đọc. Nó bắt được mâu thuẫn **nội bộ**, không bắt được chỗ **cả hai cùng đọc sai**. Chỗ đó chỉ nguyên văn Trung (Aurel đang tải bản Lofter) mới gỡ được.

## Số lượng

| Loại | Số | Ghi chú |
|---|---|---|
| `character` | 57 | 22 KHR · 21 Conan · 14 BSD · — gồm 2 ý thức thế giới, Natsu, 2 người không tên/phụ |
| `secret` | 14 | đủ `known_by` / `suspected_by` / `unknown_to` |
| `event` | 16 | chỉ những gì đã xảy ra |
| `relationship` | 23 | có `addressing` theo bản convert |
| `location` | 9 | |
| `organization` | 11 | |
| `fact` (`canon/`) | 7 | |
| `timeline` | 1 | [[master-bcmf]] |
| disambiguation | 1 | [[phan-biet-cung-ten-bcmf]], `always_load: true` |
| `hook` / `question` | 24 / 8 | từ `analyze-drop-point`, không đổi |

## Đối chiếu

### (a) Với hợp đồng + drop-point cùng ngày

| | Mục | Kết quả |
|---|---|---|
| ✅ MATCH | Người trong phòng — [[watch-frame-bcmf]] `participants` | khớp 26/26 note nhân vật trong phòng |
| ✅ MATCH | Luật Tri-ni-Sette — ai qua được | khớp note Reborn, Gokudera, Chrome, Byakuran, Uni, Enma, Fran, Mukuro |
| ✅ MATCH | Timeline D1/D2 | [[master-bcmf]] khớp [[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/00_Overview/drop-point|drop-point-bcmf]] mục 8 |
| 🔵 NEW | Cách gọi nhau (`addressing`) | chưa có ở đâu trước đó |
| 🔵 NEW | Shiratori, đội thám tử nhí, Kazami, Yamakage, người đàn ông mang bom — nhân vật **chỉ ngoài đời** | hợp đồng không liệt kê vì họ không ở trong phòng |
| 🔵 NEW | Megure **có cả bản thể ngoài đời** (ch14) — không chỉ trong phòng | ghi trong note |
| 🔴 DIFFERENT → đã sửa trước khi ghi | Bản nháp đặt "(ngoài đời)" làm hậu tố id trong `suspected_by` — một người vừa `known_by` vừa `suspected_by` | bỏ hậu tố; lớp ngoài đời ghi trong thân note. **Hệ quả thiết kế:** người Conan có hai lớp mà schema `known_by` chỉ có một chiều. Xem mục cuối |

### (b) Với `Database/Fandom/`

| | Mục | Kết quả |
|---|---|---|
| 🔴 DIFFERENT — **cố ý** | Akutagawa: canon **Port Mafia**; fic: **Cơ quan Thám tử** | tuyến IF nền BEAST — [[crossover-bcmf]] §3. Fic thắng |
| 🔴 DIFFERENT — **cố ý** | Oda: canon chết; fic: **sống, ở Cơ quan** | như trên |
| 🔴 DIFFERENT — **cố ý** | Atsushi: canon Cơ quan; fic: **Port Mafia** | như trên |
| ✅ MATCH | Tri-ni-Sette: Mare = trục ngang | dùng cho [[q-ai-nam-da-tang-khong-gian-bcmf]] |
| 🟡 gần khớp | Tuổi Tsuna: fic **15** ở tháng 2 năm 3; canon note ghi **14** lúc truyện mở (năm 1), tự đánh dấu chưa chắc | không mâu thuẫn trực tiếp |

### 🟠 MISSING — được nhắc trong nguồn, **chưa** có note (cố ý)

Chỉ được nhắc, không hành động trên màn hình. Tạo note khi dàn ý cần:

Sawada Nana · Iemitsu · Kyoko · Haru · Dino · Varia · Bianchi · Verde (thiết bị của Fran) · Gamma · Giannini · Kato Julie · Shitt-P · Ooyama Large · Jaeger / Bermuda · **một Vindice lạ** (ch9, ch11 — giơ tay chào Tsuna) · Mouri Ran · Mouri Kogoro · Tiến sĩ Agasa · Hondo Eisuke · Plamya · Rum (chỉ qua điện thoại).

⚠️ **Vindice lạ** đáng để ý: Tsuna *"không phải hắn quen thuộc Jaeger cùng Bermuda"* (ch9). Chưa thành hook — nếu dàn ý cần thì mở.

## Còn phải làm

1. 🔴 **Hai lớp của người Conan vs schema `known_by`.** Một nhân vật (Conan, Amuro, Megure…) có sợi ý thức **biết** và bản thể **không biết** cùng một bí mật. Hiện giải bằng quy ước "`known_by` = lớp trong phòng" + ghi chú thân note. `pov_leak_check` không đọc được quy ước đó. Cần quyết trước khi viết chương đầu: tách mỗi người thành hai id, hay thêm trường riêng. Chưa mở question — ghi ở đây để `plan-continuation` bắt.
2. Chạy lại `analyze-drop-point` **Mode 2** cho câu 2, 3, 7 — giờ đã có `events/` và `Characters/`.
3. Khi bản Lofter về: đối chiếu tên riêng (bản convert có tên dịch máy), ngày đăng, lời tác giả gốc.
