---
id: decision.PPCT.viet-tieng-trung-roi-convert
type: decision
scope: project
lane: personal
project: PPCT
canon_layer: user_canon
status: locked
resolves: [question.PPCT.q-ngon-ngu-va-xung-ho-ban-viet-tiep]
decided_at: 2026-09-13
aliases: ["viet tieng Trung roi convert", "nhap tieng Trung truoc", "quy trinh hai buoc PPCT", "ngon ngu ban viet tiep PPCT", "xung ho theo convert", "draft zh roi convert vi"]
related: ["[[q-ngon-ngu-va-xung-ho-ban-viet-tiep]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature|signature]]", "[[chi-tieu-van-phong-theo-tac-gia]]"]
source:
  type: user_input
  ref: "Aurel, chat 13/09/2026: 'Ngon ngu va xung ho cua ban viet tiep: viet dung ngon ngu theo phong cach tac gia sau do convert'"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-09-25
---

# Quyết định — Viết bằng tiếng Trung theo giọng 西州, rồi convert sang tiếng Việt

## Quyết định

Mỗi chương đi **hai bước**:

1. **Bản nháp tiếng Trung** — đúng ngôn ngữ và phong cách của tác giả 西州.
2. **Convert** bản đó sang tiếng Việt; xưng hô theo lối convert.

## Lý do chọn

- Aurel chốt 13/09/2026.
- Mọi số đo văn phong đã có đều bằng **chữ Hán** ([[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/signature|signature]], [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]). Viết tiếng Trung thì **đo thẳng được**, không cần hệ số quy đổi.
- Bản thử nghiệm cũ viết thẳng tiếng Việt; tỷ lệ thoại tự báo lệch xa số đo thật — [[lam-lai-tu-nguon]].

## Phương án đã loại và vì sao

- **Viết thẳng tiếng Việt** — không đo được theo giọng gốc, cần hệ số quy đổi chưa có.
- **Chỉ tiếng Trung** — người đọc tiếng Việt không đọc được.
- **Tiếng Việt, câu then chốt song ngữ** — vẫn không đo được phần thân.

## Ràng buộc kéo theo

- **Cổng văn phong chạy trên bản tiếng Trung**, không chạy trên bản convert. [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]] và [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/hard-rules|hard-rules]] áp nguyên cho bản nháp.
- **Bản convert** không sửa cốt truyện, không thêm câu. Chỉ chuyển ngữ.
- **Xưng hô bản convert** theo lối convert Hán-Việt thông dụng: `我` → ta · `你` → ngươi · `他` → hắn · `她` → nàng · `他们` → bọn hắn/bọn họ.
- ✅ Chi tiết convert (tên riêng, ngoặc kép, câu giữ nguyên tiếng Trung, xưng hô): **Aurel convert bằng app tự tạo**, pipeline không đặt quy ước — [[convert-bang-app-rieng-cua-aurel]] *(15/09/2026; trước đó là [[q-quy-uoc-convert]])*.
- Đo bản nháp bằng style_metrics.py; cách đọc số: [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]].
