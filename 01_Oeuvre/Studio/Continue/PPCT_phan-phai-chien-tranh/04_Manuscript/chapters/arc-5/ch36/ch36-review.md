---
id: review.PPCT.ch36-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-5-ke-san-va-con-moi
chapter: 36
canon_layer: user_canon
status: active
aliases: ["review ch36 PPCT", "soat ch36", "check-continuity ch36", "check-style ch36", "ngoi doi dien review"]
related: ["[[04_Manuscript/chapters/arc-5/ch36/ch36-chapter]]", "[[04_Manuscript/chapters/arc-5/ch36/ch36-plan]]", "[[kiritsugu]]", "[[kirei-van-la-master]]", "[[archer-doi-master-sang-kirei]]", "[[kiritsugu-bat-dau-tim-ben-thu-ba]]", "[[lancer-chet-trong-quyet-dau]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 25/09/2026, tren ban nhap ch36 (2.828 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-25
---

# Soát chương 36 — Ngồi đối diện

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát và người viết bản nháp là một, trong cùng một phiên.** Nếu muốn một lượt soát độc lập, dùng agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×4 cảnh | findings **0** · exit 1 ở cả bốn cảnh, chỉ vì [[dazai-mang-ky-uc-kiep-truoc]] không có `leak_terms` chữ Hán. Đã grep tay 前世 · 上辈子 · 上一世 · 记忆 · 记得 · 梦 · 彭格列 · 首领 · 白兰 · 十年 · 玛雷 · 指环 = 0 |
| grep tay (bí mật arc) | 神父 · 绮礼 · 言峰 · 魔力 · 河对岸 · Azoth · 爱丽丝菲尔 · Assassin = **0**. 死 ×2: 「死了？」 (câu **hỏi** của Kiritsugu, bị bác) · 「吓死我了」. 时臣 ×1 · Archer ×1 · 令咒 ×1 · 索拉乌 ×1 — đúng các chỗ plan cho phép |
| `ai_tells_check --project PPCT` (bản PR #65 + [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells\|ai-tells]]) | exit **0** — không trúng mẫu cứng nào, không cảnh báo |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo có từ trước |

## Tám nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ 「第十三天中午」 — khớp tờ giấy ch34 và 「信上的明天，就是今天」 (ch35). ✅ 「昨天下午，就是这个女人沿着城堡的围墙…」 = chiều ngày 12 (ch34). ✅ 「想起第十天早上」 = ch30. ✅ 「前一天傍晚」 = chạng vạng ngày 9 (băng ch35). Buổi gặp **trước** kế hoạch lần theo tối ngày 13 ✓ |
| Ranh giới tri thức | ✅ Tsuna/Dazai giữ L2 về 时臣: 「大概已经不在了」 · 「我说的是不在了」 · 「Archer还在」. ✅ Không 「有人在给他魔力」, không cách biết. ✅ Không tên Kirei, không băng tối ngày 10 (C4). ✅ Kiritsugu **không** được biết căn cứ, Tsuna là gì, tên ai. ✅ Nội tâm Kiritsugu không lên trang — chỉ 「刚刚在心里翻过了一页…又把那一页按住了」 qua trực giác Tsuna. 🟠 **#1** Kiritsugu gọi Kayneth là 「Lancer的御主」 · 🟠 **#2** 「现在他知道是哪里了」 |
| Trạng thái nhân vật | ✅ Kiritsugu một mình, súng dưới áo; Maiya bên kia đường, có súng (ch35 「带着。不要用。」); không ai rút. ✅ Kiritsugu **không** đụng ly (thẻ cảnh 01, 04). ✅ Saber, Irisviel không lên trang. 🔵 **#3** 「扶着肯尼斯先生」 |
| Luật thế giới | ✅ Không có câu "đồ Vongola không dùng ma lực". ✅ Con bọ 「今天晚上就不会再说话了」 — kết quả, không cơ chế. ✅ Không chỉ số Servant nào được viết ra. ✅ 「不用再多准备什么了」 là **đoán** (「换了是我，我也会」), không chứa 「河对岸」 |
| Quan hệ / xưng hô | ✅ 「索拉乌小姐」 · 「肯尼斯先生」 — đúng cách Tsuna gọi ở ch30. ✅ Tại bàn **không ai gọi tên ai** (C8) — Dazai đặt luật ở cảnh 01, Tsuna giữ tới hết. ✅ Kiritsugu → Tsuna 「你的御主」 |
| Canon | ✅ Chuồn chuồn mắt đỏ (ch5 → ch35 「眼睛里有一点红色的光」) · con ruồi ở kho phía tây (ch27 「那次是蜻蜓，这次是苍蝇」). ✅ Kiritsugu biết 时臣 là Master của Archer (canon — hồ sơ Master), nên hỏi 「死了？」 là tự nhiên |
| Hợp đồng nhánh | ✅ Không chạm mục `forbid` |
| Rò kế hoạch (nhóm 8) | ✅ Beat cảnh 04 (Dazai cắt con bọ) **không** được báo trước ở cảnh 01–03; lý do (giữ căn cứ) chỉ lên trang **sau** beat: 「再说下去，就要把这扇门在哪里也说出来了」. ✅ Beat cảnh 03 (Kiritsugu giữ bài) không được báo trước. 🔵 cảnh 01 「可是今天不会有人把它拿出来，纲吉很确定这一点」 — trực giác đoán trước "không ai rút súng". Đó là **ràng buộc** của plan, không phải beat; trực giác A+ ([[fact-chi-so-tsuna]]) chịu được. Không ghi thành lỗi |

**Hook:** [[hook-to-caster-khac-che-to-saber]] được đẩy — tổ Caster trả lời "ai" trước khi bị hỏi, xác nhận Kiritsugu có mắt ở nhà thờ, và cắt đường lần theo: 「那一眼很短，短得就像在地图上确认一个坐标」 ✓. [[hook-can-dazai-de-thang-archer]] chạm nhẹ qua 「Archer还在」 ✓. [[hook-tsuna-da-thay-chien-thang]] không chạm ✓.

---

## #1 · 🟠 vừa · Kiritsugu gọi Kayneth là 「Lancer的御主」, Sola-Ui là 「跟着他的那个女人」

**Chương, dòng 125:** 「第九天傍晚，Lancer的御主和跟着他的那个女人，从教会里出来，上了教会的车。」
**[[kiritsugu]], mục ch27:** 「Đêm ngày 8: đã biết lệnh chú ở tay Sola-Ui (off-page…); tới nhà kho phía tây ép cô dùng lệnh chú kết thúc trận」.

→ Đêm ngày 8, Kiritsugu biết người giữ lệnh chú của Lancer là **Sola-Ui**: hắn đã ép **cô** dùng lệnh chú. Tới ngày 9 Lancer đã chết. Gọi Kayneth là "Master của Lancer" và Sola-Ui là "người phụ nữ đi theo hắn" thì Kiritsugu biết **ít hơn** những gì hắn đã biết. Nó cũng đẩy người đọc lệch khỏi sợi lệnh chú của Sola-Ui, đúng sợi ch38 cần.
Ở ch35, Kiritsugu hỏi 「Lancer的御主，就这样走了？」 — câu đó mơ hồ, trỏ được cả hai người. Câu ở ch36 thì **không** mơ hồ, vì có chữ 「他」.

**Đề xuất:** 「第九天傍晚，肯尼斯和索拉乌从教会里出来，上了教会的车。」 (Kiritsugu biết tên — canon, hồ sơ Master). Hoặc 「Lancer那一组剩下的两个人」.

## #2 · 🟠 vừa · 「现在他知道是哪里了」 — khép hẳn câu trực giác ch30, trong khi phần lệnh chú còn để cho ch38

**Chương, dòng 131–133:** 「现在他知道是哪里了。那天早上，索拉乌小姐已经不在教会里了。…」 · 「那道看不见的缝，这一次终于摸到了边。」
**ch30, dòng 89–93:** 「好像哪里不对。」 — 「刚才哪一句？」 — 「**令咒还在她手上那一句。**」
**Plan ch36, khung đỏ cảnh 03:** 「Tsuna nhận ra câu nào sai — **không** nhận ra nó dẫn tới đâu … **Không** nối tới lệnh chú … Đó là ch38.」

→ Ở ch30, câu Tsuna chỉ ra là câu **về lệnh chú**, không phải câu "họ còn ở nhà thờ". ch36 trả lời được nửa đầu (cô không còn ở đó). Nhưng 「现在他知道是哪里了」 nói như thể đã trả lời **cả** câu — trong khi câu Tsuna thật sự chỉ ra vẫn còn treo. Hai hệ quả:
- Người đọc nhớ ch30 sẽ thấy lệch: câu bị chỉ ra là câu lệnh chú, sao lời giải lại là chuyện cô đi đâu.
- ch38 mất chỗ đứng: nếu câu trực giác đã "được biết" ở ch36 thì ch38 không còn gì để Tsuna nhận ra.

Dòng 133 「终于摸到了边」 thì đúng mức — chỉ mới *chạm mép*. Hai dòng đang nói ngược nhau.

**Đề xuất:** dòng 131 đổi thành 「现在他知道了一半。」 hoặc 「现在，那道缝至少有了一个位置。」. Giữ dòng 133.

## #3 · 🔵 thấp · 「扶着肯尼斯先生」 — Tsuna thêm chi tiết mà lời Kiritsugu không nói

**Chương, dòng 131:** 「前一天傍晚，她就扶着肯尼斯先生坐上车，走了。」
**Dòng 125** (lời Kiritsugu): chỉ 「从教会里出来，上了教会的车」 — không nói ai dìu ai.

→ Chi tiết 「扶」 đúng với **sự thật** (ch29, băng ch35). Nhưng Tsuna chỉ biết qua lời Kiritsugu, mà lời đó không có. Tsuna **có thể** tự hình dung — tổ Caster đã xem Kayneth bị phế ở ch19 — nên đây không phải lỗi tri thức. Có điều người kể đang viết như Tsuna **thấy** cảnh đó.

**Đề xuất:** 「她就和肯尼斯先生一起坐上车，走了。」. Hoặc giữ nguyên.

---


# Văn phong (check-style Mode 1)

Số đo từ `style_metrics.py --json` (bản PR #64 — khớp `han_metrics.py` từng số trên chương này). `--write` **từ chối** ghi đè `metadata.yaml` ghi tay (exit 2, cơ chế bảo vệ sau lỗi ch31) → số chép tay vào `metadata.yaml`.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.450) | 2.828 | ✅ đạt sàn · 🟡 **#9** vượt dự kiến ~15 % |
| Thoại | plan 45–55 % · dải chung 35–55 % | **31,2 %** | 🟡 **#9** |
| Chữ/đoạn TB | 35–55 | **34,1** | 🟡 **#9** sát sàn |
| Đoạn ≥ 100 chữ | ≤ 8 % | 2,4 % | ✅ |
| Câu trung vị | 17–20 | **15** | 🟡 **#9** |
| Câu ≥ 50 chữ | ≤ 12 % | 0,6 % | ✅ |
| Câu ≤ 4 chữ /1000 | ≤ 5,5 | 2,12 | ✅ |
| `？` /1000 | ≥ 4 | 5,66 | ✅ |
| `！` /1000 | ≥ 1 | 1,06 | ✅ (bản đầu 0,78) |
| `……` /1000 | 0,5–3,5 | 1,41 | ✅ |
| `——` /1000 | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ /1000 | hướng ~4 (plan, `tendency`) | 4,6 | ✅ · `style_metrics` báo LECH theo sàn 9 của chương **dệt canon** — không áp (plan: chương đối thoại) |
| `term_hits` | không dồn vào một từ | 御主 5 · 从者 3 · 直觉 3 · 圣杯 1 · 令咒 1 | ✅ |
| Motif mắt | ≥ 1 | 5 | ✅ |
| Lượt thoại theo cảnh | ≥ 5 · 10 · 10 · 4 | 14 · 14 · 13 · 11 | ✅ |
| Chữ Hán theo cảnh | 550 · 700 · 800 · 400 | **1.052** · 524 · 760 · 492 | 🟡 **#9** cảnh 01 gấp đôi |
| Thuật ngữ theo cảnh (tính cả 魔术) | ≥ 2 · 3 · 4 · 1 | 4 · **2** · 8 · **0** | 🟡 **#9** cảnh 02, 04 thiếu 1 |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 `“”`, không `「」` làm dấu thoại | ✅ 0 「」 |
| §2 Kaomoji | ✅ 0 |
| §3 「我」 ngoài ngoặc | ✅ 0 |
| §5 Tiêu đề | ✅ `【太纲无差】反派战争36` + dòng ※ + 预警 |
| §6 Thực thể cùng tên | ✅ |
| [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells\|ai-tells]] (`ai_tells_check`) | ✅ exit 0 — 0 mẫu cứng, 0 cảnh báo |

## #4 · 🟠 vừa · Ba cặp 「不是X，是Y」 trong lời kể — hai cặp cùng khuôn 「不是危险」

**Dòng 65:** 「那**不是危险**逼近时的感觉，更像是有人隔着很远，把视线搁在了他身上」
**Dòng 91:** 「**不是放心，是**一道题终于被写上了答案」
**Dòng 153:** 「**不是危险。是**这个人刚刚在心里翻过了一页」
**[[forbidden-patterns]] #2:** 「cặp đối lập sáo ("không phải X, mà là Y") lặp nhiều lần trong một chương」. Review ch23, ch25 chấp nhận **2** lần/chương.

→ Ba lần, và hai lần (65, 153) tả **trực giác Tsuna bằng cùng một khuôn**: phủ định "nguy hiểm" rồi mới nói nó là gì. Lần thứ hai đọc như công thức.
📌 **Profile hở:** [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]] `project_6` chỉ bắt 「不是…**而是**」 — dạng không có 而 lọt qua, nên `ai_tells_check` báo 0. Thêm mẫu hay không là việc riêng, Aurel quyết.

**Đề xuất:** dòng 153 bỏ phủ định — 「纲吉的直觉就在这个时候碰到了一点什么：这个人刚刚在心里翻过了一页……」. Giữ 65 và 91 (hai lần, như ch23/ch25).

## #5 · 🔵 thấp · Ba chuỗi liệt kê ba vế

**Dòng 33:** 学生… · 上班族… · 服务员… — **dòng 75:** 「从收银台、过道、靠里的长桌一路扫过去」 — **dòng 151:** 「餐厅里的人声、盘子碰在一起的声音、收银机弹开的声音，一下子都变得很远」.
**[[forbidden-patterns]] #3.** Tiền lệ ch27: ba vế **có lý do** thì giữ.

→ Dòng 33 dựng quán (lý do: đông người = không ai nổ súng). Dòng 75 là cái nhìn quét phòng của Kiritsugu — có lý do. Dòng 151 là ba âm thanh đều nhịp, chỉ để nói "xa đi" — yếu nhất.

**Đề xuất:** dòng 151 rút còn hai — 「餐厅里的人声和盘子碰在一起的声音，一下子都变得很远。」. Giữ 33, 75.

## #6 · 🔵 thấp · Dòng 133 đứng riêng một đoạn, nhắc lại điều vừa nhận ra bằng ẩn dụ

**Dòng 133:** 「那道看不见的缝，这一次终于摸到了边。」
**[[forbidden-patterns]] #1** (câu tổng kết cuối đoạn) · thẻ cảnh 03: 「**Không** câu kết đoạn nói hộ suy luận」.

→ Nó gọi lại hình ảnh ch30 (vết nứt) và **đúng mức** ("chạm mép"). Nhưng nó là một đoạn một câu đứng sau đoạn đã nói xong ý — dáng của câu tổng kết. Gắn với **#2**: nếu sửa #2 thành "biết một nửa", dòng 133 thành thừa; nếu giữ #2, dòng 133 là chỗ duy nhất hạ mức xuống.

**Đề xuất:** quyết cùng #2. Mình nghiêng: sửa #2, **bỏ** dòng 133.

## #7 · 🔵 thấp · Dòng 161 lặp nguyên câu ch34

**Dòng 161:** 「圣杯战争打到今天，还能坐下来说话的御主，已经不多了。少一个都可惜。」
**ch34 dòng 111:** 「只是说话。圣杯战争打到今天，还能坐下来说话的御主，已经不多了。」

→ Có thể đọc là Dazai **nói lại với Kiritsugu** câu đã nói với Tsuna — Tsuna nghe thấy. Nhưng chương không đánh dấu việc lặp (Tsuna không nhận ra), nên dễ đọc thành người viết chép. **Mình không chắc** đây là lỗi.

**Đề xuất:** giữ và thêm một nhịp Tsuna nhận ra câu này (một vế), hoặc đổi câu của Dazai.

## #8 · 🔵 thấp · So sánh sáo ở dòng 77

**Dòng 77:** 「纲吉很确定这一点，就像确定窗外的太阳还挂在天上。」

→ So sánh "chắc như mặt trời còn trên trời" là lối quen, không thêm gì cho câu 「纲吉很确定这一点」 vốn đã đủ.

**Đề xuất:** cắt vế so sánh.

## #9 · 🟡 chỉ tiêu · thoại 31,2 % · đoạn TB 34,1 · câu trung vị 15 · cảnh 01 1.052 chữ · thuật ngữ cảnh 02 = 2, cảnh 04 = 0

- Thoại: bản đầu **24,9 %**; lượt sửa ở `write-chapter` chuyển kể → thoại trong beat có sẵn, lên 31,2 %, rồi **dừng** — phần còn lại là nội tâm Tsuna (nhớ câu ch30, trực giác về câu bị giữ), phải ở trong lời kể. Plan đặt 45–55 % là **đặt quá cao** cho một chương POV Tsuna mà hai beat chính là nội tâm.
- Câu trung vị 15, đoạn TB 34,1: thoại Kiritsugu cụt (「换。」 · 「该你了。」 · 「死了？」) — cùng lý do ch35 #5.
- Cảnh 01 gấp đôi thẻ cảnh: phần chờ đợi + nhận ra người phụ nữ + Kiritsugu bước vào. Không có beat thừa; thẻ cảnh ước thấp.
- Thuật ngữ cảnh 02 (2/3), cảnh 04 (0/1): cả hai là cảnh đối thoại đời thường; đưa 御主/从者 vào cảnh 04 thì phải cho Dazai hoặc Tsuna nói chữ đó giữa quán ăn.

→ **Hỏi Aurel:** chấp nhận cho chương này?

---

## Tổng hợp

| # | Mức | Nhóm | Tóm tắt | Đề xuất |
|---|---|---|---|---|
| 1 | 🟠 | Tri thức | Kiritsugu gọi Kayneth là 「Lancer的御主」 — hắn biết lệnh chú ở tay Sola-Ui từ ngày 8 | 「肯尼斯和索拉乌」 |
| 2 | 🟠 | Tri thức / plan | 「现在他知道是哪里了」 khép câu trực giác ch30 (câu **lệnh chú**) — phần đó là ch38 | 「现在他知道了一半」 |
| 3 | 🔵 | Tri thức | 「扶着肯尼斯先生」 — Tsuna thêm chi tiết lời Kiritsugu không nói | 「和肯尼斯先生一起」, hoặc giữ |
| 4 | 🟠 | Văn phong | ba 「不是X，是Y」, hai cùng khuôn 「不是危险」 | bỏ phủ định ở dòng 153 |
| 5 | 🔵 | Văn phong | ba chuỗi ba vế | rút dòng 151 còn hai |
| 6 | 🔵 | Văn phong | dòng 133 dáng câu tổng kết | quyết cùng #2 — nghiêng bỏ |
| 7 | 🔵 | Văn phong | dòng 161 lặp nguyên câu ch34 | giữ + nhịp Tsuna nhận ra, hoặc đổi |
| 8 | 🔵 | Văn phong | so sánh sáo dòng 77 | cắt vế so sánh |
| 9 | 🟡 | Chỉ tiêu | thoại 31,2 % · đoạn 34,1 · câu 15 · cảnh 01 dài · thuật ngữ cảnh 02/04 | hỏi chấp nhận |

Không có lỗi 🔴. Không có lỗi luật cứng. 📌 Profile [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]] hở dạng 「不是X，是Y」 (không 而) — xem #4.

