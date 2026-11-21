---
id: summary.TDTB.ch17-tong-ket
type: info
scope: branch
lane: personal
project: TDTB
branch: aurel-main
arc: dan-y-ch16-ch19-tdtb
chapter: 17
canon_layer: user_canon
status: superseded
superseded_by: "[[04_Manuscript/chapters/arc-1/ch17/ch17-the-lam-lai]]"
superseded_at: 2026-10-03
aliases: ["tong ket ch17 TDTB", "tong ket ke hoach chuong 17 TDTB", "summary ch17 TDTB", "tom tat ba tac nhan ch17 TDTB"]
related: ["[[04_Manuscript/chapters/arc-1/ch17/ch17-plan]]", "[[04_Manuscript/chapters/arc-1/ch16/ch16-review]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/06_Alternate_Versions/branches/aurel-main|aurel-main]]"]
source:
  type: inference
  ref: "summarizer, 30/09/2026, doc truc tiep ch17-plan + 4 the canh; bao cao plan-reviewer va continuity-reviewer do dispatcher chuyen lai (khong co file rieng)"
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-03
---

# Tổng kết ch17 — 《装B的第十七天》 (giai đoạn kế hoạch)

> 🔁 **Bị thay 03/10/2026** → [[04_Manuscript/chapters/arc-1/ch17/ch17-the-lam-lai]]: ch17 viết lại theo dan-y-ch16-ch18-lam-lai-tdtb. Giữ làm lịch sử.

> Chỉ đọc, không sửa. Đây là **kế hoạch chương + bốn thẻ cảnh**, chưa có bản nháp chương. Quyết định thuộc về Aurel.
> **Kết luận ngắn:** 0 phát hiện `high`. 10 `medium` và 15 `low` sau khi gộp trùng, cộng 4 điểm do tổng kết thêm. Không có gì chặn
> `write-chapter` về mặt bí mật hay canon, nhưng **hai chỗ nối lệch** (thẻ 03 với thẻ 01 và với plan C9) phải chốt trước, vì cảnh 02 và
> cảnh 03 dựa vào chúng. Đừng coi là sẵn sàng viết trước khi Aurel duyệt C1–C10 và trả lời mục "Cần Aurel quyết".

> **Vòng 2, vòng 3 (30/09) bản nháp và lượt sửa bản nháp (01/10) nằm ở cuối file** (mục "Vòng 2 — sửa theo D1–D3 và F1–F15"). Thứ tự cảnh 03 ở vòng 1 (phỏng vấn riêng trước, phòng khách sau) **đã bị thay** bởi D1; phần dưới giữ nguyên làm lịch sử.

## Ba phần đã làm

Cả ba worker đã chạy (không thiếu). Worker B bị dừng vì giới hạn API giữa chừng rồi được chạy tiếp; theo B, thẻ 02 đã được ghi đè để khớp
C6/C8 và 03.5 trước khi bị cắt. Tôi đọc thẻ 02 trong trạng thái hiện tại và thấy khớp (cảnh 02 không cho Tuyết ra tay, có nhắc 03.5).

| Worker | Phần | File | Số từ / số note |
|---|---|---|---|
| A | Kế hoạch chương + cảnh 01 档案 (POV Tuyết) | `chapters/arc-1/ch17/ch17-plan.md` · `chapters/arc-1/ch17/scenes/01-ch17-dang-an.md` | 2 note · 184 + 99 dòng · đề xuất C1–C10 (10) · số chữ Hán: *not measured* (không có công cụ đếm; đây là kế hoạch, ngân sách 800 chữ Hán cho cảnh 01) |
| B | Cảnh 02 白天 (POV Tsuna) | `chapters/arc-1/ch17/scenes/02-ch17-bai-tian.md` | 1 note · 162 dòng · đề xuất 02-P1…P6 (6) · số chữ Hán: *not measured* (ngân sách 1.000) |
| C | Cảnh 03 评分 + cảnh 04 电话 (POV Tsuna) | `chapters/arc-1/ch17/scenes/03-ch17-ping-fen.md` · `chapters/arc-1/ch17/scenes/04-ch17-dian-hua.md` | 2 note · 132 + 95 dòng · đề xuất 03.1–03.8 (8) + 04.1–04.6 (6) · số chữ Hán: *not measured* (ngân sách 800 + 400) |
| Tổng | 4 thẻ cảnh + 1 kế hoạch | | 5 note · 24 đề xuất chờ Aurel · ngân sách kế hoạch ~3.000 chữ Hán (sàn ≥ 2.200) |

Ngân sách trong bảng plan cộng đúng: 800 + 1.000 + 800 + 400 = 3.000; các nhịp trong cảnh 02 cộng đúng 1.000. Thuật ngữ: 8 + 12 + 9 + 3 = 32, khớp
"≥ 32" (thẻ 04 ghi ≥ 4, xem L-mới 3).

Cổng máy (do reviewer chạy, tôi không chạy lại được vì không có shell): `plan_gate.py --project TDTB` exit 0 (cả dispatcher lẫn plan-reviewer) ·
`vault_doctor --zone` exit 1, 0 lỗi, 2 cảnh báo `always_load` có sẵn (`aurel-main.md`, `thiet-lap-tac-gia-tdtb.md`), không cái nào thuộc ch17 ·
`vault_doctor --include-fiction` exit 0 · `pov_leak_check` exit 2 do khớp nhầm ở frontmatter (nhiễu, không phải rò).

## Phát hiện — xếp theo mức độ

Mức giữ nguyên như reviewer cho. Trùng gộp một dòng, ghi cả hai nguồn. `PR` = plan-reviewer, `CR` = continuity-reviewer, `TK` = tổng kết (tôi), `W` = worker tự báo.

### High

Không có.

### Medium

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| M1 | medium | PR-M1 · CR-M2 | thẻ 03 (03.5) ↔ thẻ 01 bước 7 ↔ plan C6 | Điều kiện của 03.5 tự loại chính nó: thẻ 01 cho Tuyết kéo điểm **chỉ** bằng phiếu chấm, nên theo chữ của 03.5 thì phải bỏ 03.5. Plan C6 lại giữ 03.5 (câu ứng biến). Thẻ 02 xây trên 03.5 (P4). | Thẻ 03: *"nếu cảnh 01 cho Tuyết kéo điểm **chỉ** bằng phiếu chấm, bỏ 03.5"* ↔ thẻ 01: *"**Chỉ** định phiếu chấm; **không** tính trước câu gì sẽ nói lúc chấm điểm (nếu thẻ 03 dùng đề xuất 03.5, câu đó là ứng biến ở cảnh 03)"* |
| M2 | medium | PR-M2 · CR-M1 · TK | plan C9 ↔ thẻ 03 bước 2–3, 03.4 | **Thứ tự và nội dung lệch.** Plan: câu Kenichi ở phần chung **trước** phỏng vấn riêng, "ví dụ nói về lần ghép cặp sau". Thẻ 03: phỏng vấn riêng **trước**, phần chung sau, và câu là cái ôm ở 东京巨蛋 + 一见钟情. Hệ quả (CR): nếu phỏng vấn/phiếu xong trước thì lời nói không thể làm đổi phiếu, nên câu ghi ở writer-only thẻ 03 rằng câu Kenichi "phá" cú đẩy của Tuyết là **sai** trừ khi đổi thứ tự. | Plan C9: *"Ở phần **chung** trước phỏng vấn riêng, trước camera"* ↔ thẻ 03 bước 1–3: phòng riêng trước, "Tập trung ở phòng khách" sau; writer-only: *"câu của anh **phá** cú đẩy 'Tsuna nhạt' của Tuyết"* |
| M3 | medium | PR-B1 (pre-flight "missing") | plan, dòng 184 | Plan ghi `plan_gate` "chạy sau khi đủ bốn thẻ", nhưng theo dispatcher, phiên chính **đã chạy** `plan_gate.py --project TDTB` trước khi giao worker, exit 0 (plan-reviewer chạy lại cũng exit 0). Ghi sai trong plan, không phải cổng thiếu. | Plan: *"`plan_gate.py --project TDTB` — chạy sau khi đủ bốn thẻ"* |
| M4 | medium | PR-M4 | thẻ 02 nhịp 5; thẻ 03 dòng 56–57 | "Vì sao" lọt vào cột **trên trang**. Thẻ 02 có ngoặc giải thích cái cớ "lấy thừa"; thẻ 03 có dòng "trớ trêu" lộ cơ chế. Trang không được giải thích lý do (thẻ 02 tự cấm ở CAM: *giải thích cái cớ "拿多了"*). | Thẻ 02: *"(Cái cớ "lấy thừa" là để người ta **khỏi phải từ chối**: cùng một kiểu giữ thể diện như ch16, nhưng **không** được giải thích trên trang.)"* · thẻ 03: *"Hai người cùng muốn cậu bị loại (beat 2) gặp nhau ở đây, trớ trêu."* |
| M5 | medium | PR-M5 · CR-L12 | thẻ 04, 04.2 | 阿纲 của Nana là từ trí nhớ; không note nào ghi Nana gọi Tsuna thế nào, nguyên tác chưa có câu nào. Ch18 dùng lại nên phải chốt một lần cho cả arc. | Thẻ 04: *"Cách gọi quen của fandom tiếng Trung cho Nana."* · plan: *"nguyên tác **chưa có** câu nào… thẻ 04 chọn"* |
| M6 | medium | CR-M3 | plan C4 / thẻ 01 bước 4 | ch2.18 đã có **深度搜查** giá **10 điểm** (Tuyết từ chối). C4 đặt **深度扫描** giá **100** — tên gần y hệt, giá đảo chiều. Người đọc cũ sẽ vấp. | Plan C4: *"深度扫描, 100 积分 … bảng giá đã có (10 · 50 · 100)"* |
| M7 | medium | CR-M4 | thẻ 02 nhịp 4–5 | Logic camera giấu bỏ qua ch16: *"每个嘉宾都有自己的跟拍摄影师"* và cần thu âm trên đầu Tsuna. Có tiền lệ ch12.2 (nhiếp ảnh gia bị cho xuống lầu). Hoặc bỏ logic "trốn camera nên camera mới thấy", vì micro đã đủ mang khoảnh khắc (ch12.24). | Thẻ 02: *"cái góc Tsuna chọn để trốn ống kính **có một camera giấu kín**"* |
| M8 | medium | CR-M5 | thẻ 02 nhịp 1–4 | Không có gì ngăn alpha/Omega Tuyết ngửi 天兰葵 của Yamamoto trên người Tsuna ở bữa sáng và trong bếp (ch16 L28, L150). Thẻ 02 cấm ngửi ra Omega, nhưng không cấm ngửi ra Yamamoto. | Thẻ 02 bí mật: *"Không ai quanh cậu … **ngửi ra** hay **đoán ra** gì"* (chỉ nói về Omega) |
| M9 | medium | CR-M6 | `hard-rules` mục B (ảnh hưởng plan "Ngoặc" + thẻ 01) | `hard-rules` B ghi 15/15 chương, nhưng ch9–11 bình luận dùng “”; Tuyết→0038 phần lớn dùng “” (ch2.17, 3.7, 11.19, 13.19, 13.22, 13.42, 14.33), chỉ ch15.4 dùng ‘’. Plan và thẻ 01 theo ch15.4. **Việc của Aurel.** | Plan: *"Tuyết hỏi 0038 trong đầu `‘’`, 0038 đáp `“”` (ch15.4–5)"* |
| M10 | medium | CR-M7 | công cụ `pov_leak_check` + note bí mật | Không note bí mật nào có `leak_terms` tiếng Trung, nên công cụ không dò được bản nháp CJK (ch16 cũng đã gặp, L29). Ứng viên: 任务者 · 土著 · 中转站 · 魅力药水 · 饮料机 · 0038 · 宿主 · 指南 · 百合. | ch16-review: *"không có `leak_terms` ở note bí mật nào, nên công cụ không dò được gì"* |

### Low

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| L1 | low | PR-L1 | thẻ 03, 03.4 | Cái ôm bị **làm mờ** trên stream (ch12.42), chỉ rõ ở ch13.1–2. Câu "cả nước đã thấy" cần khớp. | Thẻ 03: *"cả nước đã thấy trên livestream hôm qua"* |
| L2 | low | CR-L3 | thẻ 03, 03.4 | Nguyên văn là 巨蛋体育场, không phải 东京巨蛋. | Thẻ 03: *"ôm Tsuna ở 东京巨蛋 (ch12)"* |
| L3 | low | PR-L2 · PR-L3 · CR-L2 | thẻ 03 (03.1, bước 3) | Trích sai: mặt tổng đạo diễn là 慈眉善目/憨厚, không phải 老实; nguồn là 本期的特别来宾 (một lời bịa cho người ngoài), thẻ ghi 本期特别嘉宾. | Thẻ 03: *"gương mặt hiền lành *"老实"*"* · *"本期特别嘉宾"* |
| L4 | low | PR-L4 · CR-L5 · TK | plan C2; thẻ 01 bước 1; thẻ 02 nhịp 7 | Việc Tuyết tắt camera trong phòng từ tối qua là **sự kiện mới**, không nguồn; ch15.19 gợi ý Tuyết vẫn để camera bật. TK: thẻ 02 cũng cho camera trong phòng **Tsuna** "vẫn tắt từ đêm qua", nên cùng một sự kiện mới nằm ở hai thẻ (tôi chưa đối lại ch16). | Thẻ 01: *"Camera tự động trong phòng đã bị cậu tắt từ tối qua (luật 14)"* · thẻ 02: *"camera trong phòng vẫn tắt từ đêm qua"* |
| L5 | low | PR-L5 · CR-L4 | thẻ 03, 03.3 | Phiếu khán giả trong việc xét loại chỉ là suy luận. | Thẻ 03: *"Điểm = tổ chương trình + khách chấm nhau + phiếu khán giả livestream (luật 5, 6)"* |
| L6 | low | PR-L6 | thẻ 02 writer-only | "Yamamoto đi đâu: chưa chốt" chưa nằm trong bảng theo dõi nào. | Thẻ 02: *"Yamamoto đi đâu: **chưa chốt**"* |
| L7 | low | PR-L7 | plan (bảng hook, bảng điều kiện, chỉ tiêu) ↔ thẻ 04 | Số liệu cũ: thẻ 04 ghi 45 % thoại/5 lượt, plan ghi 40 %/6; bảng hook chỉ gán `h-tuyet-quay-sang-tsuna` cho cảnh 01 trong khi thẻ 02 và 03 cũng yêu cầu; bảng điều kiện vẫn ⏳ cho thẻ 02–04. | Plan: *"~40 %"* · *"6"* ↔ thẻ 04: *"~45 %"*, *min_dialogue_turns: 5* |
| L8 | low | CR-L1 | thẻ 04 nguồn | Chữ 朋友 không phải "lần đầu lên trang" (ch13.4, 13.7, 15.63, 15.72, 3.48). Cái mới là **Tsuna tự nói** về mình. | Thẻ 04: *"Đây là lần đầu chữ *朋友* về Tsuna lên trang"* |
| L9 | low | CR-L6 | thẻ 02 bước 6 | Chú thích bình luận nêu luôn lý do cấu trúc của thẻ; chỉ nên **một** bình luận làm việc đó. | Thẻ 02: *"bị một dòng khác bắt bẻ kiểu *diễn cho ai xem, nhân viên có được bỏ phiếu đâu*"* |
| L10 | low | CR-L7 | thẻ 03 bước 3, 03.6 | Thẻ nghiêng về việc nêu lý do không loại ai trên trang: giữ **tối đa một** trong "mắt tổng đạo diễn sáng lên" và 03.6. | Thẻ 03: *"mắt tổng đạo diễn sáng lên một cái"* ↔ *"这是节目组综合考虑的结果"* |
| L11 | low | CR-L8 | thẻ 04 bước 1 | "Tiền hai tập" mơ hồ. | Thẻ 04: *"tiền hai tập, bộ game **机甲**, **hoặc** mấy ngày không camera"* |
| L12 | low | CR-L9 | note hook | Hai note hook không thống nhất bản kiểm tra lỗi là về ai. | (không nằm trong ch17; xem note hook `h-0038-kiem-tra-yamamoto-tdtb`) |
| L13 | low | CR-L10 | thẻ 01 bước 5 | Kết quả quét "gần nguyên văn ch3" có thể quá cũ: giờ mạng đã có cảnh quay show. | Thẻ 01: *"**tờ hồ sơ cũ, gần như nguyên văn ch3.16–17**"* |
| L14 | low | CR-L11 · W(B) | note nhân vật/địa điểm (ngoài ch17) | Note cũ: tên show 《令人心动的你》, chữ Hán 优子 ("chưa nêu"), `biet-thu-tam-dong-tdtb` chưa có bếp, 千岛 trong `thien-dao-tdtb`, 鹿野雪. | Thẻ 02: *"note nhân vật ghi 'chưa nêu' là cũ"* |
| L15 | low | CR-L13 | thẻ (không rõ ở đâu) | Lệch mục tiêu nhỏ. Reviewer chỉ ghi "trivial"; tôi giữ nguyên, không tự đoán. | *không có trích từ reviewer* |

