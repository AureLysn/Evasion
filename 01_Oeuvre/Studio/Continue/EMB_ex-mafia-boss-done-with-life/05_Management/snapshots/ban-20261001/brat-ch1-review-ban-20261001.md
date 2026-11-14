---
id: info.EMB.brat-ch1-review-ban-20261001
type: info
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-10-01
archived_note: "Ban luu tru 01/10/2026: Aurel quyet lam lai ca du an EMB lan ba, tu khung nam arc (emb-lam-lai-lan-ba). Giu de tra; khong phai canon, khong phai mau giong."
aliases: ["review Brat Ch1 ban 01-10", "da sua vong 1 ban 01-10", "check-style Brat Ch1 ban 01-10", "bang van phong chuong 1 ban 01-10", "kiem lien tuc Brat Ch1 ban 01-10", "continuity review chuong 1 Brat ban 01-10", "loi lien tuc ban nhap dau ban 01-10"]
related: ["[[brat-ch1-chapter-ban-20261001]]", "[[brat-dan-y-ban-20261001]]", "[[master]]", "[[tuoi-va-moc]]", "[[fact-loi-flame]]", "[[emb-sua-con-troi-dat]]", "[[indra]]", "[[kyouya]]", "[[shouichi]]", "[[khung-oc]]", "[[genichi]]"]
source:
  type: inference
  ref: "check-continuity 17/09/2026, Mode 1, tren ban nhap brat-ch1-chapter.md (9.226 tu). Co hoc: pov_leak_check --pov genichi --json -> exit 0, findings 0."
authority: ai
confidence: 0.8
always_load: false
load_for: [reviewer, writer]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-01
---

# Review liên tục — Brat Ch1, bản nháp đầu

> Chỉ đọc. Không sửa một chữ nào của chương. Quyết định sửa hay giữ thuộc về Aurel.
>
> **Cổng cơ học**: `pov_leak_check --chapter brat-ch1-chapter.md --pov genichi --json` → **exit 0**, `findings: []`, 8 secret đối chiếu, **0 rò rỉ**. Máy sạch. Bảy nhóm dưới là phần máy không bắt được.

## ✅ Aurel chấp nhận hai chỗ lệch — 17/09/2026

> Nguyên văn: *"chấp nhận lệch cho chương này, chốt chương"*.

| Chỉ số | Đo | Chỉ tiêu | Phán |
|---|---|---|---|
| đoạn trung bình | **21,9** | 30–40 | ✅ **chấp nhận** — chương chạy bằng hỏi-đáp, 47 % đoạn là thoại |
| thuật ngữ /1000 | **6,96** *(không phải 7,01)* | ≥7 | ✅ **chấp nhận** — POV không biết chuyện Lửa, từ vựng nghi lễ chỉ đi qua tai ông |

⚠️ **Phạm vi: riêng chương này.** [[targets]] cho phép lệch khi *"chương thứ năm lệch có lý do nêu được"* — lý do đã nêu ở trên. Hai con số này **không** thành mốc mới; Ch2 đo lại từ đầu.

🔴 Và một thứ phải theo dõi sang Ch2, **không** nằm trong phần được chấp nhận: `!` **6,2/10k** so với **13,2** của tác giả. [[signature]] đo được rằng độ bật lên là của **giọng kể**, không phải của lượng thoại — nên nó không biện minh được bằng "POV này trầm". Một chương thì ổn. Hai chương thì là xu hướng, và Ch2 có sát thủ.

---

## Văn phong — `check-style`, 17/09/2026

> Chạy trên bản **sau vòng sửa 1**. `style_metrics --write --json` → **exit 0**. Chỉ đọc, không sửa.
>
> Prose tiếng Anh, nên ba mục kiểm riêng cho văn Việt *(xưng hô, dấu câu thoại, tên riêng bị Việt hoá)* **không áp dụng**.

### Luật cứng — ✅ **5/5 đạt**

