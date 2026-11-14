---
id: review.PPCT.ch37-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-5-ke-san-va-con-moi
chapter: 37
canon_layer: user_canon
status: active
aliases: ["review ch37 PPCT", "soat ch37", "check-continuity ch37", "check-style ch37", "bo ma review"]
related: ["[[04_Manuscript/chapters/arc-5/ch37/ch37-chapter]]", "[[04_Manuscript/chapters/arc-5/ch37/ch37-plan]]", "[[fact-cong-nghe-vongola-trong-chien-tranh]]", "[[fact-ma-luc-dazai-rat-thap]]", "[[Command-Spells]]", "[[hook-bo-sung-ma-luc]]", "[[04_Manuscript/chapters/arc-5/ch34/ch34-chapter]]", "[[04_Manuscript/chapters/arc-5/ch35/ch35-chapter]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 26/09/2026, tren ban nhap ch37 (1.694 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-26
---

# Soát chương 37 — Bổ ma

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát và người viết bản nháp là một, trong cùng một phiên.** Nếu muốn một lượt soát độc lập, dùng agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×4 cảnh | findings **0** · exit 1 ở cả bốn — [[dazai-mang-ky-uc-kiep-truoc]] không có `leak_terms` chữ Hán. Grep tay 前世 · 上辈子 · 梦 · 白兰 · 十年 · 玛雷 · 指环 = 0 |
| grep tay (ranh giới arc) | 时臣 · 教会 · 索拉乌 · 绮礼 · 远坂 · 河对岸 · 人间失格 · 无效 · 吻 · 咖喱 = **0**. Archer ×3 — đều là chỗ plan cho phép (xem nhóm 8) |
| `ai_tells_check --project PPCT` | exit **0** — 0 mẫu cứng, 0 cảnh báo |
| `style_metrics --json` (PR #64) | exit 0 — 1.694 chữ Hán ≥ sàn; thuật ngữ 9,45 ≥ 9 |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo có từ trước |

## Tám nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ 「第十三天晚上」 · 「第十四天早上」. ✅ 「昨天中午自己说过的那句话」 = trưa ngày 12 (ch33). ✅ 「中午答应过人家的事」 = trưa ngày 13 (ch36). ✅ 「从昨天下午被那只戴着手套的手取走开始…整整一天一夜」 ≈ chiều ngày 12 → tối ngày 13. 🔵 「刚开战没几天的时候」 cho ch8 — Timeline không có dòng ngày cho ch8 để đối chiếu; nguyên tác đặt trận Archer–Berserker ở những ngày đầu, nên để mơ hồ là an toàn |
| Ranh giới tri thức | ✅ Tsuna/Dazai giữ L2: không tên Kirei, không nhà thờ, không lệnh chú Sola-Ui. ✅ Dazai đoán Kiritsugu 「会听很久…什么都没有」 — **đoán**, không chứa 「河对岸」. 🟠 **#1** con bọ vẫn "nói" mà màn hình đen (xuyên chương) · 🔵 **#2** 「躺在别人的桌子上」 |
| Trạng thái nhân vật | ✅ Dazai ít ma lực — 「魔术回路这种东西，我身上本来就没几条」 khớp ghi chú tác giả ch3 (「参考fsn里的士郎」). ✅ 「说不定连让自己的从者在外面随便走一走都供不起」 khớp nguyên văn ch3 「他可能连英灵自由……」. ✅ Câu ch8 — 「虽然不至于落败，但极有可能魔力耗尽被强制退场」 → 「大概还没分出输赢，就先把魔力用光了」: đúng ý. 🔵 **#3** 「每一次隔着的都是绷带」 |
| Luật thế giới | ✅ 「它们吃的是你的那一份」 — đúng luật năng lượng Aurel 25/09 ([[fact-cong-nghe-vongola-trong-chien-tranh]]). ✅ Không có câu "không dùng ma lực". ✅ Lệnh chú là ma lực — [[Command-Spells]] luật 6. ✅ Ba nét trên mu bàn tay — luật 5. ✅ Tắt con bọ: kết quả, không cơ chế. 🔵 chi tiết mới: tay cầm có 「一排米粒大小的指示灯，每一盏对应外面的一只虫子」 — ghi vào fact ở `finalize` |
| Quan hệ / xưng hô | ✅ Tsuna gọi 「太宰」. Dazai không gọi tên Tsuna trong chương — không sai ([[dazai--tsuna]]: 「纲吉」, không bắt buộc mỗi chương). ✅ Mức (b): **một** cử chỉ — nắm bàn tay có lệnh chú (dòng 137–139); không hôn, không cử chỉ thứ hai |
| Canon | ✅ Địa mạch Fuyuki — nguyên văn ch3 dùng 「地脉」, chương dùng đúng chữ đó. ✅ Không gán chỉ số mới |
| Hợp đồng nhánh | ✅ Không chạm mục `forbid` |
| Rò kế hoạch (nhóm 8) | ✅ **ch38:** 「令咒…其实它也是一团魔力」 (dòng 113) đứng **sau** câu hỏi về Archer (dòng 61) cả năm mươi dòng, và **không** câu nào nối hai thứ — `foreshadow: hint` mức người đọc, đúng thẻ cảnh 03. Phép xoá (05-visibility): bỏ dòng 61 thì dòng 113 vẫn đứng được như chuyện của riêng Tsuna → không rò. ✅ Beat cảnh 03 (tháo băng) được báo trước **đúng mức thẻ cảnh 02**: 「低下头看着自己的右手」 — không nói lý do. ✅ Dị năng Dazai: 0 chữ khi hai người chạm tay |

**Hook:** [[hook-bo-sung-ma-luc]] **lên trang lần đầu** — 「补魔啊。听说有一种，不用令咒，也不用地脉…」 · ba đạo lệnh chú · 「留着」 ✓ (plan C8: `open` → `partially_paid`). [[hook-can-dazai-de-thang-archer]] chỉ **vọng** qua câu ch8, không hứa gì ✓.

---

## #1 · 🟠 vừa · XUYÊN CHƯƠNG — con bọ ở lâu đài "vẫn nói" suốt một ngày một đêm, mà ô màn hình của nó ở căn cứ lại đen

**Chương, dòng 39:** 「从昨天下午被那只戴着手套的手取走开始，它就一直躺在别人的桌子上说话，说了整整一天一夜。」 · **dòng 41:** 「城堡大门那一格本来就是黑的，现在还是黑的。」
**ch34, dòng 51** (Tsuna): 「虫子**每往回传一次画面，都要往外发一次信号**」 — tín hiệu Maiya dò được **là** lúc con bọ truyền hình về.
**ch35, dòng 37 · 81:** con bọ nằm trên bàn Kiritsugu, 「它还在往外发信号」; cùng phòng đó Kiritsugu nói kế hoạch 「放到河对岸去」.
**ch34, dòng 55:** khi bàn tay đeo găng tới ống kính, 「那块屏幕就黑了」.
**[[fact-cong-nghe-vongola-trong-chien-tranh]]:** con bọ có chức năng 「监视，传声」 (ch3 nguyên văn).

→ Theo đúng câu ch34, con bọ còn phát tín hiệu thì còn truyền hình (và có thể cả tiếng) về căn cứ. Nếu vậy tổ Caster **lẽ ra đã thấy và nghe** phòng Kiritsugu từ chiều ngày 12 — kể cả kế hoạch 「河对岸」 — trong khi ch34–36 viết họ **mù** ở phía Saber (「Tổ Caster **không còn mắt nào** ở phía Saber」 — arc 5, *Ghi cho ch35*) và ch36 Dazai chỉ **đoán**. ch37 dòng 39 dựa lên đúng chỗ đó.

**Lỗi không sinh ra ở ch37** — nó nằm trong ba chương đã `final` (ch34 dòng 51 · ch35 · arc 5). → **`check-conflicts`**. Cần Aurel chọn cách vá:
- **(a)** Tín hiệu **không** phải hình: sau khi bị gỡ, con bọ chỉ còn phát một **tín hiệu định vị / nhịp** — ống kính và micro đã bị vô hiệu (ví dụ Maiya dán kín, hoặc bàn tay đeo găng làm hỏng ống kính lúc gỡ). Vá bằng **một câu** trong ch37 (Dazai hoặc Tsuna giải thích vì sao ô màn hình đen mà con bọ vẫn "nói"). Không phải sửa chương `final`, nhưng câu ch34 「每往回传一次画面，都要往外发一次信号」 thành chỉ đúng **lúc còn nguyên**.
- **(b)** Tổ Caster **có** nhận hình/tiếng nhưng Dazai chủ động **tắt** ô màn hình đó từ chiều ngày 12 (không muốn nhìn? không muốn bị dò?) — mâu thuẫn trực tiếp ch34 「那块屏幕就黑了」 lúc tay đeo găng tới; phải sửa chương `final` → Mode 4.
- **(c)** Giữ nguyên, chấp nhận hở — người đọc kỹ sẽ hỏi.

Mình nghiêng **(a)**: một câu trong ch37, không đụng chương `final`, và nó còn giải thích luôn vì sao Kiritsugu cứ để nó "nói" (chỉ còn nhịp để lần theo).

## #2 · 🔵 thấp · 「躺在别人的桌子上」 — Tsuna không biết con bọ đang nằm ở đâu

**Dòng 39:** 「它就一直躺在别人的桌子上说话」.
**ch34, dòng 71** (Dazai): 「那只彭格列的虫子会一直在他们手上说话」 — tổ Caster chỉ biết nó **ở tay đối phương**. Cái bàn là ch35, POV Kiritsugu.

→ Nếu #1 vá theo (a) thì Tsuna không thấy gì từ con bọ; "trên bàn người khác" thành hình dung của Tsuna được viết như điều Tsuna biết. Nhỏ, nhưng dính vào #1.

**Đề xuất:** 「它就一直在别人手里说话」 (vọng đúng chữ ch34).

## #3 · 🔵 thấp · 「每一次隔着的都是绷带」 — khẳng định mới, và băng quấn tới tận chân ngón

**Dòng 91:** 「那只手上缠着绷带，从手腕一直缠到指根」 · **dòng 101:** 「他握过这只手很多次，每一次隔着的都是绷带」.
**Plan C4:** băng quấn là canon BSD, **chưa từng** được tả trong PPCT (grep 绷带: nguyên tác 0).

→ Canon BSD thường tả băng ở **cánh tay, cổ** — quấn kín mu bàn tay tới chân ngón là **đẩy xa hơn** canon để giấu lệnh chú. Và "mọi lần nắm tay đều qua lớp băng" là một khẳng định về các chương trước (ch2 nguyên tác có nắm tay lúc triệu hồi) mà nguồn không nói. **Mình không chắc** đây là lỗi — plan C4 đã chấp nhận chi tiết mới.

**Đề xuất:** dòng 101 hạ xuống 「他握过这只手很多次，却从来没有认真想过，绷带底下是什么。」 — bỏ vế "mọi lần".

---

# Văn phong (check-style Mode 1)

Số đo từ `style_metrics.py --json` (PR #64). `--write` không chạy lại — nó từ chối ghi đè `metadata.yaml` ghi tay (exit 2), đúng thiết kế.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.050) | 1.694 | ✅ đạt sàn · 🟡 **#7** thiếu ~17 % so với dự kiến |
| Thoại | plan 45–55 % · đời thường cho tới ~65 % · dải chung 35–55 % | **32,3 %** | 🟡 **#7** |
| Chữ/đoạn TB | 35–55 | **26,5** | 🟡 **#7** · 📉 **#8** xu hướng |
| Đoạn ≥ 100 chữ | ≤ 8 % | 0 % | ✅ |
| Câu trung vị | 17–20 | **13** | 🟡 **#7** |
| Câu ≥ 50 chữ | ≤ 12 % | 1 % | ✅ |
| Câu ≤ 4 chữ /1000 | ≤ 5,5 | 1,18 | ✅ |
| `？` /1000 | ≥ 4 | 11,22 | ✅ |
| `！` /1000 | ≥ 1 | 2,36 | ✅ |
| `……` /1000 | 0,5–3,5 | 2,95 | ✅ |
| `——` /1000 | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ /1000 | hướng ~3,5 (`tendency`) | 9,45 — 魔力 ×6 · 令咒 ×3 · 从者 ×3 · 御主 ×2 · 圣杯 · 宝具 | ✅ · cao vì chương **nói về** ma lực; không dồn vào một từ |
| Motif mắt | ≥ 1 | 1 (「眨了一下眼睛」) | ✅ sát sàn |
| Lượt thoại theo cảnh | ≥ 4 · 8 · 10 · 2 | 7 · 16 · 21 · 3 | ✅ |
| Chữ Hán theo cảnh | 400 · 650 · 750 · 250 | 340 · 600 · 631 · **133** | 🟡 **#7** cảnh 04 bằng nửa thẻ |
| Thuật ngữ theo cảnh | ≥ 1 · 3 · 3 · 0 | **0** · 8 · 8 · 0 | 🟡 **#7** cảnh 01 thiếu 1 |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 `“”`, không `「」` làm dấu thoại | ✅ 0 「」 |
| §2 Kaomoji | ✅ 0 |
| §3 「我」 ngoài ngoặc | ✅ 0 |
| §5 Tiêu đề | ✅ `【太纲无差】反派战争37` + dòng ※ + 预警 |
| [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells\|ai-tells]] | ✅ exit 0. Soát tay 「不是X，是Y」 không 而 (hở profile — review ch36 #4): **0** |

## #4 · 🔵 thấp · Hai 「太宰！」 — lần đầu làm nhạt lần thứ hai

**Dòng 73:** 「纲吉说：“太宰！”」 (sau câu đùa "đủ pha một ly cà phê") · **dòng 131:** 「纲吉的脸一下子红到了耳朵根：“太宰！”」 (beat đỏ mặt của plan).

→ Plan đặt 「太宰！」 ở beat 4 — chỗ đỏ mặt. Tiếng kêu y hệt 60 dòng trước làm lần thứ hai mất độ nảy.

**Đề xuất:** dòng 73 đổi thành một phản ứng khác — 「纲吉说：“……你认真的？”」 hoặc 「纲吉瞪了他一眼。」.

## #5 · 🔵 thấp · 「一圈一圈」 lặp hai đoạn liền

**Dòng 93:** 「开始一圈一圈地解绷带」 · **dòng 99:** 「绷带一圈一圈地落在桌上」.

**Đề xuất:** dòng 99 → 「绷带落在桌上，堆成松松的一小团。」.

## #6 · 🔵 thấp · Ba vế song song ở dòng 41

**Dòng 41:** 「屋子里没有什么声音，屏幕上也没有什么变化，城堡大门那一格本来就是黑的，现在还是黑的。」 — [[forbidden-patterns]] #3 (ba vế đều).

→ Hai vế đầu cùng khuôn 「没有什么…」, vế ba đổi khuôn nên đỡ phẳng hơn. **Mình không chắc** đây là lỗi. Nếu vá #1 theo (a) thì câu này nên đổi luôn (chỗ đặt câu giải thích).

## #7 · 🟡 chỉ tiêu · thoại 32,3 % · đoạn TB 26,5 · câu trung vị 13 · 1.694 chữ · cảnh 04 = 133 · thuật ngữ cảnh 01 = 0

- Thoại: bản đầu 28 %; lượt sửa ở `write-chapter` chuyển kể → thoại trong beat có sẵn (chuồn chuồn ăn ma lực · lớp băng), lên 32,3 %, rồi dừng — phần còn lại là nội tâm Tsuna (câu ch8, cử chỉ).
- Đoạn TB và câu trung vị thấp: nhiều lượt thoại một chữ (「就这样。」 · 「一半是。」 · 「不行。」) — nhịp đối đáp của chương.
- Độ dài dưới dự kiến ~17 % nhưng trên sàn. Cảnh 04 chỉ 133 chữ — đúng tinh thần thẻ ("một hình ảnh, hai câu thoại"), thẻ ước 250 là cao.
- Cảnh 01 không có thuật ngữ: 御主 đặt vào cảnh tắt con bọ thì phải cho ai đó nói "vị Master kia" — ch36 đã có luật không gọi tên; ở nhà thì không cần.

→ **Hỏi Aurel:** chấp nhận cho chương này?

## #8 · 📉 xu hướng · thoại và đoạn TB dưới dải ba chương liền — plan đang đặt sai, không phải văn đang trượt

| | ch35 | ch36 | ch37 |
|---|---|---|---|
| Thoại (plan → đo) | 31 % → 17,6 % | 45–55 % → 31,3 % | 45–55 % → 32,3 % |
| Đoạn TB (dải 35–55) | 30,7 | 34,2 | 26,5 |
| Câu trung vị (dải 17–20) | 14 | 14,5 | 13 |

→ Cùng một lệch **ba chương liền**, cả ba đã chấp nhận hoặc đang hỏi chấp nhận (ch35 #5, ch36 #9). Theo trigger của `check-continuity`: *"the constraint is not reaching the writer; fix the plan template, not the prose"* — ở đây là ngược lại: **plan đặt số không khớp giọng chương POV Tsuna/Kiritsugu viết tiếp**. Nguyên tác trung bình 43,5 chữ/đoạn — các chương viết tiếp đối thoại nhiều, câu cụt hơn.
**Đề xuất (không sửa ở đây):** ở plan ch38 trở đi, đặt thoại **30–40 %** cho chương suy luận/đời thường POV Tsuna, và ghi đoạn TB/câu trung vị là `tendency` thay vì `target` cho tới khi Aurel quyết đo lại [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]. Hoặc giữ targets và chấp nhận lệch từng chương như hiện nay. **Việc của Aurel** — đụng [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]] (`strength: target`, đo từ nguyên tác).

---

## Tổng hợp

| # | Mức | Nhóm | Tóm tắt | Đề xuất |
|---|---|---|---|---|
| 1 | 🟠 | Tri thức / xuyên chương | con bọ vẫn "nói" (= truyền hình, ch34 dòng 51) mà màn hình đen — tổ Caster lẽ ra đã thấy/nghe phòng Kiritsugu | `check-conflicts`; nghiêng (a): một câu trong ch37 — sau khi gỡ, chỉ còn tín hiệu định vị |
| 2 | 🔵 | Tri thức | 「躺在别人的桌子上」 — Tsuna không biết cái bàn | 「一直在别人手里说话」 |
| 3 | 🔵 | Trạng thái | 「每一次隔着的都是绷带」 khẳng định về chương trước | bỏ vế "mọi lần" |
| 4 | 🔵 | Văn phong | hai 「太宰！」 | đổi dòng 73 |
| 5 | 🔵 | Văn phong | 「一圈一圈」 lặp | bỏ ở dòng 99 |
| 6 | 🔵 | Văn phong | ba vế dòng 41 | đổi cùng #1 |
| 7 | 🟡 | Chỉ tiêu | thoại 32,3 % · đoạn 26,5 · câu 13 · 1.694 chữ · cảnh 04 · thuật ngữ cảnh 01 | hỏi chấp nhận |
| 8 | 📉 | Xu hướng | ba chương liền dưới dải thoại/đoạn/câu | đổi cách đặt số ở plan từ ch38 — Aurel quyết |

Không có lỗi 🔴. Không có lỗi luật cứng.

## Để `finalize-chapter` biết (không phải lỗi)

- **Ba đạo lệnh chú của Dazai: còn nguyên, trên mu bàn tay phải, dưới băng** — lần đầu lên trang → [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/dazai|dazai]] (suy ra "chưa dùng" — plan C5, `inference`).
- **Tsuna biết lệnh chú cũng là ma lực** (Dazai nói) → [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/tsuna|tsuna]], [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/dazai|dazai]]. **Không** nối tới Archer.
- **Con bọ cổng lâu đài tắt tối ngày 13** (từ xa, không nổ) → [[fact-cong-nghe-vongola-trong-chien-tranh]] — kèm chi tiết tay cầm có đèn báo từng con bọ. Phụ thuộc cách vá #1.
- [[hook-bo-sung-ma-luc]]: `open` → `partially_paid` (plan C8).
- "Ghi cho ch38" ở arc: mảnh "lệnh chú = ma lực" đã có trên trang (ch37 dòng 113) — ch38 dùng được, **không** cần giải thích lại.

