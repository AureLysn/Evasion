---
id: style.TDTB.targets
type: style
scope: project
lane: personal
project: TDTB
canon_layer: project_locked
status: active
strength: target
aliases: ["targets TDTB", "chi tieu van phong TDTB", "muc tieu do luong TDTB", "so can cham TDTB"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/ai-tells|ai-tells]]", "[[nguyen-van-zh-tdtb]]", "[[qd-viet-tieng-trung-tdtb]]"]
source:
  type: measured
  ref: "Rut tu signature.md — do 26/09/2026 bang style_metrics.py tren nguyen van zh ch1-15, 42.660 chu Han than truyen. Nguong = dai cua tac gia (p25-p75 hoac min-max), khong tu dat. 27/09: Aurel chot viet thanh pham tieng Trung (qd-viet-tieng-trung-tdtb) -> don vi chu Han la don vi that; ban am tiet 26/09 nam trong lich su git"
authority: ai
confidence: 0.8
always_load: false
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-09-27
---

# Chỉ tiêu — con số cần chạm

> Lệch thì **báo số, không nhét chữ.**
>
> ✅ **Viết thành phẩm bằng tiếng Trung.** Aurel chốt 27/09 ([[qd-viet-tieng-trung-tdtb]]). Đơn vị **chữ Hán**
> áp thẳng lên chương viết. Không quy đổi, không convert.
>
> Hai cổng đọc file này: `style_metrics.py` (độ dài + mật độ + các chỉ số `cjk_*`) và `ai_tells_check.py`
> (theo [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/ai-tells|ai-tells]]). Tên chỉ số: thoại = `cjk_dialogue_ratio` (**không** phải `dialogue_paragraph_ratio`),
> câu ≥50 = `cjk_sentence_ge50_ratio`, đoạn ≥100 = `cjk_paragraph_ge100_ratio`, chữ Hán/đoạn = `paragraph_mean`.
>
> Mọi ngưỡng lấy theo dải của chính tác giả, không tự đặt.

## Độ dài chương

**Sàn: ≥ 2.200 chữ Hán thân truyện. Không có trần.**

Để so: tác giả viết 2.197–3.911 (p25–p75: 2.467–3.124; TB 2.844).

## Bảng chỉ tiêu

| Chỉ số | Nguyên tác | Chỉ tiêu | Loại | Tham chiếu âm tiết (không dùng) |
|---|---|---|---|---|
| Thoại, chữ trong `“”` (`cjk_dialogue_ratio`) | 21,0 % (p25–p75: 15,6–25,4) | **15–30 %** | dải | như cũ; convert đo được 21,5 % |
| Chương mở màn diễn đàn / game | ch1: 7,3 % | cho phép xuống ~7 % | sàn | như cũ |
| Chữ Hán / đoạn (`paragraph_mean`) | 40,9 (32,4–50,0) | **32–50** | dải | ≈ 30–46 âm tiết |
| Đoạn ≥100 chữ (`cjk_paragraph_ge100_ratio`) | 3 % (max 9) | ≤ 9 % | trần | — |
| Câu ≥50 chữ (`cjk_sentence_ge50_ratio`) | 23 % (12–37) | ≤ 37 % | trần | — |
| `？` / 1000 (`cjk_question_per_1000`) | 7,40 (min 4,17) | ≥ 4 | sàn | — |
| `！` / 1000 (`cjk_exclaim_per_1000`) | 4,43 (0,36–8,17) | 0,5–8,5 | dải | — |
| `……` / 1000 (`cjk_ellipsis_per_1000`) | 1,94 (0,41–3,34) | 0,4–3,5 | dải | — |
| `——` / 1000 (`cjk_dash_pair_per_1000`) | 0,38 (max 1,22) | ≤ 1,5 | trần | — |
| Dòng phản ứng `Tên：` + dấu câu | 12/15 chương | ≥ 1 / chương | sàn | — |
| Câu cuối chương là câu móc / chốt | 15/15 | có | — | — |

## Mật độ thuật ngữ

Từ khóa `信息素, 抑制剂, 分化, 标记, 系统, 任务, 积分, 直播, 弹幕, 嘉宾, 节目, 导演, 十代目, 机甲` chia cho số chữ Hán × 1000.

- Chương đời thực / show: ≥ 10/1000 (nguyên tác ch1–4, ch9–15: 11,5–26,3)
- Chương thế giới nhiệm vụ: **không đặt sàn** (nguyên tác ch5–8: 2,2–10,9)

⚠️ **Không có Omega / alpha / beta trong danh sách, và đó là cố ý.** Đo 26/09: `style_metrics.py` đếm từ
khóa Latin theo ranh giới từ. Khi chữ Latin đứng dính chữ Hán (*"个Omega"*) thì nó không đếm, nên ch1
ra 2 thay vì 13, ch4 ra 0 thay vì 16. Đếm tay thì ba từ này có 97 lần / 42.660 chữ Hán.

⚠️ `style_metrics.py` **không phân biệt chế độ chương**. Nó áp sàn 10/1000 cho mọi chương, nên với chương
thế giới nhiệm vụ thì dòng `term density … LECH` là **báo động giả**.

Danh sách chữ Hán dùng thẳng, vì viết tiếng Trung. Không cần danh sách tiếng Việt.
