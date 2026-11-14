---
id: review.PPCT.ch24-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-3-hai-cay-thuong
chapter: 24
canon_layer: user_canon
status: active
aliases: ["review ch24 PPCT", "soat ch24", "check-continuity ch24", "check-style ch24"]
related: ["[[04_Manuscript/chapters/arc-3/ch24/ch24-chapter]]", "[[04_Manuscript/chapters/arc-3/ch24/ch24-plan]]", "[[sola-ui-gianh-lenh-chu]]", "[[kayneth-tap-kich-lau-dai-einzbern]]", "[[quy-uoc-to-lancer]]", "[[fact-cong-nghe-vongola-trong-chien-tranh]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 22/09/2026, tren ban nhap ch24 (2.315 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-22
---

# Soát chương 24 — 令咒

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch24 --scene <4 thẻ>` | exit **1** cả 4 thẻ — không khớp được chữ Hán (`L29`); đã grep tay **23 từ khoá**, 0 hit — danh sách ở `ch24/metadata.yaml` |
| `vault_doctor --include-fiction --zone …/PPCT` | 258 note · **0 lỗi** · 1 cảnh báo cũ (`branches/aurel-main.md`) |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Tối ngày 6, nối đúng câu cuối ch23 (khăn, mưa); đêm ngày 5 khớp lời hứa ch20. 🟠 **#1**: 「前天晚上」 dựa vào một cảnh chưa từng lên trang |
| Ranh giới tri thức | ✅ Không ai nói chắc Lancer sẽ phá thương; câu ch21 「那样赢下来」 **không** bị trích lại; Tsuna chỉ đoán, Dazai không xác nhận (C4). 🔵 **#2**: Dazai nói chắc con số 「三道令咒」 |
| Trạng thái nhân vật | ✅ Dazai chuyển mối lo sang lệnh chú (C3); nhắc đêm ngày 5 không ai tự trách (C5) |
| Luật thế giới | ✅ Bọ giám sát **truyền tiếng**, khớp nguyên văn ch3 「传声」; máy chỉ phát trực tiếp (「今天没人看它，它倒是一直在听」). Không thêm thiết bị mới — Lancer vào góc hình của con bọ trên xà |
| Quan hệ / xưng hô | ✅ 「纲吉」 · 「太宰」 · lời kể 「太宰治」; Lancer gọi 「索拉乌小姐」 đúng ch21 |
| Canon | ✅ Gáe Buidhe ngắn hơn, màu vàng, gây vết thương không lành — [[Diarmuid-Ua-Duibhne]]; câu ch4 nguyên tác 「不愧是骑士职阶吗」 dùng đúng. 🔵 **#3** |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm` |

---

## #1 · 🟠 vừa · 「前天晚上，肯尼斯还躺在那里」 — tổ Caster chưa bao giờ thấy cảnh đó

**Chương, dòng 77:** 「前天晚上，肯尼斯还躺在那里，Lancer还站在他那边。中间只隔了一个晚上。」

**ch19, câu cuối cảnh màn hình:** 「太宰治伸出手，把屏幕一块一块地关掉了。」 — đêm ngày 4 kết thúc ở **lâu đài Einzbern**, khi Lancer bế Kayneth đi ([[kayneth-tap-kich-lau-dai-einzbern]]). Ngày 5 không ai mở màn hình (ch20). Sáng ngày 6 mới là lần đầu con bọ trong **nhà kho phía tây** lên trang (ch22 dòng 39).

→ Dazai đang nói như thể hắn đã thấy Kayneth nằm trong nhà kho với Lancer bên cạnh từ đêm ngày 4. Chưa có chương nào cho thấy điều đó; thậm chí **con bọ được đặt vào nhà kho lúc nào** cũng chưa lên trang.

Không mâu thuẫn một note cụ thể; mâu thuẫn **thứ tự những gì nhân vật đã thấy**.

**Hướng sửa:** dùng đúng cái họ đã thấy ở ch19 — 「前天晚上，Lancer是把肯尼斯从城堡里抱走的；今天早上，他站到了索拉乌那边。中间只隔了一个晚上。」 Một câu, không đổi beat.

## #2 · 🔵 thấp · Dazai nói chắc 「三道令咒」

**Chương, dòng 73:** 「那只手上原来有三道令咒」 · **dòng 129:** 「三道令咒，就是三次……」

**Note:** [[quy-uoc-to-lancer]] — Kayneth **chưa dùng đạo nào** là **quy ước PPCT**, người đọc biết qua ch21 (Sola-Ui giơ tay 「三道红色的纹路」). Tổ Caster **không** thấy cảnh ch21.

Dazai có thể suy ra hợp lý (mỗi Master bắt đầu với ba đạo; hắn chưa thấy Kayneth dùng đạo nào trên màn hình), nhưng chương để hắn nói như **đã biết**. Cùng kiểu với ch22 #2 (「六个御主」). Có thể thêm một vế rào: 「要是他一道都还没用过的话」.

## #3 · 🔵 thấp · 「听见御主出事」

**Chương, dòng 119:** Tsuna tả Lancer ở ch19 「听见御主出事，扔下Saber就回去了」.

ch19 chỉ cho thấy Lancer **bỏ trận** khi Master gặp nguy, không nói hắn biết bằng cách nào. 「听见」 gắn cho Lancer một cơ chế chưa có. Đổi 「察觉」 thì trung tính hơn. Rất nhỏ.

---

# check-style — Mode 1

Đo bằng `han_metrics.py` (scratchpad) — đã kiểm trên ch22 (`L45`); `style_metrics.py` không đọc chữ Hán (`L26`).

## Bảng chỉ tiêu

| Chỉ số | Chỉ tiêu (đời thường + dệt canon) | Đo được | |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.300) | **2.315** | ✅ |
| Thoại | 40–55 % | **40,0 %** (926/2.315) | ✅ **đúng sàn** — 🔵 **S1** |
| Chữ Hán/đoạn TB | 35–55 | 37,3 | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 4,8 % | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 4,9 % | ✅ |
| Câu trung vị | 17–20 | 18 | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 1,73 | ✅ |
| Đoạn có thoại | 63,6–76,9 % | 64,5 % | ✅ sát sàn |
| Đoạn thoại trơ | 9,1–23,3 % | 11,3 % | ✅ |
| `？` | ≥ 4/1000 | 4,32 | ✅ sát sàn |
| `！` | ≥ 1/1000 | 1,30 | ✅ |
| `……` | 0,5–3,5/1000 | 1,73 | ✅ |
| `——` | ≤ 2,5/1000 | 1,30 | ✅ |
| Mật độ thuật ngữ | ≥ 5/1000 | **7,78** | ✅ — 令咒 8 · 御主 3 · 从者 2 · 直觉 2 · 圣杯 1 · 宝具 1 · 职阶 1; 令咒 gánh một nửa nhưng là chủ đề chương, không phải va chạm chuỗi con |
| Motif mắt | ≥ 1 | 4 | ✅ |

