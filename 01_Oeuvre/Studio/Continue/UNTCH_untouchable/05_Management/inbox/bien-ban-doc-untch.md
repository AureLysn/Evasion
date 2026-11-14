---
id: note.UNTCH.bien-ban-doc-untch
type: note
scope: project
lane: personal
project: UNTCH
canon_layer: high_confidence_inference
status: active
aliases: ["bien ban doc untch", "doc toi dau UNTCH", "reading ledger UNTCH", "da doc bao nhieu chuong Untouchable"]
related: ["[[UNTCH]]", "[[nguyen-tac-ao3]]", "[[dump-comment-ao3]]", "[[bien-ban-doc-untch]]"]
source:
  type: measured
  ref: "Do truc tiep tren hai file nguon trong kho personal-archive: 23/08/2026 (khoi 0-2), 30/08/2026 (khoi 3, quet dinh danh 127 chuong)"
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-08-30
---

# Biên bản đọc — UNTCH

Khuôn và luật: [[bien-ban-doc-untch]]. Mỗi khối đọc xong thì thêm một mục **ngay lúc đó**,
và **bắt buộc** khai *dừng vì gì*.

## Tổng tiến độ

Cập nhật sau khối 3 — 30/08/2026.

| Nguồn | Đã đọc | Tổng |
|---|---|---|
| Nguyên tác — thân truyện, **liền mạch** | **8 chương (6,3 %)** — ch120–127 | 127 chương · 343.418 từ |
| Nguyên tác — thân truyện, **quét định danh** | **127/127 (100 %)** ✅ | ngữ cảnh ±700 ký tự quanh từ khoá |
| Nguyên tác — end note | **127/127 (100 %)** | quét từ khoá, đọc kỹ 3 chỗ |
| Lượt trả lời của tác giả | **150/150 (100 %)** ✅ | 13.339 từ |
| Comment độc giả | ~300 (12 %) | 2.493 |

**Còn lại đáng đọc: 119 chương thân truyện đọc liền mạch.** Phần comment đã vét hết chỗ có
giá trị — những gì còn lại là comment độc giả thuần (`authority: fandom`).

⚠️ **Quét định danh ≠ đã đọc.** Nó trả lời *"cái tên này ở đâu"*, không trả lời
*"chuyện gì xảy ra"*. Không dùng nó thay cho bước 3 (văn phong) hay bước 4 (canon).

---

## Biên bản đọc — UNTCH — khối 0 (metadata)

Nguồn     : `personal-archive:fiction/Studio/Continue/UNTCH_untouchable/01_Project-canon/sources/` — cả hai file
Khối này  : **chỉ metadata** — header AO3, tag, Summary, Notes chương 1, header dump comment
Quy mô    : ~1.200 từ
Đã đọc    : 0/127 chương (0 %) · 5/2.493 comment (0,2 %)
Dừng vì   : `het-khoi`
Ngày      : 2026-08-23

### Rút ra được

| Loại | Nội dung | Vào đâu |
|---|---|---|
| fact | Ràng buộc cứng: *"There will be no smut whatsoever. This is not negotiable."* (Notes ch.1) | `canon/` bước 4 |
| fact | 127/? chương, cập nhật cuối 2021-12-28 — fic **chưa hoàn** | `canon/` bước 4 |
| fact | Tag tác giả tự đặt: Izuku có Lightning Flames · là Ghost · không có OFA/AFO · AFO là Midoriya Hisashi · soulmate AU · time travel | `canon/` bước 4 |
| fact | Ship neo: Izuku/Hawks · Byakuran/Tsuna. Tác giả cảnh báo có ship không nằm trong tag | `canon/` bước 4 |
| question | Bộ tách HTML nào cho ra đúng 342.640 từ? Bản hiện tại lệch +16.851 | `questions/` bước 5 |

### Chưa chắc — CHƯA phải kết luận

- **Điểm dừng "khoảng 1000 từ đã viết cho chương sau".** Aurel nêu, tôi **chưa thấy
  trong nguồn**. Cần mở đúng ghi chú cuối chương 127 (hoặc comment tháng 12/2021)
  và trích nguyên văn mới chốt được.
- **Tác giả mở đề xuất quirk cho dàn KHR.** Aurel nêu, tôi **chưa thấy**. Cần tìm
  trong 150 lượt trả lời.
- Số từ lời tác giả ~13.300 (tôi đếm) vs ~14.239 (Aurel đưa) — lệch ~6 %, chưa truy
  nguyên nhân. Không chặn việc gì.

### Mâu thuẫn với thứ đã biết

- **`chapter_gate.py` không còn hardcode mốc EMB.** Brief mở project nói nó vẫn hardcode
  43.152 từ của EMB và sẽ "báo đạt sai". Kiểm mã nguồn 23/08: `find_profile()` đọc
  `02_Story_Bible/style/ai-tells.md`, `load_profile()` gọi `die()` (exit 2) khi thiếu
  khối `gate:`, kèm câu *"KHONG muon so cua truyen khac"*. → Cổng **dừng**, không báo sai.
  Kết luận thực hành **không đổi**: chưa hết bước 3 thì đừng chạy.

### Phiên sau bắt đầu từ

**Nguyên tác — chương 1, câu đầu tiên chưa đọc:**

> "Life had never been easy for Midoriya Izuku."

**Dump comment — mục đầu tiên chưa đọc:** `[6]`, khu comment Chapter 1
(đã đọc `[1]`–`[5]`, mục `[3]` là lượt trả lời đầu tiên của Mina37, 2021-01-25).

