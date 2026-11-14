---
id: info.EMB.brat-ch2-review-ban-20261001
type: info
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-10-01
archived_note: "Ban luu tru 01/10/2026: Aurel quyet lam lai ca du an EMB lan ba, tu khung nam arc (emb-lam-lai-lan-ba). Giu de tra; khong phai canon, khong phai mau giong."
aliases: ["review Brat Ch2 ban 01-10", "kiem lien tuc Brat Ch2 ban 01-10", "continuity review chuong 2 Brat ban 01-10", "loi lien tuc ch2 ban 01-10"]
related: ["[[brat-ch2-chapter-ban-20261001]]", "[[brat-ch1-chapter-ban-20261001]]", "[[brat-dan-y-ban-20261001]]", "[[master]]", "[[tuoi-va-moc]]", "[[tsuna--kyouya]]", "[[tsuna--shouichi]]", "[[shouichi]]", "[[kyouya]]", "[[aurel-main]]", "[[emb-chot-shouichi-kiep-truoc]]"]
source:
  type: inference
  ref: "check-continuity 17/09/2026, Mode 1, tren ban nhap brat-ch2-chapter.md (10.760 tu). Co hoc: pov_leak_check tach theo POV -> 0 phat hien moi phan."
authority: ai
confidence: 0.8
always_load: false
load_for: [reviewer, writer]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-01
---

# Review liên tục — Brat Ch2, bản nháp đầu

> Chỉ đọc. Không sửa một chữ nào của chương.

## Cổng cơ học — và vì sao nó phải chạy hai lần

Chạy cả file một lượt thì `pov_leak_check` báo **2 HIGH** với `--pov tsuna` và **1 HIGH** với `--pov kyouya`. Không cái nào là rò rỉ thật:

| Chạy với | Báo ở đâu | Thực tế |
|---|---|---|
| `--pov tsuna` | *"bigger carnivore"*, *"false carnivores"* | nằm trong **khối 2.4**, POV [[kyouya]] — cậu **biết**, đó là bí mật của chính cậu |
| `--pov kyouya` | *"sakaki"* | nằm trong **cảnh 2.0**, POV Tsuna — cậu **biết** |

Mỗi POV chỉ báo thứ nằm trong phần của POV **kia**. Tách file theo mục rồi chạy lại:

```
phan Tsuna (2.0, 2.1, 2.2, 2.3, 2.5) --pov tsuna   -> 0 phat hien
khoi 2.4                             --pov kyouya  -> 0 phat hien
```

🔴 **Công cụ không xử lý được chương đa POV**, và nó sẽ báo động giả ở **mọi** chương có khối POV phụ — tức cả arc này và phần lớn arc sau, vì đổi POV là kết cấu của tác giả *([[truc-chinh]]: POV không-phải-Tsuna chiếm phần lớn ở 4/5 chương gốc)*. Đề nghị: ghi cách tách file này thành thủ tục, hoặc `pov_leak_check` cần một cờ `--section`.

## ✅ Vòng sửa 2 — văn phong, 17/09/2026

> Aurel: *"sửa B, chấp nhận C"*.

### 🔴 B đã sửa — `…` từ **6,5** lên **27,1**

| | Trước | Sau | Chỉ tiêu | Tác giả |
|---|---|---|---|---|
| `…` /10k | **6,5** | **27,1** | ≥12 | 23,3 *(khoảng từng chương: 8,8–40,1)* |
| số dấu `…` | 7 | **29** | | |
| tỉ lệ `…` trên tổng chấm lửng | 100 % | **100 %** | ≥60 % | 88 % |

Thêm **25 chỗ**, không rắc đều mà đặt vào chỗ **có nhịp thật**:

