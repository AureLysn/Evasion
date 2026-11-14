---
id: arc.EMB.khung-moi-huong-c
type: arc
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: proposed
aliases: ["khung moi huong C", "chia arc theo buoc cua mau hinh", "nam buoc tinh minh", "nam dong dich den thanh nam arc", "arc dong o viec cau lam", "ranh gioi arc khong theo sinh nhat"]
related: ["[[emb-chot-dung-lai-khung]]", "[[emb-chot-goc-khung-moi]]", "[[emb-chot-tag-theo-arc]]", "[[khung-soat-tong-ket]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main|aurel-main]]", "[[truc-chinh]]", "[[gia-thuyet-aurel]]", "[[emb-chot-xuong-song-brat]]", "[[tuoi-va-moc]]", "[[emb-chot-cau-hoi-mo]]", "[[emb-chot-khung-arc]]", "[[nguoi-lon-co-trach-nhiem]]"]
source:
  type: inference
  ref: "plan-continuation 01/10/2026, dung lai khung, worker 3/3 (huong C). De xuat, chua duyet."
authority: ai
confidence: 0.6
always_load: false
load_for: [planner]
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [arc, proposal]
last_updated: 2026-10-01
---

# Khung mới, hướng C: chia arc theo các bước của mẫu hình, không theo tuổi

> **Đề xuất, chưa duyệt.** Một trong ba hướng để Aurel chọn sau [[emb-chot-dung-lai-khung]]. Tầng khung: không có beat chương, không có thẻ cảnh. Note này không sửa note nào khác, không trả lời hộ câu hỏi `unresolved` nào, và không dùng dòng nào do AI dựng trong [[khung-nam-arc]] ⛔ làm khung.
>
> **Cổng trước khi làm** *(executed)*: `python 01_Origine/04_Tools/VaultTool/plan_gate.py --project EMB` → **exit 0**. `python 01_Origine/04_Tools/VaultTool/context_resolver.py --root . --project EMB --role planner --branch aurel-main` → **exit 1** *(chỉ cảnh báo: nạp 202 note cho một tác vụ; mục CAM trống)*.
>
> **Mốc state:** cuối P2 Ch1, theo [[emb-lam-lai-lan-ba]]. Mọi mục có ⛔ và mọi note `superseded` hoặc `archived` đều bị bỏ qua, trừ khi lấy lại **lời Aurel** nằm trong đó, có ghi chỗ mượn.

**Ba loại chữ, và nhãn của chúng trong note này**

| Nhãn | Nghĩa |
|---|---|
| **[Aurel]** | lời Aurel nguyên văn, có trích và tên note chứa nó |
| **[diễn giải]** | chữ của AI nằm trong một note `authority: user`; không phải lời Aurel |
| **[đề xuất]** | chữ của hướng C, tức của lượt này |
| **[nguyên tác]** · **[tác giả]** | câu chữ trong thân truyện, kèm chương · ghi chú hoặc reply của tác giả gốc |

Tên note nào trùng với note khác trong vault *(aurel-main, drop-point, tropes, master, và các hook có bản trong `snapshots/`)* được viết bằng chữ thường trong thân note, không gắn wikilink.

## 1. Hướng này kể truyện gì

Hướng C kể mười một năm giữa cuối P2 Ch1 và năm 18 như **năm lần Tsuna tính mình thêm một chút**, và đặt ranh giới arc ở chỗ lần ấy xong chứ không ở sinh nhật. Thang năm bước không phải chữ của AI: nó là năm dòng *Đích đến phát triển* của Aurel trong [[gia-thuyet-aurel]], theo đúng thứ tự Aurel viết, với bước đầu mang thang bốn mục của Brat. Mỗi bước là một việc cậu làm, hoặc để người khác làm cho mình, có một người ở Namimori đứng nhìn thấy; arc đóng ở việc ấy, không đóng ở việc cậu thua một thứ. Các mốc ngoài *(giấy âm tính năm bảy, Cradle, cha mẹ về, phá băng, Reborn tới)* vẫn xảy ra đúng tuổi, nhưng rơi vào giữa arc như vật liệu, không làm chỗ đóng. Giọng lấy từ chính cách tác giả viết mẫu hình, tức một trò đùa chạy: *"Once again he had failed to factor in his status. Reborn would've had his hide."* *(P2 Ch2)*. Khác hướng A, Brat không đưa cả sáu nhóm vai lên trang: mức có mặt của từng nhóm do mục nào của thang cần nó. Khác hướng B, Brat không chỉ chạm nhẹ: hai nhóm lên trang thật vì thang cần một sự kiện ở đó, một nhóm có một cảnh, ba nhóm còn lại ở mức thư, trò đùa chạy, hoặc đi nhờ người khác. Và khác cả hai, tên arc theo tuổi thôi là trục chia; chỉ tên Brat của tác giả gốc được giữ.

## 2. Hai đầu cố định, và cách tới đích mà không phạm `preserve`

| | | Nguồn |
|---|---|---|
| **Đầu** | cuối P2 Ch1: Estraneo đã bị xoá, Indra vừa tuyên thệ, Tsuna khoảng sáu bảy tuổi | [[emb-chot-dung-lai-khung]] · drop-point mục 1 |
| **Cuối** | *"When Sawada Tsunayoshi turned 18, two visitors would arrive at the shrine. Sawada Tsunashige and his tutor, the hitman Reborn. Let the games begin."* Không vượt qua câu này | **[nguyên tác]** P1 Ch3, đoạn biên niên · [[fact-toan-canh-tuong-lai]] · `preserve` của aurel-main |
| **Phải xảy ra ở giữa** | *"pretend to wake up completely normal and flame negative at age seven"* · *"Tsuna would find himself unceremoniously titled as the Sky of Namimori, realize pretending to be flame negative was futile, and would proceed to just wing it"* · *"it would be more than a decade later when they would return"* *(Nana và Iemitsu)* | **[nguyên tác]** P1 Ch3, cùng đoạn |
| **Không được xảy ra** | Vongola bắt được Tsuna · Tsuna thành Decimo · tuyến trả giá cho lời tiên tri · Iemitsu có arc | [[fact-toan-canh-tuong-lai]] *(vế đầu là suy ra của note)* · aurel-main forbid #1, #3 · [[emb-chot-khung-arc]] mục 4 |

**Reborn: phương án của hướng C, chưa ai chọn.** Reborn là tag của Brat *([[emb-chot-tag-theo-arc]])*, và cùng lúc `preserve` khoá việc ông gặp Tsuna ở năm 18. Hướng C xử như sau:

1. **Ông không lên trang và không gặp Tsuna ở bất kỳ arc nào trước cảnh cuối.** Phương án *gặp thật, sớm* của [[q-brat-reborn-toi-dau]] hướng này không dùng được.
2. **Tag ở Brat được trả bằng thứ nguyên tác đã làm sẵn: Reborn là giọng trong đầu Tsuna mỗi lần cậu quên tính mình.** Hai câu **[nguyên tác]** P2 Ch2: *"Once again he had failed to factor in his status. Reborn would've had his hide."* và *"It was foolproof! Relatively… (Tsuna was so thankful that Reborn wasn't here.)"*. Bảng tag của tropes mục 1 đếm tên ông 4 · 0 · 3 · 2 · 5 lần qua năm chương, toàn trong ký ức, cộng câu biên niên năm 18. Hướng C gắn trò đùa ấy vào từng mục của thang **[đề xuất]**: đo bằng số lần lời kể gọi tên Reborn ngay sau một chỗ cậu quên tính mình.
3. **Có thêm một dòng "ông nghe một cái tên" hay không thì hướng C không phụ thuộc.** Nếu Aurel chọn phương án *nghe tên, không gặp*, dòng ấy nằm trong đoạn biên niên đóng Brat. Nếu Aurel chọn *chỉ hồi tưởng*, mục 2 ở trên đã đủ.
4. Ở arc thứ tư ông *được giải nguyền mà không biết ai giải*, và bond Sun nằm sau vạch kết: [[emb-chot-cau-hoi-mo]] mục 1. Ở arc cuối ông tới, và người từng gọi tên mẫu hình trong đầu cậu suốt mười một năm bước vào mà không biết cậu là ai.

**Từng mục `preserve` đi qua thế nào** được soát ở mục 8.

## 3. Các arc

### 3.0 Tên arc: tên nào của tác giả gốc, và hướng này giữ gì

Kiểm trong `personal-bulk:fiction-sources/EMB/raw/` *(executed: tìm chữ "arc" trong hai file HTML và file reply)*. Tác giả gốc công bố **đúng hai tên arc**:

| Tên | Câu của tác giả | Chỗ |
|---|---|---|
| **baby arc** | *"And that's it for the baby arc."* | End Notes P1 Ch3 |
| **brat arc** | *"Baby arc done! Brat arc begin!!!"* · *"Now that the baby arc is over, lets move onto the brat arc!"* | Chapter Notes P1 Ch4 · Summary của Part 2 |

Tác giả **không** nêu tuổi mở hay tuổi đóng của brat arc, và không nêu tên arc nào sau nó. Câu gần nhất là Chapter Summary P1 Ch3: *"Tsuna finds a solution to his baby problems, only for teenage problems to arrive as a sequel."* Các tiêu đề *"Part 1 (Baby Arc)"*, *"Part 2 (Brat Arc)"* trong `AO3-author-replies.md` là nhãn của người trích, không phải chữ tác giả.

Bốn tên **Child · School · Teen · Young Adult** là của Aurel: [[khung-nam-arc]] ⛔ dòng 77 ghi *"Tên arc và độ tuổi theo khung Aurel dựng từ đợt 8"*, và [[emb-duyet-khung-nam-arc]] mục 3 duyệt *"tên năm arc"*.

| | Hướng C làm gì | Vì sao |
|---|---|---|
| **Brat** | **giữ tên** | tên của tác giả gốc; hai decision `locked` buộc vào đúng tên này *([[emb-chot-tag-theo-arc]], [[emb-chot-xuong-song-brat]])*; tác giả không gắn tuổi cho nó, nên một Brat đóng ở chỗ bước xong không trái câu chữ nào |
| **Child · School · Teen · Young Adult** | **không dùng làm tên arc trong note này; không tự đặt tên thay** | bốn tên ấy mô tả tuổi, mà ở hướng này ranh giới không rơi vào tuổi. Chúng là chữ của Aurel, nên giữ hay đổi là việc của Aurel *(mục 6)*. Trong note này bốn arc sau được gọi bằng **tên bước**, là tên tạm **[đề xuất]** |

### 3.1 Thang năm bước

**[Aurel]**, [[gia-thuyet-aurel]] mục *Đích đến phát triển*, năm dòng, nguyên thứ tự:

