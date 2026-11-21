---
id: note.PPCT.ch17-ds-kiem
type: note
scope: branch
lane: personal
project: PPCT
branch: deepseek-20261115
arc: arc-1-vuong-yen-ha-man
chapter: 17
canon_layer: planned
status: active
aliases: ["kiem ch17 ban DeepSeek", "kiểm ch17 bản song song", "ch17 ds kiem PPCT"]
related: ["[[ch17-ds-nhap]]", "[[ch17-ds-the-canh]]"]
source:
  type: inference
  ref: "Claude 15/11/2026. DeepSeek chat https://chat.deepseek.com/a/chat/s/5c4623dd-29fb-48ef-98d7-52941e735d72 · GPT https://chatgpt.com/g/g-p-6af97531ef0c8191a708021329791a4c-ppct/c/6af976dd-1bb4-83ec-934c-378b3ddc3623"
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-15
---

# Kiểm ch17 bản DeepSeek

## Ai viết khối nào

| Khối | Người viết |
|---|---|
| A–B | [DS] lượt 1 (chủ động xin 2 lượt để khỏi đứt) |
| C–E | [DS] lượt 2 |
| sửa | Claude — bảng dưới |

## Claude kiểm lượt 1 — lỗi DS → sửa

| # | DS viết | Lỗi | Sửa |
|---|---|---|---|
| 1 | 「Saber已经站起来了」 | ch16 bản DS: Saber đã đứng sẵn | 「Saber已经动了」 |
| 2 | 「每一个他都能认出是什么」 | né beat bắt buộc "mỗi binh sĩ là Anh linh" | 「那里面的每一个都是英灵」 |
| 3 | Waver được đưa ra sau hàng quân, rồi 「靠在布塞法洛斯的腿旁边」 | vị trí mâu thuẫn | 「站在队列后面」 |
| 4 | 「纲吉在宴会前说过」 | câu ấy ở ch6, không phải trước yến | 「纲吉早先说过」 |
| 5 | 「Archer从宝座上站起来」 · Archer xưng 「我」 | bịa ngai; giọng Archer là 本王 | bỏ ngai; 本王 |
| 6 | tag sau ngoặc ở A, C, D (「”纲吉说。」, 「”说完…」) | `project_3` | chuyển trước ngoặc / bỏ |

## GPT — 7,8/10, 6 điểm

| # | Điểm GPT | Claude | Lý do |
|---|---|---|---|
| 1 | Dazai kết luận "còn lệnh chú" quá chắc | **theo** | thẻ 03-ch17: chỉ ở mức nghi → 「多半…大概…说不定」 |
| 2 | 「一个谁也没亲眼看见的死」 lệch canon (một Assassin chết thật) | **theo** | 「死了一个，所有人就都当Assassin已经退场了。」 — đúng cả canon lẫn assassin-chet-gia-truoc-dem-kho-cang |
| 3 | Vương Quân thiếu sức nặng | **theo một phần** | thêm một câu cả quân giơ vũ khí đáp tay Rider; trận vẫn ngắn (thẻ 02: không tả dài) |
| 4 | Waver hiểu đột ngột; 「他」 mơ hồ | **theo một phần** | 「好像都没那么要紧了」, 「从Rider活着的时候」 |
| 5 | 「隔着鞋底，沙子碰不到他」 gượng | **theo** | 「鞋底陷进细沙」 |
| 6 | Kết chương thiếu điểm rơi | **không theo** | thẻ 04-ch17: kết bằng câu đùa của Waver (thói quen tác giả) |
| — | "thiếu 预警 và ※" | **không theo** | có trong file; Claude lược khi dán cho GPT |

## Số đo (executed 15/11/2026)

- `ai_tells_check.py --project PPCT`: sạch.
- `chapter_gate.py`: luật cứng đạt; 8/10. Lệch: `？` 25,6/10k (sàn 40), `！` 5,1/10k (sàn 10). Trung vị câu đạt. 1.954 chữ.
