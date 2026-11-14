---
id: library.nguon-truy-cap-duoc
type: info
scope: global
lane: personal
canon_layer: user_canon
status: active
aliases: ["nguon truy cap duoc", "source reachability", "fetch duoc khong", "robots blocked", "nguon nao doc duoc", "reachability"]
related: ["[[KHR-Research-Method]]"]
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-08-14
---

# Nguồn nào AI đọc được, nguồn nào không

> Ghi lại để **không đốt lượt tìm kiếm vào chỗ chắc chắn hỏng**. Kiểm thực tế 2026-08-14, không phải phỏng đoán.

Phương pháp trong [[KHR-Research-Method]] liệt kê nơi *nên* tìm. File này ghi nơi *tìm được*. Hai danh sách này lệch nhau đáng kể, và biết trước độ lệch tiết kiệm rất nhiều thời gian.

## ✅ Đọc được

| Nguồn | Ghi chú |
|---|---|
| `reborn.fandom.com` | Nguồn canon chính. Ổn định |
| `archiveofourown.org` — **trang tag** | **Rất giá trị**: cho số fic và biết tag có canonical không. Đây là cách định lượng độ phổ biến của một fanon |
| `dic.pixiv.net` | Từ điển pixiv. Đọc được, có nội dung JP thật |
| `detail.chiebukuro.yahoo.co.jp` | Yahoo!知恵袋, hiện lên trong kết quả tìm |
| `en.wikipedia.org` | Thông tin xuất bản, không phải lore |
| Blog `hatenablog` / `kknews` / `zhihu` | Hiện trong kết quả tìm, fetch chưa thử hết |

## ❌ Chặn — đừng thử lại

| Nguồn | Lý do | Cách vòng |
|---|---|---|
| **Tumblr** (mọi blog) | `robots.txt` chặn | **Tiêu đề bài trong kết quả tìm vẫn đọc được** — đôi khi đủ. Hoặc Aurel copy nội dung |
| **TV Tropes** | trả `402` | Aurel copy |
| **Fanlore** | trả `403` | Aurel copy |
| **SpaceBattles / SufficientVelocity** | `robots.txt` chặn | Aurel copy |
| **Baidu Baike / Tieba** | `robots.txt` chặn | **Aurel truy cập được, mình không** |
| Reddit qua WebSearch | proxy từ chối (`HTTP 400`) | Gửi link trực tiếp |

## ⚠️ Giới hạn lớn nhất: công cụ tìm kiếm chạy từ Mỹ

Đây là chỗ **phá hỏng một nửa phương pháp của Aurel**.

Phương pháp bảo truy nguồn theo thứ tự CN: **JJWXC → Tieba → blog/forum → LOFTER → Weibo → Bilibili**. Đúng **năm trong sáu** nơi đó gần như không được đánh chỉ mục bởi công cụ mình dùng. JP cũng vậy với Pixiv (tác phẩm), 5ch archive, blog cũ.

**Hệ quả bắt buộc nhớ:**

> Không tìm thấy fanon ở CN/JP **không phải bằng chứng nó không tồn tại ở đó.**
> Đó là **thiếu công cụ**, không phải phát hiện.

Ngoại lệ: khi đọc được **một nguồn CN/JP thực chất** (như `dic.pixiv.net` cho mục Sky) mà nguồn đó *im lặng về khái niệm đang hỏi*, thì vắng mặt mới có sức nặng — vì đó là kiểm tra đúng chỗ, không phải kiểm tra trượt.

## Phân công gợi ý

| Việc | Ai làm |
|---|---|
| Wiki canon, đếm tag AO3, từ điển pixiv, tra chéo EN | 🤖 mình |
| Tieba · LOFTER · JJWXC · Weibo · Bilibili · Pixiv works | 👤 Aurel |
| Tumblr · TV Tropes · Fanlore · forum | 👤 Aurel copy nội dung, mình phân tích |

Aurel không cần tóm tắt — **dán nguyên văn** là tốt nhất, vì mình cần đúng câu chữ để phân biệt canon với diễn giải.

## Mẹo đã dùng được

- **Tiêu đề bài trong kết quả tìm là dữ liệu.** Không fetch được `hopeswriting.tumblr.com`, nhưng tiêu đề *"About fanon harmonization in KHR"* đã tự nó chứng minh fandom coi đó là fanon.
- **Trang tag AO3 là bằng chứng định lượng tốt nhất cho fanon.** Số fic + canonical hay không = độ phổ biến thật, thay cho cảm nhận.
- **Tag đúng tên mới ra số đúng.** `Sky Attraction` 16 fic; `Flame Harmonization` 153. Sai nhãn thì lệch mười lần.