### Do tổng kết thêm khi đọc bốn thẻ cạnh nhau

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| T1 | medium | TK · W(A, B, C) | dàn ý đã duyệt, danh sách hook ch17 | Cả ba worker báo: dàn ý ch17 **không** liệt kê `h-kenichi-vua-thay-da-yeu-tdtb` (và C: `h-tsuna-khong-co-ban-tdtb`), nhưng beat 4 và beat 5 buộc hai hook đó. Bảng hook của plan đã thêm, dàn ý thì chưa. Sửa dàn ý đã duyệt là việc của Aurel. | Plan: *"⚠️ Dàn ý ch17 không liệt kê hook này, nhưng beat 4 buộc nó"* |
| T2 | medium | TK · W(A, C) | ch18 | Ba ràng buộc mà ch17 để lại cho ch18 chưa nằm ở đâu ngoài plan ch17: (a) ch18 phải nối cuộc gọi sau *"……我哪来的朋友？"*; (b) ch18 quyết Gokudera **có nghe** câu đó hay không; (c) ch18 phải gieo mẩu "fan" cho ch19 beat 1 (ch17 cấm gieo). | Plan "Chỗ nối với ch18–19": *"plan ch18 phải chọn: anh **nghe** câu … hay Nana nghe máy riêng"* |
| T3 | low | TK | plan ↔ thẻ 04 | Thẻ 04 ghi target_terms "≥ 4" (đếm cả 机甲) trong khi plan ghi "≥ 3 (节目 · 嘉宾)". Chưa rõ 机甲 có tính là thuật ngữ theo [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets\|targets]]. | Plan: *"≥ 3 (节目 · 嘉宾)"* ↔ thẻ 04: *"≥ 4 — 节目 · 嘉宾 · 导演 · 机甲"* |
| T4 | low | TK | thẻ 03 bước 2 ↔ ch16 câu kế hoạch | Thẻ 03 nhắc "bộ chuyển: luật 6, 'điểm thấp + không ai muốn ghép'" nhưng cũng cho Tsuna "không có ai muốn ghép" đúng vào lúc Kenichi vừa đẩy Yamamoto–Tsuna: thứ tự phải được chốt (M2) thì mới biết Tsuna trả lời câu "ghép cặp" trước hay sau câu 一见钟情. | Thẻ 03: *"hỏi 'muốn ghép cặp với ai tập sau' thì nói không có"* |

Đã đối chiếu và **không** thấy vấn đề (CR xác nhận, tôi đọc lại khớp): dòng thời gian S2 (rạng sáng → ban ngày → tối → rời biệt thự) · trạng thái nhân vật · danh sách cấm của hợp đồng nhánh (Tsuna không săn Sue/trả thù) · chỗ nối tới ch18–19 (ngoài T2).

## Mối nối giữa các phần

| Mối nối | Kết luận | Ghi chú |
|---|---|---|
| ch16 → 01 (câu cuối ch16 → rạng sáng S2, phòng Tuyết) | ổn | 01 không kể lại cảnh vườn; Tuyết không biết chuyện Yamamoto ở phòng Tsuna (đúng ranh POV). Chỉ lưu ý L4 (camera tắt là sự kiện mới). |
| 01 → 02 (Tuyết → Tsuna, vạch `……`) | ổn | 01: *"Chỉ định phiếu chấm"* / 02 P4: *"Chỉ một ánh nhìn"*, đều để Tuyết chưa ra tay. Cùng dùng "camera phòng tắt từ tối qua" (L4). Hai thẻ đều đóng lại đúng chỗ: 01 kết bằng kế hoạch, 02 mở bằng bữa sáng đã gói. |
| 02 → 03 (ban ngày → tối) | ổn, kèm M4 | Chai nước khớp: 02 để thẻ 03 nhắc lại tuỳ chọn *"顺手而已"*, 03 bước 2 dùng đúng ý đó và có điều kiện "chỉ khi 02 đã có việc tử tế". Yamamoto vắng: 02-P2 (*"có chút việc"*) ↔ 03.1 (*"山本武 không có mặt"*) khớp. Hai dòng `Tên：` khác nhau (副导演：…… / 纲吉：？？？) không đụng nhau. |
| 01 ↔ 03 (kế hoạch kéo điểm ↔ câu đẩy 03.5) | **lệch** | Xem M1. Bên 01: *"**Chỉ** định phiếu chấm; **không** tính trước câu gì"*. Bên 03: *"nếu cảnh 01 cho Tuyết kéo điểm **chỉ** bằng phiếu chấm, bỏ 03.5"*. Thẻ 02 (P4, "→ cảnh 03") đã dựa vào 03.5. |
| plan C9 ↔ 03 (thứ tự phần chung/riêng; nội dung câu Kenichi) | **lệch** | Xem M2. Bên plan: *"Ở phần **chung** trước phỏng vấn riêng"*, ví dụ "lần ghép cặp sau". Bên 03: phòng riêng bước 1–2, phòng khách bước 3, câu = cái ôm + 一见钟情. |
| 03 → 04 (tối S2, không ai xuống xe → rời biệt thự) | ổn | 03 kết bằng *"那就第二集下车"*, 04 mở bằng khách về nhà giữa hai tập. Không hành động nào bị lặp. Lưu ý 04 gọi "ký túc xá ở Tokyo" khớp ch3, và cuộc gọi cùng một lúc với ch18 beat 5 (thời gian ch18 lùi lại). |
| 04 → ch18 | ổn, kèm T2 | 04 dừng ở *"……我哪来的朋友？"* nói thành tiếng, bắt đầu ch18 sạch. Ba ràng buộc ở T2 phải được ghi sang ch18. |
| Giọng / địa chỉ xưng hô xuyên các thẻ | ổn | Kenichi: 纲吉君 · 雪君; Nana: 阿纲 chưa chốt (M5); 0038 gọi Tuyết 宿主 và không lẫn với hệ thống của Tsuna (không xuất hiện). Không thấy chỗ giọng nhảy. |
| Số liệu giữa plan và thẻ | lệch nhẹ | L7, T3. |

## Cần Aurel quyết

Mỗi mục: **đề xuất** và một dòng lý do. Đánh số theo thứ tự cần trả lời (D1–D3 chặn viết; các mục sau có thể trả lời cùng lượt).

1. **D1 — Thứ tự cảnh 03 và câu Kenichi (M2, T4).** *Đề xuất:* đưa **phần chung ở phòng khách lên trước**, phỏng vấn riêng + phiếu chấm sau; giữ nguyên nội dung 03.4 (cái ôm + 一见钟情) và sửa plan C9 cho khớp. *Vì sao:* lời nói chỉ đổi được phiếu nếu nó đến trước phiếu; giữ 03.4 vì cụ thể và khớp ch10, còn ví dụ "ghép cặp sau" của C9 chỉ là ví dụ.
2. **D2 — Giữ hay bỏ 03.5, câu đẩy của Tuyết (M1).** *Đề xuất:* **giữ**, coi là ứng biến tại chỗ (đúng như plan C6 và thẻ 01 bước 7), và sửa chữ điều kiện trong thẻ 03. *Vì sao:* cho beat 2 một điểm chạm hài trên trang; thẻ 02 đã xây trên nó; bỏ thì thẻ 02-P4 phải sửa.
3. **D3 — Tên và giá quét sâu (M6).** *Đề xuất:* **đổi tên** (không dùng 深度扫描 — ví dụ 全面调阅/详细档案, writer chọn), **giữ 100 điểm**. *Vì sao:* giữ được logic "gói đắt hơn 50" mà không vướng 深度搜查 10 điểm ở ch2.18.
4. **D4 — Dấu ngoặc Tuyết hỏi 0038, và `hard-rules` B (M9).** *Đề xuất:* ch17 **giữ ‘’** như ch15.4 (gần nhất, và ch16 đã theo), đồng thời sửa `hard-rules` B ghi đúng các ngoại lệ thay vì "15/15". *Vì sao:* đổi ngoặc giữa chừng arc gây lệch hơn là sửa câu luật; sửa luật thì writer khỏi bị dẫn sai. (Nếu Aurel muốn “” thì thẻ 01 và plan phải đổi; ghi rõ trước khi viết.)
5. **D5 — Nana gọi Tsuna là gì (M5).** *Đề xuất:* **阿纲**, chốt một lần cho ch17–18, ghi vào một note xưng hô. *Vì sao:* là cách tự nhiên nhất cho mẹ; trùng Yamamoto chấp nhận được; chọn 小纲 chỉ để tách giọng, không đáng đổi.
6. **D6 — Logic camera giấu ở cảnh 02 (M7).** *Đề xuất:* **bỏ** lý do "trốn camera nên camera thấy"; để cần thu âm mang khoảnh khắc (ch12.24). *Vì sao:* khỏi mâu thuẫn với "mỗi khách có thợ quay riêng" ở ch16 và khỏi phải thêm cảnh đuổi thợ quay.
7. **D7 — Sự kiện mới: camera trong phòng Tuyết và Tsuna tắt từ tối qua (L4).** *Đề xuất:* **chấp nhận**, ghi ở một chỗ (plan C2), thẻ 02 tham chiếu C2. *Vì sao:* cần cho việc Tuyết nói thầm với 0038, và thẻ 02 cũng dùng. Nếu không muốn thêm canon, phương án khác là bỏ câu về camera và để Tuyết nghĩ trong đầu (0038 không cần camera tắt).
8. **D8 — Sửa danh sách hook của dàn ý đã duyệt (T1).** *Đề xuất:* **thêm** `h-kenichi-vua-thay-da-yeu-tdtb` và `h-tsuna-khong-co-ban-tdtb` vào ch17 trong `dan-y-ch16-ch19-tdtb`. *Vì sao:* plan và ba thẻ đã buộc hai hook đó; dàn ý là nguồn, nên phải khớp. Ảnh hưởng: chỉ mục hook ch17 của dàn ý, không đụng beat.
9. **D9 — `leak_terms` tiếng Trung cho các note bí mật (M10).** *Đề xuất:* **thêm**, có ghi chú phạm vi POV (0038 · 宿主 · 指南 chỉ cấm ở POV Tsuna; thẻ 01 là POV Tuyết nên phải chỉnh công cụ hoặc bỏ qua thẻ 01). *Vì sao:* nếu không, `pov_leak_check` vẫn không dò được ch17 bản CJK, đúng như ch16. Việc này sửa nhiều note bí mật, nên cần Aurel đồng ý trước.
10. **D10 — Phiếu khán giả trong luật xét loại (L5).** *Đề xuất:* **bỏ** khỏi 03.3; giữ "tổ chương trình + khách chấm nhau". *Vì sao:* ch9 luật 6 đã đủ; trang không công bố bảng điểm nên phần khán giả vô hình mà chỉ tốn canon.
11. **D11 — "Yamamoto đi đâu" (L6).** *Đề xuất:* mở một câu hỏi (`question`) theo dõi. *Vì sao:* chưa chốt mà không note nào giữ thì sẽ mất, nhất là khi thẻ 02 cấm gợi "đem chai nước đi xét nghiệm".
12. **D12 — Ràng buộc chuyển sang ch18 (T2).** *Đề xuất:* ghi ba ràng buộc vào brief plan ch18, với (b) mặc định **Gokudera nghe được** câu cuối. *Vì sao:* 04.5 chọn nói thành tiếng chính để ch18 beat 5 có tiếng vọng; nếu không nghe thì thẻ 04.5 mất lý do.

Việc cần Aurel nhưng **không chặn**: C1–C10 và 02-P1…P6, 03.1–03.8, 04.1–04.6 vẫn đang chờ duyệt (chưa có ô nào được duyệt). Trừ các mục nêu trên, tôi không thấy lý do phản đối các đề xuất còn lại; đề xuất của worker giữ nguyên.

## Sửa cơ học (không cần quyết)

Người sửa là worker sở hữu thẻ; tôi không sửa. Sau D1–D2 mới làm những mục phụ thuộc.

| # | Sửa | File | Nguồn |
|---|---|---|---|
| F1 | Ghi lại plan_gate đã chạy trước khi giao worker, exit 0 (không phải "chạy sau khi đủ bốn thẻ") | `ch17-plan.md` bảng điều kiện | M3 |
| F2 | Đưa lý do "lấy thừa" và dòng "trớ trêu" khỏi cột **trên trang** sang writer-only | thẻ 02 nhịp 5; thẻ 03 dòng 56–57 | M4 |
| F3 | Thêm một mệnh đề Yamamoto tắm/thay đồ trước bữa sáng (hoặc ai đó không ngửi ra) | thẻ 02 nhịp 1 | M8 |
| F4 | Đổi trích cho đúng nguyên văn: 慈眉善目/憨厚 thay "老实"; 本期的特别来宾 (ghi là lời bịa); 巨蛋体育场 thay 东京巨蛋 | thẻ 03 | L2, L3 |
| F5 | Khớp câu "cả nước đã thấy" với ch12.42 (bị làm mờ) và ch13.1–2 (rõ) | thẻ 03 03.4 | L1 |
| F6 | Sửa "lần đầu chữ 朋友" thành "lần đầu Tsuna tự nói chữ đó về mình" | thẻ 04 nguồn | L8 |
| F7 | Làm rõ "tiền hai tập" (dùng 五十万) | thẻ 04 bước 1 | L11 |
| F8 | Đồng bộ số liệu: 40 %/6 lượt vs 45 %/5 lượt; gán `h-tuyet-quay-sang-tsuna` cho 01, 02, 03; đổi ⏳ → ✅ cho thẻ 02–04; target_terms thẻ 04 | plan; thẻ 04 | L7, T3 |
| F9 | Giữ tối đa một trong "mắt tổng đạo diễn sáng lên" và 03.6 | thẻ 03 | L10 |
| F10 | Để chỉ một bình luận mang lý do; các dòng còn lại chỉ phản ứng | thẻ 02 bước 6 | L9 |
| F11 | Thêm một mệnh đề để hồ sơ quét không "cũ" so với mạng có cảnh quay show | thẻ 01 bước 5 | L13 |
| F12 | Sửa chữ điều kiện của 03.5 và câu "phá" ở writer-only theo D1/D2 | thẻ 03 | M1, M2 |
| F13 | Chấm dứt bất nhất ghi chú hook về đối tượng kiểm tra lỗi | note hook `h-0038-kiem-tra-yamamoto-tdtb` | L12 |
| F14 | Bảo trì note cũ: show title, 优子, bếp của biệt thự, 千岛, 鹿野雪 (ngoài ch17, gộp một lượt bảo trì) | note nhân vật/địa điểm | L14 |
| F15 | Thêm `title: "装B的第十七天"` vào frontmatter khi tạo `ch17-chapter.md` (plan đã ghi; nhắc để không sót) | `ch17-chapter.md` | plan mục Định dạng |

## Ghi chú kỹ thuật

- File này được ghi bằng công cụ Write (kết thúc dòng LF); tôi không có shell/Python để gọi `vaultlib.write_keep_eol()`. Nếu cần CRLF như các file lân cận, chạy lại bằng công cụ đó.
- Số chữ Hán và số từ: *not measured* (không có công cụ đếm). Số dòng file và số đề xuất được đếm trực tiếp từ file.
- Tôi không đối chiếu nguyên văn tiếng Trung hay ch16; mọi trích nguyên tác là từ thẻ hoặc từ báo cáo reviewer.

## Vòng 2 — sửa theo D1–D3 và F1–F15 (30/09)

