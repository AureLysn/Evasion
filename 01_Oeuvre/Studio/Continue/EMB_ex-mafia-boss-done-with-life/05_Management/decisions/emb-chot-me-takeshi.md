---
id: decision.EMB.emb-chot-me-takeshi
type: decision
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: branch_locked
status: locked
resolves: []
decided: 2026-09-17
decided_by: user
decided_at: 2026-09-17
aliases: ["chot me Takeshi", "ai quyet vu Yamamoto", "Yamamoto Sachiko", "ten me Takeshi", "khong dung Tsuyoshi", "canh 2.2 Brat chot"]
related: [ "[[sachiko]]", "[[tsuyoshi]]", "[[hook-me-takeshi-va-sat-thu]]", "[[emb-chot-thay-thuoc]]"]
source:
  type: user_input
  ref: "Aurel, 17/09/2026: 'me Takeshi, dung ten hay xuat hien trong fandom' — roi 'dong y voi cac de xuat cua ban ve nhan vat' sau khi phien nay bao cao rang fandom KHONG co ten chung cho ba."
authority: user
confidence: 1.0
always_load: false
load_for: [planner, writer]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-21
---

# Chốt — ai quyết ở vụ Yamamoto, và bà tên gì

> 🔁 **01/10/2026 — mở lại một phần**. **Giữ:** mục 2, tên **Yamamoto Sachiko** và hồ sơ [[sachiko]]. **Mở lại:** mục 1 *(ai quyết trên trang)* — nó gắn với dàn ý đã xóa khi reset; nay là câu hỏi [[q-me-takeshi-ai-quyet]].

## Quyết định

| # | Câu | Chốt |
|---|---|---|
| 1 | Ai quyết trên trang | **mẹ Takeshi** — không phải [[tsuyoshi]] |
| 2 | Tên bà | **Yamamoto Sachiko (山本 幸子)** — hồ sơ ở [[sachiko]] |

## Lý do chọn

**Vì sao mẹ Takeshi.** [[hook-me-takeshi-va-sat-thu]] ghi rõ: nguyên tác chỉ nói nhà Sawada từng gửi lời triệu tới *"Yamamoto-san tiệm Takesushi"*, và **không nói người ấy có phải cha Takeshi hay không**. Cho [[tsuyoshi]] làm người quyết là **khẳng định một quan hệ nguyên tác chưa cho** — phải khai `high_confidence_inference`, không phải `fic_explicit`. Cho mẹ Takeshi thì **không phải khẳng định gì**.

Và beat mạnh hơn: **người chết ở kiếp trước, kiếp này tự chọn, trên trang** — đúng thứ lối B cần, và nó đặt thẳng câu hỏi đạo đức mà hook nêu: Tsuna **canh** mà **không báo trước**.

## 🔴 Vì sao cái tên không phải "tên hay xuất hiện trong fandom"

Aurel yêu cầu **một tên phổ biến trong fandom**. Tra ngày 17/09/2026: **không tồn tại cái đó.**

| Đo được | |
|---|---|
| Canon KHR | mẹ Takeshi **chưa bao giờ được đặt tên**, không xuất hiện, không được nhắc |
| Headcanon phổ biến | chỉ dừng ở *"bà đã mất"* — **không kèm tên** |
| Tên duy nhất tìm thấy | **Tsubame Kirisame** — nhưng đó là **OC của một người dùng** trên Reborn Wiki, và là **bạn gái Takeshi**, không phải mẹ |

Dùng *Tsubame Kirisame* là đâm thẳng vào một liên tưởng fandom sẵn có và **sai vai**. Nên chỉ thị không chạy được như phát biểu, và phiên báo lại trước khi đặt — Aurel đồng ý thay bằng một tên thường, đúng thế hệ.

Nguồn tra: [Fanon:Tsubame Kirisame](https://reborn.fandom.com/wiki/Fanon:Tsubame_Kirisame) · [Fanon:Takashi Yamamoto](https://reborn.fandom.com/wiki/Fanon:Takashi_Yamamoto) · [Tsuyoshi Yamamoto](https://reborn.fandom.com/wiki/Tsuyoshi_Yamamoto) · [Takeshi Yamamoto — Fanlore](https://fanlore.org/wiki/Takeshi_Yamamoto).

## Phương án đã loại và vì sao

| Loại | Vì sao |
|---|---|
| **[[tsuyoshi]]** quyết | mượn một khẳng định nguyên tác chưa cho; beat yếu hơn |
| Tên **Tsubame Kirisame** | OC của người khác, và là bạn gái Takeshi — sai vai |
| Tên **Yuriko** | phương án dự phòng còn để ngỏ, không bị loại — chỉ không được chọn |

## Ràng buộc kéo theo

- 🔴 **[[tsuyoshi]] vẫn là `canon_layer: planned`.** Quyết định này **không** khẳng định "Yamamoto-san tiệm Takesushi" là cha Takeshi. Ai viết cảnh nào cần quan hệ ấy thì phải mở một câu hỏi mới.
- Chữ **幸** trong tên bà có hợp nghĩa *(người kiếp trước chết, kiếp này tự chọn)*. Nếu lúc viết thấy khéo quá thì đổi sang **Yuriko** — nhưng phải sửa ở note quyết định này, không đổi lặng.
- Mốc `needed_before` của việc đặt tên: **arc Brat**.