| Ai | Bao nhiêu | Vì sao |
|---|---|---|
| [[sachiko]] | 6 | cảnh 2.2 mô tả bà *"continuing to speak clearly while everything under the sentence came apart"*. Đó chính là thứ `…` dùng để viết |
| [[shouichi]] | 4 | một đứa nhút nhát, đau bụng, ngại nói ra |
| [[tsuna]] nội tâm | 6 | chỗ ý nghĩ gãy giữa chừng |
| [[musashi]] · bác Kusakabe · [[genichi]] · [[indra]] | 5 | mỗi người một, ở chỗ họ thật sự dừng |
| Văn kể | 4 | |

🔴 **Cố ý KHÔNG thêm cho [[kyouya]] một dấu nào.** Cậu ta không bỏ lửng câu; đó là nhân vật, không phải nhịp. Khối 2.4 giữ nguyên.

⚠️ **27,1 hơi cao hơn mức gộp của tác giả (23,3)**, nhưng nằm gọn trong khoảng từng chương của bà *(8,8 ở P1 Ch1 tới 40,1 ở P1 Ch3)*. Báo số, không ép xuống.

### ✅ C được chấp nhận — `had` **290,6**, giữ nguyên

Aurel chấp nhận. Lý do đứng được: bốn trên sáu cảnh là **kể lại**, và [[signature]] gọi `had` dày là **chỉ dấu thể loại của đoạn**, không phải lỗi.

⚠️ **Nhưng ghi lại để theo dõi**, vì nó vượt cả chương hồi tưởng nặng nhất của tác giả *(243,2)* **19 %**, và vì nó đi cùng tật `He had` mở **15/460** đoạn. Nếu Ch3 cũng trên 250 thì đó không còn là thể loại đoạn nữa mà là giọng kể đang trôi.

### Đo lại sau vòng sửa 2

| Chỉ số | Sau | Chỉ tiêu | |
|---|---|---|---|
| số từ | 10.763 | 8.000–13.000 | ✅ |
| câu trung vị | 12 | 10–14 | ✅ |
| câu dài ≥35 từ | 8,7 % | ≤9 % | ✅ *(8,5 → 8,7, nhích do nối mệnh đề)* |
| `?` /10k | 40,3 | ≥30 | ✅ |
| `!` /10k | 15,6 | ≥5 | ✅ |
| *nghiêng* /10k | 71,4 | ≥60 | ✅ |
| **`…` /10k** | **27,1** | ≥12 | ✅ |
| thuật ngữ /1000 | 7,43 | ≥7 | ✅ |
| `had` /10k | 290,6 | ≤210 | 🟡 **chấp nhận có ghi chú** |
| em dash | 0 | 0 | ✅ |

**Chín trên mười chỉ tiêu đạt.** Chỉ còn `had`, và nó là chỗ Aurel đã quyết.

`ai_tells_check` → **exit 0** · `style_metrics --write` → **exit 0** · `pov_leak_check` tách POV → **0/0**.

---

## Văn phong — `check-style`, 17/09/2026

> Chạy trên bản **sau vòng sửa 1**. `style_metrics --write --json` → **exit 0**. Chỉ đọc, không sửa.
> Prose tiếng Anh, nên ba mục kiểm riêng cho văn Việt không áp dụng.

### Luật cứng — ✅ **5/5 đạt**

0 gạch ngang · `…` chiếm **100 %** số chấm lửng · 0 nhịp *"Not X. It was Y."* · 0 trong bảy cụm cấm · ghi chú để ngoài file. `ai_tells_check` → **exit 0**.

### Chỉ tiêu — 7 đạt · **3 trượt**

