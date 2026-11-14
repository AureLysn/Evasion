---
id: info.EMB.tai-trong-context
type: info
scope: project
lane: personal
project: EMB
canon_layer: user_canon
status: active
aliases: ["tai trong context", "always_load qua nang", "chi phi bom ngu canh", "EMB-context budget", "always load ratio", "gioi han cua seam INJECT"]
related: ["[[EMB]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main|aurel-main]]", "[[khung-sau-arc]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/hard-rules|hard-rules]]"]
source:
  type: measured
  ref: "Measurement of the always_load set of the EMB notes, run on 2026-08-16 as the note states; source block added 2026-11-13 from the note's own text"
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [system, debt, measured]
last_updated: 2026-10-01
---

# Tải trọng `always_load` — **một con số cần Aurel biết trước khi viết chương đầu**

> Đây không phải ý kiến. Đây là số đo, chạy trên vault EMB ngày 2026-08-16.

## Số đo

| | |
|---|---|
| Tổng note | **123** |
| Note bật `always_load` | **50** *(41%)* |
| Dung lượng khối `always_load` | **≈ 208 KB** |
| Ước ra token | **≈ 65.000 – 85.000** *(tiếng Việt có dấu tốn token hơn tiếng Anh)* |

`vault_doctor` cảnh báo khi tỷ lệ vượt **25%**. Nhưng tỷ lệ không phải vấn đề thật — **dung lượng tuyệt đối** mới là.

## Vì sao nó quan trọng đúng lúc này

Chương nguyên tác dài nhất **13.437 từ**. Sàn mà nhánh này đặt cho mỗi chương là **11.000 từ**.

Nếu seam INJECT bơm cả khối `always_load` vào trước khi writer viết chữ đầu tiên, thì writer bắt đầu một chương 13.000 từ với **ngữ cảnh đã gần đầy**. Hậu quả không phải là báo lỗi — hậu quả là **chất lượng tụt dần về cuối chương**, đúng kiểu lỗi khó truy nhất.

⚠️ Chưa từng viết chương nào, nên **chưa có bằng chứng thực nghiệm** cho hậu quả này. Nhưng chi phí kiểm tra trước rẻ hơn nhiều so với phát hiện sau khi đã viết sáu chương.

## Khối nào nặng nhất

| Note | KB |
|---|---|
| [[drop-point]] | 12,0 |
| [[dot7-quyet-dinh]] ⛔ | 11,4 |
| [[khung-sau-arc]] | 9,8 |
| [[fact-loi-tien-tri-muoi]] | 9,6 |
| [[gia-thuyet-aurel]] | 6,9 |
| [[rule-ten-sawada]] | 6,9 |

Đáng chú ý: **`dot7-quyet-dinh` và `khung-sau-arc` là note của người lập kế hoạch, không phải của người viết văn.** Writer không cần biết vì sao một quyết định được chốt — chỉ cần biết nó đã chốt.

## Đề xuất — **`load_for` thay cho `always_load`**

Schema hiện tại chỉ có một công tắc bật/tắt. Không phân biệt được *ai* cần note.

```yaml
load_for: [writer]           # chỉ bơm khi đang viết văn
load_for: [planner]          # chỉ bơm khi đang dựng dàn ý
load_for: [writer, planner]  # cả hai
```

Phân tầng thô:

| Vai | Cần gì |
|---|---|
| **Writer** | [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/hard-rules\|hard-rules]] · [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/ai-tells\|ai-tells]] · [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main\|aurel-main]] · [[drop-point]] · [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/characters/tsuna\|tsuna]] · [[rule-danh-xung-flame]] · [[rule-hono-va-hi]] · secrets đang hiệu lực |
| **Planner** | [[khung-sau-arc]] · [[fact-toan-canh-tuong-lai]] · [[fact-567-ke-hoach]] · [[gia-thuyet-aurel]] · [[dot7-quyet-dinh]] ⛔ |
| **Cả hai** | [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main\|aurel-main]] · [[gia-thuyet-aurel]] |
| **Không ai, tra khi cần** | phần lớn `canon/` — đã có alias, index tìm được |

Ước tính: tách như trên đưa khối bơm cho writer về **≈ 90 – 110 KB**, tức khoảng một nửa.

## 🔴 Cần Aurel quyết

Đây là **sửa plugin**, không phải sửa vault — phải đổi `context_resolver.py` và cả schema note. Mình **không tự làm** vì nó chạm vào seam INJECT.

Câu hỏi: **làm trước khi viết chương đầu, hay để sau và chấp nhận rủi ro?**

Ý mình: **làm trước.** Đổi schema khi có 123 note rẻ hơn nhiều so với khi có 300.

## Đã làm ở đợt 8b

Tắt `always_load` cho 7 note không thuộc diện ràng buộc cứng:

- 3 note `questions/` đã `resolved` — đáp án nằm ở [[dot7-quyet-dinh]] ⛔, không cần bơm câu hỏi cũ. Cả 4 câu resolved nay đều có trường `resolved_by` trỏ về đó
- [[ao3-comments]] — nguồn tham khảo, **và là một cái bẫy thứ tự đọc** đã gây lỗi ở đợt 3
- `fact-dying-will-bullet` · `fact-kyouya-anh-em-ho` · `fact-cao-la-natsu` — chi tiết tra được qua alias

54 → **50 note**. Chưa đủ. Đây mới là dọn mép.

## Đã đóng — đợt 8c. Ghi lại 30/08/2026

Đề xuất `load_for` ở trên **đã được thực hiện**. [[EMB]] ghi ở dòng 88 và 138: đợt 8c
— *"`always_load` từ 46% xuống 7%, thay bằng `load_for` + đồ thị liên kết"*.

Đo lại vault hôm nay:

| | Lúc đề xuất 16/08 | Đo lại 30/08 |
|---|---|---|
| Tổng note EMB | 123 | **172** |
| Bật `always_load` | 50 · *41%* | **14** · ***8%*** |
| Dung lượng khối | ≈ 208 KB | **≈ 102 KB** |

Số note tăng 40% mà tỷ lệ không trôi ngược — cơ chế giữ được, không chỉ là một lần dọn.

Mục **🔴 Cần Aurel quyết** ở trên đã có đáp án: *làm trước*. Giữ nguyên, không xoá —
đó là bối cảnh của quyết định, không phải câu hỏi còn treo.

⚠️ **Phần chưa xong, và nó không thuộc EMB.** Cơ chế `load_for` là luật chung;
[[tach-luat-chung-tu-EMB]] đã đánh dấu *"→ chung"* nhưng chưa ai nhấc nó lên tầng
schema. Hệ quả đo được 30/08: bản sửa đợt 8c chỉ chạm tới **note**, không chạm tới
**khuôn** — 9/27 khuôn trong `_Templates/` vẫn đặt `always_load: true`, trong đó 7 khuôn
mâu thuẫn với chính thực tế EMB (ví dụ `Question-Note` khai `true` trong khi cả 5
question note thật đều `false`). Lọt được vì `.vaultignore` loại `_Templates/` — không
cổng nào đọc khuôn, nên bản sửa cấp note không có đường quay ngược về gốc.

Đã sửa 7 khuôn đó cùng ngày. Bài học đằng sau ghi ở [[09-gates]].
