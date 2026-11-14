---
id: decision.UNTCH.qd-mau-do-van-phong
type: decision
scope: project
lane: personal
project: UNTCH
canon_layer: project_locked
status: locked
aliases: ["mau do van phong UNTCH", "co tinh chuong MNet khong", "loai ch54 71 75 115", "quyet dinh do van phong", "chuong chat log co tinh khong"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/02_Story_Bible/style/hard-rules|hard-rules]]", "[[bien-ban-su-kien-untch]]", "[[UNTCH]]"]
source:
  type: user_input
  ref: "Aurel chot 31/08/2026 khi duoc hoi truoc buoc 3. So lieu kem theo do bang 03_Workspace/untch-extract/measure_all.py."
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, p/personal]
legacy_tags: [k/decision]
last_updated: 2026-08-31
---

# Quyết định — bốn chương MNet tách khỏi mẫu đo văn phong

## Nội dung

> **Aurel chốt 31/08/2026:** bốn chương log chat MNet — **ch54 · ch71 · ch75 · ch115** —
> **loại khỏi mẫu chính, đo thành một hồ sơ riêng.**

Lý do chọn phương án này thay vì loại hẳn: **anh sẽ vẫn cần viết chương MNet**, và chúng có
luật riêng cần một chuẩn để đối chiếu.

## Số liệu chứng minh quyết định đúng

| | 123 chương văn xuôi | 4 chương MNet |
|---|---|---|
| Trung vị độ dài đoạn | 20,5 từ | **4,0 từ** |
| Độ dài đoạn trung bình | 29,7 từ | 11,5 từ |
| Tỉ lệ đoạn thoại | 0,255 | 0,076 |
| Số đoạn / chương | 98,3 | **165,8** |
| Mật độ thuật ngữ /1000 | 8,96 | 5,88 |

⇒ Trộn vào **không** làm lệch nhiều con số trung bình, nhưng làm **lệch hẳn trung vị đoạn và tỉ
lệ thoại** — và mọi bản nháp văn xuôi đem so sẽ trượt chuẩn một cách vô hình.

## Phát hiện kèm theo — một luật của tác giả

Trong cả bốn chương MNet, số lượt xuất hiện của
`Sky` · `bond` · `Mist` · `Cloud` · `Storm` · `Sun` · `Element` · `mafia` = **0**.

⇒ Trên MNet, nhân vật **không nhắc tới hệ Flame**. Đó là mạng xã hội công khai và họ giữ mồm.
**Luật, không phải ngẫu nhiên.** Đã ghi vào [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/02_Story_Bible/style/hard-rules|hard-rules]] mục G.

## Nơi áp dụng

- Ngưỡng văn xuôi: [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/02_Story_Bible/style/targets|targets]]
- Ngưỡng MNet riêng: [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/02_Story_Bible/style/targets|targets]], mục *"Chương MNet — hồ sơ riêng"*
- Chạy lại: `python3 03_Workspace/untch-extract/measure_all.py`
