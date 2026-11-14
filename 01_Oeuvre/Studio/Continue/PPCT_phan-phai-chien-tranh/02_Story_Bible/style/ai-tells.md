---
id: style.PPCT.ai-tells
type: style
scope: project
lane: personal
project: PPCT
canon_layer: project_locked
status: active
strength: hard
aliases: ["ai tells PPCT", "tat AI PPCT", "giong AI PPCT", "cum cam PPCT", "profile ai_tells_check PPCT", "extra_constructs PPCT"]
related: ["[[hard-rules]]", "[[targets]]", "[[signature]]", "[[forbidden-patterns]]"]
source:
  type: measured
  ref: "Gom tu review PPCT ch16–ch36 (cac ho cau AI da bat that tren trang); Aurel dong y 25/09/2026. Profile cho ai_tells_check.py ban doc chu Han (PR #65)."
authority: user
confidence: 0.8
always_load: true
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
# Doc boi ai_tells_check.py --project PPCT (extra_constructs, targets) va chapter_gate.py (khoi `gate:`).
# Truoc 14/11/2026 file nay khong co `gate:` vi chapter_gate.py chi doc chu Latin; cong nay da co nhanh chu Han.
# Ten construct theo THU TU trong list: project_1, project_2, ... — chen them thi chen o CUOI, dung doi thu tu.
extra_constructs:
  - '挑不出'
  - '像是?在念一[张份]'
  - '”[^“\n]{0,4}说(?!话)'
  - '[说道问答喊]：「'
  - '意识到|这才发现|终于明白|才明白过来'
  - '不是[^。！？“”]{1,20}而是'
targets:
  project_1_per_10k_max: 0
  project_2_per_10k_max: 0
  project_3_per_10k_max: 0
  project_4_per_10k_max: 0
  project_6_per_10k_max: 10
gate:
  # Moc do 14/11/2026 tu 反派战争.zip (kho library, sha 02F2B7BA115ECF17): 15 chuong, 28.131 chu Han than truyen,
  # bang ham measure() cua chapter_gate.py (nhanh chu Han). Don vi cua cong: long_pct = cau >= 35 chu;
  # ell10k dem moi "……" la 3 luot. Nguong doi don vi tu style/targets.md; khong dat so moi. Aurel duyet 14/11/2026 (TR-006).
  # words_max 99999 = khong co tran (targets.md); cong bat buoc co khoa nay.
  author:
    words: 1875
    sent_median: 21
    long_pct: 20.8
    para_mean: 42.9
    q10k: 69.7
    excl10k: 24.5
    ital10k: 0.0
    ell10k: 50.5
    term1k: 9.49
    had10k: 0.0
  targets:
    words_min: 1500
    words_max: 99999
    sent_median_min: 17
    sent_median_max: 27
    long_pct_max: 30
    para_mean_min: 35
    para_mean_max: 55
    q10k_min: 40
    excl10k_min: 10
    ital10k_min: 0
    ell10k_min: 15
    term1k_min: 1.9
    had10k_max: 0
  terms: ["圣杯", "英灵", "宝具", "御主", "魔力", "令咒", "职阶", "从者", "从灵", "彭格列", "黑手党", "火焰", "直觉", "平行世界"]
last_updated: 2026-11-14
---

# Tật AI — PPCT

> Profile cho `ai_tells_check.py --project PPCT`. Chỉ gồm những họ câu **review PPCT đã bắt được trên trang**, không đoán thêm.
> Chỉ tiêu `？` / `！` / câu dài / thoại **không** chép vào đây — chúng ở [[targets]], `style_metrics.py` đo. Hai bản của một luật là hai luật.

## Khối `gate:` — có từ 14/11/2026

Mốc tác giả cho `chapter_gate.py` đo trên 15 chương nguyên tác (28.131 chữ Hán thân truyện) và ghi ở frontmatter; Aurel duyệt số 14/11/2026 (`TR-006`). Cổng đếm khác [[targets]] ở hai chỗ: câu dài là câu **≥ 35** chữ Hán, và mỗi 「……」 tính 3 lượt. Chạy cổng trên ch16–ch42 ngày 14/11 *(không kèm `--corpus`)*: 2 chương exit 0 *(ch19, ch21)*, 25 chương exit 1, không chương nào exit 2; lệch nhiều nhất là trung vị câu *(23 chương dưới sàn 17; mốc tác giả 21)* và chữ/đoạn *(21 chương)*, rồi `！` 6, chấm lửng 2, `？` 1, thuật ngữ 1. Chương đã `final` không sửa theo cổng này.

## Bảng — mỗi dòng một `extra_constructs`

