---
id: info.EMB.chong-loi-dung-som
type: info
scope: project
lane: personal
project: EMB
canon_layer: planned
status: proposed
aliases: ["chong loi dung som", "sua loi lap lai", "coverage gate", "doc thieu", "loi lan thu tu", "co che chan loi doc"]
related: ["[[gap-nhan-vat]]", "[[EMB]]", "[[quy-uoc-dat-ten]]"]
source:
  type: inference
  ref: "Proposal written in answer to Aurel's question quoted at the top of the note (a fourth occurrence of the same reading error); the note is dated 2026-08-16; source block added 2026-11-13 from the note's own text"
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [system, proposal, process]
last_updated: 2026-08-16
---

# Chống lỗi "dừng đọc quá sớm" — **cơ chế, không phải lời hứa**

> Aurel hỏi: *"đây là lần thứ tư cùng một hình dạng lỗi, bạn có đề xuất nào để sửa không?"*

## Vì sao "sẽ cẩn thận hơn" không đủ

Bốn lần rồi. Mỗi lần mình **đều** đang cố cẩn thận. Lỗi không đến từ thiếu chú ý — nó đến từ chỗ **không có gì đo được việc đã đọc hết hay chưa**.

Và nó có một hình dạng cố định: **dừng ở nơi trông giống kết thúc.** Hết cảnh · hết chương theo cảm giác · hết phần trả lời câu hỏi đang hỏi. Trong khi văn bản còn tiếp.

⚠️ Nguy hiểm nhất: **kết quả trông vẫn đúng.** Bản tóm tắt Estraneo đợt trước không sai một chữ nào. Nó chỉ **thiếu**, và thiếu thì không có gì tự báo.

## Bốn cơ chế đề xuất — xếp theo hiệu quả trên chi phí

### 1. 🔴 Gate độ phủ dòng — *rẻ nhất, chặn được nhiều nhất*

Trước khi ghi bất kỳ note nào từ một file nguồn, phải khai báo:

```
nguồn: P2-Ch1.txt · tổng 992 dòng · đã đọc 1–992 · độ phủ 100%
```

Nếu độ phủ **< 100%**, `extract-entities` **không được kết thúc**. Không có ngoại lệ "phần còn lại là chú thích", vì chú thích 55 chính là chỗ đợt 3 mất.

**Chi phí:** một dòng khai báo. **Chặn được:** cả bốn lần đã xảy ra.

### 2. Kiểm kê khối — *bắt được lỗi loại "biết mà bỏ qua"*

Chia file nguồn thành **khối** theo dấu ngắt *(≥4 dòng trắng)*, đánh số, và với mỗi khối ghi **một dòng**: POV là ai, có gì mới không.

Trên P2-Ch2 việc này cho ra 14 khối. Trường `pov` của vault ghi 4 người. **Lệch → lỗi**, và lệch đó chính là đoạn POV của [[nagi]].

Với P2-Ch1 nó sẽ bắt được bảng kiểm kê ngay lập tức: khối cuối cùng là khối **giàu thông tin nhất chương**, và nó từng bị bỏ trắng.

### 3. Đọc ngược — *rẻ, và bắt đúng loại lỗi này*

Sau khi đọc xuôi, đọc lại **từ khối cuối lên**.

Lý do: lỗi luôn nằm ở **đuôi** của một đơn vị — cuối chương, sau cảnh cao trào, sau chỗ câu hỏi được trả lời. Đọc xuôi thì sự chú ý cạn dần đúng chỗ mật độ thông tin cao nhất. Đọc ngược thì đuôi được đọc lúc còn tỉnh.

⚠️ Cả ba lỗi lớn nhất — toàn cảnh tương lai · lời giải lời tiên tri · bảng kiểm kê — **đều nằm ở một phần ba cuối của đơn vị chứa nó**.

### 4. Mục "chưa làm" là gate, không phải ghi chú

[[gap-nhan-vat]] cho thấy MOC đã liệt kê đúng những nhân vật thiếu **từ đợt 3**, rồi nằm yên qua năm đợt.

**Luật:** nếu một MOC còn mục *"Chưa dựng note"*, thì `plan-continuation` **báo lỗi và dừng**. Không phải cảnh báo — dừng.

Đây là lỗi **ưu tiên**, và ưu tiên chỉ sửa được bằng thứ tự bắt buộc, không bằng ý chí.

## Một điều mình muốn nói thẳng

Ba trong bốn lần, **Aurel là người phát hiện ra** — nhớ đúng đoạn văn bản mà mình đã bỏ. Lần thứ tư mình tự bắt được, và chỉ vì `vault_doctor` báo một link gãy.

Đó là bằng chứng cho chính luận điểm ở trên: **thứ bắt được lỗi là công cụ đo, không phải sự cẩn thận.** Cái link gãy `[[tomoko]]` làm được việc mà tám đợt chú ý không làm được.

→ Nên đầu tư tiếp vào chỗ đó: **thêm thứ đo được**, chứ không phải thêm lời nhắc.

## Đề nghị áp dụng

Cả bốn đều là sửa **skill**, không sửa vault. Gói vào plugin **0.6.1** cùng bản vá `vault_doctor` và `context_graph.py`.

**Và áp ngay ở đợt đọc lại nguyên tác** — đợt đó tồn tại chính vì lỗi này, nên nó là chỗ thử tự nhiên.
