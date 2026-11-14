---
id: info.EMB.dot4-vs-hoso
type: info
scope: project
lane: personal
project: EMB
canon_layer: user_canon
status: active
aliases: ["doi chung dot 4", "dot 4", "so voi HOSO", "HOSO cu", "khop thieu khac", "ket qua bai test"]
related: ["[[EMB]]", "[[fact-toan-canh-tuong-lai]]", "[[rule-ten-sawada]]", "[[rule-ten-tokugawa]]", "[[Uu-Tien-Nguon]]"]
source:
  type: inference
  ref: "KOHAKU/Knowledge-Data/HOSO-KOHAKU.md doi chieu voi Studio/Continue/EMB_ex-mafia-boss-done-with-life/ dot 1-3"
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [doi-chung, meta]
last_updated: 2026-08-16
---

# Đợt 4 — đối chứng vault mới với `HOSO-KOHAKU.md`

> Đây là **sản phẩm của bài test**, không phải phụ phẩm. Câu hỏi: dựng lại từ nguồn sơ cấp có ra kết quả tốt hơn file cũ không, và cái giá là gì.

## Kết quả một dòng

**Vault mới sâu và truy nguồn được hơn. `HOSO` cũ bao quát rộng hơn và bắt được một thứ vault mới bỏ sót hoàn toàn.** Cả hai đều cần.

| | Số mục | |
|---|---|---|
| ✅ **KHỚP** | 14 | xác nhận chéo — tăng độ tin |
| 🔵 **MỚI** — vault có, HOSO không | 9 | lợi thế của việc đọc thẳng văn bản |
| 🟠 **THIẾU** — HOSO có, vault không | 8 | **lợi thế của việc đã đọc rộng** |
| 🔴 **KHÁC** — hai bên nói ngược nhau | 3 | phần đáng giá nhất |

---

## 🔴 KHÁC — ba chỗ mâu thuẫn, đã truy về văn bản gốc

### 1. Chuỗi tên shōgun của dòng nội — **HOSO sai, và sai kiểu nguy hiểm**

`HOSO` Giai đoạn 2 §A, gắn nhãn **`[Canon, quan trọng]`**:

> *"Dòng Sawada nhánh cha đặt tên đúng thứ tự Shogun Tokugawa thật: **Ieyasu(Giotto)→Yoshimune→Yoshinobu→Ietsuna→Iemitsu→Tsunayoshi**"*

**Hai lỗi trong một câu:**

- `Yoshimune` và `Yoshinobu` **không xuất hiện một lần nào** trong toàn bộ 6 chương. Grep cả 5 file: **0 kết quả**
- Thứ tự shōgun thật cũng không phải thế. Tokugawa: Ieyasu (1) → Hidetada (2) → **Iemitsu (3)** → **Ietsuna (4)** → **Tsunayoshi (5)**. **Yoshimune là thứ 8, Yoshinobu là thứ 15** — họ không thể nằm giữa Ieyasu và Ietsuna

Cái đúng: bốn cái tên Sawada **có** trùng shōgun Tokugawa, và tác giả **có** chủ ý (Musashi nói thẳng *"These foreign Sawadas weren't the only ones with naming traditions"*). Nhưng **thứ tự thế hệ giữa họ thì fic chưa nói**, và HOSO đã lấp vào bằng một chuỗi tự chế.

⚠️ **Đây chính xác là dạng lỗi đã làm mất bốn chương.** Nó nằm trong file tên nghe như hồ sơ, mang nhãn `[Canon]`, và không có `source.ref` để ai đó kiểm lại. Vault mới ghi cùng nội dung ở [[rule-ten-tokugawa]] với `confidence: 0.9` và **không** dựng chuỗi thế hệ.

### 2. Số từ theo chương — lệch đều ~10%

| | HOSO | Vault | |
|---|---|---|---|
| P1 Ch1 | 4.542 | 5.172 | |
| P1 Ch2 | 7.172 | 8.124 | |
| P1 Ch3 | 6.948 | 7.981 | |
| P1 Ch4 | ~60 | 74 | *thông báo arc* |
| P2 Ch1 | 8.220 | 9.161 | |
| P2 Ch2 | 12.960 | **13.437** | chương dài nhất — **cả hai đồng ý** |

Lệch đều theo một chiều nên gần như chắc là **khác cách đếm** (HOSO có thể bỏ cả chú thích trong dòng), không phải sai. **Không đổi kết luận nào** — thứ hạng và tỉ lệ giống nhau. Vault giữ số của mình vì có script tái lập được.

### 3. Quan hệ máu mủ Hibari–Fon — HOSO xếp là **fanon**, thực tế là **fic_explicit**

`HOSO` §B: *"[Fanon phổ biến] Quan hệ máu mủ bí mật Hibari-Fon… tác giả dùng đúng nền này rồi cụ thể hoá."*

