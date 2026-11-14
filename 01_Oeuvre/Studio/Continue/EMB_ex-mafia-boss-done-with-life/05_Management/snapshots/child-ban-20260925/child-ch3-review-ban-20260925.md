---
id: chapter.EMB.child-ch3-review-ban-20260925
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
aliases: ["review Child Ch3 ban 25-09", "check-continuity Child Ch3 ban 25-09", "check-style Child Ch3 ban 25-09", "loi he danh xung ban 25-09", "Ruriko hay Ruri ban 25-09"]
related: ["[[child-ch3-chapter-ban-20260925]]", "[[child-ch3-the-canh-ban-20260925]]", "[[rule-danh-xung-flame]]", "[[tomoko]]", "[[yasuyuki]]", "[[noriyuki]]", "[[emb-chot-cap-song-sinh]]", "[[fact-tap-quan-doi-voi-tung-he-lua]]", "[[hard-rules]]", "[[targets]]"]
source:
  type: measured
  ref: "Do 21/09/2026 bang chapter_gate.py, style_metrics.py, pov_leak_check.py, ai_tells_check.py, cong cac phep grep tu viet."
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, review, k/note, p/personal]
last_updated: 2026-09-25
---

# Child Ch3 — check-continuity và check-style

## Cổng

| | |
|---|---|
| `chapter_gate` | **10/10 chỉ tiêu**, luật cứng **sạch** |
| `pov_leak_check --scene --json` | **9 secret đối chiếu, 0 phát hiện**, exit 0 |
| `ai_tells_check` | 🔴 **bắt một vi phạm cứng `chapter_gate` không kiểm** — đã sửa, xem T1 |
| `style_metrics --write` | 8.045 từ · thuật ngữ **7,5** · tỉ lệ đoạn thoại **0,235** |
| Phép kiểm chữ nghiêng | 97 đoạn · 6 có hệ Nhật · **tất cả là ngoại lệ ② hoặc ③/③b** *(ba chỗ vi phạm đã sửa lúc viết)* |

---

# check-continuity — **2 HIGH · 3 MEDIUM · 4 LOW**

> 📌 **H1 đã sửa trong lượt này**, vì một nửa của nó là lỗi luật cứng của thế giới chứ không phải một phát hiện chờ duyệt. Nửa còn lại **hoá ra không phải lỗi** — xem ngay dưới.

## 🔴 H1 · Đoạn **giải thích hệ danh xưng** ghi sai hệ danh xưng

### Chương viết gì

> *"And the formal tier is national too. **Kohaku** for a Sky, **Ryokugyoku** for a Lightning, **Ruriko** for a Mist…"*

### Bảng gốc nói gì

[[rule-danh-xung-flame]]:

| Flame | Người dùng Flame | Tên nghi lễ (Nam / Nữ) |
|---|---|---|
| **Hogo** | **Rokugyoku** | Raiga / Mirai |
| **Gen'ei** | **Ruri** | Rui / **Ruriko** |
| **Kotei** | **Kohaku** | Tenmei / Amatsumi |

### 🔴 Lỗi thật: **Ruriko**

`Ruriko` là **tên nghi lễ nữ**, không phải bậc *người dùng Flame*. Đúng phải là **Ruri**. Bảng gốc cho ví dụ ngay trong chính nó: *"Sawada **Ruriko**, **Ruri** của nhà Sawada"* — hai bậc khác nhau, trong một câu.

🔴 **Vì sao HIGH:** cả đoạn ấy tồn tại để **dạy người đọc hệ danh xưng**, và nó là chân đế của cái bẫy tên. Một đoạn giải thích luật mà ghi sai luật thì hỏng **đúng chỗ chịu lực**.

✅ **Đã sửa** → `Ruri`.

### ⚠️ Và nửa còn lại của phát hiện này **là của mình, không phải của vault**

Bản đầu của review ghi rằng *"vault tự lệch"* giữa `Rokugyoku` và `Ryokugyoku`, và đòi chọn một chữ rồi sửa cả hai phía.

**Sai.** Tra tới nguồn thô:

| | `Rokugyoku` | `Ryokugyoku` |
|---|---|---|
| `Ex-Mafia_Boss_Spends.html` | 1 | 1 |
| `Local_Mafia_Boss_Blames.html` | 1 | 6 |

⇒ **Tác giả dùng cả hai.** `Rokugyoku` gần như chỉ ở **bảng danh xưng**; `Ryokugyoku` là chữ trong **thân truyện**.

🔴 Và vault **đã biết từ trước**. [[p1-ch3]] dòng 122 ghi nguyên văn: *"Bảng này viết **Rokugyoku** (thân truyện P1 Ch2 viết **Ryokugyoku**)."*

