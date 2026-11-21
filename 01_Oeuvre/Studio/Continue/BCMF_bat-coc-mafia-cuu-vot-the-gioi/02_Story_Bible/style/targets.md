---
id: style.BCMF.targets
type: style
scope: project
lane: personal
project: BCMF
canon_layer: project_locked
status: active
strength: target
aliases: ["targets BCMF", "chi tieu van phong BCMF", "con so can cham BCMF", "do dai chuong BCMF"]
related: ["[[BCMF]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/02_Story_Bible/style/signature|signature]]", "[[nguyen-van-zh-bcmf]]", "[[qd-viet-tieng-trung-bcmf]]", "[[watch-frame-bcmf]]"]
source:
  type: measured
  ref: "Do 28/09/2026 bang style_metrics.py tren nguyen van zh ch1-24, than truyen (bo tieu de, van an, loi tac gia): 60.274 chu Han. Nguong = dai cua chinh tac gia, khong tu dat. Ty le chieu/phong do tren dau 【】 cua ban convert nguyen-tac-bcmf (proxy, ch3-22)"
authority: ai
confidence: 0.85
always_load: false
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-09-28
---

# Chỉ tiêu — con số cần chạm

> Lệch thì **báo số, không nhét chữ.** Đơn vị: **chữ Hán** — viết tiếp bằng tiếng Trung ([[qd-viet-tieng-trung-bcmf]]).
> Mọi ngưỡng lấy theo **dải của chính tác giả** trên 24 chương, không tự đặt.

## Độ dài chương

Sàn: ≥ 1.950 chữ Hán thân truyện. Không có trần.

Tác giả: trung bình **2.511**, trung vị 2.415, p25–p75 **2.030–3.040**, lớn nhất 3.651 (ch7). Nhỏ nhất **976**
(ch17) — tác giả tự ghi *"进行一个很短的更新"*, là **ngoại lệ có chủ ý**, không kéo sàn xuống. Không tính ch17 thì
thấp nhất 1.967 (ch15).

Sàn là **sàn** — chương dài hơn không phải lỗi nếu độ dài đến từ câu chuyện.

## Bảng chỉ tiêu

| Chỉ số (`style_metrics`) | Tác giả — TB | Dải tác giả (min–max) | **Chỉ tiêu** | Loại |
|---|---|---|---|---|
| Chữ Hán / đoạn (`paragraph_mean`) | 30,0 | 24,7–37,5 | **25–37** | dải |
| Đoạn ≥ 100 chữ (`cjk_paragraph_ge100_ratio`) | 0,95 % | 0–5,3 % | **≤ 6 %** | trần |
| Đoạn dài nhất (`paragraph_max`) | 109 | 80–184 | ≤ 190 | trần |
| Trung vị độ dài câu (`cjk_sentence_median`) | 24,3 | 15–34 | **18–32** | dải |
| Câu ≥ 50 chữ (`cjk_sentence_ge50_ratio`) | 13,2 % | 6,2–22,6 % | **6–23 %** | dải |
| Thoại / tổng chữ (`cjk_dialogue_ratio`) | 20,7 % | 2,7–38,4 % (p25–p75: 13,8–31,5 %) | **12–38 %** | dải |
| Đoạn thoại / tổng đoạn (`dialogue_paragraph_ratio`) | 0,25 | 0,06–0,45 | 0,10–0,45 | dải |
| `？` / 1000 | 6,1 | 1,5–10,7 | **2–11** | dải |
| `！` / 1000 | 3,4 | 0–8,6 | **0–9** | dải |
| `……` / 1000 | 4,0 | 1,6–6,3 | **1,5–6,5** | dải |
| `——` / 1000 (`cjk_dash_pair_per_1000`) | 1,0 | 0–3,6 | **≤ 3,6** | trần |
| Câu ≤ 4 chữ / 1000 | 3,1 | 0,9–10,8 | 1–11 | dải |

Hai chỉ số thoại đo **hai thứ khác nhau** (tỉ lệ chữ và tỉ lệ đoạn). Đừng so chéo.

## Mật độ khung phòng chiếu

Từ khoá `荧屏, 大厅` chia cho số chữ Hán × 1000.

- Chương **có phòng chiếu**: ≥ 0,6/1000 — tác giả ch3–24: 0,66–5,57, TB 2,6.
- Chương chỉ dựng phòng, chưa chiếu (kiểu ch1–2): không áp — tác giả 0,33–0,45.

⚠️ `大厅` va với *"酒店大厅"* (sảnh khách sạn, ch19). Đọc `term_hits` từng từ, đừng chỉ đọc tổng.

## Tỉ lệ chiếu / phòng — **xấp xỉ**, không phải số đo nguyên văn

Nguyên văn **không đánh dấu** đoạn chiếu ([[05_Evasion/01_Oeuvre/Studio/Continue/BCMF_bat-coc-mafia-cuu-vot-the-gioi/02_Story_Bible/style/hard-rules|hard-rules]] §2), nên không đo trực tiếp được. Số dưới đây lấy từ
dấu `【】` do **người convert** thêm vào [[nguyen-tac-bcmf]] — dùng như thước ước lượng:

| | ch3–22 |
|---|---|
| Phần chiếu trên màn hình / thân chương (tính theo âm tiết) | TB **~0,52** · dải 0,30–0,81 |
| Số khối chiếu / chương | TB 3,4 |

→ Chỉ tiêu (`target`, không cứng): chương có phòng chiếu → **phần chiếu ≥ 30 %**. Dưới mức đó là dấu hiệu phản ứng
lấn át nội dung mới — lỗi mà [[watch-frame-bcmf]] `stance: plot_driven` cảnh báo. ch23–24 bản convert **không**
đánh `【】` nên bị loại khỏi phép đo, không phải vì tác giả đổi cách viết.

## Tham khảo — nếu sau này cần bản tiếng Việt

Hệ số **0,89 âm tiết / chữ Hán** (24 cặp chương nguyên văn ↔ [[nguyen-tac-bcmf]]; dải 0,86–0,94). **Không** dùng
cho văn viết tiếp — văn viết bằng tiếng Trung ([[qd-viet-tieng-trung-bcmf]]).

## Kiểm

```bash
python 01_Origine/04_Tools/VaultTool/style_metrics.py <chuong.md> --project BCMF --json
```

Đọc `term_hits` từng từ. Mọi con số trên đo trên **thân truyện**: bỏ tiêu đề, văn án, lời cuối chương.