> - chấp nhận rằng **mình cũng là một phần của famiglia**
> - hiểu rằng **người khác chăm sóc mình không phải một món nợ**
> - **biết từ chối sự hi sinh vô hạn**
> - dùng Harmony để kết nối **mà không tự hoà tan**
> - **coi bản thân là một người mà Sawada Tsunayoshi cũng có trách nhiệm bảo vệ**

Và luận đề đầy đủ ở cùng note, cũng **[Aurel]**: *"Hành trình phát triển thật sự của Tsuna không chỉ là học cách trở thành một thủ lĩnh, mà còn là học cách yêu người khác mà không xoá bỏ chính mình — và cuối cùng học cách yêu chính mình."*

Việc xếp mỗi dòng vào một arc, theo đúng thứ tự ấy, là **[đề xuất]**. Aurel viết năm dòng này cho Tsuna nói chung, không viết như một bản chia arc.

| # | Arc *(tên tạm)* | Bước | Dòng của Aurel làm neo | Tên Aurel gần nhất |
|---|---|---|---|---|
| 1 | **Brat** | để người khác đỡ | dòng 1, cộng thang bốn mục 19/09: *"học cách tin tưởng, học cách tự tin, học cách bốc đồng và tin tưởng sẽ có người đỡ lấy mình khi vấp ngã"* *([[emb-chot-xuong-song-brat]])* | Brat |
| 2 | **Thôi ghi nợ** | nhận mà không trả | dòng 2 | Child |
| 3 | **Biết từ chối** | nói không với một việc đòi cậu trả bằng chính mình | dòng 3 | School |
| 4 | **Không tan** | vào một bond mới mà giữ lại một điều của mình | dòng 4 | Teen |
| 5 | **Tự giữ mình** | đặt một nước cờ mà người được bảo vệ là chính cậu | dòng 5 | Young Adult |

**Chỗ xuất phát của thang, đo trên nguyên tác** *(inspected)*: cậu đã biết đòi *("I'll expect good gifts, especially the limited edition Choco parfait from Dulce Encanto."*, P2 Ch1*)*, đã có một câu muốn cho mình *("live his best life as a sanctuary sky"*, P2 Ch1*)*, nhưng nhận ơn bằng sổ nợ: *"Tsuna had felt unworthy of their gratitude"* · *"he should try and become worthy of their gratitude instead of overthinking the issue"* · *"he had to repay his debt and protect Namimori"* *(P2 Ch1)*. Thang không bắt đầu từ số không, và không bắt đầu từ một đứa trẻ buồn.

**Luật chung cho cả năm arc** **[đề xuất]**, dựng trên luật đã có:

- **Arc đóng ở việc cậu làm.** [[emb-chot-goc-khung-moi]] mục 2: khung mới ghi cho từng arc *"cậu tính mình thêm ở chỗ nào — đo được, như một việc cậu làm cho chính mình hoặc để người khác làm cho mình"*, và kiểu *"arc đóng ở chỗ cậu thua một thứ"* không dùng lại.
- **Bước là một khoảnh khắc trên trang, không phải một quá trình.** aurel-main forbid #7: thay đổi dài nằm ngoài trang, trên trang chỉ có khoảnh khắc quyết định và hậu quả. Mỗi bước vì vậy chỉ có **một** cảnh quyết định; phần "dần dần" nằm trong đoạn biên niên hoặc bảng kiểm đóng arc, hai công cụ nén của [[rhythm]] mục 7.
- **Bước được thấy từ ngoài.** [[truc-chinh]] **[diễn giải]**: truyện kể bằng mắt người khác nhìn Tsuna. Mỗi arc nêu đích danh ít nhất hai người đổi cách nhìn về cậu *([[emb-duyet-khung-nam-arc]] §1)*; ở hướng C một trong hai người ấy phải là người có mặt lúc bước xảy ra.
- **Không ai cứu cậu.** [[emb-chot-goc-khung-moi]] mục 2 ghi *"không ai cứu cậu"* và dẫn câu *"người khác chỉ có mặt để đỡ"* như lời Aurel 19/09. Trong [[emb-chot-xuong-song-brat]] câu ấy nằm ở phần **[diễn giải]**, ngoài khối trích nguyên văn; nguyên văn **[Aurel]** là *"tin tưởng sẽ có người đỡ lấy mình khi vấp ngã"*. Cả hai cách đọc cho cùng một luật: trong cả năm bước, người làm là cậu.
- **Bước không phải một lần vỡ oà.** [[emb-chot-xuong-song-brat]] **[diễn giải]**: *"Đừng viết thành một cảnh cậu oà lên."*

### 3.2 Brat · để người khác đỡ

| Hàng | |
|---|---|
| **Tuổi** | ~6–7 → ~8. Đầu cố định; đuôi **trôi theo bước** *(chờ [[q-brat-dai-bao-nhieu]])*. Mốc bảy tuổi nằm **trong** arc, không phải chỗ đóng |
| **Tông** | *This Wasn't Supposed to Happen* · *I Have a Headache.* · *"This is under control."* **[Aurel]**, mượn từ [[khung-nam-arc]] ⛔ dòng 81 *(ba dòng: Độc giả · Gia đình · Tsuna tự nhận)* |
| **Giọng** | Cậu trêu người có quyền hơn mình như người ngang hàng, và dỗi kiểu ông già. Neo **[nguyên tác]** P2 Ch1: *"Do you enjoy bullying me?" / "Very much so."* · *"This is all highly improper! You haven't even courted me… I am offended actually!"*. Cậu gây rối bằng cách **trốn nhà đi chơi** *(**[Aurel]** 19/09, xem sự kiện 10)*. Trò đùa chạy *"Once again he had failed to factor in…"* xuất hiện ở mỗi mục của thang, kể bằng giọng ấy, không bằng giọng thương. **Đo [đề xuất]:** mỗi sự kiện xương sống *(1, 3, 7, 10, 11)* chỉ ra được một câu đùa của Tsuna và một việc cậu tự mở đầu; đếm số lần lời kể gọi tên Reborn sau một chỗ cậu quên tính mình |
| **Cậu tính mình thêm ở chỗ nào** | Thang bốn mục, nguyên bảng của [[emb-chot-xuong-song-brat]] *(Aurel giữ nguyên 01/10, [[emb-chot-goc-khung-moi]] mục 1)*: **(1)** cậu giao một việc thật cho người khác và không kiểm lại · **(2)** cậu nói ra một ý muốn của chính cậu, không phải một nước cờ · **(3)** cậu làm một việc chưa tính, và biết nó sẽ làm người khác lo · **(4)** cậu vấp thật, và có người đỡ, và cậu không sợ họ bỏ đi. **Đo:** mỗi mục có đúng một cảnh quyết định trên trang, có người có tên nhìn thấy |
| **Ai thấy** *(≥ 2 tên)* | [[genichi]] *(người lớn bình thường, không biết chuyện Lửa: [[emb-chot-thay-thuoc]], [[nguoi-lon-co-trach-nhiem]])* · [[shouichi]] *(bạn cùng tuổi đầu tiên: [[emb-duyet-khung-nam-arc]] mục 2)* |
| **Arc đóng ở đâu** | Ở **mục 4**: cậu vấp, có người đỡ, cậu không sợ họ bỏ đi. Sau đó là một đoạn biên niên nén, mang câu của tác giả: bị gọi là Sky của Namimori, thấy giả âm tính là vô ích, *"would proceed to just wing it"*. Arc **không** đóng ở sinh nhật, **không** đóng khi trả xong tag |
| **Số** *(SÀN)* | **11 sự kiện** → ~41.800 từ → **~4–5 chương**. Arc lớn nhất của khung, khớp [[emb-chot-dung-lai-khung]] |

**Sự kiện ý chính.** Số trong ngoặc vuông là mục của thang mà sự kiện ấy mang. Sự kiện không mang mục nào là sự kiện của động cơ; [[emb-chot-xuong-song-brat]] dặn arc *"không được có quá nhiều chương như thế"*.

| # | Việc xảy ra | Mục | Nguồn · chỗ còn mở |
|---|---|---|---|
| 1 | Sát thủ tới nhà Yamamoto; những người nhà Hibari đã được giao canh chặn họ lại. Tsuna không có mặt và không kiểm lại | [1] | **[nguyên tác]** P2 Ch1: *"Takeshi's mom was still alive, and he had asked some of the Hibari to be on the lookout for the assassins that had murdered her last time around"*. Vế *không có mặt, không kiểm lại* là **[đề xuất]**. Ai quyết trên trang: [[q-me-takeshi-ai-quyet]]. Phải rơi sớm trong arc: [[tuoi-va-moc]] ghi hẹn giờ này đang chạy |
| 2 | Con cáo lên trang lần đầu trong nhánh; người đọc thấy Tsuna dùng món quà của Kawahira thế nào, và cậu nhận ra nghĩa thứ hai của nó | | hook ong-tre · [[nguoi-ban-cu]] · drop-point mục 3 *("chưa cảnh nào cho thấy cậu dùng nó thế nào")* · [[emb-chot-cau-hoi-mo]] mục 2 *(phải có cảnh nhận ra nghĩa thứ hai; arc nào thì decision không nói; đặt ở Brat là **[đề xuất]**)*. Tên: [[q-ten-con-cao]] |
| 3 | Shouichi và Tsuna thành bạn | [2] | [[emb-duyet-khung-nam-arc]] mục 2 · [[emb-chot-shouichi-kiep-truoc]] mục 1. Cảnh cụ thể: [[q-shouichi-loi-moi]] |
| 4 | Courting của Kyouya hoàn tất; bond thành một sự kiện có nghi lễ | | **[nguyên tác]** P2 Ch1: *"Kyoya had been courting him for the past year… it really wasn't in his hands anymore."* · [[truc-chinh]] **[diễn giải]**: mỗi bond mới là một sự kiện lớn. Cờ forbid #9: nghi lễ ấy là nước cờ nào thì chưa có |
| 5 | Kyouya biết cái mốc cậu đang đếm đã không còn | | [[emb-chot-cau-hoi-mo]] mục 3; nội dung thuộc secret [[bigger-carnivore]] |
| 6 | Giấy tờ ghi Tsuna *bình thường, âm tính Flame*, năm cậu bảy tuổi | | **[nguyên tác]** P1 Ch3. Ai ký, ký lúc nào trong năm: trống, cần dàn ý Brat *(cảnh ký của bản đã lưu trữ không dùng lại)* |
| 7 | Mukuro gặp Tsuna lần đầu trên trang; cùng cảnh ấy cho thấy Kawahira đã là người trong nhà | [1] | tag · **[nguyên tác]** P2 Ch1: *"Mukuro was also safe and as Mukuro as possible, practically devouring Kawahira's lessons."* Mục [1] ở đây là **[đề xuất]**: việc dạy Mukuro đã giao cho Kawahira. Chờ [[q-tsuna-tranh-mukuro]] |
| 8 | Bermuda hồi âm lá thư; Tsuna trả lời | | hook hook-bermuda-to-mo · **[tác giả]** reply 03/12/2024: *"he has something in store for Bermuda just like he had for Kawahira"*. Nội dung thư: không chốt |
| 9 | Fon tới nhà Hibari | | tag · **[tác giả]** End Notes P1 Ch3: Indra *"Raised alongside Fon before marrying Hibari Keita"*. Mức và cách: **trống, cần Aurel** *(chưa có note `question`)* |
| 10 | Tsuna trốn nhà đi chơi; trên đường cậu chạm Varia, và Xanxus thấy một Cloud | [3] | **[Aurel]** 19/09, mượn từ [[emb-chot-tuyen-varia]] ⛔: *"cũng là một kiểu biểu hiện học làm đứa trẻ… cậu ấy biết sẽ khiến mọi người lo lắng nhưng cậu không lo họ sẽ buồn và bỏ đi. Được yêu thương thì không sợ hãi mà."* · *"có lẽ Xanxus đang cố tán tỉnh một đám mây?"*. Chạm ở đâu, và cậu có rời Nhật không: trống *(bản cũ đưa cậu sang Ý; nguyên tác không nói)*. Chờ [[q-brat-xanxus-vao-the-nao]] |
| 11 | Cái vấp, và người đỡ | [4] | [[emb-chot-xuong-song-brat]]. Cái vấp là gì, ai đỡ: [[q-dac-vu-vongola]] |

