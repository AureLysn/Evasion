---
id: chapter.EMB.child-ch2-review-ban-20260925
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
aliases: ["review Child Ch2 ban 25-09", "check-continuity Child Ch2 ban 25-09", "check-style Child Ch2 ban 25-09", "review ban viet lai Child Ch2 ban 25-09", "review bua toi Vindice ban 25-09"]
related: ["[[child-ch2-chapter-ban-20260925]]", "[[child-ch2-the-canh-ban-20260925]]", "[[child-ch3-chapter-ban-20260925]]", "[[emb-chot-bermuda-an-toi]]", "[[emb-chot-danh-xung-chuc-va-nguyen-to]]", "[[kawahira]]", "[[musashi]]", "[[tomoko]]", "[[master]]", "[[fact-vendicare-giu-so]]", "[[targets]]", "[[hard-rules]]"]
source:
  type: measured
  ref: "Do 22/09/2026 tren ban viet lai Child Ch2: pov_leak_check.py (co --pov tsuna), chapter_gate.py, style_metrics.py, ai_tells_check.py, doi chieu tay voi child-ch3-chapter, Timeline/master, Characters/kawahira, Characters/musashi. Review ban 20/09 luu o 80_Archive/personal/fiction-emb/child-ch2-review-ban-20260920.md."
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, review, k/note, p/personal]
last_updated: 2026-09-25
---

# Child Ch2 *(bản viết lại 22/09)* — check-continuity và check-style

> Chỉ đọc, chưa sửa gì trong chương. Sửa hay giữ là việc Aurel quyết.

## Cổng máy

| | |
|---|---|
| `pov_leak_check --pov tsuna` | ✅ exit 0, **0 phát hiện**. 9 secret đã đối chiếu |
| ⚠️ chạy **không** có `--pov` | vẫn exit 0 nhưng **mọi secret ra `unknown`**, vì thẻ cảnh **không khai `pov:`** trong frontmatter. Tức là lần chạy mặc định **không kiểm gì cả** mà vẫn báo sạch |
| secret `unlisted` với Tsuna | [[nana-giau-viec-tsuna-tinh]]: Tsuna không nằm trong `known_by` / `suspected_by` / `unknown_to`. Nana không có mặt trong chương, nên **không chặn** chương này |

## Tổng

| | Số |
|---|---|
| 🔴 **high** | **2** |
| 🟠 medium | **3** |
| 🟡 low | **4** |

~~`finalize-chapter` chưa chạy được khi H1 và H2 còn mở.~~ → ✅ **Đã sửa 22/09**, xem mục *Kết quả sửa* ở cuối note.

---

## 🔴 H1 — Tờ sổ Vendicare: 4 cột, 1 mục ↔ Ch3 viết 6 cột, 11 dòng

`type: canon (liên chương)` · `severity: high` · **2.6**

**Chương này, dòng 547 và 557:**
> *"with four columns ruled across it. **TAKEN.** **BY.** **RETURNED.** **NOTE.**"*
> *"Under **NOTE** there were four enquiries, ranked by what had been offered for an answer."*

Bản viết lại chỉ tả **một mục**: đứa trẻ Saint-Exavier, có bốn lần hỏi.

**[[child-ch3-chapter-ban-20260925]] 3.1 (đã `final`):**
> *"it is six columns and eleven lines and most of it is other people's children. She read the ten she had not come for, twice… Then she got to the eleventh."*
> *"He watched her face when she reached the **fifth column** and found it empty. He watched her face again, a good deal later, when she reached the **sixth**."*

Ch3 cần đúng hình dạng này: **sáu cột**, cột thứ năm là cột trống *(RETURNED)*, cột thứ sáu là cột ghi lần hỏi; **mười một dòng**, trong đó mười dòng là con nhà người khác và dòng thứ mười một là của bà. Bản 20/09 đã tả đúng như vậy, còn bản viết lại thì không.

→ Chỗ phải sửa là **Ch2**, không phải Ch3. Cần hai cột nữa, trước RETURNED; mình không tự đặt tên cho hai cột ấy. Và mười dòng kia phải có mặt, dù chỉ một câu.

## 🔴 H2 — Kawahira và Mukuro là "hai người ở trọ", ăn ở nhà mỗi tối

`type: character state` · `severity: high` · **2.3, 2.4, 2.6**

**Chương này, dòng 217:**
> *"and two places on the right, which had been laid every night since the New Year and cleared every night since the New Year, because two lodgers who had gone away on an errand were expected back at no fixed time"*

