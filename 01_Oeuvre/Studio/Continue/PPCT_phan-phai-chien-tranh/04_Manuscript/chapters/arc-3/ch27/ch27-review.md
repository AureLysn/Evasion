---
id: review.PPCT.ch27-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-3-hai-cay-thuong
chapter: 27
canon_layer: user_canon
status: active
aliases: ["review ch27 PPCT", "soat ch27", "check-continuity ch27", "check-style ch27"]
related: ["[[04_Manuscript/chapters/arc-3/ch27/ch27-chapter]]", "[[04_Manuscript/chapters/arc-3/ch27/ch27-plan]]", "[[Diarmuid-Ua-Duibhne]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 22/09/2026, tren ban nhap ch27 (2.692 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-22
---

# Soát chương 27 — 决斗

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch27 --scene <5 thẻ>` | exit **1** cả 5 — không khớp được chữ Hán (`L29`); grep tay 12 từ khoá, 0 hit trong thân truyện; kiểm POV bằng tay ghi ở `ch27/metadata.yaml` |
| `vault_doctor --include-fiction --zone …/PPCT` | 284 note · **0 lỗi** · 1 cảnh báo cũ |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Đêm ngày 8 (「圣杯战争打到第八个晚上」). Kiritsugu đặt súng trên 龙门吊 đêm ngày 1 — ch5 nguyên tác ✓. Tsuna đoán Saber trả giá vì chủ quan — [[do-tham-saber-lancer-kho-cang]] ✓ |
| Ranh giới tri thức | ✅ POV Lancer không nhắc Kiritsugu, không biết tổ Caster. Tổ Caster **suy ra** Sola-Ui không dùng lệnh chú (Lancer vẫn đánh) — không thêm thiết bị. 🟠 **#1** Saber biết 「那一声」 |
| Trạng thái nhân vật | ✅ Lancer chết **trong quyết đấu**, không nguyền rủa — đúng ket-cuc-lancer-quyet-dau-tu-nguyen; Sola-Ui không dùng lệnh chú — giữ lời ch25; tổ Caster không lộ mặt |
| Luật thế giới | ✅ Bọ giám sát nổ bằng chức năng có sẵn (ch3 「小型炸弹」), khác chuồn chuồn ch5 (quá tải) — đúng thẻ cảnh 03. Gáe Dearg xuyên Invisible Air — [[Diarmuid-Ua-Duibhne]] ✓ |
| Quan hệ / xưng hô | ✅ 「纲吉」 · 「太宰」; Lancer gọi 「Saber」; Irisviel không nói — hợp |
| Canon | ✅ Kiếp trước: nước lọt kẽ tay chủ quân hai lần, lần ba đã muộn — khớp [[Diarmuid-Ua-Duibhne]] (Fionn), không nêu tên. Saber **không** tự bỏ tay — lệch có chủ đích C2, ghi ở 20260922-canon-saber-quyet-dau. Excalibur không giải phóng ✓ |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm` |

---

## #1 · 🟠 vừa · Saber nói 「那一声」 — cô không nghe thấy tiếng thương gãy

**Chương, dòng 51:** Saber 「你的宝具，我收到了。那一声，比任何一封战书都要清楚。」

**ch25:** Saber ở lâu đài Einzbern, **cảm** tay trái nắm lại được — 「不是疼，是另一种她已经快忘记了的感觉」 — không có âm thanh nào tới cô. Tiếng gãy chỉ tổ Caster nghe, **qua con bọ** (ch26 「很干的一响」).
**ch26:** câu 「折断宝具的那一声，本身就是一封战书」 là của **Dazai** — Saber không có mặt.

→ Saber đang dùng đúng khung chữ của Dazai cho một thứ cô chỉ **cảm** được. Người đọc vừa đọc ch26 sẽ thấy hai nhân vật không gặp nhau lại nói trùng một ý bằng cùng một từ.

**Hướng sửa:** 「你的宝具，我收到了。我的左手，比任何一封战书都要清楚。」 — hoặc 「那一瞬间，比任何一封战书都要清楚。」 Một cụm chữ, không đổi beat.

## #2 · 🔵 thấp · Liệt kê ba vế 「没有……没有……没有」 trong lời kể

**Chương, dòng 79:** 「没有御主在旁边喊话，没有埋伏在屋顶上的枪口，没有谁的宝具在谁的身上留下永远好不了的伤口。」

Dấu vết văn AI #3 (ba vế đều) — cùng khuôn ch23 S3 dòng 165 (đã rút còn hai vế). Ở đây ba vế **có lý do**: mỗi vế gọi lại một thứ thật đã xảy ra (Kayneth ch4, Kiritsugu ch5, Gáe Buidhe). Nhưng nhịp vẫn đều. Nếu sửa: bỏ vế giữa (「埋伏在屋顶上的枪口」 cũng là chỗ gần POV Lancer biết quá nhiều nhất).

## #3 · 🔵 thấp · Lancer 「一直在等那只从背后伸过来的手」 từ 「那个下着雨的早上」

**Chương, dòng 153.** ch21 gieo Lancer thấy tình cảnh **giống lần trước** từ **đêm ngày 5** (「有一样熟悉的东西正在他背后慢慢立起来」), không phải buổi sáng mưa ngày 7. Buổi sáng ngày 7 là lúc hắn **được cho phép** — không phải lúc hắn bắt đầu lo bị phản bội.

Không mâu thuẫn cứng (hắn có thể đã chờ từ ch21 **và** vẫn chờ tới sáng ngày 7). Có thể đổi 「从那个下着雨的早上开始」 → 「从索拉乌小姐举起那只手的那个晚上开始」 cho khớp ch21.

---

# check-style — Mode 1

Đo bằng `han_metrics.py` (scratchpad, đã kiểm trên ch22 — `L45`).

## Bảng chỉ tiêu

| Chỉ số | Chỉ tiêu (dệt canon) | Đo được | |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.900) | **2.692** | ✅ |
| Thoại | 20–40 % | **25,9 %** | ✅ |
| Chữ Hán/đoạn TB | 35–55 | 37,4 | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 5,6 % | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 4,0 % | ✅ |
| Câu trung vị | 17–20 | 18 | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 4,09 | ✅ — giữ được nhịp ngắn (「Saber先动了。」「最后一次。」) |
| Đoạn có thoại | 63,6–76,9 % *(dải chung)* | 54,2 % | 🔵 dưới dải — bình thường cho dệt canon (ch21 57,1 %, ch25 52,5 %) |
| `？` | ≥ 4/1000 | 4,46 | ✅ sát sàn |
| `！` · `……` · `——` | ≥1 · 0,5–3,5 · ≤2,5 | 1,11 · 1,11 · 0,74 | ✅ |
| Mật độ thuật ngữ | ≥ 9/1000 | **9,29** | ✅ — 御主 5 · 令咒 5 · 从者 4 · 英灵 3 · 宝具 3 · 魔力 3 · 圣杯 2 |
| Motif mắt | 2–3 | 2 | ✅ sàn |
| Lượt thoại tối thiểu | 6 · 4 · 8 · 5 · 4 | 9 · 4 · 15 · 6 · 5 | ✅ |
| Thuật ngữ mục tiêu | 5 · 7 · 6 · 4 · 1 | 5 · 7 · 7 · 4 · 1 | ✅ |