| # | Luật | Đo được |
|---|---|---|
| 1 | Không gạch ngang `—` `–` `--` | **0 / 0 / 0** |
| 2 | `…` chiếm ≥60 % số chấm lửng | **100 %** *(17 `…`, 0 `...`)* |
| 3 | Không nhịp *"Not X. It was Y."* | **0** |
| 4 | Bảy cụm cấm đặt tên cảm xúc | **0** |
| 5 | Không trộn register phân tích với văn | ✅ ghi chú để ngoài file |

`ai_tells_check` → *"Khong phat hien tat AI nao"*, exit **0**.

### Chỉ tiêu — 8 đạt · **1 trượt** · **1 đạt bằng một con số sai**

| Chỉ số | Đo | Chỉ tiêu | Tác giả *(Part 2)* | |
|---|---|---|---|---|
| số từ | 9.561 | 8.000–13.000 | 9.409 | ✅ |
| câu trung vị | **11** | 10–14 | 11 | ✅ khớp đúng |
| câu dài ≥35 từ | 8,5 % | ≤9 % | **3,1 %** | ✅ đạt, xem 🟡 A |
| **đoạn trung bình** | **21,9** | **30–40** | 35,0 | 🔴 **trượt** |
| `?` /10k | 53,8 | ≥30 | 64,7 | ✅ |
| `!` /10k | 6,2 | ≥5 | **13,2** | ✅ đạt, xem 🟡 A |
| *nghiêng* /10k | 82,7 | ≥60 | 106,2 | ✅ đạt, xem 🟡 A |
| `…` /10k | 17,9 | ≥12 | 23,3 | ✅ |
| **thuật ngữ /1000** | **7,01** | ≥7 | 14,46 | ⚠️ xem 🔴 B |
| `had` /10k | 185,0 | ≤210 | 149,8 | ✅ |

---

### 🔴 A — Đoạn trung bình **21,9**, trượt sàn 30

**Nguyên nhân đo được:** **47 %** số đoạn *(205/437)* là dòng thoại. Bỏ hết thoại ra, đoạn văn xuôi thuần trung bình **27,8 từ** — vẫn dưới sàn, nhưng không vỡ.

Và tính theo **từ** thay vì theo đoạn: **25,0 %** số từ nằm trong thoại, so với **20,9 %** của tác giả ở Part 2. Lệch 4 điểm.

⚠️ [[targets]] đã lật một kết luận cũ ở đúng chỗ này — *"bản AI viết nhiều thoại hơn tác giả"* là **sai mốc so**, vì giọng dịch mạnh giữa hai phần *(Part 1: 5,0 % · Part 2: 20,9 %)*. Nên **25 % không phải lỗi**, nó chỉ nằm ở mép trên. Cái trượt thật là **đoạn văn xuôi ngắn**, không phải lượng thoại.

**Đây là chỉ tiêu, không phải luật cứng — [[targets]] nói thẳng: "lệch thì báo số, không nhét chữ."** Đề nghị **không** vá bằng cách nối đoạn lại: chương này cố ý chạy bằng hỏi-đáp, và đó là đúng hình của một chương khám bệnh. Ghi số, theo dõi sang Ch2.

### 🔴 B — Mật độ thuật ngữ **đạt nhờ một con số sai**

`style_metrics` báo **7,01** ≥ 7,0. Đọc `term_hits` như [[targets]] dặn thì:

| Từ | Lượt |
|---|---|
| **Ruriko** | **29** |
| Honō · Tenmei | 8 · 8 |
| Chiyu | 7 |
| Kohaku | 5 |
| Ketsueki · Gen'ei | 3 · 3 |
| Kotei | 2 |
| Eienzakuramura | 1 |
| 🔴 **Rain** | **1** |

**Lượt `Rain` ấy là thời tiết**: *"the lanterns in the garden were lit, all of them, and it was **rain**ing"*. Đúng loại thổi phồng mà [[targets]] đã đo và cảnh báo *(57 lượt tên nguyên tố viết thường trên 5 chương)*.

→ Bỏ nó ra: **66 lượt / 9.485 từ = 6,96/1000**. **Dưới sàn**, không phải trên.