| Chỉ số | Ch2 | Ch1 | Chỉ tiêu | Tác giả (P2) | |
|---|---|---|---|---|---|
| số từ | 10.760 | 9.561 | 8.000–13.000 | 9.409 | ✅ |
| câu trung vị | 12 | 11 | 10–14 | 11 | ✅ |
| câu dài ≥35 từ | 8,5 % | 8,5 % | ≤9 % | 3,1 % | ✅ |
| **đoạn trung bình** | **23,4** | 21,9 | **30–40** | 35,0 | 🟡 xem A |
| `?` /10k | 41,2 | 52,6 | ≥30 | 64,7 | ✅ |
| `!` /10k | **15,6** | 6,2 | ≥5 | 13,2 | ✅ |
| *nghiêng* /10k | 70,5 | 82,7 | ≥60 | 106,2 | ✅ |
| **`…` /10k** | **6,5** | 18,0 | **≥12** | 23,3 | 🔴 **trượt, xem B** |
| thuật ngữ /1000 | 7,43 | 7,01 | ≥7 | 14,46 | ✅ |
| **`had` /10k** | **290,6** | 185,0 | **≤210** | 149,8 | 🔴 **trượt, xem C** |

---

### 🟡 A — Đoạn trung bình 23,4, nhưng **đoạn văn xuôi thuần đã vào khoảng**

Bỏ hết dòng thoại ra: **31,7 từ/đoạn** — **nằm trong 30–40**. Ch1 là 27,8, tức dưới sàn. Đoạn văn xuôi đã dài ra và đúng hướng.

Con số 23,4 bị kéo xuống vì **45 %** số đoạn là thoại. Và tỉ lệ thoại tính **theo từ** là **21,2 %**, so với **20,9 %** của tác giả ở Part 2 — gần như trùng khít *(Ch1 là 25,0 %)*.

→ **Không phải vấn đề.** Ghi lại để thấy nó đã tự sửa, không cần đụng.

### 🔴 B — `…` tụt xuống **6,5**, và đó là **công cụ ngắt nhịp chính của tác giả**

Chỉ **7 dấu** trong 10.760 từ. Ch1 có **17** trong 9.561.

[[hard-rules]] §2 nói thẳng vì sao nó quan trọng hơn một chỉ số thường:

> *"`…` là công cụ ngắt nhịp chính của tác giả — nó làm việc mà gạch ngang làm ở tác giả khác. **Mất nó là mất nhịp, không phải mất một dấu câu.**"*

🔴 Và nó **không** phải chuyện độ dài chương: tính trên 10k từ thì Ch2 chỉ dùng bằng **một phần ba** Ch1 và **hơn một phần tư** tác giả.

**Nguyên nhân đo được, và nó là hệ quả của chính vòng sửa văn phong.** Ba vòng cắt câu dài đã thay phần lớn chỗ ngắt bằng **dấu chấm**: câu dài ≥35 từ từ 16,4 % xuống 8,5 %, nhưng thứ thay vào là câu ngắn đứng riêng, không phải `…`. Mình đã sửa đúng một chỉ số bằng cách làm hỏng một chỉ số khác.

**Đây là chỉ tiêu, không phải luật cứng.** Nhưng mình **đề nghị sửa**, khác với hai chỗ lệch ở Ch1: ở đó lệch là hệ quả của POV *(một ông già ghi bệnh án)*, còn ở đây lệch là **dấu vết của quy trình**, không phải của nhân vật. Sửa rẻ: khoảng mười chỗ ngắt trong thoại và nội tâm Tsuna đổi từ dấu chấm sang `…`.

### 🔴 C — `had` **290,6**, vượt cả trần lẫn mức cao nhất của tác giả

| | |
|---|---|
| Chỉ tiêu | **≤ 210** |
| Ch2 | **290,6** |
| Cao nhất của tác giả | **243,2** — P1 Ch2, chương tiểu sử Musashi, gần như không có thoại |

[[signature]] gọi `had` là **chỉ dấu của chương hồi tưởng**: *"thì quá khứ hoàn thành dày lên đúng ở chỗ tác giả **kể lại** thay vì **dựng cảnh**"*.

Và Ch2 đúng là chương hồi tưởng nặng nhất từ trước tới giờ: ký ức kiếp trước ở 2.0, sáu năm chờ đợi ở 2.1, Kyouya xét lại toàn bộ dự đoán ở 2.4, và một đoạn biên niên năm tháng ở 2.5. Bốn trên sáu cảnh **kể lại**.

