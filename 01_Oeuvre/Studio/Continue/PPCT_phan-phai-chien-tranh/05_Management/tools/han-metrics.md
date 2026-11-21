---
id: info.PPCT.han-metrics
type: info
scope: project
lane: personal
project: PPCT
canon_layer: project_locked
status: active
aliases: ["tools PPCT", "han_metrics PPCT", "cong cu rieng PPCT", "script dem chu Han PPCT"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: user_input
  ref: "Aurel 25/09/2026: 'Script han_metrics.py tao thu muc moi trong PPCT de giu file' — dong y de xuat giu nguyen tung byte, buoc bat buoc chuyen sang style_metrics.py"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/reference, p/personal]
last_updated: 2026-09-25
---

# Công cụ riêng của PPCT

## `han_metrics.py` — ⛔ đã được thay, giữ để truy nguồn

- **Là gì:** script đếm chữ Hán cho thân truyện PPCT (từ 「如果都能接受」 tới dòng `—————`): số chữ Hán, tỉ lệ thoại trong `“”`, đoạn/câu, `？！……——`, mật độ thuật ngữ, motif mắt, 「」, 「我」 ngoài ngoặc.
- **Từ đâu:** viết trong scratchpad của phiên `ppct-project-status-9aab04` (file ghi 21/09/2026 22:58), kiểm trên ch22 (nhật ký lỗi L45). Nằm ngoài vault tới 25/09/2026 — xoá thư mục tạm là mất.
- **Giữ nguyên từng byte** — SHA-256 `ab4d61f7cc46096a0e2e701292029976bd6f483d433875a0f8afa460f555005c`. Nó là nguồn của mọi số trong `metadata.yaml` ch28–ch36; sửa nó thì những số đó không còn tái lập được.
- **Đã được thay bằng** `01_Origine/04_Tools/VaultTool/Reporting/style_metrics.py` (PR #64, 25/09/2026) — khớp tuyệt đối trên 20 chương (commit dce257a) và trên ch36 (đo 25/09). Tật AI: `ai_tells_check.py --project PPCT` đọc [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/ai-tells|ai-tells]].
- `style_metrics` **chưa** đếm motif mắt và 「我」 ngoài ngoặc — hai số đó vẫn chỉ có ở đây, hoặc grep tay.

```bash
python 05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/05_Management/tools/han_metrics.py <chuong.md>
```

Trên Windows cần `PYTHONIOENCODING=utf-8` (script in JSON có chữ Hán; bảng mã cp1252 báo `UnicodeEncodeError`). **Không** sửa script cho lỗi này — đặt biến môi trường.
