---
id: arc.EMB.khung-moi-huong-a
type: arc
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: proposed
aliases: ["khung moi huong A", "Brat arc lon sau nhom vai len trang"]
related: ["[[emb-chot-dung-lai-khung]]", "[[emb-chot-goc-khung-moi]]", "[[emb-chot-tag-theo-arc]]", "[[khung-soat-tong-ket]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main|aurel-main]]", "[[truc-chinh]]"]
source:
  type: inference
  ref: "plan-continuation 01/10/2026, dung lai khung, worker 1/3 (huong A). De xuat, chua duyet."
authority: ai
confidence: 0.6
always_load: false
load_for: [planner]
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [arc, proposal]
last_updated: 2026-10-01
---

# Khung mới, hướng A: Brat là arc lớn, sáu nhóm vai lên trang thật trong Brat

> **Đề xuất, chưa duyệt.** Một trong ba hướng dựng lại khung theo [[emb-chot-dung-lai-khung]]; hai hướng kia do hai worker khác dựng. Tầng khung: không có beat chương, không có thẻ cảnh. Không dòng nào ở đây là chốt. Chỗ nào viết "phương án" hoặc "hướng A cần" thì việc quyết là của Aurel. Note này không sửa note nào khác và không trả lời hộ câu hỏi `unresolved` nào.

## 0. Nhãn, cổng, cách làm

**Bốn loại chữ, ghi nhãn ở từng dòng:**

| Nhãn | Nghĩa |
|---|---|
| **[nguồn]** | nguyên tác hoặc lời tác giả gốc, kèm câu trích và chương |
| **[Aurel]** | lời Aurel, kèm tên note chứa nó |
| **[diễn giải]** | chữ của AI nằm trong một note `authority: user`; không phải lời Aurel |
| **[đề xuất]** | của mình ở lượt này |

Nhãn bằng chứng: *executed* = mình chạy lệnh; *inspected* = mình đọc file và trích; *suy ra* = kết luận của mình. Câu trích nguyên tác giữ chính tả của tác giả (*Kyoya*); phần mình viết dùng Kyouya, Shouichi theo [[emb-chot-chinh-ta-ten]]. Trong file này chữ A chỉ có một nghĩa: tên hướng. Sự kiện đánh số theo arc (Brat 1, Child 1). Việc chưa quyết đánh số thường (việc 1, việc 2).

**Cổng và ngữ cảnh** (executed, 02/10/2026, chạy từ gốc worktree):

| Lệnh | Kết quả |
|---|---|
| `python 01_Origine/04_Tools/VaultTool/plan_gate.py --project EMB` | **exit 0**; bảy dòng OK; danh sách phải đọc đã đọc đủ |
| `python 01_Origine/04_Tools/VaultTool/context_resolver.py --root . --project EMB --role planner --branch aurel-main` | **exit 1**; 7 luật, 202 note truyện, 0 note bị cấm; cảnh báo duy nhất: nạp quá 12 note cho một tác vụ |
| `python 01_Origine/04_Tools/VaultTool/vault_doctor.py --include-fiction --zone 05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life --json` | DOCTOR_RESULT_PLACEHOLDER |

**Mốc state:** cuối [[p2-ch1]], theo [[emb-lam-lai-lan-ba]]. Bỏ qua mọi mục đã gạch, mọi note `superseded` hoặc `archived`, và không mở snapshots lưu trữ. [[khung-nam-arc]] không được dùng làm khung; mình chỉ mượn năm dòng Tông, ghi chỗ mượn ở từng arc.

**Đọc nguồn:** hai file trong `personal-bulk:fiction-sources/EMB/raw/original-fic/` được tách thẻ rồi tìm chữ (executed); mọi câu trích nguyên tác dưới đây mình đã tìm thấy lại trong bản tách ấy, trừ chỗ ghi "chưa kiểm". Lời tác giả ngoài thân truyện lấy ở `personal-bulk:fiction-sources/EMB/raw/ao3/AO3-author-replies.md`.

**Bốn thứ thấy khi đọc nguồn, chưa note nào ghi** (inspected):

1. Khối tag của Part 2: **Xanxus và Fon có trong `Relationships`, vắng khỏi `Characters`**. Reborn, Rokudou Mukuro, Chrome Dokuro, Irie Shouichi, Arcobaleno, Vindice thì có ở cả hai. [[ao3-tags]] chỉ chép bảng quan hệ. Chi tiết này cọ thẳng vào hướng A, xem mục 9.
2. P2 Ch1, ngay tại điểm dừng, tác giả viết cho Tsuna một câu về việc sắp làm: *"Sure he would have to take some preemptive measures that would take him way too close to the mafia for comfort but hey, nothing ventured, nothing gained."* Và: *"As a sanctuary Sky he was expected to take a full set of guardians and even more Elements"*. Hai câu này là nền nguồn của hướng A.
3. P2 Ch1: *"Far away in Japan, a small town in the Mie Prefecture saw a sudden influx of traumatised Italian children. Nobody batted an eye and they were quickly folded into the community with the outside world none the wiser."* Nguồn không gọi tên thị trấn ấy. Đọc nó là chính Namimori là *suy ra* của mình; nó liên quan tới việc Mukuro ở đâu.
4. Bảng Brat Arc của `Timeline/master` ghi Tsunashige ra đời lúc Tsuna *"~2–3 tuổi (suy luận)"*; [[tuoi-va-moc]] mục 1 ghi kém bốn tuổi. Báo, không sửa.

## 1. Hướng này kể truyện gì

Hướng A đọc [[emb-chot-tag-theo-arc]] theo nghĩa mạnh nhất: trong arc Brat, mỗi nhóm trong sáu nhóm vai có tag phải có ít nhất một cảnh ở thì hiện tại mà người của nhóm ấy có thoại hoặc hành động, không chỉ một lá thư hay một hồi tưởng. Truyện nó kể là: một thị trấn vừa có lại Sky bỗng thành một địa chỉ, khách lần lượt tìm tới, và một đứa trẻ bảy tám tuổi mang đầu óc ông già là người mở cửa cho từng lượt rồi tuyên bố *"This is under control."* Brat chạy từ vạch xuất phát tới năm Tsuna chín tuổi, 13 sự kiện, là arc lớn nhất; bốn arc sau ngắn hơn, mỗi arc lấy một quan hệ Brat đã đặt lên trang rồi đưa nó tới khoảnh khắc quyết định (Cradle, cha mẹ trở về, phá băng và Tri-Ni-Sette, hai vị khách ở đền). Khác hướng B ở chỗ sáu nhóm vai không chạm nhẹ rồi để dành: người đọc thấy mặt họ ngay trong Brat, nên các việc lớn về sau rơi xuống những quan hệ đã có cảnh, không rơi xuống những cái tên. Khác hướng C ở chỗ arc vẫn chia theo tuổi và giữ năm tên arc của Aurel; mẫu hình "lỏng dần" là một hàng đo trong từng arc, không phải trục chia arc. Đổi lại, Brat dễ thành một cuộc diễu hành khách, các lần "lên trang lần đầu" bị tiêu sớm, và riêng Reborn chỉ lên trang được ở ngoài Namimori, không gặp Tsuna.

## 2. Hai đầu cố định, và cách tới đích mà không phạm `preserve`

**Đầu.** Cuối [[p2-ch1]]: Estraneo đã bị xoá, Indra vừa tuyên thệ, Tsuna khoảng sáu bảy tuổi ([[emb-chot-sau-p2-ch2]], [[emb-lam-lai-lan-ba]] mục *Mốc state*).

**Đích.** [nguồn] P1 Ch3, ba câu cuối: *"When Sawada Tsunayoshi turned 18, two visitors would arrive at the shrine."* / *"Sawada Tsunashige and his tutor, the hitman Reborn."* / *"Let the games begin."* Không vượt qua câu này.

**Bắt buộc ở giữa.** [nguồn] P1 Ch3: *"Sawada Nana would leave Namimori with her husband, and it would be more than a decade later when they would return."* Hai việc còn lại là *suy ra* ghi trong [[fact-toan-canh-tuong-lai]]: Tsunashige lớn lên trong lãnh thổ Vongola; Vongola không bắt được Tsuna suốt quãng ấy.

### Vì sao sáu nhóm vai vào Brat mà Vongola vẫn không bắt được Tsuna

[đề xuất] Hướng A dựa vào ba thứ đã có, không thêm luật:

1. **Nguồn đã báo trước rằng người ngoài sẽ tìm tới.** [nguồn] P1 Ch3: *"By then, the Sky flame dome would've become infamous among those who wanted to vanish, the information carefully disseminated by the Hibari, and Namimori would have become a very different town from the waning sanctuary of his first life. Tsuna would find himself unceremoniously titled as the Sky of Namimori, realize pretending to be flame negative was futile, and would proceed to just wing it."*
2. **Hợp đồng Sanctuary là cái giữ khách trong khuôn.** [nguồn] reply tác giả 14/08/2024, chép ở [[fact-sanctuary]] (mình chưa mở lại reply ấy ở lượt này): người ngoài vào Sanctuary phải theo luật của Sanctuary; không ai được can thiệp vào nội bộ; động vào thì Vindice tới.
3. **Mỗi nhóm khách rời Brat với một mảnh biết lệch, không nhóm nào cầm đủ.** Bảng dưới là [đề xuất], cột cuối là thứ phải giữ; nội dung từng mảnh là việc 5 ở mục 6.