---

## Kế hoạch khối tiếp theo — chưa chạy, chờ Aurel duyệt

Bước 2 là **drop-point**, không phải đọc tuần tự từ chương 1. Đề xuất thứ tự:

| Khối | Đọc gì | Vì sao trước |
|---|---|---|
| 1 | Chương 120–127 + mọi Notes cuối chương | Điểm dừng nằm ở đây, và nó quyết định viết tiếp từ đâu |
| 2 | 150 lượt trả lời của Mina37, lọc riêng khỏi 2.493 comment | Tầng `author_confirmed` — phải biết **trước** khi trích canon, không phải sau |
| 3 | Chương 1–10 | Mốc đo văn phong (bước 3) + thiết lập mở đầu |
| 4 | Quét 11–119 theo trục sự kiện | Khối lớn nhất, chia nhỏ, mỗi lần một biên bản |

### Aurel chốt 23/08/2026

- **Khối 1 = chương 120–127 + Notes cuối chương + lượt trả lời của Mina37 trong 11–12/2021**,
  đọc cùng một lượt. Lý do: câu *"khoảng 1000 từ đã viết cho chương sau"* nhiều khả năng nằm
  ở comment chứ không ở thân chương — tách hai nguồn ra thì phải mở lại lần nữa.
- **Ngân sách một khối ≈ 25.000 từ** (≈ 8–10 chương). Hết khối thì **dừng, ghi biên bản, chờ**.
  Không gom nhiều khối rồi báo một lần — đó đúng là kiểu đã hỏng ở EMB.

---

## Biên bản đọc — UNTCH — khối 1

Nguồn     : `personal-archive:fiction/Studio/Continue/UNTCH_untouchable/01_Project-canon/sources/` — cả hai file
Khối này  : **ch120–127 (thân truyện + summary + note đầu + end note)** · **toàn bộ end note
            của 127 chương** (quét từ khoá, chỉ đọc kỹ 3 chỗ trúng) · **4 lượt trả lời của
            Mina37 từ 2021-11 trở đi**
Ranh giới : bắt đầu ở câu đầu ch120 *"Pain unlike anything he had ever felt before shot
            through Byakuran's chest."* — kết ở câu cuối ch127 *"Yeah!"* + end note ch127
Quy mô    : **25.656 từ** thân truyện + ~2.400 từ end note toàn truyện + 255 từ comment
            = ~28.300 từ. **Vượt ngân sách 25.000 khoảng 13 %** — vượt có chủ đích, xem dưới
Đã đọc    : **8/127 chương (6,3 %)** · **9/2.493 comment (0,4 %)** · **6/150 lượt tác giả (4 %)**
Dừng vì   : `het-khoi`
Ngày      : 2026-08-23

### Vì sao vượt ngân sách 13 %

Ch120–127 là **26.891 từ** theo bộ tách cũ, **25.656** theo bộ tách sạch. Cắt xuống 25.000
đúng nghĩa là bỏ ch120 — mà ch120 là chương Byakuran bị cắt bond và giết Discordant, tức
là **nguyên nhân của toàn bộ 7 chương còn lại**. Đọc 121–127 mà bỏ 120 thì mọi phản ứng
trong khối mất gốc. Chọn vượt 13 % thay vì đọc một khối vô nghĩa.

### Rút ra được

| Loại | Nội dung | Vào đâu |
|---|---|---|
| — | **Điểm dừng dựng xong** — ba mốc ch124 / ch127 / ~1000 từ chưa đăng | [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point\|drop-point]] ✅ |
| fact | Chương cuối là **ch127, 2021-12-28**, dừng **giữa cảnh** ngay trước bài thi cuối kỳ | `canon/` bước 4 |
| fact | Ràng buộc tác giả: **không smut** · **không đụng chuyện phá huỷ Trung Quốc** · không đòi hỏi | `canon/` bước 4 |
| fact | Nedzu **là người**, chưa từng bị thí nghiệm, High Spec không tồn tại — tác giả xác nhận 2 lần | `canon/` bước 4 |
| fact | **Nedzu và Reborn là soulmate** — end note ch126 | `canon/` bước 4 |
| fact | Marco Gagliardi = **Gamma** — tác giả xác nhận trong comment | `canon/` bước 4 |
| fact | Cha của Byakuran & Hawks là con thứ của boss Estraneo cũ, đổi họ thành **Takami** | `canon/` bước 4 |
| fact | Long Xinyi (**Discordant**), quirk **Harmony** — bẻ/nối bond Flame của người khác. Đã chết ở ch120 | `canon/` bước 4 |
| hook | 12 tuyến còn mở, đã lập bảng | [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point\|drop-point]] ✅ |
| hook | **Theodor** — phản diện mới, xuất hiện đúng một lần ở chương cuối | [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point\|drop-point]] ✅ |
| question | **Cha của Theodor là ai?** Không phải AFO — trích dẫn xếp AFO thấp hơn ông ta | `questions/` bước 5 |
| question | Quirk Harmony là di truyền hay đột biến? Chính trong truyện hỏi mà chưa trả lời | `questions/` bước 5 |
| question | "Kế hoạch" mà Tsuna nhắc với Shouto là gì? | `questions/` bước 5 |
| question | Kage giấu Tokoyami chuyện gì? | `questions/` bước 5 |

