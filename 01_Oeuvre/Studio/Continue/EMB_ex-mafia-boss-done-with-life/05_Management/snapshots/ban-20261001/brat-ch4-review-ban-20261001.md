---
id: note.EMB.brat-ch4-review-ban-20261001
type: note
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-10-01
archived_note: "Ban luu tru 01/10/2026: Aurel quyet lam lai ca du an EMB lan ba, tu khung nam arc (emb-lam-lai-lan-ba). Giu de tra; khong phai canon, khong phai mau giong."
aliases: ["review Ch4 ban 01-10", "check-continuity Ch4 ban 01-10", "chin phat hien Ch4 ban 01-10", "so do chuong 4 Brat ban 01-10", "duong tinh gia pov_leak ban 01-10", "thoai chiem 39 phan tram ban 01-10"]
related: ["[[brat-ch4-chapter-ban-20261001]]", "[[brat-ch4-the-canh-ban-20261001]]", "[[brat-ch3-review-ban-20261001]]", "[[targets]]", "[[hard-rules]]", "[[emb-chot-may-nhan-loi-sky]]", "[[emb-chot-danh-xung-theo-lanh-tho]]", "[[chi-chu-nhan-thay-cao]]", "[[mammon]]", "[[xanxus]]", "[[Viper]]"]
source:
  type: inference
  ref: "Chay cong 19/09/2026: chapter_gate, ai_tells_check, style_metrics, pov_leak_check (tach ba POV), vault_doctor."
authority: ai
confidence: 0.9
always_load: false
load_for: [reviewer]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-01
---

# Ch4 — sổ đo

## Cổng

| Cổng | |
|---|---|
| `chapter_gate` | ✅ luật cứng 4/4 · **10/10 chỉ tiêu** |
| `pov_leak_check` *(tách ba POV)* | ✅ **0 rò rỉ** cả ba |
| `style_metrics` | ✅ cả hai chỉ tiêu · thuật ngữ **8,26/1000** |
| `vault_doctor --include-fiction` | ✅ 0 lỗi |
| `ai_tells_check` | ⚠️ một cảnh báo còn lại — xem §dưới |

| Chỉ số | Ch4 | Chỉ tiêu | Tác giả |
|---|---|---|---|
| số từ | **9.411** | 8.000–13.000 | 7.551 |
| câu trung vị | **10** | 10–14 | 11 |
| câu dài ≥35 từ | 7,7 % | ≤ 9 | 4,0 |
| đoạn TB | 30,0 | 30–40 | 36,1 |
| `?` /10k | 35,1 | ≥ 30 | 49,8 |
| `!` /10k | 5,3 | ≥ 5 | 13,2 |
| *nghiêng* /10k | 90,3 | ≥ 60 | 109,1 |
| `…` /10k | 31,9 | ≥ 12 | 23,3 |
| thuật ngữ /1000 | 7,23 | ≥ 7 | 13,19 |
| `had` /10k | 182,8 | ≤ 210 | 166,3 |

## 🔴 Bản nháp đầu hỏng ở đâu — và nó lặp đúng lỗi Ch3

Bản nháp đầu ra **6.159 từ**, vỡ luật cứng *(1 gạch ngang, 5 cụm cấm, 2 phủ định cụt)*, và **0 chấm lửng**. Đúng cái bẫy Ch3 đã sập, và mình sập lại.

Đo tách hai tầng thì ra **cùng một hình với Ch3, nặng hơn**:

| | Ch4 bản nháp | Ch3 lúc hỏng | tác giả P2 |
|---|---|---|---|
| **tường thuật** trung vị | **11** | 11 | 11 |
| **thoại** trung vị | 🔴 **6** | 5 | **9** |
| % câu là thoại | 🔴 **39,0** | 29,3 | **17,4** |

→ Văn tường thuật **không bao giờ là vấn đề**. Cả hai lần, cái lệch nằm trọn trong **thoại**: câu thoại quá cụt, và **quá nhiều thoại**.