> Vòng 1 ở trên giữ nguyên làm lịch sử. Từ đây, **thứ tự cảnh 03 của vòng 1 (phỏng vấn riêng trước, phòng khách sau) không còn hiệu lực**: D1 đã đảo lại.
> **Kết luận ngắn:** 0 phát hiện `high`. 3 `medium` và 15 `low` sau khi gộp, cộng 1 điểm do tổng kết thêm, cộng 4 mục ngoài ch17 (reviewer không xếp mức).
> Mọi F1–F15 và D1–D3 đã vào file (cả hai reviewer xác nhận, tôi đọc lại cũng khớp), **trừ F15** (chỉ nhắc: `ch17-chapter.md` chưa tồn tại). Nhưng
> **chưa sẵn sàng viết chương**: còn 3 medium và vì Aurel mới đồng ý D1–D3 + F1–F15, phần còn lại của C, 02-P, 03.x, 04.x và D4–D12 **chưa** duyệt.
> Cổng máy (do dispatcher chuyển lại, tôi không có shell nên không chạy lại): `plan_gate.py` exit 0 · `vault_doctor --include-fiction --zone TDTB` exit 1,
> 0 lỗi, 2 cảnh báo `always_load` có sẵn · `pov_leak_check` ×4 exit 2 (nhiễu ở frontmatter) · vẫn chưa có `leak_terms` tiếng Trung (D9).
> Plan-reviewer r2: 13 kiểm chạy · 0 thiếu · 1 không kết luận được (`context_resolver --role planner`) · 3 n/a.

### Aurel đã đồng ý (theo chat) và phạm vi đúng của nó

| Mục | Phạm vi đã đồng ý | Chưa nằm trong đó |
|---|---|---|
| D1 | Đảo thứ tự cảnh 03: phòng khách trước → phòng riêng + phiếu → công bố → Tsuna hỏi đạo diễn. Nội dung 03.4 (cái ôm + 一见钟情). Sửa plan C9 cho khớp | Chữ cụ thể của 03.4 (vẫn là đề xuất) |
| D2 | Giữ 03.5, là câu ứng biến | Phần còn lại của C6 |
| D3 | Đổi tên gói quét, giữ 100 điểm | **Tên cụ thể** (完整档案调阅 là đề xuất của worker A); kết quả quét; mệnh đề F11; câu của 0038 |
| F1–F15 | Sửa cơ học như bảng "Sửa cơ học" ở vòng 1 | Bất kỳ quyết định nào khác |

### Ba phần đã làm — vòng 2

Cả ba worker đã chạy, không thiếu. Số dòng đếm từ file: plan 193 · thẻ 01 103 · thẻ 02 167 · thẻ 03 153 · thẻ 04 98. Số từ / số chữ Hán: *not measured* (không có công cụ đếm).

| Worker | Đã đổi gì | File |
|---|---|---|
| A | Plan: F1 (pre-flight ghi đúng, dòng 192), F8 (bảng ngân sách, hook `h-tuyet-quay-sang-tsuna` gán cho 01, 02, 03), ghi D1–D3 vào tiêu đề và C4/C6/C9. Thẻ 01: D2 (bước 7, 03.5 là ứng biến), D3 (bước 4, tên 完整档案调阅, cấm ba tên cũ), F11 (bước 5, mệnh đề "khách mời mùa 4"). **F13:** hai note hook thống nhất đối tượng kiểm tra lỗi. **F14:** show title, 优子, 千岛, 鹿野雪 | `chapters/arc-1/ch17/ch17-plan.md` · `.../scenes/01-ch17-dang-an.md` · `hooks/h-0038-kiem-tra-yamamoto-tdtb.md` · `hooks/h-tuyet-quay-sang-tsuna-tdtb.md` · `canon/the-le-show-lam-long-nguoi-dong-tdtb.md` · `Characters/yuuko-tdtb.md` · `Characters/thien-dao-tdtb.md` · `Characters/loc-da-tuyet-tdtb.md` (thư mục gốc `05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/`) |
| B | Thẻ 02: F2 (cái cớ "lấy thừa" chuyển sang writer-only, dòng 143), F3 (Tsuna tắm/thay đồ trước bữa sáng, nhịp 1 + hàng bí mật dòng 108), F10 (chỉ một bình luận mang lý lẽ, nhịp 6), D6 đánh dấu ⏳ (02-P3, CHO PHEP) | `chapters/arc-1/ch17/scenes/02-ch17-bai-tian.md` |
| C | Thẻ 03: D1 (đảo thứ tự, ô "THU TU"), D2, F2 (dòng "trớ trêu" sang writer-only), F4 (慈眉善目 / 憨厚 / 本期的特别来宾 / 巨蛋体育场), F5 (03.4 khớp mosaic ch12.42 → ch13.1), F9 (bỏ "mắt tổng đạo diễn sáng lên", giữ 03.6), F12. Thẻ 04: F6, F7, F8 (~45 % · 5 lượt · ≥ 4 thuật ngữ), sửa trích dẫn 04.4 | `chapters/arc-1/ch17/scenes/03-ch17-ping-fen.md` · `.../scenes/04-ch17-dian-hua.md` |

Ghi chú F14: `biet-thu-tam-dong-tdtb` (bếp biệt thự) **cố ý chưa sửa**, vì phụ thuộc 02-P1 chưa duyệt. F15 mở đến khi có `ch17-chapter.md`.

Số đề xuất: C1–C10 (10) + 02-P1…P6 (6) + 03.1…03.8 (8) + 04.1…04.6 (6) = **30**. (Vòng 1 ghi "24" là **đếm sai**; số đúng 30.) Trong đó đã duyệt một phần: C4, C6, C9, 03.4, 03.5 (5); **chưa duyệt gì**: 25.
Số liệu plan đối lại, tôi tính lại: thuật ngữ 8 + 12 + 9 + 4 = 33 (khớp "≥ 33") · lượt 5 + 6 + 8 + 5 = 24 (khớp "≥ 24") · thoại (200 + 200 + 240 + 180) / 3000 ≈ 27,3 % (khớp "~27 %").

### Phát hiện vòng 2 — xếp theo mức độ

Mức giữ nguyên như reviewer cho. `PR` = plan-reviewer r2, `CR` = continuity-reviewer r2, `TK` = tổng kết. Dòng = số dòng file hiện tại. Trích chữ Hán của CR đã được CR đối với bản zh; tôi không đối lại zh.

#### High

Không có.

#### Medium

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| R2-M1 | medium | PR-M1 | plan dòng 136 và 187 | Hàng trạng thái "✅ D1–D3 (C4, C6, C9)" nói quá: D3 chỉ duyệt đổi tên + giữ 100 (không duyệt phần còn lại của C4: nội dung kết quả, mệnh đề F11, câu 0038); D2 chỉ duyệt giữ 03.5 ứng biến (không duyệt cả C6) | *"Chọn của kế hoạch — ✅ D1–D3 (C4, C6, C9) Aurel đồng ý 30/09 · ⏳ các mục khác chờ"* · *"✅ D1–D3 (C4, C6, C9) 30/09 · ⏳ C1–C3, C5, C7, C8, C10 và D4–D12"* |
| R2-M2 | medium | PR-M2 · TK (thêm plan C2) | thẻ 01 dòng 43; thẻ 02 dòng 76; plan C2 dòng 141; thẻ 04 (D5); thẻ 03 03.3 (D10) | **D7** (camera phòng tắt từ tối qua) nói như sự thật ở ba chỗ, không đánh dấu chờ; **D5** (阿纲) ở CHO PHEP thẻ 04 và **D10** (phiếu khán giả) ở hàng 03.3 cũng không đánh dấu, trong khi **D6** thì có ⏳ | Thẻ 01: *"Camera tự động trong phòng đã bị cậu tắt từ tối qua (luật 14)"* · thẻ 02: *"camera trong phòng vẫn tắt từ đêm qua"* · plan C2: *"camera tự động trong phòng đã bị tắt từ tối qua (luật 14)"* · thẻ 04: *"Nana goi \"阿纲\", vui, vong vo"* (CHO PHEP, thẻ 04 dòng 79) |
| R2-M3 | medium | CR-M1 | thẻ 01 bước 5 (dòng 59); plan C4 (dòng 143) | Mệnh đề F11 nói mạng "đã có từ khi show phát" tin Tsuna là khách mời mùa 4, mâu thuẫn luật 16: danh tính khách được giữ bí mật (chỉ tên riêng, ch9.54). Chỉ đúng nếu dân mạng đã đào ra (có tiền lệ: *"沢田先生"* trên stream ch13.13, diễn đàn ch15.21) | Thẻ 01: *"hiện là khách mời 《令人心动的你》 mùa 4 — tức là thứ Tuyết đã biết"* ↔ luật 16 (`the-le-show`): *"Thân phận thật của khách tạm giữ bí mật"* · ch11.47 (theo CR): *"嘉宾们的身份暂时还在保密中"* |

#### Low

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| R2-L1 | low | PR-L1 | thẻ 01 dòng 101 | Hộp writer buộc tên gói vào "(D3)", nhưng D3 chỉ duyệt việc đổi tên; tên là đề xuất | *"完整档案调阅 · 100 积分 (D3)"* |
| R2-L2 | low | PR-L2 | thẻ 02 dòng 94 và 86 | Sau F14 note đã ghi 优子, nên câu "note ghi chưa nêu" cũ; và tên show trích ch9.32, trong khi `the-le-show` ghi ch9.35 | *"note nhân vật ghi \"chưa nêu\" là cũ"* · *"《令人心动的你》 (ch9.32, ch11.46)"* |
| R2-L3 | low | PR-L3 | thẻ 03 dòng 55; thẻ 02 dòng 70–71; thẻ 01 dòng 67; thẻ 04 dòng 30 | Câu "vì sao" / trỏ tiếp còn nằm ngoài khối writer-only | Thẻ 03: *"Câu này rẽ câu chuyện khỏi \"Tsuna nhạt nhẽo\" sang \"Tsuna được đại thần để mắt\""* · thẻ 02: *"Cậu trốn camera, nên camera mới thấy."* · thẻ 01: *"câu \"tử tế\" của cậu ta ở cảnh 03 (03.5, Aurel giữ) là **ứng biến**"* · thẻ 04: *"thuộc **ch18 beat 5**, nhìn từ phía Gokudera"* |
| R2-L4 | low | PR-L4 | thẻ 03 dòng 46 ↔ thẻ 04 dòng 57, 93 | Nơi ở của Tsuna: "phòng trọ" (03) và "ký túc xá" (04, và note nhân vật theo PR) | 03: *"mang hợp đồng tới tận phòng trọ"* ↔ 04: *"ký túc xá thuê ngoài trường ở Tokyo"* |
| R2-L5 | low | PR-L5 | thẻ 04 dòng 41 | Cách nói về 机甲 nhỏ hơn thực tế: PR ghi một tập 五十万 đã ≈ giá bộ game | *"nên bộ game **机甲** gần thêm một bước"* |
| R2-L6 | low | PR-L6 | plan dòng 70–72 | ⚠️ "dàn ý không liệt kê hook" chỉ gắn cho `h-kenichi-vua-thay-da-yeu`, không gắn cho `h-tsuna-khong-co-ban` | *"⚠️ Dàn ý ch17 không liệt kê hook này, nhưng beat 4 buộc nó"* (chỉ ở hàng 70) |
| R2-L7 | low | PR-L7 | thẻ 03 dòng 68 | "cùng một số điểm ở giữa" là lựa chọn nhưng không có hàng đề xuất | *"cậu cho **mọi người cùng một số điểm ở giữa**, kể cả 鹿野雪"* |
| R2-L8 | low | CR-L1 | thẻ 02 (nhịp 1, hàng bí mật dòng 108) | Mùi 天兰葵 ở **hành lang** đầu cầu thang (ch16) chưa được che; Tuyết là Omega | Thẻ 02: *"Tsuna tắm, thay đồ trước bữa sáng (nhịp 1)"* chỉ che mùi trên người; ch16 (theo CR): *"走廊里还飘着…天兰葵的味道"* |
| R2-L9 | low | CR-L2 | thẻ 03 dòng 143 (03.1) | Chú giải sai: 本期的特别来宾 được nói với khách 圭介 đang phản đối (ch14.13, 14.16), không phải "bịa cho người ngoài" nói chung | *"lời đạo diễn **bịa ra** cho người ngoài (*\"昧着良心回答道\"*)"* |
| R2-L10 | low | CR-L3 | thẻ 03 dòng 148 (03.6) | Đạo diễn gọi "纲吉君", nhưng nguyên văn chỉ có "沢田君" (3.38, 3.45) | *"纲吉君，下一集也拜托啦。"* |
| R2-L11 | low | CR-L4 | thẻ 04 dòng 58 | *"纲吉没有朋友。"* chỉ ở 15.63 (15.72 là lời đạo diễn); ch3.48 là nội tâm về chính mình, nên "lần đầu" phải là "thành tiếng" | *"ch15.63, 15.72 \"纲吉没有朋友。\""* |
| R2-L12 | low | CR-L5 | thẻ 03 dòng 147 (03.5) | Hàng đề xuất nói câu Kenichi "vô tình bẻ nó" như sự thật, trong khi writer-only (dòng 109–113) nói có hedge ("có thể làm lệch") | *"vô tình bẻ nó"* ↔ *"Nó có thể làm lệch phiếu"* |
| R2-L13 | low | CR-L6 | thẻ 03 dòng 92–93 | Neo nguồn cho việc Kenichi biết sai chương: cảnh sân bóng ở ch10–13, không phải ch14; nên neo ch15.73, 15.78–79, 15.21, ch16 | *"anh biết **qua livestream / người khác**, không cần có mặt (ch14 anh không ở tổ đó)"* |
| R2-L14 | low | CR-L7 | thẻ 03 dòng 56; plan dòng 118 | Điều kiện cũ "nếu cảnh 01–02 chưa dùng" đã lỗi thời (01 có `鹿野雪：……`, 02 có `副导演：……`); plan chỉ kể dòng của 01 và 03 | Thẻ 03: *"nếu cảnh 01–02 chưa dùng thì dòng này là bắt buộc"* · plan: *"`鹿野雪：……` (01), `纲吉：？？？` (03)"* |
| R2-L15 | low | CR-L8 | thẻ 01 dòng 33 | Cụm 身份档案 (ch2.18) thuộc hạt XXXX27 của ch18 beat 4; nên tránh lặp | *"XXXX27 (tài khoản du khách, *\"没有身份档案\"*, ch2.18)"* |

#### Do tổng kết thêm

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| R2-T1 | low | TK | tổng kết vòng 1 (dòng 41) | Con số "24 đề xuất chờ Aurel" sai; đếm lại từ các thẻ là 30. Không sửa vòng 1 (lịch sử); số đúng ghi ở đây | *"5 note · 24 đề xuất chờ Aurel"* |

#### Ngoài ch17 (CR ghi, không xếp mức)

| # | Nguồn | Ở đâu | Vấn đề |
|---|---|---|---|
| R2-O1 | CR | `questions/q-ten-romaji-chua-chot-tdtb.md` dòng 61 | Còn "让人心动的你?" (câu đã giải, chỉ là lịch sử) |
| R2-O2 | CR | `Timeline/master.md` dòng 53 và slug `yamamoto-gap-tsuna-tokyo-dome-tdtb` | Còn "Tokyo Dome"; nguyên văn là 巨蛋体育场 |
| R2-O3 | CR | `biet-thu-tam-dong-tdtb` | Vẫn chưa có bếp; cố ý, chờ 02-P1 |
| R2-O4 | CR | `h-0038-kiem-tra-yamamoto-tdtb` | Frontmatter vẫn `status: open`, `payoff.status: unplanned`; đến lúc commit ch17 phải cập nhật thành `paid` + chương |

### Mối nối giữa các phần — vòng 2

Tôi đọc lại từng mối nối bên cạnh nhau; hai mối nối lệch của vòng 1 đã đóng.