⚠️ Và một chuyện thứ hai: **Ruriko gánh 43 %** tổng số lượt. [[targets]] đo tác giả và ghi *"không một từ nào gánh quá nửa"*, với mức cao nhất là **Flame 28,3 %**. 43 % là **vượt mức tác giả**. Ruriko là một **cái tên**, đúng như [[targets]] đã cảnh báo về *Tenmei* — nên mật độ "thuật ngữ thật" của chương còn thấp hơn con số 6,96 nữa.

**Không đề nghị nhét thêm thuật ngữ.** POV này **không biết chuyện Lửa**; từ vựng nghi lễ chỉ được phép đi qua tai ông. Mật độ thấp ở đây là **hệ quả của POV**, và là một lệch **có lý do nêu được** — đúng điều kiện [[targets]] cho phép. Nhưng nó phải được ghi là **6,96 trượt**, không phải **7,01 đạt**.

### 🟡 C — Ba dòng "đạt sàn nhưng dưới hẳn mức tác giả"

| | Chương | Tác giả | Chênh |
|---|---|---|---|
| `!` /10k | 6,2 | 13,2 | **½** |
| *nghiêng* /10k | 82,7 | 106,2 | −22 % |
| câu dài ≥35 từ | 8,5 % | 3,1 % | **×2,7** |

Ba dòng, một nguyên nhân: **POV là một ông già bình tĩnh ghi bệnh án.** Ông không reo, và ông nghĩ bằng mệnh đề phụ.

⚠️ Nhưng [[signature]] nêu một điều cần cân: *"`!` **đứng yên** qua hai phần. Tác giả **không reo nhiều hơn** khi nhân vật nói nhiều hơn — độ bật lên là của **giọng kể**, không phải của lượng thoại."* Tức 6,2 **không** được biện minh bằng "POV này trầm". Nó là giọng kể đang phẳng hơn tác giả.

🔴 Và [[targets]] đã ghi rằng ở **tầng cả arc**, *"không ai bật lên lần nào"* là triệu chứng giọng sai — đúng cái đã giết bản v3. Một chương 6,2 thì ổn; **Ch2 mà cũng 6,2 thì là xu hướng**, và Ch2 có sát thủ, nên nó phải cao hơn.

### 🟢 D — Ba tật nhỏ, đếm được

| Tật | Lượt | |
|---|---|---|
| `It was the <nhất/duy nhất> …` làm câu kết đoạn | **3** | *"It was the first mistake he had ever seen her make." · "It was the only ugly object in the room." · "It was the loudest forty square metres in the town."* |
| `thirty-one years` | **9** | Có chủ ý làm điệp khúc, nhưng chín lượt là nhiều — và đây đúng **loại n-gram lặp** mà [[quy-trinh-viet]] dựng cổng để bắt |
| `which meant` | **5** | |

⚠️ Tật thứ nhất nguy hiểm hơn hai cái sau, vì [[quy-trinh-viet]] nói rõ vì sao: *"nó **có vẻ hay**, nên không tự báo lỗi"*. Ba lần cùng một khuôn ở **cùng một vị trí** *(câu chốt đoạn)* là một khuôn, không phải ba câu.

### ✅ Năm mục sạch — đọc tay, không phải đếm máy

| [[forbidden-patterns]] | Kết quả |
|---|---|
| 1 · Câu tổng kết cảm xúc cuối đoạn | **0** — bảy câu kết đoạn có nhịp tổng kết, nhưng **không câu nào tổng kết cảm xúc**; đều là hình ảnh hoặc quan sát |
| 2 · *"không phải X, mà là Y"* lặp | **0 lượt** trong 9.561 từ |
| 3 · Liệt kê ba vế làm phẳng nhịp | **4 cụm** `A, B and C` — không phải vấn đề |
| 4 · Tính từ cảm xúc thay hành vi | **0** |
| 5 · Mở đoạn bằng trạng ngữ thời gian lặp | **0** — không cụm mở đoạn nào thuộc loại này |

Và hai thói quen của tác giả, **cả hai có mặt**:

- **Mở chương bằng trạng thái bình thường rồi mới phá** — bốn cách nhà Sawada gọi thầy thuốc, rồi *"He is very well"*. Đúng hình Part 2 *(2/2 ở tác giả)*
- **Đóng chương bằng một nhịp ngắn đứng riêng** — *"Gen'ichi went and looked at a knee."* Tác giả **5/5**

