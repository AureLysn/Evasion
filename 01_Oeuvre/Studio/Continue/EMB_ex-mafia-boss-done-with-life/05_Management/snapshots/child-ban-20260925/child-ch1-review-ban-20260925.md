---
id: chapter.EMB.child-ch1-review-ban-20260925
type: chapter
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-09-25
archived_note: "Ban arc Child luu tru 25/09/2026: Aurel quyet lam lai arc tu khung y chinh (emb-lam-lai-child-tu-khung). Giu de tra; khong phai canon, khong phai mau giong."
language: vi
arc: child
pov: tsuna
aliases: ["review Child Ch1 ban 25-09", "check-continuity Child Ch1 ban 25-09", "loi tuoi Kyouya ban 25-09"]
related: ["[[child-ch1-chapter-ban-20260925]]", "[[child-ch1-the-canh-ban-20260925]]", "[[tuoi-va-moc]]", "[[kyouya]]", "[[emb-chot-danh-xung-theo-lanh-tho]]", "[[targets]]", "[[hard-rules]]"]
source:
  type: measured
  ref: "Do 20/09/2026 bang chapter_gate.py, style_metrics.py, pov_leak_check.py, cong cac phep grep tu viet."
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, review, k/note, p/personal]
last_updated: 2026-09-25
---

# Child Ch1 — số đo và check-continuity

## Cổng

| | |
|---|---|
| `chapter_gate` | **10/10**, luật cứng **sạch** |
| `pov_leak_check` | ⚠️ **1 phát hiện `[HIGH]` — dương tính giả**, xem M2 |
| `style_metrics` | 7.901 từ · tỉ lệ đoạn thoại **0,23** *(trần thẻ cảnh 0,26)* · thuật ngữ **7,72** |
| `vault_doctor --include-fiction` | **0 lỗi** |

## Đường đi: **5/10 → 10/10**, sáu lượt, 4.992 → 8.025 từ

🔵 Bẫy mới lần này: cắt câu dài bằng cách **tách đoạn** làm `para_mean` tụt theo — hai chỉ tiêu kéo ngược nhau. Lối ra là **cắt câu trong cùng đoạn** và **gộp đoạn ngắn**.

---

# check-continuity — **2 HIGH · 3 MEDIUM · 2 LOW**

## 🔴 H1 · Tuổi Kyouya — **sai bốn chương, và mình tự gây ra trong chính phiên này**

### Vault khoá gì

[[tuoi-va-moc]], bảng tuổi, dòng Kyouya:

> | **[[kyouya]]** | 🔴 **~6–7** *(chốt lại, **không phải 11**)* | ~18–19 |

[[kyouya]] còn nói rõ hơn:

> *"cậu **gần bằng tuổi Tsuna** (chênh tối đa 1–2) — chốt ở [[tuoi-va-moc]]. Ghi chú tác giả P1 Ch3 nói Kyoya và Kusakabe **còn là trẻ nhỏ** lúc Tsuna một tháng tuổi; dòng **'chúng mới mười một'** ở P2 Ch1 ngược lại, và là một trong các con số của chương ấy **không khớp** với thứ tự đã chốt 16/09."*

→ Con số **11** là con số vault đã **xét và loại**.

### Chương viết gì

| Chương | Nêu tuổi? |
|---|---|
| Brat Ch1 · Ch2 · Ch3 · Ch4 | ✅ **không nêu lần nào** |
| Brat Ch5 | 🔴 *of about eleven* ×1 · *eleven year old* ×2 · *being eleven* ×1 |
| Brat Ch6 | 🔴 *eleven year old* ×2 · *being eleven* ×1 |
| Brat Ch7 | 🔴 *eleven year old* ×3 |
| **Child Ch1** | 🔴 *is twelve* ×2 · *twelve year old* ×1 |

### 🔴 Và đây là phần phải nói thẳng

Lỗi này **không có trước phiên hôm nay**. Bốn chương đầu không nêu tuổi cậu ta lần nào. Nó xuất hiện lần đầu ở **thẻ cảnh Ch5**, trong **bảng dàn nhân vật** mình dựng — và mình điền `~11` vào đó **từ trí nhớ**, không tra [[tuoi-va-moc]].

⚠️ Bảng dàn nhân vật ấy tồn tại **chính xác vì** ba lỗi trước đó cùng một gốc: *viết thuộc tính nhân vật từ trí nhớ*. Mình dựng công cụ chống trí nhớ, rồi **điền nó bằng trí nhớ**, và bốn chương kế thừa.

### Nó không phải một con số

Đổi 11 → ~8 đổi **thanh ghi của cả một quan hệ**. [[kyouya]] ghi:

> *"courtship của cậu là chuyện giữa **hai đứa trẻ ngang tuổi** — hai con thú nhỏ đang đo nhau."*

Bốn chương hiện tại viết ngược lại: **một đứa lớn hơn nhận nuôi một đứa nhỏ hơn**. Ch7 cho cậu ta đạp 38km một mình trong đêm; ở tuổi tám thì đó là **một cảnh khác hẳn**, không phải cùng cảnh với một con số khác.

