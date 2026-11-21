---
id: review.PPCT.ch34-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-5-ke-san-va-con-moi
chapter: 34
canon_layer: user_canon
status: active
aliases: ["review ch34 PPCT", "soat ch34", "check-continuity ch34", "check-style ch34", "toi gan review"]
related: ["[[04_Manuscript/chapters/arc-5/ch34/ch34-chapter]]", "[[04_Manuscript/chapters/arc-5/ch34/ch34-plan]]", "[[fact-cong-nghe-vongola-trong-chien-tranh]]", "[[hook-to-caster-khac-che-to-saber]]", "[[kirei-van-la-master]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 24/09/2026, tren ban nhap ch34 (1.791 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-24
---

# Soát chương 34 — Tới gần

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát cũng là người viết bản nháp, trong cùng một phiên.** Muốn một lượt độc lập thì dùng agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --json` ×3 cảnh | findings **0** · exit 1 ở cả ba cảnh, chỉ vì [[dazai-mang-ky-uc-kiep-truoc]] không có `leak_terms` chữ Hán → đã grep tay 上辈子 · 前世 · 白兰 · 梦 · 戒指 · 指环 · 书里 = 0 |
| grep tay | 索拉乌 · Archer · 时臣 · 绮礼 · 舞弥 · 结界 · 不靠魔 · 没有魔力 · 挑不出 · 像在念一张 = **0** |
| `style_metrics.py --write` | exit 1 vì thuật ngữ < 9 (sàn cho chương dệt canon, bỏ qua; plan ≥ 4). `metadata.yaml` đã viết lại theo mẫu ch33 |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo có từ trước |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ 「第十二天下午。」 nối trưa ngày 12 ở ch33 (bát trưa, ấm nước nguội) → tối → 「夜里十一点多」. 「你前几天还说」 → ch30 là ngày 10, khớp. 「要不要像上次那样，让它炸掉？」 → lần tự nổ gần nhất là ch27, khớp |
| Ranh giới tri thức | ✅ Tổ Caster giữ mức L2, không nhắc Archer hay 时臣. ✅ Nhà thờ chỉ có một ý, và Dazai nói rõ là đoán: 「我猜，那位御主从一开始就在盯着那个地方」. ✅ Không có Sola-Ui. ✅ Maiya không có tên |
| Trạng thái nhân vật | 🔵 **#2** 「最后一只还能飞的机械蜻蜓」. ✅ Tsuna sửa chuồn chuồn, cánh trái được thay (ch20: 「左边的翅膀歪着」) |
| Luật thế giới | 🟠 **#1** 「我们看得见城堡的大门」 ngay sau khi con bọ cổng đã bị gỡ. ✅ Không có câu "không dùng ma lực". 📌 Cơ chế mới (plan C3): 「虫子每往回传一次画面，都要往外发一次信号」 — ghi vào fact note khi `finalize` |
| Quan hệ / xưng hô | ✅ 「太宰」 / 「纲吉」 ([[dazai--tsuna]]). Dazai gọi Kiritsugu 「那位御主」, 「他们家那位御主」 |
| Canon | ✅ Kiritsugu dùng súng bắn tỉa đêm đầu, bị chuồn chuồn chặn (ch5). Việc dò sóng hợp với lối Kiritsugu canon dùng công nghệ hiện đại. ✅ 「第一天晚上就想在码头开枪」 khớp dùng chữ ở ch33 (#6 của ch33 đã tách "đêm đầu ở bến cảng") |
| Hợp đồng nhánh | ✅ Không chạm mục `forbid` |

**Hook:** [[hook-to-caster-khac-che-to-saber]] được đẩy. Con mồi mời kẻ săn tới, câu nói là 「两次拦住他的到底是谁」 ✓. Không chạm các hook plan cấm ✓.

---

## #1 · 🟠 trung bình · 「我们看得见城堡的大门」 — lúc này đã không còn thấy

**Chương, dòng 105:** 「我们看得见城堡的大门，看得见港口，以前还看得见西郊的仓库。」

**Chính chương này, dòng 57–59:** 「那块屏幕就黑了。没有爆炸，也没有烟，只是黑了。」 Cảnh 03 còn khép bằng 「城堡大门那一块是黑的」.

→ Dazai nói câu này vào buổi tối, vài giờ sau khi con bọ cổng đã bị gỡ. Câu tự mâu thuẫn trong cùng một chương, và làm mờ chính điều chương muốn nói: tổ Caster **vừa mất** con mắt cuối cùng ở phía Saber.

**Đề xuất:** 「我们看得见港口。今天下午以前，还看得见城堡的大门；再往前，还有西郊的仓库。」 Câu mới giữ đủ ý, bỏ lỗi, và đổi luôn nhịp liệt kê ba vế song song (xem #4).

## #2 · 🔵 thấp · 「最后一只还能飞的机械蜻蜓」

**Chương, dòng 115:** 「纲吉把最后一只还能飞的机械蜻蜓从抽屉里拿了出来。」 Dòng 111, Dazai hỏi: 「纲吉，还有能飞的蜻蜓吗？」

**ch20 dòng 41:** 「他把昨晚收回来的四只蜻蜓在桌边排好……除了翅膀歪掉的那只，其余都还能飞。」 **ch33:** sáng ngày 12, một con chuồn chuồn vừa bay tới 远坂宅 rồi về lành lặn (「一次也没有撞到电线」).

→ Không chương nào nói ba con còn lại đã hỏng. "Con cuối cùng còn bay được" là một khẳng định không có nguồn. Con chuồn chuồn cánh trái mới thay thì khớp đúng con hỏng cánh ở ch20; phần sai chỉ là chữ 「最后」.

**Đề xuất:** 「纲吉从抽屉里拿出一只机械蜻蜓。它左边的翅膀是前几天新换的……」. Câu hỏi của Dazai giữ nguyên, vì nó chỉ là một câu hỏi.

---

# Văn phong (check-style Mode 1)

Số đo lấy từ `han_metrics.py`; chỉ tiêu theo [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]].

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.100) | **1.791** | ✅ đạt sàn · 🟡 **#5** dưới dự kiến plan 309 chữ |
| Thoại | 35–55 % | 41,4 % | ✅ |
| Chữ/đoạn TB | 35–55 | **33,2** | 🟡 **#5** |
| Đoạn ≥ 100 chữ | ≤ 8 % | 3,7 % | ✅ |
| Câu trung vị | 17–20 | **16,5** | 🟡 **#5** |
| Câu ≥ 50 chữ | ≤ 12 % | 3,1 % | ✅ có câu dài (ch33 không có câu nào) |
| Câu ≤ 4 chữ /1000 | ≤ 5,5 | 0,56 | ✅ |
| `？` · `！` · `……` · `——` /1000 | ≥ 4 · ≥ 1 · 0,5–3,5 · ≤ 2,5 | 8,38 · 1,12 · 1,68 · 0 | ✅ |
| Thuật ngữ /1000 | ≥ 4 (plan) | 4,47 | ✅ · 御主 gánh 4/8, là cách Dazai gọi Kiritsugu (dùng thật, không phải trùng chuỗi) |
| Motif mắt | ≥ 1 | 3 | ✅ |
| Thoại theo cảnh | 40 · 55 · 30 % | 34 · 62 · 27 % | ✅ gần thẻ; cả chương trong dải |
| Lượt thoại theo cảnh | ≥ 8 · 10 · 5 | 17 · 21 · 9 | ✅ |
| Thuật ngữ theo cảnh | ≥ 3 · 3 · 2 | 3 · 4 · **1** | 🟡 **#5** cảnh 03 thiếu 1 |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 `“”`, không `「」` | ✅ |
| §2 Kaomoji | ✅ 0 |
| §3 「我」 ngoài ngoặc | ✅ 0 |
| §5 Tiêu đề | ✅ `【太纲无差】反派战争34` + dòng ※ |
| §6 Thực thể cùng tên | ✅ |
| Tag sau ngoặc (grep theo dòng) | ✅ 0 |

## #3 · 🔵 thấp · Tsuna giải thích cơ chế dò sóng hơi dài

**Chương, dòng 51:** 「虫子每往回传一次画面，都要往外发一次信号，离得够近的话，用那个就能听见。」

**Plan C3:** 「**Cho phép, ở mức tả** … **không** giải thích tần số, tầm, mã hoá」.

→ Câu không vượt C3: không có tần số, tầm hay mã hoá. Nhưng đây là một câu giải thích kỹ thuật trọn vẹn nằm trong thoại, và giọng hơi giống lời thuyết minh. **Mình không chắc** đây là lỗi. Tsuna là người sửa chuồn chuồn, nên câu này vẫn có lý do.

**Đề xuất:** giữ nguyên. Hoặc rút còn 「虫子往回传画面的时候，离得够近，用那个就听得见。」

## #4 · 🔵 thấp · ba chuỗi liệt kê ba vế trong cảnh 02

**Dòng 79:** 「把外面的虫子都收回来，机器关掉，东西搬走」
**Dòng 85:** 「用他的办法，在他挑的时间，找到他想找的地方」
**Dòng 105:** 「我们看得见城堡的大门，看得见港口，以前还看得见西郊的仓库」

→ Ba chuỗi ba vế song song trong cùng một cảnh làm nhịp phẳng (mẫu cần tránh #3). Chuỗi ở dòng 79 là lời Tsuna liệt kê việc cần làm, tự nhiên. Chuỗi ở dòng 85 là giọng Dazai. Chuỗi ở dòng 105 trùng với #1.

**Đề xuất:** sửa #1 là chuỗi thứ ba tự mất. Hai chuỗi còn lại giữ.

## #5 · 🟡 chỉ tiêu · 1.791 chữ (dự kiến 2.100) · đoạn TB 33,2 · câu trung vị 16,5 · thuật ngữ cảnh 03 = 1

- Độ dài đạt sàn 1.500. Mức 2.100 là dự kiến của plan. Cảnh 02 ngắn hơn thẻ 129 chữ vì cuộc tranh luận kết thúc nhanh; Tsuna đồng ý đúng như C6 ("không cãi dài").
- Đoạn TB và câu trung vị thấp là do cảnh 02 có nhiều lượt thoại ngắn (21 lượt).
- Thuật ngữ cảnh 03: không có chỗ tự nhiên để thêm một chữ.

→ Muốn đạt các số này thì phải nhét thêm chữ. **Hỏi Aurel:** có chấp nhận cho chương này không?

---

## Tổng hợp

| # | Mức | Nhóm | Tóm tắt | Đề xuất |
|---|---|---|---|---|
| 1 | 🟠 | Luật thế giới | 「我们看得见城堡的大门」 sau khi bọ cổng đã bị gỡ | 「……今天下午以前，还看得见城堡的大门；再往前，还有西郊的仓库。」 |
| 2 | 🔵 | Trạng thái | 「最后一只还能飞的」 không có nguồn (ch20: ba con còn bay được) | bỏ 「最后……还能飞的」 |
| 3 | 🔵 | Văn phong | câu giải thích dò sóng hơi thuyết minh | giữ, hoặc rút ngắn |
| 4 | 🔵 | Văn phong | ba chuỗi ba vế trong cảnh 02 | sửa #1 là đủ |
| 5 | 🟡 | Chỉ tiêu | 1.791 chữ · đoạn 33,2 · câu 16,5 · thuật ngữ cảnh 03 = 1 | hỏi chấp nhận |

Không có lỗi 🔴. Không có lỗi luật cứng.

## Để `finalize-chapter` biết (không phải lỗi)

- **Chi tiết mới cho [[fact-cong-nghe-vongola-trong-chien-tranh]]** (plan C3): con bọ phát tín hiệu khi truyền hình về, và máy dò sóng ở gần là nghe được. Người phụ nữ bên Kiritsugu đã dùng cách này để gỡ con bọ cổng lâu đài **còn nguyên** vào chiều ngày 12. Tổ Caster **mất mắt** ở cổng lâu đài.
- Lời hẹn: trưa ngày 13, một quán ăn gia đình trước nhà ga, 「饮料我请」, không ký tên.
- Tsuna nhắc tới xưởng của Spanner: 「斯帕纳的工作室里就有好几个」.

---

## Mode 3 — đã sửa (Aurel 24/09/2026: "sửa theo đề xuất, chấp nhận số đo #5")

| # | Trước | Sau |
|---|---|---|
| 1 + 4 | 「我们看得见城堡的大门，看得见港口，以前还看得见西郊的仓库。」 | 「我们看得见港口。今天下午以前，还看得见城堡的大门；再往前，还有西郊的仓库。」 |
| 2 | 「纲吉把最后一只还能飞的机械蜻蜓从抽屉里拿了出来。」 | 「纲吉从抽屉里拿出一只机械蜻蜓。」 |
| 3 | — | **giữ nguyên** (đề xuất là giữ) |
| 5 | 1.791 chữ · đoạn TB 33,2 · câu trung vị 16,5 · thuật ngữ cảnh 03 = 1 | **Aurel chấp nhận** cho chương này |

**Đo lại:** 1.791 → **1.788** chữ Hán · thoại 41,8 % · đoạn TB 33,1 · câu trung vị **17** (vừa chạm sàn nhờ #1 tách câu) · `？` 8,39 · `！` 1,12 · `……` 1,68 · thuật ngữ 4,47/1000.

**Kiểm lại:** `pov_leak_check` ×3 → findings 0 · tag sau ngoặc 0 · grep 最后一只 (trừ câu xếp bát 「放完最后一只」) · 我们看得见城堡 · 索拉乌 · Archer · 时臣 · 绮礼 · 舞弥 · 结界 · 没有魔力 · 上辈子 · 白兰 = 0.