### Không có phát hiện canon nào ở đây

Ba chỗ nghi ngờ trong lượt đọc này đều thuộc `check-continuity` và **đã nằm trong mục trên** của file. Skill này không phán về canon.

---

## ✅ Vòng sửa 1 — 17/09/2026

Aurel bảo sửa trước khi đọc kỹ. Tám phát hiện đã xử lý, một giữ nguyên có lý do.

| | Phát hiện | Đã làm gì |
|---|---|---|
| 🔴 | HIGH-1 mùa | Chương chuyển sang **tháng Năm** — năm tháng sau lễ cưới cáo, đúng *"vài tháng sau"*. Chín chỗ mùa đông đổi theo |
| 🔴 | HIGH-2 cơn trôi dạt | Ba dòng bệnh án gộp thành **một đêm tháng Mười Hai**, ba cơn 4 / 11 / 20 phút. Thêm một dòng sổ: *"Something was held at the shrine. I was not told what"* |
| 🔴 | HIGH-3 Indra | Gen'ichi **nhận ra bà ngay**. Cái lạ chuyển từ *bà là ai* sang **bà đã dọn vào đây**, và ông hỏi thẳng *"Has something happened at your house?"* |
| 🟡 | MEDIUM-1 tuổi Kyouya | *"eight or nine"* → **"about six"** |
| 🟡 | MEDIUM-2 tuổi Shouichi | *"nine years of hard experience"* → **"six years"** |
| 🟡 | MEDIUM-3 mốc năm | Bỏ hẳn **1962** và **1963** |
| 🟢 | LOW-1 cây hồng | Phép lạ chuyển sang **cây tử đằng nở mùa đông** *(canon, quà của [[kimiko]])*; cây hồng của [[kazuki]] về lại làm cây hồng |
| 🟢 | LOW-3 Nagi | Thêm một đoạn: giọng một đứa bé gái học bài ở phòng sau, ông hỏi một lần và được trả lời không thành câu trả lời |
| 🟢 | LOW-2 *Honō* | **Giữ nguyên** — Ruriko đang né chứ không giảng bài, đúng việc bà làm trong cảnh |

**Vòng sửa bắt thêm hai lỗi mà review không thấy:** một chỗ lặp chữ *"carefully, carefully"* do vòng sửa văn phong trước để lại, và một câu khẳng định Gen'ichi vắng mặt ở một lễ hội công khai — đã đổi thành ông **không được cho biết có chuyện gì**, an toàn hơn và hợp với tuyến hơn.

**Đo lại sau khi sửa** *(9.561 từ, tăng ~330)*:

| | Trước sửa | Sau sửa | Chỉ tiêu |
|---|---|---|---|
| câu trung vị | 10 | **11** | 10–14 |
| câu dài ≥35 từ | 8,0 % | 8,5 % | ≤9 % |
| `?` /10k | 52,6 | 53,8 | ≥30 |
| `!` /10k | 6,4 | 6,2 | ≥5 |
| *nghiêng* /10k | 85,9 | 82,7 | ≥60 |
| thuật ngữ /1000 | 7,05 | 7,01 | ≥7 |

`ai_tells_check` → **exit 0** · `style_metrics` → **exit 0** · `pov_leak_check` → **exit 0, 0 rò rỉ**.

⏸ **Còn mở**: mục *"Vượt ra ngoài chương này"* ở cuối — [[khung-oc]] gộp hai sự kiện Ấn Độ. Chưa đụng, vẫn chờ `check-conflicts`.

---

## Tổng kết

| Mức | Số | Nhóm |
|---|---|---|
| 🔴 **high** | **3** | Timeline ×2 · Character state ×1 |
| 🟡 medium | 3 | Timeline ×1 · Character state ×2 |
| 🟢 low | 3 | Canon ×1 · World rules ×1 · Character state ×1 |

**Ba lỗi high đều cùng một gốc**: chương được viết mà không neo vào [[master]]. Không phải ba lỗi rời — là một lỗi xuất hiện ba lần.

---

