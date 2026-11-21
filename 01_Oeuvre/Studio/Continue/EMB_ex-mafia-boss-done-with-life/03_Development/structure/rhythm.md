---
id: info.EMB.rhythm
type: info
scope: project
lane: personal
project: EMB
canon_layer: high_confidence_inference
status: active
aliases: ["nhip truyen", "rhythm", "pacing", "do dai chuong", "khoang tra hook", "payoff gap", "hook ledger", "leo thang", "escalation", "thay doi trang thai", "state change", "bai toan 12 nam"]
related: ["[[tropes]]", "[[character-arcs]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/03_Development/tracker/_MOC|hooks]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/00_Overview/drop-point|drop-point]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/targets|targets]]", "[[ao3-tags]]", "[[emb-chot-sau-p2-ch2]]", "[[tuoi-va-moc]]"]
source:
  type: measured
  ref: "Do 17/09/2026: hook_ledger.py tren 05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life (exit 1, chi canh bao); word_count cua 5 note chapter_summary (than chuong tu personal-bulk:fiction-sources/EMB/raw/); dem 23 note events/ theo truong date.chapter; tieu de chuong tu 2 file HTML."
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [structure, pacing]
last_updated: 2026-11-21
---

# Nhịp — số đo được

> 🔁 **Đo lại 17/09/2026.** Bản 16/08 dùng số từ **có lẫn ghi chú** *(5.172 · 8.124 · 7.981 · 9.161 · 13.437)*, đọc P2 theo thứ tự đăng, và ghi brat arc là *3–6 tuổi*. Cả ba đã đổi.

## 1. Độ dài chương — tăng, **gần như** đều

Thân chương, `word_count` của note tóm tắt:

| | Ch1 | Ch2 | Ch3 | Ch4 |
|---|---|---|---|---|
| **Part 1** | 4.538 | 7.125 *(+57 %)* | 6.939 *(**−3 %**)* | 59 *(thông báo arc)* |
| **Part 2** | 8.193 *(+18 %)* | **10.826** *(+32 %)* | — | — |

Chương cuối **gấp 2,4 lần** chương đầu. Chỉ một lần ngắn lại, và chỉ 3 %.

⚠️ Bản cũ viết *"tăng đều, không ngoại lệ"* — P1 Ch3 là ngoại lệ nhỏ. Kết luận dùng được vẫn đứng: **tác giả dừng ở chương dài nhất**. Chỉ tiêu độ dài của chương viết tiếp ở [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/targets|targets]] *(8.000–13.000)*; **dưới ~10.000 ngay sau điểm dừng sẽ đọc như tụt hơi.**

## 2. Gieo → trả

```
python 01_Origine/04_Tools/VaultTool/hook_ledger.py --project 05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life
```

Chạy từ gốc vault, 17/09 → **exit 1** *(chỉ cảnh báo)*. Trước khi sửa `introduced` của [[hook-dua-tre-saint-exavier]] *(ghi `part: 2 / chapter: 1` thay vì `chapter: P2-Ch1`)* thì **exit 2**.

| | |
|---|---|
| Hook | **15** — trả **1**, mở **14** |
| Khoảng trả | **1 chương** — n = 1 *(`nana-iemitsu-cuoi-nhau`, P1 Ch1 → Ch2)*. Quá ít để làm mốc |
| Mở lâu nhất | [[hook-iemitsu-tra-gia]] — gieo P1 Ch1 |

### 🔴 Công cụ không lọc `status`

`hook_ledger` không lọc `status`: khi có chương chưa duyệt, mọi con số *"mở N chương"* sẽ bị cộng thêm.

Đếm lại chỉ trên **5 chương gốc**:

| Hook | Gieo | Công cụ báo | **Thật** |
|---|---|---|---|
| hook-iemitsu-tra-gia | P1 Ch1 | 10 | **4** |
| hook-sukunabikona | P1 Ch2 | 9 | **3** |
| hook-dau-an-kimiko-trong-cay · hook-tsunashige-va-reborn | P1 Ch3 | 8 | **2** |
| bốn hook P2 Ch1 | P2 Ch1 | 7 | **1** |
| sáu hook P2 Ch2 | P2 Ch2 | 6 | **0** |

