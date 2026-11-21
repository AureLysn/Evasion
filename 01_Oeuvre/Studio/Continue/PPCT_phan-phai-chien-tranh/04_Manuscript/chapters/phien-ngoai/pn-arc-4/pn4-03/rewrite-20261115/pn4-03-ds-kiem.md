---
id: note.PPCT.pn4-03-ds-kiem
type: note
scope: branch
lane: personal
project: PPCT
branch: deepseek-20261115
arc: pn-arc-4-tuyen-tap-gag-fate
chapter: "pn4-03"
canon_layer: planned
status: active
aliases: ["kiem pn4-03 ban DeepSeek", "kiểm phiên ngoại Kiritsugu mất ngủ", "pn4-03 ds kiem PPCT"]
related: ["[[pn4-03-ds-nhap]]", "[[pn4-03-ds-the-canh]]", "[[pn-arc-4-ds-plan]]", "[[Kiritsugu-Emiya]]", "[[Maiya-Hisau]]"]
source:
  type: inference
  ref: "Claude 18/11/2026. DeepSeek https://chat.deepseek.com/a/chat/s/d9c56897-edba-45c0-98c3-086e7998a5cf · GPT chấm + đọc thử (dừng ở điểm 3/11) https://chatgpt.com/g/g-p-6af97531ef0c8191a708021329791a4c-ppct/c/6afdb22c-b294-83ec-815c-bcd6b2c64ae6"
authority: ai
confidence: 0.65
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-18
---

# Kiểm pn4-03 bản DeepSeek

Trước khi viết: không tra web mới — dùng note có sẵn [[Kiritsugu-Emiya]] (ảnh nhiệt, hút thuốc lại, Irisviel đóng vai Master) và [[Maiya-Hisau]] (mê đồ ngọt, dơi gắn camera). Lượt 1: DS viết sáu khối, ba bản 舞弥, ba bản 档案. Lượt 2: GPT chấm và đọc thử — **câu trả lời dừng giữa chừng** (đọc thử được 3/11 điểm); Claude tự kiểm phần còn lại.

## C5 — POV

Luân phiên **阿纲** / **卫宫切嗣** (tên in đậm), như đề xuất.

## C-a — Maiya

| Bản DS | GPT | |
|---|---|---|
| 一 Tới muộn; chăn, ba viên kẹo xếp ngay, tờ giấy vẽ dơi "cảm ơn" | 8,5 | chăn bị bỏ lại mâu thuẫn cảnh bọn trẻ mang chăn về |
| 二 Gặp thật, Yuni cúi chào, chạy vào sương | 6,5 | sương vô cớ, Maiya đuổi không kịp |
| 三 Chỉ nghe bước chân, túi kẹo vẽ dơi | 8 | yếu với một đặc vụ |

**Chốt:** 一 + 三 — Maiya tới muộn (vì vùng giao tranh chặn đường); túi marshmallow vẽ dơi, chữ 「谢谢」; dấu chân dừng ở gốc cây (khe mở ngay đó); qua bộ đàm nghe tiếng bóc túi. Cảnh bọn trẻ để lại túi kẹo đặt ở khối 阿纲 khi khe mở.

## C-b — dòng cuối hồ sơ

| Bản DS | GPT | |
|---|---|---|
| 一 Xếp vào ngăn "không phải mục tiêu" | 8 | thiếu thông tin đã rời |
| 二 「已离开冬木」, cất thuốc, "không ăn" | 9 — chọn | |
| 三 Kết luận dài "lạc vào, đã rời, lưu trữ" | 6 | suy đoán thành dữ kiện |

**Chốt:** 二 — 「已离开冬木。」 cất bao thuốc; 「不吃。」; Maiya lấy thêm viên nữa. Claude thêm: sáng đó Kiritsugu ngủ được ba tiếng — lâu nhất từ khi tới Fuyuki (khép tên chương). Không "viết rồi gạch" (đã dùng ở pn3-01).

## GPT đọc thử (3 điểm) + Claude kiểm thêm

| # | Điểm | Nguồn | Sửa |
|---|---|---|---|
| 1 | Ảnh nhiệt không "thấy" mạch ma thuật | GPT | 「体温分布正常。没有魔术师的特征。」; hồ sơ 「未发现魔术师特征」 |
| 2 | "Caster bắt bảy đứa" — con số không canon | GPT | 「Caster最近接连绑架儿童」 |
| 3 | Kiritsugu bỏ mặc trẻ — lệch nhân vật | GPT | 「确认不是陷阱，就把他们带到安全的地方。」; Maiya bị giao tranh chặn đường cả đêm |
| 4 | Ba ngày trẻ con ở rừng — vô lý | Claude | Rút còn **một đêm**; Kiritsugu thức tới sáng; ở quán chỉ mất một buổi chiều |
| 5 | Illya "ở lâu đài" Fuyuki | Claude | Illya ở **lâu đài Einzbern bên Đức** |
| 6 | Thế giới canon không có năng lực | Claude | Yuni: 「这里，我好像什么都看不见。」; Byakuran: 「我在这边一个梦都没有。好安静。」 — không giải thích |
| 7 | Tag thoại sau ngoặc kép | Claude | Đưa lên trước |
| 8 | Lời người viết tiếp DS (Kiritsugu giấu túi kẹo "dự phòng") | GPT bỏ | 「那只蝙蝠后来还是没吃棉花糖。舞弥替它吃了。」 |

## Cổng

- `ai_tells_check`: 1.611 chữ Hán, không tật AI. Regex Python: không tag sau ngoặc, không 「」 ngoài tên quán, không từ cấm (7³, 绮礼, 言峰, 魔术回路, 七个).
- `chapter_gate`: đạt luật cứng (số từ 1.717); lệch 6 chỉ tiêu mềm.
- `pov_leak_check --pov tsuna`: không rò rỉ.
