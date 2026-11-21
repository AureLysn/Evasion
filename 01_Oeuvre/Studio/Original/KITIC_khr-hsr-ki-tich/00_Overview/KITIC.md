---
id: project.kitic
type: project
scope: project
project: KITIC
universes: ["KHR", "HSR"]
lane: personal
canon_layer: project_locked
status: idea
title: "(KHRxHSR) Kì tích"
aliases: ["Kì tích", "KHR x HSR", "Tsuna x Phainon", "Miracle"]
related: ["[[_OEUVRE-MOC]]", "[[drop-point]]", "[[KITIC-MOC]]"]
source:
  type: user_input
  ref: "Ba vignette do chinh Aurel viet, chua nhap vault: 'Lac', 'Lua va Tro tan', 'Anh nhin'. Dang cho ingest-sources."
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/deliverable, p/personal]
last_updated: 2026-09-06
---

# (KHRxHSR) Kì tích

**Mã:** `KITIC` · **Ngôn ngữ:** Tiếng Việt · **Crossover:** Katekyo Hitman Reborn! × Honkai: Star Rail

Cặp đôi chính: Sawada Tsunayoshi (KHR) × Phainon (HSR).

## Quy mô đã có

3 vignette gốc do Aurel tự viết, chưa hoàn thành, **chưa nhập vault**:

- **"Ánh nhìn"** — **bản chính**, sẽ phát triển thành truyện nhiều chương đầy đủ. Tsuna là chứng nhân vô hình trong vòng lặp thời gian của Phainon — kỹ thuật kể chuyện độc đáo nhất trong ba bản, khớp gu "chạm mà không cần chạm" của Aurel.
- **"Lạc"** — giữ làm ngoại truyện/dị bản góc nhìn khác. **Không** cùng dòng thời gian với bản chính.
- **"Lửa và Tro tàn"** — giữ làm ngoại truyện/dị bản góc nhìn khác. **Không** cùng dòng thời gian với bản chính.

**Nguồn:** chưa nhập — `ingest-sources` cần đưa cả 3 file trên vào `sources/`.

## Trạng thái nhập vault

- [ ] `sources/` — 3 vignette gốc, **bất biến**
- [ ] `style/` — `signature` (đo trên "Ánh nhìn") · `targets` · `hard-rules`
- [ ] `canon/` — thiết lập thế giới KHR + HSR, mỗi note có `source.ref`
- [ ] `Characters/` — hồ sơ Tsuna, Phainon và nhân vật phụ liên quan
- [ ] `decisions/` — lựa chọn đã khoá (vd: "Lạc"/"Lửa và Tro tàn" là ngoại truyện, không sáp nhập dòng chính)
- [ ] `questions/` — vấn đề chưa quyết, mỗi cái có `needed_before`
- [ ] `chapters/` — chương đã viết
- [ ] Chạy `vault_doctor.py --include-fiction --zone 05_Evasion/01_Oeuvre/Studio/Original/KITIC_khr-hsr-ki-tich` → `Errors: 0`

## Trước khi viết chương tiếp theo

1. **Đo văn phong nguyên tác trước.** Không có `02_Story_Bible/style/signature.md` thì đang bịa giọng, không phải mimic. Tối thiểu ~5.000 từ nguyên tác để đo đáng tin — đo trên "Ánh nhìn" vì đó là bản chính.
2. **Viết tự do → chạy gate → sửa theo số.** Không giữ luật trong đầu. Xem [[principles]] nguyên lý 2.
3. **Outline trước, văn sau.** Đề xuất 3–5 chương, chờ duyệt. Hướng sai thì cả 5 chương là rác.
4. **Crossover cần contract trước khi viết văn.** KHR × HSR là hai fandom khác nhau — chạy `crossover-contract` trước `plan-continuation`.
5. **HSR chưa có canon trong vault.** `Database/Fandom/` hiện chỉ có BNHA, BSD, JJK, KHR. Cần tạo `Database/Fandom/HSR/` (Mode 2, `universe.md` + 6 thư mục thực thể) trước khi trích canon Phainon/Amphoreus.

## Ranh giới với tác giả gốc

Trường hợp đặc biệt: **Aurel vừa là tác giả gốc của 3 vignette, vừa là người đại tu chúng.** Không cần credit tác giả khác cho phần cốt truyện gốc — nhưng Tsuna (KHR, Akira Amano) và Phainon (HSR, HoYoverse) vẫn là nhân vật thuộc franchise của người khác.

- `sources/` (3 vignette gốc của Aurel) vẫn **bất biến** — không sửa trực tiếp, mọi bản đại tu viết mới vào `chapters/`.
- Không trình bày bản đại tu như phát hành chính thức của KHR hay HSR.
- `lane: personal` — không vào portfolio trừ khi khai `promoted_from`.
