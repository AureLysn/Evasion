---
id: review.PPCT.ch26-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-3-hai-cay-thuong
chapter: 26
canon_layer: user_canon
status: active
aliases: ["review ch26 PPCT", "soat ch26", "check-continuity ch26", "check-style ch26"]
related: ["[[04_Manuscript/chapters/arc-3/ch26/ch26-chapter]]", "[[04_Manuscript/chapters/arc-3/ch26/ch26-plan]]", "[[gae-buidhe-bi-pha]]", "[[do-tham-saber-lancer-kho-cang]]", "[[saber-lancer-dau-lan-hai]]", "[[giac-mo-dazai-chi-la-ky-uc-cua-tsuna]]", "[[dazai-mo-mot-buoi-sang-o-vongola]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 22/09/2026, tren ban nhap ch26 (1.947 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-22
---

# Soát chương 26 — 梦

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch26 --scene <4 thẻ>` | exit 1 · 1 · **0** · 1 — thẻ 03 exit 0 vì cố ý không cấm `dazai-mang-ky-uc-kiep-truoc`; không cái nào chứng minh sạch (`L29`). Grep tay 14 từ khoá, 0 hit |
| `vault_doctor --include-fiction --zone …/PPCT` | 274 note · **0 lỗi** · 1 cảnh báo cũ |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Tối ngày 7. 「你昨天在车上问我的」 = sáng ngày 6 (ch23) ✓; 「前天晚上，我是做了梦的」 = đêm ngày 5 (ch20 「今晚大概又要做梦了」) ✓; 「天还没亮的时候」 nghe Lancer = rạng sáng ngày 7 (ch25) ✓ |
| Ranh giới tri thức | ✅ Tổ Caster **nghe**, không **thấy** tay Saber (「我们没看见，不过用不着看见」). Giấc mơ là ký ức của Tsuna, xem **qua mắt Tsuna** (「我是从你的眼睛看出去的」) — khớp [[giac-mo-dazai-chi-la-ky-uc-cua-tsuna]]; không Byakuran, không nhẫn Mare, không kiếp trước của Dazai. 🔵 **#2** màn hình lâu đài |
| Trạng thái nhân vật | ✅ Dazai tự trả câu hỏi ch23, lý do lảng nửa đùa, không bi kịch hoá; Tsuna 「我猜对了，可是一点都高兴不起来」 |
| Luật thế giới | ✅ Không bổ ma (C6); không dị năng; lời hứa của Sola-Ui trích đúng ch25 |
| Quan hệ / xưng hô | ✅ 「纲吉」 · 「太宰」; Reborn gọi đúng tên (ch18 đã có 「那是Reborn」) |
| Canon | ✅ Reborn là 「穿西装的小婴儿」, cầm súng — canon KHR. 🟠 **#1** 「第一场两个从者都想要的决斗」 |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm` |

---

## #1 · 🟠 vừa · 「这还是第一场两个从者都想要的决斗」 — trận kho cảng cũng là hai bên cùng muốn

**Chương, dòng 127:** Dazai 「圣杯战争打到今天，这还是第一场两个从者都想要的决斗。」

**ch4 nguyên tác (qua ch24):** 「看起来是另一方从者主动散发气息挑衅……不愧是骑士职阶吗？」 — Lancer **tự** phát khí gọi Saber ra, Saber **nhận** → trận kho cảng đêm ngày 1 là trận hai bên cùng muốn ([[do-tham-saber-lancer-kho-cang]]).
**Timeline:** ngày 2 Saber–Lancer đấu lần hai (ngoài trang) — [[saber-lancer-dau-lan-hai]].

→ Câu nói chắc "trận đầu tiên" sai với chính những gì Dazai đã xem ở ch4. Cái **mới** của trận ngày 8 không phải là hai bên cùng muốn, mà là **cả hai đều lành lặn**.

**Hướng sửa:** 「圣杯战争打到今天，这还是第一场两个人都等着对方完好无缺才动手的决斗。」 — giữ ý, đúng sự thật.

## #2 · 🔵 thấp · Có màn hình lâu đài mà 「我们没看见」

**Chương, dòng 49:** 「所以骑士王的左手也好了……我们没看见，不过用不着看见。」 · **dòng 115:** dãy màn hình 「城堡，港口，西郊那间仓库」.

**ch22:** 「爱因兹贝伦的城堡还是老样子」 — tổ Caster **có** một màn hình nhìn về lâu đài; nguyên văn không nói nó nhìn **ngoài** hay **trong** (ch3 chỉ nói bọ giám sát Einzbern không phát hiện).

Không mâu thuẫn: nếu con bọ ở lâu đài chỉ nhìn bên ngoài, câu 「没看见」 đứng được. Nhưng người đọc có thể hỏi. Có thể thêm nửa câu: 「城堡那边只看得见大门」 — hoặc giữ, và ghi vào [[fact-cong-nghe-vongola-trong-chien-tranh]] rằng góc nhìn lâu đài chưa xác định.

---

# check-style — Mode 1

Đo bằng `han_metrics.py` (scratchpad, đã kiểm trên ch22 — `L45`).

## Bảng chỉ tiêu

| Chỉ số | Chỉ tiêu (đời thường) | Đo được | |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.250) | **1.947** | ✅ — 🔵 **S2** |
| Thoại | 45–65 % | **57,9 %** | ✅ |
| Chữ Hán/đoạn TB | 35–55 | 37,4 | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 0 % | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 3,2 % | ✅ |
| Câu trung vị | 17–20 | 19 | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 2,57 | ✅ |
| Đoạn có thoại | 63,6–76,9 % *(dải chung)* | **84,6 %** | 🔵 **S3** — trên dải; tiền lệ ch20 (81,5 %) |
| Đoạn thoại trơ | 9,1–23,3 % | 21,2 % | ✅ |
| `？` · `！` · `……` · `——` | ≥4 · ≥1 · 0,5–3,5 · ≤2,5 | 7,70 · 1,54 · 2,05 · 2,05 | ✅ |
| Thuật ngữ | ≥ 10 lần (không sàn mật độ) | **14 lần** (7,19/1000) | ✅ |
| Motif mắt | ≥ 1 | 5 | ✅ |
| Lượt thoại tối thiểu | 8 · 7 · 10 · 5 | 12 · 8 · 16 · 7 | ✅ |
| Thuật ngữ mục tiêu | 6 · 0 · 1 · 3 | 9 · 0 · 1 · 4 | ✅ |

