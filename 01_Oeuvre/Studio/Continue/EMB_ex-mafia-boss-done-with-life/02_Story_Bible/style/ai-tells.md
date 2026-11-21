---
id: style.EMB.ai-tells
type: style
scope: project
lane: personal
project: EMB
canon_layer: project_locked
status: active
strength: hard
aliases: ["ai tells", "ai_tells", "giong AI", "tat AI", "chong giong Claude", "van phong AI", "sao rong"]
related: ["[[signature]]", "[[hard-rules]]", "[[targets]]"]
always_load: true
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
legacy_tags: [style, guard, measured]
# 17/09/2026: bo ba cham ascii khoi forbid_chars vi tac gia dung o ca 5/5 chuong. Xem hard-rules luat 2.
forbid_chars: ["—", "–"]
targets:
  long_sentence_pct_max: 9
  question_per_10k_min: 30
  exclam_per_10k_min: 5
  italic_per_10k_min: 60
  not_fragment_per_10k_max: 2
gate:
  # Moc nen DO LAI 17/09/2026 tu personal-bulk:fiction-sources/EMB/raw/original-fic/: 5 than chuong, 37.391 tu,
  # bang chinh ham measure() cua chapter_gate.py. Ban 15/08 do tren 43.152 tu co lan ghi chu.
  # Nguyen tac hieu chinh: nguong target phai de it nhat 4/5 chuong tac gia dat — xem targets.md.
  # Truoc 21/08/2026 nhung so nay hardcode trong chapter_gate.py — nen cong kiem
  # do MOI truyen bang giong cua EMB. Nay moi truyen tu khai moc nen cua minh.
  # author = ca 5 chuong. Part 2 (nhanh noi tu day): q10k 64.7, long 3.1, term1k 14.46, thoai 20.9%
  author:
    words: 7551
    sent_median: 11
    long_pct: 4.0
    para_mean: 36.1
    q10k: 49.8
    excl10k: 13.2
    ital10k: 109.1
    ell10k: 23.3
    term1k: 13.19
    had10k: 166.3
  targets:
    words_min: 8000
    words_max: 13000
    sent_median_min: 10
    sent_median_max: 14
    long_pct_max: 9
    para_mean_min: 30
    para_mean_max: 40
    q10k_min: 30
    excl10k_min: 5
    ital10k_min: 60
    ell10k_min: 12
    term1k_min: 7
    had10k_max: 210
  # chapter_gate khop CO phan biet hoa thuong: ten nguyen to viet hoa an toan, nhung phai liet ke rieng flame/flames viet thuong
  terms: [Flame, Flames, flame, flames, Fire, "Honō", Kotei, Kohaku, kohaku, Tenmei, Amatsumi, Ketsueki, Kogyoku, Tatsuran, Yasuragi, Seigyoku, Shigure, Seiran, Chiyu, "Ōgyoku", Taiyou, Terumi, Hogo, Ryokugyoku, Rokugyoku, Raiga, Mirai, Getsufuji, Shimizuakira, Akizuki, Kaguya, "Gen'ei", Ruri, Rui, Ruriko, Weaver, Amakakeru, Hoshikuzu, Eienzakuramura, Amenokagami, Shinkyo, kokoshi, hakukoshi, Sanctuary, sanctuary, crux, soulscape, "neutral core", Harmony, Arcobaleno, arcobaleno, Tri-Ni-Sette, pacifier, Sky, Rain, Cloud, Mist, Storm, Lightning, Sun]
last_updated: 2026-11-21
---

# Tật AI — đo từ **cả 6 chương** so với 43.152 từ nguyên tác

