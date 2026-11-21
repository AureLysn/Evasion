---
id: review.PPCT.ch17-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-1-vuong-yen-ha-man
chapter: 17
canon_layer: user_canon
status: final
aliases: ["review ch17 PPCT", "kiem tra lien tuc ch17", "kiem tra van phong ch17"]
related: ["[[04_Manuscript/chapters/arc-1/ch17/ch17-chapter|ch17]]", "[[04_Manuscript/chapters/arc-1/ch17/ch17-plan|plan ch17]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/06_Alternate_Versions/branches/aurel-main|aurel-main]]"]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-15
---

# Review — PPCT ch17 (bản nháp tiếng Trung)

> Chỉ báo lỗi, **không sửa chương**. Sửa hay giữ là Aurel quyết. "Dòng" = số dòng trong `ch17-chapter.md` (tính cả frontmatter), bản 15/09/2026 **trước lượt sửa**.
>
> ✅ **15/09/2026 — Aurel: A1, sửa #1–#6, thêm ngân sách thoại vào khuôn thẻ cảnh.** Đã sửa cả sáu; số đo mục Style đã cập nhật.

## Continuity Review — 15/09/2026

**Kiểm máy:** `pov_leak_check.py --json` cho 4 thẻ cảnh → `findings: []`, exit 0. ⚠️ Không đủ tin với chữ Hán —  L29. Grep tay (白兰 · 马雷 · 前世 · 上辈子 · 言峰 · 绮礼 · 教会 · 卫宫 · 切嗣 · 人间失格 · 异能 · 家族 · 家人 · 愿望 · 不是人 · 宝物 · 狂战士 · 兰斯洛特 · 早就知道): 0 lần.

**Đối chiếu:** nguyên văn ch5–15, [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master|master]], `secrets/` (5), note nhân vật, `relationships/`, canon [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/iskandar|Iskandar]] · [[Hassan-of-the-Hundred-Faces]] · [[Kirei-Kotomine]], [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/06_Alternate_Versions/branches/aurel-main|aurel-main]], các decision 13–14/09.

