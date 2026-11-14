---
id: chapter.EMB.child-ch4-review-ban-20260925
type: chapter
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-09-25
archived_note: "Ban arc Child luu tru 25/09/2026: Aurel quyet lam lai arc tu khung y chinh (emb-lam-lai-child-tu-khung). Giu de tra; khong phai canon, khong phai mau giong."
language: vi
arc: child
pov: tsuna
aliases: ["review Child Ch4 ban 25-09", "check-continuity Child Ch4 ban 25-09", "check-style Child Ch4 ban 25-09", "loi muoi mot nam lan ba ban 25-09", "tuoi Tomoko lech hai muoi nam ban 25-09"]
related: ["[[child-ch4-chapter-ban-20260925]]", "[[child-ch4-the-canh-ban-20260925]]", "[[child-ch2-chapter-ban-20260925]]", "[[child-ch3-chapter-ban-20260925]]", "[[tomoko]]", "[[hook-dua-tre-saint-exavier]]", "[[tuyen-xanxus]]", "[[child-dan-y-ban-20260925]]", "[[hard-rules]]", "[[targets]]"]
source:
  type: measured
  ref: "Do 21/09/2026 bang chapter_gate.py, style_metrics.py, pov_leak_check.py, ai_tells_check.py, cong cac phep grep tu viet."
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, review, k/note, p/personal]
last_updated: 2026-09-25
---

# Child Ch4 — check-continuity và check-style

## Cổng

| | |
|---|---|
| `chapter_gate` | **10/10 chỉ tiêu**, luật cứng **sạch** |
| `pov_leak_check --scene --json` | **9 secret đối chiếu, 0 phát hiện**, exit 0 |
| `ai_tells_check` | **0 vi phạm cứng**; `not_fragment` 1,2/10k *(dưới ngưỡng)* |
| `style_metrics --write` | 8.242 từ · thuật ngữ **7,09** · tỉ lệ đoạn thoại **0,164** |
| Phép kiểm chữ nghiêng | 157 đoạn · 8 có hệ Nhật · **thư Tomoko + chức vị** *(ba chỗ vi phạm đã sửa lúc viết)* |

---

# check-continuity — **3 HIGH · 3 MEDIUM · 3 LOW**

## 🔴 H1 · *"eleven years"* — **lỗi này là lần thứ ba**

### Chương viết gì

> dòng 93 · *"Six separate professional outfits have looked for that boy in **eleven years**"*
>
> dòng 287 · *"I was asked to find him once, **eleven years ago**, by people who meant to sell him"*

### Vault khoá gì

[[hook-dua-tre-saint-exavier]], mục **Mốc mất tích**, chốt 20/09:

> *Bà chạy **tháng Một 1992** = **tám năm trước**. Đứa trẻ mất tích **sau đó**. Khoảng dùng được là **tám tới mười**. **Mười một thì không.***

Và chuỗi hợp đồng còn chặt hơn: hợp đồng → bà rò rỉ → bị săn → **chạy**. Nên hợp đồng ở **trước tháng Một 1992 một chút**, tức **~tám năm**, không phải mười một.

⚠️ **Và chính chương này dùng "tám năm" mười hai lần** ở mọi chỗ khác — kể cả *"sitting inside it for eight years"* và *"trying to find him ever since, on her own money, for eight years"*. Hai chỗ kia là hai chỗ lạc.

🔴 **Đây là lần thứ ba cùng một con số.** Ch1 viết *eleven years ago* và *between eleven and fifteen*; đã sửa 20/09. Ch4 viết lại nó hai lần, ba tuần sau, trong cùng một arc.

🔵 Sửa hai chữ. Nhưng **lần thứ ba thì nó thôi là một lỗi và thành một dấu hiệu**: `eleven` là số mình với tay tới khi cần một số lớn, và nó là **tật số** Aurel đã để mở từ Ch4 của arc Brat.

## 🔴 H2 · Tuổi [[tomoko]] lệch **hai mươi năm** giữa hai chương

| | |
|---|---|
| [[child-ch2-chapter-ban-20260925]] dòng 563 | *"a woman who offers the whole of her book at **twenty-three**"* ⇒ bà **31** bây giờ |
| [[child-ch4-chapter-ban-20260925]] dòng 281 | *"I am **fifty-one** years old"* ⇒ bà **43** lúc ấy |

🔴 Hai mươi năm, giữa hai chương viết cách nhau hai ngày, và **không note nào khoá tuổi bà**.

### Bên nào đứng vững hơn

