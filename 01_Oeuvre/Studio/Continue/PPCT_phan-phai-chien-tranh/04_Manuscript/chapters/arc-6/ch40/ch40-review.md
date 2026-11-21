---
id: review.PPCT.ch40-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-6-co-xe-gia
chapter: 40
canon_layer: user_canon
status: active
aliases: ["review ch40 PPCT", "soat ch40", "check-continuity ch40", "check-style ch40", "soat xe gia Excalibur"]
related: ["[[04_Manuscript/chapters/arc-6/ch40/ch40-chapter]]", "[[04_Manuscript/chapters/arc-6/ch40/ch40-plan]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master|master]]", "[[hook-tsuna-nhin-saber-im-lang]]", "[[hook-archer-tuyen-chien-rider]]", "[[Lancelot-Berserker]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 30/09/2026, tren ban nhap ch40 (2.484 chu Han). Nguoi soat cung la nguoi viet ban nhap va planner trong cung phien."
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-30
---

# Soát chương 40 — Giả

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát, người viết bản nháp và planner là một, trong cùng một phiên.** Muốn một lượt soát độc lập thì dùng agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×4 cảnh | Đã đối chiếu 6 bí mật, không phát hiện rò rỉ |
| Grep tay | 令咒 · 言峰 · 绮礼 · 神父 · 间桐 · 雁夜 · 兰斯洛特 · Lancelot · 容器 · 时臣 · Azoth · 很久 · 良久 · 意识到 · 这才 · 挑不出 · 像在念 = **0**. 「我」 ngoài ngoặc kép = 0 |
| `ai_tells_check --project PPCT` | Bản đầu exit **2**: `project_3` ×1 — 「”他说得很慢」, tag thoại đặt sau ngoặc. Writer đã tách câu đó thành đoạn riêng; chạy lại exit **0** |
| `style_metrics --write --json` | exit 0. 2.484 chữ, trên sàn 1.500 |
| `chapter_gate` | không chạy được: [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells\|ai-tells]] không có khối `gate:` |

## Tám nhóm — check-continuity

| # | Nhóm | Kết quả |
|---|---|---|
| 1 | Timeline | ❌ **#1** — 「前天」 phải là 「昨天」. Còn lại khớp: 「第十五天晚上」 · 「从第十二天下午那只虫子被人取走开始」 ([[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]]: chiều ngày 12, ch34) |
| 2 | Ranh giới hiểu biết | ✅ L3 không tên: 「大概，又是那个在教会里的人」 · 「就只能叫猜」. Irisviel chỉ **đoán** (「看不清脸」 · 「大概不会有第二个」). Chuồn chuồn mất dấu **trước** chỗ giao người. Tsuna **tin** Saber đuổi nhầm; Dazai **không** khẳng định (「看不见她有没有看见」) — khớp canon: Saber vỡ lẽ trước khi chém ([[Lancelot-Berserker]] dòng 67, 70) |
| 3 | Trạng thái nhân vật | ✅ chuồn chuồn ăn ma lực của Tsuna (ch37). Lời hứa về con bọ lâu đài (ch36): 「那是城堡。路又不是城堡的。」 |
| 4 | Luật thế giới | ✅ Khói đen rò ra khi giả dạng là **lựa chọn của fic** (plan C3) — lời kể **không** nói nó là cơ chế |
| 5 | Quan hệ, xưng hô | ✅ 「爱莉斯菲尔小姐」 ([[tsuna--artoria]]) · 「纲吉」 / 「太宰」 ([[dazai--tsuna]]). Xem **#3** |
| 6 | Canon | ✅ Kẻ giả không có chiến xa, không sấm (a2). Đuổi từ Shinto → quốc lộ → đường núi. Xe thật quay đầu lao vào Saber, rồi mới có cột sáng. Rider ôm Waver thoát (e1). Không nêu kết cục. Xem **#2**, **#4** |
| 7 | Hợp đồng nhánh | ✅ không phạm `forbid` |
| 8 | Rò kế hoạch | ✅ Beat của ch41–43 (Maiya, Kiritsugu, quyết định không can thiệp) **không** lên trang. 「要告诉谁吗？」 → 「告诉谁？」 chưa phải quyết định. Cảm giác không yên ở cảnh 01 có `foreshadow: hint`, và không có nội dung |

## Vấn đề

| # | Loại | Mức | Chỗ trong chương | Chi tiết | Note đối chiếu |
|---|---|---|---|---|---|
| 1 | timeline | **medium** | cảnh 02, Dazai: 「这座城里不想被人看见的人，我们**前天**刚数过一个。」 | Việc "đếm" đó là ch38, **sáng ngày 14**. Ch40 là tối ngày 15, nên đúng phải là 「**昨天**」. Người đọc theo sát ngày sẽ vấp | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]] dòng ch38: 「**Ngày 14**, sáng → trưa」 |
| 2 | chi tiết thêm | low | cảnh 03: 「拉车的是两头雄壮的公牛」 | Hai con bò kéo xe: canon Fate/Zero, nhưng [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/iskandar\|iskandar]] và note canon trong vault **không** ghi. Mình **không** nghi là sai, chỉ là chưa có nguồn trong vault | [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/characters/iskandar\|Iskandar]] (không ghi) |
| 3 | chi tiết thêm | low | cảnh 01: 「往城西那片黑沉沉的山林」 · 「越过河」 | Rừng Einzbern "ở phía tây", và căn cứ tổ Caster ở phía bên kia sông: **chưa có nguồn** trong vault ([[lau-dai-einzbern]], [[can-cu-to-caster]]). Sau khi lên trang, hai chi tiết này thành neo cho các chương sau | [[can-cu-to-caster]] |
| 4 | canon quá nguồn | low | cảnh 03: 「那是宝具的光。」 | Lời kể nói chắc đó là **bảo cụ**. Tsuna đoán được điều này là hợp lý (Servant tung một cột sáng như vậy), và câu không gọi tên Excalibur. Ghi lại để biết | 20260929-canon-arc-6-co-xe-gia e1 |
| 5 | xưng hô | low | cảnh 02: Tsuna nói 「他身边也没有韦伯」 | [[to-caster--to-rider]] chỉ ghi Dazai gọi 「韦伯」; chưa ghi Tsuna gọi Waver thế nào. Không mâu thuẫn gì | [[to-caster--to-rider]] |

