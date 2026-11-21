---
id: review.PPCT.ch25-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-3-hai-cay-thuong
chapter: 25
canon_layer: user_canon
status: active
aliases: ["review ch25 PPCT", "soat ch25", "check-continuity ch25", "check-style ch25"]
related: ["[[04_Manuscript/chapters/arc-3/ch25/ch25-chapter]]", "[[04_Manuscript/chapters/arc-3/ch25/ch25-plan]]", "[[Diarmuid-Ua-Duibhne]]", "[[kiritsugu-la-master-that]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 22/09/2026, tren ban nhap ch25 (2.258 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-22
---

# Soát chương 25 — 破魔

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch25 --scene <4 thẻ>` | exit **1** cả 4 thẻ — không khớp được chữ Hán (`L29`); grep tay **15 từ khoá**, 0 hit trong thân truyện — `ch25/metadata.yaml` |
| `vault_doctor --include-fiction --zone …/PPCT` | 266 note · **0 lỗi** · 1 cảnh báo cũ |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Rạng sáng ngày 7, nối đúng ch24 (thùng gỗ, mưa, thương ngang gối); Saber buổi sáng cùng ngày |
| Ranh giới tri thức | ✅ POV Lancer **không** nhắc Kiritsugu, **không** nhìn lên xà nhà. POV Saber biết Kiritsugu là Master (`known_by` có artoria). Tổ Caster không lên trang (C6) |
| Trạng thái nhân vật | ✅ Sola-Ui đồng ý, không dùng lệnh chú, tình cảm chỉ qua hành vi; Kayneth nghe, im (C4); Kiritsugu 0 lời (C5) |
| Luật thế giới | 🟠 **#1** — Saber phát biểu một luật bảo cụ chưa có nguồn |
| Quan hệ / xưng hô | ✅ 「在下」 · 「索拉乌小姐」 đúng ch21; Saber gọi 「爱丽丝菲尔」 |
| Canon | ✅ Lời nguyền tan khi thương bị phá — [[Diarmuid-Ua-Duibhne]]; thân thương có kim loại dưới lớp sơn — khớp ch21 (đã sửa ở `write-chapter`); bốn ngón tay trên chuôi kiếm — khớp ch6 nguyên tác. 🔵 **#2** bố trí căn phòng |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm` |

---

## #1 · 🟠 vừa · 「能毁掉它的只有它的主人自己」 — luật bảo cụ không có nguồn

**Chương, dòng 137:** Saber: 「一个英灵的宝具，能毁掉它的只有它的主人自己。这是他自己的意思。」

**Note:** [[Diarmuid-Ua-Duibhne]] chỉ ghi Lancer **tự nguyện** phá Gáe Buidhe — **không** nói bảo cụ chỉ chủ nhân mới phá được. Vault không có note luật nào về việc phá bảo cụ.

→ Câu này đặt ra một **luật thế giới** qua miệng một nhân vật có thẩm quyền (Saber), và người đọc sẽ tin nó. Nếu arc sau có ai phá bảo cụ của người khác, câu này thành mâu thuẫn tự tạo.

Có một vấn đề nhỏ đi kèm: câu 「是他」 không cần luật đó để đứng vững. Saber hiểu vì cô **biết Lancer**, không phải vì cô biết luật.

**Hướng sửa:** đổi thành suy đoán dựa vào con người, không dựa vào luật — ví dụ 「他不会让任何人碰那把枪。除了他自己，我想不出还有谁会这么做。」 Giữ nguyên 「这是他自己的意思」.

## #2 · 🔵 thấp · 「行军床」 và vị trí thùng hàng

**Chương, dòng 49:** Sola-Ui 「坐在里面那张行军床的边上」 · **dòng 61, 81:** Kayneth trên thùng hàng, trong cùng căn phòng.

**ch21:** 「索拉乌把大衣铺在一只货箱上，让肯尼斯躺下去」 — thùng hàng nằm **trong** căn phòng quây tôn; **không** có giường xếp.
**ch24:** Lancer ngồi 「在离货箱不远的一只木箱上……背对着铁皮小屋」.

Không mâu thuẫn cứng: một cái giường xếp có thể đã ở đó, và ch24 chỉ nói "không xa thùng hàng". Nhưng 「行军床」 là **đồ vật mới** chưa từng lên trang, và bố trí căn phòng qua ba chương hơi lỏng. Có thể đổi thành 「坐在一只倒扣的木箱上」 cho khỏi thêm đồ.

---

# check-style — Mode 1

Đo bằng `han_metrics.py` (scratchpad, đã kiểm trên ch22 — `L45`).

## Bảng chỉ tiêu

| Chỉ số | Chỉ tiêu (dệt canon) | Đo được | |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.300) | **2.258** | ✅ |
| Thoại | 20–40 % | **21,4 %** | ✅ sát sàn (ch21: 22,8 %) |
| Chữ Hán/đoạn TB | 35–55 | 37,0 | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 4,9 % | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 4,0 % | ✅ |
| Câu trung vị | 17–20 | 20 | ✅ trần |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 0,89 | ✅ — 🔵 **S2** |
| Đoạn có thoại | 63,6–76,9 % *(dải chung)* | 52,5 % | 🔵 dưới dải chung — **bình thường cho dệt canon** (ch21: 57,1 %) |
| `？` · `！` · `……` · `——` | ≥4 · ≥1 · 0,5–3,5 · ≤2,5 | 6,20 · 1,33 · 1,33 · 1,33 | ✅ |
| Mật độ thuật ngữ | ≥ 9/1000 | **9,74** | ✅ — 宝具 5 · 御主 4 · 圣杯 3 · 英灵 3 · 魔力 3 · 从者 3 · 令咒 1; không từ nào gánh một mình |
| Motif mắt | 2–3 | 4 | ✅ |
| **Lượt thoại tối thiểu** (mới) | 01≥1 · 02≥10 · 03≥2 · 04≥6 | 2 · 15 · 4 · 11 | ✅ |

