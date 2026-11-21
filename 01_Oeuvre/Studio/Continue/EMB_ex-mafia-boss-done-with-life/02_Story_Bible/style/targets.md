---
id: style.EMB.targets
type: style
scope: project
lane: personal
project: EMB
canon_layer: project_locked
status: active
strength: target
aliases: ["targets", "chi tieu van phong", "muc tieu do luong", "so can cham"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/signature|signature]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: measured
  ref: "Do lai 17/09/2026 tu personal-bulk:fiction-sources/EMB/raw/original-fic/ (2 file HTML): trich than chuong tu div.userstuff ben trong, giu nghieng o dang *markdown*, bo khoi chu thich cuoi P2 Ch2, bo Ch4 (thong bao 59 tu). 5 chuong, 37.391 tu (dem \\S+). Do bang chinh ham measure() cua 01_Origine/04_Tools/VaultTool/chapter_gate.py va style_metrics.py, cong mot script dem cau/thoai theo tung doan."
authority: original_author
confidence: 0.95
always_load: false   # tra cuu — nguong that su nam trong ai-tells frontmatter
tags: [d/fanfic, k/rule, p/personal]
legacy_tags: [style, target]
last_updated: 2026-11-21
---

# Chỉ tiêu — con số cần chạm

> 🔁 **Đo lại từ nguồn thô 17/09/2026** trong lượt làm lại từ nguồn. Bản 15/08 đo trên **43.152 từ** — khoảng **15% là ghi chú lẫn vào**; thân chương thật là **37.391 từ**.
>
> Lệch thì **báo số, không nhét chữ**. Ép một chỉ số bằng cách rắc thêm dấu câu là làm hỏng văn để làm đẹp bảng.

## 🔴 Nguyên tắc hiệu chỉnh — **chỉ tiêu không được đánh trượt chính tác giả**

Bản cũ đặt sàn và trần theo **trung bình gộp**, rồi áp **cho từng chương**. Chạy cổng kiểm lên chính năm chương gốc thì **cả năm đều trượt** — [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/hard-rules|hard-rules]].

Từ nay:

| Mức | Điều kiện |
|---|---|
| **Luật cứng** — [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/hard-rules\|hard-rules]] | **5/5** chương tác giả đều đạt |
| **Chỉ tiêu** — note này | **ít nhất 4/5** chương đạt; chương thứ năm lệch **có lý do nêu được** |
| **Xu hướng** — [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/signature\|signature]] | không có ngưỡng |

## Mốc tác giả — đo bằng đúng thước của cổng kiểm

Đo bằng hàm `measure()` của `chapter_gate.py` — tức **đúng con số cổng sẽ tính trên bản nháp**:

| Chỉ số | P1 Ch1 | P1 Ch2 | P1 Ch3 | P2 Ch1 | P2 Ch2 | **Part 1** | **Part 2** | **Cả 5** |
|---|---|---|---|---|---|---|---|---|
| số từ | 4.554 | 7.196 | 6.986 | 8.277 | 10.743 | 18.736 | 19.020 | 37.756 |
| câu trung vị | 10 | 10 | 14 | 10 | 11 | 11 | 11 | **11** |
| câu dài ≥35 từ | 4,7 % | 2,6 % | 8,7 % | 4,8 % | 1,9 % | 5,0 % | 3,1 % | **4,0 %** |
| đoạn TB (từ) | 37,0 | 32,3 | 44,8 | 36,8 | 33,7 | 37,3 | 35,0 | **36,1** |
| `?` /10k | 54,9 | 23,6 | 32,9 | 67,7 | 62,4 | 34,7 | **64,7** | 49,8 |
| `!` /10k | 46,1 | 5,6 | **0,0** | 13,3 | 13,0 | 13,3 | 13,1 | **13,2** |
| *nghiêng* /10k | 54,9 | 173,7 | 85,9 | 97,9 | 112,6 | 112,1 | 106,2 | **109,1** |
| `…` /10k | 8,8 | 18,1 | 40,1 | 29,0 | 17,7 | 24,0 | 22,6 | **23,3** |
| thuật ngữ /1000 *(danh sách phân biệt hoa thường)* | 7,03 | 11,12 | 15,89 | 19,33 | 10,70 | 11,90 | 14,46 | **13,19** |
| `had` /10k | 142,7 | **243,2** | 147,4 | 189,7 | 119,1 | 183,1 | 149,8 | 166,3 |
| % từ nằm trong thoại | 6,8 | 1,6 | 7,3 | 19,6 | 21,9 | **5,0** | **20,9** | 13,0 |

