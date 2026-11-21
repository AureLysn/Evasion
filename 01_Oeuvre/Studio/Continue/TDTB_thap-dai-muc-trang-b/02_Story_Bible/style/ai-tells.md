---
id: style.TDTB.ai-tells
type: style
scope: project
lane: personal
project: TDTB
canon_layer: project_locked
status: active
strength: hard
aliases: ["ai tells TDTB", "tat AI TDTB", "giong AI TDTB", "cum cam TDTB", "profile ai_tells_check TDTB", "extra_constructs TDTB"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]", "[[qd-viet-tieng-trung-tdtb]]", "[[nguyen-van-zh-tdtb]]"]
source:
  type: measured
  ref: "Do 27/09/2026 tren nguyen van zh ch1-15 (42.660 chu Han) — ty le cua chinh 乐博 tren tung cau truc, bang script tam + ai_tells_check.py. Danh sach cau truc: tat cua model (dung chung, theo AGENTS.md sub-vault §5) — lay tu cac ho PPCT da bat that khi review + tat van Trung thuong gap o AI. Aurel dong y lap file 27/09 ('Dong y, sua du')."
authority: user
confidence: 0.75
always_load: true
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
# Doc boi ai_tells_check.py --project TDTB (forbid_chars, extra_constructs, targets) va chapter_gate.py (khoi `gate:`).
# Truoc 14/11/2026 file nay khong co `gate:` vi chapter_gate.py chi doc chu Latin; cong nay da co nhanh chu Han.
# Ten construct theo THU TU trong list: project_1, project_2, ... — chen them thi chen o CUOI, dung doi thu tu.
forbid_chars: ['「', '『', '』']
extra_constructs:
  - '意识到|这才发现|终于明白|才明白过来'
  - '不是[^。！？“”]{1,20}而是'
  - '仿佛|宛如|犹如|好似'
  - '一丝'
  - '嘴角(?:勾起|扬起|微微上扬|噙着)'
  - '空气[^。]{0,4}(?:凝固|安静)|一时间[^。]{0,4}(?:安静|沉默)|死一般的(?:寂静|沉默)'
  - '深吸(?:了)?一口气'
  - '心中一[紧暖动颤沉凛]|心(?:头|里)一[紧暖动颤沉凛]'
  - '眼底|眸中|眸子|眼眸'
  - '缓缓|微微|轻轻'
  - '挑不出'
  - '”[^“\n]{0,4}说(?!话)'
targets:
  project_1_per_10k_max: 9
  project_2_per_10k_max: 5
  project_3_per_10k_max: 9
  project_4_per_10k_max: 11
  project_5_per_10k_max: 5
  project_6_per_10k_max: 5
  project_7_per_10k_max: 0
  project_8_per_10k_max: 0
  project_9_per_10k_max: 4
  project_10_per_10k_max: 11
  project_11_per_10k_max: 0
  project_12_per_10k_max: 11
  long_sentence_pct_max: 38
  question_per_10k_min: 40
  exclam_per_10k_min: 3
gate:
  # Moc do 14/11/2026 tu jjwxc-5231858-ch01-15-20260926.zip (kho library, sha C4A8BFEAB947BA90): 15 chuong,
  # 42.668 chu Han, bang ham measure() cua chapter_gate.py (nhanh chu Han). Don vi cua cong: long_pct = cau >= 35 chu;
  # ell10k dem moi "……" la 3 luot. Nguong doi don vi tu style/targets.md; khong dat so moi. Aurel duyet 14/11/2026 (TR-006).
  # words_max 99999 = khong co tran (targets.md); cong bat buoc co khoa nay.
  author:
    words: 2845
    sent_median: 28
    long_pct: 37.1
    para_mean: 40.9
    q10k: 72.7
    excl10k: 44.1
    ital10k: 0.2
    ell10k: 57.7
    term1k: 13.17
    had10k: 0.0
  targets:
    words_min: 2200
    words_max: 99999
    sent_median_min: 24
    sent_median_max: 33
    long_pct_max: 49
    para_mean_min: 32
    para_mean_max: 50
    q10k_min: 40
    excl10k_min: 5
    ital10k_min: 0
    ell10k_min: 12
    term1k_min: 2.1
    had10k_max: 0
  terms: ["信息素", "抑制剂", "分化", "标记", "系统", "任务", "积分", "直播", "弹幕", "嘉宾", "节目", "导演", "十代目", "机甲"]
last_updated: 2026-11-14
---

# Tật AI — profile cho `ai_tells_check.py`

> Viết **thành phẩm tiếng Trung** ([[qd-viet-tieng-trung-tdtb]]), nên cổng này chạy trên bản Trung.
> `strength: hard`: vượt trần là lỗi, không nộp bản nháp.

## Khối `gate:` — có từ 14/11/2026

