---
id: arc.EMB.khung-moi-huong-b
type: arc
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: proposed
aliases: ["khung moi huong B", "sau nhom vai cham nhe trong Brat"]
related: ["[[emb-chot-dung-lai-khung]]", "[[emb-chot-goc-khung-moi]]", "[[emb-chot-tag-theo-arc]]", "[[khung-soat-tong-ket]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main|aurel-main]]", "[[truc-chinh]]"]
source:
  type: inference
  ref: "plan-continuation 01/10/2026, dung lai khung, worker 2/3 (huong B). De xuat, chua duyet."
authority: ai
confidence: 0.6
always_load: false
load_for: [planner]
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [arc, proposal]
last_updated: 2026-10-01
---

# Khung mới, hướng B: sáu nhóm vai chạm nhẹ trong Brat, đào sâu ở arc sau

> **Đề xuất, chưa duyệt.** Một trong ba hướng dựng lại khung để Aurel chọn. Note này không sửa note nào khác, không trả lời câu hỏi `unresolved` nào, và không có dòng nào ở đây là chốt. Mọi thứ là `planned`: chưa việc nào trong bảng đã xảy ra.
>
> Tầng khung: không có beat chương, không có thẻ cảnh.

## 0. Cách đọc note này

**Lượt chạy** *(executed, từ gốc worktree)*:

| Lệnh | Kết quả |
|---|---|
| `python 01_Origine/04_Tools/VaultTool/plan_gate.py --project EMB` | **exit 0**, bảy hàng đều OK |
| `python 01_Origine/04_Tools/VaultTool/context_resolver.py --root . --project EMB --role planner --branch aurel-main` | **exit 1**, chỉ một cảnh báo: nạp 202 note truyện cho một tác vụ. Không có mục CAM nào |

**Mốc state:** cuối [[p2-ch1]], theo [[emb-lam-lai-lan-ba]]. Mọi mục mang dấu ⛔ và mọi note `superseded` hoặc `archived` mình coi là đã chết. Không chép gì từ snapshots lưu trữ.

**Bốn nhãn cho chữ**, ghi ở cuối dòng hoặc trong ô:

| Nhãn | Nghĩa |
|---|---|
| `[nguồn]` | nguyên tác hoặc lời tác giả, kèm câu trích và chương |
| `[Aurel]` | lời Aurel nguyên văn, kèm tên note chứa nó |
| `[diễn giải]` | chữ của AI nằm trong một note `authority: user`, hoặc note ghi lại lời Aurel mà không đặt trong ngoặc nguyên văn |
| `[đề xuất]` | chữ của mình ở lượt này |

**Đánh số:** sự kiện mang số `arc.thứ tự` *(1.1 là sự kiện đầu của Brat)*. Sáu lần chạm nhẹ mang tên *chạm 1* tới *chạm 6*. Việc chưa quyết mà hướng này đẻ ra mang tên *việc mới 1* tới *việc mới 19*. Chữ cái trong ngoặc *(mức B, lối C)* chỉ xuất hiện khi mình gọi lại đúng tên một phương án trong note câu hỏi.

