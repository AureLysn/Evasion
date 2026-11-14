---
id: decision.EMB.emb-la-kohaku
type: decision
scope: project
project: EMB
lane: personal
canon_layer: user_canon
status: active
aliases: ["EMB la KOHAKU", "gop ma EMB KOHAKU", "mot ma cho mot tac pham"]
related: ["[[EMB]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/signature|signature]]", "[[EMB-STYLE-MOC]]"]
source:
  type: fic_text
  ref: "Story_Continue/Studio/Continue/EMB_ex-mafia-boss-done-with-life/style/_MOC.md tieu de; style/signature.md truong source.ref; style/targets.md doi chieu DANY-KOHAKU.md; _OEUVRE-MOC.md muc 'Dang cho migrate'"
authority: user
confidence: 1.0
decided: 2026-08-19
always_load: false
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-09-09
---

# Quyết định — `EMB` và `KOHAKU` là **một** tác phẩm, dùng **một** mã: `EMB`

## Câu hỏi

[[_OEUVRE-MOC]] liệt kê `EMB` và `KOHAKU` là hai truyện chờ nhập, và ghi chú:
*"hai mã cho một tác phẩm là hai bộ style, hai bộ canon, và sớm muộn sẽ lệch nhau."*

## Bằng chứng — bốn chỗ, đều là nguồn sơ cấp

| # | Ở đâu | Nói gì |
|---|---|---|
| 1 | `EMB/style/_MOC.md`, dòng tiêu đề | `# MOC — KOHAKU / style` — thư mục EMB, tiêu đề KOHAKU |
| 2 | [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/signature\|signature]], `source.ref` | đo từ `Local_Mafia_Boss_Blames.html + Ex-Mafia_Boss_Spends.html`, trùng đúng hai file trong `KOHAKU/Original-Fic/` |
| 3 | [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/signature\|signature]] + [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/targets\|targets]] | đối chiếu với `HOSO-KOHAKU.md` §3.1–3.6 và `DANY-KOHAKU.md` §A2 — **hai bên khớp** |
| 4 | `_OEUVRE-MOC.md` | liệt kê KOHAKU ở mục *"Đang chờ migrate"*, tức KOHAKU là **giai đoạn trước** của cùng việc, không phải truyện thứ hai |

Kết luận: `KOHAKU` là tên tác phẩm trong lớp tri thức cũ (3 file gộp).
`EMB` là thư mục vault dựng lại từ nguồn sơ cấp. Cùng một fic.

## Chọn `EMB`, không chọn `KOHAKU`

> **Sửa 09/09/2026 — `authority: user`, cùng tầng và mới hơn nên thắng ([[03-precedence]]).**
> Aurel, nguyên văn: *"kohaku là mã cũ khi đang test, chính thức là EMB"*.
> Bản 19/08 viết *"`KOHAKU` mới là tên tác phẩm"* — **nói quá**. `KOHAKU` không phải nhan
> đề tác phẩm (nhan đề là *"Ex-Mafia Boss Done With Life. Life Not Done With Ex-Mafia
> Boss."*); nó là **mã Aurel dùng trong giai đoạn thử nghiệm**, trước khi vault dựng lại.
> Quyết định bên dưới **không đổi** — chỉ lý do là sai, và một lý do sai làm phiên sau
> tưởng còn phải cân nhắc giữa hai cái tên. Không còn gì để cân nhắc: **EMB là mã chính
> thức, KOHAKU là mã cũ.**

Không phải vì `EMB` là tên hay hơn.

Lý do là **chi phí**: 210 file `.md` chưa chuyển ở `Story_Continue/Studio/Continue/EMB_ex-mafia-boss-done-with-life/` đều khai
`project: EMB` và mang `id` dạng `fact.EMB.*` · `character.EMB.*`. Đổi mã nghĩa là sửa
frontmatter của 210 file trước khi chúng kịp vào vault — một lần sửa hàng loạt trên tài
liệu mình chưa đọc hết. Giữ `EMB` thì số lần sửa bằng **không**.

Giá phải trả: `EMB` là mã đục, nhìn không biết là truyện gì. Trả bằng cách khai
`KOHAKU` làm alias trong [[EMB]] — `[[KOHAKU]]` vẫn trỏ về đúng chỗ, và
`vault_index.py --query kohaku` vẫn tìm ra.

## Hệ quả

- [[_OEUVRE-MOC]] bỏ dòng `KOHAKU` khỏi bảng "chờ tạo" và bỏ khối ⚠️ cần xác nhận.
- `KOHAKU/Knowledge-Data/` (3 file gộp) → `EMB/sources/`, **không** vào `canon/`.
  Chúng là phân tích phái sinh — [[principles]] nguyên lý 3.
- `KOHAKU/Original-Fic/` (2 HTML) → `EMB/sources/`, bất biến.
- `KOHAKU/AI-Countinue/` (6 chương Brat Arc) → `EMB/chapters/brat/`.

## Đảo lại được không

Được, và rẻ, **chừng nào 210 file kia chưa chuyển vào**. Sau đó thì không còn rẻ nữa.
Nếu Aurel muốn mã là `KOHAKU`, nói trước khi đợt chuyển lớn chạy.