## 🔴 HIGH-1 — Chương đặt vào **tháng Một**, tức **trước** vạch xuất phát của nhánh

| | |
|---|---|
| Nhóm | Timeline |
| Vị trí | dòng 50 · dòng 94, và toàn bộ không khí mùa của chương |
| Trái với | [[master]] · [[aurel-main]] · [[drop-point]] |

**Chương viết:**

> *"In practice it meant that Gen'ichi walked uphill for a living. **In January** it meant that he walked uphill on ice."*

> *"**In January** the garden was mostly stones and frost…"*

**[[master]] viết:**

> *"**tháng 12, Tsuna 6 tuổi — ngày 0** · Mưa lúc nắng → kitsune no yomeiri. Lễ cưới cáo"*
> *"**ngày 7** · Ống tre đặt trước cửa"*
> *"**vài tháng sau** · Các cơn trôi dạt không còn xuất hiện"*

[[aurel-main]] chốt vạch xuất phát là **cuối [[p2-ch1]]**, tức *"vài tháng sau"* lễ cưới tháng Mười Hai. Tháng Một là **một tháng sau**, không phải vài tháng. Chương này đang ngồi trong khoảng nguyên tác đã kể, chứ không phải sau nó.

🔴 Và nó kéo theo một thứ nặng hơn: ở tháng Một, [[indra]] **chưa tuyên thệ** và Estraneo **chưa bị xoá sổ** — nhưng chương đã cho Indra dọn vào ở. Xem HIGH-3.

**Sửa rẻ nhất:** đổi mùa sang cuối xuân hoặc đầu hè. Không cảnh nào phụ thuộc vào băng; băng chỉ xuất hiện trong hai câu đùa về cái đầu gối.

---

## 🔴 HIGH-2 — Ba cơn trôi dạt bị dời sang **tháng Tư–tháng Năm**, sai cả mốc lẫn hình

| | |
|---|---|
| Nhóm | Timeline · Canon |
| Vị trí | dòng 206 · 208 · 210 · 216 |
| Trái với | [[fact-loi-flame]] · [[emb-sua-con-troi-dat]] · [[master]] |

**Chương viết** (ba dòng bệnh án):

> *"**17 April.** … Patient found unresponsive in garden approx. 4 min…"*
> *"**3 May.** Second event. Household account 11 min…"*
> *"**29 May.** Third. Household account approx. 20 min…"*
> *"And then nothing. **For eight months**, nothing."*

**[[fact-loi-flame]] viết:**

> | **P2 Ch2** *(Tsuna 6)* | có, **ba lần**, và đang tăng |
> | **P2 Ch1** *(vài tháng sau)* | **không còn lần nào** |

Ba lần ấy xảy ra **trong P2 Ch2**, tức **trong ngày lễ cưới cáo, tháng Mười Hai** — không phải rải ra chín tuần của mùa xuân năm trước. [[emb-sua-con-troi-dat]] *(vừa khoá hôm nay)* dựng đúng bảng bốn mốc ấy: ngày 0 có ba lần, ngày 7 ống tre, rồi dứt.

Chương đang kể **một tiền sử khác** cho cùng một triệu chứng.

⚠️ **Phần KHÔNG sai, giữ lại được:** thời lượng 4 / 11 / 20 phút là vật liệu mới, và [[fact-loi-flame]] mục *Chưa rõ* ghi thẳng *"cơn trôi dạt kéo dài bao lâu, có báo trước không"* còn để ngỏ. Đường cong tăng dần cũng khớp *"đang tăng"*. Chỉ có **ngày tháng và khoảng cách** là sai.

**Sửa rẻ nhất:** dồn ba dòng bệnh án vào **một đêm tháng Mười Hai** *(ngày lễ cưới)*, và đổi *"eight months"* thành *"vài tháng"*. Cảnh 1.2 và 1.4 vẫn chạy nguyên — thật ra chúng **mạnh hơn**: ba cơn trong một đêm rồi tắt hẳn còn khó giải thích hơn ba cơn trong chín tuần.

---

## 🔴 HIGH-3 — Gen'ichi **không nhận ra Indra**, người ông gần như chắc chắn đã biết nhiều năm

