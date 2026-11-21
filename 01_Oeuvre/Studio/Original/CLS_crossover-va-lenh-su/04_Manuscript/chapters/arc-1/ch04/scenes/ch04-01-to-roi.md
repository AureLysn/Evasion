---
id: scene.CLS.ch04-01-to-roi
type: scene
scope: project
lane: personal
project: CLS
arc: dan-y-arc-1-jason-v5-cls
chapter: 4
pov: character.CLS.jason-todd
characters: ["character.CLS.jason-todd", "character.ashveil", "Kuchiba", "người tuyển của Hội (募新人员)", "hội viên phát tờ rơi", "Stelle (trên phim)", "March 7th (trên phim)"]
location: "văn phòng 不死途侦探事务所 (sáng) → bên kia đường trước một 宣讲会场 của 幸福微笑研究会 gần 鸽川"
required_hooks: []
forbidden_secrets: [secret.CLS.nguoi-do-la-tsuna, secret.CLS.giong-khong-ten-la-dazai, secret.CLS.jason-da-chet-va-song-lai]
foreshadow: []
target_words: 1400
target_unit: han_chars
target_dialogue_ratio: "chua dat — do tu ch1 sau khi Aurel chinh (giong-van-pho-thong-khong-nhai-ai)"
target_paragraph_mean: "chua dat — do tu ch1 sau khi Aurel chinh (giong-van-pho-thong-khong-nhai-ai)"
target_sentence_median: "chua dat — do tu ch1 sau khi Aurel chinh (giong-van-pho-thong-khong-nhai-ai)"
canon_layer: planned
status: planned
aliases: ["canh 4-01 CLS", "Tờ rơi ch4 CLS"]
related: ["[[ch04-plan]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-1/ch04/ch04-zh-bang-ten|ch04-zh-bang-ten]]"]
source:
  type: inference
  ref: "plan-continuation 04/10/2026 — the canh theo dan y arc 1 ban 5; da qua plan-reviewer luot 3 va sua; chua duoc Aurel duyet. BAN 2 17/10/2026 (tieng Trung, chu Han; B8; D4; muc tieu/doi khang/ket cuc/gia tri) theo khuon ch03; canon bo sung tu TextMap cn 17/10; sua theo review-plan luot 1 (H1, M5, M6, L3, L4) cung ngay"
authority: ai
confidence: 0.5
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-17
---

# Cảnh 4.01 — Tờ rơi · Phim · kể từ trong Jason · ~1.400 chữ Hán

> `forbidden_secrets` ở cấp cảnh thắng mọi thứ khác, kể cả khi POV thật ra có biết: nguoi-do-la-tsuna · giong-khong-ten-la-dazai · [[jason-da-chet-va-song-lai]].
>
> **Góc kể:** Ngôi ba hạn định trong **Jason**, **chỉ hiện tại**: không hồi ức, không so sánh với nơi nào khác, không nghĩ tới tên ai ngoài người đang ở trong cảnh. Cảnh này **không chạm** bí mật nào nên được kể từ trong — arc-1-chot-sau-plan-reviewer dòng 2. **Riêng:** Stelle trên phim có mặt — Jason **không** nghĩ vì sao cô biết hắn; Stelle **không** gọi hắn bằng biệt danh nào; hắn đứng xa, chỉ phản ứng bằng hành động ở hiện tại.

## Mục đích cảnh

Hội nhìn từ ngoài vào: tử tế, sạch, miễn phí, không ai mệt. Jason không tìm được chỗ nào để ghét. Và màn cải trang của ông chủ hỏng — vì một cô gái cầm gậy bóng chày nhận ra cái ria mép vẽ.

> **Bản 2 (17/10/2026, đề xuất; sửa theo review-plan cùng ngày):** tiếng Trung. **Ai thấy mặt ai (H1):** ở ch03 Fulwish đã thấy mặt Kuchiba và Jason; hội viên ở rạp hát cũ đã bị Jason đánh, Kuchiba còng. Vì vậy: **Kuchiba** quay lại rạp hát **công khai** làm việc của 治安官; **Ashveil cải trang** — mượn bộ đồ của con khỉ ở ch02 (软呢帽 sụp tới mày, 八字胡 vẽ bằng bút lông — [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-1/ch02/ch02-chapter|ch02-chapter]] dòng 70) — vào **một 宣讲会场 khác gần 鸽川**; **Jason đứng bên kia đường**, không vào, không để hội viên nhìn rõ mặt. **Mở bằng phim** (ch03 kết bằng phòng). **Xen phòng (B8), ba nhịp, đều kể từ Boothill:** (a) **sớm**, trong ~500 chữ đầu, một hai câu — khi Ashveil hiện lên trong bộ cải trang: phòng nhận ra cái ria mép của con khỉ, và/hoặc Đoàn tàu nhận ra 宣讲会场 này (họ từng tới); (b) khi **Stelle trên phim** làm lộ thám tử — **Stelle phòng nhớ** mình đã làm đúng thế **[canon phía xem]**, hơi xấu hổ hoặc tự hào; March nhắc ch03: lần trước gặp người mời vào Hội thì hai người **chạy**, lần này **tự chen vào**; Himeko hoặc Welt kéo lại; (c) khi hội viên nói 「阿哈在对我们说话」 — **một câu đùa** (March), xong. **Không** nhắc Nihilux. Mỗi khối phim ≤ ~700; **khối phim cuối ≤ ~350** vì nối liền khối đầu của 4.02. Khi kiểm: chạy `pov_leak_check` thêm một lần `--pov character.boothill`. **D4:** người tuyển và **các hội viên khác** ở 宣讲会场 tả trước — quần áo thường, huy hiệu mặt cười, nụ cười cùng kiểu và cùng nhịp như ch03 — không tên.

