---
id: review.PPCT.ch22-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-2-moi-va-luoi
chapter: 22
canon_layer: user_canon
status: final
aliases: ["review ch22 PPCT", "soat ch22", "check-continuity ch22", "check-style ch22"]
related: ["[[04_Manuscript/chapters/arc-2/ch22/ch22-chapter]]", "[[04_Manuscript/chapters/arc-2/ch22/ch22-plan]]", "[[fact-cong-nghe-vongola-trong-chien-tranh]]", "[[do-tham-saber-lancer-kho-cang]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master|master]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 2, 20/09/2026, tren ban nhap ch22 (2.251 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-20
---

# Soát chương 22 — 新闻

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch22 --scene <4 thẻ>` | exit **1** — không khớp được chữ Hán (`L29`); đã grep tay **13 từ khoá**, 0 hit |
| `vault_doctor --include-fiction --zone …/PPCT` | 234 note · **0 lỗi** · 1 cảnh báo cũ (`branches/aurel-main.md`) |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ ngày 6 sáng, nối đúng sau ch20 và ch21 — 🔵 **#5** về cách đếm ngày |
| Ranh giới tri thức | 🟠 **#1** — thiết bị giám sát có thể đã thấy thứ Dazai "chưa biết" · 🟠 **#2** |
| Trạng thái nhân vật | 🔵 **#4** — hạt giống giấc mơ của ch20 không được đỡ |
| Luật thế giới | 🟠 **#1** — chuồn chuồn máy không phải thiết bị đậu chỗ |
| Quan hệ / xưng hô | ✅ 「纲吉」 · 「太宰」 đúng [[dazai--tsuna]] |
| Canon (gồm `fic_explicit` ch4) | 🟠 **#3** — câu nhắc lại ch4 sai một chữ |
| Hợp đồng nhánh | ✅ không chạm mục `Cấm` |

---

## #1 · 🟠 vừa · Thiết bị giám sát có thể đã nhìn thấy đúng cái mà Dazai "chưa biết"

**Chương:** 「最后一块屏幕连着**挂在**西郊那间废弃仓库**屋顶上**的蜻蜓。」 và trước đó 「太宰治的手指在键盘上点过去，一块一块地把**昨天没看的那段补回来**」

**[[fact-cong-nghe-vongola-trong-chien-tranh]]:** “**Chuồn chuồn máy** | điều khiển bằng **tay cầm game**, hồng ngoại, **bay tới vị trí quan sát** | ch4”

Hai chuyện chồng lên nhau:

- **Thiết bị sai loại.** Chuồn chuồn máy trong nguyên tác là thứ **có người lái trực tiếp**, bay tới chỗ cần nhìn (ch19 cũng vậy: 「悬在森林上空的蜻蜓」). Bản nháp cho nó **treo trên mái** cả đêm như một camera cố định. Thứ đậu chỗ và ghi hình mà truyện có ghi là **bọ giám sát cỡ ruồi** (ch3).
- **「补回来」 làm lung lay C2.** Nếu có bản ghi để xem bù, thì Dazai đang xem đúng cái khung giờ mà lệnh chú đổi tay. Cảnh ch21 diễn ra một phần **ngoài** căn phòng quây tôn: 「门开了，走出来的人不是他的御主。索拉乌站在门口那道光里，把左手抬起来给他看」 — tức là ở chỗ ống kính trên mái **có thể** với tới.

Quyết định C2 ("biết một nửa") đứng được, nhưng chương phải **nói rõ vì sao** nó đứng. Ba lối:

- **A** — đổi sang **bọ giám sát** đậu trong nhà kho + bỏ 「补回来」: Dazai chỉ xem **trực tiếp** sáng ngày 6. Sạch nhất, và khớp thiết bị với ch3.
- **B** — giữ chuồn chuồn, thêm **một câu** nói máy chỉ **truyền trực tiếp, không ghi**: ai không ngồi xem thì mất. Giữ được nhịp hiện tại, chỉ tốn một câu.
- **C** — giữ nguyên, chấp nhận Dazai **có thể** đã lướt qua mà không để ý. Rẻ nhất, nhưng đổi C2 từ "chưa thấy" thành "thấy mà bỏ sót", và như thế thì ch23 phải trả lời tại sao hắn bỏ sót.

## #2 · 🟠 vừa · 「六个御主」 — Dazai nói chắc một con số mà chính hắn từng ngờ

**Chương:** 「这座城里现在有**六个御主、六个从者**，随便哪一个认真起来都能把半条街掀掉。」

**assassin-tap-kich-vuong-yen:** “Dazai (POV) … thì thầm với Tsuna hai điều **nghi**: **Master của Assassin còn lệnh chú**; màn Assassin 'chết' … có lẽ cùng phe Archer. 「也可能不是。现在还只是猜。」”

Sáu **从者** thì đúng (Saber · Lancer · Rider · Archer · Berserker · Caster — Assassin bị loại ở ch17, [[assassin]]). Nhưng sáu **御主** là con số Dazai tự đặt dấu hỏi cách đây ba chương, và chương này để hắn nói ra như một sự thật đã đếm xong.

Sửa rẻ: bỏ vế 御主, chỉ nói 「六个从者」 — vừa đúng, vừa không đụng tới [[kirei-van-la-master]] (arc 2 cấm Kirei lên trang). Hoặc cho hắn tự treo một chữ: 「至少六个」.

*Mỉa mai nằm sẵn ở đó và mình cố ý không động vào:* Kayneth **đã không còn** là Master từ đêm qua, nên con số của Dazai sai theo một hướng khác hẳn hướng hắn đang ngờ.

## #3 · 🟠 vừa · Câu nhắc lại ch4 sai một chữ — 吃过 thay vì 杀过

**Chương:** 「杀人的人不会记得自己杀过的人，就像人不会记得自己**吃过**的鸡。」

**[[do-tham-saber-lancer-kho-cang]] (ch4, nguyên tác):** “kẻ giết người không nhớ người mình giết, như người không nhớ **con gà mình giết**”

Một chữ, nhưng nó đổi lập luận: 杀过 nói về **hành vi giết**, 吃过 nói về **việc hưởng thành quả**. Lập luận gốc của Tsuna là về việc **ra tay**, và chính vì thế nó đâm được vào Dazai. Đề nghị trả lại 杀过.

## #4 · 🔵 thấp · Hạt giống của ch20 không được đỡ

**ch20 (câu cuối của Dazai):** 「今晚大概又要做梦了。」

ch22 mở ra đúng **sáng hôm sau** và không có một chữ nào về chuyện đó. Plan ch22 cố ý để [[hook-dazai-mo-tiep-kiep-truoc]] cho ch23, nên đây **không phải lỗi** — nhưng người đọc vừa đọc câu ấy ở cuối chương trước. Một câu hỏi bỏ lửng của Tsuna ("tối qua có mơ không") là đủ, mà vẫn không phải trả hook.

Nếu để nguyên thì nên ghi vào plan ch23 rằng hạt giống này đã **cách hai chương**.

## #5 · 🔵 thấp · 「第六天」 — cách đếm ngày chưa có tiền lệ trong truyện

**Chương:** 「**第六天**早上，纲吉走进那间屋子的时候……」

[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master|master]] đếm ngày 1 = đêm trận kho cảng, nên ngày 6 là **đúng**. Nhưng grep cả ch16–ch22: **không chương nào khác** dùng lối 「第N天」; nguyên tác neo thời gian bằng mốc trong truyện (ch13: 「昨日」; ch12: 「前天在仓库前」). Không sai, chỉ là chương này tự mở một quy ước mới. Nếu giữ thì nên giữ luôn cho các chương sau; nếu không thì thay bằng một mốc nội truyện.

## #6 · 🔵 thấp · 「远坂家那边一整夜没有动静」 — chưa có nguồn cho việc giám sát nhà Tōsaka

Truyện chỉ ghi tổ Caster theo dõi **Einzbern** (ch3) và bám trận kho cảng (ch4). Không note nào nói họ đặt mắt ở nhà Tōsaka. Không mâu thuẫn — chỉ là chi tiết tự thêm, và nếu giữ thì nó ngầm mở rộng tầm giám sát của tổ Caster, thứ sẽ bị hỏi lại ở arc sau.

## Ghi cho plan ch23 — không phải lỗi của ch22

Chương này chốt 「连一具尸体都没找到」 và 「警察查不到他」. Vậy **tổ Caster tìm ra hắn bằng cách nào** ở ch23? Canon đã loại hang ổ cống ngầm (ryunosuke-gay-an-khong-servant), nên ch23 phải tự dựng đường truy. Đây là câu hỏi phải trả lời **trước** khi viết ch23.

---

# check-style — Mode 2

Đo bằng script đếm chữ Hán trong scratchpad (`style_metrics.py` không đọc được chữ Hán — `L26`).

## Bảng chỉ tiêu

| Chỉ số | Chỉ tiêu (chế độ trộn) | Đo được | |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.300) | **2.251** | ✅ |
| Thoại | 40–55 % | **40,1 %** | ✅ sát sàn |
| Chữ Hán/đoạn TB | 35–55 | **45,9** | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 4,1 % | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 3,8 % | ✅ |
| Câu trung vị | 17–20 | **18** | ✅ |
| Câu ≤ 4 chữ | 2,85–5,54/1000 | 4,00 | ✅ |
| Đoạn có thoại | 63,6–76,9 % | 65,3 % | ✅ |
| Đoạn thoại trơ | 9,1–23,3 % | 10,2 % | ✅ |
| `？` | ≥ 4/1000 | 5,33 | ✅ |
| `！` | ≥ 1/1000 | 1,33 | ✅ |
| `……` | 0,5–3,5/1000 | 0,89 | ✅ |
| `——` | ≤ 2,5/1000 | 2,22 | ✅ |
| Mật độ thuật ngữ | ≥ 5/1000 | 5,78 | ✅ sát sàn |
| Motif mắt | ≥ 1 | 3 | ✅ |

## Luật cứng

| Luật | |
|---|---|
| §1 thoại trong `“”`, không dùng `「」` | ✅ 0 |
| §2 không kaomoji | ✅ 0 |
| §3 không ngôi một ngoài ngoặc kép | ✅ 0 |
| §4 trích Dazai Osamu có 注 | ✅ không trích |
| §5 tiêu đề `【太纲无差】反派战争22` + dòng đồng nhân | ✅ |
| §6 phân biệt thực thể cùng tên | ✅ |

## Ba nhận xét về giọng

- **S1 · 🔵** — Thoại **40,1 %** và thuật ngữ **5,78/1000** đều đứng sát sàn. Không sai, nhưng chương này gần với chương đời thường hơn là dự kiến trong plan (~46 %). Nếu Aurel muốn dày hơn thì chỗ tự nhiên nhất là cảnh 2 — Dazai giải thích cách nhận ra dấu vết pháp sư, hiện chỉ có hai lượt.
- **S2 · 🔵** — Bài học rút được, khác hai chương trước: thứ kéo câu trung vị xuống 11 ở nháp đầu **không phải** đoạn vụn mà là **tag sau ngoặc** (「”纲吉问。」 bị đếm thành một câu 3 chữ). Đổi sang tag trước ngoặc (「纲吉转过头去看他：“……”」) kéo trung vị từ 11 lên 18. Nên ghi vào plan ch23.
- **S3 · 🔵** — `……` 0,89/1000, thấp trong dải (0,5–3,5). Chương này ít chỗ ngập ngừng; hợp với nhịp, chỉ báo số.

---

## Chỗ mình không chắc

- **#1** là phát hiện mình tự tin nhất và cũng là chỗ mình tự gây ra: cả 「挂在屋顶」 lẫn 「补回来」 đều do mình thêm, không có trong plan.
- **#2** không phải mâu thuẫn cứng — sáu Servant là đúng. Mình xếp 🟠 vì nó để Dazai nói chắc một chỗ chính hắn đã treo.

---

# Kết quả sửa — `write-chapter` Mode 3, 20/09/2026

Aurel gọi Mode 3 không kèm chỉ định từng mục, nên mình theo đúng đề xuất trong review và ghi rõ ở đây để đổi lại được.

| # | Đã làm | Chi tiết |
|---|---|---|
| 1 | **lối A** | Chuồn chuồn máy → 「一只**苍蝇大小的监视虫**，停在西郊那间废弃仓库的房梁上」 (khớp ch3). Bỏ 「把昨天没看的那段补回来」 → 「一块屏幕一块屏幕地看过来」. Thêm một câu khoá lỗ hổng: 「那些虫子只管把看见的东西往回传，没有人坐在这里的时候，传回来的东西就散在空屋子里，谁也留不住。」 |
| 2 | sửa | 「这座城里现在**还剩六个从者**」 — bỏ hẳn vế đếm 御主 |
| 3 | sửa | 「就像人不会记得自己**杀过**的鸡」 — trả lại chữ của ch4 |
| 4 | **giữ nguyên** | Plan ch22 đã chốt không chạm [[hook-dazai-mo-tiep-kiep-truoc]]; thêm một câu hỏi về giấc mơ là đi ngược plan đã duyệt. Ghi sang plan ch23: hạt giống ch20 đã cách hai chương |
| 5 | **giữ nguyên** | Giữ 「第六天」 và coi đây là quy ước mới cho các chương sau |
| 6 | sửa | Bỏ 「远坂家」 ở cả hai chỗ (đoạn rà màn hình và đoạn kết) |

**Hai chỗ sửa kèm, không nằm trong phát hiện nào:** (a) 「结果一个都没少」 lặp lại 「人都还在，一个也没少」 ngay câu trước → đổi thành 「结果谁也没对谁动手」; (b) tách lượt thoại dài của Dazai ở cảnh 2 làm hai đoạn để giữ trần đoạn ≥100 chữ.

⚠️ **Một chỗ chưa có nguồn chữ Hán:** vault ghi thiết bị này bằng tiếng Việt ("bọ giám sát cỡ ruồi", ch3) — **không có** nguyên văn tiếng Trung. 「监视虫」 là chữ mình đặt. Nếu Aurel có bản ch3 trong tay thì nên tra lại rồi sửa cho khớp, và ghi vào [[fact-cong-nghe-vongola-trong-chien-tranh]].

## Số đo sau Mode 3

| Chỉ số | Chỉ tiêu | Trước | Sau |
|---|---|---|---|
| Chữ Hán | ≥1.500 (plan ~2.300) | 2.251 | **2.313** |
| Thoại | 40–55 % | 40,1 % | **40,6 %** |
| Đoạn TB | 35–55 | 45,9 | **46,3** |
| Câu trung vị | 17–20 | 18 | **20** |
| Câu ≤4 chữ | ≤5,5/1000 | 4,00 | **3,89** |
| Đoạn ≥100 chữ | ≤8 % | 4,1 % | 6,0 % |
| `？`·`！`·`——` | ≥4 · ≥1 · ≤2,5 | 5,33·1,33·2,22 | **5,19·1,30·2,16** |
| Thuật ngữ | ≥5/1000 | 5,78 | **5,19** |
| Motif mắt | ≥1 | 3 | **3** |

Cổng sau sửa: grep tay 15 từ khoá (thêm `蜻蜓`, `远坂`) → **0 hit** · `vault_doctor --include-fiction --zone …/PPCT` → **0 lỗi**.

## Còn treo sang `finalize-chapter`

- Quy ước 「第六天」 và chữ 「监视虫」 — có nên thành `decision` note không.
- #4 → ghi vào plan ch23.
- Câu hỏi chặn ch23: **tổ Caster tìm ra hung thủ bằng cách nào**, khi chương này đã chốt không có xác và cảnh sát bó tay.
