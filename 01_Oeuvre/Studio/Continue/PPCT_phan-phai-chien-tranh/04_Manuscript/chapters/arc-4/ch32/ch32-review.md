---
id: review.PPCT.ch32-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-4-ba-dao-lenh-chu
chapter: 32
canon_layer: user_canon
status: active
aliases: ["review ch32 PPCT", "soat ch32", "check-continuity ch32", "check-style ch32", "chuong nha ch32 review"]
related: ["[[04_Manuscript/chapters/arc-4/ch32/ch32-chapter]]", "[[04_Manuscript/chapters/arc-4/ch32/ch32-plan]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten|phan-biet-cung-ten]]", "[[dazai-kiep-truoc]]", "[[giac-mo-dazai-chi-la-ky-uc-cua-tsuna]]", "[[nguyen-vong-to-caster-de-ngo]]", "[[tsuna-bi-byakuran-giet]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 24/09/2026, tren ban nhap ch32 (1.970 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien."
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-24
---

# Soát chương 32 — chương nhà

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát cũng là người viết bản nháp, trong cùng một phiên.** Muốn một lượt độc lập: agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×3 cảnh | **exit 0** · findings 0 · không bí mật nào "không kiểm được" (cả hai POV ở `known_by` [[dazai-mang-ky-uc-kiep-truoc]]) · archer-doi-master-sang-kirei được kiểm bằng `leak_terms` |
| grep tay | 戒指 · 指环 · 戒 · 枪响 · 棉花糖 · 龙 · 时臣 · 远坂 · Archer · 绮礼 · 令咒 · 抚平 = 0 |
| `style_metrics.py --write` | exit 1 — thuật ngữ < 9 (sàn **dệt canon**, không áp cho chương đời thường; plan ≥ 4) |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo cũ |

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Đêm ngày 10 → 「第十一天早上。」 → chiều ngày 11. Giấc mơ rơi đúng đêm ch31, **không** chữ nào nối. 🔵 **#3** 「他这辈子只出过一次门」 |
| Ranh giới tri thức | ✅ [[tsuna-bi-byakuran-giet]] ở mức C7: tên Byakuran, đi đàm phán, 「后来，也就再没有机会问了」 — **không** phòng họp, **không** phát súng. ✅ Không nhẫn. ✅ Tsuna **không** biết nội tâm Dazai kiếp trước (cảnh 01 nhìn qua mắt cậu). ✅ Tổ Caster: 「昨天晚上，屏幕上什么也没有发生」 — đúng niềm tin sai, không lộ ch31 |
| Trạng thái nhân vật | 🔴 **#1** Dazai kiếp trước **cùng khuôn mặt** với Dazai thế giới B. ✅ Tsuna quen 「卫衣」 ở căn cứ (ch3). ✅ 「上次我可是一局都没有赢过」 — ch20 thua ba ván liền |
| Luật thế giới | ✅ Giấc mơ = ký ức Tsuna **đã trải qua** — [[giac-mo-dazai-chi-la-ky-uc-cua-tsuna]]: phòng mơ (tiền truyện), hành lang, cửa. ✅ 「从者本来不需要睡觉」 — khớp ch25 (Lancer 「从者不需要睡眠」) |
| Quan hệ / xưng hô | ✅ 太宰 / 纲吉; lời kể 太宰治 — [[dazai--tsuna]] · [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature\|signature]] |
| Canon / nguồn | ✅ Bốn câu nguyên văn tiền truyện thượng (bài 015 dòng 54–58) đúng chữ. ✅ Giọng không tên 「十代目……去……小心……」 (ch10) — **không** gắn tên. 🔵 **#2** hai chi tiết mới |
| Hợp đồng nhánh | ✅ Không chạm mục `Cấm`. 🔴 **#1** chạm luật cứng §6 (phân biệt cùng tên) |

**Nguyện vọng Dazai** ([[nguyen-vong-to-caster-de-ngo]]): ✅ không nói; cử chỉ vuốt áo **không** trích 「抚平西服上的皱褶」, **không** giải thích (「歪了。」). Câu Tsuna đoán 「你不用去」 là **đoán của Tsuna**, Dazai không xác nhận.

---

## #1 · 🔴 cao · Dazai kiếp trước và Dazai thế giới B **cùng một khuôn mặt**

