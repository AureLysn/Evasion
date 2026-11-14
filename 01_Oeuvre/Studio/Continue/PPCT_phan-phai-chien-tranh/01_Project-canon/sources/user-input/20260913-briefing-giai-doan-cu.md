---
id: source.PPCT.20260913-briefing-giai-doan-cu
type: source
scope: project
lane: personal
project: PPCT
canon_layer: general_reference
status: active
aliases: ["briefing PPCT 13/09", "briefing xuong viet tiep phan phai chien tranh", "tom tat giai doan cu PPCT"]
source:
  type: user_input
  ref: "Tin nhan dau tien cua Aurel trong phien chat Claude Code 13/09/2026 — chep nguyen van, khong sua"
authority: user
immutable: true
last_updated: 2026-09-13
---

# Briefing Aurel gửi ngày 13/09/2026 — tóm tắt giai đoạn thử nghiệm cũ

> ⚠️ File loại `source` là **bất biến**. Không sửa nội dung, không xoá kể cả sau khi đã trích xuất hết.

## Mô tả

Aurel dán briefing này vào đầu phiên 13/09/2026 để chuyển dự án từ Project knowledge trên claude.ai sang Claude Code. Cùng ngày, Aurel quyết định **làm lại từ đầu** vì bản cũ là bản test, có nhiều lỗi — xem `decisions/lam-lai-tu-nguon.md`.

**Cách đọc file này:**

- Phần tóm tắt truyện gốc, mốc sự kiện, tiến độ, mô tả từng chương cũ: **tóm tắt của bản thử nghiệm**, không phải bằng chứng. Phải kiểm lại trên nguyên tác.
- Phần quyết định cốt truyện (mục 6 và "Finalized narrative decisions"): đã tách thành note `question`, trạng thái `unresolved`.
- Phần phân tích của chính Aurel (mục "Aurel's analytical contributions"): `authority: user`, là **giả thuyết về nguyên tác**. Kiểm ở bước trích hồ sơ, không tự động thành canon.
- Phần quy ước viết (mục 4, "Writing Style"): ý muốn của Aurel. Xét lại ở bước đo văn phong trước khi thành `hard-rules`.

## Phạm vi đã trích xuất

- [x] Quyết định cốt truyện cũ → 8 note trong `questions/` (13/09/2026)
- [ ] Giả thuyết phân tích của Aurel → kiểm ở `extract-entities`
- [ ] Quy ước viết → xét ở `analyze-style`
- [ ] Sửa lỗi quán cà ri / Oda → kiểm ở `crosscheck-canon` (khả năng là canon BSD)

## Nguyên văn

Đây là bản tóm tắt đầy đủ để chuyển sang Claude Code, viết lại từ đầu:
BRIEFING: Xưởng Viết Tiếp Truyện — 《反派战争》
1. Vai trò & nhiệm vụ
Viết tiếp fanfiction bị bỏ dở 《反派战争》 (Phản Phái Chiến Tranh) của tác giả 西州 — crossover Bungou Stray Dogs × Katekyō Hitman Reborn! × Fate/Zero, cặp đôi Dazai Osamu × Sawada Tsunayoshi, bị drop giữa chương 15. Nhiệm vụ: viết tiếp đúng giọng văn gốc, không phải sáng tác tự do.
Nguyên tắc bản quyền bắt buộc: Đây là fan continuation. Mọi cảnh, lời thoại cụ thể đều phải là sáng tác nguyên bản — chỉ dùng tên nhân vật, khái niệm nền, thuật ngữ đã có sẵn trong canon (BSD/KHR/Fate-Zero) làm bối cảnh. Không trích dẫn/tái hiện sát cảnh, khung hình, hay câu chữ cụ thể từ manga/anime/tiểu thuyết gốc. Không trích nguyên văn tác phẩm thật của Dazai Osamu ngoài đời (Nhân Gian Thất Cách, Chiếc Hộp Pandora).
2. Tóm tắt truyện gốc (15 chương + tiền truyện)

