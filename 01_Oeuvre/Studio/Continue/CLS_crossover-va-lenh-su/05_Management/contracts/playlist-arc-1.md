---
id: rule.CLS.playlist-arc-1
type: rule
scope: project
project: CLS
universes: [HSR, DC]
lane: personal
canon_layer: planned
status: active
strength: target
aliases: ["playlist arc 1 CLS", "danh sach doan chieu arc 1", "danh sách đoạn chiếu arc 1", "moi doan chieu phoi ra gi", "mỗi đoạn chiếu phơi ra gì"]
related: ["[[CLS]]", "[[watch-frame]]", "[[dan-y-arc-1-jason-v5-cls]]", "[[nguoi-do-la-tsuna]]", "[[giong-khong-ten-la-dazai]]", "[[jason-da-chet-va-song-lai]]", "[[Planarcadia]]", "[[Ashveil]]"]
source:
  type: inference
  ref: "watch-frame-contract 04/10/2026 — rut tu 39 the canh arc 1 (chapters/arc-1/ch01-ch08). The canh la ban day du; file nay la bang doi chieu 'doan nao phoi ra gi cho ai'."
authority: ai
confidence: 0.6
always_load: false
load_for: [writer, planner, continuity-reviewer]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-10-04
---

# Playlist arc 1 — đoạn nào phơi ra gì, cho ai

> [[watch-frame]] bắt mỗi đoạn chiếu khai **sự thật nó phơi ra** và **ai trong phòng chưa biết**. Thẻ cảnh là bản đầy đủ; file này chỉ là bảng đối chiếu.
> Nguồn của mọi đoạn: **phía được chiếu**, chặng Planarcadia — canon nền ở [[Planarcadia]] và [[Ashveil]], phần của Jason là CLS viết.

## Ba bí mật — không đoạn nào được phơi

| Bí mật | Trong arc 1, phòng thấy gì | Thay đổi `known_by` |
|---|---|---|
| [[nguoi-do-la-tsuna]] | một bàn tay *(4.02)*; tầng dưới đã được dọn, và một giọng không lời *(7.01, 7.05)* | **không** |
| [[giong-khong-ten-la-dazai]] | biệt danh 「tên bùn đen」 *(2.01)*; một giọng qua liên lạc *(7.04)* | **không** |
| [[jason-da-chet-va-song-lai]] | biệt danh 「chim nhỏ」 *(2.01)*; câu 「người ta về được」 *(6.03)* | **không** |

Arc 1 **không đề xuất** thay đổi nào trên ba note bí mật.

## Từng chương — điều phòng **biết thêm**

| Ch | Đoạn phim | Phơi ra | Ai trong phòng chưa biết |
|---|---|---|---|
| 1 | 1.02 Tủ lạnh · 1.04 Hai cú điện thoại | Ở văn phòng của Ashveil có một người làm công cầm sổ; Ashveil báo tin cho Pearl sau lưng khách | **cả phòng** không biết gã thợ cầm sổ. Boothill, Rappa: lần đầu thấy **La Mancha đang ở đâu** — Đoàn tàu thì đã biết |
| 2 | 2.01 Chim nhỏ · 2.03 Ba mươi ba · 2.05 Mặt Nạ Sói | Đội tàu trên phim **quen** gã thợ cầm sổ; hắn đọc hiện trường như người được dạy; Ashveil đòi 「quyền miễn trừ trả thù」 | cả phòng: việc Đội tàu quen hắn. Boothill, Rappa, Aventurine: thoả thuận Ashveil–Pearl |
| 3 | 3.01–3.02 · 3.04–3.05 | Gã thợ cầm sổ là **lệnh sứ Săn bắn**; tâm nguyện 「một Cảnh Binh chết già trên giường」 | cả phòng: hắn là của Lan. Boothill, Rappa: tâm nguyện của thủ lĩnh *(Stelle nhớ lời chúc của 不死途 với cô — [[nguoi-xem-nho-toi-cuoi-ban-truoc]])* |
| 4 | 4.01–4.02 · 4.04 | Sunday làm nội gián **cùng một người nữa**; gã thợ cầm sổ quen người ấy | Sunday phía xem: anh đã làm việc ấy **một mình** |
| 5 | 5.01–5.02 · 5.05 | Đài Fulwish dựng tin; Ashveil định dùng quyền miễn trừ | Cảnh Binh mới vào phòng: mọi thứ từ ch1 |
| 6 | 6.01 · 6.03 · 6.05 | **Lệch khỏi trí nhớ:** không ai bị nuốt; gã thợ cầm sổ chặn cái bóng, tẩn ba người, để lại lời. Ashveil **tự nói tên 拉曼查** trên màn hình (6.01). Gã thợ **tự nhận là 巡海游侠** và gọi Ashveil 「领队」 (6.03). Đồng xu 真珠 tặng là **thiết bị định vị** — thứ 「小东西」 Aventurine nói ở ch02 (6.05) | cả phòng — Stelle nhớ rõ ba người **đã bị nuốt**; **cả phòng** nghe lần đầu gã thợ tự nhận là 巡海游侠. **Ba Cảnh Binh mới:** nghe tên **拉曼查** lần đầu, **từ màn hình** (Boothill, Rappa đã nghe từ Stelle ở ch01). Thay đổi `known_by` trên ba note bí mật: **không**; câu 「人回得来」 không thêm ai vào `suspected_by` của [[jason-da-chet-va-song-lai]]. Hệ quả cốt truyện ghi khi `finalize-chapter`: phòng biết Jason tự nhận là 巡海游侠 (ai nhận hắn — **giữ ẩn**); ba Cảnh Binh mới biết thủ lĩnh họ tìm là người trên màn hình |
| 7 | 7.01–7.02 · 7.04–7.05 | **Lệch khỏi trí nhớ:** Himeko lên tháp; gã thợ cầm sổ chặn hậu, gọi nhờ một giọng lạ; có giọng thứ hai trong tiếng chỉnh âm; ba người tỉnh lại và giúp sơ tán | Himeko: cô đã ở lại. Sunday: anh đã chỉnh âm một mình |
| 8 | 8.01–8.02 | Ba người đối mặt Magnus và Hayek; Ashveil biết người làm công của mình **có bạn** và **không hỏi hắn từ đâu tới** | cả phòng |

## Điều phòng mang ra khỏi arc 1 *(`memory_retained: true`)*

- **Cảnh Binh:** biết La Mancha ở đâu và muốn được yên; biết có một lệnh sứ Săn bắn không ai có hồ sơ.
- **IPC** *(Aventurine)*: cùng điều ấy — và đã ra giá.
- **Đoàn tàu:** biết ở phía được chiếu họ **quen** ba người họ chưa từng gặp.
- **Sunday:** biết có một người từng làm việc cạnh mình mà anh không nhớ.

Bốn điều này là **hệ quả cốt truyện**, không phải thay đổi trên note bí mật; `finalize-chapter` ghi chúng theo từng chương.

## Mật độ phản ứng

Theo thẻ cảnh: phòng **16.900** trên **48.500** từ dự kiến *(khoảng 35 %)*; ch5 và ch8 nghiêng về phòng, ch6 và ch7 nghiêng về phim. Mỗi cảnh phòng có mục 「Kết cảnh phải đạt được gì」 — [[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules|hard-rules]] B3.
