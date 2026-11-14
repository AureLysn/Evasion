---
id: note.EMB.child-ch1-review-ban-20261001
type: note
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-10-01
archived_note: "Ban luu tru 01/10/2026: Aurel quyet lam lai ca du an EMB lan ba, tu khung nam arc (emb-lam-lai-lan-ba). Giu de tra; khong phai canon, khong phai mau giong."
aliases: ["review Child Ch1 ban 01-10", "Child Ch1 review ban 01-10", "kiem lien tuc Child Ch1 ban 01-10", "kiem van phong Child Ch1 ban 01-10"]
related: ["[[child-ch1-chapter-ban-20261001]]", "[[child-ch1-plan-ban-20261001]]", "[[child-dan-y-ban-20261001]]", "[[fact-sanctuary]]", "[[namimori]]", "[[genichi]]", "[[master]]", "[[05-visibility]]"]
source:
  type: inference
  ref: "check-continuity + check-style 26/09/2026 tren ban nhap child-ch1-chapter. Nguoi review cung la nguoi viet: tu review co thien kien, moi finding trich ca hai phia."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, review, k/note, p/personal]
last_updated: 2026-10-01
---

# Review — Child Ch1 *(bản nháp 26/09/2026)*

> Chỉ đọc, chưa sửa gì trong chương. Sửa hay giữ là việc Aurel quyết.
>
> ⚠️ **Người viết và người review là một.** Mỗi finding trích **cả hai phía**; chỗ nào không chắc thì ghi *không chắc*.

## Cổng máy

| | Kết quả |
|---|---|
| `pov_leak_check --scene` *(POV tsuna)* | **exit 0** · 9 secret · 0 phát hiện |
| `pov_leak_check --pov` musashi · skull · indra | 0 phát hiện mỗi POV |
| `ai_tells_check` | **exit 0** |
| `chapter_gate` | **exit 1** — luật cứng đạt; chỉ tiêu **8/10** *(xem mục Văn phong)* |

## 🔴 High

### H1 · luật thế giới — người ngoài **cảm được** một Sky mà màn Gen'ei đáng lẽ giấu hẳn

**Chương, 1.4:** *"the sudden enormous presence of something that was looking at them now, from everywhere and nowhere … Tsuna watched him fail completely to work out where it was coming from."*
**Chương, 1.5:** *"'A Sky,' he said. 'A big one. Bigger than any Flame I ever stood next to.'"*

**Note:** [[master]] dòng P1 Ch3 — *"**Hoshikuzu Ōi** phủ lên, **giấu hẳn vòm Sky** — do [[kawahira]]"*. [[namimori]]: *"một lớp Mist ngang thế phủ xuống và **giấu hẳn Lửa Sky**"*.

Chương giấu **chỗ**, không giấu **sự có mặt**, và để Ettore **gọi đúng nguyên tố**. Hai hệ quả:
- Luật: *giấu hẳn* thành *giấu chỗ* — **một luật mới**, trong khi cổng 2 của thẻ chốt *"không cần luật mới"*.
- Bí mật: thẻ cho người ngoài **thắc mắc**, không cho **đoán đúng** — [[child-ch1-plan-ban-20261001]] *"Người ngoài được thắc mắc, không được đoán đúng chỗ"*. *"A Sky"* đi xa hơn thắc mắc. Và 1.5 là mắt xích sang Ch2: điều Carcassa mang về chính là thứ Kyoto sẽ hỏi.

**Hai lối, Aurel chọn:** (a) người ngoài **không cảm được gì**; họ chỉ thấy **Skull đổi** và hiểu từ **tiếng của hợp đồng** rằng nó vừa làm việc → sửa 1.4 và 1.5 · (b) chốt luật mới *màn Gen'ei giấu chỗ, không giấu sức nặng* → ghi vào [[namimori]] / [[fact-sanctuary]], và cân nhắc lại chữ *"A Sky"*.

## 🟠 Medium

### M1 · rò kế hoạch *(nhóm 8)* — POV khẳng định phản ứng tương lai của người khác

**Chương, 1.4, trước câu hỏi:** *"He knew what to say to Skull. He knew four ways to say it, and which one would work, and what Skull's face would do under the helmet when it did."*

