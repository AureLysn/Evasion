---
id: style.PPCT.targets
type: style
scope: project
lane: personal
project: PPCT
canon_layer: project_locked
status: active
strength: target
aliases: ["targets PPCT", "chi tieu van phong PPCT", "muc tieu do luong PPCT", "so can cham PPCT"]
related: ["[[signature]]", "[[hard-rules]]", "[[thoai-la-cau-trong-ngoac-kep]]", "[[q-ngon-ngu-va-xung-ho-ban-viet-tiep]]"]
source:
  type: measured
  ref: "Rut tu signature.md — do 13/09/2026 tren 反派战争 ch1–15, 28.131 chu Han than truyen"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-09-30
---

# Chỉ tiêu — con số cần chạm

> Lệch thì **báo số, không nhét chữ.**
>
> ✅ **Đơn vị là chữ Hán — áp thẳng lên bản nháp tiếng Trung.** Quy trình: nháp tiếng Trung rồi convert — [[viet-tieng-trung-roi-convert]]. Không đo trên bản convert.
>
> ✅ **Chỉ tiêu theo mức tác giả; độ dài là sàn** — [[chi-tieu-van-phong-theo-tac-gia]] (Aurel, 13/09/2026).
>
>
> ✅ **Sửa 25/09/2026 — `style_metrics.py` đo được bảng dưới đây** (L58). Chỉ đo thân truyện (sau `go—>`, trước vạch `—————` cuối); dòng `body_frame` cho biết đã cắt đúng chưa. Đối chiếu ch16–35 với script `han_metrics.py`: 13 chỉ số khớp tuyệt đối. Tên chỉ số: thoại = `cjk_dialogue_ratio` (**không** phải `dialogue_paragraph_ratio`), `？` = `cjk_question_per_1000`, `！` = `cjk_exclaim_per_1000`, `……` = `cjk_ellipsis_per_1000`, `——` = `cjk_dash_pair_per_1000`, câu ≥50 = `cjk_sentence_ge50_ratio`, đoạn ≥100 = `cjk_paragraph_ge100_ratio`, chữ Hán/đoạn = `paragraph_mean`. Motif mắt và các luật trong [[hard-rules]] công cụ **không** đo — vẫn grep.

## Độ dài chương

**Sàn: ≥ 1.500 chữ Hán thân truyện. Không có trần.**

Để so: tác giả thường viết 1.500–2.200 (p25–p75 của 15 chương: 1.640–2.072; TB 1.875); chương cao trào ch9 2.528, ch15 3.092.

style_metrics.py hỗ trợ đo chữ Hán (han chars >= 1500). Giữ nguyên chữ Sàn: ở đầu dòng để công cụ nhận diện.

## Bảng chỉ tiêu

| Chỉ số | Nguyên tác | Chỉ tiêu | Loại |
|---|---|---|---|
| Thoại — chữ trong `“”` | 41,4 % (p25–p75: 35,7–50,6) | **35–55 %** | dải |
| Chương nặng thoại (đời thường) | ch1 64 · ch14 56 · ch4 54 | cho phép tới ~65 % | trần |
| Chương dệt canon | ch5 18 · ch7 21 · ch8 29 | cho phép xuống ~20 % | sàn |
| Chữ Hán / đoạn — trung bình | 43,5 | **35–55** | dải |
| Đoạn ≥100 chữ Hán | 3,7 % | ≤ 8 % | trần |
| Câu ≥50 chữ Hán | 7,2 % | ≤ 12 % | trần |
| **Trung vị chữ Hán / đoạn** *(30/09)* | 37,7 (thô) | **≥ 28** | sàn |
| **Trung vị chữ Hán / câu** *(30/09)* | ~22 | **≥ 17** | sàn |
| **Đoạn ≤ 15 chữ Hán** *(30/09)* | 18,1 % (thô) | **≤ 25 %** | trần |
| `？` / 1000 chữ | 6,97 | ≥ 4 | sàn |
| `！` / 1000 chữ | 2,45 | ≥ 1 | sàn |
| `……` / 1000 chữ | 1,56 | 0,5 – 3,5 | dải |
| `——` / 1000 chữ | 0,67 | ≤ 2,5 | trần |
| Motif mắt (từ chỉ mắt) | 13/15 chương có | ≥ 1 lần / chương | sàn |
| Ghi chú tác giả mô phỏng | 13/15 chương có | có | — |

## Đo lại 30/09/2026 — độ dài đoạn trôi xuống

Aurel chọn **nhắm lại**, không hạ chỉ tiêu (30/09/2026). Ba dòng *(30/09)* trong bảng trên thêm để bắt đúng kiểu lệch này; ch35–42 **không** sửa.