## Để `finalize-chapter` biết (không phải lỗi)

- **Kiritsugu: `unknown_to` → `suspected_by` (L2)** của [[archer-doi-master-sang-kirei]] — nghe 时臣「大概已经不在了」 và 「Archer还在」 từ Dazai (plan ch36, điểm 2 đã chốt ở arc). Trên trang **không** có việc hắn ghép với băng tối ngày 10.
- [[kirei-van-la-master]]: **không đổi**. Một dòng 📌: Kiritsugu **giữ lại** băng tối ngày 10 (C4).
- **Kiritsugu biết mặt Dazai, biết Dazai là Master của Caster**, và biết hai lần chặn (ch5, ch27) là của tổ Caster → [[kiritsugu]]. **Không** biết tên, căn cứ, Tsuna là gì.
- **Tổ Caster biết tổ Lancer rời nhà thờ bằng xe nhà thờ chạng vạng ngày 9** → [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/dazai|dazai]], [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/tsuna|tsuna]], [[sola-ui-doi-lenh-chu-lay-duong-ve]] (người biết thêm). Câu ch30 của Dazai 「教会会护着他们…」 được biết là **sai một nửa**.
- **Con bọ cổng lâu đài tắt tối ngày 13** (off-page, theo lời Dazai) → [[fact-cong-nghe-vongola-trong-chien-tranh]] ở mức **lời nói**: chương chưa cho thấy nó tắt thật. Kế hoạch 「河对岸」 của Kiritsugu → không thành, **off-page**.
- Hook: [[hook-to-caster-khac-che-to-saber]] thêm dòng ch36, giữ `partially_paid` (C7). [[hook-can-dazai-de-thang-archer]] thêm dòng chạm nhẹ, giữ `open`.
- 「Ghi cho ch37」 ở arc: Kiritsugu có thể tới 远坂宅 off-page (plan ch36, mục ảnh hưởng).