Dòng 263 (Nagi): *"We have lodgers… Two. They're in Kyoto."* · dòng 271: *"They pay late."* · dòng 529 (Musashi): *"And the lodgers are in Kyoto."*

**[[kawahira]]:**
> dòng 104: *"chủ **tiệm đồ cổ**"*
> dòng 236: *"Tới đền **mỗi Chủ Nhật cách tuần suốt cả năm**."*

Kawahira **có nhà riêng** *(tiệm đồ cổ)* và **tới đền cách tuần một lần**. Trong note không có dòng nào nói ông ở trọ tại nhà Sawada, hay ăn tối ở đó mỗi tối. Bản viết lại đã đặt ông vào nhà Sawada mà không có nguồn nào cho việc đó.

⚠️ **Nó chạm thẳng vào "chỗ chật vật" của chương.** Cả nhịp dọn hai chỗ ngồi, lời nói dối "Kyoto" của Nagi, và câu chốt của Musashi ở 2.6 đều đứng trên giả định sai này. Những nhịp ấy vẫn giữ được, nhưng phải đặt trên một nền khác. Hai hướng *(Aurel chọn)*:
- **(a)** Đồ của hai người **có sẵn trong nhà** vì họ tới cách tuần: cốc của Mukuro, gối của Kawahira, bàn cờ. Tsuna giấu đồ, không dọn chỗ ngồi. Khi đó lời nói dối của Nagi phải đổi, vì *"lodgers"* không còn đúng.
- **(b)** Aurel chốt rằng mùa đông này hai người **có ở tại đền**. Khi đó phải ghi thành fact mới trong [[kawahira]].

## 🟠 M1 — Sổ khách của Ban Kỷ luật: 4 trường ↔ Ch3 ghi 3 trường

`type: world rule` · `severity: medium` · **2.2**

**Chương này, dòng 121 và 127:**
> *"The visitor log requires **four things**… Name, first."* · *"House: *Vendicare will do.* **Purpose of visit**: *an answer to correspondence.*"*

**[[child-ch3-chapter-ban-20260925]] dòng 247:**
> *"the visitor log… records three things. Under **NAME**… Under **HOUSE**… Under **BICYCLE**…"*

Ch3 không có trường **PURPOSE**. Cách sửa gọn nhất là bỏ "purpose" khỏi Ch2 và đổi *"four things"* thành *"three"*.

## 🟠 M2 — Musashi tự nối "người Bermuda đang tìm" với hai người vắng mặt

`type: knowledge boundary` · `severity: medium` · **2.6**

**Chương này, dòng 523 và 529:**
> *"'Someone he thinks might come here.' She did not ask whom. She looked at the right side of the table, where the cushions had been straightened, and at the shelf behind the screen, and then at him, and he watched her decide not to ask that either."*
> *"And the lodgers are in Kyoto."*

**[[musashi]] dòng 128, mục chưa rõ:**
> *"bà biết gì về [[kawahira]]"*

Cảnh này cho Musashi **nghi** rằng người Bermuda tìm có liên quan tới Kawahira. Vault **chưa quyết** Musashi biết gì về Kawahira, nên chương đang **chốt ngầm** một câu hỏi còn mở. Mình không chắc đây là lỗi: bà chỉ đọc được hành vi của Tsuna, và cảnh không cho bà biết gì. Nếu giữ, cần ghi `suspected` vào đâu đó ở bước finalize. Nếu không muốn chốt, thì bỏ cái nhìn về phía bàn và kệ.

## 🟠 M3 — Thẻ cảnh không khai `pov:`, nên cổng rò rỉ mặc định chạy rỗng

`type: process` · `severity: medium` · [[child-ch2-the-canh-ban-20260925]]

Chạy `pov_leak_check --scene <thẻ>` mà không có `--pov` thì cả 9 secret đều ra `level: unknown`, không cái nào được kiểm, và công cụ vẫn in *"Khong phat hien ro ri"*. Lần chạy ở bước write-chapter chính là lần chạy rỗng này. Chạy lại với `--pov tsuna` thì sạch. Cách sửa: thêm `pov: tsuna` vào frontmatter thẻ cảnh.

## 🟡 L1 — Ngày tới: "thứ Năm tuần thứ hai tháng Giêng, 15:20" ↔ timeline ghi 8 tháng Giêng, 14:09

`type: timeline` · `severity: low` · **2.2 dòng 75**

[[master]] ghi *"8 tháng Giêng, 14:09"*, nhưng dòng ấy rút từ **bản 20/09**, không phải một ràng buộc từ chương khác. Ch3 chỉ cần "thứ Sáu" sau đó. Nên hoặc sửa chương thành ngày 8, hoặc sửa dòng timeline lúc finalize. Mình nghiêng về **giữ ngày 8** để khỏi đụng timeline.