⚠️ **Nhưng lý do ấy không đủ để bỏ qua**, vì chương tiểu sử của tác giả — thứ gần nhất với loại này — dừng ở **243**. Ch2 vượt nó **19 %**.

🔴 Chỗ đáng xem không phải cảnh 2.0 *(hồi tưởng thì phải có `had`)*, mà là **2.1 và 2.4**: cả hai đang **kể** những thứ có thể **dựng**. Cụ thể, đoạn *"He had known it at one month old…"* ở 2.1 và *"He had made a number of plans on that basis"* ở 2.4 đều là tóm tắt quá khứ có thể đổi thành hiện tại của cảnh.

→ **Quyết định của Aurel.** Chấp nhận vì thể loại đoạn, hay sửa hai chỗ ấy?

---

### ✅ Bốn thứ tốt lên so với Ch1 — đo được

| | Ch1 | Ch2 | |
|---|---|---|---|
| `!` /10k | 6,2 | **15,6** | 🔴 Chỗ `check-style` Ch1 cảnh báo *"một chương thì ổn, hai chương là xu hướng"* — **đã dứt**, và giờ vượt cả tác giả |
| Thuật ngữ do một từ gánh | **Ruriko 43 %** | **Fire 11 %** là cao nhất | không từ nào gánh quá 1/9. Tác giả: cao nhất 28,3 % |
| Hit giả trong mật độ thuật ngữ | `Rain` = *"it was raining"* đẩy 6,96 lên "7,01" | 3 hit thời tiết trên 80 → **7,15 sau khi trừ**, vẫn trên sàn | con số lần này **thật** |
| % từ trong thoại | 25,0 % | **21,2 %** | tác giả Part 2: **20,9 %** |

### 🟡 Hai tật lặp **qua cả hai chương** — đây là cái `check-style` phải bắt

| Tật | Ch1 | Ch2 |
|---|---|---|
| `It was the <…>` làm câu chốt đoạn | 3 | **4** |
| `He had …` mở đoạn | — | **15 / 460 đoạn** |

🔴 Cái thứ nhất là **n-gram lặp qua chương**, đúng loại mà [[quy-trinh-viet]] dựng cổng để bắt, và đúng lý do nó nguy hiểm: *"nó **có vẻ hay**, nên không tự báo lỗi"*. Bảy lượt cùng một khuôn ở cùng một vị trí trong hai chương liên tiếp là **một khuôn**, không phải bảy câu.

⚠️ Cái thứ hai nối thẳng vào C: mười lăm đoạn mở bằng `He had` là cùng một triệu chứng với `had` 290 — chương đang **kể** nhiều hơn **dựng**.

### ✅ Năm mẫu AI của [[forbidden-patterns]]

| | |
|---|---|
| 1 · Câu tổng kết cảm xúc cuối đoạn | **0** |
| 2 · *"không phải X, mà là Y"* | **0 lượt** trong 10.760 từ |
| 3 · Liệt kê ba vế | **6 cụm** — không phải vấn đề |
| 4 · Tính từ cảm xúc thay hành vi | **2** *(`delighted`, `furious`)*, cả hai đi kèm hành vi cụ thể. Không thành mẫu |
| 5 · Mở đoạn bằng trạng ngữ thời gian lặp | **0** — nhưng xem tật `He had` ở trên |

Và hai thói quen của tác giả: **mở chương bằng trạng thái bình thường rồi phá** ✅ *(buổi chơi → tin sát thủ)* · **đóng bằng nhịp ngắn đứng riêng** ✅ *(Shouichi gọi "Tsuna!" và cậu quay lại)*.

---

## ✅ Vòng sửa 1 — 17/09/2026