→ Cả 11 cảnh báo *"major mở quá N chương"* đều là **số thổi phồng**. Đừng dùng nó để kết luận truyện đang *"nợ"* quá lâu.

### Hook gieo theo chương — **tăng**, và dồn về cuối

| P1 Ch1 | P1 Ch2 | P1 Ch3 | P2 Ch1 | **P2 Ch2** |
|---|---|---|---|---|
| 2 | 1 | 2 | 4 | **6** |

**10 / 15 hook** gieo ở Part 2; **6** trong chương đăng cuối: [[ong-tre]] · [[nguoi-ban-cu]] · [[ke-cuop-co-dau]] · [[kyouya-loai-chu-chot]] · [[kimiko-thay-truoc-tuong-lai]] · [[hook-nha-tu-dac-biet]].

Tác giả **không thu dọn trước khi dừng** — bà mở thêm. Hai câu cuối của P2 Ch2 **là hai hook**.

⚠️ **Hai trục thời gian:** P2 Ch2 xảy ra **trước** P2 Ch1 vài tháng. Theo **thứ tự truyện**, sáu hook ấy gieo **trước** bốn hook của P2 Ch1 — nên *"một tuần sau có ống tre"*, *"hai ngày sau gặp bạn cũ"* là việc **đã xảy ra** khi P2 Ch1 mở màn, chỉ chưa được kể. Ledger đọc theo `part/chapter`, tức **thứ tự đăng**. Xem [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/00_Overview/drop-point|drop-point]].

## 3. Thay đổi trạng thái mỗi chương

**Thay đổi trạng thái** = việc không hoàn tác được, **xảy ra ở thì hiện tại của chương**. Đếm từ 23 note `events/` theo `date.chapter`, tách khỏi **quá khứ được kể lại** trong chương đó.

| Chương | Từ | Thay đổi ở hiện tại | Quá khứ kể lại | Từ / thay đổi |
|---|---|---|---|---|
| P1 Ch1 | 4.538 | **2** — tỉnh dậy · Musashi bắt gặp Iemitsu | 0 | 2.269 |
| P1 Ch2 | 7.125 | **1** — Musashi thấy Tsuna bay trong lửa | **6** — thức tỉnh Ruri · phá hôn ước · động đất · Kyuuto đưa Nana về · Nana bỏ đi · Tsuna ra đời | 7.125 |
| P1 Ch3 | 6.939 | **5** — Indra vào cuộc · tìm lõi sakaki · nghi lễ buộc lõi · Timoteo phong ấn · Nana sang Ý | 0 *(+ biên niên tới năm 18)* | **1.388** |
| P2 Ch1 | 8.193 | **3** — triệu kiến Tomoko · xoá Estraneo · Indra tuyên thệ | lời Tomoko; bảng kiểm 567 kế hoạch | 2.731 |
| P2 Ch2 | 10.826 | **2** — lễ cưới cáo · đàm phán Kawahira | Kimiko lập Namimori · nhận Pacifier · Giotto tới *(3 note `nen`)* | 5.413 |
| **Cộng** | 37.621 | **13** | **9** | **≈ 2.900** |

### Mẫu hình — đọc theo **thứ tự truyện**

| Part | Chương ít thay đổi, nặng lore/nghi lễ | → | Chương dày thay đổi, đóng bằng **nén thời gian** |
|---|---|---|---|
| **1** | P1 Ch2 — 1 thay đổi, 6 hồi ức | → | P1 Ch3 — **5**, đóng bằng **biên niên** *(tới năm 18)* |
| **2** | P2 Ch2 — 2 thay đổi, lịch sử Kimiko | → | P2 Ch1 — **3**, kèm **bảng kiểm** nén các việc ngoài trang *(Chrome, Mukuro, mẹ Takeshi, Hayato, Futa)* |

