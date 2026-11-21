---
id: summary.TDTB.ch18-tong-ket
type: info
scope: branch
lane: personal
project: TDTB
branch: aurel-main
arc: dan-y-ch16-ch19-tdtb
chapter: 18
canon_layer: user_canon
status: superseded
superseded_by: "dan-y-ch16-ch18-lam-lai-tdtb (da xoa khi reset 21/11/2026)"
superseded_at: 2026-10-03
aliases: ["tong ket ch18 TDTB", "tong ket ke hoach chuong 18 TDTB", "summary ch18 TDTB", "tom tat ba tac nhan ch18 TDTB", "ch18 Namimori tong ket vong 1"]
related: ["[[04_Manuscript/chapters/arc-1/ch18/ch18-plan]]", "[[04_Manuscript/chapters/arc-1/ch17/ch17-chapter]]", "[[04_Manuscript/chapters/arc-1/ch17/ch17-tong-ket]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/06_Alternate_Versions/branches/aurel-main|aurel-main]]"]
source:
  type: inference
  ref: "summarizer, 01/10/2026, doc truc tiep ch18-plan + 4 the canh + ch17-chapter + dan-y-ch16-ch19-tdtb; bao cao plan-reviewer va continuity-reviewer do dispatcher chuyen lai (khong co file rieng), moi phat hien da doi lai voi file khi doi duoc"
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-03
---

# Tổng kết ch18 — 《装B的第十八天》 (giai đoạn kế hoạch, vòng 1)

> 🔁 **Bị thay 03/10/2026** → dan-y-ch16-ch18-lam-lai-tdtb: Aurel sửa Tsuna (OOC ở ch16–17), nhà Namimori bỏ hoang, gộp ch18–19 ([[qd-tsuna-tren-show-thu-dong-tdtb]], [[qd-nha-namimori-bo-hoang-tdtb]]). Phần dưới giữ làm lịch sử, **không** còn là kế hoạch.

> Chỉ đọc, không sửa. Đây là **kế hoạch chương + bốn thẻ cảnh**, chưa có bản nháp. Quyết định thuộc về Aurel.
> **Kết luận ngắn:** 1 phát hiện `high`, 12 `medium`, 22 `low` sau khi gộp (31 dòng từ hai reviewer + 4 dòng do tổng kết thêm). **Chưa sẵn sàng `write-chapter`**, vì ba lý do:
> (1) còn một `high` mở, là cái khung mở chương trái ch17 `final`; (2) plan-reviewer ghi thiếu một hàng checklist ("điều chưa quyết phải thành note `question`"); (3) **chưa đề xuất nào có đồng ý của Aurel**. Có 41 hàng đề xuất; tách trùng giữa C8–C15 và các thẻ thì còn 33 quyết định riêng.
> Có sáu chỗ là **sai** (trái ch17 `final`, trái quyết định đã khoá, hoặc tự trái trong thẻ) và có thể sửa không cần Aurel chọn: xem mục "Sửa cơ học". Phần còn lại là **lựa chọn** của Aurel, xếp theo thứ tự phụ thuộc ở mục "Cần Aurel quyết".

## Ba phần đã làm

Cả ba worker đã chạy, không thiếu (3 đơn vị rời nhau, không file chung). Cả ba tự báo đã chạy một lệnh git chỉ-đọc dù được dặn không chạy; theo họ không có gì bị stage hay đổi (tôi không chạy git nên không kiểm được). Số dòng đếm từ file; số chữ Hán/số từ *not measured* (không có công cụ đếm).

| Worker | Phần | File | Số dòng · ngân sách thẻ (đọc từ frontmatter) · số đề xuất |
|---|---|---|---|
| A | Kế hoạch chương | `chapters/arc-1/ch18/ch18-plan.md` | 251 dòng · mục tiêu ~2.800 chữ Hán (sàn ≥ 2.200) · bảng C1–C15 (C1–C7 do A đề xuất; C8–C15 chỉ ghi mặc định của dàn ý và trỏ sang thẻ) |
| A | Cảnh 01 门前 (POV Gokudera) | `chapters/arc-1/ch18/scenes/01-ch18-men-qian.md` | 158 dòng · ~700 chữ · thoại ~10 % · ≥ 2 lượt · thuật ngữ ≥ 9 · 7 nhịp · không có bảng đề xuất riêng (dùng C2–C7 của plan) |
| B | Cảnh 02 客人 (POV Nana) | `chapters/arc-1/ch18/scenes/02-ch18-ke-ren.md` | 248 dòng · ~500 chữ · thoại ~35 % · 6 lượt · thuật ngữ 0 · 5 nhịp · 02.1–02.8 (8) |
| C | Cảnh 03 饭桌 (POV Gokudera) | `chapters/arc-1/ch18/scenes/03-ch18-fan-zhuo.md` | 235 dòng · ~1.100 chữ · thoại ~25 % · ≥ 10 lượt · thuật ngữ ≥ 13 · 8 nhịp · 03.1–03.9 (9) |
| C | Cảnh 04 电话 (POV Gokudera) | `chapters/arc-1/ch18/scenes/04-ch18-dian-hua.md` | 268 dòng · ~500 chữ · thoại ~35 % · ≥ 8 lượt (đều của Nana) · thuật ngữ ≥ 6 · 6 nhịp · 04.1–04.9 (9) |
| Tổng | 1 kế hoạch + 4 thẻ | | 1.160 dòng · 700 + 500 + 1.100 + 500 = **2.800** chữ Hán (khớp plan và dàn ý) · 15 + 8 + 9 + 9 = **41** hàng đề xuất |

Cộng lại từ số trong thẻ (số chuẩn theo ghi chú của chính các thẻ), đối với bảng ngân sách của plan:

| Chỉ tiêu | Cộng từ thẻ | Plan ghi | Kết luận |
|---|---|---|---|
| Chữ Hán | 2.800 | ~2.800 | khớp |
| Thuật ngữ | 9 + 0 + 13 + 6 = 28 | ≥ 28 | tổng khớp; từng hàng lệch (02: 0 so với ≥ 2; 03: ≥ 13 so với ≥ 12; 04: ≥ 6 so với ≥ 5) |
| Lượt thoại | 2 + 6 + 10 + 8 = 26 | ≥ 27 | lệch 1 (thẻ 04 không đếm lời Tsuna vì 04.1-B) |
| Thoại, tính trọng số | (70 + 175 + 275 + 175) / 2.800 = 24,8 % | ~28 % | lệch; cả hai nằm trong dải 15–30 % |

Cổng máy. Tôi **không có shell nên không chạy lại**; số dưới đây là của reviewer và dispatcher:
- `plan_gate.py --project TDTB` → exit **0** (dispatcher chạy trước khi giao worker; plan-reviewer chạy lại, cũng exit 0).
- `vault_doctor.py --include-fiction --zone …TDTB…` → exit **1**: 237 note kiểm, **0 lỗi**, 2 cảnh báo `always_load` có sẵn (không thuộc ch18). *(plan-reviewer chạy; tôi không chạy lại.)*
- `pov_leak_check` ×4 thẻ → exit 2, continuity-reviewer ghi là **không có ý nghĩa**: các lần khớp là chính danh sách cấm trong thẻ, chưa có văn xuôi.
- plan-reviewer: checklist 21 hàng chạy · 1 hàng thiếu · 4 không kết luận được (`plan_gate` chạy trước khi lập kế hoạch — chỉ tự khai, reviewer đã chạy lại; đã đọc điểm rơi; `context_resolver` cho vai planner; dòng handoff — thuộc tổng kết này). Hàng thiếu: *"điều chưa quyết phải thành note `question` có `needed_before`"* (xem M5).

## Phát hiện — xếp theo mức độ