---

## Mode 3 — đã sửa (Aurel 26/09/2026: "đồng ý đề xuất, write-chapter Mode 3")

| # | Trước | Sau |
|---|---|---|
| 1 · 2 | 「从昨天下午被那只戴着手套的手取走开始，它就一直躺在别人的桌子上说话，说了整整一天一夜。」 | 「从昨天下午那只戴着手套的手按上镜头开始，它就再也没有传回来过一个画面、一点声音。纲吉猜，装镜头和收声的那一小块，大概就是那时候被按坏的。可是它自己不知道，还在一遍一遍地往回传，每传一遍，就往外发一次信号，在别人手里说了整整一天一夜。」 — phương án **(a)**: khớp đúng câu ch34 dòng 51 (mỗi lần *truyền* là một lần phát tín hiệu) mà không có gì về tới căn cứ. Không đụng chương `final` |
| 3 | 「他握过这只手很多次，每一次隔着的都是绷带。他从来没有认真想过…」 | 「他握过这只手很多次，却从来没有认真想过…」 |
| 4 | 「纲吉说：“太宰！”」 (dòng 73) | 「纲吉瞪了他一眼。」 — 「太宰！」 còn **một**, ở beat đỏ mặt |
| 5 | 「绷带一圈一圈地落在桌上」 | 「绷带落在桌上」 |
| 6 | 「屋子里没有什么声音，屏幕上也没有什么变化，城堡大门那一格本来就是黑的，现在还是黑的。」 | 「屏幕上什么变化也没有，城堡大门那一格从昨天下午起就是黑的。」 |
| 7 | thoại 32,3 % · đoạn 26,5 · câu 13 · 1.694 chữ · cảnh 04 · thuật ngữ cảnh 01 | **chấp nhận** |
| 8 | xu hướng ba chương dưới dải | **quy ước plan từ ch38** — ghi ở arc 5, mục *Cần có trước khi lập plan*. [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets\|targets]] **không** sửa |

