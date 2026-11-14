---
id: review.PPCT.ch16-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-1-vuong-yen-ha-man
chapter: 16
canon_layer: user_canon
status: final
aliases: ["review ch16 PPCT", "kiem tra lien tuc ch16", "kiem tra van phong ch16"]
related: ["[[04_Manuscript/chapters/arc-1/ch16/ch16-chapter|ch16]]", "[[04_Manuscript/chapters/arc-1/ch16/ch16-plan|plan ch16]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/06_Alternate_Versions/branches/aurel-main|aurel-main]]"]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-14
---

# Review — PPCT ch16 (bản nháp tiếng Trung)

> Chỉ báo lỗi, **không sửa chương**. Sửa hay giữ là Aurel quyết. "Dòng" = số dòng trong `ch16-chapter.md` **bản trước khi sửa 14/09** (tính cả frontmatter); sau lượt sửa, các dòng từ 119 trở đi lùi xuống 4.

## Continuity Review — 14/09/2026

**Kiểm máy:** `pov_leak_check.py --json` cho 4 thẻ cảnh → `findings: []`, exit 0. ⚠️ Không đủ tin với chữ Hán —  L29. Đã grep tay các từ Hán của bí mật cấm (白兰 · 马雷 · Assassin · 暗杀者 · 切嗣 · 卫宫 · 前世 · 上辈子 · 家族 · 家人 · 愿望 · 不是人 · 宝物 · 言峰): 0 lần.

**Đối chiếu:** nguyên văn ch12–15 (`sources/`), [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master|master]], `secrets/` (4), note nhân vật (mục trạng thái), `relationships/` (addressing), [[Artoria-Pendragon]], [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/06_Alternate_Versions/branches/aurel-main|aurel-main]], các decision 13/09.

| # | Loại | Mức | Vị trí | Chương viết | Nguồn nói | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | canon (bối cảnh) | **medium** | dòng 131 | 「桌上酒杯里的酒面甚至还在晃」 | ch12: 「选作宴会埸所的地方是城堡中庭的花园。」 · ch14: Archer 「盘起双腿坐在上座」. Chữ 「桌」 xuất hiện **0 lần** trong ch12–15 | ✅ **đã sửa 14/09** → 「Saber面前那只酒杯里的酒面甚至还在晃」 |
| 2 | character state | low | dòng 147 | Waver bật lên 「“而已？！”韦伯的声音都劈了」 | [[waver]] trạng thái: *"Ngồi ở Vương Yến, không muốn nghe tiếp."* · ch15: 「韦伯觉得这个王宴和自己格格不入，甚至现在连旁听都不太想了。」 — *Mình không chắc đây là lỗi:* cú sốc trước mặt đủ làm cậu bật ra, và Waver tsukkomi là ống kính quen của tác giả. Ghi lại vì trạng thái đổi mà chương không có một nhịp chuyển | ⏳ chờ Aurel |
| 3 | relationships (addressing) | low | dòng 153 | Archer gọi thẳng Tsuna 「Caster，你那个朋友，倒是舍得。」 | [[tsuna--gilgamesh]]: `gilgamesh_goi_tsuna: ["你", "这小子 (ch15)", "bao vat"]`. Nguyên văn ch15 Archer dùng "Caster" ở ngôi ba: 「连Caster都比你有做王的担当。」 — chưa có lần gọi thẳng | ⏳ chờ Aurel |
| 4 | relationships (addressing) | low | dòng 39 | Tsuna nói 「爱丽丝菲尔小姐」 | [[tsuna--artoria]]: `tsuna_goi_irisviel: ["爱莉斯菲尔小姐 (ch12)"]`. Nguyên tác tự không thống nhất: 爱丽丝菲尔 ×12 (ch15) · 爱莉斯菲尔 ×11 (ch12–14). Lời kể ch16 dùng 丽 — khớp ch15 | ⏳ chờ Aurel |
| 5 | canon | low | dòng 71 | Mordred nói 「“父王，请承认我。”」 | [[Artoria-Pendragon]]: có việc Mordred xưng dòng máu và bị khước từ; **không có câu thoại** và không có cách xưng 父王. Câu do bản nháp tự đặt | ⏳ chờ Aurel |
| 6 | knowledge boundary | low | dòng 89 | Saber: 「那封赦免书，是我亲手写的。」 Tsuna: 「“我知道。”」 | [[saber-chi-quan-sat-the-gioi-song-song]] không nói Tsuna **có thấy cùng** cảnh với Saber hay không. Nếu Tsuna chỉ dẫn tìm kiếm mà không xem cùng, cậu không có đường biết chuyện thư tha thứ. *Mình không chắc* — cả chương đang ngầm coi Tsuna xem cùng (dòng 57: Tsuna giải thích vì sao cô gái không rút kiếm) | ✅ **không phải lỗi** — Aurel 14/09: Tsuna xem cùng; đã thêm vào [[saber-chi-quan-sat-the-gioi-song-song]] |
| 7 | canon (trang phục) | low | dòng 131 | Irisviel 「指尖却还没碰到Saber的袖口」 | ch12: Saber 「让白银色的铠甲现形，罩在西装之外」 · ch13 vẫn nhắc giáp. Tay áo có thể bị giáp che. *Mình không chắc* — nguyên văn không tả giáp tay | ⏳ chờ Aurel |

