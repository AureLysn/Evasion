---
id: review.PPCT.ch29-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-4-ba-dao-lenh-chu
chapter: 29
canon_layer: user_canon
status: active
aliases: ["review ch29 PPCT", "soat ch29", "check-continuity ch29", "check-style ch29"]
related: ["[[04_Manuscript/chapters/arc-4/ch29/ch29-chapter]]", "[[04_Manuscript/chapters/arc-4/ch29/ch29-plan]]", "[[Command-Spells]]", "[[kirei-van-la-master]]", "[[kirei]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 22/09/2026, tren ban nhap ch29 (2.000 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-22
---

# Soát chương 29 — 交换

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` | không chạy được với chữ Hán (`L29`); grep tay ghi ở `ch29/metadata.yaml`: 0 hit trong thân truyện |
| `style_metrics.py` | không chạy — không đọc được chữ Hán (`L26`); đo bằng `han_metrics.py` |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo cũ |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Chiều → chạng vạng ngày 9, sau hai cảnh sáng ngày 9 của ch28. 「昨天晚上西郊那间仓库」 = đêm ngày 8 ✓ |
| Ranh giới tri thức | 🟠 **#1** Kirei biết người tới nhà kho **tìm lệnh chú**. ✅ Sola-Ui nghi **nhà thờ** muốn gì (「他答应得太快了」), **không** nghi Kirei còn là Master. ✅ Cô không thấy lệnh chú hiện ở đâu — Kirei kéo tay áo **của mình** (C4) |
| Trạng thái nhân vật | ✅ Kayneth tay nẹp, ngủ lúc trao, tỉnh trên xe, nói **một** câu vọng ch21 không lặp nguyên văn. ✅ Sola-Ui giữ lời hứa với Lancer (ch25/27) tới cuối — 「她到最后也没有用过一道」 |
| Luật thế giới | ✅ Chuyển lệnh chú đúng [[Command-Spells]] luật 4: tự nguyện (「需要您自己愿意才行」), cảm giác tay bị giật đứt, ngón tay trong suốt, không vết thương. ✅ "Nhà thờ giữ lệnh chú thừa" — luật 3. 🟠 **#2** một câu chạm luật 1 |
| Quan hệ / xưng hô | ✅ Kirei 「索拉乌小姐」 · 「您」; Sola-Ui gọi 「神父」 |
| Canon | ✅ Risei giám sát hai cuộc chiến (「两届」 — Baidu, thẻ cảnh ch28-01). ✅ Sola-Ui lớn lên ở Tháp Đồng Hồ — con gái Lord khoa Giáng Linh (萌娘百科). 🔵 **#3** Risei 「今天身体不太好」 |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm` |

---

## #1 · 🟠 vừa · Kirei biết người tới nhà kho là **vì lệnh chú**

**Chương, dòng 61:** Kirei 「昨天晚上西郊那间仓库，好像就有人去找过它们。」

**ch27:** Kiritsugu nói với Sola-Ui 「你手里有三道令咒，一道就够让他停下来，不是吗？」 **trong nhà kho, không ai khác nghe** ngoài Kayneth và con bọ của tổ Caster (đã nổ). Assassin bị diệt ở ch17 — assassin-tap-kich-vuong-yen; chưa chương nào cho Kirei một nguồn tin khác.

→ Nhà thờ biết **có vụ nổ** thì hợp (canon: giám sát viên lo che giấu sự cố), nhưng biết **người tới tìm gì** là thông tin Kirei không có đường nào lấy. Người đọc nhạy sẽ hỏi hắn nghe từ đâu — và câu trả lời duy nhất là "hắn còn tai mắt", tức gần lộ [[kirei-van-la-master]] **qua lời hắn**, không qua cái nhìn.

**Hướng sửa:** Kirei chỉ nói phần nhà thờ có thể biết, để Sola-Ui tự nối: 「昨天晚上西郊那间仓库出了点事，教会已经派人去收拾过了。」 Dòng 63 đổi theo: 「她没有说那个人是为什么来的。他大概也猜得到。」 🟡 — hoặc bỏ dòng 63.

## #2 · 🟠 vừa · 「按理说就已经退出了这场战争，可是令咒还在」 — chạm luật "mất Servant thì mất lệnh chú"

**Chương, dòng 61:** Kirei 「御主一旦失去从者，按理说就已经退出了这场战争，可是令咒还在，就等于还有人会把您当成对手。」

**lenh-chu-con-sau-khi-servant-chet, Ràng buộc kéo theo:** 「Không nhân vật nào trên trang **giải thích** vì sao lệnh chú còn. Không nhân vật nào nói luật "mất Servant thì mất lệnh chú".」

→ Câu này không nói thẳng luật, nhưng cấu trúc 「按理说……可是令咒还在」 đặt lệnh chú còn lại như **một điều bất thường** — độc giả Fate sẽ đọc ra đúng chỗ lệch mà decision muốn để im.

**Hướng sửa:** giữ ý "còn lệnh chú thì vẫn bị coi là đối thủ", bỏ vế "lẽ ra": 「御主失去了从者，就不再是谁的对手了；可是手上还有令咒的人，别人不会这么想。」

## #3 · 🔵 thấp · Risei 「今天身体不太好」

**Chương, dòng 57.** Chi tiết mới về Risei, không có nguồn; plan C3 chỉ cần Risei **không lên trang**. Một lý do sức khoẻ sẽ thành fact mà arc sau phải giữ (Risei ốm? từ bao giờ?).

**Hướng sửa:** 「本来应该由家父来说，不过这种事，由我来说也是一样的。」

## #4 · 🔵 thấp · So sánh "trời có mưa không" lặp ch28

**Chương, dòng 69:** 「好像刚才说的只是明天会不会下雨」.
**ch28:** 「太宰治答得很快，就像在说今天会不会下雨」.

Hai chương liền, hai nhân vật khác nhau, cùng một phép so sánh.

**Hướng sửa:** 「好像刚才说的只是汤的咸淡。」 — dùng luôn đồ vật trong cảnh.

## #5 · 🔵 thấp · 「什么也没有」 5 lần, 「干干净净」 2 lần trong 8 dòng

**Dòng 69, 93, 97, 101, 121** 「什么也没有」; **dòng 121, 129** 「干干净净」. Ba lần tả mặt Kirei là có chủ đích (ch28 cũng vậy), nhưng hai lần tả **tay** và một lần 「一开始什么也没有」 làm cụm từ mất sức.

**Hướng sửa:** dòng 93 「一开始只是凉」; dòng 121 bỏ vế 「什么也没有」 (giữ 「干干净净的」); dòng 129 「现在它们不在了，这只手像是从来没有碰过圣杯战争。」

---

## Bảng chỉ tiêu

Đo bằng `han_metrics.py`. Chương dệt canon nhẹ, chỉ tiêu theo plan ch29.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | sàn 1.500 · plan ~2.200 | 2.000 | ✅ — hụt plan ~9 %; cảnh 01 (463) và 03 (371) ngắn hơn ước lượng 600 |
| Thoại | 30–45 % | **30,2 %** | ✅ **sát sàn** — có chấp nhận không? |
| Chữ Hán/đoạn TB | 35–55 | 39,2 | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 3,9 % | ✅ |
| Câu trung vị | 17–20 | 18 | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 0 % | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 1,0 | ✅ |
| `？` | ≥ 4/1000 | 7,0 | ✅ |
| `！` | ≥ 1/1000 | 1,5 | ✅ |
| `……` | 0,5–3,5 | **0,5** | ✅ sát sàn — 1 lần |
| `——` | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ | ≥ 8/1000 | 12,5 | ✅ — 令咒 12/25: dùng thật (chương xoay quanh nó), không phải trùng chuỗi |
| Motif mắt | ≥ 1 | 4 | ✅ |
| Lượt thoại theo cảnh | 2 · 12 · 4 | 2 · 20 · 4 | ✅ |
| Thuật ngữ theo cảnh | 5 · 10 · 4 | 7 · 14 · 4 | ✅ |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 Thoại trong `“”`, không `「」` | ✅ |
| §2 Không kaomoji | ✅ |
| §3 Không 「我」 ngoài ngoặc kép | ✅ 0 |
| §4 Trích Dazai Osamu | — không có |
| §5 Tiêu đề 【太纲无差】反派战争29 | ✅ · dòng ※ ✓ |
| Tag trước ngoặc | ✅ grep 「”[^“]{0,4}说」 = 0 |

## Nhận xét về giọng

- **Dấu vết văn AI** ([[forbidden-patterns]]): không câu tổng kết cảm xúc cuối đoạn — 「答应过他的事，算是做到了」 (dòng 129) là ý nghĩ thẻ cảnh cho phép, và đoạn kết là hình ảnh. 「不是为了……也不是为了……是为了」 1 lần (dòng 37). Liệt kê ba vế 「没有伤口，没有血，连一道红印也没有」 (dòng 101) — một lần, gắn với chi tiết canon "không vết thương", chấp nhận được.
- **Chữ 「像」: 8 lần** (trong đó 5 là 「好像」) trong 2.000 chữ — ngang ch28 (7/2.247). Phần lớn ở cảnh chuyển lệnh chú, nơi cảm giác cần hình ảnh; ngoài #4 không có cái nào sai.
- Kirei **trống** đúng như ch28: câu ngắn, 「保管。」 · 「和其他的放在一起。」 — tốt nhất chương.

## Chỗ mình không chắc

- **「两届」** (dòng 81 mới): Sola-Ui không có lý do biết, nhưng Kirei nói ra — không phải lỗi POV. Canon ✓.
- **「机场」**: Fuyuki có sân bay trong canon (Irisviel và Saber đến bằng máy bay). Không kiểm lại.
- Lời tác giả 「没有断手」 — ngoài thân truyện; ám chỉ canon, không phải lỗi.

## Còn treo sang `finalize-chapter`

- Sola-Ui + Kayneth **rời Fuyuki**, sống; ba đạo lệnh chú về tay Kirei (người đọc biết, Sola-Ui tin là "nhà thờ").
- [[kirei-van-la-master]]: người đọc tiến thêm; `known_by` không đổi.
- Event mới 🟡: Sola-Ui trao lệnh chú.

## Số đo sau Mode 3

Aurel duyệt sửa #1–#5 theo hướng đề xuất, 22/09/2026. #1 thêm một câu ý nghĩ của Sola-Ui (dòng 63): 「……至于那个人要的是什么，他大概也猜得到。」 — **cô** đoán Kirei đoán được, Kirei **không** nói.

| | Trước | Sau |
|---|---|---|
| Chữ Hán | 2.000 | 1.997 |
| Thoại | 30,2 % | 30,4 % |
| `？` /1000 | 7,0 | 6,51 |
| Thuật ngữ /1000 | 12,5 | 12,52 |
| 「什么也没有」 · 「干干净净」 | 5 · 2 | 3 · 1 |
| Tag sau ngoặc | 0 | 0 |

Grep lại: 按理说 · 身体不太好 · 下雨 · 去找过 = 0.