| # | Loại | Mức | Vị trí | Chương viết | Nguồn nói | Trạng thái |
|---|---|---|---|---|---|---|
| 1 | knowledge boundary + canon | **high** | dòng 131 | Dazai: 「仓库街那天晚上，所有御主都亲眼看见Assassin死在Archer手里。死得那么干脆，偏偏还是当着所有人的面。」 | ch7, **tại** trận kho cảng, Rider nói về cái chết như việc **đã xảy ra trước đó**: 「原来如此，就是用这个杀了Assassin吗？」 — và Tsuna **ngạc nhiên**: 「“Assassin？杀了？”纲吉敲敲自己的耳机…」. Nguyên tác **không** có cảnh ai chứng kiến cái chết, **không** nói tổ Caster thấy, **không** đặt nó vào đêm kho cảng. Dazai chỉ có thể biết qua lời Rider (nghe qua tai nghe của Tsuna) | ✅ **sửa 15/09** → 「Assassin是死在Archer手里的——至少所有人都这么以为，仓库街那天晚上，连Rider都是这么说的。」; dòng 137 「那天晚上那出戏」 → 「Assassin死掉的那出戏」 |
| 2 | timeline | **medium** | dòng 41 | Waver: 「Assassin不是在仓库街那天晚上就被Archer杀掉了吗？！」 | Như #1: ở kho cảng Rider mới **nhắc lại** cái chết đã có từ trước. Waver biết tin, nhưng không phải chết "đêm kho cảng" | ✅ **sửa 15/09** → 「Assassin不是早就被Archer杀掉了吗？！」 |
| 3 | timeline (vượt ra ngoài chương) | **medium** | ghi chú dự án | dazai-nghi-master-assassin-cung-phe-archer: "dựng màn Assassin chết giả **đêm đầu**" · plan ch17 beat 4: "màn chết giả đêm đầu" · thẻ cảnh 03: "Đêm kho cảng, Assassin 'chết' dưới tay Archer, trước mặt mọi người" | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]] **không có** mốc cái chết của Assassin. Canon ([[Hassan-of-the-Hundred-Faces]]): Gilgamesh giết một cá thể *"in full view of the other Masters"* — wiki không ghi ngày giờ, không ghi nơi. Lỗi #1 bắt nguồn từ đây: **mình** đã viết nhầm vào thẻ cảnh | ✅ **sửa 15/09** theo A1 — assassin-chet-gia-truoc-dem-kho-cang; sửa kèm decision, plan beat 4, thẻ cảnh 03, [[assassin-chua-chet]], [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]] (thêm mốc "Trước ngày 1") |
| 4 | character state | low | dòng 147 | 「韦伯发现自己又坐回了城堡的花园里」 | Dòng 95: Rider đặt Waver **đứng** trên sườn cát. "Ngồi lại" không có nhịp chuyển. *Có thể hiểu là kết giới tan về chỗ cũ* — mình không chắc là lỗi | ✅ **sửa 15/09** → 「又回到了城堡的花园里」 |
| 5 | canon | low | dòng 95 | 「Archer也被划在了一旁」 | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/iskandar\|Iskandar]]: Rider "gom **đồng minh** ở chỗ an toàn, dàn **kẻ địch** trước quân". Archer không phải đồng minh cũng không là mục tiêu — canon không nói Archer đứng đâu. *Mình không chắc* | ✅ **sửa 15/09** → Rider chỉ xếp tổ khách; 「Archer没有等任何人安排，自己抱着手臂，站到了离沙丘不远的地方。」 |
| 6 | canon | low | dòng 35, 39 | 「白色面具」 | Mặt nạ trắng của Assassin: **chưa trích** trong [[Hassan-of-the-Hundred-Faces]] — mình nhớ từ canon | ✅ **sửa 15/09**: wiki xác nhận *"the standard skull mask"* (màu **không** ghi) → đổi 「白色面具」 ×6 thành 「骷髅面具」; ghi vào [[Hassan-of-the-Hundred-Faces]] |

### Không phải lỗi — đã kiểm và khớp

| Nhóm | Điểm | Căn cứ |
|---|---|---|
| Timeline | Đêm ngày 3 nối liền ch16; 「昨天在商场」 = ngày 2 | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]] |
| Knowledge | Dazai biết Assassin còn sống từ kho cảng | [[dazai-biet-assassin-con-song]] · ch7 |
| Knowledge | Dazai chỉ nghi, không tên Kirei: 「也可能不是。现在还只是猜。」 | dazai-nghi-master-assassin-cung-phe-archer |
| Knowledge | Waver biết tổ Caster là mafia (「不愧是黑手党」) | ch15 Dazai: 「我们是黑手党」 trước mọi người |
| Knowledge | Không ai nhận ra tổ Caster biết trước | dòng 51: Waver quy cho tính cách nghề nghiệp |
| Decision | Không hiệu ứng dị năng; tay trong túi; cát chỉ chạm giày (dòng 111) | [[nhan-gian-that-cach-vo-hieu-san-pham-ma-thuat]] |
| Canon | Mời rượu bị từ chối → Ionioi Hetairoi; sa mạc, nắng gắt, trời không mây; mỗi binh sĩ là Anh linh; Bucephalus; Rider xếp chỗ; Waver không bị rút ma lực; chưa tới trăm Assassin | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/iskandar\|Iskandar]] · [[Hassan-of-the-Hundred-Faces]] |
| Canon | Servant chết tan thành linh tử; dao của Assassin biến theo | nguyên tác ch6 「金色的光芒」; lore Fate |
| Nguyên văn | Lời Tsuna ch6 「越纯粹，就越强大」, qua tai nghe (dòng 115) | ch6: 「“这证明越纯粹，就越强大”，纲吉却有与太宰治不同的看法」 |
| Nguyên văn | Nguyện vọng thân thể thịt của Rider (dòng 103) | ch15 |
| Character state | Rider mặc áo phông (níu tay áo, dòng 53); áo khoác đôi của Dazai | ch12 · [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/iskandar\|Iskandar]] |
| Relationships | Rider→Waver 「小子」; Waver→Rider 「笨蛋」; Archer tự xưng 「本王」; Tsuna→Irisviel 「爱丽丝菲尔小姐」 (như ch16) | [[to-caster--to-rider]] · [[tsuna--gilgamesh]] |
| Hook | Archer để lại lời thách, không lặp nguyên văn ch15 | [[hook-archer-tuyen-chien-rider]] |
| Branch contract | Không vi phạm `forbid` | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/06_Alternate_Versions/branches/aurel-main\|aurel-main]] |