Ch4 tự khớp với chính nó: bà cũng viết *"**twenty years** of this trade"*. Ở 51 thì bà vào nghề lúc 31 — hơi muộn nhưng được. Ở 31 thì bà vào nghề lúc **mười một**, và đã là môi giới đủ tầm để một famiglia thuê.

⚠️ **Và bà đã có **Akiko** chập chững cộng một thai nặng tám năm trước.** Ở 23 thì làm được; ở 43 thì tự nhiên hơn.

🔵 Nghiêng: **Ch2 là chỗ lạc**. Sửa *"twenty-three"* thành một câu về **hành động** thay vì về tuổi, hoặc chốt tuổi bà rồi sửa một phía.

⚠️ **Vượt quá chương này** ⇒ theo `check-continuity`, phần này bàn giao cho `check-conflicts`. Nhưng phạm vi hẹp: **hai dòng, hai file**.

## 🔴 H3 · Tờ **SINCE JANUARY** đã mười ba tháng hay hai mươi ba tháng?

> dòng 547 · *"It had been headed that for **thirteen months** by then"*

[[child-ch1-chapter-ban-20260925]] dòng 30 nói rõ tờ ấy là *"the shortest honest account of those **eight months**"* — tức tám tháng từ tháng Hai tới tháng Chín, và **tờ giấy bắt đầu từ tháng Giêng năm arc Brat**, lúc Tsuna **bảy**.

Từ tháng Giêng ấy tới tháng Mười Hai của Ch4 *(Tsuna 9)* là **hai mươi ba tháng**.

🔵 Và số mục thì khớp với hai mươi ba: 31 *(tháng Mười)* → 34 → 41 → 46 → **61**. Chỉ con số tháng là sai.

## 🟠 MEDIUM

### M1 · *"the ninth of January"* — Ch2 ghi mồng **tám**

Ch4 dòng 599: *"I have not done one thing without being asked since **the ninth of January**"*.
[[child-ch2-chapter-ban-20260925]] đặt Vindice ở **mồng tám** và cho cậu ký **ngay đêm đó**.

🔵 Hai lối: đổi thành *eighth* · hoặc giữ, và để nó có nghĩa là cậu ký **sau nửa đêm**, nhưng thế thì Ch2 phải nói ra.

### M2 · *"maybe two weeks"* thành **hơn tám tháng**, và không ai nhắc

[[child-ch3-chapter-ban-20260925]]: [[shouichi]] nói mẹ cậu bảo **khoảng hai tuần**. Ch4 cho bà đi từ giữa tháng Giêng tới ít nhất tháng Mười Một.

⚠️ Cảnh Shouichi ở 4.3 có sức nặng, nhưng **không ai trong chương gọi ra khoảng cách ấy**, và với một đứa tám tuổi thì hai tuần thành tám tháng là **chuyện lớn nhất năm của nó**.

🔵 Một câu là đủ, và nó làm cảnh ấy mạnh hơn chứ không yếu đi.

### M3 · *"four years and two months until Italy"* **khoá chặt** hơn vault cho phép

[[tuyen-xanxus]] khoá phá băng ở **13–15 tuổi**. Tsuna vừa tròn **9**. Bốn năm hai tháng ⇒ **13 tuổi vừa tròn**, tức **đúng đáy cửa sổ**.

⚠️ Không mâu thuẫn. Nhưng nó biến một **cửa sổ ba năm** thành **một ngày**, và nó làm việc ấy trong dòng áp chót của cả một arc, nơi người đọc nhớ nhất.

🔵 Hai lối: nới thành *"four years, perhaps six"* · hoặc **chốt** rằng phá băng ở đúng 13 và ghi vào [[tuyen-xanxus]].

## 🟡 LOW

**L1** Tỉ lệ đoạn thoại **0,164**, dưới sàn **17%** của thẻ đúng 0,6 điểm — **đúng rủi ro thẻ cảnh báo** cho một chương kể bằng thư. Tác giả 17,4.
**L2** Sự kiện mới cho delta: 🔴 **ba giây rưỡi** *(đo lõi tháng Mười, tăng nửa giây trong tám tháng)* · **quy tắc "no entry is to be made"** Ayame ký · Musashi từng không cứu được một **Ketsueki** năm bà **31** · Tomoko **"hai mươi năm trong nghề"** · lô băng tay và hệ ca kíp của Ban Kỷ luật.
**L3** ⚠️ Tiêu đề cột thứ tư — **`WITHOUT BEING ASKED`** — là **chữ của mình, không phải của Aurel**. Thẻ ghi rõ chỗ ấy nên để Aurel đặt. Đổi là sửa một dòng.