## Chỉ tiêu — và số chương tác giả đạt

| Chỉ số | Chỉ tiêu | Tác giả đạt | Ghi chú |
|---|---|---|---|
| số từ | **8.000 – 13.000** | 2/5 | ⚠️ **ngoại lệ có chủ đích**: đây là chỉ tiêu *sản xuất*, hiệu chỉnh theo **Part 2** và xu hướng tăng. Ba chương Part 1 ngắn hơn là đúng với Part 1 |
| câu trung vị | **10 – 14** | 5/5 | bản cũ 11–15 **đánh trượt 3/5** |
| câu dài ≥35 từ | **≤ 9 %** | 5/5 | 🔴 **chuyển từ luật cứng xuống đây** — hai công cụ đo P1 Ch3 ra **8,7 %** và **11,1 %** |
| đoạn TB | **30 – 40** | 4/5 | P1 Ch3 44,8 — chương lore dày |
| `?` /10k | **≥ 30** | 4/5 | P1 Ch2 23,6 — chương tiểu sử, gần như không thoại. **Part 2 ≈ 65** là mức nên nhắm |
| `!` /10k | **≥ 5** | 4/5 | 🔴 **chuyển từ luật cứng xuống đây** — P1 Ch3 **không có dấu `!` nào**. Bản cũ ≥ 6 đánh trượt 2/5 |
| *nghiêng* /10k | **≥ 60** | 4/5 | P1 Ch1 54,9 |
| `…` /10k | **≥ 12** | 4/5 | P1 Ch1 8,8 |
| thuật ngữ /1000 | **≥ 7** | 5/5 *(`chapter_gate`)* · 4/5 *(`style_metrics`)* | xem mục *Hai công cụ, hai cách khớp* |
| `had` /10k | **≤ 210** | 4/5 | P1 Ch2 243 — chương hồi tưởng tiểu sử, thì quá khứ hoàn thành là đúng chất liệu |

⚠️ **Mười chỉ tiêu trên cả hai công cụ đọc được** nằm trong frontmatter [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/ai-tells|ai-tells]] (`gate.targets`). Note này là **bản giải thích**; sửa số thì sửa **cả hai chỗ**, không thì vault có hai bộ ngưỡng lệch nhau.

> **Ước lượng số từ của khung arc là sàn** — Aurel, 17/09/2026: *"xem ước lượng là sàn, mình không phiền nếu chương bị dài do câu truyện hay"*. Không cắt cảnh để khớp ngân sách khung; vượt đáng kể thì báo số như thông tin. Khoảng **8.000–13.000 từ/chương** ở trên là số đo từ tác giả gốc và không đổi.

## 🔴 Hai kết luận cũ bị lật

**1. "Bản AI viết nhiều thoại hơn tác giả" — sai mốc so.** Bản cũ so sáu chương AI *(15,3–26,9 % từ trong thoại)* với **mức gộp cả truyện 11,7 %** và kết luận AI thoại quá nhiều. Nhưng giọng tác giả **dịch rất mạnh giữa hai phần**: Part 1 **5,0 %**, Part 2 **20,9 %**. Nhánh viết tiếp **nối từ Part 2** — so với Part 2 thì sáu chương AI **nằm đúng khoảng**. Chẩn đoán *"thiếu hụt nằm bên trong chính lời thoại — nhân vật không bao giờ mất bình tĩnh"* **vẫn đứng**, vì nó dựa trên `?` và `!`, không dựa trên lượng thoại.

