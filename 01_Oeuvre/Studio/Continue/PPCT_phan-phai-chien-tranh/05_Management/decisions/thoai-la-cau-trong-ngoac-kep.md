---
id: decision.PPCT.thoai-la-cau-trong-ngoac-kep
type: decision
scope: project
lane: personal
project: PPCT
canon_layer: user_canon
status: locked
resolves: [question.PPCT.q-cach-do-ty-le-thoai]
decided_at: 2026-09-13
aliases: ["thoai la cau trong ngoac kep", "do thoai bang ngoac kep", "dau thoai PPCT", "ngoac kep hay 「」", "“” la thoai"]
related: ["[[q-cach-do-ty-le-thoai]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature|signature]]"]
source:
  type: user_input
  ref: "Aurel, chat 13/09/2026: 'cau thoai nam trong ngoac kep' — tra loi cau hoi cach do ty le thoai va diem D9 (nguyen tac dung “” cho thoai, 「」 chu yeu o doan det tu tieu thuyet F/Z)"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-09-13
---

# Quyết định — Thoại là câu nằm trong ngoặc kép `“…”`

## Quyết định

1. **Đo:** tỷ lệ thoại = ký tự nằm trong ngoặc kép `“ ”` chia cho ký tự thân truyện. Đếm trên nguyên tác chữ Hán.
2. **Viết:** thoại đặt trong **ngoặc kép** — theo đúng nguyên tác. Ngoặc 「」 của quy ước cũ **không dùng làm dấu thoại**.

## Lý do chọn

- Aurel chốt 13/09/2026: *"câu thoại nằm trong ngoặc kép"*.
- Đo trên nguyên tác (13/09/2026, trích xuất): thoại thường dùng `“”`; `「」` chỉ gặp ở vài đoạn dệt từ tiểu thuyết Fate/Zero (tiếng hét, tiếng Berserker, một thuật ngữ). Số đếm cụ thể: [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature|signature]].
- Cách đo cũ của bản thử nghiệm (đếm 「」 trên bản convert) cho số không so được với nguyên tác.

## Phương án đã loại và vì sao

- **Đếm theo `「」`** — không phải dấu thoại của nguyên tác.
- **Đếm tỷ lệ đoạn có thoại** — `style_metrics.py` đang làm vậy, nhưng chỉ bắt đoạn **mở đầu** bằng dấu ngoặc; nguyên tác hay đặt tag trước lời thoại → đếm thiếu.

## Ràng buộc kéo theo

- `style/targets.md` ghi chỉ tiêu thoại theo **cách đo này**.
- Mọi chỉ tiêu thoại cũ ("45–60%", "~38%") **không dùng** cho tới khi đo lại theo cách này.
- Ngoặc kép trong nguyên tác **cũng dùng để trích một từ** (ví dụ 「称之为“英俊”」). Cách đo tính luôn các chỗ đó; `signature.md` ghi thêm số đã loại trích dẫn ngắn để so.
- ⚠️ Nếu phần viết tiếp là bản tiếng Việt, **dạng ngoặc kép cụ thể** (“ ” hay " ") chưa quyết — [[q-ngon-ngu-va-xung-ho-ban-viet-tiep]].