→ Nên nhánh dùng **Ryokugyoku** trong văn xuôi là **khớp với chính thói quen văn xuôi của tác giả**, không phải một lỗi cần sửa. Không có việc gì phải làm, và mình đã suýt tạo ra một đợt sửa hàng loạt cho một thứ không hỏng.

## 🔴 H2 · Ngày trong cùng chương lệch một

| Chương ghi | |
|---|---|
| Họ tới | **22 tháng Hai** |
| Hai đứa trẻ lên | **ngày thứ hai** |
| Noriyuki lên | **ngày thứ ba** · và sổ khách ghi **24 tháng Hai** ✅ |
| Phiên ở sảnh nhỏ | **ngày thứ tư** ⇒ **25 tháng Hai** |
| Nội tâm 3.6 | 🔴 *"on the **twenty-sixth** of February a room full of people… did not close it"* |

Sổ khách khoá mốc: 22 = ngày 1, nên 24 = ngày 3 ✅, nên **ngày 4 = 25**.

🔵 Sửa một chữ. Nhưng nó là **một con số trong một câu nói về một hồ sơ sẽ được đọc lại sau mười một năm**, tức là đúng loại chi tiết chương này bắt người đọc để ý.

## 🟠 MEDIUM

### M1 · *"the only Lightning in a Sanctuary"* — **không có gì đỡ**

> *"Eight years of being the only Lightning in a Sanctuary with nothing to stand in front of…"*

Không note nào nói [[tomoko]] là **Hogo duy nhất** của Namimori. Và [[fact-tap-quan-doi-voi-tung-he-lua]] hàm ý ngược lại: thị trấn **có tập quán cho từng hệ**, mà tập quán thì sinh ra từ việc có người thuộc hệ ấy.

⚠️ Note ấy chỉ ghi rằng *"tập quán cho **Chiyu** và **Hogo** — chưa cảnh nào cần"*. **Chưa cần** không phải **không có người**.

🔵 Hai lối: hạ xuống *"one of very few"* · hoặc **chốt** rằng bà là người duy nhất, và ghi vào [[tomoko]], vì nó là một dữ kiện có sức nặng *(một Sanctuary không có ai đứng chắn)*.

### M2 · Chương **tự chốt** một câu hỏi đang mở về [[yasuyuki]]

> *"The other one is not one. The other one is **not any of the seven**, as far as I can tell from here…"*

[[yasuyuki]] ghi `flame: unknown`, và mục *Chưa quyết* ghi: *"Hệ Flame của cậu ta — nếu không phải Hogo thì là gì, hay **không có gì**"*.

→ Chương vừa trả lời: **không có gì**. Câu *"as far as I can tell from here"* có chừa đường lui, nhưng người đọc sẽ đọc nó là một kết luận.

🔵 Nếu giữ thì phải **chốt vào note**; nếu không thì phải làm câu ấy mờ hơn hẳn.

### M3 · Tỉ lệ thoại **23,5%** — vượt trần của chính thẻ cảnh, và **đi ngược**

Thẻ đặt ⛔ **≤ 20%**. Đo được **23,5%**.

| Ch5 | Ch6 | Ch7 | Child Ch1 | Child Ch2 | **Child Ch3** | tác giả |
|---|---|---|---|---|---|---|
| 29,3 | 28,8 | 25,0 | 23,0 | **20,7** | 🔴 **23,5** | **17,4** |

Năm chương liền đi đúng chiều, rồi chương này **lùi về mức Ch1**. Cảnh 3.5 là một cuộc thương lượng nên thoại là chất liệu thật ở đó, nhưng thẻ đã cảnh báo **đúng chỗ ấy** từ trước và bản viết vẫn để trôi.

🔵 Chỗ cắt được mà không mất gì: đoạn Tomoe đọc điều khoản và đoạn hỏi đáp *"provided for"* có thể chuyển một nửa sang tường thuật.

## 🟡 LOW

**L1** **Kōtokui Tomoe**, 79, gia chủ — thực thể mới, vào delta.
**L2** Hai **tập quán mới**: đứng dậy khi một **Chiyu** đi qua với thứ đang sống · đưa người chết ra bằng **cửa Ketsueki** phía bắc. Không mâu thuẫn — chúng **lấp đúng chỗ trống** mà [[fact-tap-quan-doi-voi-tung-he-lua]] tự khai là còn trống. Vào delta, và sửa dòng *"chưa cảnh nào cần"*.
**L3** Địa lý mới: nhà Kōtokui **phía bắc Kyoto** · Noriyuki lớn lên trên **ngọn núi phía trên Ōtsu**. Vào delta.
**L4** **Cửa bắc** giờ mang hai nghĩa chịu lực trong hai chương liền: cổng bắc của thị trấn *(nơi Vindice đứng, Ch2)* và cửa bắc của một ngôi nhà *(cửa Ketsueki, Ch3)*. Không sai, nhưng đáng biết.

