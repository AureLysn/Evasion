---
id: arc.CLS.arc-1-sua-theo-deepseek-20261115
type: arc
scope: project
lane: personal
project: CLS
canon_layer: planned
status: proposed
aliases: ["sua arc 1 theo deepseek", "sửa arc 1 theo DeepSeek", "arc 1 ban 6 CLS", "ke hoach sua arc Jason 15/11"]
related: ["[[dan-y-arc-1-jason-v5-cls]]", "[[doi-chieu-deepseek-20261114]]", "[[de-xuat-quy-trinh-nhieu-model]]", "[[q-arc-1-hat-giong-giay-vang-cho-tra]]", "[[20261030-hat-giong-giay-vang-doi-vong-2]]", "[[h-nguoi-do]]", "[[hard-rules]]", "[[ai-tells]]"]
source:
  type: user_input
  ref: "Aurel 15/11/2026: 'sửa lại phần cốt truyện jackson, sửa lại các ý, bạn lên kế hoạch và điều hướng, kiểm tra kết quả còn nội dung để deepseek hoặc gpt viết'. Ý lấy từ mục 6 của doi-chieu-deepseek-20261114. Chỗ đặt là đề xuất của phiên."
authority: ai
confidence: 0.6
always_load: false
load_for: [planner, writer]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-15
---

# Sửa arc 1 (Jason) theo các ý J — kế hoạch *(15/11)*

> 🔄 **Đổi hướng cùng ngày — Aurel:** 「jackson không làm trợ lí nữa mà là một tuyến ẩn khác ở planacaria. cốt truyện tự tạo」 ([[20261115-jason-tuyen-an-planarcadia]]). Bảng dưới viết khi Jason **còn** ở văn phòng Ashveil ⇒ **J1 tạm dừng** *(con hẻm cạnh Ashveil có thể không còn)*; J4, J5 đặt lại theo dàn ý mới. Việc trước tiên: **dựng dàn ý tuyến ẩn** — DeepSeek đề xuất, phiên kiểm *(mục 4)*.

> ⏳ **`proposed`.** Aurel giao: **phiên lên kế hoạch và điều hướng; DeepSeek hoặc GPT viết văn; phiên kiểm tra.** Cả 8 chương arc 1 đang `final` — **bản final cũ giữ nguyên**; mỗi đoạn mới viết thành file nháp riêng trong `chapters/arc-1/chNN/rewrite-20261115/`, Aurel duyệt rồi mới ghép.

## 1. Ý nào vào chương nào

| Ý | Nội dung | Chỗ đặt | Mức sửa | Trạng thái |
|---|---|---|---|---|
| **J1** | Sunday trên phim quen Jason, **lấy 「那一位」 ra doạ** để Jason chịu giúp **[Aurel lượt 2]** | **ch04**, cảnh con hẻm *(sau khi Sunday nhận hồ sơ, trước cái gật đầu của Jason)* + vài câu ở khối phòng ngay sau | chèn ~600 chữ phim + ~400 chữ phòng | 🧪 **thử với DeepSeek 15/11** — thẻ [[ch04-chen-j1-sunday-doa]] |
| **J4** | Jason ngoài biên chế: 「不在我的管辖范围内」—「你根本没有管辖范围」—「那就对了」 **[DS]** | **ch05**, sau khi đài Fulwish phát bản tin cắt ghép; Jason đến hỏi người của đài | chèn ~500 chữ | chờ J1 xong |
| **J5** | Jason nhắc một người bạn: 「桥如果变成墙，就过不了河了」, không ai hỏi **[DS]** | **ch08**, cảnh sáng ở văn phòng, sau câu Ashveil 「我知道你有朋友」 | chèn 2–4 câu | chờ J1 xong |
| **J2** | Cipher trộm qua trộm lại với Jason; Jason–Phainon **[Aurel lượt 2]** | ch08 hoặc khúc chen | — | ⚠️ **va quyết định cũ**: kiện giấy vàng 「贼寄的」 và 「那个犟种」 ở ch08 **đã là** hạt giống của chuyện này; Aurel 30/10 chọn **trả ở vòng 2** ([[20261030-hat-giong-giay-vang-doi-vong-2]]). Hỏi Aurel trước |
| **J3** | Robin ở Astropolis, Stelle giới thiệu Cyrene, Robin kể Mydei và Hyacine đi cùng Tsuna **[Aurel lượt 2]** | khúc chen hoặc vòng 2 | — | Astropolis là chặng **Act V** của 4.x *(TextMap en 4.7: 「Act V: Planarcadia/Astropolis」)* — arc 1 dừng ở chặng Ashveil, nên **không** vào arc 1 |
| ~~J6~~ | chữ ký 「——D.」 | — | — | bỏ: trỏ thẳng tới Dazai |
| ~~J7~~ | thoại phòng về 「黑泥巴头 ghi chép」 | — | — | bỏ: phòng arc 1 không thấy Dazai ghi chép gì |

## 2. Hệ quả phải soát sau khi ghép

- **J1:** phòng nối 「那一位」 với **bàn tay** ở cửa sắt ⇒ đậm thêm [[h-nguoi-do]]. Luật **B7**: không ai trong phòng đoán **là ai**. Đếm ngưỡng 2: doạ để nhờ việc **không** tính là giúp.
- **J1:** ch07 có Sunday 「谢谢」 với giọng không tên, Jason 「什么也没问」 — sau J1, cái im của Jason ở ch07 đọc thành **quen**, không mâu thuẫn.
- **J5:** câu 「桥」 là triết lý của Tsuna; không gắn tên, không gắn Gia tộc.

## 3. Cách làm với DeepSeek *(theo [[de-xuat-quy-trinh-nhieu-model]])*

1. Phiên viết **thẻ cảnh** *(tiếng Việt)* và **gói bối cảnh**: luật cứng đã rút gọn, tật máy cấm, đoạn văn liền trước và liền sau chỗ chèn, giọng từng nhân vật.
2. Gửi DeepSeek trong **một cuộc chat mới**, bảo viết **tiếng Trung giản thể**, chỉ đoạn chèn.
3. Phiên kiểm: `ai_tells_check` · đọc tay theo [[hard-rules]] A5–A7, B1–B9, C1–C5, D1–D6 · bí mật *(không tên, không mặt người đó)* · khớp văn liền trước/sau.
4. Ghi bản DS và bản phiên sửa vào `rewrite-20261115/`, kèm bảng lỗi; Aurel duyệt.