## Luật cứng

| Luật | |
|---|---|
| §1 thoại trong `“”`, không `「」` | ✅ 0 · 40/40 |
| §2 không kaomoji | ✅ |
| §3 không ngôi một ngoài ngoặc kép | ✅ 0 |
| §4 trích Dazai Osamu có 注 | ✅ không trích |
| §5 tiêu đề `【太纲无差】反派战争27` + dòng đồng nhân | ✅ |
| §6 phân biệt thực thể cùng tên | ✅ |

## Nhận xét về giọng

- **S1 · 🔵 · quy trình — kiểu hụt thứ ba.** Hai quy định thẻ cảnh chặn được hụt **lượt thoại** và hụt **thuật ngữ theo cảnh** — bản đầu ch27 đạt cả hai. Hụt còn lại nằm ở **cấp chương**, thứ thẻ cảnh không đo: `？` 1,51 · `！` 0,38 · câu ≤ 4 chữ 6,03 (hai chỗ là tag **sau** ngoặc 「”纲吉说」 — lỗi ch22 S2 quay lại). Không đề xuất thêm cột vào thẻ cảnh — ba cột là đủ nặng. Đề xuất thay thế: writer chạy `han_metrics.py` **ngay sau bản đầu** như một bước bắt buộc (đang làm thật, chỉ chưa ghi vào plan) và **grep 「”[^“]{0,4}说」** trước khi đo.
- **S2 · 🔵** — 「像」 1,86/1000, thấp nhất ch22–27. 「不是……也不是……只是」 một lần (dòng 129) — không lặp khuôn.
- **S3 · 🔵** — motif mắt đúng sàn (2): 「碧绿的眼睛」 và một lần trong cảnh Saber. Chương này mắt Tsuna **không** xuất hiện; nếu muốn dày hơn, cảnh 05 là chỗ tự nhiên.

