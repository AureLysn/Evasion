---
id: rule.GLOBAL.pronouns
type: rule
scope: global
lane: personal
canon_layer: user_canon
status: active
strength: hard
aliases: ["xung ho", "pronouns", "dai tu", "xung ho tieng viet", "style.GLOBAL.pronouns"]
related: ["[[_PRINCIPLE-MOC]]"]
source:
  type: inference
  ref: "AI tong hop khi tach luat chung khoi EMB (tach-luat-chung-tu-EMB, Aurel 21/08/2026: quy dinh chung giu trong system/database). Ghi nguon theo quyet dinh Aurel 23/11/2026 (ra soat Database D4)"
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-11-08
---

# Xưng Hô Tiếng Việt trong Fiction

Quy tắc kiểm soát đại từ xưng hô tiếng Việt trong sáng tác và biên dịch fiction.

---

## 1. Nguyên tắc Cốt lõi

1. **Xưng hô là dữ liệu của mối quan hệ, không phải của riêng nhân vật:**
   Cùng một nhân vật sẽ xưng hô hoàn toàn khác nhau tùy thuộc vào đối tượng giao tiếp (địa vị, mức độ thân thiết, hoàn cảnh). Do đó, cấu hình xưng hô phải khai báo trong note `relationship/` của cặp nhân vật, không gán cứng vào note `character/`.
2. **Sự biến đổi xưng hô phản ánh sự chuyển biến quan hệ:**
   Việc thay đổi đại từ xưng hô giữa chừng trong truyện là một sự kiện tự sự có trọng lượng; cần có bước đệm tâm lý và lý do rõ ràng trong văn bản.
3. **Phù hợp thể loại và văn phong nguyên tác:**
   Với các bản convert/dịch hoặc phóng tác theo phong cách văn học mạng phương Đông (hắn, y, nàng, ngươi,...), tôn trọng quy ước của thể loại, nhưng phong cách của tác giả gốc luôn được ưu tiên cao nhất.

---

## 2. Cấu trúc Khai báo trong Note Quan hệ (`relationship/`)

```yaml
addressing:
  A_goi_B: { self: tôi, other: cậu }
  B_goi_A: { self: con, other: bà }
```

Mỗi dự án có thể quy định danh sách từ cấm xưng hô hoặc lưu ý đặc thù trong `02_Story_Bible/style/hard-rules.md`.
