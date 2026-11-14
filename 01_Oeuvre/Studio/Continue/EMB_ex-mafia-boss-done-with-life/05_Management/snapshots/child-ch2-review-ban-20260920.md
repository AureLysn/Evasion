---
id: chapter.EMB.child-ch2-review-ban-20260920
type: chapter
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-09-22
archived_note: "Review cua ban 20/09 Child Ch2. Chuong da viet lai 22/09 theo emb-chot-bermuda-an-toi."
language: vi
arc: child
pov: tsuna
aliases: ["review Child Ch2 ban 20/09", "check-continuity Child Ch2", "check-style Child Ch2", "loi thu tu bon lan hoi"]
related: ["[[child-ch2-chapter-ban-20260925]]", "[[child-ch2-the-canh-ban-20260925]]", "[[tomoko]]", "[[aldo-ferri]]", "[[master]]", "[[tuoi-va-moc]]", "[[child-dan-y-ban-20260925]]", "[[fact-vendicare-giu-so]]", "[[hook-dua-tre-saint-exavier]]", "[[targets]]", "[[hard-rules]]"]
source:
  type: measured
  ref: "Do 20/09/2026 bang chapter_gate.py, style_metrics.py, pov_leak_check.py, ai_tells_check.py, cong cac phep grep tu viet."
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, review, k/note, p/personal]
last_updated: 2026-09-20
---

# Child Ch2 — check-continuity và check-style

## Cổng

| | |
|---|---|
| `chapter_gate` | **10/10 chỉ tiêu**, luật cứng **sạch** |
| `pov_leak_check --scene --json` | **9 secret đối chiếu, 0 phát hiện**, exit 0 |
| `style_metrics --write` | 9.458 từ · thuật ngữ **7,82** · tỉ lệ đoạn thoại **0,217** |
| `ai_tells_check` | ⚠️ **1 cảnh báo**, và nó là lỗi công cụ — xem T1 |
| Phép kiểm chữ nghiêng | 125 đoạn nghiêng · 4 có hệ Nhật · **cả 4 là chức vị**, ngoại lệ ③/③b |

---

# check-continuity — **2 HIGH · 4 MEDIUM · 4 LOW**

## 🔴 H1 · Thứ tự bốn lần hỏi trong sổ **mâu thuẫn với chính nó**, và với [[tomoko]]

### Chương viết gì

> *"There were four enquiries in eight years."*
>
> *"The first three were the family. **Year one, year two, year four**."*
>
> *"The fourth enquiry was dated **eight years ago, in January**, and it had no name against it."*

### Hai lỗi chồng lên nhau

**① Người thứ tư lại là người sớm nhất.** Vụ bắt cóc cách đây ~8 năm. Nên *year one · year two · year four* rơi vào **7 · 6 · 4 năm trước**. Lần hỏi của [[tomoko]] ở mốc **8 năm trước** là **sớm nhất trong cả bốn**, mà chương xếp nó **cuối bảng** và gọi ba cái kia là *"the first three"*.

**② Bà hỏi trước khi đứa trẻ bị bắt.** [[tomoko]] khoá trình tự:

> *"Chạy trốn: bà **đang mang thai nặng**… **Sau đó** có tin nhà Saint-Exavier bị tấn công và **đứa trẻ mất tích**."*

Bà chạy **tháng Một 1992**. Vụ bắt cóc xảy ra **sau đó**. Nên một lần hỏi đề ngày *"tháng Một, tám năm trước"* là hỏi về một đứa trẻ **chưa bị bắt**.

### 🔴 Vì sao nó không phải chuyện nhỏ

Cổng 2.3 của [[child-ch2-the-canh-ban-20260925]] dựng **cả Ch3** trên dòng ấy: bà trả nợ, và Tsuna không phải thuyết phục bà. Nếu ngày tháng không đứng thì Ch3 mất chân.

🔵 **Ba lối, và mình không chọn:**