| | |
|---|---|
| Nhóm | Character state · Relationships |
| Vị trí | dòng 96, và cả đoạn giới thiệu ở hiên |
| Trái với | [[indra]] · [[master]] · [[kyouya]] |

**Chương viết:**

> *"There was a woman on the veranda **that he did not know**."*
> *"'Sensei,' said Ayame. '**Indra-sama. She has come to live here**.'"*

**[[indra]] viết:**

> *"Bà là **con dâu nhánh ngoại quốc** của nhà Hibari, về Namimori khi họ đưa chuyên gia phục chế từ Ấn Độ sang cứu ngôi đền và cây sakaki. Chồng bà là [[keita]], em trai [[kojiro]] — nên bà là **em dâu của [[musashi]]**…"*
>
> *"Bà **đứng đầu nhà Hibari** ở Namimori, và từng **tiếp quản thị trấn cho chồng**."*

Ba việc cùng lúc: bà là **em dâu ruột** của bệnh nhân lâu năm nhất của ông, bà **đứng đầu** nhà Hibari trong thị trấn, và bà là **mẹ [[kyouya]]** — đứa trẻ mà chính chương này nói Gen'ichi *"had set that boy's left wrist **twice**"*.

Một thầy thuốc thị trấn ba mươi mốt năm, đã bó tay con bà hai lần, không thể không biết mặt bà.

⚠️ **Cái chương muốn** vẫn lấy được: cái mới không phải **bà là ai**, mà là **bà đã dọn vào nhà Sawada**. Đó mới là thứ lạ, và nó còn đắt hơn — người đứng đầu nhà Hibari bỏ dinh thự của mình sang ở nhà vợ goá của anh chồng, và không ai giải thích cho ông.

**Sửa rẻ nhất:** đổi *"a woman he did not know"* thành nhận ra ngay lập tức, kèm một câu rằng bà **không sống ở đây**, và Ayame nói đúng câu cũ: *"She has come to live here."*

---

## 🟡 MEDIUM-1 — Kyouya bị viết thành **tám hay chín tuổi**

| | |
|---|---|
| Nhóm | Character state |
| Vị trí | dòng 615 *(sổ tay)*; và gián tiếp dòng 88 |
| Trái với | [[tuoi-va-moc]] |

**Chương viết:**

> *"A child is sending them. I know the hand; I have seen it on a school form. **The child is eight or nine** and does not think *Kohaku* needs explaining either."*

**[[tuoi-va-moc]] viết:**

> *"| **[[kyouya]]** | 🔴 **~6–7** *(chốt lại, không phải 11)* |"*
>
> *"Nó làm courtship của Kyouya hợp lý hơn nhiều. Một đứa 11 tuổi đi courting một đứa 6 tuổi thì lệch; **hai đứa cùng 6–7 tuổi** thì đúng là hai con thú nhỏ đang đo nhau."*

Đây là một mâu thuẫn nguyên tác mà vault **đã chốt hướng** rồi. Viết tám chín tuổi là lặng lẽ trượt ngược về phía bản 11 tuổi đã bị bỏ.

⚠️ Dòng 88 *("the Hibari boy… in a uniform with the collar open, carrying a wooden sword")* không sai, nhưng đọc lên già hơn sáu tuổi. Không phải lỗi; là chỗ nên đọc lại khi sửa dòng 615.

---

## 🟡 MEDIUM-2 — Shouichi được gán **chín năm kinh nghiệm**

| | |
|---|---|
| Nhóm | Character state |
| Vị trí | dòng 827 |
| Trái với | [[shouichi]] · [[master]] |

**Chương viết:**

> *"'Oh.' A pause, while **nine years of hard experience** were consulted. 'That's awful.'"*

**[[shouichi]] viết:**

> *"Tuổi | **tiểu học** ở mốc P2 Ch1 — tức **xấp xỉ tuổi [[tsuna]]**"*

**[[master]]** đặt nhà Irie tới Namimori **tháng 1/1992**, lúc [[tomoko]] mang thai nặng — cùng quãng Tsuna ra đời. Nên Shouichi **sáu tuổi**, không phải chín.