**Chưa viết note `canon/` hay `questions/` nào** — đúng ràng buộc C của bàn giao: bước 4
cần `Database/Fandom/BNHA/` tồn tại trước, và bước 5 chưa tới lượt. Mọi fact ở trên nằm
nguyên trong biên bản này và [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]].

### Hai câu "chưa chắc" của khối 0 — GIỜ ĐÃ XÁC MINH

| Nghi vấn khối 0 | Kết quả | Nguyên văn |
|---|---|---|
| "khoảng 1000 từ đã viết cho chương sau" | ✅ **ĐÚNG** — end note **ch127** | *"I do have around 1000 words written for the next chapter, but it's not finished. If you guys want to, though, I guess I can publish that too?"* |
| tác giả mở đề xuất quirk cho dàn KHR | ⚠️ **ĐÚNG NHƯNG HẸP HƠN** — end note **ch17** | *"Even though I do ask for suggestions on quirks and pairings […] in the end, I write it the way I want it to be."* |

Chi tiết ba giới hạn của vế thứ hai: xem [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]] mục cuối. Tóm lại — đó là ch17,
đầu 2021, kèm câu "phần lớn đã viết sẵn, không đổi được", và tới ch124 tác giả đã kiệt sức.
**Không phải cánh cửa đang mở năm 2026.**

Thêm một fact không ai hỏi: **bản 1000 từ chưa bao giờ được đăng.** Lượt trả lời cuối của
Mina37 trong toàn bộ khu comment là **2021-12-14**; comment dưới ch127 chạy tới 2022-01
không có lượt nào của tác giả. Bản đó nằm trên máy tác giả, **không nạp vào vault được.**

### Chưa chắc — CHƯA phải kết luận

- **Cha của Theodor.** Ông ta thiên vị Yuni, đứng trên AFO, và Theodor "giống cha" ở chỗ
  chịu được thương tích nặng và *"fool time for some time"*. Trong canon KHR có nhân vật
  khớp mô tả đó, nhưng khối 1 **không nêu tên**. Cần ch1–119 hoặc comment tác giả. Không đoán.
- **"my little cousin"** của Theodor là ai — chưa rõ.
- Mức độ hậu quả vụ Trung Quốc mà tác giả *đã* viết trong ch1–119 (nếu có) — chưa biết.

### Mâu thuẫn với thứ đã biết

- **Bộ tách HTML đã sửa xong — con số 359.491 ở khối 0 không còn dùng.** Bộ cũ cắt theo
  `<div class="userstuff">` nên nuốt cả Summary/Notes và sót 3 khối. Bộ mới cắt theo cặp
  comment `<!--chapter content-->` … `<!--/chapter content-->`: **127/127 chương**, tổng
  **343.418 từ**, lệch AO3 chỉ **+778 từ (0,23 %)**. Con số này **dùng được làm mốc nền
  cho bước 3**. Cần sửa lại cảnh báo trong [[nguyen-tac-ao3]] và [[UNTCH]].
- Không mâu thuẫn nào khác với note đã có.

### Quan sát văn phong — GHI LẠI, chưa phải bước 3

Chưa đo, chỉ là thứ nhìn thấy khi đọc. Bước 3 phải đo bằng `style_metrics.py`:

- POV **luân phiên theo cảnh**, không cố định: trong 8 chương có Byakuran · Xinyi · Izuku ·
  Shouto · Tsuna · Nedzu · Reborn · Aizawa · Tokoyami · Shinsou · Hawks · Theodor · Liliya.
- Ngắt cảnh bằng một dòng chỉ có `…`.
- Có cảnh viết dạng **log chat** (MNet, và tin nhắn Shouto ↔ "Tsuna's brother") — thể loại
  riêng, cổng đo văn xuôi sẽ đọc sai nếu không loại ra.
- Chương 2.400–4.400 từ trong khối này; trung bình toàn truyện ~2.700.

### Phiên sau bắt đầu từ

**Nguyên tác — câu đầu tiên chưa đọc (chương 1):**

> "Life had never been easy for Midoriya Izuku."

**Dump comment — mục đầu tiên chưa đọc:** `[6]` khu comment Chapter 1.
Riêng lượt của tác giả: đã đọc 6/150 (2 lượt ch1 ở khối 0, 4 lượt cuối 2021 ở khối 1);
**144 lượt chưa đọc**, dày nhất ở 2021-03 (57 lượt) và 2021-06 (28 lượt).

---

## Biên bản đọc — UNTCH — khối 2

Nguồn     : `personal-archive:fiction/Studio/Continue/UNTCH_untouchable/01_Project-canon/sources/AO3-28933989-...-comments-...txt`
Khối này  : **TOÀN BỘ 150 lượt trả lời của Mina37**, mỗi lượt kèm comment độc giả mà nó
            đang trả lời (cắt 500 ký tự để lấy ngữ cảnh — reply kiểu *":)"* vô nghĩa nếu đọc rời)
Ranh giới : lượt #1 (2021-01-25, ch1) → lượt #150 (2021-12-14, ch122). Hết, không còn lượt nào
Quy mô    : **22.725 từ** = 13.339 từ lời tác giả + 11.462 từ ngữ cảnh (đã cắt). Trong ngân sách 25.000
Đã đọc    : **150/150 lượt tác giả (100 %)** · **~300/2.493 comment (12 %)** · nguyên tác vẫn **8/127 chương**
Dừng vì   : `het-khoi`
Ngày      : 2026-08-23

### ⚠️ Tìm thấy điều làm SAI một kết luận của khối 1

