---
id: review.PPCT.ch28-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-3-hai-cay-thuong
chapter: 28
canon_layer: user_canon
status: active
aliases: ["review ch28 PPCT", "soat ch28", "check-continuity ch28", "check-style ch28"]
related: ["[[04_Manuscript/chapters/arc-3/ch28/ch28-chapter]]", "[[04_Manuscript/chapters/arc-3/ch28/ch28-plan]]", "[[kirei-van-la-master]]", "[[Kirei-Kotomine]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 22/09/2026, tren ban nhap ch28 (2.251 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-22
---

# Soát chương 28 — 教会

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch28 --scene <3 thẻ>` | exit **1** cả 3 — không khớp được chữ Hán (`L29`); grep tay ghi ở `ch28/metadata.yaml`: 0 hit, kể cả grep theo cảnh (言峰/绮礼 ở cảnh 02–03; 卫宫/切嗣 ở cảnh 01) |
| `style_metrics.py` | không chạy — không đọc được chữ Hán (`L26`); đo bằng `han_metrics.py` |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo cũ |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Cảnh 01 gần sáng ngày 9 (「天还没有亮」), Lancer 「昨天晚上」 — khớp lancer-chet-trong-quyet-dau (đêm ngày 8). Cảnh 02 「第九天早上」 — đúng [[quy-uoc-dem-ngay-trong-loi-ke]]. 「第一天晚上是一只蜻蜓」 — ch5 ✓ |
| Ranh giới tri thức | 🟠 **#1** nguồn tin 「教会就通知过所有的御主」 và việc tổ Caster biết Master của Assassin ở nhà thờ. 🟠 **#2** Tsuna 「他不是早就输了吗」. ✅ Dazai chỉ **nghi**, không tên — câu đùa 「教会倒是一个很方便的地方呢」 nằm trong mức cho phép của [[kirei-van-la-master]] (「nghi ngờ nhà thờ nếu POV có dữ kiện」). ✅ Sola-Ui chỉ **đoán** người áo đen là phe Saber — 「可是也只是猜」 |
| Trạng thái nhân vật | ✅ Sola-Ui giữ đủ ba đạo lệnh chú, không dùng đạo nào; Kayneth tay nẹp gỗ (ch25 「bàn tay nẹp gỗ」 ↔ 「夹着木板的手」). 🔵 **#3** lệnh chú 「颜色比昨天暗了一些」 |
| Luật thế giới | ✅ Master mất Servant xin nhà thờ che chở — canon, plan C1. ✅ Bảy Anh Linh còn năm: Assassin bị Rider diệt ở ch17, Lancer ở ch27 |
| Quan hệ / xưng hô | ✅ 「纲吉」; Tsuna gọi 「索拉乌小姐」 · 「肯尼斯先生」 như ch27; Kirei gọi cha 「家父」, không nêu tên Risei |
| Canon | ✅ Kirei cao, áo cha đạo, thánh giá; Risei là giám sát viên già — [[Kirei-Kotomine]]. 🔵 **#4** họ tên đầy đủ của Sola-Ui. Không có nội tâm Kirei; Kirei không nói một lời về lệnh chú |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm` |

---

## #1 · 🟠 vừa · 「教会就通知过所有的御主」 — chi tiết không có nguồn, kéo theo tri thức của tổ Caster

**Chương, dòng 51 (POV Sola-Ui):** 「战争刚开始没几天，教会就通知过所有的御主，Assassin已经退场，它的御主从此由教会保护」
**Chương, dòng 89 (Dazai):** 「你还记得Assassin的御主现在住在哪里吗？」 — Tsuna đáp 「也在教会」.

**[[Kirei-Kotomine]]:** 「dàn màn Gilgamesh "giết" một Assassin trước mặt các Master → mọi người tin Kirei đã thua. Kirei ở nhà thờ làm "Master bại trận"」 — **không** nói có lời thông báo gửi mọi Master.
**assassin-chet-gia-truoc-dem-kho-cang:** 「Dazai và Tsuna biết tin **lần đầu ở trận kho cảng**, qua lời Rider」.

→ Lời thông báo chính thức "gửi mọi Master" là chi tiết **tự đặt**. Nếu có, Dazai cũng là Master và phải nhận — không mâu thuẫn thẳng với A1 (「没几天」 có thể là sau ngày 1), nhưng nó mở một kênh tin cho tổ Caster mà chưa chương nào có. Câu 「你还记得……住在哪里吗」 còn giả định Tsuna **đã được biết** việc này từ trước — chưa chương PPCT nào cho thấy. Mình **không chắc** canon có màn Risei thông báo hay không — không tìm được nguồn trong vault.

**Hướng sửa:**
- Dòng 51: 「Assassin的御主输得最早，这件事参战的人大概都听说了，他从那以后就一直待在教会里，受教会保护，不再算是参战的一方，是一个比她输得更早的人。」 — "nghe nói", không có thông báo.
- Dòng 89: để Dazai **đưa** tin thay vì hỏi Tsuna nhớ: 「安全是安全。不过纲吉，Assassin的御主输掉以后，也是住进了教会的。」 — Dazai có giám sát Vongola ([[fact-cong-nghe-vongola-trong-chien-tranh]]), hắn biết là hợp lý.

## #2 · 🟠 vừa · Tsuna 「他不是早就输了吗」 — Tsuna biết màn thua đầu là giả

**Chương, dòng 91:** 纲吉：「也在教会……可是他不是早就输了吗？」

**assassin-chet-gia-truoc-dem-kho-cang:** 「Ngay sau đó Tsuna thấy Assassin còn sống qua hồng ngoại」 (ch7); ch17 Tsuna đứng trong Ionioi Hetairoi thấy Rider diệt sạch Assassin.

→ 「早就」 trỏ về màn chết giả — thứ Tsuna đã biết là giả từ ch7. Câu này để Tsuna tin một điều cậu biết là sai.

**Hướng sửa:** 「也在教会……可是他已经没有从者了啊？」 — đúng tri thức sau ch17, thêm một thuật ngữ, không lặp câu Dazai ở cảnh 03 (「Assassin在酒宴上被Rider收拾干净了」).

## #3 · 🔵 thấp · Lệnh chú 「颜色比昨天暗了一些」

**Chương, dòng 41:** 「三道红色的纹路还在皮肤底下，颜色比昨天暗了一些，却一道也没有少。」

Không note canon hay PPCT nào nói lệnh chú mờ đi khi Servant chết. Arc 4 cần ba đạo này **còn dùng được** (plan ch28 「Ghi cho arc 4」). Chi tiết "tối đi" gợi ý chúng đang tắt.

**Hướng sửa:** bỏ vế đó — 「三道红色的纹路还在皮肤底下，一道也没有少。」

## #4 · 🔵 thấp · Họ tên đầy đủ 「索拉乌·纳萨莱·索菲亚莉」

**Chương, dòng 55.** PPCT chưa từng viết họ tên đầy đủ của Sola-Ui. Dạng 「纳萨莱·索菲亚莉」 là **lai** giữa các bản dịch; 萌娘百科 dùng 「索拉乌·纳泽莱·索菲亚利」 ([nguồn](https://zh.moegirl.org.cn/zh-hans/%E7%B4%A2%E6%8B%89%E4%B9%8C%C2%B7%E7%BA%B3%E6%B3%BD%E8%8E%B1%C2%B7%E7%B4%A2%E8%8F%B2%E4%BA%9A%E5%88%A9)); bản khác có 「娜泽莱」, 「奴阿萨蕾·索菲亚丽」.

**Hướng sửa:** theo 萌娘百科 — 「索拉乌·纳泽莱·索菲亚利」.

---

## Bảng chỉ tiêu

Đo bằng `han_metrics.py` (khớp ch22 — L45). Chương **trộn**, chỉ tiêu theo plan ch28.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | sàn 1.500 · plan ~2.200 | 2.251 | ✅ |
| Thoại | 35–55 % | **35,4 %** | ✅ **sát sàn** — cảnh 01 (plan 30 %) kéo xuống. Sửa #1/#2 không đổi đáng kể. Có chấp nhận không? |
| Chữ Hán/đoạn TB | 35–55 | 37,5 | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 0 % | ✅ |
| Câu trung vị | 17–20 | 18 | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 1,9 % | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 0,89 | ✅ — thấp; nhịp câu cực ngắn của tác giả gần như vắng |
| `？` | ≥ 4/1000 | 8,0 | ✅ |
| `！` | ≥ 1/1000 | 1,78 | ✅ |
| `……` | 0,5–3,5 | 1,78 | ✅ |
| `——` | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ | ≥ 6/1000 | 11,99 | ✅ — 圣杯 4 · 英灵 1 · 御主 10 · 令咒 4 · 从者 8; **không** dồn vào một từ |
| Motif mắt | ≥ 1 | 8 | ✅ |
| Lượt thoại theo cảnh | 6 · 10 · 6 | 8 · 18 · 12 | ✅ |
| Thuật ngữ theo cảnh | 6 · 6 · 4 | 12 · 10 · 5 | ✅ |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 Thoại trong `“”`, không `「」` | ✅ 0 `「` |
| §2 Không kaomoji | ✅ |
| §3 Không 「我」 ngoài ngoặc kép | ✅ 0 (lời tác giả nằm ngoài thân truyện) |
| §4 Trích Dazai Osamu | — không có |
| §5 Tiêu đề 【太纲无差】反派战争28 | ✅ · dòng ※ ✓ |
| Tag trước ngoặc (quy định arc 3) | ✅ grep 「”[^“]{0,4}说」 = 0 |

## Nhận xét về giọng

- **Dấu vết văn AI** ([[forbidden-patterns]]): không câu tổng kết cảm xúc cuối đoạn; 「不是……而是」 1 lần trong lời kể (dòng 49) + 1 trong thoại (dòng 47) — dưới ngưỡng "lặp nhiều lần"; không liệt kê ba vế đều; không mở đoạn bằng trạng ngữ thời gian lặp.
- **So sánh 「像」: 7 lần** trong 2.251 chữ, hơi dày. Chỗ yếu nhất là dòng 67 「安静得像是一口井，丢一块石头进去也听不见回声」 — "giếng sâu" cho mắt Kirei là lối quen trong fandom; không sai, nhưng dòng 59 「像在念一张早就写好的单子」 đã làm việc đó tốt hơn. Tuỳ bạn — không phải lỗi.
- Kết arc bằng việc nhà (dòng 143–149) đúng thẻ cảnh: không tổng kết, không cliffhanger.

## Chỗ mình không chắc

- **Kayneth leo bậc đá** (dòng 43). Canon: sau Origin Bullet hắn ngồi xe lăn. PPCT ch19 chỉ ghi 「mạch ma thuật bị cắt rồi nối loạn」, ch25/27 hắn **nằm** trên thùng hàng — không nói đi được hay không. Chương không mâu thuẫn chữ nào, nhưng nếu muốn theo canon thì đây là chỗ lệch.
- **Tên họ Kayneth** 「埃尔梅罗」 (dòng 45) khác 「艾尔梅洛伊」 ở ch19 — nhưng **cả hai đều có trong nguyên tác** (ch3 fax 「埃尔梅罗君主」, ch6 「艾尔梅洛伊」). Không sửa.
- Lời tác giả 「下一卷见」 — ngoài thân truyện, không thuộc phạm vi soát; đã báo ở bước write-chapter.

## Còn treo sang `finalize-chapter`

- Sola-Ui + Kayneth ở nhà thờ; Kirei **đã thấy** ba đạo lệnh chú (sự kiện mới).
- [[kirei-van-la-master]]: tiến gần người đọc — không đổi `known_by`.
- [[hook-to-caster-khac-che-to-saber]] nhắc lại, **không** đổi status; [[hook-archer-tuyen-chien-rider]] · [[hook-can-dazai-de-thang-archer]] đẩy nhẹ.
- Arc 3 → khép.

## Số đo sau Mode 3

Aurel duyệt sửa #1–#4 theo hướng đề xuất, 22/09/2026. Phép so sánh 「一口井」 **giữ** (không nằm trong phạm vi sửa).

| | Trước | Sau |
|---|---|---|
| Chữ Hán | 2.251 | 2.247 |
| Thoại | 35,4 % | 35,6 % |
| Câu trung vị | 18 | 19 |
| `？` /1000 | 8,0 | 7,57 |
| Thuật ngữ /1000 | 11,99 | 12,02 |
| Tag sau ngoặc | 0 | 0 |

Grep lại: 通知过 · 早就输了 · 暗了 · 纳萨莱 = 0.
