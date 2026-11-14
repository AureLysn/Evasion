---
id: chapter.EMB.brat-ch7-review-ban-20261001
type: chapter
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-10-01
archived_note: "Ban luu tru 01/10/2026: Aurel quyet lam lai ca du an EMB lan ba, tu khung nam arc (emb-lam-lai-lan-ba). Giu de tra; khong phai canon, khong phai mau giong."
language: vi
arc: brat
pov: tsuna
aliases: ["review Ch7 ban 01-10", "do dac Ch7 ban 01-10", "check-continuity Ch7 ban 01-10"]
related: ["[[brat-ch7-chapter-ban-20261001]]", "[[brat-ch7-the-canh-ban-20261001]]", "[[brat-ch6-chapter-ban-20261001]]", "[[emb-chot-danh-xung-theo-lanh-tho]]", "[[emb-chot-nguyen-to-di-san]]", "[[tsuna-am-tinh-tren-giay]]", "[[so-cua-thay-thuoc]]", "[[targets]]", "[[hard-rules]]"]
source:
  type: measured
  ref: "Do 20/09/2026 bang chapter_gate.py, style_metrics.py, pov_leak_check.py, cong cac phep grep tu viet."
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, review, k/note, p/personal]
last_updated: 2026-10-01
---

# Ch7 — số đo và check-continuity

## Cổng

| | |
|---|---|
| `chapter_gate` | **10/10**, luật cứng **sạch** |
| `pov_leak_check` | **0 phát hiện** ⚠️ nhưng **9/9 secret trả `unknown`** — nghĩa là *không kiểm được*, không phải *sạch* |
| `style_metrics` | 8.309 từ · tỉ lệ đoạn thoại **0,255** *(trần thẻ cảnh 0,28)* |
| `vault_doctor --include-fiction` | **0 lỗi** |

## 🔴 Bản nháp đầu **3/10** — tệ nhất arc, và chẩn đoán ngược Ch6

| | nháp đầu | chốt | ngưỡng |
|---|---|---|---|
| trung vị câu | 🔴 **9** | 11 | 10–14 |
| đoạn TB | 🔴 **25,6** | 30,1 | 30–40 |
| số từ | 🔴 5.615 | 8.309 | ≥8.000 |
| câu ≥35 từ | 10,0 | 8,8 | ≤9 |

🔵 Ch6 hỏng vì **câu quá dài**. Ch7 hỏng vì **câu và đoạn quá ngắn** — chữa bệnh cũ thành bệnh ngược. Và đòn bẩy vẫn là cái Ch5 đã dạy: **33% số đoạn ≤8 từ**; gộp thoại cụt thành tường thuật thì trung vị câu nhảy **9 → 11** và đoạn TB lên theo.

---

# check-continuity — **3 HIGH · 2 MEDIUM · 2 LOW**

## 🔴 HIGH

### H1 · Kawaba xuất hiện hai lần, và đồng hồ không khớp — Ch6 ↔ Ch7

| Nguồn | Nói gì |
|---|---|
| [[brat-ch6-chapter-ban-20261001]] dòng 544 | *"sitting on the parapet at **the turning above Kawaba**"* |
| Ch6 dòng 584 *(câu chốt chương)* | *"And for the next **two hours and forty minutes**… there was not one person alive who could have said where he was."* |
| [[brat-ch7-chapter-ban-20261001]] dòng 78 | *"Tsuna **came round the shoulder of the hill above Kawaba** at ten past seven"* |
| Ch7 dòng 112 | *"At eleven minutes past seven, on the coast road **above Kawaba**…"* |

Hai lỗi lồng nhau:

**(a) Vị trí lặp.** Ch6 đã cho cậu **ngồi ở Kawaba rồi đứng dậy đi tiếp**. Ch7 cho cậu **đi tới Kawaba** như thể lần đầu.

**(b) Con số không khớp.** Cậu bỏ chuyến bốn giờ và đi bộ. Ch7 đặt cú đánh lúc **19:11**. Từ parapet tới lúc bị đánh không thể là hai tiếng bốn mươi phút — nó là vài chục phút.

