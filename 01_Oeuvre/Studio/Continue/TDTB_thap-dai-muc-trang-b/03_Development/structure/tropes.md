---
id: info.TDTB.tropes
type: info
scope: project
lane: personal
project: TDTB
canon_layer: planned
status: proposed
aliases: ["tropes TDTB", "dinh vi trope TDTB", "ban do trope TDTB", "TDTB dung trope nao", "tang 1 2 3 4 TDTB", "analyze tropes TDTB"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/00_Overview/TDTB|TDTB]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/00_Overview/drop-point|drop-point]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]", "[[nguyen-van-zh-tdtb]]", "[[trang-jjwxc-tdtb]]", "[[trope-fandom-khr]]", "[[abo-omegaverse]]", "[[he-thong-van]]", "[[phan-mary-sue]]", "[[xuyen-viet-cong-luoc-van-nhan-me]]", "[[phan-xuyen-phan-he-thong]]", "[[vo-han-luu]]", "[[qd-tsuna-nay-la-juudaime-tdtb]]", "[[qd-cp-all27-than-tinh-tdtb]]", "[[q-vi-sao-mien-nhiem-hao-quang-tdtb]]", "[[20260927-tra-loi-analyze-tropes]]", "[[qd-co-che-hao-quang-tdtb]]", "[[qd-nguoi-mang-ky-uc-nhu-trong-sinh-tdtb]]", "[[qd-hai-he-thong-khong-lien-quan-tdtb]]", "[[qd-tsuna-xung-dang-duoc-yeu-tdtb]]", "[[qd-dua-dan-nhan-vat-len-tdtb]]"]
source:
  type: inference
  ref: "analyze-tropes 27/09/2026. Tang 1: nguyen van zh ch1-15 + trang JJWXC (tag) + events/hooks TDTB. Tang 2: Database/Fandom/KHR/tropes/trope-fandom-khr (confidence 0.5). Tang 3: Library/genres — abo-omegaverse 0.55, he-thong-van 0.55, phan-mary-sue 0.5, xuyen-viet-cong-luoc-van-nhan-me 0.6, phan-xuyen-phan-he-thong 0.5, vo-han-luu 0.55. hook_ledger.py LOI (khong co chapter_summary) — nhip do tay tu drop-point"
authority: ai
confidence: 0.5
always_load: false
load_for: [planner]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-21
---

# TDTB — trope và cấu trúc, trên bốn tầng

> ⚠️ **Mọi dòng ở bảng tầng 4 là `proposed`.** Skill này **không khoá** vị trí nào. Aurel chốt dòng nào thì dòng đó
> thành một note `decision`, và bảng link sang note ấy.
>
> `confidence: 0.5` = bằng độ tin thấp nhất của các bản đồ mà note này dựa vào (`phan-mary-sue`, `phan-xuyen`, KHR: 0,5).
> Mục nào trong bản đồ mang nhãn `impression` thì **không** được dùng để định vị. Chỗ nào gặp nhãn đó, mình ghi rõ ra.

## Tầng nào đã chạy

| Tầng | Chạy? | Ghi chú |
|---|---|---|
| 1. Tác giả gốc | ✅ một phần | **`hook_ledger.py` lỗi**: TDTB chưa có note `chapter_summary` nào, nên không có trục thời gian. Nhịp **đo tay** từ [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/00_Overview/drop-point\|drop-point]]. Công cụ còn thêm một lỗi in (cp1252 không in được tiếng Việt) |
| 2. Fandom (KHR) | ✅ | [[trope-fandom-khr]] |
| 3. Thể loại | ✅ | 6 bản đồ trong `Library/genres/` |
| 4. Định vị | ✅ | Tất cả `proposed` |

---

## Tầng 1 — 乐博 kể truyện này thế nào

### 1.1 Tag = tác giả tự khai thể loại *(`author_confirmed`)*

JJWXC: `综漫 · 家教 · 打脸 · 爽文 · 轻松`. 文案 có `ABO`. Nhân vật chính 27; phụ `69, 59, 80, 18, R`; khác `鬼灭等`. Ô CP: `??`.
Chỉ có **một phần truyện**, nên không có chênh lệch tag giữa các phần.

**Tag nêu tên nhân vật chưa lên trang — danh sách vai cho những chương chưa viết:**

