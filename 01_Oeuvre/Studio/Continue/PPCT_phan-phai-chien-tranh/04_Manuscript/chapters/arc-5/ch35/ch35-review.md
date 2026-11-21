---
id: review.PPCT.ch35-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-5-ke-san-va-con-moi
chapter: 35
canon_layer: user_canon
status: active
aliases: ["review ch35 PPCT", "soat ch35", "check-continuity ch35", "check-style ch35", "ke san review"]
related: ["[[04_Manuscript/chapters/arc-5/ch35/ch35-chapter]]", "[[04_Manuscript/chapters/arc-5/ch35/ch35-plan]]", "[[Kiritsugu-Emiya]]", "[[kirei-van-la-master]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 24/09/2026, tren ban nhap ch35 (1.880 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-24
---

# Soát chương 35 — Kẻ săn

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát và người viết bản nháp là một, trong cùng một phiên.** Nếu muốn một lượt soát độc lập, dùng agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --json` ×3 cảnh | findings **0** · exit 1 ở cả ba cảnh, chỉ vì [[assassin-chua-chet]] và [[dazai-mang-ky-uc-kiep-truoc]] không có `leak_terms` chữ Hán. Đã grep tay Assassin · 哈桑 · 暗杀者 · 上辈子 · 白兰 · 梦 = 0 |
| grep tay | 时臣 · 远坂 · Archer · 令咒 · 索拉乌 · 彭格列 · Azoth · 爱丽丝菲尔 · 容器 · 没有魔力 · 新都 · 挑不出 · 像在念一张 = **0** |
| `style_metrics.py --write` | exit 1 vì thuật ngữ < 9. Plan đã ghi đây là lệch có chủ đích (≥ 4). `metadata.yaml` đã viết lại theo mẫu |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo có từ trước |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ 「第十二天夜里」 song song với cảnh 03 ch34. 「第十三天早上」 nằm trước buổi hẹn trưa. 「他花了三天去找这个人」 khớp ngày 10 → 13 (ch30). 「圣杯战争打到第十三天」 khớp cách đếm ngày của Timeline. 🔵 **#1** giờ trong đêm |
| Ranh giới tri thức | ✅ Kiritsugu **không** biết Tokiomi đã chết; đêm ngày 10 chỉ là 「一个已经输掉的御主，没有理由在半夜一个人走下山去」, đúng mức nghi ([[kirei-van-la-master]] `suspected_by`). ✅ Không có chữ nào về lệnh chú của Sola-Ui. ✅ Người gửi: 「是Caster的御主吗？也许。」, không chắc (C5). ✅ Con dơi 「被人找了出来」, không nêu Kirei là người tìm ra |
| Trạng thái nhân vật | ✅ Sola-Ui **dìu** Kayneth, tay nẹp gỗ (ch28–29). ✅ Maiya không bị thương. ✅ Kiritsugu hút thuốc (ch19 thì cất bao thuốc lại). 🔵 **#2** 「司机也是教会的人」 |
| Luật thế giới | ✅ 「没有找到咒文，也没有找到任何魔术的痕迹」 là **quan sát của Kiritsugu**, khớp ch19 「纯粹的机械造物」; người kể **không** khẳng định đồ Vongola "không dùng ma lực". ✅ Con bọ vẫn phát tín hiệu, khớp ch34. ✅ 「放到河对岸去」 không nêu tên khu nào |
| Quan hệ / xưng hô | ✅ Maiya gọi 「切嗣」 (ch19). ✅ Saber gọi 「切嗣」, đúng canon. ✅ Kiritsugu không trả lời Saber, đúng canon và C7 |
| Canon | ✅ Dơi mang camera, ý của Kiritsugu; Kirei giết con dơi đêm đầu; Kiritsugu sợ Kirei là 「能杀死卫宫切嗣」 — đều theo 20260924-canon-kiritsugu-theo-doi-nha-tho. ✅ Tên 言峰绮礼 xuất hiện **một lần**, không dùng lẫn 神父 |
| Hợp đồng nhánh | ✅ Không chạm mục `forbid` |

**Hook:** [[hook-to-caster-khac-che-to-saber]] được đẩy: kẻ săn chưa kịp lần theo thì con mồi đã tới trước — 「他花了三天去找这个人，这个人只花了一个晚上，就找到了他的车」 ✓.

---

## #1 · 🔵 thấp · Đêm ngày 12, Kiritsugu thức ngồi trước màn hình mà không thấy con chuồn chuồn lúc gần nửa đêm

**Chương, dòng 33:** 「监视器的屏幕照旧被分成十几个小格子」. Cảnh 01 diễn ra "đêm ngày 12" nhưng không ghi giờ.
**Dòng 95–97:** sáng ra mới biết qua băng ghi: 「快到午夜的时候，有东西落在车上」.
**ch34:** Tsuna bắt đầu cho chuồn chuồn bay 「夜里十一点多」.

→ Nếu cảnh 01 kéo tới gần nửa đêm, Kiritsugu đang nhìn màn hình chia ô thì lẽ ra đã thấy con chuồn chuồn ngay lúc nó đến. Cũng có thể giải thích: cảnh 01 kết thúc sớm hơn, và từ 「关掉吧」 trở đi không ai ngồi xem màn hình. **Mình không chắc** đây là lỗi; người đọc kỹ mới dừng lại ở chỗ này.

**Đề xuất:** thêm mốc giờ vào đoạn mở cảnh, ví dụ 「第十二天夜里，九点多。」. Hoặc giữ nguyên.

## #2 · 🔵 thấp · 「司机也是教会的人」 — Maiya khẳng định hơn mức băng ghi cho thấy

**Chương, dòng 65:** 「车是教会的车，司机也是教会的人。」
**ch29 dòng 113, 117:** 「开车的是一个不怎么说话的中年人」; tài xế hỏi 「是去机场吗？」.

→ Không mâu thuẫn trực tiếp. Nhưng việc Maiya biết tài xế là "người của nhà thờ" là thông tin mới, không có nguồn: camera chỉ thấy một người đàn ông trung niên lái xe. Nếu ch36 dùng chi tiết này làm dữ kiện thì nó sẽ thành tiền đề.

**Đề xuất:** 「车是教会的车。」, bỏ vế tài xế.

---

# Văn phong (check-style Mode 1)

Số đo từ `han_metrics.py`, so với [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]] và plan ch35.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.100) | 1.880 | ✅ đạt sàn · 🟡 **#5** thấp hơn dự kiến 220 chữ |
| Thoại | plan ~31 % · chương dệt canon cho xuống ~20 % | **18 %** | 🟡 **#5** |
| Chữ/đoạn TB | 35–55 | **30,8** | 🟡 **#5** |
| Đoạn ≥ 100 chữ | ≤ 8 % | 1,6 % | ✅ |
| Câu trung vị | 17–20 | **14,5** | 🟡 **#5** |
| Câu ≥ 50 chữ | ≤ 12 % | 1,8 % | ✅ |
| Câu ≤ 4 chữ /1000 | ≤ 5,5 | 5,32 | ✅ sát trần |
| `？` /1000 | ≥ 4 | 5,85 | ✅ |
| `！` /1000 | ≥ 1 | **0,53** | 🟡 **#5** |
| `……` /1000 | 0,5–3,5 | 0,53 | ✅ sát sàn |
| `——` /1000 | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ /1000 | ≥ 4 (plan) | 5,32 (thêm 魔术 · 使魔 thì cao hơn) | ✅ |
| Motif mắt | ≥ 1 | 1 (「眼睛里有一点红色的光」) | ✅ |
| Lượt thoại theo cảnh | ≥ 5 · 5 · 6 | 14 · 10 · 11 | ✅ |
| Thuật ngữ theo cảnh | ≥ 4 · 2 · 3 | 12 · **1** · 3 | 🟡 **#5** cảnh 02 thiếu 1 |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 `“”`, không `「」` | ✅ |
| §2 Kaomoji | ✅ 0 |
| §3 「我」 ngoài ngoặc | ✅ 0 |
| §5 Tiêu đề | ✅ `【太纲无差】反派战争35` + dòng ※ |
| §6 Thực thể cùng tên | ✅ |
| Tag sau ngoặc (grep theo dòng) | ✅ 0 |

## #3 · 🔵 thấp · Câu mở chương gần như chép lại câu mở ch19

**Chương, dòng 33:** 「爱因兹贝伦的城堡在夜里还是那么安静。」
**ch19, dòng 31:** 「爱因兹贝伦的城堡在夜里安静得过分。」

→ Có vẻ là vọng lại có chủ ý: cùng POV, cùng lâu đài, và chữ 「还是」 đánh dấu việc lặp lại. Nhưng hai câu mở gần như trùng nhau dễ đọc thành tự chép. **Mình không chắc** đây là lỗi.

**Đề xuất:** giữ nguyên, hoặc đổi thành một chi tiết khác, ví dụ mở bằng chính con bọ trên bàn.

## #4 · 🔵 thấp · Hai đoạn liền nhau cùng mở bằng 「在他身后」

**Dòng 145:** 「Saber在他身后说：“切嗣！”」
**Dòng 147:** 「舞弥在他身后停了一步」

→ Lặp vị trí hai lần liên tiếp làm nhịp đoạn chùng lại.

**Đề xuất:** dòng 147 đổi thành 「舞弥停了一步，对Saber说：“他很快就回来。”」.

## #5 · 🟡 chỉ tiêu · thoại 18 % · đoạn TB 30,8 · câu trung vị 14,5 · `！` 0,53 · thuật ngữ cảnh 02 = 1 · 1.880 chữ

- Thoại 18 % nằm dưới mức plan (31 %) và sát mức sàn của chương dệt canon (~20 %). Bản đầu chỉ có 9,9 %; lượt sửa ở `write-chapter` đã chuyển phần kể thành thoại đến mức còn giữ được giọng nhân vật.
- Đoạn TB và câu trung vị thấp là **hệ quả** của lượt sửa đó: thoại Kiritsugu và Maiya rất cụt (「放吧。」 · 「去。」 · 「是它。」). Đây là giọng canon của hai người này.
- `！` chỉ có một chỗ (Saber gọi 「切嗣！」). Kiritsugu và Maiya không phải kiểu người hay kêu lên.
- Cảnh 02 chỉ có một thuật ngữ (御主). Thẻ cảnh đặt 魔力, nhưng cảnh này không có chỗ tự nhiên để đưa vào.

→ Muốn đạt đủ các số này thì phải cho hai người nói dài hơn tính cách của họ, hoặc nhét thêm chữ. **Hỏi Aurel:** chấp nhận cho chương này?

---

## Tổng hợp

| # | Mức | Nhóm | Tóm tắt | Đề xuất |
|---|---|---|---|---|
| 1 | 🔵 | Timeline | thức trước màn hình mà không thấy chuồn chuồn lúc gần nửa đêm | thêm 「九点多」, hoặc giữ |
| 2 | 🔵 | Trạng thái | 「司机也是教会的人」 không có nguồn | bỏ vế tài xế |
| 3 | 🔵 | Văn phong | câu mở gần như chép ch19 | giữ, hoặc đổi câu mở |
| 4 | 🔵 | Văn phong | hai đoạn liền nhau cùng 「在他身后」 | bỏ ở dòng 147 |
| 5 | 🟡 | Chỉ tiêu | thoại 18 % · đoạn 30,8 · câu 14,5 · `！` 0,53 · thuật ngữ cảnh 02 = 1 | hỏi chấp nhận |

Không có lỗi 🔴 hay 🟠. Không có lỗi luật cứng.

## Để `finalize-chapter` biết (không phải lỗi)

- **Kiritsugu biết tổ Lancer đã rời Fuyuki** (qua băng ghi chạng vạng ngày 9) → cập nhật [[kiritsugu]] và sola-ui-doi-lenh-chu-lay-duong-ve.
- **Kiritsugu thấy Kirei xuống dốc tối ngày 10** mà không biết đi đâu → xét thêm một dòng 📌 ở [[kirei-van-la-master]] (Kiritsugu vẫn ở mức `suspected_by`, **không** đổi) và archer-doi-master-sang-kirei (Kiritsugu vẫn `unknown_to`).
- **Camera thường ở cột điện chân dốc nhà thờ** (Maiya, đặt sau đêm ngày 1) — chi tiết au-specific → ghi vào [[nha-tho-fuyuki]] hoặc [[maiya]].
- Kế hoạch **lần theo tín hiệu tối ngày 13** (thêm một máy thu 「河对岸」) → ghi vào "Ghi cho ch36".

---

## Mode 3 — đã sửa (Aurel 24/09/2026: "đồng ý đề xuất, write-chapter Mode 3")

| # | Trước | Sau |
|---|---|---|
| 1 | 「第十二天夜里。」 | 「第十二天夜里，九点多。」 |
| 2 | 「是。车是教会的车，司机也是教会的人。」 | 「是。车是教会的车。」 |
| 3 | — | **giữ nguyên** (đề xuất thứ nhất) |
| 4 | 「舞弥在他身后停了一步，对Saber说」 | 「舞弥停了一步，对Saber说」 |
| 5 | thoại 18 % · đoạn TB 30,8 · câu trung vị 14,5 · `！` 0,53 · thuật ngữ cảnh 02 = 1 | **chấp nhận** — đọc "đồng ý đề xuất" là chấp nhận #5 (review không có phương án sửa nào khác ngoài nhét chữ) |

**Đo lại:** 1.880 → **1.871** chữ Hán · thoại 17,6 % · đoạn TB 30,7 · câu trung vị 14 · `？` 5,88 · `！` 0,53 · `……` 0,53 · thuật ngữ 5,34/1000.

**Kiểm lại:** `pov_leak_check` ×3 → findings 0 · tag sau ngoặc 0 · grep 司机也是 · 在他身后停了一步 · 时臣 · 远坂 · Archer · 令咒 · 索拉乌 = 0.
