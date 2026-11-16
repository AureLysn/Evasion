---
id: note.PPCT.ch16-ds-kiem
type: note
scope: branch
lane: personal
project: PPCT
branch: deepseek-20261115
arc: arc-1-vuong-yen-ha-man
chapter: 16
canon_layer: planned
status: active
aliases: ["kiem ch16 ban DeepSeek", "kiểm ch16 bản song song", "ch16 ds kiem PPCT"]
related: ["[[ch16-ds-nhap]]", "[[ch16-ds-the-canh]]", "[[deepseek-20261115]]"]
source:
  type: inference
  ref: "Claude 15/11/2026. DeepSeek chat https://chat.deepseek.com/a/chat/s/5c4623dd-29fb-48ef-98d7-52941e735d72 · GPT (project PPCT, Project-only memory) https://chatgpt.com/g/g-p-6af97531ef0c8191a708021329791a4c-ppct/c/6af976dd-1bb4-83ec-934c-378b3ddc3623"
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-15
---

# Kiểm ch16 bản DeepSeek

## Ai viết khối nào

| Khối | Người viết |
|---|---|
| A–B | [DS] lượt 1 (DeepThink 155 s; câu trả lời đứt giữa 【C】) |
| C–E | [DS] lượt 2 |
| sửa | Claude — bảng dưới |

## Claude kiểm lượt 1 — lỗi DS → sửa

| # | DS viết | Lỗi | Sửa |
|---|---|---|---|
| 1 | 「一个陌生的身影从石中剑的剑柄上松开手，把那把剑举起来」, cảnh đặt trên tường Camelot | tự mâu thuẫn; kiếm trong đá không ở Camelot | người lạ rút kiếm từ đá trên đồi gió biển |
| 2 | 「这个人把不列颠治理得还行。」 (Tsuna) | Tsuna bình luận thay Saber — thẻ cấm | đổi thành Saber hỏi |
| 3 | vua thế giới 2 「那只手戴着和她一样的指环」 | bịa chi tiết | bỏ |
| 4 | 「握过莫德雷德刺过来的枪尖」 | sai canon: thương là của Artoria | 「没在卡姆兰的山丘上跟莫德雷德刀剑相向」 |
| 5 | 「高文、凯、贝狄威尔——她拿他们的死…」 | gọi tên hiệp sĩ ngoài note canon (Bedivere sống sót); có `——` | bỏ tên, bỏ gạch |
| 6 | 「写过那封没送到的赦免信」 | trái thẻ (thư đã gửi) | 「写过那封赦免书」 |
| 7 | 「像在集市上选一匹布。…像在挑一把合手的剑。」 | hai so sánh liền | bỏ cái thứ hai |
| 8 | 「Archer靠在他的宝座上」 · 「从袖口里抽出」 | bịa ngai; khăn trong tay áo | 「坐在一旁」 · 「从口袋里」 |
| 9 | ~15 tag sau ngoặc 「”纲吉说。」 dù đề bài cấm | `project_3` | chuyển trước ngoặc hoặc bỏ |
| 10 | ghi chú cuối gọi 「B段 / C段 / D段」 | lộ khối kỹ thuật | viết lại không nhãn khối |
| 11 | thiếu `！`, thuật ngữ | cổng | thêm câu Waver bị Rider chặn (có trong thẻ: Rider ra hiệu); 「那个英灵」 trong câu hỏi của Irisviel |

## GPT — đánh giá 8/10, 6 điểm

| # | Điểm GPT | Claude | Lý do |
|---|---|---|---|
| 1 | Thế giới 5 chưa có cái giá quan sát được | **không theo** | thẻ 02-ch16 định cái giá chính là "vua ấy không phải người Saber nhận ra" |
| 2 | Thế giới 2 kết luận "không Camlann" quá sớm | **theo** | đổi thành Saber chờ ngọn đồi qua nhiều năm và không thấy; Tsuna xác nhận |
| 3 | Avalon cần dấu hiệu điểm rẽ | **theo** | 「那个世界里没有人偷走阿瓦隆」 |
| 4 | Câu hỏi tu từ nói thay người đọc | **theo** | còn 「她拿他们的死当什么了？」 *(bỏ cả câu 筹码 Claude thêm ở lượt 1)* |
| 5 | 「称哪一个自己最划算」 gượng | **theo** | 「像摆着一杆秤，正把那些不同的自己一个一个放上去称」 |
| 6 | Dazai lau tay quá lộ | **không theo** | plan ch16 beat 5 chọn đúng hành động này; giọng Dazai dự án là ghen ra mặt mà không nói |

## Số đo (executed 15/11/2026)

- `ai_tells_check.py --project PPCT`: sạch (exit 0).
- `chapter_gate.py`: luật cứng đạt; 7/10 chỉ tiêu. Lệch: trung vị câu 16 (sàn 17), `！` 4,0/10k (sàn 10), thuật ngữ 1,58/1000 (sàn 1,9). Bản final cũ cùng cổng: 8/10, trung vị câu 12,5, đoạn TB 30,0.
- 2.529 chữ (đơn vị cổng).

## Mở cho Aurel

- Chương ở `status: draft`; chưa duyệt.
