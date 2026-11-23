---
id: rule.GLOBAL.dialogue
type: rule
scope: global
lane: personal
canon_layer: user_canon
status: active
strength: tendency
aliases: ["dialogue", "thoai", "ky thuat thoai", "style.GLOBAL.dialogue"]
related: ["[[_PRINCIPLE-MOC]]", "[[said-and-action-beats]]", "[[exposition-through-action]]", "[[one-point-of-view-per-scene]]"]
source:
  type: inference
  ref: "AI tong hop khi tach luat chung khoi EMB (tach-luat-chung-tu-EMB, Aurel 21/08/2026: quy dinh chung giu trong system/database); noi dung tro ve Curated_Notes/writing: said-and-action-beats, exposition-through-action, one-point-of-view-per-scene. Ghi nguon theo quyet dinh Aurel 23/11/2026 (ra soat Database D4)"
authority: ai
confidence: 0.7
tags: [d/fanfic, k/rule, p/personal]
legacy_tags: [s/dialogue]
last_updated: 2026-11-08
---

# Kỹ Thuật Tự Sự: Lời Thoại (Dialogue)

Quy chuẩn xây dựng đối thoại sống động, tự nhiên và mang tính thúc đẩy cốt truyện.

---

## 1. Nguyên tắc Xây dựng Đối thoại

- **Giọng điệu và nhịp điệu cá nhân hóa:** Mỗi nhân vật sở hữu một tiết tấu ngôn ngữ riêng biệt (độ dài câu, mức độ trang trọng, từ ngữ cửa miệng, thói quen ngắt nhịp).
- **Dẫn thoại tối giản:** Khi hai nhân vật đã thiết lập được giọng điệu rõ ràng, hạn chế tối đa các nhãn dẫn thoại thừa thãi ("hắn nói", "cậu bảo"). Không dùng tag thoại liên tục ở mọi lượt nói ([[said-and-action-beats]]).
- **Thoại đa chức năng:** Lời thoại phải đồng thời mang thông tin **và** bộc lộ mối quan hệ/động thái tâm lý. Tuyệt đối tránh biến đối thoại thành công cụ thuyết minh lộ liễu hộ tác giả ([[exposition-through-action]], [[resist-the-urge-to-explain]]).

---

## 2. Ràng buộc Góc nhìn (POV) trong Thoại

- Nhân vật không được tiết lộ hoặc nhắc tới những sự kiện, thông tin bí mật mà họ chưa từng được biết hoặc chưa được chứng kiến.
- Kiểm tra ma trận quyền thông tin tại `02_Story_Bible/secrets/` và [[05-visibility]] trước khi triển khai các cuộc đối thoại có yếu tố cơ mật.
