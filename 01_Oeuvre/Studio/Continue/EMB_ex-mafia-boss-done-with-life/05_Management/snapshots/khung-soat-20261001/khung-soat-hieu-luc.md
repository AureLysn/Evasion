---
id: arc.EMB.khung-soat-hieu-luc
type: arc
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-10-13
archived_note: "Soat khung-nam-arc 01/10/2026; khung da superseded (emb-chot-dung-lai-khung), ket luan nam trong emb-chot-dung-lai-khung va emb-chot-goc-khung-moi. Chuyen vao luu tru 13/10/2026."
aliases: ["soat hieu luc khung nam arc", "hang nao cua khung con dung", "khung sau khi luu tru tam chuong"]
related: ["[[khung-nam-arc]]", "[[emb-lam-lai-lan-ba]]", "[[20261001-soat-nen-du-kien]]", "[[aurel-main]]", "[[tropes]]"]
source:
  type: inference
  ref: "plan-continuation Mode 3, 01/10/2026, worker 3/3 (hieu luc). De xuat, chua duyet."
authority: ai
confidence: 0.7
always_load: false
load_for: [planner]
tags: [d/fanfic, arc, proposal, k/note, p/personal]
last_updated: 2026-10-13
---

# Soát hiệu lực [[khung-nam-arc]] — hàng nào còn đứng sau 01/10

> ⚠️ **Đề xuất, chưa duyệt. Chỉ báo cáo.** Không dòng nào của [[khung-nam-arc]], [[aurel-main]] hay note nào khác bị sửa. Bước 3 của [[emb-lam-lai-lan-ba]], đơn vị **hiệu lực**. Đơn vị **giọng** *(K2)* và **điểm danh** *(K3)* do hai worker khác làm; gặp việc của họ thì note này chỉ ghi một dòng rồi đi tiếp.
>
> Mọi phương án ở mục 6 là **phương án**, không phải chốt. Mọi câu *"suy ra"* là suy luận của AI.

## 0. Kết quả trước

**107 hàng** của khung được soát *(inspected: đọc từng dòng, đối chiếu frontmatter của note làm chỗ dựa)*.

| Nhãn | Số hàng | Nghĩa |
|---|---|---|
| ✅ đứng | **76** | chỗ dựa là nguyên tác, decision `locked` / `active`, hoặc lời Aurel còn hiệu lực |
| ⚠️ lệch | **14** | mâu thuẫn với một note đang sống. Phải có người phân xử |
| 🔁 đã bị sửa theo thứ nay chết | **9** | phải lột khỏi khung |
| ❌ chờ câu hỏi | **8** | phụ thuộc một trong 12 câu `unresolved` |

Ngoài nhãn chính, **6 hàng ✅** *(R1 · B8 · B11 · C2 · C6 · K6)* mang một mệnh đề phụ đang chờ câu hỏi; ghi ở cột cuối từng bảng.

Năm điều nặng nhất, xếp theo số hàng bị kéo theo:

1. 🔴 **[[emb-chot-tag-theo-arc]] còn `locked` mà khung chưa bao giờ chép nó vào.** Decision ấy nói khung *"hết hiệu lực ở phần phân bổ nhân vật"*. Thứ từng thi hành nó *(khung riêng arc Brat)* đã vào kho lưu trữ ngày 01/10. Kết quả: khung hôm nay quay về đúng bản phân bổ mà một decision đang sống tuyên là sai. Mục 2, L1.
2. 🔴 **Arc 3 Child không còn bản nào sống.** Bảng 17/09 mang banner *"superseded 25/09, không dùng khi lập kế hoạch"*; bản thay nó *(dàn ý 25/09)* đã lưu trữ; hai decision đứng sau bản thay đều `superseded`. Mục 2, L2.
3. 🔁 **Chín hàng mang nội dung của tám chương đã bỏ**: *"arc đã xong 17/09"*, *"thực tế ~21.000"*, *"12 sự kiện · năm chương · ~47.500"*, *"Việc kế tiếp: thẻ cảnh Ch1"*. Dòng **Cộng** của bảng tổng lượng không còn khớp chính bảng của nó *(executed: 5+12+7+8+5 = 37, bảng ghi 32)*.
4. ⚠️ **Nguyên tác có một mốc mà khung không có, và khung có một mệnh đề mà nguyên tác không có.** Mục 2, L4.
5. ⚠️ **Bảng hook "15/15" nay là 15/18.** Mục 4.

## 1. Cách soát

| | |
|---|---|
| Cổng trước khi làm | `plan_gate.py --project EMB` → **exit 0** *(executed)* |
| Nạp ngữ cảnh | `context_resolver.py --root . --project EMB --role planner --branch aurel-main` → **exit 1**, cảnh báo nạp 202 note *(executed)* |
| Mốc state | cuối [[p2-ch1]], theo [[emb-lam-lai-lan-ba]] và [[drop-point]] |
| Đơn vị đếm | một **hàng** = một dòng bảng, một banner, hoặc một câu luật đứng riêng trong khung. Số dòng ghi theo file khung ngày 01/10 |
| Nhãn chính | lấy theo việc nặng nhất phải làm với hàng: 🔁 *(lột)* trên ⚠️ *(phân xử)* trên ❌ *(chờ)* trên ✅. Mệnh đề còn đứng trong một hàng nhãn khác ghi ở cột cuối, và được gom lại ở mục 7 |
| Không làm | không đọc lại từng fact đối với nguyên tác, trừ **một** chỗ ở L4 *(executed: tìm chữ trong hai file HTML nguồn)*. Không chép gì từ `80_Archive/` |

⚠️ Một lần duyệt của Aurel ngày 17/09 là chỗ dựa hợp lệ **cho tới khi** một decision sau nó, cùng tầng `user`, nói ngược lại. Chỗ nào hai lời Aurel cùng sống mà ngược nhau thì note này **dừng ở ⚠️**, không chọn hộ.

## 2. Bốn chỗ phải phân xử trước 12 câu hỏi

Không chỗ nào trong bốn chỗ này có note `question`. Đề nghị mở, mình không mở vì lượt này chỉ được tạo một file.

### L1 · [[emb-chot-tag-theo-arc]] đấu với bản phân bổ nhân vật của khung

```
CONFLICT
Khung     : "Tsuna & Xanxus — Child (Cradle nổ ra, Tsuna ~9) → Teen" · "Tsuna & Fon — Teen"
            · "Tsuna & Reborn — Teen → Young Adult" · Bermuda "tiếp xúc" ở Child      [user duyệt 17/09]
Decision  : "Tag của works/57740797 (Part 2) là danh sách vai của arc Brat."
            "khung-nam-arc phải dựng lại, không phải vá ... nội dung khung thì hết hiệu lực
             ở phần phân bổ nhân vật."                                                  [user, locked 19/09]
Precedence: cùng tầng user; decision sau hơn hai ngày  =>  DỪNG, Aurel quyết
```

- Decision liệt kê **sáu** dòng xếp sai: Xanxus · Fon · Arcobaleno · Reborn · Vindice / Bermuda · Mukuro / Chrome. Khung chỉ nói tới **bốn** quan hệ có tag.
- Cùng decision: *"Brat không phải arc nhỏ — nó là arc lớn nhất, và hình dạng năm arc sai từ gốc."* Khung vẫn ghi Brat **5 sự kiện, ~2 chương**.
- Ranh giới decision tự đặt, và nó làm cái lệch **hẹp hơn** nó trông: tag *không* nói họ lên trang sớm hay muộn, cũng không nói mức xuất hiện *(hồi tưởng, một lá thư, hay lên trang thật)*. Nên các mốc về sau **không** bị nó đụng: Cradle lúc Tsuna ~9–10, phá băng 13–15, Reborn tới đền năm 18.
- Khung không link tới decision này *(executed: 0 lần trong file khung)*. [[emb-chot-dung-lai-khung-brat]] ⛔, decision từng chọn *dựng lại khung riêng cho Brat, không dựng lại cả năm arc*, nay `superseded`.
- [[emb-lam-lai-lan-ba]] xếp decision này ở hàng **Giữ**, và bước 4 của nó ghi *"plan-continuation arc Brat, bắt đầu bằng khung riêng arc"*. *(suy ra)* Hai việc ấy đọc cùng nhau thì không ngược nhau; cái thiếu là một dòng trong khung nói phần nào của nó là bản ghi 17/09, phần nào còn dùng.

**Phương án, chưa ai chọn:** [giữ decision, ghi vào khung rằng sáu dòng tag phải có mặt ở Brat, mức có mặt do câu hỏi quyết] · [thu hẹp hoặc rút decision, khung 17/09 đứng nguyên] · [giữ khung làm bản ghi 17/09, mọi thứ về Brat dồn sang khung riêng arc Brat].

Gỡ được: hàng M1 · R0 · R2 · R3 · R4 · C5 · K3, và định khung cho [[q-brat-xanxus-vao-the-nao]], [[q-brat-reborn-toi-dau]], [[q-brat-dai-bao-nhieu]].