**Liên kết:** tên nào trùng với note của dự án khác hoặc với bản chụp trong `snapshots/` thì mình viết bằng chữ thường trong dấu `` ` ``, không wikilink. Kiểm ngày 01/10: `aurel-main`, `drop-point`, `tropes`, `master`, `tsuna`, `reborn`, `xanxus`, cùng chín hook và hai secret có bản chụp trong `snapshots/`.

**Giới hạn:**

- Mình chưa đọc file của hai worker kia. Mục 9 so với **tiền đề** của hai hướng ấy như người giao việc tả, không so với nội dung họ viết.
- Số từ là phép nhân theo thước của [[rhythm]], không phải số đo. Theo [[emb-chot-uoc-luong-tu-la-san]], mọi con số là **sàn**.
- Câu trích nguyên tác giữ chính tả của tác giả *(Kyoya, Shoichi)*. Phần mình viết dùng Kyouya, Shouichi theo [[emb-chot-chinh-ta-ten]]. Con cáo gọi là *con cáo*, chờ [[q-ten-con-cao]].

## 1. Hướng này kể truyện gì

Hướng B kể phần còn lại của arc Brat như chuyện của một ngôi nhà, một ngôi đền và một thị trấn: Tsuna bảy tuổi học bốn mục của xương sống giữa những người đã có sẵn quanh cậu, còn thế giới bên ngoài mới chỉ bắt đầu ngoảnh đầu về phía Namimori. Sáu nhóm vai có tag Part 2 đều có mặt trong Brat, nhưng ở mức nhẹ nhất mà vẫn thật: mỗi nhóm một cảnh ngắn hoặc một nhịp kể, và mỗi lần chạm đi qua tay một người ở Namimori. Tiền lệ là của chính tác giả: tag Vindice đã được thoả bằng một lá thư ở P2 Ch1. Bốn arc sau là nơi từng nhóm vai được đào sâu, mỗi nhóm ở arc có mốc riêng của nó trong nguồn: Vindice và tin Cradle ở Child, phá băng và Arcobaleno ở Teen, Reborn ở cảnh cuối. Khác hướng A, Brat của hướng B không đưa Xanxus, Fon, Reborn hay Vindice lên trang bằng xương bằng thịt, không ai rời Namimori, và độ lớn của Brat đến từ người trong nhà chứ không từ dàn vai. Khác hướng C, hướng B vẫn chia arc theo tuổi và giữ năm dòng Tông của Aurel, mỗi dòng một arc; mẫu hình *lỏng dần* là một hàng đo trong từng arc, không phải cái xương chia arc. Cái giá nằm ngay ở chữ *nhẹ*: sáu lần chạm dễ thành một danh sách gạch tên, và dễ tới tay Tsuna bằng giấy tờ, đúng lời chê 25/09 mà [[emb-chot-goc-khung-moi]] mục 4 giữ làm thước đo.

## 2. Hai đầu cố định, và cách tới đích

### 2a. Hai đầu

| | Ở đâu | Chỗ dựa |
|---|---|---|
| **Đầu** | cuối [[p2-ch1]]: Estraneo đã bị xoá, Indra vừa tuyên thệ, Tsuna khoảng sáu bảy tuổi | [[emb-lam-lai-lan-ba]] mục *Mốc state* · [[emb-chot-dung-lai-khung]] |
| **Đích** | năm Tsuna 18, Tsunashige và Reborn tới đền. Không viết qua câu kết | `preserve` của `aurel-main` · [[fact-toan-canh-tuong-lai]] |

Câu của tác giả, P1 Ch3, ba đoạn cuối `[nguồn]`:

> *"Sawada Tsunayoshi would wake up nearly a year later, hide out for an extra five years, and pretend to wake up completely normal and flame negative at age seven. By then, the Sky flame dome would've become infamous among those who wanted to vanish, the information carefully disseminated by the Hibari, and Namimori would have become a very different town from the waning sanctuary of his first life. Tsuna would find himself unceremoniously titled as the Sky of Namimori, realize pretending to be flame negative was futile, and would proceed to just wing it."*
>
> *"When Sawada Tsunayoshi turned 18, two visitors would arrive at the shrine."*

### 2b. Mốc ở giữa mà nguồn đã kể trước, và arc hướng B đặt chúng

| Mốc `[nguồn]` | Hướng B đặt ở |
|---|---|
| *pretend to wake up completely normal and flame negative at age seven* | Brat, sự kiện 1.7, **giữa** arc |
| vòm Sky thành truyền thuyết do nhà Hibari phát tán | Brat, nền của chạm 4; Child, sự kiện 2.3 |
| *titled as the Sky of Namimori ... just wing it* | Brat, sự kiện 1.10, chỗ nén đóng arc |
| Nana và Iemitsu về sau hơn một thập kỷ *(câu chữ ở [[fact-toan-canh-tuong-lai]])* | School, sự kiện 3.1 |
| Reborn là gia sư của Tsunashige, không phải của Tsuna | Young Adult, sự kiện 5.1 và 5.5 |

Ba việc [[fact-toan-canh-tuong-lai]] ghi là *bắt buộc* *(Nana và Iemitsu về, Tsunashige lớn lên trong lãnh thổ Vongola, Reborn nhận nhiệm vụ với Tsunashige)* và một việc *bắt buộc không* *(Vongola không bắt được Tsuna)*: vế một là câu chữ nguyên tác, ba vế sau là suy ra của note ấy `[diễn giải]`. Hướng B giữ cả bốn.

### 2c. Reborn: tag của Brat, đích của năm 18. Hướng B xử thế nào, như một phương án

Ràng buộc: [[emb-chot-tag-theo-arc]] đặt `Reborn & Sawada Tsunayoshi` vào Brat; `preserve` khoá đích năm 18; [[q-brat-reborn-toi-dau]] ghi *"Let the games begin"* chỉ kêu khi đó là lần đầu; [[emb-chot-cau-hoi-mo]] mục 1 ghi bond Sun nằm **sau** vạch kết, trong nhánh chỉ gieo.

**Phương án của hướng B** `[đề xuất]`, chưa ai chọn:

| Arc | Reborn có mặt bằng gì | Chỗ dựa |
|---|---|---|
| **Brat** | *(sàn)* trò đùa chạy dài trong POV Tsuna: Reborn là cái thước cậu đem ra giễu. *(tuỳ chọn)* một nhịp kể *ở xa*: Reborn nghe truyền thuyết về một thị trấn có vòm Sky. Ông **không** nghe tên Tsuna, **không** tới, **không** gặp | `[nguồn]` *"Reborn would've killed him for such a stupid mistake"* (P1 Ch1) · *"(Tsuna was so thankful that Reborn wasn't here.)"* (P2 Ch2) · *"Reborn would be so proud."* (tóm tắt P2 Ch2) · câu biên niên ở 2a về truyền thuyết vòm Sky |
| **Child** | để yên, có chủ ý | giữ khoảng cách cho đích |
| **School** | Iemitsu rời Namimori mang theo phiên bản sai về đứa con cả; đó là thứ Reborn sẽ đọc | `reborn` *(note nhân vật)*: ông tới để *"thẩm định một mối nguy tiềm năng, theo thông tin từ Iemitsu"* `[diễn giải]`, note ghi là Aurel chốt đợt 8i |
| **Teen** | được giải nguyền mà không biết ai giải | [[emb-chot-cau-hoi-mo]] mục 1 |
| **Young Adult** | tới đền; lần đầu gặp là cảnh cuối | `[nguồn]` reply tác giả 30/07/2024: *"Reborn brazenly looks Tsuna in the eye during their first meeting / Namimori: How dare-?!"* |

Vì sao phương án này không phạm `preserve`: trong cả năm arc, Reborn và Tsuna không ở cùng một cảnh trước cảnh cuối, và Reborn không có tên cậu.

Chỗ phương án này **khác** note câu hỏi: nhịp *nghe truyền thuyết về thị trấn* nằm giữa mức *chỉ hồi tưởng* và mức *nghe tên, không gặp* của [[q-brat-reborn-toi-dau]]. Note câu hỏi không có mức ấy. Xem mục 6, và *việc mới 3*.

Chỗ phương án này **cọ**: `reborn` *(note nhân vật)* ghi *"việc Tsuna là Sky của Namimori là bí mật của Namimori. Người ngoài sẽ không biết."* `[diễn giải]`. Nguồn thì nói vòm Sky nổi tiếng trong giới muốn biến mất. Hai câu chỉ cùng đứng được nếu người ngoài biết **có một thị trấn**, không biết **Sky ấy là ai**. Mình đọc như vậy; cách đọc ấy là của mình, cần Aurel xác nhận.

## 3. Bảng từng arc

### 3.0 Hình dạng

Năm arc. Tên arc và năm dòng Tông mượn từ [[khung-nam-arc]] ⛔ *(dòng 81, 102, 116, 132, 150 của note ấy, mỗi dòng mang nhãn "Tông (Aurel)")*, theo phép mượn của [[emb-chot-dung-lai-khung]]. Không dòng nào khác của khung ấy được chép.

| Arc | Tuổi Tsuna | Sự kiện | Từ, sàn | Chương, sàn |
|---|---|---|---|---|
| 1 · Brat *(phần còn lại)* | ~6–7 → ~8 | 10, cộng sáu lần chạm nhẹ quy thành 2 = **12** | ~45.600 | ~5 |
| 2 · Child | ~8 → ~10 | **8** | ~30.400 | ~3 |
| 3 · School | ~10 → ~12 | **7** | ~26.600 | ~3 |
| 4 · Teen | ~13 → ~15 | **9** | ~34.200 | ~4 |
| 5 · Young Adult | ~16 → 18 | **5** | ~19.000 | ~2 |
| **Cộng** | ~11 tới 12 năm | **41** | **~155.800** | **~17** |

Phép tính *(executed: nhân tay)*: thước của [[rhythm]] mục 3 là ~3.800 từ mỗi sự kiện, chương P2 trung bình ~9.500 từ. 12 × 3.800 = 45.600; 41 × 3.800 = 155.800; 5 + 3 + 3 + 4 + 2 = 17. Số sự kiện của từng arc là số dòng trong danh sách sự kiện của arc ấy bên dưới, không lấy từ khung cũ.

Ba ghi chú về hình dạng:

1. **Brat lớn nhất** *(12 so với nhiều nhất 9)*, theo câu của [[emb-chot-dung-lai-khung]]: *"Brat là arc lớn nhất"* `[Aurel, qua decision]`. Nhưng độ lớn ấy đến từ nhà, đền và thị trấn, không từ dàn vai. Aurel muốn *lớn nhất* đo bằng gì thì chưa có chữ: *việc mới 19*.
2. **Ranh giới tuổi của bốn arc sau trùng với khung 17/09.** Mình không chép; chúng trùng vì cùng neo vào các mốc có nguồn riêng: Cradle lúc Tsuna ~9–10 và phá băng lúc 13–15 *([[tuoi-va-moc]], [[emb-chot-khung-arc]] mục 2)*, cha mẹ về sau hơn một thập kỷ, đích năm 18. Chỗ hướng B thật sự dời là mép Brat và Child: từ 7 lên ~8. Xem mục 7.
3. Tuổi viết bằng dấu `~` vì [[tuoi-va-moc]] mục 4: *"7 tuổi lúc nào thì phải xem phát triển nội dung chứ không quyết định trước"* `[Aurel]`.

**Ba luật ghép mình giữ**, vì chúng nằm ở decision còn sống chứ không ở khung đã chết:

- Mỗi arc nêu đích danh ít nhất hai người đổi cách nhìn về Tsuna *([[emb-duyet-khung-nam-arc]] mục 1)*.
- Kyouya có ít nhất một cảnh mỗi arc *([[emb-chot-khung-arc]]: Aurel chốt ghép cả ba lối của [[character-arcs]])*.
- Thay đổi dài ở ngoài trang; hành động lớn kể bằng hai mép; arc đóng bằng biên niên hoặc bảng kiểm *(forbid #7; [[rhythm]] mục 3, note ấy tự ghi n = 2)*.

### 3.1 Arc 1 · Brat, phần còn lại · ~6–7 → ~8

| Hàng | Nội dung |
|---|---|
| **Tông** | *This Wasn't Supposed to Happen* · *I Have a Headache.* · *"This is under control."* `[Aurel]`, mượn từ [[khung-nam-arc]] ⛔ dòng 81 |
| **Giọng** | Tsuna trêu người có quyền hơn mình như người ngang hàng, và tự mở đầu những việc không ai yêu cầu. Chỗ cậu đùa và gây rối, theo sự kiện: 1.1 với Kawahira về cái ống tre; 1.2 diễn một đứa trẻ bình thường trước thầy thuốc; 1.6 trước lễ vật courting của Kyouya; 1.7 tự chấm điểm tờ giấy của mình; 1.8 là việc gây rối của cả arc; 1.10 là câu hài duy nhất của đoạn biên niên. Neo `[nguồn]`: *"Do you enjoy bullying me?"* (P2 Ch1) · *"I'll expect good gifts, especially the limited edition Choco parfait from Dulce Encanto."* (P2 Ch1) · *"You don't ask us for favours, Tsunayoshi. You demand it."* (P2 Ch1). **Đo** `[đề xuất]`: mỗi cảnh POV Tsuna trích được 1 câu đùa và 1 việc cậu khởi xướng; mỗi chương có ít nhất 1 người lớn có tên phản ứng trên trang với trò của cậu. Mốc đối chiếu là 8/8 cảnh nguyên tác ở [[khung-soat-giong]] mục 5 *(đề xuất của AI, chưa duyệt)* |
| **Cậu tính mình thêm ở chỗ nào** | Vạch xuất phát không phải số không: cậu đã đòi quà cho mình ở P2 Ch1 *(câu Choco parfait)*. Trong arc, ba việc `[đề xuất]`, khớp bốn mục của [[emb-chot-xuong-song-brat]]: (a) cậu nói ra một ý muốn không phải nước cờ, ở 1.3; (b) cậu để người khác lo một việc thật và không tự đi kiểm, ở 1.4, trong khi đầu arc cậu còn tự đi kiểm: *"From his last secret trip down to Namimori proper, Takeshi's mom was still alive"* `[nguồn]` P2 Ch1; (c) cậu để người khác làm nốt việc cậu làm hỏng, ở 1.9. **Đo:** ba việc, mỗi việc trích được một câu trên trang; không việc nào là một dòng trong 567 kế hoạch |
| **Ai nhìn Tsuna khác đi** | Sugita Gen'ichi *([[emb-chot-thay-thuoc]])* · Irie Shouichi *(tag; [[emb-chot-tag-theo-arc]] ghi "đúng sẵn")*. Người thứ ba nếu cần: mẹ Takeshi, chờ [[q-me-takeshi-ai-quyet]] |
| **Sự kiện** | xem danh sách 1.1 tới 1.10 và bảng sáu lần chạm |
| **Arc đóng ở đâu** | Ở mục 4 của xương sống: sự kiện 1.9. Rồi nén bằng biên niên 1.10, câu chốt là nhịp *just wing it*. Arc **không** đóng bằng việc cậu mất một thứ. Phụ thuộc [[q-brat-dai-bao-nhieu]] và [[q-dac-vu-vongola]], mục 6 |
| **Số** | 10 sự kiện + sáu lần chạm quy thành 2 = 12 · ~45.600 từ · ~5 chương. **Sàn** |

**Sự kiện.** Mỗi dòng là một việc xảy ra. Thứ tự dưới đây không phải thứ tự chương.

| # | Việc xảy ra | Mục xương sống | Chỗ dựa | Chờ |
|---|---|---|---|---|
| 1.1 | Con cáo lên trang lần đầu. Tsuna hỏi Kawahira *"problem"* nghĩa là gì và ông không trả lời thẳng | | hook `ong-tre`, [[nguoi-ban-cu]] · [[emb-chot-cau-hoi-mo]] mục 2: *"phải có một cảnh sau này Tsuna nhận ra nghĩa thứ hai"* `[Aurel, qua decision]` | [[q-ten-con-cao]] |
| 1.2 | Musashi gọi thầy thuốc nhà Sawada lên khám vì các cơn trôi dạt tự dứt. Ông khám và không tìm ra gì | | [[emb-chot-thay-thuoc]] *(locked: ông không biết chuyện Lửa trong cả arc Brat)* · [[khung-oc]]: *"mình không nghĩ Musashi sẽ bỏ mặc các floating episodes của Tsuna"* `[Aurel]` · [[emb-sua-con-troi-dat]] | hook `so-cua-thay-thuoc` giữ hay bỏ |
| 1.3 | Shouichi rủ Tsuna chơi. Tsuna nhận lời | 2, tự tin | tag AO3 · [[emb-chot-shouichi-kiep-truoc]] mục 1 *(Tsuna nhớ Shouichi từ kiếp trước, còn giữ)* | [[q-shouichi-loi-moi]] |
| 1.4 | Sát thủ tới tiệm Takesushi. Người của Indra chặn. Tsuna không có mặt và không đi kiểm. Kể bằng hai mép; trên trang là khoảnh khắc quyết định của người ở tiệm | 1, tin tưởng | hook `hook-me-takeshi-va-sat-thu` · `[nguồn]` P2 Ch1: *"he had asked some of the Hibari to be on the lookout for the assassins that had murdered her last time around"* | [[q-me-takeshi-ai-quyet]] |
| 1.5 | Kyouya biết mẹ mình không rời Namimori nữa. Cậu bỏ kế hoạch đếm ngược và giao Kusakabe đổi tuyến tuần tra lần nữa | | [[emb-chot-cau-hoi-mo]] mục 3 · hook `kyouya-loai-chu-chot` | ô secret trống: Indra có biết con đang chờ mình đi không |
| 1.6 | Nghi lễ bond Getsufuji của Kyouya, ở đền. Nghi lễ phải đồng thời là một nước cờ | | [[truc-chinh]]: *"mỗi bond mới phải được viết như một sự kiện lớn"* `[diễn giải]` · forbid #9 · `[nguồn]` P2 Ch1: *"Kyoya had been courting him for the past year"* | nước cờ nào: *việc mới 6* · hook `bond-bam-vao-cay` giữ hay bỏ |
| 1.7 | Năm cậu bảy tuổi, tờ giấy *tỉnh lại bình thường, âm tính Flame* được làm ra và đi ra ngoài Namimori | | `[nguồn]` câu biên niên ở 2a | ai làm, gửi ai: *việc mới 5* |
| 1.8 | Tsuna trốn xuống thị trấn một mình, không báo ai, bằng Cloud thứ cấp | 3, bốc đồng | `[nguồn]` P2 Ch1 *"his last secret trip down to Namimori proper"* · [[emb-chot-tuyen-varia]] ⛔: *"cậu ấy biết sẽ khiến mọi người lo lắng nhưng cậu không lo họ sẽ buồn và bỏ đi. Được yêu thương thì không sợ hãi mà."* `[Aurel]` · Cloud: [[emb-chot-may-nhan-loi-sky]] | mức *trong thị trấn* là `[đề xuất]` |
| 1.9 | Chuyến trốn đi hỏng theo cỡ một đứa trẻ bảy tuổi trong thị trấn của mình. Cậu không tự gỡ được, và người trong nhà làm nốt | 4, có người đỡ | [[emb-chot-xuong-song-brat]]: *"học cách bốc đồng và tin tưởng sẽ có người đỡ lấy mình khi vấp ngã"* `[Aurel]` · [[nguoi-lon-co-trach-nhiem]] hệ quả 2 `[diễn giải]`: cảnh cậu được đối xử như một đứa trẻ phải đến từ người lớn ngoài bộ Guardian | cái vấp là gì: [[q-dac-vu-vongola]] |
| 1.10 | Cư dân gọi cậu là *Sky của Namimori* trước mặt cậu. Cậu thôi giữ vai âm tính trong thị trấn và ứng biến | | `[nguồn]` câu biên niên ở 2a | |

Về 1.9, để khỏi bị đọc quá tay: mình **không** đề xuất một vết thương, một cuộc phục kích hay một lần suýt chết. Nguồn có sẵn một giới hạn rất đời thường của cái thân này: *"Tsuna frowned in displeasure at his overheated body."* `[nguồn]` P1 Ch3. Vụng về ở đây không phải để gây cười thương hại *([[emb-chot-tsuna-va-natsu-kham-pha-lai]] hệ quả 1)*. Việc cụ thể là gì thì hướng B **không có chất liệu**: [[q-dac-vu-vongola]] ghi phương án *cái vấp khác* là ô trống.

**Sáu lần chạm nhẹ.** Trần đo được `[đề xuất]`: mỗi nhóm nhiều nhất một cảnh ngắn *(~1.500 từ)* hoặc một nhịp kể *(~300 từ)*; cả sáu không quá ~7.600 từ, tức 2 sự kiện quy đổi. Mỗi lần chạm phải là một việc do một người ở Namimori làm trên trang.

| | Nhóm vai | Mức chạm `[đề xuất]` | Qua tay ai | Chỗ dựa | Đào sâu ở | Chờ |
|---|---|---|---|---|---|---|
| chạm 1 | **Xanxus** | Kênh thông tin cũ của Tomoko nhận một yêu cầu từ Varia về vụ Estraneo. Tsuna quyết cách đáp. Một nhịp kể *ở xa*: bên Ý, Xanxus đọc câu trả lời. Không gặp; không ai rời Namimori | Tomoko | [[emb-chot-tuyen-varia]] ⛔, mục *Đường vào*: Vongola nghe đồn về vụ Estraneo, giao đội ám sát điều tra; Tsuna vô tình đã là nguồn tin của họ `[diễn giải]` *(note ghi là nguyên văn Aurel, không đặt trong ngoặc)* · `drop-point` mục 7: kỹ năng của Tomoko chưa được dùng lần nào sau khi đổi phe · `[nguồn]` P1 Ch3: *"name Xanxus of all people least destructive employee of the month"* | Child 2.8 · Teen 4.3, 4.4 | [[q-brat-xanxus-vao-the-nao]] |
| chạm 2 | **Fon** | Indra viết cho Fon rằng bà không về nữa. Một cảnh ngắn POV Indra, hoặc một nhịp kể | Indra | `[nguồn]` End Notes P1 Ch3: *"Raised alongside Fon before marrying Hibari Keita and coming to Japan."* · P2 Ch1: *"she was like a mix of adult Kyoya and Fon"* | Teen 4.1, 4.2 | chưa có note câu hỏi: *việc mới 1* |
| chạm 3 | **Arcobaleno** | Ở bàn trà, Kawahira đếm cho Tsuna bộ Arcobaleno hiện tại của thế giới này. Một nhịp bảng kiểm | Kawahira | `[nguồn]` P2 Ch2: *"we were not only able to solve the Arcobaleno curse but also automate the Tri-Ni-Sette altogether. I can guarantee you freedom because it has been done before."* · [[fact-kimiko-arcobaleno]] | Teen 4.5, 4.7 | chưa có note câu hỏi: *việc mới 2* |
| chạm 4 | **Reborn** | Như bảng 2c: trò đùa chạy dài *(sàn)*; nhịp *nghe truyền thuyết* *(tuỳ chọn)* | Tsuna; nhà Hibari là bên phát tán truyền thuyết | xem 2c | Teen 4.7 · Young Adult 5.1, 5.5 | [[q-brat-reborn-toi-dau]] · *việc mới 3* |
| chạm 5 | **Vindice / Bermuda** | Thư hồi âm của Bermuda tới đền. Người trong nhà nhận; Tsuna đọc | Ayame hoặc Musashi | `[nguồn]` P2 Ch1: *"the leader Vindice felt something rise up in his cold, undead heart. Curiosity."* · reply tác giả 03/12/2024: *"he has something in store for Bermuda just like he had for Kawahira"* | Child 2.1, 2.2 | không kéo [[q-bermuda-an-toi]] lên Brat |
| chạm 6 | **Mukuro và Chrome** | Chrome là Nagi: người trong nhà, lên trang thường xuyên, không tính vào trần. Mukuro: một cảnh ngắn ở tiệm đồ cổ của Kawahira, nhìn qua mắt Nagi | Nagi, Kawahira | `[nguồn]` P2 Ch1: *"Mukuro was also safe and as Mukuro as possible, practically devouring Kawahira's lessons."* | **trống, cần Aurel**: *việc mới 7* | [[q-tsuna-tranh-mukuro]] |

Chỗ dựa cho chính chữ *chạm nhẹ*: mục *Ranh giới* của [[emb-chot-tag-theo-arc]] ghi một tag thoả được *"bằng hồi tưởng (Vongola Tenth Generation Guardians đã thoả theo cách ấy), bằng một lá thư (Bermuda ở P2 Ch1), hay bằng một nhân vật lên trang thật"*.

Chỗ mình thấy yếu ngay ở bảng này: bốn trong sáu lần chạm *(1, 2, 4, 5)* là thư, kênh thông tin hoặc nhịp kể ở xa. Xem mục 8c và mục 9.

### 3.2 Arc 2 · Child · ~8 → ~10

| Hàng | Nội dung |
|---|---|
| **Tông** | *Things Are Escalating* · *Constant Panic.* · *"Mostly under control."* `[Aurel]`, mượn từ [[khung-nam-arc]] ⛔ dòng 102 |
| **Giọng** | Hoạt bát; Tsuna tự tin và gây rối; trò của cậu nhắm vào người lớn quanh cậu. Chỗ dựa: [[emb-chot-bermuda-an-toi]] ⛔ mục *Giọng*: sau các sự kiện arc Brat, arc Child không còn nặng tâm lý mà thiên về hoạt bát; mời Vindice vào nhà ăn tối sẽ khiến rất nhiều người đau tim; nếu Musashi bực thì mắt cún con `[diễn giải]` *(note ghi lại lời Aurel 22/09, không trong ngoặc nguyên văn)*. Chỗ cậu đùa và gây rối: 2.1 là việc gây rối của cả arc; 2.4 trước một nhà sống bằng nghề gán nghĩa cho ngày; 2.5 khi biết mình có hai con cáo đá. **Đo** `[đề xuất]`: mỗi chương ít nhất 1 việc Tsuna gây ra khiến ít nhất 1 người lớn có tên phản ứng trên trang; mỗi cảnh POV Tsuna trích được 1 câu đùa |
| **Cậu tính mình thêm ở chỗ nào** | Cậu lấy **việc của chính mình** làm lý do cho một việc cậu làm. Chỗ dựa: cùng mục *Giọng* ở trên, câu *"Họ làm cậu lo, và đây là cái giá cậu tính cho việc đó"* `[diễn giải]`. **Đo** `[đề xuất]`: trong arc có ít nhất 1 việc mà lý do cậu nói ra trên trang bắt đầu bằng cậu, không bằng một kế hoạch và không bằng người khác. Hàng này cần 2.1 xảy ra; nếu không, ô này **trống, cần Aurel** |
| **Ai nhìn Tsuna khác đi** | Bermuda *(chờ [[q-bermuda-an-toi]])* · cặp song sinh nhà Kōtokui, [[yasuyuki]] và [[noriyuki]] *([[emb-chot-cap-song-sinh]], locked)* |
| **Arc đóng ở đâu** | `[đề xuất]` Ở một việc Tsuna gây ra, không ở một việc cậu ngồi nhìn: bữa tối 2.1 là ứng viên, vì [[q-bermuda-an-toi]] ghi nó từng là đỉnh chuỗi của arc. Tin Cradle 2.8 đi vào bảng kiểm đóng arc như một dòng. Không dùng lại cách đóng *"biết mà chưa làm gì"* *([[emb-chot-goc-khung-moi]] mục 2)* |
| **Số** | 8 sự kiện · ~30.400 từ · ~3 chương. **Sàn** |

| # | Việc xảy ra | Chỗ dựa | Chờ |
|---|---|---|---|
| 2.1 | Bermuda tới Namimori, ngồi trên vai Jäger. Tsuna mời nhóm Vindice vào nhà ăn tối | [[emb-chot-bermuda-an-toi]] ⛔ `[diễn giải]` · [[bermuda]] | [[q-bermuda-an-toi]] |
| 2.2 | Một giao kèo với Vendicare được đặt lên bàn | [[fact-vendicare-giu-so]] *(luật nhánh, còn giữ)* | [[q-cam-khoan-vendicare]] |
| 2.3 | Người đầu tiên xin vào Sanctuary vì truyền thuyết vòm Sky | `[nguồn]` câu biên niên ở 2a · [[khung-oc]]: *mafia nghỉ hưu muốn tới Namimori* `[diễn giải]` *(danh sách Aurel liệt kê)* | [[q-child-nam-cong]] cổng 1, 2 |
| 2.4 | Nhà Kōtokui mang cặp song sinh tới. Tsuna từ chối chọn | [[emb-chot-cap-song-sinh]] | |
| 2.5 | Tsuna biết mình có hai con cáo đá ở sessha. Song chiếu với cặp song sinh | [[ke-cuop-co-dau]] · [[emb-duyet-khung-nam-arc]] mục C | [[q-ten-con-cao]] |
| 2.6 | Đứa trẻ nhà Saint-Exavier được tìm thấy, hoặc tự tới | hook `hook-dua-tre-saint-exavier` · `[nguồn]` P2 Ch1: *"The Hibari were scouring Europe for Futa"* | [[q-cam-khoan-vendicare]] · [[q-child-nam-cong]] |
| 2.7 | Tomoko lộ mặt với thế giới cũ của bà | chỉ có trong chốt cũ | [[q-child-nam-cong]] cổng 3 |
| 2.8 | Tin Cradle tới Namimori khi Tsuna ~9–10. Kể bằng hai mép | [[tuoi-va-moc]] · [[tuyen-xanxus]] · forbid #7 | [[q-child-nam-cong]] cổng 4 |

Ba câu hỏi của arc này có `needed_before` ở dàn ý Child. Hướng B để nguyên chúng ở đó.

### 3.3 Arc 3 · School · ~10 → ~12

| Hàng | Nội dung |
|---|---|
| **Tông** | *Everything Leaves a Trace* · *Again!?* · *"…Oops."* `[Aurel]`, mượn từ [[khung-nam-arc]] ⛔ dòng 116 |
| **Giọng** | Cả thị trấn diễn một vở trước Iemitsu, và Tsuna diễn quá tay. Chỗ cậu đùa và gây rối: 3.2 là vở diễn; 3.3 là cậu vụng trước mẹ; 3.4 là một cảnh ngắn mà cậu không phải người ra tay. Neo `[nguồn]`: *"Tsuna knew a thing or two about being a proper baby. Though he wished he didn't."* (P1 Ch1) · *"Honō of my sort…we do not like hiding."* (P2 Ch1). **Đo** `[đề xuất]`: mỗi chương ít nhất 1 lần vở diễn suýt lộ và được gỡ bằng một trò, không bằng một đoạn nội tâm; mỗi cảnh POV Tsuna trích được 1 câu đùa |
| **Cậu tính mình thêm ở chỗ nào** | Cậu để một việc che cho mình nằm yên trong tay người khác. Nana đã làm việc ấy mười năm: *"In this life Nana steadily recovered and kept her first son's wakening a secret from her husband."* `[nguồn]` P2 Ch1. **Đo** `[đề xuất]`: trong arc có ít nhất 1 việc che cho cậu do một người có tên làm mà cậu không giành lại và không sửa lại |
| **Ai nhìn Tsuna khác đi** | Nana · Tsunashige *(nhìn, và nhìn sai: [[emb-chot-khung-arc]] mục 3)* |
| **Arc đóng ở đâu** | `[đề xuất]` Ở 3.7, đọc từ phía Namimori: Iemitsu đi mà không biết gì, cái vỏ giữ được. Đây là cùng sự kiện với chữ Aurel *"Nana và Iemitsu rời đi lần nữa"* *([[emb-chot-cau-hoi-mo]] mục 6)*. Chỗ cọ: decision ấy gọi sự kiện này là *Xả* của arc; [[emb-chot-goc-khung-moi]] mục 2 thì không dùng lại kiểu đóng *cậu thua một thứ*. Xem *việc mới 10* |
| **Số** | 7 sự kiện · ~26.600 từ · ~3 chương. **Sàn** |

| # | Việc xảy ra | Chỗ dựa | Chờ |
|---|---|---|---|
| 3.1 | Nana và Iemitsu về Namimori sau hơn một thập kỷ | [[fact-toan-canh-tuong-lai]] | |
| 3.2 | Thị trấn tiếp Iemitsu như một người khách và diễn phiên bản *đứa cháu âm tính* | secret `tsuna-am-tinh-tren-giay` · [[fact-sanctuary]] | Tsuna lúc này còn giả âm tính với ai: *việc mới 5* |
| 3.3 | Nana và Tsuna nói chuyện riêng | secret [[nana-giau-viec-tsuna-tinh]] | ô secret trống: Musashi có biết Nana giấu không |
| 3.4 | Iemitsu trả giá. Một cảnh, ngắn | hook `hook-iemitsu-tra-gia` · forbid #3 | cái giá đến từ đâu: chưa quyết, hook tự ghi |
| 3.5 | Tsunashige gặp anh và mang về một phiên bản sai | [[emb-chot-khung-arc]] mục 3 | việc *gặp ở School* chỉ được duyệt trong khung đã chết: *việc mới 11* |
| 3.6 | Musashi gọi tên mẫu hình trước mặt cháu | [[nguoi-lon-co-trach-nhiem]] hệ quả 3 `[diễn giải]` | còn dùng không, arc nào: *việc mới 9* |
| 3.7 | Nana và Iemitsu rời đi lần nữa. Iemitsu mang theo phiên bản sai | [[emb-chot-cau-hoi-mo]] mục 6 `[Aurel, qua decision]` | |

Ngoài bảy sự kiện, một dòng bảng kiểm: Xanxus nằm trong băng, Tsuna *"đang đợi sơ hở, để không gây chú ý từ Timoteo và Vongola"* *([[emb-chot-cau-hoi-mo]] mục 6)*. Cảnh giác forbid #3: Iemitsu có mặt ở bốn trên bảy sự kiện. Ông đứng ở hậu cảnh của 3.1, 3.2, 3.7 và chỉ có một cảnh của riêng mình, 3.4.

### 3.4 Arc 4 · Teen · ~13 → ~15

| Hàng | Nội dung |
|---|---|
| **Tông** | *A New Future* · *We Need to Talk.* · *"Still worth it."* `[Aurel]`, mượn từ [[khung-nam-arc]] ⛔ dòng 132 |
| **Giọng** | Cứng đầu và cãi: khi bị gọi ra nói chuyện, cậu cãi lại hoặc lảng bằng đùa rồi vẫn làm. Cậu trêu Kawahira và Xanxus như người ngang hàng. Neo `[nguồn]`: *"Are you here to be my husband, Kawahira-san?"* (P2 Ch2) · câu *least destructive employee of the month* (P1 Ch3). **Đo** `[đề xuất]`: trong mỗi cảnh có người chất vấn cậu, Tsuna có ít nhất 1 câu đáp là đùa hoặc cãi; không cảnh nào cậu chỉ im lặng nhận |
| **Cậu tính mình thêm ở chỗ nào** | Cậu xin một người ở lại vì cậu muốn, vào đúng lúc người ấy không còn buộc phải ở lại: 4.6. **Đo** `[đề xuất]`: 1 câu xin trên trang, không kèm lý do chiến lược. Hoà hợp hai chiều với Xanxus **không** được tính vào hàng này: [[nguoi-lon-co-trach-nhiem]] hệ quả 1 `[diễn giải]` ghi không giải quyết vấn đề tình cảm của Tsuna bằng bond |
| **Ai nhìn Tsuna khác đi** | Kawahira · Xanxus · Fon |
| **Arc đóng ở đâu** | `[đề xuất]` Ở 4.6, rồi nén bằng bảng kiểm: Xanxus về lại Varia, Reborn lớn lại mà không biết nhờ ai. Chữ Aurel cho chỗ này là ưu tiên 6 của [[truc-chinh]]: *"Cách Kawahira phản ứng với sự tự do"* |
| **Số** | 9 sự kiện · ~34.200 từ · ~4 chương. **Sàn** |

| # | Việc xảy ra | Chỗ dựa | Chờ |
|---|---|---|---|
| 4.1 | Fon tới Namimori qua đường của Indra | [[tuyen-xanxus]] mục *Fon* · [[emb-chot-nguyen-to-di-san]]: *"ai tốt hơn một Arcobaleno để trở thành một nguyên tố chứ"* `[Aurel]` | secret [[indra-co-dong-mau-hibari]] lộ hay không |
| 4.2 | Fon chọn làm Storm. Bond là một sự kiện | [[emb-chot-khung-arc]] mục 2 | hệ các cửa, hook [[hook-ba-cua-con-lai]] |
| 4.3 | Xanxus ra khỏi băng và tấn công. Hoà hợp hai chiều xảy ra trong trận | [[tuyen-xanxus]] · [[emb-chot-khung-arc]] mục 2 | hai mép hay ngoại lệ forbid #7; luật Sky làm Element cho Sky khác; cách phá băng: *việc mới 16* |
| 4.4 | Xanxus bí mật liên hệ Varia, rồi công khai trở về. Nono bỏ qua | [[tuyen-xanxus]] mục *Hậu quả chính trị* `[Aurel]` | |
| 4.5 | Tsuna trình với Kawahira cách cậu giữ lời hứa về Tri-Ni-Sette | `[nguồn]` P2 Ch2, câu ở chạm 3 · [[truc-chinh]] ưu tiên 6 | |
| 4.6 | Kawahira được tự do, và phản ứng | [[truc-chinh]] ưu tiên 6 `[Aurel]` | |
| 4.7 | Reborn được giải nguyền mà không biết ai giải | [[emb-chot-cau-hoi-mo]] mục 1 | |
| 4.8 | Dấu ấn Kimiko trong cây sakaki được mở | [[hook-dau-an-kimiko-trong-cay]] · [[emb-chot-cau-hoi-mo]] mục 4 | |
| 4.9 | Sự cố với nhóm nhà khoa học Vongola | [[hook-su-co-nha-khoa-hoc-vongola]]: *"sau này mới vô tình bị phát hiện"* `[Aurel]` | arc nào: *việc mới 12* |

### 3.5 Arc 5 · Young Adult · ~16 → 18

| Hàng | Nội dung |
|---|---|
| **Tông** | *The Beginning of the End* · *He's Ours This Time.* · *"Everything is fine."* (It was not fine.) `[Aurel]`, mượn từ [[khung-nam-arc]] ⛔ dòng 150 |
| **Giọng** | Người đã dọn sẵn bàn cờ, và lời kể chơi độ lệch giữa câu trấn an và việc đang hỏng. Trò đùa về Reborn, chạy từ Brat, được trả ở cảnh cuối. Neo `[nguồn]`: *"by the time the Vongola tried to get involved he would've successfully covered all his bases"* (P2 Ch1). **Đo** `[đề xuất]`: mỗi chương ít nhất 1 chỗ lời kể đặt một câu trấn an cạnh một việc đang hỏng; cảnh tới đền có ít nhất 1 câu đùa của Tsuna trước câu kết |
| **Cậu tính mình thêm ở chỗ nào** | Cậu để thị trấn đứng trước mình, và cậu nhận một cái tên. Chỗ dựa: dòng Tông giữa *He's Ours This Time*; [[truc-chinh]]: khoảng cách từ *"Decimo đang sửa quá khứ"* tới *"Sawada Tenmei đang sống"* `[diễn giải]`. **Đo** `[đề xuất]`: ở 5.4, phần chuẩn bị do thị trấn tự làm và cậu không rút lại việc nào; ở 5.3 có 1 khoảnh khắc quyết định trên trang |
| **Ai nhìn Tsuna khác đi** | Reborn · Tsunashige |
| **Arc đóng ở đâu** | Ở câu *"Let the games begin."* `[nguồn]`. Không viết qua câu ấy |
| **Số** | 5 sự kiện · ~19.000 từ · ~2 chương. **Sàn** |

| # | Việc xảy ra | Chỗ dựa | Chờ |
|---|---|---|---|
| 5.1 | Phía Ý: Tsunashige được chọn; Reborn nhận việc dạy cậu. Một nhịp kể ở xa | [[fact-toan-canh-tuong-lai]] *(nguồn chỉ nói "tutor")* | hình tượng Tsunashige, mục mở cũ số 5 của `questions/_MOC` |
| 5.2 | Vongola tới gần Namimori và không bắt được Tsuna | [[fact-toan-canh-tuong-lai]] `[diễn giải]` | |
| 5.3 | Tsuna nhận tên Sawada Tenmei. Một sự kiện có khoảnh khắc quyết định trên trang | [[emb-duyet-khung-nam-arc]] mục A *(Aurel duyệt 17/09)* | |
| 5.4 | Thị trấn tự vào vị trí trước ngày hai vị khách tới | tiền lệ `[nguồn]` P2 Ch2: cư dân tự vũ trang canh lễ cưới cáo | |
| 5.5 | Hai vị khách tới đền. Reborn nhìn thẳng vào mắt Tsuna | `[nguồn]` P1 Ch3 và reply tác giả 30/07/2024 | |

Arc này còn một chỗ treo: [[truc-chinh]] ghi tới một lúc cậu *"bỏ một kế hoạch giữa chừng vì có việc quan trọng hơn"* `[diễn giải]`. Hướng B chưa xếp việc ấy vào arc nào; Teen và Young Adult đều nhận được. Cần Aurel.

## 4. Bảng điểm danh

Mỗi ô: người ấy **làm gì** hoặc **đổi gì** trong arc, kèm chỗ dựa. *Trống* nghĩa là mình đã tìm trong note nhân vật, `drop-point`, các decision còn sống và không thấy; mình không điền hộ. Một việc *làm* là đề xuất của hướng B trừ khi ô ghi nguồn; phần *đổi gì* thì gần như chưa ô nào có nguồn, và mình ghi thẳng như vậy.

### 4a. Người ở Namimori

| Người | Brat | Child | School | Teen | Young Adult |
|---|---|---|---|---|---|
| [[musashi]] | **Làm:** gọi thầy thuốc *(1.2, [[khung-oc]] `[Aurel]`)*; chủ lễ bond *(1.6; nền: trưởng tư tế, kannushi của lễ cưới cáo, P2 Ch2)*; là *bà ngoại* trong câu Aurel 19/09 về những người đỡ cậu *(1.9, [[emb-chot-xuong-song-brat]])*. **Đổi gì: trống, cần Aurel**; ô secret *bà biết tới đâu về tái sinh* cũng trống | Chuyến sang Ý thăm cháu thứ hai: `[nguồn]` P2 Ch2, bà định đi khi Tsuna an toàn, chưa đi. Arc nào: **cần Aurel**, *việc mới 15*. Nếu 2.1 xảy ra: bà là người thua mắt cún con `[diễn giải]` | Con gái bà về nhà bà *(3.1)*. Gọi tên mẫu hình *(3.6)*: [[nguoi-lon-co-trach-nhiem]] `[diễn giải]`, cần Aurel xác nhận. **Đổi gì: trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| [[maro]] | **Làm:** người thấy Tsuna trốn đi qua tấm màn *(1.8)*: `[nguồn]` P2 Ch2, không gì xảy ra ở Namimori mà bà không biết kể từ khi tấm màn dựng lên; là *Maro* trong câu Aurel 19/09 *(1.9)*. Bà và Kawahira đã gặp nhau chưa, khi hai Hell Ring cộng hưởng: **trống, cần Aurel**. **Đổi gì: trống** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| [[ayame]] | **Làm:** nhận thư của Bermuda ở đền *(chạm 5)*; chuẩn bị lễ bond *(1.6)*. Nền `[nguồn]` P2 Ch2: *"Trust Ayame to be perfect in her duties."* **Đổi gì: trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| [[nagi]] | **Làm:** là con mắt nhìn Mukuro *(chạm 6)*; biết cậu trốn đi và giữ kín *(1.8)*, nền `[nguồn]` P2 Ch2: cô bé tự nhận việc bảo vệ Tsuna và giấu kín. **Đổi gì: trống, cần Aurel** | Nếu 2.1 xảy ra: đôi mắt cún con thứ hai `[diễn giải]`. Ngoài ra **trống** | **trống, cần Aurel** | **trống, cần Aurel**. Có vào bộ Guardian không: *việc mới 8*, chạm forbid #4 | **trống, cần Aurel** |
| [[kazuki]] | **Làm:** người lớn bình thường có mặt khi cậu vấp *(1.9)*. Nền `[nguồn]` End Notes P2 Ch2: *"when he saw Tsuna out there in the rain he almost had a heart attack. Good thing he is a Chiyu."* **Đổi gì: trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| [[indra]] | **Làm:** vai Guardian Cổng Đông được thử lần đầu *(1.4, `drop-point` mục 7)*; nói với con rằng bà ở lại *(1.5)*; viết cho Fon *(chạm 2)*. **Đổi gì: trống** | Người của bà lùng châu Âu tìm đứa trẻ *(2.6, `[nguồn]` P2 Ch1)* | **trống, cần Aurel** | Đường vào của Fon *(4.1)*. Bà có được biết mình mang dòng máu Hibari không: **cần Aurel** | **trống, cần Aurel** |
| [[kyouya]] | **Đổi:** mất cái mốc cậu đếm, lập kế hoạch khác *(1.5)*; bond hoàn tất *(1.6)*. Hai ô này có nguồn | Cần ít nhất một cảnh *(luật ghép)*. Nội dung: **trống, cần Aurel** | Như Child: **trống, cần Aurel** | Như Child: **trống, cần Aurel** | Người duy nhất Tsuna giữ lại từ kiếp trước, có mặt khi hai vị khách tới *(5.5)*: `[nguồn]` P2 Ch1 *"Except for Kyoya."* Tuổi: *việc mới 17* |
| [[tomoko]] | **Làm:** kỹ năng của bà được dùng lần đầu sau khi đổi phe *(chạm 1)*; là mẹ của đứa trẻ rủ Tsuna chơi *(1.3)*. **Đổi gì: trống** | Lộ mặt *(2.7)*: chờ [[q-child-nam-cong]] cổng 3 | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| [[shouichi]] | **Đổi:** từ đứa trẻ được nhắc qua thành bạn cùng tuổi đầu tiên *(1.3)*. Chỗ dựa: tag; [[khung-oc]]: cả truyện chưa có đứa trẻ nào coi Tsuna là bạn cùng tuổi | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/characters/kawahira\|kawahira]] | **Làm:** mập mờ về cái ống tre *(1.1, [[emb-chot-cau-hoi-mo]] mục 2)*; đếm bộ Arcobaleno *(chạm 3)*; là thầy của Mukuro *(chạm 6)*. Chưa cảnh nào cho thấy ông nói ra mình là Guardian *(`drop-point`)*: có cảnh ấy ở Brat không, **cần Aurel** | Vắng mặt tối Bermuda tới *([[emb-chot-bermuda-an-toi]] ⛔ `[diễn giải]`)*: chờ [[q-bermuda-an-toi]] | **trống, cần Aurel** | **Đổi:** được tự do, và phản ứng *(4.5, 4.6)*. Có nguồn: [[truc-chinh]] ưu tiên 6 | **trống, cần Aurel** |
| [[mukuro]] | **Làm:** lên trang một lần, ở tiệm đồ cổ *(chạm 6)*. Ở đâu, gặp Tsuna hay không: [[q-tsuna-tranh-mukuro]] | Vắng cùng Kawahira tối Bermuda tới: như ô Kawahira | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| [[genichi]] | **Làm:** khám, không tìm ra gì *(1.2)*. Ràng buộc khoá: không biết chuyện Lửa trong cả arc. Ông có dính tờ giấy 1.7 không: *việc mới 5* | Sau Brat ông có được biết chuyện Lửa không: **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| mẹ Takeshi *([[sachiko]])* | 1.4. Bà làm gì, quyết gì: chờ [[q-me-takeshi-ai-quyet]] | [[tuyen-mo-tu-nguyen-tac]] ghi nhà Yamamoto là hậu duệ Ugetsu, một món nợ cũ chưa ai đụng `[diễn giải]`. Nhặt hay không: **cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |
| con cáo *([[natsu]])* | Lên trang lần đầu *(1.1)*. Ai nhìn thấy nó: secret `chi-chu-nhan-thay-cao` | Song chiếu tên với cặp song sinh *(2.5)* | **trống, cần Aurel** | **trống, cần Aurel** | **trống, cần Aurel** |

Riêng hàng con cáo: [[emb-chot-tsuna-va-natsu-kham-pha-lai]] hệ quả 4 ghi việc khám phá lại bản thân là một quá trình và arc Brat chỉ đi được một quãng. Tức ba ô trống sau **phải** có nội dung về sau, chỉ là chưa nguồn nào nói arc nào.

**Đếm** *(executed: đếm tay trên bảng)*: 70 ô. Có nội dung: 26. Ghi *trống, cần Aurel* trọn ô: 44. Cột Brat: 14 trên 14 ô có nội dung. Không hàng nào trống cả năm cột.

Chỗ phải nói thẳng: Brat của hướng B cho cả mười bốn người một việc **làm**. Số ô có nguồn cho việc người ấy **đổi gì** trong cả bảng chỉ là 3: Kyouya ở Brat, Shouichi ở Brat, Kawahira ở Teen. Lời chê *thường quên nhân vật* được chữa ở tầng *có mặt*, chưa ở tầng *thay đổi*. Từ School trở đi, bảng gần như trắng.

### 4b. Sáu nhóm vai có tag

| Nhóm | Brat | Child | School | Teen | Young Adult |
|---|---|---|---|---|---|
| **Xanxus** | chạm 1 | tin Cradle *(2.8)* | trong băng; Tsuna đợi sơ hở *([[emb-chot-cau-hoi-mo]] mục 6)* | ra khỏi băng, hoà hợp hai chiều, về lại Varia *(4.3, 4.4)* | **trống, cần Aurel** |
| **Fon** | chạm 2 | **trống, cần Aurel**. [[khung-oc]] có *hội Tam Hoàng* trong danh sách Aurel liệt kê, chưa xếp arc | **trống, cần Aurel** | tới Namimori, chọn làm Storm *(4.1, 4.2)* | **trống, cần Aurel** |
| **Arcobaleno** | chạm 3 | phép so các lần chuyển đổi của Bermuda *([[emb-chot-bermuda-an-toi]] ⛔ `[diễn giải]`)*, nếu 2.1 xảy ra | **trống, cần Aurel** | lời nguyền được giải *(4.5, 4.7)* | Reborn |
| **Reborn** | chạm 4 | để yên, có lý do: giữ khoảng cách cho đích | bản báo cáo sai rời Namimori *(3.7)* | được giải nguyền, không biết ai giải *(4.7)* | nhận việc; tới đền *(5.1, 5.5)* |
| **Vindice / Bermuda** | chạm 5 | tới Namimori; giao kèo *(2.1, 2.2)* | **trống, cần Aurel** | cách phá băng *nhờ Bermuda* là một trong hai cách của [[tuyen-xanxus]]: **cần Aurel** | **trống, cần Aurel** |
| **Mukuro và Chrome** | chạm 6; Nagi là người trong nhà | xem hàng Mukuro và Nagi ở 4a | như trên | như trên | như trên |

## 5. Hook

18 hook sống *(executed: đọc `status` của 22 file trong `hooks/`; 17 `open`, 1 `partially_paid`, 4 `superseded` bỏ qua)*. Mọi ô là đề xuất của hướng B. Không hook nào được ghi `payoff` ở lượt này.

| Hook | Brat | Child | School | Teen | Young Adult |
|---|---|---|---|---|---|
| `ong-tre` | **tiêu** *(1.1)* | | | | |
| [[nguoi-ban-cu]] | **tiêu** *(1.1)*; tên chờ [[q-ten-con-cao]] | | | | |
| `kyouya-loai-chu-chot` | **tiêu** phần bond *(1.6)* và phần *bigger carnivore* *(1.5)*; hai hook con còn lại để yên | | | | |
| `hook-me-takeshi-va-sat-thu` | **tiêu** *(1.4)* | | | | |
| `hook-bermuda-to-mo` | **gieo tiếp** *(chạm 5)* | **tiêu** *(2.1)* | | | |
| [[hook-ba-cua-con-lai]] | **gieo tiếp** *(1.6)* | để yên | để yên | **tiêu** dần *(4.2)* | |
| [[ke-cuop-co-dau]] | để yên | **tiêu** *(2.5)* | | | |
| [[hook-nha-tu-dac-biet]] | để yên | **gieo tiếp**, cùng 2.1 | | **tiêu**, nếu phá băng đi qua Bermuda | |
| `hook-dua-tre-saint-exavier` | **gieo tiếp**: một dòng bảng kiểm | **tiêu** *(2.6)* | | | |
| `hook-iemitsu-tra-gia` | để yên | để yên | **tiêu**, ngắn *(3.4)* | | |
| [[hook-dau-an-kimiko-trong-cay]] | để yên | để yên | để yên | **tiêu** *(4.8)* | |
| [[kimiko-thay-truoc-tuong-lai]] | để yên | để yên | để yên | **tiêu** *(4.8)* | |
| [[hook-sukunabikona]] | để yên | để yên | để yên | **gieo** *(4.7)* | chỉ gieo; bond Sun nằm sau vạch kết |
| [[hook-su-co-nha-khoa-hoc-vongola]] | không thuộc Brat *(lời Aurel)* | để yên | để yên | **tiêu** *(4.9)*, hoặc ở Young Adult: cần Aurel | |
| `hook-tsunashige-va-reborn` | **gieo tiếp** *(chạm 4)* | để yên | **gieo tiếp** *(3.5, 3.7)* | **gieo tiếp** *(4.7)* | **tiêu** *(5.5)* |
| `bond-bam-vao-cay` | chờ Aurel giữ hay bỏ; nếu giữ thì gieo ở 1.6 | | | | |
| `so-cua-thay-thuoc` | chờ Aurel giữ hay bỏ; nếu giữ thì gieo ở 1.2 | | | | |
| [[nana-iemitsu-cuoi-nhau]] | đã trả trong nguyên tác *(P1 Ch2)* | | phần còn mở *(Nana nhớ chuyện ấy thế nào)* có thể chạm ở 3.3; để yên nếu Aurel không dùng | | |

**Đếm:** Brat tiêu 4, gieo tiếp 4. Child tiêu 3. School tiêu 1. Teen tiêu 5. Young Adult tiêu 1. Hai hook chờ Aurel. Một hook chỉ gieo, không tiêu trong nhánh. Một hook đã trả từ nguyên tác. 4 + 3 + 1 + 5 + 1 = 14 hook được tiêu trong nhánh.

Ghi nhận: [[hook-ba-cua-con-lai]] tự dặn *mỗi cửa ứng với một Guardian* là điều chưa có câu nào nói. Nếu hướng B dùng 1.6 và 4.2 để lấp cửa thì phải khai đó là mở rộng của nhánh.

## 6. Decision bị buộc

### 6a. Mười một câu `unresolved`

Mỗi dòng ghi hướng B **cần** phương án nào để đứng được. Không dòng nào là chốt.

| Câu | Hướng B cần | Nếu Aurel chọn khác |
|---|---|---|
| [[q-brat-dai-bao-nhieu]] | Phương án *đóng ở xương sống*, với Brat khoảng 12 sự kiện. Không dùng được phương án *đóng theo dàn vai*: sáu nhóm vai chỉ chạm nhẹ nên *tag trả xong* không phải một mốc. Không khớp phương án *đóng theo tuổi khi Cradle nổ*: hướng B để Cradle ở Child | Nếu đóng ở mốc âm tính năm bảy: 1.8 tới 1.10 trượt sang Child, và Brat không còn là arc lớn nhất |
| [[q-dac-vu-vongola]] | Phương án *cái vấp khác*: trong Namimori, cỡ đời thường. Note câu hỏi **không có chất liệu** cho phương án này | Nếu giữ đặc vụ Vongola và việc Tsuna sang Ý: Brat của hướng B mất trọng tâm nhà, đền, thị trấn ngay ở chỗ đóng arc. Hướng B gãy ở đây |
| [[q-brat-xanxus-vao-the-nao]] | Phương án *chạm trước Cradle, hoà hợp vẫn sau* ở mức thấp nhất *(qua kênh thông tin, không gặp)*, hoặc phương án *chỉ qua hồi tưởng*. Không dùng được phương án *Cradle lùi về Brat* | Nếu Aurel muốn đối chất và giảng hoà trên trang: đó là hướng A |
| [[q-brat-reborn-toi-dau]] | Phương án *chỉ hồi tưởng* hoặc *nghe tên, không gặp*. Mức *nghe truyền thuyết về thị trấn* của bảng 2c là mức mới. Phương án *gặp thật, sớm* phạm `preserve` | |
| [[q-tsuna-tranh-mukuro]] | Cần câu trả lời **Mukuro ở đâu** trước khi dàn ý. Hướng B đứng được với cả hai nhánh: nếu Tsuna cố ý tránh thì chạm 6 không có Tsuna trong cảnh; nếu không thì cảnh có cả hai | |
| [[q-me-takeshi-ai-quyet]] | Cần **có** câu trả lời, phương án nào cũng chạy *(1.4)*. Kèm: *"Yamamoto-san tiệm Takesushi"* là ai | |
| [[q-shouichi-loi-moi]] | Cần **có** câu trả lời, phương án nào cũng chạy *(1.3)* | |
| [[q-ten-con-cao]] | Cần **có** câu trả lời trước chương có 1.1; phương án nào cũng chạy. 2.5 thì phụ thuộc: song chiếu *một cái tên, hai sự thật* tựa vào chuyện tên con cáo | |
| [[q-bermuda-an-toi]] | **Không** bị kéo lên Brat. Ở Child, hướng B cần phương án *Bermuda tới ăn tối*: hàng *tính mình thêm* và chỗ đóng arc của Child đều tựa vào 2.1 | Nếu *không gặp mặt*: nhóm Vindice không bao giờ được đào sâu, và lời hứa của hướng B với nhóm này rỗng |
| [[q-cam-khoan-vendicare]] | Không phụ thuộc ở Brat. Ở Child: 2.2 và 2.6 chờ nó | |
| [[q-child-nam-cong]] | Không phụ thuộc ở Brat. Ở Child: 2.3, 2.7, 2.8 chờ cổng 1 tới 4. Hướng B thêm sức nặng cho cổng 4 *(ai chứng kiến Cradle)*, vì đó là chỗ Xanxus được đào sâu lần đầu | |

**Tóm lại:** hai câu quyết hướng B sống hay chết *(q-dac-vu-vongola, q-brat-xanxus-vao-the-nao)*; ba câu hướng B cần một dải phương án *(q-brat-dai-bao-nhieu, q-brat-reborn-toi-dau, q-bermuda-an-toi)*; bốn câu chỉ cần **có** câu trả lời *(Mukuro, mẹ Takeshi, Shouichi, tên con cáo)*; hai câu hướng B không phụ thuộc ở Brat *(q-cam-khoan-vendicare, q-child-nam-cong)*.

### 6b. Việc chưa quyết mà hướng này đẻ ra

Lượt này mình chỉ được tạo một file, nên chưa mở note `question` nào. Mỗi dòng là một câu cho Aurel, xếp theo thứ chúng chặn.

| # | Câu | `needed_before` đề xuất |
|---|---|---|
| việc mới 4 | Trần của chữ *chạm nhẹ*: mỗi nhóm một cảnh ngắn hoặc một nhịp kể, cả sáu không quá ~7.600 từ. Aurel nhận trần này, hay muốn trần khác | khung riêng arc Brat |
| việc mới 18 | Mép Brat và Child dời từ 7 lên ~8 tuổi | khung riêng arc Brat |
| việc mới 19 | *"Brat là arc lớn nhất"* đo bằng số sự kiện, số từ, hay số vai lên trang | khung riêng arc Brat |
| việc mới 1 | Fon vào Brat bằng đường nào. [[khung-soat-tong-ket]] mục 4, dòng b11, đã nêu là chưa có note câu hỏi | chia chương arc Brat |
| việc mới 2 | Arcobaleno vào Brat qua ai: Kawahira đếm bộ hiện tại, hay một Arcobaleno cụ thể chạm vào truyện | chia chương arc Brat |
| việc mới 3 | Reborn có được nghe truyền thuyết về thị trấn không, ở mức nào | chia chương arc Brat |
| việc mới 5 | Tờ giấy âm tính năm bảy: ai làm, gửi cho ai, Gen'ichi có dính không; và sau 1.10, cậu còn giả âm tính với những ai | chương có sự kiện 1.7 |
| việc mới 6 | Nghi lễ bond của Kyouya là nước cờ gì | thẻ cảnh của 1.6 |
| việc mới 13 | `bond-bam-vao-cay` và `so-cua-thay-thuoc` giữ hay `superseded`; [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/characters/skull\|skull]] và [[chiyo]] | thẻ cảnh của 1.6 và 1.2 |
| việc mới 14 | Ba ô secret trống: Musashi biết tới đâu về tái sinh; Musashi có biết Nana giấu không; Indra có biết con đang chờ mình đi không | cảnh POV Musashi đầu tiên; sự kiện 1.5; sự kiện 3.3 |
| việc mới 17 | Mốc Kyouya hơn Tsuna hai tuổi còn giữ không, khi [[tuoi-va-moc]] tự lệch | chương đầu nêu tuổi Kyouya |
| việc mới 7 | Mukuro được đào sâu ở arc nào. Hướng B hứa đào sâu mà nguồn chỉ có hai dòng về cậu | khung riêng arc Child |
| việc mới 15 | Chuyến sang Ý của Musashi: có xảy ra không, ở arc nào | khung riêng arc Child |
| *(không mới)* | Hai dòng của hợp đồng nhánh mà [[emb-chot-goc-khung-moi]] mục 2 để chờ Aurel đặt chữ: Luận đề, và forbid #2b. Hướng B cần chữ ấy trước khi hàng *tính mình thêm* đi quá Brat | khung riêng arc Child |
| việc mới 8 | Nagi có vào bộ Guardian không. Trả lời *có* là đổi forbid #4 | arc đầu tiên có bond mới sau Kyouya |
| việc mới 9 | Musashi gọi tên mẫu hình: còn dùng không khi mẫu hình *lỏng dần*, và ở arc nào. Kèm điều kiện `reveal_planned` của secret [[567-ke-hoach]] | khung riêng arc School |
| việc mới 10 | *"Nana và Iemitsu rời đi lần nữa"* còn là **chỗ đóng** arc School, hay chỉ là một sự kiện trong arc | khung riêng arc School |
| việc mới 11 | Tsunashige gặp Tsuna ở School: lượt duyệt 17/09 nằm trong khung đã chết. Giữ hay bỏ | khung riêng arc School |
| việc mới 12 | [[hook-su-co-nha-khoa-hoc-vongola]] thuộc arc nào | khung riêng arc Teen |
| việc mới 16 | Trận phá băng ở 4.3: kể bằng hai mép hay xin ngoại lệ forbid #7; luật một Sky làm Element cho Sky khác; cách phá băng. [[khung-soat-tong-ket]] mục 4, dòng c2 và c3, đã nêu; chưa có note câu hỏi | khung riêng arc Teen |

## 7. Tác động lên timeline

Không dòng nào của `master` hay [[tuoi-va-moc]] bị sửa ở lượt này. Dưới đây là thứ sẽ đổi **nếu** hướng B được chọn.

| Mốc | Hiện ghi | Hướng B | Dời? |
|---|---|---|---|
| Vạch xuất phát | cuối P2 Ch1, Tsuna ~6–7 | như cũ | không |
| Mép Brat và Child | khung đã chết ghi 7 | ~8 | **có**, khoảng một năm. Chỉ là mép kế hoạch; [[tuoi-va-moc]] mục 4 cấm chốt trước sinh nhật |
| Âm tính Flame năm bảy | `master`, mục *Tương lai đã được kể trước*: Tsuna 7 tuổi, kèm cờ *"khó khớp với việc cậu đã ra khỏi ẩn cư lúc ~5, nguồn tự lệch"* | giữ ở tuổi bảy, **giữa** Brat *(1.7)*, không còn là chỗ đóng arc | không dời mốc; đổi vai của mốc |
| *Sky của Namimori*, *just wing it* | cùng mục của `master`, không ghi tuổi | cuối Brat, ~8 *(1.10)* | đặt mốc mới; nguồn không cho tuổi |
| Cradle | Tsuna ~9–10 *([[tuoi-va-moc]], [[emb-chot-khung-arc]] mục 2)* | như cũ, cuối Child *(2.8)* | không |
| Xanxus trong băng | 4–6 năm | như cũ | không |
| Phá băng | Tsuna 13–15 | như cũ, Teen *(4.3)* | không |
| Cha mẹ về | hơn một thập kỷ sau khi đi | School, Tsuna ~10–12 *(3.1)* | không |
| Đích | Tsuna 18 | như cũ | không |

Về cờ *nguồn tự lệch* ở mốc năm bảy: hướng B đọc mốc ấy theo hai tầng, *trên giấy tờ* và *trong Namimori*. Cách đọc hai tầng nằm ở phần lời bình của [[fact-toan-canh-tuong-lai]] `[diễn giải]`, không phải câu của tác giả. Mệnh đề *"cái vỏ tự chặn"* ở cùng đoạn ấy hướng B **không dùng**: [[khung-soat-hieu-luc]] đã chỉ ra nguồn nói cái vỏ *vô ích* rồi cậu *ứng biến*, không nói nó chặn cậu.

**Tuổi các nhân vật theo mép arc của hướng B** *(executed: cộng trừ từ bảng của [[tuoi-va-moc]])*:

| | Brat ~6–7 → ~8 | Child ~8 → ~10 | School ~10 → ~12 | Teen ~13 → ~15 | Young Adult ~16 → 18 |
|---|---|---|---|---|---|
| Kyouya *(+2, chốt 20/09)* | ~8–9 → ~10 | ~10 → ~12 | ~12 → ~14 | ~15 → ~17 | ~18 → 20 |
| Nagi *(nhỏ hơn vài tuổi)* | ~3–4 → ~5 | ~5 → ~7 | ~7 → ~9 | ~10 → ~12 | ~13 → ~15–16 |
| Tsunashige *(kém 4)* | ~2–3 → ~4 | ~4 → ~6 | ~6 → ~8 | ~9 → ~11 | ~12 → 14 |
| Xanxus *(hơn ~10)* | ~16–17 → ~18 | ~18 → ~20 | trong băng | trong băng, rồi ra | |

Ba cờ:

- Dòng Kyouya dùng mốc +2. Bảng tuổi của [[tuoi-va-moc]] còn ghi *"~18–19"* cho lúc Tsuna 18, lệch với +2. Mình không chọn hộ: *việc mới 17*.
- Dòng Xanxus lấy phép trừ mười tuổi từ một mục đã ⛔ của [[tuoi-va-moc]] *(Tuyến Varia)*. Con số chỉ để hình dung; không dùng làm mốc.
- Chạm 1 đặt Xanxus ở trạng thái **chưa** vào băng: đúng với mốc Cradle ~9–10.

## 8. Soát

### 8a. `forbid` của `aurel-main`

| # | Cấm | Hướng B |
|---|---|---|
| 1 | Tsuna thành Vongola Decimo | **đạt**. Không arc nào đi về phía ấy |
| 2 | Viết Tsuna như người tốt bụng | **đạt**, với điều kiện lý do cậu nói ra vẫn là chiến lược hoặc sinh tồn *(`tropes` mục 5.1)*. Cọ nhẹ với chữ *hiền lành, lương thiện* 19/09: lời kể không khen hộ |
| 2b | Đặt Tsuna vào danh sách người được cứu | **đạt theo cách đọc tạm** của [[emb-chot-goc-khung-moi]] mục 2: trong cả năm hàng *tính mình thêm*, không ai cứu cậu, không ai đặt cậu vào 567 kế hoạch; mỗi bước là một việc cậu làm hoặc để người khác làm. **Cọ** từ Teen trở đi, khi chữ *"đó là toàn bộ arc"* của hợp đồng không còn đúng nguyên văn. Chờ Aurel đặt chữ |
| 3 | Iemitsu có arc hoặc nhiều đất diễn | **đạt, sát mép**: School có bốn sự kiện có mặt ông, chỉ một cảnh là của ông |
| 4 | Chọn lại bộ Guardian canon | **đạt**. Cờ: Brat đưa Mukuro, Chrome, mẹ Takeshi, Shouichi lên trang gần Tsuna; không ai trong số đó được viết như ứng viên Guardian. Nagi: *việc mới 8* |
| 5 | Viết Kawahira theo canon KHR | **đạt**. Cờ: chạm 3 dễ kéo lore canon về Checker Face; dựng theo truyện cáo |
| 6 | Em dash | không áp ở tầng khung |
| 7 | Dựng cảnh một quá trình dài, hoặc bên trong một hành động lớn | **đạt** ở 1.4 và 2.8 bằng hai mép. **Cọ** ở 4.3: [[tuyen-xanxus]] đặt hoà hợp *"trong lúc đánh nhau"*. **Cọ nặng với lời chê 25/09** *(sự kiện tới tay Tsuna bằng giấy tờ)*: bốn trên sáu lần chạm ở Brat là thư, kênh thông tin hoặc nhịp kể ở xa |
| 8 | Phong ấn như *bảo vệ vụng về* | **đạt**. School có Iemitsu trở lại; không cảnh nào cho ông một lời bào chữa |
| 9 | Nghi lễ chỉ để trang trí | **chưa đạt**: 1.6 chưa có nước cờ. *Việc mới 6* |

### 8b. `preserve` của `aurel-main`

| Mục | Hướng B |
|---|---|
| Luận đề | **cọ**, không do riêng hướng B: [[emb-chot-goc-khung-moi]] mục 2 đã ghi, chờ Aurel đặt chữ |
| Đích năm 18 | **đạt**, mục 2c |
| Lời tiên tri là Vongola Decimo | **đạt**, không chạm |
| Hai dòng Sawada và luật đặt tên | **đạt**, không chạm. Hướng B không đặt tên nhân vật mới nào |
| Hệ danh xưng Flame | **đạt**. 1.6 và 4.2 sẽ cần tên nghi lễ theo luật; mình không đặt |
| Lõi trong cây sakaki | **đạt**. Hướng B không dùng lõi làm sự kiện; [[emb-chot-loi-dang-quay-ve]] *(locked)* đứng nguyên |
| Hai lời hứa của Kimiko | **đạt**. Chạm 2 và 4.1 chạm vào chỗ Fon không được miễn; không sửa dữ kiện |
| Namimori là Sanctuary | **đạt**. 1.10 và 2.3 dùng đúng cơ chế |
| Indra là Guardian đầu tiên | **cọ có sẵn**: [[khung-soat-tong-ket]] dòng cont LOW8 đã báo nguồn ghi cậu *"already had a guardian for his left"*. Hướng B không làm nó nặng thêm |

### 8c. Bảng vị trí trope

Theo `tropes` mục 2, 3 và 5.

| Trope | Nguồn xử lý | Hướng B | Cờ |
|---|---|---|---|
| Fix-it sửa người, không giữ họ *(3.1)* | bẻ | **theo tác giả**: 1.4, 2.6 là cứu rồi không giữ | |
| Tsuna là Decimo | tháo | **tránh** | |
| BAMF Tsuna, hài ở độ lệch với thân xác | thẳng | **thẳng**: 1.8, 1.9 chơi đúng độ lệch ấy | 1.9 không được thành cảnh thương hại |
| Iemitsu và Nono *(3.5)* | rút sân khấu | **theo tác giả**: 3.4 một cảnh | |
| Courting trước bond | thẳng, có luật | **thẳng**: 1.6. Fon ở 4.2 có courting hay không: chưa quyết | |
| Guardian là bộ canon | đảo | **đảo theo tác giả** | **CỜ**: xem forbid #4 ở 8a |
| Namimori là nơi trú, thành luật | đẩy lên | **thẳng**: 1.10, 2.3 | |
| Tsuna là Sky Arcobaleno | dựng súng, chưa bắn; mục 5.6 dặn không chơi thẳng | **bẻ ở Teen** *(không nhận Pacifier)* | **CỜ**: chạm 3 và 2.1 đều đặt Tsuna cạnh câu hỏi *ai là Sky kế tiếp*. Không cảnh nào được để Kawahira hay Bermuda đề nghị lại Pacifier |
| Cướp cô dâu *(3.4)* | đã bẻ; mục 5.6 dặn không chơi thẳng | **tránh** | **CỜ**: 2.5 trả hook hai con cáo đá mà không dựng lại một vụ cướp cô dâu |
| Nghi lễ là nước cờ *(3.6)* | 2 trên 2 | **chưa đạt** ở 1.6 | xem forbid #9 |
| Bà đỡ đầu nở quá khung | đẩy lên | **thẳng**: Musashi có việc ở Brat; từ Teen trở đi ô của bà trống | |
| Biên niên và bảng kiểm để nén *(mục 4)* | thủ pháp | **dùng** ở mọi chỗ đóng arc | |
| Trả lời tag *(mục 5.5)* | Xanxus, Fon, Reborn, Shouichi | **trả ở mức tối thiểu** trong Brat | xem mục 9 |

Trope **tác giả từ chối** mà hướng B đi sát: *gom lại bộ Guardian cũ*. Không sự kiện nào chơi lại nó. Trope **đánh dấu tránh** mà hướng B đi sát: *Sky Arcobaleno* và *cướp cô dâu*, hai cờ ở bảng trên.

Chính sách leo thang của tác giả *([[rhythm]] mục 4: arc sau phải phiền hơn; đối thủ ở P2 đã lên tới một famiglia, Vindice, và Administrator)*: **Brat của hướng B không leo**. Sau Estraneo và Kawahira, phần còn lại của Brat quay về việc trong nhà. Đây là chỗ hướng B đi ngược một số đo của nguồn; mình không có cách gỡ ngoài việc nêu ra.

### 8d. [[bon-lan-can]]

| Lằn can | Hướng B |
|---|---|
| 1, không phi logic | Cờ ở 2c: truyền thuyết vòm Sky và bí mật *Sky ấy là ai* phải cùng đứng được |
| 2, không vô lí | Mỗi lần chạm phải có lý do của **người ở Namimori** làm việc ấy. *Vì có tag* không phải lý do. Chạm 2 *(lá thư của Indra)* và chạm 3 *(Kawahira đếm)* là hai chỗ lý do còn mỏng nhất |
| 3, không vô nghĩa | Một lần chạm phải vén ra điều gì, hoặc làm ai đó nhìn Tsuna khác đi. Sáu lần chạm đặt cạnh nhau rất dễ thành *arc gạch được bao nhiêu tên*, thứ [[truc-chinh]] cấm ở cấp arc |
| 4, không gây khó chịu | Phép thử *có chương nào buồn cười không* được hàng Giọng giữ ở từng arc. Nguy cơ *cả thị trấn tôn thờ tới mức nhạt* tăng lên khi Brat ở lì trong thị trấn; bốn người không tôn thờ cậu là Gen'ichi, Shouichi, Mukuro và Kyouya, và hướng B cần cả bốn lên trang |

### 8e. Secret

Chỉ ghi tên note. Planner nạp được; không dòng nào dưới đây được chép sang note mà writer nạp.

| Secret | Trong hướng B |
|---|---|
| [[tsuna-tai-sinh]] | **không lộ** trong cả năm arc với bất kỳ ai ngoài người đã biết ở vạch xuất phát |
| [[loi-o-cay-sakaki]] | **không lộ** trong cả năm arc. 4.8 chạm vào cái cây; ai được biết thêm: cần Aurel |
| `tsuna-am-tinh-tren-giay` | **không lộ** với Iemitsu, Tsunashige, Vongola và Reborn cho tới hết cảnh cuối. 1.7, 3.2, 3.7 đều dựa vào nó |
| [[567-ke-hoach]] | **không lộ** ít nhất tới hết Child. 3.6 cần một điều kiện `reveal_planned` nếu Aurel giữ sự kiện ấy |
| [[indra-co-dong-mau-hibari]] | **không lộ** trong Brat, kể cả ở chạm 2. Ở Teen: cần Aurel |
| [[bigger-carnivore]] | có điểm tiêu trong hướng B: 1.5. Trước đó không lộ |
| [[nana-giau-viec-tsuna-tinh]] | **không lộ** tới School. 3.3 chạm vào nó; lộ với ai: cần Aurel |
| `chi-chu-nhan-thay-cao` | chi phối mọi cảnh có con cáo từ 1.1. Ai thấy được: cần Aurel |

## 9. Được và mất

So với tiền đề của hai hướng kia như người giao việc tả: hướng A đưa sáu nhóm vai lên trang thật trong một arc Brat rất lớn; hướng C chia arc theo các bước của mẫu hình *lỏng dần*.

**Được**

1. **Chữa thẳng vào lời chê *thường quên nhân vật*.** Cột Brat của bảng 4a có 14 trên 14 ô có việc làm. Khung 17/09 gọi tên Musashi 0 lần *([[khung-soat-diem-danh]])*.
2. **Gần hình dạng Part 2 của tác giả nhất.** `tropes` mục 1 ghi đối tượng của truyện đã dời từ gia đình Sawada sang thị trấn. Brat của hướng B ở lại trong thị trấn.
3. **Không dời mốc nào có nguồn.** Cradle, phá băng, cha mẹ về, đích năm 18 đứng nguyên; chỉ mép Brat và Child dịch khoảng một năm.
4. **Đích năm 18 được giữ ở mức an toàn nhất mà note câu hỏi cho phép.** Reborn không có tên Tsuna trước cảnh cuối.
5. **Ít câu hỏi bị kéo lên sớm.** Ba câu của Child ở yên chỗ của chúng. [[khung-soat-tong-ket]] mục 4 dòng c1 đã báo: Vindice có mặt ở Brat hơn một lá thư thì [[q-bermuda-an-toi]] lên sớm. Hướng B giữ đúng ở mức một lá thư.
6. **Không cần mở rộng nền dữ kiện ở Brat.** Không ai phải sang Ý; [[q-dac-vu-vongola]] ghi việc ấy là mở rộng của nhánh, chạm nền dữ kiện.
7. **Giọng.** Một arc việc trong nhà dễ giữ sàn đùa hơn một arc phục kích và đối chất. Bốn chương Brat cuối của bản đã lưu trữ đo được 3,8, 1,1, 1,2 và 0,0 dấu chỉ đùa trên 10.000 từ *([[khung-soat-giong]])*; theo các dòng đã gạch của `master`, đó là bốn chương của tuyến Varia và đặc vụ Vongola. Việc nối hai điều ấy là suy ra của mình, không phải một phép đo.

**Mất, và chỗ yếu**

1. **Yếu nhất: *chạm nhẹ* trượt thành giấy tờ và thành danh sách gạch tên.** Bốn trên sáu lần chạm là thư, kênh thông tin hoặc nhịp kể ở xa. Lời chê 25/09 nói đúng về kiểu sự kiện ấy, và nó vẫn là thước đo. Hướng B chỉ có một cách đỡ: buộc mỗi lần chạm phải là việc một người ở Namimori làm trên trang. Cách đỡ ấy chưa được thử.
2. **Thoả chữ của tag, có thể không thoả ý của Aurel.** Bằng chứng thứ ba của [[emb-chot-tag-theo-arc]]: *"Người ta không tag tên một nhân vật mình chưa định đưa vào tác phẩm ấy"*, và Aurel: *"có lẽ tác giả đã có một kế hoạch nào đó trước khi drop"*. Một lá thư gửi Fon thoả mục *Ranh giới* của decision; nó khó được gọi là một kế hoạch. So với hướng A, đây là chỗ hướng B thua rõ.
3. ***Brat là arc lớn nhất* đạt bằng con số, chưa chắc đúng nghĩa.** Decision nối độ lớn của Brat với việc nó chứa *"ngần ấy người"*. Hướng B làm Brat lớn bằng người trong nhà.
4. **Chỗ đóng arc Brat chưa có chất liệu.** Hướng B cần một *cái vấp khác*, và note câu hỏi để trống ô ấy. Nếu Aurel giữ chốt cũ thì hướng B gãy.
5. **Không leo thang.** Mục 8c: đi ngược số đo của [[rhythm]] mục 4. [[rhythm]] mục 1 còn ghi chương dưới ~10.000 từ ngay sau điểm dừng sẽ đọc như tụt hơi; một Brat việc nhà dễ rơi vào đó hơn.
6. **Lời hứa *đào sâu ở arc sau* có hai chỗ rỗng.** Mukuro không có nguồn cho arc nào sau Brat. Vindice chỉ được đào sâu nếu [[q-bermuda-an-toi]] ra *có gặp*.
7. **Bốn arc sau có dáng gần khung 17/09.** Mình không chép dòng nào, và các mép tuổi tựa vào mốc có nguồn riêng. Nhưng Aurel đã nói *"Dựng lại khung"*; nếu ý ấy gồm cả việc chia lại mười một năm thì hướng B làm ít hơn được yêu cầu, và hướng C làm đúng việc ấy.
8. **Mẫu hình *lỏng dần* chỉ là một hàng.** Trong hướng C nó là xương. Ở đây, nếu dàn ý chương không giữ hàng ấy thì nó bốc hơi mà khung vẫn trông nguyên vẹn. Ba trên năm ô của hàng ấy *(School, Teen, Young Adult)* không có lời Aurel đứng sau.
9. **Điểm danh mới chữa một nửa.** Mục 4a: mười bốn người đều có việc làm ở Brat, nhưng cả bảng chỉ có 3 ô có nguồn cho việc người ấy đổi gì, và từ School trở đi bảng gần như trắng.

## 10. Việc kế tiếp

1. Aurel chọn một trong ba hướng, hoặc ghép.
2. Nếu chọn hướng B: trả lời hai câu sống chết ở mục 6a trước *([[q-dac-vu-vongola]], [[q-brat-xanxus-vao-the-nao]])*, rồi *việc mới 4, 18, 19*.
3. Mở note `question` cho mười chín việc ở mục 6b. Lượt này chưa mở được.
4. Chưa có dàn ý chương nào được dựng từ note này. Tám câu `unresolved` chặn Brat còn mở.
