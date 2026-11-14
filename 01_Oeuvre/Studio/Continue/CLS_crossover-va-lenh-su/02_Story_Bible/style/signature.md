---
id: style.CLS.signature
type: style
scope: project
project: CLS
lane: personal
canon_layer: user_canon
status: draft
strength: tendency
aliases: ["signature CLS", "van phong CLS", "chu ky van phong CLS", "van xuoi pho thong CLS", "do giong o dau"]
related: ["[[CLS]]", "[[hard-rules]]", "[[targets]]", "[[ai-tells]]", "[[giong-van-pho-thong-khong-nhai-ai]]", "[[pham-vi-ba-the-gioi-va-giong-van-b1]]", "[[quan-anh-the-reaction-fic]]"]
source:
  type: user_input
  ref: "Aurel 04/10/2026: 'viet theo dang thuong thay' + chon 'Van xuoi pho thong, khong nhai ai' — sources/user-input/20261004-giu-an-va-van-xuoi-pho-thong.md"
authority: user
confidence: 0.9
always_load: false
load_for: [writer, planner]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-10-04
---

# Chữ ký văn phong CLS — văn xuôi phổ thông, **chưa có số đo**

> 🟡 **File này KHÔNG chứa số.** Aurel chốt 04/10/2026 — [[giong-van-pho-thong-khong-nhai-ai]]: CLS **không nhại tác giả nào**, kể cả Aurel. Số đo sẽ lấy từ **ch1 sau khi Aurel chỉnh**.

## Viết thế nào cho tới khi có số

- Tiếng Việt tự nhiên kiểu fanfic thường gặp: **câu vừa phải, thoại nhiều**; không dồn câu cụt, không kéo câu dài nối phẩy.
- Khối chiếu và khối phản ứng theo quy ước thể loại — [[quan-anh-the-reaction-fic]]; cách kể mượn bộ A — [[pham-vi-ba-the-gioi-va-giong-van-b1]] phần b.
- **Không** để lối Hán-Việt của bản convert lọt vào: ba epub đối chiếu là bản dịch máy.
- Góc kể của từng cảnh: theo thẻ cảnh *(phòng chiếu qua Boothill; phim kể từ trong Jason hoặc từ ngoài)*.

## Thứ tự ưu tiên văn phong

```
CLS/style/hard-rules  >  CLS/style/ai-tells  >  CLS/style/targets
   >  (file nay)  >  Global/writing/  >  Global/vietnamese/
```

Đã có *(04/10)*: [[hard-rules]] — luật cơ bản và luật của thể loại · [[ai-tells]] — tật của máy, **đếm và báo**, chưa có trần · [[targets]] — sàn ~3.000 từ mỗi chương.
`chapter_gate.py` vẫn **dừng, exit 2** ở ch1 *(không có khối `gate:` vì chưa có mốc đo)*: ch1 soát bằng `ai_tells_check.py`, `pov_leak_check.py`, bảng luật cứng, và mắt Aurel.

## Việc kế

1. Viết ch1.
2. Aurel chỉnh.
3. `analyze-style` đo **ch1 đã chỉnh** → điền số vào [[targets]], đặt trần cho [[ai-tells]], thêm khối `gate:`. Ch1 dự kiến 5.500 từ — vừa qua ngưỡng ~5.000 của sub-vault.