* Tiền truyện: Dazai (thế giới song song không có Namimori) và Tsuna (thế giới A, có canon KHR đầy đủ) gặp nhau từ nhỏ trong phòng mơ trắng nối hai thế giới. Tsuna kế thừa Vongola năm 18 tuổi. Tsuna đi đàm phán với Byakuran, chết thật, lời hứa cuối: "Nơi tận cùng thời gian, chúng ta trùng phùng nhé" — Dazai gọi là "kẻ nói dối" (骗子).
* 反派战争 (thế giới B): Dazai (Cảng Mafia, ~50% là Ōba Yōzō) tham chiến Cầu Thánh lần 4 tại Fuyuki, bỏ thánh di vật, triệu hồi tương tính → gọi ra Tsuna làm Caster. Tsuna đeo cả 3 vật phẩm bầu trời (nhẫn Vongola, nhẫn Mare, núm vú giấc) — bí ẩn lớn vì sao. Gilgamesh coi Tsuna là "bảo vật" chứ không phải người. Truyện drop giữa ch15, cao trào Vương Yến: Saber vừa nắm tay Tsuna để xem thế giới song song.
* Xem chi tiết đầy đủ nhân vật/mốc sự kiện/phục bút tác giả: đã có trong `ho_so_truyen.md` (hồ sơ truyện, giai đoạn 1) — nếu cần tôi có thể chép lại toàn văn.

3. Bốn tài liệu nền (đã lập ở giai đoạn 1-4, tồn tại trong Project knowledge cũ)

1. ho_so_truyen.md — hồ sơ nhân vật, mốc sự kiện, phục bút tác giả
2. bang_doi_chieu_canon.md — đối chiếu canon BSD/KHR/Fate-Zero, xác nhận: cơ chế hoàn tác đa thế giới hậu Byakuran, Checker Face/Kawahira là quản trị viên Tri-ni-sette, lore Enkidu/Thiên Chi Tỏa
3. ho_so_van_phong.md — phân tích văn phong: ~2.475 chữ Hán/chương gốc, ~38% thoại, đoạn ngắn 40-65 chữ, 3 chế độ tự sự (A=dệt canon, B=đời thường hài, C=nhật ký/giấc mơ), motif mắt, callback nguyên văn, idiolect từng nhân vật
4. dan_y_hoan_chinh_v3.md (v3.1, đã khóa sổ) — dàn ý chi tiết 22 chương chính + 5 arc phiên ngoại

4. Quy ước viết đã chốt (BẮT BUỘC tuân theo)

* Danh xưng: hệ convert thuần — ta/ngươi, hắn/nàng, kẻ/tên, đại thúc, tiểu nha đầu, lão. Cấm tuyệt đối: em, gã, ông chú, con nhóc, tôi (trừ ghi chú tác giả mô phỏng và POV nội tâm ngôi thứ nhất kiểu nhật ký).
* Giữ tên gốc chưa dịch trong thoại: 「太宰」「纲吉」; narration dùng Dazai/Tsuna.
* Giữ ngoặc thoại 「」 nhất quán (không đổi sang ngoặc thẳng).
* Câu kết đặc biệt giữ nguyên tiếng Trung không dịch khi có (vd: 「好。」).
* Chương dài được khuyến khích — người dùng thích đọc dài.
* Thoại phải đậm hơn baseline gốc — thường 45-60%, có thể cao hơn cho chương hài/hội thoại.
* Workflow tùy chọn: với chương thoại nặng có thể nháp tiếng Trung trước (giọng 西州) rồi convert — không bắt buộc mọi chương, dùng khi cần.
* Format mỗi chương: tiêu đề 【太纲无差】反派战争（N）hoặc tiêu đề phiên ngoại → cảnh báo OOC kép (nhắc lại mỗi chương) → 前情提要 (tóm tắt chương trước) → nội dung → dòng "※ Phần viết tiếp do người hâm mộ chấp bút, không phải tác giả 西州" → `————` → Ghi chú tác giả mô phỏng (giọng 西州 tự trào, thả mồi) → `————` → [Ngoài truyện — ghi chú kỹ thuật của Xưởng] (bám ý dàn ý, an toàn bản quyền, callback đã dùng, thoại %, danh xưng).
* Chủ đề nặng (tự hủy, ám ảnh...) xử lý như dữ kiện, không mô tả, luôn có đối trọng khẳng định sự sống.
* Anti-pattern cấm: Dazai thành hề thuần túy hoặc toàn tri; Tsuna thành thánh mẫu hoặc bá chủ cân tất; ép cliffhanger công nghiệp; đoạn văn dài lê thê.