**Chương, dòng 39:** 「对面坐着一个人。那张脸，太宰治每天早上都会在镜子里看见，只是比现在的他要大上几岁，头发也更长一些。」

**[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten|phan-biet-cung-ten]]** (luật cứng §6, `strength: hard`): Dazai thế giới B ([[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/dazai|dazai]]) và Dazai kiếp trước ([[dazai-kiep-truoc]]) là **hai thực thể**; Dazai kiếp trước 「chỉ tồn tại trong tiền truyện và **ký ức** của Dazai thế giới B」. **[[dazai-kiep-truoc]] — Ngoại hình:** 「桃花眸」, **tóc đen xoăn hơi rối**, năm 18 mặc đồng phục đen.

→ Câu này **gộp hai thực thể về ngoại hình** — một fact không nguồn nào có, và ngoại hình ghi trong note thì khác (Dazai BSD không phải tóc đen xoăn). Người đọc sẽ đọc là "cùng một người, chỉ lớn hơn". Đây là **lỗi**, không phải khẩu vị.

**Hướng sửa:** tả bằng ngoại hình trong nguồn, và cho Dazai nhận ra bằng **ký ức**, không bằng gương:
「对面坐着一个人，黑色的头发有些卷，也有些乱。那不是太宰治每天早上在镜子里看见的脸，可他一眼就认出来了，那是上辈子的自己。」

## #2 · 🔵 thấp · Hai chi tiết mới không nguồn

**Dòng 45:** 「每一次提起，纲吉都要揉一揉眉心」 — tiền truyện chỉ có 「最近让纲吉头疼的家族的首领」. **Dòng 55:** 「墙上的画一幅接着一幅往后退」 — trụ sở Vongola.

→ Nhỏ, không mâu thuẫn; dòng 45 là cách diễn 「头疼」 thành hành vi. **Mình không chắc** là lỗi. Giữ được.

## #3 · 🔵 thấp · 「他这辈子只出过一次门」

**Dòng 79.** 「这辈子」 với Tsuna lúc này (Anh linh ở thế giới B) dễ đọc thành "đời này" — trong khi ý là **kiếp ở thế giới A**. [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten|phan-biet-cung-ten]] cũng tách "Tsuna thế giới A" khỏi "Anh linh".

**Hướng sửa:** 「那样的日子，他那一辈子只出过一次门。」

---

# Check-style

## Bảng chỉ tiêu

Đo bằng `han_metrics.py`. Chương đời thường + giấc mơ, chỉ tiêu theo plan ch32.

| Chỉ số | Chỉ tiêu | Đo | Kết luận |
|---|---|---|---|
| Chữ Hán thân truyện | sàn 1.500 · plan ~2.100 | 1.970 | ✅ |
| **Thoại** | 35–55 % | **21,4 %** | 🟡 **dưới dải** — đã báo lúc viết; chờ Aurel |
| **Chữ Hán/đoạn TB** | 35–55 | **32,3** | 🟡 **dưới dải** — chờ Aurel |
| Đoạn ≥ 100 chữ | ≤ 8 % | 3,3 % | ✅ |
| Câu trung vị | 17–20 | 17 | ✅ chạm sàn |
| Câu ≥ 50 chữ | ≤ 12 % | 2,0 % | ✅ |
| Câu ≤ 4 chữ | ≤ 5,5/1000 | 0,51 | ✅ |
| `？` · `！` · `……` | ≥ 4 · ≥ 1 · 0,5–3,5 | 9,64 · 1,02 · 3,05 | ✅ |
| `——` | ≤ 2,5 | 0 | ✅ |
| Thuật ngữ | ≥ 4/1000 (plan) | 5,58 | ✅ — 直觉 4, không từ nào gánh |
| Motif mắt | ≥ 1 | 7 | ✅ |
| Lượt thoại theo cảnh | ≥ 3 · 10 · 4 | 5 · 20 · 10 | ✅ |
| Thuật ngữ theo cảnh | ≥ 3 · 4 · 2 | 3 · 4 · 4 | ✅ |
| Thoại theo cảnh | ~15 · 50 · 40 % (ước lượng thẻ) | 6 · 31 · 31 % | — cảnh 02 hụt nhiều nhất |

## Luật cứng