## ✅ Bảy nhóm — cái đã kiểm và **đạt**

| Nhóm | |
|---|---|
| **Timeline** | ⚠️ H2. ✅ Còn lại khớp: kỳ thi thứ Năm và chuyến đi thứ Sáu nối đúng [[child-ch2-chapter-ban-20260925]] · **SINCE JANUARY** 41 → **46 mục** qua hai tháng · Musashi **75** · Genichi **61** |
| **Ranh giới biết** | ✅ 0 rò rỉ. Tờ giấy bị **dùng làm thước đo người khác**, không bị lật. Không ai mới biết |
| **Trạng thái nhân vật** | ⚠️ M1, M2. ✅ [[ayame]] sao sổ khách **lần thứ hai** *(lần đầu là Vindice ở Ch2)* và chương gọi đúng là *"either of the two times"* · [[kazuki]] là **Chiyu** ✅ · đứa bé cầm bảng kẹp **chín tuổi**, khớp Ch2 |
| **Luật thế giới** | ⚠️ H1. ✅ Luật từ vựng đã chốt **lên trang và được trả**: hệ chữ chung cả nước, tập quán riêng từng nhà, và nhà khách **bị bất ngờ hai lần bởi tập quán chứ không bởi lời nói** |
| **Quan hệ** | ✅ [[tsuna--tomoko]] chạy đúng note: cậu **trả**, bà **không hỏi**, cậu **không được cảm ơn** |
| **Canon** | ✅ Không lắp canon KHR vào ai. Cặp song sinh đúng [[emb-chot-cap-song-sinh]] từng mục: tám tuổi · nhà mang Yasuyuki · Noriyuki tự tới · **không ai hoà hợp** |
| **Hợp đồng nhánh** | ✅ 12 mục `forbid` sạch. Kiểm riêng **#2**: cậu nói thẳng *"That is not me helping you… It is worse for you in every practical way"* |

### ⛔ Và lằn can nặng nhất **đã giữ**

Cậu **không nhận ra song chiếu với con cáo**. Đoạn áp chót đặt ba dữ kiện cạnh nhau — hai tượng cáo, một cái tên cậu đã đặt, và *"He had never once counted the other two"* — rồi mở bằng **"He did not think about the foxes at all."**

Người đọc thấy. Cậu thì không. Đúng khoá ở `questions/_MOC.md`.

---

# check-style

## Số đo

| | đo được | chỉ tiêu | tác giả |
|---|---|---|---|
| số từ | **8.045** | 8.000–13.000 | 7.551 |
| câu trung vị | **11** | 10–14 | 11 |
| câu ≥35 từ | **8,8 %** | ≤9 | 4,0 |
| đoạn TB | **32,1** | 30–40 | 36,1 |
| `?` /10k | **46,0** | ≥30 | 49,8 |
| `!` /10k | **6,2** | ≥5 | 13,2 |
| *nghiêng* /10k | **110,6** | ≥60 | 109,1 |
| `…` /10k | **23,6** | ≥12 | 23,3 |
| thuật ngữ /1000 | **7,58** | ≥7 | 13,19 |
| `had` /10k | **111,9** | ≤210 | 166,3 |
| tỉ lệ đoạn thoại | 🔴 **0,235** | ≤0,20 *(thẻ cảnh)* | 0,174 |

⚠️ **Ba chỉ tiêu sát sàn:** số từ 8.045/8.000 · thuật ngữ 7,58/7 · `!` 6,2/5. Sửa một câu cũng đẩy được chúng xuống. Chạy lại cổng sau **mọi** lần sửa.

## 🔴 T1 · `ai_tells_check` bắt một **vi phạm cứng** mà `chapter_gate` **không kiểm**

`chapter_gate` báo luật cứng **sạch**. `ai_tells_check` báo **`not_fragment x2`** — phủ định cụt hai tới ba chữ, tức [[hard-rules]] §3.

→ **Hai công cụ, hai bộ luật cứng khác nhau.** `chapter_gate` kiểm gạch ngang, `...`, cụm cấm, cụm lặp. Nó **không** kiểm nhịp *"Not X. It was Y."* Chỉ `ai_tells_check` kiểm.

⚠️ Nghĩa là **chạy một mình `chapter_gate` không đủ để nói "luật cứng sạch"**, và mình đã nói đúng câu ấy ở lượt bàn giao Ch3 trước khi chạy `ai_tells_check`.

### Hai chỗ, và chỉ một là lỗi