**Luật:** [[child-dan-y-ban-20261001]] mục *Tương lai không được kể bằng giọng đã xảy ra* — *"mọi câu kể việc người khác sẽ làm và phản ứng của họ bằng giọng của người đã chứng kiến"*. `foreshadow:` của thẻ cho `tu-bo-chuc-vu: state` — **dự định**, không phải biết trước kết quả.

**Phép thử xoá** *([[05-visibility]])*: xoá câu ấy, 1.4 vẫn đứng ⇒ đây là kế hoạch rò ra. Nó là nội tâm tự tin của Tsuna, không phải tường thuật một cảnh chưa có — nên **medium**, không phải high. Nhưng nó đúng **hình dạng** Aurel chỉ ra ở Ch2 cũ.

### M2 · luật thế giới mới — hai cửa vào: *khách* và *cư dân*

**Chương, 1.3 (Musashi):** *"You can visit. Visitors keep what they came with … Nobody can take a visitor out of here against his will … But a visitor is still somebody else's man."* — 1.4 dựng thế cờ trên đúng luật này.

**Note:** [[fact-sanctuary]] chỉ có: *"Người ngoài vào Sanctuary phải theo luật của Sanctuary"* · *"Muốn thành cư dân thường trú thì bỏ lại mọi chức vụ chính thức"*. **Không có** khái niệm *khách được che chở nhưng vẫn là người của phe kia*.

Không mâu thuẫn — là **mở rộng**. Nếu giữ, `finalize-chapter` phải ghi vào [[fact-sanctuary]] với nguồn là chương này, không phải tác giả.

### M3 · trạng thái nhân vật lấy từ state **đã gỡ**

**Chương, 1.1:** *"Sugita Gen'ichi came up the shrine steps twice a month now"*.

**Note:** [[genichi]] dòng *"Lên đền **hai lần một tháng**"* nằm trong mục **⛔ ~~Sau Child Ch1~~** — state của bản Child đã lưu trữ 25/09.

Không mâu thuẫn với note sống, nhưng nó **nhập lại một dữ kiện của bản cũ** mà không ai duyệt lại. Giữ thì ghi như dữ kiện **mới** của chương này; hoặc bỏ số.

## 🟡 Low