| Nhóm | Lên trang ở Brat bằng gì | Rời Brat biết gì (phương án) | Phải giữ |
|---|---|---|---|
| Xanxus và Varia | gặp mặt, đối chất, đánh nhau, giảng hoà | *một Cloud*. [Aurel] [[emb-chot-tuyen-varia]]: *"có lẽ Xanxus đang cố tán tỉnh một đám mây?"* | không biết đó là Sky |
| Arcobaleno | Mammon trong Varia; Fon là khách | Mammon nhận ra *điều kì lạ* ([Aurel], cùng note); nhận ra cái gì: chưa quyết | không ai trong nhóm biết lời hứa Tri-Ni-Sette |
| Fon | khách của nhà Hibari | trống, cần Aurel | không chọn làm Storm trong Brat |
| Reborn | một cảnh của riêng ông, ngoài Namimori | một cái tên, hoặc phiên bản của Iemitsu | không gặp, không thấy mặt, không biết là Sky |
| Vindice, Bermuda | tới Namimori, bữa tối | nhiều nhất trong sáu nhóm: ông đã đọc lá thư về quyền trả đũa của một Sky | không biết Kawahira ở Namimori |
| Mukuro và Chrome | Mukuro gặp Tsuna; Mukuro gặp Nagi | ở trong vòng; biết tới đâu: câu hỏi mở của note [[mukuro]] | gặp không có nghĩa là thành Guardian |

Chỗ hai lời phải được đặt cạnh nhau: nguồn nói Tsuna *bị gọi là Sky của Namimori*; note `reborn` ghi lại lời Aurel rằng việc Tsuna là Sky của Namimori là bí mật của Namimori, người ngoài sẽ không biết. Hướng A đọc: người ngoài biết *Namimori có một Sky*, không biết *Sky ấy là ai*. Đây là *suy ra* của mình, cần Aurel xác nhận (việc 5).

### Reborn: tag của Brat, đích của năm 18

Ràng buộc đang sống:

- `preserve` *Đích đến* của hợp đồng nhánh `aurel-main`, và câu nguồn ở trên.
- [Aurel 17/09] [[emb-chot-khung-arc]] mục 3, bảng lệch ba chiều: Reborn *"chưa từng gặp cậu"*.
- [diễn giải] [[emb-chot-cau-hoi-mo]] mục 1, phần hệ quả: trong nhánh chỉ được gieo, và cảnh cuối là lần đầu gặp.
- [[q-brat-reborn-toi-dau]] đang mở, ba mức: chỉ hồi tưởng · nghe tên mà không gặp · gặp thật và sớm. Note ấy ghi mức thứ ba phạm `preserve`.

**Hướng A xử thế nào, như một PHƯƠNG ÁN.** "Lên trang thật" được định nghĩa hẹp cho riêng Reborn: ông có một cảnh của mình trong Brat, có thoại hoặc hành động, đặt ngoài Namimori. Ông không đặt chân vào Namimori, không ở cùng một nơi với Tsuna, không thấy mặt cậu, và rời cảnh mà không biết đứa trẻ ấy là Sky. Mức này nằm giữa "nghe tên" và "gặp thật": giữ nguyên vế *không tới, không gặp* của lời Aurel 19/09 ([[emb-chot-tuyen-varia]], nay là vật liệu chứ không còn là chốt), thêm một cảnh có mặt ông.

Tác giả đã dùng đúng thủ pháp này một lần. [nguồn] P2 Ch1: *"Even farther away, Bermuda von Veckenschtein, Warden of Vendicare, read through a letter explaining a Sky's right to exercise retaliation and retribution regardless of declared neutrality"*. Một người ở xa, lên trang một nhịp, phản ứng với Tsuna mà không gặp cậu.

Hai chỗ đặt cảnh, chưa chọn:

| | Cảnh ở đâu | Ông mang đi cái gì | Cọ |
|---|---|---|---|
| Cùng tuyến Varia | ở Ý, sau khi Varia về; người đối diện là một Arcobaleno đã thấy đứa trẻ (Mammon hoặc Fon) | một cái tên nơi chốn, hoặc một chi tiết không khớp. [Aurel 19/09]: *"Cuộc điều tra của Varia chính là cái làm tên ấy lan"* (chép theo [[emb-chot-tuyen-varia]]) | phụ thuộc trọn vào [[q-brat-xanxus-vao-the-nao]] |
| Phía nhà ở Ý | cạnh Tsunashige còn nhỏ; neo [nguồn] P2 Ch1: *"whenever Vongola Nono visited and talked to her second son"* (câu ấy không có Reborn) | phiên bản của Iemitsu về đứa con cả, khớp [Aurel 17/09] [[emb-chot-khung-arc]] mục 3 | sát mép `forbid` #3 nếu Iemitsu có thoại; đưa Tsunashige lên trang sớm hơn mọi kế hoạch cũ |

Chỗ yếu, nói thẳng: trong sáu nhóm, đây là chỗ "nghĩa mạnh nhất" bị bẻ. Reborn lên trang, nhưng **quan hệ** `Reborn & Sawada Tsunayoshi` thì không: hai đầu của nó không chạm nhau. Phía Tsuna, quan hệ ấy chỉ sống bằng trò đùa chạy dài, ví dụ [nguồn] P2 Ch2: *"(Tsuna was so thankful that Reborn wasn't here.)"* Nếu Aurel đọc "lên trang thật" là "gặp Tsuna" thì hướng A chỉ làm được năm trên sáu nhóm, vì gặp sớm thì phạm `preserve`.

## 3. Từng arc

Luật dùng chung cho cả năm bảng:

- **Tông** là lời Aurel, mượn từ hàng Tông của [[khung-nam-arc]] (note ấy đã `superseded`); lượt duyệt ghi ở [[emb-duyet-khung-nam-arc]] mục 3; phép mượn theo [[emb-chot-dung-lai-khung]].
- **Giọng** là [đề xuất], phát triển từ [[khung-soat-giong]] mục 3; Aurel chưa nhận hàng này. Hệ quả 1 của [[emb-chot-tsuna-va-natsu-kham-pha-lai]] áp cho mọi arc: cậu vụng trong đời thường, và điều đó không dùng để gây cười thương hại.
- **Cậu tính mình thêm ở chỗ nào** thay cho hai hàng *Xả* và *Bóng Decimo* của khung cũ, theo [[emb-chot-goc-khung-moi]] mục 2. Nó cũng là câu trả lời cho câu kiểm số 4 của hợp đồng nhánh (*arc này đưa cậu ra khỏi cái bóng Decimo được bao xa*). Ở mọi arc: không ai cứu cậu; người khác chỉ có mặt để đỡ ([Aurel 19/09], [[emb-chot-xuong-song-brat]]).
- **Ai nhìn Tsuna khác đi** theo luật Aurel duyệt 17/09 ([[emb-duyet-khung-nam-arc]] §1): mỗi arc nêu đích danh ít nhất hai người.
- **Số** theo [[rhythm]] mục 3 và [[emb-chot-cau-hoi-mo]] mục 8: khoảng 3.800 từ mỗi sự kiện, chương khoảng 9.500 từ. Mọi con số là **sàn** ([[emb-chot-uoc-luong-tu-la-san]]).
- Bốn arc sau Brat cố ý mỏng: hợp đồng nhánh chỉ cho dựng chi tiết một arc tại một thời điểm.

| Arc | Tuổi Tsuna | Sự kiện | Từ (sàn) | Chương (sàn) |
|---|---|---|---|---|
| Brat | ~6–7 → 9 | 13 | ~49.400 | 5 đến 6 |
| Child | 9 → 10 | 5 | ~19.000 | 2 |
| School | 10 → 12 | 6 | ~22.800 | 2 đến 3 |
| Teen | 13 → 15 | 8 | ~30.400 | 3 đến 4 |
| Young Adult | 16 → 18 | 5 | ~19.000 | 2 |
| **Cộng** | | **37** | **~140.600** | **~15** (14 đến 17) |

Brat giữ 13 trên 37 sự kiện. Con số 8 của Teen và 5 của Young Adult trùng khung cũ vì cùng tựa trên một bộ vật liệu của Aurel; mình đếm lại từ danh sách sự kiện dưới đây, không chép con số.

### Brat · ~6–7 → 9

| Hàng | |
|---|---|
| **Tuổi** | [đề xuất] ~6–7 → 9. Ranh giới là khoảng, không phải sinh nhật: [Aurel 09/09] [[tuoi-va-moc]] mục 4: *"7 tuổi lúc nào thì phải xem phát triển nội dung chứ không quyết định trước"*. |
| **Tông** | [Aurel] *This Wasn't Supposed to Happen* · *I Have a Headache.* · *"This is under control."* |
| **Giọng** | [đề xuất] Tsuna là người **mở cửa**: mỗi lượt khách bắt đầu bằng một việc cậu tự làm (mời, triệu, bày, trốn đi) mà không ai yêu cầu, rồi cậu tuyên bố mọi thứ ổn. Cậu trêu khách mạnh hơn mình như người ngang hàng; neo [nguồn] P2 Ch2: *"Are you here to be my husband, Kawahira-san?", he asked impishly.* Cậu tự giễu thân bảy tuổi và bộ lễ phục; neo [nguồn] P2 Ch1: *"Hiogi? Uchiwa? Sensu? Who knows? Certainly not Tsuna."* Người đau đầu là người lớn có tên, trên trang. **Đo:** (1) 6 trên 6 nhóm khách có ít nhất một việc do Tsuna khởi xướng; (2) mỗi cảnh POV Tsuna trích được nguyên văn một câu đùa và một việc cậu khởi xướng (mốc nguyên tác 8 trên 8 cảnh, số của [[khung-soat-giong]] mục 5, inspected); (3) mỗi chương có ít nhất một người lớn có tên phản ứng với trò của cậu. Không viết cậu cho ngầu trước khách (bảng *Cấm* của [[truc-chinh]]). |
| **Cậu tính mình thêm ở chỗ nào** | Thang là [Aurel 19/09], [[emb-chot-xuong-song-brat]]: *"học cách tin tưởng, học cách tự tin, học cách bốc đồng và tin tưởng sẽ có người đỡ lấy mình khi vấp ngã"*. Cách đo là [đề xuất]. **Tin tưởng:** một việc thật cậu giao rồi không tự đi kiểm. Mốc ở vạch xuất phát, [nguồn] P2 Ch1: *"From his last secret trip down to Namimori proper, Takeshi's mom was still alive"*: lúc ấy cậu vẫn lén xuống kiểm. Đo: ít nhất 1 việc giao, 0 lần kiểm lén, hiện trên trang. **Tự tin:** một ý muốn của chính cậu, không phải nước cờ. Mốc, [nguồn] P2 Ch1: cậu tới Indra để *"ask you for a favour"* cho một kế hoạch; thứ duy nhất cậu đòi cho mình là *"the limited edition Choco parfait from Dulce Encanto"*. Đo: ít nhất 1 lần cậu nhờ hoặc đòi một việc mà người hưởng là cậu, không gắn kế hoạch nào. **Bốc đồng:** [Aurel 19/09], chép theo [[emb-chot-tuyen-varia]]: trốn nhà đi chơi, *"cậu ấy biết sẽ khiến mọi người lo lắng nhưng cậu không lo họ sẽ buồn và bỏ đi. Được yêu thương thì không sợ hãi mà."* Đo: ít nhất 1 việc chưa tính, có người lo trên trang. **Có người đỡ:** sự kiện Brat 13. |
| **Ai nhìn Tsuna khác đi** | Shouichi · Gen'ichi · Mukuro · Fon · Xanxus · Mammon · Bermuda · Reborn (qua một cái tên). Tám tên; luật đòi hai. |