[[hard-rules]] §3 nói rõ: **ranh giới là chức năng, không phải độ dài.**

| Chỗ | Xét |
|---|---|
| *"…Not protection… Not the contract… **Not money**."* | ✅ **Được phép.** Nó **kết một danh sách loại trừ**, là nhịp, không đính chính khái niệm nào. Nguyên tác có bốn cái cùng loại trong 37.391 từ |
| *"…somebody is going to have to tell him… **Not somebody.** They know."* | 🔴 **Đúng hình dạng bị cấm**: phủ định hai chữ rồi **đính chính một khái niệm** ngay câu sau |

✅ **Đã sửa chỗ thứ hai.** Còn lại **1 (1,2/10k)**, dưới ngưỡng 2, và là loại được phép.

🔵 Đây là **cùng họ với L41**: công cụ đếm được, không xét được chức năng. Và lần này nó lệch theo hướng **ngược với T1 của Ch2** — ở đó `ai_tells_check` báo dương tính giả, ở đây nó bắt được cái `chapter_gate` bỏ lọt.

## ⚠️ T2 · `long_sentence_pct` vẫn lệch đúng như Ch2 đã đo

`ai_tells_check` báo **19,5%**, `chapter_gate` báo **8,8%**.

Nguyên nhân đã đo ở [[child-ch2-review-ban-20260925]] mục T1: `ai_tells_check` **không tách đoạn trước khi tách câu**, và regex của nó bị chặn bởi dấu `*` đóng chữ nghiêng. Chương này có **97 đoạn nghiêng**.

⇒ Cảnh báo ấy là **dương tính giả**, lần thứ hai, cùng một nguyên nhân. Sửa gốc vẫn thuộc về hệ thống.

## ✅ Đã sửa — 21/09/2026, Aurel chốt cả bốn

| | Đã làm |
|---|---|
| **H2** | *twenty-sixth* → **twenty-fifth** of February |
| **M1** | Bỏ tuyên bố không có gì đỡ. Giờ là *"eight years of being a Lightning in a town that has **never once needed her to stand in front of anything**"* — giữ nguyên sức nặng, bỏ cái không chứng minh được |
| **M2** | *"not any of the seven"* → *"**or the other one is something I cannot get a reading on at all**, at eight metres, in my own yard, which has not happened to me since I was three"*. 🔵 Khá hơn bản cũ: đổi một phủ định phẳng thành **một câu hỏi đang mở**, và không chốt hộ [[yasuyuki]] |
| **M3** | **Chuyển chín đoạn thoại thành tường thuật**, không cắt — số từ đang sát sàn. **0,235 → 0,182** |

⚠️ **Và chuyển thoại làm câu dài bật lên 8,8 → 9,9%** *(tường thuật gộp thì câu dài ra)*. Phải một lượt nữa cắt **tám câu ngay trong đoạn** mới về 8,2%. Đó là **lần thứ tư** trong arc này một lượt sửa chỉ tiêu này đẩy chỉ tiêu khác ra ngoài.

### Số đo sau khi sửa

| | trước | sau |
|---|---|---|
| số từ | 8.045 | **8.256** |
| câu trung vị | 11 | **12** |
| câu ≥35 từ | 8,8 % | **8,2 %** |
| `?` /10k | 46,0 | **38,8** |
| thuật ngữ /1000 | 7,58 | **7,39** |
| **tỉ lệ đoạn thoại** | 🔴 0,235 | ✅ **0,182** |
| `chapter_gate` | 10/10 | **10/10** |
| `pov_leak_check` | 0 | **0** |
| `ai_tells_check` | 1 vi phạm cứng | **0 vi phạm cứng** |

🔵 **Và tỉ lệ thoại 0,182 là mức thấp nhất của cả nhánh** — dưới cả Ch2 (0,207). Chuỗi giờ là 29,3 → 28,8 → 25,0 → 23,0 → 20,7 → **18,2**, mốc tác giả 17,4.

## Bàn giao

- **Chưa sửa gì trong chương**, trừ **một chỗ phủ định cụt** đã sửa vì nó là **vi phạm luật cứng**, không phải một phát hiện chờ duyệt.
- 🔴 `finalize-chapter` **chưa chạy được** khi còn H1 và H2 mở.
- ✅ **H1 nằm gọn trong chương**, và đã sửa. Phần `Rokugyoku`/`Ryokugyoku` **không cần `check-conflicts`**: nó là thói quen của chính tác giả, đã ghi ở [[p1-ch3]] dòng 122, và nhánh đang theo đúng chữ văn xuôi của bà.
- 🔴 Còn **H2** *(ngày 25 hay 26 tháng Hai)* mở.