### Không phải lỗi — đã kiểm và khớp

| Nhóm | Điểm | Căn cứ |
|---|---|---|
| Timeline | Đêm ngày 3, Vương Yến, 「月光」; 「不久之前…在酒宴上」 | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]] · ch12 「夜晚的爱因兹贝伦城堡」 |
| Knowledge boundary | Saber không biết tên "người bạn"; không ai nhắc cái chết của Tsuna, kiếp trước, Assassin, Kiritsugu | 4 secret · grep tay |
| Knowledge boundary | Archer biết có "người bạn" | ch15, Tsuna nói trước mặt mọi người |
| Decision | Chỉ quan sát; ngoài chỉ 2–3 giây; không nói nguyện vọng tổ Caster | [[saber-chi-quan-sat-the-gioi-song-song]] · [[nguyen-vong-to-caster-de-ngo]] |
| Character state | Nhẫn cánh bạc đá cam — tay trái; Dazai ngồi cạnh Tsuna; Rider cầm 杓 | ch15 「伸出左手…左手的食指」 · 「坐在他身旁的从者」 · ch13 「柄杓」 |
| Character | Mắt Archer đỏ, đồng tử dọc; mắt Tsuna 橙红 | ch6 「血红的竖瞳」 · ch15 「橙红的眼瞳」 |
| Canon | Merlin can trước khi rút kiếm · Kay nuôi như anh em · giả trai · Mordred cùng khuôn mặt, xin thừa nhận · thư tha thứ Lancelot–Guinevere · Avalon bị trộm · Badon · 「王不懂人心」 · Camlann | [[Artoria-Pendragon]] |
| Canon | Lời Saber nhớ lại gần nguyên văn lời Tsuna ch15; 「没有资格成为王者」 | ch15 |
| Branch contract | Không sửa `sources/`, không mâu thuẫn `fic_explicit`/`author_confirmed` | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/06_Alternate_Versions/branches/aurel-main\|aurel-main]] |
| Hard rules | Tiêu đề, dòng 续写, thoại trong `“”`, không 「」, không 「我」 ngoài thoại, không kaomoji | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/hard-rules\|hard-rules]] · [[ghi-chu-nguoi-viet-tiep-trong-du-canh]] |

**Tổng:** 0 high · 1 medium · 6 low. Không có phát hiện nào vượt ra ngoài chương này → không cần `check-conflicts`.

## Style Review — 14/09/2026

**Cổng máy:** `style_metrics.py ch16-chapter.md --json` → exit 1, `word_count: 308`, `paragraph_mean: 3.9`, `em_dash_count: 28`. **Vô hiệu với chữ Hán** —  L26. Không chạy `--write` để khỏi ghi số sai vào `metadata.yaml`. Mọi số dưới đây đo bằng script đếm chữ Hán (thân truyện = sau `go—>`, trước vạch phân cách cuối; thoại = chữ trong `“”`).

### Hard — vi phạm là lỗi

| Luật | Đo được | Đạt |
|---|---|---|
| Dòng 续写 đầu chương — [[ghi-chu-nguoi-viet-tiep-trong-du-canh]] | có, dòng 23 | ✅ |
| Tiêu đề `【太纲无差】反派战争16` — [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/hard-rules\|hard-rules]] §5 | có | ✅ |
| Thoại trong `“”`, không dùng 「」 — §1 | 「」 = 0 | ✅ |
| Không kaomoji — §2 | 0 | ✅ |
| 「我」 ngoài thoại — §3 | 0 | ✅ |
| Trích văn Dazai Osamu phải có 注 — §4 | không trích | ✅ không áp dụng |

### Mẫu cần tránh — [[forbidden-patterns]]

| # | Mẫu | Vị trí | Mức | Ghi chú |
|---|---|---|---|---|
| S1 | **Câu tổng kết "nhận ra rằng" + cặp "không phải X, mà là Y"** (mẫu 1 + 2) | dòng 119 「她忽然意识到，自己从握住这只手开始，做的根本不是在寻找拯救不列颠的方法。」 → dòng 121 「她是在挑选另一个人，来替自己当王。」 | **medium** | Đây chính là beat 3 của plan (nhịp gãy). Beat đúng, **hình thức câu** là dấu vết văn AI: kể thẳng điều nhân vật hiểu ra thay vì để hành vi nói · ✅ **đã viết lại 14/09**: Saber nuốt lại chữ 「下一个」, nhìn lại việc mình đang so, đang chọn giữa các vị vua, rồi nhìn xuống bàn tay từng rút thanh kiếm trong đá. Bỏ 「意识到」 và 「根本不是」 (grep: 0) |
| S2 | **Liệt kê ba vế đều nhịp** (mẫu 3) — 4 chỗ | dòng 35 「中庭、酒桶、月光，还有…」 · dòng 95 「会在宴席上笑，会在…犹豫一整夜，会为了…」 · dòng 105 「会累，会怕，会在深夜里…叹气」 · dòng 115 「相信她、跟着她、为她而死」 | low | Hai chuỗi 「会…会…会」 cách nhau 10 dòng, dễ nghe thấy nhịp lặp. Nguyên tác cũng có liệt kê song song (ch15 Rider: bốn vế 「因为我们…」) nên không lạ giọng, chỉ là dày |
| S3 | Mở đoạn bằng trạng từ lặp (mẫu 5) | dòng 35, 155 cùng mở bằng 「然后」 | low | Hai lần, cách xa nhau |
| — | Tính từ cảm xúc thay hành vi (mẫu 4) | không thấy | ✅ | 「呼吸乱了一拍」「声音有些发紧」 — tả hành vi |

