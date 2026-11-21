---
id: question.TDTB.q-ngon-ngu-viet-va-don-vi-do-tdtb
type: question
scope: project
lane: personal
project: TDTB
canon_layer: planned
status: resolved
resolved_by: "[[qd-viet-tieng-trung-tdtb]]"
resolved_at: 2026-09-27
needed_before:
  arc:
  chapter: "truoc khi viet chuong dau tien (write-chapter) va truoc khi lap ai-tells.md / khoi gate:"
decision_owner: "user"
aliases: ["ngon ngu viet TDTB", "viet tieng Trung hay tieng Viet", "don vi do TDTB", "chu Han hay am tiet", "quy doi zh vi TDTB", "0.928"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/hard-rules|hard-rules]]", "[[nguyen-van-zh-tdtb]]", "[[ban-convert-tdtb]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/00_Overview/TDTB|TDTB]]"]
source:
  type: measured
  ref: "Do 26/09/2026 tren cap song song nguyen van zh <-> convert vi, ch1-15 (42.660 chu Han <-> 39.544 am tiet). Cau hoi mo khi analyze-style"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-21
---

# Viết tiếp bằng tiếng gì, và đo bằng đơn vị nào?

> ✅ **Đã giải 26/09/2026** — Aurel chọn **A** → qd-viet-tieng-viet-quy-doi-tdtb. Phần dưới giữ làm lịch sử cân nhắc.
>
> 🔁 **Đổi 27/09/2026** → [[qd-viet-tieng-trung-tdtb]]: Aurel chọn lại, viết **thành phẩm tiếng Trung**, gần với phương án B nhưng không convert.

> ⚠️ Đây là câu hỏi **CHƯA CHỐT**. Không phương án nào dưới đây được dùng như sự thật.

## Vì sao phải hỏi

Văn phong đã đo trên **nguyên văn Trung** ([[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]), nên chỉ tiêu ([[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]]) tính bằng **chữ
Hán**. Chuyện Aurel viết tiếp bằng tiếng gì thì **chưa ai chốt**.

Ngày 25/09 `TDTB.md` ghi *"Ngôn ngữ viết: tiếng Việt"*. Đó là AI tự điền lúc khởi tạo, không phải lời
Aurel, và đã được sửa về "chưa chốt".

## Dữ liệu có sẵn — đo 26/09 trên cùng 15 chương, hai bản

| | Gốc (zh) | Convert (vi) | Hệ số |
|---|---|---|---|
| Độ dài | 42.660 chữ Hán | 39.544 âm tiết | **0,928** (từng chương 0,903–0,967) |
| Thoại | 21,0 % | 21,5 % | ≈ 1 |
| Đơn vị / đoạn | 40,9 | 37,7 | 0,92 |
| Số đoạn | 1.062 | 1.067 | ≈ 1 |

## Các phương án

### A — Viết tiếng Việt, quy đổi chỉ tiêu bằng hệ số trên
- ✅ Không thêm bước. Văn ra thẳng thành phẩm.
- ⚠️ Hệ số đo trên **máy dịch**. Văn Việt viết tay có thể dài hơn, nên hệ số chỉ đáng tin cho nhịp đoạn và thoại, không đáng tin cho câu chữ.
- ⚠️ Cần lập danh sách thuật ngữ tiếng Việt cho mật độ, và cần quyết cách ghi `【】` · `‘’` · `NL：` trong tiếng Việt.

### B — Viết nháp tiếng Trung rồi convert
- ✅ Chỉ tiêu áp thẳng, không quy đổi. Giọng gần 乐博 nhất.
- ⚠️ Thêm một bước. Thành phẩm đọc giống văn convert.

### C — Viết tiếng Việt, đo lại chỉ tiêu trên vài chương đầu tự viết
- ✅ Số khớp với văn thật của Aurel.
- ⚠️ Mấy chương đầu không có thước đo.

## Ai quyết

Aurel. Chặn `write-chapter` và việc lập `style/ai-tells.md` (khối `gate:` của `chapter_gate.py`), vì
baseline của cổng phụ thuộc ngôn ngữ.