Thước *"sự kiện tới tay Tsuna bằng giấy tờ"* *(lời chê 25/09, còn là thước đo theo [[emb-chot-goc-khung-moi]] mục 4)*: ở Brat **2/11** *(sự kiện 6 và 8)*; sự kiện 1 xảy ra khi cậu vắng mặt, nên phải có một POV đứng ở đó.

### 3.3 Thôi ghi nợ

| Hàng | |
|---|---|
| **Tuổi** | ~8 → ~10. Cả hai đầu trôi theo bước |
| **Tông** | *Things Are Escalating* · *Constant Panic.* · *"Mostly under control."* **[Aurel]**, mượn từ [[khung-nam-arc]] ⛔ dòng 102. Aurel viết dòng này cho arc Child chia theo tuổi; có còn khớp với bước này không thì cần Aurel xác nhận |
| **Giọng** | Cậu là người gây ra sự cố rồi tỏ ra vô tội, và trò của cậu nhắm vào người lớn quanh cậu. Lời Aurel 22/09 do note ghi lại, không đặt trong ngoặc nguyên văn, mượn từ [[emb-chot-bermuda-an-toi]] ⛔: arc sau Brat *không còn nặng tâm lý mà thiên về hoạt bát*; Tsuna *tự tin và gây rối*; mời Vindice ăn tối *sẽ khiến rất nhiều người đau tim*; nếu Musashi bực thì *mắt cún con*. **Đo [đề xuất]:** mỗi chương có ít nhất một việc Tsuna làm khiến ít nhất một người lớn có tên phản ứng trên trang |
| **Cậu tính mình thêm ở chỗ nào** | **[đề xuất]**, neo dòng 2 của Aurel. Ít nhất một lần trên trang cậu nhận một việc người khác làm cho cậu và **không** mở một việc để trả. Phép kiểm: từ cảnh ấy tới hết chương không có việc nào của cậu được lời kể hay chính cậu gọi là *trả*. Sổ còn đổi chiều: theo cùng đoạn 22/09, cậu nghĩ tới những người đã làm cậu lo, và *"đây là cái giá cậu tính cho việc đó"* *(chữ của note ghi lại lời Aurel)* |
| **Ai thấy** *(≥ 2 tên)* | cặp song sinh nhà Kamo, [[yasuyuki]] và [[noriyuki]] *([[emb-chot-cap-song-sinh]], `locked`)* · [[bermuda]] *(Aurel 22/09: có thể là người lớn đáng tin của Tsuna "khi và chỉ khi" không liên quan tới Kawahira; phụ thuộc [[q-bermuda-an-toi]])* |
| **Arc đóng ở đâu** | Ở lần nhận mà không trả, có người có tên nhìn thấy. Nén bằng **bảng kiểm**. Tin Cradle **không** phải chỗ đóng |
| **Số** *(SÀN)* | **8 sự kiện** → ~30.400 từ → **~3 chương** |

**Sự kiện ý chính.** Gần hết danh sách này treo vào ba câu hỏi của arc sau; hướng C chỉ xếp chỗ, không chọn hộ.

| # | Việc xảy ra | Nguồn · chỗ còn mở |
|---|---|---|
| 1 | Bermuda tới Namimori; Tsuna mời nhóm Vindice vào nhà ăn tối | lời Aurel 22/09, [[emb-chot-bermuda-an-toi]] ⛔ · [[q-bermuda-an-toi]] |
| 2 | Một người xin vào Sanctuary, và thị trấn xét đơn | [[khung-oc]]: danh sách Aurel liệt kê có *"Mafia nghỉ hưu muốn tới Namimori"* · [[q-child-nam-cong]] cổng 1 |
| 3 | Namimori chạm xã hội Flame Nhật ngoài thị trấn; cặp song sinh nhà Kamo lên trang | [[emb-chot-cap-song-sinh]] · [[q-child-nam-cong]] cổng 2 |
| 4 | Hai tượng cáo ở sessha được soi cạnh cặp song sinh | [[ke-cuop-co-dau]] · [[emb-duyet-khung-nam-arc]] §C |
| 5 | Đứa trẻ Saint-Exavier tới được Namimori | hook hook-dua-tre-saint-exavier · [[q-cam-khoan-vendicare]] |
| 6 | Tomoko dùng lại nghề cũ | drop-point mục 7 *("kỹ năng chưa được dùng lần nào sau đó")* · [[q-child-nam-cong]] cổng 3 |
| 7 | Tin Cradle tới Namimori | [[tuoi-va-moc]] *(Tsuna ~9–10)* · [[tuyen-xanxus]]. Ai mang tin, có ai chứng kiến: [[q-child-nam-cong]] cổng 4 |
| 8 | Lần nhận mà không trả *(bước của arc)* | **[đề xuất]**. Việc được nhận là gì, ai làm: trống, cần Aurel. Ứng viên có nguồn: [[kazuki]], xem mục 4 |

Thước giấy tờ: **1/8** *(sự kiện 7)*.

### 3.4 Biết từ chối

| Hàng | |
|---|---|
| **Tuổi** | ~10 → ~13 |
| **Tông** | *Everything Leaves a Trace* · *Again!?* · *"…Oops."* **[Aurel]**, mượn từ [[khung-nam-arc]] ⛔ dòng 116. Cùng ghi chú như 3.3 |
| **Giọng** | Cậu bị bắt quả tang, và câu đầu tiên của cậu là *"…Oops."*, không phải lời tự trách. Mỗi lần cậu nói *không* trên trang đi kèm một câu đùa hoặc một cú lảng. **Đo [đề xuất]:** không cảnh nào cậu chỉ im lặng nhận; mỗi chương có ít nhất một lần cậu bị phát hiện và đáp bằng đùa |
| **Cậu tính mình thêm ở chỗ nào** | **[đề xuất]**, neo dòng 3 của Aurel. Ít nhất một lần trên trang cậu nói *không* với một việc đòi cậu trả bằng chính mình, lý do nói ra là cậu, và một kế hoạch đang chạy bị bỏ hoặc hoãn vì thế. Neo thứ hai, [[truc-chinh]] **[diễn giải]**: *"cậu bỏ một kế hoạch giữa chừng vì có việc quan trọng hơn, và đó là chương đắt nhất truyện"*. Kế hoạch nào, việc nào: trống, cần Aurel |
| **Ai thấy** *(≥ 2 tên)* | [[musashi]] *([[nguoi-lon-co-trach-nhiem]] hệ quả 3, **[diễn giải]**: bà gọi tên mẫu hình ở arc cha mẹ về; chưa quyết, xem mục 6)* · Nana *(**[nguyên tác]**: trở về sau hơn một thập kỷ)* |
| **Arc đóng ở đâu** | Ở lần cậu nói *không*. Sự kiện *Nana và Iemitsu rời đi lần nữa* nằm **trong** arc. ⚠️ Cọ [[emb-chot-cau-hoi-mo]] mục 6, nơi Aurel chốt *"Xả của Arc 4: Nana và Iemitsu rời đi lần nữa"*: xem mục 6 |
| **Số** *(SÀN)* | **7 sự kiện** → ~26.600 từ → **~3 chương** |

**Sự kiện ý chính**

| # | Việc xảy ra | Nguồn · chỗ còn mở |
|---|---|---|
| 1 | Nana và Iemitsu trở về Namimori | **[nguyên tác]** P1 Ch3 |
| 2 | Tsunashige gặp Tsuna; cái biết sai của cậu em được củng cố | [[emb-chot-khung-arc]] mục 3 · [[emb-duyet-khung-nam-arc]] mục 5 và §5 |
| 3 | Iemitsu trả giá: một cảnh, ngắn | hook hook-iemitsu-tra-gia · forbid #3 |
| 4 | Musashi gọi tên mẫu hình | [[nguoi-lon-co-trach-nhiem]] hệ quả 3 **[diễn giải]**. Người và arc: chưa quyết |
| 5 | Tsuna nói *không*, và bỏ một kế hoạch *(bước của arc)* | **[đề xuất]** |
| 6 | Sự cố với nhóm nhà khoa học Vongola | [[hook-su-co-nha-khoa-hoc-vongola]]: **[Aurel]** 19/09 *"sau này mới vô tình bị phát hiện"*, ô arc để trống. Đặt ở arc này là **[đề xuất]**: đây là arc người của Vongola đặt chân tới Namimori |
| 7 | Nana và Iemitsu rời đi lần nữa | [[emb-chot-cau-hoi-mo]] mục 6 |

Nền, không tính là sự kiện: Xanxus nằm trong băng; Tsuna *đang đợi sơ hở, để không gây chú ý từ Timoteo và Vongola* *([[emb-chot-cau-hoi-mo]] mục 6)*. Thước giấy tờ: **0/7**. Iemitsu có mặt ở 3/7 sự kiện *(1, 3, 7)*: sát mép forbid #3.

