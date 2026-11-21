---
id: style.CLS.hard-rules
type: style
scope: project
project: CLS
lane: personal
canon_layer: project_locked
status: active
strength: hard
aliases: ["hard rules CLS", "luat cung CLS", "luật cứng CLS", "luat viet CLS", "luật viết CLS", "luat the loai xem anh the CLS", "hard rules CLS tieng Trung"]
related: ["[[CLS]]", "[[cls-viet-bang-tieng-trung]]", "[[giong-van-pho-thong-khong-nhai-ai]]", "[[20261004-luat-co-ban-va-san-3000]]", "[[20261012-chot-viet-cls-bang-tieng-trung]]", "[[quan-anh-the-reaction-fic]]", "[[watch-frame]]", "[[targets]]", "[[ai-tells]]", "[[signature]]", "[[ba-nguoi-da-quen-o-phia-duoc-chieu]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-1/ch01/ch01-zh-bang-ten|ch01-zh-bang-ten]]"]
source:
  type: user_input
  ref: "Aurel 04/10/2026 (luat co ban, san) va 11-12/10/2026 (nhan xet tong quan ch01: giong thieu tinh cach, cau truc giong AI, thieu mo ta ngoai hinh va bieu cam, canh chieu cat dot ngot; chot viet CLS bang tieng Trung; 'Rappa chao bang bien danh', 'Boothill goi be cung + dac diem', 'Aventurine noi vong vo'). Viet lai 12/10/2026. Tung dong ghi nguon; viec chon va xep la cua phien."
authority: user
confidence: 0.8
always_load: true
load_for: [writer, planner, continuity-reviewer]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-11-21
---

# Hard rules CLS — vi phạm là lỗi, không nộp bản nháp

> **Viết lại 12/10/2026** sau khi Aurel đọc ch01 và chốt **viết CLS bằng tiếng Trung giản thể** ([[cls-viet-bang-tieng-trung]]). Bản 04/10 viết cho tiếng Việt; các dòng không phụ thuộc ngôn ngữ giữ nguyên, các dòng về tiếng Việt thay bằng bản Trung, thêm mục **D** (lối viết) từ nhận xét của Aurel.
> Tài liệu (ghi chú, kế hoạch, thẻ cảnh) vẫn **tiếng Việt**; **văn truyện** là tiếng Trung. Mỗi dòng ghi nguồn. `confidence: 0.8` — việc chọn dòng nào thành luật cứng là của phiên.

## A. Luật cơ bản

| # | Luật | Đo bằng gì | Nguồn |
|---|---|---|---|
| A1 | Không nhân vật nào biết điều nằm ngoài tri thức của mình; `forbidden_secrets` ở thẻ cảnh thắng mọi thứ | `pov_leak_check.py --scene` | `Global/writing/continuity` #1 · [[05-visibility]] |
| A2 | Không dùng nội dung `planned` như đã xảy ra | đối chiếu `canon_layer` | `continuity` #2 |
| A3 | Không tự đổi tính cách, quan hệ đã chốt | đối chiếu `decisions/`, `relationships/` | `continuity` #5 |
| A4 | **Tên riêng và thuật ngữ HSR dùng bản tiếng Trung giản thể chính thức**, theo bộ name của Aurel ([[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-1/ch01/ch01-zh-bang-ten\|ch01-zh-bang-ten]]; nguồn: `Name HSR - Tổng.csv`). Tên không có trong bộ name thì **ghi nguyên chữ Latin**, không tự dịch; mỗi tên chưa chắc ghi vào `ch01-zh-bang-ten` (hoặc bảng tên của chương) để Aurel đối chiếu | rà theo bảng | Aurel 12/10/2026 (đưa bộ name) |
| A5 | **Một** kiểu dấu thoại: ngoặc kép **“ ”** (giản thể). Lời hiện trên màn ảnh được **nhắc lại trong phòng** đặt trong **【 】**. Ký tự **「 」 『 』** chỉ dùng trong note vault, không dùng trong văn truyện | rà | `Global/…/punctuation` bắt project khai |
| A6 | Dùng **dấu chấm câu tiếng Trung** (，。！？、；：……——), không trộn dấu ASCII. Dấu ba chấm (……) chỉ ở lời ngập ngừng, không thay cho việc viết đủ ý | đếm | `punctuation` |
| A7 | Thoại phải mang **quan hệ**, không chỉ mang thông tin; mỗi lượt thoại có **việc nó làm** (hỏi, né, đẩy, trêu, giấu) | rà | `Global/writing/dialogue` · Aurel 12/10 ("thoại thiếu mục đích nên vô nghĩa") |

## B. Luật của thể loại xem ảnh thể *(từ [[quan-anh-the-reaction-fic]] mục 4)*

