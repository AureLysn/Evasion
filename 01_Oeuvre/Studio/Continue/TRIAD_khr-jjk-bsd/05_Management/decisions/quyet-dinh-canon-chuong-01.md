---
id: decision.TRIAD.quyet-dinh-canon-chuong-01
type: decision
scope: project
lane: personal
project: TRIAD
canon_layer: project_locked
status: locked
decided_at: 2026-09-12
aliases: ["quyet dinh canon chuong 1", "ban nao la chuong 1", "chuong 1 ban nao chinh thuc", "noi word count target TRIAD"]
related: ["[[TRIAD]]", "[[san-sang-loc]]", "[[chuong-01-aurel-viet-lai]]", "[[chuong-01]]", "[[quyet-dinh-06-09]]"]
source:
  type: user_input
  ref: "Aurel chot truc tiep trong hoi thoai Claude Code, 2026-09-12: noi target, ban aurel-viet-lai la canon, ban cu chuyen superseded"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, p/personal]
legacy_tags: [k/decision]
last_updated: 2026-09-12
---

# Quyết định 12/09/2026 — bản canon của chương 1, và nới `word_count_target`

> Từ thời điểm khoá, đây là sự thật cấp project, ưu tiên cao nhất trong bảng precedence của `TRIAD`.

## Bối cảnh

Chương 1 tồn tại hai bản song song từ 11/09/2026:

| | [[chuong-01]] | [[chuong-01-aurel-viet-lai]] |
|---|---|---|
| Ai viết | AI + Aurel, 02/09/2026 | **Aurel tự viết lại**, 11/09/2026 |
| Số từ (văn xuôi) | 2120 | **3349** |
| Nạp vault | 06/09/2026 | 11/09/2026 |

Không note nào nói bản nào là chính thức; [[san-sang-loc]] và `chapters/_MOC.md` vẫn trỏ bản cũ.

## Quyết định

1. **[[chuong-01-aurel-viet-lai]] là bản canon của chương 1.** Mọi note nhắc "chương 1" trỏ
   vào file này.
2. **[[chuong-01]] chuyển `status: superseded`** + `superseded_by` + `superseded_at: 2026-09-12`.
   **Không xoá** — invariant 3. Nó là mốc đối chiếu để thấy Aurel đã đổi những gì.
3. **`word_count_target` nới từ `"2000-3000"` → `"2000-3500"`** trên bản canon.

## Lý do

Bản canon mới hơn, và quan trọng hơn: **đó là văn của chính Aurel**. Mục tiêu `style/signature.md`
là đo văn phong Aurel, không có nguyên tác để đo — nên chương Aurel tự viết chính là ngữ liệu,
còn bản AI chỉ là bản nháp bắc cầu. Giữ hai bản ngang hàng thì mọi liên kết tới "chương 1" đều
mơ hồ, và có nguy cơ đo nhầm văn AI thành văn Aurel.

Về `word_count_target`: bản canon 3349 từ, vượt trần cũ 3000. Aurel chốt **nới**, không cắt
chương. `"2000-3500"` là nới trần vừa đủ để bản canon nằm trong khoảng và còn dư chỗ.

> Số từ đo **chỉ phần văn xuôi** (từ `# Chương 1` trở đi), không tính frontmatter và khối ghi chú.

> ⚠️ **Đây là nới trần, không phải dời tâm.** Chương 2–8 vẫn nhắm khoảng 2000–3500, **không**
> mặc định phải dài như chương 1. Nếu Aurel muốn chương dài hơn làm chuẩn mới (ví dụ
> `"3000-4000"`), đó là một quyết định khác và phải ghi riêng.

## Ràng buộc kéo theo

- Bản canon vẫn `status: draft` — nó là canon về **nội dung**, chưa chốt về **văn xuôi**.
- **Bộ dấu câu của bản cũ không còn là chuẩn.** Đo 12/09/2026, bản canon vs bản cũ: `——` 1/23 ·
  `【】` 1/5 · `......` 1/6 · `...` 1/2 · `"` thẳng 65/102. Khối "bộ số văn phong tham chiếu"
  từng bị chép sang bản canon đã gỡ khỏi đó (nguyên văn vẫn còn trong [[chuong-01]]).
- **Provenance của bản canon đã sửa.** `source.ref` trước đây chép nguyên của bản cũ, khai là
  "ban nhap dau tien... Aurel + AI" — sai với một file Aurel tự viết. Đúng invariant 5: một file
  trông như bản ghi nhưng nội dung là của cái khác. `confidence` cũng nâng 0.6 → 0.9.
- Quyết định đại từ 06/09/2026 ([[quyet-dinh-06-09]]) **vẫn giữ nguyên**: pháp y nam, thiên sư
  trung tính. Bản canon hiện thực bằng từ khác (`nam nhân`/`hắn` thay vì `ông`) — quyết định
  ràng buộc **giới đại từ**, không ràng buộc từ cụ thể.