**Tổng:** 1 high · 2 medium · 3 low — ✅ **cả sáu đã sửa 15/09**.

### Câu hỏi cho Aurel

**A — Cái chết giả của Assassin xảy ra lúc nào, ai thấy, trong PPCT?** (cần để sửa #1–#3)
- **A1 — Theo canon, trước đêm kho cảng**, các Master thấy qua sứ ma; tổ Caster **không** thấy (khớp ch7: Tsuna ngạc nhiên). Dazai chỉ biết qua lời Rider ở kho cảng.
- **A2 — Tổ Caster có thấy** (vd qua giám sát Vongola ch3). Mâu thuẫn với câu hỏi 「Assassin？杀了？」 của Tsuna ở ch7 — khó.
- Với A1, lời suy luận của Dazai vẫn đứng được: *"một Servant bị Archer giết mà ai cũng tin, vậy mà giờ còn sống"* → cùng phe Archer.

## Style Review — 15/09/2026

**Cổng máy:** `style_metrics.py --json` → exit 1, `word_count: 321`, `term_density: 0.0` — **vô hiệu với chữ Hán** (L26). Không chạy `--write`. Số dưới đo bằng script đếm chữ Hán.

### Hard

| Luật | Đo được | Đạt |
|---|---|---|
| Dòng 续写 — [[ghi-chu-nguoi-viet-tiep-trong-du-canh]] | dòng 23 | ✅ |
| Tiêu đề `【太纲无差】反派战争17` | có | ✅ |
| Thoại `“”`, không 「」 | 「」 = 0 | ✅ |
| Kaomoji | 0 | ✅ |
| 「我」 ngoài thoại | 1 — dòng 179 「下次宴会我绝对不来了。韦伯想。」, **có tag** 韦伯想 | ✅ [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/hard-rules\|hard-rules]] §3 |
| Trích Dazai Osamu | không | ✅ |

### Mẫu cần tránh

| # | Mẫu | Vị trí | Mức |
|---|---|---|---|
| S1 | Liệt kê ba vế đều nhịp — 3 chỗ | dòng 39 「花坛边、廊柱后、城墙的阴影里」 · dòng 71 「干燥、灼热，裹着沙粒」 và 「城堡、花园、月亮全都不见了」 (hai chuỗi trong **một** đoạn) | low |
| — | "nhận ra rằng…", "không phải X mà là Y" | đã gỡ khi viết (grep 0) | ✅ |
| — | Mở đoạn bằng 「然后」 | 1 lần (dòng 37) | ✅ |

### Target

