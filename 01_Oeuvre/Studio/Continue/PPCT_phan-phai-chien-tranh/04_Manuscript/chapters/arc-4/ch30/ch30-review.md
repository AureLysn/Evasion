---
id: review.PPCT.ch30-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-4-ba-dao-lenh-chu
chapter: 30
canon_layer: user_canon
status: active
aliases: ["review ch30 PPCT", "soat ch30", "check-continuity ch30", "寻找 review"]
related: ["[[04_Manuscript/chapters/arc-4/ch30/ch30-chapter]]", "[[04_Manuscript/chapters/arc-4/ch30/ch30-plan]]", "[[dazai-nghi-master-assassin-cung-phe-archer]]", "[[kirei-van-la-master]]", "[[fact-cong-nghe-vongola-trong-chien-tranh]]", "[[lenh-chu-con-sau-khi-servant-chet]]"]
source:
  type: inference
  ref: "check-continuity Mode 1, 23/09/2026, tren ban nhap ch30 (2.125 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-23
---

# Soát chương 30 — 寻找

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> **check-continuity** (#1–#4) và **check-style** (#5–#7, cuối file). Aurel đồng ý sửa #1–#4 theo hướng đề xuất ngày 23/09/2026 — xem *Đã sửa*.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch30-chapter.md --scene <01·02·03> --json` | **exit 1** ở cả ba cảnh · `findings: []` · `body_script: cjk` — [[kirei-van-la-master]] **được kiểm** (không hit). Cảnh báo duy nhất: [[dazai-mang-ky-uc-kiep-truoc]] **không kiểm được** — note chưa có `leak_terms:` chữ Hán |
| grep tay (`metadata.yaml`) | 言峰 · 绮礼 · 璃正 · Assassin · 吉尔伽美什 · 远坂 · 时臣 · 白兰 · 马雷 · 前世 · 上辈子 = 0 |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo cũ (`branches/aurel-main.md` always_load) |

⚠️ `metadata.yaml` ghi `pov_leak_check: valid: false # khong khop duoc chu Han — L29`. **Đã cũ:** công cụ nay đọc chữ Hán (`body_script: cjk`) và kiểm được mọi bí mật có `leak_terms`. ✅ Đã sửa dòng đó trong lượt check-style (23/09).

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ 「第十天早上」 → 「到了中午」 — đúng C6; ch31 (đêm ngày 10) không bị chạm. 「前天晚上西郊那间仓库」 = đêm ngày 8 ✓ ([[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]] dòng 69). 「剩下的从者，五个，和昨天一样」 khớp ch28 (dòng 123–125: Saber, Archer, Rider, Berserker, Caster) ✓ |
| Ranh giới tri thức | ✅ Cả hai tin lệnh chú còn ở tay Sola-Ui (dòng 85) — niềm tin sai có chủ đích, đúng thẻ cảnh 02. ✅ Trực giác Tsuna **không nội dung** (dòng 97 「不知道。是直觉。」), không trỏ vào ai. ✅ Kiritsugu được gọi 「魔术师杀手」 — tổ Caster biết (ch27 dòng 115). 🟠 **#1** mối nghi ch17 bị nối với nhà thờ và dùng làm lý do hành động |
| Trạng thái nhân vật | ✅ Tsuna nhớ lo cho Sola-Ui đêm ngày 8 (dòng 45) — khớp ch27 dòng 113 「索拉乌小姐她……没事吧？」. ✅ Dazai ghế xoay + bút — ch26 dòng 33. ✅ Câu 「雷达」 gán đúng người: ch23 dòng 85 là **Tsuna** nói 「我的直觉又不是雷达。」 |
| Luật thế giới | ✅ Nhà thờ trung lập, không ai giải thích vì sao lệnh chú còn sau khi mất Servant — [[lenh-chu-con-sau-khi-servant-chet]]. ✅ Kết giới ngoài cửa sổ căn cứ — ch28 dòng 119. 🔵 **#2** ràng buộc mới về cách đặt bọ · 🔵 **#3** cơ chế mới "không chạy bằng ma lực" |
| Quan hệ / xưng hô | ✅ Tsuna 「太宰」, Dazai 「纲吉」 — [[dazai--tsuna]]. ✅ 「索拉乌小姐」 · 「肯尼斯先生」 — ch28 dòng 79 |
| Canon | ✅ Maiya không được gọi tên (Tsuna chỉ biết là 「那个总是跟在卫宫切嗣身边的女人」). ✅ Kiritsugu lần theo bên thứ ba bằng vật chứng — hợp lối làm việc canon. ✅ 爱因兹贝伦 — cùng cách viết ch19, ch22, ch25 |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm` |

**Hook:** [[hook-to-caster-khac-che-to-saber]] được đẩy (「他现在要找的不是从者，是人」) ✓. Bốn hook plan cấm chạm — không chạm ✓.

**Luật cứng:** tiêu đề 【太纲无差】反派战争30 ✓ · dòng ※ ✓ · thoại trong `“”`, 0 `「」` ✓ · 0 「我」 ngoài ngoặc ✓ · tag trước ngoặc ✓.

---

## #1 · 🟠 vừa · Mối nghi ch17 được nối với nhà thờ, rồi dùng làm lý do không động vào nhà thờ

**Chương, dòng 115–119:**
> 太宰治的手指在扶手上敲了两下：「再说，住在那里面的也不只有他们两个。酒宴那天晚上我说过的话，你还记得吧？」
> ……
> 太宰治说：「现在也还是猜。」他伸了个懒腰，「所以更不能去碰。万一猜错了，我们会在一个晚上多出三个敌人来。」

**[[dazai-nghi-master-assassin-cung-phe-archer]], Ràng buộc kéo theo:** 「**Không nâng** mức nghi lên "Master đó ở nhà thờ và còn là Master" (Aurel 22/09)」.
**Thẻ cảnh 02, Diễn biến 4:** 「**Không** nối với nhà thờ bằng câu khẳng định.」 · mục CẤM: 「nói chắc Master của Assassin ở nhà thờ」.

→ ch28 để hai dữ kiện **đứng cạnh nhau** thành một câu đùa rồi bỏ đó (「教会倒是一个很方便的地方呢！」). ch30 đi thêm hai bước:
1. 「再说……酒宴那天晚上我说过的话」 nối **người đang ở trong nhà thờ** với **Master còn hoạt động, cùng phe Archer** ngay trong một lượt thoại.
2. 「所以更不能去碰」 biến mối nghi thành **căn cứ hành động**, và 「三个敌人」 đếm cụ thể. Assassin đã bị diệt ở ch17, nên người đọc Fate sẽ đếm ra: Master của Assassin + Archer + Master của Archer — tức Dazai đang đặt cả phe Archer vào chuyện nhà thờ.

Còn một lỗi logic: 「万一猜错了」 bị lộn. Nhà thờ nguy hiểm **nếu Dazai đoán đúng**. Nếu đoán sai, nhà thờ trung lập thật, và động vào thì bị **tất cả** coi là kẻ thù (dòng 109), không phải "ba".

Đây là trigger 「A character acts on information they only suspect」. Chưa gọi tên, chưa khẳng định, nên mình xếp mức vừa, không cao.

**Hướng sửa:** giữ đúng mức ch28: nhắc lại, nói 「还是猜」, rồi thôi, **không** dùng làm lý do.
- Dòng 115: 「再说，酒宴那天晚上我说过的话，你还记得吧？」 — bỏ vế 「住在那里面的也不只有他们两个」.
- Dòng 119: 「现在也还是猜。」他伸了个懒腰，没有再往下说。 — bỏ 「所以更不能去碰。万一猜错了……三个敌人」.
- Lý do không đặt bọ đã đủ ở dòng 109 (đất trung lập) và dòng 113 (不值).

## #2 · 🔵 thấp · 「要再放一只进去，得先有人走进那间仓库才行」 — ràng buộc mới, không có nguồn

**Chương, dòng 129:** 「修不了。要再放一只进去，得先有人走进那间仓库才行。」

**[[fact-cong-nghe-vongola-trong-chien-tranh]]:** bọ 「只有飞虫大小」 (ch3); chuồn chuồn 「bay tới vị trí quan sát」 (ch4). Không chỗ nào nói phải có người mang bọ vào.

→ Câu này tạo ra một fact mới (bọ cần người mang vào). Các arc sau sẽ phải giữ fact đó. Nó cũng lệch với tiền đề của chính chương: 「他回去捡了」 (dòng 49), tức **đã có** người vào lại nhà kho.

**Hướng sửa:** lấy luôn lý do C2 của chương: 「修不了。现在再放一只进去，就等于告诉他，我们还在看。」 — không có fact mới, và khớp với dòng 135.

## #3 · 🔵 thấp · 「魔力也测不出来，因为它本来就不靠魔力转」 — cơ chế mới

**Chương, dòng 67.**
**[[fact-cong-nghe-vongola-trong-chien-tranh]]:** chỉ ghi 「Einzbern không phát hiện」 (ch3). Không có dòng nào nói bọ **không dùng ma lực**. Box được tả là 「雾火焰和科技的结合」 (ch6), nên công nghệ Vongola không hẳn "không có gì huyền bí".

→ Nhiều khả năng đúng tinh thần (công nghệ Spanner, không phải ma thuật). Nhưng đây là **fact mới do AI viết**. Thẻ cảnh 01 đã đánh 🟡 「writer giữ nhẹ」. **Mình không chắc** đây là lỗi. Cần Aurel chọn:
- giữ → thêm vào fact note ở `finalize-chapter`, ghi `source: ch30 viết tiếp`;
- hoặc cắt vế sau: 「……没有哪个魔术师查得出它是从哪里来的。」

## #4 · 🔵 thấp · Cặp 「蜻蜓 / 苍蝇」 lần thứ ba, sát nguyên văn ch28

**Chương, dòng 53:** Tsuna 「第一天晚上是蜻蜓，前天晚上是苍蝇。两次都是我们。」
**ch27 dòng 111:** 「那次是蜻蜓，这次是苍蝇。」 · **ch28 dòng 113:** 「第一天晚上是一只蜻蜓，昨天晚上是一只苍蝇。」
**Thẻ cảnh 01:** 「**không** lặp nguyên văn, cho Tsuna nhắc lại bằng chữ khác」.

→ Thẻ cảnh cấm lặp câu 「卫宫切嗣会去找是谁」, còn câu này thì lặp gần y nguyên ch28, chỉ đổi người nói. Vế 「两次都是我们」 là chỗ mới và đáng giữ.

**Hướng sửa:** 「两次拦住他的，都是我们的小东西。」 — giữ ý, bỏ cặp từ đã dùng hai lần.

*(Dòng 45 「平板上的画面先是一白，然后是一声闷响」 gần như chép ch27 dòng 107. Đây là Tsuna **nhớ lại** đúng hình ảnh cũ, nên chấp nhận được. Không tính là phát hiện.)*

---

## Không phải lỗi — khẩu vị

- **Lời người viết tiếp 「纲吉那一下"哪里不对"，其实是对的。」** Câu này nằm ngoài thân truyện, không làm lộ gì với nhân vật, và người đọc đã biết từ ch29. Nhưng nó giải thích luôn chỗ lệch mà chương cố để người đọc tự thấy. ch29 thì khép bằng 「之后再说」, tức **giữ lại**. Mình nghiêng về bỏ câu này. Đây là khẩu vị, **không** phải lỗi.
- **Dòng 101–105, câu 「雷达」.** ch23 Dazai đáp 「可是比雷达好用……雷达又不会觉得哪里不对」, tức Dazai **tin** trực giác. ch30 Dazai dùng lại câu của Tsuna để gạt đi, rồi 「先记着就行」. Mình đọc được như một cách chơi chữ có chủ ý, không phải Dazai đổi tính. Nếu muốn chặt hơn, có thể cho Dazai vọng lại chính câu ch23 của mình.

## Chỗ mình không chắc

- **Kiritsugu tự quay lại nhặt mảnh vỡ** (dòng 49 「所以他回去捡了」). Đây là suy luận của Dazai trên trang, không phải lời kể, nên không cần nguồn. Nếu ch33 hoặc arc sau cho POV Kiritsugu, chi tiết này phải khớp.

## Còn treo sang `finalize-chapter`

- Kiritsugu có mảnh bọ Vongola; Maiya mang về lâu đài sáng ngày 10 (tổ Caster **thấy**). Có thể thành event mới 🟡.
- [[hook-to-caster-khac-che-to-saber]]: đẩy, giữ `partially_paid`.
- [[kirei-van-la-master]]: `suspected_by` **không đổi**, nếu #1 sửa theo hướng đề xuất.
- ✅ metadata.yaml: đã sửa trong luật check-style.
- [[dazai-mang-ky-uc-kiep-truoc]]: thêm `leak_terms:` chữ Hán (前世 · 上辈子 · …) để công cụ kiểm được. Việc này nằm ngoài chương, không chặn ch30.

---

## Đã sửa — #1–#4, Aurel đồng ý 23/09/2026

| # | Trước | Sau |
|---|---|---|
| #1 | 「再说，住在那里面的也不只有他们两个。酒宴那天晚上……」 · 「……所以更不能去碰。万一猜错了，我们会在一个晚上多出三个敌人来。」 | 「再说，酒宴那天晚上我说过的话，你还记得吧？」 · 「现在也还是猜。」他伸了个懒腰，没有再往下说。 |
| #2 | 「要再放一只进去，得先有人走进那间仓库才行。」 | 「现在再放一只进去，就等于告诉他，我们还在看。」 |
| #3 | 「……查得出它是从哪里来的，魔力也测不出来，因为它本来就不靠魔力转。」 | 「……查得出它是从哪里来的。」 — **chọn cắt**, không thêm fact vào [[fact-cong-nghe-vongola-trong-chien-tranh]] |
| #4 | 「第一天晚上是蜻蜓，前天晚上是苍蝇。两次都是我们。」 | 「两次拦住他的，都是我们的小东西。」 |

Grep lại: 三个敌人 · 住在那里面 · 不靠魔力 · 先有人走进 · 第一天晚上是蜻蜓 = 0. `pov_leak_check` ×3 sau khi sửa: findings 0, exit 1 (vẫn chỉ vì [[dazai-mang-ky-uc-kiep-truoc]] không kiểm được).

---

# Check-style

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `han_metrics.py` (scratchpad, đã kiểm trên ch22 — L45) | số đo chính, bảng dưới |
| `style_metrics.py ch30-chapter.md --json` | **exit 1** · hai verdict `target` trượt, **cả hai không áp dụng**: (1) 「word count 1500–2200」 = 2.223 — đếm cả tiêu đề, cảnh báo, lời người viết tiếp; và [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets\|targets]] ghi rõ độ dài **không trần**, bỏ qua phán quyết này. (2) 「term density ≥ 9,0/1000」 — dải của chương **dệt canon**; ch30 là đời thường, [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets\|targets]] **không đặt sàn**, plan đặt ≥ 6 |

⚠️ `style_metrics.py` nay **đếm được** chữ Hán (`script: cjk`), nhưng `dialogue_paragraph_ratio: 0.016` là sai — nó không nhận `“”` làm thoại (han_metrics: 70,9 % đoạn có thoại). Dòng "không đo được chữ Hán" ở [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]] (L26) đã cũ **một nửa**. Không ghi lỗi mới ở đây — để `ghi-loi` quyết.

## Bảng chỉ tiêu — sau khi sửa #1–#4

| Chỉ số | Chỉ tiêu (plan ch30 · [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets\|targets]]) | Trước sửa | Sau sửa | Kết luận |
|---|---|---|---|---|
| Chữ Hán thân truyện | sàn 1.500 · plan ~2.100 | 2.125 | **2.065** | ✅ |
| Thoại | plan 40–55 % · targets 35–55 % | 41,8 % | **39,8 %** | 🟡 **dưới dải plan 0,2 điểm**, trong dải targets — có chấp nhận không? |
| Chữ Hán/đoạn TB | 35–55 | 38,6 | 37,5 | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 1,8 % | 1,8 % | ✅ |
| Câu trung vị | 17–20 | 17 | 17 | ✅ sát sàn |
| Câu ≥ 50 chữ | ≤ 12 % | 1,9 % | 1,9 % | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 1,41 | 1,45 | ✅ — **có** câu ngắn (nhịp tác giả còn) |
| `？` | ≥ 4/1000 | 6,59 | 6,78 | ✅ |
| `！` | ≥ 1/1000 | 1,41 | 1,45 | ✅ |
| `……` | 0,5–3,5 | 1,41 | 1,45 | ✅ |
| `——` | ≤ 2,5 | 0 | 0 | ✅ |
| Thuật ngữ | plan ≥ 6/1000 | 7,53 | **6,78** | ✅ — trải trên 7 từ, không từ nào gánh (từ nhiều nhất: 从者 · 直觉, 3 lần) |
| Motif mắt | ≥ 1 | 1 | 1 | ✅ sát sàn (dòng 79) |
| Chữ Hán theo cảnh | 900 · 800 · 400 | 1.039 · 724 · 362 | 1.014 · 689 · 362 | — ước lượng, không phải sàn |
| Lượt thoại theo cảnh | ≥ 10 · 10 · 3 | — | 17 · 19 · 7 (đếm `“`) | ✅ |
| Thuật ngữ theo cảnh | ≥ 5 · 5 · 2 | 5 · 8 · 3 | **3** · 8 · 3 | 🟡 **cảnh 01 hụt 2** — do cắt 「魔力」×2 ở #3. Có chấp nhận không? |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 Thoại trong `“”`, không `「」` | ✅ 0 |
| §2 Không kaomoji | ✅ |
| §3 Không 「我」 ngoài ngoặc kép | ✅ 0 |
| §4 Trích Dazai Osamu | — không có |
| §5 Tiêu đề 【太纲无差】反派战争30 | ✅ · dòng ※ ✓ |
| Tag trước ngoặc | ✅ grep 「”[^“]{0,4}说」 = 0 |
| Xưng hô | ✅ 太宰 / 纲吉 — [[dazai--tsuna]] |

## #5 · 🟠 vừa · Cùng một nhận ra được **nói thẳng** ba lần; lần cuối là câu tổng kết ở cảnh cấm tổng kết

**Dòng 55:** 「以前这些事听起来都是太宰治的棋，今天忽然变成了他们两个正站在棋盘上的某一格里。」
**Dòng 69:** 「从前是他们看着所有人，今天开始有一个人回过头来看他们。」
**Dòng 125:** 「可是这场战争已经不是昨天那一场了，从早上那个袋子被拎进城堡大门起，就不是了。」

**Thẻ cảnh 03:** 「**Không** tổng kết cảm xúc」 · CẤM 「câu tổng kết」. **[[forbidden-patterns]] #1:** câu tổng kết cảm xúc cuối đoạn.

→ Ý "từ nay mình bị nhìn lại" là trục của chương, nói một lần là đủ. Dòng 69 hay nhất (gắn với màn hình). Dòng 55 nói trước nó 14 dòng, dòng 125 nói lại ở cảnh khép — nơi thẻ cảnh muốn **hình ảnh** (hai ô màn hình) làm việc này. Đây là **lỗi theo thẻ cảnh**, không phải khẩu vị.

**Hướng sửa:**
- Dòng 125: dừng ở 「……五个，和昨天一样。」 — bỏ vế 「可是这场战争……就不是了」.
- Dòng 55: bỏ cả câu, hoặc rút còn nửa đầu: 「然后他自己先愣住了。」 (gộp luôn #6).

## #6 · 🔵 thấp · 「愣了一下」 hai lần trong 10 dòng; 「一下」 7 lần trong thân truyện

**Dòng 45** 「纲吉愣了一下」 · **dòng 55** 「然后他自己先愣了一下」 — cùng người, cùng cảnh. Các 「一下」 khác (dòng 57 笑了一下, 87 响了一下/敲了一下, 99 停一下, 125 滴了一下) mỗi cái một nghĩa, chấp nhận được.

**Hướng sửa:** theo #5 — dòng 55 bỏ hoặc 「愣住了」.

## #7 · 🔵 thấp · Sau #2, dòng 129 và dòng 133 nói cùng một ý cách nhau hai lượt

**Dòng 129** 「现在再放一只进去，就等于告诉他，我们还在看。」 · **dòng 133** 「我们今天唯一要做的事，就是别让任何人发现我们一直在看。」

→ Hệ quả của chính câu sửa #2. Đọc được như **tăng dần** (một con bọ → cả ngày hôm nay), nên mình xếp thấp. Nếu muốn gọn: dòng 133 giữ nguyên, dòng 129 đổi thành 「修不了。那一块，已经没有眼睛了。」 — cũng không tạo fact mới.

## Nhận xét về giọng

- **Dấu vết AI khác** ([[forbidden-patterns]]): 「不是X，是Y」 3 lần (dòng 57, 109, 125) — dòng 57 là câu plan đặt, chấp nhận; dòng 125 sẽ mất nếu sửa #5. Không liệt kê ba vế đều. Không mở đoạn bằng trạng ngữ thời gian lặp (「太阳升高了一些」 · 「过了一会儿」 · 「到了中午」 — ba mốc khác nhau, đúng C6).
- **Dòng 121** 「而挑不出错处，才是最让他不舒服的地方」 gần mẫu #1 nhưng gọi tên **cảm giác cụ thể** (không yên vì câu không sai), và câu sau kéo về hình ảnh (「那一下轻响……一直没有停」). Giữ.
- Thoại tag 「X说：“…”」 đều tay suốt chương — đúng quy ước tag trước ngoặc; ở cảnh 02 hơi dày (dòng 105–119 liền 8 lượt 「太宰治说：」/「纲吉说：」). Khẩu vị, không phải lỗi.

## Còn treo — cần Aurel

1. **#5** sửa không (mình đề xuất: có — thẻ cảnh 03 cấm câu tổng kết).
2. #6 · #7: sửa hay giữ.
3. Chấp nhận **thoại 39,8 %** và **thuật ngữ cảnh 01 = 3/5** không? Mình nghiêng về chấp nhận: cả hai do cắt chữ theo #1/#3, và cả hai trong dải [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]] (thoại 35–55 %; đời thường không có sàn thuật ngữ). **Không** nhét thuật ngữ hay thoại vào để chạm số.
4. Lời người viết tiếp 「其实是对的」 (khẩu vị, xem trên).

---

## Đã sửa — #5–#7, Aurel đồng ý 23/09/2026 · số đo #1–#4 được chấp nhận

| # | Trước | Sau |
|---|---|---|
| #5 · #6 | dòng 55 「然后他自己先愣了一下：以前这些事听起来都是太宰治的棋，今天忽然变成了他们两个正站在棋盘上的某一格里。」 | 「然后他自己先愣住了。」 |
| #5 | dòng 125 「……五个，和昨天一样；可是这场战争已经不是昨天那一场了，从早上那个袋子被拎进城堡大门起，就不是了。」 | 「……五个，和昨天一样。」 |
| #7 | dòng 129 「修不了。现在再放一只进去，就等于告诉他，我们还在看。」 | 「修不了。那一块，已经没有眼睛了。」 |

Aurel chấp nhận (23/09): thoại 39,8 % và thuật ngữ cảnh 01 = 3/5 **cho chương này**.

### Số đo sau #1–#7

| Chỉ số | Chỉ tiêu | Gốc | Sau #1–#4 | **Sau #1–#7** |
|---|---|---|---|---|
| Chữ Hán | sàn 1.500 | 2.125 | 2.065 | **1.983** ✅ |
| Thoại | plan 40–55 % | 41,8 % | 39,8 % | **41,0 %** ✅ về lại dải |
| Chữ Hán/đoạn TB | 35–55 | 38,6 | 37,5 | **36,1** ✅ |
| Câu trung vị | 17–20 | 17 | 17 | **16** 🟡 **dưới dải 1** — mới, do cắt hai câu dài ở #5 |
| Câu ≥ 50 chữ | ≤ 12 % | 1,9 % | 1,9 % | 1,0 % ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 1,41 | 1,45 | 1,51 ✅ |
| `？` · `！` · `……` | ≥ 4 · ≥ 1 · 0,5–3,5 | 6,59 · 1,41 · 1,41 | 6,78 · 1,45 · 1,45 | 7,06 · 1,51 · 1,51 ✅ |
| Thuật ngữ | ≥ 6/1000 | 7,53 | 6,78 | **7,06** ✅ |
| Motif mắt | ≥ 1 | 1 | 1 | **2** ✅ (thêm 「没有眼睛了」) |
| Chữ Hán theo cảnh | 900 · 800 · 400 | 1.039 · 724 · 362 | 1.014 · 689 · 362 | 976 · 689 · 318 |
| Thuật ngữ theo cảnh | ≥ 5 · 5 · 2 | 5 · 8 · 3 | 3 · 8 · 3 | 3 · 8 · 3 (đã chấp nhận) |

Grep lại: 愣了一下 = 1 · 棋盘上的某一格 · 不是昨天那一场 · 我们还在看 = 0 · tag sau ngoặc = 0. `pov_leak_check` ×3: findings 0.

**Còn treo:** câu trung vị **16** (dải 17–20) — **chưa** nằm trong phần Aurel đã chấp nhận. Không vá bằng cách nối câu cho dài.
