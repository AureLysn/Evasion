---
id: style.BCMF.hard-rules
type: style
scope: project
lane: personal
project: BCMF
canon_layer: project_locked
status: active
strength: hard
aliases: ["hard rules BCMF", "luat cung van phong BCMF", "quy tac cung BCMF", "khong duoc vi pham BCMF"]
related: ["[[BCMF]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/02_Story_Bible/style/signature|signature]]", "[[nguyen-van-zh-bcmf]]", "[[watch-frame-bcmf]]", "[[phan-biet-cung-ten-bcmf]]", "[[qd-viet-tieng-trung-bcmf]]"]
source:
  type: measured
  ref: "Do 28/09/2026 tren nguyen van zh ch1-24 (nguyen-van-zh-bcmf), than truyen da bo tieu de, van an, loi tac gia: 60.274 chu Han. Dem bang style_metrics.py + script dem ky tu. Aurel 28/09: viet tiep bang tieng Trung"
authority: user
confidence: 0.9
always_load: true
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-09-28
---

# Luật cứng — vi phạm là lỗi, không phải lệch

> Mỗi luật phát biểu được thành **có / không**, và đã **đo trên nguyên văn**: tác giả tuân thủ **không một ngoại lệ**
> trên 24 chương. Chỗ nào tác giả có ngoại lệ thì **không** vào đây — nằm ở [[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/02_Story_Bible/style/targets|targets]] hoặc [[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/02_Story_Bible/style/signature|signature]].
>
> Viết bằng **tiếng Trung** — [[qd-viet-tieng-trung-bcmf]].

## 1. Thoại dùng `“ ”`

| Đo | Kết quả |
|---|---|
| `“` | **976** lần |
| `「」` · `『』` | **0** |

→ Mọi lời thoại, kể cả ý nghĩ nói thành lời, dùng `“ ”`. **Không** dùng `「」`.

## 2. `【】` chỉ dành cho **lời của ý thức thế giới**

| Đo | Kết quả |
|---|---|
| `【】` | **24** cặp — ch1: 12 · ch2: 10 · ch8: 2 |
| Nội dung | **cả 24** là lời hai ý thức thế giới |

→ **Không** dùng `【】` để đánh dấu đoạn chiếu trên màn hình, tiêu đề cảnh, hay ghi chú. Chuyển giữa phòng và
màn hình **chỉ bằng lời kể** — xem [[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/02_Story_Bible/style/signature|signature]] §1.

⚠️ Bản convert [[nguyen-tac-bcmf]] có **99** cặp — 75 cặp thêm là của người convert. **Đừng bắt chước bản convert
ở điểm này.**

## 3. Họ của 27 viết `沢田`, không phải `泽田`

| Đo | Kết quả |
|---|---|
| `沢田` | **379** |
| `泽田` | **0** |

→ Luôn `沢田纲吉` (chữ 沢 kiểu Nhật).

## 4. Lời kể **không** gọi 27 là `阿纲`

| Đo | Trong `“ ”` | Ngoài `“ ”` (lời kể) |
|---|---|---|
| `阿纲` | 29 | **0** |
| `纲吉` | 30 | 343 |
| `沢田纲吉` | 5 | 342 |

→ `阿纲` chỉ ở trong thoại (người thân gọi). Lời kể gọi `沢田纲吉` hoặc `纲吉`.

## 5. Không có vạch ngắt cảnh trong thân chương

| Đo | Kết quả |
|---|---|
| Dòng chỉ gồm `————` giữa thân truyện | **0** trên 24 chương |

→ Vạch `————————` **chỉ** dùng một lần, ở cuối chương, để tách lời cuối chương. Đổi cảnh giữa chương bằng lời kể.

## 6. Bí mật và thứ tự tiết lộ

Không phải số đo văn phong — là luật của hai hợp đồng. **Luôn áp**:

- [[crossover-bcmf]] — bảng cấm nhanh §7.
- [[watch-frame-bcmf]] — bảng cấm nhanh cuối file.
- [[phan-biet-cung-ten-bcmf]] — trùng tên.

## Kiểm

```bash
python 01_Origine/04_Tools/VaultTool/style_metrics.py <chuong.md> --project BCMF --json
```

Luật 1–5 `style_metrics.py` **chưa tự bắt** — đếm bằng grep trên chương (`【`, `「`, `泽田`, `阿纲` ngoài ngoặc,
dòng `^————`). Chưa có `ai-tells.md`: `chapter_gate.py` chỉ đọc chữ Latin (tiền lệ PPCT). Tạo khi review bắt được
mẫu câu thật.
