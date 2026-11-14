---
id: review.PPCT.ch39-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-6-co-xe-gia
chapter: 39
canon_layer: user_canon
status: active
aliases: ["review ch39 PPCT", "soat ch39", "check-continuity ch39", "check-style ch39", "soat giao dich Kirei Kariya"]
related: ["[[04_Manuscript/chapters/arc-6/ch39/ch39-chapter]]", "[[04_Manuscript/chapters/arc-6/ch39/ch39-plan]]", "[[kariya]]", "[[kirei]]", "[[berserker]]", "[[kariya-khong-biet-tokiomi-chet-kirei-hua-chen]]", "[[kirei-nap-mot-dao-lenh-chu-cho-kariya]]", "[[20260929-canon-arc-6-co-xe-gia]]", "[[Kariya-Matou]]", "[[Lancelot-Berserker]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten|phan-biet-cung-ten]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 29/09/2026, tren ban nhap ch39 (1.655 chu Han). Nguoi soat cung la nguoi viet ban nhap trong cung phien."
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-29
---

# Soát chương 39 — Giao dịch

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.
> ⚠️ **Người soát và người viết bản nháp là một, trong cùng một phiên.** Người viết còn là planner, tức là người biết mọi bí mật. Muốn một lượt soát độc lập thì dùng agent `continuity-reviewer`.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` ×3 cảnh | Không phát hiện rò rỉ. Exit 1 ở cả ba, vì 3 bí mật không có `leak_terms` chữ Hán: [[assassin-chua-chet]] · [[dazai-mang-ky-uc-kiep-truoc]] · [[kiritsugu-la-master-that]] |
| Grep tay cho 3 bí mật trên | Assassin · 暗杀 · 哈桑 · 假死 · 前世 · 书 · 卫宫 · 切嗣 · 真正的御主 · 彭格列 đều = **0**. 太宰 · 纲吉 chỉ có ở khối 预警 và lời người viết tiếp, thân truyện = 0 |
| Grep tay `leak_terms` và ranh giới | 时臣死 · 时臣已经死 · 远坂时臣死 · 时臣被杀 · Archer的新御主 · Archer换了御主 · Archer的御主换 · 绮礼的从者 · Azoth · 容器 · 言峰 · 绮礼 · 索拉 · Lancelot · 兰斯洛特 = **0**. 时臣 ×1, trong ý nghĩ của Kariya, như với người còn sống — đúng [[kariya-khong-biet-tokiomi-chet-kirei-hua-chen]] |
| 「我」 ngoài ngoặc kép | 0 |
| `ai_tells_check --project PPCT` | exit **0** |
| `style_metrics --write --json` | exit 0. 1.655 chữ, trên sàn 1.500 |
| `chapter_gate` | **không chạy được**: [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells\|ai-tells]] không có khối `gate:` |
| `vault_doctor --include-fiction --zone …/PPCT` | 0 lỗi · 1 cảnh báo có từ trước |

## Tám nhóm — check-continuity

| # | Nhóm | Kết quả |
|---|---|---|
| 1 | Timeline | ✅ 「第十五天中午。」 nằm sau ch38 (trưa ngày 14). 「第一天晚上在仓库街」 khớp [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master\|master]]: đêm kho cảng = ngày 1. 「今天晚上」 khớp khung arc (vụ bắt cóc tối ngày 15) |
| 2 | Ranh giới hiểu biết | ✅ Kariya không biết Kirei là Master, không biết Tokiomi chết, không biết Master thật của Saber. 「Saber的御主？」 → 「你可以这么想。」 làm Kariya **tin sai** mà không để lộ [[kiritsugu-la-master-that]]. Người kể không gọi tên Kirei (chỉ 「神父」) |
| 3 | Trạng thái nhân vật | ✅ tóc bạc, nửa trái mặt và người tê, 刻印虫, Berserker rút ma lực — [[Kariya-Matou]]. Lệnh chú 1 → 2 — [[kirei-nap-mot-dao-lenh-chu-cho-kariya]]. Xem **#1** (fact mới) |
| 4 | Luật thế giới | ✅ Nạp lệnh chú bằng cách vẽ theo dấu và tụng kinh — [[20260929-canon-arc-6-co-xe-gia]] d3. Xem **#3** |
| 5 | Quan hệ, xưng hô | — không có note quan hệ Kirei–Kariya. Kariya gọi Kirei là 「你」, người kể dùng 「神父」 từ đầu tới cuối — đúng thẻ cảnh 02 |
| 6 | Canon | ✅ Berserker lao vào Saber trái ý Master (ch9 · [[Kariya-Matou]]). Không chân danh — [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten\|phan-biet-cung-ten]] dòng 39. Xem **#2**, **#4** |
| 7 | Hợp đồng nhánh | ✅ không phạm `forbid` |
| 8 | Rò kế hoạch | ✅ Các beat sau (ch40–41: giả dạng, bắt cóc, Maiya) chỉ lên trang ở mức 「今天晚上」 và nội dung giao dịch. Đó là `foreshadow: state` của thẻ 02 và 03, tức là Kariya **biết** việc mình sẽ làm. Động cơ writer-only của Kirei (bình chứa, giữ hai đạo, muốn xem) **không** lên trang. Phép xoá: bỏ 「神父说：“今天晚上。”」 thì chương vẫn đứng được, ch40 cũng không mất gì |

## Vấn đề

| # | Loại | Mức | Chỗ trong chương | Chi tiết | Note đối chiếu |
|---|---|---|---|---|---|
| 1 | fact mới | low | cảnh 02: 「几天前的夜里，他倒在间桐家后面的巷子里…是这个人把他扶了起来」 | Chương **đặt** lần gặp đầu: vài ngày trước, ở ngõ sau nhà Matō, Kirei đỡ Kariya dậy. Khớp plan C1 (「Kirei tìm tới vì Kariya kiệt sức」) và arc 5 điểm 5 (sợi nền, ngoài trang). **Không** mâu thuẫn; `finalize-chapter` phải ghi thành state | [[arc-5-ke-san-va-con-moi]] điểm 5 · plan C1 |
| 2 | chi tiết thêm | low | cảnh 01: 「那个穿银色铠甲的女骑士」 | Màu giáp **bạc** không có trong [[artoria]] hay note canon. Canon Saber mặc giáp bạc xanh, nên khó sai, nhưng mình **không chắc** — không có nguồn trong vault | [[artoria]] (không ghi màu) |
| 3 | canon quá nguồn | low | cảnh 02: 「能把别人的样子穿在身上，连气息也一起穿上」 | "Cả khí tức" đi xa hơn crosscheck a1, vốn chỉ ghi "sương đen ẩn chỉ số và hình dáng; nhái dạng Anh linh khác". Lời Kirei nói ra thì được phép phóng đại, nhưng câu này sẽ thành nền cho cảnh tổ Caster nhìn thấu ở ch40: nếu "khí tức" cũng giả được, Tsuna dựa vào đâu? | [[20260929-canon-arc-6-co-xe-gia]] a1 (0.75) |
| 4 | chi tiết thêm | low | cảnh 01: 「樱坐在走廊尽头那把小椅子上，手里捏着他折的纸鹤」 | Con hạc giấy không có trong [[Kariya-Matou]]. Hình ảnh ấm, đúng memory "đừng bi kịch hoá". Không mâu thuẫn gì; chỉ ghi lại để không ai coi nó là canon | [[Kariya-Matou]] |
| 5 | trạng thái | low | cảnh 01: 「现在两道已经暗了下去」 | Chương **không** nói hai đạo đã dùng ở đâu, đúng thẻ 01. Nhưng việc "Kariya còn 1 đạo trước ngày 15" giờ đã lên trang. Nếu có chương cũ nào ngầm cho Kariya dùng đạo thứ ba thì mới mâu thuẫn. Grep 令咒 ch6–10 chỉ thấy của Tokiomi → **không** thấy mâu thuẫn | [[04_Manuscript/chapters/arc-2/ch19/ch19-review]] #1 |

Không có vấn đề `high` hay `medium`.

## Bảng văn phong — check-style

Loại chương: **dệt canon, POV Kariya, không đánh**.

| Chỉ số | Chỉ tiêu | Đo | Loại | Kết luận |
|---|---|---|---|---|
| Chữ Hán thân truyện | sàn 1.500 · plan ~2.000 | **1.655** | sàn | ✅ trên sàn. Dưới dự kiến ~17 % (cảnh 01: 505/550 · 02: 856/1.000 · 03: 294/450) |
| Thoại | chương dệt canon, sàn ~20 % · plan ~22 % | **17,4 %** | sàn | ❌ **dưới sàn**. Cảnh 02: 33 % (plan 40 %) |
| Lượt thoại | ≥ 10 (cảnh 02) | **22** ở cảnh 02 · 1 ở cảnh 03 | — | ✅ |
| Chữ Hán / đoạn TB | 35–55 · plan 38–45 | **28,5** | dải | ❌ dưới dải — xem **xu hướng** |
| Câu trung vị | plan 18–19 | **13** | tendency (quy ước ch38) | dưới. ch38 cũng 13 |
| Đoạn ≥100 chữ | ≤ 8 % | 1,7 % | trần | ✅ |
| Câu ≥50 chữ | ≤ 12 % | 1 % | trần | ✅ |
| `？` / 1000 | ≥ 4 | **4,23** | sàn | ✅ vừa đủ |
| `！` / 1000 | ≥ 1 | **0** | sàn | ❌ dưới sàn. Plan đặt ≤ 1 vì "Kariya không hét" — **plan và [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets\|targets]] mâu thuẫn**, plan chọn chiều thấp |
| `……` / 1000 | 0,5–3,5 | 0,6 | dải | ✅ sát đáy |
| `——` / 1000 | ≤ 2,5 | 0 | trần | ✅ |
| Thuật ngữ / 1000 | dệt canon ≥ 9 · plan ~7 | **10,88** (công cụ) | sàn | ✅. Không bị một từ gánh: 圣杯 6 · 令咒 5 · 从者 3 · 御主 2 · 魔力 1 · 宝具 1 |
| Motif mắt | ≥ 1 | 4 (「等眼睛适应了屋里的光线」…) | sàn | ✅ |
| Câu ≤4 chữ / 1000 | — | 5,44 | — | có (「最后一道。」 · 「两道。」): nhịp của tác giả còn |
| Ghi chú tác giả mô phỏng | có | có | — | ✅ |

### Xu hướng — đoạn TB trượt năm chương liền

| ch35 | ch36 | ch37 | ch38 | **ch39** |
|---|---|---|---|---|
| 30,7 | 34,2 | 27,1 | 29,4 | **28,5** |

Cả năm chương đều dưới dải 35–55 của [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]], và Aurel đã chấp nhận từng chương một (review ch35 #5, ch36 #9, ch37 #7, ch38 ghi tendency). Mức lệch này **đã thành đường nền mới**, không còn là lệch lẻ. Có hai hướng: sửa [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]] (chẳng hạn ghi rõ đây là `tendency` cho mọi loại chương), hoặc nhắm lại 35 ở chương sau. **Aurel quyết.** Đây là việc của `analyze-style`, không phải của chương này.

### Đọc tay — tật AI

- Câu tổng kết cảm xúc cuối đoạn: **không** thấy. Câu gần nhất là 「他怕一问出口，这只手就会被收回去。」 — nó nói **một nỗi sợ cụ thể** (hành vi), không phải kết luận. Giữ.
- 「不是…而是」: 0. Liệt kê ba vế đều: không có.
- So sánh 「像」: 2 lần / 1.655 chữ. Không dày.
- 「很久」 ×1 — 「已经很久没有感觉了」 nói về thời gian tê, không thuộc họ "for a long moment". Câu thuộc họ đó (「盯着它看了很久」) đã bắt được và sửa ở bản nháp, trước khi đo.

## Đề xuất cho Aurel *(không tự sửa)*

| # | Việc | Đề xuất |
|---|---|---|
| S1 | Thoại 17,4 % dưới sàn 20 % | **Giữ.** Hai phần ba chương là một người ngồi một mình; thêm thoại là nhồi. *Khác:* thêm 2–3 lượt ngắn ở cảnh 02 (Kirei hỏi thân thể) → khoảng 20 % |
| S2 | `！` = 0 | **Giữ** — Kariya không hét (plan). Ghi rõ: plan cố ý chọn dưới sàn |
| S3 | Đoạn TB 28,5 · câu trung vị 13 | **Giữ ở chương này**; mở câu hỏi đường nền (mục xu hướng) cho `analyze-style` |
| S4 | Vấn đề #3 — "cả khí tức" | **Sửa một chữ**: bỏ 「连气息也一起穿上」, để ch40 còn chỗ cho Tsuna nhận ra xe giả. *Khác:* giữ, và ch40 dựa vào hành vi (im lặng, đi trên mái nhà), không dựa vào khí tức |
| S5 | #1, #2, #4, #5 | Không sửa. #1 ghi vào state khi `finalize-chapter` |
