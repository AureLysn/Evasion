---
id: review.PPCT.ch38-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-5-ke-san-va-con-moi
chapter: 38
canon_layer: user_canon
status: active
aliases: ["review ch38 PPCT", "soat ch38", "check-continuity ch38", "check-style ch38", "khep arc 5 review"]
related: ["[[04_Manuscript/chapters/arc-5/ch38/ch38-chapter]]", "[[04_Manuscript/chapters/arc-5/ch38/ch38-plan]]", "[[archer-doi-master-sang-kirei]]", "[[kirei-van-la-master]]", "[[Command-Spells]]", "[[nha-tho-fuyuki]]", "[[04_Manuscript/chapters/arc-4/ch33/ch33-review]]", "[[04_Manuscript/chapters/arc-5/ch36/ch36-review]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 27/09/2026, tren ban nhap ch38 (1.536 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-27
---

# Soát chương 38 — Nơi ba đạo lệnh chú tới

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát và người viết bản nháp là một, trong cùng một phiên.** Nếu muốn một lượt soát độc lập, dùng agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×4 cảnh | findings **0** · exit 1 ở cả bốn — [[dazai-mang-ky-uc-kiep-truoc]] không có `leak_terms` chữ Hán. Grep tay 前世 · 梦 · 白兰 · 十年 · 玛雷 · 指环 = 0 |
| grep tay (ranh giới arc) | 绮礼 · 言峰 · 璃正 · 时臣 · 新的御主 · Azoth · 间桐 · 雁夜 · Berserker · 第十天夜里 · 人间失格 = **0**. 死 ×1 — câu trích ch17 「Assassin死掉的那出戏」 |
| `ai_tells_check --project PPCT` | exit **0** |
| `style_metrics --json` (PR #64) | exit 0 — 1.536 ≥ sàn 1.500 |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo có từ trước |

## Tám nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ 「第十四天早上」 → 「中午的太阳」. ✅ 「第十天早上」 = ch30 · 「前天中午」 = ch33 (trưa ngày 12) · 「昨天，他知道了一半」 = ch36 (trưa ngày 13) · 「昨天晚上」 = ch37. ✅ 「酒宴那天晚上」 — khớp cách ch33 (bản chốt) gọi Vương Yến |
| Ranh giới tri thức | ✅ **L3 không tên** — 「在教会里」, không tên, không "Master mới", không 时臣, không đêm ngày 10. ✅ Mức (b): hai người (「监督者」 · 「Assassin的御主」), Dazai nghiêng — 「今天，可以猜得近一点了」 — rồi tự hạ 「没有看见的东西，就只能叫猜」. ✅ Tsuna nghiêng theo, **có chừng** — 「只挪了一点」 (thẻ cảnh 02: vào `suspected_by` qua việc nghe Dazai). ✅ Risei: 「可能」 — không vô can, không có can. 🔵 **#2** 「就再也没有出来」 · 🔵 **#3** 「令咒本来就是往教会那里收的」 |
| Trạng thái nhân vật | ✅ 「肯尼斯先生的魔术回路也废了」 — tổ Caster xem Kayneth bị phế (ch19). ✅ Ba đạo dưới băng (ch37). ✅ 「从者却还好好地在外面跑」 — Assassin còn sống, cả hai đã biết ([[assassin-chua-chet]] `known_by` gồm tsuna, dazai) |
| Luật thế giới | ✅ Chuồn chuồn dừng ở chân dốc — 「石阶一级都别上」; không đặt bọ; luật ch30 「不碰教会」 giữ (「站在路上看，不算碰」). ✅ Không ai lên hình. ✅ Camera trên cột điện chân dốc — khớp ch35; chi tiết mới (「一个半人高」 · 「用铁丝绑着」) không trái gì |
| Quan hệ / xưng hô | ✅ 「索拉乌小姐」 · 「肯尼斯先生」 (Tsuna, ch30). ✅ Tsuna gọi 「太宰」; Dazai gọi 「纲吉」 ([[dazai--tsuna]]) |
| Canon | ✅ Lệnh chú là ma lực ([[Command-Spells]] luật 6) — dùng lại, không giải thích lại (arc 5 *Ghi cho ch38*). 🔵 **#3** |
| Hợp đồng nhánh | ✅ Không chạm `forbid` |
| Rò kế hoạch (nhóm 8) | ✅ Beat cảnh 03 (chuồn chuồn) không được báo trước ở cảnh 01–02 — câu 「我们不碰教会，对吧？」 là **mở** beat, không đoán trước. ✅ Không câu nào nói Kiritsugu sẽ thấy con chuồn chuồn (thẻ cảnh 03 CẤM). ✅ Không câu chiến lược về Archer (plan C10). ✅ Không báo đêm cuối |

**Hook:** [[hook-can-dazai-de-thang-archer]] đẩy — biết người nuôi Archer ở đâu, **không** chiến lược ✓. [[hook-to-caster-khac-che-to-saber]] chạm nhẹ — camera của Kiritsugu ✓. [[hook-assassin-con-song]] vọng làm lý do nghiêng ✓. [[hook-tsuna-da-thay-chien-thang]] không chạm ✓.

---

## #1 · 🟠 vừa · Dòng 87 「太宰治没有马上回答」 — nhưng Dazai **vừa trả lời** ở dòng 85

**Dòng 83:** 「纲吉说：“那现在呢？监督者就不可能吗？”」 · **dòng 85:** 「太宰治说：“可能。令咒本来就是往教会那里收的。”…“要Archer的魔力做什么呢？”」 · **dòng 87:** 「**太宰治没有马上回答**。他看着自己竖起来的第二根手指…」

→ Lỗi do lượt sửa ở `write-chapter` (thêm câu hỏi về giám sát viên để đủ sàn độ dài): dòng 87 vốn trả lời câu 「那现在呢？」, giờ đứng sau một câu Dazai đã trả lời. Đọc liền, Dazai vừa nói xong lại "chưa trả lời ngay".

**Đề xuất:** bỏ vế 「太宰治没有马上回答。」, giữ phần còn lại — 「他看着自己竖起来的第二根手指，看了一会儿，才慢慢把两根手指都收了回去。」. Nhịp im vẫn còn, không mâu thuẫn.

## #2 · 🔵 thấp · 「三道令咒进了教会，就再也没有出来」 — nói chắc hơn tổ Caster biết

**Dòng 65:** 「三道令咒进了教会，就再也没有出来。而有一个人手上的魔力，多得可以替Archer付账。」
**ch30 · [[nha-tho-fuyuki]]:** tổ Caster **mù** ở nhà thờ. **Plan beat 1:** 「ai đó ở đó đang dùng chúng — **hoặc** dùng thứ gì đó giống chúng」.

→ "Không bao giờ ra lại" là điều họ **không thể** thấy. Dòng 93 (「没有看见的东西，就只能叫猜」) có hạ mức về sau, nên không phải lỗi tri thức — chỉ là Dazai nói chắc ở đây rồi mới rút lại. **Mình không chắc** đây là lỗi; có thể đọc là giọng Dazai.

**Đề xuất:** 「三道令咒进了教会，**大概**就没有再出来。」 hoặc giữ.

## #3 · 🔵 thấp · 「令咒本来就是往教会那里收的」 — canon nói Chén thu, nhà thờ giữ phần thừa

**Dòng 85.** **[[Command-Spells]] luật 3:** 「Chén thu lại, có thể trao cho người nhận một Servant mất chủ. *"The Church provides protection to Masters without Servants for the reason of them having greater chance of obtaining leftover Command Spells."* Lệnh chú thừa sau mỗi cu[ộc chiến]…」

→ Không sai hẳn — nhà thờ **là** nơi lệnh chú thừa đi qua. Nhưng "vốn được thu về nhà thờ" gọn hơn canon một bước (người thu là Chén). Với Dazai — một Master không có gốc ma thuật sư — biết tới mức này đã là nhiều. **Mình không chắc** đây là lỗi.

**Đề xuất:** 「教会本来就是收着那些用剩的令咒的地方。」 — sát canon hơn. Hoặc giữ.

---

# Văn phong (check-style Mode 1)

Số đo từ `style_metrics.py --json` (PR #64). Quy ước đặt số từ ch38: thoại 30–40 %; đoạn TB / câu trung vị là `tendency`.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.050) | 1.536 | ✅ đạt sàn · 🟡 **#6** thiếu ~25 % so với dự kiến |
| Thoại | **30–40 %** (quy ước từ ch38) | 37,9 % | ✅ — **lần đầu đạt từ ch35** |
| Chữ/đoạn TB | 35–55 · `tendency` | 29,0 | 🔵 ghi nhận |
| Đoạn ≥ 100 chữ | ≤ 8 % | 0 % | ✅ |
| Câu trung vị | 17–20 · `tendency` | 13 | 🔵 ghi nhận |
| Câu ≥ 50 chữ | ≤ 12 % | 1 % | ✅ |
| Câu ≤ 4 chữ /1000 | ≤ 5,5 | 1,3 | ✅ |
| `？` /1000 | ≥ 4 | 7,16 | ✅ |
| `！` /1000 | ≥ 1 | **0,65** | 🟡 **#6** |
| `……` /1000 | 0,5–3,5 | 2,6 | ✅ |
| `——` /1000 | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ /1000 | hướng ~3,5 | 14,32 — 令咒 ×9 · 御主 ×6 · 魔力 ×4 · 从者 ×3 | ✅ · dồn vào 令咒 nhưng **là dùng thật** (chương nói về lệnh chú), không phải va chuỗi |
| Motif mắt | ≥ 1 | 1 | ✅ sát sàn |
| Lượt thoại theo cảnh | ≥ 10 · 8 · 4 · 2 | 16 · 13 · 11 · 3 | ✅ |
| Chữ Hán theo cảnh | 700 · 550 · 550 · 250 | 591 · 400 · 403 · **142** | 🟡 **#6** |
| Thuật ngữ theo cảnh | ≥ 4 · 2 · 1 · 0 | 12 · 9 · 1 · 0 | ✅ |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 `“”`, không `「」` làm dấu thoại | ✅ |
| §2 Kaomoji | ✅ 0 |
| §3 「我」 ngoài ngoặc | ✅ 0 |
| §5 Tiêu đề | ✅ `【太纲无差】反派战争38` |
| [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells\|ai-tells]] | ✅ exit 0. 「不是X，是Y」 không 而: 0 |

## #4 · 🔵 thấp · Dòng 73 — cùng dáng câu review ch36 #6 đã đánh dấu

**Dòng 73:** 「那道看不见的裂缝，两边终于对上了。」 (đoạn một câu, đứng sau đoạn đã nói xong ý).
**Review ch36 #6:** 「那道看不见的缝，这一次终于摸到了边。」 — *"dáng của câu tổng kết"*; đã **bỏ** ở ch36 Mode 3.
**Thẻ cảnh 01:** cho phép **một** câu cảm giác (vết nứt ch30 khép lại).

→ Thẻ cảnh cho phép, nên không phải lỗi. Nhưng đây là **lần thứ hai** hình ảnh "vết nứt ch30" được khép bằng một đoạn một câu cùng khuôn — và lần trước Aurel đã bỏ. Để đúng tinh thần lần trước: ghép vào cuối đoạn 71 (không đứng riêng), hoặc bỏ.

**Đề xuất:** ghép — 「…现在另一半也有了着落，令咒也早就不在她的手上了。那道看不见的裂缝，两边终于对上了。」 — hoặc bỏ hẳn (dòng 71 đã đủ).

## #5 · 🔵 thấp · 「看了一会儿」 ba lần

**Dòng 87** 「看了一会儿」 · **dòng 95** 「放了一会儿」 · **dòng 125** 「看了一会儿」. Nhỏ — nhịp "nhìn một lúc" lặp ở ba chỗ im của chương.

**Đề xuất:** dòng 125 → 「纲吉盯着那块小小的玻璃，没有说话，然后把蜻蜓调了个头，往回飞。」.

## #6 · 🟡 chỉ tiêu · 1.536 chữ (−25 % dự kiến) · `！` 0,65 · cảnh 04 = 142

- Độ dài: bản đầu **1.422 — dưới sàn**; lượt sửa ở `write-chapter` thêm trong beat có sẵn (câu hỏi về giám sát viên · lời dặn bậc đá · 「上面有东西！」) → 1.536. Trên sàn, dưới dự kiến. Cảnh 02, 03 ngắn hơn thẻ ~150 chữ mỗi cảnh — không có beat thiếu.
- `！`: một lần. Chương suy luận; thêm tiếng kêu là nhồi.
- **Lưu ý:** lượt sửa đó sinh ra **#1** — lời cảnh báo của skill (*"sửa một chỗ sinh ra lỗi ở chỗ khác"*) đúng ở đây.

→ **Hỏi Aurel:** chấp nhận cho chương này?

---

## Tổng hợp

| # | Mức | Nhóm | Tóm tắt | Đề xuất |
|---|---|---|---|---|
| 1 | 🟠 | Văn / logic | 「太宰治没有马上回答」 sau khi Dazai vừa trả lời | bỏ vế đó |
| 2 | 🔵 | Tri thức | 「就再也没有出来」 nói chắc hơn tổ Caster thấy | thêm 「大概」, hoặc giữ |
| 3 | 🔵 | Canon | 「令咒本来就是往教会那里收的」 gọn hơn canon | 「教会本来就是收着那些用剩的令咒的地方」, hoặc giữ |
| 4 | 🔵 | Văn phong | dòng 73 cùng dáng ch36 #6 | ghép vào đoạn 71, hoặc bỏ |
| 5 | 🔵 | Văn phong | 「看了一会儿」 ×3 | đổi dòng 125 |
| 6 | 🟡 | Chỉ tiêu | 1.536 chữ · `！` 0,65 · cảnh 04 = 142 | hỏi chấp nhận |

Không có lỗi 🔴. Không có lỗi luật cứng. Thoại **đạt** quy ước mới lần đầu.

## Để `finalize-chapter` biết (không phải lỗi)

- **Dazai · Tsuna: [[archer-doi-master-sang-kirei]] L2 → L3** — người nuôi Archer **ở nhà thờ**, (có lẽ) dùng ba đạo của Sola-Ui. Không tên. `suspected_by` giữ, ghi mức trong bảng.
- **[[kirei-van-la-master]]: Tsuna `unknown_to` → `suspected_by`** (nghe Dazai nghiêng về Master của Assassin — 「只挪了一点」). Dazai: giữ `suspected_by`, ghi "gần hơn — ch38".
- **Tổ Caster biết Sola-Ui đổi ba đạo lệnh chú lấy đường về** — **đoán** (「她得拿点什么出来换」), đúng sự thật ch29 → [[sola-ui-doi-lenh-chu-lay-duong-ve]] hệ quả sau ch38.
- **Tổ Caster thấy camera của Kiritsugu ở chân dốc nhà thờ** → [[nha-tho-fuyuki]] mục *Bị theo dõi*; [[kiritsugu]] (bị thấy — **không** biết mình bị thấy).
- **Hệ quả arc 6 (plan ch38):** camera đó **có thể** đã ghi con chuồn chuồn — Kiritsugu sẽ biết tổ Caster nay nhìn nhà thờ. Off-page.
- **Arc 5 khép.** Arc note: trạng thái `active` → khép; bảng chương đủ 5/5.

---

## Mode 3 — đã sửa (Aurel 27/09/2026: "đồng ý đề xuất write-chapter Mode")

| # | Trước | Sau |
|---|---|---|
| 1 | 「太宰治没有马上回答。他看着自己竖起来的第二根手指…」 | 「他看着自己竖起来的第二根手指…」 |
| 2 | 「三道令咒进了教会，就再也没有出来。」 | 「三道令咒进了教会，**大概**就再也没有出来。」 |
| 3 | 「可能。令咒本来就是往教会那里收的。」 | 「可能。教会本来就是收着那些用剩的令咒的地方。」 — sát [[Command-Spells]] luật 3 |
| 4 | 「那道看不见的裂缝，两边终于对上了。」 (đoạn riêng) | **ghép** vào cuối đoạn trước — không còn đứng riêng |
| 5 | 「纲吉盯着那块小小的玻璃看了一会儿」 | 「纲吉盯着那块小小的玻璃」 — 「看了一会儿」 còn 1 |
| 6 | 1.536 chữ · `！` 0,65 · cảnh 04 | **chấp nhận** |

**Đo lại** (`style_metrics --json`, PR #64): 1.536 → **1.529** chữ Hán · thoại 38,5 % · đoạn TB 29,4 · câu trung vị 13 · `？` 7,19 · `！` 0,65 · `……` 2,62 · `——` 0 · thuật ngữ 14,39/1000.

**Kiểm lại:** `ai_tells_check` exit **0** · `pov_leak_check` ×4 findings **0** · grep 往教会那里收 · 绮礼 · 时臣 · 间桐 = 0 · 「没有马上回答」 còn 1 — dòng 53, của **Tsuna**, đúng · 「我」 ngoài ngoặc 0 · 「不是X，是Y」 0.