| | Phát hiện | Đã làm gì |
|---|---|---|
| 🔴 | HIGH-1 sinh nhật | Biên niên rút **chín tháng → năm tháng**, và các mốc mùa thành **tháng Sáu · tháng Chín · đầu tháng Mười · tháng Mười Một**. Sinh nhật thứ bảy giờ rơi vào **tháng Mười**, tức bảy tháng sau Ch1 và mười tháng sau lễ cưới cáo. Khớp |
| 🟡 | MEDIUM-1 Tsuna gọi Kyouya | ✅ **Aurel chốt: "Kyouya"**. Ghi vào `addressing` của [[tsuna--kyouya]] kèm nguyên văn và lý do; **văn không sửa** |
| 🟡 | MEDIUM-2 tuổi Shouichi | *"seven-year-old"* · *"seven years"* → **sáu**, cả hai |
| 🟢 | LOW-1 Takeshi | *"about seven"* → **sáu tuổi** *(hai chỗ)* |
| 🟢 | LOW-2 Kyouya | ba chỗ *"seven-year-old"* → **sáu**, khớp với Ch1 |
| 🟢 | LOW-3 bốn/chín tháng | thêm *"a further four months"* — hai khoảng giờ đọc ra là nối tiếp, không phải mâu thuẫn |

**Còn 0 lượt "seven" chỉ tuổi trong cả chương.**

### 🔴 Vòng sửa bắt thêm một lỗi cứng — và nó lại ở frontmatter

`ai_tells_check` báo **`—` x1**. Không nằm trong văn xuôi. Nó nằm trong `source.ref` của chính chương, do phiên này viết vào khi sửa báo động giả lần trước.

⚠️ **Đây là lần thứ hai frontmatter làm vỡ một cổng ở đúng chương này** *(lần một: chữ "bigger carnivore" trong `source.ref` làm `pov_leak_check` báo HIGH giả)*. Kết luận dùng được cho mọi chương sau:

> **Frontmatter của một file chương bị CẢ `ai_tells_check` LẪN `pov_leak_check` quét.** Nên nó không được chứa em dash, và không được nêu tên secret. Đã ghi câu này vào `source.ref` của chương để lượt sau khỏi mắc lại.

### Đo lại sau vòng sửa

| | Trước | Sau | Chỉ tiêu |
|---|---|---|---|
| số từ | 10.760 | **10.760** | 8.000–13.000 |
| câu trung vị | 12 | 12 | 10–14 |
| câu dài ≥35 từ | 8,6 % | **8,5 %** | ≤9 % |
| `?` /10k | 41,3 | 41,2 | ≥30 |
| `!` /10k | 15,6 | 15,6 | ≥5 |
| *nghiêng* /10k | 70,7 | 70,5 | ≥60 |
| thuật ngữ /1000 | 7,53 | **7,43** | ≥7 |
| em dash | 1 *(frontmatter)* | **0** | 0 |

`ai_tells_check` → **exit 0** · `style_metrics` → **exit 0** · `pov_leak_check` tách POV → **0/0**.

⏸ **Hai ghi chú ở cuối file vẫn mở**, cố ý không đụng: ghi mốc sinh nhật ngược vào [[master]] *(việc của `finalize-chapter`)*, và quyết định về tuyến **bond bám vào cây sakaki** *(dựng hook hay cắt)*.

---

## Tổng kết

| Mức | Số |
|---|---|
| 🔴 **high** | **1** — Timeline |
| 🟡 medium | 2 — Relationships ×1 · Character state ×1 |
| 🟢 low | 3 |
| 📌 ghi chú *(không phải lỗi)* | 2 |

---

## 🔴 HIGH-1 — Sinh nhật thứ bảy rơi muộn khoảng một năm so với mốc đã chốt

| | |
|---|---|
| Nhóm | Timeline |
| Vị trí | đoạn biên niên 2.5 |
| Trái với | [[master]] · [[tuoi-va-moc]] |

**Chương viết:**

