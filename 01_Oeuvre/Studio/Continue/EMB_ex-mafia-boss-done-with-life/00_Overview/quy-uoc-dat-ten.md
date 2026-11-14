---
id: info.EMB.quy-uoc-dat-ten
type: info
scope: project
lane: personal
project: EMB
canon_layer: planned
status: proposed
aliases: ["quy uoc dat ten", "chuan hoa ten file", "naming convention", "dat ten note", "tien to note", "file name standard"]
related: ["[[EMB]]", "[[gap-nhan-vat]]", "[[tai-trong-context]]"]
source:
  type: inference
  ref: "Proposal answering Aurel's request quoted at the top of the note (standardise note names); the note says it awaits Aurel's approval; source block added 2026-11-13 from the note's own text"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [system, proposal]
last_updated: 2026-08-16
---

# Chuẩn hoá tên note — **đề xuất, cần Aurel duyệt**

> Aurel nêu: *"vì đặc điểm cấu trúc của Obsidian, việc chia nhỏ dữ liệu sẽ giúp hỗ trợ rất nhiều, tuy nhiên mình đề nghị chuẩn hoá lại tên cho dễ tìm."*
>
> Đúng. Và có một lý do kỹ thuật nữa: `context_graph.py` tra `--seed` bằng **tên file và alias**. Tên file lộn xộn thì seed gõ sai, và note im lặng không được nạp.

## Hiện trạng — ba kiểu tên đang lẫn nhau

| Kiểu | Ví dụ | Vấn đề |
|---|---|---|
| Có tiền tố loại | `fact-567-ke-hoach` · `rule-ten-sawada` · `hook-dua-tre-saint-exavier` | ✅ tốt — nhìn tên biết loại |
| Không tiền tố | `drop-point` · `namimori` · `tsuna` · `xoa-so-estraneo` | 🟡 chấp nhận được với nhân vật/địa điểm, lẫn với những cái khác |
| Tiền tố tuỳ hứng | `q-so-cua-kyuuto` nhưng `ai-o-sessha` cũng là question | 🔴 **không nhất quán** — cùng loại, hai kiểu tên |
| Hoa/thường lẫn | `Characters/` `Timeline/` viết hoa, `canon/` `hooks/` viết thường | 🔴 gõ seed dễ sai |

## Đề xuất

### 1. Tiền tố theo loại — **bắt buộc cho loại dễ lẫn**

| Loại | Tiền tố | Vì sao |
|---|---|---|
| `fact` | `fact-` | ✅ đang dùng, giữ |
| `rule` | `rule-` | ✅ đang dùng, giữ |
| `hook` | `hook-` | ✅ đang dùng, giữ |
| `question` | `q-` | 🔧 **thống nhất** — hiện chỉ 1/4 note có |
| `secret` | `sec-` | 🔧 thêm — bí mật là loại nguy hiểm nhất khi lẫn |
| `event` | `ev-` | 🔧 thêm |
| `decision` | `dec-` | 🔧 thêm |

**Không đặt tiền tố** cho: `character` · `location` · `organization` · `arc` · `chapter_summary`. Lý do: chúng được gõ như seed thường xuyên nhất, và `tsuna` dễ gõ hơn `char-tsuna`. Thư mục đã phân biệt đủ.

### 2. Thư mục — **toàn bộ chữ thường**

`Characters/` → `characters/` · `Timeline/` → `timeline/`

⚠️ Windows không phân biệt hoa thường nhưng **git thì có**. Đổi tên cần `git mv` hai bước, không đổi trực tiếp.

### 3. Tên file không bao giờ chứa dấu tiếng Việt

Đang tuân rồi. Ghi lại thành luật để khỏi trôi.

### 4. `id` khớp tên file

`fact.EMB.567-ke-hoach` ↔ [[fact-567-ke-hoach]]. `vault_doctor` đã kiểm.

## 🔴 Việc riêng: note đã xong thì phải cắt phần thừa

Aurel chỉ đúng ở [[q-so-cua-kyuuto]]: câu hỏi đã `resolved` nhưng vẫn còn nguyên mục *"Cần Aurel quyết"* dài, mô tả một quyết định **đã có rồi**.

Đây không phải lỗi đặt tên — nó là **rác trạng thái**, và nó nguy hiểm hơn: người đọc lại note tưởng còn phải quyết.

**Luật đề xuất:** khi `status` đổi sang `resolved` / `superseded`, **phần "cần quyết" phải bị thay bằng phần "đã quyết"** trong cùng lần sửa. Không để lần sau.

`vault_doctor` giờ đã bắt được `resolved` mà thiếu `resolved_by`. Nên thêm một kiểm nữa: **`status: resolved` mà thân note còn cụm "cần quyết" / "chưa chốt" → cảnh báo.**

## ⚠️ Chỗ mình không đồng ý với Aurel

Aurel nói về [[kyuuto]]: *"vì nhân vật này không xuất hiện nữa nên file thông tin này có lẽ cũng không cần thiết."*

**Đề nghị giữ note, nhưng đổi mục đích.**

Kyuuto đã mất và không xuất hiện lại — đúng. Nhưng note của ông ghi **luật đặt tên bằng chữ số của dòng tư tế**, và đó là một trong `preserve` của [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/06_Alternate_Versions/branches/aurel-main|aurel-main]]. Xoá note thì luật vẫn còn ở [[rule-ten-sawada]], nhưng **mất ví dụ ngược** — mất chỗ ghi rằng "suy từ âm đọc ra chữ số" đã từng tạo một ràng buộc giả.

Và với đồ thị liên kết, một note không ai đọc **cũng không tốn gì** — nó chỉ được nạp khi có seed trỏ tới. **Chi phí giữ ≈ 0. Chi phí xoá = mất một bài học đã trả giá.**

🔴 Nhưng đây là vault của Aurel. Nếu vẫn muốn gọn, đề nghị **gộp** `kyuuto` vào [[rule-ten-sawada]] thành một mục "ví dụ và ngoại lệ", chứ đừng xoá thẳng.

## Chi phí thực hiện

| Việc | Số file | Rủi ro |
|---|---|---|
| Thêm tiền tố `q-` `sec-` `ev-` `dec-` | ~20 | 🟡 phải sửa mọi wikilink trỏ tới — **làm bằng script, không sửa tay** |
| Thư mục về chữ thường | 2 thư mục | 🟠 `git mv` hai bước |
| Cắt rác trạng thái | ~4 | 🟢 thấp |

⚠️ **Đề nghị làm sau khi đọc lại nguyên tác**, không phải bây giờ. Đổi tên hàng loạt lúc nội dung còn đang thay đổi thì hai việc trộn vào nhau và không truy được cái nào gây lỗi.