> 🔁 **17/09/2026 — ngưỡng trong frontmatter đã đo lại từ nguồn thô** *(5 thân chương, 37.391 từ)*. Thân bài dưới đây là **phân tích lịch sử** của sáu chương bản v3 *(note đã xóa 21/11/2026)* so với **mốc cũ**; giữ nguyên làm bằng chứng. Số tác giả hiện hành: [[targets]] · [[signature]].
>
> 🔴 Chạy cổng này lên **chính năm chương gốc** với ngưỡng cũ thì **cả năm thoát mã 2** — `...` bị cấm trong khi tác giả dùng nó ở cả năm chương. Đã sửa: bỏ `...` khỏi `forbid_chars`, hạ `!` từ sàn 6 xuống 5, trung vị câu từ 11–15 về 10–14.

> Cổng kiểm: `python3 System/scripts/ai_tells_check.py --chapter <file> --project Studio/Continue/EMB_ex-mafia-boss-done-with-life`

## Phát hiện chính — và nó không phải cái mình tưởng

**Luật cấm thì được tuân. Tính chất được mô tả thì mất.**

`HOSO-KOHAKU.md` §3.3 đã ghi in đậm: *"**KHÔNG dùng em dash (—)** — 0/0 lượt toàn bộ 2 file… **Tuyệt đối không dùng em dash khi viết tiếp.**"*

Đo lại **phần văn** của cả 6 chương: **em dash = 0. `--` = 0.** Luật được tuân tuyệt đối.

Nhưng cùng file đó, §3.3 cũng viết: *"Chấm lửng (…): 107 lượt — **công cụ chính** cho bỏ lửng/hồi hộp"*. Đo được: **AI dùng `…` đúng 0 lần** trong 48.028 từ.

Cùng một mục, cùng một trang, cùng độ chi tiết. Cái viết dưới dạng **cấm** thì giữ được; cái viết dưới dạng **mô tả** thì biến mất.

Đây là câu trả lời cho câu hỏi "làm sao sửa": **không phải thêm điều cấm** — điều cấm đã hoạt động rồi. Mà là **biến các tính chất tích cực thành sàn số đo được**.

## Bảng đo — 6 chương, chỉ phần văn

| | tác giả | Ch3 | Ch4 | Ch5 | Ch6 | Ch7 | Ch8 |
|---|---|---|---|---|---|---|---|
| số từ | — | 8.076 | 8.176 | 8.224 | 7.983 | 7.786 | 7.783 |
| câu trung vị | **12** | 13 | 14 | 13 | 13 | **22** | 16 |
| câu dài ≥35 từ | **5,9 %** | 14,0 | 18,2 | 16,4 | 15,3 | **29,7** | 21,3 |
| `?` /10k | **46,6** | **6,2** | 18,3 | 20,7 | 16,3 | 15,4 | 14,1 |
| `!` /10k | **12,7** | **0** | **0** | **0** | **0** | **0** | **0** |
| *italic* /10k | **91,8** | 78,0 | 57,5 | 58,4 | 50,1 | **16,7** | 23,1 |
| `…` | **88** | **0** | **0** | **0** | **0** | **0** | **0** |
| `Not X.` cụt | ~0 | 11 | 12 | 6 | 6 | 0 | 5 |

## Ba lệch thật, xếp theo mức nghiêm trọng

### 1. Dấu chấm than biến mất hoàn toàn

Tác giả: **12,7 /10k**. AI: **0 trên cả sáu chương, 48.028 từ**.

Không phải ít. Là **không có lần nào**. Đây gần như chắc chắn là nguyên nhân chính của cảm giác "giọng Claude" — giọng trợ lý AI là giọng điềm đạm, không reo lên. Nguyên tác thì tác giả tự gọi là *"semi-humorous style"*.

### 2. Sai ký tự chấm lửng, và dùng ít hơn 9 lần

| | tác giả | AI |
|---|---|---|
| `…` ký tự đơn | 88 | **0** |
| `...` ba dấu chấm | 21 | 13 |
| tổng /10k | **25,3** | **2,7** |

Hai lỗi chồng nhau: **dùng sai ký tự**, và **dùng ít hơn 9 lần**. Với tác giả này chấm lửng là công cụ ngắt nhịp chính (thay vai trò em dash ở tác giả khác) — mất nó là mất nhịp.

