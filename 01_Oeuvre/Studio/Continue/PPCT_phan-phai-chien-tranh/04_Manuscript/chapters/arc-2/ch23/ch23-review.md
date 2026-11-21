---
id: review.PPCT.ch23-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-2-moi-va-luoi
chapter: 23
canon_layer: user_canon
status: active
aliases: ["review ch23 PPCT", "soat ch23", "check-continuity ch23", "check-style ch23"]
related: ["[[04_Manuscript/chapters/arc-2/ch23/ch23-chapter]]", "[[04_Manuscript/chapters/arc-2/ch23/ch23-plan]]", "[[Ryuunosuke-Uryuu]]", "[[fact-cong-nghe-vongola-trong-chien-tranh]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 21/09/2026, tren ban nhap ch23 (4.001 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-21
---

# Soát chương 23 — 手铐

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch23 --scene <5 thẻ> --json` | exit **1** cả 5 thẻ. Công cụ không khớp được chữ Hán (`L29`), nên kết quả không có giá trị kiểm. Đã grep tay **27 từ khoá**, 0 lần xuất hiện ngoài hai chỗ hợp lệ. Danh sách ở `metadata.yaml` |
| `vault_doctor --include-fiction --zone …/PPCT` | 247 note · **0 lỗi** · 1 cảnh báo cũ (`branches/aurel-main.md`) |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Chiều đến tối ngày 6, nối đúng sau ch22. Câu nhắc ch20 khớp nguyên văn. 🟠 **#1**: đứa trẻ thứ sáu bị bắt trong một khoảng thời gian rất hẹp |
| Ranh giới tri thức | ✅ Không ai biết lệnh chú đã đổi tay. Dazai lảng câu hỏi về giấc mơ, không kể nội dung. Ryūnosuke không biết tên ai |
| Trạng thái nhân vật | ✅ Tsuna nối từ 「哪里不对」 ở ch22. Dazai vẫn giữ giọng "không phải việc của chúng ta" |
| Luật thế giới | ✅ Không lửa, không dị năng, không thiết bị Vongola. 🔵 **#3**: màn hình được gọi là "tivi" |
| Quan hệ / xưng hô | ✅ Thoại dùng 「纲吉」 · 「太宰」, lời kể dùng 「太宰治」 — đúng [[dazai--tsuna]] và [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature\|signature]] |
| Canon | ✅ Ngoại hình và tính cách Ryūnosuke khớp [[Ryuunosuke-Uryuu]]. Không cống ngầm, không vòng tay thôi miên. 🔵 **#4**: 「深山町」 chưa có note canon |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm`. Đoạn "hai loại trống rỗng" của bản cũ không dùng |

---

## #1 · 🟠 vừa · Đứa trẻ thứ sáu bị bắt trong một khoảng thời gian rất hẹp, và cú điện thoại giả định cảnh sát đã đi tìm

**Chương:**
- Dòng 99: 「雨是在他们下车以后十分钟开始下的」 — mưa bắt đầu **sau khi** hai người tới nơi, lúc đã quá trưa (dòng 97).
- Dòng 127: 「撑开放着一把伞，正在往下滴水」 — chiếc ô ướt và đang nhỏ nước.
- Dòng 213: 「你们在找的孩子坐在屋檐底下」
- Dòng 233: 「第六名失踪儿童已被找到」

**Hệ quả:** cô bé phải bị bắt **sau khi mưa bắt đầu**, tức trong lúc hai người đi bộ qua hai con phố. Như vậy từ lúc bị bắt tới lúc Dazai gọi điện có lẽ chưa tới một giờ, mà Dazai lại nói với cảnh sát như thể họ **đang** tìm cô bé.

**Note liên quan:** to-caster-truy-hung-thu-bang-suy-luan-va-truc-giac — 「trực giác chỉ phải chọn giữa vài cánh cửa, nên không thành *deus ex machina*」. Trực giác thì không có vấn đề. Vấn đề là **thời điểm quá khớp**: tổ Caster tới đúng trong khoảng một giờ ngay sau khi hắn ra tay. Đây là kiểu trùng hợp người đọc dễ nhận ra.

Không mâu thuẫn với note nào. Đây là lỗi logic nội bộ của chương.

**Hướng sửa (chọn một):**
- (a) Cho mưa bắt đầu **trên đường đi** (cảnh 1, trước khi xe dừng). Cô bé bị bắt lúc tan học, cách lúc tìm ra vài giờ. Sửa hai câu, dòng 97 và 99.
- (b) Giữ nguyên thời gian, sửa lời Dazai ở dòng 213 thành 「一个穿黄雨衣的小女孩」. Bản tin tối vẫn đúng, vì tới lúc đó bố mẹ cô bé đã báo mất tích.
- (c) Cả hai.

## #2 · 🔵 thấp · 「靠山那边两个」 và vùng khoanh 「深山町靠山脚」 cùng một hướng

**Chương:**
- Dòng 53: 「东边一个，河对岸两个，靠山那边两个」
- Dòng 75: 「中间是空的……是深山町靠山脚的那片老房子吧」

**Plan:** [[04_Manuscript/chapters/arc-2/ch23/ch23-plan]] beat 2 — 「nhà hắn nằm ở khoảng trống giữa năm điểm」.

Hai vụ nằm "phía núi", mà vùng ở giữa cũng "dưới chân núi". Đọc lướt thì tâm của năm điểm lại nằm về phía hai điểm, không nằm giữa. Không sai logic (một vành các điểm vẫn có tâm), nhưng cách viết dễ gây nghi ngờ. Có thể đổi 「靠山那边两个」 thành một hướng khác, ví dụ 「北边两个」.

## #3 · 🔵 thấp · Màn hình bị gọi là "tivi ở góc phòng"

**Chương, dòng 233:** 「角落里那台连着别人家客厅的电视正在播晚间新闻」

**ch22, dòng 59:** 「另一块屏幕上是一台电视。那台电视在冬木市某户人家的客厅里」

Ở ch22, căn cứ **không có tivi**: một màn hình phát hình từ con bọ đặt trong phòng khách một nhà dân, và tivi thuộc về nhà đó ([[fact-cong-nghe-vongola-trong-chien-tranh]]). Chữ 「那台……电视」 ở ch23 dễ đọc thành căn cứ có tivi riêng. Có thể sửa thành 「那块连着别人家客厅的屏幕」.

## #4 · 🔵 thấp · 「深山町」 chưa có note canon trong vault

**Chương, dòng 75 và 213:** 「深山町」

**Note:** khu-nha-ryunosuke — 「tên khu phố: chưa chốt. Writer chọn … và báo lại」. `Database/Fandom/Fate/` không có note địa danh Fuyuki.

Miyama-chō là khu phố cũ của Fuyuki trong canon Fate. Mình ghi theo trí nhớ canon, nhãn `assumed`, chưa đối chiếu nguồn. Không phải mâu thuẫn. Tới `finalize-chapter` thì ghi tên này vào khu-nha-ryunosuke. Nếu muốn chắc, chạy `crosscheck-canon` cho địa danh Fuyuki.

---

# check-style — Mode 1

Đo bằng `han_metrics.py` trong scratchpad, vì `style_metrics.py` không đọc được chữ Hán (`L26`). Script đã chạy thử trên ch22 và khớp đúng mọi số của `ch22/metadata.yaml` (`L45`).

## Bảng chỉ tiêu

| Chỉ số | Chỉ tiêu (đời thường có hành động) | Đo được | |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~3.100) | **4.001** | ✅ vượt sàn · 🔵 **S2** |
| Thoại | 45–60 % | **44,4 %** | 🔵 **S1** — hụt sàn 0,6 điểm |
| Chữ Hán/đoạn TB | 35–55 | **34,5** | 🔵 **S1** — hụt sàn 0,5 |
| Đoạn ≥ 100 chữ | ≤ 8 % | 3,4 % | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 4,0 % | ✅ |
| Câu trung vị | 17–20 | **17,5** | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 5,00 | ✅ |
| Đoạn có thoại | 63,6–76,9 % | 65,5 % | ✅ |
| Đoạn thoại trơ | 9,1–23,3 % | 17,2 % | ✅ |
| `？` | ≥ 4/1000 | 7,50 | ✅ |
| `！` | ≥ 1/1000 | 1,25 | ✅ sát sàn |
| `……` | 0,5–3,5/1000 | 1,75 | ✅ |
| `——` | ≤ 2,5/1000 | 2,25 | ✅ |
| Mật độ thuật ngữ | không đặt sàn | 1,25 | ✅ — 英灵 2 · 魔力 1 · 直觉 2, không từ nào gánh một mình |
| Motif mắt | ≥ 1 | 9 | ✅ |