Trước 14/11/2026 file này không có khối `gate:` vì `chapter_gate.py` chỉ đọc chữ Latin. Cổng nay có nhánh
chữ Hán, nên mốc tác giả đã được đo trên 15 chương nguyên văn (42.668 chữ Hán) và ghi ở frontmatter;
Aurel duyệt số 14/11/2026 (`TR-006`). Cổng đếm khác [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]] ở hai chỗ: câu dài là câu **≥ 35** chữ Hán,
và mỗi 「……」 tính 3 lượt. Thử trên ch16–ch18 ngày 14/11: cả ba exit 1, chỉ lệch trung vị câu
*(15, 17, 17 so với sàn 24)*. `ai_tells_check.py` với profile này và `style_metrics.py` với [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]] vẫn chạy như cũ.

## Ngưỡng đặt thế nào — đo trên chính 乐博

Luật vault: **tật của model** là thứ dùng chung, không phải giọng tác giả. Nhưng nhiều cụm trong danh sách
này văn JJWXC cũng dùng bình thường. Chính 乐博 viết *"嘴角勾起一丝微笑"*. Nên mỗi trần được đặt theo
**tần suất cao nhất của 乐博 trong một chương**, làm tròn lên. Cả 15 chương gốc phải qua, và bản nháp nào
dùng nhiều hơn tác giả thì bị bắt.

Đo 27/09/2026 trên 42.660 chữ Hán, đơn vị **lượt / 10.000 chữ Hán**:

| # | Cấu trúc | 乐博 (tổng · TB · max 1 chương · số chương có) | Trần |
|---|---|---|---|
| 1 | 意识到 / 这才发现 / 终于明白 — vỡ lẽ | 4 · 0,9 · 8,1 · 3/15 | 9 |
| 2 | 不是…而是 | 3 · 0,7 · 4,1 · 3/15 | 5 |
| 3 | 仿佛 / 宛如 / 犹如 / 好似 | 5 · 1,2 · 8,4 · 3/15 | 9 |
| 4 | 一丝 | 18 · 4,2 · 10,8 · 9/15 | 11 |
| 5 | 嘴角勾起 / 扬起 … | 4 · 0,9 · 4,1 · 4/15 | 5 |
| 6 | không khí đông cứng / im lặng chết chóc | 1 · 0,2 · 4,3 · 1/15 | 5 |
| 7 | 深吸一口气 | **0** | **0** |
| 8 | 心中一紧 / 一暖 / 一颤 … | **0** | **0** |
| 9 | 眼底 / 眸中 / 眸子 / 眼眸 | 1 · 0,2 · 3,6 · 1/15 | 4 |
| 10 | 缓缓 / 微微 / 轻轻 | 13 · 3,0 · 10,2 · 8/15 | 11 |
| 11 | 挑不出 (PPCT đã bắt khi review) | **0** | **0** |
| 12 | `”…说` — thẻ thoại đặt sau ngoặc | 7 · 1,6 · 10,8 · 5/15 | 11 |

⚠️ **Mục 8 chỉ bắt các chữ 紧/暖/动/颤/沉/凛.** 乐博 **có** viết *"心中一惊"*, *"心中一突"*, và hai
cụm này không nằm trong danh sách.

## Ngưỡng tỉ lệ — cảnh báo, không phải luật cứng

| Chỉ số (`ai_tells_check`) | 乐博, 15 chương | Ngưỡng |
|---|---|---|
| Câu ≥ 50 chữ Hán (`long_sentence_pct`) | 12,2–37,1 % | ≤ 38 % |
| `？` / 10k (`question_per_10k`) | 41,7–154,3 | ≥ 40 |
| `！` / 10k (`exclam_per_10k`) | 3,6–81,7 | ≥ 3 |

## Đọc exit code thế nào — đo 27/09 trên 15 chương gốc

- **Exit 2** = vượt trần một cấu trúc, hoặc có ký tự cấm. **Lỗi.**
- **Exit 1** = có cảnh báo. Công cụ báo **mọi** lượt xuất hiện của một cấu trúc thành cảnh báo, kể cả dưới
  trần. Trên văn gốc: **14/15 chương exit 1, 0/15 exit 2.** Exit 1 chỉ gồm cảnh báo `construct` dưới trần
  thì **không phải lệch**. Hãy đọc từng dòng.

## Ký tự cấm

`「` `『` `』`: 乐博 dùng `“”` và `‘’`, không dùng ngoặc vuông kiểu Nhật (0 lần trong 15 chương).

⚠️ **Không cấm `」`, `*`, `~`, `——`.** Tác giả dùng cả bốn:
- `」` nằm trong kaomoji `_(:з」∠)_` (ch9, ch10)
- `*` là vạch ngắt cảnh (ch9) và mặt cười `* v *` (ch1)
- `~` có 5 lần
- `——` có 17 lần

## Cái profile này KHÔNG bắt

Tật riêng của **Aurel và model khi viết truyện này** chưa có. Nó chỉ lộ ra khi review những chương đầu tiên.
Khi review bắt được họ nào, thêm vào **cuối** danh sách `extra_constructs`, giống cách PPCT gom từ review.