| Tag | Trên trang ch1–15? | Hook |
|---|---|---|
| **69** (Mukuro) | ❌ chưa xuất hiện | [[h-69-gia-co-phieu-tdtb]] (có câu hứa trong 文案) |
| **18** (Hibari) | ❌ chưa xuất hiện | không có câu hứa trong 文案 — Aurel 27/09: sẽ đưa lên dần, [[qd-dua-dan-nhan-vat-len-tdtb]] |
| 鬼灭等 | ✅ ch4–8, thế giới nhiệm vụ | [[qd-pham-vi-universe-tdtb]] |

⇒ Hibari là vai tác giả hứa trong tag mà không nói sẽ dùng thế nào. ✅ Aurel 27/09: **mọi nhân vật trong tag sẽ lên sân khấu dần**
([[qd-dua-dan-nhan-vat-len-tdtb]]). Thứ tự: `plan-continuation`.

### 1.2 Trope đang dùng — tính **tới ch15**

| Trope | Ở đâu | Cách dùng |
|---|---|---|
| Omega giả Beta | ch3–4: thuốc cường hiệu mua từ cửa hàng hệ thống, bệnh viện ghi beta | **thẳng** (lộ thân phận chưa xảy ra) |
| Mã giáp / thân phận ẩn + 打脸 | ch1: "5 phút đại lão" hạ Yuki trận thứ 100; ch2: Sato kể lại | **thẳng** |
| Show hẹn hò (恋综) | ch3–15 | **bẻ nhẹ**: nhân vật chính vào show vì 50 vạn và **muốn rời sau tập 1** (文案 + ch3–4) |
| Công lược giả + hệ thống (Lộc Dã Tuyết / 0038) | ch2–15 | **bẻ**: xem 1.5 |
| Ký ức kiếp trước | ch8–9, ch12–15 | **đảo**: xem 1.5 |
| Hệ thống nhiệm vụ của nhân vật chính | ch4–8 | **thẳng** theo kiểu 快穿 không công lược; thế giới tồn tại thật (nghiêng về 诸天流) |

### 1.3 Cấu trúc chung

| Kỹ thuật | Ở đâu | Người đọc phải giữ gì |
|---|---|---|
| **Kịch tính trớ trêu** — người đọc biết Tsuna là Omega, nhân vật khác không | từ ch4 | giữ bí mật cùng Tsuna. Mọi cảnh có alpha ở gần đều căng |
| **Nhảy điểm nhìn** (`与此同时` · dòng `……`) | 11/15 chương có cảnh Tsuna vắng mặt ([[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature\|signature]]) | người đọc biết âm mưu của Tuyết, Verde, Kenichi trước Tsuna |
| **Gieo–gặt nhanh** | xem 1.4 | ít phải nhớ lâu |
| **Tương phản giọng**: nghiêm trang xen hài | ch15: ký ức hoa bách hợp ngay cạnh *"beta能让你标记吗大哥！"* | chuyển giọng trong vòng một đoạn |

### 1.4 Nhịp — đo tay, không qua `hook_ledger`

**Khoảng gieo→gặt của 8 mạch đã khép**, theo mục 2 của [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/00_Overview/drop-point|drop-point]]:

| Mạch | Gieo | Gặt | Khoảng |
|---|---|---|---|
| Tsuna thắng Yuki | ch1 | ch1–2 | 0–1 |
| Tuyết chuyển trường | ch1 | ch2 | 1 |
| Tsuna nhận lời show | ch3 | ch4 | 1 |
| Quỷ diệt 2.0 | ch4 | ch8 | 4 |
| Verde gửi ký ức | ch8 | ch9 | 1 |
| Tập Sơ Ngộ | ch9 | ch10 | 1 |
| Yamamoto gặp lại | ch11 | ch13 | 2 |
| Bỏ thuốc Yamamoto | ch14 | ch15 | 1 |

**Trung vị = 1 chương.** 乐博 trả mạch **rất nhanh**. Dài nhất là 4 chương, và đó là cả một nhiệm vụ trọn vẹn.
⇒ Nếu phần viết tiếp giữ một mạch nhỏ qua 5–6 chương, người đọc sẽ thấy lệch giọng.