- **Mục tiêu** (Ashveil): trà trộn vào Hội như một người khổ muốn được giúp. (Jason): đứng ngoài, nhìn, và hiểu cái 「小手术」 kia là gì.
- **Đối kháng:** người tuyển tử tế tới mức không có kẽ hở; rồi Stelle trên phim tò mò chen vào và nhận ra ria mép vẽ **[canon: nhân vật người chơi làm hỏng]**.
- **Kết cục:** không — cải trang lộ; nhưng có **tờ rơi** (画着笑脸的宣传单) và tên buổi 宣讲会 tối nay **[canon]**. Jason hỏi một câu thẳng và nhận về một nụ cười thật lòng.
- **Giá trị đầu → cuối:** (Jason) một hội từ thiện tử tế → không có chỗ nào để ghét, và đó là chỗ khó chịu.

## Diễn biến

1. Sáng. Jason gõ nắp 冰柜; Ashveil cằn nhằn, ngồi dậy **[đề xuất]**. Kuchiba ghé qua: cô sẽ quay lại rạp hát với tư cách 治安官 — đám người còng đêm qua cần hỏi tiếp. Cô đưa một danh sách: người trẻ của 共愿帮 bỏ sang Hội — Ashveil nói 恶水 từng kể chuyện ấy **[canon: lời Caustide; ở CLS nối với cuộc gọi của 恶水 cuối ch01]**. Jason chép mấy cái tên vào **cuốn sổ bìa xanh** (ch02). Ashveil lôi bộ đồ của con khỉ ra.
2. Trước một 宣讲会场 khác gần 鸽川. Ashveil — mũ sụp, ria mép vẽ — tới bàn của người tuyển, đóng vai người khổ. → **nhịp phòng (a)** ngay khi bộ cải trang hiện lên. Jason đứng bên kia đường, cạnh một sạp báo.
3. Người tuyển nói: Hội tiền thân là hội tương trợ của nạn nhân vụ 告死魔; mọi dịch vụ **miễn phí**; muốn thành hội viên chính thức thì làm một 「小手术」 — 幸福手术 **[canon]**.
4. **Stelle trên phim** và March đi ngang, tò mò chen vào hỏi; Stelle nhìn kỹ ông 「người khổ」, chỉ vào ria mép — vai diễn của Ashveil hỏng **[canon]**. Cô cầm tờ rơi đi **[canon: 「得到幸研会的宣传单」]**. Cô **không** thấy Jason bên kia đường. → **nhịp phòng (b)**.
5. Ashveil rút ra, không vội. Hai hội viên phát tờ rơi bước tới cả Jason ở bên kia đường — họ chưa từng thấy mặt hắn. Họ nói **阿哈 đang nói chuyện với họ**; ai không nghe thấy là **chưa đủ hạnh phúc** **[canon]**. → **nhịp phòng (c)**.
6. Jason hỏi thẳng một người: cái 「小手术」 ấy **cắt đi cái gì**. Người ấy cười, không trả lời — và **thật lòng** không thấy câu hỏi có gì lạ. Ashveil, đã gỡ ria mép, gọi Jason đi: tối nay còn một buổi 宣讲会. *(Khối phim cuối ≤ ~350.)*

## Kết cảnh phải đạt được gì

Có một ca 「phẫu thuật」, là cửa vào Hội, miễn phí. Không ai trên phim biết nó cấy gì. Trong sổ của Jason có mấy cái tên. Tối nay có một buổi 宣讲会.

## Chỉ cho người viết — không bao giờ thành suy nghĩ của POV

- Bản chất *(cấy máu thịt 倏忽 — Tà Vật 丰饶)* **chưa lộ** trên phim — canon: Ashveil chỉ tra ra ở chặng Star Rail FES. Lời kể trên phim **cấm** nhắc 丰饶. Phòng nói chữ ấy ở 4.05, không sớm hơn.
- Jason không tìm được chỗ để ghét là có chủ ý: ch6 hắn sẽ không coi họ là quái vật.
- Stelle làm lộ màn cải trang là **canon** — không hạ trí Ashveil (rào trope A): bộ đồ là đồ của khỉ, hắn biết nó tệ và vẫn mặc; Stelle lộ nó vì **cô là Stelle**.
- Tên trong sổ của Jason dẫn sang 4.04 — đừng nói trước là hắn sẽ đi tìm ai.
- Nhịp phòng (b) phản ứng với **điều Stelle nhớ** (cô đã làm lộ thám tử), **không** với việc Jason có hay không có trong trí nhớ ấy (B7).

## Dữ kiện — nguồn

- TextMap cn 17/10: 「不死途与幸研会的募新人员交谈，得知一场宣讲会即将进行。你好奇地加入谈话，得到幸研会的宣传单。」 · 「画着笑脸的宣传单」 · 「幸研会成员声称阿哈在对自己说话。如果不死途和朽叶听不见，一定是因为还不够幸福。」 · 「这是…正式入会成员接受的小手术。他们管这个叫「幸福手术」。」 · 「前身为告死魔事件受害者互助会」 · 「我们在鸽川附近设有宣讲会场…所有的服务全都是免费的。」 *(chỉ để diễn ý — B1, không chép)*.
- [[Ashveil]] lượt đọc 6 — trà trộn, nhân viên tuyển dụng, tờ rơi, lời Caustide.
- [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-1/ch02/ch02-chapter|ch02-chapter]] dòng 70 (bộ đồ cải trang của con khỉ) · [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-1/ch03/ch03-chapter|ch03-chapter]] dòng 66–74 (Stelle, March chạy khỏi người mời), 106, 122, 194–238, 304 (ai đã thấy mặt ai).
