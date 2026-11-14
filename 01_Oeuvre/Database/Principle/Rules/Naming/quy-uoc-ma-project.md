---
id: rule.quy-uoc-ma-project
type: rule
scope: global
lane: personal
canon_layer: user_canon
status: active
strength: hard
aliases: ["quy uoc ma project", "ten thu muc project", "slug thu muc", "thu muc co ten day du", "dat ma truyen", "ma project", "tao project moi", "project code", "nhap project cu vao vault", "ba tang cua mot project cu", "noi dung con dung duoc"]
related: ["[[_OEUVRE-MOC]]", "[[04-lanes]]", "[[01-frontmatter]]", "[[03-precedence]]"]
source:
  type: user_input
  ref: "Aurel — quy chuẩn đặt mã dự án, slug thư mục và phân tầng dữ liệu truyện"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-11-08
---

# Quy ước Mã Project & Phân tầng Dữ liệu Fiction

Quy tắc chuẩn hóa mã dự án, định danh thư mục, mã thể loại và cách tiếp nhận dữ liệu cho toàn bộ các tác phẩm trong **AureLysn Vault** (`05_Evasion/01_Oeuvre/`).

---

## 1. Quy tắc Đặt Mã Dự án

| Quy tắc | Quy chuẩn kỹ thuật |
|---|---|
| **Mã Project** | **3–5 chữ cái viết HOA**, rút từ tên viết tắt của **fic gốc** (hoặc tác phẩm chính), không trùng lặp giữa các dự án. |
| **Thư mục Project** | `Studio/Continue/<MÃ>_<slug>/` (hoặc `Studio/Original/<MÃ>_<slug>/`). |
| **`slug`** | Tên đầy đủ của tác phẩm, viết **chữ thường không dấu**, các từ nối bằng dấu gạch nối `-`, rút gọn từ 2–6 từ. |
| **`id` note định danh** | `project.<MÃ>` (chữ thường, không chứa slug). |
| **Tên file định danh** | `<MÃ>.md` đặt tại `00_Overview/` (khớp với `id`). |
| **Thuộc tính `project:`** | Khai `<MÃ>` trong frontmatter của mọi note thuộc dự án. |
| **Tên đầy đủ** | Khai báo trong `title:` và tiêu đề chính của note định danh. |
| **Tên cũ / Biệt danh** | Lưu trữ trong trường `aliases` để hỗ trợ truy vấn ngược. |

> **Nguyên tắc bất biến:** Đặt mã theo **fic gốc**, không đặt theo ý tưởng nhánh viết tiếp. Một tác phẩm có thể phát triển nhiều nhánh song song (`branch: <tên-nhánh>`), nhưng mã dự án luôn giữ nguyên vẹn.

### Bảng đối chiếu mã hiện tại

| Mã | Tác phẩm gốc / Tên đầy đủ | Ghi chú & Alias |
|---|---|---|
| `EMB` | Ex-Mafia Boss Done With Life. Life Not Done With Ex-Mafia Boss. | Alias: `KOHAKU` |
| `CLS` | Crossover và Lệnh sứ (chưa đặt tên chính thức) | KHR × HSR crossover |
| `PPCT` | Phản phái chiến tranh | KHR × Fate/Zero × BSD |
| `TDTB` | Thập Đại Mục mỗi ngày đều đang trang B | KHR comedy/acting |
| `BCMF` | Bắt cóc một cái Mafia tới cứu vớt thế giới | KHR × Conan |
| `HNQT` | Luận đàn Hắc Nguyệt Quang Cương Cát quân | KHR × JJK |
| `UNTCH` | Untouchable | KHR × BNHA |
| `TRIAD` | KHR × JJK × BSD | Crossover 3 fandom |
| `CCHT` | Cương Cát đích Hoành Tân | KHR × BSD |
| `KITIC` | Kì tích | KHR × HSR (Tsuna × Phainon) |
| `BTWID` | Baby that's what I do | KHR × Naruto |
| `PCA` | Please Come Again | KHR × BNHA |
| `DUA` | Crossover BNHA | KHR × BNHA |
| `SORA` | Chưa đặt tên | Đang lên ý tưởng |

---

## 2. Mã Thể loại (Genre Prefixes)

Mã thể loại được dùng làm tiền tố chuẩn để phân loại các tập tin lưu trữ văn bản trong kho tư liệu:

| Mã | Thể loại | Bản chất tự sự |
|---|---|---|
| `XAT` | **Xem ảnh thể** | Dạng truyện nhân vật ngồi lại cùng xem quá khứ, tương lai hoặc thế giới song song của chính mình qua màn chiếu / không gian đặc biệt. |
| `DDT` | **Diễn đàn thể** | Dạng truyện được kể hoàn toàn thông qua giao diện bài đăng diễn đàn, bài thảo luận, khung bình luận và chat mạng xã hội. |

*Lưu ý:* Mã thể loại dùng để phân loại tài liệu hoặc đặt tên nhánh (`branch`), không dùng thay thế cho mã project.

---

## 3. Mã Fandom (Shared Fandom Codes)

Fandom là dữ liệu canon dùng chung cho nhiều tác phẩm khác nhau. Tất cả dữ liệu fandom tập trung tại `05_Evasion/01_Oeuvre/Database/Fandom/<MÃ_FANDOM>/`:

| Mã Fandom | Tên tác phẩm / Franchise | Trạng thái Database trong Vault |
|---|---|---|
| `KHR` | Katekyo Hitman Reborn! | Đầy đủ dữ liệu nguyên tác & nhân vật |
| `BNHA` | Boku no Hero Academia (My Hero Academia) | Đã chuẩn hóa dữ liệu |
| `BSD` | Bungou Stray Dogs | Đã chuẩn hóa dữ liệu |
| `JJK` | Jujutsu Kaisen | Đã chuẩn hóa dữ liệu |
| `Fate` | TYPE-MOON / Fate series (Fate/Zero) | Đã chuẩn hóa dữ liệu |
| `HSR` | Honkai: Star Rail | Đã chuẩn hóa dữ liệu |
| `CONAN` | Detective Conan | Đã chuẩn hóa dữ liệu |
| `DC` | DC Comics | Đã chuẩn hóa dữ liệu |

---

## 4. Phân tầng Dữ liệu Dự án: "Nội dung còn dùng được"

Khi tiếp nhận dữ liệu từ các phiên làm việc trước hoặc dự án cũ, phân loại nghiêm ngặt theo 3 tầng dữ liệu:

| Tầng | Định nghĩa | Ví dụ | Điểm đến chuẩn |
|---|---|---|---|
| **① Nguồn sơ cấp** | Tác phẩm gốc do tác giả viết ra. | File nguyên tác `.epub`, `.html`, comment, author's note. | `01_Project-canon/sources/` (Bất biến, chỉ đọc). |
| **② Sản phẩm cũ** | Các chương, dàn ý do Aurel/AI đã viết trước đó. | Các bản thảo chương, tóm tắt cũ. | `04_Manuscript/revisions/` hoặc `05_Management/snapshots/`. |
| **③ Bản tóm tắt AI** | Các suy luận, nhận định của AI từ các phiên trước. | Báo cáo backfill, hồ sơ tổng hợp từ AI. | Chỉ dùng làm danh sách đầu mối; không đưa vào `canon/` nếu thiếu bằng chứng sơ cấp. |

### Tiêu chí xác định "Nội dung còn dùng được":
Một dữ kiện từ dự án cũ chỉ được đưa vào canon khi truy nguyên được về một trong hai nguồn:
1. **Trích dẫn trực tiếp từ nguồn sơ cấp** (chỉ rõ file và ngữ cảnh trong nguồn gốc).
2. **Quyết định chính thức của Aurel** (có ngày tháng và ngữ cảnh phê duyệt).

---

## 5. Sáu Quy tắc Bất biến cho Mọi Project

1. **`sources/` là bất biến:** Tuyệt đối không chỉnh sửa, không xóa, không "dọn dẹp" nguồn sơ cấp.
2. **Nguồn sơ cấp thắng phân tích phái sinh:** Mọi fact trong canon phải có nguồn gốc rõ ràng.
3. **`questions/` không bao giờ được đọc như `decisions/`:** Câu hỏi mở là vấn đề đang chờ duyệt, không phải sự thật đã chốt.
4. **Các project hoàn toàn độc lập:** Hai project không truy cập trực tiếp dữ liệu của nhau; canon dùng chung phải đặt tại `Database/Fandom/`.
5. **Đánh nhãn thẩm định minh bạch:** Phân biệt rõ ràng giữa `executed`, `inspected` và `assumed`.
6. **Thước đo văn phong theo từng truyện:** Mỗi tác phẩm bắt chước một tác giả/phong cách riêng, kiểm soát qua `style/` của chính dự án đó.