**Sự kiện ý chính.** Thứ tự trong lượt hai là [đề xuất], vì [[emb-chot-tag-theo-arc]] để ngỏ sớm muộn. Lý do xếp là nhân quả đã có: vụ Estraneo đã xảy ra, Varia tới vì nó, cái tên lan tới Reborn từ cuộc điều tra ấy; Bermuda đã tò mò từ P2 Ch1; Fon đi qua Indra, người vừa tuyên thệ.

*Lượt một, trong nhà và trong thị trấn (Tsuna ~6–7 → 7):*

| # | Việc xảy ra | Chỗ dựa |
|---|---|---|
| Brat 1 | Con cáo lên trang lần đầu; hai câu cuối nguyên tác được trả; Tsuna nhận ra nghĩa thứ hai của chữ *problem*. | [nguồn] P2 Ch2: *"This should help with your problem."* · *"Two days later, Sawada Tsunayoshi was reunited with an old friend."* · chốt 17/09 ở [[emb-chot-cau-hoi-mo]] mục 2: phải có một cảnh Tsuna nhận ra nghĩa thứ hai; đặt cảnh ấy ở Brat là [đề xuất]. Tên con cáo: chờ [[q-ten-con-cao]]. |
| Brat 2 | Shouichi rủ, Tsuna nhận lời; hai đứa thành bạn. | [nguồn] tag `Irie Shouichi & Sawada Tsunayoshi` · [Aurel 17/09] [[emb-chot-shouichi-kiep-truoc]] mục 1 (phần còn giữ). Cảnh: chờ [[q-shouichi-loi-moi]]. |
| Brat 3 | Gen'ichi, thầy thuốc nhà Sawada không biết chuyện Lửa, được gọi tới xem một đứa trẻ có triệu chứng đã tự dứt. | [Aurel 17/09] [[emb-chot-thay-thuoc]] · [Aurel] [[khung-oc]]: *"mình không nghĩ Musashi sẽ bỏ mặc các floating episodes của Tsuna"* · [[emb-sua-con-troi-dat]]. |
| Brat 4 | Đám sát thủ từng giết mẹ Takeshi ở kiếp trước tới; người nhà Hibari đang canh ra tay; hẹn giờ được gỡ. | [nguồn] P2 Ch1: *"Takeshi's mom was still alive, and he had asked some of the Hibari to be on the lookout for the assassins that had murdered her last time around."* Ai quyết trên trang: chờ [[q-me-takeshi-ai-quyet]]. Chỗ đo mục *Tin tưởng*. |
| Brat 5 | Kyouya hoàn tất courting; bond thành, có nghi lễ. | [nguồn] P2 Ch1: *"Plus Kyoya had been courting him for the past year and as Indra-san said, it really wasn't in his hands anymore."* · [diễn giải] [[truc-chinh]]: mỗi bond mới viết như một sự kiện lớn. Nghi lễ ấy là nước cờ nào (`forbid` #9): trống, cần Aurel. |
| Brat 6 | Mốc năm bảy: trên giấy tờ cậu *tỉnh lại bình thường, âm tính Flame*; cùng quãng ấy người ngoài bắt đầu tìm tới vì vòm Sky; cậu bị gọi là Sky của Namimori, thôi diễn, và ứng biến. | [nguồn] P1 Ch3, câu trích ở mục 2. Bản lề của arc: nó mở cửa cho lượt hai. Cách đọc "trên giấy tờ" là [diễn giải] của [[fact-toan-canh-tuong-lai]]; nguồn tự lệch ở mốc này, xem mục 7. |

*Lượt hai, khách tới (Tsuna 7 → 9):*

| # | Việc xảy ra | Chỗ dựa |
|---|---|---|
| Brat 7 | Mukuro lên trang: Tsuna gặp cậu ta lần đầu; hai Mist, Nagi và Mukuro, gặp nhau. | [nguồn] P2 Ch1: *"Mukuro was also safe and as Mukuro as possible, practically devouring Kawahira's lessons."* Ở đâu: nguồn không cho; chờ [[q-tsuna-tranh-mukuro]]. |
| Brat 8 | Fon tới Namimori với tư cách khách của nhà Hibari. | [nguồn] ghi chú tác giả cuối P1 Ch3: *"Raised alongside Fon before marrying Hibari Keita and coming to Japan."* · P2 Ch2: *"So Indra-san was spared, but Fon wasn't"*. Lý do ông tới: trống, cần Aurel. |
| Brat 9 | Varia tới vì vụ Estraneo; Mammon nhận ra điều lạ; đối chất. | [Aurel 19/09] [[emb-chot-tuyen-varia]] (vật liệu, không còn là chốt): Vongola nghe đồn, giao đội ám sát điều tra *"và tất nhiên xử lí nếu có dấu hiệu nguy hại cho Vongola"*; Tsuna vô tình đã là người cung cấp thông tin từ trước và giấu việc mình tham gia; Mammon nhận ra điều kì lạ. |
| Brat 10 | Xanxus và *một Cloud*: đánh nhau, giảng hoà; chưa hoà hợp. | [Aurel 19/09] cùng note: đối chất, đánh nhau, giảng hoà; hoà hợp hai chiều để sau Cradle ([[tuyen-xanxus]]). Trận đánh kể bằng hai mép (`forbid` #7). Gặp ở đâu: việc 4. |
| Brat 11 | Reborn lên trang ở ngoài Namimori: một cái tên, hoặc một phiên bản lệch về đứa trẻ, tới tai ông. Không gặp. | Phương án ở mục 2. |
| Brat 12 | Bermuda tới Namimori; Tsuna mời nhóm Vindice vào nhà ăn tối. | [Aurel 22/09] [[emb-chot-bermuda-an-toi]] (vật liệu): Bermuda tới Namimori, Tsuna mời nhóm Vindice vào nhà ăn tối, việc ấy sẽ khiến rất nhiều người đau tim; Kawahira và Mukuro vắng mặt tối đó · [nguồn] P2 Ch1: *"the leader Vindice felt something rise up in his cold, undead heart. Curiosity."* · [nguồn] reply tác giả 03/12/2024: *"he has something in store for Bermuda just like he had for Kawahira."* |
| Brat 13 | Cái vấp: một việc cậu làm chưa tính trật thật; có người đỡ; cậu không sợ họ bỏ đi. | [Aurel 19/09] mục 4 của thang. Cái vấp là gì: chờ [[q-dac-vu-vongola]]. |

*Có chỗ, không tính vào sàn:* một Arcobaleno xin vào Sanctuary. Note `skull` (còn `draft`) ghi [Aurel 26/09]: người xin vào Sanctuary là Skull, Carcassa đòi người; Aurel đặt việc ấy ở chương đầu arc Child của bản đã lưu trữ. Hướng A có chỗ cho nó trong lượt hai nếu Aurel muốn; mình không tự dời.

| Hàng | |
|---|---|
| **Arc đóng ở đâu** | [đề xuất, phụ thuộc [[q-brat-dai-bao-nhieu]]] Ở Brat 13, rồi một đoạn biên niên hoặc bảng kiểm nén quãng còn lại tới năm chín tuổi và ghi từng nhóm khách ra về mang theo gì ([[rhythm]] mục 3: 2 trên 2 arc nguyên tác đóng bằng công cụ nén). Arc không đóng bằng việc cậu mất một thứ, và "tag đã trả xong" không phải điều kiện đóng. |
| **Số** | 13 sự kiện · ~49.400 từ · 5 đến 6 chương. **Sàn.** |

### Child · 9 → 10

| Hàng | |
|---|---|
| **Tuổi** | [đề xuất] 9 → 10. Một năm, mở bằng Cradle. |
| **Tông** | [Aurel] *Things Are Escalating* · *Constant Panic.* · *"Mostly under control."* |
| **Giọng** | [đề xuất] Tsuna là người gây ra sự cố của chương rồi tỏ ra vô tội; trò của cậu nhắm vào người lớn quanh cậu, không nhắm vào chính cậu. Neo: [[q-bermuda-an-toi]] ghi lại lời Aurel 22/09 rằng giọng arc Child hoạt bát, Tsuna tự tin và gây rối. **Đo:** mỗi chương ít nhất 1 việc Tsuna làm khiến ít nhất 1 người lớn có tên phản ứng trên trang; mỗi cảnh POV Tsuna trích được 1 câu đùa. |
| **Cậu tính mình thêm ở chỗ nào** | [đề xuất] Cậu để một người lớn ngoài bộ Guardian làm cho mình một việc đời thường, và không đáp lễ, không ghi nợ. Neo: [Aurel] [[nguoi-lon-co-trach-nhiem]]: *"những người lớn với tam quan bình thường, thật sự xem và chăm sóc Tsuna như một đứa trẻ"* · [Aurel] [[gia-thuyet-aurel]]: hiểu rằng người khác chăm sóc mình không phải một món nợ. **Đo:** ít nhất 1 cảnh như thế; trong cảnh, cậu không trả lại bằng việc, quà hay kế hoạch. |
| **Ai nhìn Tsuna khác đi** | Yasuyuki · Noriyuki ([[emb-chot-cap-song-sinh]]). |

| # | Việc xảy ra | Chỗ dựa |
|---|---|---|
| Child 1 | Tin Cradle tới Namimori: Xanxus vào băng. | [Aurel] [[tuoi-va-moc]]: *"vụ Cradle cũng nên lùi lại khoảng 3–4 năm"*, tức Tsuna ~9–10. Hành động lớn ở xa: tới bằng tin, kể hai mép. Ai chứng kiến: [[q-child-nam-cong]]. Khác khung cũ: tin này **mở** arc. |
| Child 2 | Tsuna chọn đợi sơ hở, và làm một việc cụ thể trong lúc đợi. | [Aurel 17/09] [[emb-chot-cau-hoi-mo]] mục 6: *"đang đợi sơ hở"*, để không gây chú ý từ Timoteo và Vongola. Aurel nói câu này cho quãng Xanxus nằm băng ở arc thứ tư của khung cũ; mượn sang đây là [đề xuất]. Việc cụ thể: trống, cần Aurel. |
| Child 3 | Nhà Kōtokui dòng Kamo và cặp song sinh Yasuyuki, Noriyuki vào truyện. | [Aurel 21/09] [[emb-chot-cap-song-sinh]]; không ai hoà hợp trong arc này. |
| Child 4 | Tsuna biết hai tượng cáo là gì đối với cậu. | [nguồn] P2 Ch2 và reply 03/12/2024 chép ở [[ke-cuop-co-dau]] · [Aurel 17/09] [[emb-duyet-khung-nam-arc]] §C: xếp cùng arc với cặp song sinh. Chạm [[q-ten-con-cao]]. |
| Child 5 | Đứa trẻ Saint-Exavier được tìm thấy. | [nguồn] P2 Ch1: *"The Hibari were scouring Europe for Futa"*. Nối đứa trẻ ấy với Fūta là suy luận mạnh, không phải câu chữ (note `hook-dua-tre-saint-exavier`). Bằng đường nào: [[q-cam-khoan-vendicare]], [[q-child-nam-cong]]. |

| Hàng | |
|---|---|
| **Arc đóng ở đâu** | [đề xuất] Ở một việc Tsuna gây ra, không ở việc cậu ngồi yên. Việc gì: trống, cần Aurel. Nén bằng bảng kiểm. |
| **Số** | 5 sự kiện · ~19.000 từ · 2 chương. **Sàn.** |

### School · 10 → 12

| Hàng | |
|---|---|
| **Tuổi** | [đề xuất] 10 → 12. Câu nguồn *"more than a decade later"* đọc chặt thì cha mẹ về sớm nhất lúc Tsuna khoảng 11. |
| **Tông** | [Aurel] *Everything Leaves a Trace* · *Again!?* · *"…Oops."* |
| **Giọng** | [đề xuất] Bị bắt quả tang: một việc cậu đã làm (ở hướng này phần lớn là dấu vết của Brat) lộ ra trước một người có tên trong Namimori, và câu đầu tiên của cậu là đùa hoặc lảng. Người bắt quả tang không phải Iemitsu hay Tsunashige; hai người ấy phải ra về với cái biết sai ([[emb-chot-khung-arc]] mục 3). **Đo:** mỗi chương ít nhất 1 lần. |
| **Cậu tính mình thêm ở chỗ nào** | [đề xuất] Cậu xin mẹ một thứ cho chính mình (một bữa cơm, một câu trả lời), không đổi chác và không có mục kế hoạch nào đứng sau. Neo [nguồn] P2 Ch1: *"For the first time in his life he was actually experiencing true parental love"*. **Đo:** ít nhất 1 lần, trên trang. |
| **Ai nhìn Tsuna khác đi** | Nana · tên thứ hai: trống, cần Aurel. |

| # | Việc xảy ra | Chỗ dựa |
|---|---|---|
| School 1 | Nana và Iemitsu trở về. | [nguồn] P1 Ch3, câu trích ở mục 2. |
| School 2 | Iemitsu trả giá: một cảnh, ngắn. | [nguồn] reply tác giả 19/04/2023: *"Iemitsu would get his comeuppance but it won't be anytime soon"* · *"he won't be a major character that you'll have to suffer through."* Giá tới từ đâu: chưa quyết. |
| School 3 | Tsunashige ra về vẫn tin phiên bản của Iemitsu. | [Aurel 17/09] [[emb-chot-khung-arc]] mục 3. Hai anh em có gặp mặt ở arc này không: ý duyệt 17/09 thuộc khung đã `superseded`, nay là phương án (việc 10). |
| School 4 | Một người gọi tên mẫu hình *không tính mình*, và cậu cãi. | [diễn giải] [[nguoi-lon-co-trach-nhiem]] hệ quả 3 ghi người ấy là Musashi, ở arc thứ tư của khung cũ. Ai, và ở arc nào: chưa quyết (việc 11). |
| School 5 | Dấu vết của Brat bị lần ra một lần, và cái vỏ giữ được: Iemitsu ra về không biết. | *suy ra* trong [[fact-toan-canh-tuong-lai]]: Vongola không bắt được Tsuna. |
| School 6 | Nana và Iemitsu rời đi lần nữa. | [Aurel 17/09] [[emb-chot-cau-hoi-mo]] mục 6. |

Nền, không tính sự kiện: Xanxus nằm trong băng ([Aurel 17/09], cùng mục 6).

| Hàng | |
|---|---|
| **Arc đóng ở đâu** | Ở School 6, sự kiện Aurel đã đặt. Hàng đóng ghi sự kiện trần, không gắn cảm xúc. |
| **Số** | 6 sự kiện · ~22.800 từ · 2 đến 3 chương. **Sàn.** |

### Teen · 13 → 15

| Hàng | |
|---|---|
| **Tuổi** | 13 → 15, theo mốc phá băng của [[emb-chot-khung-arc]] mục 2. |
| **Tông** | [Aurel] *A New Future* · *We Need to Talk.* · *"Still worth it."* |
| **Giọng** | [đề xuất] Cứng đầu và cãi: bị gọi ra nói chuyện thì cậu cãi lại hoặc lảng bằng đùa rồi vẫn làm. Cậu trêu Kawahira, Xanxus, Bermuda, Fon như người ngang hàng; ở hướng này bốn người ấy đã lên trang từ Brat nên trò đùa có lịch sử. Neo [nguồn] P1 Ch3: *"That hope had died right around the time he had to name Xanxus of all people least destructive employee of the month that one time. And no that wasn't a joke."* **Đo:** trong mỗi cảnh có người chất vấn cậu, ít nhất 1 câu đáp là đùa hoặc cãi; 0 cảnh cậu chỉ im lặng nhận. |
| **Cậu tính mình thêm ở chỗ nào** | [đề xuất] Cậu mở việc tìm *giải pháp nhân tạo* cho lõi của chính cậu, và nhờ thẳng ít nhất một người. Neo [nguồn] reply tác giả 15/03/2025: *"even then he'd have to look for some artificial solutions cos If we're really being honest, a teenage body isn't that much better in this situation."* Đây là việc đầu tiên trong truyện mà người hưởng là cậu. **Đo:** ít nhất 1 người được nhờ, trên trang. Cọ `forbid` #2b, xem mục 8. |
| **Ai nhìn Tsuna khác đi** | Kawahira (khi được tự do) · Xanxus · Fon. |

| # | Việc xảy ra | Chỗ dựa |
|---|---|---|
| Teen 1 | Tsuna đưa Xanxus ra khỏi băng; Xanxus tấn công; hai người hoà hợp hai chiều trong lúc đánh. | [Aurel 16/08] [[tuyen-xanxus]] · [Aurel 17/09] [[emb-chot-khung-arc]] mục 2. Kể bằng hai mép hay xin ngoại lệ `forbid` #7: chưa quyết. Cách phá băng (lẻn vào tổng bộ hay nhờ Bermuda): chưa quyết. |
| Teen 2 | Xanxus bí mật liên hệ Varia, khoẻ thì công khai trở về; Nono bỏ qua. | [Aurel] [[tuyen-xanxus]], mục *Hậu quả chính trị*. |
| Teen 3 | Fon chọn làm Storm. | [Aurel 17/09] [[emb-chot-khung-arc]] mục 2: Fon là Storm chính · [Aurel 20/09] [[emb-chot-nguyen-to-di-san]]: *"ai tốt hơn một Arcobaleno để trở thành một nguyên tố chứ"*. |
| Teen 4 | Lời hứa với Kawahira được thực hiện: Tri-Ni-Sette tự vận hành; Arcobaleno được giải nguyền mà không biết ai giải. | [nguồn] P2 Ch2: *"we were not only able to solve the Arcobaleno curse but also automate the Tri-Ni-Sette altogether. I can guarantee you freedom because it has been done before."* · chốt 17/09 ở [[emb-chot-cau-hoi-mo]] mục 1. |
| Teen 5 | Tsuna không nhận Pacifier. | [nguồn] P2 Ch2: *"On one strict condition. That I never consider any among her bloodline for the Arcobaleno."* · bảng vị trí trope mục 5.6. |
| Teen 6 | Kawahira được tự do, và phản ứng. | [Aurel] [[truc-chinh]] mục 6: *"Cách Kawahira phản ứng với sự tự do"*. Ý tưởng cảnh *Checkerface's final show* là vật liệu Aurel giữ ở [[emb-duyet-khung-nam-arc]] mục 6. |
| Teen 7 | Dấu ấn Kimiko trong cây được giải. | [[hook-dau-an-kimiko-trong-cay]] · [Aurel 17/09] [[emb-chot-cau-hoi-mo]] mục 4. |
| Teen 8 | Việc tìm giải pháp nhân tạo cho lõi bắt đầu; cậu nhờ người. | [nguồn] reply 15/03/2025, trích ở trên. |

| Hàng | |
|---|---|
| **Arc đóng ở đâu** | [đề xuất] Ở Teen 6 hoặc Teen 8. Nén bằng biên niên. |
| **Số** | 8 sự kiện · ~30.400 từ · 3 đến 4 chương. **Sàn.** |

### Young Adult · 16 → 18

| Hàng | |
|---|---|
| **Tuổi** | 16 → 18. Đích là nguồn. |
| **Tông** | [Aurel] *The Beginning of the End* · *He's Ours This Time.* · *"Everything is fine."* **(It was not fine.)** |
| **Giọng** | [đề xuất] Người đã dọn sẵn bàn cờ: lời kể chơi độ lệch giữa câu trấn an và thực tế cho buồn cười; trò đùa chạy dài về Reborn được trả ở cảnh cuối. Neo [nguồn] reply tác giả 30/07/2024: *"Reborn brazenly looks Tsuna in the eye during their first meeting"* / *"Namimori: How dare-?!"* **Đo:** mỗi chương ít nhất 1 chỗ lời kể đặt một câu trấn an cạnh một việc đang hỏng; cảnh tới đền có ít nhất 1 câu đùa của Tsuna trước câu kết. |
| **Cậu tính mình thêm ở chỗ nào** | [đề xuất] Cậu nhận cái tên Sawada Tenmei như một việc cho chính cậu, không phải vì thị trấn cần. Neo [Aurel 17/09] [[emb-duyet-khung-nam-arc]] §A: nâng Tenmei thành một sự kiện có khoảnh khắc quyết định trên trang. **Đo:** trong sự kiện ấy có 1 việc hoặc 1 câu mà người hưởng là cậu. |
| **Ai nhìn Tsuna khác đi** | Reborn (lần đầu thấy cậu; trước đó chỉ có cái tên từ Brat) · Tsunashige (nghĩ mình biết). |

| # | Việc xảy ra | Chỗ dựa |
|---|---|---|
| Young Adult 1 | Tsunashige được chọn; Reborn nhận việc gia sư. | [nguồn] P1 Ch3: *"Sawada Tsunashige and his tutor, the hitman Reborn."* Chữ *người thừa kế* là suy ra. |
| Young Adult 2 | Vongola tới gần Namimori mà không bắt được Tsuna. | *suy ra* trong [[fact-toan-canh-tuong-lai]]. |
| Young Adult 3 | Tsuna nhận mình là Sawada Tenmei. | [Aurel 17/09] [[emb-duyet-khung-nam-arc]] §A. |
| Young Adult 4 | Kyouya đứng cạnh cậu khi người của kiếp trước bước vào. | [nguồn] P2 Ch1: *"Except for Kyoya."* (chép theo [[fact-bang-tinh-hinh-ke-hoach]]; chưa kiểm lại ở lượt này). Hàng này vốn của khung cũ, nay là phương án. |
| Young Adult 5 | Tsunashige, 14 tuổi, và Reborn tới đền. | [nguồn] câu kết P1 Ch3 · [Aurel] [[tuoi-va-moc]]: *"giả định Tsunashige 14 tuổi"*. |

| Hàng | |
|---|---|
| **Arc đóng ở đâu** | Ở câu *"Let the games begin."* |
| **Số** | 5 sự kiện · ~19.000 từ · 2 chương. **Sàn.** |

## 4. Bảng điểm danh

Mỗi ô ghi người ấy LÀM gì hoặc ĐỔI gì trong arc, kèm chỗ dựa. **"trống"** nghĩa là *trống, cần Aurel*: mình đã tìm trong note nhân vật, `drop-point`, [[khung-soat-diem-danh]] và các decision đang sống mà không thấy chỗ dựa, và không bịa. Mình không ghi chữ ĐỔI cho ai ở arc nào trừ khi có nguồn; gần như mọi ô ĐỔI vì thế vẫn là việc của Aurel.

### Người ở Namimori

| | Brat | Child | School | Teen | Young Adult |
|---|---|---|---|---|---|
| **Musashi** | LÀM: gọi Gen'ichi (Brat 3); là người phải bị thuyết phục trước bữa tối Vindice ([Aurel 22/09] [[emb-chot-bermuda-an-toi]]: nếu bà bực thì *mắt cún con*); hoãn chuyến sang Ý vì điều kiện của chính bà chưa đạt ([nguồn] P2 Ch2: *"Once she was assured of Tsunayoshi's safety she will have to travel to Italy to hold dear Shige in her arms at last."*). ĐỔI: trống | trống (chỗ đỗ có thể của chuyến sang Ý: chưa ai quyết) | Con gái bà về nhà bà (School 1); phương án: bà là người gọi tên mẫu hình (School 4). ĐỔI: trống | trống | trống |
| **Maro** | LÀM: canh mọi lượt khách qua tấm màn ([nguồn] P2 Ch2: *"Azuma-sama would be watching"*). Bà và Kawahira đã gặp chưa, khi hai chiếc Hell Ring cộng hưởng: nguồn không nói. ĐỔI: trống | trống | trống | trống | trống |
| **Ayame** | LÀM: tiếp trà từng lượt khách ([nguồn] P2 Ch2: *"Trust Ayame to be perfect in her duties."*); [đề xuất] bà là người lên trang ở mọi cuộc tiếp. ĐỔI: trống | [đề xuất] một trong ba người có thể làm việc đời thường của hàng *tính mình thêm* (bà, Kazuki, hoặc Gen'ichi); ai: trống | trống | trống | trống |
| **Nagi** | LÀM: gặp Mukuro (Brat 7); cùng Tsuna làm *hai đôi mắt cún con* trước bữa tối ([Aurel 22/09]); học Mist với Musashi ([nguồn] P2 Ch1). ĐỔI: có vào bộ Guardian không: trống, và câu trả lời "có" là đổi `forbid` #4 | trống | trống | trống | trống |
| **Kazuki** | Việc có nguồn chỉ là vai nền: làm vườn, khiên Chiyu ([nguồn] End Notes P2 Ch2: *"when he saw Tsuna out there in the rain he almost had a heart attack. Good thing he is a Chiyu."*). Việc trong arc: trống | như ô Ayame | trống | trống | trống |
| **Indra** | LÀM: courting bù sau lời thề ([nguồn] P2 Ch1: *"You'll court me properly like an Element should have"* / *"Of course"*); người nhà bà chặn sát thủ (Brat 4); Fon tới qua bà (Brat 8); vai Guardian Cổng Đông được thử lần đầu khi khách tới (`drop-point` mục 7: vai mới chưa được thử). ĐỔI: trống | Người nhà bà tìm ra đứa trẻ Saint-Exavier (Child 5) | trống | Phương án: bà là người lôi Fon vào ([Aurel 20/09] [[emb-chot-nguyen-to-di-san]], hạt giống) | trống |
| **Kyouya** | LÀM: bond thành (Brat 5); đổi tuyến tuần tra, nhân đôi *false carnivores* ([nguồn] P2 Ch2, POV cuối). Cậu biết mẹ không đi nữa lúc nào: trống | Phương án: tự đặt mốc mới vì cái mốc cũ đã mất (chốt 17/09 ở [[emb-chot-cau-hoi-mo]] mục 3) | trống | trống | Phương án: đứng cạnh Tsuna ở cảnh kết (Young Adult 4) |
| **Tomoko** | [đề xuất] nghề cũ của bà là kênh hợp lý cho bước đầu của tuyến Varia ([Aurel 19/09]: Tsuna vô tình đã là người cung cấp thông tin từ trước); đường vào Shouichi đi qua bà (note [[tomoko]]). LÀM cụ thể: trống | Đứa trẻ Saint-Exavier là việc bà khởi đầu mười năm trước ([nguồn] P2 Ch1: *"A child born into the Saint-Exavier family with a ranking ability."*). Lộ mặt hay không: [[q-child-nam-cong]] | trống | trống | trống |
| **Shouichi** | LÀM: rủ Tsuna chơi, thành bạn cùng tuổi đầu tiên (Brat 2) | trống | trống (Tsuna có đi học không: nguồn không nói) | trống | trống |
| **Kawahira** | LÀM: dạy Mukuro ([nguồn] P2 Ch1); vắng mặt có lý do mỗi khi Vindice hoặc Arcobaleno có mặt ([Aurel 22/09]: vắng tối Vindice). Ông có nói ra mình là Guardian bên trái không: trống | trống | trống | Được tự do (Teen 6) | trống |
| **Mukuro** | LÀM: lên trang, gặp Tsuna, gặp Nagi (Brat 7); vắng tối Vindice ([Aurel 22/09]). ĐỔI: trống | trống | trống | trống | trống |
| **Gen'ichi** | LÀM: vào cuộc (Brat 3); không biết chuyện Lửa suốt arc ([Aurel 17/09], khoá): ông là người thấy sáu lượt khách mà không được cấp gì | Có được biết chuyện Lửa không: trống | trống | trống | trống |
| **mẹ Takeshi** | Brat 4; ai quyết trên trang: [[q-me-takeshi-ai-quyet]] | trống | trống | trống | trống |
| **con cáo** | LÀM: lên trang (Brat 1); [Aurel 19/09] [[emb-chot-tsuna-va-natsu-kham-pha-lai]]: *"họ có nhau và hiểu nhau theo cách mà không gì có thể"*. Khách nào thấy được nó: trống | Song chiếu với cặp song sinh (Child 4) | trống | Vẫn đang kéo lõi về ([Aurel 19/09] [[emb-chot-loi-dang-quay-ve]]); vai của nó ở Teen 8: trống | trống |

### Sáu nhóm vai có tag

| | Brat | Child | School | Teen | Young Adult |
|---|---|---|---|---|---|
| **Xanxus** (và Varia) | Brat 9, Brat 10 | Vào băng (Child 1) | Trong băng (nền) | Ra khỏi băng, hoà hợp hai chiều, trở về Varia (Teen 1, Teen 2) | trống |
| **Fon** | Brat 8 | trống | trống | Chọn làm Storm (Teen 3); được giải nguyền (Teen 4) | trống |
| **Arcobaleno** | Mammon trong Varia (Brat 9); Fon (Brat 8); Reborn ở ngoài (Brat 11); Skull tuỳ Aurel | Ai chứng kiến Cradle: [[q-child-nam-cong]] | trống | Được giải nguyền mà không biết ai giải (Teen 4) | Reborn tới khi đã hết nguyền (hệ quả của Teen 4) |
| **Reborn** | Brat 11 | trống | trống | Được giải nguyền; gieo vai Sun (chốt 17/09, [[emb-chot-cau-hoi-mo]] mục 1) | Nhận việc gia sư; tới đền; lần đầu gặp (Young Adult 1, 5) |
| **Vindice, Bermuda** | Brat 12 | Tuỳ [[q-cam-khoan-vendicare]]: đứa trẻ Saint-Exavier qua sổ Vendicare ([[fact-vendicare-giu-so]], luật nhánh) | trống | *Thứ Tsuna đã có sẵn cho ông* được trả cùng Teen 4; phương án: ông đưa Xanxus ra bằng Ngọn lửa Đêm ([[tuyen-xanxus]]) | trống |
| **Mukuro và Chrome** | Hai người gặp nhau lần đầu; không ai nợ ai (note [[mukuro]]: Tsuna cứu Nagi trước, nên trục quan hệ canon bị tháo) | trống | trống | trống | trống |

**Đếm** (executed, đếm trên chính hai bảng này): 100 ô; **54 ô trống**; 46 ô có nội dung, trong đó 20 ô ở cột Brat. Không hàng nào trống cả năm cột. Ba hàng trống bốn cột: Maro, Mukuro, mẹ Takeshi. Lý do ghi được: với Maro, nguồn chỉ cho vai nền ([nguồn] End Notes P2 Ch2: *"She's always in the background taking care of Tsuna"*) và `drop-point` ghi bà chưa có tuyến riêng; với Mukuro, nguyên tác cho hai dòng và note [[mukuro]] cấm lắp tiểu sử canon; với mẹ Takeshi, nguồn dừng ở việc bà còn sống.

Cái hướng A làm được cho thước *thường quên nhân vật*: ở Brat, cả 14 người Namimori có ít nhất một việc gắn sự kiện. Cái nó không làm được: bốn cột sau gần như chỉ có khách và hệ quả; người trong nhà vẫn trống. Hai ô trống của Kyouya (School, Teen) là nợ với lối *Kyouya lớn lên có cảnh* mà Aurel đã chốt kết hợp ở [[emb-chot-khung-arc]].

## 5. Hook

18 hook sống (executed: 22 note trong `hooks/`, 4 `superseded`). Tên có bản sao trong `snapshots/` thì viết bằng chữ thường.

| Hook | Brat | Sau Brat |
|---|---|---|
| `ong-tre` | **tiêu** (Brat 1) | |
| [[nguoi-ban-cu]] | **tiêu** (Brat 1); tên: [[q-ten-con-cao]] | |
| `hook-me-takeshi-va-sat-thu` | **tiêu** (Brat 4) | |
| `kyouya-loai-chu-chot` | **tiêu phần bond** (Brat 5) | ba hook con để yên; gieo tiếp ở Child |
| `hook-bermuda-to-mo` | **tiêu nửa đầu**: tò mò thành gặp mặt (Brat 12) | nửa sau, thứ Tsuna đã có sẵn cho ông: tiêu ở Teen |
| [[hook-nha-tu-dac-biet]] | gieo tiếp (Vindice ở Namimori trong lúc Kawahira vắng) | tiêu ở Teen |
| [[hook-ba-cua-con-lai]] | gieo tiếp. *Mỗi cửa ứng với một Guardian* là chỗ nguồn chưa nói; dùng thì khai là mở rộng của nhánh | tiêu dần tới Teen |
| `hook-tsunashige-va-reborn` | gieo tiếp (Brat 11) | **tiêu** ở Young Adult 5 |
| [[hook-sukunabikona]] | để yên | gieo ở Teen (Reborn được giải nguyền); trả sau vạch kết ([[emb-chot-cau-hoi-mo]] mục 1) |
| `hook-iemitsu-tra-gia` | gieo tiếp: người của Vongola chạm vào con ông mà ông không biết | **tiêu** ở School 2 |
| `hook-dua-tre-saint-exavier` | gieo tiếp (có thể qua bữa tối Vindice) | **tiêu** ở Child 5 |
| [[ke-cuop-co-dau]] | để yên | **tiêu** ở Child 4 |
| [[kimiko-thay-truoc-tuong-lai]] | gieo tiếp (Bermuda so các lần chuyển đổi Arcobaleno, [Aurel 22/09]) | tiêu ở Teen 7 |
| [[hook-dau-an-kimiko-trong-cay]] | để yên | **tiêu** ở Teen 7 |
| [[hook-su-co-nha-khoa-hoc-vongola]] | để yên. [Aurel 19/09]: *"sau này mới vô tình bị phát hiện"*; không thuộc Brat | chỗ đỗ: School 5 hoặc Teen 1; cần Aurel |
| `bond-bam-vao-cay` | chờ Aurel giữ hay bỏ. Nếu giữ: gieo ở Brat 5 | dùng lại ở Teen 1 (bond thứ hai) |
| `so-cua-thay-thuoc` | chờ Aurel giữ hay bỏ. Nếu giữ: gieo ở Brat 3 | |
| [[nana-iemitsu-cuoi-nhau]] | để yên; đã trả ở P1 Ch2 | chạm lại ở School nếu cần |

Brat tiêu trọn 3, tiêu một phần 2, gieo tiếp 7, để yên 4, chờ Aurel 2.

## 6. Decision bị buộc

### Mười một câu `unresolved`

| Câu | Hướng A cần gì | `needed_before` |
|---|---|---|
| [[q-brat-dai-bao-nhieu]] | Hướng A cần phương án *đóng ở xương sống*, với độ dài kéo tới năm chín tuổi. Phương án *đóng ở mốc âm tính năm bảy* không chứa nổi sáu nhóm vai. Phương án *đóng khi tag trả xong* trông giống hướng A nhưng hướng A phải tránh: đó là danh sách gạch tên. | duyệt khung |
| [[q-brat-xanxus-vao-the-nao]] | Hướng A cần phương án *chạm trước Cradle, hoà hợp vẫn sau*, với mức chạm là lên trang thật. Không dùng được phương án *chỉ hồi tưởng*. Không cần phương án *lùi Cradle về Brat*. | khung riêng arc Brat |
| [[q-brat-reborn-toi-dau]] | Hướng A cần một mức chưa có trong note: có cảnh của riêng ông, ngoài Namimori, không gặp (mục 2). Mức *gặp thật* bị loại vì `preserve`. | khung riêng arc Brat |
| [[q-bermuda-an-toi]] | Hướng A cần phương án *Bermuda tới Namimori, ăn tối*, và cần nó ở **Brat**. Câu này vì thế lên sớm một arc. | khung riêng arc Brat (hiện ghi: dàn ý arc Child) |
| [[q-tsuna-tranh-mukuro]] | Hướng A cần phương án *quyết Mukuro ở đâu trước dàn ý*, và Mukuro lên trang trong Brat. *Cố ý tránh* chỉ dùng được như trạng thái đầu arc. | khung riêng arc Brat |
| [[q-dac-vu-vongola]] | Hướng A cần một cái vấp (thang mục 4 đã chốt lại 01/10), không cần nó là một đặc vụ. Với Varia đã lên trang, một đặc vụ Vongola là kênh Vongola thứ hai trong cùng arc. Phương án hướng A nghiêng về: một nước cờ của chính cậu trật trước mặt khách, người đỡ là người nhà. Chưa ai chọn. | khung riêng arc Brat |
| [[q-cam-khoan-vendicare]] | Không buộc. Nếu Aurel giữ giao kèo thì nó được ký trong Brat. | khung riêng arc Brat nếu bữa tối có giao kèo |
| [[q-child-nam-cong]] | Cổng về người xin vào Sanctuary lên sớm nếu Aurel muốn Skull ở Brat. Cổng về người chứng kiến Cradle dễ hơn ở hướng này vì Mammon đã lên trang. Ba cổng còn lại: không phụ thuộc. | dàn ý arc Child |
| [[q-me-takeshi-ai-quyet]] | Không phụ thuộc. | cảnh Brat 4 |
| [[q-shouichi-loi-moi]] | Không phụ thuộc. | chương đầu có Shouichi |
| [[q-ten-con-cao]] | Không phụ thuộc về hình dạng. Kéo theo một việc hướng A làm nặng thêm: khách nào thấy con cáo. | chương con cáo được gọi tên |

Năm câu hướng A cần một phương án cụ thể; hai câu nó chỉ làm lên sớm; bốn câu nó không phụ thuộc.

### Việc chưa quyết khác mà hướng A đẻ ra, xếp theo thứ chúng chặn

| # | Việc | `needed_before` đề xuất |
|---|---|---|
| 1 | **"Lên trang thật" đo bằng gì.** Đề xuất: có thoại hoặc hành động trong ít nhất một cảnh ở thì hiện tại. Còn hỏi: cảnh ngoài Namimori có tính không; không gặp Tsuna có tính không. | duyệt khung này |
| 2 | **Khối tag: Xanxus và Fon vắng khỏi `Characters`.** Aurel đọc chi tiết này thế nào (mục 0, mục 9). | duyệt khung này |
| 3 | **Chữ cho "lỏng dần".** `preserve` *Luận đề* và `forbid` #2b còn chờ Aurel đặt chữ ([[emb-chot-goc-khung-moi]] mục 2). Hàng *tính mình thêm* của cả năm arc tựa vào đó. | duyệt khung này |
| 4 | **Tsuna và Xanxus gặp ở đâu.** Trong lãnh thổ thì một trận đánh chạm điều khoản tự vệ của Sanctuary; ngoài lãnh thổ thì Tsuna phải rời Namimori, việc nguồn chưa cho. | khung riêng arc Brat |
| 5 | **Mỗi nhóm khách rời Brat biết gì** (bảng mục 2), và người ngoài biết Namimori có một Sky tới đâu. | thẻ cảnh đầu tiên có khách |
| 6 | **Fon vào Brat thế nào**: vì sao tới, biết gì khi về. Chưa có note `question`. | khung riêng arc Brat |
| 7 | **Arcobaleno lên trang gồm ai.** Mammon và Fon đủ chưa; Skull có sang Brat không. Kèm ba hàng còn chờ ở danh sách của [[emb-lam-lai-lan-ba]]: `chiyo`, `bond-bam-vao-cay`, `so-cua-thay-thuoc`. | khung riêng arc Brat |
| 8 | **Cảnh của Reborn đặt ở đâu**, ông mang đi cái gì. | khung riêng arc Brat |
| 9 | **Cách đọc mốc năm bảy** (mục 7), và có thêm mốc *Sky của Namimori, just wing it* vào khung không. | khung riêng arc Brat |
| 10 | **Kawahira vắng thế nào** suốt lúc Vindice và Arcobaleno có mặt; Maro và Kawahira đã gặp chưa. | khung riêng arc Brat |
| 11 | **Brat nhẹ hay nặng.** Lời 22/09 nói Child hoạt bát *sau các sự kiện arc Brat*; hướng A đưa bữa tối Vindice, sự kiện mang giọng ấy, sang Brat. | khung riêng arc Brat |
| 12 | **Hàng Giọng và phép đo** có được nhận không. | khung riêng arc Brat |
| 13 | **Ba ô để trống của `secrets/_MOC`**: Musashi biết tới đâu; bà có biết Nana giấu không; Indra có biết con đang chờ không. | thẻ cảnh đầu có POV Musashi, hoặc cảnh Indra với Kyouya |
| 14 | **Tuổi Varia trong Brat** (mục *Tuyến Varia* của [[tuoi-va-moc]] đã gạch) và chênh tuổi Kyouya. | thẻ cảnh đầu có Varia |
| 15 | **Nagi có vào bộ Guardian không.** Trả lời "có" là đổi `forbid` #4. | dàn ý arc đầu tiên có bond mới sau Kyouya |
| 16 | **Tsunashige có gặp Tsuna trước năm 18 không.** | dàn ý arc School |
| 17 | **Ai gọi tên mẫu hình, ở arc nào**, và điều kiện lộ của secret [[567-ke-hoach]]. | dàn ý arc School |
| 18 | **[[hook-su-co-nha-khoa-hoc-vongola]] thuộc arc nào.** | dàn ý arc School |
| 19 | **Trận phá băng** kể hai mép hay xin ngoại lệ; luật Sky làm Element cho Sky khác; cách phá băng. | dàn ý arc Teen |

Lượt này chỉ được tạo một file nên chưa việc nào thành note `question`. Skill `plan-continuation` đòi mỗi việc chưa quyết là một note có `needed_before`; đây là nợ của lượt, không phải việc đã xong.

## 7. Tác động lên timeline

| Mốc | Đang ghi ở đâu | Hướng A |
|---|---|---|
| Vạch xuất phát, Tsuna ~6–7 | `Timeline/master`, `drop-point` | không đổi |
| Ranh giới Brat sang Child | khung cũ: 7 | **dời tới 9**. Quãng 7 → 9 của Child cũ nay thuộc Brat |
| Mốc *âm tính năm bảy* | `Timeline/master`, bảng *Tương lai đã được kể trước*, có cờ *nguồn tự lệch* | **không dời tuổi, đổi vị trí kết cấu**: từ chỗ đóng arc (duyệt 17/09) thành bản lề giữa Brat (Brat 6) |
| Sinh nhật cụ thể | [[tuoi-va-moc]] mục 4 | không chốt, theo lời Aurel 09/09 |
| Cradle, Tsuna ~9–10 | [[tuoi-va-moc]], [[tuyen-xanxus]] | **không dời**. Đổi vị trí: mở Child |
| Xanxus lần đầu lên trang | chưa có mốc sống | thêm: Tsuna 7–8. Xanxus ~17–18, chưa vào băng, nếu giữ chênh mười tuổi của canon (note `xanxus`, `authority: ai`; cần xác nhận) |
| Bữa tối Vindice | bản đã lưu trữ đặt ở Child, Tsuna 8 | tuổi không đổi, **arc đổi sang Brat**. Lưu ý [Aurel 22/09] về tuổi Uni còn nguyên cho Teen |
| Fon lần đầu tới Namimori | chưa có mốc | thêm, trong Brat. *Chọn làm Storm* ở Teen |
| Reborn | mốc 18 | mốc 18 không đổi. Thêm một mốc trong Brat, ngoài Namimori; lúc ấy ông còn mang lời nguyền |
| Mukuro gặp Tsuna | chưa có mốc sống | thêm, trong Brat |
| Cha mẹ trở về | [nguồn] *"more than a decade later"* | School; đọc chặt thì Tsuna ít nhất khoảng 11 |
| Phá băng 13–15 | [[emb-chot-khung-arc]] mục 2 | không dời |

**Nguồn tự lệch ở mốc năm bảy**, ba chỗ (inspected):

1. [nguồn] P1 Ch3: *"Sawada Tsunayoshi would wake up nearly a year later, hide out for an extra five years, and pretend to wake up completely normal and flame negative at age seven."* Một năm cộng năm năm ra sáu; câu ghi bảy.
2. [nguồn] P2 Ch2, Musashi: *"He's six. No matter the circumstances he's still six. And he's only a year out of seclusion."* Tức ra khỏi ẩn cư lúc khoảng năm tuổi.
3. [nguồn] P2 Ch1, POV Tomoko: *"they were all aware of the fact that Tenmei-sama was awake, he generally kept appearances to a minimum, both recovering from the effort of creating the Wings, and also hiding from the blasted Vongola."* Cả thị trấn đã biết cậu tỉnh trước năm bảy tuổi.

Hướng A không vá nguồn. Nó chọn một cách đọc, như phương án: năm bảy tuổi là mốc của **cái vỏ hướng ra ngoài** (giấy tờ, người ngoài), và việc khách tìm tới là thứ làm cái vỏ ấy vô ích, đúng chữ *futile* của câu biên niên. Mệnh đề *"cái vỏ về sau tự chặn cậu"* trong [[fact-toan-canh-tuong-lai]] là lời bình của AI, không phải câu trích ([[khung-soat-hieu-luc]] đã chỉ ra); hướng A không dùng.

**Tuổi tại các ranh giới của hướng A** (tính, không phải nguồn):

| Tsuna | 9 | 10 | 12 | 15 | 18 |
|---|---|---|---|---|---|
| Tsunashige (kém 4) | 5 | 6 | 8 | 11 | 14 |
| Kyouya (nếu giữ +2) | 11 | 12 | 14 | 17 | 20 |
| Nagi (nhỏ hơn vài tuổi) | ~6–7 | ~7–8 | ~9–10 | ~12–13 | ~15–16 |

Bảng tuổi của [[tuoi-va-moc]] còn ghi Kyouya *~18–19* lúc Tsuna 18, lệch với mốc +2 của chính note ấy; [[khung-soat-tong-ket]] đã nêu. Hướng A không cần việc *Tsuna sang Ý* (mở rộng của nhánh, đang mở ở [[q-dac-vu-vongola]]).

## 8. Soát

### `preserve` của hợp đồng nhánh `aurel-main`

| Mục | Hướng A |
|---|---|
| Luận đề | **cọ**, và không phải riêng hướng này: *lỏng dần* so với *"không được cải tiến"*. Hướng A đọc theo chỉ dẫn tạm của [[emb-chot-goc-khung-moi]] mục 2. Chờ Aurel đặt chữ. |
| Đích đến năm 18 | **đạt**, với điều kiện Reborn theo phương án ở mục 2. **Cọ:** ông lên trang sớm thì câu kết bớt vang; và nếu ông mang đi quá nhiều, hai mảnh "người ngoài không biết" và "Reborn tới thẩm định theo tin của Iemitsu" (note `reborn`) lệch nhau. |
| Lời tiên tri là Vongola Decimo | không đụng. |
| Hai dòng Sawada, luật đặt tên | không đụng. |
| Hệ danh xưng Flame | đạt. Hướng A tăng số cảnh hai hệ danh xưng chạm nhau (khách nói *Cloud*, thị trấn nói *Getsufuji*); luật đang sống: [[emb-chot-danh-xung-chuc-va-nguyen-to]]. |
| Lõi trong cây sakaki | **cọ**: bốn nhóm khách nhạy Flame vào thị trấn. Không ai được lần ra. Nếu Aurel giữ `bond-bam-vao-cay` thì chỗ cọ này nặng thêm. |
| Hai lời hứa của Kimiko | đạt. Fon và Indra cùng lên trang thì secret về dòng máu của Indra sát mép. |
| Namimori là Sanctuary | **cọ ở Brat 10**: một trận đánh trong lãnh thổ là tấn công Sanctuary theo [[fact-sanctuary]] (việc 4). |
| Indra là Guardian đầu tiên | không đụng. Lệch có sẵn với câu nguồn *"He already had a guardian for his left"* đã được [[khung-soat-tong-ket]] nêu. |

### `forbid`

| # | Hướng A |
|---|---|
| 1, Tsuna thành Decimo | đạt. Giữ bằng việc không nhóm khách nào cầm đủ mảnh. |
| 2, người tốt bụng | đạt nếu mỗi lần tiếp khách có một lý do nói ra là chiến lược (bảng vị trí trope mục 5.1). |
| 2b, danh sách người được cứu | **cọ ở ba chỗ.** Brat 13: đỡ không phải cứu. Lượt hai của Brat: khách đều mạnh hơn cậu, không vị khách nào được ra tay hộ cậu. Teen 8: một việc mà người hưởng là cậu đi ngược câu *"Cậu không nằm trong 568 kế hoạch của chính mình"*; mình không tự hoà. |
| 3, Iemitsu | đạt ở Brat. Phương án thứ hai cho cảnh Reborn sát mép. School có ba trên sáu sự kiện dính Iemitsu: sát mép. |
| 4, chọn lại bộ Guardian canon | đạt: Mukuro và Chrome lên trang, không thành Guardian. Cờ ở việc 15. |
| 5, Kawahira theo canon KHR | **cọ nhẹ**: Arcobaleno và Vindice lên trang kéo theo quan hệ canon giữa ông và họ. Nguồn có sẵn một phần, P2 Ch2: *"the eldritch abominations that were Kawahira and Bermuda"* · *"their fucked up relationship"*. Chi tiết lấy từ canon phải khai tầng. |
| 6, em dash | file này không dùng. |
| 7, quá trình dài và bên trong hành động lớn | **cọ ở Brat 10 và Teen 1** (hai trận đánh) và ở việc sáu lượt khách dễ kéo thành "quen dần". Mỗi nhóm: một khoảnh khắc quyết định và hậu quả. Mặt được: "lên trang thật" đáp đúng lời chê 25/09 về sự kiện tới bằng giấy tờ. |
| 8, phong ấn như bảo vệ vụng về | không đụng ở Brat; giữ ở School. |
| 9, nghi lễ để trang trí | **thiếu**: nghi lễ bond ở Brat 5 và bữa tối ở Brat 12 chưa ghi nước cờ. |

### Bảng vị trí trope (`structure/tropes`)

| Trope, cách tác giả xử | Hướng A |
|---|---|
| Sky attraction, chơi thẳng và hai chiều | **chơi thẳng**; là động cơ của lượt hai. Tag Part 2: *Skies are like catnip to other elements*. |
| Courting trước bond, chơi thẳng thành nghi thức | **chơi thẳng**: Kyouya; Indra courting bù. |
| Namimori là nơi trú, đẩy thành luật | **chơi thẳng**: khách phải theo luật Sanctuary. |
| BAMF Tsuna, thẳng với cơ chế lạ | chơi thẳng. **Cờ:** đứng trước Xanxus và Bermuda ở tuổi bảy tám, cái hài phải nằm ở độ lệch thân xác, không ở việc cậu thắng. |
| Fix-it sửa người, từ chối sửa quan hệ cũ (mục 3.1) | **cờ đỏ.** Cái bị bẻ là phần thưởng: cứu họ rồi không giữ họ. Hướng A cho Mukuro, Chrome, Xanxus, Fon lên trang nhiều, tức trả lại một phần phần thưởng. Phải giữ: gặp không có nghĩa là giữ. |
| Guardian là bộ canon, đảo | giữ đảo. Cùng cờ trên. |
| Tsuna là Sky Arcobaleno, dựng súng chưa bắn (mục 5.6: không chơi thẳng) | **cờ đỏ.** Arcobaleno và Bermuda vào Brat là kéo khẩu súng này lại gần. Giữ bẻ: Teen 5. |
| Kẻ cướp cô dâu, đã bẻ (mục 3.4, mục 5.6: không chơi thẳng) | **cờ.** "Khách tới vì đứa trẻ" dễ chơi lại "thực thể tới bắt cô dâu". Không vị khách nào tới để mang cậu đi. |
| Iemitsu và Nono, dựng rồi rút sân khấu; phản diện không được đất diễn (mục 3.5) | giữ rút ở Brat; trả ngắn ở School. |
| Flame sealing, dựng rồi vô hiệu | không chơi lại. |
| Nghi lễ là nước cờ (mục 3.6) | như `forbid` #9: còn thiếu. |
| Trả lời tag (mục 5.5) | trả cả sáu ngay trong Brat. Note `tropes` ghi bốn quan hệ, decision 19/09 ghi sáu nhóm; lệch có sẵn. |
| Cắt qua hành động lớn; câu chốt cuối chương; giọng biên niên (mục 4) | dùng cả ba. |

### [[bon-lan-can]]

| Lằn can | Hướng A |
|---|---|
| Không phi logic | có nền nguồn cho việc người ngoài tìm tới (câu biên niên P1 Ch3). Chỗ dễ gãy: sáu nhóm trong khoảng hai năm vào một nơi vốn kín. |
| Không vô lí | bốn nhóm đã có lý do (Varia: [Aurel]; Bermuda: [nguồn] và [Aurel]; Mukuro: [nguồn]; Reborn: [Aurel]). Fon và các Arcobaleno khác: chưa có. "Vì tag cần" không phải lý do. |
| Không vô nghĩa | mỗi lượt khách phải trả lời được: ai nhìn Tsuna khác đi. |
| Không gây khó chịu | **được:** khách ngoài không tôn thờ cậu, chữa đúng dòng *"cả thị trấn tôn thờ tới mức nhạt"*. **Rủi ro:** sáu nhóm nặng ký kéo arc về nghiêm; khách dịu đi vì gặp một đứa trẻ là bẻ tính cách để phục vụ cảnh. |

### Secret cả hướng không được lộ

Chỉ ghi tên note. Với mọi khách của Brat, và với người ngoài Namimori ở mọi arc: [[tsuna-tai-sinh]] · [[loi-o-cay-sakaki]] · [[567-ke-hoach]] · `tsuna-am-tinh-tren-giay` · `chi-chu-nhan-thay-cao` · [[nana-giau-viec-tsuna-tinh]]. Trong nhà Hibari, và đặc biệt khi Fon có mặt: [[indra-co-dong-mau-hibari]] · [[bigger-carnivore]]. Hướng A làm việc giữ tám secret này nặng hơn hai hướng kia ở Brat: số người ngoài lên trang nhiều nhất, và bảng mục 2 đòi mỗi người một mức biết riêng trong `known_by`.

## 9. Được và mất

**Được:**

1. **Bám chữ của quyết định 19/09 chặt nhất.** Lời Aurel ở [[emb-chot-tag-theo-arc]]: *"tác giả đã tag tên trực tiếp nên có lẽ tác giả đã có một kế hoạch nào đó trước khi drop"*. Hướng A thi hành kế hoạch ấy ở mức đầy đủ.
2. **Dùng trọn ba khối vật liệu Aurel đã dựng** cho các nhóm vai có tag, và đặt cả ba vào arc mà tag chỉ tới: tuyến Varia 19/09, bữa tối Vindice 22/09, luật nguyên tố đi săn 20/09.
3. **Các việc lớn về sau rơi xuống quan hệ đã có cảnh.** Tin Cradle là tin về một người cậu đã giảng hoà. Arcobaleno được giải nguyền là những gương mặt người đọc đã thấy. Hai vị khách năm 18 là chỗ hai tuyến chạy song song mười một năm cuối cùng cắt nhau.
4. **Giọng có sẵn động cơ.** Sáu lượt khách là sáu lần cậu gây rối và sáu lần người lớn đau đầu: khớp dòng Tông *I Have a Headache.* và chữ *tự tin và gây rối* của Aurel.
5. **Người ở Namimori có việc trong Brat.** Cả 14 người có ít nhất một việc gắn sự kiện.
6. **Đáp lời chê 25/09:** sự kiện có người có mặt, không tới bằng giấy tờ.

**Mất, và chỗ yếu:**

1. **Chỗ yếu nhất: Brat thành cuộc diễu hành.** 7 trên 13 sự kiện là "một nhóm khách lên trang". Điều [[truc-chinh]] cấm là arc thiết kế như *gạch được bao nhiêu tên*; hướng A sát thứ đó nhất trong ba hướng. Thứ duy nhất chống lại là xương sống bốn mục, và nó phải cầm nhịp chứ không phải danh sách khách.
2. **Bằng chứng ngược ngay trong khối tag.** Xanxus và Fon chỉ có ở `Relationships`, không có ở `Characters`. Đọc chặt như chính quyết định 19/09 đọc, đây là dấu hiệu tác giả có thể không định cho hai người ấy lên trang trong Brat. Hướng A đi ngược chi tiết này ở đúng hai nhóm.
3. **Reborn chỉ đạt nửa.** Ông lên trang, quan hệ thì không (mục 2).
4. **Tiêu sớm.** Lần đầu của Xanxus, Fon, Bermuda, Mukuro đều nằm trong Brat. Teen và Young Adult không còn gương mặt mới, và Teen dễ đọc như phần trả nợ.
5. **Bốn arc sau trống người nhà.** 54 trên 100 ô điểm danh trống, dồn vào bốn cột sau. Hướng A chữa *quên nhân vật* ở Brat rồi để nguyên vấn đề ấy cho bốn arc còn lại.
6. **Gánh giữ bí mật nặng nhất.** Sáu mức biết lệch nhau phải được giữ đúng suốt chín năm truyện sau đó; một ô `known_by` sai là một lỗ.
7. **Rủi ro viết Tsuna cho ngầu.** Một đứa bảy tám tuổi đứng trước Xanxus, Bermuda, Fon, Mammon trong cùng một arc.
8. **Dài.** Brat sàn ~49.400 từ, cả truyện sàn ~140.600 từ; khung cũ ghi ~121.600.
9. **Nhiều việc chờ Aurel nhất trước khi viết được chữ nào:** năm câu hỏi cần phương án cụ thể, hai câu lên sớm, 15 việc mới đứng trước khung riêng arc Brat hoặc sớm hơn.

So với hướng B, hướng A đổi chiều sâu về sau lấy mặt người ngay bây giờ. So với hướng C, hướng A giữ được lịch tuổi và tên arc Aurel đã quen, nhưng để mẫu hình "lỏng dần" làm hàng phụ thay vì làm trục.