✅ **Đòn bẩy hiệu quả nhất, đo được:** chuyển bớt đối đáp thành **tường thuật**. Nó hạ tỉ lệ thoại, nâng câu trung vị, nâng đoạn trung bình, và tăng số từ — bốn chỉ số bằng một động tác. Cảnh luật sư và đoạn mở của Ayame đã chuyển như thế.

## ⚠️ Cảnh báo `ai_tells` còn lại — **đã đo, không phải lỗi văn**

`ai_tells_check` báo câu dài **11,5 %**; `chapter_gate` đo **7,7 %**. Tách ra:

| | |
|---|---|
| Tổng nó đếm là "câu dài" | **63** |
| Trong đó **gộp bởi `…`** | 7 |
| Trong đó **gộp từ ≥2 lượt thoại** | 7 |
| **Câu dài thật** | **49** → ≈ **8,7 %** |

→ 14/63 là **hiện vật của bộ tách câu** *(nó tách trên toàn văn bản và không tách ở `…`)*. Trừ đi thì **8,7 %**, và `chapter_gate` ra **7,7 %**. **Cả hai dưới trần 9 %.**

⚠️ Chương này dùng 30 chấm lửng, nên sai số của `ai_tells` ở đây **lớn hơn Ch3**. Xem [[brat-ch3-review-ban-20261001]] §lỗi công cụ.

## 🐛 Dương tính giả của `pov_leak_check` — instance cụ thể

Chạy khối POV [[kyouya]] thì ra **1 phát hiện HIGH** cho [[chi-chu-nhan-thay-cao]].

**Sai.** Nó khớp vào tên secret nằm trong **`related:` của frontmatter**, không phải trong văn xuôi. Chứng minh: thay bằng frontmatter trung tính thì **0 phát hiện**, và văn xuôi khối Kyouya có **0 lần** nhắc con cáo bằng bất kỳ tên nào.

→ Đây là lỗi đã ghi từ Ch2 *(frontmatter bị cả hai cổng quét)*, và giờ có một ca cụ thể: **link `related` tới một secret sẽ tự tố chính nó**.

## Cái chương làm

| | |
|---|---|
| 🔴 **Bậc 3 — bốc đồng** | và phép đo là **mảnh giấy**. Một đứa bỏ nhà đi thì không để lại giấy; một đứa **biết mình sẽ được nhớ** thì có. Năm bản nháp, và bản thứ tư bị vứt vì kết bằng *"I am sorry to be a burden"* |
| **Mây lên trang** | viết là **giấu**, không phải nén — [[emb-chot-may-nhan-loi-sky]]. ⛔ Không mất gì |
| 🔴 **Nợ Ch3 đã trả** | [[bond-bam-vao-cay]] gieo ở 4.2: Kyouya tỉnh dậy lúc 00:04 và biết *"con vật nhỏ đang rời lãnh thổ"*. Cậu ta **không** biết vì sao mình cảm được |
| **Đổi từ vựng** | 4.1–4.2 hệ Nhật, 4.3 trở đi **tiếng Anh** — [[emb-chot-danh-xung-theo-lanh-tho]]. Nội tâm Tsuna vẫn hệ Ý, đúng ngoại lệ đã chốt |
| **Mammon thấy trước, tra sổ sau** | đúng thứ tự cổng 1. Và **nước mũi giữ nguyên** |
| 🔴 **Xanxus** | ~17, **không một vết sẹo**, và ông mất hứng thú với Tsuna như một nghi phạm đúng lúc ông thấy **một Cloud** |

**Thêm một thứ chương tự sinh ra:** Tsuna tới Ý vì **đứa trẻ thứ năm mươi hai**. Sổ nhập của Estraneo ghi 52; danh sách sang Mie có 51. Cậu **không vào gặp con bé**, vì *"bạn không được quyền xin tha thứ từ một người bạn chưa từng gặp"* — và chính vì nán lại cho một đứa trẻ mà cậu bị bắt gặp.