**Theodor KHÔNG phải nhân vật mới xuất hiện ở chương cuối.** Lượt #128 (2021-07-21, ch78),
tác giả nói về Globe: *"she's confused as hell because of what **Berserk** told her"*.

`Berserk` là một trong các tên Theodor tự xưng ở ch127 (*"Son, Theo, friend, Theodor,
**Berserk**, Legacy, Wonomichi"*). Nghĩa là hắn **đã hoạt động trong truyện từ trước ch78**,
dưới tên Berserk, và đã trực tiếp nói chuyện với Globe. Khối 1 kết luận "xuất hiện đúng một
lần ở chương cuối" — **sai**, vì khối 1 chỉ đọc 8 chương cuối. Đã sửa trong [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]].

**Cha của Theodor vẫn CHƯA xác định.** Không lượt nào của tác giả nói ra. Nhưng giờ biết
phải tìm ở đâu: **ch63–78**, quanh chỗ Berserk nói chuyện với Globe.

### Rút ra được — tầng `author_confirmed`, đứng trên canon franchise

Đây là mỏ vàng đúng như Aurel dự đoán. Chia theo mức chắc chắn, **không trộn**:

**A. Tác giả khẳng định dứt khoát**

| Nội dung | Lượt |
|---|---|
| **Giotto là em/anh của AFO, VÀ Giotto chính là người dùng One For All đầu tiên** — cùng một người | #40 #42 |
| **Izuku và Tsunayoshi là anh em họ** | #42 |
| **Bermuda là ông tổ nhiều đời của cả Izuku lẫn Tsuna** — và cả hai **không biết** | #79 |
| **Quirk của Izuku là một đột biến từ quirk của AFO**; làm Ghost chỉ *khuếch đại* nó | #2 |
| AFO **không** có Night Flame, **không** giống Vindice; sống lâu nhờ một quirk longevity | #2 |
| **Wrath Flame = Sky + Storm** (cách tác giả viết) | #2 |
| **Xanxus là con của Endeavor** — Xanxus là một Todoroki. Dabi biết | #121 |
| Endeavor có **Storm Flame**; mẹ Xanxus là **Sky** yếu, không truy cập được Flame | #122 |
| **Xanxus quirkless** | #63 |
| **Globe = Liliya**, soulmate của Xanxus, cô **biết** điều đó; ký ức bị quirk `Amnesia` khoá chứ không xoá | #117 #118 #128 |
| Globe theo phe hero vì **bị Hero Commission ép**, Timoteo có dính | #128 |
| **Soulmate của Shinsou là Monoma Neito** | #88 |
| **Tsuna cho người giết Iemitsu** (không tự tay) | #125 |
| Trong tương lai Izuku **giết Hawks** rồi tấn công bừa; Byakuran áp chế bằng Sky; Vindice bắt giam | #86 |
| Asura Box mở = chế độ Ghost; **mở lâu thì hỏng tâm thần** | #86 |
| **AFO đã biết Tsuna tồn tại**; từng định bắt nhưng **Bermuda chặn**, AFO đổ cho Kurogiri | #37 #87 |
| AFO **không đụng vào mafia** — đó là lý do Fuuta an toàn | #24 |
| **Ranking của Fuuta là quirk**, không phải năng lực riêng | #24 |
| **Người dùng OFA thứ Tư là một Sawada** (quirk Danger Sense ≈ Hyper Intuition) | #146 |
| **Người thứ Hai ghét Giotto** — vì phát hiện người dạy mình lại là kẻ lập ra Vongola | #145 |
| Arc tương lai **đã xảy ra**; ký ức tương lai đến từ đó | #41 |
| Truyện diễn ra **trong 10 tháng timeskip của BNHA**; dòng KHR kết thúc trước | #9 #74 |
| Hero tin **chỉ Byakuran + Funeral Wreaths** time-travel; không chắc về Varia và Vongola X | #133 |
| Ký ức tương lai **không còn đáng tin** vì butterfly effect — Nedzu đã cảnh báo | #120 |
| Flame là **chuyện riêng của mafia**; giả Flame thành quirk là phá omertà, Vindice truy | #32 |
| Cơ chế omertà đầy đủ: 3 cách bị ràng buộc; **Shinsou không bị ràng buộc** | #69 |
| Soulmark: Izuku/Hawks = **chim ưng + dây leo hoa ghost**, giữa ngực; Tsuna/Byakuran = **hoa lan bốc cháy**, đùi. Có màu | #56 #110 #131 |
| Byakuran **chỉ có** quirk nhìn thế giới song song; đôi cánh là Flame | #104 |
| Byakuran bị cha mẹ bỏ lúc ~5–6 tuổi vì đã có quirk; sinh sau Hawks ~6 năm, cùng năm Izuku nhưng trên một lớp | #108 |
| Quirk **Shoichi = "Anxiety Ache"** (đau bụng khi lo lắng, không có sức mạnh gì thêm) | #138 |
| Quirk **Bel** = điều khiển kim loại, chỉ dao của hắn, biến dao thành dây | #132 |
| **Inko biết** Izuku bị thương và **không làm gì** — vì bà nghĩ nó không sống tới tuổi trưởng thành | #91 |
| Bakugou vào **foster care** vì hành hung Izuku + người lớn tắc trách | #114 |
| Tri-ni-sette **đã được sửa/đổi** (≈ch47); quirk vẫn tồn tại | #80 |
| Bậc huy hiệu MNet: **Diamond = boss famiglia** (Dino), trên Gold | #94 #95 |

**B. Tác giả nói rõ là DỰ ĐỊNH, chưa chốt — `planned`, KHÔNG được viết như đã xảy ra**

| Nội dung | Lượt |
|---|---|
| Reborn **quirkless** — "ý định", vì có quirk thì hắn thống trị thế giới | #30 |
| Hibari có quirk **không giúp hắn mạnh hơn**, "may or may not be related to birds" | #73 |
| Aizawa/Shirakumo và Reborn/Luce — *"nothing is set in stone"* | #70 |
| Dino/Squalo "probably"; Fon/Mammon "might" | #8 #12 |
| **Xanxus/Squalo bị loại** — tác giả tự thấy không viết nổi mà không thành toxic | #7 |
| Bakugou **không** định làm nhân vật chính | #107 |
| KHR side là **vigilante hơn là villain**, cố ý không xếp loại được | #4 |
| Không có EraserMic (đã có kế hoạch khác cho Aizawa) | #4 |

**C. Câu hỏi tác giả tự nêu mà chưa trả lời → `questions/` bước 5**

- Ai giữ One For All trong tương lai? Tác giả **từ chối trả lời công khai**, chỉ hẹn hỏi riêng trên Tumblr (#63). Tsuna có nhận OFA không — *"maybe, maybe not"* (#85).
- Soulmate của Giotto là ai? Chỉ biết: gặp sau khi về Nhật, và là **mẹ của con trai Giotto** → không thể là Guardian nào (#87).
- Soulmate của Skull — tác giả chưa nghĩ ra (#52).
- Lý do thật khiến Globe có tin chính xác về Varia — hứa sẽ tiết lộ (#98).

### Chưa chắc — CHƯA phải kết luận

- **Cha của Theodor/Berserk.** Vẫn không có tên. Hắn thiên vị Yuni và đứng trên AFO.
  Trong canon KHR có nhân vật khớp mô tả, và tác giả có nhắc tới nhân vật đó một lần
  ở #29 (do độc giả nêu, tác giả **không xác nhận**). **Không đủ để chốt.** Đọc ch63–78.
- Quan hệ Berserk ↔ Globe: mới biết "Berserk nói gì đó làm Globe hoang mang". Nội dung chưa biết.

### Mâu thuẫn với thứ đã biết

- Khối 1 nói Theodor "xuất hiện đúng một lần ở chương cuối" → **sai**, đã sửa ở [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]].
- Con số comment: regex mới bắt **2.493/2.493**, khớp tuyệt đối header. Con số 2.178 ở khối 0
  là do regex cũ không xử được **tên người dùng có khoảng trắng**. Đã sửa, không còn nghi vấn.
- Số từ lời tác giả: **13.339** (đếm lại, chắc). Số 14.239 trong brief gốc lệch ~6 %; không rõ
  nguồn, không ảnh hưởng gì.

### Phiên sau bắt đầu từ

**Nguyên tác — câu đầu tiên chưa đọc (chương 1):**

> "Life had never been easy for Midoriya Izuku."

**Dump comment:** đã đọc hết phần đáng đọc (100 % lượt tác giả). Phần còn lại là comment
độc giả thuần — `authority: fandom`, giá trị thấp, **không ưu tiên**.

---

## Biên bản đọc — UNTCH — khối 3 (quét định danh toàn truyện)

**Ngày:** 30/08/2026 · **Vault:** `D:\AureLysn` (hệ mới) · **Nguồn:**
`personal-archive/fiction/Studio/Continue/UNTCH_untouchable/01_Project-canon/sources/Untouchable.html`

**Phương pháp — khác hẳn khối 1 và 2.** Không đọc tuần tự. Quét từ khoá trên toàn bộ
**127/127** chương thân truyện, lấy số lần và số chương cho từng tên, rồi chỉ đọc ngữ cảnh
±700 ký tự quanh mỗi lần xuất hiện. Lý do: hai khối trước đều chọn cửa sổ đọc bằng **suy
luận từ metadata**, và cả hai lần đều chọn sai.

**Ngân sách:** ~34.000 từ ngữ cảnh (thay vì 45.327 từ nếu đọc mù ch63–78). Dừng vì
**het-khoi** — đã trả lời xong câu hỏi chặn.

### ✅ Cổng đo — bộ tách có tính TÁI LẬP

| Kiểm | Kết quả |
|---|---|
| Kích thước file | 2.405.064 bytes — **khớp** con số khai 23/08 |
| Số khối chương | **127/127** — khớp |
| Số từ thân truyện | **343.418** — lệch **+0 từ (+0,000 %)** so với mốc nền |

Đây là lần đầu mốc nền được **tái lập** chứ không chỉ đo lại. Script để nguyên tại
`03_Workspace/untch-extract/extract.py`.

### ⚠️ Tìm thấy điều làm SAI một kết luận của khối 2

Khối 2 kết luận *"chỗ tìm ra hắn là ai: ch63–78"*, suy từ **ngày đăng** lượt trả lời #128
(2021-07-21, dưới ch78). Đo trên thân truyện thì cửa sổ đó **hụt cả hai đầu**:

| Tên | Lần đầu thật | Chương khai danh tính |
|---|---|---|
| `Berserk` | **ch61** (không phải ch63) | — |
| `Theodor` | **ch77** | **ch110** |

`ch110` — chương đậm đặc nhất (Berserk 13 · Globe 10 · Liliya 10 · Theodor 3) — **nằm hoàn
toàn ngoài** cửa sổ ch63–78. Ngày đăng comment không đo được vị trí trong truyện: tác giả
trả lời một comment cũ bất cứ lúc nào.

### Rút ra được — tầng `fic_explicit`, đọc thẳng từ thân truyện

| Nội dung | Chương |
|---|---|
| Berserk tên thật là **Theodor Manz** | ch110 |
| **Mẹ = Viktoria Manz**, hero **Miss Guidance**, thành viên **the Epitome** | ch110 |
| Hai mẹ con cùng **mint green skin** — đó là cách người ta lần ra | ch110 |
| Hồ sơ Globe bị khoá vì cô **dính vào Epitome Fiasco** → nối được Globe ↔ Berserk | ch110 |
| Theodor **gần 30 tuổi**; Liliya là bạn thân, hắn đang "matchmaking" cho cô | ch77 |
| Cha Theodor: ngồi **ngai**, đội **mũ sắt**, *"lived for so long… seen it all"* | ch77 |
| Cha đòi Theodor ***"bring some ramen when you stop by tomorrow"*** | ch77 |
| Cha nói *"I cannot see **Bermuda's grandchildren** turning their backs on her"* | ch77 |

### Chưa chắc — CHƯA phải kết luận

- **Cha Theodor = Kawahira / Checkerface** — tầng `derived`, `confidence: 0.8`.
  Chín dấu hội tụ (ramen · *"as old as time"* · thiên vị Yuni · đứng trên AFO · Mist
  cloaking · *"fool time"*), liệt đầy đủ ở [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]]. **Không một câu nào trong 127
  chương nói ra quan hệ này.** Không được nâng tầng. Khối 2 cũng đã ngờ nhân vật này (#29,
  do độc giả nêu, tác giả không xác nhận) — nay có thêm bằng chứng **trong văn bản**, nhưng
  vẫn là hội tụ dấu hiệu, không phải lời khai.
- **`Wonomichi` là cha hay là con?** Theodor tự nhận tên này ở ch127, nhưng tên đã xuất
  hiện từ **ch33** với vai trọng tài. Hai cách đọc đều đứng được — xem [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]].
  Nếu là con thì Theodor có mặt từ ch33, **sớm hơn 28 chương** so với ch61.

### Mâu thuẫn với thứ đã biết

- Cửa sổ đọc `ch63–78` của khối 2 → **sai**, đã sửa ở [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]].
- Tuyến 4 ở bảng tuyến còn mở ghi Theodor *"xuất hiện lần đầu ở chính chương cuối"* → sai
  từ khối 1, khối 2 sửa một nửa, khối 3 sửa nốt: **ch61**.
- **Cùng một loại lỗi lặp hai lần liên tiếp:** suy vị trí trong truyện từ metadata bên ngoài
  (số chương đã đọc; ngày đăng comment) thay vì đo trên văn bản. Ghi lại như một luật làm
  việc: **muốn biết cái gì ở đâu trong truyện thì quét truyện, đừng suy.**

### Phiên sau bắt đầu từ

**Để đóng câu hỏi cha Theodor:** đọc liền mạch **ch77** (3.362 từ, đã trích sẵn tại
`03_Workspace/untch-extract/ch77-full.txt`) và **ch108** — nơi `Wonomichi` xuất hiện lần
cuối trước chương cuối.

**Để đóng câu hỏi Wonomichi:** `ch33 · ch44 · ch47 · ch108`.

**Nguyên tác — câu đầu tiên chưa đọc (chương 1):** vẫn nguyên, chưa đọc tuần tự ch1–119.

> "Life had never been easy for Midoriya Izuku."

---

## Biên bản đọc — UNTCH — khối 4 (ĐỌC HẾT ch1–119)

**Ngày:** 30/08/2026 · **Aurel chỉ thị:** "đọc hết trước sau đó mình sẽ giúp với các câu hỏi bạn chưa tìm ra."

**Phạm vi:** ch1–119 đọc **liền mạch, toàn văn**. Cộng ch120–127 của khối 1 ⇒ **127/127 chương (100 %)**.
**Khối lượng:** 317.762 từ, chia 14 khối con ~23–25k từ. Dừng vì **het-tai-lieu** — không còn chương nào chưa đọc.

**Cổng đo trước khi đọc:** file 2.405.064 bytes · 127/127 khối · 343.418 từ, **lệch +0**. Bộ tách tái lập mốc nền.

### Phạm vi đã trích xuất — cập nhật

| Trường | Trước khối 4 | Sau khối 4 |
|---|---|---|
| Thân truyện đọc liền mạch | 8/127 (6,3 %) | **127/127 (100 %)** |
| Nhân vật | ⬜ | 🟨 đủ dữ kiện, chưa dựng note |
| Sự kiện / timeline | ⬜ | 🟨 đủ dữ kiện, chưa dựng note |
| Luật thế giới (BNHA × KHR) | ⬜ | 🟨 đủ dữ kiện, chưa dựng note |
| Bí mật | ⬜ | 🟨 đủ dữ kiện, chưa dựng note |
| Văn phong (bước 3) | ⬜ | ⬜ **chưa đo** — cần chạy `style_metrics.py` |

⚠️ 🟨 = **đã đọc, chưa viết note**. Không được coi là đã xong bước 4. Và bước 3 vẫn phải làm trước bước 4.

### ⚠️ Ba kết luận cũ bị sai, đã sửa

1. **"Theodor là phản diện mới ở chương cuối"** (khối 1) → sai. Xuất hiện từ **ch61** dưới tên Berserk.
2. **"Chỗ tìm ra hắn là ch63–78"** (khối 2) → sai. Tên thật khai ở **ch110**; ch63–78 hụt cả hai đầu.
3. **"12 tuyến còn mở"** (khối 1) → **9/12 đã đóng trong chính thân truyện**. Xem [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]].

