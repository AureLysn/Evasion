---
id: review.PPCT.ch41-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-6-co-xe-gia
chapter: 41
canon_layer: user_canon
status: active
aliases: ["review ch41 PPCT", "soat ch41", "check-continuity ch41", "check-style ch41", "soat lau dai trong"]
related: ["[[04_Manuscript/chapters/arc-6/ch41/ch41-chapter]]", "[[04_Manuscript/chapters/arc-6/ch41/ch41-plan]]", "[[04_Manuscript/chapters/arc-6/ch40/ch40-chapter]]", "[[kiritsugu]]", "[[maiya]]", "[[kirei-van-la-master]]", "[[Command-Spells]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 30/09/2026, tren ban nhap ch41 (1.705 chu Han). Nguoi soat cung la nguoi viet ban nhap va planner trong cung phien. The canh chua qua plan-reviewer."
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-30
---

# Soát chương 41 — Lâu đài trống

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát, người viết bản nháp và planner là một, trong cùng một phiên.** Thẻ cảnh **chưa** qua plan-reviewer. Muốn soát độc lập: agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×4 cảnh | Đã đối chiếu 6 bí mật, **0** rò rỉ. 2 bí mật chưa có `leak_terms` chữ Hán → grep tay: 纲吉 · 太宰 · 白兰 · 前世 = 0 |
| Grep tay | 言峰 ×1 · 绮礼 ×1 (đúng plan C4). 容器 · 间桐 · 雁夜 · Berserker · 时臣死 · 已经死 · 被杀 · Azoth · 很久 · 良久 · 意识到 · 这才 · 挑不出 · 像在念 = **0**. 「黑色」 ×1 = áo của vị linh mục trên băng. 「我」 ngoài ngoặc kép = 0 |
| `ai_tells_check --project PPCT` | exit **0** |
| `style_metrics --write --json` | exit 0. 1.705 chữ, trên sàn 1.500 |
| `chapter_gate` | không chạy được: [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells\|ai-tells]] không có khối `gate:` |

## Tám nhóm — check-continuity

| # | Nhóm | Kết quả |
|---|---|---|
| 1 | Timeline | ✅ 「第十五天晚上」 · 「快到后半夜」. Băng: 「第十四天中午」 (chuồn chuồn — ch38), 「第十五天中午」 (linh mục — ch39), 「第十天夜里」 (ch35). Thứ tự khớp ch40: Saber được dịch chuyển về, đuổi đi trước khi Kiritsugu tới (Maiya: 「Saber……已经追出去了」) |
| 2 | Ranh giới hiểu biết | ✅ Về Archer, Kiritsugu vẫn **L2**: 「这两件事之间有没有关系，他不知道。他只是把它们放在一起。」 Tên Kirei một lần, không kết luận "Master của Archer". Hắn biết Dazai là 「Caster的御主」 — đúng [[kiritsugu]] (ch36). Không biết căn cứ, Tsuna, Berserker, Kariya. Xem **#1** |
| 3 | Trạng thái nhân vật | ✅ Lệnh chú của Kiritsugu 3 → 2. Maiya **sống**, còn tỉnh, súng trong tay (maiya-trong-thuong-song). Saber về, không tả phương tiện (M6 plan) |
| 4 | Luật thế giới | ✅ Dùng lệnh chú dịch chuyển Servant (canon e1). 「门上没有魔术的痕迹，只有力气，从者的那种力气」. Xem **#2** |
| 5 | Quan hệ, xưng hô | ✅ Saber gọi 「切嗣」; Kiritsugu **không** trả lời Saber (ch35). Maiya gọi Irisviel 「夫人」 — canon, chưa có note quan hệ ghi (low, không mâu thuẫn) |
| 6 | Canon | ✅ Maiya còn tỉnh, giục Saber đuổi (canon c2 — **bỏ** lời trăng trối). Kiritsugu tới Kirei qua loại trừ (e1), **sớm hơn** canon nhờ chi tiết của Maiya. Camera cổng không ghi gì (C10). Đường núi phía bắc (C11) |
| 7 | Hợp đồng nhánh | ✅ không phạm `forbid` |
| 8 | Rò kế hoạch | ✅ Không beat nào của ch42–43 lên trang. Kiritsugu **không** có kế hoạch, **không** nói với ai. Phép xoá: bỏ 「言峰绮礼。」 thì chương vẫn đứng, chỉ mất điểm rơi của cảnh 04 — đúng plan C4 |

## Vấn đề