| Luật | Kết quả |
|---|---|
| §1 Thoại trong `“”`, không `「」` | ✅ 0 (câu đoán của Tsuna dùng `‘’` lồng trong `“”`) |
| §2 Không kaomoji | ✅ |
| §3 Không 「我」 ngoài ngoặc kép | ✅ 0 |
| §5 Tiêu đề 【太纲无差】反派战争32 · dòng ※ | ✅ |
| §6 Phân biệt cùng tên | 🔴 **#1** |
| Tag trước ngoặc | ✅ grep theo dòng = 0 |

## #4 · 🔵 thấp · 「什么也没有发生」 hai lần trong một chương

**Dòng 109:** 「好像刚才什么也没有发生」 (sau cử chỉ). **Dòng 143:** 「昨天晚上，屏幕上什么也没有发生」 (câu châm biếm ch31).

→ Câu thứ hai là câu **có việc** (người đọc biết đêm qua có chuyện); câu thứ nhất làm nó mòn trước. 「没有」 cả chương 9,1/1000 — ngang ch28 (8,9), không phải bất thường.

**Hướng sửa:** dòng 109 → 「……脸上又是平常那副懒洋洋的样子，好像刚才那一下只是顺手。」

## Nhận xét về giọng

- Mở bằng câu ngắn đứng riêng (「太宰治知道自己又沉下去了。」) và mốc thời gian đứng riêng (「第十一天早上。」) — đúng [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature|signature]].
- Khép bằng **hình ảnh** (cổ áo phẳng), không tổng kết — đúng bài học ch30 #5.
- 「纲吉放在床单上的手停住了」 vọng ch10 「纲吉放在床沿的手抖了一下」 — cùng hình ảnh, khác chữ; có chủ đích. Khẩu vị.
- Tag 「X说：」 19 lần — ngang ch28 (19), ch30 (24); cùng nhận xét các chương trước.

## Còn treo — cần Aurel

1. **#1** (cao) — sửa không. Mình đề xuất: **có** (luật cứng §6).
2. #2 · #3 · #4.
3. **Thoại 21,4 %** và **đoạn TB 32,3** — chấp nhận cho chương này, hay viết lại cảnh 02 cho nhiều thoại hơn? Mình nghiêng về **chấp nhận**: chương giấc mơ + buổi sáng im lặng là chủ ý của plan (C3–C4: câu hỏi **không** được trả lời bằng lời); kéo thoại lên nghĩa là để Dazai nói nhiều hơn đúng chỗ plan muốn hắn im.

## Còn treo sang `finalize-chapter`

- [[hook-dazai-mo-tiep-kiep-truoc]]: đẩy (giấc mơ lần ba lên trang), giữ `partially_paid`.
- Event mới 🟡: Dazai mơ buổi trước cuộc đàm phán.
- [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/tsuna|tsuna]] · [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/dazai|dazai]]: trạng thái sau ch32.
- Arc 4: ghi C7 (gỡ một phần cấm [[tsuna-bi-byakuran-giet]] cho ch32).

---

## Đã sửa — write-chapter Mode 3, Aurel 24/09/2026 ("sửa theo đề xuất")

| # | Trước | Sau |
|---|---|---|
| #1 (cao) | 「对面坐着一个人。那张脸，太宰治每天早上都会在镜子里看见，只是比现在的他要大上几岁，头发也更长一些。」 | 「对面坐着一个人，黑色的头发有些卷，也有些乱。那不是太宰治每天早上在镜子里看见的脸，可他一眼就认出来了，那是上辈子的自己。」 — ngoại hình theo [[dazai-kiep-truoc]]; nhận ra bằng **ký ức** |
| #3 | 「他这辈子只出过一次门」 | 「他那一辈子只出过一次门」 |
| #4 | 「好像刚才什么也没有发生」 | 「好像刚才那一下只是顺手」 |
| #2 | — | **giữ** (đề xuất của review) |
| Thoại 21,3 % · đoạn TB 32,5 | — | **chấp nhận cho chương này** (đề xuất của review) |

Số đo sau Mode 3: 1.981 chữ Hán · thoại 21,3 % · đoạn TB 32,5 · câu trung vị 17 · thuật ngữ 5,55/1000 · `？`/`！`/`……` 9,59 / 1,01 / 3,03. `pov_leak_check` ×3: findings 0 · tag sau ngoặc = 0.