| # | Nhóm | Chương | Note / ghi chú |
|---|---|---|---|
| L1 | timeline | 1.1 *"thirty-one children by the end of February, and by March it would have a roster"* | [[master]]: *"thứ Ba → cuối tháng Hai: … **31 đứa và một bản phân công**"* — bản phân công có **từ cuối tháng Hai**, không phải tháng Ba |
| L2 | POV | 1.2 đóng bằng con bạch tuộc dưới cảng và *"Namimori had one for every kind of Fire …"* — Skull đang ở trên đồi và **không biết** tập quán Namimori | [[signature]]: tác giả đổi POV **theo chương hoặc cảnh**. Một đoạn kết toàn tri trong cảnh POV Skull: **không chắc** tác giả có dùng hay không |
| L3 | canon | mũ *"Purple and white"* · bạch tuộc *"four-metre"* · Skull đóng thế ở Chiba năm 19 · cú bắn đại bác xuống hồ | [[05_Evasion/01_Oeuvre/Database/Fandom/KHR/characters/Skull\|Skull (canon)]]: màu mũ chỉ có `[wiki-snippet]` *"trắng"*; các chi tiết còn lại **không có nguồn** — là bịa của nhánh |
| L4 | lore mới | sổ đặt ở **Palermo**; *"Every Famiglia in Palermo has heard of the East Asian compacts"*; chuyện Indra kể *(một Gen'ei nhà ở Kyushu, Kyoto cử hai ông già)* | chưa note nào có. [[master]] dòng P1 Ch3 ghi *"Vòm Sky thành truyền thuyết trong giới muốn biến mất"* — **khớp**, không đá |
| L5 | timeline | 1.4 *"since he was a year old and had thrown it up over the town"* | [[master]] đặt vòm ở P1 Ch3 *(~T-1)*. **Không chắc** Tsuna bao nhiêu tuổi lúc ấy |
| L6 | xưng hô | Skull → Musashi *"Old lady"*; Carcassa → Musashi *"Signora"* | chưa note quan hệ nào; **mới**, ghi lại nếu giữ |

## Tám nhóm — những nhóm sạch

| Nhóm | Kết luận |
|---|---|
| Ranh giới biết | Ngoài H1: Ettore thấy ở Tsuna *"nothing there, not a flicker"*; Musashi *"could not read this one at all"*; Tsuna gọi tên Skull chỉ **sau** khi người Carcassa gọi. Sạch |
| Trạng thái nhân vật | sẹo mười một mũi · Indra không trễ nữa · tờ chứng nhận chưa gạch · Kyouya 9 · Tsuna ba tuần nữa tròn 8. Khớp neo của thẻ |
| Quan hệ · xưng hô | Musashi → *"Masaya"*, Tsuna → *"Grandmother"* — khớp [[tsuna--musashi]]. Kyouya không gọi Tsuna lần nào |
| Hợp đồng nhánh | 0 gạch ngang; Tsuna không thành Decimo; hành động lớn là **khoảnh khắc quyết định**, không dựng quá trình dài; nghi lễ nhận người là **một nước cờ**. Kawahira, Reborn, Colonnello không lên trang |
| Rò kế hoạch — phần còn lại | `tu-bo-chuc-vu: state`: Skull cân nhắc ở 1.3, Musashi cảnh báo **có điều kiện** *("tomorrow may be after they arrive")* — trong mức. `hop-dong-giu-nguoi: none`: không câu nào đoán trước hợp đồng sẽ giữ. `tin-lan-ra-ngoai: none`: lời *"We will go home and tell the Don"* nói **tại** cảnh, là ý định |

### Ba chỗ rò đã cắt **trước** cổng — ghi để đo luật L56

Lúc viết, mình tự bắt và cắt ba câu kể tương lai bằng giọng chắc: đoạn *"By noon there would be … Tsuna did not know any of that yet"*, câu *"a war that … now never would"*, và *"You'll never find it"*. **Không cổng máy nào bắt được chúng**; chỉ lượt tự soát. M1 là chỗ thứ tư, lọt qua cả lượt ấy.

## Văn phong *(check-style)*

### Luật cứng — **đạt cả**

| Luật | Đo |
|---|---|
| gạch ngang `—` `–` | **0** |
| `…` ≥ 60 % số chấm lửng | **100 %** *(0 `...`)* |
| cụm cấm dùng chung + riêng truyện | **0** *(`chapter_gate`, `ai_tells_check`, và grep rộng)* |
| phủ định cụt đính chính khái niệm | **0** — `ai_tells` từng bắt *"Not frightened."* ở 1.3, đã sửa; regex còn khớp *"It was not a large book. It was bound…"* nhưng đó là **mô tả**, không đính chính khái niệm |

### Chỉ tiêu — `chapter_gate` **8/10**

| Chỉ số | Đo | Chỉ tiêu | Tác giả | |
|---|---|---|---|---|
| số từ | **7.821** | 8.000–13.000 | 7.551 | ❌ **lệch** — thẻ ước 9.400; hụt ở 1.1 · 1.2 · 1.3 · 1.5 |
| câu trung vị | **8** *(`chapter_gate`)* · **10** *(`ai_tells`)* | 10–14 | 11 | ❌ theo `chapter_gate` — **hai công cụ đếm khác nhau trên cùng văn bản** |
| câu ≥ 35 từ | 5,1 % | ≤ 9 | 4,0 | ✅ |
| đoạn TB | 34,2 *(style_metrics 33,4)* | 30–40 | 36,1 | ✅ |
| `?` /10k | 32,0 | ≥ 30 | 49,8 · Part 2 **64,7** | ✅ nhưng **dưới xa Part 2** |
| `!` /10k | 8,9 | ≥ 5 | 13,2 | ✅ |
| nghiêng /10k | 95,7 | ≥ 60 | 109,1 | ✅ |
| `…` /10k | 16,6 | ≥ 12 | 23,3 | ✅ *(bản đầu **2,6** — sửa bằng chỗ lời nói bỏ lửng thật)* |
| thuật ngữ /1000 | 7,27 *(gate)* · 8,18 *(style_metrics)* | ≥ 7 | 13,19 | ✅ — không từ nào gánh quá nửa *(Arcobaleno 10 · Flame 9 · Fire 7 · Getsufuji 7)* |
| `had` /10k | 201,6 | ≤ 210 | 166,3 | ✅ nhưng **sát trần** |

### Thoại

| | Đo | Mốc |
|---|---|---|
| % từ nằm trong thoại | **18,7 %** | tác giả Part 2 **20,9 %** · trần của thẻ ≤ 28 % |
| trung vị một đoạn trích dẫn | **4 từ** | tác giả 9 · thẻ ≥ 8 — ⚠️ **đếm theo từng cặp ngoặc kép**, nên câu bị cắt bởi *said X* thành hai mảnh; con số này **thấp hơn thật**. Chưa có thước cùng cách đếm với mốc tác giả |

### Đọc — thứ đếm không thấy

| | Chỗ | Đánh giá |
|---|---|---|
| **Fire / Flame theo người kể** | Musashi *"every scrap of Fire"* · Ettore *"A Sky … any Flame"* · Skull *"his Cloud Flame"* · tường thuật Tsuna trong Namimori *"his own Fire"* | ✅ đúng [[signature]] mục 5 |
| **Câu cực ngắn làm nhịp** | 118 câu ≤ 3 từ | ✅ có |
| **Đóng chương bằng một nhịp ngắn đứng riêng** | *"Down in the harbour, very carefully, the octopus gave the fishermen back another fish."* | ✅ |
| 🟠 **Tật nối "and … and … and"** | bản đầu có câu 70 từ; đã tách 18 câu. Còn lại: đoạn 155 từ ở 1.5 *(Ettore đi tìm Sky)* | tật của người viết, không phải của tác giả — đoạn TB vẫn trong khung |
| 🟡 **Gọi tên cảm xúc thay vì dựng** | 1.4 *"It had cost him more than he was prepared to admit."* | một chỗ; nhẹ |
| 🟡 **`?` thấp so với Part 2** | 32 so với 64,7 | giọng Part 2 **hỏi nhiều hơn gấp đôi**; chương này hỏi đủ sàn nhưng chưa ra giọng ấy |

### Luật từ vựng theo lãnh thổ — **cần Aurel chốt**

POV Skull *(1.2)* và POV Ettore *(1.5)* dùng **hệ Ý** trong tường thuật, cả khi Skull đã ở trong Namimori — theo thẻ. [[emb-chot-danh-xung-theo-lanh-tho]] có hai hàng *"người Namimori nói **hoặc** cảnh trong lãnh thổ → hệ Nhật"* và *"không phải người Namimori **hoặc** ngoài lãnh thổ → tiếng Anh"* — **cả hai đều khớp** trường hợp *người ngoài đang ở trong lãnh thổ*. Note không phân xử.

# ✅ Kết quả sửa — 26/09/2026 *(Aurel: "H1 chọn (a), giữ M2, bỏ M3, sửa đi")*

| | Quyết | Đã làm |
|---|---|---|
| **H1** | **(a)** — người ngoài không cảm được gì | 1.4: họ **thấy Skull đổi** *(Lửa nằm xuống, vai hạ, tay buông)* và tìm người đã làm việc ấy, không thấy ai. 1.5: Ettore nói *"The compact took him"* · *"I didn't feel a thing" — "Neither did I"*; bỏ *"A Sky"*; người thầy cũ tìm *"a Flame user"*, không tìm *"a Sky"*. Câu tường thuật của Tsuna đổi thành màn Gen'ei giấu **cả sự có mặt** của Kotei, khớp [[master]] |
| **M2** | **giữ** | chữ không đổi. ⚠️ `finalize-chapter` phải ghi luật *khách / cư dân* vào [[fact-sanctuary]], nguồn là chương này |
| **M3** | **bỏ** | *"twice a month"* → *"more often now"* |
| **M1** | *(Aurel không nhắc — sửa vì thuộc lời dặn của Aurel về tương lai)* | *"He could see what Skull needed to hear … a guess about which one might reach … and no way at all of knowing whether it would."* |
| **L1** | *(sai dữ kiện — sửa)* | bản phân công có **từ cuối tháng Hai** |
| L2–L6 | để nguyên | chờ Aurel |

**Cổng sau sửa:** `pov_leak_check` exit 0 *(bốn POV)* · `ai_tells_check` exit 0 · `chapter_gate` exit 1 — luật cứng đạt, chỉ tiêu **7/10**: số từ **7.930** · câu trung vị **8** · mật độ thuật ngữ **6,94** *(thiếu đúng một thuật ngữ; H1 bỏ các chữ Sky/Flame ở 1.4–1.5)*. Không nhét chữ.

