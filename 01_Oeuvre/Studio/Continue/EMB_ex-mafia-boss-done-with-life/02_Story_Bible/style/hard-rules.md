---
id: style.EMB.hard-rules
type: style
scope: project
lane: personal
project: EMB
canon_layer: project_locked
status: active
strength: hard
aliases: ["hard rules", "luat cung van phong", "quy tac cung", "khong duoc vi pham"]
related: ["[[signature]]", "[[ai-tells]]", "[[targets]]", "[[emb-lam-lai-tu-nguon]]"]
source:
  type: measured
  ref: "Do lai 17/09/2026 tu personal-bulk:fiction-sources/EMB/raw/original-fic/ — 5 than chuong, 37.391 tu. Moi luat duoi day da kiem la ca 5/5 chuong tac gia deu dat. Chay ai_tells_check.py len chinh 5 chuong goc: ban cu cho exit 2 ca 5."
authority: original_author
confidence: 0.95
always_load: true
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
legacy_tags: [style, hard]
last_updated: 2026-10-01
---

# Luật cứng — vi phạm là lỗi, không phải lệch

> 🔁 **Viết lại 17/09/2026 sau khi chạy cổng kiểm lên chính nguyên tác.** Bản cũ có bảy luật; chạy `ai_tells_check.py` lên năm chương của tác giả thì **cả năm đều thoát mã 2** — tức **cổng đánh trượt người đã viết ra giọng văn này**.
>
> 🔴 **Luật mới cho chính file này:** một điều chỉ được là luật cứng khi **cả 5/5 chương tác giả đều đạt**. Không đạt thì nó là chỉ tiêu — [[targets]].
>
> Nguyên tắc cũ vẫn đúng: **luật viết dạng CẤM thì được tuân; tính chất viết dạng MÔ TẢ thì mất.** Nên mọi thứ ở đây phát biểu được thành có/không hoặc thành một con số.

## 1. Không gạch ngang — `—` `–` `--`

Nguyên tác: **0 / 0 / 0** ở **cả năm chương**. ✅ 5/5

Ngắt ý bằng chấm lửng hoặc câu cực ngắn đứng riêng.

## 2. Chấm lửng: `…` phải chiếm **ít nhất 60 %**

Nguyên tác, từng chương: **67 % · 87 % · 88 % · 77 % · 95 %** — gộp **88 `…` / 17 `...`**. ✅ 5/5

🔴 **Không cấm hẳn `...`**: tác giả dùng nó ở cả năm chương, nhiều nhất 7 lần ở P2 Ch1. Luật là **`…` là dạng chính**.

`…` là công cụ ngắt nhịp chính của tác giả — nó làm việc mà gạch ngang làm ở tác giả khác. Mất nó là mất nhịp, không phải mất một dấu câu.

## 3. Không dùng nhịp "Not X. It was Y."

Cấm: phủ định **1–2 chữ** rồi câu sau **đính chính một khái niệm**. *Not far.* *Not danger.* *Not a warning.*

Được, và **nên** dùng: câu cực ngắn làm **nhịp hài hoặc chốt hạ**.

Nguyên tác có **4** câu phủ định cụt trong 37.391 từ *(≈ 1,1 /10k)* — và **cả bốn đều là loại được phép**: một lời đáp gọn trong thoại, hoặc một nhịp đá. Không câu nào đính chính khái niệm. ✅ 5/5

Ranh giới là **chức năng**, không phải độ dài: đá một nhịp thì được, đính chính một khái niệm thì không.

## 4. Không đặt tên cảm xúc thay cho việc dựng nó

Cấm: `no word for it` · `something close to <cảm xúc>` · `the specific <danh từ> of` · `for a long moment` · `Nobody said anything` · `the way you/one <động từ>` · `, technically`.

Nguyên tác: **0 lần ở cả năm chương**, kiểm từng cụm 17/09. ✅ 5/5

## 5. Không viết phần phân tích và phần văn trong cùng một lượt

Vừa viết xong một đoạn lý luận thì câu văn tiếp theo mang nhịp lý luận.

Bằng chứng: sáu file chương bản v3 đều có phần *ghi chú của người viết tiếp* bằng tiếng Việt ở cuối — **phần ghi chú đầy gạch ngang**, trong khi **phần văn ngay phía trên không có cái nào**. Model phân biệt được hai register khi chúng tách bạch; rủi ro là khi chúng trộn vào nhau.

Đây là luật về **quy trình**, và là luật script không kiểm được.

## 6. Tên riêng theo chính tả fandom — **Kyouya**, **Shouichi**

Aurel chốt 01/10/2026 — [[emb-chot-chinh-ta-ten]]. Tác giả gốc viết *Kyoya* và *Shoichi* trong thân truyện; nhánh này giữ dạng fandom. Trích nguyên văn nguyên tác thì giữ chính tả của tác giả.

⚠️ **Cổng không kiểm luật này**, và không được thêm nó vào `gate:` — năm chương gốc sẽ trượt. Kiểm bằng một lệnh tìm chữ trước khi trình bản nháp.

## ⬇️ Đã chuyển xuống chỉ tiêu — và vì sao

| Luật cũ | Tác giả đạt | Giờ ở đâu |
|---|---|---|
| *"Mỗi chương phải có ít nhất một dấu chấm than"* | **4/5** — P1 Ch3 **không có dấu `!` nào** | [[targets]]: `!` ≥ 5 /10k, lệch được khi có lý do |
| *"Câu dài ≥35 từ không quá 9 %"* | **không chắc** — `chapter_gate` đo P1 Ch3 ra **8,7 %**, `ai_tells_check` ra **11,1 %** | [[targets]]: ≤ 9 %, là chỉ tiêu cho tới khi quyết được thước nào chuẩn |
| *"Cấm hẳn `...`"* | **0/5** | sửa thành luật 2 ở trên |

⚠️ Hạ hai luật xuống **không làm chẩn đoán cũ về bản v3 sai**. Sáu chương AI có `!` **bằng 0 ở cả sáu** — tác giả chỉ có **một** chương bằng 0, và đó là chương lore dày nhất. Ở **tầng cả arc**, *"không ai bật lên lần nào"* vẫn là triệu chứng giọng sai.

## Cổng kiểm

```
python 01_Origine/04_Tools/VaultTool/ai_tells_check.py --chapter <file> --project 05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life
```

Chạy **từ gốc vault**, và truyền `--project` bằng **đường dẫn đầy đủ** *(nhật ký lỗi `L17`)*. Exit 2 = vỡ luật cứng → không trình bản nháp.

⚠️ Công cụ cắt phần *End Notes* / *Ghi chú* trước khi đo. Ghi chú đặt ở giữa file với tiêu đề khác sẽ bị đếm nhầm vào văn — đúng lỗi đã làm hỏng lần đo đầu tiên.

✅ **Kiểm lại cổng 17/09:** sau khi sửa [[ai-tells]], chạy cổng lên năm chương gốc phải ra **không còn lỗi cứng nào**. Nếu còn, luật sai chứ không phải tác giả sai.