| | |
|---|---|
| **(a)** | Nới khoảng giữa hai việc: bà chạy tháng Một, tin tới **vài tuần sau**, bà hỏi **cuối tháng Hai**. Vẫn *"tám năm trước"*, vẫn cùng mùa đông ấy, và bà thành **người hỏi đầu tiên** — chương phải đổi *"the first three"* thành trật tự đúng |
| **(b)** | Dời lần hỏi của bà **muộn hơn** *(vd. bảy năm trước)*. Giữ nguyên trật tự bảng, mất cái cộng hưởng "cùng tháng bà tới Namimori" |
| **(c)** | Bảng **không xếp theo thời gian** mà theo hạng — cột `NOTE` của một chủ nợ có thể xếp theo giá trị lời đề nghị. Rẻ nhất, và nó **giải thích được vì sao lời đề nghị lớn nhất nằm cuối** |

⚠️ Mình nghiêng **(c) cộng một nửa của (a)**: bảng xếp theo hạng, và bà hỏi muộn hơn tháng Một một chút. Nhưng đây là ngày tháng, và ngày tháng trong dự án này đã sai bốn lần, nên Aurel chốt.

## 🔴 H2 · *"eight years old for six weeks"* đẩy sinh nhật Tsuna sang **tháng Chín**

### Chương viết gì

> *"He had been **eight years old for six weeks** by then…"*

### Vault khoá gì

| Nguồn | |
|---|---|
| [[master]] dòng 126 | *"🔴 **tháng Mười** — **Tsuna tròn 8**"* |
| [[tuoi-va-moc]] dòng 121 | *"**Tsuna tròn 7** — **tháng Mười**"* |

### Số học

[[child-ch1-chapter-ban-20260925]] đặt lá thư ở **đêm Chủ Nhật sau cuộc bỏ phiếu**: đơn tới **22 tháng Mười** → phiên xét **ba đêm sau** → determination **thứ Năm kế** → bỏ phiếu **Chủ Nhật** → thư đi **đêm đó**. Tức **~1 tháng Mười Một**.

Lùi sáu tuần từ đó ra **~20 tháng Chín**.

→ Tối đa dùng được là **bốn tuần**, và hợp lý nhất là **hai tới ba**.

🔵 Sửa một chữ. Nhưng nó là **một con số**, và trong dự án này con số là thứ hỏng nhiều nhất, nên nó ở mức HIGH chứ không phải LOW.

⚠️ [[tuoi-va-moc]] có nói *"chương nào cần thì chương đó tự định"* — nhưng câu ấy nói về **ngày trong tháng**, không cho phép đẩy sang tháng khác.

## 🟠 MEDIUM

### M1 · *"Nothing happened for four weeks"* — nhưng trả lời tới sau **~mười tuần**

Dòng 29 nói phẳng **bốn tuần**. Chuỗi cảnh sau đó chạy **tháng Mười Một → đầu tháng Mười Hai → 14 tháng Mười Hai → 8 tháng Giêng**.

Người đọc sẽ hiểu là đến tuần thứ tư thì có chuyện. Không có.

🔵 Đề xuất: đổi thành *"Nothing happened for a long time"*, hoặc nói thẳng **mười tuần** và để chính con số ấy làm việc — cái chờ dài hơn cậu tính là một dữ kiện về cậu, không phải một lỗi.

### M2 · Ferri biết **có bảy chữ** ở tuần thứ tư; note nói ông học chúng **mùa đông thứ hai**

| | |
|---|---|
| Chương dòng 37 | *"He also asked, in his fourth week, **which of the seven words applied to him**"* |
| [[aldo-ferri]] dòng 74 | *"Ông học **bảy chữ** vào **mùa đông thứ hai**, từ [[ayame]], trên một quyển sổ… nhầm suốt một năm rồi thôi không nhầm nữa"* |

Hỏi *"cái nào là tôi"* không hẳn là **học** bảy chữ. Nhưng nó cho thấy ông đã biết có bảy, ở mùa đông **thứ nhất**.

🔵 Hai lối: đổi lời ông thành *"which of those words"* mà không nêu số · hoặc sửa note thành *ông nghe thấy bảy chữ ngay mùa đông đầu và mất tới mùa đông thứ hai mới dùng đúng*, thật ra khớp với vế *"nhầm suốt một năm"* hơn.

### M3 · Chương **không trả lời câu hỏi hiển nhiên nhất**