Cả ba lần sai đều cùng một cơ chế: **suy vị trí trong truyện từ metadata bên ngoài** thay vì đo trên văn bản.

### Rút ra được — `fic_explicit`, những mục nặng nhất

**Huyết thống — khung xương của cả truyện**

- **Bermuda von Veckenstein** → con gái **Midoriya Adelina** → hai con: **Hisashi (All For One)** và **Giotto (Vongola Primo)**. Bermuda là **ông cố của Izuku**, tổ nhiều đời của Tsuna. (ch45, ch50–51)
- Primo tên thật **Midoriya Giotto**, dùng tên giả **Sawada Ieyasu**. Con trai: **Yoshimune**.
- Giotto **sinh ra có quirk** — một quirk vô dụng, chỉ có khả năng *được truyền lại*. Hisashi **cưỡng ép** gán thêm một quirk tích trữ. Hai thứ hợp lại = **One For All**. Vongola lập ra **để chặn Hisashi**.
- Dòng Sawada quirkless vì Giotto trao OFA đi **trước khi con trai ra đời**.
- **OFA cưỡng đoạt được** nếu người đoạt có **"Right of Blood"**. Tiền lệ: **Sawada Yoshinobu**, người dùng thứ **4**, vô tình đoạt bằng cách nuốt máu người thứ 3.
- **Quirk `Parasite` của Bermuda**: sinh ra không có wave energy nên **hút sinh lực trực tiếp từ Trái Đất**. Hắn là **người có quirk đầu tiên**, và là nguyên nhân gián tiếp khiến quirk lẫn hệ Arcobaleno tồn tại. (Checkerface giải thích, ch47)
- Gene lặn di truyền: một gene hỏng + một gene lành ⇒ **Flames mạnh bất thường** (Tsuna, Primo, AFO). Izuku: một gene hỏng + một gene nửa hoạt động ⇒ **không tự sản đủ Flames để sống đời mafia** ⇒ buộc phải hút của người khác.