## Luật cứng

| Luật | |
|---|---|
| §1 thoại trong `“”`, không dùng `「」` | ✅ 0 |
| §2 không kaomoji | ✅ 0 |
| §3 không ngôi một ngoài ngoặc kép | ✅ 0 |
| §4 trích Dazai Osamu có 注 | ✅ không trích |
| §5 tiêu đề `【太纲无差】反派战争23` + dòng đồng nhân | ✅ |
| §6 phân biệt thực thể cùng tên | ✅ |

## Nhận xét về giọng

- **S1 · 🔵 · chỉ tiêu, không phải lỗi.** Thoại 44,4 % và chữ/đoạn 34,5 đều hụt sàn khoảng nửa điểm. Bản đầu chỉ có 27,6 % thoại, và hai lượt sửa trong `write-chapter` đã kéo lên tới đây. Chỗ còn nặng lời kể là cảnh 2, đoạn đi dưới mưa, vốn được plan cho 35 % thoại. **Aurel có chấp nhận không?** Nếu muốn qua sàn, cách tự nhiên nhất là gộp vài đoạn lời kể ngắn (nâng chữ/đoạn) và thêm một lượt thoại ở cảnh 2. Không nhồi chữ.
- **S2 · 🔵** — Chương dài 4.001 chữ, plan dự kiến ~3.100, dài hơn 29 %. Ngân sách là sàn, không phải trần. Phần dài hơn nằm ở cảnh 1 (chuỗi suy luận) và cảnh 3. Chỉ báo số.
- **S3 · 🔵 · dấu vết văn AI #3 (liệt kê ba vế đều).** Có bốn chỗ:
  - Dòng 77: 「去了东边，去了河对岸，去了山那边」
  - Dòng 107: 「看鞋，看衣服，看报纸」
  - Dòng 133: 「那把伞、那块木牌、那扇拉死的窗帘」
  - Dòng 165: 「没有生气，没有嘲笑，也没有兴趣」

  Dòng 77 và 107 nằm trong thoại, là giọng liệt kê của Dazai, hợp nhân vật. Dòng 133 và 165 nằm trong lời kể nên thấy rõ hơn. Dòng 165 lặp khuôn ch22 dòng 91 (「没有嘲笑，也没有不耐烦」, hai vế). Nếu sửa thì rút dòng 165 còn hai vế.
