---
id: secret.TDTB.loc-da-tuyet-bo-thuoc-tdtb
type: secret
scope: project
lane: personal
project: TDTB
canon_layer: fic_explicit
status: active
visibility:
  author: true
known_by: ["character.TDTB.loc-da-tuyet-tdtb", "character.TDTB.he-thong-0038-tdtb", "character.TDTB.yamamoto-takeshi-tdtb"]
suspected_by: []
unknown_to: ["character.TDTB.sawada-tsunayoshi-tdtb", "character.TDTB.kesuke-tdtb", "character.TDTB.suzuki-kenichi-tdtb", "character.TDTB.thien-dao-tdtb", "character.TDTB.yuuko-tdtb", "character.TDTB.dao-dien-tdtb", "character.TDTB.pho-dao-dien-tdtb", "character.TDTB.gokudera-hayato-tdtb"]
reveal_planned:
  arc: null
  chapter: null
aliases: ["bo thuoc Yamamoto", "bỏ thuốc Yamamoto", "mị lực dược thủy", "mi luc duoc thuy", "chai nước ở máy bán hàng", "đồ uống có thuốc", "vi sao Yamamoto phat tinh"]
leak_terms: ["魅力药水", "饮料机"]
related: ["[[loc-da-tuyet-bo-thuoc-yamamoto-tdtb]]", "[[loc-da-tuyet--yamamoto-tdtb]]", "[[he-thong-chi-nam-0038-tdtb]]", "[[yamamoto-den-phong-tsuna-tdtb]]", "[[loc-da-tuyet-co-he-thong-0038-tdtb]]"]
source:
  type: fic_text
  ref: "乐博 — 《十代目每天都在装B》, JJWXC novelid 5231858, ban convert tieng Viet — ch14, ch15"
authority: original_author
confidence: 1.0
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-21
---

# Lộc Dã Tuyết bỏ thuốc Yamamoto

> ⚠️ Ba trường `known_by` / `suspected_by` / `unknown_to` là thứ chặn nhân vật biết sớm. Khai đủ, đừng để trống.

## Sự thật

- ch14: 0038 bán cho Lộc Dã Tuyết *"một bình mị lực dược thủy"*, loại khiến alpha *"khống chế không nổi mình tin tức làm"*. 0038 đổ thuốc vào một chai trong máy bán nước tự động của tổ chương trình, chọn đúng loại Yamamoto hay uống. Lộc Dã Tuyết bấm nút *"nhìn như vô cùng tùy ý"* để tự thoát nghi.
- 0038 dựng *"kết giới"* quanh vườn để alpha/Omega khác không ngửi thấy.
- Yamamoto **uống một ngụm** rồi ném chai vào thùng rác (ch15). 0038: *"Tin tức của hắn làm đúng là rõ rệt đề cao"*.
- **Hệ quả:** tối đó Yamamoto phải uống *"một bình ức chế tề"*, pheromone vẫn lên cao, và tìm tới phòng Tsuna. Xem [[yamamoto-den-phong-tsuna-tdtb]].

## Ai biết, biết đến đâu

| Nhân vật | Mức | Căn cứ |
|---|---|---|
| [[loc-da-tuyet-tdtb]] · [[he-thong-0038-tdtb]] | biết toàn bộ | ch14 |
| [[yamamoto-takeshi-tdtb]] | **biết có thứ trong đồ uống**, không biết là gì hay từ đâu ra. Bắt được nhờ Tuyết quá tự tin: *"Nếu như ngươi cái gì cũng không làm mà nói, ngươi hẳn là sẽ nghi hoặc ta đang nói cái gì"* | ch15 |
| [[sawada-tsunayoshi-tdtb]] | **không biết**. Tưởng Yamamoto *"tin tức tố lên cao"* vì lý do sức khoẻ | ch15 |

## Được phép thể hiện thế nào khi POV chưa biết

- Cho phép: Tsuna thấy Yamamoto mất kiểm soát, uống thuốc ức chế, khó chịu. Thấy mùi *"Thiên Lan quỳ"* đậm mà chỉ quanh quẩn ở hành lang.
- Cấm: Tsuna nối việc này với Lộc Dã Tuyết khi Yamamoto chưa nói.

## Còn treo

Yamamoto doạ mang chai đi xét nghiệm (ch15). Anh ta **đã ném chai vào thùng rác**. Có nhặt lại không, văn bản không nói.

## `leak_terms` — cho `pov_leak_check.py`

Thêm 01/10/2026 (D9, Aurel đồng ý): từ khoá chữ Hán mà bản nháp tiếng Trung sẽ dùng nếu lộ bí mật này. Công cụ khoanh POV **theo từng bí mật**, không theo từng từ: POV nằm trong `known_by` thì bỏ qua cả note (trừ khi thẻ cảnh ghi bí mật vào `forbidden_secrets`). Không có cách cho một từ hợp lệ ở POV này mà cấm ở POV khác trong cùng note. Chạy trên **cả chương**: chương nhiều POV thì từ hợp lệ ở khối POV khác vẫn bị báo; kiểm theo từng khối.