**Namimori — lời giải cho điều kỳ lạ nhất trong fic**

- Giotto sắp chết vì **Cloudy Sky** (Cloud tím trộn vào Sky cam sau khi tự tay giết soulmate — tổ hợp Flame *duy nhất* tự thiêu người dùng). Trước khi chết, ông **ép Ý chí vào chính Trái Đất**: Cloud tuyên bố lãnh thổ, Sky buộc Đất chấp thuận.
- **Namimori = lãnh thổ của Primo.** Hisashi **không đặt chân vào được**. Cả thị trấn "không thấy" mọi chuyện quirk/mafia trước mắt cũng vì Ý chí này.
- Ý chí **neo vào One For All**. OFA còn ⇒ Namimori còn được bảo vệ. Ở tương lai Millefiore vào được Namimori ⇒ **OFA đã bị phá**.
- ⇒ **Tsuna kích hoạt Cloudy Sky ở ch35–36**, đúng bệnh của Primo. Byakuran là người duy nhất kéo cậu về.

**Danh tính**

| Nhân vật | Danh tính thật | Chương |
|---|---|---|
| **Byakuran** | **Takami Kaito** — **em ruột của Hawks (Takami Keigo)** | ch58 |
| Bluebell | **Iida Tenshi**, em út nhà Iida, quirk `Marlin Speed` | ch8–10 |
| Kikyo | Zhang Yun, Trung Quốc, quirk `Stalk` | ch27 |
| Daisy | Bill Clemens, Úc, quirk `Invincible` | ch27 |
| Zakuro | Molokai, Hawaii; em trai **Kai** | ch18–21 |
| Globe | **Liliya Glass**, soulmate **Xanxus Vitale**, là một **Cloud** | ch68, ch78 |
| Berserk | **Theodor Manz**, mẹ = **Viktoria Manz / Miss Guidance** (the Epitome) | ch110 |
| Michaela Diamant | phụ nữ chuyển giới; mẹ là villain **Cassandra Diamant** | ch31 |
| Ojiro Mashirao | **người dùng One For All thứ 9** | ch94, ch102 |
| Hatsume Mei | soulmate của **Irie Shoichi**; cũng time-travel | ch92 |
| Toga Himiko | soulmate của **Belphegor**; gia nhập Varia | ch77 |