## Còn lệch so với tác giả — ghi lại, không chữa

**Tỉ lệ thoại 24 %** *(tác giả 17,4)*, và **thoại trung vị 8** *(tác giả 9)*. Đã kéo từ 39 % và 6. Chữa tiếp là cắt cảnh.


---

# 🔍 check-continuity — chạy 19/09/2026

> ⛔ **Chỉ đọc. Không sửa một chữ nào trong chương.** Quyết định sửa hay giữ là của Aurel.

**Cổng cơ học:** `pov_leak_check` tách ba POV → **0 rò rỉ** *(một HIGH ở khối Kyouya đã chứng minh là dương tính giả của frontmatter — xem §trên)*.

Bảy nhóm, không bỏ nhóm nào. **Chín phát hiện.**

## ✅ Ba HIGH — **đã sửa 19/09**, Aurel chốt

| | Trước | Sau |
|---|---|---|
| **H1** | *"three of them **in one week last winter**"* | *"three of them **in one night, the winter before last**"* |
| **H2** | *"a **Gen'ei of twelve** does not listen"* | *"Nagi would have been **asleep for an hour**, with a Gen'ei still running slowly over the ceiling above her futon, because she could not yet put one down on purpose"* |
| **H3** | `🔴` giữa văn xuôi ở dòng 140 | xoá |

🔵 **M6 đi kèm H1**, vì cả hai nằm trong **cùng một mệnh đề** — sửa H1 mà để *"last winter"* lại thì vô lý. **M4, M5, L7–L9 vẫn mở.**

✅ **Quét lại ký hiệu trên cả bốn chương:** Ch1 **0** · Ch2 **0** · Ch3 **0** · Ch4 **0**. Ch4 là chương duy nhất từng dính.

✅ **Chạy lại toàn bộ cổng sau khi sửa:** `chapter_gate` **10/10**, luật cứng sạch · `pov_leak_check` ba POV **0 · 0 · 0** · `style_metrics` đạt · `ai_tells` chỉ còn cảnh báo câu dài đã giải thích ở §trên.

---

## 🔴 HIGH — bản ghi gốc

### H1 — Cơn trôi dạt: **"một đêm"** ở Ch1, **"một tuần"** ở Ch4

| | |
|---|---|
| **Ch4** cảnh 4.1, Ayame | *"You had **three of them in one week** last winter."* |
| **Ch1** *(đã `final`)*, Gen'ichi | *"In December your grandson lost consciousness **three times between dusk and dawn**. Four minutes, then eleven, then twenty."* |
| **Ch1** lần nữa | *"Three episodes of unexplained loss of consciousness **in one night** in December, and none in the five months since."* |
| **Ch1** lần nữa | *"Sawada-kun. In December you were unwell **three times in one night**."* |

⚠️ Ch1 nói **một đêm** ít nhất **bốn lần**, và toàn bộ chẩn đoán của Gen'ichi dựng trên chỗ đó *(bốn phút → mười một → hai mươi, "lengthening in a straight line")*. **"Một tuần" phá cái đó.**

🔵 **Mức nghiêm trọng thật:** Ch1 là chương đã chốt và đã merge. Ch4 là chương sai.

### H2 — Tuổi [[nagi]]: chương viết **mười hai**, hồ sơ nói **bốn hoặc năm**

| | |
|---|---|
| **Ch4** cảnh 4.3 | *"Nagi would be doing the thing where she pretended to study… because a **Gen'ei of twelve** does not listen."* |
| **[[nagi]]** | *"Tuổi — nhỏ hơn Tsuna **vài tuổi** → khoảng **3–4** khi Tsuna sáu."* |

→ Tsuna bảy ở Ch4, nên Nagi **4–5**. Không phải mười hai.

