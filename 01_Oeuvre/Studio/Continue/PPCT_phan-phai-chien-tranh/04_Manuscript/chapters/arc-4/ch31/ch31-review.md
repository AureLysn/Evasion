---
id: review.PPCT.ch31-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-4-ba-dao-lenh-chu
chapter: 31
canon_layer: user_canon
status: active
aliases: ["review ch31 PPCT", "soat ch31", "check-continuity ch31", "check-style ch31", "礼物 review"]
related: ["[[04_Manuscript/chapters/arc-4/ch31/ch31-chapter]]", "[[04_Manuscript/chapters/arc-4/ch31/ch31-plan]]", "[[20260923-canon-lenh-chu-tokiomi]]", "[[Gilgamesh-Archer]]", "[[kirei-van-la-master]]", "[[gilgamesh]]", "[[tokiomi]]", "[[kirei]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 23/09/2026, tren ban nhap ch31 (2.294 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien — xem canh bao dau file."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-23
---

# Soát chương 31 — 礼物

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát cũng là người viết bản nháp, trong cùng một phiên.** Soát kiểu này dễ bỏ sót đúng những chỗ người viết đã tin là đúng. Nếu muốn một lượt độc lập, giao cho agent `continuity-reviewer` (chỉ đọc, ngữ cảnh riêng).

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×3 cảnh | exit 1 · **findings 0** ở cả ba · `dazai-mang-ky-uc-kiep-truoc` không kiểm được (chưa có `leak_terms` chữ Hán) |
| grep tay | 时空 · 戒指 · 指环 · 平行 · 彭格列 · 三道 · 璃正 · 父亲 · 凛 = 0 trong thân truyện. 纲吉/太宰 chỉ ở dòng 预警 |
| `han_metrics.py` | bảng *Chỉ tiêu* bên dưới |
| `style_metrics.py --write` | exit 1 — độ dài "vượt 2.200" (bỏ qua: [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets\|targets]] không có trần); **ghi đè `metadata.yaml`**, đã ghi lại |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo cũ |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Tối → đêm ngày 10, sau ch30 (sáng → trưa). 「昨天傍晚…黑色的轿车」 = chạng vạng ngày 9 ✓ (ch29). 「从酒宴散场的那天晚上算起」 = ngày 3 ✓. 「第一天晚上的仓库街」 = ngày 1 ✓ (ch9). 🔵 **#4** 「你来冬木……已经三年了」 |
| Ranh giới tri thức | ✅ Gilgamesh ở `known_by` [[kirei-van-la-master]] và [[assassin-chua-chet]] — được biết. ✅ Tsuna chỉ là 「一个个子小小的Caster」 + 「那件东西」, **không** gọi loại (ch9 「时空宝物」 không lặp). ✅ Số lệnh chú của Kirei **không** nêu (「多得多」 · 「有几道」). ✅ Không nội tâm Kirei — chỉ 「那张脸…什么也看不出来」 · 「没有去看倒在门边的人」 |
| Trạng thái nhân vật | ✅ Tokiomi còn **hai** lệnh chú, **mu bàn tay phải** — khớp ch9 「凝视着右手的手背」 và [[tokiomi]]. ✅ Lệnh chú ch9 dùng **khi tay Archer đã trong cổng Babylon** — khớp nguyên văn. ✅ 「收回宝库」 khớp niềm tin ch9 của Archer (「将宝物从我宝库中盗走的小偷」 · 「纳入宝库」) |
| Luật thế giới | ✅ Kế tự sát bằng lệnh chú cuối để mở cổng — canon ([[20260923-canon-lenh-chu-tokiomi]] #3). ✅ Kirei đâm sau lưng khi Tokiomi ra cửa; Gilgamesh không động tay (#11). ✅ Azoth剑 = lễ vật xuất sư (萌娘百科). 🔵 **#3** câu Kirei về Servant mất Master |
| Quan hệ / xưng hô | ✅ Archer gọi 「时臣」 (C3, khớp ch9); Tokiomi gọi 「英雄王」 (khớp ch9); Kirei gọi Archer 「英雄王」 · 「您」. 🔵 **#5** Kirei gọi Tokiomi 「老师」 — chưa kiểm canon |
| Canon | ✅ Lý do tiễn Kirei theo **C1** (Assassin mất từ Vương Yến; nhà thờ trung lập) — **không** nhắc Irisviel/liên minh. 🔵 **#2** hai chi tiết mới không nguồn |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm` |

**Hook:** [[hook-can-dazai-de-thang-archer]] đẩy (Master mới không kìm hắn) ✓ · [[hook-archer-tuyen-chien-rider]] đẩy nhẹ, một ý nghĩ ✓ · [[hook-vi-sao-tsuna-khong-phai-nguoi]] chạm nhẹ ở mức "món đồ" ✓.

---

## #1 · 🔵 thấp · lệch plan · Thêm một lượt hỏi–đáp về nguyện vọng ở cảnh 03

**Chương, dòng 143–147:** 「本王问你，绮礼。拿到圣杯以后，你想要什么？」 · 「……还不知道。」 · 「那就慢慢去找吧！这场战争，还长着呢。」

**Thẻ cảnh 03, Diễn biến:** khế ước ngắn → một ý nghĩ về Rider → hình ảnh khép. **Không** có câu hỏi này. Skill `write-chapter`: *"Hit the 3–5 planned beats and no new ones."*

→ Nằm **trong** beat 5, đúng tinh thần canon ([[Gilgamesh-Archer]]: Gilgamesh dẫn Kirei đi tìm điều hắn muốn), và **không** mở nội tâm Kirei. Nhưng đây là lời thoại writer **tự thêm** để đủ `？`/`！`/`……`, tức là thêm vì số chứ không vì truyện. Bỏ đi thì cảnh 03 hụt ước lượng (371 → ~330 chữ), nhưng **không** chạm sàn chương.

**Hướng sửa (chọn một):** giữ — ghi nhận là lệch có lý do; hoặc bỏ ba dòng và chấp nhận `！`/`……` giảm (đo lại sau khi bỏ).

## #2 · 🔵 thấp · Hai chi tiết mới không nguồn

**Dòng 47:** Kirei 「他书房里关于乌鲁克的古书，恐怕比冬木市所有图书馆加起来还要多」. **Dòng 113:** Tokiomi 「按照远坂家的规矩」.

→ Không mâu thuẫn gì, nhưng thành fact nếu arc sau quay lại thư phòng Tōsaka. Cả hai nằm trong **lời thoại**, nên có thể coi là lời nói quá của nhân vật. **Mình không chắc** đây là lỗi.

**Hướng sửa:** giữ (khẩu vị) — hoặc dòng 47 bỏ vế sau: 「……老师对您的敬意是真的。」

## #3 · 🔵 thấp · 「一骑失去了御主的从者，在这座城市里撑不了多久」

**Dòng 135.** Canon: Archer có kỹ năng Hành động độc lập nên trụ được một thời gian không cần Master — câu của Kirei **không sai** (không nói bao lâu), nhưng Gilgamesh nghe câu này mà không phản ứng thì hơi hiền. **Chưa nghiên cứu** hạng kỹ năng Hành động độc lập của Archer lần 4. **Mình không chắc.**

**Hướng sửa:** giữ; hoặc cho Archer đáp lại một câu kiêu, thay 「本王看得见。」 bằng 「本王还用不着你来提醒。」 🟡

## #4 · 🔵 thấp · 「你来冬木……已经三年了吧」

**Dòng 97.** [[Kirei-Kotomine]]: lệnh chú hiện **ba năm trước** chiến tranh → thành đệ tử Tokiomi. "Tới **Fuyuki** ba năm" là suy thêm — canon không nói Kirei ở Fuyuki suốt ba năm. **Mình không chắc.**

**Hướng sửa:** 「绮礼，你跟着我学魔术……已经三年了吧？」 — đúng với note canon mà không cần nói địa điểm.

## #5 · 🔵 thấp · Kirei gọi Tokiomi 「老师」

**Dòng 43, 99, 107, 115.** Chưa kiểm cách gọi trong bản Trung của Fate/Zero (萌娘百科 có một chú thích 「言峰绮礼对时臣的称谓」 nhưng mình **không** đọc được nội dung chú thích). Không phải lỗi cho tới khi có nguồn.

---

# Check-style

## Bảng chỉ tiêu

Đo bằng `han_metrics.py`. Chương dệt canon, chỉ tiêu theo plan ch31.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | sàn 1.500 · plan ~2.300 | 2.294 | ✅ |
| Thoại | 30–45 % | 34,9 % | ✅ |
| Chữ Hán/đoạn TB | 35–55 | 37,0 | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 3,2 % | ✅ |
| Câu trung vị | 17–20 | 20 | ✅ **chạm trần** |
| Câu ≥ 50 chữ | ≤ 12 % | 0,9 % | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 2,62 | ✅ |
| `？` | ≥ 4/1000 | 5,67 | ✅ |
| `！` | ≥ 1/1000 | 1,31 | ✅ — **phụ thuộc #1** (1 trong 3 dấu nằm ở đó) |
| `……` | 0,5–3,5 | 1,31 | ✅ — **phụ thuộc #1** (1 trong 3) |
| `——` | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ | ≥ 9/1000 | 12,64 | ✅ — trải 7 từ, nhiều nhất 御主 8 |
| Motif mắt | ≥ 1 | 3 | ✅ |
| Lượt thoại theo cảnh | ≥ 10 · 5 · 3 | 20 · 12 · 7 | ✅ |
| Thuật ngữ theo cảnh | ≥ 10 · 6 · 4 | 17 · 6 · 6 | ✅ |
| Thoại cảnh 03 | ~35 % (ước lượng thẻ) | 24 % | — không phải sàn |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 Thoại trong `“”`, không `「」` | ✅ 0 |
| §2 Không kaomoji | ✅ |
| §3 Không 「我」 ngoài ngoặc · **không 「本王」 ngoài ngoặc** (POV Gilgamesh) | ✅ 0 · 0 |
| §4 Trích Dazai Osamu | — không có |
| §5 Tiêu đề 【太纲无差】反派战争31 · dòng ※ | ✅ |
| Tag trước ngoặc | ✅ grep theo dòng 「”[^“]{0,4}说」 = 0 |

## #6 · 🟠 vừa · Tả Kirei và Tokiomi bằng đúng chữ của ch28 và ch30

**Dòng 57:** Kirei 「语气平得像在念一张日程表」. **ch28 dòng 59** (tả Kirei): 「客气得挑不出一点错，可是听起来就像在念一张早就写好的单子」.
**Dòng 109:** Tokiomi cười 「温和，得体，挑不出一点毛病」. **ch28 dòng 59** 「挑不出一点错」 · **ch30 dòng 121** 「挑不出错处」.

→ Ba chương liền dùng 「挑不出」; hai chương tả giọng Kirei bằng cùng một phép so sánh "như đang đọc một tờ giấy". Cộng thêm dòng 109 là **liệt kê ba vế đều** ([[forbidden-patterns]] #3) và tính từ cảm xúc thay hành vi (#4). Đây là **lỗi**, không phải khẩu vị: cụm từ đã thành tật qua ba chương.

**Hướng sửa:**
- Dòng 57: 「语气平平的，和刚才说那些古书的时候没有两样」 (nếu giữ #2) — hoặc 「语气一点起伏也没有」.
- Dòng 109: 「时臣笑了一下，那是一个老师对着自己的学生才会有的笑。」 — bỏ ba vế.

## #7 · 🔵 thấp · Ý nghĩ của Gilgamesh đặt trong ngoặc kép rồi nói "không ra tiếng"

**Dòng 127–129:** 「“到最后，你也还是没有看懂啊，时臣……”」 · 「这句话，他没有说出声。」

→ [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature|signature]] *Ống kính và nội tâm*: tác giả viết nội tâm dạng **「X想。」 đứng cuối đoạn ngắn** (8 lần), không đặt ý nghĩ trong `“”`. Hai dòng này cũng tính ý nghĩ vào tỷ lệ thoại.

**Hướng sửa:** 「到最后，你也还是没有看懂啊，时臣。Archer想。」 — bỏ dòng 129.

## #8 · 🔵 thấp · Tag 「X说：」 đều tay, cảnh 01 dày

**20** tag 「说：」; **9** đoạn mở bằng 「绮礼说：」; dòng 43–57 là sáu lượt 「绮礼说／Archer说」 liền nhau. Đúng quy ước *tag trước ngoặc*, nhưng nhịp đơn điệu — cùng nhận xét với ch30. Khẩu vị, **không** phải lỗi.

**Hướng sửa (nếu muốn):** đổi hai tag thành hành động, ví dụ dòng 55 「Archer的手指在扶手上敲了一下：“然后呢？”」.

## Nhận xét về giọng

- Mở bằng thoại (「“你来了。”」) và dòng địa danh đứng riêng (「远坂宅。」) — đúng hai nét của [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature|signature]].
- 「屋子里安静了一会儿。」 · 「书房里只剩下台灯的光。」 — câu nhịp lặng một dòng, đúng lối tác giả.
- Motif tay áo (袖口 ×4, 「一道一道」 ×2) có chủ đích, vọng ch29; không phải lặp vô ý.
- Không có câu tổng kết ở cảnh khép — dòng cuối là hình ảnh (tay áo kéo xuống).

## Chỗ mình không chắc

- #2, #3, #4, #5 — đều là suy hoặc chưa có nguồn, không phải mâu thuẫn đã chứng minh.
- `forbidden_secrets` của cả ba thẻ chỉ có hai bí mật; rủi ro lớn nhất (bản chất Tsuna) là **question**, không phải secret, nên `pov_leak_check` **không** kiểm nó — chỉ grep tay.

## Còn treo sang `finalize-chapter`

- Tokiomi **chết**; Archer đổi Master sang Kirei; Kirei giữ Azoth剑.
- [[kirei-van-la-master]]: không ai mới biết; Gilgamesh vốn đã biết.
- Location mới 🟡: 远坂宅 (thẻ 02–03 ghi bằng chữ).
- Event mới 🟡: Tokiomi chết / Archer đổi Master.
- `gilgamesh`, `kirei`, `tokiomi`: trạng thái sau ch31.

---

## Đã sửa — write-chapter Mode 3, Aurel 24/09/2026 ("sửa theo đề xuất")

| # | Trước | Sau |
|---|---|---|
| #6 | 「语气平得像在念一张日程表」 · 「温和，得体，挑不出一点毛病」 | 「语气一点起伏也没有」 · bỏ ba vế |
| #1 | ba dòng hỏi–đáp nguyện vọng ở cảnh 03 | **bỏ** |
| #3 | 「本王看得见。」 | 「本王还用不着你来提醒。」 |
| #4 | 「你来冬木……已经三年了吧？」 | 「你跟着我学魔术……已经三年了吧？」 |
| #7 | 「“到最后，你也还是没有看懂啊，时臣……”」 + 「这句话，他没有说出声。」 | 「到最后，你也还是没有看懂啊，时臣。Archer想。」 |
| #8 | 「Archer说：“然后呢？”」 · 「绮礼说：“是关于老师的事。”」 | 「Archer的手指在扶手上敲了一下：…」 · 「绮礼把手从台灯上收了回来：…」 |
| #2 · #5 | — | **giữ** (hướng đầu tiên của review) |

### Số đo sau Mode 3

| | Trước | Sau | Chỉ tiêu |
|---|---|---|---|
| Chữ Hán | 2.294 | 2.253 | sàn 1.500 ✅ |
| Thoại | 34,9 % | 33,6 % | 30–45 % ✅ |
| Câu trung vị | 20 | 20 | 17–20 ✅ |
| Thuật ngữ /1000 | 12,64 | 12,43 | ≥ 9 ✅ |
| `！` /1000 | 1,31 | **0,89** | ≥ 1 🟡 **dưới sàn** |
| `……` /1000 | 1,31 | **0,44** | 0,5–3,5 🟡 **dưới sàn** |
| Thuật ngữ cảnh 03 | 6 | 5 | ≥ 4 ✅ |

`！` và `……` hụt đúng như #1 đã báo trước: dấu nằm trong ba dòng bị bỏ và trong câu sửa ở #7. **Không** nhét dấu vào chỗ khác để chạm số. Chờ Aurel: chấp nhận cho chương này, hay trả lại một dấu.

Grep lại: 挑不出 · 念一张 = 0 · 「本王」/「我」 ngoài ngoặc = 0 · tag sau ngoặc = 0. `pov_leak_check` ×3: findings 0.