| # | Loại | Mức | Chỗ trong chương | Chi tiết | Note đối chiếu |
|---|---|---|---|---|---|
| 1 | cấp bí mật | low | cảnh 04: 「一个输掉了的御主，却一直没有离开这座城市；一个说自己什么也不做的人，却一直在看。」 | Kiritsugu giờ **nghi** Kirei đứng sau vụ bắt cóc, và đặt Kirei **cạnh** việc Tokiomi "không còn". Đây không phải L3 về Archer (không có lệnh chú, không có "người cấp ma lực"). `finalize-chapter` cần ghi dòng 📌 cho archer-doi-master-sang-kirei và [[kirei-van-la-master]], frontmatter **không** đổi | archer-doi-master-sang-kirei · [[kirei-van-la-master]] |
| 2 | chi tiết thêm | low | cảnh 02: 「他把右手从方向盘上抬起来，手背上的三道令咒」 | Lệnh chú Kiritsugu ở **tay phải**: [[Command-Spells]] chỉ ghi "thường ở mu bàn tay phải", không riêng Kiritsugu. **Không chắc** — không có nguồn | [[Command-Spells]] luật 5 |
| 3 | chi tiết thêm | low | cảnh 03: 「椅背上搭着一条白色的披肩」 | Khăn choàng trắng của Irisviel: chi tiết fic (plan C8, writer chọn). Không mâu thuẫn | [[irisviel]] |
| 4 | chi tiết thêm | low | cảnh 02: 「北边的山路，窄，没有灯，舞弥平时进出城堡走的就是这一条」 | Đường núi phía bắc: **lựa chọn của fic** (plan C11). `finalize-chapter` ghi vào [[lau-dai-einzbern]] kèm nhãn "không có nguồn canon", như ch40 #3 | [[lau-dai-einzbern]] |

Không có vấn đề `high` hay `medium`.

## Bảng văn phong — check-style

Loại chương: **dệt canon, POV Kiritsugu, không đánh trên trang**.

| Chỉ số | Chỉ tiêu | Đo | Loại | Kết luận |
|---|---|---|---|---|
| Chữ Hán thân truyện | sàn 1.500 · plan ~2.200 | **1.705** | sàn | ✅ trên sàn; dưới dự kiến ~23 %. Theo cảnh: 445/450 · 268/350 · **498/800** · 494/600 |
| Thoại | dệt canon, sàn ~20 % · plan ~20 % | **5,8 %** | sàn | ❌ **dưới xa**. Theo cảnh: 1 % · 8 % · **11 % (plan 30 %)** · 4 % |
| Lượt thoại | ≥ 2 · 1 · 6 · 2 | 1 · 2 · 7 · 3 | — | cảnh 01 thiếu một lượt (Kiritsugu không nói, Saber hỏi một câu) |
| `？` / 1000 | ≥ 4 | **1,17** | sàn | ❌ dưới |
| `！` / 1000 | ≥ 1 | **0,59** | sàn | ❌ dưới — một 「切嗣！」 |
| `……` / 1000 | 0,5–3,5 | 1,17 | dải | ✅ |
| `——` / 1000 | ≤ 2,5 | 0 | trần | ✅ |
| Câu ≥50 chữ | ≤ 12 % | 0 % | trần | ✅ — plan muốn vài câu dài (giọng Kiritsugu); **không có** câu nào |
| Thuật ngữ / 1000 | dệt canon ≥ 9 · plan ~5 | 4,69 | sàn | dưới sàn, sát plan (lệch có chủ đích, đã khai) |
| Chữ Hán / đoạn TB | 35–55 | 29,4 | dải / tendency | dưới — **chương thứ bảy liền** |
| Motif mắt | ≥ 1 | có (「它的眼睛里闪了一点红光」 · màn hình băng ghi) | sàn | ✅ |

### Đọc tay — tật AI

- Câu kết đoạn nói hộ: 「做这件事的东西，从来就没有想过要把自己藏起来。」 — nói hộ **một chút**, nhưng là phán đoán của Kiritsugu về dấu vết (giọng hắn ở ch19 cũng thế). 「她还活着。」 — một dòng đứng riêng, sát ranh giới kịch hoá. **Giữ**, để Aurel đọc.
- 「不是…而是」: 0 · 「像」: 3 · liệt kê ba vế: không.

### Nhận định

Chương **gọn và lạnh** như giọng Kiritsugu ở ch35. Nhưng so với plan, nó **mỏng**: cảnh 03 chỉ 498/800 chữ, thoại 5,8 %, và không có câu dài nào. Plan đặt thoại 30 % cho cảnh Maiya, nhưng bản nháp giữ lời Maiya **cụt** hơn plan nghĩ. Đây là lệch **target**, không phải lỗi.

## Đề xuất cho Aurel *(không tự sửa)*

| # | Việc | Đề xuất |
|---|---|---|
| S1 | Thoại 5,8 % · `？` 1,17 · cảnh 03 ngắn | **Sửa nhẹ (write-chapter Mode 3):** cảnh 03 — thêm 2–3 lượt Maiya/Kiritsugu có chất (Maiya hỏi 「夫人呢？」; Kiritsugu hỏi hướng kẻ kia đi → 「往城里」); cảnh 01 — Saber hỏi thêm một câu về băng, không được trả lời. Dự kiến thoại ~12 %, `？` ~3. *Khác:* **giữ** — giọng Kiritsugu, ch35 cũng chỉ 31 % với **hai** người nói nhiều hơn |
| S2 | Không có câu ≥ 50 chữ | **Sửa nhẹ cùng S1:** gộp đoạn tả cánh cửa bị phá thành một câu dài |
| S3 | `！` 0,59 | **Giữ** |
| S4 | Đoạn TB 29,4 | **Giữ** — đường nền bảy chương, việc của `analyze-style` |
| S5 | #1–#4 | Không sửa chương. #1, #4 ghi khi `finalize-chapter` |