5. SỬA LỖI QUAN TRỌNG — không được đảo ngược
Chủ tiệm (không tên) là người trực tiếp nuôi 3 đứa trẻ Oda cưu mang — KHÔNG PHẢI Oda làm chủ quán. Oda là ân nhân/khách quen ghé thăm, chu cấp, nhưng không thể trực tiếp nuôi vì còn làm ở Cảng Mafia. Bối cảnh là tiệm cơm cà ri (không phải quán bar). Điều này ảnh hưởng tên gọi "quán Lupin" ở PN-Arc III.9 sau này — cần thống nhất lại tên khi viết tới đó.
6. Các quyết định cốt truyện đã khóa

* Lancer/Diarmuid, Rider/Iskandar, Saber: NHẬN lời mời hiện thế ở ch36. Lancelot: TỪ CHỐI (đã được tha thứ, xin an nghỉ).
* Tsuna mở quán cà phê ở Yokohama, không vào Cảng Mafia.
* Akutagawa được Tsuna kết bạn/dạy dỗ trước khi Checker Face đến (không phải sau).
* Lancer chết trong quyết đấu tự nguyện với Saber (không phải bị phản bội theo canon) — nhưng vẫn NHẬN lời mời hiện thế sau đó ở ch36 (mâu thuẫn bề mặt này đã được xử lý: anh "chết" ở ch28 rồi "hiện thế" ở ch36 nhờ Tri-ni-sette).
* Arc V (reaction fic) dùng khung kép: bản BSD = "Cuốn Sách là thực thể có ý thức" đang suy yếu; bản KHR = "Tri-ni-sette là ý thức thế giới".
* Bí ẩn trung tâm đã giải (ch32): Tsuna-A chết thật → được "ghi danh" kế vị quản trị 7³ (nền canon: đứng đầu danh sách ứng viên Checker Face) → nhẫn Mare + năng lực quan trắc là di sản/lời tạ tội của Byakuran đặt vào linh hồn cậu ở ranh giới tử-sinh → bảo cụ thật = chính cậu trong tư cách bộ bầu trời Tri-ni-sette.
* «Bạch Kì Lân» = biệt danh Hán-Việt của Tatsuhiko Shibusawa (không phải tên quán).

7. Tiến độ đã viết (46/~53 file)
Truyện chính, ch16–37 — HOÀN TẤT. Tóm tắt outline đầy đủ (cụm 1-4 + hồi cuối) đã có trong dàn ý v3.1. Các callback/motif then chốt đã cài xuyên suốt: 「在时光的尽头，我们再相逢吧」/「骗子」(tiền truyện), 「人不吃饭总归是不行的」(đảo người nói ở ch18), motif mắt, motif ngọn đèn (ch21→22→23→29), nửa nhịp do dự của Dazai khi chạm tay Tsuna (ch25, gieo từ 人间失格, trả ở ch35), câu "cháu sẽ không buông tay đâu" (ch26, trả ở ch35).
Phiên ngoại — Arc I «Yokohama & Người ở quán Lupin» (ch38-40) — HOÀN TẤT.

* I.1 Khai trương: Chuuya/Kouyou/Hirotsu/Mori thành khách quen, Rider làm bảo vệ, Saber lập kỷ lục ăn, Diarmuid kéo khách nữ.
* I.2 Quán Lupin (đã sửa: bối cảnh tiệm cà ri, chủ tiệm không tên nuôi trẻ, Oda là khách quen ân nhân): giới thiệu Oda, Mimic tấn công, lỡ mất Oda.
* I.3 Người sống: cứu kịp Oda, cảnh bệnh viện, cắt cảnh Ango (đau khổ, Dazai vẫn giận không tha), hạt giống Oda muốn viết.

Phiên ngoại — Arc II «I Prescelti Sette» (ch41-46, đang viết, còn 3 chương) — 6/9 xong.