| Nhóm | Chữ/đoạn TB | Trung vị đoạn | Trung vị câu | Thoại | Đoạn ≤15 chữ |
|---|---|---|---|---|---|
| Nguyên tác ch1–15 | 40,2 | 37,7 | ~22 | 41,6 % | 18,1 % |
| Viết tiếp ch16–34 | 37,0 | 29,6 | ~17 | 32,6 % | 26,4 % |
| Viết tiếp ch35–42 | 28,1 | 17,3 | ~13 | 23,9 % | 47,7 % |

Từng chương (TB / trung vị đoạn): 16: 32,3/17,0 · 17: 31,8/22,0 · 18: 26,1/23 · 19: 40,4/33 · 20: 43,8/41,0 · 21: 45,2/39,0 · 22: 46,3/38,5 · 23: 35,0/33 · 24: 37,8/26,0 · 25: 37,2/32 · 26: 37,8/36,0 · 27: 37,4/24,5 · 28: 37,5/33,0 · 29: 39,2/33 · 30: 36,1/24 · 31: 38,8/34,0 · 32: 32,5/21 · 33: 34,2/30 · 34: 33,1/23,0 · 35: 30,7/18 · 36: 34,2/23,0 · 37: 27,1/15,5 · 38: 29,4/22,0 · 39: 28,4/17,0 · 40: 25,6/14 · 41: 27,5/19 · 42: 22,1/10,0.

- Đo bằng `style_metrics.py --json` (`paragraph_mean`, `paragraph_median`, `cjk_sentence_median`, `cjk_dialogue_ratio`). Cột "đoạn ≤15 chữ" là **script riêng của phiên** — công cụ không có chỉ số này; đếm lại bằng script khi kiểm chương.
- ⚠️ Nguyên tác lần này đo trên **cả file `.txt`** trong `反派战争.zip` (công cụ báo `body_frame: ca file` cho ch2–12 — gồm tiêu đề, link, ghi chú tác giả), nên là **số thô**; bảng gốc đo thân truyện cho TB 43,5. Sàn 28 đặt thấp hơn trung vị thô 37,7 để chừa sai số đó.
- **Trung bình che lệch:** trung vị đoạn ch35–42 chưa bằng một nửa nguyên tác; gần nửa số đoạn là đoạn một dòng. Câu cũng ngắn đi (~22 → ~13) — không chỉ do ngắt dòng.
- **Không do loại chương:** ch42 (đời thường) thấp nhất (22,1 / 10); đời thường của tác giả lại có đoạn dài nhất (ch1 49,4 · ch14 51,6) — [[signature]].
- **Công cụ không báo:** `style_metrics.py` không đưa dải chữ/đoạn 35–55 vào `verdict`, nên 8 chương chốt mà không có cảnh báo. Dạy công cụ phán quyết dải + trung vị là việc hệ thống, nhánh riêng — chưa làm.
- Plan arc 7: đặt ba dòng *(30/09)* làm ngân sách cảnh — "câu nhịp lặng một dòng" ([[signature]]) dùng **thưa** như tác giả, không làm nhịp mặc định.

## Mật độ thuật ngữ

Từ khóa `圣杯, 英灵, 宝具, 御主, 魔力, 令咒, 职阶, 从者, 从灵, 彭格列, 黑手党, 火焰, 直觉, 平行世界` chia cho số chữ Hán × 1000.

- Chương dệt canon / chiến trận: ≥ 9/1000 (nguyên tác 9,2–16,2)
- Chương đời thường / giấc mơ: **không đặt sàn** (nguyên tác 1,9–7,8)

⚠️ `style_metrics.py` **không phân biệt loại chương** — nó áp sàn 9/1000 cho mọi chương. Với chương đời thường, dòng `term density … LECH` và exit 1 là báo động giả, **không** phải lệch (đo 25/09/2026: 13/20 chương ch16–35 exit 1, cả 13 chỉ vì dòng này). Chương ghép hai chế độ có tính sàn hay không: chưa chốt.

⚠️ Danh sách này là **chữ Hán**. Nếu viết bằng tiếng Việt, cần danh sách tiếng Việt tương ứng — chưa lập.

## Đọc bảng này thế nào

- **Thoại ở nguyên tác dao động mạnh theo chế độ** (18–64 %). Một chỉ tiêu chung cho mọi chương là sai; bảng tách sàn/trần theo loại chương.
- Chỉ tiêu cũ '45-60 %' của briefing đã bỏ ngày 13/09/2026 — thoại theo mức tác giả, [[chi-tieu-van-phong-theo-tac-gia]].
