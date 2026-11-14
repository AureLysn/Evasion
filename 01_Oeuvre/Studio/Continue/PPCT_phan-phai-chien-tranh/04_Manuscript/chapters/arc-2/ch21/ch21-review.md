---
id: review.PPCT.ch21-review
type: info
scope: branch
lane: personal
project: PPCT
branch: aurel-main
arc: arc-2-moi-va-luoi
chapter: 21
canon_layer: user_canon
status: final
aliases: ["review ch21 PPCT", "soat ch21", "check-continuity ch21", "check-style ch21"]
related: ["[[04_Manuscript/chapters/arc-2/ch21/ch21-chapter]]", "[[04_Manuscript/chapters/arc-2/ch21/ch21-plan]]", "[[04_Manuscript/chapters/arc-2/ch19/ch19-chapter]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master|master]]", "[[Kayneth-El-Melloi-Archibald]]"]
source:
  type: inference
  ref: "check-continuity Mode 1 + check-style Mode 2, 20/09/2026, tren ban nhap ch21 (2.425 chu Han)"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-20
---

# Soát chương 21 — 令咒易手

> Chỉ đọc, không sửa. Quyết định sửa hay giữ là của Aurel.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check --chapter ch21 --scene <4 thẻ>` | exit **1** — không khớp được chữ Hán (`L29`); đã grep tay **25 từ khoá**, 0 hit |
| `vault_doctor --include-fiction --zone …/PPCT` | 225 note · **0 lỗi** · 1 cảnh báo cũ (`branches/aurel-main.md`) |

Danh sách grep tay ghi trong `metadata.yaml` → `manual_grep`.

## Bảy nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | 🔴 **#1** |
| Ranh giới tri thức | ✅ sạch — không câu nào gọi đối thủ là Master của Saber; không tổ Caster, không Kirei |
| Trạng thái nhân vật | ✅ Kayneth "còn sống, vẫn là Master" vào chương; Gáe Buidhe chưa bị phá ra chương |
| Luật thế giới | 🟠 **#4** — số lệnh chú |
| Quan hệ / xưng hô | 🟠 **#5** · 🔵 **#6** — không có note `relationships/` nào cho tổ Lancer |
| Canon (gồm `fic_explicit` ch19) | 🟠 **#2** · 🟠 **#3** |
| Hợp đồng nhánh | ✅ không chạm mục `Cấm` |

---

## #1 · 🔴 cao · Timeline — chương đang nằm ở **rạng sáng ngày 5**, không phải **đêm ngày 5**

**Chương:** 「Lancer把自己的御主抱进来的时候，天还没有亮。」 và kết chương 「天快亮了，云层底下露出一条灰白」 · 「远处的铁道上有一列早班的货车开过去」

**Plan (Aurel chốt 20/09):** “| C3 | Thời điểm | ✅ **Đêm ngày 5** — song song với ngày nghỉ của tổ Caster ở ch20 |”

**[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master|master]]:** “| Đêm ngày 4 → **ngày 5**, rạng sáng *(viết tiếp)* | Kayneth tập kích lâu đài Einzbern… | ch19 |”

Chương mở ra khi Lancer **vừa** mang chủ về, trời chưa sáng — tức là nối liền ngay sau ch19, và đóng lại lúc bình minh **cùng ngày 5**. Như vậy toàn bộ ch21 nằm **trước** ch20 trên trục, không song song với nó.

Một câu trong chương đã tự chỉ về hướng ngược lại: 「他想起**昨夜**森林里最后那一幕」 — "昨夜" chỉ đúng nếu đang là đêm ngày 5.

Hai lối đi, Aurel chọn:

- **A — kéo chương về đêm ngày 5:** Sola-Ui chữa xong từ rạng sáng; cảnh giành lệnh chú xảy ra tối hôm đó. Phải sửa mốc mở chương và mốc kết chương (bình minh → khuya/nửa đêm), giữ nguyên 「昨夜」. Đúng với quyết định C3 và giữ ch21 song song ch20.
- **B — giữ rạng sáng ngày 5:** sửa C3 trong plan, thêm dòng timeline "Ngày 5, rạng sáng → sáng sớm", chấp nhận ch21 đứng trước ch20 trên trục (thứ tự kể ≠ thứ tự thời gian). Y học và kịch cũng hợp hơn: Kayneth vừa bị bắn, Sola-Ui chữa ngay.

## #2 · 🟠 vừa · Đảo hướng ánh nhìn so với ch19

**ch19 (`fic_explicit` của bản viết tiếp):** 「Lancer没有追击，也没有开口，只是看了切嗣一眼。那双眼睛里翻涌着什么东西，切嗣没兴趣去分辨。」

**ch21:** 「对方没有追，那双眼睛只在夜色里朝他看了一眼，很短，像在看一件已经用不上的东西，随后就退回黑暗里去了。Lancer到现在也没想明白那一眼。」

Ở ch19, **Lancer** là người nhìn, và người kia không buồn đọc ánh mắt đó. Ở ch21 thành ra người kia nhìn Lancer bằng một ánh mắt khinh, và Lancer còn nghĩ mãi về nó. Không phải bất khả — hai người có thể cùng nhìn nhau — nhưng chi tiết "ánh mắt như nhìn một thứ dùng không được" **không có trong ch19**, và trọng tâm bị lật ngược.

## #3 · 🟠 vừa · Ngọn thương chĩa vào đâu

**ch19:** 「另一只手里那柄**红色**的长枪宝具直直地**指着切嗣的眉心**」

**ch21:** 「把**枪尖横在**那个男人和自己的御主之间，然后把人带走」

Lệch. Đề xuất bám ch19 — và giữ chữ **红色**, vì cả chương này xoay quanh cây **黄**蔷薇; nhắc đúng cây kia một lần làm rõ hai bảo cụ.

## #4 · 🟠 vừa · 「三道令咒」 chưa có nguồn

**ch21:** 「三道红色的纹路在皮肤底下亮着，形状和肯尼斯手背上那三道一模一样。」

**Canon** — [[Kayneth-El-Melloi-Archibald]] bước 1: “Trận hỗn chiến kho cảng: … **dùng lệnh chú ép Lancer đánh Saber cùng Berserker**”.

Nguyên tác PPCT có trận kho cảng (ch4–9) nhưng **không có ghi chép nào** nói Kayneth dùng lệnh chú ở đó — [[do-tham-saber-lancer-kho-cang]] không nhắc, `_crosscheck` không có dòng nào. Vậy:

- theo canon → Kayneth còn **hai**;
- theo im lặng của văn bản → không biết.

Không có chứng cứ cho bên nào. Ba lối: (a) chốt PPCT bỏ lần dùng lệnh chú đó → giữ 三道; (b) sửa thành 两道; (c) viết mờ — bỏ số, chỉ 「令咒」.

## #5 · 🟠 vừa · 「肯尼斯君」 — xưng hô không có nguồn

**ch21:** 「肯尼斯君的未婚妻。」

**Nguyên tác ch6:** 「肯尼斯·艾尔梅洛伊·阿其波卢德，魔术协会时钟塔的十二**君主**（Lord）之一」

Truyện gọi hắn là **君主/Lord**. 「…君」 đọc thành hậu tố *-kun* của tiếng Nhật — sai vai cho một Lord, và một Servant kiểu hiệp sĩ càng không dùng. Thư mục `relationships/` **không có note nào cho tổ Lancer**, nên không có `addressing` để bám; đây là chỗ cần chốt rồi ghi lại. Đề xuất: 「肯尼斯大人」 hoặc 「君主大人」.

## #6 · 🔵 thấp · 「属下」 — cách Lancer tự xưng chưa có căn cứ

**ch21:** 「请让属下守在这里」 · 「属下欠您一条命」

Nguyên tác không có lượt thoại nào của Lancer để đối chiếu. 属下 nghiêng về thuộc cấp trong quân/quan; bản Trung của Fate thường cho Lancer dùng 「在下」. Không phải lỗi canon — là lựa chọn chưa có nguồn, nên chốt một lần cho cả các chương sau.

## #7 · 🟠 vừa · Hệ quả chưa ai đỡ — nước cờ của Dazai ở ch19

**ch19:** 「一个废掉的魔术师，只要**令咒还在手上**，就还是御主。」 · 「只要他还活着，Lancer就还在。」

ch21 lấy lệnh chú **khỏi tay Kayneth**. Nước cờ chưa vỡ — Lancer vẫn đứng vì Sola-Ui giữ khế ước — nhưng câu của Dazai đặt điều kiện đúng vào thứ vừa bị lấy đi.

POV Lancer **không thể** chạm chuyện này, nên đây **không phải lỗi của ch21**. Nó là việc phải ghi vào plan **ch22** (chương có tổ Caster): Dazai hoặc biết và chỉnh lại tính toán, hoặc chưa biết — và chỗ "chưa biết" tự nó là một hook.

## #8 · 🔵 thấp · Máu trên tay Sola-Ui

**ch21:** 「她另一只手上有血，不是她自己的。」

Bẻ ngón tay không đương nhiên làm chảy máu. Không sai, nhưng là chi tiết tự thêm không có trong canon; nếu muốn chặt hơn thì đổi sang dấu vết khác (mồ hôi, tay còn run, vạt áo bị nắm nhàu).

---

# check-style — Mode 2

Đo bằng script đếm chữ Hán trong scratchpad (`style_metrics.py` không đọc được chữ Hán — `L26`; chạy `--write` xong đã ghi đè `metadata.yaml`, mình viết lại bằng số đo tay).

## Bảng chỉ tiêu

| Chỉ số | Chỉ tiêu (dệt canon) | Đo được | |
|---|---|---|---|
| Chữ Hán thân truyện | ≥ 1.500 (plan ~2.300) | **2.425** | ✅ |
| Thoại | 20–40 % | **23,8 %** | ✅ (plan ước ~29 %) |
| Chữ Hán/đoạn TB | 35–55 | **43,3** | ✅ |
| Đoạn ≥ 100 chữ | ≤ 8 % | 3,6 % | ✅ |
| Câu ≥ 50 chữ | ≤ 12 % | 5,8 % | ✅ |
| Câu trung vị | 17–20 | **17** | ✅ sát sàn |
| Câu ≤ 4 chữ | 2,85–5,54/1000 | 3,71 | ✅ |
| Đoạn có thoại | nguyên tác đời thường 63,6–76,9 % | 57,1 % | 🔵 dưới dải, nhưng dải đó đo trên chương **đời thường** |
| Đoạn thoại trơ | 9,1–23,3 % | 21,4 % | ✅ sát trần |
| `？` | ≥ 4/1000 | 4,54 | ✅ |
| `！` | ≥ 1/1000 | 1,24 | ✅ |
| `……` | 0,5–3,5/1000 | 1,24 | ✅ |
| `——` | ≤ 2,5/1000 | 2,06 | ✅ |
| Mật độ thuật ngữ | ≥ 9/1000 | **16,91** | ✅ |
| Motif mắt | ≥ 1 (plan: nên 2–3) | **4** | ✅ |

## Luật cứng

| Luật | |
|---|---|
| §1 thoại trong `“”`, không dùng `「」` | ✅ 0 |
| §2 không kaomoji | ✅ 0 |
| §3 không ngôi một ngoài ngoặc kép | ✅ 0 |
| §4 trích Dazai Osamu có 注 | ✅ không trích |
| §5 tiêu đề `【太纲无差】反派战争21` + dòng đồng nhân | ✅ |
| §6 phân biệt thực thể cùng tên | ✅ |

## Ba nhận xét về giọng

- **S1 · 🔵** — Thoại 23,8 %: trong dải, nhưng thấp hơn ước lượng ~29 % của plan. Nháp đầu 17,7 % đã được kéo lên bằng cách gộp thoại với tag hành động; nếu Aurel muốn chạm 29 %, chỗ tự nhiên nhất là cảnh 1 (Kayneth–Sola-Ui hiện chỉ có 4 lượt).
- **S2 · 🔵** — Câu trung vị **17** đứng đúng ở sàn. Nguyên nhân là cụm đối đáp cụt ở cảnh 3 (「我的御主。」/「在那之前呢？」/「肯尼斯君的未婚妻。」) — cụm đó **cố ý** cụt, nó là nhịp dồn của cảnh. Báo số, không đề nghị sửa.
- **S3 · 🔵** — Mật độ thuật ngữ 16,91/1000, cao gần bằng mức cao nhất của nguyên tác (9,2–16,2). Riêng 御主 chiếm 14/41 lượt. Không phải lỗi — chương này là chương lệnh chú — nhưng nếu thấy dày thì vài chỗ 「御主」 thay bằng đại từ được.

---

## Chỗ mình không chắc

- **#2** có thể bào chữa được: hai người nhìn nhau thì ai cũng "nhìn". Mình xếp 🟠 vì chi tiết *nội dung* của ánh mắt là tự thêm, không vì hướng nhìn.
- **#4** không có chứng cứ nào cho cả hai phía; mình không kết luận PPCT theo canon hay không.

---

# Kết quả sửa — Aurel chốt 20/09/2026, `write-chapter` Mode 3

| # | Aurel chốt | Đã làm |
|---|---|---|
| 1 | **A** — kéo chương về đêm ngày 5 | Mở chương: 「到这一天再一次入夜，她已经在那只货箱边上守了整整一个白天」; việc chữa dời về 「天亮之前」 rồi 「那之后的一整个白天，她一遍一遍把手覆上去」, Kayneth tỉnh 「天黑以后」. Kết chương đổi sang đêm: 「夜还长，云层压得很低，连一颗星都没有漏下来」 · 「云缝里漏下来的一点月色」 · 「夜行货车」. 「昨夜」 giờ đúng nghĩa đen |
| 2 | sửa | 「Lancer只来得及看他一眼——那一眼里翻涌着什么，他自己也说不清；而那个男人连眉毛都没有动一下，像是根本没有在看他」 — trả đúng hướng nhìn của ch19 |
| 3 | sửa | 「一手抱起自己的御主，另一只手把**破魔的红蔷薇**直直地**指在那个男人的眉心上**」 |
| 4 | **giữ 三道** | không đổi. Tức PPCT chốt: Kayneth **không** dùng lệnh chú nào trước ch21 |
| 5 | **肯尼斯大人** | 1 chỗ |
| 6 | **在下** | 4 chỗ (`属下` → `在下`) |
| 7 | — | không đụng ch21; ghi cho plan **ch22** |
| 8 | sửa | 「她另一只手还在抖，袖口被人攥过，皱成一团」 |

**Một chỗ sửa kèm, không nằm trong phát hiện nào:** câu kết cũ cho một chuyến 早班货车 chạy trên 「早就停用的铁道」 ngay cạnh nhà kho — tự mâu thuẫn. Bản sửa đẩy nó ra 「更远的地方，还在用的那条铁道」.

## Số đo sau Mode 3

| Chỉ số | Chỉ tiêu | Trước | Sau |
|---|---|---|---|
| Chữ Hán | ≥1.500 | 2.425 | **2.532** |
| Thoại | 20–40 % | 23,8 % | **22,8 %** |
| Đoạn TB | 35–55 | 43,3 | **45,2** |
| Câu trung vị | 17–20 | 17 | **18** |
| Câu ≤4 chữ | ≤5,5/1000 | 3,71 | **3,55** |
| Đoạn ≥100 chữ | ≤8 % | 3,6 % | 5,4 % |
| `？`·`！`·`——` | ≥4 · ≥1 · ≤2,5 | 4,54·1,24·2,06 | **4,34·1,18·2,37** |
| Thuật ngữ | ≥9/1000 | 16,91 | **16,19** |
| Motif mắt | ≥1 | 4 | **3** |

Cổng sau sửa: grep tay 25 từ khoá → 0 hit · `vault_doctor --include-fiction --zone …/PPCT` → 225 note, **0 lỗi**.

## Còn treo sang `finalize-chapter`

- Ba quyết định #4, #5, #6 là **quy ước dùng lại** cho các chương sau → nên thành `decision` note ở bước đóng chương.
- Dòng timeline cho ch21 (đêm ngày 5) và note nhân vật PPCT cho **Sola-Ui**.
- #7 — ghi vào plan ch22.