Sổ ghi rõ **[[xoa-so-estraneo|nhà Estraneo]]** là bên đã lấy đứa trẻ. Và Tsuna **đã xoá sổ nhà ấy mười tám tháng trước** và đưa **năm mươi mốt đứa trẻ** ra.

→ Người đọc sẽ hỏi ngay, trong cùng một nhịp thở: **vậy sao nó không nằm trong năm mươi mốt?**

⚠️ Đây **không phải mâu thuẫn** — [[child-dan-y-ban-20260925]] cổng 4 có sẵn đáp án: *"sổ chưa bao giờ được mở. Nó không nằm trong sổ nhập Estraneo. Không ai từng đếm nó, một lần nào."*

🔴 Nhưng chương **không nói câu ấy ra**, và một khoảng trống ở đúng chỗ ấy **đọc như một lỗi**. Cần một dòng, trong cảnh 2.5, ngay sau khi cậu đọc cột `BY`.

### M4 · *"four years and some months until Italy"* đụng mốc Cradle

| Nguồn | |
|---|---|
| [[child-dan-y-ban-20260925]] dòng 40 | *"tin **Cradle** nổ ra ở Ý khi Tsuna **~9**, **cuối arc**"* |
| [[xanxus]] dòng 34 | *"Cradle, Tsuna **~9**"* |
| [[emb-chot-tuyen-varia]] dòng 87 | *"Cradle **giữ nguyên mốc** ~Tsuna 9, không lùi"* |

Chương đóng bằng **bốn năm lẻ** ⇒ Tsuna ~12,5. Cái đó **không phải Cradle**; nó rơi vào cửa sổ **13–15** mà [[tuyen-xanxus]] khoá cho việc phá băng.

🔴 Nhưng arc này **đóng bằng tin Cradle**, và đoạn kết nói về *"biết một thứ và không động"*. Người đọc sẽ đọc *"Italy"* là **Cradle**, và thấy con số sai một cách khó chịu.

🔵 Hai lối: bỏ con số *("It is not very long until Italy")* · hoặc giữ con số và **nói rõ nó không phải Cradle**, nghĩa là chốt luôn mốc phá băng ở ~12,5, sớm hơn cửa sổ đã khoá.

## 🟡 LOW

**L1** [[musashi]] sinh **14 tháng Mười Hai** — note chỉ khoá **tháng**. Sự kiện mới, vào delta.
**L2** [[kawahira]] **bảo cậu đo lõi hằng tháng** — khớp [[tsuna-dam-phan-kawahira]] *(cậu xin ổn định lõi)*, nhưng là sự kiện mới. Vào delta.
**L3** [[nagi]] để **Gen'ei** bật lên **không chủ ý** vào tháng Giêng, sau khi tháng Chín đã kéo được **có chủ ý cho khán giả**. Đọc như thụt lùi. Bào chữa được *(mối đe doạ thật, không phải bài tập)*, nhưng nên là **một lựa chọn**, không phải tai nạn.
**L4** [[ban-ky-luat-namimori]] **31 → 40 người** trong hai tháng. Hợp lý, vào delta.

## ✅ Bảy nhóm — cái đã kiểm và **đạt**

