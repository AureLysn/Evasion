---
id: decision.CLS.giong-van-pho-thong-khong-nhai-ai
type: decision
scope: project
project: CLS
lane: personal
canon_layer: project_locked
status: active
strength: hard
aliases: ["giong van pho thong khong nhai ai", "giọng văn phổ thông không nhại ai", "viet theo dang thuong thay", "viết theo dạng thường thấy", "CLS khong viet bang giong Aurel", "CLS không viết bằng giọng Aurel", "giong van CLS", "giọng văn CLS", "do ch1 lam chuan"]
related: ["[[CLS]]", "[[20261004-giu-an-va-van-xuoi-pho-thong]]", "[[20261004-chinh-noi-dung-roi-do-lai]]", "[[q-giong-aurel-do-o-dau]]", "[[pham-vi-ba-the-gioi-va-giong-van-b1]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/02_Story_Bible/style/signature|signature]]", "[[quan-anh-the-reaction-fic]]", "[[watch-frame]]"]
source:
  type: user_input
  ref: "Aurel 04/10/2026: 'minh nghi van phong cua minh khong hop the loai lam nen viet theo dang thuong thay di' + chon 'Van xuoi pho thong, khong nhai ai' — nguyen van: sources/user-input/20261004-giu-an-va-van-xuoi-pho-thong.md"
authority: user
confidence: 0.9
always_load: false
load_for: [planner, writer, continuity-reviewer]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-10-04
---

# Quyết định — Giọng văn CLS: văn xuôi phổ thông, **không nhại ai**

> 🟢 **Aurel chốt 04/10/2026.** Nguyên văn: [[20261004-giu-an-va-van-xuoi-pho-thong]]. Đóng [[q-giong-aurel-do-o-dau]]; thay vế 「giọng câu chữ của CLS là giọng Aurel」 của
> [[pham-vi-ba-the-gioi-va-giong-van-b1]]. `confidence: 0.9`: phần mô tả 「phổ thông」 là lời của phiên được Aurel chọn.

| | Chốt |
|---|---|
| **Giọng câu chữ** | **Không** viết bằng giọng Aurel — Aurel: văn phong của mình 「không hợp thể loại lắm」. Viết theo **dạng thường thấy** của thể loại |
| **Chuẩn** | **Văn xuôi phổ thông, không nhại tác giả nào.** Tiếng Việt tự nhiên kiểu fanfic thường gặp: câu vừa phải, thoại nhiều |
| **Cách kể** | Vẫn **mượn cách kể của bộ A** *(khối chiếu / khối phản ứng, nhịp đảo hai khối)* — phần **b1** của [[pham-vi-ba-the-gioi-va-giong-van-b1]] không đổi. Quy ước thể loại: [[quan-anh-the-reaction-fic]] |
| **Luật cứng** | Aurel 04/10: 「dùng các luật cơ bản khi viết để kiểm, kiểm tra phong cách thể loại để áp luật」 ([[20261004-luat-co-ban-va-san-3000]]) → [[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules\|hard-rules]] *(luật cơ bản của sub-vault + luật rút từ bản đồ thể loại xem ảnh thể)* · [[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/02_Story_Bible/style/ai-tells\|ai-tells]] *(tật của máy)* |
| **Sàn** | **~3.000 từ mỗi chương** — [[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/02_Story_Bible/style/targets\|targets]] |
| **Số đo** | **Chưa có, và cố ý chưa đặt.** Viết **ch1** → Aurel chỉnh → **đo chính ch1 đã chỉnh** làm chuẩn cho các chương sau. Aurel: 「mình cũng sẽ chỉnh sửa nội dung cho đúng ý, lúc đó đo lại cũng được」 — [[20261004-chinh-noi-dung-roi-do-lai]] |

## Hệ quả phải nói thẳng

- Sub-vault ghi: không có `signature.md` đo từ nguồn thì là **tự nghĩ ra một giọng**, không phải nhại. Với CLS đó là **lựa chọn có chủ ý** của Aurel, không phải thiếu sót.
- `chapter_gate.py` cần khối `gate:` trong `style/ai-tells.md`; CLS **chưa có**, nên cổng sẽ **dừng, exit 2** ở ch1. Ch1 vì vậy được soát bằng **luật cứng và mắt Aurel**, không bằng số.
  Sau khi đo ch1 thì dựng `targets.md` và khối `gate:` — đó là việc của `analyze-style`.
- Ba epub đối chiếu là **bản convert máy**: không đo giọng trên chúng, và **không** để lối Hán-Việt của bản convert lọt vào văn CLS.
- Ngữ liệu TRIAD *(văn Aurel tự viết)* **không còn** là chuẩn của CLS.