## Luật cứng

| Luật | |
|---|---|
| §1 thoại trong `“”`, không `「」` | ✅ 0 · ngoặc mở/đóng 38/38 |
| §2 không kaomoji | ✅ |
| §3 không ngôi một ngoài ngoặc kép | ✅ 0 |
| §4 trích Dazai Osamu có 注 | ✅ không trích |
| §5 tiêu đề `【太纲无差】反派战争24` + dòng đồng nhân | ✅ |
| §6 phân biệt thực thể cùng tên | ✅ |

## Nhận xét về giọng

- **S1 · 🔵 · chỉ tiêu + xu hướng quy trình.** Thoại đứng **đúng** sàn 40,0 %. Không sai. Nhưng đây là **chương thứ ba liền** mà bản đầu hụt thoại rồi phải kéo lên: ch22 38,5 % → 40,6 · ch23 **27,6 %** → 45,2 · ch24 **33,9 %** → 40,0. Theo trigger của skill *"same violation type recurs across chapters → the constraint is not reaching the writer; fix the plan template, not the prose"* — lời nhắc trong plan (「đặt thoại vào ngay từ bản đầu」) **không đủ**. Đề xuất cho plan từ ch25: ghi **số lượt thoại tối thiểu** cho từng cảnh trong thẻ cảnh, không chỉ tỉ lệ %. Việc này là của Aurel quyết — mình không sửa template.
- **S2 · 🔵** — 「像」 3,46/1000, ngang ch22 (3,89) và ch23 (3,5). Không trôi. Chỉ báo số.
- ✅ Dấu vết văn AI: không câu tổng kết cảm xúc cuối đoạn; 「不是…是」 1 lần (dòng 67); không liệt kê ba vế đều trong lời kể; không tính từ cảm xúc thay hành vi.

## Chỗ mình không chắc

- **#1** mình tin chắc — lỗi do chính bản nháp, không phải plan. Plan beat 3 chỉ nói "đêm ngày 5".
- 「最后那一局我差一点就赢了」 (dòng 83) — ch20 chỉ ghi Tsuna thua ba ván, không nói ván cuối sát nút. Câu thoại của Tsuna, tự trào, không phải sự kiện; mình không xếp thành phát hiện.
- Kayneth quấn băng **một** bàn tay, không nói trái/phải — đúng ý, vì ch21 không nói Kayneth mang lệnh chú ở tay nào.

## Còn treo sang `finalize-chapter`

- Aurel quyết #1 (khuyên sửa), #2, #3 (tuỳ).
- S1 — có đổi cách ghi thẻ cảnh từ ch25 không.
- `finalize-chapter`: `hook-to-caster-khac-che-to-saber` đẩy mạnh (giữ `partially_paid`), `hook-he-qua-thay-to-caster` đẩy; timeline tối ngày 6; trạng thái Dazai, Tsuna.

---

# Kết quả sửa — `write-chapter` Mode 3, 22/09/2026

Aurel gọi Mode 3 không chỉ định từng mục → làm đúng đề xuất trong review (tiền lệ ch22, ch23).

| Mục | Đã sửa |
|---|---|
| #1 | 「前天晚上，肯尼斯还躺在那里，Lancer还站在他那边。」 → 「前天晚上，Lancer是把肯尼斯从城堡里抱走的；今天早上，他站到了索拉乌那边。」 — đúng cái tổ Caster đã thấy ở ch19 |
| #2 | 「那只手上原来有三道令咒」 → 「那只手上原来有令咒——要是他一道都还没用过的话，就是三道——」 |
| #3 | 「听见御主出事」 → 「察觉到御主出事」 |
| S1 | **không** đụng văn xuôi — là quyết định quy trình, vẫn chờ Aurel |

## Số đo sau Mode 3

| Chỉ số | Chỉ tiêu | Trước | Sau | |
|---|---|---|---|---|
| Chữ Hán | ≥ 1.500 | 2.315 | **2.341** | ✅ |
| Thoại | 40–55 % | 40,0 % | **40,7 %** | ✅ |
| Chữ Hán/đoạn TB | 35–55 | 37,3 | 37,8 | ✅ |
| Câu trung vị | 17–20 | 18 | 18 | ✅ |
| `——` | ≤ 2,5/1000 | 1,30 | **2,14** | ✅ — cặp `——` mới ở #2 |
| Grep tay từ khoá bí mật | 0 | 0 | **0** | ✅ |