| Nhóm | |
|---|---|
| **Timeline** | ⚠️ H1, H2, M1, M4. ✅ Còn lại khớp: **soulscape chín bước** *(đúng [[brat-ch3-chapter-ban-20261001]], 11 → 9)* · Musashi **75** sau tháng Mười Hai · Kyouya **10** · Nagi **6** |
| **Ranh giới biết** | ✅ 0 rò rỉ, 9 secret đối chiếu. Nội dung **điều khoản hai** của lá thư cũ được nhắc **ba lần và không mở một chữ** — đúng lằn can [[hook-bermuda-to-mo]] |
| **Trạng thái nhân vật** | ⚠️ M2, L3. ✅ Ayame sẹo trái và thói vén tay áo · Genichi không lên trang, đúng · Ferri giữ sổ sách đền |
| **Luật thế giới** | ✅ [[fact-sanctuary]] tìm ra **chiều thứ tư**: hợp đồng dựng Vindice làm **hệ quả**, không có chữ nào cho Vindice làm **người tới**. ✅ [[fact-vendicare-giu-so]] giữ đúng lằn can *"sổ chủ nợ, không phải thư viện"* — một tờ, sáu cột, không chú giải |
| **Quan hệ** | ✅ Musashi gọi **Masaya**. Ban Kỷ luật gọi Kyouya **Getsufuji**. ✅ [[genichi--tsuna]] không bị đụng tới, đúng |
| **Canon** | ✅ Núm vú đá, **không còn Flame** · giọng Vindice sai trọng âm *(tương đương chi tiết katakana)* · thương lượng được. ⚠️ Người đưa tin **đi bộ** thay vì warp; canon cho họ warp, nhưng cũng nói họ **phụ thuộc Bermuda cấp Flame**, nên tiết kiệm là hợp lý. Là một lựa chọn, không phải lỗi |
| **Hợp đồng nhánh** | ✅ 12 mục `forbid` sạch. Kiểm riêng **#2**: cậu **thừa nhận mình muốn bà đi**, và tự đặt phép thử *"nếu bà cất vào ngăn kéo thì tôi im suốt đời"*. Đó là kế toán, không phải lòng tốt |

---

# check-style

## Số đo

| | đo được | chỉ tiêu | tác giả |
|---|---|---|---|
| số từ | **9.458** | 8.000–13.000 | 7.551 |
| câu trung vị | **13** | 10–14 | 11 |
| câu ≥35 từ | **7,3 %** | ≤9 | 4,0 |
| đoạn TB | **35,7** | 30–40 | 36,1 |
| `?` /10k | **33,0** | ≥30 | 49,8 |
| `!` /10k | **6,2** | ≥5 | 13,2 |
| *nghiêng* /10k | **124,8** | ≥60 | 109,1 |
| `…` /10k | **12,4** | ≥12 | 23,3 |
| thuật ngữ /1000 | **7,43** | ≥7 | 13,19 |
| `had` /10k | **105,2** | ≤210 | 166,3 |
| tỉ lệ đoạn thoại | **0,217** | ≤0,24 *(tự đặt)* | 0,174 |

🔵 **Tỉ lệ thoại đi đúng chiều bốn chương liền:** 28,8 → 25,0 → 23,0 → **21,7**. Mốc tác giả 17,4.

⚠️ **Ba chỉ tiêu sát sàn:** `…` 12,4/12 · thuật ngữ 7,43/7 · `!` 6,2/5. Một lượt sửa văn xuôi nào cũng có thể đẩy chúng xuống dưới. Chạy lại cổng sau **mọi** lần sửa, kể cả sửa một câu.

## 🔴 T1 · `ai_tells_check` báo **17,2 %** câu dài trong khi `chapter_gate` báo **7,3 %** — và lần này đo được **vì sao**

[[targets]] đã ghi hai công cụ lệch nhau *(8,7 so với 11,1 trên P1 Ch3)*. Ở chương này khoảng lệch là **9,9 điểm**, và nguyên nhân đo được:

| | `ai_tells_check` | `chapter_gate` |
|---|---|---|
| Tách câu | `re.split(r"(?<=[.!?])\s+")` | tách **đoạn trước**, rồi `(?<=[.!?…])\s+(?=["'*A-Z0-9])` |
| Đếm ra | **477 câu**, trung vị 17 | **~600 câu**, trung vị 13 |

🔴 **Chương này có 110 chỗ dấu câu đứng ngay trước dấu `*` đóng chữ nghiêng** *(`.*` · `?*`)*. Với regex của `ai_tells_check`, ký tự đứng trước khoảng trắng là `*` chứ không phải `.`, nên **nó không tách**. Mỗi chỗ như thế **dán hai câu thành một**.

`chapter_gate` không dính vì nó **tách đoạn trước**, và phần lớn 110 chỗ ấy nằm cuối đoạn.

→ Nên trên **bất cứ chương nào nặng nội tâm chữ nghiêng**, `ai_tells_check` sẽ **thổi phồng** cả trung vị câu lẫn tỉ lệ câu dài. Chương này có **125 đoạn nghiêng**.

⚠️ **Cảnh báo `long_sentence_pct` của `ai_tells_check` ở chương này là dương tính giả.** Và câu hỏi *"thước nào chuẩn"* mà [[targets]] để mở giờ có đáp án đo được: `chapter_gate` đúng, vì nó tôn trọng ranh giới đoạn.

