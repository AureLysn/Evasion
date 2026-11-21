---
id: review.PPCT.ch33-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-4-ba-dao-lenh-chu
chapter: 33
canon_layer: user_canon
status: active
aliases: ["review ch33 PPCT", "soat ch33", "check-continuity ch33", "check-style ch33", "khep arc 4 review"]
related: ["[[04_Manuscript/chapters/arc-4/ch33/ch33-chapter]]", "[[04_Manuscript/chapters/arc-4/ch33/ch33-plan]]", "[[kirei-van-la-master]]", "[[fact-cong-nghe-vongola-trong-chien-tranh]]", "[[hook-vi-sao-tsuna-khong-phai-nguoi]]", "[[dinh-thu-tosaka]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 24/09/2026, tren ban nhap ch33 (2.185 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-24
---

# Soát chương 33 — Archer có chủ mới (khép arc 4)

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát và người viết bản nháp là một, trong cùng một phiên.** Muốn có một lượt soát độc lập thì dùng agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --json` ×3 cảnh | findings **0** ở cả ba cảnh · exit 1 / 0 / 1. Exit 1 chỉ vì [[kiritsugu-la-master-that]] không có `leak_terms` chữ Hán nên máy không kiểm được; đã grep tay, 0 kết quả · archer-doi-master-sang-kirei **cố ý** không nằm trong `forbidden_secrets` của cảnh 03 (plan C9) → soát tay ở nhóm "Ranh giới tri thức" |
| grep tay | 切嗣 · 卫宫 · 魔术师杀手 · Saber的御主 · 爱丽丝菲尔 · 戒指 · 指环 · 白兰 · 教会 · 绮礼 · Azoth · 死 = **0** · toàn bộ `leak_terms` của archer-doi-master-sang-kirei = **0** |
| `style_metrics.py --write` | exit 1: đếm độ dài 2.263 > 2.200 (bỏ qua vì [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets\|targets]] ghi độ dài là **sàn**); thuật ngữ < 9 (bỏ qua vì đó là sàn cho chương dệt canon) |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo có từ trước |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ 「第十一天傍晚。」 nối tiếp buổi chiều chơi game ở ch32 → tối ngày 11 → 「第十二天早上。」 → trưa. 「你昨天输了一下午」 khớp ch32. ✅ Đèn thư phòng còn sáng từ đêm ngày 10, không mâu thuẫn event ch31 (ch31 kết bằng 「书房里只剩下台灯的光」; chuyện xác Tokiomi **không viết**). 🔵 **#6** hai đêm 「码头」 |
| Ranh giới tri thức | ✅ Archer **không** nhắc 时臣 hay Master mới. ✅ Tổ Caster chỉ tới mức L2: 「时臣大概已经不在了」, không có chữ 死. 🟠 **#3** 「猜得更近了一点」 đẩy mối nghi ch17 lên cao hơn mức L2 |
| Trạng thái nhân vật | ✅ Tsuna không đánh; 「这个问题，你已经问过一次了」 khớp ch28. ✅ Dazai ở căn cứ, nhìn qua kính áp tròng của Tsuna (ch5–7). 🟠 **#2** 「上一次……手柄是被太宰治抢过去的」 |
| Luật thế giới | 🟠 **#1** 「里面没有一丝魔力」 là cơ chế Aurel **đã cắt** ở ch30. 🔵 **#5** 「那道结界」 của 远坂宅 chưa có note nào ghi |
| Quan hệ / xưng hô | ✅ Tsuna gọi 「太宰」, Dazai gọi 「纲吉」 ([[dazai--tsuna]]). ✅ Archer gọi Tsuna 「Caster」 (ch16), gọi Dazai 「那个小偷」 (ch9), tự xưng 「本王」 trong ngoặc |
| Canon | ✅ Lệnh chú gọi về và 「时臣」 đúng nguyên văn ch9 (`反派战争.zip` index 8, dòng 101–115). ✅ Lời Archer về Rider (ch15, ch17). 🔵 **#4** 「从哪一类宝库里走丢的」 |
| Hợp đồng nhánh | ✅ Không chạm mục `forbid` |

**Hook:**
- [[hook-can-dazai-de-thang-archer]] được đẩy: 「下一次，不会再有人把本王叫回去了」 · 「他不会停手」 ✓
- [[hook-archer-tuyen-chien-rider]] được đẩy nhẹ: 「先是那个征服王」 ✓
- [[hook-vi-sao-tsuna-khong-phai-nguoi]] được chạm: 「本王的东西」, không nói loại ✓
- Không có nhẫn ✓

---

## #1 · 🟠 trung bình · 「这是彭格列的东西，里面没有一丝魔力」: cơ chế Aurel đã cắt ở ch30

**Chương, dòng 105:** 「这是彭格列的东西，里面没有一丝魔力，它只会停在窗户外面，不会碰那道结界。」

**[[04_Manuscript/chapters/arc-4/ch30/ch30-review]] #3**, Aurel chọn: 「……查得出它是从哪里来的。」, tức là **chọn cắt** vế 「它本来就不靠魔力转」 và **không thêm fact** vào [[fact-cong-nghe-vongola-trong-chien-tranh]]. Fact note cũng ghi: 「**không** nói bọ có hay không dùng ma lực (vế đó đã cắt, review ch30 #3)」. Lý do lúc đó: Box là 「雾火焰和科技的结合」 (ch6), nên công nghệ Vongola không hẳn không có gì huyền bí.

→ Chương này đưa lại đúng cơ chế đã bị cắt, chỉ đổi chữ. Đây là lỗi **lặp lại qua hai chương** (proactive trigger): ràng buộc chưa đến được tay writer vì thẻ cảnh 02 viết 「không dùng ma thuật」. Lỗi gốc nằm ở thẻ cảnh do mình viết.

**Đề xuất:** cắt 「里面没有一丝魔力，」 và giữ 「这是彭格列的东西」. Câu còn lại vẫn đủ nghĩa.

## #2 · 🟠 trung bình · 「上一次……手柄是被太宰治从他手里抢过去的」: không phải lần trước

**Chương, dòng 99:** 「上一次在这间屋子里操纵机械蜻蜓，手柄是被太宰治从他手里抢过去的。」

**Nguồn:**
- ch4 (`反派战争.zip` index 3, dòng 31): 「太宰治从纲吉手里抢过游戏机，控制着一只机械蜻蜓」. Đây là **đêm ngày 1**.
- Nhưng sau đó chuồn chuồn còn được dùng nhiều lần. **ch19** (viết tiếp) dòng 121: 「由几只停在窗框上的机械蜻蜓，传回了冬木另一头的据点」. **ch20** dòng 41: Tsuna 「把昨晚收回来的四只蜻蜓在桌边排好」; dòng 53: Tsuna còn nói 「我可以再做一批蜻蜓」.

→ "Lần trước" là ch19, không phải ch4. Ở ch20 Tsuna còn là người **sửa và chế** chuồn chuồn, nên chi tiết "Dazai giật tay cầm" không thể là lần gần nhất.

**Đề xuất:** 「第一天晚上，也是在这间屋子里，手柄是被太宰治从他手里抢过去的。」 Giữ được ý vọng ch4 và bỏ chữ 「上一次」.

## #3 · 🟠 trung bình · 「今天也只是猜得更近了一点」: vượt mức L2

**Chương, dòng 141:** 「酒宴那天晚上我说过，Archer那一边，本来就不止一个人。那时候是猜，今天也只是猜得更近了一点。」

**Plan ch33 C8 và thẻ cảnh 03:** 「nhắc mối nghi ch17 **đúng mức cũ**, một câu … Rồi **dừng**. **Không** nối tới nhà thờ, **không** nói Master mới là ai.」 · Khi chọn L2, Aurel đã loại L3 「Master mới là Master của Assassin」. **dazai-nghi-master-assassin-cung-phe-archer:** 「**Không nâng** mức nghi … (Aurel 22/09)」.

→ Câu ch17 được nhắc đúng. Nhưng 「猜得更近了一点」 ngay sau 「有人在给他魔力 … 不知道」 ngầm nói rằng: người cùng phe Archer (Master của Assassin) **gần như là** người đang cấp ma lực. Như vậy là đã **nâng** mức nghi. Người đọc rất dễ nối thành L3.

**Mình không chắc** chữ nghĩa có thật sự vượt không, vì Dazai không nói ra điều gì. Nhưng hướng của câu là hướng đi lên.

**Đề xuất:** 「那时候是猜，到今天也还是猜。」. Câu này vọng ch30 「现在也还是猜」 nhưng không lặp nguyên chữ, và giữ mức nghi phẳng.

## #4 · 🔵 thấp · 「你是从哪一类宝库里走丢的」: lệch lời Archer ở ch9

**Chương, dòng 57:** 「本王就已经看出来了，你是从哪一类宝库里走丢的。」

**[[gilgamesh]] / ch9:** 「世上一切宝物，其起源都可以追溯至我的宝库」 · 「我大概知道你是什么类型的时空宝物了」. **[[hook-vi-sao-tsuna-khong-phai-nguoi]]:** Archer coi Tsuna là 「bảo vật thời không bị trộm khỏi **kho**」, tức là kho **của hắn**.

→ 「哪一类宝库」 ngụ ý có nhiều kho, và Tsuna đi lạc từ một kho khác. Điều này ngược với thế giới quan "mọi bảo vật đều từ kho của ta". Không lộ gì, nhưng Archer nói sai giọng mình.

**Đề xuất:** 「本王就已经看出来了，你是本王宝库里的哪一类东西。」

## #5 · 🔵 thấp · 「不会碰那道结界」: kết giới 远坂宅 chưa có trong vault

**Chương, dòng 105** (cùng câu với #1).

**[[dinh-thu-tosaka]]:** chỉ có mục "Mô tả" và "Thư phòng"; **không** nói kết giới. Canon Fate có kết giới ở nhà Tōsaka, nhưng vault chưa ghi. Ngoài ra, đậu **ngay ngoài cửa sổ** thì đã ở trong khuôn viên, nên câu "không chạm kết giới" có thể tự mâu thuẫn nếu kết giới bao cả khu đất.

→ **Mình không chắc** đây là lỗi. Nếu sửa #1 thì câu này cũng cần sửa luôn.

**Đề xuất:** 「这是彭格列的东西，它只停在窗户外面，不进屋子。」 Câu này bỏ khẳng định về kết giới.

## #6 · 🔵 thấp · 「码头那天晚上」: có hai đêm ở bến cảng

**Chương, dòng 57, 79, 143:** 「那天晚上在码头」 · 「码头那天晚上，他就是被叫回去的」 · 「下次再在码头那样的地方碰上」.

**Timeline:** ngày 1 (trận kho cảng, Archer bị gọi về) và **ngày 8** (quyết đấu Saber–Lancer ở kho cảng, ch27). ch28 dùng 「纲吉从码头回来以后」 cho **đêm ngày 8**.

→ Người đọc theo sát sẽ khựng một nhịp. Dòng 95 đã có 「第一天晚上」, nên đọc cả đoạn thì vẫn hiểu.

**Đề xuất:** đổi dòng 79 thành 「第一天晚上在码头，他就是被叫回去的。」. Hai chỗ còn lại giữ nguyên.

---

## Để `finalize-chapter` biết (không phải lỗi)

- **Chi tiết mới cho [[dinh-thu-tosaka]]:** 「黑色的铁门，修剪整齐的草坪，一排高高的窗户」, thư phòng có rèm, ban ngày nhìn được qua khe rèm.
- **Tổ Caster biết 「远坂时臣」 và nhà trên đồi 深山町 từ lâu** (plan C5). Đã grep ch16–32: không chỗ nào nói ngược lại. Nên ghi vào [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/dazai|dazai]] khi `finalize`.

---

# Văn phong (check-style Mode 1)

Số đo bằng `han_metrics.py`, xem [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]. `style_metrics.py --json` trả exit 1 vì độ dài vượt 2.200 và thuật ngữ < 9; cả hai đều **bỏ qua**, lý do đã nêu ở phần "Cổng máy". Lần này **không** chạy `--write`, vì lệnh đó ghi đè `metadata.yaml` bằng số đếm sai (L26).

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.150) | **2.185** | ✅ |
| Thoại | 35–55 % | **34,5 %** | 🟡 **#7**, hụt 0,5 điểm |
| Chữ/đoạn TB | 35–55 | **34,7** | 🟡 **#7**, hụt 0,3 |
| Đoạn ≥ 100 chữ | ≤ 8 % | 1,6 % | ✅ |
| Câu trung vị | 17–20 | 17 | ✅ (sát sàn) |
| Câu ≥ 50 chữ | ≤ 12 % | 0 % | ✅ · nguyên tác 7,2 %, nên chương này thiếu câu dài (một xu hướng, không phải lỗi) |
| Câu ≤ 4 chữ /1000 | ≤ 5,5 | 2,75 | ✅ |
| `？` /1000 | ≥ 4 | 6,86 | ✅ |
| `！` /1000 | ≥ 1 | 1,37 | ✅ |
| `……` /1000 | 0,5–3,5 | 0,92 | ✅ |
| `——` /1000 | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ /1000 | ≥ 4 (plan) | 6,41 | ✅ · rải đều, không từ nào gánh cả (魔力 4 · 从者 3 · 御主 2 · 令咒 2 · 圣杯 1 · 彭格列 1 · 直觉 1) |
| Motif mắt | ≥ 1 | 5 | ✅ |
| Thoại theo cảnh | 40 · 40 · 50 % | 26 · 34 · 48 % | 🟡 **#7** · cảnh 01 thấp nhất |
| Lượt thoại theo cảnh | ≥ 8 · 8 · 8 | 13 · 16 · 16 | ✅ |
| Thuật ngữ theo cảnh | ≥ 3 · 4 · 4 | **2** · 4 · 8 | 🟡 **#7** · cảnh 01 thiếu 1 |
| 「没有」 /1000 | — | 6,4 | ✅ trong mức ch30–32 (7,1 · 6,2 · 8,6) |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 Thoại trong `“”`, không `「」` | ✅ 0 `「」` |
| §2 Kaomoji | ✅ 0 |
| §3 「我」 ngoài ngoặc | ✅ 0 |
| §5 Tiêu đề | ✅ `【太纲无差】反派战争33` + dòng ※ |
| §6 Thực thể cùng tên | ✅ Archer / 时臣 / Rider (征服王) không nhầm; không có Dazai kiếp trước |
| Tag sau ngoặc 「”[^“]{0,4}说」 (grep theo dòng) | ✅ 0 |
| 「挑不出」 · 「像在念一张」 | ✅ 0 |

## #7 · 🟡 chỉ tiêu · thoại 34,5 %, đoạn TB 34,7, thuật ngữ cảnh 01 = 2

Ba chỉ số hụt nhẹ, cả ba nằm trong **cảnh 01**. Cảnh này mở bằng đoạn kể trực giác và chân dung Archer, rồi kết bằng Tsuna đứng lại giữa phố. Muốn đủ số thì phải thêm lời thoại hoặc gài một chữ như 宝具 vào câu Archer. Làm vậy là nhét chữ (review ch31 #1).

→ **Hỏi Aurel:** chấp nhận ba số này cho chương này?

## #8 · 🔵 thấp · 「……也没有人会来把它关掉」: lời kể đi trước suy luận

**Chương, dòng 123:** 「那盏灯还亮着，好像已经亮了很久，也没有人会来把它关掉。」

→ Đây là câu cảm ở cuối đoạn (mẫu cần tránh #1). Nó cũng **nói hộ** kết luận của cảnh 03: "không ai sẽ về tắt đèn" tức là người trong nhà không còn. Tsuna lúc này chưa nghĩ tới đó. Câu vẫn nằm trong POV, nhưng đi trước Dazai một bước.

**Đề xuất:** 「那盏灯还亮着。」, hoặc giữ tới 「好像已经亮了很久」.

## #9 · 🔵 thấp · hai chuỗi liệt kê ba vế liền nhau

**Chương, dòng 107:** 「黑色的铁门，修剪整齐的草坪，一排高高的窗户」
**Dòng 117:** 「窗框、墙壁、书桌」

Dòng 33 cũng có 「鸡蛋、葱和一盒豆腐」. Hai chuỗi liền nhau ở dòng 107 và 117 làm nhịp đoạn chuồn chuồn phẳng đi (mẫu cần tránh #3).

**Đề xuất:** dòng 107 rút còn hai vế: 「黑色的铁门后面是一片修剪整齐的草坪」.

---

## Tổng hợp

| # | Mức | Nhóm | Tóm tắt | Đề xuất |
|---|---|---|---|---|
| 1 | 🟠 | Luật thế giới | 「里面没有一丝魔力」 là cơ chế đã cắt ở ch30 | cắt vế đó |
| 2 | 🟠 | Trạng thái | 「上一次……抢过去的」 sai, lần gần nhất là ch19–20 | 「第一天晚上，也是在这间屋子里……」 |
| 3 | 🟠 | Tri thức | 「猜得更近了一点」 nâng mối nghi quá L2 | 「那时候是猜，到今天也还是猜。」 |
| 4 | 🔵 | Canon | 「哪一类宝库」 ngược thế giới quan của Archer | 「你是本王宝库里的哪一类东西」 |
| 5 | 🔵 | Luật thế giới | 「那道结界」 chưa có trong vault | gộp với #1: 「……它只停在窗户外面，不进屋子。」 |
| 6 | 🔵 | Timeline | 「码头那天晚上」 lẫn với đêm ngày 8 | dòng 79 → 「第一天晚上在码头……」 |
| 7 | 🟡 | Chỉ tiêu | thoại 34,5 % · đoạn 34,7 · thuật ngữ cảnh 01 = 2 | hỏi chấp nhận |
| 8 | 🔵 | Văn phong | câu kết đoạn đèn nói hộ suy luận | 「那盏灯还亮着。」 |
| 9 | 🔵 | Văn phong | hai chuỗi ba vế liền nhau | rút dòng 107 còn hai vế |

Không có lỗi 🔴. Không có lỗi luật cứng.

---

## Mode 3 — đã sửa (Aurel 24/09/2026: "sửa theo đề xuất, chấp nhận số đo #7")

| # | Trước | Sau |
|---|---|---|
| 1 + 5 | 「这是彭格列的东西，里面没有一丝魔力，它只会停在窗户外面，不会碰那道结界。」 | 「这是彭格列的东西，它只停在窗户外面，不进屋子。」 |
| 2 | 「上一次在这间屋子里操纵机械蜻蜓，手柄是被太宰治从他手里抢过去的。」 | 「第一天晚上，也是在这间屋子里，操纵机械蜻蜓的手柄是被太宰治从他手里抢过去的。」 |
| 3 | 「那时候是猜，今天也只是猜得更近了一点。」 | 「那时候是猜，到今天也还是猜。」 |
| 4 | 「你是从哪一类宝库里走丢的。」 | 「你是本王宝库里的哪一类东西。」 |
| 6 | 「码头那天晚上，他就是被叫回去的。」 | 「第一天晚上在码头，他就是被叫回去的。」 |
| 8 | 「那盏灯还亮着，好像已经亮了很久，也没有人会来把它关掉。」 | 「那盏灯还亮着。」 |
| 9 | 「黑色的铁门，修剪整齐的草坪，一排高高的窗户。」 | 「黑色的铁门后面是一片修剪整齐的草坪。」 |
| 7 | thoại 34,5 % · đoạn TB 34,7 · thuật ngữ cảnh 01 = 2 | **Aurel chấp nhận** cho chương này |

**Đo lại:**

| Chỉ số | Kết quả |
|---|---|
| Chữ Hán | 2.156 |
| Thoại | 34,8 % |
| Chữ/đoạn TB | 34,2 |
| Câu trung vị | 17 |
| `？` · `！` · `……` · `——` /1000 | 6,96 · 1,39 · 0,93 · 0 |
| Thuật ngữ /1000 | 6,03 |
| Motif mắt | 5 |

⚠️ **Thuật ngữ cảnh 02 tụt từ 4 xuống 3** (thẻ cảnh ≥ 4) vì #1 cắt mất một chữ 「魔力」. Đây là hệ quả của #1, **không** gài bù.

**Kiểm lại:**
- `pov_leak_check` ×3: findings 0; chỉ [[kiritsugu-la-master-that]] là không kiểm được (cảnh 01, 03).
- Tag sau ngoặc: 0.
- Grep 切嗣 · 卫宫 · 魔术师杀手 · 戒指 · 指环 · 白兰 · 教会 · 绮礼 · Azoth · 死 · 结界 · 上一次 · 猜得更近 · 挑不出 · 像在念一张: 0.

**Tránh lỗi ở thẻ cảnh sau:** thẻ cảnh không được viết 「không dùng ma thuật」 cho đồ Vongola, vì #1 là lỗi lặp lại từ ch30.