- **S4 · 🔵** — So sánh 「像」: 3,5/1000, sát ch22 (3,89) và cao hơn ch20 (1,69). Chưa có mốc từ nguyên tác vì `sources/nguyen-tac-…md` chỉ là mục lục, văn bản gốc nằm ở kho. Không phải trôi dạt. Chỉ báo số.
- ✅ Không thấy câu tổng kết cảm xúc cuối đoạn (#1). Cặp 「不是…是」 chỉ có 2 lần (dòng 77, 133), không lặp nhiều (#2). Không dùng tính từ cảm xúc thay hành vi (#4).

## Chỗ mình không chắc

- **#1** là phát hiện mình tin nhất. Mình cũng là người tạo ra nó: plan chỉ ghi "bị bắt chiều hôm đó", còn chi tiết chiếc ô **đang nhỏ nước** là do bản nháp thêm.
- 「我刚搬来的时候也迷路了好几次」 (dòng 141): không note nào nói Ryūnosuke sống ở Fuyuki bao lâu. Theo wiki thì hắn đi khắp Nhật Bản, nên câu này không mâu thuẫn, và mình không xếp nó thành phát hiện.
- Tấm bản đồ (dòng 47–51): Dazai ra khỏi phòng trước ở ch22 (dòng 125), nên việc "vẽ lúc cậu thay giày" vẫn khớp. Chương không nói bản đồ lấy ở đâu, mình không coi đó là lỗi.

## Còn treo sang `finalize-chapter`

- đã làm ở Mode 3, xem mục dưới.
- `finalize-chapter`: ghi 「深山町」 vào khu-nha-ryunosuke. Cập nhật `hook-dazai-mo-tiep-kiep-truoc` (đẩy nhẹ ở ch23, giữ `partially_paid`), dòng ch23 trong bảng arc 2, và timeline chiều–tối ngày 6.

---

# Kết quả sửa — `write-chapter` Mode 3, 21/09/2026

Aurel gọi Mode 3 không chỉ định từng mục, nên mình làm theo đúng đề xuất trong review, như tiền lệ ch22. Ghi rõ ở đây để có thể đổi lại.

| Mục | Đã sửa | Chỗ |
|---|---|---|
| #1 (a) — biến thể | Không dời giờ mưa. Thay vào đó, hai người đi quanh khu **gần ba tiếng** (「走了快三个钟头」), và Tsuna chỉ nhà ở **lượt đi qua thứ hai** của con phố thứ ba. Chính Tsuna nói ra lý do: 「上一次走过去的时候，门口还没有那把伞。」 Như vậy trực giác bật vì **có thứ vừa thay đổi**, không phải trùng hợp, và cô bé bị bắt lúc chiều, đúng thẻ cảnh 03 | cảnh 2 |
| #1 (b) | 「你们在找的孩子」 → 「一个穿黄雨衣的小女孩」 | cảnh 4 |
| #2 | 「靠山那边两个」 → 「北边两个」 | cảnh 1 |
| #3 | 「那台……电视」 → 「那块连着别人家客厅的屏幕」 | cảnh 5 |
| S1 | Gộp hai đoạn lời kể ngắn vào đoạn liền kề. Thêm một lượt thoại ở cảnh 2 (「我的腿已经不是我的了」/「是你自己要开车来的」). Cắt ba câu tả | cảnh 2, 4, 5 |
| S3 | Dòng 165 rút còn hai vế: 「没有生气，也没有嘲笑」 | cảnh 3 |
| #4 | Không sửa chương — để `finalize-chapter` ghi vào khu-nha-ryunosuke | — |

⚠️ Chỗ lệch so với review: #1 (a) trong review đề xuất **dời giờ mưa lên sớm hơn**. Mình chọn cách kéo dài thời gian đi bộ, vì cách đó giữ được mốc "bị bắt chiều hôm đó" của thẻ cảnh 03 và câu 「新闻难得说准一次」. Aurel muốn dùng đúng cách dời giờ mưa thì báo lại.

## Số đo sau Mode 3

| Chỉ số | Chỉ tiêu | Trước | Sau | |
|---|---|---|---|---|
| Chữ Hán | ≥ 1.500 | 4.001 | **4.026** | ✅ |
| Thoại | 45–60 % | 44,4 % | **45,2 %** | ✅ sát sàn |
| Chữ Hán/đoạn TB | 35–55 | 34,5 | **35,0** | ✅ sát sàn |
| Câu trung vị | 17–20 | 17,5 | **17** | ✅ sát sàn |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 5,00 | 4,97 | ✅ |
| Đoạn có thoại | 63,6–76,9 % | 65,5 % | 67,0 % | ✅ |
| `？` · `！` · `……` · `——` | ≥ 4 · ≥ 1 · 0,5–3,5 · ≤ 2,5 | | 7,45 · 1,24 · 1,74 · 2,24 | ✅ |
| Grep tay 27 từ khoá bí mật | 0 | 0 | **0** | ✅ |