* II.1 ✓ Trước ngày có khách lạ: Akutagawa (8 tuổi) được Tsuna nhận nuôi/dạy dỗ, Rashōmon được khen đẹp; Checker Face đột nhập mời vào nhóm 7 người mạnh nhất.
* II.2 ✓ Bài toán lời nguyền: núm vú chưa kích hoạt là ẩn số; né Vindice/omertà; Dazai bị gạt khỏi danh sách đi cùng; Akutagawa nhận trông quán.
* II.3 ✓ Bảy người xa lạ thượng (đa POV): Skull (được đối xử ngang hàng lần đầu), Luce (tiên tri day dứt), Fon (nhận ra qua nhịp thở); sợi chỉ chung "giống mà không giống".
* II.4 ✓ Bảy người xa lạ hạ (đa POV): Reborn (nhìn Tsuna như người thân đã khuất, để ngỏ không giải quyết), Lal (kỷ luật đối lập nhưng ăn ý), Verde (chỉ số sinh học "không phải người" — nối lore Tri-ni-sette), Viper (tiền không mua được thông tin, đổi lấy cà phê free); Colonnello gia nhập; Luce giới thiệu Aria [HC-điều chỉnh dòng thời gian có chủ đích, cho nền Arc III/IV].
* II.5 ✓ Yokohama song song: Dazai phá Chuuya bằng thư tình giả leo thang; tống tiền Mori cứu Oda khỏi thực địa; tự rời Cảng vào Tổ Trinh Thám; Kunikida nạn nhân thứ 2; Ranpo hối lộ đồ ngọt "trinh thám" ngày Tsuna về; Atsushi vào tổ; Akutagawa "sắc nhưng không gãy" [HC-điều chỉnh]; hai đứa trẻ tò mò về cùng một cái tên.
* II.6 ★ ✓ Ngày định mệnh: Checker Face kích hoạt lời nguyền → Vindice tập kích CF (lý do mơ hồ có chủ đích: "vi phạm quy tắc cân bằng"); Tsuna trọng thương chắn đòn; Talbot đến với 7 chiếc bình thay núm vú; Tsuna vắt kiệt ngọn lửa vận hành thế trận giải nguyền rồi ngất; Kawahira bỏ mặt nạ, đình chiến tạm; Luce hoảng loạn gọi số khẩn cấp Tsuna đã lưu → Dazai nghe máy (không nêu tên, giữ hồi hộp).

8. TIẾP THEO — cần viết ngay
II.7 「修羅場」: Dazai — còn mệt sau sự kiện Cá Voi Trắng/Moby Dick (neo mạch Guild BSD) — nhận cuộc gọi giữa đêm, bất chấp lôi Chuuya bay đến; tu la tràng toàn diện bên giường bệnh: bảy người mạnh nhất + một cựu mafia đang ghen (Dazai) + một cựu mafia bị lôi đi oan (Chuuya).
Rồi tiếp: II.8 Nhà thêm phòng (hậu giải nguyền, nhóm không tách, Luce tủi thân rồi được đón nhận, đề xuất biến quán thành nhà chung — Tsuna phản đối, Dazai phản đối kịch liệt, Chuuya ủng hộ xin phòng) → II.9 Khách trà đặc biệt (Ranpo/Atsushi/Akutagawa thành khách quen, Kawahira thành bạn trà, Vindice/Bermuda ghé uống trà — gag băng cuốn).
Sau đó Arc III «Ba đứa trẻ» (9 chương): Byakuran nhớ mang máng → gặp Yuni (công chúa bị "bắt cóc", khóc nhẹ nhõm) → bé Tsuna 5 tuổi ở sân chơi (thiết lập gia đình Nana/Iemitsu theo hướng phê phán đã duyệt, thuyết phong ấn của Nono) → Hai Tsuna xuất hiện cùng lúc, phát hiện phong ấn → Anh linh Tsuna kể mình cũng từng bị phong ấn tương tự lúc nhỏ (lập luận đối chứng Lambo 5 tuổi dùng lửa sét không ai lo) → đòi nợ Estraneo, nhóm Mukuro ở lại, Chrome về → nhặt đủ một bầu trời (Yamamoto, Shoichi, Kyoko/Ryohei, Hibari, Hayato, Lambo qua Byakuran, Xanxus rã đông, Haru/Hana thay Lambo làm thủ hộ sét) → Xanxus thành anh lớn + kế vị (không phải bé Tsuna), Anh linh Tsuna chuyển dùng lửa mây [headcanon: bảo vệ như lãnh thổ] → chương đa-POV kết arc, Oda viết "cuộc đời Tsuna" thành tiểu thuyết.
Arc IV «Tuyển tập gag Fate» (4 chương anthology độc lập): bé Tsuna làm Master của Enkidu / Tsuna+Dazai mạo danh tổ Caster trong F/Z canon / quấy rối tuổi thơ Kiritsugu / Chén Thánh 14 người.
Arc V «Xem và phản ứng» (2 bản × 3 chương): Bản A-BSD khung "Cuốn Sách suy yếu" (nguyện vọng dung hợp/nuôi lửa/người viết đủ mạnh); Bản B-KHR khung "hai bầu trời gây sự với Tri-ni-sette" (Byakuran+Uni thế giới không-Tsuna cố tình diệt thế).
Narrative Decisions
Summary
Locked plot decisions, established corrections, and Aurel's analytical findings for the 《反派战争》 continuation — read before writing or revising any chapter