## ✅ Bảy nhóm — cái đã kiểm và **đạt**

| Nhóm | |
|---|---|
| **Timeline** | ⚠️ H1, H3, M1, M2. ✅ Còn lại khớp **rất chặt**: thư tới **28 tháng Ba** = đúng *"ba mươi mốt ngày sau"* của Ch3 · cắt báo *"mười một ngày sau sinh nhật, tuần thứ ba tháng Mười"* ⇒ sinh nhật ~7–10/10, khớp *"eight years old for less than a month"* ở Ch2 · đứa trẻ **11 tuổi**, bị lấy lúc **~3**, trốn **tám năm** — ba số này đóng kín |
| **Ranh giới biết** | ✅ 0 rò rỉ. 🔴 Chỗ nguy nhất của chương *(cậu **biết trước** Cradle)* xử đúng: nội tâm cho thấy cậu biết, **không cho thấy vì sao** |
| **Trạng thái nhân vật** | ✅ [[nagi]] 6→7 và giữ **Gen'ei** mười một phút · [[kyouya]] hơn năm mươi người và hệ ca kíp · [[aldo-ferri]] mười tháng, và *"lần đầu trong ba mươi hai năm có ai hỏi ý ông"* khớp [[aldo-ferri]] |
| **Luật thế giới** | ✅ Luật từ vựng **theo người nhận** lên trang đúng: Tomoko viết *Kohaku-sama* và *Ryokugyoku* từ châu Âu. ✅ Bảy nhà *"đáp lại một cuộc tấn công, không đáp lại một chỗ trống"* — cách đọc mới của [[fact-sanctuary]] và nó đứng |
| **Quan hệ** | ⚠️ H2. ✅ [[tsuna--tomoko]] chạy đúng note: lệch thông tin **đảo chiều**, và lá thư cuối là **lần đầu bà xin cậu một thứ** |
| **Canon** | ✅ [[mammon]] là **Arcobaleno bán tin**, và hoá đơn **bốn trăm tám mươi lire** là đúng nhân vật. ⛔ Người kể **không ám chỉ một chữ** về hoà hợp hai chiều — kiểm từng dòng cảnh 4.5 |
| **Hợp đồng nhánh** | ✅ 12 mục `forbid` sạch. Kiểm riêng: cậu **không đi, không sai, không sắp xếp** cả chương, và chỗ dễ lách nhất *(mạng lưới đền)* cậu **tự chặn trên trang** |

### ⛔ Và hai lằn can nặng nhất **đã giữ**

- **Lý do cậu không cứu Xanxus là cậu không đủ**, và nó là **một phép tính có số**: ba giây rưỡi, và thứ ở Palermo cần hàng phút. Không có một câu cao thượng nào trong cả cảnh.
- **Cậu vẫn không đếm tới hai con cáo.** [[ke-cuop-co-dau]] không bị trả.

---

# check-style

| | đo được | chỉ tiêu | tác giả |
|---|---|---|---|
| số từ | **8.242** | 8.000–13.000 | 7.551 |
| câu trung vị | **11** | 10–14 | 11 |
| câu ≥35 từ | **8,2 %** | ≤9 | 4,0 |
| đoạn TB | **32,6** | 30–40 | 36,1 |
| `?` /10k | **34,0** | ≥30 | 49,8 |
| `!` /10k | **6,1** | ≥5 | 13,2 |
| *nghiêng* /10k | **173,5** | ≥60 | 109,1 |
| `…` /10k | **14,6** | ≥12 | 23,3 |
| thuật ngữ /1000 | **7,16** | ≥7 | 13,19 |
| `had` /10k | **75,2** | ≤210 | 166,3 |
| tỉ lệ đoạn thoại | ⚠️ **0,164** | 17–20 *(thẻ)* | 0,174 |

⚠️ **Bốn chỉ tiêu sát sàn:** số từ 8.242/8.000 · câu dài 8,2/9 · thuật ngữ 7,16/7 · `!` 6,1/5.

🔵 **Và một chỉ số đáng chú ý:** *nghiêng* **173,5/10k**, gấp rưỡi mốc tác giả và **cao nhất cả nhánh**. Đó là hệ quả trực tiếp của việc kể bằng thư — thư in nghiêng. Không phải lỗi, nhưng nếu chương sau cũng vậy thì nó thành một tật.

## 🔴 T1 · Đuổi theo `term1k` **đẩy mình vi phạm luật từ vựng**

