---
id: style.EMB.quy-trinh-viet
type: style
scope: project
lane: personal
project: EMB
canon_layer: project_locked
status: active
strength: hard
aliases: ["quy trinh viet", "cong kiem chuong", "chapter gate", "viet tu do roi do", "bo giu luat trong dau", "workflow"]
related: ["[[hard-rules]]", "[[ai-tells]]", "[[targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main|aurel-main]]"]
source:
  type: user_input
  ref: "Aurel chot trong phien lam viec 16/08/2026 — cau nguyen van trich o muc dau file"
authority: user
confidence: 1.0
always_load: true
load_for: [writer, planner]
tags: [d/fanfic, k/rule, p/personal]
legacy_tags: [style, process, load-bearing]
last_updated: 2026-08-19
---

# Quy trình viết — **bỏ giữ luật trong đầu, biến chúng thành điều kiện rà soát**

## Aurel chốt

> *"Vậy bỏ việc giữ luật trong đầu, biến chúng thành điều kiện rà soát."*

## Bằng chứng bắt buộc phải đọc trước khi ai đó muốn quay lại cách cũ

Bốn chương liên tiếp, cùng một bộ chỉ số, **điểm của BẢN NHÁP ĐẦU**:

| | Ch1 | Ch2 | Ch3 | **Ch4** |
|---|---|---|---|---|
| bản nháp đầu | 5/11 | 6/12 | **3/12** | **2/12** |
| sau khi đo và sửa | — | 9/12 | 9/12 | **10/12** |

🔴 **Ch4 là lần TỆ NHẤT — và là lần duy nhất cố ý giữ toàn bộ luật trong đầu khi viết.**

Trong chính bản nháp đó, trong lúc đang chủ động tránh, model vẫn viết:
- `on the record` — lần thứ tư trong phiên, hai tiếng sau khi tự tay ghi luật cấm
- `Nobody said anything` — đúng một trong bảy cụm ở `hard-rules` §6

→ **Giữ luật trong đầu không hoạt động.** Nó còn làm văn tệ hơn, vì phần chú ý dành cho luật bị lấy khỏi phần chú ý dành cho cảnh.

→ **Đo rồi sửa thì hoạt động, và lặp lại được.** Cùng một model, cùng một chương, +7 điểm chỉ nhờ chạy số.

## Quy trình

```
1. VIẾT TỰ DO      không nghĩ về chỉ số. Nghĩ về cảnh.
2. CHẠY GATE       python3 System/scripts/chapter_gate.py <chuong> --corpus <thu-muc-chuong>
3. SỬA THEO SỐ     exit 2 -> sửa luật cứng trước. exit 1 -> sửa chỉ tiêu.
4. CHẠY LẠI        tới khi exit 0, hoặc tới khi phần lệch còn lại là lệch thật
```

⚠️ **Bước 4 không phải ép cho đủ bảng.** `targets`: *"lệch thì báo số, không nhét chữ."* Một chỉ số lệch 2 % thì báo số. Một chỉ số lệch 40 % thì chương thiếu một cảnh.

## Gate kiểm gì

| Tầng | Nội dung | Vi phạm |
|---|---|---|
| **Luật cứng** | em dash · `...` ascii · 16 cụm cấm · **n-gram lặp qua chương** | exit **2** — không trình bản nháp |
| **Chỉ tiêu** | 10 chỉ số đo được | exit **1** — sửa bằng sửa văn |

### 🔴 Kiểm n-gram lặp là cái mới, và nó là cái đật nhất

Mọi cổng kiểm trước đó đều đếm **ký tự và độ dài**. Không cái nào đếm **cụm lặp qua các chương**. Đó là lý do `on the record` sống sót qua **bảy vòng đo** và phải chờ Aurel đọc mới bị bắt.

Chạy lần đầu, nó bắt ngay ba tật chưa ai thấy:

| Cụm | Xuất hiện ở |
|---|---|
| `with the air of a man` | Ch1 · Ch3 · Ch4 |
| `he made a small noise` | Ch1 · Ch2 · Ch4 |
| `she had never once heard` | Ch1 · Ch2 |

⚠️ **Vì sao loại tật này nguy hiểm hơn `Not X.`** — nó *có vẻ hay*, nên không tự báo lỗi; và khi cùng một cấu trúc được gán cho nhiều nhân vật thì nó **làm phẳng dàn nhân vật**. Xem [[ai-tells]].

### Và gate phải được lọc, nếu không nó vô dụng

Bản đầu của kiểm n-gram báo cả `and i am going to`. Đã lọc: chỉ giữ cụm có **≥2 từ nội dung**.

🔴 Lý do phải làm việc này ngay: **một cổng kiểm báo động giả thì sẽ bị bỏ qua** — đúng như `vault_doctor --project` tự tắt kiểm broken link để tránh dương tính giả, và hậu quả là `[[tomoko]]` gãy suốt tám đợt.

## Chỉ số duy nhất chưa chương nào đạt

**Câu trung vị**: tác giả 12, bốn chương lần lượt **7 · 9 · 8 · 10**. Đang bò lên nhưng chưa chạm 11.

Nguyên nhân đã biết: bản AI **nhiều thoại hơn nguyên tác**, và dòng thoại thì ngắn. Đây là lệch thật, không phải lỗi — ghi lại để theo dõi, không ép.

---

> **Nguồn gốc.** Nguyên văn từ [[quy-trinh-viet]] (15–16/08/2026). Thân bài **không sửa một chữ** — đây là số đo, sửa là làm hỏng bằng chứng. Frontmatter đổi: thêm `lane: personal`, thêm `strength: hard`, `tags` đổi sang 4 trục taxonomy ([[_TAXONOMY-MOC]]) và giữ bản cũ ở `legacy_tags`. Nhật ký: (đợt chuyển tháng 08/2026).