| # | Mẫu | Nguồn | Mức |
|---|---|---|---|
| project_1 | 「挑不出」 | ch28 dòng 59 · ch30 dòng 121 · ch31 dòng 109 — ba chương liền (review ch31 #6) | **cứng**, trần 0 |
| project_2 | 「像(是)在念一张 / 一份」 | ch28 dòng 59 · ch31 dòng 57 (review ch31 #6) · bản đầu ch36 (bắt ở pre-flight) | **cứng**, trần 0 |
| project_3 | tag thoại **sau** ngoặc 「”…说」 (gồm 说完 · 说得…) | review ch27 S1 → bước bắt buộc của writer từ ch28 (grep 「”[^“]{0,4}说」). Nguyên tác đặt tag **trước**: 「X说：“…”」. Regex loại 说**话** — bản gốc bắt nhầm 「”一只还在说话」 (ch35). **Không** siết thêm: đòi `，。` sau 说 thì lọt 6 tag thật dạng 「”太宰治说完，」 / 「说得理直气壮」 (ch18, ch21–24, ch26) | **cứng**, trần 0 |
| project_4 | 「」 làm dấu thoại — 「说：「」 | [[hard-rules]] §1 | **cứng**, trần 0 |
| project_5 | 「意识到 / 这才发现 / 终于明白 / 才明白过来」 — câu tổng kết cảm xúc | review ch16 S1 (「她忽然意识到…」) · ch20 S3 (「纲吉这才发现…」) · [[forbidden-patterns]] #1 | **cảnh báo** — có chỗ dùng đúng; người soát đọc từng chỗ |
| project_6 | 「不是…而是」 | review ch16 S1 · [[forbidden-patterns]] #2 (lặp nhiều lần) | trần **10/10k** 🟡 — review ch23, ch25, ch28 chấp nhận 2 lần/chương ~2.000 chữ |

## Vì sao không cấm hẳn ký tự 「」

Chương viết tiếp: **0** lần 「」 trong thân truyện (đếm 25/09/2026, ch16–ch36). Nguyên tác thì **có** 「」 — ở đoạn dệt từ tiểu thuyết Fate/Zero ([[hard-rules]] §1). Luật cấm 「」 **làm dấu thoại**, không cấm ký tự → mã hoá bằng `project_4`, không bằng `forbid_chars`.

## Máy không bắt được — vẫn kiểm tay

- **Liệt kê ba vế đều** ([[forbidden-patterns]] #3) — review ch23 S3, ch27, ch31 #6. Regex không phân biệt được ba vế có lý do (ch27) với ba vế sáo.
- **「我」 ngoài ngoặc kép** ([[hard-rules]] §3) — regex Python không loại được đoạn trong ngoặc một cách chắc chắn. `style_metrics.py` / grep tay.
- **So sánh 「像」 dày** — review ch26 (2,05/1000, ổn) · ch28 (7 lần / 2.251 chữ, 「安静得像是一口井」 — "hơi dày"). Không đặt trần: chưa đủ điểm đo.
- **Câu kết đoạn nói hộ suy luận** — mọi plan arc 3–5. Chỉ đọc mới thấy.

## Đối chiếu trên 21 chương — 25/09/2026

Chạy profile này trên ch16–ch36 (`ai_tells_check.py`, bản PR #65):

| Chương | Kết quả | Đọc thế nào |
|---|---|---|
| ch16–ch27 | `project_3` trúng 2–16 lần mỗi chương | **Đúng** — tag sau ngoặc thật (「“是你。”纲吉说。」). Luật có từ ch28 (review ch27 S1); chương cũ viết trước luật |
| ch28 | `project_1` ×1 · `project_2` ×1 · `project_6` 1 (dưới trần) | **Đúng** — chính câu 「客气得挑不出一点错…像在念一张早就写好的单子」 mà review ch31 #6 lấy làm bằng chứng |
| ch30 | `project_1` ×2 | **Đúng** — 「挑不出错处」; review ch30 lúc đó chấp nhận, review ch31 lập họ cấm sau |
| ch18 | `project_5` ×1 (cảnh báo) | đọc tay |
| ch29 · ch31–ch36 | sạch | ch35 sạch **sau** khi siết `project_3` |

**Chương đã `final` không sửa theo profile này.** Profile áp cho chương viết từ 25/09/2026. Muốn sửa chương cũ là việc riêng — `plan-continuation` Mode 4.

## Chạy

```bash
python 01_Origine/04_Tools/VaultTool/ai_tells_check.py --chapter <chuong.md> --project PPCT
```

Exit 2 = trúng một mẫu **cứng** → sửa trước khi trình. Exit 1 = cảnh báo (mẫu `project_5`, hoặc `project_6` dưới trần) → người soát đọc từng chỗ.