🔵 **Sửa rẻ nhất, hai dòng:**
- Ch6: bỏ con số, đổi thành *"from the moment he came down off that parapet"* — giữ nguyên sức câu, hết bài toán.
- Ch7 dòng 78: cho thấy cậu **vừa từ parapet đi tiếp**, không phải mới tới Kawaba.

### H2 · 🔴 Từ vựng sai **ba chỗ** — và **chương thứ tư liên tiếp**

| Dòng | Chương | Chương ở đâu | Viết gì | Phải là |
|---|---|---|---|---|
| **216** | 7.3 | **ngoài** Namimori | *chữ nghiêng*: `A **Kotei** of Namimori` | **Sky** |
| **300** | 7.4 | **ngoài** Namimori | tường thuật: `He was a *Getsufuji* of eleven` | **Cloud** |
| **568** | 7.6 | trong Namimori | *chữ nghiêng*: `**Gen'ei** … **Getsufuji** … **Yasuragi**` | **Mist · Cloud · Rain** |

⚠️ **Ba chỗ, hai luật khác nhau:** dòng 216 và 568 phạm **luật chữ nghiêng** *(nội tâm luôn hệ Ý)*; dòng 300 phạm **luật lãnh thổ** *(ngoài Namimori thì tường thuật cũng dùng tiếng Anh)*.

🔴 **Và hai trong ba chỗ là do chính lượt vá mật độ thuật ngữ sinh ra** — tức mình đã **nhét thuật ngữ Nhật vào để chạm ngưỡng `term1k`**, mà không kiểm xem chỗ nhét có được phép không.

#### ⚠️ Nhưng phần tệ nhất là phép kiểm

Ở Ch6 mình dựng một phép thử tự động cho đúng lỗi này, và ghi nó vào [[emb-chot-danh-xung-theo-lanh-tho]] như một *"phép thử một giây"*.

**Chạy nó lên Ch7: nó báo 2 chỗ khớp, và cả 2 đều là dương tính giả. Nó bỏ lọt cả ba lỗi thật.**

Nguyên nhân: regex bắt đoạn nghiêng `*…*` **gãy khi bên trong có `**đậm**`**, và cả ba chỗ sai đều có chữ đậm bên trong. Grep tay thô sơ thì bắt được hết.

🔵 **Nên bài học không phải "viết cẩn thận hơn".** Nó là: **một phép kiểm chưa được thử trên ca dương tính đã biết thì không phải một phép kiểm.** Ở Ch6 mình chỉ chạy nó trên văn **đã sạch** và thấy nó im lặng, rồi coi sự im lặng ấy là bằng chứng. Đó đúng là dòng **9** của nhật ký lỗi: *"nếu giả thuyết của tôi SAI thì phép thử này ra gì?"*

### H3 · [[tsuna-am-tinh-tren-giay]] — [[genichi]] chuyển từ `suspected_by` sang `known_by`

> Chương: *"Sawada-sama. The certificate I signed in November… Is it true?" / "**No**," said Musashi. "It is not true."*

Secret hiện tại: `known_by: [tsuna, musashi, indra]` · `suspected_by: [genichi]` · `reveal_planned:` **trống**.

⚠️ Đây là **một tiết lộ không có kế hoạch trước** — đúng cái trigger `finalize-chapter` bảo phải nêu. Nó **đã được Aurel duyệt qua cổng 4**, nên không phải lỗi; nhưng nó **phải vào delta**, và `reveal_planned` nên được điền ngược lại.

🔵 **Và bí mật vẫn sống**, vì chương cố ý không giết nó: ông **không gạch tờ giấy**. Tờ chứng nhận vẫn là một ghi chép đúng về những gì máy móc của ông đo được, nên nó vẫn che được — chỉ là giờ có một người biết nó che cái gì.

## 🟠 MEDIUM

### M1 · **38 hay 40 cây số** — cả hai dùng nhiều, trong cùng chương