**2. "Mật độ Flame tác giả 8,85/1000" — con số phụ thuộc hoàn toàn vào danh sách từ khoá.** Danh sách cũ **chỉ có tên Flame**, và tên nguyên tố **va thời tiết**: ở chương lễ cưới cáo, `Rain` được đếm 11 lượt nhưng **10 lượt là mưa thật**, `Sun` 6 lượt thì **cả 6 là mặt trời**. Danh sách mới, Aurel chốt 17/09: **gồm cả hai — tên Flame và thuật ngữ tác giả tự đặt** — kèm mức thổi phồng đã đo, ghi ở mục dưới.

## Hai công cụ, hai cách khớp — **danh sách từ khoá phải khác nhau**

| Công cụ | Khớp thế nào | Hệ quả |
|---|---|---|
| `style_metrics.py` | **không** phân biệt hoa thường | đếm được *flame* viết thường *(tác giả dùng 94 lần như thuật ngữ)*, nhưng tên nguyên tố **va vào thời tiết** → **vẫn giữ** *(Aurel chốt)*, và **chấp nhận thổi phồng đã đo** |
| `chapter_gate.py` | **có** phân biệt hoa thường | **an toàn** với tên nguyên tố viết hoa, nhưng **bỏ sót** *flame/flames* viết thường → phải **liệt kê riêng** các dạng ấy |

Danh sách cho `chapter_gate` nằm ở [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/ai-tells|ai-tells]] (`gate.terms`). Danh sách cho `style_metrics` nằm ngay dưới.

**Tên Flame — giữ, kèm mức thổi phồng đã đo** *(Aurel chốt 17/09: "nên có cả hai")*

Sky · Rain · Sun · Cloud · Mist · Storm · Lightning đếm cả **nghĩa thường** — mưa, nắng, bầu trời, sương. Đo trên 5 chương: **57 lượt viết thường** trong tổng số lượt tên nguyên tố, tức **thổi phồng tối đa 1,48/1000**. ⚠️ **Dồn gần hết vào một chương**: 31/57 lượt ở **P2 Ch2** — chương mở bằng một cơn mưa nắng. Và không phải lượt viết thường nào cũng sai: *mist flames* viết thường vẫn là thuật ngữ.

→ Chương viết tiếp có **cảnh thời tiết dày** sẽ có mật độ cao hơn thật. Đọc `term_hits` của Rain / Sun / Sky trước khi tin con số — đúng như skill dặn.

**Đã loại, và vì sao:**

| Từ | Lý do |
|---|---|
| **Arashi** | trong năm chương nó xuất hiện **đúng 1 lần** — và là **tên người** *(Hibari Arashi)*, không phải tên nghi lễ |
| **Tsubasa** · Wings · Attraction · Amber | tên người phổ biến, hoặc từ thường va nghĩa thường |

**Giữ dù chưa xuất hiện lần nào:** Tatsuran · Shigure · Taiyou · Terumi · Mirai · Akizuki · Kaguya · Rui · hakukoshi — nằm trong bảng danh xưng của tác giả; chương viết tiếp dùng tới thì cần được đếm.

**Phân bố lượt đếm** *(5 chương, `style_metrics`)*: Flame 28,3 % · Fire 11,7 % · Tenmei 10,9 % · Kohaku 10,2 % · Harmony 4,0 %. Không một từ nào gánh quá nửa. ⚠️ **Tenmei hành xử như một cái tên** — 38/44 lượt ở P2 Ch1, nơi cư dân gọi Tsuna là Tenmei-sama. Chương có nhiều cảnh cư dân sẽ có mật độ cao hơn thật.

## Cấu hình cho `style_metrics.py` — đừng sửa định dạng ba dòng dưới

`style_metrics.py` **không** đọc frontmatter; nó bóc ba thứ khỏi phần thân file này bằng regex. Sai định dạng thì nó **im lặng** dùng mặc định và bỏ hẳn kiểm mật độ.