**6 trong 16 hook có nguồn từ văn bản được gieo ở ch15** (đếm từ `introduced.chapter` của các note hook). Cụm hook dồn ở chương cuối
này là lý do điểm dừng đọc như đang giữa chừng.

Độ dài chương: 2.197–3.911 chữ Hán ([[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]). Số "thay đổi không đảo ngược được" mỗi chương: **chưa đếm**. Việc này cần note
`chapter_summary`, tức là cũng chặn luôn `hook_ledger`.

### 1.5 Tác giả **đã từ chối** gì — mục đắt nhất

Chỉ ghi những gì **đã trả trên trang**. Mạch nào chưa xong thì không tính là bẻ.

| Dựng lên | Kết quả chờ đợi | Chuyện xảy ra | Neo |
|---|---|---|---|
| Tuyết có hệ thống, đạo cụ và hào quang | công lược giả thắng | **Thuốc có tác dụng** (pheromone tăng: *"他的信息素确实在显著提高"*), **hào quang thì không**: *"他竟然无动于衷？"*. Cơ chế: [[qd-co-che-hao-quang-tdtb]] | ch14–15 |
| 0038 quét người quanh Tuyết | hệ thống thấy hết | **0038 không quét ra Tsuna** | ch3, ch13 |
| Yamamoto là mục tiêu S cấp | mục tiêu bị cuốn theo | Yamamoto **vạch mặt** Tuyết: *"如果我拿刚刚你给我喝的那瓶饮料去实验室化验的话"* | ch15 |
| Ký ức kiếp trước được gửi về | nhân vật chính là người nhớ | **Người nhớ là bạn bè; Tsuna không nhớ gì** | ch8–9, 12–15 |

⇒ **Ý của tác giả, đọc được từ trang:** hào quang của công lược giả **không thắng được** những người mang ký ức. ✅ Aurel 27/09
đã chốt lý do: hào quang lấp vào chỗ trống nhận thức, còn ký ức đã lấp đầy chỗ đó ([[qd-co-che-hao-quang-tdtb]]).

> 🔴 Thuốc mị lực **có tác dụng**; chỉ hào quang thất bại.

### 1.6 Nhân vật đổi qua **hé lộ** hay qua **hành động**

| Nhân vật | Cơ chế | Neo |
|---|---|---|
| Tsuna | **hé lộ**: ch4 (là U Linh Omega), ch15 (*"纲吉没有朋友"*) | ch4, ch15 |
| Yamamoto | **hé lộ**: ký ức hoa bách hợp được mở dần | ch12, ch15 |
| Gokudera | **hé lộ** qua ký ức; hành động duy nhất là bay sang Nhật | ch9, ch13 |
| Lộc Dã Tuyết | **hành động** (chuyển trường, bỏ thuốc) nhưng **không đổi** | ch2–15 |

⇒ 乐博 đổi nhân vật **bằng hé lộ**. Một chương viết tiếp mà đổi nhân vật bằng cú hành động lớn sẽ lệch giọng, dù từng câu đều
qua cổng văn phong. Mức tin 0,6: suy từ 4 nhân vật và 15 chương.

---

## Tầng 2 — fandom KHR ([[trope-fandom-khr]], confidence 0,5)

| Mục bản đồ | TDTB | Nhãn của bản đồ |
|---|---|---|
| **2d. Mary Sue cướp chỗ Tsuna rồi bị trả đòn** (反玛丽苏·虐苏) | **kiếp trước** đúng là 2d: Sue cướp Vongola ([[qd-tsuna-nay-la-juudaime-tdtb]]) | `sourced` — snippet |
| Nhịp 3b.3 "Tsuna thấy hậu quả" (*去死吧玛丽苏* dùng Bazooka Mười Năm) | **đảo**: Tsuna **không** thấy; **bạn bè** thấy, qua ký ức Verde gửi | `sourced` — snippet |
| Nhịp 3b.4 "các nhân vật gốc quay lại, **chiếm hữu** Tsuna" | ch12–15: Yamamoto bám Tsuna; 文案 59/80 | `sourced` — snippet; nối sang 追妻火葬场 là `impression` |
| **2e. All27** | [[qd-cp-all27-than-tinh-tdtb]]: thân tình | `sourced` — một blogger, không phải mẫu của fandom |
| Trục D "người bị thay thế biết gì" | Tsuna **không biết** | — |
| Trục B "Tsuna đứng ở đâu" | Tsuna là **đối tượng được yêu** và là người **từng bị thay thế** (kiếp trước) | `sourced` |

**Khoảng lệch giữa tầng 1 và tầng 2, chỗ cần giữ:** fandom thường cho **Tsuna thấy hậu quả** (3b.3). 乐博 cho **người khác** thấy, Tsuna thì mù.
Tính cả kiếp trước theo quyết định của Aurel, đây là điểm TDTB khác dòng 反苏 của KHR.

---

## Tầng 3 — thể loại

### Trục đã đặt / chưa đặt

| Bản đồ · trục | TDTB | Neo |
|---|---|---|
| ABO · C: nhà nước can thiệp | **đặt**: có *"国婚局"* phân phối đối tượng kết hôn cho Omega | ch1 (diễn đàn) |
| ABO · D: công nghệ ức chế | **đặt**: thuốc thường vô dụng với Tsuna; thuốc cường hiệu từ cửa hàng hệ thống | ch4 |
| ABO · E: Beta bị đánh dấu được không | **đặt**: không (Tsuna nghĩ *"beta能让你标记吗"*) | ch15 |
| ABO · G: phân cấp | **đặt**: *"超级omega"*, Yamamoto *"顶级alpha"* | ch4, ch15 |
| ABO · F: nam Omega mang thai | **chưa đặt**. Với all27 thân tình thì **không cần** | — |
| Hệ thống · A: hệ thống là gì | **chưa đặt** | [[q-he-thong-cua-tsuna-tdtb]] · [[q-ban-chat-0038-tdtb]] |
| Hệ thống · B: ai thấy | **đặt**: hai hệ thống không thấy nhau | ch3, ch13 |
| Hệ thống · C/D: kinh tế thưởng, hình phạt | **đặt**: 积分 và cửa hàng; chết trong nhiệm vụ không đau, làm lại được | ch2, ch4, ch5 |
| Hệ thống · F: nhiều hệ thống trong một thế giới | **đặt**: hai ký chủ, hai hệ thống **song song**: khác nghiệp vụ, không biết nhau, **không đối đầu** ([[qd-hai-he-thong-khong-lien-quan-tdtb]]) | ch2–15 |
| Phản Mary Sue · C: **ai tỉnh, vì sao tỉnh** *(trục chịu lực)* | ✅ **đặt 27/09**: ký ức đã lấp đầy chỗ trống mà hào quang cần | [[qd-co-che-hao-quang-tdtb]] |
| Phản Mary Sue · D: dàn nhân vật có nhớ | **đặt** bởi quyết định Aurel: **nhớ**, kể cả thời bị bỏ bùa | [[qd-tsuna-nay-la-juudaime-tdtb]] |
| Phản Mary Sue · E: số phận Sue | **chưa đặt** — mở lại khi reset 21/11/2026 | — |
| Phản Mary Sue · F: góc nhìn | **đặt**: có cảnh riêng của Sue và 0038 | ch14, ch15 |
| Vô hạn lưu | **không dùng**: không có chết thật, thế giới không phải phó bản ([[vo-han-luu]] bảng ranh giới) | ch5 |

### Hai ô trống của bản đồ mà TDTB đang đứng vào

1. **[[phan-mary-sue]] 5g — "dàn nhân vật **nhớ** thời gian bị bỏ bùa"**. Bản đồ **không tìm được tác phẩm nào**, và tự ghi là kiểm tra
   vắng mặt **yếu**. Theo [[qd-ky-uc-verde-gui-rong-tdtb]] + [[qd-tsuna-nay-la-juudaime-tdtb]], người nhận ký ức mang cả quãng thời gian
   họ từng bị Sue mê hoặc. **Đây là chỗ TDTB khác cả thể loại.** Nhãn của ô này là `impression`, nên nó **không** được dùng để khẳng định
   "chưa ai làm". Nó chỉ cho biết chỗ đáng khai thác.
2. [[he-thong-van]] trục F *("hai ký chủ, hai hệ thống độc lập **đối đầu**")* **không** áp dụng: hai hệ thống khác nghiệp vụ và
   không biết nhau ([[qd-hai-he-thong-khong-lien-quan-tdtb]]). TDTB đứng ở dạng **song song**, không có tên trong trục F.

---

## Tầng 4 — định vị *(mọi dòng `proposed`)*

| Trope | Tầng | Cách xử lý đề xuất | Neo | Vì sao | Trạng thái |
|---|---|---|---|---|---|
| Omega giả Beta → lộ (掉马火葬场) | nguồn + ABO 2.1 | **thẳng**: 文案 đã hứa | 文案; ch4 | lời hứa của tác giả | proposed |
| Lộ vì **phát tình / pheromone giữa chỗ đông người** | ABO 2.1 (`sourced` blurb) | **cân nhắc bẻ** | ch15: pheromone Tsuna *"蠢蠢欲动"* | đường lộ mặc định của biến thể này | proposed |
| Đồng thuận mờ do pheromone | ABO sáo mòn #2 | **không áp dụng** | ch15 | Yamamoto chỉ ôm, không có dấu hiệu hành động; Tsuna bị ảnh hưởng bởi **chênh lệch sức mạnh** (áp lực của alpha đỉnh cấp), không phải bởi pheromone — Aurel 27/09 ([[20260927-tra-loi-analyze-tropes]]) | ✅ Aurel |
| Hào quang của Tuyết thắng người mang ký ức | nguồn 1.5 · phản Mary Sue 5d | **tránh** | ch14–15 | tác giả đã từ chối; cơ chế đã chốt | ✅ [[qd-co-che-hao-quang-tdtb]] |
| Dàn nhân vật nhớ thời bị bỏ bùa | phản Mary Sue 5g | **khai thác**: cả nhóm coi như trọng sinh, Tsuna và Jack Sue không biết | quyết định Aurel | ô trống của bản đồ | ✅ [[qd-nguoi-mang-ky-uc-nhu-trong-sinh-tdtb]] |
| Hai hệ thống song song *(không đối đầu)* | hệ thống F | **không đối đầu** | ch2–15 | khác nghiệp vụ, không biết nhau | ✅ [[qd-hai-he-thong-khong-lien-quan-tdtb]] |
| Tsuna không thấy hậu quả; bạn bè thấy | KHR 3b.3 | **giữ đảo** | ch8–15 | khác dòng 反苏 KHR | proposed |
| **Mị lực phải có lý do** *(không phải "kẻ săn Sue thành Sue")* | phản Mary Sue sáo mòn #1 | Tsuna **không săn Sue**; truyện **so sánh** được yêu có lý do (Tsuna) với hào quang (Jack Sue) | 文案 *"新来的嘉宾个个都选我"* | Aurel 27/09 | ✅ [[qd-tsuna-xung-dang-duoc-yeu-tdtb]] |
| Sue là **nam** Omega (Aurel gọi là **Jack Sue**) | phản Mary Sue sáo mòn #2 | **giữ** | bản Trung dùng 他 cho 鹿野雪 | tránh được lời chê "Sue luôn là nữ" | proposed |
| Iemitsu | KHR sáo mòn #5 (`measured` 4/12) | Aurel chốt: Iemitsu là cha; Aurel **không ưa** nhân vật; viết theo giả thuyết của Aurel ([[gia-thuyet-khr-cua-aurel]]) — phê phán **qua hành vi**, không phải bôi xấu một chiều | [[qd-cha-la-iemitsu-tdtb]] | sáo mòn ghi ở bản đồ là **thông tin**, không phải lệnh cấm | ✅ Aurel |
| Hành Tsuna quá tay | KHR sáo mòn #6 (`sourced`) | **canh chừng** | phần phác thảo kiếp trước | chỉ là phác thảo; Aurel quyết. Đừng tự nâng thành bi kịch | proposed |
| Trả mạch nhanh (trung vị 1 chương) | nguồn 1.4 | **giữ** | 8 mạch | lệch nhịp là lệch giọng | proposed |
| Đổi nhân vật bằng hé lộ | nguồn 1.6 | **giữ** | 4 nhân vật | như trên | proposed |

**Sáo mòn bản đồ có ghi mà TDTB đang chạm:** đường lộ thân phận (phát tình nơi đông người), bôi xấu Iemitsu, hành Tsuna quá tay.
Hai sáo mòn *đồng thuận mờ do pheromone* và *kẻ săn Sue thành Sue* **không áp dụng** — bảng trên.
