---
id: project.sora
type: project
scope: project
project: SORA
universes: ["KHR"]
lane: personal
canon_layer: project_locked
status: idea
title: "<chưa đặt tên>"
aliases: ["SORA", "viet tiep sora"]
related: ["[[_OEUVRE-MOC]]", "[[drop-point]]"]
source:
  type: user_input
  ref: "Data-export/projects/ (Claude Project export)"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/deliverable, p/personal]
last_updated: 2026-08-19
---

# <chưa đặt tên>

**Mã:** `SORA` · **Ngôn ngữ:** Tiếng Việt

Bộ phương pháp đầy đủ nhất trong nhóm chưa viết — có cả dàn ý chi tiết.

## Quy mô đã có

5 file phương pháp (`Ho_so_truyen` · `Doi_chieu_canon` · `Phan_tich_van_phong` · `Dan_y_phuong_an` · `Dan_y_chi_tiet`), **chưa có chương**

**Nguồn:** `Data-export/projects/ (Claude Project export)`

## Trạng thái nhập vault

- [ ] `sources/` — bản gốc của tác giả, **bất biến**
- [ ] `style/` — `signature` (đo từ nguyên tác) · `targets` · `hard-rules`
- [ ] `canon/` — thiết lập thế giới, mỗi note có `source.ref`
- [ ] `Characters/` — hồ sơ nhân vật, **không** chứa bí mật nhân vật khác chưa biết
- [ ] `decisions/` — lựa chọn đã khoá
- [ ] `questions/` — vấn đề chưa quyết, mỗi cái có `needed_before`
- [ ] `chapters/` — chương đã viết
- [ ] Chạy `vault_doctor.py --include-fiction --zone 05_Evasion/01_Oeuvre/Studio/Continue/SORA_chua-dat-ten` → `Errors: 0`

## Trước khi viết chương tiếp theo

1. **Đo văn phong nguyên tác trước.** Không có [[signature]] thì đang bịa giọng,
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