⚠️ Và nó kéo theo: *"pretended to study"* cũng sai lứa.

### H3 — 🔴 **Một dấu `🔴` lọt vào thân truyện**

Dòng 140 của chương, giữa văn xuôi:

> *"**🔴** He knew exactly what the house would do with it. Grandmother would go white and then very calm."*

Đây là **ký hiệu ghi chú của AI** rơi vào bản văn. ⛔ Không cổng nào bắt được: `chapter_gate` không kiểm emoji, `ai_tells_check` không kiểm, `pov_leak_check` không kiểm.

🔵 **Đáng thành luật mới:** thêm một phép kiểm emoji ký hiệu *(🔴 🔵 ⚠️ ⛔ ✅)* trong thân chương.

## 🟡 MEDIUM

### M4 — Xưng hô Indra trong mảnh giấy

| | |
|---|---|
| **Ch4**, mảnh giấy | *"If you send **Seiran-san** I will be very embarrassed in front of foreigners."* |
| **Ch2** *(đã `final`)* | *"That got her attention. He almost never used it. **In the house she was Indra-san**, and the ritual name was for the shrine and for formal rooms."* |

→ Mảnh giấy để lại cho người nhà là **bối cảnh trong nhà**. Theo Ch2 thì phải là **Indra-san**.

🔵 Phản biện có thể có: mảnh giấy là văn bản, và văn bản trang trọng hơn lời nói. Nếu Aurel thấy vậy thì **giữ**, và nên ghi ngoại lệ ấy vào [[indra]].

### M5 — Tuổi [[musashi]] **74** chưa note nào có

**Ch4:** *"**She is seventy-four**, he thought. She is a Gen'ei of the Sawada, she has held this shrine for fifty years…"*

Không có trong `musashi.md`, `tuoi-va-moc`, hay `Timeline/master.md`.

⚠️ [[tuoi-va-moc]] §4 **cho phép** chương tự định — *"chương nào cần thì chương đó tự định, rồi ghi ngược lại vào master"*. Nên đây **không phải lỗi**, nhưng **vế ghi ngược lại chưa làm**. Phải vào delta Ch4.

### M6 — *"last winter"* trỏ về **hai mùa đông trước**

Dựng lại mốc: [[le-cuoi-cao]] + đêm trôi dạt = **tháng Mười Hai, Tsuna 6**. Ch1 = tháng Năm *(năm sau)*. Sinh nhật 7 = tháng Mười. Ch3 = **tuần cuối tháng Mười Hai**. Ch4 = *"eleven days since a wall above a river"* → **đầu tháng Giêng**.

→ Đứng ở tháng Giêng, **mùa đông "vừa rồi" là mùa đông đang diễn ra** *(tháng Mười Hai của Ch3)*. Đêm trôi dạt là **mùa đông trước nữa**.

🔵 Sửa cùng H1 thì gọn: *"three of them in one night, the winter before last."*

## 🔵 LOW · cần Aurel phán

### L7 — Tuyến Elena và `forbid` #2

[[aurel-main]] `forbid` cấm *"viết Tsuna như người tốt bụng"*.

Ch4 cho cậu vượt nửa địa cầu vì một đứa trẻ. **Mình cho là không phạm**, vì chương dựng nó thành **sửa một phép đếm sai của chính cậu**, và vì cậu **từ chối vào gặp con bé**:

> *"You do not get to be forgiven by somebody you have not met. That's not what she's for."*

⚠️ Nhưng đó là **một lằn can Aurel đặt ra**, nên gọi là *"mình cho là không phạm"* chứ không phải *"đạt"*.

### L8 — Chiếc áo khoác xám đã bị vứt

**Ch4:** *"He threw the coat away at Vercelli, because it was a good coat and good coats are memorable."*