> *"The paperwork took nine months…"*
> *"In the summer he had a chest infection… In the autumn a school medical… In the winter there was a fall from a wall…"*
> *"And **in the spring, three weeks after his seventh birthday**, Sugita Gen'ichi signed the certificate."*

**[[master]] viết:**

> *"**tháng 12, Tsuna 6 tuổi — ngày 0** · Mưa lúc nắng → kitsune no yomeiri. Lễ cưới cáo"*

Và [[brat-ch1-chapter-ban-20261001]] đặt Ch1 vào **tháng Năm**, gọi cậu là *"a six-year-old"*, khoảng năm tháng sau lễ cưới.

**Ghép lại thì không khớp.** Nếu cậu **6 tuổi vào tháng Mười Hai** và **vẫn 6 vào tháng Năm** kế tiếp, thì sinh nhật thứ bảy rơi vào **khoảng bảy tháng sau tháng Năm ấy** — tức muộn nhất là mùa đông. Nhưng chương cho chín tháng giấy tờ *bắt đầu sau nghi lễ* **(cuối tháng Năm)* rồi mới tới sinh nhật, đẩy nó sang **mùa xuân năm sau nữa**.

→ Để chương đúng như đang viết, cậu phải **6 tuổi suốt gần hai năm**.

**Sửa rẻ nhất — hai lối, cả hai đều một dòng:**

| Lối | |
|---|---|
| **A** | rút *"nine months"* xuống **sáu tháng**, và đổi *"in the spring"* thành **mùa thu** hoặc **đầu đông**. Không cảnh nào phụ thuộc vào mùa ở đoạn này |
| **B** | giữ chín tháng, bỏ hẳn từ chỉ mùa — chỉ viết *"three weeks after his seventh birthday"* |

⚠️ Lối B rẻ hơn nhưng bỏ mất một thứ có ích, xem 📌 GHI-CHÚ-1.

---

## 🟡 MEDIUM-1 — Tsuna gọi thẳng **"Kyouya"**, thứ note quan hệ cấm bịa

| | |
|---|---|
| Nhóm | Relationships |
| Vị trí | cảnh 2.3, hai lượt |
| Trái với | [[tsuna--kyouya]] |

**Chương viết:**

> *"Small animal."* / *"**Kyouya.**"*

> *"**Kyouya.**"* *(khi cậu gắt lại giữa đoạn đối thoại về bond)*

**[[tsuna--kyouya]] viết:**

> | Tsuna → Kyouya | chưa có trong văn bản gốc. **Không được bịa** |

Chiều ngược lại thì đúng: [[kyouya]] gọi *"small animal"* và **không dùng tên lần nào** trong cả chương ✅.

⚠️ **Mình không chắc đây là lỗi hay là việc phải làm.** Chương này có hai người nói chuyện với nhau suốt một cảnh dài; Tsuna phải gọi cậu ta bằng **một thứ gì đó**, và note chỉ nói *chưa có trong nguyên tác*, không nói *cấm quyết*. Nhưng nó nói **không được bịa**, và một bản nháp thì đúng là đang bịa.

→ Đây là **một quyết định cho Aurel**, không phải một chỗ sửa: chốt cách Tsuna gọi Kyouya, rồi ghi vào `addressing` của [[tsuna--kyouya]]. Ứng viên trong chương: **"Kyouya"** trần *(thân, và hợp với việc hai đứa là anh em họ)*.

---

## 🟡 MEDIUM-2 — Shouichi bảy tuổi ở Ch2, sáu tuổi ở Ch1

| | |
|---|---|
| Nhóm | Character state |
| Vị trí | 2.0, hai chỗ |
| Trái với | [[brat-ch1-chapter-ban-20261001]] · [[tuoi-va-moc]] |

**Ch2 viết:**

> *"he had simply been standing in a park thinking about a dead man while a **seven-year-old** walked right up to him"*
> *"You've been hearing it wrong for **seven years**."*

