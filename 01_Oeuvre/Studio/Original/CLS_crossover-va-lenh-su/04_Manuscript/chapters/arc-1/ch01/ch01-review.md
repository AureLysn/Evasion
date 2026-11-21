---
id: review.CLS.ch01-review
type: info
scope: project
lane: personal
project: CLS
arc: dan-y-arc-1-jason-v5-cls
chapter: 1
canon_layer: user_canon
status: active
aliases: ["review ch1 CLS", "soat ch1 CLS", "soát ch1 CLS", "check-continuity ch1 CLS", "check-style ch1 CLS"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-1/ch01/ch01-chapter|ch01-chapter]]", "[[ch01-plan]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/ai-tells|ai-tells]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/signature|signature]]", "[[watch-frame]]", "[[Planarcadia]]", "[[Ashveil]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 1, 04/10/2026, tren ban nhap ch1. Doi chieu: 4 the canh, 3 note bi mat, watch-frame, hard-rules, Planarcadia.md, Ashveil.md, Boothill.md, Galaxy-Rangers.md, Welt.md, Aventurine.md."
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-04
---

# Soát chương 1 — Mũi tên

> Chỉ đọc, không sửa. Quyết định sửa hay giữ thuộc về Aurel.
> ⚠️ **Người soát, người viết và planner là một, trong cùng một phiên.** Thẻ cảnh đã qua `plan-reviewer`; bản nháp này **chưa** có người soát độc lập.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` × 4 cảnh | exit **0** — nhưng ba note bí mật **không có `leak_terms`**, nên công cụ không có chuỗi nào để dò |
| Grep tay theo khối | **0** trong hai khối phòng: Tsuna · Sawada · Vongola · Dazai · Yokohama · Jason · Todd · Gotham · Batman · Robin · Joker · Lazarus · Red Hood · chết · sống lại · Lan · Aeon · Săn bắn · lệnh sứ · bùn đen · chim nhỏ · Trù Phú · Shuhu. Hai khối phim: chỉ có 「Jason」 *(11 và 9 lần, đều trong **lời kể**; không ai trên phim gọi tên hắn)* |
| `ai_tells_check --project CLS` | exit **0** — không nhóm nào trong mười nhóm có lượt nào; không ký tự cấm |
| `style_metrics --write` | exit **0** — 3.978 từ, sàn 3.000 |
| `chapter_gate` | exit **2**, **đã biết trước**: chưa có mốc đo ([[giong-van-pho-thong-khong-nhai-ai]]) |

## Liên tục — tám nhóm

| Nhóm | Kết quả |
|---|---|
| Dòng thời gian | project **chưa có** `timeline/`; đối chiếu [[crossover]] mục 3 — không thấy lệch |
| Ranh giới tri thức | xem **C1**, **C2** |
| Trạng thái nhân vật | xem **C5** |
| Luật thế giới | [[watch-frame]]: dừng được, không tua — khớp. Không ai can thiệp vào phim. Xem **C3** |
| Quan hệ, xưng hô | project chưa có note quan hệ cho các cặp trong chương; xưng hô theo dòng 🟡 của [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules\|hard-rules]] |
| Canon | xem **C4**, **C6**, **C7** |
| Hợp đồng nhánh | không có nhánh |
| Lộ kế hoạch | xem **C2**. Các beat của ch2–8 *(Stelle nhận ra Jason, xưng tên ở ch6, lời để lại)*: **không** thấy cảnh nào trong ch1 nói trước |

### C1 — vừa — Himeko nói mình chứng kiến một cảnh canon không ghi cô có mặt
- **Chương:** “Có một lần, trước mặt bọn tôi, anh ta xưng tên thật.” *(người phụ nữ tóc đỏ)*
- **Note:** [[Planarcadia]] bảng trình tự dòng 7 — có mặt ở Tháp Pom-Pom: 「nhân vật người chơi, Ashveil, Kuchiba, Tro Tàn; Pearl」. Không có Himeko.
- **Thẻ cảnh:** 「Một người Đoàn tàu gọi tên」 — không chỉ định ai.
- **Hướng:** để **Stelle** nói, hoặc đổi 「trước mặt bọn tôi」 thành điều Himeko nghe kể lại.

### C2 — vừa — Boothill đoán được nguồn của mũi tên
- **Chương:** “Lần này hắn không bắn. Có kẻ khác vừa giương cung.”
- **Thẻ cảnh 1.01:** 「Mũi tên là dấu hiệu của Aeon… Boothill **không** được đoán ra điều ấy; với hắn nó chỉ là một lời gọi.」
- **Chi tiết:** 「giương cung」 trỏ thẳng về Lan *(Tư Mệnh Đế Cung)*. Không gọi tên, nhưng một Cảnh Binh nghĩ câu ấy là đã đoán.
- **Hướng:** bỏ câu sau, hoặc đổi thành điều hắn **không** biết *(「hắn không biết ai bắn」)*.

### C3 — thấp — cái nút là thứ chương tự thêm
- **Chương:** một cái nút tròn trên bàn thấp; March bấm để dừng.
- **Thẻ cảnh 1.01:** 「Một giọng không ai nhận là của mình nói luật」.
- **Chi tiết:** người viết đổi vì giọng nói luật là chủ phòng, trái [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules|hard-rules]] B5. Cái nút **không** trái hợp đồng, nhưng là **một vật mới** của căn phòng — các chương sau phải dùng lại đúng nó.

### C4 — thấp — bốn chi tiết canon không có trong note
- 「sáu con」 khỉ: [[Ashveil]] chỉ nêu tên vài con, **không** nêu số.
- Người Dẫn Chuyện 「đeo một cặp kính gọng tròn」, 「lông nâu」: note chỉ ghi 「chú khỉ nhỏ」.
- 「kênh Dovebrook」: note ghi sông, nước Dovebrook.
- March 「bọn mình đến đó rồi mà」: note không ghi **March** từng tới văn phòng.

### C5 — thấp — Jason nhớ lại những ngày trước ở văn phòng
- **Chương:** “Tuần đầu hắn còn vấp.” · “Jason đã để ý mấy cái đinh từ ngày đầu.”
- **Luật:** [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules|hard-rules]] C2 — kể từ trong Jason 「chỉ hiện tại — không hồi ức」.
- **Chi tiết:** hồi ức ở đây là về **văn phòng**, không chạm thế giới cũ. Không phải rò bí mật; chỉ là luật viết chặt hơn câu văn.

### C6 — thấp — câu của Ashveil gần nguyên văn game
- **Chương:** “Tôi nói bao nhiêu lần rồi… Đồ ăn thì bảo họ để ở cửa. Đừng có bấm chuông lúc tôi đang ngủ.”
- **Luật:** [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules|hard-rules]] B1 — diễn lại, không chép. Câu này **không trùng nguyên câu**, nhưng đi sát câu trong game.

### C7 — cần Aurel — cú điện thoại cuối chương nặng hơn thẻ cảnh

> ✅ **14/10/2026 — Aurel đồng ý giữ** khi chốt ch01: ch02 trả lời ngay bằng thảm án và cái chết của Caustide. C1, C2 đã sửa 11/10.

- **Chương:** bàn tay kim loại đặt đồng hồ xuống 「kiểu người ta đặt xuống một thứ sắp không cầm nổi nữa」; “Ashveil không nói thêm tiếng nào. Hắn nghe cho hết.”
- **Thẻ cảnh 1.04:** 「Caustide gọi về **chiếc mặt nạ**… Kết chương trên cú gọi — chưa cho biết nội dung.」
- **Chi tiết:** phản ứng trong chương đọc như **tin dữ**; thẻ chỉ nói chuyện mặt nạ. Ch2 mở bằng cảnh theo dõi Đội tàu, **chưa** phải thảm án. Người đọc sẽ chờ một tin nặng mà ch2 không trả ngay.

## Văn phong

| Luật | Đo được | Kết luận |
|---|---|---|
| Sàn 3.000 từ *(target)* | **3.978** | đạt. Dưới con số dự kiến 5.500 của thẻ cảnh — không độn |
| Dấu thoại ngoặc kép *(hard A5)* | mọi lời thoại trong “ ” | đạt |
| Dấu đổi khối *(hard B2)* | 3 dòng `***` cho 4 khối | đạt |
| Ký tự cấm *(hard)* | 0 | đạt |
| Gạch ngang dài, ba chấm ngoài thoại | 0 · 0 | đạt |
| Tật của máy, mười nhóm | 0 lượt | đạt *(chưa có trần; đây là số đếm)* |
| Tên riêng, thuật ngữ *(hard A4)* | không Việt hoá tên nào | đạt |

Đo để làm mốc sau này *(chưa có chỉ tiêu)*: đoạn trung bình **22,3** từ, trung vị **16,5**; câu trung vị **10** từ; câu dài từ 35 từ trở lên **3,1 %**; **51,7 %** đoạn có thoại. Thoại theo khối: phòng 26 % và 32 %, phim 27 % và 44 %.

### S1 — nên xem — câu ngắn dồn dập
Câu trung vị 10 từ, 65 câu từ ba từ trở xuống. [[giong-van-pho-thong-khong-nhai-ai]] đặt 「câu vừa phải」; [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/signature|signature]] ghi 「không dồn câu cụt」. Bản nháp nghiêng về **câu cụt** hơn mức ấy, rõ nhất ở khối phòng thứ nhất.

### S2 — nên xem — nhịp ba vế
Khoảng **15** chỗ câu chia ba vế nối bằng 「và」 hoặc 「rồi」. `Global/personal/forbidden-patterns` #3 coi nhịp ba đều là tật của máy. Vài chỗ là danh sách thật *(ba việc văn phòng nhận)*; phần còn lại là thói quen.

### S3 — thấp — hai chỗ lặp cấu trúc
“Rồi nhìn…” hai lần liền *(cuối khối phim thứ nhất)*; “Và đây.” đứng riêng một câu ở khối phòng thứ hai.

## Tóm lại

Không có lỗi **nặng**. Hai chỗ **vừa** *(C1, C2)* nên sửa trước khi chốt chương; **C7** cần Aurel quyết vì nó đổi độ nặng của kết chương. Phần văn phong không có lỗi cứng; **S1** là chỗ đáng để ý nhất khi Aurel chỉnh giọng.