⚠️ Và cả chương phụ thuộc vào điều đó: [[khung-oc]] cần **một đứa trẻ cùng tuổi**, [[brat-dan-y-ban-20261001]] beat 5 ghi *"rủ cậu chơi như rủ một đứa trẻ"*. Một đứa chín tuổi rủ một đứa sáu tuổi chơi là **lòng tốt của anh lớn**, và nó giết đúng cái beat.

---

## 🟡 MEDIUM-3 — Hai cái mốc năm **1962 / 1963** lệch khoảng năm năm

| | |
|---|---|
| Nhóm | Timeline |
| Vị trí | dòng 595 · dòng 857 |
| Trái với | [[master]], và với chính chương |

**Chương viết:**

> *"I have wanted to be that person **since 1962** and I have never once been allowed."*
> *"…on the face of a nurse in a corridor **in 1963**…"*

Chương tự đặt: Gen'ichi **63 tuổi**, làm thầy thuốc nhà này **31 năm**, và động đất xảy ra *"thirty-one years ago, when he was thirty-two"*. Ba con số ấy khớp nhau.

Nhưng **[[master]]** cho đúng một mốc lịch: *"tháng 1/1992 · nhà Irie tới Namimori"*, ở quãng Tsuna ra đời. Tsuna sáu tuổi → **hiện tại ≈ 1998**. Trừ 31 năm ra **1967**, không phải 1962.

**Sửa rẻ nhất:** bỏ hẳn hai con số năm. Chương không cần chúng — *"ba mươi mốt năm trước"* đã làm xong việc, và [[master]] mục *Chưa dựng được* nói thẳng rằng truyện **không cho mốc lịch nào** ngoài tháng 1/1992. Viết năm cụ thể là tự tạo ra một ràng buộc mà nguồn không có.

---

## 🟢 LOW-1 — Cây hồng "ra quả hai lần, không phải vì trồng trọt"

| | |
|---|---|
| Nhóm | Canon |
| Vị trí | dòng 94 · dòng 374 |

**Chương viết:**

> *"'It was planted by my great-grandfather,' said Sawada Ruriko, '**and the reason it fruits twice is not horticultural**.'"*

Quả hồng trong vườn thì **có thật** — [[tsuna]] ghi cảnh Kawahira suýt không thưởng thức quả hồng [[kazuki]] trồng. Nhưng **[[master]]** đã có sẵn một cái cây mang phép lạ trong vườn nhà này:

> *"Bà tặng nhà Sawada cây **tử đằng nở mùa đông** để tạ ơn đã theo bà rời Edo"*

Dựng thêm một cây thứ hai có phép làm loãng cái thứ nhất, và nó gieo một bí ẩn mà **không tuyến nào định trả**. ⚠️ Rủi ro thật nằm ở chỗ khác: chương sau đọc lại và tưởng cây hồng hai mùa là canon.

**Đề xuất:** hoặc đổi thành **cây tử đằng** *(đã có sẵn, và "nở mùa đông" thì đúng là không phải chuyện trồng trọt)*, hoặc cắt vế *"not horticultural"* và để cây hồng chỉ là cây hồng.

---

## 🟢 LOW-2 — *"Chiyu is a word about Honō"* dùng **Honō** hơi lệch nghĩa

| | |
|---|---|
| Nhóm | World rules |
| Vị trí | trong đối thoại cảnh 1.3 |

**[[rule-hono-va-hi]] viết:**

> *"Flame users are called **Honō**(Flame)… Flames themselves are referred to as **Hi**(Fire)."*

**Honō** là **người**; **Hi** là **ngọn lửa**. *Chiyu* là tên một ngọn lửa, nên nói nó là *"a word about Honō"* là lỏng.

⚠️ Nhưng đây là **Ruriko đang né**, không phải đang giảng bài, và nói lỏng là đúng việc bà làm trong cảnh đó. Ghi lại để `check-style` cân, không đề nghị sửa.

*(Dòng biển hiệu "the only Taisha in the country given to Honō" thì **đúng** — [[musashi]] ghi nguyên văn "ngôi Taisha duy nhất dành cho Honō".)*