| Mối nối | Kết luận | Ghi chú |
|---|---|---|
| 01 ↔ 03 (03.5) | ổn (vòng 1: lệch, đã đóng) | 01 bước 7: *"**không** tính trước câu gì sẽ nói lúc chấm điểm — câu \"tử tế\" của cậu ta ở cảnh 03 (03.5, Aurel giữ) là **ứng biến**"* ↔ 03: *"Câu **ứng biến tại chỗ**: thẻ 01 bước 7 cho Tuyết chỉ định trước phiếu chấm, không soạn trước lời nào"*. Vẫn còn R2-L3 (câu trỏ tiếp ngoài writer-only) |
| plan C9 ↔ 03 (thứ tự, nội dung Kenichi) | ổn (vòng 1: lệch, đã đóng) | Plan C9: *"**Phần chung ở phòng khách đi trước**, phỏng vấn riêng + phiếu chấm **sau**"* ↔ 03: *"phần **chung ở phòng khách trước**, phỏng vấn riêng + phiếu chấm **sau**"*; cả hai cùng nội dung 巨蛋体育场 + mosaic + 一见钟情. Thẻ 02 dòng 125 cũng đã theo D1 |
| 01 → 02 (Tuyết → Tsuna) | ổn, kèm R2-M2 | Hai bên đều kể camera phòng tắt từ tối qua như sự thật (D7 chưa duyệt) |
| 02 → 03 (ban ngày → tối) | ổn | Yamamoto vắng: 02-P2 *"có chút việc"* ↔ 03.1 *"山本武 không có mặt"*. Ba dòng `Tên：` (`副导演：……` / `纲吉：？？？`) không đụng nhau. Kenichi giữ con bài "sáng nay" ở 03 (dòng 104–106), 02 cho Yamamoto ăn sáng ở dưới lầu: không xung đột |
| 03 → 04 (tối S2 → rời biệt thự) | **lệch nhẹ** | R2-L4: 03 *"mang hợp đồng tới tận phòng trọ"* ↔ 04 *"ký túc xá thuê ngoài trường ở Tokyo"*. 03 kết bằng *"那就第二集下车"*, 04 mở bằng khách về nhà; 五十万 / 机甲 nối được (R2-L5) |
| 04 → ch18–19 | ổn | Dừng ở *"……我哪来的朋友？"* nói thành tiếng; ràng buộc T2 (vòng 1) vẫn thuộc ch18 |
| Thẻ 01 (bước 5, F11) ↔ luật 16 của `the-le-show` | **lệch** | R2-M3: *"hiện là khách mời 《令人心动的你》 mùa 4"* ↔ *"Thân phận thật của khách tạm giữ bí mật"* |
| Thẻ 02 ↔ ch16 (mùi ở hành lang) | chưa che | R2-L8 |
| Plan ↔ bốn thẻ (số liệu) | ổn | Tính lại ở mục "Ba phần đã làm": 33 · 24 · ≈ 27,3 % |
| Note nhân vật / thể lệ ↔ plan (đánh số ch9) | ổn, kèm N3 | `yuuko` 9.78 (tức 9.76), `thien-dao` 9.77 (9.75), `the-le-show` 9.35 đều theo cách đếm cả dòng `*` của plan dòng 38; thẻ 02 dòng 86 lệch (R2-L2). Xem N3 |

### Sửa cơ học vòng 2 (G) — không cần quyết

Người sửa là worker sở hữu file; tôi không sửa. Mọi G độc lập nhau trừ ghi chú.

| # | Sửa | File · dòng | Người sửa | Nguồn |
|---|---|---|---|---|
| G1 | Tách hàng trạng thái: D1 ✅ (thứ tự + nội dung 03.4, C9); D2 ✅ chỉ "giữ 03.5 ứng biến"; D3 ✅ chỉ "đổi tên + giữ 100"; phần còn lại của C4, C6 ⏳ | plan dòng 136, 187 | A | R2-M1 |
| G2 | Đánh dấu ⏳ cho D7 (camera phòng tắt), D5 (阿纲), D10 (phiếu khán giả ở 03.3), như D6 | thẻ 01 dòng 43 · thẻ 02 dòng 76 · plan C2 dòng 141 · thẻ 04 dòng 43, 79 · thẻ 03 dòng 145 | A (01, plan) · B (02) · C (03, 04) | R2-M2 |
| G3 | Đổi "(D3)" thành "(giá 100 theo D3; tên là đề xuất)" | thẻ 01 dòng 101 | A | R2-L1 |
| G4 | Xoá câu "note ghi chưa nêu là cũ" (note đã cập nhật); đổi ch9.32 thành ch9.35 | thẻ 02 dòng 94, 86 | B | R2-L2 |
| G5 | Chuyển các câu "vì sao" / trỏ tiếp sang writer-only. Riêng dòng 70–71 thẻ 02 gắn với D6 chưa chốt: chuyển hoặc đánh dấu D6, không xoá | thẻ 03 dòng 55 · thẻ 02 dòng 70–71 · thẻ 01 dòng 67 · thẻ 04 dòng 30 | C · B · A · C | R2-L3 |
| G6 | Thống nhất nơi ở của Tsuna ("ký túc xá" theo thẻ 04 và note nhân vật, nếu PR đúng), kiểm lại ch3–4 | thẻ 03 dòng 46 | C | R2-L4 |
| G7 | Sửa cách nói 机甲 cho đúng dữ kiện PR trích, không tự thêm con số | thẻ 04 dòng 41 | C | R2-L5 |
| G8 | Gắn ⚠️ "dàn ý không liệt kê hook" cho `h-tsuna-khong-co-ban` | plan dòng 72 | A | R2-L6 |
| G9 | Thêm một hàng đề xuất (hoặc nhập vào 03.2) cho "mọi người cùng một số điểm ở giữa" | thẻ 03 dòng 68 | C | R2-L7 |
| G10 | Thêm mệnh đề writer-only: hành lang đã thông gió; nếu muốn có trực giác thì Yamamoto vẫn mặc đồ hôm qua | thẻ 02 hàng bí mật dòng 108 | B | R2-L8 |
| G11 | Sửa chú giải: 本期的特别来宾 nói với khách 圭介 phản đối (ch14.13, 14.16) | thẻ 03 dòng 143 | C | R2-L9 |
| G12 | Đổi "纲吉君" thành "沢田君" (3.38, 3.45) hoặc bỏ tên | thẻ 03 dòng 148 | C | R2-L10 |
| G13 | Sửa nguồn: *"纲吉没有朋友。"* chỉ 15.63 (15.72 là lời đạo diễn); "lần đầu" ghi rõ "thành tiếng" | thẻ 04 dòng 58–59 | C | R2-L11 |
| G14 | Chuyển "vô tình bẻ nó" thành dạng có hedge như writer-only | thẻ 03 dòng 147 | C | R2-L12 |
| G15 | Neo việc Kenichi biết vào ch15.73, 15.78–79, 15.21, ch16; bỏ "ch14 anh không ở tổ đó" | thẻ 03 dòng 92–93 | C | R2-L13 |
| G16 | Bỏ điều kiện "nếu cảnh 01–02 chưa dùng" (01 và 02 đã có dòng `Tên：`); thêm `副导演：……` (02) vào danh sách plan | thẻ 03 dòng 56 · plan dòng 118 | C · A | R2-L14 |
| G17 | Bỏ cụm 身份档案 khỏi thẻ 01, viết lại không nhắc tên trường hồ sơ | thẻ 01 dòng 33 | A | R2-L15 |

R2-M3 (F11) **không** nằm trong G vì cần chọn (mục N1). R2-O1…O4 không nằm trong G vì ngoài phạm vi F1–F15 (mục N5).

### Cần Aurel quyết

**Mới ở vòng 2**

1. **N1 — Mệnh đề F11 (R2-M3).** Chọn một: **(a)** đổi tiền đề thành "dân mạng đã đối ra Tsuna là khách 纲吉" (hợp *"沢田先生"* ở ch13.13 và diễn đàn ch15.21), không trích diễn đàn; hoặc **(b)** cắt hẳn mệnh đề, hồ sơ quét giữ nguyên như ch3 rồi Tuyết tự nhận nó không cũ vì không có gì mới. *Đề xuất của tôi:* (a) nếu muốn giữ "hồ sơ không cũ"; (b) nếu không muốn thêm canon về việc danh tính bị đào. Đây là chọn canon, nên không phải G.
2. **N2 — Tên gói quét.** Xác nhận **完整档案调阅** (đề xuất A; không trùng chữ nào của 深度搜查 10 điểm hay 全方位扫描 50 điểm) hay tên khác (*"全面调阅"*, *"详细档案"*). D3 chỉ duyệt đổi tên + giữ 100.
3. **N3 — Quy ước đánh số đoạn ch9.** Bản tách bỏ hai dòng `*`, nên từ ch9.24 trở đi lệch −2 so với cách vault đếm (cả dòng `*`). *Đề xuất:* giữ cách đếm của vault (như plan dòng 38 và thẻ ch16), ghi rõ ở đầu mỗi thẻ; sửa các chỗ lệch (R2-L2). Nếu Aurel đọc bản khác, đổi một lần cho cả arc.
4. **N4 — Cho phép mở rộng bảo trì.** R2-O1…O4 nằm ngoài F1–F15. *Đề xuất:* cho gộp R2-O2 (Timeline, Tokyo Dome → 巨蛋体育场) vào một lượt bảo trì; R2-O1 để nguyên (lịch sử); R2-O3 chờ 02-P1; R2-O4 làm lúc commit chương.

**Còn treo từ vòng 1 (chưa được duyệt; giữ nguyên đề xuất của vòng 1)**

5. **D4** dấu ngoặc Tuyết hỏi 0038 + sửa `hard-rules` B ("15/15") · **D5** Nana gọi Tsuna là 阿纲 · **D6** logic camera giấu ở 02 (bỏ "trốn camera nên camera thấy") · **D7** camera phòng tắt từ tối qua · **D8** thêm hai hook vào dàn ý · **D9** `leak_terms` tiếng Trung · **D10** bỏ phiếu khán giả khỏi 03.3 · **D11** câu hỏi theo dõi "Yamamoto đi đâu" · **D12** ba ràng buộc sang ch18. Sau khi có G2, D5–D7 và D10 hiện rõ ⏳ ở mọi chỗ.
6. **C1–C3, C5, C7, C8, C10** · **02-P1…P6** · **03.1–03.3, 03.6–03.8** · **04.1–04.6** (25 mục chưa duyệt gì) · phần còn lại của **C4, C6** và chữ cụ thể của **03.4**.
7. **F15:** không cần quyết, chỉ nhắc `title: "装B的第十七天"` khi tạo `ch17-chapter.md`.

### Bàn giao

```
## Stage complete: summary (vòng 2)
- Produced: chapters/arc-1/ch17/ch17-tong-ket.md (mục "Vòng 2") — 3 workers, 19 findings (0 high; 3 medium, 15 low, 1 do tổng kết) + 4 mục ngoài ch17, 10 seams (2 lệch/lệch nhẹ, 1 chưa che)
- Verify gate: every worker path read — yes (plan, 4 thẻ, 6 note đã sửa)
- Open items: không có high. Lệch: R2-M3 (F11 ↔ luật 16), 03→04 (phòng trọ ↔ ký túc xá). Medium mở: R2-M1, R2-M2, R2-M3
- Handoff: worker A needs G1, G3, G8, G16 (plan), G17 · worker B needs G4, G10, G5 (thẻ 02) · worker C needs G5–G7, G9, G11–G16 · Aurel needs N1–N4 rồi D4–D12, C, P, 03.x, 04.x
```

## Vòng 3 — sửa G1–G17 và N1–N3 (30/09)

> Vòng 2 ở trên giữ nguyên làm lịch sử. Từ đây, mệnh đề F11 ("hiện là khách mời mùa 4") **không còn hiệu lực**: N1a đã thay bằng "dân mạng đã tự đối ra".
> **Kết luận ngắn:** 0 phát hiện `high`. 2 `medium` và 9 `low` sau khi gộp, cộng 1 ghi chú ảnh hưởng (N1a). G1–G17 và N1a, N2, N3 đều đã vào file
> (cả hai reviewer xác nhận; tôi đọc lại từng thẻ, khớp). **Ngoài phần Aurel duyệt, còn hai thứ chặn `write-chapter`:** (1) **H1**, vì trong plan và thẻ 01–03
> vẫn còn chỗ nói phần **chưa duyệt** của C6 như sự thật đã chốt, writer sẽ đọc thành lệnh; (2) **H5**, vì thẻ 02 còn một chi tiết rò (áo hôm qua của Yamamoto)
> chờ Aurel chọn (mục M2 bên dưới). Các H còn lại là dọn cơ học, không chặn về canon. Không có bí mật hay luật 16 bị vỡ.
> Cổng máy (do dispatcher chuyển lại, tôi không có shell nên không chạy lại): `plan_gate.py` exit 0 · `vault_doctor` 0 lỗi · `pov_leak_check` ×4 exit 2 (nhiễu frontmatter; 2–5 bí mật CJK mỗi thẻ
> công cụ không dò được, CR đã đọc tay; D9 vẫn treo).
> Plan-reviewer r3: 14 kiểm chạy · 0 thiếu · 3 không kết luận được (chạy lại cổng sau compact, `context_resolver --role planner`, đọc điểm rơi) · 3 n/a. Continuity-reviewer r3: 0 high · 1 medium · 6 low.

### Aurel đã đồng ý (theo chat) và phạm vi đúng của nó

| Mục | Phạm vi đã đồng ý | Chưa nằm trong đó |
|---|---|---|
| G1–G17 | Sửa cơ học như bảng G của vòng 2 | Bất kỳ quyết định nào khác |
| N1 (chọn a) | Mệnh đề F11 = "dân mạng đã tự đối ra Tsuna là khách 纲吉"; danh tính khách chính thức vẫn kín (luật 16); không trích diễn đàn | Kết quả quét gần nguyên văn ch3, "ra ngay", "không nêu số dư", câu xác nhận trừ điểm của 0038 (vẫn ⏳ trong C4) |
| N2 | Tên **完整档案调阅** | Giá đã được D3 duyệt từ trước |
| N3 | Đánh số đoạn theo cách vault đếm (cả hai dòng `*` của ch9), ghi ở đầu mỗi thẻ | — |
| N4 | **Hoãn**, làm ở một lượt bảo trì riêng | Không chặn `write-chapter` |
| D1–D3, F1–F15 | Như vòng 2 | D2 chỉ "giữ 03.5 ứng biến", D3 chỉ "tên + 100" (xem M1) |

### Ba phần đã làm — vòng 3

Cả ba worker đã chạy, không thiếu. Worker A bị giới hạn API cắt **sau khi xong**; tôi đọc plan đến hết (196 dòng), file nguyên vẹn. Số dòng đếm từ file: plan 196 · thẻ 01 108 · thẻ 02 170 · thẻ 03 158 · thẻ 04 101. Số từ / số chữ Hán: *not measured* (không có công cụ đếm).

| Worker | Đã đổi gì | File |
|---|---|---|
| A | Plan: G1 (hàng trạng thái tách D1/D2/D3/N1a/N2/N3), G8 (⚠️ hook `h-tsuna-khong-co-ban`), G16 (danh sách dòng `Tên：` có `副导演：……`), N1a (C4 + F11 đổi tiền đề), N2, N3 (dòng đánh số), **N4** (một hàng mới ở bảng điều kiện, gồm mục `dao-dien-tdtb` "phòng trọ" ↔ 宿舍 ch3.34; *chưa sửa note*). Thẻ 01: G2 (⏳ D7 ở bước 1), G3, G5, G17 (bỏ 身份档案), N1a (bước 5), N2, N3 | `chapters/arc-1/ch17/ch17-plan.md` · `.../scenes/01-ch17-dang-an.md` |
| B | Thẻ 02: G2 (⏳ D7 ở nhịp 7), G4 (ch9.35; bỏ câu "note ghi chưa nêu"), G5, G10 (hành lang thông gió + tuỳ chọn "Yamamoto mặc đồ hôm qua"), N3 | `.../scenes/02-ch17-bai-tian.md` |
| C | Thẻ 03: G2 (⏳ D10 ở 03.3), G5, G6 (宿舍 ch3.34 → "ký túc xá"), G9 (gộp vào 03.2), G11, G12 (沢田君), G14, G15, G16, N3. Thẻ 04: G2 (⏳ D5), G7, G13, G16, N3 | `.../scenes/03-ch17-ping-fen.md` · `.../scenes/04-ch17-dian-hua.md` |

Số đề xuất: C1–C10 (10) + 02-P1…P6 (6) + 03.1…03.8 (8) + 04.1…04.6 (6) = **30**. Đã duyệt một phần: C4, C6, C9, 03.4, 03.5 (5), chưa đổi so với vòng 2; N1a và N2 chỉ nới phần đã duyệt của C4. **Chưa duyệt gì: 25.**
Số liệu plan đối lại, tôi tính lại: thoại (200 + 200 + 240 + 180) / 3000 ≈ 27,3 % · lượt 5 + 6 + 8 + 5 = 24 · thuật ngữ 8 + 12 + 9 + 4 = 33; khớp frontmatter bốn thẻ.

