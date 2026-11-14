---
id: secret.TDTB.ky-uc-hoa-bach-hop-tdtb
type: secret
scope: project
lane: personal
project: TDTB
canon_layer: fic_explicit
status: active
visibility:
  author: true
known_by: ["character.TDTB.yamamoto-takeshi-tdtb"]
suspected_by: []
unknown_to: ["character.TDTB.sawada-tsunayoshi-tdtb", "character.TDTB.loc-da-tuyet-tdtb", "character.TDTB.he-thong-0038-tdtb"]
reveal_planned:
  arc: null
  chapter: null
aliases: ["hoa bach hop", "hoa bách hợp", "ky uc mau cua Yamamoto", "Tsuna chet trong tuong lai", "máu trên tường", "khong de A Cuong bi thuong lan nua", "lilies TDTB"]
leak_terms: ["百合"]
related: ["[[ky-uc-tuong-lai-tdtb]]", "[[yamamoto-takeshi-tdtb]]", "[[tsuna--yamamoto-tdtb]]", "[[yamamoto-den-phong-tsuna-tdtb]]", "[[h-yamamoto-khong-de-bi-thuong-tdtb]]"]
source:
  type: fic_text
  ref: "乐博 — 《十代目每天都在装B》, JJWXC novelid 5231858, ban convert tieng Viet — ch12, ch15"
authority: original_author
confidence: 0.9
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-01
---

# Trong ký ức của Yamamoto có máu, và một thanh niên nằm giữa hoa bách hợp

> ⚠️ Ba trường `known_by` / `suspected_by` / `unknown_to` là thứ chặn nhân vật biết sớm. Khai đủ, đừng để trống.

## Sự thật — ch15, nguyên văn

> *"Những cái kia huyết dịch đàng hoàng ở tại bọn chúng nên ở địa phương, mà không phải xốc xếch chiếu xuống trên tường, môn thượng cùng trên mặt thảm."*
>
> *"Núi bản nhắm mắt lại, trong mắt tựa hồ lần nữa hiện lên tại trong hoa bách hợp, người thanh niên kia đóng chặt hai mắt, cùng mặt tái nhợt."*
>
> *"Hắn sẽ không để cho hắn lần nữa bị thương tổn."*

Kèm ch12: tiếng thì thầm *"ẩn chứa vô tận cảm tình, bi thương, hoài niệm"*.

## Đọc thế nào — tách rõ

- **Có trên trang:** Yamamoto nhớ cảnh máu vương trên tường, cửa, thảm. Nhớ một thanh niên nhắm mắt, mặt trắng, giữa hoa bách hợp. Anh ta thề không để *"hắn"* bị tổn thương **lần nữa**.
- **Suy luận (authority ai, ~0.75):** thanh niên đó là Tsuna của tương lai, và cảnh đó là cái chết hoặc tang lễ. Hoa bách hợp là hoa tang. Văn bản **không nêu tên** người trong ký ức.

## Ai biết, biết đến đâu

| Nhân vật | Mức |
|---|---|
| [[yamamoto-takeshi-tdtb]] | biết (là ký ức của chính anh ta) |
| [[gokudera-hayato-tdtb]] | **chưa rõ**: có cùng ký ức không, văn bản không nói. **Không đưa vào trường nào** |
| [[sawada-tsunayoshi-tdtb]] | không biết |

## Được phép thể hiện thế nào khi POV chưa biết

- Cho phép: Yamamoto bảo vệ Tsuna thái quá, chạm vào cổ/mạch của cậu (ch15), sợ để cậu đi.
- Cấm: Tsuna biết hình ảnh hoa bách hợp. Người viết coi việc "Tsuna tương lai đã chết" là fact.

## `leak_terms` — cho `pov_leak_check.py`

Thêm 01/10/2026 (D9, Aurel đồng ý): từ khoá chữ Hán mà bản nháp tiếng Trung sẽ dùng nếu lộ bí mật này. Công cụ khoanh POV **theo từng bí mật**, không theo từng từ: POV nằm trong `known_by` thì bỏ qua cả note (trừ khi thẻ cảnh ghi bí mật vào `forbidden_secrets`). Không có cách cho một từ hợp lệ ở POV này mà cấm ở POV khác trong cùng note. Chạy trên **cả chương**: chương nhiều POV thì từ hợp lệ ở khối POV khác vẫn bị báo; kiểm theo từng khối.