---

## 🟢 LOW-3 — [[nagi]] sống trong nhà mà không xuất hiện, không được nhắc

| | |
|---|---|
| Nhóm | Character state |

**[[master]]** đặt [[nagi]] **ở trong đền**, học Mist với [[musashi]], từ trước vạch xuất phát.

Chương đi qua nhà hai lần và không có một dấu vết nào của một đứa trẻ thứ hai đang sống ở đó. Không phải mâu thuẫn — một đứa trẻ có thể đang học bài ở phòng khác. Nhưng POV là **thầy thuốc gia đình**, và một thầy thuốc gia đình biết trong nhà có mấy đứa trẻ.

**Đề xuất:** một câu là đủ. Nó cũng trả thêm một chút cho beat *"ông không được cấp thông tin"* — trong nhà có một đứa bé nữa mà không ai kể cho ông nghe nó từ đâu tới.

---

## Vượt ra ngoài chương này — **chuyển cho `check-conflicts`**

🔴 [[khung-oc]] mục *"Bác sĩ gia đình"* **gộp hai sự kiện khác nhau** của nguyên tác thành một:

> *"the Hibari managed to bring a talented healer from India"* — xảy ra **trong lúc [[musashi]] hôn mê**, tức **~31 năm trước**
>
> *"brought in talented restoration experts from India **through their new daughter-in-law**"* — tức **qua [[indra]]**, và [[master]] xếp việc này ở **cuối** mục *Đời trước Tsuna*, để **cứu cây sakaki và ngôi đền**

Hai việc, hai thời điểm, hai mục đích. [[indra]] là mẹ [[kyouya]] *(~6–7 tuổi)*, nên bà **không thể** là cửa cho người đã đánh thức Musashi ba mươi mốt năm trước.

⚠️ Điều này **không làm hỏng** [[emb-chot-thay-thuoc]] — quyết định ấy tách hai thầy thuốc và để người Ấn Độ lại trong quá khứ, và bản nháp theo đúng thế. Nhưng ba tên Ashtavaidyan mà khung-oc đề xuất đang gắn vào **sai sự kiện**, và việc ấy sẽ cắn khi arc sau dùng tới.

---

## Bảy nhóm — nhóm nào sạch

| Nhóm | Kết quả |
|---|---|
| Timeline | 🔴 HIGH-1 · 🔴 HIGH-2 · 🟡 MEDIUM-3 |
| Knowledge boundary | ✅ **sạch** — máy 0 rò rỉ, và đọc tay cũng không thấy Gen'ichi hành động theo thứ ông chỉ ngờ |
| Character state | 🔴 HIGH-3 · 🟡 MEDIUM-1 · 🟡 MEDIUM-2 · 🟢 LOW-3 |
| World rules | 🟢 LOW-2 |
| Relationships | ✅ **sạch** — `musashi_to_tsuna: "Masaya"` tuân đúng; cư dân gọi *Tenmei-sama* đúng [[tsuna]]; [[ayame]] dùng `Ketsueki` **thắp đèn lồng**, đúng nguyên văn |
| Canon | 🟢 LOW-1 |
| Hợp đồng nhánh | ✅ **sạch** — không vi phạm mục `forbid` nào. 0 gạch ngang *(#6)*; Tsuna không được viết thành người tốt bụng *(#2)*; quyết định của thầy thuốc là **một khoảnh khắc**, không phải một quá trình dài dựng thành cảnh *(#7)* |

## Chỗ mình không chắc

- **MEDIUM-1**: mình đọc *"the child is eight or nine"* là nói về [[kyouya]] vì hộp quà ghi *"from the Hibari"* và [[kyouya-loai-chu-chot]] đang chạy. Nếu ý người viết là ****Kusakabe Tetsuya** *(chua co note)*** hay một đứa nhà Hibari khác thì nó không phải lỗi — nhưng [[tuoi-va-moc]] ghi Kusakabe **cũng gần bằng tuổi**, nên kết luận không đổi.
- **LOW-3** là **nhận xét**, không phải vi phạm. Mình ghi ở mức thấp nhất có lý do.
