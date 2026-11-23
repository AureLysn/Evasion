---
id: rule.GLOBAL.forbidden-patterns
type: rule
scope: global
lane: personal
canon_layer: user_canon
status: active
strength: hard
aliases: ["cam", "forbidden", "AI patterns", "cac mau van can tranh", "style.GLOBAL.forbidden-patterns"]
related: ["[[_PRINCIPLE-MOC]]", "[[resist-the-urge-to-explain]]", "[[vary-sentence-length]]", "[[show-and-tell-balance]]"]
source:
  type: inference
  ref: "AI tong hop khi tach luat chung khoi EMB (tach-luat-chung-tu-EMB, Aurel 21/08/2026: quy dinh chung giu trong system/database); noi dung tro ve Curated_Notes/writing: resist-the-urge-to-explain, vary-sentence-length, show-and-tell-balance. Ghi nguon theo quyet dinh Aurel 23/11/2026 (ra soat Database D4)"
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-11-08
---

# Mẫu Văn Phong Cần Tránh (Forbidden Patterns)

Quy tắc cấm các dấu vết văn phong AI mặc định và lỗi hành văn sáo rỗng, áp dụng chung cho mọi tác phẩm viết trong Fiction Studio.

---

## 1. Dấu vết Văn AI Cần Tránh

| # | Mẫu cần loại bỏ | Lý do & Biểu hiện điển hình | Nguyên tắc đối chiếu |
|---|---|---|---|
| **1** | **Câu tổng kết cảm xúc ở cuối đoạn** | Câu văn đóng vai trò "giảng đạo" hoặc giải thích hộ độc giả ("Và đó là lúc cậu hiểu rằng...", "Điều này nhắc nhở hắn về..."). Cần cắt bỏ dứt khoát. | [[resist-the-urge-to-explain]] |
| **2** | **Cặp đối lập sáo rỗng lặp lại** | Cấu trúc "không phải X, mà là Y", "không chỉ là... mà còn là..." xuất hiện liên tục trong cùng một chương làm chai sạn cảm xúc. | [[show-and-tell-balance]] |
| **3** | **Liệt kê ba vế đều đặn** | Chuỗi 3 vế câu có độ dài và cấu trúc ngữ pháp giống hệt nhau khiến nhịp văn trở nên đơn điệu và bằng phẳng. | [[vary-sentence-length]] |
| **4** | **Tính từ cảm xúc thay cho mô tả hành vi** | Dùng từ ngữ chỉ định trạng thái nội tâm trực tiếp ("cậu cảm thấy đau đớn tột cùng") thay vì khắc họa hành động, biến đổi cơ thể hoặc phản ứng giác quan. | [[show-and-tell-balance]] |
| **5** | **Mở đoạn bằng trạng ngữ thời gian rập khuôn** | Lặp lại liên tục các cụm "Một lúc sau", "Chẳng bao lâu", "Sau một hồi", "Khi ánh mắt chạm nhau". | [[vary-sentence-length]] |

---

## 2. Quy tắc Ưu tiên Phong cách Dự án

- Quy tắc phong cách riêng được định nghĩa tại `02_Story_Bible/style/` của từng dự án (`hard-rules.md`, `ai-tells.md`).
- Các cấm kỵ cụ thể của từng tác phẩm có hiệu lực cao hơn quy chuẩn chung này nếu có sự khác biệt có chủ đích.