## Luật cứng

| Luật | |
|---|---|
| §1 thoại trong `“”`, không `「」` | ✅ 0 · 32/32 |
| §2 không kaomoji | ✅ |
| §3 không ngôi một ngoài ngoặc kép | ✅ 0 — 「在下」 chỉ trong thoại |
| §4 trích Dazai Osamu có 注 | ✅ không trích |
| §5 tiêu đề `【太纲无差】反派战争25` + dòng đồng nhân | ✅ |
| §6 phân biệt thực thể cùng tên | ✅ |

## Nhận xét về giọng

- **S1 · 🔵 · quy định lượt thoại — kết quả lần đầu.** Bản đầu **đạt đủ** lượt thoại tối thiểu ở cả bốn cảnh, nhưng thoại chỉ 18,9 % và thuật ngữ 4,27/1000 (sàn 9). Tức là lượt đủ mà **lượt ngắn** (「是。」「在下知道。」「断了？」). Quy định mới chặn được lỗi "thiếu lượt", không chặn được lỗi "lượt cụt". Đề xuất: thêm **một** cột nữa vào thẻ cảnh từ ch26 — thuật ngữ mục tiêu (vd. "≥ 4 lần trong cảnh 02: 宝具 · 令咒 · 从者"), vì hụt thuật ngữ là chỗ lệch xa nhất của bản đầu. Aurel quyết.
- **S2 · 🔵** — Câu ≤ 4 chữ **0,89/1000**, thấp nhất năm chương viết tiếp gần đây. Nguyên tác dùng câu cực ngắn làm nhịp lặng (「神剑与魔枪一触即发。」 kiểu [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature|signature]]). Chương này có hai dòng nhịp lặng tốt (「爱因兹贝伦的城堡。」, 「从码头那天晚上以来，这是第一次。」) nhưng lượt sửa nối câu đã nuốt gần hết câu ngắn. Không sai; chỉ báo số.
- **S3 · 🔵** — 「像」 3,99/1000, cao hơn ch22–24 (3,46–3,89) một chút; ba lần là 「像是」 trong cùng cảnh 02 (dòng 53, 77). Không phải trôi dạt.
- ✅ Không câu tổng kết cảm xúc cuối đoạn; 「不是…是」 2 lần (dòng 33, 123) — hai chỗ khác nhau, không lặp khuôn; không liệt kê ba vế đều trong lời kể.

## Chỗ mình không chắc

- **#1**: mình tin đây là lỗi đáng sửa, nhưng không phải mâu thuẫn — chỉ là một luật chưa ai duyệt.
- 「圣杯战争里的每一天，她都是这样练过来的」 (dòng 115) — nguyên văn không nói Saber luyện kiếm mỗi ngày. Chi tiết đời thường vô hại; không xếp thành phát hiện.
- Saber hiểu ngay Lancer **còn sống** (không nghĩ tới việc hắn chết) — hợp lý vì cô nghĩ tới việc phá thương trước, nhưng wiki chưa nói lời nguyền có tan khi Lancer chết không (arc-3-hai-cay-thuong đã ghi ⬜). Không ảnh hưởng chương này.

## Còn treo sang `finalize-chapter`

- Aurel quyết #1 (khuyên sửa), #2 (tuỳ), S1 (cột thuật ngữ trong thẻ cảnh từ ch26?).
- `finalize-chapter`: [[hook-he-qua-thay-to-caster]] `open` → `partially_paid` (plan đề xuất); [[hook-to-caster-khac-che-to-saber]] đảo chiều — status 🟡 Aurel; trạng thái Diarmuid, Sola-Ui, Kayneth, Artoria, Kiritsugu; timeline sáng ngày 7.
- **Ghi cho ch27:** Sola-Ui vừa hứa 「三道令咒都还在我手上，我一道也不会用来拦你」 — lời hứa này là thứ ch27 sẽ thử.

---

# Kết quả sửa — `write-chapter` Mode 3, 22/09/2026

Aurel: "Mode 3 theo đề xuất".

| Mục | Đã sửa |
|---|---|
| #1 | 「一个英灵的宝具，能毁掉它的只有它的主人自己。」 → 「他那样的英灵，不会让任何人碰自己的宝具。除了他自己，我想不出还有谁会这么做——」 — suy đoán từ con người, không còn là luật |
| #2 | 「行军床」 → 「一只倒扣的木箱」 |
| — | Lượt sửa #1 làm thuật ngữ tụt 8,83 (dưới sàn 9) và câu trung vị lên 21 (trên trần 20) → giữ 英灵 · 宝具 trong câu mới, tách lại hai câu đã nối ở `write-chapter` |
| S1 | không đụng văn xuôi — chuyển thành AUREL trong delta |

## Số đo sau Mode 3

| Chỉ số | Chỉ tiêu | Trước | Sau | |
|---|---|---|---|---|
| Chữ Hán | ≥ 1.500 | 2.258 | **2.272** | ✅ |
| Thoại | 20–40 % | 21,4 % | **21,9 %** | ✅ |
| Câu trung vị | 17–20 | 20 | **19** | ✅ |
| Thuật ngữ | ≥ 9/1000 | 9,74 | **9,68** | ✅ |
| `——` | ≤ 2,5/1000 | 1,33 | 1,76 | ✅ |
| Ngoặc mở/đóng | cân | 32/32 | 32/32 | ✅ |