- Khoảng số từ: **8.000 – 13.000**
- Mật độ thuật ngữ: **≥ 7/1000** từ
- Danh sách thuật ngữ — `Flame, Fire, Honō, Kotei, Kohaku, Tenmei, Amatsumi, Ketsueki, Kogyoku, Tatsuran, Yasuragi, Seigyoku, Shigure, Seiran, Chiyu, Ōgyoku, Taiyou, Terumi, Hogo, Ryokugyoku, Rokugyoku, Raiga, Mirai, Getsufuji, Shimizuakira, Akizuki, Kaguya, Gen'ei, Ruri, Rui, Ruriko, Weaver, Amakakeru, Hoshikuzu, Eienzakuramura, Amenokagami, Shinkyo, kokoshi, hakukoshi, Sanctuary, crux, soulscape, neutral core, Harmony, harmonise, harmonize, harmonised, harmonized, harmonisation, Arcobaleno, Tri-Ni-Sette, pacifier, Sky, Rain, Sun, Cloud, Mist, Storm, Lightning` chia cho tổng số từ × 1000.

Đo lại bằng danh sách này, `style_metrics`:

| | P1 Ch1 | P1 Ch2 | P1 Ch3 | P2 Ch1 | P2 Ch2 | **gộp** |
|---|---|---|---|---|---|---|
| **cả hai** *(danh sách trên)* | 5,26 | 11,39 | 14,44 | 19,06 | 12,01 | **13,09** |
| chỉ thuật ngữ tác giả | 3,50 | 9,75 | 12,34 | 16,58 | 8,01 | 10,49 |
| lượt tên nguyên tố viết thường | 1 | 12 | 5 | 8 | **31** | 57 |

Ngưỡng ≥ 7: tác giả đạt **4/5** *(P1 Ch1 5,26 — chương một đứa bé tỉnh dậy, gần như không có thuật ngữ)*.

## Lịch sử — bảng điểm sáu chương AI *(bản v3, đã xóa 21/11/2026)*

Bảng dưới chấm sáu chương `BratArc-Chuong3..8` theo **mốc cũ 15/08**. Giữ lại vì chẩn đoán của nó — **ba dòng vỡ ở cả sáu chương: `!` · `…` · câu dài** — là bằng chứng rằng lỗi nằm ở **hồ sơ nạp vào trước khi viết**, không ở từng chương. ⚠️ Các số **tác giả** trong bảng là **số cũ**, dùng bảng *Mốc tác giả* ở trên.

| Chỉ số | tác giả *(cũ)* | Ch3 | Ch4 | Ch5 | Ch6 | Ch7 | Ch8 |
|---|---|---|---|---|---|---|---|
| số từ | ≈7.968 | 8.076 | 8.176 | 8.224 | 7.983 | 7.786 | 7.783 |
| câu trung vị | 12 | 13 | 14 | 13 | 13 | 22 | 16 |
| câu dài ≥35 từ | 5,9 % | 14,0 | 18,2 | 16,4 | 15,3 | 29,7 | 21,3 |
| `?` /10k | 46,6 | 6,2 | 18,3 | 20,7 | 16,3 | 15,4 | 14,1 |
| `!` /10k | 12,7 | 0 | 0 | 0 | 0 | 0 | 0 |
| *italic* /10k | 91,8 | 78,0 | 57,5 | 58,4 | 50,1 | 16,7 | 23,1 |
| `…` /10k | 20,4 | 0 | 0 | 0 | 0 | 0 | 0 |
| đoạn TB | 37,2 | 29,1 | 28,0 | 27,1 | 27,0 | 38,1 | 26,5 |

→ Chấm lại theo **chỉ tiêu mới**: `!` **0 ở cả sáu chương** vẫn vỡ *(tác giả chỉ có 1/5 chương bằng 0, và đó là một chương lore)*; `…` **0 ở cả sáu** vẫn vỡ; câu dài **14–30 %** vẫn vỡ nặng. Ba dòng vỡ **không đổi** — chỉ tiêu mới không cứu được bản v3.

## Chưa đo

- Động từ dẫn thoại *(said/asked/replied/drawled…)*
- Độ dài lượt thoại trung bình
- Mật độ chú thích *(Part 2: 14 ở Ch1, 55 + 1 ở Ch2)*
- Hai công cụ tách câu khác nhau *(`chapter_gate` và `ai_tells_check` cho P1 Ch3 ra 8,7 % và 11,1 % câu dài)* — **chưa quyết công cụ nào là thước chuẩn**