**Đo lại** (`style_metrics --json`, PR #64): 1.694 → **1.735** chữ Hán · thoại 31,5 % · đoạn TB 27,1 · câu trung vị 13 · đoạn ≥ 100 chữ 1,6 % · `？` 10,95 · `！` 1,73 · `……` 2,88 · `——` 0 · thuật ngữ 9,22/1000.

**Kiểm lại:** `ai_tells_check` exit **0** · `pov_leak_check` ×4 findings **0** (exit 1 — [[dazai-mang-ky-uc-kiep-truoc]] không có `leak_terms`) · grep 桌子上说话 · 每一次隔着 · 一圈一圈地落 · 时臣 · 教会 · 索拉乌 · 绮礼 · 河对岸 · 人间失格 · 前世 · 梦 · 白兰 = **0** · 「太宰！」 = 1 · 「我」 ngoài ngoặc 0 · 「不是X，是Y」 0.

📌 **Cho `finalize`:** cách vá #1 là **fact mới** về đồ Vongola — con bọ bị gỡ hỏng ống kính/micro vẫn **cố truyền**, nên vẫn phát tín hiệu dò được, nhưng không có hình/tiếng về căn cứ (Tsuna **đoán** — 「纲吉猜」). Ghi vào [[fact-cong-nghe-vongola-trong-chien-tranh]] ở mức *suy luận của Tsuna trên trang*.