### L2 · Arc 3 Child không còn bản sống

| Lớp | Hiện trạng |
|---|---|
| Bảng 17/09 trong khung *(dòng 100–108)* | mang banner dòng 96: *"⛔ Bảng dưới là bản duyệt 17/09, superseded 25/09/2026. Giữ để truy vết; không dùng khi lập kế hoạch."* |
| Bản thay *(dòng 94)* | *"Khung hiện hành của Arc 3 nằm ở child-dan-y..."* → file đã vào `80_Archive/.../ban-20261001/` |
| Hai decision đứng sau bản thay | [[emb-lam-lai-child-tu-khung]] ⛔ và [[emb-duyet-dan-y-child]] ⛔, đều `superseded` 01/10 |

Một thứ `superseded` không tự sống lại; vault ghi luật ấy nhiều lần *("khung mới dùng lại cái nào thì đưa về `active` kèm bằng chứng mới")*. Nên phải có một câu của Aurel. Ở mục 3, chín hàng của bảng 17/09 được chấm theo chỗ dựa của chính chúng, kèm chữ **treo**.

**Phương án:** [cho bảng 17/09 sống lại, lột hai banner] · [để Arc 3 trống tới khi Brat viết xong, theo luật *một arc một lúc* của [[aurel-main]]] · [giữ bảng 17/09 làm ý chính, năm cổng của [[q-child-nam-cong]] quyết phần còn lại].

### L3 · Ngoại lệ forbid #7 cho ba sự kiện Child

[[aurel-main]] dòng 79. Chi tiết ở mục 5. [[20261001-soat-nen-du-kien]] mục K4 đã hỏi, ô trả lời ghi *"chưa trả lời"*.

### L4 · Một mốc của nguyên tác khung không có; một mệnh đề của khung nguyên tác không có

P1 Ch3, đoạn biên niên, nguyên văn *(executed: tìm trong `sources/raw/original-fic/Local_Mafia_Boss_Blames.html`)*:

> *"Tsuna would find himself unceremoniously titled as the Sky of Namimori, realize pretending to be flame negative was futile, and would proceed to just wing it."*

| | Khung | Nguồn |
|---|---|---|
| **Thiếu** | 0 lần nhắc *Sky của Namimori*, *ứng biến* *(executed)*. Hàng H3 *"Bắt buộc xảy ra ở giữa"* không có mốc này, cũng không có *"âm tính năm bảy"* và *"vòm Sky thành truyền thuyết do nhà Hibari phát tán"* | cả ba nằm trong cùng đoạn, `fic_explicit`, ghi ở [[fact-toan-canh-tuong-lai]] |
| **Thừa** | dòng 85 *"Cái vỏ này về sau **tự chặn cậu**"* · dòng 105 *"cover story âm tính **chặn đúng việc cậu cần làm**"* · dòng 108 *"vỏ âm tính chặn một việc"* | nguồn nói cái vỏ **vô ích** rồi cậu **cứ thế ứng biến**. Không có câu nào nói nó chặn cậu |

Mệnh đề *"tự chặn"* đi vào khung từ đoạn cuối của [[fact-toan-canh-tuong-lai]] và [[tsuna-am-tinh-tren-giay]]; cả hai chỗ ấy là **lời bình của AI** đặt cạnh câu trích, không phải câu trích. *(suy ra)* Gốc xa hơn là ghi chú *"Cover story tự chặn mình — Ch7"* trong `questions/_MOC.md`, lấy từ log dàn ý cũ.

Hệ quả cho hàng S6 *(Tsunashige ở School)*: Aurel đã duyệt việc Tsuna *"diễn đúng phiên bản của Iemitsu"* lúc 10–12 tuổi. Nguồn không cho biết lúc ấy cậu **còn** giả âm tính hay đã thôi. Hai cái không ngược nhau, nhưng dàn ý School phải chọn.

🔵 Câu *"just wing it"* là câu **hài** duy nhất của đoạn biên niên. Việc nó vắng khỏi khung thuộc đơn vị giọng *(K2)*; ở đây chỉ ghi rằng nó là dữ kiện.

**Phương án:** [thêm ba mốc vào H3, đổi ba chỗ *"chặn"* thành câu của nguồn] · [giữ *"tự chặn"* như một mở rộng của nhánh, khai là `planned`, không gắn cho tác giả].

## 3. Soát từng hàng

Cột **Dòng** là số dòng trong [[khung-nam-arc]]. Trích nguyên văn, rút ngắn bằng dấu ba chấm.

### M · Ba câu mở đầu

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| M1 | 25 | *"Aurel duyệt trọn 17/09/2026 — cả sáu mục xin duyệt, cộng ba sửa"* | ⚠️ | Lượt duyệt là thật: [[emb-duyet-khung-nam-arc]], `active`. Nhưng [[emb-chot-tag-theo-arc]] *(locked, 19/09)* rút hiệu lực phần phân bổ nhân vật. L1 |
| M2 | 27 | *"ý chính cho cả năm arc còn lại, không có beat chương ... một arc tại một thời điểm"* | ✅ | [[aurel-main]] mục *Luật dựng dàn ý* |
| M3 | 29 | *"Thay cho bốn note đã lưu trữ ngày 15/09 ... Có mượn vật liệu của Aurel"* | ✅ | [[emb-lam-lai-tu-nguon]] ngoại lệ 17/09 · [[emb-duyet-khung-nam-arc]] §B |

### H · Hai đầu cố định

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| H1 | 35 | *"cuối p2-ch1: Indra vừa tuyên thệ, Estraneo đã bị xoá, Tsuna ~6–7 tuổi"* | ✅ | [[emb-chot-sau-p2-ch2]] mục 5 · [[drop-point]] · [[emb-lam-lai-lan-ba]] mục *Mốc state* |
| H2 | 36 | *"Tsuna 18, Tsunashige (14) và Reborn tới đền. Let the games begin."* | ✅ | [[fact-toan-canh-tuong-lai]], `fic_explicit` · tuổi 14 là giả định của Aurel ở [[tuoi-va-moc]] |
| H3 | 37 | *"Nana và Iemitsu trở về sau hơn một thập kỷ · Tsunashige lớn lên trong lãnh thổ Vongola · Reborn nhận Tsunashige · Vongola không bắt được Tsuna"* | ✅ | Vế một là câu chữ nguyên tác. Ba vế sau là **suy ra** ghi trong [[fact-toan-canh-tuong-lai]]. ⚠️ thiếu ba mốc, L4 |
| H4 | 38 | *"Tsuna thành Decimo · tuyến trả giá cho lời tiên tri · Iemitsu có arc"* | ✅ | [[aurel-main]] forbid #1 và #3 · [[emb-chot-khung-arc]] mục 4 |

### G · Cách ghép A · B · C

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| G1 | 46 | *"C — người quanh Tsuna khám phá ra cậu ... xương sống"* | ✅ | [[truc-chinh]] · [[emb-duyet-khung-nam-arc]] mục 1 |
| G2 | 47 | *"B — người mới mang khoảnh khắc quyết định trên trang ... mỗi arc 1–2 người"* | ✅ | [[character-arcs]] · [[emb-chot-khung-arc]] mục 1 |
| G3 | 48 | *"A — Kyoya lớn lên có cảnh ... một cảnh Kyoya mỗi arc, ít nhất"* | ✅ | [[character-arcs]] · [[kyouya-loai-chu-chot]] |
| G4 | 50–52 | *"Mỗi arc phải nêu đích danh tối thiểu 2 người đổi cách nhìn về Tsuna"* | ✅ | [[emb-duyet-khung-nam-arc]] §1. Chính khung phạm luật này ở hàng S2 |
| G5 | 54 | *"thay đổi dài diễn ra ngoài trang ... hành động lớn kể bằng hai mép"* | ✅ | [[aurel-main]] forbid #7 · [[emb-chot-khung-arc]] mục 1 |
| G6 | 56 | *"dáng mỗi arc theo rhythm: nạp → xả ... đóng bằng công cụ nén"* | ✅ | [[rhythm]] mục 3, đo trên nguyên tác. Note ấy tự ghi *n = 2, chưa đủ để gọi là luật* |