## Luật cứng

| Luật | |
|---|---|
| §1 thoại trong `“”`, không `「」` | ✅ 0 · 44/44 |
| §2 không kaomoji | ✅ |
| §3 không ngôi một ngoài ngoặc kép | ✅ 0 |
| §4 trích Dazai Osamu có 注 | ✅ không trích |
| §5 tiêu đề `【太纲无差】反派战争26` + dòng đồng nhân | ✅ |
| §6 phân biệt thực thể cùng tên | ✅ |

## Nhận xét về giọng

- **S1 · ✅ · quy trình.** Bản đầu **đạt mọi chỉ tiêu ngay lượt đầu** — lần đầu trong năm chương (ch22 38,5 % · ch23 27,6 % · ch24 33,9 % thoại; ch25 thuật ngữ 4,27). Hai quy định thẻ cảnh (lượt thoại + thuật ngữ mục tiêu) đã chặn được cả hai kiểu hụt. Một chương là chưa đủ để kết luận; theo dõi thêm ở ch27 (chế độ dệt canon — khó hơn).
- **S2 · 🔵** — 1.947 chữ, dưới dự kiến ~2.250 khoảng 13 %, trên sàn 1.500. Cảnh 02 (bữa tối) ngắn nhất so với ngân sách. Không nhồi — chỉ báo số.
- **S3 · 🔵** — Đoạn có thoại 84,6 %, trên dải chung của nguyên tác. Nguyên tác ch1 (Mori–Dazai) và ch11 (mua sắm) là chương nặng thoại nhất; tiền lệ viết tiếp ch20 81,5 %. Hợp với chương nhà; chỉ báo số.
- ✅ 「像」 2,05/1000 — thấp nhất ch22–26. 「不是…是」 0 lần. Không câu tổng kết cảm xúc cuối đoạn — đoạn 113 (「结果还有一个人替他记着」) gần sát ranh giới đó nhưng là hành vi + suy nghĩ của Tsuna, không phải bình luận của người kể. Mình không xếp thành phát hiện.

## Chỗ mình không chắc

- 「你每次说要帮忙，最后都是站在旁边偷吃」 (dòng 67) — khái quát một thói quen chưa từng lên trang. Vô hại, không phải sự kiện.
- 「有人半夜偷偷给我塞了一个饭团」 (dòng 101) — chi tiết ký ức tự dựng, không tên người; đúng thẻ cảnh 03 (không nêu tên để không va canon KHR).
- 「那个小婴儿的枪里其实没有子弹」 — Dazai nói như thể biết, nhưng ngay sau là "muốn nói mà không nói được" và Tsuna bác lại 「有子弹的」. Đọc là đùa; không phải rò thông tin.

## Còn treo sang `finalize-chapter`

- Aurel quyết #1 (khuyên sửa), #2 (tuỳ).
- `finalize-chapter`: [[hook-dazai-mo-tiep-kiep-truoc]] đẩy (giữ `partially_paid`); trạng thái Dazai, Tsuna; timeline tối ngày 7; có thể một event note.
- **Ghi cho ch27:** tổ Caster sẽ **có mặt** (「明天晚上，我们去现场看」); Dazai **đã nghe** lời hứa của Sola-Ui.

---

# Kết quả sửa — `write-chapter` Mode 3, 22/09/2026

Aurel: "Mode 3 theo đề xuất".

| Mục | Đã sửa |
|---|---|
| #1 | 「这还是第一场两个从者都想要的决斗」 → 「这还是第一场两个人都等着对方完好无缺才动手的决斗」 |
| #2 | thêm 「城堡那边的虫子只看得见大门」 trước 「我们没看见」 — **đặt ra một dữ kiện mới** về góc nhìn con bọ ở lâu đài → ghi vào [[fact-cong-nghe-vongola-trong-chien-tranh]] ở `finalize-chapter` |

## Số đo sau Mode 3

| Chỉ số | Chỉ tiêu | Trước | Sau | |
|---|---|---|---|---|
| Chữ Hán | ≥ 1.500 | 1.947 | **1.968** | ✅ |
| Thoại | 45–65 % | 57,9 % | **58,3 %** | ✅ |
| Câu trung vị | 17–20 | 19 | **20** | ✅ trần |
| Thuật ngữ | ≥ 10 lần | 14 | **13** | ✅ — #1 bỏ một 从者; cảnh 04 còn 3 (mục tiêu ≥ 3) |
| Ngoặc mở/đóng | cân | 44/44 | 44/44 | ✅ |