### Phạm vi phải sửa nếu chọn sửa chương

4 chương · 4 thẻ cảnh *(`brat-ch5/6/7-the-canh`, `child-ch1-the-canh`)* · [[ban-ky-luat-namimori]] · [[emb-chot-nguyen-to-di-san]] · ba review · ba delta.

🔵 **Quyết định là của Aurel, và nó có hai lối, không phải một:**

| | |
|---|---|
| **(a)** | Sửa chương cho khớp note. Đắt, và làm quan hệ Tsuna–Kyouya **đúng như vault đã chốt** |
| **(b)** | Sửa note cho khớp chương. Rẻ — nhưng phải lật một quyết định đã chốt 16/09, và phải giải thích vì sao dòng *"chúng mới mười một"* lại đúng sau khi đã bị loại |

⚠️ Vượt quá một chương ⇒ theo `check-continuity`, việc này **bàn giao cho `check-conflicts`**.

## 🔴 H2 · Musashi 75 vào tháng Mười — bà vẫn 74

| Nguồn | |
|---|---|
| [[master]] | *"[[musashi]] sinh vào **tháng Mười Hai**"* |
| [[brat-ch4-chapter-ban-20261001]] *(tháng Giêng)* | *"She is **seventy-four**"* |
| **Child Ch1** *(tháng Mười)* | 🔴 *"Grandmother is **seventy-five**"* |

Tháng Giêng bà 74 ⇒ bà tròn 74 vào tháng Mười Hai trước đó ⇒ **tháng Mười năm sau bà vẫn 74**, và tròn 75 hai tháng sau chương này.

## 🟠 MEDIUM

### M1 · Luật từ vựng chưa phủ trường hợp **Tsuna gọi CHỨC CỦA CHÍNH MÌNH**

Phép kiểm *(bản đã sửa)* ra **5 đoạn nghiêng** có hệ Nhật. Ba là ngoại lệ sạch — lời trích, văn bản trích, tên ghi trên thư. Hai chỗ còn lại là **nội tâm trực tiếp**:

> *I am the **Kotei** of a Sanctuary,*
> *Inside the boundary I am the **Kotei**, and the word does everything…*

⚠️ Ngoại lệ ③ của [[emb-chot-danh-xung-theo-lanh-tho]] nói **"chức vị trong nhà"**, và tiền lệ là *"She is a Gen'ei of the Sawada"* — tức chức của **người khác**. Nó **không nói gì** về việc cậu gọi **chức của chính mình**.

🔵 Đề xuất: **tính là chức vị, được phép**, với phép thử một dòng — *đang gọi một **chức** hay đang gọi một **nguyên tố**?* Và ghi vào note, vì nó sẽ tái diễn mọi chương.

*(Đoạn thứ hai còn mạnh hơn: cả đoạn **nói về chính cái từ ấy**, nên nó cũng rơi vào ngoại lệ ②.)*

### M2 · `pov_leak_check` báo `[HIGH]` — **dương tính giả, lỗi L39**

Đoạn khớp: `...child dan y brat ch7 chapter fact sanctuary **tsuna am tinh tren giay** hook dua tre...` — đó là danh sách `related:` trong **frontmatter của chính chương**.

**Chứng minh:** thay bằng frontmatter trung tính rồi chạy lại ⇒ **0 phát hiện**.

⚠️ Và chỗ cay: `source.ref` của chính chương này **tự ghi** *"ở đây không được nêu tên secret"* — rồi mình liệt kê nó vào `related:` ngay bên dưới.

### M3 · [[genichi]] **sáu mươi mốt tuổi** — sự kiện mới

Chưa note nào nêu tuổi ông. Không mâu thuẫn gì, nhưng là một con số **chịu lực** *(ông đổi cách hành nghề ở tuổi ấy)* và cần vào delta.

## 🟡 LOW

**L1** [[ishii]] **82** *(Brat Ch4 tháng Giêng: 81)* — hợp lý, chưa xác minh ngày sinh.
**L2** Tật số vẫn còn: `eleven` và `four` dày. Aurel để mở từ Ch4.

## ✅ Bảy nhóm — cái đã kiểm và **đạt**