### 3.5 Không tan

| Hàng | |
|---|---|
| **Tuổi** | ~13 → ~16 |
| **Tông** | *A New Future* · *We Need to Talk.* · *"Still worth it."* **[Aurel]**, mượn từ [[khung-nam-arc]] ⛔ dòng 132. Cùng ghi chú như 3.3 |
| **Giọng** | Cậu cãi ngang hàng với Xanxus và Kawahira, và trêu Kawahira trước. Neo **[nguyên tác]** P2 Ch2: *"Are you here to be my husband, Kawahira-san?"*. **Đo [đề xuất]:** trong mỗi cảnh có người chất vấn cậu, Tsuna có ít nhất một câu đáp là đùa hoặc cãi |
| **Cậu tính mình thêm ở chỗ nào** | **[đề xuất]**, neo dòng 4 của Aurel và quy tắc 10 cùng note: *"Một Sky khoẻ mạnh phải biết hoà hợp với người khác mà không xoá bỏ chính mình"*. Sau một bond mới hoặc một lời hứa mới, có ít nhất một điều cậu giữ lại và nói ra: một lần trên trang cậu không nhường người vừa hoà hợp với mình. [[tuyen-xanxus]] đặt sẵn lan can: hai người *neo nhau* thì được, *không sống nổi thiếu nhau* thì hỏng |
| **Ai thấy** *(≥ 2 tên)* | Kawahira *([[truc-chinh]] ưu tiên 6, **[Aurel]**: "Cách Kawahira phản ứng với sự tự do, và với Tsuna khi cậu trình bày mối liên kết với Tri-Ni-Sette")* · Xanxus *([[tuyen-xanxus]]: "một người ngang hàng")* |
| **Arc đóng ở đâu** | Ở điều cậu giữ lại. **Không** đóng ở bond: [[nguoi-lon-co-trach-nhiem]] hệ quả 1 **[diễn giải]**: arc kết bằng *"cậu có thêm một Element nên cậu ổn hơn"* là arc sai |
| **Số** *(SÀN)* | **8 sự kiện** → ~30.400 từ → **~3 chương** |

**Sự kiện ý chính**