`forty kilometres` **×8** · `thirty-eight kilometres` **×6**.

Ch6 nói Taki cách Namimori **sáu mươi** cây số. Ch7 nói Kyouya đạp **ba mươi tám**, và nói Kawaba cách nhà **bốn mươi**. Hai số ấy mô tả **cùng một quãng đường**.

→ Đọc được *(cậu ta cắt đường)*, nhưng lặp mỗi số sáu tới tám lần thì nó thành cấn. Chọn một.

### M2 · *"He did not come back up"* đọc như hắn chết

> 7.2: *"He hit the slope and kept going, down through the scrub, toward the water. **He did not come back up**."*

Mãi tới 7.4 mới rõ hắn còn sống *("he is on foot, and he is going to try for the station")*. Giữa hai chỗ là hơn một trăm dòng.

⚠️ Và nó **chịu lực**: nếu hắn chết trên sườn dốc thì [[emb-chot-nguyen-to-di-san]] không có gì để săn, và cả 7.6 sụp.

## 🟡 LOW

### L1 · Kyouya tìm ra bằng cách nào

Bond cho **hướng**, không cho **địa chỉ**. Chương xử lý được *(chỉ có một con đường ven biển)*, nhưng không nói ra. Một mệnh đề là đủ.

### L2 · Tật số vẫn còn

`eleven` và `four` vẫn dày. Aurel đang để mở khoản này từ Ch4.

## ✅ Bảy nhóm — cái đã kiểm và **đạt**

| Nhóm | Kết quả |
|---|---|
| **Timeline** | ⚠️ Xem H1. Ngoài ra khớp: thứ Năm, Taki từ 11h, đánh 19:11, Kyouya 22:09, khâu 00:20, Musashi ~01:00 |
| **Ranh giới biết** | ⚠️ Xem H3. ✅ [[tsuna-tai-sinh]] **không** bị đụng — Musashi nói thẳng *"That one I do not know either"*. ✅ [[chi-chu-nhan-thay-cao]]: con cáo có mặt, [[kyouya]] và [[genichi]] đều đã nằm trong `unknown_to` |
| **Trạng thái nhân vật** | ✅ Kyouya 11, chưa nói với ai từ thứ Hai, chưa vào nhà · Ayame tay trái băng · Ishii 81, xe buýt thứ Ba tuần hai · Gen'ichi `flame: none` **trước** cảnh 7.5 |
| **Luật thế giới** | ⚠️ Xem H2. ✅ Cơ chế Cloud chạy đúng và **thu tiền**: cái lỗ hổng Ch4 nêu và Ch6 nhắc lại thì Ch7 tính sổ |
| **Quan hệ** | ✅ [[genichi--musashi]] và [[genichi--tsuna]] đã có sẵn — **không cần note mới** |
| **Canon** | ✅ [[kawahira]] viết đúng bản sửa: **không ân hận, không giận, không giải thích**. Chương chỉ mô tả ba việc và để hai nhân vật khác đọc nó thành *cruellest* |
| **Hợp đồng nhánh** | ✅ 12 mục `forbid` không mục nào bị phạm. Kiểm riêng: **#2b** — Tsuna **tự sống sót**, Kyouya tới **sau ba tiếng**, cuộc săn xảy ra **sau** · **#3** — [[iemitsu]] **không một dòng thoại**, chỉ hai câu hậu quả · **#7** — cú vấp kể **bằng hai mép**, tám phút, không dựng cảnh bên trong |

## Bàn giao

- **Chưa sửa gì.**
- 🔴 `finalize-chapter` chưa chạy được khi còn HIGH mở.
- **H2 là chương thứ tư liên tiếp.** Và lần này chỗ hỏng **không phải văn xuôi** — là **phép kiểm**. Sửa regex, và chạy nó trên một ca dương tính đã biết trước khi tin nó.

---

## ✅ Đã xử — 20/09/2026, Aurel duyệt cả bảy

