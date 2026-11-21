---
id: project.btwid
type: project
scope: project
project: BTWID
universes: ["KHR"]
lane: personal
canon_layer: project_locked
status: draft
title: "Baby that's what I do"
aliases: ["BTWID", "Baby that's what i do", "baby thats what i do"]
related: ["[[_OEUVRE-MOC]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/BTWID_baby-thats-what-i-do/00_Overview/drop-point|drop-point]]"]
source:
  type: user_input
  ref: "old-vault:00_Inbox/Fandom/Viết tiếp fanfic/Baby that_s what i do/ — 47 file, 1.129,1 KB, do 23/08/2026. Duong dan that: stores.md dong old-vault. Kiem ke: 90_Meta/kiem-ke-vault-cu.md"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/deliverable, p/personal]
last_updated: 2026-08-19
---

# Baby that's what I do

**Mã:** `BTWID` · **Ngôn ngữ:** Tiếng Việt

Bộ phương pháp đã có: `01_HoSo` · `02_DoiChieu` · `03_VanPhong` · `04_DanY` · `05_RaSoatVaKeHoach`.

## Quy mô đã có

41 chương (`BTWID_Ch4` … `BTWID_Ch45`) + 5 file phương pháp

**Nguồn:** `00_Inbox/Fandom/Viết tiếp fanfic/Baby that's what i do/`

## Trạng thái nhập vault

- [ ] `sources/` — bản gốc của tác giả, **bất biến**
- [ ] `style/` — `signature` (đo từ nguyên tác) · `targets` · `hard-rules`
- [ ] `canon/` — thiết lập thế giới, mỗi note có `source.ref`
- [ ] `Characters/` — hồ sơ nhân vật, **không** chứa bí mật nhân vật khác chưa biết
- [ ] `decisions/` — lựa chọn đã khoá
- [ ] `questions/` — vấn đề chưa quyết, mỗi cái có `needed_before`
- [ ] `chapters/` — chương đã viết
- [ ] Chạy `vault_doctor.py --include-fiction --zone 05_Evasion/01_Oeuvre/Studio/Continue/BTWID_baby-thats-what-i-do` → `Errors: 0`

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
