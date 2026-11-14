---
id: secret.TDTB.loc-da-tuyet-do-loi-cho-kenichi-tdtb
type: secret
scope: project
lane: personal
project: TDTB
canon_layer: fic_explicit
status: active
visibility:
  author: true
known_by: ["character.TDTB.loc-da-tuyet-tdtb"]
suspected_by: []
unknown_to: ["character.TDTB.kesuke-tdtb", "character.TDTB.sawada-tsunayoshi-tdtb", "character.TDTB.yamamoto-takeshi-tdtb"]
reveal_planned:
  arc: null
  chapter: null
aliases: ["Loc Da Tuyet do loi cho Kenichi", "Kenichi de doa Tuyet", "vi sao Tuyet da Kesuke", "lý do chia tay giả", "Kenichi bị đổ oan"]
leak_terms: ["健一威胁", "健一君威胁", "健一的威胁"]
related: ["[[loc-da-tuyet--kesuke-tdtb]]", "[[kesuke--kenichi-tdtb]]", "[[kesuke-tdtb]]", "[[suzuki-kenichi-tdtb]]", "[[loc-da-tuyet-tdtb]]"]
source:
  type: fic_text
  ref: "乐博 — 《十代目每天都在装B》, JJWXC novelid 5231858, ban convert tieng Viet — ch10"
authority: original_author
confidence: 1.0
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-01
---

# Lộc Dã Tuyết đá Kesuke rồi đổ cho Kenichi

> ⚠️ Ba trường `known_by` / `suspected_by` / `unknown_to` là thứ chặn nhân vật biết sớm. Khai đủ, đừng để trống.

## Sự thật — ch10

Lộc Dã Tuyết bỏ Kesuke vì Kesuke *"tính cách quá mức cường thế, độc chiếm dục quá mạnh mẽ, khiến cho hắn muốn chiến lược những thứ khác mục tiêu đều rất phí sức"*. Để Kesuke khỏi *"vì yêu sinh hận"*, cậu ta dựng lý do:

> *"Lộc Dã Tuyết liền ám chỉ thành cùng nhau Kesuke chính mình là bị linh mộc kiện một uy hiếp, cho nên mới rời đi bên cạnh hắn."*

Kenichi là thanh mai trúc mã của Kesuke và thích Kesuke, nên lời đổ lỗi nghe hợp lý.

## Ai biết, biết đến đâu

| Nhân vật | Mức | Ghi chú |
|---|---|---|
| [[loc-da-tuyet-tdtb]] | biết | người bịa ra |
| [[kesuke-tdtb]] | **không biết**. Tin lời ám chỉ (suy từ việc Kesuke vẫn theo đuổi Tuyết và Tuyết coi hai người là *"đem hai cái này người chơi tại trong lòng bàn tay"*) | ch10 |
| [[suzuki-kenichi-tdtb]] | **chưa rõ**. Văn bản không nói Kenichi có biết mình bị đổ oan không. **Cố ý không đưa vào trường nào** cho tới khi có quyết định | ch10 |
| [[he-thong-0038-tdtb]] | chưa rõ | văn bản không nói |

## Được phép thể hiện thế nào khi POV chưa biết

- Cho phép: Kesuke lạnh nhạt/đề phòng Kenichi. Kenichi cảm thấy có gì sai giữa mình và Kesuke.
- Cấm: Kesuke nói ra nội dung lời đổ lỗi như một sự thật đã kiểm chứng. Kenichi hành động như đã biết khi chưa quyết.

## `leak_terms` — cho `pov_leak_check.py`

Thêm 01/10/2026, cùng định dạng với bốn note đã có `leak_terms` (D9): từ khoá chữ Hán mà bản nháp tiếng Trung sẽ dùng nếu lộ bí mật này. Lấy từ câu gốc ch10.12: *"鹿野雪就暗示成相圭介自己是被铃木健一威胁了，所以才离开他的身边。"* Cả ba từ đều neo vào **Kenichi + `威胁`**: `健一威胁` khớp cả *"被铃木健一威胁"* lẫn *"健一威胁了雪"*; hai từ còn lại bắt dạng có `君` và dạng danh từ. Không dùng `威胁` trần hay `威胁鹿野雪`: lời cảnh cáo của Yamamoto với Tuyết (ch15) là chuyện có thật trên trang, bản nháp tả nó bằng `威胁` là hợp lệ. Đo 01/10: trong 15 chương gốc `威胁` chỉ có 2 lần (ch3.21, ch10.12); ch16 và ch17 không có lần nào.

Giới hạn: công cụ khoanh POV **theo từng bí mật**, không theo từng từ. POV nằm trong `known_by` (Tuyết) thì bỏ qua cả note, trừ khi thẻ cảnh ghi bí mật vào `forbidden_secrets`. Kenichi và 0038 **không nằm trong trường nào**, nên chỉ được kiểm khi thẻ cảnh ghi bí mật này. Kesuke **tin** lời ám chỉ: ở khối POV Kesuke, từ khoá báo cả khi anh ta chỉ nghĩ điều mình tin — đọc trích đoạn rồi xử theo mục *Được phép thể hiện*, không mặc nhiên là lộ. Một cảnh Kenichi thật sự đe doạ ai đó cũng sẽ báo. Chạy **theo từng khối POV**, không chạy cả chương.