| # | Xử thế nào |
|---|---|
| **H1** | Ch6 bỏ con số: *"from the moment he came down off that parapet"*. Ch7 cho thấy cậu **đi tiếp từ parapet** chứ không mới tới Kawaba |
| **H2** | Ba chỗ về hệ Ý: **Sky** *(7.3)* · **Cloud** *(7.4)* · **Mist · Cloud · Rain** *(7.6)*. Và sửa **gốc**, xem dưới |
| **H3** | Điền ngược `reveal_planned: {arc: brat, chapter: Ch7}` vào [[tsuna-am-tinh-tren-giay]], kèm ghi chú rằng bí mật **vẫn sống** vì ông không gạch tờ giấy |
| **M1** | ✅ Aurel chốt **38**. Mười chỗ trong Ch6 + Ch7 đổi theo; hai chỗ viết lại không dùng số để tránh sinh tật mới |
| **M2** | Nói rõ ngay tại chỗ: *"He did not come back up. **He was not dead either**…"* |
| **L1 · L2** | Để mở theo ý Aurel |

### 🔴 H2 — sửa gốc, và **phép kiểm mới là thứ hỏng**

Ở Ch6 mình dựng một phép thử tự động cho đúng lỗi này và ghi nó vào [[emb-chot-danh-xung-theo-lanh-tho]]. **Chạy lên Ch7: 2 chỗ khớp, cả 2 dương tính giả, bỏ lọt cả ba lỗi thật.**

Nguyên nhân: regex bắt đoạn nghiêng **gãy khi bên trong có chữ đậm** — và cả ba chỗ sai đều có chữ đậm bên trong.

✅ **Bản sửa: gỡ `**` TRƯỚC, rồi mới tìm đoạn nghiêng.** Đã ghi vào note luật, kèm mã.

🔵 **Nghiệm thu trên năm chương Brat:** ra đúng **5 chỗ khớp**, và **cả 5 đều là ngoại lệ hợp lệ** *(lời trích ×3, chức vị ×1, thuật ngữ ×1)*. **0 vi phạm thật còn lại trong toàn arc.**

⚠️ Và bài học đã ghi vào note, vì nó là **dòng 9 của nhật ký lỗi**: ở Ch6 mình chỉ chạy phép thử trên văn **đã sạch**, thấy nó im, rồi coi sự im ấy là bằng chứng. **Một phép kiểm chưa thử trên một ca dương tính đã biết thì không phải một phép kiểm.**

### 🔵 Aurel sửa thêm — *"cruellest"* sai thanh ghi

Câu cũ để hai nhân vật đọc ba hình phạt thành *cruellest*. Aurel: không cần, vì **không ai trong thế giới đó đạo đức hoá**. Cái họ làm là:

> *What they noticed was a **Mist**. An enormous one, held down extremely hard, and unmistakably **angry**.*
>
> *The first part is to make a quiet private note to be somewhere else for a while… The second part is to keep a very interested eye on the unlucky bastard who caused it, and to enjoy oneself thoroughly. No entertainment in that business lasts better than watching a man find out.*

→ Đánh giá mối đe doạ, rồi lấy bỏng ngô ra. Không ai thương ai.

### 🆕 Và một note canon mới

[[fact-tap-quan-doi-voi-tung-he-lua]] — Aurel, 20/09: *"Namimori có truyền thống ngọn lửa riêng nên cũng sẽ có các truyền thống về cách đối phó với những người thuộc các hệ ngọn lửa."*

Nó **đặt tên cho thứ đã nằm sẵn trên trang** ở năm chương, và phép thử mạnh nhất của nó là [[taki]] — thị trấn **không có** tập quán nào, và giải cùng bài toán bằng **một cái xô kẽm**.

### Cổng sau khi sửa

`chapter_gate` **10/10** luật cứng sạch · `pov_leak_check` **0** · 8.475 từ · tỉ lệ đoạn thoại **0,250** · `vault_doctor` **0 lỗi** · Ch6 vẫn **10/10** sau khi sửa H1.