⚠️ Cũng lúc finalize, ba dòng timeline khác của bản 20/09 sẽ **sai theo bản mới**: *"cùng đêm 8/1 — Musashi quyết **không** đưa cấm khoản vào file"* · *"17/1 — dòng sổ tới qua cửa sổ"* · *"Sổ khách ghi tên hắn theo cái mũ"*.

## 🟡 L2 — Bermuda có thấy Tomoshibi không: để mở, không phải lỗi

`type: knowledge boundary` · `severity: low` · **2.2**

> *"whether the look had stayed on his shoulder one breath longer than a look at a collar needs to stay."*

[[chi-chu-nhan-thay-cao]]: `known_by` là Tsuna, Kawahira, Mammon. Bermuda không có trong `known_by`, `suspected_by` hay `unknown_to`. Chương không để ông thấy, chỉ để Tsuna **không chắc**, nên không vỡ luật. Nhưng đây là câu hỏi Aurel cần chốt trước arc sau.

## 🟡 L3 — Chi tiết mới không có nguồn *(thông tin, không phải lỗi)*

| Dòng | Chi tiết |
|---|---|
| 191 | Musashi búi tóc bằng một sợi Mist Flame, *"which she does only for funerals"* |
| 51 | Vết sẹo của Ayame *"on the arm that carries her Storm Flame"* |
| 2.1 | Kawahira và Mukuro đi **ba ngày sau Giáng sinh**, hai lá thư thứ Hai. ✅ Khớp Ch4: Kawahira đo soulscape **tháng Mười Hai** |
| 2.3 | Gối thỏ của Nagi · cái cốc xanh sứt của Mukuro · người giao cá |

## 🟡 L4 — Jäger không đội mũ

`type: canon` · `severity: low` · **2.2**

> *"The other wore no hat at all, and on his left shoulder… sat a third figure the size of an infant."*

**Mình không chắc** canon tả Jäger thế nào; `MAIN-DATABASE/KHR/` không có note riêng cho hắn. Nên tra trước khi finalize.

## ✅ Đã đối chiếu, không có vấn đề

| Nhóm | |
|---|---|
| **Luật từ vựng mới** | Chương dùng **0** tên nguyên tố hệ AU. Hệ AU chỉ xuất hiện ở chức danh và lời trang trọng: *Kotei*, *Sawada Ruriko, Ruri of the Sawada* — đúng [[emb-chot-danh-xung-chuc-va-nguyen-to]] |
| **Bảy nhà** | ở **khắp Đông Á**, đặt tay lên bond từ xa, khớp [[child-ch1-chapter-ban-20260925]] |
| **Cấm khoản** | bốn điều khoản đúng chức năng [[emb-chot-cam-khoan-vendicare]]; điều khoản hai của lá thư cũ **không lộ một chữ** |
| **Dòng Mie** | nguyên văn khớp [[tomoko]]: *UNNAMED. THROUGH THE EASTERN CHANNEL…* · *tháng Hai, tám năm trước, sáu tuần sau* |
| **Bí mật** | Bermuda **không** nghe tên Kawahira; [[tsuna-tai-sinh]] chỉ nằm trong chữ nghiêng; Musashi và Nagi không thấy cáo |
| **Varia** | *"last year"*: khớp timeline, Varia vào Namimori **9 → 11 tháng Giêng** năm trước |
| **Xưng hô** | Nagi gọi Musashi *Sensei* · Musashi gọi *Tsunayoshi* · Tsuna gọi *Grandmother* |
| **Canon** | Lal / Colonnello · Luce → Aria → Uni · Bermuda chứng giao kèo của Giotto · cái hang có tranh vẽ: đúng chất liệu Aurel đưa và đúng canon |
| **`forbid`** | #2: động cơ là **những người cụ thể**, có tên · #5: Kawahira không lên trang · #6: 0 em dash · #7: không dựng thay đổi dài thành cảnh |

## Bàn giao

- 🔴 H1 và H2 phải sửa trước `finalize-chapter`. H1 buộc sửa **Ch2** cho khớp Ch3 đã `final`. H2 cần Aurel chọn (a) hay (b).
- M3 là sửa một dòng trong thẻ cảnh.
- Không phát hiện nào lan ra ngoài chương mà cần `check-conflicts`. Riêng H1 là **Ch2 lệch khỏi Ch3**, nên sửa Ch2 là đủ.

---

# check-style