### R · Bốn quan hệ có tag

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| R0 | 60 | *"Tag Relationships của Part 2 hứa bốn quan hệ chưa lên trang. Khung trả cả bốn"* | ⚠️ | [[emb-chot-tag-theo-arc]]: sáu dòng, và nơi trả là **Brat**. L1 |
| R1 | 64 | *"Tsuna & Irie Shouichi — Brat → Child — bạn cùng tuổi đầu tiên"* | ✅ | [[emb-duyet-khung-nam-arc]] mục 2 · [[emb-chot-tag-theo-arc]] ghi *"đúng sẵn"* · lỗ *chưa có bạn ngang lứa* ở [[khung-oc]]. Phụ ❌: cảnh cụ thể chờ [[q-shouichi-loi-moi]] |
| R2 | 65 | *"Tsuna & Xanxus — Child (Cradle nổ ra, Tsuna ~9) → Teen (phá băng, 13–15)"* | ⚠️ | L1: tag nói Brat. Chờ thêm [[q-brat-xanxus-vao-the-nao]]. **Còn đứng:** hai mốc Cradle và phá băng, [[tuoi-va-moc]] · [[emb-chot-khung-arc]] mục 2 · [[tuyen-xanxus]] |
| R3 | 66 | *"Tsuna & Fon — Teen — Storm chính ... đường vào qua dòng Wu của Indra và Tam Hoàng"* | ⚠️ | L1: tag nói Brat, và **chưa có câu hỏi nào** hỏi Fon vào Brat ra sao. **Còn đứng:** *Fon là Storm chính*, [[emb-chot-khung-arc]] mục 2 |
| R4 | 67 | *"Tsuna & Reborn — Teen → Young Adult — người duy nhất nhìn thẳng mắt cậu"* | ⚠️ | L1: tag nói Brat. Chờ thêm [[q-brat-reborn-toi-dau]]. **Còn đứng:** đích năm 18; câu *nhìn thẳng mắt* là reply của tác giả *(executed: có trong `sources/raw/ao3/AO3-author-replies.md`)* |
| R5 | 69 | *"hook-sukunabikona vào qua Arcobaleno: Reborn làm Sun của Tsuna ... trong nhánh chỉ gieo"* | ✅ | [[emb-chot-cau-hoi-mo]] mục 1. Decision ấy tự ghi: câu *"tác giả đã đưa dấu hiệu"* **chưa tìm thấy nguồn**, giữ như cách đọc của Aurel |

### N · Câu dẫn năm arc

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| N1 | 73 | *"Tên arc và độ tuổi theo khung Aurel dựng từ đợt 8 ... Ba dòng tông ... giữ nguyên, Aurel xác nhận 17/09"* | ✅ | [[emb-duyet-khung-nam-arc]] mục 3. Ba dòng tông đo với lời chê *thiên buồn* ra sao: thuộc đơn vị giọng *(K2)* |

### B · Arc 2 phần còn lại, Brat

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| B0 | 75 | *"Brat · ~6–7 → 7"* | ❌ | [[q-brat-dai-bao-nhieu]]. Đầu `~6–7` đứng *(H1)*; đuôi `7` thì không. [[tuoi-va-moc]] mục 4: *"7 tuổi lúc nào thì phải xem phát triển nội dung"* |
| B1 | 77 | *"This Wasn't Supposed to Happen · I Have a Headache. · This is under control."* | ✅ | [[emb-duyet-khung-nam-arc]] mục 3 |
| B2 | 81 | *"Shouichi ... · một người lớn bình thường: Sugita Gen'ichi, thầy thuốc nhà Sawada"* | ✅ | [[emb-chot-thay-thuoc]] *(locked)* · [[nguoi-lon-co-trach-nhiem]] · [[emb-sua-con-troi-dat]]. Đủ hai tên cho luật G4. Việc ông có còn là POV trọn một chương hay không thì **không** còn chốt: nó nằm ở dàn ý đã lưu trữ |
| B3 | 82 | *"Tsuyoshi hoặc mẹ Takeshi khi sát thủ tới"* | ❌ | [[q-me-takeshi-ai-quyet]]. Hook thì đứng: [[hook-me-takeshi-va-sat-thu]], `fic_explicit` |
| B4 | 83 | *"courting hoàn tất; bond được viết như một sự kiện, có nghi lễ"* | ✅ | [[truc-chinh]] *("mỗi bond mới phải được viết như một sự kiện lớn")* · [[drop-point]] mục 7. Cờ: [[aurel-main]] forbid #9 và [[tropes]] mục 5.4 đòi **mỗi nghi lễ là một nước cờ**; khung chưa nói nước cờ nào |
| B5 | 84 | *"cơn trôi dạt đã dứt ... ống tre đã tới tay và đã làm đúng việc nó hứa · Indra neo lại Namimori, Kyoya mất cái mốc cậu đếm"* | ✅ | [[emb-sua-con-troi-dat]] *(locked)* · [[ong-tre]] · [[emb-chot-cau-hoi-mo]] mục 3. *(suy ra)* Hàng mang tên **Áp lực** nhưng cả ba vế đều là việc đã yên; Brat hiện không có áp lực nào được ghi |
| B6 | 85 | *"arc đóng ở cột mốc biên niên duy nhất tác giả nêu — năm bảy tuổi Tsuna tỉnh lại bình thường, âm tính Flame trên giấy tờ"* | ❌ | [[q-brat-dai-bao-nhieu]] hỏi đúng việc *đóng ở đâu*; [[q-xuong-song-brat]] quyết nó đóng **bằng gì**. **Còn đứng:** mốc *âm tính năm bảy* phải xảy ra, `fic_explicit`. Vế *"tự chặn cậu"*: L4 |
| B7 | 86 | *"Decimo được phép bị nhìn, nhưng chỉ trong Namimori"* | ❌ | [[q-xuong-song-brat]] *(cái bóng là gì)*. Chữ *"chỉ"* còn chờ [[q-brat-xanxus-vao-the-nao]] và [[q-dac-vu-vongola]] *(suy ra)* |
| B8 | 87 | *"ong-tre · nguoi-ban-cu · kyouya-loai-chu-chot · hook-me-takeshi-va-sat-thu · mở phần đầu hook-ba-cua-con-lai"* | ✅ | cả năm hook `open`; bốn hook đầu vừa trả về `open` ngày 01/10. Phụ ❌: cách trả [[nguoi-ban-cu]] chờ [[q-ten-con-cao]] |
| B9 | 88 | *"5 — bond Kyoya · sát thủ tới nhà Yamamoto (người quyết = mẹ Takeshi, sachiko) · ... → ~19.000 từ ≈ 2 chương. Dàn ý chi tiết: brat-dan-y ⛔"* | 🔁 | *"người quyết = mẹ Takeshi"*: [[emb-chot-me-takeshi]] mục 1 đã mở lại 01/10, và ngược với hàng B3 cùng bảng. *"Dàn ý chi tiết"*: đã lưu trữ. *"5 sự kiện, 2 chương"*: [[emb-chot-tag-theo-arc]] nói Brat là arc lớn nhất |
| B10 | 89 | *"Số thật — arc đã xong 17/09: Ch1 = 9.561 · Ch2 = 10.763 → 20.324 từ"* | 🔁 | Hai chương ấy nằm trong tám chương đã lưu trữ. **Còn đứng:** vế *"Ước lượng là sàn"*, [[emb-chot-uoc-luong-tu-la-san]] |
| B11 | 90 | *"ống tre giải cả lõi lẫn cô lập ... bigger carnivore = Indra · Nagi biết chuyện cha mẹ · người bạn cũ = natsu"* | ✅ | [[emb-chot-cau-hoi-mo]] mục 2, 3, 5, `active`. Phụ ❌: vế *"người bạn cũ = natsu"* chờ [[q-ten-con-cao]], và đang cọ với tiêu đề của [[emb-chot-tsuna-va-natsu-kham-pha-lai]] *("con cáo không phải Natsu")* |

### C · Arc 3, Child — **cả bảng đang treo, L2**

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| Ca | 94 | *"Dựng lại và duyệt 25/09/2026 ... Khung hiện hành của Arc 3 nằm ở child-dan-y ⛔: 12 sự kiện, năm chương, ~47.500 từ"* | 🔁 | [[emb-lam-lai-child-tu-khung]] ⛔ và [[emb-duyet-dan-y-child]] ⛔ `superseded` 01/10; dàn ý đã lưu trữ |
| Cb | 96 | *"Bảng dưới là bản duyệt 17/09, superseded 25/09/2026 ... không dùng khi lập kế hoạch"* | 🔁 | Banner đặt theo một decision nay đã chết. L2 |
| C0 | 92 | *"Child · 7 → 9"* | ❌ | đầu `7` chờ [[q-brat-dai-bao-nhieu]]. Đuôi `~9` đứng: Cradle, [[tuoi-va-moc]] |
| C1 | 98 | *"Things Are Escalating · Constant Panic. · Mostly under control."* | ✅ treo | [[emb-duyet-khung-nam-arc]] mục 3 |
| C2 | 102 | *"xã hội Flame Nhật ngoài Namimori ... cặp song sinh, hai OC Lightning; người xin vào Sanctuary"* | ✅ treo | Cặp song sinh: [[emb-chot-cap-song-sinh]] *(locked)*. Phụ ❌: *người xin vào Sanctuary* và nơi trình diện chờ [[q-child-nam-cong]] cổng 1 và 2 |
| C3 | 103 | *"đứa trẻ Saint-Exavier (Fūta) được tìm thấy và chọn ở lại · Tomoko quyết lộ mặt"* | ❌ | [[q-child-nam-cong]] cổng 3 · [[q-cam-khoan-vendicare]] *(đứa trẻ tự tới hay được tìm)*. Khung viết *(Fūta)* như dữ kiện; [[hook-dua-tre-saint-exavier]] xếp việc nối ấy là **suy luận mạnh**, không phải câu chữ |
| C4 | 104 | *"lãnh thổ lớn dần; Indra không rời đi, nên cậu tự đặt mốc mới"* | ✅ treo | [[emb-chot-cau-hoi-mo]] mục 3 · [[kyouya-loai-chu-chot]] |
| C5 | 105 | *"cover story âm tính chặn đúng việc cậu cần làm · Bermuda tò mò đã thành tiếp xúc"* | ⚠️ | Vế một: L4. Vế hai: L1 *(Vindice là tag Brat)*, và chờ [[q-bermuda-an-toi]] |
| C6 | 106 | *"tin Cradle nổ ra ở Ý khi Tsuna ~9, cuối arc — cậu biết mà chưa làm gì"* | ✅ treo | [[tuoi-va-moc]] · [[tuyen-xanxus]] *("3–5 năm cậu biết mà chưa làm gì")*. Phụ ❌: ai chứng kiến, [[q-child-nam-cong]] cổng 4; có dựng thành cảnh không, L3 |
| C7 | 107 | *"Decimo ở đỉnh năng lực — và vẫn có Lavinia (thất bại tác giả đã ghi, không được xoá)"* | ✅ treo | [[fact-bang-tinh-hinh-ke-hoach]] · [[tropes]] mục 3.1 |
| C8 | 108 | *"7 — tìm thấy Fūta · Tomoko lộ mặt · tiếp xúc Bermuda · người xin vào Sanctuary được nhận · ... → ~26.600 từ ≈ 3 chương"* | ❌ | [[q-child-nam-cong]] cả năm cổng · [[q-bermuda-an-toi]] · [[q-cam-khoan-vendicare]] |

