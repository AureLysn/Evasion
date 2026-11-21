---
id: info.EMB.20261001-soat-nen-du-kien
type: info
scope: project
lane: personal
project: EMB
canon_layer: user_canon
status: active
aliases: ["soat nen du kien 01/10", "check-conflicts lam lai lan ba", "audit EMB sau khi luu tru tam chuong", "du kien sot tu van xuoi da bo", "Kyoya hay Kyouya", "diem danh nhan vat khung nam arc"]
related: [ "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main|aurel-main]]", "[[truc-chinh]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/characters/tsuna|tsuna]]", "[[natsu]]", "[[kyouya]]", "[[shouichi]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/hard-rules|hard-rules]]", "[[EMB]]"]
source:
  type: inference
  ref: "check-conflicts Mode 3, 01/10/2026, sau khi luu tru tam chuong. Do bang script chi doc tren 289 note cua project va tren van ban hai file HTML o personal-bulk:fiction-sources/EMB/raw/original-fic (44.140 tu ca ghi chu). KHONG doc lai tung fact doi voi nguyen tac: viec ay la cua nam so 15-16/09 trong _doi-chung."
authority: ai
confidence: 0.8
always_load: false
load_for: [planner]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-01
---

# Soát nền dữ kiện — sau khi lưu trữ tám chương

> Bước 2 của emb-lam-lai-lan-ba. Aurel tick lý do *nền dữ kiện* nhưng **không chỉ chỗ nghi cụ thể**, nên lượt này đo ba thứ máy đo được: dữ kiện **sót lại** từ văn xuôi đã bỏ, chỗ note **lệch nguyên tác**, và hai lời chê của Aurel *(quên nhân vật · Tsuna thiên buồn)* **nằm ở tầng nào**.
>
> ⛔ **Chỉ báo cáo.** Không note nào bị sửa. Mỗi mục kết bằng lựa chọn cho Aurel.

## Giới hạn của lượt này

- **Không đọc lại từng fact đối với nguyên tác.** Bằng chứng cho việc ấy vẫn là năm sổ 15–16/09 trong `_doi-chung/`, do AI chạy. Bất biến 5: đó là kết luận của một lượt AI, không phải bằng chứng. Nếu Aurel nghi một fact cụ thể thì phải kiểm riêng fact ấy.
- Phép đếm tên dùng **khớp chữ**, không hiểu nghĩa: *"bà"* thay cho Musashi thì không đếm được.

## 🔴 K1 — tên nhân vật viết **khác chính tả của tác giả**

```
CONFLICT
Existing : "Kyouya" · "Shouichi"   [ai]            8 chương đã lưu trữ: Kyouya ×78, Kyoya ×0 · Shouichi ×27, Shoichi ×0
New      : "Kyoya"  · "Shoichi"    [fic_explicit]  thân truyện: Kyoya ×36 · Shoichi ×6
Precedence: fic_explicit > ai  =>  chính tả của tác giả
```

Dạng *Kyouya* và *Shouichi* có trong file nguồn đúng **4 lần**, cả bốn nằm trong **dòng tag AO3** *(tên chuẩn của kho tag)*, không lần nào trong thân truyện.

**IMPACT**

- `style/hard-rules` · `style/targets` · `style/signature`: **không có luật chính tả tên** nào, nên `chapter_gate` không bắt được.
- [[shouichi]]: `aliases` **không có** *Shoichi* ⇒ tra theo chính tả của tác giả thì note này vô hình *(bất biến 10)*. [[kyouya]] đã có alias *Kyoya*.
- Mọi chương sắp viết. Tên file note **không cần đổi**.

**OPTIONS:** [Theo tác giả: thêm luật cứng *Kyoya · Shoichi* vào `hard-rules` và khối `gate:`, thêm alias] · [Giữ chính tả fandom như một lựa chọn của nhánh, ghi vào `aurel-main`] · [Quét nốt mọi tên riêng khác trước khi quyết]

## 🔴 K2 — *Tsuna thiên buồn*: note nhân vật **khớp nguồn**; cái lệch nằm ở **khung**

Ba lớp, xếp theo ngày:

| Lớp | Nói gì | Tầng |
|---|---|---|
| Nguyên tác | tác giả tự gọi giọng mình *semi-humorous*; [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/characters/tsuna\|tsuna]] mục *Tính cách* trích: **giễu cợt, hài khô, cắt ngang khoảnh khắc nghiêm trọng bằng trò đùa** | `original_author` |
| khung-nam-arc, duyệt 17/09 | hàng **Xả** và **Bóng Decimo** của năm arc: *biết mà chưa làm gì* · *Nana và Iemitsu rời đi lần nữa* · *không kế hoạch nào dành cho mẹ mình* · *cậu không tính mình vào kế hoạch của chính mình* · *bị người tạo ra Decimo nhìn như người lạ* | AI dựng, `user` duyệt |
| Lời Aurel **sau** khung | 19/09: Tsunayoshi là *"cậu bé hiền lành, lương thiện, cứng đầu, có chút vụng về"* · 19/09: *học tin tưởng, tự tin, bốc đồng* · 22/09: arc Child *"thiên về hoạt bát"*, Tsuna *tự tin và gây rối* | `user` |

```
CONFLICT
Existing : mỗi arc xả bằng một mất mát hoặc một việc cậu không làm được   [user duyệt 17/09]  khung-nam-arc
New      : hiền lành, cứng đầu, bốc đồng, hoạt bát, gây rối               [user, 19–22/09]    ba decision
Precedence: cùng tầng user  =>  DỪNG, Aurel quyết
```

Năm dòng *Xả* không sai từng dòng; cộng lại thì **arc nào cũng đóng ở chỗ cậu thua một thứ**, và không dòng nào trong khung ghi **chỗ cậu đùa**. Ba lời sau của Aurel chưa bao giờ được chép ngược lên khung: chúng nằm ở ba decision, hai trong số đó vừa mở lại *([[q-xuong-song-brat]] · [[q-bermuda-an-toi]])*.

**IMPACT:** khung-nam-arc năm hàng *Xả* và năm hàng *Bóng Decimo* · [[truc-chinh]] *(16/08, chưa sửa lần nào từ đó)* · luận đề *"fix-it cho tất cả trừ chính người đang sửa"* trong [[EMB]] và [[gia-thuyet-aurel]] · mọi dàn ý dựng trên khung.

**OPTIONS:** [Sửa khung ở bước 3: thêm một hàng **Giọng** cho từng arc từ ba lời 19–22/09, và soát lại từng dòng *Xả*] · [Giữ khung, chỉ thêm hàng Giọng] · [Mở lại luận đề]

## 🔴 K3 — *thường quên nhân vật*: note **có đủ**; khung **không gọi tên họ**

Số lần khung-nam-arc nhắc tên, cạnh số lần tác giả nhắc trong thân truyện:

| | Khung | Nguyên tác | | | Khung | Nguyên tác |
|---|---|---|---|---|---|---|
| **Musashi** | **0** | 129 | | Kyoya | 19 | 38 |
| **Maro** | **0** | 13 | | Reborn | 12 | 37 |
| **Ayame** | **0** | 7 | | Tsunashige | 12 | 7 |
| **Mukuro** | **0** | 6 | | Iemitsu | 11 | 104 |
| **Kazuki** | **0** | 4 | | Xanxus | 9 | 4 |
| **Nagi** | **1** | 17 | | Nana | 9 | 69 |
| **Tomoko** | **2** | 46 | | Kawahira | 6 | 82 |
| Indra | 5 | 64 | | Kimiko | 6 | 37 |

Người được tác giả nhắc nhiều nhất cả truyện, **Musashi**, không có mặt trong khung. Cả **nhà Sawada và ngôi đền** *(Musashi, Maro, Ayame, Nagi, Kazuki)* gần như vắng. Khung dựng quanh **sự kiện và tag AO3**, nên ai có tag *(Xanxus, Reborn, Tsunashige)* thì có chỗ, ai sống cùng nhà với Tsuna thì không. Mọi dàn ý chương đi xuống từ khung đều thừa hưởng lỗ ấy.

Đây không phải xung đột dữ kiện. Nó là **số đo** cho lời chê, và là việc của bước 3.

**OPTIONS:** [Bước 3 thêm vào khung một bảng *ai ở Namimori, mỗi arc họ đổi gì*] · [Để khung nguyên, đưa điểm danh xuống từng dàn ý chương]

## 🟠 K4 — dữ kiện sinh từ văn xuôi đã bỏ, **còn sống** trong note