| # | Luật | Đo bằng gì | Nguồn |
|---|---|---|---|
| B1 | **Không chép nguyên văn canon.** Lời thoại và mô tả từ game phải **diễn lại**. Tên riêng, biệt danh, danh xưng (Ninja Gậy Bóng Chày, Điện Hạ Tu La-Súng Bạc…) **được dùng** | so với note canon | mục 4 #1 |
| B2 | **Người đọc luôn biết mình đang ở khối nào** — phòng hay phim — và **ai đang ở đâu**. Mỗi lần đổi khối có dấu phân cách `＊＊＊` | mỗi chỗ đổi khối có dấu; không đoạn nào trộn hai khối | mục 4 #3 |
| B3 | **Phản ứng không lấn truyện.** Mỗi cảnh phòng làm **ít nhất một người đổi khác** hoặc đẩy một tuyến | mỗi thẻ cảnh phòng có mục 「Kết cảnh phải đạt được gì」 khác rỗng | mục 4 #7 · [[watch-frame]] |
| B4 | **Không ép phản ứng.** Người không có gì để nói thì **im**; không phải ai cũng lên tiếng | rà theo thẻ cảnh | mục 4 #4 · Aurel 03/10 |
| B5 | **Không có chủ phòng, không OC dẫn chuyện, không phá bức tường thứ tư.** Cơ chế căn phòng là hộp đen. Được có **dòng chữ ngắn trên tường** nêu quy ước xem (ngồi xuống, có thể yêu cầu dừng, không tua lại), không giải thích cơ chế | không nhân vật nào giải thích cơ chế | mục 4 #3 · [[watch-frame]] · Aurel 12/10 ("không có dấu hiệu bắt đầu chiếu, không có giải thích, cảnh bị cắt đột ngột") |
| B6 | **Phòng chiếu không phải toà án.** Không ai bị cả phòng kết tội vì thứ trên màn hình | rà | mục 4 #8 · [[watch-frame]] |
| B7 | **Không ai trong phòng đoán trúng** ba bí mật, và không ai trên phim giải thích | `pov_leak_check`; rà | [[ba-nguoi-da-quen-o-phia-duoc-chieu]] |
| B8 | **Cảnh chiếu không dài liền một khối.** Người xem biết nơi chốn hoặc người nào trên phim thì **lên tiếng ngay** (trực tiếp), rồi người có tiếng nói trong phòng (Welt, Himeko) **kéo lại** để xem hết cảnh rồi bàn | mỗi khối phim không quá ~700 chữ Hán không có tiếng phòng | Aurel 12/10 ("cảnh chiếu hơi dài quá… phản ứng trực tiếp hơn") |
| B9 | **Vật phải được tả trên màn ảnh trước khi nhân vật trong phòng nói về nó** (cái mũ đỏ, đồ trên bàn…). Không vật nào xuất hiện "từ hư không" | rà | Aurel 12/10 |

## C. Luật riêng của CLS *(từ `decisions/`)*

| # | Luật | Nguồn |
|---|---|---|
| C1 | Góc kể theo thẻ cảnh. Cảnh phim nào **chạm** một trong ba bí mật thì **kể từ ngoài** | Aurel 04/10/2026 |
| C2 | Kể từ trong Jason: **chỉ hiện tại** — không hồi ức, không so sánh với nơi khác; Jason **không tự tả mình** | [[jason-da-chet-va-song-lai]] |
| C3 | **Không đọc theo đúng sai.** Lời kể không phán ai đúng ai sai giữa các nhân vật | Aurel 04/10/2026 |
| C4 | **Đừng bi kịch hoá.** Không màn ăn năn, không độc thoại về cái chết | Aurel 04/10/2026 |
| C5 | **Jason ở bản HSR:** áo khoác than, dây đỏ treo đồng Nguyện Bảo; cái mũ trùm đỏ cũ **chỉ là chặn giấy**, Jason không đội | [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/characters/jason-todd\|jason-todd]] § Thiết kế bản HSR · Aurel 11/10 |
| C6 | **Ngoại hình nhân vật HSR theo ảnh Aurel gửi**, không theo trí nhớ. **Ngoại lệ:** nhân vật **Amphoreus** và **Penacony** tả theo thiết kế canon tra từ nguồn *(TextMap/wiki)*, ghi nguồn ở thẻ cảnh *(Aurel 25/10 và 01/11/2026)*: [[Doan-tau-ngoai-hinh]], [[Rappa]], [[Silver-Wolf]], [[Boothill]]. Form: March và Dan Heng dùng **form cũ** khi không chiến đấu; Himeko dùng **form mới** (áo choàng đỏ, vai thêu vàng); Sói Bạc ở Planarcadia dùng **LV.999** | Aurel 11–12/10 |
| C7 | **Biệt danh, thuật ngữ fandom phải tra nghĩa trước khi dùng — không dựng thành chi tiết theo nghĩa đen.** Ví dụ: 「黑泥」 *(黑泥精)* là cách fandom gọi Dazai theo tiếng lóng mạng 「黑泥」 = cảm xúc tối, lời than u ám; **không** phải bùn thật — không bể bùn, không 「ngâm bùn」. Tra trong vault, rồi nguồn ngoài, ghi nguồn; không tự nhận định | Aurel 26/10 — [[20261026-tra-loi-bon-cau-ch02-arc-2]]; nghĩa đã tra ở giong-khong-ten-la-dazai |

