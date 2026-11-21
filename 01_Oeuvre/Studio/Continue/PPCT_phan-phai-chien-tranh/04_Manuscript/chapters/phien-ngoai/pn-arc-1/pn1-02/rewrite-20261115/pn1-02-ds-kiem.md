---
id: note.PPCT.pn1-02-ds-kiem
type: note
scope: branch
lane: personal
project: PPCT
branch: deepseek-20261115
arc: pn-arc-1-yokohama-va-quan-lupin
chapter: "pn1-02"
canon_layer: planned
status: active
aliases: ["kiem pn1-02 ban DeepSeek", "kiểm phiên ngoại Irisviel", "pn1-02 ds kiem PPCT"]
related: ["[[pn1-02-ds-nhap]]", "[[pn1-02-ds-the-canh]]", "[[pn-arc-1-ds-plan]]", "[[Kiritsugu-Emiya]]"]
source:
  type: inference
  ref: "Claude 17/11/2026. DeepSeek https://chat.deepseek.com/a/chat/s/499b41a6-d9a8-46c1-957b-44fb41b8762f · GPT https://chatgpt.com/g/g-p-6af97531ef0c8191a708021329791a4c-ppct/c/6afc7f3f-84f0-83ec-8489-fe9dbada6804"
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-17
---

# Kiểm pn1-02 bản DeepSeek

Một lượt DS: A–E, ba bản mỗi chỗ B, C, D. GPT chấm; Claude ghép và sửa; GPT đọc thử bản ghép.

## Phương án (Aurel: "để DeepSeek/GPT đề xuất")

| Chỗ | Bản DS | GPT chọn | Lý do (đã kiểm) |
|---|---|---|---|
| C4 Tìm quán | B1 bưu thiếp của Dazai + gọi điện · B2 Saber ở lại sau chiến tranh, trọ cạnh nhà, báo địa chỉ · B3 nghe các bà ở chợ kể | **B1** (bỏ suy luận chữ viết "thuận tay trái"; hỏi "thiếu niên tóc nâu" thay vì "người có lửa trên trán") | B2 viết lịch sử hậu chiến cho Saber — trái luật không giải thích; B3 cho Irisviel nhớ Rider "ở sân khấu" — sai liên tục (Rider ngã ở cầu, ch45) |
| C5 Tên | C1 Tsuna tự nói · C2 Dazai giới thiệu và "phiên dịch" · C3 Illya hỏi | **C3** + câu hỏi sức khoẻ của C1 | Câu 「你是谁」 ch47 được trả lời qua con gái cô; Tsuna lo cho cô trước hết |
| C6 Saber–Kiritsugu | D1 không lời, Saber đưa chén trà · D2 "进来吃"/"吃完就走" · D3 Saber trốn vào bếp | **D1** (sửa đạo cụ) | Thiện ý mà vẫn giữ khoảng cách sau lệnh phá Chén; Kiritsugu đứng ngoài cửa quán vọng cảnh hắn đứng ngoài kết giới ở A |

## Claude kiểm

| # | Lỗi DS | Sửa |
|---|---|---|
| 1 | Tsuna 「橙色的头发」 | 棕色 (lửa mới màu cam) |
| 2 | C2: Dazai là người lau ly | Người lau ly là Lancer; không dùng C2 |
| 3 | Illya nói "lửa trên trán biến mất" dù chưa từng thấy | 「妈妈说，救她的人额头上有火。」 |
| 4 | Dazai: 「好久不见。餐厅那次。」 nhắc thẳng | 「好久不见。」 |
| 5 | Tag sau thoại 「“都好。”她说」 (ai_tells project_3) | 「她说：“都好。那天谢谢你。”」 |
| 6 | Lời người viết tiếp của DS dài, giải thích | Thay bằng một câu |

## GPT đọc thử — điểm đã kiểm

| # | GPT nói | Kết luận | Sửa |
|---|---|---|---|
| 1.2 / 1.8 | "Nhà mới hai tầng" — canon: dinh thự kiểu Nhật Kiritsugu mua trong chiến tranh, Irisviel từng ở | Đúng | 「战争时切嗣买下的那座日式旧宅」 |
| 1.5–1.7 | Thuốc lá đã hút hết lại xuất hiện; Kiritsugu ở góc phố mà Dazai đứng cạnh ở cửa; chén trà và ly cà phê chồng nhau | Đúng | Kiritsugu uống ở góc phố, quay lại đặt chén rỗng lên bậu cửa sổ, châm điếu mới; Dazai đặt ly cà phê cạnh chén rỗng; một lúc sau Kiritsugu mới cầm lên |
| 2.1–2.5 | 「不化」; nhịp thở "ngày càng thưa" quá kịch; câu ba vế; "ba giây"; câu giải thích 「谁也没提那天晚上的事」 | Đúng | Sửa cả năm |
| 3 | Irisviel chấp nhận Saber, Rider quá dễ | Đúng | Cô từng thấy Rider ở yến tiệc trong lâu đài (canon Vương Yến); nhận ra Saber; 「她没有问。」 |
| 1.1 | Tuổi Illya ~8, Shirō ~7 | Khớp | — |
| 1.3 | Cảm nhận Avalon là sáng tác | Giữ ở mức trực giác | — |

## Cổng (sau sửa)

- `ai_tells_check`: 1.968 chữ Hán, không tật AI (đã sửa một tag sau thoại).
- `chapter_gate`: đạt luật cứng (số từ 2.064); lệch 4 chỉ tiêu mềm.
- `pov_leak_check --pov irisviel`: không rò rỉ.