`style_metrics.py --write --json` → **exit 0**. `chapter_gate` → exit 1, **9/10 chỉ tiêu**, luật cứng sạch.

## Bảng số

| Chỉ số | Độ mạnh | Chỉ tiêu | Đo | Kết |
|---|---|---|---|---|
| em dash | `hard` | 0 | **0** | ✅ |
| `...` ascii · cụm cấm · n-gram lặp qua chương | `hard` | 0 | **0 · 0 · 0** | ✅ |
| số từ | target | 8.000–13.000 *(thẻ ~9.500)* | **9.187** | ✅ *(dưới ước lượng của thẻ ~300 từ)* |
| 🟠 **câu trung vị** | target | 10–14 | **9** | ⚠️ **lệch 1** |
| câu ≥35 từ | target | ≤9 % | **8,1 %** *(`chapter_gate`)* · **12,3 %** *(`ai_tells_check`)* | ⚠️ hai thước cho hai kết quả trái nhau |
| đoạn TB | target | 30–40 | **33,9** | ✅ |
| `?` /10k | target | ≥30 | **31,6** | ✅ |
| `!` /10k | target | ≥5 | **7,6** | ✅ |
| italic /10k | target | ≥60 | **113,4** | ✅ |
| `…` /10k | target | ≥12 | **14,2** | ✅ |
| mật độ thuật ngữ | target | ≥7 /1000 | **7,4** | ✅ |
| tỉ lệ đoạn thoại | target *(nới 22/09)* | ≤0,30 | **0,288** | ✅ |

**Câu trung vị 9:** chương bữa tối có nhiều dòng thoại một, hai chữ. Mình đã gộp câu ngắn ở phần tường thuật một lượt; gộp thêm thì phải bắt đầu gộp cả **thoại**, và như thế là nắn chương cho vừa bảng. Aurel quyết có chấp nhận con số này không.

**Mật độ thuật ngữ** không bị một từ kéo lên: *Flame* 18 · *Sky* 8 · *pacifier* 6 · *Kotei* 6 · *Sanctuary* 5 · *Mist* 5. Không có va chạm chuỗi con.

## Xu hướng trong arc Child

| | Ch1 | **Ch2** | Ch3 | Ch4 |
|---|---|---|---|---|
| đoạn TB | 30,3 | **33,9** | 33,3 | 27,6 |
| tỉ lệ đoạn thoại | 0,23 | **0,288** | 0,182 | 0,176 |
| thuật ngữ /1000 | 7,72 | **7,4** | 7,3 | 6,95 |

Ch2 là chương **nhiều thoại nhất arc**, đúng như lúc nới chỉ tiêu. Đoạn TB không trôi: không có hai chương liền tăng.

## Đọc bằng mắt — những gì máy không đếm

### 🟠 S1 — *"a very good"* lặp **8 lần**

| Dòng | |
|---|---|
| 171 | *does **a very good** one* *(nabe)* |
| 237 | *It is **a very good** rabbit* |
| 267 | *It was **a very good** lie* |
| 361 | *He would be **a very good** adult* |
| 435 | *It's **a very good** price* |
| 513 | *He said it was **a very good** rabbit* |
| 539 | *You were **a very good** scarf* |
| 575 | *It's **a very good** clause* |

Hai lần nhắc *rabbit* là **cố ý** (câu gọi lại ở 2.6), và *price → clause* cũng là một cặp. Nhưng tám lần thì cụm này đã thành **tật giọng** chứ không còn là motif. Đề xuất: giữ bốn lần *(rabbit ×2, price, clause)*, bỏ bốn lần còn lại.

### 🟡 S2 — Đặt tên cảm xúc thay vì dựng *(mẫu 4 trong `forbidden-patterns`)*

- dòng 293: *"felt something in his chest go **warm and complicated**, and decided to deal with it at some other time"*
- *"with **enormous** affection"* · *"with **enormous** pleasure"* · *"with **enormous** care and a great deal of pleasure"*: ba lần *enormous*, và cả ba đều gắn một nhãn cảm xúc

Câu ở dòng 293 có nhịp đá ở nửa sau nên đứng được. Ba lần *enormous* là một tật nhỏ.

### ✅ Không thấy

- Câu tổng kết cảm xúc cuối cảnh: cả sáu cảnh đều đóng bằng **hành động hoặc một câu đá**, không đóng bằng câu giải thích
- *"không phải X, mà là Y"*: chỉ **một** chỗ *(dòng 335, "Not the watching, but the rest of it")*, trong chữ nghiêng
- Nhịp "Not X. It was Y.": đã sửa chỗ duy nhất *("Not scarf still. The other kind.")* ngay ở bước viết
- Trạng ngữ thời gian mở đoạn lặp lại: không có