Phép kiểm chữ nghiêng bắt **ba chỗ** nội tâm Tsuna gọi **nguyên tố** bằng hệ Nhật: `Hogo` · `Ketsueki` · `Chiyu` · `Getsufuji` · `Gen'ei`.

🔴 **Cả ba nằm trong khối mình vừa thêm ở lượt sửa để kéo mật độ thuật ngữ lên.**

Đó không phải tai nạn. Bảng thuật ngữ mà `chapter_gate` đếm **chứa cả hai hệ**, nên cách nhanh nhất để nâng `term1k` là rắc chữ Nhật — và nội tâm Tsuna **phải là hệ Ý**. Hai luật kéo ngược nhau, và luật đếm được thì thắng nếu không ai nhìn.

⚠️ **Đã xảy ra hai chương liền:** Ch3 nhét `Getsufuji` vào một câu để kéo số, Ch4 nhét năm chữ. Đã sửa cả hai lần.

🔵 **Cách chặn:** khi cần nâng `term1k`, nâng bằng **tường thuật ngôi ba trong lãnh thổ** hoặc **lời nhân vật Namimori**, không bao giờ bằng nội tâm Tsuna. Và chạy phép kiểm chữ nghiêng **sau mỗi lượt sửa số đo**, không phải chỉ một lần ở cuối.

## ⚠️ T2 · Lệch công cụ, lần thứ ba, cùng nguyên nhân

`ai_tells_check` báo câu dài **18,0%**; `chapter_gate` báo **8,2%**.

Nguyên nhân đã đo ở [[child-ch2-review-ban-20260925]] mục T1: `ai_tells_check` không tách đoạn trước khi tách câu, và regex bị chặn bởi dấu `*` đóng chữ nghiêng. Chương này có **157 đoạn nghiêng**, nhiều nhất cả nhánh, nên khoảng lệch cũng lớn nhất.

⇒ Dương tính giả, lần thứ ba. Sửa gốc vẫn thuộc về hệ thống.

## ✅ Đã sửa , 21/09/2026, Aurel chốt cả sáu

| | Đã làm |
|---|---|
| **H1** | Hai chỗ *eleven years* → **eight years**. Chương giờ dùng **tám** ở cả mười bốn chỗ |
| **H2** | Sửa ở **Ch2**, không ở Ch4: bỏ *"at twenty-three"* khỏi câu, giữ nguyên câu. Giờ nó nói về **hành động** chứ không về tuổi, và tuổi bà **vẫn để ngỏ** thay vì bị chốt bởi một mệnh đề phụ |
| **H3** | *thirteen months* → **twenty-three months** |
| **M1** | *ninth of January* → **eighth** |
| **M2** | Thêm bốn nhịp vào cảnh Shouichi: cậu ta tự nói ra *"She said two weeks. In January. She said two weeks and it's September"*, và *"tám tháng rồi và chỉ mình cháu đang đếm, mà cháu tám tuổi"* |
| **M3** | *four years and two months* → **four years. It may be six** , trả lại cửa sổ 13–15 |

🔴 **Và H2 đụng vào một chương đang `status: final`.** Đã chạy lại **toàn bộ cổng của Ch2**: 10/10, luật cứng sạch, chữ nghiêng sạch, tỉ lệ thoại 0,207 không đổi.

🔵 **M2 có một tác dụng phụ đúng chiều:** thêm thoại vào cảnh Shouichi kéo tỉ lệ đoạn thoại **0,164 → 0,176**, tức **vào trong** cửa sổ 17,20% của thẻ. Lỗi L1 tự đóng.

### Số đo sau khi sửa

| | trước | sau |
|---|---|---|
| số từ | 8.242 | **8.384** |
| câu ≥35 từ | 8,2 % | **8,0 %** |
| thuật ngữ /1000 | 7,16 | **7,04** |
| **tỉ lệ đoạn thoại** | ⚠️ 0,164 | ✅ **0,176** |
| `chapter_gate` | 10/10 | **10/10** |
| `pov_leak_check` | 0 | **0** |
| `ai_tells_check` | 0 vi phạm cứng | **0 vi phạm cứng** |

## Bàn giao

- **Chưa sửa gì trong chương.**
- 🔴 `finalize-chapter` **chưa chạy được** khi còn H1, H2, H3 mở.
- ⚠️ **H2 vượt ra ngoài chương** *(hai dòng, hai file)* ⇒ `check-conflicts`. H1 và H3 nằm gọn trong chương này.