🔵 Sửa gốc: cho `ai_tells_check` tách đoạn trước khi tách câu, hoặc nới lookbehind thành `[.!?…][*"']?`. **Chưa sửa** — đó là việc của hệ thống, không phải của chương này.

## ✅ Đã sửa — 20/09/2026, Aurel chốt cả sáu

| | Đã làm |
|---|---|
| **H1** | Cột `NOTE` **xếp theo hạng, không theo thời gian** — đề nghị nhỏ nhất trên, lớn nhất dưới — và Tsuna **tự đọc ra điều đó trên trang**, vì đó là cách một chủ nợ ghi sổ. Lần hỏi của [[tomoko]] dời sang **tháng Hai cùng mùa đông ấy**, sau khi tin vụ tấn công tới, nên nó là **sớm nhất** và nằm cuối bảng vì nó **lớn nhất** |
| **H2** | *six weeks* → **less than a month** |
| **M1** | *four weeks* → **ten weeks**, và cái sai sáu tuần thành một dữ kiện về cậu chứ không phải một lỗi |
| **M2** | Bỏ con số bảy khỏi lời Ferri; ông nghe **bốn chữ trong nửa tháng** và đoán ra chúng là một hệ |
| **M3** | Thêm **một khối ở 2.5**: cậu hỏi thẳng *vì sao nó không nằm trong năm mươi mốt*, và trả lời bằng cổng 4 của arc — **Estraneo ghi năm mươi mốt đứa vào sổ và không ghi nó**, vì nó chưa bao giờ định được liệt kê như một đứa trẻ |
| **M4** | *four years and some months until Italy* → **not quite a year until the news out of Italy**, khớp mốc Cradle ~Tsuna 9 |

🔵 **Và H1 hoá ra làm chương khá lên.** Bản cũ chỉ đặt bốn dòng cạnh nhau; bản sửa bắt Tsuna **đọc ra cách sắp xếp**, và cách sắp xếp ấy nói về Vendicare nhiều hơn bất cứ câu mô tả nào. Lời đề nghị của Tomoko nằm cuối bảng **vì nó lớn nhất từng có**, lớn hơn cả con số đủ mua một dãy phố của nhà kia.

⚠️ **Đúng như đã cảnh báo:** thêm ~800 từ làm … tụt xuống **11,8** *(sàn 12)* và thuật ngữ xuống **7,07**. Phải một lượt nữa mới về 10/10. Ba chỉ tiêu sát sàn là thật, không phải nói cho có.

### Số đo sau khi sửa

| | trước | sau |
|---|---|---|
| số từ | 9.458 | **10.253** |
| câu ≥35 từ | 7,3 % | **7,8 %** |
| … /10k | 12,4 | **14,6** |
| thuật ngữ /1000 | 7,43 | **7,31** |
| tỉ lệ đoạn thoại | 0,217 | **0,207** |
| `chapter_gate` | 10/10 | **10/10** |
| `pov_leak_check` | 0 | **0** |

## Bàn giao

- ✅ **Sáu mục đã sửa.** Không mục nào còn mở, và không mục nào vượt ra ngoài chương ⇒ **không** cần `check-conflicts`.
- ✅ `finalize-chapter` chạy được.
- ⚠️ Bốn mục LOW **không phải lỗi**; chúng là sự kiện mới và phải vào delta.

### 🔴 Một lỗi công cụ tự gây trong lúc ghi note này

Lượt ghi mục *"Đã sửa"* chạy Python bằng `bash -c "..."`, và **bash nuốt mọi thứ nằm giữa hai dấu backtick** trong chuỗi ấy. Bốn chỗ mất chữ: `…` hai lần, `chapter_gate`, `pov_leak_check`. Đã vá.

→ Luật: **script nhiều dòng thì ghi ra file rồi chạy file.** Không bao giờ nhét backtick vào `bash -c "..."`. Cùng họ với L27/L32 *(công cụ âm thầm đổi nội dung)*, khác ở chỗ lần này nó **xoá chữ** chứ không đổi đuôi dòng.