## Chỗ mình không chắc

- **Kiritsugu biết lệnh chú đổi tay** — thẻ cảnh 03 cho phép off-page; chương không giải thích. Người đọc có thể hỏi. Không xếp thành phát hiện vì plan đã chốt.
- 「炸药只有指甲盖那么大，伤不了人」 — Dazai khẳng định kích thước; ch3 chỉ nói 「小型炸弹」, ch5 「没有多大的威力」. Nhất quán về tinh thần; con số là của Dazai.
- Sau khi bọ nổ, số phận Sola-Ui và Kayneth **không** lên trang — đúng, để ch28. Nhưng lời Dazai 「他现在应该已经退出去了」 là đoán; ch28 phải xác nhận hoặc lật lại.

## Còn treo sang `finalize-chapter`

- Aurel quyết #1 (khuyên sửa), #2, #3 (tuỳ).
- `finalize-chapter`: [[hook-he-qua-thay-to-caster]] `partially_paid` → `paid_off` (plan đề xuất); [[hook-to-caster-khac-che-to-saber]] giữ `partially_paid` (plan đề xuất); Diarmuid → trạng thái **chết** (status note nhân vật?); Sola-Ui, Kayneth, Kiritsugu, Artoria, Dazai, Tsuna; timeline đêm ngày 8; event note.
- **Ghi cho ch28:** Kiritsugu nghi có bên thứ ba; Sola-Ui và Kayneth sau khi mất Lancer — chưa biết gì xảy ra sau vụ nổ.

---

# Kết quả sửa — `write-chapter` Mode 3, 22/09/2026

Aurel: "Mode 3 theo đề xuất".

| Mục | Đã sửa |
|---|---|
| #1 | Saber 「那一声，比任何一封战书都要清楚」 → 「我的左手，比任何一封战书都要清楚」 — thứ cô **cảm** được, không phải thứ tổ Caster **nghe** được |
| #2 | Bỏ vế giữa 「没有埋伏在屋顶上的枪口」 → còn hai vế (「没有……也没有……」) |
| #3 | 「从那个下着雨的早上开始」 → 「从索拉乌小姐举起那只手的那个晚上开始」 — khớp ch21 |
| S1 | không đụng văn xuôi — chuyển thành AUREL trong delta |

## Số đo sau Mode 3

| Chỉ số | Chỉ tiêu | Trước | Sau | |
|---|---|---|---|---|
| Chữ Hán | ≥ 1.500 | 2.692 | **2.690** | ✅ |
| Thoại | 20–40 % | 25,9 % | 25,9 % | ✅ |
| Câu trung vị | 17–20 | 18 | 18 | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 4,09 | 4,09 | ✅ |
| Thuật ngữ | ≥ 9/1000 | 9,29 | 9,29 | ✅ |
| Ngoặc mở/đóng | cân | 40/40 | 40/40 | ✅ |