Mức giữ nguyên như reviewer cho; khi hai reviewer cho hai mức khác nhau cho cùng một vấn đề, tôi giữ mức **cao hơn** và ghi mức kia. `PR` = plan-reviewer, `CR` = continuity-reviewer, `TK` = tổng kết (tôi). Cột **Đối** = tôi đã đối lại với file hay chưa. Số dòng là số dòng file hiện tại. Trích chữ Hán lấy từ thẻ; riêng các câu của ch17 tôi đã đối lại trên `ch17-chapter.md`.

### High

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích | Đối |
|---|---|---|---|---|---|---|
| H1 | **high** | CR-CH1 (high) · PR-PM1 (medium) | plan C2 dòng 179; thẻ 01 dòng 62 ↔ `ch17-chapter` dòng 92–102 | Câu mở chương là đoạn đầu của chương, và nó đặt Tsuna sai chỗ: ở ch17 `final`, lúc nói câu "米" cậu **chưa** ở góc, **chưa** ngồi ghế. Cậu chỉ chuyển ra góc xa và ngồi ghế đẩu sau khi bị Tuyết liếc. Sửa bằng cách bỏ "góc bếp" thì khung hình vẫn đúng; dời khoảnh khắc ra sau thì đụng cảnh đưa nước mà C5 cấm Gokudera thấy (xem M10). | Plan C2: *"Tsuna ở góc bếp, câu “……今天的米，挺白的。”"* · thẻ 01: *"十代目 ngồi ở góc bếp, vo gạo"* ↔ ch17 dòng 92: *"纲吉认真想了一秒，看看盆里的米，诚恳地开口：“……今天的米，挺白的。”"* → dòng 100: *"他端起米盆，挪到厨房最远的角落"* → dòng 102: *"角落里有张小板凳，纲吉一屁股坐上去接着淘米"* | đã đối |