Nhưng P2 Ch2 viết ra **cây phả hệ có tên bốn đời** (Hibari Akanishi → Wu Qingyang → Wu Chengzi → Indra, nhánh kia là Wu Yanli → Fon) và dùng nó để giải thích một điểm cốt truyện. Đây là `fic_explicit`, **thắng cả canon franchise lẫn fanon**.

Đúng về **nguồn gốc**, sai về **tầng hiện tại**. Đã ghi lại ở [[fact-fon-huyet-thong]].

---

## 🟠 THIẾU — tám thứ HOSO có mà vault đợt 1–3 không moi ra

### 🔴 1. **Cú nhảy thời gian cuối P1 Ch3** — chỗ hụt nghiêm trọng nhất

`HOSO` §3 ghi rõ: *"năm Tsuna 18 tuổi, Sawada Tsunashige và gia sư Reborn đến đền. 'Let the games begin.'"*

Note chương `p1-ch3` của vault chỉ ghi: *"Sau chương này là một khoảng nhảy thời gian dài."*

**Sai.** Cú nhảy nằm **trong chính chương**, và nó kể tới tận năm Tsuna 18 tuổi — tức **tác giả đã xuất bản đích đến**. Đợt 2 (`analyze-drop-point`) cũng bỏ sót.

Đây không phải chi tiết trang trí; nó **đổi bản chất bài toán viết tiếp** từ "chuyện gì xảy ra tiếp" thành "cần bao nhiêu arc để đi hết 12 năm và hạ cánh đúng chỗ". Đã dựng thành [[fact-toan-canh-tuong-lai]] (`always_load`) và [[hook-tsunashige-va-reborn]].

**Vì sao mình bỏ sót:** đợt 2 đọc điểm dừng theo **thứ tự xuất bản** (chương cuối = P2 Ch2) chứ không theo **thứ tự thời gian trong truyện**. Cuối Part 1 là chỗ xa nhất về thời gian, nhưng không phải chương cuối. Bài học đã ghi vào note.

### 2–5. Bốn thế hệ và một biệt danh

| | HOSO có | Vault đợt 3 |
|---|---|---|
| **Sawada Keigo** — cha Musashi, thế hệ **5** | ✅ | ❌ |
| **Sawada Shiki** — thế hệ **4**, *Getsufuji* | ✅ | có tên, **không có số** |
| Chuỗi đầy đủ **4→5→6→7→8** | ✅ | chỉ có 6→7→8 |
| **"Ai-chan" = Indigo** | ✅ | ❌ |

Văn bản còn cho một thứ HOSO cũng không có: nó **tự gọi tên hiện tượng**.

> *"Grandmother was Shiki. Her father was Keigo. She was Musashi. Four. Five. Six. **A countdown.**"*

Đã dựng [[keigo]], cập nhật [[rule-ten-sawada]].

### 6. **Ugetsu bảo lãnh Giotto** — và toàn bộ lý do tác giả nghĩ ra hai dòng Sawada

`HOSO` §2.2 nêu ngắn. Nguồn thật là **End Notes P1 Ch1**, và nó dài, cụ thể, và giải thích cả gốc rễ sáng tạo:

> *"Ugetsu vouched for Giotto and he impressed the Sawada elders and was granted the use of their name. **He was only given that privilege because of his Sky nature.**"*

Kèm hai chú thích nữa cùng chỗ: **沢田 = "ruộng lúa giữa đầm"**, mà Inari là thần lúa → đó là lý do đền Namimori thờ Inari. Và **lý do Nono niêm phong**: khủng hoảng kế vị.

⚠️ Vault đợt 1 đã nạp `fic-part1` làm nguồn nhưng **chưa khai thác End Notes P1 Ch1**. Đợt 2 chỉ lấy phần lời hứa. Cần quét lại toàn bộ ghi chú chương.

### 7. **Kimiko là Sky Arcobaleno hai mươi năm**

HOSO §1 ghi một dòng. Văn bản có cả một cảnh dài với ba chi tiết vault chưa có: sáu Arcobaleno cùng thời **không hoá hài nhi mà thành thiếu niên** · **không ai thành Vindice** · và **Marella Giglio Nero sống trọn đời** vì Kimiko đứng vào chỗ đó thay. Đã dựng [[fact-kimiko-arcobaleno]].

### 8. **Cha của Keigo đã "vỡ"**

Không bên nào có. Tìm được khi truy nguồn cho mục 2–5:

> *"Sawada Keigo had seen **his own father shatter**, and had no desire to see his daughter go down the same path."*

Đây là **cơ chế chết** của cả gia tộc, ba thế hệ liên tiếp chạm vào. Đã dựng [[fact-vo-lo-flame]] (`always_load`).

---