### Phát hiện vòng 3 — xếp theo mức độ

Mức giữ nguyên như reviewer cho. `PR` = plan-reviewer r3, `CR` = continuity-reviewer r3, `TK` = tổng kết. Dòng = số dòng file hiện tại. Trích chữ Hán của CR đã được CR đối với bản zh; tôi không đối lại zh.

#### High

Không có.

#### Medium

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| R3-M1 | medium | PR-M1 · TK (mở rộng) | thẻ 01 dòng 67; thẻ 02 dòng 121–122, 136, 158; thẻ 03 dòng 49–50, 152 | Phần **chưa duyệt** của C6 (điểm thấp nhất cho Tsuna, tính 圭介, không đạo cụ 0038, chỉ bằng phiếu) bị gắn nhãn "D2, Aurel đồng ý" ở thẻ 01, và thẻ 02 nêu nó là AUTHOR FACT không ⏳. D2 chỉ duyệt 03.5. TK: thẻ 03 dòng 49–50, 152 cũng nói "thẻ 01 bước 7 cho Tuyết chỉ định trước phiếu chấm" như sự thật | Thẻ 01: *"**Quyết định** (`foreshadow: state`, C6 — D2, Aurel đồng ý 30/09)"* · thẻ 02: *"Tuyet dinh cho Tsuna diem thap nhat o phieu toi nay (canh 01, plan C6)"* ↔ plan C6: *"✅ D2 … **chỉ phần**: giữ 03.5 là câu ứng biến · ⏳ phần còn lại (chỉ định phiếu chấm, tính 圭介, không đạo cụ, không diễn đàn)"* |
| R3-M2 | medium | CR-M1 | thẻ 02 dòng 109 (hàng bí mật) ↔ thẻ 03 dòng 109–110, 128 | Tuỳ chọn "Yamamoto ăn sáng vẫn mặc đồ hôm qua" rò. ch16.152 biến bộ đồ đó thành **bằng chứng của Kenichi**; thẻ 03 nói Kenichi **giữ lại** như con bài chưa đánh; timeline cho Yamamoto rời "trước giờ quay" mà bữa sáng thì lên sóng (camera giấu, ch9.36); Tuyết biết mình đã bỏ thuốc Yamamoto, nên bộ đồ gợi được cho cậu ta. **Cần Aurel chọn** | Thẻ 02: *"Tuỳ chọn: Yamamoto ăn sáng vẫn mặc đồ hôm qua (ch16 "穿着昨天的衣服"); nếu dùng, không một mùi nào lên trang"* ↔ thẻ 03: *"Anh giữ lại chuyện sáng nay thấy Yamamoto ra khỏi phòng Tsuna: đó là con bài chưa đánh"* · ch16.152 (theo CR): *"穿着昨天的衣服，天刚亮，从一个beta嘉宾的房间里出来"* |

#### Low

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| R3-L1 | low | PR-L1 | plan dòng 38 và 189 | Danh sách ⏳ không kể 02-P1…P6, 03.1–03.3, 03.6–03.8, 04.1–04.6, chữ của 03.4, câu xác nhận của 0038 trong C4 | Plan: *"Phần còn lại của C4, C6 và mọi mục C khác **chưa** duyệt; D4–D12 **chưa** quyết"* |
| R3-L2 | low | PR-L2 | thẻ 03 dòng 42–43, 49–50, 73–74; thẻ 02 dòng 109 | Câu "vì sao" còn nằm ở phần trên trang của thẻ 03; câu writer-only về hành lang nằm giữa bảng bí mật của thẻ 02 | Thẻ 03: *"đến trước phiếu và có thể làm lệch phiếu"* · *"Câu ứng biến tại chỗ: thẻ 01 bước 7 cho Tuyết chỉ định trước phiếu chấm…"* · *"(lý do trên trang lần hai thuộc cảnh 02)"* |
| R3-L3 | low | PR-L3 | plan dòng 126 | Ghi "thẻ 04 chọn" cho cách Nana gọi Tsuna, trong khi đây là ⏳ D5 (Aurel chọn) | Plan: *"nguyên tác **chưa có** câu nào … — thẻ 04 chọn."* ↔ thẻ 04: *"(đề xuất 04.2 · ⏳ **D5 chờ Aurel**)"* |
| R3-L4 | low | CR-L1 | thẻ 03 dòng 55–56, 151; neo nguồn dòng 94–97 | Neo của Kenichi (15.21, 15.73, 15.78–79, ch16) không phủ chi tiết mosaic vừa gỡ và tay ở eo trong 03.4 | Thẻ 03 (03.4): *"马赛克一撤，大家就看见山本先生还抱着纲吉君不放"* · dòng 55–56: *"tay đặt ở eo cậu"* |
| R3-L5 | low | CR-L2 | plan C4 dòng 145; thẻ 01 dòng 60–63 | Chỗ dẫn của N1a yếu: thiếu ch12.51 (副导演 hỏi *"您和我们的嘉宾沢田先生是认识的吗？"*), ch12.52 (Yamamoto *"阿纲是我的初中同学哦"*), nửa sau ch11.47 (*"最大的作用就是让观众们找找嘉宾的真实身份"*). N1a đúng là chuyện luật 16 mô tả | Thẻ 01: *"ch11.47 "嘉宾们的身份暂时还在保密中""* (chỉ nửa đầu) |
| R3-L6 | low | CR-L3 | thẻ 02 dòng 77 | Đánh ⏳ D7 cho camera phòng **Tsuna**, nhưng ch15.20 đã canon; D7 chỉ liên quan phòng Tuyết | Thẻ 02: *"camera trong phòng vẫn tắt từ đêm qua: ⏳ **D7** — xem plan C2"* · ch15.20 (theo CR): *"纲吉到房间没多久，就关闭了摄像头"* |
| R3-L7 | low | CR-L4 (tuỳ chọn) | thẻ 03 dòng 153 (03.6) | 沢田君 của đạo diễn: có thể ghi "sau buổi, ngoài ống kính", hoặc để nguyên (nói họ trên sóng không vỡ gì, ch12.51, 13.11–15) | Thẻ 03: *"沢田君，下一集也拜托啦。"* |
| R3-L8 | low | CR-L5 | thẻ 02 dòng 157–169 (Writer nhận gì) | Khối chưa có mệnh đề hành lang và chưa có quyết định R3-M2 | CAM: *"ai ngui thay 天兰葵 cua Yamamoto tren nguoi Tsuna"* (không nói hành lang) |
| R3-L9 | low | CR-L6 | thẻ 04 dòng 40–43 ↔ thẻ 03 dòng 80–81 | Trích "như 03.8" chỉ đúng nửa: ý 五十万 nằm ở bước 6 và 03.7 của thẻ 03, còn 03.8 là *"那就第二集下车"*. 五十万 lại vừa khép cảnh 03 vừa mở cảnh 04, hai đoạn liền nhau | Thẻ 04: *"五十万 của tập 1 đã chắc tay … tập 2 là khoản sắp có, như 03.8"* ↔ thẻ 03: *"ít ra **五十万** của tập 1 đã chắc"* |

#### Ghi chú ảnh hưởng của N1a (CR, không xếp mức)

Từ khi N1a được duyệt, **danh tính thật của Tsuna đã nằm trên mạng**: diễn đàn trường (ch1.9–16) tồn tại, và Tuyết là bạn cùng lớp của Tsuna. Diễn đàn `NL：` ở thẻ 02 (nhịp 7) không được viết trái điều này (ví dụ một tầng nói "không ai biết cậu là ai"). ch18–19 tương thích. Cần ghi thành **sự thật đứng** cho các arc sau (xem H12).

### Mối nối giữa các phần — vòng 3

| Mối nối | Kết luận | Ghi chú |
|---|---|---|
| Thẻ 01 bước 7 ↔ plan C6 ↔ thẻ 02, 03 | **lệch** | R3-M1. Thẻ 01: *"C6 — D2, Aurel đồng ý 30/09"* ↔ plan: *"⏳ phần còn lại (chỉ định phiếu chấm, tính 圭介, không đạo cụ, không diễn đàn)"* |
| 01 / plan C2 ↔ 02 nhịp 7 (camera phòng, D7) | lệch nhẹ | R3-L6. Thẻ 01 dòng 45: *"⏳ **D7** — chưa chốt"* (phòng Tuyết) ↔ thẻ 02 dòng 77: *"camera trong phòng vẫn tắt từ đêm qua: ⏳ **D7**"* (phòng Tsuna, canon ở ch15.20) |
| 02 ↔ 03 (áo hôm qua ↔ con bài của Kenichi) | **lệch** | R3-M2. Thẻ 02 dòng 109 (*"Yamamoto ăn sáng vẫn mặc đồ hôm qua"*) ↔ thẻ 03 dòng 109–110 (*"Anh giữ lại chuyện sáng nay … con bài chưa đánh"*). Ngoài ra ổn: Yamamoto vắng 02-P2 *"có chút việc"* ↔ 03.1 *"山本武 không có mặt"* |
| 03 ↔ 04 | lệch nhẹ | R3-L9. Nơi ở đã khớp (thẻ 03 dòng 47 *"ký túc xá … 宿舍"* ↔ thẻ 04 dòng 59 *"ký túc xá thuê ngoài trường"*; R2-L4 đóng, chỉ còn note `dao-dien-tdtb` ghi "phòng trọ" → N4). Nhưng 五十万 lặp liền kề (dòng 80–81 thẻ 03 ↔ dòng 41–42 thẻ 04) |
| Plan ↔ thẻ 04 (Nana gọi Tsuna) | lệch nhẹ | R3-L3. Plan dòng 126 *"thẻ 04 chọn"* ↔ thẻ 04 dòng 45 *"⏳ **D5 chờ Aurel**"* |
| Thẻ 01 (N1a) ↔ luật 16 ↔ thẻ 02 diễn đàn | ổn | R2-M3 đóng: "dân mạng đã đối ra" khớp luật 16. Còn R3-L5 (dẫn thêm nguồn) và ghi chú sự thật đứng |
| 01 ↔ 03 (03.5 ứng biến) | ổn | Thẻ 01 bước 7: *"không tính trước câu gì sẽ nói lúc chấm điểm"* ↔ thẻ 03: *"Câu **ứng biến tại chỗ**"*. Nhãn duyệt lệch nằm ở R3-M1, không phải nội dung |
| 04 → ch18–19 | ổn | Dừng ở *"……我哪来的朋友？"* nói thành tiếng; ràng buộc T2 vòng 1 vẫn thuộc ch18 |
| Số liệu plan ↔ bốn thẻ | ổn | 33 · 24 · ≈ 27,3 %, như mục "Ba phần đã làm — vòng 3" |

### Sửa cơ học vòng 3 (H) — không cần quyết

Người sửa là worker sở hữu file; tôi không sửa. H5 (phần mệnh đề áo) và H8 chờ Aurel chọn R3-M2.

| # | Sửa | File · dòng | Người sửa | Nguồn |
|---|---|---|---|---|
| H1 | Đổi nhãn "C6 — D2, Aurel đồng ý" thành "C6 ⏳ (D2 chỉ duyệt 03.5 ứng biến)"; thêm ⏳ ở các chỗ nói phần chưa duyệt của C6 như sự thật | thẻ 01 dòng 67 (A) · thẻ 02 dòng 158, 121–122, 136 (B) · thẻ 03 dòng 49–50, 152 (C) | A · B · C | R3-M1 |
| H2 | Thêm vào ⏳ của plan: 02-P1…P6, 03.1–03.3, 03.6–03.8, chữ của 03.4, 04.1–04.6, câu xác nhận của 0038 trong C4; ghi luôn plan-reviewer/continuity-reviewer đã chạy **vòng 3** (dòng 194) | plan dòng 38, 189, 194 | A | R3-L1 |
| H3 | Chuyển các câu "vì sao" khỏi phần trên trang sang writer-only | thẻ 03 dòng 42–43, 49–50, 73–74 | C | R3-L2 |
| H4 | Chuyển câu writer-only về hành lang khỏi hàng bảng bí mật sang mục writer-only | thẻ 02 dòng 109 | B | R3-L2 |
| H5 | Bỏ tuỳ chọn "Yamamoto ăn sáng vẫn mặc đồ hôm qua", **hoặc** viết lại thành writer-only "không ai nhắc, trang cũng không nhắc", theo lựa chọn của Aurel | thẻ 02 dòng 109 | B | R3-M2 |
| H6 | Đổi "thẻ 04 chọn" thành "⏳ D5, Aurel chọn; thẻ 04 đề xuất 阿纲" | plan dòng 126 | A | R3-L3 |
| H7 | Đối 03.4 với neo nguồn: thêm câu "Kenichi biết qua clip / livestream, suy luận, không lên trang" hoặc rút 03.4 và dòng 55–56 về "cái ôm + 一见钟情", bỏ tay ở eo | thẻ 03 dòng 55–56, 94–97, 151 | C | R3-L4 |
| H8 | Thêm ch12.51, ch12.52, nửa sau ch11.47 vào chỗ dẫn N1a | plan C4 dòng 145 · thẻ 01 dòng 60–63 | A | R3-L5 |
| H9 | Bỏ ⏳ D7 ở camera phòng Tsuna, dẫn ch15.20 là canon; giữ ⏳ D7 chỉ ở thẻ 01 dòng 45 và plan C2 dòng 143 | thẻ 02 dòng 77 | B | R3-L6 |
| H10 | (Tuỳ chọn) ghi "sau buổi, ngoài ống kính" cho 沢田君 hoặc để nguyên | thẻ 03 dòng 153 | C | R3-L7 |
| H11 | Đồng bộ "Writer nhận gì" với quyết định R3-M2 và mệnh đề hành lang (CHO PHEP / CAM) | thẻ 02 dòng 157–169 | B | R3-L8 |
| H12 | Sửa trích "như 03.8" thành bước 6 / 03.7 của thẻ 03; ưu tiên 机甲 hoặc "mấy ngày không camera" cho cảnh 04, không lặp 五十万 | thẻ 04 dòng 40–43, 82 | C | R3-L9 |
| H13 | Ghi sự thật đứng của N1a (danh tính Tsuna đã lộ trên mạng; diễn đàn trường ch1.9–16 tồn tại; Tuyết là bạn cùng lớp) vào mục "Chỗ nối với ch18–19" của plan; thẻ 02 đối lại nhịp 7 không có tầng nào trái điều này | plan dòng 175–181 (A) · thẻ 02 dòng 77–82 (B) | A · B | CR (ảnh hưởng N1a) |

H1 là điều kiện cho `write-chapter`. H5 phụ thuộc quyết định của Aurel bên dưới.

### Cần Aurel quyết

**Mới ở vòng 3**

1. **R3-M2 — "Yamamoto ăn sáng vẫn mặc đồ hôm qua" (thẻ 02).** *Đề xuất:* **bỏ** tuỳ chọn. *Vì sao:* ch16.152 làm bộ đồ đó thành bằng chứng của Kenichi và thẻ 03 để anh giữ nó như con bài chưa đánh; bữa sáng lên sóng, và Tuyết (biết mình bỏ thuốc Yamamoto) nhìn bộ đồ sẽ đoán được. *Phương án khác:* giữ ở dạng writer-only, "không ai nhắc, trang cũng không nhắc", nếu Aurel muốn writer có trực giác.

**Còn treo (giữ nguyên đề xuất của vòng 1–2, trừ D7 đã hẹp lại)**

2. **D7** — nay **chỉ** camera phòng **Tuyết** tắt từ tối qua (thẻ 01 dòng 45, plan C2). Camera phòng Tsuna đã canon (ch15.20) nên rút khỏi D7 (H9). *Đề xuất:* chấp nhận, như trước.
3. **D4** dấu ngoặc Tuyết hỏi 0038 + `hard-rules` B ("15/15") · **D5** Nana gọi Tsuna là 阿纲 (04.2; plan dòng 126) · **D6** logic camera giấu ở 02-P3 · **D8** thêm hai hook vào dàn ý · **D9** `leak_terms` tiếng Trung · **D10** bỏ phiếu khán giả khỏi 03.3 · **D11** câu hỏi theo dõi "Yamamoto đi đâu" · **D12** ba ràng buộc sang ch18 (mặc định Gokudera nghe được câu cuối).
4. **Chưa duyệt gì (25):** C1–C3, C5, C7, C8, C10 · 02-P1…P6 · 03.1–03.3, 03.6–03.8 · 04.1–04.6. **Duyệt một phần:** phần còn lại của **C4** (kết quả gần nguyên văn ch3, "ra ngay", không nêu số dư, câu xác nhận của 0038) và **C6** (chỉ định phiếu chấm, 圭介, không đạo cụ, không diễn đàn) · chữ cụ thể của **03.4**.
5. **N4** (bảo trì: Timeline "Tokyo Dome"; `dao-dien-tdtb` "phòng trọ"; `biet-thu-tam-dong-tdtb` chờ 02-P1; `h-0038-kiem-tra-yamamoto-tdtb` sang `paid` lúc commit): đã hoãn, không chặn. **F15:** chỉ nhắc `title: "装B的第十七天"` khi tạo `ch17-chapter.md`.