### S · Arc 4, School

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| S0 | 110 | *"School · 10 → 12"* | ✅ | duyệt 17/09. Khớp nguồn: cha mẹ về *"more than a decade later"* *(suy ra: Tsuna từ 10 trở lên)* |
| S1 | 112 | *"Everything Leaves a Trace · Again!? · …Oops."* | ✅ | [[emb-duyet-khung-nam-arc]] mục 3 |
| S2 | 116 | *"Nana trở về sau hơn một thập kỷ — người mẹ nhìn đứa con đã tỉnh mà bà giấu chồng suốt mười năm"* | ⚠️ | Nana thì đứng: [[fact-toan-canh-tuong-lai]] · [[nana-giau-viec-tsuna-tinh]]. Lệch: hàng nêu **một** tên, luật G4 đòi **hai**. Và [[nguoi-lon-co-trach-nhiem]] *(user)* ghi *"musashi gọi tên mẫu hình ở Arc 4"*, khung bỏ vế ấy. Musashi vắng khỏi cả khung: thuộc đơn vị điểm danh *(K3)* |
| S3 | 117 | *"Nana chọn phía · Shouichi ở tuổi đủ lớn để tự chọn con đường hacker của mẹ"* | ✅ | duyệt 17/09, `planned` |
| S4 | 118 | *"trường học là lãnh thổ mới; Kyoya tự quyết cách cai quản nó"* | ✅ | duyệt 17/09. Ghi nhận: [[emb-chot-nguyen-to-di-san]] *(locked)* đặt gốc Ban Kỷ luật ở một sự kiện Brat nay đã bỏ |
| S5 | 119 | *"Iemitsu trả giá — ngắn. Một cảnh, không arc"* | ✅ | [[hook-iemitsu-tra-gia]] · [[aurel-main]] forbid #3 · [[tropes]] mục 5.3 |
| S6 | 120 | *"hai anh em gặp nhau ở arc này, Tsuna diễn đúng phiên bản của Iemitsu ... phải ghi rõ ai trả giá cảm xúc"* | ✅ | [[emb-duyet-khung-nam-arc]] mục 5 và §5 · [[emb-chot-khung-arc]] mục 3. Cờ L4. Điều kiện *"ai trả giá cảm xúc"* đọc cạnh lời chê *thiên buồn*: thuộc K2 |
| S7 | 121 | *"nằm trong băng; Tsuna đang đợi sơ hở, để không gây chú ý từ Timoteo và Vongola"* | ✅ | [[emb-chot-cau-hoi-mo]] mục 6 |
| S8 | 122 | *"Nana và Iemitsu rời đi lần nữa"* | ✅ | [[emb-chot-cau-hoi-mo]] mục 6 |
| S9 | 123 | *"lần đầu công cụ Decimo vô dụng: không kế hoạch nào dành cho mẹ mình"* | ✅ | duyệt 17/09, `planned` |
| S10 | 124 | *"7 — Nana và Iemitsu về · Iemitsu trả giá · Nana chọn phía · Tsunashige gặp Tsuna (đề xuất) · ..."* | ✅ | duyệt 17/09. Hai chỗ vặt: chữ *"(đề xuất)"* đã cũ so với S6; Iemitsu có mặt ở 3 trên 7 sự kiện, sát mép forbid #3 *(suy ra)* |

### T · Arc 5, Teen

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| T0 | 126 | *"Teen · 13 → 15"* | ✅ | [[tuoi-va-moc]] *(phá băng 13–15)* |
| T1 | 128 | *"A New Future · We Need to Talk. · Still worth it."* | ✅ | [[emb-duyet-khung-nam-arc]] mục 3 |
| T2 | 132 | *"Kawahira, khi được tự do · Arcobaleno, được giải nguyền mà không biết ai giải — Reborn trong số đó"* | ✅ | [[truc-chinh]] ưu tiên 6 · [[emb-chot-cau-hoi-mo]] mục 1 |
| T3 | 133 | *"Xanxus ra khỏi băng và tấn công; hoà hợp hai chiều xảy ra giữa trận · Fon chọn làm Storm"* | ⚠️ | [[aurel-main]] forbid #7: *"dựng cảnh bên trong một hành động lớn"* bị cấm, *"hành động lớn kể bằng hai mép"*. [[tuyen-xanxus]] *(user)*: *"trong lúc đánh nhau, họ vô tình hoà hợp"*. Cùng tầng, và việc hoà hợp là *vô tình*, không phải một khoảnh khắc quyết định. *(suy ra)* Cần một dòng: kể bằng hai mép, hay xin ngoại lệ. Vế Fon: L1 |
| T4 | 134 | *"Kyoya ~13–15, đủ lớn để thấy cái giá Tsuna tự trả và giấu"* | ⚠️ | [[tuoi-va-moc]]: *"chênh chốt là +2, ngày 20/09"*. Tsuna 13–15 thì Kyouya **15–17**. Vế *"cái giá ... tự trả và giấu"*: thuộc K2 |
| T5 | 135 | *"lời hứa với Kawahira; Tsuna không nhận Pacifier — trope Sky Arcobaleno bị bẻ"* | ✅ | [[tropes]] mục 5.6 · [[trope-fandom]] mục 2 · [[fact-kimiko-arcobaleno]] |
| T6 | 136 | *"Checkerface's final show: Kawahira nói dối để giấu danh tính ân nhân"* | ✅ | [[emb-duyet-khung-nam-arc]] mục 6. Chữ *"cần xác nhận"* trong hàng đã cũ |
| T7 | 137 | *"bà thấy mà không biết khi nào, nên dấu ấn trong cây là thứ bà để lại cho một lúc không đoán được"* | ✅ | [[emb-chot-cau-hoi-mo]] mục 4 · [[hook-dau-an-kimiko-trong-cay]] · [[kimiko-thay-truoc-tuong-lai]] |
| T8 | 138 | *"được giải nguyền mà không biết ai giải — gieo vai Sun"* | ✅ | [[emb-chot-cau-hoi-mo]] mục 1 |
| T9 | 139 | *"ai đó gọi tên cái mẫu hình: cậu không tính mình vào kế hoạch của chính mình"* | ⚠️ | [[nguoi-lon-co-trach-nhiem]] *(user, active)*: *"musashi gọi tên mẫu hình ở **Arc 4**"*. Khung: *"ai đó"*, **Arc 5**. Lệch cả người lẫn arc |
| T10 | 140 | *"người đi cởi trói cho kẻ khác bị soi gương — Kawahira"* | ✅ | [[truc-chinh]] *("tấm gương già bốn nghìn năm")* |
| T11 | 141 | *"8 — Fon chọn làm Storm · Xanxus phá băng, hoà hợp hai chiều · Xanxus liên lạc Varia · ..."* | ✅ | duyệt 17/09. Thừa hưởng cờ của T3 |
| T12 | 142 | *"luật Sky làm Element cho Sky khác"* | ✅ | đúng là còn mở: [[emb-chot-khung-arc]] mục 2. Decision ấy ghi **hai** việc mở; khung bỏ việc thứ hai *(cách phá băng: lẻn vào tổng bộ hay nhờ Bermuda)*. Cả hai chưa có note `question`; không chặn Brat |