## D. Lối viết *(từ nhận xét tổng quan của Aurel 11–12/10/2026, đọc ch01 bản đầu)*

| # | Luật | Nguồn |
|---|---|---|
| D1 | **Nhập vai nhân vật khi viết thoại và POV.** Mỗi người nói bằng giọng, thói quen, cách xưng hô của chính họ; trước một đoạn thoại hỏi "người này làm gì ở tình huống này, bằng cách nói nào" | Aurel 12/10 · memory `nhap-vai-khi-viet-thoai-va-pov` |
| D2 | **Giọng truyện: hài và goofy là mặc định** (HSR vốn thế; lục thùng rác là canon). Nghiêm túc **chỉ ở cao trào**. Không để cả chương phẳng và trầm | Aurel 12/10 |
| D3 | **Mô tả tư thế, giọng nói, động tác mang ý nghĩa**; thêm **mô tả giọng sau lời thoại** ("giọng hạ xuống", "nói to hơn ý định"). **Không** dùng câu so sánh "như một người…" thay cho miêu tả | Aurel 12/10 |
| D4 | **Lần đầu một nhân vật xuất hiện** (dù quen hay lạ) **tả ngoại hình trước khi gọi tên**, để người đọc nhận ra và phản ứng cùng | Aurel 12/10 |
| D5 | **Tránh các cấu trúc nghe như AI:** (a) "người ta làm… khi…", (b) "người thì…, hắn thì…", (c) "⟨hành động⟩ của … đã … ⟨hành động/so sánh⟩", (d) ⟨câu mô tả⟩⟨câu so sánh phủ định⟩ kiểu 「không phải X, mà là Y」, (e) tả hành động chỉ để nói "đang làm gì" mà không nói nó **nghĩa là gì**, (f) cụm 「cất chuyện đó vào đâu đó」 (quen từ EMB), (g) 「chẳng ai hỏi một câu」, 「luật chỉ có thế」 | Aurel 11–12/10 · [[ai-tells]] |
| D6 | **Nhân vật tinh quái nói vòng vo, hàm ý** (Aventurine…); cả phòng không nói thẳng. Người nói thẳng chỉ khi tính cách họ thế (Boothill, Stelle) | Aurel 12/10 |
| D7 | **Đội tàu đang dở việc của mình khi bị kéo vào** (soát đồ chuẩn bị chuyến đi), nên phản ứng hỗn loạn; Stelle và March khuấy không khí | Aurel 12/10 |
| D8 | **Welt:** déjà vu và PTSD từ sự kiện Honkai; giữ nghiêm, **chỉ khuyên**, không giảng đạo; biểu hiện bằng cơ thể (mắt kính nứt), không bằng độc thoại | Aurel 12/10 |
| D9 | **Rappa chào từng người bằng biệt danh** (Ninja Gậy Bóng Chày, Ruri, Hiryū; người lạ là Ninja Vô Danh); **Boothill gọi "宝贝 + đặc điểm"** | Aurel 12/10 · [[Rappa]] |

## Ba chỗ phiên tự đặt — Aurel chỉnh khi đọc

| Chỗ | Đang đặt | Vì sao phải đặt |
|---|---|---|
| Dấu đổi khối | một dòng `＊＊＊` giữa khối phòng và khối phim | luật B2 |
| Xưng hô trong thoại | cách xưng tiếng Trung tự nhiên theo tính cách từng người; Boothill xưng 「我」, gọi người quen 「宝贝」 kèm đặc điểm; lời kể gọi Jason là 「杰森」 hoặc 「他」 | luật D1, D9; Aurel không thích các cách nói tiếng Việt như 「tao」 |
| Biệt danh Rappa bằng tiếng Trung (球棒忍者, 琉璃忍者, 飞龙忍者) | do phiên dịch từ bản Việt, **chưa chắc** | text game trên máy chỉ có bản Việt |

Ký tự **「 」 『 』** chỉ dùng trong note của vault, **không** dùng trong văn truyện.