### Bàn giao

```
## Stage complete: summary (vòng 3)
- Produced: chapters/arc-1/ch17/ch17-tong-ket.md (mục "Vòng 3") — 3 workers, 11 findings (0 high; 2 medium, 9 low) + 1 ghi chú ảnh hưởng N1a, 9 seams (5 lệch: 2 lệch, 3 lệch nhẹ)
- Verify gate: every worker path read — yes (plan 196 dòng, 4 thẻ; A bị cắt sau khi xong, file nguyên vẹn)
- Open items: không có high. Medium mở: R3-M1 (nhãn C6), R3-M2 (áo hôm qua, chờ Aurel). Lệch: 01↔plan C6, 02↔03 (áo), và ba lệch nhẹ (D7 ở 02, 五十万 03→04, D5 ở plan)
- Handoff: worker A needs H1, H2, H6, H8, H13 · worker B needs H1, H4, H9, H11, H13, H5 (sau khi Aurel chọn) · worker C needs H1, H3, H7, H12, H10 (tuỳ chọn) · Aurel needs R3-M2 rồi D4–D12, C, P, 03.x, 04.x
```

## Bản nháp — write-chapter (01/10)

> Chỉ đọc, không sửa. Đây là **bản nháp tiếng Trung đầu tiên** của ch17 (`chapters/arc-1/ch17/ch17-chapter.md`, `status: draft`), nối sau phần kế hoạch ở trên. Quyết định thuộc về Aurel.
> **Kết luận ngắn:** 0 `high`. 2 `medium` (M1 chi tiết "người bán hàng" của Nana; M2 kiểu tóc của 优子), 3 lệch chỉ tiêu (B1–B3), 8 điểm gu (C1–C8), 7 `low` riêng (L1–L5, L7, L8) và 1 điểm do tổng kết thêm (S1); gộp trùng còn **21 dòng**. Chương đọc liền mạch được, giọng nhẹ và hài đúng tông 乐博, mọi mục kiểm cứng đều qua. **Chưa nên finalize** trước khi Aurel trả lời A1 (M1) và revision xử lý M2 + S1. Số chữ Hán dưới đây là **số worker/dispatcher báo**; tôi không có công cụ đếm chữ Hán nên *not measured* bởi tôi.
> Tôi đọc toàn bộ `ch17-chapter.md` (259 dòng; số dòng dưới đây đánh theo file) và `ch17-plan.md`. Báo cáo style-reviewer và continuity-reviewer do dispatcher chuyển (không có file riêng). Trích tiếng Trung là từ bản nháp tôi vừa đọc; đối chiếu ch9.78 (M2) và các mục "qua hết" của continuity là lấy từ reviewer, tôi không đối lại nguyên văn ch9.

### Ba phần đã làm

Cả ba worker đã chạy, không thiếu. Chương ráp từ bốn cảnh; dispatcher thêm frontmatter (`title: "装B的第十七天"`, **F15 xong**), dòng ※ và tiêu đề.

| Worker | Phần | Dòng trong chương | Chữ Hán (so với kế hoạch) | Ghi chú |
|---|---|---|---|---|
| W1 | Cảnh 01 (POV Tuyết) | 26–72 | 1.001 / ~800 (125 %) | Thoại 20,4 %; `pov_leak_check` exit 0. Dùng câu tuỳ chọn C7. Thêm chi tiết: camera phòng tắt từ "昨晚一回来" |
| W2 | Cảnh 02 (Tsuna, ban ngày) | 76–150 | 1.424 / ~1.000 (142 %) | Thoại 13,2 % (đích ~20 %), câu trung vị 20. `pov_leak_check` exit 1 do note bí mật thiếu `leak_terms`; bí mật duy nhất không có từ dò đã grep tay: sạch |
| W3 | Cảnh 03 + 04 (Tsuna) | 154–234 · 238–258 | 03: 1.565 / ~800 (196 %) · 04: 333 / ~400 (83 %) | Thoại 03: 16,4 % (đích ~30 %), 04: 41,7 %. Thêm chi tiết Nana "推销". Resolver cảnh báo 82 và 63 note; W3 chỉ nạp phần thiết yếu |
| Tổng | Chương | 26–258 | **4.344** / ~3.000 (145 %) | Thoại 0,181 (dải 15–30 %) · câu trung vị 20,0 · `……` 2,53/1000 · `——` 0 · thuật ngữ 14,5/1000 (≥ 10) |

Tổng ba phần 1.001 + 1.424 + 1.898 = 4.323; chương 4.344, chênh 21 là dòng ※ và tiêu đề do dispatcher ghép (không đo lại). Số chữ theo plan là **sàn** (≥ 2.200), nên vượt không phải lỗi; chỉ cảnh 04 thấp hơn ngân sách.

Cổng máy (do dispatcher và reviewer chạy, tôi không chạy lại): `style_metrics --write` exit 0 · `vault_doctor` vùng TDTB 0 lỗi · `ai_tells_check` exit 0 · `chapter_gate` exit 2 (**không áp dụng**: `ai-tells.md` không có khối gate, theo thiết kế; công cụ chỉ dò Latin) · `pov_leak_check` b01 exit 0, b02–b04 exit 1 (bí mật "lỗi của Kenichi" không có `leak_terms`, đã grep tay: sạch). D9 (thêm `leak_terms` tiếng Trung) chưa làm nên công cụ vẫn mù với CJK; "exit 1" ở trên là hệ quả, không phải rò.

### Phát hiện — xếp theo mức độ

Mức giữ nguyên như reviewer cho. `SR` = style-reviewer, `CR` = continuity-reviewer, `TK` = tổng kết. Style-reviewer không dùng `high/medium/low` mà dùng nhãn **B** (lệch chỉ tiêu) và **C** (gu); tôi giữ nhãn đó. Trùng gộp một dòng, ghi cả hai nguồn. Dòng = số dòng file chương.

#### High

Không có.

#### Medium

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| M1 | medium | CR-M1 | cảnh 04, dòng 244, 246, 252 | Chi tiết "người bán hàng" (W3 thêm) cho Nana một tiếng chuông, một lúc do dự và một cú giật mình. Dàn ý ch18 có khối POV Nana và ràng buộc "Nana là Nana": ch18 phải kể lại đúng lúc mở cửa, nên ch17 đã tự đặt canon cho nó. Hoặc cắt (giữ "你猜是谁？"), hoặc giữ và ghi vào *Ràng buộc từ ch17* của dàn ý. **Aurel quyết** (A1) | *"门铃一响，妈妈还以为是来推销的，差点就不开门了。你猜是谁？"* · *"谁啊？该不会真是推销的吧？"* |
| M2 | medium | CR-M2 | cảnh 02, dòng 84 | 优子 "一头短发往后一捋" mâu thuẫn với kiểu tóc đã có: ch9.78 *"一头贴头皮的短发"* (cắt sát da đầu, không có gì để vuốt ra sau). Đổi cử chỉ | *"优子是个爽快人，一头短发往后一捋，站出来分工"* |

#### Lệch chỉ tiêu (style)

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| B1 | B (lệch chỉ tiêu) | SR | cả chương; nặng nhất cảnh 02 | Câu trung vị 20 so với 乐博 30 (dải 24–39,5). Câu ≥ 50 chữ chỉ 5,6 %, dưới mức tối thiểu của 乐博 (12 %). Cảnh 02 cụt nhất. Tiến bộ so với ch16 (trung vị 15) nhưng chưa tới dải | *Số đo, không trích.* Plan đã dặn: *"phần kể thì nối mệnh đề bằng dấu phẩy thành câu dài hơn, đừng chặt câu bằng dấu chấm"* |
| B2 | B (lệch chỉ tiêu) | SR | cả chương; cảnh 03 | 4.344 chữ Hán sẽ là chương dài nhất của cả corpus (乐博 dài nhất 3.911). Cảnh 03 gần gấp đôi ngân sách | 1.565 / ~800. Plan: *"Số chữ là sàn để khỏi viết thiếu, không phải trần"* |
| B3 | B (lệch chỉ tiêu) | SR | cảnh 02 | Thoại 13,2 % (dưới đích ~20 %). Cả chương 18,1 % vẫn trong dải 15–30 % | *Số đo, không trích.* |

#### Gu (style) và low (continuity), gộp

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| C1 | C (gu) | SR | dòng 98, 166, 180, 204 (qua mối nối 02→03) | Mô-típ 凉意/恶意 xuất hiện 4 lần, đậm hơn 乐博. Nên giữ dòng 98 + một chỗ nữa | *"纲吉的后颈却一下子凉透了。是恶意，明明白白的"* (98) · *"那股熟悉的冷意又顺着脊梁爬了上来，直觉告诉他，这番好话底下压着的全是恶意"* (166) · *"那股凉意一下子变尖了，像一根针"* (180) · *"客厅里那股凉意好像一路追到了这间小屋子里"* (204) |
| C2 | C (gu) | SR | cảnh 02, dòng 144 | Nghĩ thầm hay nói thành tiếng? Tsuna ở một mình, và dòng 146 mới là lúc cậu *"嘀咕了一句"*. Nếu là nghĩ thì phải `‘’` | *"“作秀？什么时候？”"* |
| C3 · L6 | C (gu) · low | SR-C3 · CR-L6 (gộp) | dòng 114 và 182; 原形毕露 ở 130 và 188 | Cùng thủ pháp "他不知道…弹幕" dùng hai lần; và 原形毕露 lặp (130 là bình luận diễn đàn, 188 là bình luận livestream) | *"纲吉当然不知道，就这么一会儿工夫，直播间的弹幕又刷过去了好几屏"* (114) · *"他不知道，这时候直播间里的弹幕已经刷成了一片"* (182) · *"山本大神一不在就原形毕露了"* (130) · *"山本大神不在，这个beta就原形毕露了"* (188) |
| C4 | C (gu) | SR | dòng 212, 216, 238 | Danh sách "没有…没有…" nhiều lần | *"没有分数，没有排名"* (212) · *"没有？一个都没有？"* (216) · *"没有镜头，没有弹幕，也没有导演"* (238) |
| C5 | C (gu) | SR | cảnh 01, dòng 62 | Nhiệm vụ được thuật lại bằng lời kể; 乐博 trích nó thành dòng hệ thống | *"任务五，和山本武一起进行棒球训练并获得他的赞赏。"* |
| C6 | C (gu) | SR | cảnh 01, dòng 48 và 66 | "肉疼" dùng hai lần trong một cảnh ngắn | *"鹿野雪的肉都疼了"* (48) · *"他的肉到现在还疼着呢"* (66) |
| C7 | C (gu) | SR | cảnh 02, dòng 150 | 躺平 không có trong 乐博 (ông dùng 咸鱼躺) | *"咸鱼躺平，静待天黑。"* |
| C8 | C (gu) | SR | cả chương | Mật độ đoạn một dòng "đấm" dày | *Số đo, không trích.* |
| L1 | low | CR-L1 | cảnh 03, dòng 228 | Tsuna không thể biết biệt danh "石头脑袋"; bỏ 果然 hoặc viết lại | *"私底下被人叫作石头脑袋的人，果然是撬不开的。"* |
| L2 | low | CR-L2 | cảnh 03, dòng 210 | Giọng "thông báo giờ tập trung" dễ đọc thành cái nháy mắt rằng không ai xuống xe là lệ thường (gần kỳ bảo hộ). Dùng "笑眯眯地宣布" | *"语气平常得像在通知明天几点集合：“本集没有嘉宾下车。”"* |
| L3 | low | CR-L3 | cảnh 02, dòng 136–146 | Diễn đàn: bài 17L (nước) nằm ngay trên 18L (作秀), nên việc Tsuna "không hiểu 作秀 là gì" nghe giả; tách xa hoặc cho cậu lướt qua | *"17L：只有我注意到他给收音小哥拿了瓶水吗？"* → *"18L：作秀罢了，心机beta一个。"* |
| L4 | low | CR-L4 | cảnh 03, dòng 158 | Khẳng định như sự thật rằng người cầm hợp đồng là tổng đạo diễn. **Đã duyệt theo thẻ**; ghi vào `dao-dien-tdtb` lúc commit | *"当初就是这位大叔拿着合同，亲自找到了他在校外租住的宿舍"* |
| L5 | low | CR-L5 | cảnh 02 dòng 82 ↔ cảnh 03 dòng 172, 180 | Kenichi là 健一 ở 82 nhưng 铃木健一 ở 172/180; dạng trần thuật chuẩn là 铃木健一 | *"圭介、健一、千岛和优子已经挽起了袖子"* ↔ *"下一个是铃木健一"* |
| L7 | low | CR-L7 | cảnh 02, dòng 88 | 千岛 có một câu thoại, trong khi thẻ 02 loại trừ. Vô hại | *"千岛问他：“纲吉君平时在家做饭吗？”"* |
| L8 | low (linh cảm) | CR-L8 | cảnh 02 dòng 84; cảnh 03 dòng 172, 180 | (a) Cách 优子 xưng hô (圭介 trần, 雪君, 纲吉君): chưa có mẫu đối chứng chắc. (b) Chiếc cốc của Kenichi ở 172/180: hai lần nhắc, chưa rõ có ý đồ hay ngẫu nhiên | *"圭介和千岛切菜，健一看着汤锅，雪君帮我打下手"* · *"他端着一杯茶…神情轻松得很"* |
| S1 | low | TK | cảnh 03, dòng 154 ↔ 182, 218 | **Trạng thái ghi hình lệch.** Dòng 154 nói "第一集拍完了" rồi cảnh vẫn quay trên livestream (178 *"当着直播镜头"*, 182 *"直播间里的弹幕"*), còn 218 lại là lúc *"录制一结束，摄影师们就开始收机器了"*. Hai bên không cùng đúng | *"第一集拍完了，按照流程，接下来就是评分。"* (154) ↔ *"录制一结束，摄影师们就开始收机器了。"* (218) |

Tổng: 2 medium + 3 B + 8 C (C3 gộp với L6) + 7 low còn lại (L1–L5, L7, L8) + S1 = **21 dòng**, **0 high**. L4 chỉ cần ghi note lúc commit, L7 vô hại: hai mục này không cần sửa văn.

**Những gì đã qua** (CR xác nhận; tôi đọc lại bản nháp thấy khớp): thứ tự D1 (phòng khách → phỏng vấn riêng + phiếu → công bố → hỏi đạo diễn: dòng 154 → 190 → 210 → 218) · câu Kenichi (dòng 174, 65/65 chữ theo CR) · không có chữ nào về kỳ bảo hộ · 沢田君 chỉ ở ngoài camera (226) · 阿纲 (244) · câu cuối đúng nguyên văn (258) · N1a (dòng 54 nêu việc dân mạng tự đối ra) · D6 (dòng 98–114 chỉ dùng cần thu âm, không có logic "trốn camera nên camera thấy") · R3-M2 · hard-rules (ngoặc, chi tiết mùa, POV: style-reviewer 0 vi phạm).

### Mối nối giữa các phần

Tôi đọc liền từ dòng 26 tới 258, không đọc theo thứ tự worker nộp.