---

## Mode 3 — đã sửa (Aurel 25/09/2026: "đồng ý đề xuất, write-chapter Mode 3")

| # | Trước | Sau |
|---|---|---|
| 1 | 「第九天傍晚，Lancer的御主和跟着他的那个女人，从教会里出来」 | 「第九天傍晚，肯尼斯和索拉乌从教会里出来」 |
| 2 | 「现在他知道是哪里了。」 | 「现在他知道了一半。」 |
| 3 | 「她就扶着肯尼斯先生坐上车，走了。」 | 「她就和肯尼斯先生一起坐上车，走了。」 |
| 4 | 「碰到了一点什么。不是危险。是这个人刚刚……」 | 「碰到了一点什么：这个人刚刚……」 — 「不是X，是Y」 trong lời kể còn **2** (dòng 65, 91) |
| 5 | 「餐厅里的人声、盘子碰在一起的声音、收银机弹开的声音」 | 「餐厅里的人声和盘子碰在一起的声音」 |
| 6 | 「那道看不见的缝，这一次终于摸到了边。」 (đoạn riêng) | **bỏ** (đi cùng #2) |
| 7 | Dazai lặp câu ch34, không ai nhận ra | thêm 「纲吉认得这句话。昨天晚上，太宰治对他也是这么说的。」 (phương án thứ nhất) |
| 8 | 「纲吉很确定这一点，就像确定窗外的太阳还挂在天上。」 | 「纲吉很确定这一点。」 |
| 9 | thoại 31,2 % · đoạn 34,1 · câu 15 · cảnh 01 dài · thuật ngữ cảnh 02/04 | **chấp nhận** |

**Đo lại** (`style_metrics --json`, bản PR #64): 2.828 → **2.803** chữ Hán · thoại 31,3 % · đoạn TB 34,2 · câu trung vị 14,5 · câu ≥ 50 chữ 0,6 % · `？` 5,71 · `！` 1,07 · `……` 1,43 · `——` 0 · thuật ngữ 4,28/1000.

**Kiểm lại:** `ai_tells_check --project PPCT` exit **0** · `pov_leak_check` ×4 findings **0** (exit 1 — [[dazai-mang-ky-uc-kiep-truoc]] không có `leak_terms`) · grep 神父 · 绮礼 · 言峰 · 魔力 · 河对岸 · Azoth · 白兰 · 上辈子 · 梦 · 彭格列 · Lancer的御主 · 摸到了边 · 太阳还挂 · 扶着 = **0** · 不是危险 = 1 (dòng 65, giữ theo đề xuất).