### Medium

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích | Đối |
|---|---|---|---|---|---|---|
| M1 | medium | PR-PM4 · CR-CM2 | thẻ 02 dòng 83–84 (02.5); thẻ 04 dòng 88 (04.7); thẻ 03 dòng 70–72 (03.2→3a); plan C10 | **Mỗi thẻ tự nhận trung lập về "Nana có biết con lên show không", nhưng cộng lại không trung lập.** Thẻ 02 và 04 cho bà nói/làm theo lịch của con (giờ nào con không nghe máy, "đến giờ rồi"), nghiêng về *bà biết con đang quay*. Thẻ 03 cho bà tả con "一个人在外面租房子住" còn Gokudera biết con đang ở show mà im, nghiêng về *bà không biết*. ch17 04.6 (Aurel đồng ý) nói muốn nhắc show phải chốt dữ kiện mới trước. | Thẻ 02: *"“这个时间他不接电话的，晚一点阿姨帮你打给他。”"* · thẻ 04: *"“差不多到时间了，阿姨给阿纲打个电话。”"* + *"奈奈 nhìn đồng hồ treo tường"* ↔ thẻ 03: *"“阿纲在东京念大学，一个人在外面租房子住，一年也回不来几趟。”"* | đã đối |
| M2 | medium | CR-CM1 · **TK (thêm mục đầu của thẻ 02)** | thẻ 02 frontmatter dòng 15–24, dòng 83–84 (02.5), dòng 89 (02.4); plan dòng 207–209 | **Thẻ 02 khai ba lần báo trước, trong khi plan chỉ cho một `hint` cấp chương và một `state` ở thẻ 01; dàn ý cho đúng một `hint`.** (1) `state` báo cuộc gọi ở cửa, mà plan ghi *"không đoán Nana sẽ gọi điện"*; (2) `hint` hướng ch19 beat 3 (*"你自己交给他"*), mà plan ghi *"Không gì của ch19 được ló ra"*; (3) **reviewer bỏ sót:** mục đầu `hint` báo trước beat 3 (Nana lặp chữ 朋友, vui hơn một nhịp). Thẻ 03 và 04 không để lại dấu vết nào cho (1): cả bữa tối Gokudera không hề chờ cuộc gọi. Cần Aurel phán xét 02.5 (quyết định 6). | Thẻ 02 foreshadow: *"ch18-04 (beat 5) — Nana goi dien cho Tsuna … level: state"* · *"ch19 beat 3 — Gokudera va mon qua truoc mat Tsuna … level: hint"* · *"ch18-03 (beat 3) … level: hint"* ↔ plan: *"anh không đoán sẽ được mời cơm … không đoán Nana sẽ gọi điện, không đoán Tsuna mai về"* và *"Không gì của ch19 được ló ra"* | đã đối |
| M3 | medium | PR-PM2 · CR-CM7 | thẻ 03 dòng 100–101 ↔ thẻ 02 dòng 74, 186 (02.8) | Số lần cúi tự mâu thuẫn. 02.8 đề xuất **một** lần và chỉ nêu "ba lần" làm phương án bị loại; thẻ 03 gọi nó là "ba lần của thẻ 02" và thêm một lần cúi chào căn phòng trống, đi ngược lý do của 02.8 (cú cúi của ch19 beat 1 sẽ cũ đi). | Thẻ 03: *"Lần cúi này **không** đếm tiếp vào ba lần của thẻ 02"* ↔ thẻ 02 02.8: *"**Một** lần cúi gập người … Lúc vào nhà: "打扰了", không cúi"* | đã đối |
| M4 | medium | PR-PM3 · CR-CM6 | thẻ 02 dòng 96 và dòng 172 (d); lặp lại ở thẻ 03 dòng 224 và thẻ 04 dòng 254 | Thẻ 02 lấy "ch19 beat 6: tối đó anh ở khách sạn" làm lý do cấm mời ngủ lại. Beat 6 là **đêm sau** buổi gặp Tsuna, không phải đêm S2. Plan C14 nói ch18 **không được chặn đường nào**: ch19 beat 1 cần anh có mặt ở nhà Sawada khi Tsuna về. Lệnh cấm này chặn đường đó. Việc Nana có mời ngủ lại hay không là lựa chọn của Aurel (04.9). | Thẻ 02: *"🔴 Không mời ngủ lại (ch19 beat 6: tối đó anh ở khách sạn)"* · *"(d) tối S2 anh về khách sạn (beat 6)"* ↔ plan C14: *"Ch18 không được chặn đường nào trong hai."* · dàn ý ch19 beat 6: *"Gokudera ở khách sạn gọi quản lý Angelie"* | đã đối |
| M5 | medium | PR-PM5 (hàng checklist thiếu) · CR-CM9 (nửa đầu) | thẻ 02 dòng 188–198; vault | **Bốn dữ kiện thế giới về Nana không có note `question`:** bà có biết con là Omega không (cần trước ch19) · có biết con lên show không (xem M1) · giới thứ hai của bà · bà có nhận ký ức Verde không. Thẻ cố ý đi vòng cả bốn (ch18 không bị chặn). Tiền lệ "bảng C thay cho note `question`" chỉ phủ lựa chọn của chương; với dữ kiện thế giới thì tiền lệ là D11 của ch17 (mở `q-yamamoto-di-dau-ngay-s2-tdtb`). Thêm: `sawada-nana-tdtb` không nằm trong `known_by` / `suspected_by` / `unknown_to` của bảy bí mật (theo thẻ 02 dòng 125–128, đo 01/10); không note quan hệ nào cho Nana, nên các cách xưng 伯母 / 阿姨 / 狱寺君 / 纲吉先生 là `assumed` (thẻ 02 dòng 118). Về mục thứ tư: `qd-ky-uc-verde-gui-rong-tdtb` (đã khoá 26/09) cho danh sách người nhận là **ví dụ, chưa đóng**, nên "chưa trả lời" là đúng, nhưng chưa có note `question` riêng cho Nana. Theo `09-gates`: stage chưa xong khi còn điều chưa quyết mà chưa thành `question`. | Thẻ 02: *"Bốn chỗ dưới đây khác: chúng là **dữ kiện về thế giới**, sẽ quay lại ở ch19 và sau đó. Cảnh 02 **không bị chặn** vì đã cấm chạm cả bốn."* | đã đối (thẻ, decision); vault chỉ đối được `qd-ky-uc…` và danh sách `questions/` (không có note nào về Nana) |
| M6 | medium | PR-PM6 | thẻ 02 writer-only (b) dòng 213–215; thẻ 03 dòng 142 và CAM dòng 199–200 | Các thẻ **cấm** Nana coi nhẹ con, viện sáo mòn #5; nhưng #5 trong `tropes.md` nói về Iemitsu và chỉ là "thông tin, không phải lệnh cấm". Nguồn của chính Aurel (`Database/Fandom/KHR/sources/gia-thuyet-khr-cua-aurel.md`) ghi Nana là *"vô tâm mang tính cấu trúc, không phải người mẹ xấu hoàn toàn"*. Không thẻ nào trích nguồn này. Không trái quyết định nào (beat 2 là "Nana ấm", nguồn nói loại trừ AU) nhưng đây là **chọn nhân vật** mà đang nằm trong khối cấm, không phải trong bảng đề xuất. | Thẻ 02: *"(b) *bôi xấu cha mẹ* (sáo mòn #5): bà không chê con, không *废柴*, không *"我们家阿纲居然…"*"* ↔ nguồn dòng 76: *"Nana (*"vô tâm mang tính cấu trúc"*, không phải người mẹ xấu hoàn toàn)"* | đã đối câu nguồn; chi tiết "gọi Dame-Tsuna" của reviewer: **chưa đối** (file chỉ dẫn "đọc thẳng file khi cần") |
| M7 | medium | PR-PM7 · CR-CM3 (CR: sẽ lên high nếu Aurel đọc luật theo nghĩa đen) | thẻ 03 dòng 76–78 (03.2) ↔ thẻ 04 N2 dòng 105; `branches/aurel-main.md` dòng 80 | 03.2 cho Gokudera tự buột ra lòng ngưỡng mộ mà trang chưa cho lý do. Hợp đồng nhánh cấm đúng điều đó. Thẻ **có biết** (writer-only dòng 161–163: *"phải để nguyên như thế"*), và ô đề xuất 03.2 có ghi *"⚠️ Lòng kính trọng này chưa có lý do trên trang"*, nhưng **không nói rằng nó chạm dòng cấm của hợp đồng**. Một phần nhận định của PR (ô đề xuất không nói gì) **không còn đúng nguyên văn**: ô có cảnh báo, chỉ thiếu tên luật. Lòng ngưỡng mộ có sẵn ở nguyên tác (reviewer: 13.62–64; chưa đối lại zh), lý do trên trang tới ở ch19. Lối lùi có sẵn: 03.2-a + 04.2-b. | Hợp đồng nhánh: *"Nhân vật thích Tsuna mà **trang không cho lý do**"* · thẻ 03: *"“纲吉先生是非常了不起的人！我……我一直很仰慕他！”"* | đã đối (thẻ, hợp đồng) |
| M8 | medium | PR-PM8 · CR-CM4 | thẻ 01 dòng 59–61, 72–82, 85–86 ↔ thẻ 01 writer-only dòng 122–124 ↔ thẻ 03 03.9 dòng 222 ↔ plan C4 dòng 181 | **Hai chuẩn cho một dữ kiện chưa khoá** ("kiếp trước Gokudera có từng tới nhà Sawada không": plan-reviewer 28/09 mục #11 còn ngỏ). Thẻ 01 cho chân anh **rẽ trước khi nghĩ**, **tự dừng đúng nhà**, và *"初次见面"* nghe sai sai trong miệng. Thẻ 03 từ chối câu "vị cơm quen" vì đúng lý do đó. Thêm (CR): thẻ 01 không cho anh nguồn nào trên trang để biết tới thị trấn (không địa chỉ, 安杰丽卡 tra không ra, trần C4 chỉ là hai cái tên + ý định + cảm giác ở chân), nên "tìm được nhà" dựa đúng vào dữ kiện chưa khoá. **Lưu ý của tôi:** dàn ý beat 1 đã duyệt chính nó viết *"tìm theo trí nhớ"* và *"một cảm giác quen"*; nên thẻ 01 nằm trong dàn ý đã duyệt, còn 03.9 **chặt hơn** dàn ý. Lỗi là hai chuẩn, không phải thẻ 01 vượt dàn ý. | Thẻ 01: *"Kiếp trước anh từng tới ngôi nhà này hay chưa: CHƯA CHỐT."* ↔ thẻ 01 nhịp 4–6: *"chân đã rẽ trước khi đầu kịp nghĩ"*, *"chân anh **tự dừng**"*, *"hai chữ "初次见面" nghe **sai sai**"* ↔ thẻ 03 03.9: *"Một câu về vị cơm … ngầm khẳng định kiếp trước anh từng ăn ở đây, là chỗ **chưa chốt**"* | đã đối |
| M9 | medium | PR-PM9 · **TK (thêm đối chiếu với 03.7)** | thẻ 04 dòng 99–100 (nhịp 3), 103, 200; foreshadow dòng 18; thẻ 03 03.7 dòng 220 | Câu "được phép" tự trái với các cấm của chính thẻ. Với POV mang ký ức, *"hai người chưa gặp nhau lần nào"* **đã là** kết luận "Tsuna không nhớ mình", mà thẻ cấm và gán cho ch19 beat 1–2. **TK thêm:** thẻ 03 03.7 đã chọn đặt `hint` ở cảnh 03 đúng vì đặt ở 04 *"dễ trượt thành 十代目不记得我"*; thẻ 04 rồi đặt ngay sau câu của Tsuna một ý nghĩ cùng loại. | Thẻ 04: *"十代目 nói không sai; hai người **chưa gặp nhau lần nào**, và chữ *朋友* là chữ anh tự nói ra ở cửa"* ↔ cùng thẻ: *"🔴 Không: *"十代目不记得我"*"* và foreshadow: *"KHONG ket luan '十代目不记得我'"* | đã đối |
| M10 | medium | CR-CM5 | thẻ 01 nhịp 1 dòng 61–64 và nhịp 6 dòng 84; plan C5 | Điện thoại ở trong tay anh cả buổi chiều (cất lúc 傍晚), nhưng anh **không được thấy** cảnh Tsuna đưa nước, mà ở ch17 cảnh đó đứng ngay sau câu "米" (dòng 92 → 108). Không thẻ nào nói anh ngừng xem lúc nào, nên "Gokudera đã thấy gì về S2" không xác định cho delta ch18 và ch19 beat 4. Gắn với H1 (nếu sửa khung hình mà vẫn để anh xem tiếp thì vướng C5). | Thẻ 01: *"một tay xách túi quà, một tay cầm điện thoại"* … *"**cất điện thoại vào túi**"* (nhịp 6) ↔ plan C5: *"🔴 Anh **không** thấy / không bình phẩm khoảnh khắc Tsuna đưa nước cho trợ lý thu âm"* | đã đối |
| M11 | medium | CR-CM8 | thẻ 03 dòng 78 và dòng 91–92 | Hai chỗ báo trước ở phần lên trang không nằm trong `foreshadow:` của thẻ. (1) Nana nói trước *"这话要是让阿纲听见，他肯定要躲进被子里去了"*, gieo cho phần thuật lại ở thẻ 04. (2) Một mệnh đề đánh dấu câu "bỗng giỏi, bận" là quan trọng, gần với hai bí mật. Luật: nhịp nào không nằm trong danh sách thì không được báo trước. (Phân loại là của CR; câu chữ có thật trong thẻ.) | Thẻ 03: *"anh ghi câu ấy vào đầu như ghi một nốt nhạc chưa biết thuộc bài nào"* · *"“仰慕？哎呀，这话要是让阿纲听见，他肯定要躲进被子里去了。”"* | đã đối câu chữ |
| M12 | medium | CR-CM9 (nửa sau, medium) · PR-PL7 (low) | `secrets/tsuna-la-omega-tdtb.md`, `secrets/ky-uc-tuong-lai-tdtb.md` | Hai bí mật nguy hiểm nhất không có `leak_terms`; `pov_leak_check` sẽ không bắt 分化 / Omega / beta / 信息素 / 抑制剂 / 医院 trong khối Nana. Tôi đối bằng grep `leak_terms` trong `secrets/`: chỉ có năm note (`tsuna-co-he-thong…`, ba note Tuyết, `ky-uc-hoa-bach-hop`). Sửa nhiều note bí mật nên cần Aurel đồng ý (như D9 của ch17). | grep: không có `leak_terms` ở hai note trên | đã đối |

### Low

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích | Đối |
|---|---|---|---|---|---|---|
| L1 | low | PR-PL1 | thẻ 02 dòng 82 ↔ thẻ 03 dòng 70 | 今天 ngụ ý ngày khác con có nhà; thẻ 03 nói con ở Tokyo một mình. | *"“不过阿纲今天不在家哦。”"* ↔ *"“阿纲在东京念大学…”"* | đã đối |
| L2 | low | PR-PL2 · CR-CL5 | thẻ 03 dòng 70 | "一年也回不来几趟" ngụ ý đã xa nhà hơn một năm; Tsuna 19 tuổi (ch3.16), mốc khai giảng chưa rõ. | *"一年也回不来几趟"* | đã đối câu; mốc khai giảng: tin reviewer |
| L3 | low | PR-PL3 | thẻ 03 dòng 85–86 | Chi tiết 头盔 để lại ở Ý, 机甲 mấy ngày không ai lái: là của thẻ, không có trong 2.40–41 (anh chỉ xem một trận); không gắn nhãn `assumed`. | *"chiếc 头盔 của anh còn vứt trong phòng ở Ý"* | đã đối |
| L4 | low | PR-PL4 · CR-CL1 · CR-CL2 · CR-CL3 | plan dòng 35–36, 128–131, 96–98, 185–192, 207–209, 244–245, 250 | **Plan cũ so với thẻ.** Các hàng: trạng thái thẻ 03/04 còn "chưa có file" (dòng 245) và hai wikilink gãy "tự hết" (dòng 250), nay cả hai thẻ đã có; ngân sách từng hàng (xem bảng ở trên); bảng hook thiếu cảnh 02 cho `h-tsuna-khong-co-ban` (dòng 98); mục foreshadow ghi không đoán cuộc gọi trong khi thẻ 02 mang `state` cho nó (M2); C8–C15 còn "mặc định" thay vì trỏ vào đề xuất của thẻ (dòng 185–192); đầu plan còn ghi "chưa đối chiếu" (dòng 35–36). Cộng thêm: thẻ 01 và 03 giữ ngân sách đúng như plan ở hàng 01. | Plan: *"Thẻ cảnh 03 · 04 | ⏳ worker C viết song song — **chưa có file**"* | đã đối. Hàng placeholder `DOCTOR_ROW` mà worker nêu: **grep không còn trong thư mục ch18**, không áp dụng nữa |
| L5 | low | PR-PL5 | thẻ 04 dòng 15–18 | `foreshadow:` khai một `hint` mà note của chính nó nói cảnh 04 không dùng. | *"Canh 04 KHONG nhac lai, KHONG them y moi"* | đã đối |
| L6 | low | PR-PL6 | plan bảng trope dòng 81–88 ↔ thẻ 03 dòng 166–168 | Cờ trope "khoảng cách dài từ gieo tới trả của 掉马 lớp 1 (ch18 → arc 5)" nằm ở writer-only thẻ 03, không có trong bảng trope của plan. | Thẻ 03: *"Từ ch18 tới đó xa hơn nhiều so với nhịp trả mạch của 乐博"* | đã đối |
| L7 | low | PR-PL8 | `questions/_MOC.md` | Không liệt kê `q-yamamoto-di-dau-ngay-s2-tdtb` (file có trong `questions/`). | grep `_MOC.md`: 0 khớp | đã đối |
| L8 | low | PR-PL9 · CR-CL9 | thẻ 04 dòng 93–94 | "Lần trước nhìn thấy 十代目 qua màn hình" nói về 13.64, trong khi lần gần nhất là trưa nay (thẻ 01) — thẻ 04 ngay trên đó cũng nói *"giọng trưa nay trên 直播"*. | *"lần trước nhìn thấy 十代目 qua màn hình, anh đã gào lên giữa cửa hàng quà (vọng 13.64)"* | đã đối |
| L9 | low | CR-CL4 | thẻ 03 dòng 63 ↔ dòng 67 | Bàn "nhiều hơn hẳn mức hai người ăn hết" đi sát điều thẻ cấm ngay dòng dưới (không đếm bát đũa, không dấu vết Iemitsu). | *"nhiều hơn hẳn mức hai người ăn hết"* ↔ *"🔴 Không đếm bát đũa, không ghế trống"* | đã đối |
| L10 | low | CR-CL6 | thẻ 03 dòng 70 ↔ thẻ 02 dòng 132, thẻ 04 dòng 125 | Thẻ 03 dùng *"一个人在外面"* trong lời Nana; thẻ 02 và 04 liệt chính cụm này vào danh sách Nana không được nói. | thẻ 03: *"一个人在外面租房子住"* ↔ thẻ 02: *"không lo con *一个人在外面*"* | đã đối |
| L11 | low | CR-CL7 | thẻ 03 dòng 83, 98, 143; thẻ 01 dòng 69 | Trích dẫn nói quá nguồn: 10.47 chỉ có "回家玩游戏", không có "叫他吃饭都叫不动"; kệ manga dựa vào 15.20 / 15.27 mà ở đó manga đọc trên điện thoại; thẻ 01 nói đi thăm Nana trước là "đúng ý định ở 13.62" trong khi 13.62 nói *"拜访十代目"*. Phần "13.62 dừng trước khi anh trả tiền" là của reviewer, tôi chưa đối. | thẻ 03 nguồn: *"10.47: …基本上到了放学时间就是回家玩游戏的份"*; 15.27: *"咸鱼纲吉躺在床上，悠闲地刷着漫画"* | đã đối ba trong bốn chỗ |
| L12 | low | CR-CL8 | thẻ 04 dòng 167 ↔ nhịp N3 dòng 109 | Thẻ nói bên Tsuna chỉ cố định thêm **một** thứ (một câu có 明天), nhưng N3 *"“是谁呀？…”"* lặp một câu hỏi thứ hai của cậu. | *"Thứ **duy nhất** ch18 cố định thêm cho phía Tsuna: sau N3 cậu nói một câu **có chữ *明天***"* | đã đối |
| L13 | low | CR-CL10 | thẻ 02 dòng 210 | "Chỉ mang **một** lời nói chưa đúng (chữ 朋友)" nói thiếu: câu mẫu còn có *"专程来拜访他"*, và chuyện giả vờ ngạc nhiên (phần giả vờ: chưa đối). | thẻ 02: *"anh mang **một** lời nói chưa đúng"* | đã đối vế *专程* |
| L14 | low | CR-CL11 | thẻ 01 dòng 84; thẻ 04 dòng 106 và 111 | Đồ vật: không ai đặt mũ / kính / khẩu trang đã tháo hay hộp đồng hồ sau cánh cửa; thẻ 04 để hộp *"còn trong tay anh"* trong khi anh *"xua cả hai tay"*. | thẻ 04: *"hộp đồng hồ còn trong tay anh"* ↔ *"xua cả hai tay"* | đã đối |
| L15 | low | CR-CL12 | thẻ 02 dòng 92, thẻ 03 dòng 64–65; thẻ 03 dòng 77, thẻ 04 dòng 89–90 | Hình ảnh lặp: lưng thẳng + hai tay đặt trên gối (02 và 03); "thẳng thêm một nấc" (03 và 04). | *"lưng thẳng, hai tay đặt trên gối"* · *"lưng thẳng thêm một nấc"* | đã đối |
| L16 | low | CR-CL13 | thẻ 04 dòng 87 ↔ thẻ 03 dòng 148 | Thẻ 04 mở "Tầng dưới", cam kết phòng Tsuna ở tầng trên; thẻ 03 ghi *"楼上"* là `assumed`. | thẻ 03: *"chữ *"楼上"* là `assumed`"* | đã đối |
| L17 | low | CR-CL14 | thẻ 02 dòng 74–75 | Mệnh đề trong ngoặc về trạng thái Gokudera (*"Lời chào anh tập ở cảnh 01 đã bay sạch"*) nằm trong khối POV Nana. Nó đứng trong ngoặc nên có thể là ghi chú cho writer; rủi ro là bị chép lên trang. | *"(Lời chào anh tập ở cảnh 01 đã bay sạch; câu ở đây là câu **bật ra**.)"* | đã đối câu; ý "chép lên trang" là của reviewer |
| L18 | low | CR-CL15 | thẻ 01 dòng 68–69 | Cho Gokudera tự lý luận về chuyện xông vào trường quay, sát lệnh cấm "ý định lên show" của plan. | *"Một nghệ sĩ dương cầm xông vào trường quay một show phát trực tiếp thì thành tin tức"* ↔ plan: *"🔴 không tiêu … ý định lên show hay liên hệ đạo diễn"* | đã đối |
| L19 | low | **TK** | thẻ 03 dòng 91, thẻ 04 dòng 98 | Ngoặc `‘’` dùng để trích lời **trong** lời nói `“”`. `hard-rules` mục B dành `‘’` cho nghĩ thầm / hỏi thầm; tôi không thấy quy tắc nào về trích lồng. | thẻ 03: *"问他在忙什么，就说‘没什么’"* · thẻ 04 N1: *"什么叫‘哪来的朋友’呀？"* | đã đối câu; kết luận "chưa có quy tắc" là từ grep, `inspected` |
| L20 | low | **TK** | thẻ 01 dòng 90 ↔ thẻ 02 dòng 64; thẻ 02 dòng 94–95 ↔ thẻ 03 dòng 62; thẻ 03 dòng 109 ↔ thẻ 04 dòng 87 | Vạch cảnh `……` giữa mỗi cặp cảnh được viết ở **cả hai** thẻ. Hai người viết hai thẻ riêng sẽ ra hai vạch hoặc một vạch bị bỏ. | thẻ 01: *"Rồi vạch cảnh `……` sang khối Nana"* ↔ thẻ 02: *"**Cửa mở.** Vạch cảnh `……`"* | đã đối |
| L21 | low | **TK** | thẻ 04 dòng 108 ↔ dòng 45 | Dòng tuỳ chọn `狱寺：！！！` đứng khi máy còn mở, trong khi thẻ cấm *"Gokudera không nói một tiếng nào trong lúc máy còn mở"*. Dòng `Tên：` kèm `！！！` đọc ra tiếng; `……` thì không (ch17 dùng `副导演：……`). | *"*Tuỳ chọn:* một dòng **`狱寺：！！！`** ở đây"* ↔ *"🔴 **Gokudera không nói một tiếng nào** trong lúc máy còn mở."* | đã đối |
| L22 | low | **TK** | thẻ 04 N4 dòng 113 và N5 dòng 115 (04.6) | Chữ 明天 xuất hiện hai lần cách nhau chừng một chục chữ: *"明天？明天就回来呀？"* rồi *"阿纲说，他明天就回来哦。"* Câu cuối chương nhắc lại thứ anh vừa nghe. Đây là chỗ cân nhắc của 04.6, tôi đưa vào để Aurel thấy khi chọn. | *"“……嗯，嗯。明天？明天就回来呀？好好好，那妈妈等你哦。”"* → *"“阿纲说，他明天就回来哦。”"* | đã đối |

Không xếp mức (continuity-reviewer, linh cảm, không trích được ở một phía): một người đàn ông bịt kín mặt đi vòng cả buổi chiều trong khu dân cư, đặt cạnh câu ch12.8 về kỷ luật của Namimori. Tôi không đối được; ghi lại để writer cân.

Reviewer đối và **không** thấy vấn đề (tôi đối lại ở phần nào đọc được): tám chuỗi lời thoại ch17 cảnh 04 khớp từng chữ (tôi đối bốn câu của Nana và ba câu của Tsuna ở dòng 240–256 của `ch17-chapter.md`: khớp plan và thẻ 04) · điểm rơi và giờ cuộc gọi · 174 chuỗi trích nguyên văn · đánh số đoạn · bảy bí mật đều có cột trong từng thẻ · cách xưng hô khớp giữa thẻ 02–04 · đồ vật (một túi, dưỡng da giữ, đồng hồ trả lại) · chuỗi cảnh · ràng buộc 1–8 và beat 1–5 đều có mặt · hạt ch19 chưa bị tiêu · bốn câu hỏi `unresolved` (ch19 / ch20 / ch36 / ch48) · không chi tiết mùa, không giờ đồng hồ.

## Mối nối giữa các phần

Tôi đọc cạnh nhau cả năm file và ch17 `final`. Tiền đề: số dòng là hiện tại.

| Mối nối | Kết luận | Ghi chú |
|---|---|---|
| ch17 cảnh 02 → thẻ 01 nhịp 1 (khung mở chương) | **lệch** (H1) | Bên ch17 dòng 92: *"纲吉认真想了一秒，看看盆里的米，诚恳地开口：“……今天的米，挺白的。”"*, dòng 100–102: *"挪到厨房最远的角落"*, *"一屁股坐上去"*. Bên thẻ 01 dòng 62: *"十代目 ngồi ở góc bếp, vo gạo"*. |
| Plan ↔ thẻ 01 (tháo đồ che mặt, điện thoại, túi) | ổn, kèm M10 và L14 | C6 khớp từng mục với thẻ 01 nhịp 6 và với thẻ 02 nhịp 1 (một túi giấy, đồ che mặt đã tháo, anh chưa nói gì). Còn hở: anh xem livestream tới lúc nào (M10); mũ/kính/khẩu trang đặt đâu (L14). |
| Thẻ 01 → 02 (cửa mở → trong nhà) | ổn, kèm L20 | Cùng khoảnh khắc, một câu chồng nhau tối đa; Nana không nói gì ở 01; thấy tóc bạc và mặt đúng thứ tự ch17 (tóc 银白色 → 外国人 → 长得可帅了). Vạch `……` bị viết ở cả hai thẻ. |
| Thẻ 01 ↔ thẻ 03 (chuẩn về "cảm giác quen" và nhà Sawada) | **lệch** (M8) | Bên 01: *"chân anh **tự dừng**"*, *"初次见面" nghe **sai sai**"*; bên 03 (03.9): *"Một câu về vị cơm … là chỗ **chưa chốt**"*. |
| Thẻ 02 ↔ thẻ 03 và 04 (Nana có biết con lên show không) | **lệch** (M1) | Bên 02/04: *"这个时间他不接电话的"*, *"差不多到时间了"*. Bên 03: *"一个人在外面租房子住"*, Gokudera biết con đang ở show mà im. |
| Thẻ 02 02.8 ↔ thẻ 03 nhịp 7 (số lần cúi) | **lệch** (M3) | Bên 02: *"**Một** lần cúi gập người"*; bên 03: *"**không** đếm tiếp vào ba lần của thẻ 02"* và thêm cúi chào căn phòng trống. |
| Thẻ 02 02.4 → thẻ 03 → thẻ 04 (hộp đồng hồ ở đâu) | ổn câu chữ, hở đồ vật (L14) | 02: Nana trả hộp; 04 N2: *"还给你带了礼物呢"*, hộp *"còn trong tay anh"*. Thẻ 03 không nhắc hộp ở bàn ăn, ngoài cửa phòng; lúc lên cầu thang không ai nói anh để nó ở đâu. |
| Thẻ 02 → thẻ 03 (cuối khối Nana → bàn ăn) | ổn, kèm L9, L15 | Nana kết ở *"今天可得多做两个菜才行"*; thẻ 03 mở bằng bàn đầy món. Địa chỉ xưng hô khớp (伯母 / 阿姨 / 狱寺君 / 纲吉先生). |
| Thẻ 03 → thẻ 04 (cửa phòng → tầng dưới) | ổn, kèm L16, M9 | Thẻ 03 dừng ở cửa phòng với `hint`; thẻ 04 mở tầng dưới, bàn đã dọn. Nhưng thẻ 04 đặt ý nghĩ cùng loại với `hint` ngay sau câu của Tsuna, đúng cách thẻ 03 03.7 đã tránh (M9). |
| Thẻ 04 ↔ ch17 cảnh 04 (cùng một cuộc gọi) | ổn | Bốn câu của Nana cố định và bốn câu của Tsuna, dấu `……` cuối câu nằm trong ngoặc, khớp `ch17-chapter` dòng 240–256. Điểm lệch duy nhất là L12: N3 lặp một câu hỏi thứ hai của Tsuna. |
| Thẻ 04 → ch19 | ổn, phụ thuộc quyết định | ch19 beat 1 cần Tsuna tin sắp gặp fan: 04.2-a đáp ứng bằng *仰慕 … 很久*. Beat 1 cũng cần Gokudera có mặt khi Tsuna về: bị M4 chặn nếu giữ lệnh "không mời ngủ lại" với lý do sai. Ràng buộc 2 (*"Gokudera nghe được"*) bị 04.1-B đổi thành "biết qua Nana": cần Aurel đồng ý và sửa chữ ở dàn ý. |
| Plan ↔ bốn thẻ (số liệu, trạng thái) | **lệch nhẹ** | L4. Tổng chữ Hán (2.800) và tổng thuật ngữ (28) khớp. Lượt thoại 26 so với 27, thoại có trọng số 24,8 % so với ~28 %. |
| Plan ↔ thẻ 02 (số lần báo trước) | **lệch** (M2) | Bên plan: *"không đoán Nana sẽ gọi điện"*; bên thẻ 02: `level: state … Nana goi dien cho Tsuna`. |
| Thẻ 02 ↔ plan C14 (đêm S2) | **lệch** (M4) | Bên 02: *"(d) tối S2 anh về khách sạn (beat 6)"*; bên plan: *"Ch18 không được chặn đường nào trong hai."* |
| Giọng, thời gian trong ngày (傍晚 → bữa tối → 天黑), POV (không có đoạn nào của Nana ngoài thẻ 02) | ổn | 01 kết 傍晚; 02 không nhắc giờ; 03 là bữa tối; 04 mở *"天黑"*. Không có chi tiết mùa, không giờ đồng hồ (thẻ 04 cho Nana nhìn đồng hồ, không nêu giờ). |

## Cần Aurel quyết

Hai loại tách riêng. **Loại 1 là sai** (trái ch17 `final`, trái quyết định đã khoá, hoặc tự trái trong thẻ): worker sửa, không cần Aurel chọn; xem "Sửa cơ học". **Loại 2 là lựa chọn**, xếp theo thứ tự nên trả lời (cái đứng trước chặn cái đứng sau). Mỗi mục: một câu hỏi, phương án, đề xuất của worker. Nếu worker không đề xuất thì ghi rõ "worker không đề xuất".

### Loại 1 — sai, không phải việc chọn

| # | Chỗ sai | Trái với |
|---|---|---|
| W1 | Khung mở chương: Tsuna "ở góc bếp" lúc nói câu "米" (H1) | ch17 `final` dòng 92–102 |
| W2 | Lý do "tối đó anh ở khách sạn" cho lệnh cấm mời ngủ lại (M4) | dàn ý ch19 beat 6 (đó là đêm sau) và plan C14 |
| W3 | Thẻ 03 cúi lần hai trái lý do của 02.8 và gọi sai "ba lần" (M3) | thẻ 02 02.8 |
| W4 | Thẻ 02 khai ba lần báo trước, plan cho một (M2) | plan dòng 207–209; dàn ý "Foreshadow được phép" |
| W5 | Thẻ 04: câu "được phép" nhịp 3 = kết luận mà thẻ tự cấm (M9) | thẻ 04 dòng 103 và 200 |
| W6 | Thẻ 02 và 04 tự nhận "trung lập" trong khi nghiêng về Nana biết con lên show (M1) | plan C10 mặc định "chưa chốt"; ch17 04.6 |

W6 và W4 chỉ **hết** sai sau khi Aurel trả lời quyết định 3 và 6; bốn mục kia sửa ngay.

### Loại 2 — lựa chọn, theo thứ tự

1. **Đọc luật "nhân vật thích Tsuna mà trang không cho lý do" thế nào** (M7). Chặn 03.2 và 04.2.
   (a) Đọc theo nghĩa đen: cấm cả *仰慕* khi chưa có lý do → bỏ 03.2, dùng 04.2-b (quà + đường xa), yếu hơn. (b) Cho phép như thẻ 03: lòng kính trọng ở ch18 là trạng thái của ký ức, lý do trên trang trả ở ch19 beat 3–4 (writer-only thẻ 03 dòng 161–163). **Worker C đề xuất (b)**, kèm lối lùi (a); plan-reviewer chỉ yêu cầu ô đề xuất nói rõ nó chạm luật.
2. **#11 — Gokudera kiếp trước có đường tới nhà Sawada và biết Nana không** (M8). Chặn C4, thẻ 01 nhịp 4–6 và 03.9.
   (a) Khoá: có (ký ức có đường tới nhà và có Nana) → một chuẩn cho cả 01 và 03, 03.9 có thể nới. (b) Không khoá, ký ức chỉ có hai cái tên và ý định → thẻ 01 phải bỏ "chân tự rẽ / tự dừng" và "初次见面 sai sai", và phải trả lời anh biết thị trấn từ đâu. (c) Giữ như C4: chỉ cảm giác ở chân + biển tên, và từ chối "vị cơm quen" ở 03.9 → hai chuẩn, như hiện nay. **Worker A đề xuất C4 (c)**; plan-reviewer: C4 như viết đã ngầm khoá (a), nên nói rõ rồi dùng một chuẩn. Dàn ý beat 1 đã duyệt chữ *"tìm theo trí nhớ"* và *"cảm giác quen"*.
3. **C10 — Nana có biết con lên show không** (M1, M5). Chặn 02.5, 04.7, 03.8, 04.8, 04.2-c.
   (a) Biết → 03 phải bỏ "一个人在外面" và Gokudera không cần giấu; 04.2-c mở ra. (b) Không biết → bỏ chữ giờ giấc ở 02.5 và 04.7; Gokudera im vì lý do khác. (c) Giữ mở → gỡ chữ chỉ lịch của con ở 02 và 04 (hướng sửa của cả hai reviewer). **Plan C10 và thẻ 02: giữ mở (c)**; worker không đề xuất lý do giờ gọi thay thế.
4. **Mở note `question` cho các dữ kiện thế giới về Nana, hay ghi vào delta** (M5). Hàng checklist thiếu của plan-reviewer.
   (a) Mở bốn note (Omega · show · giới của bà · ký ức Verde), theo D11 của ch17, và ghi vào `_MOC` (L7). (b) Chỉ ghi vào delta ch18 như mục mở, không tạo note. **Plan-reviewer nghiêng (a)**; thẻ 02 chỉ nêu bốn mục, không chọn. Câu show phụ thuộc quyết định 3.
5. **Nana nào: bà ấm không chê con, hay "vô tâm cấu trúc" theo gia thuyết của Aurel** (M6).
   (a) Giữ như thẻ: không chê con, không 废柴 (khớp beat 2 "Nana ấm" và tông 乐博). (b) Một nhịp nhẹ theo nguồn của Aurel, ví dụ kiểu nói vô tâm nhưng vẫn ấm. (c) Hỏi riêng. Worker không đề xuất; các thẻ mặc nhiên chọn (a) trong khối cấm. Plan-reviewer: đưa vào bảng đề xuất để Aurel chọn.
6. **02.5 (báo trước cuộc gọi) và 02.4 (trả hộp đồng hồ): chấp nhận mấy lần báo trước** (M2, M4). Phụ thuộc 3.
   02.5: (a) giữ một câu "tối bà gọi" (**Worker B đề xuất**, và là lý do 04.7 khớp); (b) bỏ, để cảnh 03/04 tự giải thích; (c) bà gọi ngay ở cửa, không ai bắt máy (thêm một cuộc gọi nhỡ ch17 không nhắc). 02.4: (a) trả hộp, *"你自己交给他"* (**Worker B đề xuất**, vì ch19 beat 3 cần còn món cho Tsuna); (b) bà giữ hộ và đặt lên bàn học (khi đó 03.6 thêm một câu); (c) cả hai món là của nhà, ch19 beat 3 đổi ví dụ. Dù chọn gì, cần Aurel đồng ý số lần báo trước thẻ 02 được khai (M2), và sửa dàn ý beat 2 nếu đổi ai nhận đồng hồ.
7. **Đêm S2 của Gokudera** (M4, C14, 04.9).
   (a) Ch18 im lặng cả hai đường; bỏ lệnh cấm "không mời ngủ lại" và lý do sai (**plan C14 và 04.9 đề xuất**). (b) Nana mời ngủ lại → ch19 beat 1 và beat 6 phải soạn lại. (c) Anh về khách sạn đêm đó (thẻ 04 phương án khác: một câu xin phép trước N5, làm loãng câu cuối) → ch19 beat 1 phải sắp lại.
8. **04.1 — Gokudera nghe câu "……我哪来的朋友？" thế nào.** Đổi mặc định ràng buộc 2 của dàn ý (đã duyệt 01/10, "nghe được").
   (A) Nghe trực tiếp qua 免提 (phải dựng loa ngoài mà ch17 không gợi; Nana gọi tên là lộ tên). (B) Nghe giọng, không nghe chữ; nội dung tới qua Nana. (C) Không biết nội dung. **Worker C đề xuất B**: khớp ch17 `final`, anh vẫn biết câu trước khi gặp Tsuna. Nếu chọn B thì sửa chữ ràng buộc 2 ở dàn ý.
9. **04.2 — mẩu "fan" làm Tsuna nghĩ ra chữ 粉丝.** Phụ thuộc 1, 3, 8.
   (a) *仰慕 … 很久* + *专门大老远* + *礼物*, do Nana thuật lại (**Worker C đề xuất**; cần 03.2 và, cho mảnh *礼物*, 02.4). (b) Chỉ quà và đường xa. (c) Qua show: *"他说在直播上看到你了"* (cần quyết định 3 là "biết"). Cả ba: không là tên, nghề hay chữ 十代目.
10. **Câu cho phép ở thẻ 04 nhịp 3** (M9). Phụ thuộc 8.
    (a) Chỉ dựa vào chữ 朋友 là chữ anh tự nhận ở cửa, bỏ "chưa gặp nhau lần nào" (hướng sửa của plan-reviewer). (b) Giữ, và Aurel nhận rằng đó là bước đầu của kết luận ch19 beat 1–2, rồi sửa các cấm của thẻ và thẻ 03 03.7. (c) Aurel đưa đúng câu cho phép. Worker không đề xuất.
11. **04.3, 04.4, 04.6 — lời hứa, tên bị giữ, câu cuối chương.**
    04.3: (a) lời hứa qua nửa cuộc gọi của Nana (**Worker C**), (b) một câu Tsuna lọt ra, (c) loa ngoài. 04.4: bà tự giữ trò đoán (**Worker C**), hoặc Gokudera xin giữ kín (thêm một `state`), hoặc không ai nhắc tên. 04.6: *"“阿纲说，他明天就回来哦。”"* (**Worker C**), hoặc dòng `狱寺：！！！`, hoặc câu kể *"明天。"*, hoặc câu Tsuna ở 04.3-b. Lưu ý L22 (明天 lặp hai lần) và L21 (`！！！` khi máy mở).
12. **02.1 — Gokudera xưng gì với Nana.** Phụ thuộc 11 (04.4).
    (a) Đủ họ tên 狱寺隼人, bà gọi 狱寺君 (**Worker B đề xuất**, rủi ro: lọt tên qua máy thì Tsuna tra ra ngay). (b) Chỉ 隼人 (an toàn nhất cho ch19, hài yếu hơn). (c) Bà mải mời vào, quên hỏi tên (trái 04.3 của ch17).
13. **02.8 — cúi mấy lần.** Hết W3 sau khi chọn.
    (a) Một lần (**Worker B**). (b) Ba lần với câu đếm kiểu 乐博 (hài hơn ở đây, ch19 cũ đi). Nếu (a): bỏ cú cúi căn phòng ở thẻ 03.
14. **03.4 và 03.5 — gợi 掉马 lớp 1 đến đâu, bà tả game đến đâu.**
    03.4: (b) một câu kể về 头盔 / 机甲 / 收藏夹, không ID (**Worker C**, kèm nhãn `assumed` cho chi tiết 头盔 ở Ý, L3); hoặc (a) chỉ *"我也玩一点"*; hoặc (c) tên *XXXX27* hiện trong đầu (dự định mới, dàn ý chưa có). 03.5: chỉ *打游戏*, tuỳ chọn *开机器人* (**Worker C**).
15. **Sửa vault** (M5, M12, và các sửa worker đề nghị mà **chưa** làm). Cần đồng ý trước khi ghi:
    `leak_terms` cho `tsuna-la-omega-tdtb` và `ky-uc-tuong-lai-tdtb` (M12); Nana vào `unknown_to` / `known_by` của các bí mật; một note quan hệ cho Nana ghi cách xưng (M5); alias 安杰丽卡 ở `Characters`; `signature.md` hai số đo (số lần `与此同时`; "câu cuối ngắn" đo trung vị 28 chữ, ngay ở thẻ 04 dòng 147–149); chữ ràng buộc 2 ở dàn ý (nếu 04.1-B); ai nhận đồng hồ ở dàn ý beat 2 (nếu 02.4 đổi); xác nhận hoặc ghi cách xưng KHR vào `Database/Fandom/KHR`.
16. **Các đề xuất còn lại, chưa reviewer nào phản đối, vẫn cần đồng ý của Aurel:** C1 (tiêu đề), C2 (đề xuất mở chương bằng màn hình điện thoại; phương án b/c đã bị worker loại), C3, C5, C6, C7; 02.2, 02.3 (cách xưng `assumed`), 02.6, 02.7; 03.1, 03.3, 03.6, 03.7, 03.9 (sau quyết định 2); 03.8, 04.7, 04.8 (sau quyết định 3); 04.5, 04.9 (sau quyết định 7). C8–C15 chỉ là mặc định của dàn ý trỏ sang các thẻ; trả lời ở 02.2, 02.4, 02.5 / 03.8 / 04.8, 04.1, 04.2, 04.3 / 04.6, 04.9, 03.4.

## Sửa cơ học (không cần Aurel chọn)

Người sửa là worker sở hữu file; tôi không sửa. Mục có mũi tên chờ quyết định ở trên.

| # | Sửa | File · dòng | Người sửa | Nguồn |
|---|---|---|---|---|
| F1 | Bỏ "góc bếp" ở **cả hai** chỗ; tả khung hình chỉ là Tsuna đang vo gạo, chưa chuyển ra góc, chưa ngồi ghế | plan C2 dòng 179; thẻ 01 dòng 62 | A | H1 |
| F2 | Ghi rõ lúc nào Gokudera thôi xem livestream (trước cảnh đưa nước), và ghi "anh đã thấy gì của S2" cho delta ch18 | thẻ 01 nhịp 1 / nhịp 6; plan C5 | A | M10 |
| F3 | Gỡ lý do "tối đó anh ở khách sạn"; đổi lệnh cấm mời ngủ lại thành "không khẳng định hướng nào" (theo quyết định 7a), ở cả ba thẻ nhắc nó | thẻ 02 dòng 96, 172; thẻ 03 dòng 224; thẻ 04 dòng 254 | B, C | M4 |
| F4 | Bỏ lần cúi chào căn phòng, hoặc ghi nó là lần thứ hai và đổi 02.8 (theo quyết định 13); sửa "ba lần của thẻ 02" | thẻ 03 dòng 100–101 | C | M3 |
| F5 | Bỏ 今天 | thẻ 02 dòng 82 | B | L1 |
| F6 | Thay "一年也回不来几趟" bằng cách nói trung tính, hoặc ghi `assumed` | thẻ 03 dòng 70 | C | L2 |
| F7 | Gắn nhãn `assumed` cho 头盔 ở Ý và 机甲 không ai lái | thẻ 03 dòng 85–86 | C | L3 |
| F8 | Gỡ mục `hint` của thẻ 04, hoặc ghi "không có báo trước ở cảnh này" | thẻ 04 dòng 15–18 | C | L5 |
| F9 | Sửa các hàng cũ của plan: trạng thái thẻ 03/04; wikilink gãy; ngân sách từng hàng; hàng hook thêm cảnh 02 cho `h-tsuna-khong-co-ban`; mục foreshadow; C8–C15 trỏ vào đề xuất của thẻ; dòng "chưa đối chiếu" ở đầu plan | plan dòng 35–36, 96–98, 128–131, 185–192, 207–209, 244–245, 250 | A | L4 |
| F10 | Thêm vào bảng trope của plan cờ "掉马 lớp 1: khoảng cách dài tới arc 5" | plan dòng 81–88 | A | L6 |
| F11 | Thêm `q-yamamoto-di-dau-ngay-s2-tdtb` vào `questions/_MOC.md` | `questions/_MOC.md` | không worker (ngoài thư mục ch18) | L7 |
| F12 | Sửa "lần trước nhìn thấy … qua màn hình" thành lần đầu / thành lần ở cửa hàng quà gắn đúng; sửa "chỉ một thứ cố định bên Tsuna" cho khớp N3 | thẻ 04 dòng 93–94, 167 | C | L8, L12 |
| F13 | Đổi "nhiều hơn hẳn mức hai người ăn hết" cho khỏi gợi đếm; đổi *"一个人在外面"* trong câu mẫu của Nana | thẻ 03 dòng 63, 70 | C | L9, L10 |
| F14 | Sửa trích dẫn quá nguồn: bỏ hoặc nhãn lại "叫他吃饭都叫不动" (10.47); kệ manga dựa 15.20/15.27 ghi `inferred`; 13.62 là *"拜访十代目"* | thẻ 03 dòng 83, 98, 143; thẻ 01 dòng 69 | C, A | L11 |
| F15 | Đặt chỗ cho mũ / kính / khẩu trang và hộp đồng hồ; sửa "còn trong tay anh" khi xua cả hai tay | thẻ 01 dòng 84; thẻ 04 dòng 106, 111 | A, C | L14 |
| F16 | Đổi một trong hai chỗ lặp "lưng thẳng / hai tay trên gối" và "thẳng thêm một nấc" | thẻ 02 dòng 92; thẻ 03 dòng 64–65, 77; thẻ 04 dòng 89–90 | B, C | L15 |
| F17 | Ghi *"Tầng dưới"* là `assumed` hoặc mở cảnh không nói tầng | thẻ 04 dòng 87 | C | L16 |
| F18 | Chuyển mệnh đề trong ngoặc về Gokudera ra writer-only; sửa "một lời nói chưa đúng" thành "chưa đúng hoàn toàn" hoặc bỏ | thẻ 02 dòng 74–75, 210 | B | L13, L17 |
| F19 | Viết lại lý do không đi lên show của Gokudera để khỏi chạm "ý định lên show" | thẻ 01 dòng 68–69 | A | L18 |
| F20 | Chọn một bên viết vạch `……` cho mỗi cặp cảnh | thẻ 01–04 | A, B, C | L20 |
| F21 | Trích lồng trong lời nói: dùng `“”` bằng cách viết lại, hoặc xin Aurel thêm vào `hard-rules` mục B | thẻ 03 dòng 91; thẻ 04 dòng 98 | C (hoặc Aurel, nếu thêm luật) | L19 |
| F22 | Khai báo `foreshadow` của thẻ 03 hai chỗ chưa khai (nốt nhạc; "躲进被子里"), hoặc bỏ hai chỗ đó | thẻ 03 dòng 78, 91–92 | C | M11 |

## Ghi chú kỹ thuật

- Số chữ Hán và số từ: *not measured*. Số dòng đếm từ file (plan 251, 01: 158, 02: 248, 03: 235, 04: 268; 1.160 tổng). Số hàng đề xuất đếm từ các bảng (C1–C15, 02.1–02.8, 03.1–03.9, 04.1–04.9 = 41).
- Cổng máy không chạy lại (tôi không có shell). Không chạy git.
- Tôi đối ch17 `final` ở dòng 86–117 và dòng 240–256; không đối nguyên văn zh ch1–15 (mọi trích ch2–15 lấy từ thẻ hoặc reviewer, trừ khi ghi "đã đối" ở thẻ nói về chính thẻ).
- Đã đối `qd-ky-uc-verde-gui-rong-tdtb` (khoá 26/09, danh sách người nhận chưa đóng) để kiểm M5.
- Hai báo cáo reviewer đến qua dispatcher, không có file riêng.

## Bàn giao

```
## Stage complete: plan-continuation (ch18 — plan + scene cards, round 1)
- Produced: chapters/arc-1/ch18/ch18-plan.md · scenes/01-ch18-men-qian.md · 02-ch18-ke-ren.md · 03-ch18-fan-zhuo.md · 04-ch18-dian-hua.md · ch18-tong-ket.md — 3 workers, 5 files + summary, 41 proposal rows (33 distinct)
- Pre-flight: plan_gate.py --project TDTB -> exit 0
- Verify gate: vault_doctor.py --include-fiction --zone ...TDTB... -> exit 1 (237 checked, 0 errors, 2 pre-existing always_load warnings) — plan-reviewer's run, not re-run by the summarizer (no shell)
- Plan review: plan-reviewer -> 21 ran / 1 missing, 0 high · continuity-reviewer -> 1 high
- Open items: 1 high (H1: opening frame puts Tsuna in the corner/seated at the rice line, ch17 final has him at the island) · 12 medium (M1-M12) · 22 low · checklist row missing (undecided Nana facts have no question note) · 6 internal contradictions (W1-W6) · no proposal has Aurel's agreement
- Handoff: write-chapter is NOT ready. Aurel needs ch18-tong-ket.md to answer decisions 1-16 in order (1 reading of the "no reason" forbid, 2 #11/C4, 3 C10 Nana-knows-show, 4 question notes, ...). Worker A needs F1, F2, F9, F10, F15, F19, F20; worker B needs F3, F5, F18; worker C needs F4, F6-F8, F12-F14, F17, F21, F22.
```

Stage này **chưa hoàn tất** cho `write-chapter`: còn một hàng checklist thiếu, còn một phát hiện `high`, và chưa đề xuất nào có đồng ý của Aurel.
