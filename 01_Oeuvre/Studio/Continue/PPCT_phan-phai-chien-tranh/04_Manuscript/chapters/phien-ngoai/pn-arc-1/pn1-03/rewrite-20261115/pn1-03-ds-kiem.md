---
id: note.PPCT.pn1-03-ds-kiem
type: note
scope: branch
lane: personal
project: PPCT
branch: deepseek-20261115
arc: pn-arc-1-yokohama-va-quan-lupin
chapter: "pn1-03"
canon_layer: planned
status: active
aliases: ["kiem pn1-03 ban DeepSeek", "kiểm phiên ngoại Lupin", "pn1-03 ds kiem PPCT"]
related: ["[[pn1-03-ds-nhap]]", "[[pn1-03-ds-the-canh]]", "[[pn-arc-1-ds-plan]]", "[[deepseek-20261115]]", "[[Mimic]]", "[[Bar-Lupin]]", "[[20261117-canon-phien-ngoai-arc-1]]"]
source:
  type: inference
  ref: "Claude 17/11/2026. DeepSeek https://chat.deepseek.com/a/chat/s/f2f3e0d0-7af2-4300-8fe1-f5581ad55c6f · GPT https://chatgpt.com/g/g-p-6af97531ef0c8191a708021329791a4c-ppct/c/6afc8182-c9a8-83ec-b9e9-ca101bf8ff47"
authority: ai
confidence: 0.7
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-17
---

# Kiểm pn1-03 bản DeepSeek

Lượt 1: A–D, ba bản mỗi chỗ A, C. GPT chấm. Lượt 2: DS viết bản hoàn chỉnh. GPT đọc thử. Lượt 3: DS viết lại nửa sau (sơ tán → hết) theo ba lỗi logic GPT chỉ ra; Claude ghép và sửa.

## Phương án (Aurel: "để DeepSeek/GPT đề xuất")

| Chỗ | Bản DS | GPT chọn | Lý do (đã kiểm) |
|---|---|---|---|
| C7 Ango | A1 ngồi suốt · A2 ghế trống · A3 tới sớm về sớm, vỗ vai, "下次见" | **A2 làm nền + Ango ngồi ngắn như A1** | Đủ bộ ba canon; bỏ các động tác "chia tay cuối" của A3; chỉ giữ 「想写人」 |
| C8 Đứa trẻ | C1 Sakura quay lại lấy vở · C2 Kōsuke tự đi tìm Oda · C3 Katsumi bị người lạ gọi tên dắt đi | **C1 Sakura**, sửa logic | Bức tranh "năm đứa nhỏ và một người lớn đầu to" gieo ở Lupin trả ở chương này; C2 thêm một nhánh hành động khó kiểm; C3 Dazai nói 「最好骗」 tàn nhẫn và không có cơ sở |

## Claude kiểm

| # | Lỗi DS | Sửa |
|---|---|---|
| 1 | Nhiều tag thoại sau ngoặc (ai_tells project_3) | Đưa lên trước, chạy lại cổng tới 0 |
| 2 | Bản hoàn chỉnh: Tsuna "thấy bốn bóng nhỏ vào cửa" rồi lại thiếu Sakura | Bỏ số đếm lúc đến |
| 3 | Lời nhắn của Gide "kẹp trang xé từ cuốn tranh" trong khi cuốn tranh nằm ở hẻm | Gói một sợi dây buộc tóc đỏ — Sakura cầm khi ra cửa |

## GPT đọc thử — điểm đã kiểm

| # | GPT nói | Kết luận | Sửa |
|---|---|---|---|
| 1.1 | Người lớn biết Sakura đi một mình mà vẫn để | Đúng | Không người lớn nào biết: ông chủ đếm đủ khi ra cửa, Sakura lén quay lại lấy cuốn tranh; Kōsuke thấy cô chạy đi "đuổi theo ông chủ"; phát hiện thiếu khi cả hai chuyến tới |
| 1.3 | Dazai kết luận "Mimic" không có chứng cứ | Đúng | Vỏ đạn kiểu cũ ở hẻm; bà cụ thấy người ngoại quốc mặc quân phục cũ bế bé gái lên xe đen; Dazai cho người lục soát ba đêm |
| 1.4 / 4.2 | Lời nhắn của Gide không chứng minh hắn giữ Sakura; Oda thiếu lý do đi một mình | Đúng | 「孩子活着。来见我，一个人。带别人来，就不必来了。」 + sợi dây buộc tóc + địa chỉ; Oda đè lời nhắn dưới ly ở Lupin, Dazai tìm thấy → Tsuna có điểm hẹn |
| 2.1 | Đếm bậc thang | Đúng | Cắt |
| 2.2 / 2.3 | Giải thích nhịp nói của Oda; câu khái quát 「那种人会一个人去做很多事」 | Đúng | Rút gọn; thay bằng chi tiết Oda nói "不烦" mà không đặt ly xuống |
| 2.4 / 2.5 | Ẩn dụ dài về nét mặt Dazai; hình ảnh nóng rối | Đúng | 「太宰的脸一下子白了。他把纸折好……手指在折痕上停了很久」; 「掌心一下子烫起来。直觉在烧。」 |
| 3 | Tsuna chỉ 「点了点头」 khi nghe Sakura quay lại | Đúng | Cảnh đó bỏ; Tsuna lập tức đi tìm cùng Lancer |

## Cổng (sau sửa)

- `ai_tells_check`: 1.589 chữ Hán, không tật AI.
- `chapter_gate`: đạt luật cứng (số từ 1.659); lệch 4 chỉ tiêu mềm.
- `pov_leak_check --pov tsuna`: không rò rỉ.