### Y · Arc 6, Young Adult

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| Y0 | 144 | *"Young Adult · 16 → 18"* | ✅ | duyệt 17/09 |
| Y1 | 146 | *"The Beginning of the End · He's Ours This Time. · Everything is fine. (It was not fine.)"* | ✅ | [[emb-duyet-khung-nam-arc]] mục 3 |
| Y2 | 150 | *"Vongola tới gần mà không bắt được · Tsunashige (14) và Reborn ở cảnh cuối — lệch ba chiều"* | ✅ | [[emb-chot-khung-arc]] mục 3 · [[fact-toan-canh-tuong-lai]] |
| Y3 | 151 | *"Tsunashige được chọn làm người thừa kế; Reborn nhận nhiệm vụ"* | ✅ | [[hook-tsunashige-va-reborn]]. Nguồn chỉ nói Reborn là *tutor*; *"người thừa kế"* là suy ra |
| Y4 | 152 | *"Kyoya ~18: người Tsuna giữ lại đứng cạnh cậu"* | ⚠️ | cùng lỗi T4: chênh +2 thì Kyouya **~20** khi Tsuna 18. Phần còn lại của hàng đứng |
| Y5 | 153 | *"Sawada Tenmei gần như trọn ... nó là một sự kiện, không phải một dòng tông"* | ✅ | [[emb-duyet-khung-nam-arc]] §A |
| Y6 | 154 | *"Let the games begin. — không vượt qua câu này"* | ✅ | `fic_explicit` · `preserve` của [[aurel-main]] |
| Y7 | 155 | *"5 — Tsuna nhận mình là Sawada Tenmei ... → ~19.000 từ ≈ 2 chương"* | ✅ | [[emb-duyet-khung-nam-arc]] §A |
| Y8 | 156 | *"Bản đầu có 4 sự kiện thì 3 là việc của phía Vongola"* | ✅ | cùng §A |

### L · Tổng lượng

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| L0 | 160 | *"không lấy Baby arc làm mẫu ... Ước lượng theo số sự kiện, đo trên Brat arc"* | ✅ | [[emb-chot-cau-hoi-mo]] mục 8 |
| L1t | 162 | *"5 thay đổi trạng thái / 19.019 từ → ~3.800 từ mỗi sự kiện; chương P2 trung bình ~9.500 từ"* | ✅ | [[rhythm]] mục 3, đo trên nguyên tác |
| L2t | 166 | *"Brat còn lại — 5 — ~19.000 → thực tế ~21.000 — ~2"* | 🔁 | *"thực tế"* là số của hai chương đã lưu trữ. Con số 5 và 2 chờ [[q-brat-dai-bao-nhieu]] |
| L3t | 167 | *"Child — 12 — ~47.500 — 5 (dựng lại 25/09)"* | 🔁 | dàn ý 25/09 đã lưu trữ; số chương là cổng 5 của [[q-child-nam-cong]] |
| L4t | 168 | *"School — 7 — ~26.600 — ~3"* | ✅ | duyệt 17/09, là sàn |
| L5t | 169 | *"Teen — 8 — ~30.400 — ~3–4"* | ✅ | như trên |
| L6t | 170 | *"Young Adult — 5 — ~19.000 — ~2"* | ✅ | [[emb-duyet-khung-nam-arc]] §A |
| L7t | 171 | *"Cộng — 32 — ~121.600 — ~13–14"* | 🔁 | Dòng này là tổng của bản 17/09, còn hàng Child đã đổi ngày 25/09: cộng năm hàng đang ghi ra **37 sự kiện, ~142.500 từ** *(executed)*. Và hai số hạng Brat, Child đều đang treo |
| L8t | 173 | *"Đây là sàn, không phải trần ... một chương dưới ~8.000 từ là dấu hiệu dồn quá ít sự kiện"* | ✅ | [[emb-chot-uoc-luong-tu-la-san]] |

### K · Bảng hook

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| K0 | 175 | *"Hook — bảng đối chiếu 15/15"* | ⚠️ | kho hook nay có 18 hook sống. Mục 4 |
| K1 | 179 | *"ong-tre · nguoi-ban-cu · kyouya-loai-chu-chot · hook-me-takeshi-va-sat-thu — Brat — trả"* | ✅ | cả bốn `open` sau khi trả frontmatter 01/10 |
| K2 | 180 | *"hook-ba-cua-con-lai — Brat → Teen — trả dần, mỗi cửa một bond"* | ✅ | duyệt 17/09. [[hook-ba-cua-con-lai]] dặn: *mỗi cửa ứng với một Guardian* là chỗ **chưa có câu nào nói**; khi dùng phải khai là mở rộng của nhánh |
| K3 | 181 | *"hook-dua-tre-saint-exavier · hook-bermuda-to-mo · hook-nha-tu-dac-biet — Child — trả / tiếp xúc"* | ⚠️ | Bermuda: L1. Cả ba còn chờ [[q-bermuda-an-toi]], [[q-cam-khoan-vendicare]], [[q-child-nam-cong]] |
| K4 | 182 | *"hook-iemitsu-tra-gia — School — trả, ngắn"* | ✅ | `open`, frontmatter trả về 01/10 |
| K5 | 183 | *"hook-dau-an-kimiko-trong-cay · kimiko-thay-truoc-tuong-lai — Teen — trả"* | ✅ | cả hai `open` |
| K6 | 184 | *"ke-cuop-co-dau — Child — song chiếu với cặp song sinh: một cái tên không thể chứa hai sự thật"* | ✅ | [[emb-duyet-khung-nam-arc]] §C · [[emb-chot-cap-song-sinh]]. Phụ ❌ *(suy ra)*: song chiếu tựa vào chuyện **tên con cáo**, đúng thứ [[q-ten-con-cao]] đang mở; hướng Aurel đang nghĩ *(giữ Natsu, nghĩa khác)* là một cái tên chứa hai nghĩa |
| K7 | 185 | *"hook-tsunashige-va-reborn — Young Adult — cảnh kết"* | ✅ | `open`, frontmatter trả về 01/10 |
| K8 | 186 | *"hook-sukunabikona — Teen → sau vạch kết — gieo"* | ✅ | [[emb-chot-cau-hoi-mo]] mục 1 |
| K9 | 187 | *"nana-iemitsu-cuoi-nhau — đã trả ở nguyên tác"* | ✅ | `partially_paid`, `payoff: paid_in_text`, P1 Ch2 |

### D · Bảng đã duyệt 17/09

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| D1 | 195 | *"Cách ghép A · B · C"* | ✅ | [[emb-duyet-khung-nam-arc]] |
| D2 | 196 | *"Shouichi làm bạn cùng tuổi đầu tiên"* | ✅ | như trên |
| D3 | 197 | *"Ba dòng tông + tên năm arc"* | ✅ | như trên |
| D4 | 198 | *"Brat đóng ở mốc âm tính Flame năm bảy tuổi"* | ❌ | Lượt duyệt là thật, nhưng chỗ đóng arc nay là [[q-brat-dai-bao-nhieu]] |
| D5 | 199 | *"Tsunashige gặp Tsuna ở School"* | ✅ | như D1 |
| D6 | 200 | *"Checkerface show ở Teen"* | ✅ | như D1 |
| D7 | 201 | *"Arc 6 mỏng — nâng Sawada Tenmei thành sự kiện"* | ✅ | như D1, §A |
| D8 | 202 | *"Mượn vật liệu từ 11 file lưu trữ"* | ✅ | [[emb-lam-lai-tu-nguon]] |
| D9 | 203 | *"Xếp ke-cuop-co-dau — Arc 3 Child"* | ✅ | như D1, §C |

### V · Việc kế tiếp, và chính tả

| # | Dòng | Trích khung | Nhãn | Chỗ dựa · ghi chú |
|---|---|---|---|---|
| V1 | 207 | *"25/09/2026: Arc 3 Child dựng lại và duyệt ... Việc kế tiếp: thẻ cảnh Ch1 ... Brat viết xong 20/09"* | 🔁 | cả ba vế thuộc bản đã lưu trữ |
| V2 | 209 | *"~~Dàn ý chi tiết một arc: phần còn lại của Brat.~~"* | 🔁 | Dòng bị gạch vì Brat *"đã xong"*. Nay nó lại là việc kế tiếp thật: [[emb-lam-lai-lan-ba]] bước 4. **Còn đứng:** vế cấm chép dàn ý AI cũ |
| X1 | cả file | *"Kyoya"* 17 lần, *"Kyouya"* 0 lần *(executed)* | ⚠️ | [[emb-chot-chinh-ta-ten]] *(locked, 01/10)*: nhánh viết **Kyouya**. *Shouichi* thì khung đã đúng, 6 lần |

## 4. Bảng hook — đếm lại

`hooks/` có **22** note hook *(executed: đọc `status` của từng file)*.

| Nhóm | Số | Hook |
|---|---|---|
| Trong khung, `open` | 14 | xem dưới |
| Trong khung, đã trả ở nguyên tác | 1 | [[nana-iemitsu-cuoi-nhau]] *(`partially_paid`)* |
| **Sống, khung chưa có** | **3** | [[hook-su-co-nha-khoa-hoc-vongola]] · [[bond-bam-vao-cay]] · [[so-cua-thay-thuoc]] |
| `superseded` | 4 | [[hook-dua-tre-thu-52]] ⛔ · [[hook-mammon-giau-hai-thu]] ⛔ · [[hook-tre-estraneo-co-flame]] ⛔ *(01/10)* · [[hook-chuan-sugita-bi-sao-chep]] ⛔ *(25/09)* |

