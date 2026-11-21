---
id: review.PPCT.ch42-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-6-co-xe-gia
chapter: 42
canon_layer: user_canon
status: active
aliases: ["review ch42 PPCT", "soat ch42", "check-continuity ch42", "check-style ch42", "soat khep arc 6"]
related: ["[[04_Manuscript/chapters/arc-6/ch42/ch42-chapter]]", "[[04_Manuscript/chapters/arc-6/ch42/ch42-plan]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/06_Alternate_Versions/branches/aurel-main|aurel-main]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 30/09/2026, tren ban nhap ch42. Nguoi soat cung la nguoi viet ban nhap va planner trong cung phien. The canh chua qua plan-reviewer. Doi lai nguyen van ch4 trong store personal-bulk (反派战争.zip, file 004)."
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-30
---

# Soát chương 42 — Không phải việc của mình

> Chỉ đọc, không sửa — **trừ #1**: đó là lỗi `high` (trái nguyên văn, phạm `forbid` của hợp đồng nhánh). Aurel yêu cầu soát rồi chốt chương, mà chương không được chốt khi còn lỗi `high` mở, nên đã sửa ngay theo nguyên văn. Aurel có thể xem lại chỗ sửa.
> ⚠️ **Người soát, người viết và planner là một, trong cùng một phiên.** Thẻ cảnh **chưa** qua plan-reviewer.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×4 cảnh | Đã đối chiếu 6 bí mật, **0** rò rỉ |
| Grep tay | 言峰 · 绮礼 · 神父 · 容器 · Berserker · 间桐 · 雁夜 · 时臣 · 圣杯 · 令咒 · 很久 = **0**. 被消耗 ×1 = câu ch4 (plan C7). 「我」 ngoài ngoặc kép = 0 |
| `ai_tells_check --project PPCT` | exit **0** |
| `style_metrics --write --json` | exit 0. **1.678** chữ. Bản đầu 1.481, **dưới sàn**; đã viết bù đúng những chỗ thẻ cảnh yêu cầu mà bản đầu bỏ sót |
| `chapter_gate` | không chạy được: không có khối `gate:` |

## Tám nhóm — check-continuity

| # | Nhóm | Kết quả |
|---|---|---|
| 1 | Timeline | ✅ 「第十五天夜里」 → 「第十六天早上」. 「第六天早上…拿起了车钥匙」 khớp ch22 ([[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]]). 「第一天晚上…光着脚」 khớp ch4 ([[irisviel]]: đi chân trần trên bãi biển) |
| 2 | Ranh giới hiểu biết | ✅ L3 không tên (「那个人……」 · 「只能叫猜」). Không biết Maiya sống, cũng không biết Kiritsugu đã có tên (ch41) |
| 3 | Trạng thái nhân vật | ✅ Ma lực của Tsuna: 「大半来自…地脉，一点点来自身边这个人」, khớp ch37. Tắt bọ cần cẩu cảng (ch37: màn hình cần cẩu) |
| 4 | Luật thế giới | ✅ Chuồn chuồn có hồng ngoại (「热影」). Đặt ngoài tầm camera cột điện (ch38) |
| 5 | Quan hệ, xưng hô | ✅ [[dazai--tsuna]] |
| 6 | Canon / nguồn | ❌ **#1** — đã sửa. Câu ch4 **nguyên văn** (đối lại store) |
| 7 | Hợp đồng nhánh | ✅ sau khi sửa #1 |
| 8 | Rò kế hoạch | ✅ 「剩下的御主和从者，都会往一个地方去的」 · 「不会太久」 — đúng mức `foreshadow: hint` của thẻ 04; **không** 「最后」/「决战」/圣杯 |

## Vấn đề

| # | Loại | Mức | Chỗ | Chi tiết | Đối chiếu |
|---|---|---|---|---|---|
| 1 | trái nguyên văn | **high** · ✅ **đã sửa** | cảnh 01: 「太宰那时候问他，是不是可怜她了。他没有回答。」 | Nguyên văn ch4: Tsuna **có** trả lời — 「“太宰又想听什么呢？”…“世间所有人都是一样的，因为世界所有死亡都是一样的。…”」. Phạm `forbid: contradict_fic_explicit`. **Sửa thành:** 「他答得很快，说世上所有的死都是一样的。那时候答得那么快。现在，他答不上来了。」 — khớp nguồn, và giữ ý chương | 反派战争.zip, file `004` · [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/06_Alternate_Versions/branches/aurel-main\|aurel-main]] |
| 2 | chi tiết thêm | low | cảnh 04: con mèo lúc hơn 3 giờ sáng | Chi tiết của fic, chứng minh hồng ngoại hoạt động. Không mâu thuẫn | — |
| 3 | chi tiết thêm | low | cảnh 02: chuồn chuồn đậu 「马路对面，一户人家院墙边的树枝上」 | Vị trí mới cho con mắt canh; ghi vào [[nha-tho-fuyuki]] khi chốt | canh-chan-doc-nha-tho-qua-dem |

## Bảng văn phong — check-style

Loại chương: **đời thường, POV Tsuna, khép arc**.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán | sàn 1.500 · plan ~2.200 | **1.678** | ✅ trên sàn; dưới dự kiến ~24 % (cảnh: 473 · 419 · 354 · 432 / 650 · 500 · 500 · 550) |
| Thoại | 30–40 % | **21,7 %** | ❌ dưới — nhiều lượt (51) nhưng cực ngắn |
| `？` · `！` · `……` · `——` | ≥ 4 · ≥ 1 · 0,5–3,5 · ≤ 2,5 | 7,75 · 1,19 · 2,38 · 0 | ✅ |
| Thuật ngữ | đời thường: không sàn | 2,38 | — |
| Câu ≥50 chữ | ≤ 12 % | 0,9 % | ✅ |
| Đoạn TB · câu trung vị | 35–55 · tendency | **22,1** · 12 | ❌ — **chương thứ tám liền**, và thấp nhất |
| Motif mắt | ≥ 1 | có (「眼睛都会先闭一下」 · ống kính) | ✅ |

### Đọc tay — tật AI

- Câu tổng kết: không. 「这一次，谁也没有去拿车钥匙。」 là hành động.
- 「不是…而是」: 0 (「没有让…而是」 ×1 — không phải cấu trúc đối lập tu từ).

## Đề xuất cho Aurel

| # | Việc | Đề xuất |
|---|---|---|
| S1 | #1 | ✅ Đã sửa — Aurel xem lại câu mới |
| S2 | Thoại 21,7 % | **Giữ** — chương nhà nhiều lượt ngắn; kéo lên phải kéo dài lời thoại |
| S3 | Đoạn TB 22,1 | **Giữ ở chương này**. Tám chương liền dưới dải → `analyze-style` nên chạy **trước arc 7** |
| S4 | #2, #3 | Không sửa; #3 ghi khi chốt |