⚠️ **Byakuran cố tình phái Izuku đi giết toàn bộ hero Nhật, biết chắc Izuku sẽ giết Hawks** — soulmate của Izuku và **anh ruột của chính Byakuran**. Hắn thừa nhận đã **ghen tị và căm ghét anh mình**, tưởng anh được cho đi để có đời sống tốt hơn trong khi mình bị vứt bỏ. (ch58–60)

**Tuyến Globe — đóng hoàn toàn**

- Cha Liliya = **Edmund Glass**, hero **Spiegel**, **thành viên thứ năm bí mật của the Epitome**. Uỷ ban tha ông để giữ Liliya làm quân cờ.
- **Vongola phái Varia giết cha mẹ cô.** Lussuria đánh chết Edmund; Squalo chém đầu Susanna — nhưng **cố ý tha Liliya**, dựng hiện trường để cô có vẻ đã chết.
- **Timoteo (Nono) đích thân** gọi **Teioku Shion** (quirk `Amnesia`) khoá ký ức cô, rồi **tự tay giết Shion**.
- Lý do: Liliya là **"vật gây xao nhãng"**. **Cradle Affair chính là kế hoạch Xanxus cướp Vongola để đưa cô lên làm nữ hoàng.** Timoteo khai Xanxus "không còn nghĩ đến Vongola nữa".
- Timoteo khai với Uỷ ban rằng cô là soulmate của Xanxus để kiểm soát cô. Xếp hạng nguy cơ hoá villain của cô: **6/5** — vượt thang.
- **Tsuna giết Timoteo** trong Operation ONATOV, đoạt Vongola. Iemitsu cũng chết.

