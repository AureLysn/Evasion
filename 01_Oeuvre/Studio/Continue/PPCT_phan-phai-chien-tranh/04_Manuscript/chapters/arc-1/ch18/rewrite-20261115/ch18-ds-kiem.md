---
id: note.PPCT.ch18-ds-kiem
type: note
scope: branch
lane: personal
project: PPCT
branch: deepseek-20261115
arc: arc-1-vuong-yen-ha-man
chapter: 18
canon_layer: planned
status: active
aliases: ["kiem ch18 ban DeepSeek", "kiểm ch18 bản song song", "ch18 ds kiem PPCT"]
related: ["[[ch18-ds-nhap]]", "[[ch18-ds-the-canh]]", "[[deepseek-20261115]]", "[[Hayato-Gokudera]]"]
source:
  type: inference
  ref: "Claude 15/11/2026. DeepSeek chat https://chat.deepseek.com/a/chat/s/5c4623dd-29fb-48ef-98d7-52941e735d72 · GPT https://chatgpt.com/g/g-p-6af97531ef0c8191a708021329791a4c-ppct/c/6af976dd-1bb4-83ec-934c-378b3ddc3623"
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-15
---

# Kiểm ch18 bản DeepSeek

## Ai viết khối nào

| Khối | Người viết |
|---|---|
| A–B | [DS] lượt 1 |
| C–F | [DS] lượt 2 |
| sửa | Claude — bảng dưới |

## Claude kiểm lượt 1 — lỗi DS → sửa

| # | DS viết | Lỗi | Sửa |
|---|---|---|---|
| 1 | 「上次那个梦里，那里有个指环」 | Dazai chỉ thấy nhẫn **lúc thức** (ch15) — sai nguồn biết | bỏ |
| 2 | Tsuna gọi 「Reborn先生」 | cách gọi chỉ trích cho Gokudera → Reborn | 「Reborn。」 |
| 3 | Gokudera 「银发」 | Claude tưởng chưa có note → gỡ, thay bằng thuốc lá + đồ bạc. **Claude sai**: [[Hayato-Gokudera]] dòng 32 có tóc bạc xám. Bản nháp hiện không tả tóc — không lỗi, chỉ ghi lại | — |
| 4 | 「狗的主人就在我床边坐着」 | lúc viết nhật ký Tsuna chưa hiện hình | 「就在我身边」 |
| 5 | 「这句话我很久以前听过，说这话的是另一个人」 | sai người nói: chính Tsuna nói với Dazai kiếp trước | sửa người nói |
| 6 | tag sau ngoặc 「”纲吉问。」 | `project_3` | chuyển trước ngoặc |

## GPT — 8,3/10, 6 điểm

| # | Điểm GPT | Claude | Lý do |
|---|---|---|---|
| 1 | Trong mơ không ai gọi tên, sao Dazai "biết tên" Gokudera | **theo** | 「我认出来了。八成就是狱寺隼人。」 + mô tả Dazai từng giao người tìm: thuốc lá, đồ bạc, thuốc nổ, nóng tính trừ với một người — mọi nét đều có trong [[Hayato-Gokudera]] (dòng 33, 34, 38, 44). Không nói tới Sách |
| 2 | 「连一张照片都没有」 làm việc nhận diện yếu | **theo** | bỏ, thay bằng danh sách đặc điểm |
| 3 | 「嫉妒」 gọi tên cảm xúc | **theo** | 「心眼小起来也小得有限」 |
| 4 | Diễn giải động cơ Reborn quá chắc | **theo** | 「我总觉得那一枪也算是在催他吃早饭，只是催得古怪了点」 |
| 5 | 「那碗东西被人反复地催」 sai quan hệ | **theo** | 「我看着他被人催了一遍又一遍，最后还是拿起了勺子」 |
| 6 | Câu nhắc tiền truyện giải thích | **theo** | 「以前听他说这句话，我只觉得烦，简直像在威胁我。现在轮到我说了」 |

## Số đo (executed 15/11/2026)

- `ai_tells_check.py --project PPCT`: sạch.
- `chapter_gate.py`: luật cứng đạt; 7/10. Lệch: trung vị câu 13 (sàn 17; plan ch18 lấy tiền truyện hạ làm mốc, trung vị 17), `？` 37/10k, `……` 0. **1.621 chữ** — qua sàn 1.500 nhưng thấp hơn plan (~2.400): DeepSeek viết ngắn mọi khối.

## Mở cho Aurel

- Chương ngắn hơn plan ~800 chữ. Có thể xin DeepSeek viết dài thêm khối 【B】 (buổi sáng ở Vongola) nếu Aurel muốn.