**Con số:** khung phủ **15 / 18** hook sống. Nếu Aurel cho hai hook đang chờ thành `superseded` thì **15 / 16**. Không hook nào trong 15 của khung bị `superseded`.

**Bảy hook vừa trả về `open` ngày 01/10**, tất cả nằm trong khung: [[ong-tre]] · [[nguoi-ban-cu]] · [[hook-me-takeshi-va-sat-thu]] · [[kyouya-loai-chu-chot]] · [[hook-bermuda-to-mo]] · [[hook-iemitsu-tra-gia]] · [[hook-tsunashige-va-reborn]]. Sau lần trả này, cột *Arc* của bảng hook trong khung **lại đúng là kế hoạch**: chưa hook nào được trả trong nhánh.

**Bảy hook còn lại của khung** không đổi từ 16–17/09: [[hook-ba-cua-con-lai]] · [[hook-dua-tre-saint-exavier]] · [[hook-nha-tu-dac-biet]] · [[hook-dau-an-kimiko-trong-cay]] · [[kimiko-thay-truoc-tuong-lai]] · [[ke-cuop-co-dau]] · [[hook-sukunabikona]].

**Ba hook sống khung chưa có:**

| Hook | Gốc | Việc cần Aurel |
|---|---|---|
| [[hook-su-co-nha-khoa-hoc-vongola]] | lời Aurel 19/09, không sinh từ văn xuôi. Note ghi *"Không thuộc arc Brat"*, ô arc để trống | xếp vào arc nào |
| [[bond-bam-vao-cay]] | sinh từ cảnh 2.3 của Brat Ch2 đã lưu trữ; Aurel duyệt làm hook 17/09 | giữ hay `superseded`. Frontmatter còn `progress` của *Ch2* và *Ch4* bản cũ, chưa trả về |
| [[so-cua-thay-thuoc]] | sinh từ cảnh 1.4 của Brat Ch1 đã lưu trữ; Aurel duyệt 17/09 | như trên. Frontmatter còn `progress` và `state` của bản cũ |

Ba ghi nhận:

- Mọi hook `open` của khung để `payoff.arc` **trống**. Bản phân arc chỉ sống trong khung; riêng [[ke-cuop-co-dau]] có ghi trong thân note.
- Dòng ⛔ đầu `hooks/_MOC.md` viết *"Sáu hook sinh ra từ văn xuôi đã lưu trữ đang chờ Aurel quyết"*. Theo frontmatter thì **bốn** trong sáu đã `superseded`; còn chờ **hai**.
- [[rhythm]] mục 2 ghi *"Hook: 15 — trả 1, mở 14"*. Con số ấy lại đúng **cho 15 hook của khung**, không đúng cho cả kho.

## 5. Hợp đồng nhánh [[aurel-main]] — dòng trỏ vào thứ đã chết

Chỉ liệt kê. Không sửa.

| Dòng | Nguyên văn | Trỏ vào | Tình trạng |
|---|---|---|---|
| 15 | trường `related` của frontmatter có `dot7-quyet-dinh`, không mang dấu ⛔ | [[dot7-quyet-dinh]] ⛔ | `superseded` từ 15/09, theo [[emb-lam-lai-tu-nguon]] |
| **79** | *"Ngoại lệ forbid #7 — Aurel chốt 25/09/2026, chỉ arc Child: ba sự kiện Tomoko lộ mặt · đứa trẻ Saint-Exavier chọn ở lại · Cradle được dựng thành cảnh, có POV có mặt đúng lúc"* | [[emb-lam-lai-child-tu-khung]] ⛔ và dàn ý Child bản 25/09 | decision `superseded` 01/10; dàn ý đã lưu trữ. Cả hai link đã mang dấu ⛔ |
| 85 | *"Ý chính sáu arc — có sẵn từ đầu — y-chinh-cac-arc"* | `y-chinh-cac-arc` trong `80_Archive/personal/fiction-emb/` | `archived` từ 15/09. Link này **chưa** mang dấu ⛔. Thứ đang giữ vai ấy là [[khung-nam-arc]] |

Riêng dòng 79, ba thứ nó tựa vào đều đã đổi:

- **Hai chỗ dựa** *(decision và dàn ý)* đã chết.
- **Hai trong ba sự kiện** nay là cổng đang mở của [[q-child-nam-cong]]: *Tomoko lộ mặt* *(cổng 3)*, *ai chứng kiến Cradle* *(cổng 4)*. Sự kiện thứ ba, *đứa trẻ chọn ở lại*, chờ [[q-cam-khoan-vendicare]].
- **Lý do** thì còn sống: lời chê 25/09 *("không miêu tả được tầm quan trọng của sự kiện")* đã được [[emb-lam-lai-lan-ba]] chép sang làm thước đo.

*(suy ra)* Nên ngoại lệ đang ở thế: lý do đứng, đối tượng treo. Giữ hay rút là việc của Aurel, và nó đi cùng L2.

Hai dòng **không chết** nhưng chưa theo kịp một decision đang sống:

| Dòng | Nguyên văn | Decision chưa được chép vào |
|---|---|---|
| 12 và 58 | *"Xanxus · Vindice · Arcobaleno · Fon · Shouichi — đều có trong tag AO3 mà chưa lên hình"* | [[emb-chot-tag-theo-arc]]: *"câu ấy vẫn đúng, nhưng phạm vi của nó là arc Brat, không phải mười hai năm"* |
| cả file | không có dòng nào về chính tả tên | [[emb-chot-chinh-ta-ten]] ghi đây là *"một lựa chọn của nhánh"*; hiện chỉ nằm ở decision và [[hard-rules]] |

## 6. Mười hai câu hỏi `unresolved` — chặn arc nào, hỏi theo thứ tự nào

### Bản đồ

| Câu | Chặn arc | Hàng khung gỡ được | Phụ thuộc |
|---|---|---|---|
| [[q-xuong-song-brat]] | Brat | B6 · B7 | gốc của hai câu dưới |
| [[q-brat-dai-bao-nhieu]] | Brat, và mép Child | B0 · B6 · B9 · C0 · L2t · L7t · D4 | q-xuong-song-brat, hai câu Xanxus và Reborn, L1 |
| [[q-dac-vu-vongola]] | Brat | B7 | chỉ còn nghĩa nếu xương sống vẫn đóng ở *vấp và có người đỡ* |
| [[q-brat-xanxus-vao-the-nao]] | Brat | R2 · B7 | L1 |
| [[q-brat-reborn-toi-dau]] | Brat | R4 | L1; chốt cũ gắn nó vào tuyến Xanxus |
| [[q-tsuna-tranh-mukuro]] | Brat | không hàng nào: Mukuro vắng khỏi khung *(K3)* | L1 *(Mukuro là tag Brat)* |
| [[q-me-takeshi-ai-quyet]] | Brat | B3 · B9 | không |
| [[q-shouichi-loi-moi]] | Brat | mệnh đề phụ của R1 | không |
| [[q-ten-con-cao]] | Brat, vọng sang Child | mệnh đề phụ của B8 · B11 · K6 | buộc mở [[emb-chot-tsuna-va-natsu-kham-pha-lai]] |
| [[q-child-nam-cong]] | Child | C3 · C8 · L3t; phụ của C2 · C6 | L2, L3 |
| [[q-bermuda-an-toi]] | Child | C5 · K3 | L1 *(Vindice là tag Brat)* |
| [[q-cam-khoan-vendicare]] | Child | C3; phụ của C6 | q-bermuda-an-toi |

**Chín câu chặn Brat, ba câu chặn Child. Không câu nào chặn School, Teen hay Young Adult.**

### Thứ tự đề nghị hỏi

Xếp theo phụ thuộc trước, rồi tới số hàng gỡ được.