→ **2/2 arc** có cùng dáng: một chương **nạp** lore với rất ít thay đổi, rồi một chương **xả** — dày thay đổi, và kết thúc bằng một kỹ thuật **nén** việc chưa kể. Chương cuối theo **thứ tự truyện** là chương xả, không phải chương đăng cuối.

⚠️ n = 2. Đủ để **không viết ngược mẫu** trong dàn ý, chưa đủ để gọi là luật.

## 4. Leo thang là **chính sách công bố**

P1 Ch4 *(59 từ, toàn bộ là thông báo arc)*: tác giả mời người đọc theo Tsuna đối phó với **mức độ phiền toái ngày càng tăng**.

Arc sau phải **phiền hơn brat arc** — ràng buộc, không phải gợi ý. Đo được ở P2: đối thủ đã lên từ **cha ruột** (P1) tới **một famiglia** (Estraneo), **Vindice** (Bermuda tò mò) và **Administrator của Tri-Ni-Sette** (P2 Ch2).

## 5. Nhịp xuất bản

| Chương | Ngày | Cách chương trước |
|---|---|---|
| P1 Ch1 | 2023-04-18 | — |
| P1 Ch2 | ~2023-09 | ~4,5 tháng |
| P1 Ch3 + Ch4 | 2024-07-28 | ~11 tháng |
| P2 Ch1 | 2024-07-28 | **cùng ngày** |
| P2 Ch2 | 2024-12-02 | ~4 tháng |

Part 1 đóng và Part 2 mở **cùng ngày** — chuyển arc là chuyện kết cấu, không phải quãng nghỉ. Khoảng cách xuất bản **không tương quan** với độ dài.

## 6. Arc đã biết

```
Baby arc (P1) : 1 thang tuoi -> hon me ~1 nam      | 3 chuong truyen, 18.602 tu | HOAN THANH
               + bien nien: an 5 nam, am tinh Flame nam 7, nam 18 Tsunashige + Reborn toi
Brat arc (P2) : Tsuna 6 (P2 Ch2) -> ~6-7 (P2 Ch1)  | 2/? chuong, 19.019 tu | DANG DO  <- diem dung
[?]           : ~7 -> 18                           | ~11 nam, chua viet
Dich          : nam 18, Tsunashige va Reborn toi den — [[fact-toan-canh-tuong-lai]]
```

⚠️ Bản cũ ghi brat arc *3–6 tuổi*. P2 Ch2 nói thẳng **sáu tuổi** *(tóm tắt tác giả + ba lần trong thân truyện)*; P2 Ch1 vài tháng sau — [[emb-chot-sau-p2-ch2]] mục 5. Các con số tự lệch của nguồn ở [[tuoi-va-moc]].

Brat arc **đã dài hơn baby arc** *(19.019 so với 18.602 từ)* mà mới hai chương, và **chỉ phủ vài tháng**.

## 7. Bài toán ~11 năm

Hai chương P2 phủ **vài tháng** trong ~19.000 từ. Từ điểm dừng tới năm 18 là **~11 năm**. Kể tuần tự thì không đi hết.

Tác giả **đã có sẵn hai công cụ nén**, cả hai đo được ở mục 3:

| Công cụ | Ở đâu | Nén gì |
|---|---|---|
| **Biên niên** *(would)* | cuối P1 Ch3 | ~17 năm trong ba đoạn |
| **Bảng kiểm kế hoạch** | cuối P2 Ch1 | nhiều cuộc cứu người **ngoài trang** trong một đoạn nghĩ |

→ Câu hỏi dàn ý không phải *"viết bao nhiêu chương"* mà là **"bao nhiêu cặp nạp–xả, và mỗi cặp đóng bằng công cụ nén nào"**.

## Chưa đo

Số cảnh và luật chuyển POV mỗi chương *(P2 Ch2: sáu POV)* · tỉ lệ tường thuật / thoại / chú thích theo cảnh · `hook_ledger` lọc `status: superseded` — việc hệ thống, không làm trên nhánh này