### Target — lệch thì báo số, hỏi Aurel

| Chỉ số | Chỉ tiêu | Đo được | Đạt |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.750) | **2.323** *(sau sửa; trước 2.280)* | ✅ sàn · ngắn hơn plan ~16 % |
| Thoại — chữ trong `“”` | 20–40 % (plan ch16) · 35–55 % ([[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets\|targets]] chung) | **17,7 %** *(sau sửa; trước 17,9 %)* | 🟡 **Aurel chấp nhận cho chương này** (14/09) — không phải chỉ tiêu mới |
| Chữ Hán / đoạn — TB | 35–55 | **32,3** *(sau sửa; trước 32,6)* | 🟡 **Aurel chấp nhận cho chương này** (14/09) |
| Đoạn ≥ 100 chữ Hán | ≤ 8 % | 2,8 % | ✅ |
| Câu ≥ 50 chữ Hán | ≤ 12 % | 2,1 % | ✅ |
| `？` / 1000 | ≥ 4 | 8,61 | ✅ |
| `！` / 1000 | ≥ 1 | 1,72 | ✅ |
| `……` / 1000 | 0,5–3,5 | 3,01 | ✅ |
| `——` / 1000 | ≤ 2,5 | 2,15 | ✅ |
| Motif mắt | ≥ 1 | 5 | ✅ |
| Mật độ thuật ngữ | không đặt sàn (plan) | 1,72 (圣杯 2 · 英灵 1 · 平行世界 1) | — không từ nào gánh một mình |

### Tendency — ghi nhận, lệch có lý do thì được

| Thói quen | Nguyên tác | ch16 | Ghi chú |
|---|---|---|---|
| Móc xích câu cuối chương trước | 3 lần / 14 chỗ nối | có | ✅ |
| Lời kể gọi `太宰治`, thoại gọi `太宰` | 115 / 35 | lời kể 太宰治 ×2 · thoại 太宰 ×1 | ✅ |
| Ghi chú cuối chương | 13/15, TB 101 chữ Hán | 83 chữ Hán, đề 续写者的话 | ✅ |
| Chữ Latin ≥ 2 ký tự / 1000 | 15,46 (gộp 15 chương) | 16,36 | ✅ |
| **Câu rất ngắn ≤ 4 chữ Hán / 1000** | 2,85–5,54 (*mẫu 4 chương: ch1, 13, 14, 15 — script chỉ tách được thân truyện 4 chương này*) | **9,47** *(sau sửa; trước 9,65)* | 🟡 gần gấp đôi. Nguồn: chuỗi 「好。」「嗯。」「不可能。」「下一个。」 ở cảnh 01–03. Khớp với hai target thiếu ở trên: đoạn vụn, thoại ngắn |
| ［］ đóng khung thuật ngữ | 0,46 / 1000 | 0 | — không bắt buộc |

**Tổng Style:** hard 0 lỗi · mẫu cần tránh 1 medium + 2 low · target lệch 2 (thoại, đoạn TB) · tendency lệch 1 (câu rất ngắn). Không có vấn đề canon mới cần chuyển `check-continuity`.

## Câu hỏi cho Aurel — đã trả lời 14/09/2026

> Aurel: sửa #1 · chấp nhận thoại và đoạn TB cho chương này · viết lại S1 · Tsuna xem cùng cảnh. Còn mở, **không chặn chốt chương**: #2, #3, #4, #5, #7 (low), S2, S3 (low) — Aurel chưa yêu cầu sửa.

*Bản ghi câu hỏi:*

1. Giữ hay sửa **#1** (bàn trong vườn — không có trong nguyên tác)?
2. Chấp nhận **thoại 17,9 %** và **đoạn TB 32,6**, hay sửa? Nếu sửa, hướng ít đụng beat nhất là **gộp các lượt 「下一个」「嗯」 vào đoạn kể** (tăng đoạn TB, giảm câu ≤4 chữ) — thoại % sẽ **không** tăng theo cách đó.
3. Viết lại câu **S1** (dòng 119–121) theo hướng để hành vi nói?
4. **#6** — Tsuna có xem cùng cảnh với Saber không? Nếu có, nên thêm một dòng vào [[saber-chi-quan-sat-the-gioi-song-song]].