### 3. Câu hỏi ít hơn 2–7 lần, câu dài nhiều gấp 3–5

`?` tác giả 46,6/10k; AI từ 6,2 (Ch3) đến 20,7 (Ch5). Câu dài ≥35 từ: tác giả 5,9 %; AI 14,0–29,7 %.

Ghép ba mục lại ra đúng một chân dung: **văn AI trầm hơn, dài hơi hơn, ít hỏi hơn, không bao giờ reo.**

## Cấu trúc — `not_fragment` vẫn là tật thật

40 lần trên 6 chương = **8,3 /10k**. Nguyên tác: 1 lần trên 43k từ.

**AI:** *Not far.* · *Not away.* · *Not fear.* · *Not danger.* · *Not a warning.* · *Not a shove.*

⚠️ **Phân biệt quan trọng.** Tác giả **có** dùng câu cực ngắn — §3.3 đếm được **85 lượt** ≤3 từ: *"Fantastic."* · *"Not. Ideal."* · *"Case closed."*

Cùng độ dài, **ngược chức năng**:

| | tác giả | AI |
|---|---|---|
| dùng để | **đá một nhịp hài / chốt hạ** | **đính chính một khái niệm** |
| ví dụ | *"Case closed."* | *"Not danger."* → rồi câu sau giải thích nó thật ra là gì |

Câu ngắn không bị cấm — nó là chữ ký của tác giả. Cái bị cấm là nhịp **"Not X. It was Y."**: phủ định một hai chữ rồi sửa lại. Đó là nhịp **giảng bài về cảm xúc thay vì kể**.

Cấu trúc khác chỉ có ở AI, nguyên tác 0: `the way you/one <v>` · `the specific <n> of` · `for a long moment` · `not X so much as Y` · `Nobody said anything` · `no word for it` · `, technically`.

## 🔴 Tật nặng nhất chưa từng bị bắt — **"on the record"**

Aurel bắt được: *"mình không thích cụm 'và tôi muốn điều đó được ghi lại'… cảm giác nó xuất hiện khá nhiều, kể cả trong các lần thử trước đây, và nó hơi kì lạ."*

Đếm ra thì **6 lần / 7 chương**, và **nguyên tác 0**:

| Chương | Ai nói | Câu |
|---|---|---|
| Ch3 | [[maro]] | *"I would like it noted for whatever record you people keep about me…"* |
| Ch4 | [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/characters/kawahira\|kawahira]] | *"I want that on the record."* |
| Ch5 | [[indra]] | *"which I would like on the record as the single most tedious investigation…"* |
| Ch6 | *(ghi chú người viết)* | *"I would like it on record that canon gave us…"* |
| Ch7 | [[musashi]] | *"and I want this on the record, the colour purple"* |
| P3-Ch1 | [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/characters/tsuna\|tsuna]] | *"and I want that on the record."* |

🔴 **Vì sao nó "kì kì" — và đây là chỗ quan trọng.**

Nó không phải một cụm từ vụng. Nó là **một cấu trúc đùa** — nhân vật đang bực, và thay vì bực thẳng thì họ *nộp đơn khiếu nại một cách trang trọng*. Cấu trúc đó **buồn cười đúng một lần**.

⚠️ Nhưng nó được gán cho **năm nhân vật khác nhau**: Maro, Kawahira, Indra, Musashi, Tsuna. Nghĩa là nó **không phải giọng của ai cả** — nó là **giọng của mình rò rỉ vào tất cả họ**. Đó chính là cái Aurel cảm thấy: không phải "câu này dở", mà là **năm người bỗng nghe giống nhau**.

→ Đây là loại tật nguy hiểm hơn `Not X.` nhiều. `Not X.` là lỗi nhịp, sửa một chỗ là xong. Cái này **làm phẳng dàn nhân vật**, và nó lại **có vẻ hay** nên không tự báo lỗi.

