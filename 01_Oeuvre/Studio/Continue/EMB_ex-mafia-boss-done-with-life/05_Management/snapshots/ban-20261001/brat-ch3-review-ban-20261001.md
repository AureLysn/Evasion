---
id: note.EMB.brat-ch3-review-ban-20261001
type: note
scope: branch
lane: personal
project: EMB
branch: aurel-main
canon_layer: planned
status: archived
archived_at: 2026-10-01
archived_note: "Ban luu tru 01/10/2026: Aurel quyet lam lai ca du an EMB lan ba, tu khung nam arc (emb-lam-lai-lan-ba). Giu de tra; khong phai canon, khong phai mau giong."
aliases: ["review Ch3 ban 01-10", "so do chuong 3 Brat ban 01-10", "sua cau trung vi tang giong ban 01-10", "thoai ngan hon tac gia ban 01-10"]
related: ["[[brat-ch3-chapter-ban-20261001]]", "[[brat-ch3-the-canh-ban-20261001]]", "[[targets]]", "[[hard-rules]]", "[[brat-ch2-chapter-ban-20261001]]", "[[natsu]]", "[[emb-chot-tsuna-va-natsu-kham-pha-lai]]", "[[emb-chot-loi-dang-quay-ve]]", "[[nhat-ky-loi]]"]
source:
  type: inference
  ref: "Chay cong 19/09/2026: chapter_gate, ai_tells_check, style_metrics, pov_leak_check, vault_doctor. Cong them phep do doi chung tren hai file nguon cua tac gia."
authority: ai
confidence: 0.9
always_load: false
load_for: [reviewer]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-01
---

# Ch3 — sổ đo

## Cổng — ✅ sạch hết

| Cổng | |
|---|---|
| `chapter_gate` | ✅ luật cứng 4/4 · **10/10 chỉ tiêu** · *"KET: dat het"* |
| `ai_tells_check` | ✅ **không phát hiện tật AI nào**, không một cảnh báo |
| `pov_leak_check` | ✅ 8 secret, **0 rò rỉ** |
| `style_metrics` | ✅ cả hai chỉ tiêu |
| `vault_doctor --include-fiction` | ✅ 0 lỗi |

| Chỉ số | Ch3 | Chỉ tiêu | Tác giả |
|---|---|---|---|
| số từ | **11.276** | 8.000–13.000 | 7.551 |
| câu trung vị | **10** | 10–14 | 11 |
| câu dài ≥35 từ | 4,6 % | ≤ 9 | 4,0 |
| đoạn TB | 30,2 | 30–40 | 36,1 |
| `?` /10k | 42,6 | ≥ 30 | 49,8 |
| `!` /10k | 6,2 | ≥ 5 | 13,2 |
| *nghiêng* /10k | 78,9 | ≥ 60 | 109,1 |
| `…` /10k | 20,4 | ≥ 12 | 23,3 |
| thuật ngữ /1000 | 7,09 | ≥ 7 | 13,19 |
| `had` /10k | 165,8 | ≤ 210 | 166,3 |

## 🔴 Câu trung vị — chẩn đoán đầu tiên của AI **sai**

Bản nháp ra **trung vị 8**. Mình đoán là văn tường thuật quá cụt và định viết lại cho dài ra. Đo tách hai tầng thì hoá ra ngược:

| | Ch3 lúc ấy | tác giả P2 | tác giả P1 |
|---|---|---|---|
| **tường thuật** trung vị | **11** | 11 | 12 |
| **thoại** trung vị | 🔴 **5** | **9** | **9** |
| % câu là thoại | 🔴 29,3 | 17,4 | 5,9 |

→ **Văn tường thuật không có vấn đề gì.** Cả cái lệch nằm trong **thoại**, và nguyên nhân là **chính mình gây ra ở lượt sửa thứ hai**: để hạ chỉ số *câu dài*, mình chẻ các đoạn thoại dài của [[kawahira]] thành chuỗi câu cụt — *"You saw it." "It is a direction." "It is very far away."*

⚠️ Tức là **đã chẻ giọng của một ông già bốn nghìn tuổi thành nhịp điện tín** để làm đẹp một con số.

**Cách sửa:** nối lại các câu bên trong lời thoại cho ông nói liền mạch, và cho các nhân vật nói **trọn ý** thay vì nói mảnh. Thoại **5 → 8**, tổng **8 → 10**.

🔵 **Còn lệch so với tác giả, và ghi lại để biết:** thoại 8 *(tác giả 9)* và **tỉ lệ thoại 29,2 %** *(tác giả 17,4 %)*. Chương này đối thoại nhiều hơn tác giả đáng kể. Không chữa thêm, vì chữa nữa là cắt cảnh chứ không phải sửa câu.

## ⚠️ Hai công cụ đo **câu dài** khác nhau — đã đo cho ra ngọn ngành

`ai_tells_check` báo 9,7 % khi `chapter_gate` báo 6,6 %. Đọc mã:

- `ai_tells_check` dòng 135 tách câu trên **toàn văn bản** và **không tách ở `…`**
- `chapter_gate` tách **trong từng đoạn**, có `…`, kèm docstring nói thẳng cách kia là *"loi da lam bao sai 24,1% o Ch2"*

**Chạy cả hai lên chính nguyên tác:**

| Nguồn | `ai_tells_check` | `chapter_gate` |
|---|---|---|
| P2 *(Ex-Mafia Boss Spends)* | 5,2 % | **3,3 %** |
| P1 *(Local Mafia Boss Blames)* | 6,2 % | **5,1 %** |

→ `ai_tells_check` **thổi phồng khoảng 1,2–1,6 lần**, kể cả trên văn tác giả.

🔴 **Nhưng nó không gỡ tội cho bản nháp.** Trên thước của chính nó, tác giả cao nhất là 6,2 % còn Ch3 là 9,7 % — tức bản nháp **thật sự dài hơn tác giả trên cả hai thước**. Đã chẻ 17 câu; giờ 4,6 % *(gate)* và 7,4 % *(ai_tells)*.

## 🐛 Hai lỗi công cụ ghi lại

1. **`ai_tells_check.sentences()` tách câu trên toàn văn bản** — số *câu dài* và *câu trung vị* của nó không đáng tin khi chương nhiều thoại. `chapter_gate` mới là thước đúng.
2. **`chapter_gate --show-long` vỡ** với `UnicodeEncodeError` khi in câu có `…` ra console Windows. Chạy được nếu đặt `PYTHONIOENCODING=utf-8`.

## Lệch khỏi thẻ cảnh — một chỗ, có chủ ý

[[brat-ch3-the-canh-ban-20261001]] ghi cảnh 3.5 chỉ có Tsuna và cáo. Bản viết **thêm [[musashi]]**: cậu nói điều mình muốn với con cáo trước *(riêng tư)*, rồi với bà ở cửa *(công khai)*. Bậc 2 là **tự tin**, và nói một mong muốn ra với **một con người** mới là chỗ có rủi ro.

## Chương trả gì

| Hook | |
|---|---|
| [[ong-tre]] · [[nguoi-ban-cu]] | 🔴 **trả** |
| [[hook-bermuda-to-mo]] | tiến — bốn chữ hồi âm |
| [[bond-bam-vao-cay]] | nền, chưa động |

**Con cáo có tên: *Tomoshibi*** — đèn nhỏ bên đường, *kitsunebi*, điềm lành. Nghĩa thứ hai *(tomo, người bạn)* cậu **không nói ra**.

⚠️ **Luật 1 của [[natsu]] còn nguyên:** cáo nhận tên xong **bỏ đi ngồi chỗ khác**, và Tsuna để nó đi.
