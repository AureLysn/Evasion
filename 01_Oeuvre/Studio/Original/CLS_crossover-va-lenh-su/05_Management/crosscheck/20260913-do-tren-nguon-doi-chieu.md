---
id: note.CLS.20260913-do-tren-nguon-doi-chieu
type: note
scope: project
project: CLS
lane: personal
canon_layer: high_confidence_inference
status: active
aliases: ["do luong tren nguon doi chieu", "ket qua dem tren epub", "phep do that bai", "vi sao khong do duoc thien vi", "dem ten nhan vat bo A"]
related: ["[[CLS]]", "[[20260913-nhan-xet-cua-aurel]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/01_Project-canon/sources/_MOC|sources/_MOC]]"]
source:
  type: measured
  ref: "Script Python chay tren 3 epub trong kho-cloud, phien Claude Code 13/09/2026. Script o scratchpad phien, khong luu."
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-13
---

# Đo trên nguồn đối chiếu — 13/09/2026

> ⚠️ `authority: ai`. File này là **phân tích dẫn xuất, không phải bằng chứng** —
> [[principles]] nguyên lý 3. Khi nó đá nhau với [[20260913-nhan-xet-cua-aurel]], **file kia
> thắng**: Aurel đọc trực tiếp, đây chỉ là đếm ký tự.

## Đứng vững

**Thống kê tên nhân vật, bộ A** (đếm trực tiếp, không suy luận):

| Nhân vật | Lượt gọi tên |
|---|---|
| Gojō Satoru | **1.018** |
| Akutagawa | 754 |
| Tsuna (Cương Cát + Sawada Tsunayoshi) | 710 |
| Osamu Dazai | 707 |
| Vân Tước (Hibari) | 555 |
| Reborn | 462 |
| Bạch Lan (Byakuran) | 439 |
| Fushiguro Megumi | 397 |
| "Hắc Trạch Trận" | 359 |

Bộ A **không phải truyện hai trung tâm**: KHR ~2.900 · BSD ~2.100 · JJK ~1.900 lượt gọi tên,
và người được gọi tên nhiều nhất là **Gojō**. Bộ C thì lệch rõ: Akutagawa 936 · Tsuna 400.

**"Hắc Trạch Trận"** — 359 lượt, là nhân vật **Conan**, không phải OC.

> 🔴 **Đính chính 13/09/2026.** Bản đầu của note này đoán đây là bí danh của **Akai Shuichi**.
> **Sai.** Aurel chỉ đúng: đây là **Gin** (黒澤陣). Đọc lại xác minh: nhân vật này luôn xuất hiện
> cạnh **Lan** (Ran Mouri), và được tả là *"cao lớn tóc trắng nam nhân"* — đúng Gin.
>
> Cùng lúc đó sửa một lỗi thứ hai: phiên làm việc từng đọc **"Lan"** trong các đoạn này là
> **Bạch Lan (Byakuran)**. Cũng sai — trong arc Conan, "Lan" là **Ran Mouri**. Bản convert rút
> gọn cả hai tên thành cùng một chữ, và phiên làm việc chọn nghĩa sai mà không kiểm.

**Cấu trúc khung 【】** (khối chiếu của xem ảnh thể):

| Bộ | Số dấu 【 | % chữ nằm trong 【】 |
|---|---|---|
| A | 3.071 | 23,1% |
| C | 153 | 54,5% |
| B | 20 | 0,1% — **B không dùng khung xem ảnh thể** |

## Đã rút lại

**Bảng chuỗi arc của bộ A** — sai, không dùng. Nguyên nhân: tra chuỗi `Gojo` trong khi văn
bản viết `Gojō` (có macron), nên JJK bị đếm ra **16 lượt** thay vì ~1.900. Hệ quả: 171 chương
bị gán "không nhãn" phần lớn thật ra là chương JJK.

**Bài học có hình dạng:** bản convert dùng **lẫn lộn romaji và Hán-Việt** (`Osamu Dazai` 707
lượt nhưng `Thái Tể` chỉ 5). Danh sách tên phải dựng **từ chính văn bản**, không từ trí nhớ
về fandom.

## Đã thử và KHÔNG chạy được

Hai phép đo dưới đây **thất bại**. Ghi lại để phiên sau đừng làm lại.

**1. Đếm "khen chéo thế giới" bằng từ vựng.** Ý tưởng: quanh mỗi lần nhắc Akutagawa, tìm tên
nhân vật thế giới khác + từ bày tỏ yêu thích. Kết quả: **1 lượt trên 6,4 triệu ký tự**, dù
`thích` xuất hiện 1.020 lần và `yêu` 819 lần.

