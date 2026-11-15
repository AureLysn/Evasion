---
id: note.CLS.de-xuat-quy-trinh-nhieu-model
type: note
scope: project
lane: personal
project: CLS
canon_layer: planned
status: active
aliases: ["quy trinh nhieu model", "quy trình nhiều model", "DeepSeek GPT Gemini trong day chuyen", "model ngoai viet Claude kiem", "multi-model pipeline CLS"]
related: ["[[20261115-quy-trinh-ba-model]]", "[[tien-do-ba-arc]]", "[[doi-chieu-deepseek-20261114]]", "[[20261114-chat-deepseek-dan-y-dong-nhan]]", "[[20261017-day-chuyen-ba-arc]]"]
source:
  type: user_input
  ref: "Aurel 14/11/2026: 'có thể xem xét đưa deepseek, gpt, gemini vào quy trình viết, agent khác viết vào claude kiểm tra lại (ví dụ deepseek khá giỏi lên dàn ý truyện và vẫn có mức độ sáng tạo khá cao nếu cung cấp đúng thông tin, đặc biệt là một model trung quốc, deepseek có thể lấy thêm thông tin từ các trang web thường bị chặn)'"
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-15
---

# Đề xuất — đưa DeepSeek, GPT, Gemini vào dây chuyền CLS

> ✅ **Chốt 15/11/2026** ([[20261115-quy-trinh-ba-model]]):
> - **Claude** lên kế hoạch;
> - **DeepSeek** viết chính;
> - **GPT** kiểm tra;
> - **Claude** kiểm tra lại lần cuối.
>
> Cách làm từng bước nằm trong skill `xuong-viet-tiep-truyen:viet-ba-model`. Các mục dưới là bản đề xuất 14/11, giữ để đối chiếu.
>
> **Mục 4 trả lời bằng thực tế 15/11:**
> 1. Đi đường **(a)** — qua browser, Aurel tự đăng nhập.
> 2. Thử ngay ở bước **viết**: ch1–4 arc 1 bản 6.
> 3. Aurel **cho gửi** dàn ý, thẻ cảnh, bản nháp và luật viết lên DeepSeek và GPT. Phiên **không** gửi note trong `secrets/`. Chưa có lời chốt riêng về `secrets/`.

## 1. Nguyên tắc

1. **Model ngoài đề xuất, Claude giữ cổng.** Model ngoài viết vào `06_Station/00_Inbox/` hoặc một file nháp; chỉ `xuong-kiem` và phiên chính đưa nội dung vào `02_Story_Bible/`, `03_Development/`, `04_Manuscript/`.
2. **Provenance.** Mỗi đầu ra ghi `authority: ai`, tên model, ngày, link chat. Khẳng định canon từ model ngoài mang nhãn **[cần tra]** cho tới khi khớp TextMap/wiki *(AGENTS §1.5)*.
3. **Lấy ý, không lấy câu.** Văn của model ngoài phải qua `ai_tells_check` và `style_metrics` như văn Claude viết.
4. **Gói bối cảnh.** Mỗi lần gọi model ngoài, gửi kèm một gói ngắn: luật đối xứng, POV, 「kẻ ngoại lai không POV」, chỗ đứng của 「người đó」, chương đã final. Thiếu gói ⇒ nó lặp lỗi Evernight/Mary Sue ở [[doi-chieu-deepseek-20261114]] §3.

## 2. Mỗi model làm gì

| Bước dây chuyền | Hiện tại | Đề xuất thêm |
|---|---|---|
| Tra canon | TextMap + wiki *(Claude)* | **DeepSeek** tra nguồn Trung khó vào *(百度, 知乎, 米游社, NGA, Lofter)* → danh sách **link + trích ngắn**, Claude kiểm từng dòng |
| 0. Brainstorm vòng 2 / phần gộp | — | **DeepSeek** đưa 2–3 phương án sự kiện; Aurel chọn |
| 1. Dàn ý chương | `xuong-lam` Opus | giữ; nhận phương án đã chọn làm đầu vào |
| 2. Soát dàn ý | `xuong-kiem` Opus | thêm **GPT hoặc Gemini** làm người soát thứ hai *(mù, chỉ đọc dàn ý + gói bối cảnh)*; hai danh sách lỗi gộp lại |
| 3. Viết | `xuong-lam` Sonnet·high | **thử A/B một cảnh**: DeepSeek viết văn Trung, cùng thẻ cảnh; đo bằng `style_metrics`, `ai_tells_check`, `pov_leak_check` |
| 4. Soát mạch | `xuong-kiem` Opus | giữ — chỉ Claude đọc được vault |
| Đọc lại cả ba arc *(TR-021)* | Aurel | **Gemini** *(context dài)* đọc liền 30 chương, tìm chỗ lệch liên arc; kết quả là danh sách **cần Aurel xem**, không tự sửa |

## 3. Cách nối — chọn một

- **(a) Thủ công qua browser** *(làm được ngay — đã thử 14/11)*: Aurel chat trên web, Claude đọc trang bằng browser tích hợp rồi chép vào vault. Không cần khoá API. Chậm, nhưng Aurel thấy hết.
- **(b) Script gọi API**: một tool trong `01_Origine/04_Tools/` gửi gói bối cảnh + prompt, lưu đầu ra vào `00_Inbox/`. Cần Aurel **tự đặt khoá API** vào biến môi trường *(Claude không nhập khoá)*. Mất phí theo lượt, nhưng chạy được trong hàng đợi.

## 4. Cần Aurel chốt

1. Chọn (a) hay (b).
2. Bước nào thử trước — đề xuất: **brainstorm vòng 2 bằng DeepSeek**, rồi **soát dàn ý thứ hai**. Viết A/B để sau.
3. Gửi nội dung vault lên dịch vụ ngoài: được không, và có loại trừ `secrets/` hay không.