## Bàn giao style

- Không có lỗi `hard`.
- Một chỉ tiêu lệch *(câu trung vị 9)*, cần Aurel chấp nhận hoặc bác.
- S1 nên sửa cùng lượt với H1 và H2, vì cùng một lần viết lại.

---

# ✅ Kết quả sửa — 22/09/2026 *(Aurel: "đồng ý đề xuất")*

| | Cách sửa | Trạng thái |
|---|---|---|
| 🔴 **H1** | Tờ sổ về lại **sáu cột** *(TAKEN · FROM · BY · DATE · RETURNED · NOTE)*, **mười một dòng**; cột 5 trống, lề có tám mốc ngày kiểm; cột 6 xếp **từ nhỏ tới lớn**, dòng Mie ở cuối. Tên hai cột lấy theo bản 20/09 | ✅ khớp [[child-ch3-chapter-ban-20260925]] 3.1 |
| 🔴 **H2** | Hướng **(a)**: Kawahira và Mukuro lên đền **cách tuần vào Chủ Nhật**, nên nhà giữ đồ của họ *(cốc xanh, gối xám cháy góc, ván shogi còn mười một nước)*. Tsuna giấu cốc và gối; ván cờ thì không giấu được. Nagi nhận ván cờ là của mình: *"I play both sides. I'm losing."* Bỏ hết chữ **lodgers** | ✅ khớp [[kawahira]] dòng 236 |
| 🟠 **M1** | Sổ khách còn **ba trường**, bỏ *purpose* | ✅ |
| 🟠 **M2** | Bỏ cái nhìn của Musashi về phía bàn và kệ. Bà vẫn thấy **Nagi nói dối** *("And Nagi does not play shogi")*, nhưng không nối gì với người Bermuda tìm | ✅ câu hỏi *"bà biết gì về Kawahira"* vẫn **mở** |
| 🟠 **M3** | Thêm `pov: tsuna` vào [[child-ch2-the-canh-ban-20260925]]. Giờ `pov_leak_check --scene` chạy mặc định là kiểm thật | ✅ 0 phát hiện |
| 🟡 **L1** | Ngày tới: **8 tháng Giêng, 14:09**, khớp dòng timeline cũ. Các giờ phụ thuộc đổi theo | ✅ |
| 🟡 **S1** | *"a very good"*: **4 lần** trong văn *(rabbit ×2, price, clause)* | ✅ |
| **câu trung vị 9** | Aurel **chấp nhận** | ✅ |
| 🟡 L2, L3, L4 | Để nguyên: câu hỏi Bermuda có thấy cáo không vẫn mở, và Jäger chưa tra canon | ⏳ |

**Số đo sau khi sửa:** 9.385 từ · luật cứng sạch · **9/10 chỉ tiêu** *(chỉ lệch câu trung vị 9, đã được chấp nhận)* · tỉ lệ đoạn thoại 0,286 · thuật ngữ 7,14/1000 · `pov_leak_check` 0 · doctor 0 lỗi.

⏳ **Việc của `finalize-chapter`:** viết lại các dòng timeline ngày 8/1 và 17/1 của bản 20/09 *(Musashi "không đưa vào file", dòng sổ tới qua cửa sổ, sổ khách ghi theo cái mũ)* · cập nhật `state` của [[hook-bermuda-to-mo]] · snapshot 009 · ghi nhận chi tiết mới *(ván shogi, cốc xanh, gối, Kawahira và Mukuro đi 27/12)*.

## 🟠 M4 — phát hiện lúc finalize, **check-continuity đã bỏ sót**

`type: relationship / addressing` · `severity: medium`

Chương để Musashi gọi Tsuna là **"Tsunayoshi"** 4 lần. [[tsuna--musashi]] khai `addressing.musashi_to_tsuna: "Masaya"`, và Ch1, Ch3, Ch4 đều dùng **Masaya**. ✅ **Đã sửa**, và chữ ký ở 2.5 bỏ tên.

⚠️ **Vì sao bị sót:** bảng "Đã đối chiếu" ở trên ghi *"Musashi gọi Tsunayoshi"* là **đúng**, vì mình đối chiếu với **chính chương đang viết** chứ không mở `addressing` của note quan hệ. Đúng loại lỗi mà skill check-continuity bảo phải trích **cả hai phía**.

✅ **Finalize xong 22/09** — delta `committed`, snapshot `012-child-ch2`.