| Lượt | Câu | Vì sao ở vị trí này |
|---|---|---|
| 0 | **L1**, rồi **L2 kèm L3** *(chưa có note)* | L1 gỡ 7 hàng và định khung cho ba câu Brat. L2 quyết Arc 3 có bảng hay không |
| 1 | [[q-xuong-song-brat]] | hai câu sau nó không trả lời được nếu chưa có nó. Cũng là câu chạm thẳng lời chê *thiên buồn* |
| 2 | [[q-brat-xanxus-vao-the-nao]] | quyết Brat to hay nhỏ. Note của q-brat-dai-bao-nhieu ghi độ dài *"tuỳ hai câu kia"* |
| 3 | [[q-brat-reborn-toi-dau]] | hỏi cùng lượt với câu 2 được: chốt cũ giải cả hai bằng một tuyến |
| 4 | [[q-brat-dai-bao-nhieu]] | gỡ nhiều hàng nhất *(7)*, nhưng chỉ hỏi được sau ba câu trên |
| 5 | [[q-dac-vu-vongola]] | có thể tự tan sau câu 1 |
| 6 | [[q-tsuna-tranh-mukuro]] | note dặn *quyết Mukuro ở đâu trước khi dàn ý, đừng giải thích sau* |
| 7 | [[q-ten-con-cao]] | chặn chương con cáo được gọi tên; kéo theo sửa chín note |
| 8 | [[q-me-takeshi-ai-quyet]] | chặn một cảnh |
| 9 | [[q-shouichi-loi-moi]] | chặn chương đầu có Shouichi |
| sau Brat | [[q-child-nam-cong]] → [[q-bermuda-an-toi]] → [[q-cam-khoan-vendicare]] | `needed_before` nằm ở dàn ý Child. Skill `plan-continuation` dặn không ép sớm câu hỏi của arc sau. Ngoại lệ: nếu L1 buộc Vindice phải có mặt ở Brat nhiều hơn lá thư đã có, q-bermuda-an-toi lên sớm |

### Phương án của từng câu

Chỉ ghi chất liệu **đã có trong note câu hỏi và trong decision cũ**. *Chốt cũ* là một phương án như mọi phương án khác; nó không phải mặc định. Các *"đề xuất của AI"* trong note cũ không được chép lại ở đây như khuyến nghị.

**[[q-xuong-song-brat]]**

| Phương án | Được | Mất |
|---|---|---|
| Giữ thang đo bốn mục *(tin tưởng · tự tin · bốc đồng · tin có người đỡ khi vấp)* | lời Aurel nguyên văn 19/09 ở [[emb-chot-xuong-song-brat]] ⛔; đo tin tưởng và bốc đồng, không đo nỗi đau | mục 4 đòi một cái **vấp thật**, tức kéo theo q-dac-vu-vongola |
| Sửa thang đo | *(note không có chất liệu)* | chưa biết; *(suy ra)* nếu bỏ mục 4 thì q-dac-vu-vongola và lối đóng B của q-brat-dai-bao-nhieu mất chỗ đứng |

**[[q-brat-dai-bao-nhieu]]** — ⚠️ thân note còn viết *"hai chương đã viết"* và *"chỗ đóng arc đã bị tiêu mất"*; cả hai là tình trạng của bản đã lưu trữ.

| Phương án | Được | Mất |
|---|---|---|
| A · đóng theo **tuổi** *(Tsuna ~9, vào tiểu học hoặc Cradle nổ)* | gọn | lấn sang Child |
| B · đóng ở **xương sống** *(chốt cũ)* | khớp [[truc-chinh]] mục 4 và câu kiểm số 4 của [[aurel-main]]; độ dài trôi theo | tựa hẳn vào câu 1 |
| C · đóng theo **dàn vai** *(tag trả xong)* | *(suy ra)* khớp L1 | máy móc, dễ thành danh sách gạch tên, đúng thứ [[truc-chinh]] cấm |
| D · đóng ở **mốc âm tính năm bảy** *(hàng B6 của khung, duyệt 17/09)*. **Suy ra, không có trong note câu hỏi** | lý do loại nó ngày 19/09 *(chỗ đóng đã bị tiêu)* không còn | khó chứa sáu dòng tag của L1 trước mốc bảy tuổi |

Khoảng độ dài trong note *(6 tới 12 sự kiện, 23.000 tới 46.000 từ)* tính trên nền hai chương đã viết. Nay nền là không, nên **phải tính lại**.

**[[q-brat-xanxus-vao-the-nao]]**

| Phương án | Được | Mất |
|---|---|---|
| A · Cradle lùi về Brat | trả tag bằng chính cảnh băng | đụng [[tuoi-va-moc]]; dồn sự kiện lớn nhất của Child sang Brat |
| B · chạm trước Cradle, hoà hợp vẫn sau *(chốt cũ)* | giữ nguyên [[tuyen-xanxus]]. Đường vào Aurel dựng 19/09, còn là vật liệu của Aurel ở [[emb-chot-tuyen-varia]] ⛔: Varia điều tra vụ Estraneo, Xanxus đuổi theo **một Cloud** | *"chạm"* là thang trượt; phải định mức chạm bằng một cảnh cụ thể. Bản cũ dùng nó để đưa Tsuna **sang Ý**, thứ nguyên tác không nói |
| C · chỉ qua hồi tưởng kiếp trước | rẻ nhất | tag là quan hệ `&`; hồi tưởng về con trai ông thì mỏng |

**[[q-brat-reborn-toi-dau]]**

| Phương án | Được | Mất |
|---|---|---|
| A · chỉ hồi tưởng | an toàn tuyệt đối cho đích | tag mỏng; hồi tưởng ấy đã có từ P1 |
| B · Reborn nghe tên, không gặp *(chốt cũ)* | đích năm 18 nặng hơn: ông tới vì việc khác rồi nhận ra một cái tên | phải có một nước cờ đưa tên cậu ra ngoài; bản cũ dùng tuyến Varia |
| C · gặp thật, sớm | — | 🔴 **phạm `preserve` của [[aurel-main]]** *(đích năm 18)*. Liệt kê vì note có; không dùng được nếu chưa đổi hợp đồng |

**[[q-dac-vu-vongola]]**

| Phương án | Được | Mất |
|---|---|---|
| Giữ ba mục *(hắn phát hiện con Iemitsu và một Sky đang hoạt động · cạnh tranh với các con trai Nono · Tsuna có sang Ý)* | khớp forbid #3: vị trí của Iemitsu suýt giết con ông mà ông không cần một dòng thoại; gieo [[hook-iemitsu-tra-gia]] | mục 3 là mở rộng của nhánh, chạm nền dữ kiện. Cái vấp ấy là một đứa bảy tuổi bị thương một mình; đo với lời chê *thiên buồn*: thuộc K2 |
| Cái vấp khác, hoặc không có cái vấp | *(note không có chất liệu)* | tuỳ câu 1 |

**[[q-tsuna-tranh-mukuro]]**

| Phương án | Được | Mất |
|---|---|---|
| Giữ *"cố ý tránh"* *(lo xong, rồi đứng ngoài)* | có sẵn một lý do cho việc Mukuro không lên trang | chỗ dựa là một câu trong văn xuôi đã bỏ; note tự chê nó biến việc **bị quên** thành thói quen của nhân vật |
| Quyết Mukuro ở đâu **trước** khi dàn ý | đúng lời dặn trong note; khớp thước *thường quên nhân vật* | *(note không nêu)* |

**[[q-me-takeshi-ai-quyet]]** — tên **Sachiko** giữ, không nằm trong câu hỏi.

| Phương án | Được | Mất |
|---|---|---|
| Mẹ Takeshi quyết *(chốt cũ)* | không phải khẳng định gì về [[tsuyoshi]]; người chết ở kiếp trước tự chọn trên trang | *(note không nêu)* |
| Tsuyoshi quyết | — | phải khẳng định *"Yamamoto-san tiệm Takesushi"* là cha Takeshi, thứ nguyên tác chưa cho |

**[[q-shouichi-loi-moi]]** — *Tsuna nhớ Shouichi từ kiếp trước* giữ, không nằm trong câu hỏi.

| Phương án | Được | Mất |
|---|---|---|
| Giữ ba ý cũ cho cảnh mới *(nhận lời vì nhận ra một khuôn mặt · hồi tưởng lên trang · Tsuna bỏ hậu tố trước)* | hai lý do Aurel đưa cho việc *Tsuna bỏ trước* là về nhân vật, không về cảnh | cả ba từng tựa vào cấu trúc *Ch1 POV thầy thuốc, Ch2 POV Tsuna* của bản đã bỏ |
| Dựng lại quan hệ từ đầu *(suy ra, note không nêu)* | tự do với cảnh mới | bỏ một quyết định Aurel đã bác AI để có |

**[[q-ten-con-cao]]**

| Phương án | Được | Mất |
|---|---|---|
| Giữ **Natsu**, nghĩa khác *(hướng Aurel đang nghĩ; nghĩa nào thì chưa nói)* | *(suy ra, từ [[nguoi-ban-cu]])* gần với reply của tác giả, người nháy mắt về Natsu | phải mở tường minh [[emb-chot-tsuna-va-natsu-kham-pha-lai]] *(locked, tiêu đề ghi "con cáo không phải Natsu")*; sửa chín note đã liệt kê trong câu hỏi |
| Giữ *Tomoshibi* | *(suy ra)* không phải sửa note nào | cái tên đặt ở chương đã lưu trữ; nguyên tác không có chữ này |
| Để bản mới đặt lại *(phương án nêu ở [[20261001-soat-nen-du-kien]] mục K4)* | *(suy ra)* sạch gốc | *(suy ra)* chưa có ứng viên |