| Mối nối | Kết luận | Ghi chú |
|---|---|---|
| ch16 → 01 (dòng 26) | ổn | Mở bằng *"山本武那句“我并不会手下留情”"*, Tuyết không biết Yamamoto ở phòng Tsuna (đúng ranh POV). Tôi **không** đối lại nguyên văn ch16; tin CR |
| 01 → 02 (dòng 72 → 76) | ổn | 01 kết *"‘第一集结束，就是沢田纲吉下车的时候。’"* / 02 mở *"纲吉下楼之前先冲了个澡"*. Camera phòng tắt từ "昨晚" ở cả hai bên (26 và 128), không mâu thuẫn. Đổi POV qua vạch `……` đúng |
| 02 → 03 (dòng 150 → 154) | ổn, kèm C1 | 02 kết *"咸鱼躺平，静待天黑。"* / 03 mở *"天黑以后，节目组把六位嘉宾都叫回了客厅"*. Sáu khách (82) = sáu người ở 03; Yamamoto không nằm trong sáu nên không cần nhắc vắng mặt. Mô-típ 凉意 nối 98 → 166 → 180 → 204 (C1). Chai nước ở 108 không được nhắc lại ở 03 (plan chỉ để tuỳ chọn): ổn |
| **Trong cảnh 03** (154 ↔ 218) | **lệch** | S1: *"第一集拍完了，按照流程，接下来就是评分。"* ↔ *"录制一结束，摄影师们就开始收机器了。"*. Đổi 154 thành *"第一集的录制快要结束了"* hoặc tương đương |
| 03 → 04 (dòng 234 → 238) | ổn | 03 kết *"那就第二集下车。"* / 04 mở *"节目组的车就等在别墅门口"*. 五十万 không lặp ở 04 (đúng chỉ dẫn plan), 机甲 nhắc đúng một lần (238). "今天" của Nana (244) cùng tối |
| 04 → ch18 (dòng 258) | ổn, kèm M1 | Dừng đúng *"……我哪来的朋友？"* thành tiếng. M1 (chuông cửa) là chỗ duy nhất ch17 tự đặt canon cho ch18 |
| Địa chỉ xưng hô / giọng | ổn, kèm L5 | 纲吉君 · 雪君 (khách) · 沢田君 (tổng đạo diễn, 226) · 阿纲 (Nana) · 山本 (Tsuna gọi) khớp plan. Lẫn 健一/铃木健一 (L5). Tuyết dùng `‘’` trong đầu, 0038 dùng `“”` (30–34): nhất quán. Không thấy giọng nhảy giữa các worker |
| Số liệu ↔ plan | ổn, kèm B1–B3 | Thoại 18,1 % (dải 15–30), thuật ngữ 14,5/1000 (≥ 10), `——` 0; lệch ở trung vị câu và độ dài |

Số mối nối: 8, trong đó **1 lệch** (S1).

### Sửa ở bản revision — xếp theo worker

Người sửa là worker sở hữu đoạn đó (Mode 3); tôi không sửa. **Cơ học** = có đáp án một cách; **cần Aurel** = chờ Aurel trả lời trước. Số dòng theo bản nháp hiện tại.

**Đơn vị 1 — cảnh 01 (dòng 26–72, W1)**

| # | Sửa | Loại | Nguồn |
|---|---|---|---|
| R1 | Bỏ một trong hai "肉疼": giữ dòng 48, viết lại dòng 66 (*"刚刚那一百积分花出去，他的肉到现在还疼着呢"*) không lặp chữ | cơ học | C6 |
| R2 | Dòng 62: trích nhiệm vụ 5 thành dòng hệ thống thay vì lời kể (tuỳ chọn, theo gu 乐博; không bắt buộc) | cơ học, tuỳ chọn | C5 |

**Đơn vị 2 — cảnh 02 (dòng 76–150, W2)**

| # | Sửa | Loại | Nguồn |
|---|---|---|---|
| R3 | Dòng 84: thay *"一头短发往后一捋"* bằng cử chỉ khác, không đụng tóc (xắn tay áo, vỗ tay đánh nhịp…) | cơ học | M2 |
| R4 | Dòng 82: *"健一"* → *"铃木健一"* | cơ học | L5 |
| R5 | Dòng 114: bỏ lối "纲吉当然不知道…" (giữ 182), kể thẳng việc bình luận chạy trên màn hình | cơ học | C3 · L6 |
| R6 | Dòng 144: nếu là nghĩ thầm thì đổi thành `‘作秀？什么时候？’`; nếu nói thành tiếng thì thêm một nhịp nói ra | cơ học | C2 |
| R7 | Dòng 136–146: tách bài 17L khỏi 18L (chèn bài khác vào giữa, hoặc đổi 17L) để việc Tsuna không hiểu "作秀" còn đứng vững | cơ học | L3 |
| R8 | Dòng 150: *"咸鱼躺平"* → kiểu 乐博 *"咸鱼躺"* | cơ học | C7 |
| R9 | Dòng 98: giữ nguyên (cụm đầu của mô-típ 凉意); việc cắt nằm ở R12 | không đổi | C1 |
| R10 | Gộp các câu ngắn liền nhau ở cảnh 02 bằng dấu phẩy thành câu dài hơn (mục tiêu trung vị ~24); làm khi đã chạm tới dòng đó, không viết lại cả cảnh | cơ học, mềm | B1 · B3 |

**Đơn vị 3 — cảnh 03 và 04 (dòng 154–258, W3)**

| # | Sửa | Loại | Nguồn |
|---|---|---|---|
| R11 | Dòng 154: sửa *"第一集拍完了"* cho khớp với 218 (vẫn đang ghi hình) | cơ học | S1 |
| R12 | Mô-típ 凉意/恶意: giữ dòng 98 (đơn vị 2) và **dòng 180** (*"像一根针"*, nhịp tăng lên); cắt câu giải thích ở 166 (*"直觉告诉他…全是恶意"*) và nhịp 204 (*"客厅里那股凉意…"*) | cơ học, theo khuyến nghị | C1 |
| R13 | Dòng 188: thay *"原形毕露"* bằng cụm khác (*"一整天跟个背景板似的"* đã đủ) | cơ học | C3 · L6 |
| R14 | Dòng 228: bỏ *"私底下被人叫作石头脑袋的人，果然…"*, viết lại thành ý của Tsuna (*"撬不开"*) không dùng biệt danh cậu không biết | cơ học | L1 |
| R15 | Dòng 210: *"语气平常得像在通知明天几点集合"* → *"笑眯眯地宣布"* | cơ học | L2 |
| R16 | Dòng 212, 216, 238: bớt một lượt "没有…没有…" mỗi chỗ (giữ 216, rút 212; rút 238 còn hai vế) | cơ học | C4 |
| R17 | Dòng 172 (*"铃木健一"*) đã đúng; không đổi. Chiếc cốc (172/180) chưa cần sửa, để ý nếu revision chạm tới | để ý | L8b |
| R18 | Dòng 244–252: xử lý theo A1 — **cần Aurel**. Nếu cắt: bỏ *"门铃一响，妈妈还以为是来推销的，差点就不开门了"* và dòng 246 *"该不会真是推销的吧？"*, giữ *"你猜是谁？"*; câu 248 *"才不是呢"* nối tiếp cần đổi theo | **cần Aurel** | M1 |
| R19 | Toàn chương: tỉa nhẹ các đoạn một dòng "đấm" (C8) khi chạm tới; chỉ làm cùng lượt với R12 và R16 | cơ học, mềm | C8 |

Không đụng: L4 (ghi vào `dao-dien-tdtb` lúc commit, không phải sửa văn), L7 (vô hại), L8a (xưng hô 优子: chưa có mẫu đối chứng để sửa; ghi chú).

Việc chốt sổ ở bước commit, không thuộc revision văn: cập nhật `h-0038-kiem-tra-yamamoto-tdtb` thành `paid` + số chương (R2-O4 ở vòng 2) · `dao-dien-tdtb` ghi tổng đạo diễn là người cầm hợp đồng (L4) · `biet-thu-tam-dong-tdtb` thêm bếp (R2-O3, nay đã có 02-P1).

### Cần Aurel quyết

Mỗi mục: **đề xuất** và một dòng lý do.

1. **A1 — Chi tiết "người bán hàng" ở cảnh 04 (M1).** *Đề xuất:* **cắt** — bỏ tiếng chuông, cú do dự và câu hỏi lại *"该不会真是推销的吧？"*; giữ *"家里来了一位客人……你猜是谁？"* và nhịp *"才不是呢，是你的朋友哦！"*. *Vì sao:* dàn ý ch18 có khối POV Nana, nên lúc Nana mở cửa sẽ được kể lại từ phía bà; cắt thì ch18 tự do hơn và khỏi thêm ràng buộc, còn chi tiết này chỉ thêm một nhịp hài nhỏ. *Nếu giữ:* ghi một dòng vào *Ràng buộc từ ch17* của `dan-y-ch16-ch19-tdtb` (Nana nghe chuông, tưởng là người bán hàng, suýt không mở) để ch18 phải kể đúng như vậy. Cả hai đều chấp nhận được.
2. **A2 — Độ dài 4.344 chữ Hán (B2).** *Đề xuất:* **chấp nhận và đi tiếp**. *Vì sao:* theo ghi nhớ của Aurel (ước lượng từ là **sàn**), chương dài hơn khung arc không phải lỗi nếu độ dài đến từ câu chuyện; đây là số báo, không phải lý do sửa. Nếu Aurel vẫn muốn gọn hơn thì R12, R16, R19 sẽ tự rút một ít chữ ở cảnh 03 mà không cần cắt cảnh (*not measured* bao nhiêu).
3. **A3 — Câu trung vị 20 và thoại cảnh 02 (B1, B3).** *Đề xuất:* **chấp nhận mức 20 cho chương, không bắt viết lại**; chỉ làm R10 (gộp câu ngắn ở cảnh 02) nếu Aurel muốn sát 乐博 hơn. *Vì sao:* plan đã cảnh báo từ ch16 (trung vị 15); chương này đã lên 20, thoại chung 18,1 % nằm trong dải, và hai chỉ tiêu bị kéo chủ yếu bởi cảnh 02, vốn nhiều hành động ít lời. Đây là điểm chỉ tiêu, không phải lỗi canon.

Không cần Aurel: L4 (đã duyệt theo thẻ), L7, L8, và các mục cơ học R1–R19 trừ R18.

### Bàn giao

## Stage complete: summary (bản nháp write-chapter)
- Produced: mục này, để dispatcher nối vào `chapters/arc-1/ch17/ch17-tong-ket.md` — 3 workers, 21 findings (0 high), 8 seams (1 lệch: S1)
- Verify gate: every worker path read — yes cho chương ráp (đủ 259 dòng, gồm cả bốn cảnh); ba file scratchpad riêng của W1–W3 không đọc vì dispatcher đã ráp vào chương; báo cáo reviewer đọc qua dispatcher, không có file riêng
- Open items: không có `high`. Một mối nối lệch (S1, dòng 154 ↔ 218). Hai `medium`: M1 (chờ Aurel, A1) và M2 (sửa cơ học R3)
- Handoff: Aurel needs A1 (cắt hay giữ chi tiết "người bán hàng") và A2–A3 (báo độ dài, câu trung vị; đề xuất chấp nhận) · W1 needs R1–R2 · W2 needs R3–R8, R10 · W3 needs R11–R16, R19 (và R18 sau khi Aurel trả lời A1) · kế tiếp: `write-chapter` Mode 3 sửa theo các mục đã duyệt, rồi `finalize-chapter`

## Sửa bản nháp — write-chapter Mode 3 (01/10)

> Chỉ đọc, không sửa. Đây là **bản nháp sau vòng sửa Mode 3** của `ch17-chapter.md` (`status: draft`, 256 dòng), nối sau mục "Bản nháp — write-chapter (01/10)".
> **Kết luận ngắn:** chương **sẵn sàng cho `finalize-chapter`, chờ Aurel nói "đi tiếp"** (Aurel mới đồng ý A1–A3 và R1–R19, chưa nói gì về finalize). Không có `high`, không có `medium`; mọi R đều đã vào văn (tôi đọc lại từng dòng, khớp; R10 làm một phần, đúng theo "mềm"). Còn 6 điểm `low` của continuity (N1–N6), 8 điểm gu của style (T1–T8) và 2 điểm do tôi thêm; **không cái nào chặn**. Chỉ N4 và N6 (cộng đề nghị T6) là việc của Aurel.
> Số chữ Hán là **số worker/dispatcher báo**; tôi không có công cụ đếm chữ Hán nên *not measured* bởi tôi. Báo cáo style-reviewer và continuity-reviewer do dispatcher chuyển (không có file riêng). Dòng = số dòng file chương hiện tại.

### Aurel đã đồng ý (theo chat) và đã vào văn chưa

| Mục | Nội dung | Trạng thái trong chương |
|---|---|---|
| A1 | Cắt chi tiết "người bán hàng" | Xong: dòng 242 còn *"你猜是谁？猜不到吧？"*, không còn chuông cửa, không còn *"推销"*; cuộc gọi còn 7 lượt (≥ 5 theo plan) |
| A2 | Chấp nhận độ dài | Chương 4.297 chữ Hán, vẫn dài hơn chương dài nhất của 乐博 (3.911); không sửa |
| A3 | Chấp nhận trung vị câu | Trung vị 21 (bản trước 20); R10 chỉ làm một phần |
| R1–R19 | Sửa cơ học | Xong hết, trừ R9 (cố ý không đổi) và R10, R19 (làm một phần, mềm) |

### Ba phần đã làm — worker nào đổi gì

Cả ba worker đã chạy, không thiếu.

| Worker | Phần | Dòng | Chữ Hán (trước → sau) | Đã đổi |
|---|---|---|---|---|
| W1 | Cảnh 01 (Tuyết) | 26–72 | 1.001 → **1.007** | R1: dòng 66 *"刚刚那一百积分才打了水漂，他现在一分都舍不得再花了"* (hết lặp 肉疼; dòng 48 giữ). R2: dòng 62 trích *“指南任务五：…”* (khớp ch13.27 từng chữ, theo style-reviewer). `pov_leak_check` exit 0 |
| W2 | Cảnh 02 (Tsuna, ban ngày) | 76–152 | 1.424 → **1.469** | R3: 优子 *"拍了两下手"* (dòng 84). R4: *铃木健一* (82). R5: dẫn nhập *"在纲吉看不见的直播间里"* (114). R6: *‘作秀？什么时候？’* thành suy nghĩ (140). R7: diễn đàn 1L-2L-3L-17L-52L-53L (6 tầng; bỏ 85L), thêm câu nối *"他一上午只夸了一句米白"* (142). R8: *"咸鱼躺就位"* (152). L7: câu hỏi nấu ăn chuyển sang 优子 (88). R10 làm một phần. Thoại 12,4 % |
| W3 | Cảnh 03 + 04 (Tsuna) | 156–256 | 1.898 → **1.800** (03: 1.514 · 04: 286) | R11: dòng 156 *"直播还开着"*. R12: dòng 168 còn *"只有纲吉的后背又凉了一下"*, bỏ nhịp 204. R13: bỏ 原形毕露 ở livestream (190). R14: *"这位大叔的嘴，是撬不开的"* (226). R15: *"笑呵呵地宣布"* (210). R16: bớt "没有…没有…" (212, 238). R17: chiếc cốc nhất quán (174 ↔ 182). R18/A1: cắt người bán hàng. R19: hai chỗ gộp. Thoại 04 32,2 % (đích ~45 %, đã chấp nhận) |
| Tổng | Chương | 26–256 | 4.344 → **4.297** | Thoại 0,177 (dải 0,15–0,30) · trung vị câu 21 · `……` 2,56/1000 · `——` 0 · thuật ngữ 14,89/1000 (≥ 10) |

Đối số: 1.007 + 1.469 + 1.800 = 4.276; chương 4.297; chênh 21 đúng bằng chênh của bản trước (dòng ※ và tiêu đề do dispatcher ghép; không đo lại).

Cổng máy (do dispatcher/reviewer báo, tôi không chạy lại): `style_metrics --write` exit 0 · `ai_tells_check` exit 0 · `vault_doctor` 0 lỗi · `pov_leak_check` b01 exit 0, b02–b04 exit 1 (một bí mật không có `leak_terms`; đã grep tay: sạch). D9 (thêm `leak_terms` tiếng Trung) vẫn chưa làm, nên "exit 1" là hệ quả, không phải rò.

### Phát hiện — gộp, giữ mức của reviewer

`SR` = style-reviewer (không dùng high/medium/low, chỉ "gu"; tôi giữ là **gu**), `CR` = continuity-reviewer, `TK` = tổng kết. Style-reviewer: 0 vi phạm hard-rule. Continuity-reviewer: 0 high, 0 medium.

#### High / Medium

Không có.

#### Low (continuity) và gu (style), gộp