### Luật

1. 🔴 **Cấm hẳn**: `on the record` · `for the record` · `I would like it noted` · `let it be noted` · `on record`
2. **Và cấm cả họ hàng của nó** — bất kỳ cách nào nhân vật *đăng ký chính thức một lời phàn nàn*: `I want it minuted` · `note that I object` · `I am registering a complaint` · `duly noted`
3. ⚠️ **Luật rộng hơn, khó kiểm bằng script:** một cấu trúc đùa **chỉ được thuộc về một nhân vật**. Nếu hai người dùng cùng một kiểu đùa mà không phải cố ý nhại nhau, thì một trong hai người đang bị mượn giọng
4. Thay bằng gì: **để họ bực theo cách riêng.** Maro chửi. Indra nói một câu ngắn rồi thôi. Musashi nói mát. Kawahira đổi chủ đề. Tsuna **nhận thua** — cậu vốn không tự vệ

⚠️ Tật này lọt qua **bảy vòng đo** vì mọi cổng kiểm hiện có đều đếm **ký tự và độ dài**, không cái nào đếm **cụm lặp qua các chương**. Cần thêm một kiểm: n-gram 4–6 chữ xuất hiện ở **≥2 chương** mà nguyên tác **0 lần**.

## Chương 7 trôi xa nhất — và trôi theo hướng khác

Ch7 vỡ mọi chỉ số nhưng **không có `Not X.` nào**. Nó không mắc tật cụm từ; nó trôi ở tầng câu: trung vị **22 từ** (tác giả 12), câu dài **29,7 %** (tác giả 5,9), italic tụt còn **16,7** (tác giả 91,8).

Ch7 là chương "lễ Hoà hợp Cloud" — chương nghi lễ, nhiều lore. Đúng loại cảnh kéo văn sang nghị luận. Sửa trước nếu phải chọn một.

## ⚠️ Đính chính — ba điều mình báo sai ở turn trước

1. **"AI thêm 58 dấu gạch ngang"** — **SAI**. Mình đếm cả phần *Ghi chú của người viết tiếp* bằng tiếng Việt ở cuối file, và đếm cả dòng `---` phân cảnh markdown. Trong phần văn: **em dash 0, `--` 0**. Luật cũ được tuân.
2. **"AI lạm dụng italic 4,8 lần"** — **SAI**, ngược lại. Tác giả 91,8/10k, AI 16,7–78,0. AI dùng **thiếu**.
3. **"Chương AI dài gần gấp đôi nguyên tác"** — **SAI**. Mình lấy 18.661 ÷ 4 chương của Part 1, trong đó có một chương 60 từ chỉ là thông báo. Số đúng (theo `HOSO` §3.2): trung bình **≈7.968 từ/chương**, Part 2 lên tới 12.960. Chương AI 7.783–8.331 từ nằm **đúng khoảng**, thậm chí hơi ngắn.

Cả ba đều do đo trên văn bản chưa làm sạch. Đã sửa `strip_meta()` trong công cụ.

## Chưa làm

- Chưa đo ba project tiếng Việt (BTWID · PCA · Phản phái chiến tranh) — cần bảng tật riêng cho tiếng Việt
- Chưa nối vào verify gate của skill `write-chapter`
- Chưa đo: tỉ lệ thoại (tác giả 23,3 % trung bình, xu hướng tăng), động từ dẫn thoại, footnote (Part 2 dày: 55/2 chương)

---

> **Nguồn gốc.** Nguyên văn từ [[ai-tells]] (15–16/08/2026). Thân bài **không sửa một chữ** — đây là số đo, sửa là làm hỏng bằng chứng. Frontmatter đổi: thêm `lane: personal`, thêm `strength: hard`, `tags` đổi sang 4 trục taxonomy ([[_TAXONOMY-MOC]]) và giữ bản cũ ở `legacy_tags`. Nhật ký: (đợt chuyển tháng 08/2026).