**Ch1 viết** *(đã sửa ở vòng 1 theo đúng review trước)*:

> *"A pause, while **six years** of hard experience were consulted."*

[[tuoi-va-moc]] ghi *"Irie Shouichi | tiểu học, ~6–7"*, nên **bảy không sai tuyệt đối** — nhưng hai chương cách nhau **bốn ngày** và cho hai con số khác nhau.

🔴 Và nó đụng đúng chỗ đắt: cả arc dựa trên việc Shouichi **ngang tuổi** Tsuna. Tsuna là **sáu**. Một đứa bảy tuổi rủ một đứa sáu tuổi chơi vẫn là lòng tốt của anh lớn, tức đúng cái [[khung-oc]] muốn tránh.

**Sửa rẻ nhất:** đổi cả hai chỗ về **sáu**.

---

## 🟢 LOW-1 — Takeshi "about seven"

[[tuoi-va-moc]] ghi **Yamamoto Takeshi ~6** *(canon cùng tuổi Tsuna)*. Chương 2.2 viết *"about seven, taller than her already"*. Cùng họ với MEDIUM-2 và sửa cùng lượt.

## 🟢 LOW-2 — Kyouya "seven years old" ở Ch2, "about six" ở Ch1

[[tuoi-va-moc]] cho **~6–7**, nên cả hai đều nằm trong khoảng. Nhưng hai chương nên nói cùng một con số. Không chặn gì.

## 🟢 LOW-3 — "bốn tháng" và "chín tháng" trong cùng một đoạn

2.5 viết *"The paperwork took **nine months**"* rồi vài đoạn sau *"he had spent **four months** arranging for it to be exactly that boring"*. Hai việc khác nhau *(tích luỹ hồ sơ · dàn xếp phía Ý)* nhưng đặt gần nhau thì đọc như mâu thuẫn. Một chữ *"another"* là xong.

---

## 📌 GHI-CHÚ-1 — Chương **được phép** chốt mùa sinh nhật, và phải ghi ngược lại

Không phải lỗi. [[tuoi-va-moc]] §4 nói thẳng:

> *"đừng mở lại câu **'Tsuna tròn 7 lúc nào'** như một câu hỏi chặn. Nó không chặn. **Chương nào cần thì chương đó tự định, rồi ghi ngược lại vào [[master]]**."*
>
> **Aurel, 09/09/2026:** *"7 tuổi lúc nào thì phải xem phát triển nội dung chứ không quyết định trước"*.

→ Ch2 đang thực hiện đúng cơ chế ấy. HIGH-1 **không phải** vì chương dám chốt, mà vì **con số nó chốt không khớp** với mốc tháng Mười Hai.

🔴 **Kéo theo một việc bắt buộc khi `finalize-chapter`:** ghi mốc sinh nhật đã chốt ngược vào [[master]] và [[tuoi-va-moc]]. Nếu quên, chương sau lại tự định một lần nữa và hai chương đá nhau.

## 📌 GHI-CHÚ-2 — Bond bám vào cây sakaki: **vật liệu mới, chưa có note**

Chương phát minh một thứ không có trong bất kỳ note nào:

> *"It had gone to the place his Fire actually lived, out under a tree in the dark, and it had attached itself there instead…"*
> *"…the route **was** marked, which meant a sufficiently sensitive person standing in the right place could in principle follow it."*

Nó **không mâu thuẫn** với [[fact-loi-flame]] *(lõi nằm trong mạng mạch cây sakaki, cơ thể đẩy nó xa crux)* — nó suy ra từ đó, và suy ra hợp lý.

Nhưng nó **mở một tuyến mới**: có một đường dẫn tới cây mà người đủ nhạy có thể lần theo. Đó là một hook, và hook không có note thì lượt sau bị đọc như chi tiết nền hoặc bị mâu thuẫn mất.

→ Chuyển cho `finalize-chapter`: hoặc dựng note hook, hoặc cắt hai câu ấy. **Không để nguyên mà không khai.**