> **Vì sao hỏng:** văn convert gọi nhân vật bằng `hắn` / `nàng` sau câu đầu mỗi cảnh. Đòi hai
> tên riêng trong cùng cửa sổ 500 chữ là đòi thứ văn bản này không có. Đây là lỗi **phương
> pháp**, không phải lỗi tham số — chỉnh cửa sổ rộng ra không cứu được.

**2. Đếm mật độ đảo khối 【】** để kiểm điểm 2 của Aurel (phần Tsuna "giống đoạn truyện bình
thường"). Kết quả **ngược chiều giả thuyết**:

| | Khối 【】/chương | Chương không có khối nào |
|---|---|---|
| Bộ A, chương của Akutagawa | 6,7 | 25% |
| Bộ A, chương của Tsuna | 6,2 | 10% |
| Bộ C, chương của Akutagawa | 2,3 | 3% |
| Bộ C, chương của Tsuna | 2,9 | 0% |

Tín hiệu duy nhất **thuận** chiều Aurel, và nó yếu: ở bộ C, phần phản ứng trong chương
Akutagawa có trung bình **1,84** fandom khác nhau, chương Tsuna có **1,40** — JJK xuất hiện ở
19/31 chương Akutagawa nhưng chỉ 2/15 chương Tsuna.

## Kết luận thật thà

**Điểm 2 của Aurel không xác nhận được bằng đếm tổng thể, và điều đó không có nghĩa là Aurel
sai.** Thứ Aurel mô tả — độ sâu tâm lý, suy nghĩ của ai được dựng ra, phản ứng được **diễn**
hay được **tóm tắt** — không hiện lên trong số dấu ngoặc. Nó cần **đọc có chủ đích**, không
cần đếm thêm.

**Việc còn kiểm được:** chi tiết lá thư ở điểm 2 là một sự kiện cấp cảnh, tìm được bằng cách
đọc các đoạn có "thư" + "quà" trong arc Tsuna và arc Akutagawa rồi đối chiếu hai chiều.
Chưa làm.

## Bổ sung sau khi Aurel cho mốc chương — ĐÂY LÀ PHẦN XÁC NHẬN ĐƯỢC

Ba phép đo đầu tiên hỏng vì gộp cả 482 chương của bộ A làm một. Aurel cho hai dữ kiện khiến
đo được: **xem ảnh thể bộ A bắt đầu từ ch204**, và hai arc đối chứng trong bộ C.

### Mốc 204 — xác nhận sắc

| Đoạn bộ A | % chữ trong 【】 |
|---|---|
| ch1–203 | **1,0%** |
| ch204–482 | **41,9%** |

### Hai arc đối chứng trong bộ C — cùng truyện, cùng tác giả, một arc mỗi nhân vật

`Huyết sắc vi` = ch2–26 (Akutagawa) · `Không chi thiên sứ` = ch44–54 (Tsuna).

| | Arc Akutagawa | Arc Tsuna |
|---|---|---|
| Số chương | 25 | 11 |
| % chữ là **khối phản ứng** | **54,7%** | 42,7% |
| Fandom trong phần phản ứng | BSD 1002 · **JJK 116** · KHR 33 | **KHR 197** · DC 3 · BSD 2 · JJK 1 |
| Tỉ lệ phản ứng đến từ **thế giới khác** | **12,9%** | **3,0%** |

> 🟢 **Điểm 2 của Aurel được xác nhận trên bộ C.** Phản ứng trong arc Tsuna là **97% nội bộ
> KHR**; trong arc Akutagawa, phản ứng từ thế giới khác dày gấp **4,3 lần**. Đúng như Aurel
> mô tả: *"phần phản ứng cũng chỉ tóm gọn trong KHR, hoàn toàn không giống với xem ảnh thể."*

### Bộ A ch204+ — KHÔNG xác nhận được

| | Chương Akutagawa | Chương Tsuna |
|---|---|---|
| Số chương | 41 | 60 |
| % là khối phản ứng | 53,2% | 48,7% |
| Phản ứng từ thế giới khác | 6,7% | **14,9%** |

Ở bộ A, chỉ số này **ngược chiều**: phần Tsuna có phản ứng ngoại thế giới dày hơn. Ghi lại
nguyên trạng, không uốn cho khớp.

### Chi tiết lá thư — tìm thấy, chưa kết luận được

Tìm thấy ở **ch51** (arc Tsuna, bộ C): *"Akutagawa quân lá thư này, có thể đưa tới sóng to
gió lớn a."* — Bạch Lan nhắc tới phong thư được Tsunayoshi nghiêm túc đối đãi.

⚠️ Đoạn này nằm **trong khối chiếu 【】**, không phải khối phản ứng. Mạch thư có ở cả hai arc
(`thư`: 203 lượt ở arc Akutagawa / 69 ở arc Tsuna — chuẩn hoá theo độ dài thì 6,6 so với 5,2
trên 10.000 chữ, tức **tương đương**).

**Chưa xác minh được chiều ngược lại** — tức phía Akutagawa có bao giờ được diễn tả nhớ lại
Tsuna hay không. Việc đó cần **đọc thật** hai arc, không đếm được. Chưa làm.


---

## 🟢 ĐO LẠI TRÊN BẢN ĐỒ CỦA AUREL — đây là kết quả dùng được

Aurel cung cấp bản đồ arc ([[20260913-ban-do-arc-hai-bo]]). Đếm tên riêng **trong từng khối do
Aurel khai** cho ra thứ năm phép đo mù trước đó không thấy.

### Bảng gốc — bộ A, đếm tên riêng theo khối

| Khối | Số ch | Akutagawa | Tsuna | Jackson | Peter |
|---|---|---|---|---|---|
| ch1–20 · Akutagawa | 20 | **59** | 0 | 3 | 0 |
| ch21–40 · Jackson | 20 | 0 | 0 | **609** | 57 |
| ch41–72 · **Tsuna** | 32 | 0 | **35** | **58** | **50** |
| ch353–391 · **Akutagawa** | 39 | **673** | 7 | 4 | 0 |
| ch392–440 · **Tsuna** | 49 | 0 | **587** | **158** | 23 |
| ch441–467 · Jackson (trong thế giới Tsuna) | 27 | 0 | 65 | **716** | 60 |
| ch468–470 · "tập trung Aku + Tsuna" | 3 | **0** | **0** | 11 | 5 |
| ch471–476 · Peter + Jackson | 6 | 0 | 0 | 92 | 107 |

### Phát hiện 1 — arc của Akutagawa **sạch**, arc của Tsuna **bị chia**

| | Arc riêng | Tên người khác chen vào | Tỉ lệ |
|---|---|---|---|
| **Akutagawa** ch353–391 | 673 lượt | 11 lượt | **1,6%** |
| **Tsuna** ch392–440 | 587 lượt | 181 lượt | **30,8%** |

**Chênh nhau 19 lần.** Akutagawa được một arc cho riêng mình; arc của Tsuna thì không.

Và ở arc Tsuna đầu tiên (ch41–72) còn nặng hơn: **Tsuna 35 lượt, Jackson 58, Peter 50** — Tsuna
là **thiểu số trong chính arc của mình** theo số lần gọi tên.

> 🟢 Đây đúng là điều Aurel nói khi đính chính phiên làm việc: *"không hoàn toàn [mất chức năng
> chủ nhà] nhưng chính xác là **bị chia nửa ra** thì đúng hơn."* Từ "chia nửa" là chính xác về
> mặt số học, và nó là thứ phiên làm việc **không tự đo ra được** — phải có bản đồ mới đo đúng chỗ.