| Chỉ số | Chỉ tiêu | Đo được | Đạt |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.400) | **2.413** *(sau sửa; trước 2.384)* | ✅ |
| Thoại | 20–40 % | **18,3 %** *(sau sửa)* | ❌ thấp; tác giả thấp nhất 18,4 % |
| Mật độ thuật ngữ (chương dệt canon) | ≥ 9/1000 | **8,29** *(sau sửa)* (英灵 4 · 御主 4 · 从者 4 · 宝具 2 · 魔力 2 · 令咒 2 · 圣杯 1 · 黑手党 1) | ❌ thấp · không từ nào gánh một mình |
| Chữ Hán / đoạn — TB | 35–55 | **31,8** *(sau sửa)* | ❌ thấp |
| Đoạn ≥ 100 · câu ≥ 50 | ≤ 8 % · ≤ 12 % | 0 % · 2,9 % | ✅ |
| `？` · `！` · `……` · `——` / 1000 | ≥ 4 · ≥ 1 · 0,5–3,5 · ≤ 2,5 | 4,14 · 3,32 · 2,07 · 0,41 | ✅ |
| Motif mắt | ≥ 1 | 4 | ✅ |

### Tendency

| Thói quen | Nguyên tác | ch17 | Ghi chú |
|---|---|---|---|
| Móc xích câu cuối chương trước | 3 / 14 chỗ nối | có (dòng 31) | ✅ |
| Nội tâm 「X想。」 cuối đoạn ngắn, Waver là ống kính | Waver 4/8 lần | Waver ×3 | ✅ |
| Lời kể 太宰治, thoại 太宰 | | lời kể 太宰治; Dazai không bị gọi tên trong thoại | ✅ |
| Chữ Latin / 1000 | 15,46 | 17,41 | ✅ |
| Câu rất ngắn ≤ 4 chữ Hán / 1000 | 2,85–5,54 (mẫu 4 chương) | **7,46** | 🟡 cao (ch16: 9,47) |
| Ghi chú cuối chương | 13/15, TB 101 chữ Hán | 65, đề 续写者的话 | ✅ |

### ⚠️ Xu hướng qua hai chương

| Chỉ số | ch16 | ch17 | Chỉ tiêu |
|---|---|---|---|
| Thoại | 17,7 % | 18,3 % | 20–40 % |
| Đoạn TB | 32,3 | 31,8 | 35–55 |
| Câu ≤ 4 chữ / 1000 | 9,47 | 7,46 | nguyên tác 2,85–5,54 |

Hai chương liền lệch **cùng một kiểu**: thoại thiếu, đoạn vụn, nhiều câu rất ngắn. Theo `check-style`, lệch lặp lại là dấu hiệu ràng buộc **không tới được người viết** — sửa ở khuôn plan/thẻ cảnh hoặc ở dải chỉ tiêu, không vá từng chương.

✅ **15/09/2026 — Aurel chọn sửa khuôn:** `_Templates/Scene-Card.md` thêm `target_dialogue_ratio` + mục **Ngân sách**; `_Templates/Chapter-Plan.md` thêm cột **Thoại dự kiến**. Áp từ plan ch18. ch16, ch17 không làm lại.

**Tổng Style:** hard 0 lỗi · mẫu cần tránh 1 low · target lệch 3 · tendency lệch 1.

## Câu hỏi tổng hợp cho Aurel — trả lời 15/09/2026

> Aurel: A1 · sửa #1–#6 · thêm ngân sách thoại vào khuôn thẻ cảnh. Câu 3 — thoại 18,3 %, thuật ngữ 8,29, đoạn TB 31,8: Aurel **chuyển thẳng sang finalize** 15/09 mà không yêu cầu sửa → ghi là **chấp nhận cho chương này** (không phải chỉ tiêu mới).

*Bản ghi câu hỏi:*

1. **A** (ở trên) — cái chết giả của Assassin trong PPCT; kéo theo sửa #1, #2, #3.
2. #4–#6 (low) — sửa hay giữ?
3. Thoại 18,1 % · thuật ngữ 8,39 · đoạn TB 31,4 — chấp nhận cho chương này, hay sửa?
4. Xu hướng hai chương — xem lại **dải chỉ tiêu** chương dệt canon, hay thêm vào khuôn thẻ cảnh **ngân sách thoại theo cảnh**?