---

## Bảy nhóm — nhóm nào sạch

| Nhóm | Kết quả |
|---|---|
| Timeline | 🔴 HIGH-1 · 📌 GHI-CHÚ-1 |
| Knowledge boundary | ✅ **sạch** — máy 0 rò rỉ sau khi tách POV. Đọc tay: [[sachiko]] biết *"sáu năm"* và **không** biết gì thêm; không secret nào đổi `known_by` |
| Character state | 🟡 MEDIUM-2 · 🟢 LOW-1 · 🟢 LOW-2 |
| World rules | ✅ **sạch** — bảng bảy Flame dùng đúng [[rule-danh-xung-flame]] ở cả năm người: *Kotei/Kohaku/Tenmei* · *Gen'ei/Ruri/Ruriko* · *Ketsueki/Kogyoku* · *Yasuragi/Seigyoku/Seiran* · *Getsufuji/Shimizuakira/Akizuki*. Và [[kyouya]] **đã có sẵn** `Getsufuji` với `Akizuki` trong `aliases` |
| Relationships | 🟡 MEDIUM-1 |
| Canon | ✅ **sạch** — *"flame negative at age seven"* là nguyên văn P1 Ch3; [[fact-loi-flame]] được tôn trọng, kể cả vế *"đợi lớn rồi cũng không đủ"* |
| Hợp đồng nhánh | ✅ **sạch**, xem dưới |

### Hợp đồng nhánh — đối chiếu từng mục có liên quan

| `forbid` | |
|---|---|
| #2 *viết Tsuna như người tốt bụng* | ✅ cậu nói thẳng lý do không báo trước là **không tìm được câu nào**, không phải lòng tốt |
| #4 *chọn lại bộ Guardian canon* | ✅ [[kyouya]] là ngoại lệ đã ghi. Và bond **không** được viết như "cửa thứ hai" — đúng cảnh báo của [[hook-ba-cua-con-lai]] |
| #6 *em dash* | ✅ **0** |
| #7 *dựng cảnh trong một hành động lớn* | ✅ vụ chặn kể bằng **hai mép** *(tin trước, tin sau)* cộng một lượt **kể lại** của bác Kusakabe. Không có một câu nào bên trong cuộc đánh |
| Hai sự kiện **không nối nhân quả** | ✅ sát thủ *(tháng Năm)* và bond *(chín ngày sau)* không cái nào là nguyên nhân của cái kia; chương không gợi ý thế |

🟡 **Một chỗ mình không chắc, ghi lại chứ không tính là vi phạm.** `forbid` #2b cấm **đặt Tsuna vào danh sách người được cứu**. 2.5 có:

> *"he had just spent four months and a great deal of other people's goodwill on making certain that a family who had never wanted him would go on not looking for him."*

Đọc một cách thì đó là cậu **tự đưa mình vào danh sách** — vi phạm. Đọc cách khác thì đó là chương **nêu đúng luận đề**: cậu làm một việc cho chính mình và lập tức thấy khó chịu vì đã tiêu thiện chí của người khác vào đó. Mình nghiêng về cách thứ hai, nhưng đây là **ranh giới của Aurel**, không phải của mình.

## Chỗ mình không chắc

- **MEDIUM-1** có thể là *"cần một quyết định"* chứ không phải *"cần sửa"*. Mình ghi ở medium vì note dùng chữ **"không được bịa"**, và bản nháp đang bịa.
- 🟡 **forbid #2b** ở trên.
- Lời thoại của [[sachiko]] dài và rất chủ động với một người phụ nữ vừa suýt mất mạng. Mình **không** ghi thành phát hiện vì không có note nào về giọng bà để đối chiếu — [[sachiko]] mới dựng hôm nay và mục *"Giọng và cách nói"* còn trống. Đó là việc của `check-style`, hoặc của một lượt bổ sung hồ sơ.
