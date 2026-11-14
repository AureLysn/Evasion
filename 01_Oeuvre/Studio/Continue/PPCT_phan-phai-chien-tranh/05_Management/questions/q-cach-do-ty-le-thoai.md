---
id: question.PPCT.q-cach-do-ty-le-thoai
type: question
scope: project
lane: personal
project: PPCT
canon_layer: planned
status: resolved
resolved_by: thoai-la-cau-trong-ngoac-kep
needed_before:
  arc: "style"
  chapter: "truoc khi viet targets.md cho PPCT"
decision_owner: user
aliases: ["cach do ty le thoai", "thoai bao nhieu phan tram", "do thoai ban convert", "45-60% thoai", "dialogue ratio PPCT"]
related: ["[[lam-lai-tu-nguon]]", "[[PPCT]]"]
source:
  type: measured
  ref: "Do 13/09/2026 bang script tam trong phien Claude Code: ky tu khong khoang trang nam trong 「」 / ky tu than truyen, tren cac chuong ban thu nghiem cu trong kho personal-archive"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-13
---

# Tỷ lệ thoại đo bằng gì, và chỉ tiêu là bao nhiêu?

> ✅ **ĐÃ CHỐT 13/09/2026** — [[thoai-la-cau-trong-ngoac-kep]]: thoại = câu trong ngoặc kép. Đo trên nguyên tác: **41,4 %** (15 chương). Chỉ tiêu theo loại chương ở [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]].
>
> *Bản ghi trước khi chốt, giữ để truy vết:*

## Vì sao cần quyết

Briefing cũ đặt chỉ tiêu "thoại 45–60%" và ghi chú kỹ thuật các chương cũ tự báo ~45–58%. Đo thật thì các chương đó thấp hơn nhiều. Một chỉ tiêu không có cách đo thì không kiểm được — nguyên lý 1: thuộc tính phải phát biểu được bằng con số.

## Cần chốt trước

Bước đo văn phong · trước khi viết `style/targets.md`

## Ai quyết

🟡 AI đề xuất cách đo, người viết duyệt chỉ tiêu

## Số đo 13/09/2026 (bản thử nghiệm cũ)

| Chương cũ | Ghi chú cũ tự báo | Đo được (ký tự trong 「」) |
|---|---|---|
| ch25 | ~55% | 38,9% |
| ch37 | — | 29,4% |
| I.1 | ~58% | 29,7% |
| II.4 | ~48% | 25,5% |
| II.5 | ~52% | 28,5% |
| II.6 | ~45% | 21,7% |

## Các phương án

### Phương án A — đo theo ký tự trong 「」

- Ưu: gần cách đo "38% thoại" của hồ sơ văn phong cũ trên văn bản chữ Hán.
- Nhược: tiếng Việt convert dài hơn chữ Hán, và tag thoại tiếng Việt thường dài → tỷ lệ bị kéo xuống.

### Phương án B — đo theo lượt: tỷ lệ đoạn có thoại

- Ưu: phản ánh cảm giác "chương nặng thoại" khi đọc.
- Nhược: không so được với số đo trên nguyên tác chữ Hán.

## Ghi chú

Baseline của nguyên tác (~38%) cũng là số của bản cũ, **chưa kiểm lại**. Nguyên tác chưa có trong vault. Đo lại ở bước `analyze-style` sau khi nạp nguồn, rồi mới đặt chỉ tiêu.