| # | Mức | Nguồn | Ở đâu | Vấn đề | Trích |
|---|---|---|---|---|---|
| N1 | low | CR | dòng 168 ↔ 182 | Nhịp "凉" thứ hai ("又凉了一下") và thứ ba ("那股凉意一下子变尖了") đứng gần, chữ "凉" lặp. CR gợi ý sửa tuỳ chọn. T4 của SR coi nhịp 168 là chấp nhận được | *"只有纲吉的后背又凉了一下"* (168) ↔ *"那股凉意一下子变尖了"* (182). Gợi ý: *"后背又是一凉"* |
| N2 | low | CR | dòng 162, 210 | 笑呵呵 ×2 vẫn qua kiểm tra plan-leak (không giống 笑眯眯 của Kenichi). Ghi nhận, không phải lỗi. Trùng T5 của SR | *"导演笑呵呵地拍了拍手"* (162) · *"笑呵呵地宣布"* (210) |
| N3 | low | CR | dòng 84, 162, 212 | Tiếng vỗ tay lặp ba lần ở ba người khác nhau (và tôi thêm dòng 172, xem TK1) | *"优子……拍了两下手"* (84) · *"导演笑呵呵地拍了拍手"* (162) · *"优子带头鼓起了掌"* (212) |
| N4 | low · **Aurel quyết** | CR | cả chương (82, 84, 88, 98, 164, 212…) | Phần kể dùng 优子/千岛 trần; 乐博 trong lời kể POV Tsuna dùng 千岛小姐/优子小姐 (ch10.19, ch14.2). Chưa rõ ý đồ | *"圭介、铃木健一、千岛和优子已经挽起了袖子"* (82) |
| N5 | low (tác động sang ch18) | CR | cảnh 04, dòng 238–256 | Cảnh 04 giờ cố định lời Nana; thông tin này chưa nằm trong *Ràng buộc từ ch17* của dàn ý (xem checklist finalize) | *"阿纲！……今天呀，家里来了一位客人，你猜是谁？"* (242) · *"是你的朋友哦！说是专门来看你的。"* (246) · *"他看了一眼前面开车的司机，压低了声音，打断了……"* (254) |
| N6 | low · **Aurel quyết** | CR | `hard-rules` mục B ↔ dòng 62 | `hard-rules` B không có hàng cho chữ hiện trên màn hình của "指南" (nguyên tác trộn “” và ‘’). Chương theo ch13.27: “” | *"“指南任务五：和山本武一起进行棒球训练并获得他的赞赏”"* (62) |
| T1 | gu (không sai) | SR | dòng 152 | 咸鱼躺就位: tự nhiên, đúng tông (ch8.77 咸鱼躺). Giữ | *"咸鱼躺就位，静待天黑。"* |
| T2 | gu | SR | dòng 76, 96, 128 ×2, 152 | 咸鱼 ×5 trong 1 chương, so với 3 lần trong 15 chương của 乐博. SR gợi ý bỏ một ở dòng 128 | *"他终于不用在镜头前演咸鱼，可以真当咸鱼了"* (128) |
| T3 | gu | SR | dòng 114, 184 | Thủ pháp "弹幕 mà nhân vật không thấy" còn dùng hai lần | *"在纲吉看不见的直播间里，弹幕又刷过去了好几屏"* (114) · *"他不知道，这时候直播间里的弹幕已经刷成了一片"* (184) |
| T4 | gu | SR | dòng 168 | Nhịp 凉 thứ ba: chấp nhận được | *(xem N1)* |
| T5 | gu | SR | dòng 162, 210 | 笑呵呵 ×2 | *(xem N2)* |
| T6 | gu · **Aurel quyết (tuỳ chọn)** | SR | cả chương | Láy AABB ×9 = 2,09/1000; 乐博 trung bình 0,7, cao nhất 2,14; ch16 là 2,37. Ứng viên cho `extra_constructs` trong `ai-tells.md` | Tôi đếm lại, đủ 9: 干干净净 (42) · 顺顺当当 (80) · 明明白白 (98) · 晃晃悠悠 (100) · 舒舒服服 (150) · 憨憨厚厚 · 清清楚楚 (cùng dòng 160) · 温温柔柔 (164) · 高高兴兴 (242) |
| T7 | gu | SR | cả chương | "没有" 5,6/1000 so với dải 1,7–4,8 của 乐博 | *Số đo, không trích.* |
| T8 | gu | SR | dòng 226 | Một chuỗi dấu phẩy đổi chủ ngữ giữa chừng (人 → 纲吉) | *"话音刚落，人就走远了，走得又快又稳，一个字都没有多留，纲吉算是看出来了，这位大叔的嘴，是撬不开的。"* |
| TK1 | low | TK | dòng 172 | Thêm bản đếm vỗ tay: tính cả *"纲吉差点当场给他鼓掌"* thì là bốn nhịp. Dòng 172 là điểm hài có chủ ý, nên chỉ ở mức ghi nhận | *"纲吉差点当场给他鼓掌。"* |
| TK2 | low | TK | dòng 76 ↔ 174 | W3 giữ 笑眯眯 riêng cho Kenichi, nhưng dòng 76 cũng dùng cho Yamamoto | *"笑眯眯地跟每个人打招呼"* (76, 山本) ↔ *"笑眯眯地抿了一口"* (174, 健一) |

Tổng: 0 high, 0 medium, **16 dòng** (N1–N6, T1–T8, TK1–TK2). T1 và T4 là "giữ", N2 trùng T5; nên thực việc cần cân nhắc chỉ ở danh sách P bên dưới.

### Mối nối giữa các phần

Tôi đọc liền từ dòng 24 tới 256, không theo thứ tự worker nộp.

| Mối nối | Kết luận | Ghi chú |
|---|---|---|
| 01 → 02 (dòng 72 → 76) | ổn | 01 kết *"‘第一集结束，就是沢田纲吉下车的时候。’"* / 02 mở *"纲吉下楼之前先冲了个澡"*. Camera phòng tắt ở cả hai bên (26, 128) vẫn khớp; chưa nơi nào nói ai tắt camera phòng Tsuna (đã nêu ở vòng 1, L4/D7) |
| Trong 02 (diễn đàn 136–148) | ổn (R7 đã đóng) | 17L (作秀) → bước nối → 52L → 53L: việc Tsuna không hiểu 作秀 đứng vững; sáu tầng |
| 02 → 03 (dòng 152 → 156) | ổn | *"咸鱼躺就位，静待天黑"* → *"天黑以后…"*. Sáu khách (82) = sáu người (156). Mô-típ 凉: 98 → 168 → 182, ba nhịp tăng dần |
| Trong 03 (156 ↔ 216) | ổn (S1 đã đóng) | 156 *"直播还开着，……第一集只剩下最后一个环节，评分"* ↔ 216 *"录制一结束，摄影师们就开始收机器了"*: cùng đúng. Chiếc cốc 174 ↔ 182 nhất quán (R17) |
| 03 → 04 (dòng 232 → 236) | ổn | *"那就第二集下车"* → xe của show; 五十万 không lặp, 机甲 một lần (236) |
| Cảnh 04 trong chính nó | ổn | 7 lượt; Nana gọi, Tsuna ngồi sau xe có tài xế (254) nên hạ giọng và cắt lời; câu cuối dòng 256 đúng nguyên văn *"……我哪来的朋友？"* |
| 04 → ch18 | ổn, kèm N5 | Dừng thành tiếng, nhưng ch18 phải nhớ ba chi tiết mới (xem checklist) |
| Giọng / xưng hô | ổn, kèm N4 | 纲吉君 · 雪君 (khách) · 沢田君 (tổng đạo diễn, ngoài camera, 224) · 阿纲 (Nana) · 山本 (Tsuna). Không thấy giọng nhảy giữa W1/W2/W3 |

Số mối nối: 8, **0 lệch** (S1 và R3-M2 của bản trước đã đóng).

### Gợi ý tỉa nhẹ — P1…P8, **tuỳ chọn, không chặn**

Chỉ làm nếu Aurel muốn; mỗi mục một câu, người sửa là worker sở hữu đoạn.

| # | Owner | Dòng | Gợi ý | Nguồn |
|---|---|---|---|---|
| P1 | W2 | 128 | Bỏ một trong hai "咸鱼" của câu này (còn 4 lần trong chương) | T2 |
| P2 | W3 | 184 | Đổi cách vào của đoạn bình luận để không lặp thủ pháp "他不知道…弹幕" của dòng 114 | T3 |
| P3 | W3 | 168 | *"后背又是一凉"* cho hết lặp với "凉意" ở 182 | N1 · T4 |
| P4 | W3 | 226 | Tách chuỗi dấu phẩy: cho *"纲吉算是看出来了"* thành câu riêng | T8 |
| P5 | W2 / W3 | 84, 162, 212 | Đổi một trong ba nhịp vỗ tay (gợi ý: dòng 162 thành động tác khác của 导演) | N3 |
| P6 | W2 / W3 | 160 (và 150, 164) | Giảm AABB: gợi ý dòng 160 (憨憨厚厚 + 清清楚楚 cùng một dòng; 憨憨厚厚 cũng là dạng láy ít thấy, ý riêng của tôi, chưa có reviewer nào nêu) | T6 |
| P7 | W2 | 76 | 笑眯眯 của Yamamoto đổi cụm khác để 笑眯眯 chỉ còn của Kenichi | TK2 |
| P8 | W3 | 162, 210 | 笑呵呵 ×2: **nên giữ** (lặp có chủ ý, cùng tổng đạo diễn, qua kiểm tra plan-leak) | N2 · T5 |

Không cần làm: T1 (giữ), T7 (số đo, không có chỗ cụ thể), TK1 (điểm hài có chủ ý).

### Cần Aurel quyết

1. **Đi tiếp `finalize-chapter` hay làm vài mục P trước.** *Đề xuất:* đi tiếp ngay; P1–P8 đều tuỳ chọn và độc lập.
2. **N4: cách gọi 优子/千岛 trong lời kể POV Tsuna.** *Đề xuất:* giữ trần (không đổi). *Vì sao:* đã nhất quán cả chương; ch10 và ch14 của 乐博 dùng "小姐" nhưng chưa có mẫu cho cả sáu khách, và đổi sẽ chạm khoảng 10 dòng.
3. **N6: thêm hàng cho chữ hiện trên màn hình "指南" vào `hard-rules` B.** *Đề xuất:* ghi "“” theo ch13.27, nguyên tác trộn cả hai". *Vì sao:* khỏi để writer sau tự đoán. Việc này sửa file luật nên cần Aurel đồng ý trước (theo ghi nhớ "báo ảnh hưởng trước khi sửa": chỉ đụng một hàng trong `hard-rules.md` mục B).
4. **T6 (tuỳ chọn): thêm láy AABB vào `ai-tells.md` `extra_constructs`.** *Đề xuất:* chưa thêm; ghi nhận ch16 2,37 và ch17 2,09 rồi chờ thêm một chương. *Vì sao:* hai chương mới chỉ là xu hướng, ch17 đã nằm trong dải cao nhất của 乐博 (2,14).

### Checklist cho `finalize-chapter` (sổ sách, không sửa văn)

Các mục chạm vào note ngoài chương: theo ghi nhớ của Aurel, liệt kê tác động rồi chờ chốt trước khi sửa; chỗ nào sửa file luật hay dàn ý đã duyệt thì hỏi.

| # | Việc | File | Chi tiết |
|---|---|---|---|
| F1 | Hook thành `paid` | `hooks/h-0038-kiem-tra-yamamoto-tdtb.md` | `status: open` → `paid`, `payoff.status: unplanned` → `paid`, ghi ch17 (cảnh 01: *"数据正常，未发现漏洞"* rồi 档案 100 điểm vô ích). Lưu ý: dòng 30–36 chỉ trả một nửa (Yamamoto vẫn không có lỗi); kiểm tra tên hook có yêu cầu "tìm ra lý do" không trước khi chốt "paid" |
| F2 | Ghi tổng đạo diễn cầm hợp đồng | `Characters/dao-dien-tdtb.md` | Dòng 160: chính ông tới phòng trọ của Tsuna với hợp đồng; vẻ ngoài 慈眉善目; dòng 224: gọi *沢田君* khi không có camera; dòng 220: *"综合考虑"* (không giải thích) |
| F3 | Bếp và đảo bếp | `locations/biet-thu-tam-dong-tdtb.md` (R2-O3) | Bếp có 岛台 (98); góc xa có ghế đẩu (100); đủ chỗ cho cả sáu người nấu |
| F4 | Dòng thời gian S2 | `Timeline/master.md` | Các hàng: rạng sáng (Tuyết, kiểm tra 0038, 档案 100 điểm) · sáng (Tsuna, bữa sáng, Yamamoto đi) · bếp / nấu bữa trưa · nghỉ trưa, diễn đàn · tối: phòng khách, cảm tưởng, phỏng vấn riêng · "本集没有嘉宾下车" · hỏi đạo diễn · lên xe · điện thoại Nana. Gộp việc R2-O2 ("Tokyo Dome" → 巨蛋体育场) nếu vẫn còn |
| F5 | **N5, tác động sang ch18** | `arcs/dan-y-ch16-ch19-tdtb.md` mục *Ràng buộc từ ch17* (dòng 158–164, hiện có 5 mục) | Thêm: (6) Nana là bên gọi, lời Nana cố định như ở 242–250 (khách tóc bạc, "专门来看你", Nana hồ hởi, chưa nhắc tên); (7) Tsuna đang ngồi xe của show, có tài xế, nên nói nhỏ và cắt lời bà (254–256); (8) Gokudera nói với Nana rằng anh là bạn của Tsuna, đến đặc biệt để thăm. Đây là sửa dàn ý đã duyệt, nên báo Aurel trước. Cũng ghi: A1 đã cắt người bán hàng nên **không** có ràng buộc "chuông cửa" nào |
| F6 | Ghi chú đóng chương | `ch17-chapter.md` hoặc `ch17-tong-ket.md` | Ghi danh sách từ đã grep tay vì `pov_leak_check` mù với CJK: 任务者 · 土著 · 中转站 · 魅力药水 · 饮料机 · 0038 · 宿主 · 指南 · 百合 (ứng viên của D9; cảnh 01 là POV Tuyết nên 0038, 宿主, 指南 hợp lệ ở đó, chỉ cấm ở ba cảnh Tsuna). Ghi thêm: b02–b04 exit 1 là do một bí mật thiếu `leak_terms`, kết quả grep tay: sạch |
| F7 | Câu hỏi còn mở | `questions/q-yamamoto-di-dau-ngay-s2-tdtb.md` (file mới, chưa theo dõi trong git) | Giữ mở: dòng 76 *"吃完饭说了句有点事，就出门了"* vẫn chưa nói đi đâu; chương không trả |
| F8 | Số đo | `ch17-chapter.md` frontmatter / bảng chỉ tiêu | `style_metrics --write` đã ghi; kiểm tra số cuối khớp 4.297 · 0,177 · 21 · 2,56 · 14,89 |
| F9 | (nếu Aurel đồng ý) | `hard-rules.md` B | Hàng mới cho chữ "指南" (N6) |

Việc F1–F3 là sổ sách thuần; F4 thuần ghi sự kiện; F5 và F9 sửa file đã duyệt/luật, cần Aurel nói trước.

### Bàn giao

## Stage complete: summary (bản nháp sau sửa Mode 3)
- Produced: mục này, để dispatcher nối vào `chapters/arc-1/ch17/ch17-tong-ket.md` — 3 workers, 16 findings (0 high; 0 medium; 6 low + 8 gu + 2 do tôi thêm), 8 seams (0 lệch)
- Verify gate: every worker path read — yes cho chương ráp (đủ 256 dòng, gồm cả bốn cảnh) và `ch17-tong-ket.md` (cả mục bản nháp trước, dòng 447–592); ba file scratchpad riêng của W1–W3 không đọc vì dispatcher đã ráp vào chương; báo cáo reviewer đọc qua dispatcher, không có file riêng; số chữ Hán là số worker báo, không tự đo
- Open items: không có `high`, không có mối nối lệch. Chờ Aurel: N4, N6, T6 (đều tuỳ chọn) và lời đi tiếp finalize
- Handoff: Aurel needs mục này để nói "đi tiếp finalize" hoặc chọn P1–P8 · không worker nào cần sửa bắt buộc · kế tiếp: `finalize-chapter` theo checklist F1–F9 (F5, F9 hỏi Aurel trước)
