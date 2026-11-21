---
id: question.TRIAD.q-dau-cau-spec-vs-thuc-te
type: question
scope: project
lane: personal
project: TRIAD
canon_layer: user_canon
status: resolved
resolved_by: quyet-dinh-dau-cau
resolved_at: 2026-09-12
aliases: ["mau thuan dau cau", "chat convert hay khong", "gach doi co dung khong", "van phong dich vs do thuc te", "nguong thoai 38"]
related: ["[[tong-va-cach-ke]]", "[[05_Evasion/01_Oeuvre/Studio/Original/TRIAD_khr-jjk-bsd/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Original/TRIAD_khr-jjk-bsd/02_Story_Bible/style/signature|signature]]", "[[05_Evasion/01_Oeuvre/Studio/Original/TRIAD_khr-jjk-bsd/02_Story_Bible/style/targets|targets]]", "[[chuong-01-aurel-viet-lai]]", "[[chuong-01]]"]
source:
  type: user_input
  ref: "Phat hien 12/09/2026 khi doc tong-va-cach-ke.md de chuan bi viet chuong 2. Hai note cung authority: user, cung canon_layer: project_locked, cung always_load: true, noi nguoc nhau."
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-12
---

# ✅ Đã giải quyết 12/09/2026 — "chất convert" là đích, hay đã bị bỏ?

> **Kết: phương án C** — dấu câu theo thực tế (bỏ chất convert), ngưỡng thoại theo spec
> (giữ ≥ 38 %). Lý do đầy đủ: [[quyet-dinh-dau-cau]]. Phần dưới giữ nguyên như lúc đặt câu hỏi.

```
KNOWLEDGE CONFLICT

Hiện có : "Giữ chất convert" — DÙNG `——` · `......` · `"` thẳng     [A] Aurel, 04-05/09
          canon/tong-va-cach-ke.md § Văn phong đích
          authority: user · project_locked · confidence 1.0 · always_load

Mới     : CẤM `——` · `......` (đo 0/0 trong 3349 từ Aurel tự viết)  [đo] 12/09
          style/hard-rules.md § 1
          authority: user · project_locked · confidence 0.9 · always_load

Luật    : cùng canon_layer, cùng authority => bảng precedence KHÔNG tách được
          => invariant 8: DỪNG VÀ HỎI
```

## Vì sao đây là lỗi của phiên 12/09

`style/hard-rules.md` được dựng từ số đo mà **không đối chiếu với hợp đồng tông đã khoá**. Nó ra
đời trực tiếp mâu thuẫn với một note `always_load: true` — nên một lượt `write-chapter` nạp cả hai
sẽ nhận hai lệnh ngược nhau về cùng một dấu câu.

Nặng hơn: `signature.md`, `hard-rules.md` và ghi chú đầu [[chuong-01-aurel-viet-lai]] đều viết
rằng bộ dấu `——` `......` **"là văn phong của bản AI, không phải của Aurel"**.

**Câu đó sai.** Bộ dấu đó là **spec do chính Aurel viết** ([[tong-va-cach-ke]] § Văn phong đích,
nhãn `[A]`, 04/09). Bản nháp [[chuong-01]] dùng `——` 22 lần vì nó **đang tuân thủ spec của
Aurel**, không phải vì AI có thói quen đó. Phép so sánh vì vậy không phải *"AI vs Aurel"* mà là
**"spec Aurel viết 04/09 vs văn Aurel viết 11/09"** — một chuyện hoàn toàn khác.

## Mâu thuẫn thứ hai, cùng gốc — ngưỡng thoại

| Nguồn | Yêu cầu | Chương 1 đo được |
|---|---|---|
| [[tong-va-cach-ke]] § Ngưỡng đo được `[A]` | **Thoại ≥ 38 %** | |
| [[05_Evasion/01_Oeuvre/Studio/Original/TRIAD_khr-jjk-bsd/02_Story_Bible/style/targets\|targets]] v1 (12/09) | Đoạn có thoại **15–35 %** | **20,8 %** |

Khoảng mình đặt **loại trừ luôn sàn của hợp đồng**. Cũng cùng một lỗi: đặt chỉ tiêu từ số đo mà
không đọc hợp đồng tông.

## Ba lựa chọn — thuộc về Aurel

| | Chọn gì | Kéo theo |
|---|---|---|
| **A** | **Spec thắng.** "Chất convert" vẫn là đích; chương 1 chỉ là chưa đạt | `hard-rules` §1 phải đảo ngược; chương 1 cần một lượt sửa dấu câu; `targets` lấy lại sàn thoại 38 % |
| **B** | **Thực tế thắng.** Văn 11/09 là giọng thật, spec 04/09 lỗi thời | [[tong-va-cach-ke]] § Văn phong đích + ngưỡng thoại → `superseded`; `hard-rules` giữ nguyên |
| **C** | **Tách trục.** Dấu câu theo thực tế (B), ngưỡng thoại theo spec (A) — hoặc ngược lại | Hai trục vốn độc lập, không bắt buộc cùng số phận |

Mình **không** chọn hộ. Nhưng nếu Aurel hỏi thì: nghiêng về **B cho dấu câu** (văn mới hơn, và
là văn thật chứ không phải ý định), **A cho thoại** (20,8 % của chương 1 có thể chỉ vì đó là
chương montage gần như không có hội thoại — chưa đủ cơ sở bác một ngưỡng đã chốt).

## Chặn cái gì

**Mọi việc viết văn xuôi.** Chế độ dấu câu quyết định từng dòng — viết chương 2 trước khi chốt
thì hoặc phải viết lại, hoặc phải sửa dấu hàng loạt.

**Không chặn**: lên kế hoạch chương (beat, cảnh, số từ không phụ thuộc dấu câu).
