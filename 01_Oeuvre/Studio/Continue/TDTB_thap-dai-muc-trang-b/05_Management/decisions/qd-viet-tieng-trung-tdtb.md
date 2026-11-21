---
id: decision.TDTB.qd-viet-tieng-trung-tdtb
type: decision
scope: project
lane: personal
project: TDTB
canon_layer: user_canon
status: locked
decided_at: 2026-09-27
supersedes:
aliases: ["viet tieng Trung TDTB", "thanh pham tieng Trung TDTB", "ngon ngu viet TDTB 27/09", "TDTB viet bang chu Han", "khong convert TDTB"]
related: [ "[[q-ngon-ngu-viet-va-don-vi-do-tdtb]]", "[[q-thuat-ngu-va-ngoac-tieng-viet-tdtb]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/ai-tells|ai-tells]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/00_Overview/TDTB|TDTB]]"]
source:
  type: user_input
  ref: "Aurel, chat phien Claude Code 27/09/2026: 'viet tieng trung'; lam ro qua AskUserQuestion cung luot: 'Doi sang viet tieng Trung' + 'Thanh pham tieng Trung' + 'Dong y, sua du'"
authority: user
confidence: 1.0
always_load: false
load_for: [writer, planner]
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-27
---

# Quyết định — viết tiếp **bằng tiếng Trung**, và bản Trung là **thành phẩm**

Thay qd-viet-tieng-viet-quy-doi-tdtb (26/09). Aurel chốt 27/09/2026.

## Chốt

1. **Văn viết tiếp là tiếng Trung.**
2. **Bản Trung là thành phẩm.** Không convert sang tiếng Việt, và không coi bản Trung là nháp.
3. **Chỉ tiêu dùng thẳng đơn vị chữ Hán**, đo trên nguyên văn 乐博: [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]]. Hệ số 0,928 âm tiết chỉ
   còn là số tham chiếu.
4. **Thuật ngữ và ngoặc theo đúng nguyên tác**, như [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/hard-rules|hard-rules]] mục B. Vì vậy
   [[q-thuat-ngu-va-ngoac-tieng-viet-tdtb]] không còn cần.

## Vì sao đổi so với 26/09

Aurel chọn lại ngày 27/09, sau khi đã có chỉ tiêu bằng âm tiết và câu hỏi thuật ngữ tiếng Việt.
**Chưa có chương nào được viết**, nên việc đổi không làm hỏng văn bản nào. Quyết định cũ vẫn giữ,
`status: superseded`, để truy được ai đã dựa vào nó.

## Hệ quả đã làm 27/09

- [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]] về đơn vị chữ Hán (sàn ≥ 2.200 chữ Hán).
- [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/ai-tells|ai-tells]] lập được ngay, vì baseline chữ Hán đã có. Chạy trên 15 chương 乐博: 0 lỗi cứng.
- Cổng chữ Hán là `style_metrics.py` cộng `ai_tells_check.py`. **Không** dùng `chapter_gate.py`, vì công cụ
  này chỉ đọc chữ Latin.
- ⚠️ Lỗi L60: `style_metrics` đếm hụt từ khoá Latin đứng dính chữ Hán. Danh sách mật độ đã bỏ
  Omega/alpha/beta vì lý do này.
