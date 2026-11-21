---
id: project.dua
type: project
scope: project
project: DUA
universes: ["BNHA", "KHR"]
lane: personal
canon_layer: project_locked
status: idea
title: "<chưa đặt tên — crossover BNHA>"
aliases: ["DUA", "BNHA crossover"]
related: ["[[_OEUVRE-MOC]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/DUA_crossover-bnha/00_Overview/drop-point|drop-point]]"]
source:
  type: user_input
  ref: "Data-export/projects/ (Claude Project export)"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/deliverable, p/personal]
last_updated: 2026-08-19
---

# <chưa đặt tên — crossover BNHA>

**Mã:** `DUA` · **Ngôn ngữ:** Tiếng Việt

⚠️ Từ `memories.json`: kiến thức BNHA **đóng băng ở mốc 2018** — không đưa vào diễn biến sau Overhaul. Ghi thành `decisions/` ngay khi nhập.

Mâu thuẫn trung tâm: nhân viên UA đọc nhầm sẹo chiến đấu của Tsuna thành dấu hiệu bị bạo hành.

## Quy mô đã có

4 file phương pháp (`ho-so` · `canon-fanon` · `van-phong` · `dan-y`), **chưa có chương**

**Nguồn:** `Data-export/projects/ (Claude Project export)`

## Trạng thái nhập vault

- [ ] `sources/` — bản gốc của tác giả, **bất biến**
- [ ] `style/` — `signature` (đo từ nguyên tác) · `targets` · `hard-rules`
- [ ] `canon/` — thiết lập thế giới, mỗi note có `source.ref`
- [ ] `Characters/` — hồ sơ nhân vật, **không** chứa bí mật nhân vật khác chưa biết
- [ ] `decisions/` — lựa chọn đã khoá
- [ ] `questions/` — vấn đề chưa quyết, mỗi cái có `needed_before`
- [ ] `chapters/` — chương đã viết
- [ ] Chạy `vault_doctor.py --include-fiction --zone 05_Evasion/01_Oeuvre/Studio/Continue/DUA_crossover-bnha` → `Errors: 0`

## Trước khi viết chương tiếp theo

1. **Đo văn phong nguyên tác trước.** Không có `02_Story_Bible/style/signature.md` thì đang bịa giọng,
   không phải mimic. Tối thiểu ~5.000 từ nguyên tác để đo đáng tin.
2. **Viết tự do → chạy gate → sửa theo số.** Không giữ luật trong đầu.
   Xem [[principles]] nguyên lý 2.
3. **Outline trước, văn sau.** Đề xuất 3–5 chương, chờ duyệt. Hướng sai thì cả 5 chương là rác.

## Ranh giới với tác giả gốc

Đây là **sáng tác cá nhân dựa trên tác phẩm của người khác**.

- Mọi file phải ghi `source:` trỏ về tác phẩm gốc + tên tác giả.
- Không bao giờ trình bày bản viết tiếp như tác phẩm chính thức của tác giả gốc.
- Muốn public: ghi rõ "fan continuation", ghi công tác giả gốc, kiểm tác giả/nền tảng
  có cấm không. `lane: personal` — **không** vào portfolio trừ khi khai `promoted_from`.