| Nhóm | |
|---|---|
| **Timeline** | ⚠️ H2. ✅ Còn lại khớp: Tsuna **tròn 8 tháng Mười** *(sinh nhật đã khoá)* · Ferri biết Namimori từ dòng sổ ngừng bắn tháng Giêng, mất bốn tháng quyết định, viết tháng Mười |
| **Ranh giới biết** | ✅ [[tsuna-am-tinh-tren-giay]] bị **viện dẫn**, không bị lật — [[genichi]] đã ở `known_by`, không ai mới biết. [[tsuna-tai-sinh]] không đụng. [[567-ke-hoach]] chỉ trong nội tâm |
| **Trạng thái nhân vật** | ⚠️ H1, H2. ✅ Ayame sẹo trái · Gen'ichi đã biết Lửa, sổ có bảy định nghĩa · Nagi hạ được Gen'ei lần đầu |
| **Luật thế giới** | ✅ [[fact-sanctuary]] chạy **cả hai chiều**, và chương tìm ra một chiều thứ ba: chuẩn mới khiến hợp đồng **lùi khỏi** Ferri. ✅ [[fact-tap-quan-doi-voi-tung-he-lua]] hiện trên trang qua mắt người ngoài, đúng lằn can |
| **Quan hệ** | ⚠️ H1 đụng thẳng vào [[tsuna--kyouya]] |
| **Canon** | ✅ Bảy hệ đúng thứ tự [[rule-danh-xung-flame]]. ✅ Không lắp canon KHR vào ai |
| **Hợp đồng nhánh** | ✅ 12 mục `forbid` sạch. Kiểm riêng **#2**: Tsuna **không** tốt bụng — cậu không nói một lời nào trong phiên xét, và cái cậu nghĩ là *"nó không phải lỗi tôi, gọi nó là lỗi tôi là cách biến nó thành chuyện về tôi"* |

## Bàn giao

- **Chưa sửa gì.**
- 🔴 `finalize-chapter` chưa chạy được khi còn HIGH mở.
- 🔴 **H1 vượt quá chương này** ⇒ `check-conflicts`, không phải `check-continuity`.

---

## ✅ check-conflicts — 20/09/2026, Aurel chốt lối (a) và chênh **+2**

```
CONFLICT
Existing : Kyouya ~6-7 khi Tsuna 6, chenh toi da 1-2   [branch_locked / author_confirmed]
New      : Kyouya 11 -> 12                             [planned]
Precedence: author_confirmed > branch_locked > planned  =>  NOTE THANG
```

✅ **Chốt: [[kyouya]] chênh +2.** Brat Ch5–7 → **9**. Child Ch1 → **10**. Ghi vào [[tuoi-va-moc]].

### 🔴 Và con số "12 chỗ" của mình cũng sai — thật ra là **29**

Báo cáo impact ban đầu đếm **12**. Sửa xong rồi quét lại thì ra **29**.

Nguyên nhân: phép đếm dùng mẫu `eleven year old` — **số ít**. Sáu chỗ viết `eleven **years** old`, và chúng **không khớp**, nên không vào danh sách. Ba trong số đó nằm ở Ch7, hai ở Ch4.

⚠️ **Lần thứ hai trong một ngày một phép đo của mình hẹp hơn thứ cần đo**, và cùng lớp với `L41`: **mẫu khớp chuỗi, thứ cần tìm là họ.** Ở L41 là cụm cấm; ở đây là một con số có hai dạng số ít / số nhiều.

### ✅ Cái bẫy đã tránh được

`brat-ch6` có **ba** chỗ *"eleven"* nói về [[elena]], và con bé **đúng là mười một**. Một lệnh thay thế toàn cục sẽ phá nhân vật ấy trong im lặng. Đã sửa **từng chỗ theo chủ ngữ**.

Hai chỗ giữ nguyên có chủ đích: `p2-ch1.md` và `_doi-chung/20260916-p2-ch1.md` — đó là **sổ đọc nguồn ghi lại chính con số 11 và đánh dấu nó không khớp**. Bằng chứng, không phải lỗi.

### 🔴 Và quét lại làm lộ thêm MỘT LỖI check-continuity của mình đã bỏ sót

[[child-ch1-chapter-ban-20260925]] viết, hai chỗ:

> *"Tomoko came through that door **ten years ago** with a **nine year old** and a bag…"*

[[tomoko]] ghi thẳng: bà chạy trốn **đang mang thai nặng**, Masatsugu bế **Akiko còn chập chững**, và **[[shouichi]] sinh ra trên đường chạy**. Nhà Irie tới Namimori **tháng Một 1992** — cùng tháng Tsuna sinh, tức **tám năm trước**, không phải mười.

*(Và note ấy còn tự cảnh báo rằng con số "khoảng mười năm" ở P2 Ch1 **không khớp** — cùng họ với con số 11 của Kyouya.)*

⚠️ **Cùng gốc với H1**: viết thuộc tính nhân vật **từ trí nhớ**. Đã sửa cả hai chỗ, và bản sửa mạnh hơn bản cũ — bà đến với một đứa mới biết đi và một đứa **chưa sinh**.

### Cổng sau khi sửa

| | |
|---|---|
| `chapter_gate` | Ch5 · Ch6 · Ch7 · Child Ch1 — **10/10 cả bốn**, luật cứng sạch |
| `vault_doctor --include-fiction` | **952 note, 0 lỗi** |

🔴 **Còn mở:** H2 *(Musashi 75 → 74)* · M1 *(luật từ vựng chưa phủ chức của chính Tsuna)* · M2 *(frontmatter L39)* · M3 *(tuổi Gen'ichi vào delta)*.