Không có vấn đề `high`.

## Bảng văn phong — check-style

Loại chương: **POV Tsuna, nửa suy luận nửa dệt canon**.

| Chỉ số | Chỉ tiêu | Đo | Loại | Kết luận |
|---|---|---|---|---|
| Chữ Hán thân truyện | sàn 1.500 · plan ~2.600 | **2.484** | sàn | ✅ (cảnh 01: 489/450 · 02: 911/850 · 03: 697/800 · 04: 387/500) |
| Thoại | 30–40 % (quy ước chương POV Tsuna, từ ch38) | **26,6 %** | quy ước | ❌ dưới. Cảnh 03 chỉ 6 % — cảnh nhìn từ xa |
| Lượt thoại | ≥ 6 · 10 · 4 · 6 | 16 · 26 · 9 · 15 | — | ✅ |
| Chữ Hán / đoạn TB | 35–55 | **25,6** | dải / tendency | ❌ — **chương thứ sáu liền** dưới dải (xem xu hướng) |
| Câu trung vị | tendency | 13 | tendency | dưới — như ch38, ch39 |
| Câu ≥50 chữ | ≤ 12 % | 0,6 % | trần | ✅ |
| `？` / 1000 | ≥ 4 | 5,24 | sàn | ✅ |
| `！` / 1000 | ≥ 1 | **0,4** | sàn | ❌ dưới — chỉ có một 「Saber！」. Plan gợi ý 「太宰！」 lúc cỗ xe gãy; bản nháp dùng 「……太宰。」 |
| `……` / 1000 | 0,5–3,5 | 2,42 | dải | ✅ |
| `——` / 1000 | ≤ 2,5 | 0 | trần | ✅ |
| Thuật ngữ / 1000 | ghép hai chế độ: **chưa có sàn** · plan ~5,4 | **4,43** | — | dưới plan. Theo cảnh: 3 · 3 · 2 · 0, so với plan ≥ 2 · 5 · 6 · 1 |
| Motif mắt | ≥ 1 | có (「纲吉下意识地眯起了眼睛」 · ống kính) | sàn | ✅ |
| Ghi chú tác giả mô phỏng | có | có | — | ✅ |

### Xu hướng — đoạn TB

| ch35 | ch36 | ch37 | ch38 | ch39 | **ch40** |
|---|---|---|---|---|---|
| 30,7 | 34,2 | 27,1 | 29,4 | 28,4 | **25,6** |

Sáu chương liền dưới dải 35–55, và ch40 thấp nhất. Nguyên nhân chính: thoại ngắn từng dòng và các đoạn một câu. Việc này đã mở cho `analyze-style` từ review ch39 (S3), **chưa** làm.

### Đọc tay — tật AI

- Câu tổng kết cuối đoạn: 「两个从者之间，只有一方能从这样的光里走出来。」 — writer đã **bỏ** trước khi đo, vì câu vừa nói hộ vừa kịch hoá. Câu 「好像什么都没有发生过」 hơi sáo, nhưng là hình ảnh, không phải kết luận. Giữ.
- 「不是X，是Y」: 1 (「先动起来的不是那条路，是画面的边缘」) — một lần, có chủ đích nhịp. 「不是…而是」: 0.
- So sánh 「像」: 5 / 2.484 (2,0/1000). Không dày.
- Liệt kê ba vế đều: 「没有笑声。他身边也没有韦伯。」 + khói đen — ba lý do, nhưng tách qua hai lượt thoại và một đoạn tả. Không sáo.

## Đề xuất cho Aurel *(không tự sửa)*

| # | Việc | Đề xuất |
|---|---|---|
| S1 | **#1** 「前天」 → 「昨天」 | **Sửa** — lỗi timeline thật, một chữ |
| S2 | Thoại 26,6 % dưới quy ước 30–40 % | **Giữ.** Cảnh 03 là cảnh nhìn từ xa, thêm thoại vào sẽ phá nhịp. *Khác:* thêm 2–3 lượt ở cảnh 03 (Dazai hỏi hướng đi, Tsuna đáp) → khoảng 29 % |
| S3 | `！` 0,4 | **Sửa một chữ**: 「……太宰。」 → 「太宰！」 lúc cỗ xe gãy, như plan gợi ý → 0,8/1000, vẫn dưới sàn. *Khác:* giữ — sự im lặng ở chỗ đó là cố ý |
| S4 | Thuật ngữ 4,4 (plan 5,4) | **Giữ** — chương không có sàn cho loại ghép; không nhồi |
| S5 | Đoạn TB 25,6 | **Giữ** ở chương này; đường nền sáu chương là việc của `analyze-style` |
| S6 | #2–#5 | Không sửa. #3: nếu giữ, `finalize-chapter` ghi "rừng Einzbern phía tây, qua sông" vào hai note địa điểm, hoặc đánh dấu là chi tiết chưa có nguồn |