### Phát hiện 2 — người khác chen vào **một chiều**

Jackson xuất hiện 158 lượt trong arc Tsuna, nhưng chỉ **4** lượt trong arc Akutagawa.
Người ngoài lấn vào không gian của Tsuna, **không** lấn vào không gian của Akutagawa. Đây là
điểm 1 của Aurel (*"các nhân vật chính còn lại tranh giành với Tsuna"*) ở dạng con số.

Thêm: ch441–467 là **27 chương đặt trong thế giới của Tsuna nhưng tập trung Jackson**
(Jackson 716 / Tsuna 65). Sân nhà của Tsuna thành sân khấu cho arc người khác.

### Phát hiện 3 — trung tâm thật của bộ A không phải Akutagawa

| Nhân vật | Lượt gọi tên, toàn bộ A |
|---|---|
| **Jackson** (`Jason` 1.272 + `Jessica` 1.735) | **3.007** |
| **Peter** | **2.135** |
| Gojō | 1.018 |
| Akutagawa | 754 |
| Tsuna | 710 |

`Jessica` được xác minh là Jackson ở dạng nữ (ngữ cảnh: Gotham, Batman, Dạ Dực) — khớp lời khai
của Aurel. Điều này **không phủ nhận** cảm nhận của Aurel: phàn nàn của Aurel là về **quan hệ
Tsuna–Akutagawa bị lệch**, không phải về ai nhiều chữ nhất.

### Điểm mù còn lại

Bảng trên đếm **tên riêng**. Aurel chỉ ra nhân vật còn được gọi bằng **danh hiệu và biệt danh**
(`buổi trưa`, `gia chủ`, `phong`, `thỏ`…), nên mọi con số trên là **sàn, không phải thực**.
Chưa lọc nhiễu, chưa có danh sách biệt danh cho Akutagawa và Jackson.