**[[q-child-nam-cong]]** — năm cổng, kèm chốt cũ: 1 người xin vào Sanctuary *(Skull, Carcassa đòi người)* · 2 nơi trình diện *(hội đồng tư tế và âm dương sư ở Kyoto)* · 3 Tomoko lộ mặt *(nghề cũ, danh tính cũ)* · 4 ai chứng kiến Cradle *(Mammon)* · 5 số chương *(năm)*. Chất liệu được-mất duy nhất trong note: cổng 4 tựa vào [[hook-mammon-giau-hai-thu]] ⛔, nay `superseded`; note [[skull]] còn `draft`.

**[[q-bermuda-an-toi]]**

| Phương án | Được | Mất |
|---|---|---|
| Bermuda tới Namimori, Tsuna mời Vindice ăn tối *(chốt cũ, lời Aurel 22/09)* | đỉnh chuỗi của arc; đi cùng giọng *hoạt bát, Tsuna tự tin và gây rối* | [[hook-bermuda-to-mo]] dặn: Bermuda mà biết Kawahira ở Namimori thì thị trấn thành *một địa chỉ*; chốt cũ xử bằng cách cho Kawahira và Mukuro vắng mặt |
| Không gặp mặt *(bản 20/09, trước khi Aurel đảo)* | giữ khoảng cách | mất sự kiện ấy |

Note đề nghị coi phần **không gắn sự kiện** là còn đứng dù câu hỏi mở: lore Bermuda và Vindice, phép so các lần chuyển đổi Arcobaleno, và câu về giọng arc Child. Đó là đề nghị của note, chưa phải chốt.

**[[q-cam-khoan-vendicare]]**

| Phương án | Được | Mất |
|---|---|---|
| Giữ bốn điều khoản *(chốt cũ)* | buộc Tsuna không tự đi tìm đứa trẻ; kẽ hở *đứa trẻ tự tới*; nạp sẵn hình dạng *biết Cradle mà ngồi yên* | câu chữ trích nguyên từ chương đã lưu trữ |
| Bỏ, hoặc viết lại | *(note không có chất liệu)* | hàng C6 mất phần chuẩn bị |

[[fact-vendicare-giu-so]] là luật nhánh và **không** nằm trong câu hỏi.

## 7. Khung tối thiểu còn đứng

Chỉ gồm hàng ✅, cộng các mệnh đề còn đứng rút từ hàng nhãn khác *(ghi mã hàng trong ngoặc)*. Đây là thứ còn lại sau khi lột hết phần chết, **không phải** một khung mới.

**Hai đầu.** Xuất phát cuối [[p2-ch1]], Tsuna ~6–7. Đích: Tsuna 18, Tsunashige 14 và Reborn tới đền; không vượt qua *"Let the games begin."* Ở giữa: Nana và Iemitsu về sau hơn một thập kỷ; Vongola không bắt được Tsuna. Không có: Tsuna thành Decimo, tuyến trả giá tiên tri, Iemitsu có arc.

**Luật ghép.** C là xương sống, mỗi arc nêu đích danh ít nhất hai người đổi cách nhìn. B là động cơ cảnh, mỗi arc một tới hai người. A là một cảnh Kyouya mỗi arc. Thay đổi dài ở ngoài trang; hành động lớn kể bằng hai mép. Mỗi arc nạp rồi xả, đóng bằng biên niên hoặc bảng kiểm.

**Quan hệ có tag.** Shouichi là bạn cùng tuổi đầu tiên, Brat sang Child. Sukunabikona vào qua Reborn làm Sun, trong nhánh chỉ gieo. Rút từ hàng ⚠️: Cradle lúc Tsuna ~9–10 và phá băng lúc 13–15 *(R2)*; Fon là Storm chính *(R3)*; Reborn chưa gặp Tsuna cho tới năm 18 *(R4)*.

| Arc | Còn đứng | Trống |
|---|---|---|
| **Brat** | ba dòng tông · C: Shouichi và Sugita Gen'ichi · A: courting hoàn tất, bond là một sự kiện có nghi lễ · nền: cơn trôi dạt đã dứt, ống tre đã làm việc nó hứa, Indra neo lại · hook: [[ong-tre]], [[nguoi-ban-cu]], [[kyouya-loai-chu-chot]], [[hook-me-takeshi-va-sat-thu]], phần đầu [[hook-ba-cua-con-lai]] · đã chốt: ống tre hai nghĩa, bigger carnivore là Indra, Nagi biết chuyện cha mẹ · mốc *âm tính năm bảy* phải xảy ra *(B6)* | độ dài · chỗ đóng · ai quyết vụ Yamamoto · bóng Decimo · danh sách sự kiện · sáu dòng tag vào thế nào |
| **Child** *(treo, L2)* | ba dòng tông · C: cặp song sinh nhà Kamo · A: Kyouya tự đặt mốc mới · tin Cradle lúc Tsuna ~9, cậu biết mà chưa làm gì · Lavinia không được xoá · [[ke-cuop-co-dau]] song chiếu với cặp song sinh | mọi thứ còn lại |
| **School** | 10 tới 12 · ba dòng tông · Nana về *(S2)* · B: Nana chọn phía, Shouichi chọn đường · A: trường là lãnh thổ mới · Iemitsu trả giá, một cảnh · Tsunashige gặp Tsuna, củng cố cái biết sai, kèm điều kiện ghi ai trả giá cảm xúc · Xanxus trong băng · xả: Nana và Iemitsu rời đi lần nữa · bảy sự kiện | tên thứ hai cho lối C |
| **Teen** | 13 tới 15 · ba dòng tông · C: Kawahira khi được tự do, Arcobaleno được giải nguyền mà không biết ai giải · Tsuna không nhận Pacifier · Checkerface show · dấu ấn Kimiko · Reborn được gieo vai Sun · gương Kawahira · tám sự kiện · Fon chọn làm Storm và Xanxus ra khỏi băng *(T3)* | cách kể trận phá băng · ai gọi tên mẫu hình, ở arc nào · tuổi Kyouya |
| **Young Adult** | 16 tới 18 · ba dòng tông · lệch ba chiều ở cảnh cuối · Tsunashige được chọn, Reborn nhận nhiệm vụ · Sawada Tenmei là một sự kiện có khoảnh khắc quyết định trên trang · năm sự kiện · Kyouya đứng cạnh *(Y4)* | tuổi Kyouya |

**Tổng lượng.** Thước ~3.800 từ mỗi sự kiện, chương ~9.500 từ, mọi con số là sàn. Ba arc còn số: School 7, Teen 8, Young Adult 5, cộng **20 sự kiện, ~76.000 từ, ~8–9 chương** *(executed: cộng ba hàng)*. Brat và Child không còn số nào đứng.

**Hook.** 15 hook của khung, 14 mở, bản phân arc như bảng K. Ba hook sống chưa có chỗ.

## 8. Thấy nhưng thuộc đơn vị khác

Mỗi mục một dòng, không xử ở đây.

- **K2, giọng:** năm hàng *Xả* và năm hàng *Bóng Decimo*; điều kiện *"ai trả giá cảm xúc"* ở S6; *"cái giá Tsuna tự trả và giấu"* ở T4; câu hài *"just wing it"* vắng khỏi khung; cái vấp của q-dac-vu-vongola.
- **K3, điểm danh:** Musashi 0 lần trong khung *(executed)*, trong khi [[nguoi-lon-co-trach-nhiem]] giao cho bà một việc ở Arc 4; Mukuro và Chrome là tag Brat theo L1 mà khung không có hàng nào.
- **Soát nền dữ kiện:** [[tuoi-va-moc]] mục 4 còn bảng *"Tsuna tròn 7 tháng Mười ... Ch3, Ch4"* do các chương đã bỏ tự định, chưa gạch; mục *Tuyến Varia* của nó neo vào mốc Brat của bản cũ; [[tsuna-am-tinh-tren-giay]] còn mục *Gen'ichi từ không biết sang ngờ* dựng trên Brat Ch2 đã bỏ; [[emb-chot-nguyen-to-di-san]] và [[emb-chot-loi-dang-quay-ve]] *(locked, hàng Giữ)* trích nhiều cảnh của tám chương đã bỏ, cần tách luật khỏi ví dụ.
- **MOC:** `decisions/_MOC.md` không có dòng nào cho [[emb-chot-tag-theo-arc]] *(executed)*. Một decision `locked` không có trong MOC thì khó được tìm thấy; đó có thể là lý do khung không chép nó.

## 9. Việc kế tiếp

1. Aurel đọc mục 0 và mục 2, trả lời L1, rồi L2 kèm L3.
2. Mở note `question` cho bốn chỗ ở mục 2 và cho câu *Fon vào Brat thế nào*.
3. Hỏi 12 câu theo thứ tự mục 6. Câu nào chốt thì thành `decision`; câu hỏi đổi `resolved`.
4. Lột chín hàng 🔁 khỏi [[khung-nam-arc]] và sửa 17 chỗ *Kyoya*. Đây là sửa một note đã duyệt, nên liệt kê cho Aurel đồng ý trước khi làm.
5. Sau đó mới tới khung riêng arc Brat *(bước 4 của [[emb-lam-lai-lan-ba]])*. Chưa có beat chương nào được dựng ở lượt này: chín câu Brat còn ❌.