## 🔵 MỚI — chín thứ vault có mà HOSO không

| | Ở đâu |
|---|---|
| **Miya Akiko** — bà nội Tsuna. HOSO §1 không liệt kê | [[sawada-ieyasu]] |
| **Luật đặt tên là "hai *cách viết*", không phải "hai tên"** + lý do chu kỳ mười (Ō-Inari **mười đuôi**) | [[rule-ten-sawada]] |
| **Điềm giấu trong tên Tsunayoshi** — Tokugawa Iemitsu sợ con tài năng soán ngôi anh; Musashi đọc ra và thấy bất an | [[rule-ten-tokugawa]] |
| **Hội đồng trưởng lão mạnh hơn gia chủ** — cơ chế quyền lực, không phải chi tiết nền | [[sawada-tu-te]] |
| **Kojirō chết làm tròn *hai* bổn phận cùng lúc** — Ryokugyoku của đền, và người cha | [[kojiro]] |
| **"Hầu hết người Hibari trông giống nhau"** — Nana gần như bất động khi gặp ai giống Kojirō. Quả bom chưa nổ | [[nana]], [[kojiro]] |
| **Hibari Keita** — em trai Kojirō, cha Kyouya. Mắt xích tuổi tác | [[keita]] |
| **Ietsuna cười đến chảy nước mắt + biết trước từ lâu** = Intuition thật của Primo đang hoạt động | [[ietsuna]] |
| **Lời tiên tri nhà Hibari đã ứng nghiệm và lấy một mạng người** (mẹ Kimiko) — đối xứng với lời tiên tri Sawada chưa thanh toán | [[fact-loi-tien-tri-muoi]] |

---

## ✅ KHỚP — mười bốn mục, xác nhận chéo

Hai dòng Sawada và Tsuna là hậu duệ cả hai · lời tiên tri **thế hệ thứ 10**, Tsuna là **8**, sớm hai thế hệ · bảng bảy Flame kiểu Nhật đầy đủ · Namimori là Sanctuary cần Kohaku sống · Kimiko là Kohaku duy nhất trước Tsuna · Kyouya là **anh em họ** · Indra là Guardian đầu tiên, **Yasuragi Inverse** · Kawahira dựng theo **truyện dân gian yokai cáo** · Estraneo bị xoá sổ hoàn toàn · Mukuro an toàn dưới trướng Kawahira · Nagi được cứu, học Mist dưới trướng Musashi · **Amakakeru Tsubasa** + **Hoshikuzu Ōi** · nhẫn hình sừng của Maro là Hell Ring, **cộng hưởng** với nhẫn Kawahira · điểm dừng là P2 Ch2, chương dài nhất

**Đáng chú ý:** `HOSO` §2.2 mô tả hai dòng Sawada **chính xác** — kể cả bộ đếm thế hệ. Lỗi hai dòng Sawada ở đợt 3 là **lỗi của vault mới**, không phải lỗi kế thừa từ file cũ. Nếu đã đối chứng ngay sau đợt 3 thì đã bắt được trước khi Aurel phải nhắc.

---

## Kết luận cho quy trình

**Ba điều rút ra:**

1. **Dựng lại từ nguồn sơ cấp là đúng.** Ba mục 🔴 đều là lỗi của file cũ, và cả ba đều thuộc dạng "kết luận không có nguồn nằm trong file trông chính thống". Vault mới bắt được vì mọi note đều phải có `source.ref`.

2. **Nhưng file cũ không phải rác.** Nó bắt được cú nhảy thời gian — thứ quan trọng nhất trong cả project — mà hai đợt phân tích mới đều bỏ qua. Lý do: nó được viết bởi người **đã đọc hết** trước khi phân tích, còn vault mới đọc theo giai đoạn.

3. **Đối chứng phải chạy ngay sau mỗi đợt trích xuất, không phải để dồn.** Nếu đợt 4 chạy ngay sau đợt 3, lỗi hai dòng Sawada đã lộ ra trước khi Aurel phải cảnh báo.

**Đề xuất sửa quy trình:** thêm bước *"đối chứng với hồ sơ cũ"* vào **cuối** skill `extract-entities`, không để thành một đợt riêng. Chi phí thấp, và nó bắt được cả hai chiều lỗi.

## Việc còn lại từ đợt 4

- ⬜ **Quét lại toàn bộ ghi chú chương (Chapter Notes + End Notes) của cả 6 chương** — End Notes P1 Ch1 cho thấy còn nhiều thứ chưa khai thác
- ⬜ Đối chứng với `TRITHUC` (84 KB) và `DANY` (40 KB) — đợt này mới làm `HOSO`
- ⬜ Dựng `secrets/` — [[fact-fon-huyet-thong]] là ứng viên đầu bảng
- ⬜ Cập nhật note chương `p1-ch3` với cú nhảy thời gian