| Thứ còn lại | Ở đâu | Gốc | Cần Aurel |
|---|---|---|---|
| Tên con cáo **Tomoshibi** *(0 lần trong nguyên tác)* | [[natsu]] *(alias và thân)* · [[tsuna--natsu]] · [[chi-chu-nhan-thay-cao]] · [[bermuda]] · [[mammon]] · [[emb-chot-cap-song-sinh]] · [[emb-chot-may-nhan-loi-sky]] | đặt ở Brat Ch3 đã lưu trữ | giữ cái tên, hay để bản mới đặt lại |
| [[tsuna--natsu]] | cả note | `source.ref`: *dựng khi finalize brat-ch3* | xếp ở hàng *giữ* của danh sách A; chỗ dựa là văn xuôi đã bỏ |
| [[chi-chu-nhan-thay-cao]] | cả note | dân gian *(kudagitsune)* + *lên trang ở brat-ch3*; `authority: ai`, 0,8 | như trên |
| Ngoại lệ **forbid #7** cho ba sự kiện Child | [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main\|aurel-main]] dòng 79 | chốt 25/09 trên dàn ý Child đã lưu trữ; năm cổng nay là q-child-nam-cong | giữ ngoại lệ, hay rút cho tới khi có dàn ý Child mới |
| Ví dụ trích chương đã bỏ | [[fact-tap-quan-doi-voi-tung-he-lua]] · [[fact-cloud-ben-bi-cach-ly-la-xa-hoi]] · [[fact-cham-lua-thu-tuong-thich]] · [[fact-vendicare-giu-so]] | **luật** là lời Aurel 20/09 *(`user_input`)*; chỉ **ví dụ** là văn xuôi | không cần quyết: luật đứng, ví dụ nên đánh dấu *đã lưu trữ* |

✅ Sạch: *Elena · Ishii · Kaneko · Maizuru* không còn ở note sống nào ngoài mục đã gạch.

## 🟡 K5 — link sống trỏ vào note chết

**84 note sống** còn link tới note `superseded` hoặc file đã lưu trữ, ngoài các mục đã gạch. Đích bị trỏ nhiều nhất: `dot7-quyet-dinh` ×14 *(chết từ 15/09)* · `brat-dan-y` ×11 · `emb-chot-tuyen-varia` ×9 · `brat-ch2-chapter` ×7 · `nagi-khong-biet-chuyen-cha-me` ×6.

Phần lớn là `related:` và câu dẫn nguồn, vô hại. Chỗ đáng sửa vì **planner đọc trực tiếp**: khung-nam-arc *(4 đích: hai dàn ý, hai decision)* · [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main|aurel-main]] *(3)* · 8 note `canon/` · 2 note `secrets/`.

**OPTIONS:** [Sửa 15 note planner đọc; phần còn lại để nguyên] · [Để nguyên cả, luật *bỏ qua mục ⛔* là đủ]

## ✅ Đã kiểm, không có gì

- **32 note sống** có `last_updated` trước 15/09. 27 cái là note của Aurel, nguồn, MOC và quy ước. 5 cái là fact và event về Kimiko và Giotto; cả năm **có tên trong sổ** [[20260916-p2-ch2]] *(K10, M6, M22)*, tức đã qua lượt trích lại, chỉ là `last_updated` không được nâng.
- **Thuật ngữ trong `gate:`** *(Akizuki, Hoshikuzu, Gen'ei, Getsufuji, Honō, Tenmei)*: đều có trong nguyên tác.
- **`canon/` · `events/` · `secrets/`** dựa trên suy luận hoặc `authority: ai`: chỉ ba note, đều đã nêu ở K4 hoặc là note vận hành.
- **Nhân vật có trong nguyên tác mà không có note riêng:** Timoteo *(14 lần; có event)* · Lambo *(5)* · Hayato *(3)* · Takeshi *(4)* · Talbot · Lavinia. Đều nằm trong [[fact-bang-tinh-hinh-ke-hoach]]. Không chặn Brat.

## ✅ Aurel chọn — 01/10/2026

> *"giữ chính tả fandom, mình đang nghĩ vẫn để natsu nhưng là một nghĩa khác, sửa note"*

| Mục | Chọn | Đã làm |
|---|---|---|
| **K1** | **giữ chính tả fandom** | [[emb-chot-chinh-ta-ten]] · mục 6 của [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/hard-rules\|hard-rules]] · alias *Shoichi* vào [[shouichi]]. Cổng **không** kiểm, có lý do ghi trong decision |
| **K4** tên con cáo | *đang nghĩ*: **giữ Natsu, nghĩa khác** | chưa chốt ⇒ [[q-ten-con-cao]], kèm danh sách chỗ sẽ sửa. **Chưa sửa** *Tomoshibi* ở note nào |
| **K4** ngoại lệ forbid #7 | *chưa trả lời* | để nguyên trong [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main\|aurel-main]], link đã đánh ⛔ |
| **K5** | **sửa note** | 36 link chết trong 15 note planner đọc mang dấu ⛔ ngay sau link. `related:` trong frontmatter để nguyên |
| **K2 · K3** | sang bước 3 | — |

## Việc kế tiếp

Bước 3: soát khung-nam-arc theo K2 *(giọng)* và K3 *(điểm danh)*. Còn treo: nghĩa của tên con cáo, và ngoại lệ forbid #7.
