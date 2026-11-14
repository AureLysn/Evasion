---
id: arc.EMB.khung-soat-tong-ket
type: arc
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-10-13
archived_note: "Soat khung-nam-arc 01/10/2026; khung da superseded (emb-chot-dung-lai-khung), ket luan nam trong emb-chot-dung-lai-khung va emb-chot-goc-khung-moi. Chuyen vao luu tru 13/10/2026."
aliases: ["tong ket soat khung nam arc", "soat khung 01/10 tong ket", "viec can Aurel quyet truoc khi sua khung"]
related: ["[[khung-nam-arc]]", "[[khung-soat-giong]]", "[[khung-soat-diem-danh]]", "[[khung-soat-hieu-luc]]", "[[emb-lam-lai-lan-ba]]", "[[20261001-soat-nen-du-kien]]"]
source:
  type: inference
  ref: "plan-continuation Mode 3, 01/10/2026, summarizer: doc ba file de xuat va hai ban review (plan-reviewer, continuity-reviewer). Khong sua gi."
authority: ai
confidence: 0.7
always_load: false
load_for: [planner]
tags: [d/fanfic, arc, proposal, k/note, p/personal]
last_updated: 2026-10-13
---

# Tổng kết soát khung năm arc, 01/10/2026

> **Chưa sẵn sàng đưa Aurel duyệt.** Còn 3 finding `high` (2 của plan-reviewer, 1 của continuity-reviewer) và 3 hàng checklist `missing`. Note này chỉ tổng hợp, không sửa khung, không chọn hộ Aurel, không mở note `question`.
>
> Lượt này: **3 worker (`planner`) · 2 reviewer · 1 summarizer**. Hai reviewer ghi báo cáo bằng đường dẫn thường, ngoài vault: `review-plan.md` và `review-continuity.md` trong thư mục nháp của phiên (`C:\Users\AureLyns\AppData\Local\Temp\claude\...\scratchpad\`). Mã dưới đây: `plan` = plan-reviewer, `cont` = continuity-reviewer; hàng của khung viết "hàng B6", "hàng T9" để khỏi nhầm với mã review.

## 1. Ba worker làm gì

Số từ: **không đo được** (không có công cụ đếm từ). Số dòng không rỗng: giong 193 · điểm danh 237 · hiệu lực 403.

| Worker | File | Phát hiện chính |
|---|---|---|
| 1 · GIỌNG | [[khung-soat-giong]] | (1) khung có 0 chữ về giọng. (2) Cái lệch là **mất tầng đùa**: dấu chỉ đùa 18,3 / 10.000 từ ở nguyên tác, 5,6 ở tám chương đã lưu trữ; chữ nặng 27,6 so với 21,3, nên cổng phải là sàn, không phải trần chữ buồn. (3) Năm dòng Tông của Aurel không dòng nào đẩy về buồn; phần đẩy nằm ở hàng Xả (4/4) và Bóng Decimo (4/5) do AI dựng 17/09. (4) Tám hàng, mỗi hàng ba đường; bốn điểm hai lời Aurel kéo ngược. (5) Năm phép kiểm K1–K5. |
| 2 · ĐIỂM DANH | [[khung-soat-diem-danh]] | (1) Musashi, Maro, Ayame, Kazuki, Mukuro: 0/5 arc; Musashi 129 lần ở nguyên tác, 0 ở khung. (2) Bảng 55 ô: 8 ✅ · 13 🟡 · 2 ⏸ · 32 ⬜. (3) Bảng điểm danh cho mỗi dàn ý chương, hai ngưỡng A/B chưa chọn. (4) Chín câu chưa có note `question`. (5) Chín nhóm nhân vật đang kẹt ở câu hỏi mở. |
| 3 · HIỆU LỰC | [[khung-soat-hieu-luc]] | (1) 107 hàng: 76 đứng · 14 lệch · 9 phải lột · 8 chờ câu hỏi. (2) L1: [[emb-chot-tag-theo-arc]] (`locked`) chưa được khung chép vào. (3) L2: Arc 3 Child không còn bản sống. (4) L4: khung thiếu mốc "Sky của Namimori / just wing it", và có mệnh đề "tự chặn" mà nguồn không có. (5) Dòng Cộng ghi 32 sự kiện, năm hàng cộng ra 37; hook phủ 15/18. |

## 2. Finding của hai reviewer

Gộp: plan 21 mã (2 high) + cont 22 mã (1 high) = 43; năm cặp trùng gộp thành một dòng, còn **38 dòng**. Chín dòng "chỗ lệch giữa ba file" của plan nằm ở mục 3. "Ở đâu": **3 file** = lỗi trong văn bản ba note; **vault** = lỗi có sẵn mà ba file chưa báo (hoặc báo thiếu).

### High

| Mã | Ở đâu | Vấn đề |
|---|---|---|
| plan H1 | 3 file | Không có note `question` nào cho ít nhất 18 việc chưa quyết (L1–L4, câu Fon, chín câu điểm danh, bốn điểm giong mục 4). Skill đòi mỗi việc chưa quyết thành `question` có `needed_before`. Worker ghi lý do "lượt này chỉ được tạo một file". |
| plan H2 | 3 file (hiệu lực) | Hàng T2, T8, T11 nhãn "đứng" trái bảng sáu dòng xếp sai của [[emb-chot-tag-theo-arc]] (Arcobaleno ở Teen). Câu ranh giới ở L1 bỏ hai chữ "trong Brat" của decision, đổi nghĩa. Kéo theo: 76/14, mục 7 (20 sự kiện, ~76.000 từ), câu "không câu nào chặn School, Teen, Young Adult". |
| cont H1 | vault (+ hiệu lực báo thiếu) | Hai secret còn state của tám chương đã lưu trữ trong `known_by`: `tsuna-am-tinh-tren-giay` (có genichi, `reveal_planned` Ch7) trái [[emb-chot-thay-thuoc]] *"Sugita không được biết chuyện Lửa"*; `chi-chu-nhan-thay-cao` (có mammon, mục "Sửa Ch4" không gạch). `pov_leak_check` đọc đúng hai trường này. Hiệu lực mục 8 chỉ báo phần thân note thứ nhất. |

### Medium

| Mã | Ở đâu | Vấn đề |
|---|---|---|
| plan M1 | 3 file | L1 thiếu phương án "dựng lại khung" mà decision đòi (*"phải dựng lại, không phải vá"*); giong và điểm danh đề xuất vá khung mà không nhắc decision. |
| plan M2 + cont M7 | 3 file (điểm danh) | Câu 9 (Nagi vào bộ Guardian) không gắn cờ forbid #4 và `tropes` 5.2; trả lời "có" là đổi hợp đồng. |
| plan M3 | 3 file (giong) | Chơi sự vụng về cho buồn cười, không đối chiếu hệ quả 1 của [[emb-chot-tsuna-va-natsu-kham-pha-lai]] (*"KHÔNG phải để gây cười thương hại"*); mục 4 điểm 3 không đối chiếu `tropes` 5.1. |
| plan M4 | 3 file (hiệu lực) | Hàng B6 và L4 ghi mốc "âm tính năm bảy" còn đứng, không mang cờ `Timeline/master`: *"nguồn tự lệch"* với việc ra khỏi ẩn cư lúc ~5. Ba đường Xả Brat của giong dựng trên cùng mốc. |
| plan M5 | 3 file (giong) | Child Xả PA2 dời Cradle giữa arc (~8) mà [[tuoi-va-moc]] ghi ~9–10; cột Mất không nêu. |
| plan M6 | 3 file (giong) | "Chữ của Aurel" cho cuối Child thực ra là lời Aurel về **Arc 4** (`emb-chot-cau-hoi-mo` mục 6). |
| plan M7 + cont M3 | 3 file | Diễn giải của AI trong note `user` bị dẫn như lời Aurel: hiệu lực hàng C6, T10, S2, T9; giong mục 2 hàng 16/08. Hai reviewer xếp tầng hai note ngược nhau (giong tách đúng, hiệu lực không). |
| plan M8 | 3 file (hiệu lực) | Nhãn "phải lột" quyết trước L2: hàng Cb và phần L1 của hàng B9; mục 9 điểm 4 theo đó. |
| plan M9 | 3 file (giong) | Neo vào lời 22/09 nằm trong decision `superseded`, bỏ mệnh đề "sau các sự kiện arc Brat". |
| plan M10 | 3 file (giong) | Xả Teen và School đề xuất chữ mà không nhắc hàng T9 (người và arc còn tranh) và L4 (Tsuna còn giả âm tính hay thôi). |
| cont M1 | vault + 3 file | Hàng Xả Teen cần một người gọi tên mẫu hình; `567-ke-hoach` ghi *"Ai biết: Không ai"*, `musashi.md` ghi bà không biết cháu tái sinh. Câu 7 điểm danh chưa ghi điều kiện `reveal_planned`. |
| cont M2 | vault + 3 file | Ba ô secret để trống (Musashi biết tới đâu về tái sinh; Musashi có biết Nana giấu không; Indra có biết con đang chờ không) chưa được tính là thứ chặn; câu "không câu nào chặn School, Teen, Young Adult" chỉ đúng với 12 note `question`. `musashi.md` và `tsuna-tai-sinh` cũng nói ngược nhau. |
| cont M4 | 3 file (giong) | Brat Xả PA1 "trong Namimori cái vỏ không lừa được ai": nguồn chỉ nói danh Sky of Namimori đến sau vòm Sky nổi ở giới ngoài; vế "trong Namimori" là lời giải của AI. Đụng cả luật Gen'ichi không biết chuyện Lửa. |
| cont M5 | vault + 3 file | "Yamamoto-san tiệm Takesushi" được `sachiko.md` (`user`) gán cho mẹ Takeshi, `tsuyoshi.md` (`proposed`) gán cho Tsuyoshi; điểm danh tách thành hai hàng theo note thấp hơn mà không báo. |
| cont M6 | vault | Dữ kiện "trước vạch xuất phát" do văn xuôi đã bỏ còn sống: `tsuna--kawahira` dòng 30 (bond ngày thứ ba, trích cảnh 3.4 đã lưu trữ), và tám chỗ cùng loại (xem mục 5b). |
| cont M8 | 3 file (điểm danh) | Bảng điểm danh trong từng dàn ý chương là đường rò sang writer (bất biến 7); ô "Lý do" chưa nói ghi gì. |

### Low

| Mã | Ở đâu | Vấn đề |
|---|---|---|
| plan L-a | 3 file (giong) | *"đúng, 1 2 4 5 A đều OK"* là câu ghép, không nguyên văn. |
| plan L-b + cont LOW9 | 3 file (điểm danh) | Con cáo ghi tầng `user, 0,9`; `fact-cao-la-natsu` là `original_author`. Hàng thiếu cờ mà hiệu lực B11 có (tiêu đề decision locked *"con cáo không phải Natsu"*, `q-ten-con-cao` đang mở). |
| plan L-c | 3 file (giong) | K3 "≥ 1 mỗi chương", mức cứng, chưa hiệu chỉnh trên nguyên tác (P1 Ch2 không có POV Tsuna). Chưa kiểm. |
| plan L-d | vault | `tropes.md` 5.5 ghi bốn quan hệ, decision 19/09 ghi sáu; không note nào báo. |
| plan L-e | vault | Mục mở cũ #1, #5 (Tsunashige, hoãn), #6 của `questions/_MOC` không note nào nhắc; #5 chạm hàng S6 và Young Adult. |
| plan L-f + cont LOW7 | vault + 3 file | Chênh tuổi Kyouya +2: `tuoi-va-moc` tự lệch (bảng còn "~18–19", mục 4 còn "Kyouya cùng tuổi"); mốc +2 không có decision riêng. Hai worker dùng như fact. |
| plan L-g | vault | Ba note chưa có dòng trong `arcs/_MOC.md`. |
| plan L-h | 3 file (giong) | Mục 4 bỏ bảng precedence vì nhãn do AI gán: dùng phán đoán thay precedence; nên nêu rõ khi hỏi. |
| plan L-i + cont LOW13 | vault | [[emb-lam-lai-lan-ba]] và `EMB.md` ghi 11 câu `unresolved`; đĩa và `_MOC` là 12. Hiệu lực dùng 12, không báo chỗ lệch. |
| cont LOW1 (+ plan §3 #1) | 3 file (hiệu lực) | Mục 8 ghi "năm hàng Xả"; khung có bốn (Young Adult là hàng Kết). Giong đúng. |
| cont LOW2 | 3 file (điểm danh) | Mục 4 dựng ngưỡng trên "arc hai chương (Brat, Young Adult)"; hiệu lực xếp con số ấy là đã chết, decision ghi Brat không phải arc nhỏ. |
| cont LOW3 (+ plan §3 #3) | 3 file (điểm danh) | Tiêu chí ô "có nguồn" không đều (Indra/Brat, Kyouya/Teen chấm có; Nagi, Kawahira hạ). Số lệch: điểm danh 8 ô; plan áp đều ra 7/14 (thay 8/13, cột Brat còn 2); cont ước 6–7. Không tự chọn. |
| cont LOW4 | 3 file (điểm danh) | Tsuyoshi ở cột Child dựa vật liệu "Arc 3", nhưng vụ sát thủ giết mẹ Takeshi khung đã đặt ở Brat: một sự kiện tính hai arc. |
| cont LOW5 | 3 file (điểm danh) | `tuyen-mo-tu-nguyen-tac` không nhắc thầy thuốc từ Ấn Độ, dù điểm danh ghi "xếp cả bốn". |
| cont LOW6 | 3 file (điểm danh) | Tsunashige "lần cuối được nhắc: P1 Ch3"; còn được nhắc ở P2 Ch1 và P2 Ch2. |
| cont LOW8 | vault | `aurel-main` preserve *"Indra là Guardian đầu tiên"* so với P2 Ch1 *"already had a guardian for his left"* và `drop-point` "Guardian thứ hai". Không ai báo. |
| cont LOW10 | 3 file (giong) | PA2 Teen (*"cậu biết rồi, và đang sửa"*) báo forbid #2b nhưng chưa dẫn preserve Luận đề. |
| cont LOW11 | 3 file (giong) | Hàng Giọng School đòi "cậu bị phát hiện" mà không loại Iemitsu, Tsunashige (ngược hàng S6); PA1 Xả School thêm Iemitsu vào hàng đóng, sát mép forbid #3. |
| cont LOW12 | 3 file | Bảng có chữ "bigger carnivore là Indra"; hiện `load_for: [planner]` nên chưa rò, thành lỗi nếu chép sang note writer nạp. |

## 3. Chỗ nối giữa ba đơn vị

Bảng của plan-reviewer (11 hàng) là điểm xuất phát; hàng dưới là tôi đọc ba file cạnh nhau. Mã plan §3 giữ số hàng của bảng ấy.

| | Chỗ nối | Hai bên nói gì |
|---|---|---|
| **lệch** | Ký hiệu **✅** hai nghĩa *(plan §3 #4, tôi xác nhận)* | Điểm danh: "có nguồn cho một việc cụ thể". Hiệu lực: "hàng còn đứng". Kyouya Teen/Young Adult: ✅ ở điểm danh, ⚠️ ở hiệu lực (T4, Y4). |
| **lệch** | Ký hiệu **K1–K4** hai nghĩa | [[20261001-soat-nen-du-kien]]: K1 chính tả, K2 giọng, K3 điểm danh, K4 dữ kiện sống sót (forbid #7). Giong tự đặt K1–K5 là phép kiểm giọng (K4 = đoạn nặng). Hiệu lực viết "K2, giọng", "K3, điểm danh", "L3 … mục K4". |
| **lệch** | Ký hiệu **A · B · C** ba nghĩa | Khung: cách ghép A/B/C (điểm danh viết "khung hàng C"). Hiệu lực: hàng "C1–C8" là Child, và "phương án A–D" của `q-brat-dai-bao-nhieu`. Điểm danh: "ngưỡng A/B" và "danh sách A/B" của decision. |
| **lệch** | Mã **L1–L4** hai nghĩa | Hiệu lực: L1–L4 là bốn chỗ phân xử; cùng file còn hàng L0–L8t (Tổng lượng), nên phải đặt `L1t`, `L2t` để tránh. Mã reviewer (H1, M1…) cũng trùng hàng H, M của hiệu lực. |
| **lệch** | Độ dài Brat *(plan §3 #10, tôi xác nhận)* | Giong dùng "~6–7 → 7" làm tiêu đề. Hiệu lực: đuôi `7` ❌ chờ `q-brat-dai-bao-nhieu`, "5 sự kiện, 2 chương" bị lột. Điểm danh LOW2 vẫn dùng "arc hai chương". |
| **lệch** | Ba cách sửa khung, không ai nhắc hai cách kia | Giong: thêm hàng Giọng, soát lại Xả/Bóng. Điểm danh: chép bảng 3a vào khung (hướng 1) hoặc chỉ cột Brat (hướng 3). Hiệu lực: lột chín hàng, sửa 17 chỗ Kyoya. Cả ba treo vào L1 (plan M1). |
| **lệch** | Bảng Child *(plan §3 #5)* | Giong: "không dùng làm fact". Điểm danh: "không còn hàng sống nào gọi tên ai". Hiệu lực: năm hàng "✅ treo", đưa vào khung tối thiểu. |
| **lệch** | "Biết mà chưa làm gì", gương Kawahira *(plan §3 #6, #7)* | Giong: chữ AI / diễn giải của note, hàng đẩy về bất lực. Hiệu lực: C6, T10 nhãn đứng. |
| **lệch** | "Ai đó gọi tên mẫu hình" *(plan §3 #8)* | Giong: ba đường chữ cho Teen. Điểm danh: Arc 4 theo note, Arc 5 theo khung, cần Aurel. Hiệu lực T9: lệch cả người lẫn arc. |
| **lệch** | Con cáo là Natsu *(plan §3 #9)* | Điểm danh: ghi như đã chốt. Hiệu lực B11: chờ `q-ten-con-cao`, cọ decision locked. |
| **lệch** | Hàng Áp lực Brat *(plan §3 #2)* | Giong và hiệu lực B5: toàn việc đã yên. Điểm danh: Indra/Brat "có việc cụ thể". |
| **lệch** | Số hàng Xả *(plan §3 #1)* | Giong: bốn. Hiệu lực mục 8: năm. |
| **lệch** | "Tự chặn" ở Brat Xả | Hiệu lực L4: mệnh đề không có trong nguồn. Giong PA2 giữ "cái vỏ này về sau gây rắc rối" làm hạt giống, không nhắc L4. |
| ổn | Kyouya 19 hay 17 *(plan §3 #11)* | 19 = 17 chữ "Kyoya" + 2 link `kyouya-loai-chu-chot`. Chưa ghi một dòng giải thích trong file nào. |
| ổn | Tên, câu trích | Phần tự viết dùng Kyouya, Shouichi; hai reviewer kiểm 58 và 54 câu nguyên tác, đều khớp, trừ dấu chú thích `[3]` và câu "mở bằng" của P1 Ch1 (giong: thực là câu thứ hai). |

Tổng: **13 chỗ lệch, 2 chỗ ổn.**

**Số hai nguồn ghi khác nhau** (không tự chọn): `vault_doctor` plan-reviewer 27 cảnh báo (`--zone EMB`), continuity-reviewer 58 (không `--zone`); cả hai exit 1, 0 lỗi. Tỉ lệ dấu chỉ đùa từng chương: giong 19,8 · 12,5 · 4,3 · 20,5 · 28,9; plan tính lại 19,3 · 12,4 · 4,2 · 19,9, và P2 Ch2 ra 23,7 hoặc 28,6; cont chưa kiểm bảng này.

## 4. Việc cần Aurel quyết, xếp theo thứ tự nên hỏi

Không câu nào có sẵn đáp án; phương án nằm trong từng file nguồn. Cột "Ai nêu" ghi nguồn đầu tiên, rồi các nguồn nhắc lại.

### (a) Phải quyết trước khi sửa khung

| # | Hỏi gì | Ai nêu | Chặn gì |
|---|---|---|---|
| a1 | [[emb-chot-tag-theo-arc]] (`locked` 19/09) và phần phân bổ nhân vật của khung 17/09 cùng tầng `user`: giữ, thu hẹp, rút, giữ khung làm bản ghi 17/09, hay dựng lại khung (phương án thứ tư, plan M1)? | hiệu lực L1; plan H2, M1 | Hàng M1, R0, R2, R3, R4, C5, K3 và nhãn T2, T8, T11; khung của ba câu Brat (Xanxus, Reborn, dài bao nhiêu); cột Brat của điểm danh; cách đọc "sáu dòng tag". Hỏi trước hết. |
| a2 | Arc 3 Child không còn bản sống: sống lại bảng 17/09, để trống tới khi Brat xong, hay giữ làm ý chính. Kèm: ngoại lệ forbid #7 (`aurel-main` dòng 79) giữ hay rút (ô trả lời K4 vẫn ghi "chưa trả lời"). | hiệu lực L2, L3; [[20261001-soat-nen-du-kien]] K4; plan M8 | Chín hàng 🔁, hàng Cb, B9, tổng lượng (Cộng 32 vs 37), hàng Child của giong và điểm danh. Hỏi sau a1 vì C5 và K3 dính L1. |
| a3 | Mẫu hình "không tính mình" còn nguyên tới arc nào (16/08, forbid #2b) so với 19–22/09 (tự tin, bốc đồng, "đã phần nào chấp nhận")? Nên nêu kèm: giong mục 4 dừng ở đây vì bỏ precedence theo nhãn. | giong mục 4 điểm 1; plan L-h, M9 | Hàng Xả/Bóng School, Teen, Young Adult của giong; nhãn "đứng" cho lời 22/09 (decision gốc đã `superseded`). |
| a4 | Có thêm hàng **Giọng** cho từng arc không, chữ nào; tám hàng ba đường; năm phép kiểm K1–K5 nhận cái nào, mức nào (kể cả K3 "mỗi chương" trước khi hiệu chỉnh, plan L-c). | giong mục 6 | Chỉ hỏi được sau a3. Chặn việc sửa khung theo K2 của [[20261001-soat-nen-du-kien]]. |
| a5 | Mốc "Sky của Namimori / just wing it" thêm vào hàng H3 hay không; mệnh đề "tự chặn" đổi theo câu của nguồn hay giữ như mở rộng của nhánh (có cờ `master` "nguồn tự lệch"). | hiệu lực L4; plan M4; cont M4 | Hàng B6, C5; Xả Brat của giong (PA1/PA2); hàng S6. |
| a6 | Ba chỗ diễn giải của AI (hàng C6, T10, và dòng "Arc 4" ở S2/T9) có phải lời Aurel đã duyệt riêng không? | cont (open item 2), plan M7 | Nhãn "đứng" của C6, T10; nhãn "lệch" của S2, T9. |
| a7 | Ai gọi tên mẫu hình, ở arc nào: Musashi ở Arc 4 (note) hay "ai đó" ở Arc 5 (khung). | điểm danh #7; hiệu lực T9; plan M10 | Hàng T9, S2; Xả Teen của giong; cột Musashi của điểm danh. |
| a8 | Mốc Kyouya hơn Tsuna 2 tuổi (20/09) còn giữ không, trong khi `tuoi-va-moc` tự lệch. | cont LOW7; plan L-f; hiệu lực T4, Y4 | Hàng T4, Y4 và các ô Kyouya Teen/Young Adult. |
| a9 | Điểm danh dùng theo hướng 1 / 2 / 3, và ngưỡng A hay B (hoặc chưa). Bảng điểm danh trong dàn ý chỉ planner nạp, hay ghi tên note ở ô lý do (cont M8). | điểm danh mục 4 và "ba hướng"; cont M8 | Cách sửa khung (a1), mẫu dàn ý chương, một trường frontmatter mới (việc của phiên hệ thống). |
| a10 | Đồng ý cho sửa khung: lột chín hàng 🔁 và 17 chỗ "Kyoya" (theo `emb-chot-chinh-ta-ten`)? | hiệu lực mục 9 điểm 4 | Việc sửa khung; chỉ làm sau a1–a2 vì plan M8 chuyển Cb, B9 sang "lệch". |

### (b) Chặn khung riêng arc Brat

| # | Hỏi gì | Ai nêu | Chặn gì |
|---|---|---|---|
| b1 | Đồng ý trả hai frontmatter secret (`tsuna-am-tinh-tren-giay`, `chi-chu-nhan-thay-cao`) và danh sách lỗi mục 5b về mốc cuối P2 Ch1 (như đã làm với bảy hook)? | cont H1, M6 | Thẻ cảnh Brat có Gen'ichi, con cáo, Varia; `pov_leak_check` đang pass sai. |
| b2 | [[q-xuong-song-brat]]: thang đo bốn mục giữ hay sửa. | hiệu lực mục 6 | b3, b4, b5; chạm thẳng lời chê "thiên buồn". Gốc của chuỗi Brat. |
| b3 | [[q-brat-xanxus-vao-the-nao]] và [[q-brat-reborn-toi-dau]] (hỏi cùng lượt được). | hiệu lực mục 6; điểm danh mục 5 | Chia chương Brat; b4; phụ thuộc a1. Phương án C của câu Reborn phạm `preserve`. |
| b4 | [[q-brat-dai-bao-nhieu]]: Brat đóng theo tuổi, xương sống, dàn vai, hay mốc âm tính năm bảy; số sự kiện tính lại. | hiệu lực mục 6 | Gỡ 7 hàng (B0, B6, B9, C0, L2t, L7t, D4); hỏi sau b2, b3. |
| b5 | [[q-dac-vu-vongola]] (có thể tự tan sau b2). | hiệu lực mục 6 | Khung riêng arc Brat; hàng B7. |
| b6 | [[q-tsuna-tranh-mukuro]]: quyết Mukuro ở đâu trước khi dàn ý. | điểm danh mục 5; hiệu lực mục 6 | Chương đầu có Mukuro; Mukuro là tag Brat (a1). |
| b7 | [[q-ten-con-cao]]: giữ Natsu nghĩa khác, giữ Tomoshibi, hay đặt lại; kéo theo mở [[emb-chot-tsuna-va-natsu-kham-pha-lai]] (locked) và sửa chín note. | hiệu lực mục 6; plan L-b; cont LOW9 | Chương con cáo được gọi tên; hàng B8, B11, K6. |
| b8 | [[q-me-takeshi-ai-quyet]], kèm: "Yamamoto-san tiệm Takesushi" là ai (`sachiko` và `tsuyoshi` gán khác nhau); Chiyo giữ hay bỏ. | hiệu lực mục 6; cont M5; điểm danh mục 5 | Cảnh vụ Yamamoto; hàng B3, B9. |
| b9 | [[q-shouichi-loi-moi]]. | hiệu lực mục 6 | Chương đầu có Shouichi. |
| b10 | Ba ô secret để trống: Musashi biết tới đâu về tái sinh; Musashi có biết Nana giấu không; Indra có biết con đang chờ không. Kèm: ai trong vòng 1 biết gì về `tsuna-tai-sinh`. | cont M2; điểm danh mục 5 #4 | Thẻ cảnh có POV Musashi (và Maro, Ayame, Kazuki, Nagi), cặp Indra–Kyouya. |
| b11 | Chín mục điểm danh chưa có `question`: Musashi đổi gì ở Brat; Maro và Kawahira đã gặp chưa; ai ra tay ở `emb-chot-cau-hoi-mo` mục 5; Keita còn sống không; Nagi vào bộ Guardian không (đổi hợp đồng forbid #4, cont M7); Fon vào Brat thế nào (hiệu lực). | điểm danh mục 5; plan M2; hiệu lực L1 | Khung riêng Brat và các cảnh đầu có người đó. Cần mở thành note `question` trước (plan H1). |
| b12 | Ba hook sống khung chưa có: [[hook-su-co-nha-khoa-hoc-vongola]] (arc nào), `bond-bam-vao-cay`, `so-cua-thay-thuoc` (giữ hay `superseded`); `skull`, `chiyo` ở hàng "Aurel quyết". | hiệu lực mục 4; điểm danh mục 1f | Cảnh bond Kyouya, cảnh có cuốn sổ; hook phủ 15/18. |

### (c) Để sau Brat

| # | Hỏi gì | Ai nêu | Chặn gì |
|---|---|---|---|
| c1 | [[q-child-nam-cong]], rồi [[q-bermuda-an-toi]], rồi [[q-cam-khoan-vendicare]]. Nếu a1 buộc Vindice có mặt ở Brat hơn một lá thư thì `q-bermuda-an-toi` lên sớm. | hiệu lực mục 6 | Dàn ý arc Child. |
| c2 | Hàng T3: trận phá băng kể bằng hai mép hay xin ngoại lệ forbid #7. | hiệu lực T3 | Dàn ý Teen. |
| c3 | Luật Sky làm Element cho Sky khác, và cách phá băng (lẻn vào tổng bộ hay nhờ Bermuda): hai việc mở của `emb-chot-khung-arc` mục 2, chưa có `question`. | hiệu lực T12 | Dàn ý Teen. |
| c4 | Gen'ichi sau Brat có bao giờ biết chuyện Lửa; chuyến sang Ý của Musashi có xảy ra không, ở arc nào. | điểm danh mục 5 #6, #8 | Dàn ý Child; arc đầu tiên Musashi vắng nhà. |
| c5 | Điều kiện `reveal_planned` của `567-ke-hoach` cho cảnh gọi tên mẫu hình. | cont M1 | Dàn ý School/Teen. |
| c6 | Hình tượng Tsunashige (mục mở #5 của `questions/_MOC`, hoãn). | plan L-e | Hàng S6, Young Adult. |
| c7 | Skull (chờ cổng ① của q-child-nam-cong), Tomoko lộ mặt, Mammon (Cradle), cặp song sinh. | điểm danh mục 5 | Dàn ý Child. |

## 5. Việc phải sửa trước khi coi là sẵn sàng duyệt

Chỉ liệt kê. Theo hai review, sau khi sửa phải chạy lại plan-reviewer.

### 5a. Trong ba file đề xuất

- **Chung:** mở note `question` có `needed_before` cho từng việc ở mục 4 (plan H1); ghi lượt `context_resolver` và `vault_doctor` của từng worker (plan checklist 12, 25); thêm hook/decision/timeline/số chương vào mỗi hướng (checklist 14); trích `tropes` ở giong và điểm danh (checklist 10); thêm dòng "phụ thuộc L1" ở giong và điểm danh (plan M1); thêm một dòng giải thích Kyouya 19/17; thêm ba file vào `arcs/_MOC.md` (plan L-g, ngoài ba file).
- **Giong:** plan M3, M5, M6, M9, M10, L-a, L-h; cont M4, LOW10, LOW11; mục 2 hàng 16/08 gắn nhãn diễn giải (plan M7); mục 4 điểm 3 trích hệ quả 1, 3 và `tropes` 5.1; sửa "P1 Ch1 mở bằng" thành câu thứ hai; câu "Đừng viết thành bi kịch · cái giá" là ghép tiêu đề với ô bảng.
- **Điểm danh:** cờ forbid #4 ở câu 9 (plan M2, cont M7); tầng và cờ của con cáo (plan L-b, cont LOW9); áp tiêu chí ô đều (plan §3 #3, cont LOW3, Indra Brat); điều kiện `reveal_planned` ở câu 7 (cont M1); thêm Musashi và ba ô trống vào câu 4 (cont M2); báo Yamamoto-san cùng `q-me-takeshi-ai-quyet` (cont M5); ô "Lý do" ở mục 4 (cont M8); cont LOW2, LOW4, LOW5, LOW6, LOW8, LOW12; mục 6 thêm các note chưa báo (cont M6).
- **Hiệu lực:** chuyển T2, T8, T11 sang "lệch", sửa câu ranh giới theo nguyên văn "trong Brat", gắn "suy ra", tính lại mục 0 và mục 7 (plan H2); thêm phương án "dựng lại khung" vào L1 (plan M1); cờ `master` ở B6, L4 (plan M4); nhãn C6, T10, S2, T9 (plan M7, cont M3); Cb và phần L1 của B9 sang "lệch", sửa mục 0 và mục 9 điểm 4 (plan M8); mục 8 "năm hàng Xả" thành bốn; thêm frontmatter của hai secret vào mục 8 (cont H1); ba ô secret trống và câu "không câu nào chặn School, Teen, Young Adult" (cont M2); mục 5 và bảng "chưa theo kịp" thêm `tropes.md` (plan L-d), mục mở cũ #1, #5, #6 (plan L-e), chênh +2 (plan L-f), 11 so với 12 câu (plan L-i).

### 5b. Lỗi có sẵn của vault, ngoài ba file

- **Secret:** `known_by` của `tsuna-am-tinh-tren-giay` (dòng 11–17, cả `reveal_planned` Ch7) và `chi-chu-nhan-thay-cao` (dòng 10, mục "Sửa Ch4" dòng 46–62); `bigger-carnivore` thân còn "chưa chốt"; ba ô trống của `secrets/_MOC`; `musashi.md` so với `tsuna-tai-sinh` (cont H1, M2, M6).
- **State còn sót (cont M6):** `tsuna--kawahira` dòng 30; `tsuna--shouichi` frontmatter xưng hô hai chặng; `relationships/_MOC` dòng 31–43; `Characters/_MOC` dòng 82–89; `Timeline/master` dòng 196–197; `sachiko.md` mục "Trạng thái hiện tại" (và "Không biết: Lửa", cont M5); `drop-point` mục 7 (Nagi); `emb-chot-danh-xung-chuc-va-nguyen-to` dòng 57.
- **Điểm danh mục 6:** `nagi.md` còn dòng theo secret đã `superseded`; `keigo.md` "còn sống không: chưa trích"; `Characters/_MOC` tiêu đề "Ngoài Namimori"; `musashi.md` dòng 239–285 ba tiểu mục không ⛔ dưới tiêu đề đã ⛔.
- **Hợp đồng nhánh (hiệu lực mục 5):** `aurel-main` dòng 15 (`dot7-quyet-dinh`), 79 (ngoại lệ forbid #7), 85 (`y-chinh-cac-arc`, chưa ⛔), dòng 12 và 58 chưa theo kịp [[emb-chot-tag-theo-arc]], thiếu dòng chính tả tên; `aurel-main` preserve "Indra là Guardian đầu tiên" (cont LOW8).
- **Khác:** `decisions/_MOC` thiếu dòng cho [[emb-chot-tag-theo-arc]]; `tropes.md` 5.5 bốn so với sáu; `tuoi-va-moc` mục 4 và mục "Tuyến Varia" chưa gạch, bảng tuổi tự lệch; `emb-chot-nguyen-to-di-san`, `emb-chot-loi-dang-quay-ve` còn ví dụ từ tám chương; frontmatter `bond-bam-vao-cay`, `so-cua-thay-thuoc` còn `progress` bản cũ; `hooks/_MOC` ghi "sáu hook chờ" (thực còn hai); mọi hook `open` để `payoff.arc` trống; [[emb-lam-lai-lan-ba]] và `EMB.md` ghi 11 câu (đĩa 12); `questions/_MOC` mục mở cũ #1, #5, #6; `q-brat-dai-bao-nhieu` thân còn "hai chương đã viết".
- **Chờ Aurel đồng ý mới sửa (thuộc [[khung-nam-arc]]):** chín hàng 🔁, 17 chỗ "Kyoya", dòng Cộng.

## 6. Khối handoff

```
## Stage complete: summary (plan-continuation Mode 3, EMB, soát khung năm arc)
- Produced: 05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/arcs/khung-soat-tong-ket.md
  — 3 worker (planner: giong · diem-danh · hieu-luc, status proposed), 2 reviewer (plan-reviewer, continuity-reviewer), 1 summarizer;
  38 dòng finding (3 high), 15 chỗ nối (13 lệch)
- Pre-flight: python 01_Origine/04_Tools/VaultTool/plan_gate.py --project EMB -> exit 0
  (khung-soat-hieu-luc tự báo exit 0; giong và diem-danh không ghi; plan-reviewer chạy lại exit 0; continuity-reviewer chạy lại exit 0)
- Verify gate: vault_doctor.py --include-fiction --zone ... -> không worker nào ghi.
  plan-reviewer: --zone EMB, exit 1, 0 lỗi, 27 cảnh báo, không cảnh báo nào thuộc ba file.
  continuity-reviewer: không --zone, exit 1, 0 lỗi, 58 cảnh báo (số cảnh báo lệch, khác phạm vi lệnh).
  pov_leak_check trên ba file: exit 2 cả ba (không có pov; chỉ dùng như bảng kê từ khoá)
- Plan review: plan-reviewer ran 15 / missing 3 / cannot tell 5 (5 hàng không áp dụng); high 2 (H1, H2). continuity-reviewer high 1 (H1). Tổng high 3.
  Missing: (18) không có note question; (10) giong và diem-danh không đọc tropes; (14) hướng không có hook/decision/timeline/số chương.
  Cổng 09-gates "no checklist row missing, no high finding left" -> KHÔNG đạt.
- Open items: 3 high (plan H1, plan H2, cont H1); 3 missing; 13 chỗ nối lệch; mục 4 gồm a1–a10, b1–b12, c1–c7. Hỏi trước nhất: a1 (emb-chot-tag-theo-arc so với khung), rồi a2.
- Handoff: workers cần sửa ba file (mục 5a) và mở note question; Aurel cần trả lời nhóm (a) trước khi sửa khung, nhóm (b) trước khung riêng arc Brat; sau đó chạy lại plan-reviewer. Không gửi Aurel duyệt ở trạng thái này.
```

**Lệch khỏi luật sáu tác nhân:** (1) ba worker đều là `planner` trên ba đơn vị rời nhau, đúng luật; nhưng mỗi worker chỉ được tạo một file, nên không worker nào mở được note `question` mà skill `plan-continuation` đòi (plan H1); summarizer cũng bị cấm tạo. (2) Plan-reviewer ghi `continuity-reviewer` không để dấu vết trên đĩa nên không xác nhận được hai reviewer chạy song song; báo cáo continuity tôi đọc từ thư mục nháp. (3) Chỉ một trong ba worker ghi lượt `context_resolver` và `plan_gate`; không worker nào ghi `vault_doctor`. (4) Khối handoff trong `09-gates` chỉ có bốn dòng; hai dòng Pre-flight và Plan review theo yêu cầu của người giao việc và skill. (5) Số từ của ba file và của file này không đo được.