Đó là **chiếc áo Grandmother bắt cậu mặc ở Ch3** *("Take the grey coat. The good one, not the one you like.")*. Không phải lỗi — nhưng **các chương sau không được cho nó xuất hiện lại**, và Ch5 có thể muốn dùng việc cậu về nhà **không có nó**.

### L9 — [[chi-chu-nhan-thay-cao]] **chưa liệt kê Mammon**

`pov_leak_check` cảnh báo *"3 secret không liệt kê POV này"*. Và Ch4 vừa cho **Mammon nhìn thấy con cáo**, tức secret này phải chuyển họ sang `known_by`.

⚠️ Đã ghi sẵn ở [[brat-ch4-the-canh-ban-20261001]] cổng 2. **Phải vào delta Ch4** — nếu quên thì mọi cảnh Varia ở Ch5 mất bảo vệ.

## ✅ Các nhóm sạch

| Nhóm | |
|---|---|
| **Bí mật** | [[567-ke-hoach]] không rò *(chữ "the list" ở 4.3 là danh sách trẻ em, không phải kế hoạch)* · [[tsuna-am-tinh-tren-giay]] không nhắc · Xanxus **không** biết cậu là Sky |
| **Luật thế giới** | [[emb-chot-danh-xung-theo-lanh-tho]] giữ đúng: **không một nhân vật Namimori nào nói "Flame"** ở 4.1–4.2, kiểm bằng script · [[emb-chot-may-nhan-loi-sky]] không ai biết |
| **Canon** | Xanxus ~17 không sẹo ✓ · Mammon they/them ✓ · đội hình Rain-Storm-Lightning-Arcobaleno khớp Squalo/Bel/Levi/Mammon ✓ |
| **Hợp đồng nhánh** | `forbid` #3 *(Tsuna vào danh sách người được cứu)* — **không phạm**, cậu tự thoát · #7 *(dựng cảnh bên trong hành động lớn)* — **không phạm**, cả điều tra lẫn cuộc rượt đều kể bằng mép · #8 em dash 0 ✓ |

## 🔁 Cùng một loại lỗi lặp qua các chương

[[brat-ch3-review-ban-20261001]] ghi lỗi Ch3 là **hệ gọi tên**; lượt này Ch3 lại lộ một lỗi **dữ kiện** *(Indra bị gọi là Cloud trong khi bà là Yasuragi)*, đã sửa hôm nay.

🔴 **Cả ba lần đều cùng một gốc: mình viết một thuộc tính nhân vật từ trí nhớ thay vì tra hồ sơ.** Đề xuất cho mẫu thẻ cảnh: thêm một **bảng dàn nhân vật** liệt kê sẵn `flame` và `tuổi` của mọi người sẽ lên trang, để lúc viết không phải nhớ.


---

## 🔴 crosscheck-canon 20/09/2026 — **tuyến Varia không ai là người lớn**

Ba trang canon mới dựng *([[Superbia-Squalo]] · [[Belphegor]] · [[Levi-A-Than]])* cho tuổi ở mốc Varia arc. Trừ theo đúng neo đã có *([[xanxus]] ~17 khi Tsuna 7 ⇒ chênh mười tuổi)*, bảng đầy đủ ở [[tuoi-va-moc]]:

**Levi 16 · Squalo 15 · Belphegor 9.**

✅ **Aurel chốt: để tuổi thật lộ ra, không tuyên bố con số.**

🔴 Sửa: *"four adults behind him"* → *"four people standing behind him"*, kèm đoạn Tsuna tự nhận ra vì sao đội hình ấy làm cậu khó chịu — *"A Rain with a sword and a **schoolboy's haircut**… A Storm small enough that the coat had been taken in at the shoulders"* — và đóng bằng chỗ đắt nhất:

> *"He had spent sixty years in an organisation that did this, and he had told himself the things he signed were about **somebody else's children**."*

Gate sau khi sửa: **10/10**, luật cứng sạch, POV 0·0·0.