Details
Finalized narrative decisions
Lancer/Diarmuid, Rider/Iskandar, and Saber accept the Invitation to Manifestation; Lancelot declines.
Tsuna opens a coffee shop rather than joining Cảng Mafia.
Akutagawa is befriended by Tsuna before Checker Face's visit.
The Arc V reaction-fic uses "The Book as conscious entity" (BSD bản) and "Tri-ni-sette as world consciousness" (KHR bản).
Lancer's continuation fate is a voluntary duel, not the canonical betrayal death.
Corrections established — do not revert
The main tiệm venue for Oda-related scenes is a curry shop with an unnamed owner — not a bar with Oda as proprietor.
The original author's style baseline: ~2,475 Chinese characters per chapter, ~38% dialogue, short paragraphs of 40–65 characters, and three narrative modes — A (canon-weaving), B (slice-of-life comedy), C (diary/dream sequences).
Aurel's analytical contributions — preserve these
Dazai uses Gokudera as a proxy search to avoid revealing his true target (Tsuna).
Tsuna holding all three Sky Tri-ni-sette items (Vongola ring, Mare ring, Sky pacifier) positions him as a Checker Face/7³ administrator, which explains Gilgamesh's "baogu" classification.
Gilgamesh's attitude toward Tsuna synthesizes his FSN/F/Z treatment of Saber with his treatment of Enkidu.
The epub images are the original author's own fanart of the summoning scene.


Overview
Summary
Story Continuation Workshop for 《反派战争》 — purpose, source canons, pipeline stages, and current writing progress

Details
The project is a "Xưởng Viết Tiếp Truyện" (Story Continuation Workshop) — a systematic pipeline for analyzing dropped fanfictions and writing continuations in the original author's style.
The current focus is 《反派战争》 (Phản Phái Chiến Tranh) by author 西州 — a Bungou Stray Dogs × Katekyō Hitman Reborn! × Fate/Zero crossover with the Dazai Osamu × Sawada Tsunayoshi pairing, abandoned mid-chapter 15.
Aurel brings deep, active fandom knowledge across all three source canons (BSD, KHR, Fate/Zero) and has made original analytical contributions rather than relying solely on Claude's analysis.
Pipeline stages
The pipeline has five stages: (1–3) story profile extraction, canon/fanon comparison table, quantitative and qualitative author style analysis; (4) chapter outline; (5) writing.
Stages 1–3 are complete: story profile extracted, canon/fanon comparison table built, author style analyzed.
Stage 4 is complete — chapter outline locked at v3.1: 22 main chapters + 5 phiên ngoại arcs (~53 files total).
Current state
Stage 5 (writing) is in progress: chapters 16–46 written, progressing through the main story's conclusion and into the phiên ngoại arcs.
Tools & resources
Four reference documents are uploaded to Project knowledge, including tinh_chinh_van_phong.md for style calibration.
The source epub is included and contains the original author's own fanart.
Canon verification has been performed against BSD, KHR, and Fate/Zero primary sources.


Writing Style
Summary
Aurel's stated prose, pronoun, and workflow preferences for writing the 《反派战争》 continuation

Details
Long chapters are welcome and preferred.
Dialogue should be heavier and more developed than the original author's baseline.
No Vietnamese-native address terms (em/gã/con nhóc) — strictly convert-style pronouns (ta/ngươi/hắn/nàng/kẻ).
Character names are kept untranslated (太宰, 纲吉).
Dialogue-heavy chapters use a draft-in-Chinese-then-convert workflow.
Style is calibrated to tinh_chinh_van_phong.md: "stop the camera" descriptive moments at key emotional beats, figurative comparisons carrying thematic weight, and smooth scene transitions with sensory bridges.