**Cha của Theodor — ch77, đọc toàn văn**

Không có tên. Người trên ngai, mũ sắt, "đã sống quá lâu", nhắc **"Bermuda's grandchildren"** ở ngôi thứ ba, và câu chia tay ***"Bring some ramen when you stop by tomorrow!"***.
⇒ chuỗi bằng chứng vẫn **hội tụ về Kawahira/Checkerface**, tầng `derived`, không nâng được. Xem [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]].

### Chưa chắc — CHƯA phải kết luận

*(Cập nhật 30/08/2026 sau phán quyết của Aurel — hai mục đã đóng, gạch bỏ.)*

- **Cha Theodor.** Đọc hết 127 chương vẫn **không có câu nào gọi tên**. Ứng viên duy nhất: Kawahira, `confidence: 0.8`. **Vẫn mở.**
- **`Wonomichi` là cha hay là con?** → ✅ **ĐÓNG.** Aurel chốt: Wonomichi = Theodor = Berserk, **một người**. Xem [[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]].
- **Berserk đã làm gì với Globe, và biến đi đâu.** ch70 hắn ép cô lấy lại ký ức. ch110 cả hai biến mất khỏi tầm mắt Uỷ ban. Không chương nào kể lại chuyện gì đã xảy ra giữa hai người. **Vẫn mở.**
- **Cha của Byakuran/Hawks.** → ✅ **Aurel chốt: diễn biến trong truyện đang chỉ đúng hướng này** (con thứ của boss Estraneo, đổi họ Takami), trừ khi có bước ngoặt chưa được nhắc tới. `user_canon`, `confidence: 0.9`.

### 🔴 Lỗi phương pháp — Aurel chỉ ra 30/08/2026

**Vấn đề:** khối 4 đọc hết 127 chương nhưng **không tóm tắt sự kiện theo từng chương**. Hậu quả
đo được ngay, hai lỗi cùng loại:

| Lỗi | Thực tế trong truyện | Tôi ghi thành |
|---|---|---|
| Globe = soulmate Xanxus | ch68 ghi thẳng `Soulmate: Xanxus Vitale` trong hồ sơ mật | xếp tầng `derived` dựa vào phản ứng ở ch53 |
| Wonomichi | ch33 + ch47 + ch127 đủ để chốt hắn là con | để ngỏ hai cách đọc |

**Nguyên nhân:** đọc tuần tự theo khối 23–25k từ rồi mới rút gọn ở cuối. Dữ kiện đã lọt qua
mắt vẫn **rơi mất** giữa lúc đọc và lúc viết, vì không có chỗ nào bắt buộc phải ghi nó lại.

**Aurel nói thẳng:** *"việc đọc và tóm tắt sự kiện để tránh lọt thông tin. và đôi khi tác giả
đưa rất nhiều manh mối trong một chương."*

**Luật mới cho mọi khối đọc từ nay:**

> **Đọc một chương → tóm tắt sự kiện chương đó → mới sang chương sau.**
> Không gộp chương lại rồi tóm tắt một lượt. Mỗi chương phải để lại dấu vết riêng của nó,
> kể cả khi chương đó "không có gì". Chương trông như không có gì chính là chương tác giả
> hay gài manh mối nhất.

Sản phẩm: [[bien-ban-su-kien-untch]] — biên bản sự kiện từng chương, ch1–127.

### Mâu thuẫn với thứ đã biết

- Ba kết luận cũ sai, liệt ở trên.
- **`Torikabuto` có thể không phải người.** Bluebell nói thẳng "Torikabuto không phải người"; Izuku khẳng định hắn là **mothman**; hắn chỉ trả lời "No comment". Đây là chi tiết hài, nhưng lặp lại nhiều lần đủ để không bỏ qua.
- **Trí nhớ tương lai đã hết tin cậy trong chính truyện.** Nedzu và Shinsou đều nói rõ: butterfly effect đã đủ mạnh để mọi ký ức tương lai chỉ còn là *khả năng*, không phải *sự thật*. Ghi lại vì nó ràng buộc mọi tính toán viết tiếp.

### Phiên sau bắt đầu từ

**Bước 3 — văn phong.** Toàn bộ 127 chương đã có bản văn xuôi sạch tại
`03_Workspace/untch-extract/chapters/`. Chạy `style_metrics.py` trên đó.
⚠️ Phải quyết trước: **loại các cảnh log chat MNet ra khỏi phép đo hay không** (ch54, ch71, ch75, ch115 gần như toàn bộ là log chat). Không loại thì mật độ thoại và độ dài câu đều lệch nặng.

**Nguyên tác:** không còn chương nào chưa đọc.