| # | Việc xảy ra | Nguồn · chỗ còn mở |
|---|---|---|
| 1 | Tsuna đưa Xanxus ra khỏi băng; Xanxus tấn công; hai Bầu trời hoà hợp hai chiều | [[tuyen-xanxus]] · [[emb-chot-khung-arc]] mục 2. Kể bằng hai mép *(forbid #7)*. Cách vào: mở |
| 2 | Xanxus bí mật liên lạc Varia, rồi công khai trở về | [[tuyen-xanxus]] mục *Hậu quả chính trị*, **[Aurel]** |
| 3 | Fon thành Storm của Tsuna | [[emb-chot-khung-arc]] mục 2 |
| 4 | Tsuna trình bày liên kết với Tri-Ni-Sette; Arcobaleno được giải nguyền mà không biết ai giải | [[truc-chinh]] ưu tiên 6 · [[emb-chot-cau-hoi-mo]] mục 1 |
| 5 | Kawahira được tự do | [[truc-chinh]] ưu tiên 6 |
| 6 | Checkerface show | [[emb-duyet-khung-nam-arc]] mục 6 *(vật liệu của Aurel, Aurel giữ)* |
| 7 | Dấu ấn Kimiko trong cây được mở | [[hook-dau-an-kimiko-trong-cay]] · [[emb-chot-cau-hoi-mo]] mục 4 |
| 8 | Điều cậu giữ lại *(bước của arc)* | **[đề xuất]**. Điều ấy là gì: trống, cần Aurel |

Thước giấy tờ: **0/8**.

### 3.6 Tự giữ mình

| Hàng | |
|---|---|
| **Tuổi** | ~16 → 18. Đuôi cố định |
| **Tông** | *The Beginning of the End* · *He's Ours This Time.* · *"Everything is fine."* (It was not fine.) **[Aurel]**, mượn từ [[khung-nam-arc]] ⛔ dòng 150 |
| **Giọng** | Người đã dọn sẵn bàn cờ, và trò đùa về Reborn được trả ở cảnh cuối. Neo **[tác giả]**, reply 30/07/2024 *([[ao3-tra-loi-tac-gia]])*: *"Reborn brazenly looks Tsuna in the eye during their first meeting / Namimori: How dare-?!"*. **Đo [đề xuất]:** cảnh tới đền có ít nhất một câu đùa của Tsuna trước câu kết |
| **Cậu tính mình thêm ở chỗ nào** | **[đề xuất]**, neo dòng 5 của Aurel. Trong bàn cờ đón Vongola *("by the time the Vongola tried to get involved he would've successfully covered all his bases"*, **[nguyên tác]** P2 Ch1*)* có ít nhất một nước mà người được bảo vệ là chính cậu, do cậu đặt. Kèm sự kiện Aurel đã chốt ở [[emb-duyet-khung-nam-arc]] §A: Tsuna nhận mình là Sawada Tenmei, một sự kiện có khoảnh khắc quyết định trên trang |
| **Ai thấy** *(≥ 2 tên)* | Reborn và [[tsunashige]] nhìn **sai** *([[emb-chot-khung-arc]] mục 3: lệch ba chiều)*, nên không tính. Người thấy đúng: **trống, cần Aurel**. Ứng viên có nguồn: [[kyouya]] *(**[nguyên tác]** P2 Ch1: "Except for Kyoya.")* |
| **Arc đóng ở đâu** | *"Let the games begin."* Không vượt qua câu này |
| **Số** *(SÀN)* | **5 sự kiện** → ~19.000 từ → **~2 chương** |

**Sự kiện ý chính**

| # | Việc xảy ra | Nguồn · chỗ còn mở |
|---|---|---|
| 1 | Tsuna nhận mình là Sawada Tenmei | [[emb-duyet-khung-nam-arc]] §A |
| 2 | Tsunashige được chọn; Reborn nhận nhiệm vụ | hook hook-tsunashige-va-reborn. *Được chọn làm người thừa kế* là suy ra, nguyên tác chỉ nói *tutor* |
| 3 | Vongola tới gần mà không bắt được | [[fact-toan-canh-tuong-lai]] |
| 4 | Tsuna đặt một nước cờ cho chính mình *(bước của arc)* | **[đề xuất]** |
| 5 | Tsunashige và Reborn tới đền | **[nguyên tác]** P1 Ch3 |

Thước giấy tờ: sự kiện 2 và 3 là việc của phía Vongola, tới Namimori bằng tin: **2/5**.

### 3.7 Tổng lượng

Thước: [[rhythm]] mục 3 và [[emb-chot-cau-hoi-mo]] mục 8, ~3.800 từ mỗi sự kiện, ~9.500 từ mỗi chương. Mọi con số là **SÀN** *([[emb-chot-uoc-luong-tu-la-san]])*.

| Arc | Tuổi | Sự kiện | Từ | Chương |
|---|---|---|---|---|
| Brat | ~6–7 → ~8 | 11 | ~41.800 | ~4–5 |
| Thôi ghi nợ | ~8 → ~10 | 8 | ~30.400 | ~3 |
| Biết từ chối | ~10 → ~13 | 7 | ~26.600 | ~3 |
| Không tan | ~13 → ~16 | 8 | ~30.400 | ~3 |
| Tự giữ mình | ~16 → 18 | 5 | ~19.000 | ~2 |
| **Cộng** | | **39** | **~148.200** | **~15–16** |

Số arc bằng số bước. Nếu Aurel gộp hoặc bỏ một bước thì số arc đổi theo; hình dạng này không tự đứng ngoài thang.

## 4. Điểm danh

Mỗi ô: người ấy **đổi gì** hoặc **làm gì** trong arc, kèm nguồn. Ô không có chỗ dựa ghi **trống, cần Aurel**. Cột *Vai nền* ghi thứ có nguồn mà không gắn arc nào; hàng nào trống mọi cột arc thì lý do nằm ở cột này. Ở hướng C, mọi người trong bảng còn có một việc chung **[đề xuất]**: là ứng viên cho *người thấy bước* của arc.

### 4a. Người ở Namimori

| Ai | Vai nền có nguồn | Brat | Thôi ghi nợ | Biết từ chối | Không tan | Tự giữ mình |
|---|---|---|---|---|---|---|
| **[[musashi]]** | *"người bình thường nhất trong số những người biết đủ"* *([[nguoi-lon-co-trach-nhiem]] **[diễn giải]**)* · **[nguyên tác]** P2 Ch2: *"Once she was assured of Tsunayoshi's safety she will have to travel to Italy to hold dear Shige in her arms at last."* Chuyến ấy chưa xếp arc | một trong những người có mặt để đỡ: **[Aurel]** 19/09 *"Kiếp này cậu có bà ngoại, có Maro, có Indra, có thị trấn Namimori…"* *([[emb-chot-xuong-song-brat]])*. Thầy thuốc của nhà bà vào cuộc *([[emb-chot-thay-thuoc]])*. Việc cụ thể của bà: trống, cần Aurel | bị cháu gây rối và thua *mắt cún con* *(lời Aurel 22/09, [[emb-chot-bermuda-an-toi]] ⛔; phụ thuộc [[q-bermuda-an-toi]])* | con gái bà trở về **[nguyên tác]**; bà gọi tên mẫu hình *([[nguoi-lon-co-trach-nhiem]] hệ quả 3, **[diễn giải]**, chưa quyết)* | trống, cần Aurel | trống, cần Aurel |
| **[[maro]]** | **[tác giả]** End Notes P2 Ch2: *"She's always in the background taking care of Tsuna, who's now her grandbaby too!"* · giám sát toàn Namimori qua tấm màn *(P2 Ch2)* · drop-point: *"chưa có tuyến riêng"* | có mặt để đỡ *(cùng câu **[Aurel]** 19/09)*. Hai chỗ treo: Mist nào sửa ký ức cha mẹ Nagi, bà hay Musashi *([[emb-chot-cau-hoi-mo]] mục 5, còn mở)*; Hell Ring của bà cộng hưởng với nhẫn của Kawahira, nay là người trong nhà *(đã gặp chưa: nguồn không nói)*. Bà đổi gì: trống, cần Aurel | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **[[ayame]]** | phụ tá của Musashi; pha trà đúng khẩu vị từng người, chuẩn bị lễ phục, thắp đèn bằng Ketsueki *(P2 Ch2)* · *"chăm sóc hằng ngày, không nghi lễ"* *([[nguoi-lon-co-trach-nhiem]] **[diễn giải]**)*. **Lý do hàng trống:** nguyên tác chỉ cho bà việc nền, và mọi thứ nhánh từng thêm cho bà nằm trong tám chương đã lưu trữ | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **[[nagi]]** | học trò Musashi; tự nhận việc bảo vệ Tsuna và giấu kín *(P2 Ch2)* · biết chuyện cha mẹ từ đầu *([[emb-chot-cau-hoi-mo]] mục 5)* · có vào bộ Guardian hay không: note [[nagi]] ghi *cần Aurel quyết*; chạm forbid #4 | lên trang suốt arc với tư cách người cùng mái nhà; là nửa *Chrome* của tag. Cô bé đổi gì: trống, cần Aurel | *bắt đầu bày trò đùa nhỏ* với Tsuna; *hai đôi mắt cún con* *(lời Aurel 22/09, [[emb-chot-bermuda-an-toi]] ⛔)* | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **[[kazuki]]** | người làm vườn, Chiyu; *"when he saw Tsuna out there in the rain he almost had a heart attack"* **[tác giả]** End Notes P2 Ch2 | trống, cần Aurel | ứng viên có nguồn cho người làm việc mà cậu nhận không trả: [[nguoi-lon-co-trach-nhiem]] **[diễn giải]**: cậu chỉ học được rằng được chăm sóc không phải món nợ từ người *"chăm sóc cậu mà không cần gì từ cậu… Người làm vườn thì không."* Việc cụ thể: trống, cần Aurel | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **[[indra]]** | Guardian Cổng Đông, vai chưa được thử *(drop-point)* · secret [[indra-co-dong-mau-hibari]], chưa xếp arc | nợ Tsuna một cuộc courting theo lễ và quà: **[nguyên tác]** P2 Ch1 *"You'll court me properly like an Element should have" / "Of course."*. Người nhà bà canh sát thủ *(sự kiện 1)*. Fon vào qua bà *(sự kiện 9; [[emb-chot-nguyen-to-di-san]]: Aurel gọi việc bà lôi Fon vào là hạt giống)* | nhà Hibari đang lùng châu Âu *(hook hook-dua-tre-saint-exavier)* | trống, cần Aurel | Fon thành Storm; đường nối là dòng Wu của bà *([[tuyen-xanxus]])*. Bà đổi gì: trống | trống, cần Aurel |
| **[[kyouya]]** | mỗi arc ít nhất một cảnh *([[emb-chot-khung-arc]]: Aurel chốt hướng khung gồm cả lối Kyouya lớn lên có cảnh của [[character-arcs]])* · hơn Tsuna 2 tuổi *([[tuoi-va-moc]], 20/09; bảng tuổi cùng note tự lệch)* | courting hoàn tất, bond; biết cái mốc đã mất *(sự kiện 4, 5)*; kế hoạch đổi tuyến tuần tra lập ở P2 Ch2, chưa thực hiện *(hook kyouya-loai-chu-chot)* | một cảnh; nội dung: trống, cần Aurel | một cảnh; nội dung: trống, cần Aurel | một cảnh; nội dung: trống, cần Aurel | người duy nhất Tsuna giữ lại từ kiếp trước *(**[nguyên tác]** P2 Ch1)*; ứng viên người thấy bước. Nội dung: trống, cần Aurel |
| **[[tomoko]]** | cư dân đã thề; kỹ năng chưa dùng lần nào từ khi đổi phe *(drop-point)* | đường vào Shouichi đi qua bà *(note [[tomoko]], [[shouichi]])*. Bà đổi gì: trống, cần Aurel | dùng lại nghề cũ *(sự kiện 6; chờ [[q-child-nam-cong]] cổng 3)* | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **[[shouichi]]** | đứa trẻ cùng tuổi đầu tiên *([[khung-oc]]; [[emb-duyet-khung-nam-arc]] mục 2)* | thành bạn của Tsuna *(sự kiện 3)*; Tsuna nhớ cậu từ kiếp trước *([[emb-chot-shouichi-kiep-truoc]] mục 1)* | còn là bạn: [[emb-duyet-khung-nam-arc]] mục 2 ghi quan hệ chạy *Brat → Child*. Việc cụ thể: trống, cần Aurel | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **Kawahira** | Guardian bên trái, *chưa cảnh nào cho thấy ông nói ra*; đang đợi đuôi thứ chín *(drop-point)* | thầy của Mukuro *(sự kiện 7)*; mập mờ về ống tre *([[emb-chot-cau-hoi-mo]] mục 2)*; lá thư gửi Bermuda do ai cầm bút: nguyên tác không nói *(hook hook-bermuda-to-mo)* | vắng mặt tối Bermuda tới, đi cùng Mukuro *(lời Aurel 22/09)*. Lan can của hook hook-bermuda-to-mo: Bermuda không được biết ông ở Namimori | trống, cần Aurel | được tự do, và phản ứng *(sự kiện 5)*; Checkerface show *(sự kiện 6)*. Cách đọc của Aurel trong note kawahira: việc đầu tiên ông làm với tự do là *"lựa chọn ích kỷ"* | trống, cần Aurel |
| **[[mukuro]]** | *"as Mukuro as possible"* **[nguyên tác]** P2 Ch1; không lắp tiểu sử canon, không mặc định thành Mist của Tsuna *(note [[mukuro]]; forbid #4)* | gặp Tsuna lần đầu trên trang *(sự kiện 7)*. Chờ [[q-tsuna-tranh-mukuro]] | vắng mặt cùng Kawahira *(lời Aurel 22/09)* | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **[[genichi]]** | thầy thuốc riêng nhà Sawada từ trước khi Musashi hôn mê; không biết chuyện Lửa *([[emb-chot-thay-thuoc]], khoá tới hết Brat)* | vào cuộc vì các cơn trôi dạt đã dứt *([[emb-sua-con-troi-dat]])*; người lớn bình thường thấy bước của arc. Ông có ký giấy ở sự kiện 6 không: trống, cần dàn ý Brat | trống, cần Aurel *(sau Brat ông có được biết chuyện Lửa không: chưa ai quyết)* | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **mẹ Takeshi** *([[sachiko]])* | tên giữ *([[emb-chot-me-takeshi]] mục 2)*; không biết Lửa | còn sống khi sát thủ tới *(sự kiện 1)*. Bà hay người khác quyết trên trang: [[q-me-takeshi-ai-quyet]]. *"Yamamoto-san tiệm Takesushi"* là ai: note [[sachiko]] và [[tsuyoshi]] gán khác nhau, chưa ai phân xử | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |
| **con cáo** *([[natsu]])* | **[Aurel]** 19/09, [[emb-chot-tsuna-va-natsu-kham-pha-lai]]: *"Cả Tsuna và Natsu đều đang trong quá trình khám phá lại bản thân, chỉ thế mà thôi. Nhưng trong hành trình này họ có nhau và hiểu nhau theo cách mà không gì có thể."* Hệ quả 4 của cùng note: việc khám phá lại là quá trình, không giải quyết xong trong Brat. Tên: [[q-ten-con-cao]] | lên trang; Tsuna nhận ra nghĩa thứ hai của món quà *(sự kiện 2)* | có mặt; hai tượng cáo ở sessha *(không phải con cáo)* được soi cạnh cặp song sinh *(sự kiện 4)*. Con cáo đổi gì: trống, cần Aurel | trống, cần Aurel | trống, cần Aurel | trống, cần Aurel |

### 4b. Sáu nhóm vai có tag Part 2

Mức có mặt ở Brat là **[đề xuất]** của hướng C. [[emb-chot-tag-theo-arc]] mục *Ranh giới* để ngỏ cả thời điểm lẫn mức.

| Nhóm | Brat: mức, và mục nào của thang cần nó | Thôi ghi nợ | Biết từ chối | Không tan | Tự giữ mình |
|---|---|---|---|---|---|
| **Xanxus** | **lên trang**, một lần chạm trước Cradle; ông thấy một Cloud *(sự kiện 10)*. Thang cần: mục 3. Hoà hợp **không** xảy ra ở đây | Cradle nổ ở Ý khi Tsuna ~9–10; tin tới Namimori *([[tuoi-va-moc]])* | nằm trong băng; Tsuna đợi sơ hở *([[emb-chot-cau-hoi-mo]] mục 6)* | ra khỏi băng, hoà hợp hai chiều, trở về Varia *([[tuyen-xanxus]])* | trống, cần Aurel |
| **Fon** | **một cảnh**, tới qua nhà Hibari *(sự kiện 9)*. Thang cần: **không mục nào**; đây là sự kiện của động cơ, và là chỗ mỏng nhất của Brat ở hướng này | trống, cần Aurel | trống, cần Aurel | thành Storm chính *([[emb-chot-khung-arc]] mục 2)*; được giải nguyền | trống, cần Aurel |
| **Arcobaleno** | **không có sự kiện riêng**. Nhóm có mặt qua người: Fon *(sự kiện 9)*, và Mammon nếu Varia vào *(sự kiện 10)*. Bermuda là Arcobaleno cũ theo canon tra ở hook hook-bermuda-to-mo | phép so các lần chuyển đổi Arcobaleno, như suy tính của Bermuda *(lời Aurel 22/09)* | trống, cần Aurel | được giải nguyền mà không biết ai giải *([[emb-chot-cau-hoi-mo]] mục 1)*. Tsuna không nhận Pacifier: lời hứa của Kimiko chặn *([[fact-kimiko-arcobaleno]])* | Reborn tới, đã hết nguyền |
| **Reborn** | **không lên trang, không gặp**. Trò đùa chạy gắn vào thang *(mục 2 của note này)*; thêm một dòng biên niên nếu Aurel chọn *nghe tên* | chỉ trong trò đùa | chỉ trong trò đùa | được giải nguyền; vai Sun được gieo, bond nằm sau vạch kết *([[emb-chot-cau-hoi-mo]] mục 1)* | tới đền cùng Tsunashige; nhìn thẳng vào mắt cậu **[tác giả]**. Note reborn ghi Aurel chốt ông tới để làm ba việc |
| **Vindice / Bermuda** | **thư hai chiều**, không lên trang *(sự kiện 8)*. Thang cần: không mục nào. Mức này bằng mức decision tự nêu làm ví dụ: *"một lá thư (Bermuda ở P2 Ch1)"* | tới Namimori, ăn tối *(sự kiện 1; chờ [[q-bermuda-an-toi]], [[q-cam-khoan-vendicare]])* | trống, cần Aurel | cách phá băng có thể đi qua ông *([[tuyen-xanxus]], cách vào thứ hai: mở)*; việc giải nguyền chạm thẳng Vindice *(hook hook-bermuda-to-mo)* | trống, cần Aurel |
| **Mukuro và Chrome** | **lên trang**: Nagi suốt arc, Mukuro một sự kiện *(sự kiện 7)*. Thang cần: mục 1. Xem hai hàng [[nagi]] và [[mukuro]] ở 4a | xem 4a | xem 4a | xem 4a | xem 4a |

### 4c. Đếm

14 người × 5 arc = **70 ô** ở bảng 4a, xếp ba loại *(executed: đếm tay từng ô)*:

| Loại ô | Brat | Thôi ghi nợ | Biết từ chối | Không tan | Tự giữ mình | Cộng |
|---|---|---|---|---|---|---|
| có một việc cụ thể, có nguồn | 8 | 6 | 1 | 1 | 0 | **16** |
| có chỗ dựa, việc cụ thể còn trống | 4 | 4 | 1 | 2 | 1 | **12** |
| trống hoàn toàn, cần Aurel | 2 | 4 | 12 | 11 | 13 | **42** |

Sáu ô *có việc* của arc Thôi ghi nợ đều tựa vào lời Aurel 22/09 hoặc vào một câu hỏi đang mở. Ayame trống cả năm arc; Maro, Gen'ichi và mẹ Takeshi mỗi người chỉ có ô Brat. Hướng C không lấp được chỗ ấy: nó chỉ cho họ một chỗ đứng *(người thấy bước)*, còn họ làm gì vẫn là việc của Aurel.

## 5. Hook

18 hook sống *(executed: đọc `status` trong frontmatter của 22 note ở `hooks/`; bốn note `superseded` bị bỏ)*.

| Hook | Brat | Các arc sau | Ghi chú |
|---|---|---|---|
| ong-tre | **tiêu** *(sự kiện 2)* | | |
| [[nguoi-ban-cu]] | **tiêu** *(sự kiện 2)* | | cách gọi tên chờ [[q-ten-con-cao]] |
| hook-me-takeshi-va-sat-thu | **tiêu** *(sự kiện 1)* | | |
| kyouya-loai-chu-chot | **tiêu** phần bond và phần cái mốc *(sự kiện 4, 5)* | hai hook con còn lại *(false carnivores; cái gì đã lọt qua cậu)*: để yên | |
| [[hook-ba-cua-con-lai]] | gieo tiếp | gieo tiếp tới Không tan *(Fon)* | *mỗi cửa một Guardian* là chỗ nguyên tác chưa nói; dùng thì khai là mở rộng của nhánh |
| hook-bermuda-to-mo | gieo tiếp *(sự kiện 8)* | Thôi ghi nợ: **tiêu** phần gặp mặt. *Thứ Tsuna có sẵn cho ông*: trống, cần Aurel | |
| [[hook-nha-tu-dac-biet]] | để yên | Thôi ghi nợ: gieo tiếp *(Bermuda và Kawahira không được chạm nhau)*. Không tan: **tiêu** **[đề xuất]** | |
| hook-dua-tre-saint-exavier | để yên *(chạy nền)* | Thôi ghi nợ: **tiêu** *(sự kiện 5)* | |
| [[ke-cuop-co-dau]] | để yên | Thôi ghi nợ: **tiêu** *(sự kiện 4)* | [[emb-duyet-khung-nam-arc]] §C |
| hook-iemitsu-tra-gia | để yên, hoặc gieo nếu cái vấp dính tới vị trí của Iemitsu *([[q-dac-vu-vongola]])* | Biết từ chối: **tiêu**, một cảnh | |
| [[hook-su-co-nha-khoa-hoc-vongola]] | để yên *(note ghi rõ không thuộc Brat)* | Biết từ chối: **tiêu** **[đề xuất]** | arc là việc Aurel xếp |
| [[hook-dau-an-kimiko-trong-cay]] | để yên | Không tan: **tiêu** | |
| [[kimiko-thay-truoc-tuong-lai]] | để yên | Không tan: **tiêu** | |
| [[hook-sukunabikona]] | để yên | Không tan: gieo. **Không tiêu trong nhánh** | [[emb-chot-cau-hoi-mo]] mục 1 |
| hook-tsunashige-va-reborn | gieo *(trò đùa Reborn)* | Biết từ chối: gieo tiếp *(Tsunashige gặp Tsuna)*. Tự giữ mình: **tiêu** ở cảnh kết | |
| [[nana-iemitsu-cuoi-nhau]] | để yên | để yên | đã trả ở nguyên tác, `partially_paid` |
| bond-bam-vao-cay | chờ Aurel: giữ hay `superseded` | | sinh từ cảnh đã lưu trữ. Nếu giữ: gieo ở sự kiện 4 |
| so-cua-thay-thuoc | chờ Aurel: giữ hay `superseded` | | sinh từ cảnh đã lưu trữ. Nếu giữ: gieo ở Brat |

Brat tiêu **4**, gieo tiếp **3**. Không hook nào bị tiêu ở arc mà hợp đồng nhánh cấm chạm. Không hai arc nào hứa cùng một lần trả.

## 6. Decision bị buộc

Hướng C **không** trả lời câu nào dưới đây. Mỗi dòng ghi hướng này **cần** phương án nào thì đứng được, và khi Aurel chọn khác thì hướng này mất gì.

### 6a. Mười một câu `unresolved`

| Câu | Hướng C cần phương án | Nếu Aurel chọn khác |
|---|---|---|
| [[q-brat-dai-bao-nhieu]] | *đóng ở xương sống*, độ dài trôi theo. Đây là điều kiện để hướng C tồn tại | *đóng theo tuổi* hay *đóng ở mốc âm tính năm bảy* thì Brat trở lại chia theo tuổi, và hướng C chỉ còn là hàng đo gắn vào hướng A hoặc B |
| [[q-dac-vu-vongola]] | có **một cái vấp thật** ở mục 4, với người đỡ có tên. Hướng C **không phụ thuộc** cái vấp là đặc vụ Vongola hay việc khác. Hướng C đề nghị một tiêu chí: cái vấp đi ra từ chỗ cậu quên tính mình, để mục 4 và trò đùa của nguyên tác là một | không có cái vấp thì Brat không có chỗ đóng |
| [[q-brat-xanxus-vao-the-nao]] | *chạm trước Cradle, hoà hợp vẫn sau*, mức chạm là **một lần gặp trên trang** trong lúc cậu trốn nhà | *Cradle lùi về Brat*: phá bước của arc Không tan. *Chỉ hồi tưởng*: hướng C sống được, nhưng mục 3 cần một việc bốc đồng khác |
| [[q-brat-reborn-toi-dau]] | *chỉ hồi tưởng* hoặc *nghe tên, không gặp*: hướng C **không phụ thuộc** chọn cái nào trong hai | *gặp thật, sớm*: không dùng được, phạm `preserve` |
| [[q-tsuna-tranh-mukuro]] | *quyết Mukuro ở đâu trước khi dàn ý*: ở hướng này là lên trang trong Brat | *cố ý tránh*: sự kiện 7 mất, tag Mukuro lùi về mức được nhắc |
| [[q-me-takeshi-ai-quyet]] | **không phụ thuộc** ai quyết trên trang. Chỉ cần sự kiện xảy ra mà Tsuna không kiểm lại | |
| [[q-shouichi-loi-moi]] | một việc Tsuna làm trong quan hệ này là ý muốn của chính cậu *(mục 2)*. Ý *Tsuna bỏ hậu tố trước* của Aurel khớp sẵn. Hồi tưởng có lên trang hay không: **không phụ thuộc** | |
| [[q-ten-con-cao]] | **không phụ thuộc**. Chỉ chặn chương con cáo được gọi tên | |
| [[q-bermuda-an-toi]] | *tới ăn tối*: bữa tối là nơi sổ nợ đổi chiều theo lời Aurel 22/09 | *không gặp mặt*: arc Thôi ghi nợ mất sự kiện mang giọng của nó, và bước cần chỗ khác để hiện |
| [[q-cam-khoan-vendicare]] | **không phụ thuộc**. Một cờ: chốt cũ nạp sẵn hình *biết Cradle mà ngồi yên*, thứ hướng C không dùng làm chỗ đóng | |
| [[q-child-nam-cong]] | cổng 1 đến 4 quyết danh sách sự kiện của arc Thôi ghi nợ; cổng 5 *(số chương)* hướng C đề xuất sàn ~3. **Không chặn Brat** | |

### 6b. Hai dòng của aurel-main đang chờ Aurel đặt chữ

[[emb-chot-goc-khung-moi]] mục 2 ghi hai dòng này *"chạm hợp đồng nhánh, chưa sửa — chờ Aurel đặt chữ"*. Hướng C không sửa chúng. Hướng C **cần** chúng được đọc thế này:

| Dòng | Đang ghi | Hướng C cần được đọc là | Hướng C không cần |
|---|---|---|---|
| `preserve`, **Luận đề** | *"Bản chất của Bầu trời là bao dung, nhưng Tsuna lại không thể bao dung chính mình."* · *"không được cải tiến"* | **điểm xuất phát** của một hành trình, đúng như câu đầy đủ của Aurel ở [[gia-thuyet-aurel]]: *"…và cuối cùng học cách yêu chính mình"*. Cái không được cải tiến là luận đề, không phải tình trạng của cậu | cậu *xong* ở năm 18. Arc cuối chỉ có **một** nước cờ cho chính cậu |
| `forbid` **#2b** | *"Đặt Tsuna vào danh sách người được cứu"* · *"Cậu không nằm trong 568 kế hoạch của chính mình — và đó là toàn bộ arc"* | **không ai khác** đặt cậu vào danh sách được cứu; người làm ở cả năm bước là cậu | cậu có tên **trong danh sách 568**. Không phép đo nào của năm bước đòi một dòng trong danh sách ấy, nên câu *cuối cùng cậu có nằm trong đó không* hướng C để nguyên cho Aurel |

Nếu Aurel đọc Luận đề là **trạng thái suốt mười một năm**, hướng C mất ba bước sau và không đứng được như một cách chia arc.

### 6c. Việc chưa quyết mà hướng này đẻ ra

Lượt này chỉ được tạo một file, nên chưa mở note `question` nào. Xếp theo thứ chúng chặn.

| # | Việc | `needed_before` đề xuất |
|---|---|---|
| 1 | Hai dòng ở 6b | duyệt khung này |
| 2 | Năm dòng *Đích đến* có được dùng làm năm bước không, và thứ tự Aurel viết có phải thứ tự arc không | duyệt khung này |
| 3 | Bốn tên Child · School · Teen · Young Adult: giữ làm tên arc dù ranh giới không còn theo tuổi, hay đổi | duyệt khung này |
| 4 | Năm dòng Tông viết cho arc chia theo tuổi: mượn một đối một như mục 3 có lệch không | duyệt khung này |
| 5 | Fon vào Brat thế nào, mức nào | khung riêng arc Brat |
| 6 | Giấy âm tính năm bảy: ai ký, và ông Sugita có dính không khi ông không được biết chuyện Lửa | khung riêng arc Brat |
| 7 | Cậu có rời Namimori ở sự kiện 10 không, tới đâu; tuổi Xanxus ở mốc ấy *(bảng tuổi tuyến Varia của [[tuoi-va-moc]] đã ⛔)* | khung riêng arc Brat |
| 8 | Nghi lễ bond của Kyouya là nước cờ nào *(forbid #9)* | khung riêng arc Brat |
| 9 | bond-bam-vao-cay · so-cua-thay-thuoc · skull · [[chiyo]]: giữ hay `superseded` | khung riêng arc Brat |
| 10 | Ba ô trống của `secrets/_MOC`, cộng ai trong nhà biết gì về [[tsuna-tai-sinh]] | thẻ cảnh đầu tiên có POV Musashi, Maro, Ayame, Kazuki hoặc Nagi |
| 11 | Người thấy bước của từng arc *(hai tên)*, và việc được nhận ở arc Thôi ghi nợ | khung riêng từng arc |
| 12 | Tin Cradle rơi vào arc Thôi ghi nợ hay đầu arc Biết từ chối | dàn ý arc Thôi ghi nợ |
| 13 | [[emb-chot-cau-hoi-mo]] mục 6, *"Xả của Arc 4: Nana và Iemitsu rời đi lần nữa"*: là việc xảy ra trong arc *(hướng C giữ)*, hay là chỗ arc đóng | dàn ý arc Biết từ chối |
| 14 | Ai gọi tên mẫu hình, ở arc nào; điều kiện `reveal_planned` của secret [[567-ke-hoach]] cho cảnh ấy | dàn ý arc Biết từ chối |
| 15 | Điều kiện *"ai trả giá cảm xúc"* cho cảnh Tsunashige *([[emb-duyet-khung-nam-arc]] §5)*: chữ *trả giá* có cần đặt lại không, khi Aurel đã dặn đừng viết thành *"bi kịch · cái giá"* | dàn ý arc Biết từ chối |
| 16 | [[hook-su-co-nha-khoa-hoc-vongola]] thuộc arc nào | dàn ý arc Biết từ chối |
| 17 | Luật *một Sky làm Element cho Sky khác*; cách phá băng; chênh tuổi Kyouya +2 | dàn ý arc Không tan |
| 18 | Chuyến sang Ý của Musashi: có xảy ra không, arc nào | dàn ý arc đầu tiên bà vắng nhà |

## 7. Tác động lên timeline

**Không mốc nào bị dời về tuổi.** Cái hướng C dời là **vai** của mốc trong arc, và **nhãn arc** gắn trên mốc.

| Mốc | [[tuoi-va-moc]] · master đang ghi | Ở hướng C |
|---|---|---|
| Vạch xuất phát, cuối P2 Ch1 | Tsuna ~6–7 | không đổi |
| **Âm tính Flame năm bảy** | master, bảng *Tương lai đã được kể trước*: *"cậu giả tỉnh bình thường và âm tính Flame"*, kèm cờ *"khó khớp với việc cậu đã ra khỏi ẩn cư lúc ~5 — nguồn tự lệch"*. [[fact-toan-canh-tuong-lai]] giải bằng hai tầng *(trên giấy tờ · trong Namimori)*; lời giải ấy là của note, không phải câu chữ tác giả | **tuổi không đổi** *(bảy)*. **Vai đổi:** từ chỗ đóng Brat *(khung 17/09)* thành một sự kiện giữa arc. Hướng C dùng cách đọc hai tầng, và **không** dùng mệnh đề *"cái vỏ về sau tự chặn chính mình"* của cùng note: [[khung-soat-hieu-luc]] đã chỉ ra đó là lời bình của AI, còn câu của nguồn là *"futile… just wing it"* |
| *Sky của Namimori* · *just wing it* | master ghi một dòng không tuổi | **thêm, không dời:** vào đoạn biên niên đóng Brat |
| Sinh nhật Tsuna | [[tuoi-va-moc]] mục 4, **[Aurel]** 09/09: *"7 tuổi lúc nào thì phải xem phát triển nội dung chứ không quyết định trước"* | khớp. Ranh giới arc ở hướng này vốn không rơi vào sinh nhật nào |
| **Cradle** | Tsuna ~9–10, nhãn *"Arc 3"* | tuổi không đổi. Không còn là chỗ đóng arc; rơi vào cuối arc Thôi ghi nợ hoặc đầu arc Biết từ chối *(việc 12 ở 6c)*. Nhãn *"Arc 3"* phải đổi theo tên arc mới |
| Cha mẹ về | *"more than a decade later"* | Tsuna từ ~10 trở lên, trong arc Biết từ chối |
| Phá băng | Tsuna 13–15, nhãn *"Arc 5"* | tuổi không đổi; trong arc Không tan. Nhãn phải đổi |
| Reborn và Tsunashige tới | Tsuna 18, Tsunashige 14 | không đổi |
| **Tuổi nhân vật** | Tsunashige kém 4 · Kyouya +2 *(bảng tuổi còn ghi "~18–19" lúc Tsuna 18, mục 4 còn ghi "Kyouya cùng tuổi": note tự lệch)* · Nagi nhỏ hơn vài tuổi | không khoảng cách nào đổi. Brat chạy tới ~8 thì cuối arc Kyouya ~10, Tsunashige ~4 |
| Xanxus ở Brat | mục *Tuyến Varia* của [[tuoi-va-moc]] đã ⛔ | nếu sự kiện 10 đứng thì tuổi Xanxus ở mốc ấy phải tính lại: trống, cần Aurel |
| Hẹn giờ nhà Yamamoto | [[tuoi-va-moc]]: nếu kiếp trước bà mất lúc Takeshi 5–6 tuổi *(vật liệu của Aurel)* thì hẹn giờ *"đang chạy ngay bây giờ"* | sự kiện 1 của Brat phải rơi sớm trong arc |

Mọi dòng nhánh đã gạch trong master không được dùng. Hướng C chưa ghi dòng nào vào master: khung là `planned`, không phải `occurred`.

## 8. Soát

### 8a. `preserve` của aurel-main

| Mục | | Ở đâu |
|---|---|---|
| Luận đề | **cọ** | mục 6b. Chờ Aurel đặt chữ |
| Đích đến năm 18 | đạt | mục 2. Reborn không gặp Tsuna trước cảnh cuối |
| Lời tiên tri là Vongola Decimo | đạt | không arc nào chạm; không có tuyến trả giá tiên tri |
| Hai dòng Sawada và luật đặt tên | đạt | khung không đặt tên OC mới |
| Hệ danh xưng Flame | đạt | sự kiện *nhận mình là Sawada Tenmei* dùng một danh hiệu đã có trong nguyên tác, không thêm tầng danh xưng |
| Lõi trong cây sakaki | đạt | khung không giải lõi; secret [[loi-o-cay-sakaki]] |
| Hai lời hứa của Kimiko | đạt | arc Không tan không cho Tsuna nhận Pacifier |
| Namimori là Sanctuary | đạt | arc Thôi ghi nợ dùng chính cơ chế ấy *(đơn xin vào)* |
| Indra là Guardian đầu tiên | đạt | ⚠️ báo lại, không xử: [[khung-soat-tong-ket]] ghi chỗ lệch giữa dòng này và câu *"He already had a guardian for his left"* của P2 Ch1 |

### 8b. `forbid` của aurel-main

| # | | Ở đâu |
|---|---|---|
| 1 · thành Decimo | đạt | |
| 2 · viết Tsuna như người tốt bụng | **cọ nhẹ** | năm bước không được thành *cậu nhận ra mình tốt*. Lý do cậu nói ra vẫn là chiến lược hoặc sinh tồn *(tropes mục 5.1)*. Chỗ **[Aurel]** 19/09 đặt *hiền lành, lương thiện* làm nét gốc so với forbid này đã được [[khung-soat-giong]] nêu là việc Aurel quyết |
| 2b · danh sách người được cứu | **cọ** | mục 6b |
| 3 · Iemitsu có arc | đạt, sát mép | arc Biết từ chối: ông có mặt ở 3/7 sự kiện, một cảnh trả giá, không POV |
| 4 · chọn lại bộ Guardian canon | đạt | Nagi và Mukuro lên trang mà không thành Guardian trong khung; ô Nagi mang cờ. Fon làm Storm theo chốt 17/09 |
| 5 · Kawahira theo canon KHR | đạt | arc Không tan dùng cách đọc của Aurel và của tác giả |
| 6 · em dash | không áp cho note kế hoạch | note này không dùng, trừ trong câu trích nguyên văn |
| 7 · dựng cảnh một thay đổi dài, hoặc bên trong một hành động lớn | **cọ ở ba chỗ** | (i) cả hướng chia theo một thay đổi dài: giữ được nhờ luật *mỗi bước một cảnh quyết định* ở 3.1, và mất ngay nếu dàn ý dựng cảnh cho phần "dần dần". (ii) trận phá băng và hoà hợp giữa trận: kể bằng hai mép. (iii) thước 25/09 *sự kiện tới bằng giấy tờ*: 2/11 · 1/8 · 0/7 · 0/8 · 2/5 |
| 8 · phong ấn như bảo vệ vụng về | đạt | |
| 9 · nghi lễ chỉ để trang trí | **cọ** | nghi lễ bond của Kyouya ở Brat chưa có nước cờ *(việc 8 ở 6c)* |

### 8c. Bảng vị trí trope *(tropes mục 2, 3, 5)*

| Hướng C | Trope |
|---|---|
| **Chơi thẳng** | BAMF bằng cơ chế của tác giả *(giỏi vì đã sống trọn một đời; hài ở độ lệch với thân xác)* · Sky attraction hai chiều · courting trước bond *(Kyouya; Indra còn nợ courting)* · Namimori là nơi trú, đẩy thành luật *(đơn xin vào Sanctuary)* |
| **Bẻ, theo đúng chỗ tác giả đã bẻ** | fix-it sửa người mà không giữ họ *(mục 3.1: Mukuro, Nagi, mẹ Takeshi được cứu, không ai thành Guardian)* · Guardian không phải bộ canon *(Indra, Kawahira, Fon)* · phản diện không được đất diễn *(mục 3.5: Iemitsu một cảnh)* · nghi lễ là nước cờ *(mục 3.6)* |
| **Tránh** | chơi thẳng *cướp cô dâu* *(mục 5.6)*: hai tượng cáo ở arc Thôi ghi nợ chỉ là song chiếu · chơi thẳng *Sky Arcobaleno* *(mục 5.6)*: arc Không tan không cho Tsuna nhận Pacifier |

**Cờ, theo yêu cầu của skill** *(beat chơi lại một trope đánh dấu tránh, hoặc trope tác giả từ chối)*:

1. **Fix-it cho tất cả trừ người đang sửa.** [[gia-thuyet-aurel]]: *"fix-it cho tất cả mọi người trừ chính người đang sửa"*. Cả hướng C là một lần đảo dần chỗ *trừ* ấy. Aurel đã chọn hướng này ở [[emb-chot-goc-khung-moi]] mục 2; cờ vẫn phải ghi, vì nó chạm thẳng cú bẻ 3.1.
2. **Sự kiện 3 và 7 của Brat đứng sát cú bẻ 3.1** *(cứu rồi không giữ)*: Shouichi thành bạn, Mukuro lên trang. Cả hai có tag của tác giả, và không ai thành Guardian; nhưng nếu dàn ý kéo họ lại gần quá thì chơi ngược cú bẻ.
3. **Phong ấn** là chủ đề tác giả đã đóng *(tag `Flame Sealing` rơi ở Part 2)*. [[hook-su-co-nha-khoa-hoc-vongola]] mở lại hệ quả của phong ấn kiếp trước ở arc Biết từ chối. Đó là ý của Aurel 19/09, nên chỉ ghi cờ.
4. **Bà đỡ đầu nở quá khung**: ô Musashi gọi tên mẫu hình có thể biến bà thành người giải thích nhân vật chính, thứ nguyên tác chưa làm lần nào *([[truc-chinh]] **[diễn giải]**: người khác nói hộ, hoặc không ai nói)*.
5. Báo lại, không xử: tropes mục 5.5 liệt kê bốn quan hệ phải trả lời tag; [[emb-chot-tag-theo-arc]] ghi sáu dòng.

### 8d. [[bon-lan-can]]

| Lằn can | | |
|---|---|---|
| 1 · không phi logic | đạt ở tầng khung | chỗ phải dựng luật trước khi viết: luật Sky làm Element cho Sky khác *(arc Không tan)* |
| 2 · không vô lí | **chỗ yếu** | vì sao cậu bước đúng bước ấy ở đúng arc ấy phải đến từ sự kiện của arc. Ở Brat có sẵn *(bốn mục của Aurel)*; ở ba arc giữa còn trống |
| 3 · không vô nghĩa | đạt | mỗi sự kiện mang mục của thang, hoặc được khai là sự kiện của động cơ |
| 4 · không gây khó chịu | **rủi ro chính của hướng** | (i) *đáng thương thay vì đáng nhận ra*: một cái thang tính mình dễ đọc thành truyện chữa lành. Chốt chặn là hàng Giọng và luật *bước không phải một lần vỡ oà*. (ii) *người đọc thấy mình bị thao túng*: năm arc cùng đóng bằng một kiểu khoảnh khắc thì người đọc đoán được từ arc thứ hai. (iii) *cả thị trấn tôn thờ tới mức nhạt*: khung này chưa có người nào không thích Tsuna *([[khung-oc]] luật 3)*; trống, cần Aurel. (iv) phép thử 3 *(có chương nào buồn cười không)*: hàng Giọng của từng arc trả lời ở tầng khung; ở tầng chương là việc của dàn ý |

### 8e. Secret

Chỉ ghi tên note. Nội dung không chép vào đây.

| Secret | Ở hướng C |
|---|---|
| [[tsuna-tai-sinh]] | không lộ cho ai ngoài vòng đang biết, suốt cả hướng. Ô *Musashi biết tới đâu* còn trống |
| [[loi-o-cay-sakaki]] | không lộ suốt cả hướng |
| tsuna-am-tinh-tren-giay | Brat chạm *(sự kiện 6)*; không lộ ra ngoài Namimori suốt cả hướng |
| [[567-ke-hoach]] | arc Biết từ chối chạm *(sự kiện 4)*: cần Aurel đặt điều kiện trước khi có cảnh ấy |
| [[indra-co-dong-mau-hibari]] | không lộ suốt cả hướng, cho tới khi Aurel xếp nó vào một arc |
| [[bigger-carnivore]] | Brat chạm *(sự kiện 5)*: thẻ cảnh phải ghi ai biết gì |
| [[nana-giau-viec-tsuna-tinh]] | arc Biết từ chối chạm *(sự kiện 1, 2)*; không lộ cho Iemitsu suốt cả hướng |
| chi-chu-nhan-thay-cao | áp cho mọi cảnh có con cáo, từ sự kiện 2 của Brat |

Mọi dàn ý chương dựng từ khung này phải tự khai `forbidden_secrets`; bảng trên không thay được việc ấy.

## 9. Được và mất, so với hướng A và hướng B

Hướng A và B chỉ được biết qua một dòng mô tả của người giao việc; phần so dưới đây dựa trên dòng ấy.

**Được**

1. **Trả lời thẳng chốt 2 của [[emb-chot-goc-khung-moi]].** Mỗi arc có một hàng *cậu tính mình thêm ở chỗ nào* đo được, và chỗ đóng arc là việc cậu làm. Không arc nào đóng bằng một lần cậu thua hay mất, nên lời chê *thiên buồn* bị chặn ở tầng kết cấu, không chỉ ở tầng giọng.
2. **Xương sống dùng chữ của Aurel.** Năm bước là năm dòng *Đích đến* của Aurel; bước đầu là thang bốn mục của Aurel. Chữ của AI nằm ở phép đo và ở việc xếp chỗ.
3. **Ranh giới arc khớp một lời Aurel đã nói:** *"7 tuổi lúc nào thì phải xem phát triển nội dung chứ không quyết định trước"*.
4. **Sáu nhóm vai ở Brat có lý do cho mức của mình.** Hai nhóm lên trang vì thang cần sự kiện ở đó *(Mukuro và Chrome cho mục 1, Xanxus cho mục 3)*; Brat 11 sự kiện, là arc lớn nhất mà không phải chứa sáu tuyến đầy đủ như hướng A.
5. **Mẫu hình có sẵn giọng của tác giả** *("Once again he had failed to factor in his status")*, nên thứ dễ viết thành buồn nhất của truyện có một cách viết buồn cười ngay từ khung.
6. **Người Namimori có một việc trong xương sống** *(người thấy bước)*, thay vì chỉ có mặt trong bảng điểm danh.

**Mất, và chỗ yếu**

1. **Chỗ yếu nhất: đây là một cái thang tiến bộ.** [[truc-chinh]] cấm thiết kế arc theo kiểu *"arc này gạch được bao nhiêu tên"*, vì khi ấy cấu trúc cổ vũ đúng cái nhân vật cần thoát ra. Một cái thang *tính mình* có thể là cùng lỗi ấy đổi dấu: truyện đo Tsuna bằng tiến độ. Nó cũng kéo ống kính vào trong, trong khi [[character-arcs]] đo được rằng tác giả cho Tsuna đổi **vị thế**, không đổi con người, và để thay đổi lớn nằm ngoài trang. Luật *người thấy bước* và *một cảnh quyết định* chỉ giảm được rủi ro này, không xoá được.
2. **Sau Brat, hình dạng gần trùng năm arc theo tuổi.** Các mốc ngoài bị ghim bằng tuổi, nên khoảng tuổi của bốn arc sau gần như lặp lại khung cũ. Thứ thật sự khác là chỗ đóng và hàng đo. Nếu Aurel muốn một hình dạng khác hẳn, hướng này không cho.
3. **Ba bước giữa có sự kiện đỡ yếu.** Arc Thôi ghi nợ gần như toàn sự kiện đang chờ câu hỏi; việc được nhận, kế hoạch bị bỏ, điều giữ lại đều trống.
4. **Phụ thuộc hai dòng hợp đồng chưa đặt chữ.** Một cách đọc của Aurel ở 6b là đủ làm hướng này mất ba arc.
5. **Fon và Vindice ở Brat mỏng hơn hướng A.** Fon là một cảnh không gắn mục nào của thang; Vindice là thư. Tag quan hệ `&` được trả ở mức thấp nhất còn chấp nhận được. So với hướng B thì Brat nặng hơn: hai nhóm lên trang thật, một nhóm có một cảnh.
6. **Điểm danh vẫn trống hoàn toàn 42/70 ô, và 12 ô nữa chưa có việc cụ thể.** Hướng C cho Ayame, Kazuki, Maro một chỗ đứng, không cho họ một việc. Lời chê *thường quên nhân vật* chưa được trả ở tầng khung; nó cần thêm phép kiểm ở từng dàn ý chương mà [[khung-soat-diem-danh]] đã đề xuất.
7. **Năm dòng Tông được mượn lệch chỗ.** Aurel viết chúng cho arc chia theo tuổi; hướng C gắn chúng vào bước ở cùng vị trí thứ tự.
8. **Brat có thể không đóng được.** Arc đóng ở mục 4. Nếu cái vấp không đủ rõ, hoặc Aurel không muốn một cái vấp nặng, arc lớn nhất của khung không có chỗ dừng.

## Cổng, và chỗ lệch khỏi skill

| | |
|---|---|
| Pre-flight | `plan_gate.py --project EMB` → exit 0 |
| Nạp ngữ cảnh | `context_resolver.py --root . --project EMB --role planner --branch aurel-main` → exit 1 *(cảnh báo số note)* |
| Verify gate | `vault_doctor.py --include-fiction --zone 05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life --json` → **exit 1**: 300 note, 0 lỗi, 27 cảnh báo, không cảnh báo nào thuộc note này *(executed sau khi ghi file)* |
| Kiểm link | 81 tên wikilink trong note, 80 khớp đúng một file *(executed)*; tên còn lại là `aurel-main` trong frontmatter, xem Lệch 3 |
| Lệch 1 | skill đòi mỗi việc chưa quyết thành một note `question` có `needed_before`. Lượt này chỉ được tạo một file; 18 việc ở 6c chưa có note |
| Lệch 2 | skill đòi dừng ở câu hỏi ❌ của arc đang dựng. Note này là một trong ba hướng để chọn, chưa phải khung được chọn, nên ghi phương án cần thay vì dừng. Không arc nào ở đây có beat chương |
| Lệch 3 | frontmatter do người giao việc đặt có link tới `aurel-main`, tên note trùng ở năm project. Giữ nguyên như được giao |
| Chưa làm | chưa qua `plan-reviewer`. Độ dài note: khoảng 11.800 từ theo cách tách khoảng trắng, gồm cả bảng và câu trích *(executed)* |
