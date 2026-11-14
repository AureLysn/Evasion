---
id: style.UNTCH.ai-tells
type: style
scope: project
lane: personal
project: UNTCH
canon_layer: project_locked
status: active
strength: hard
aliases: ["ai tells UNTCH", "ai_tells", "giong AI UNTCH", "tat AI UNTCH", "chong giong Claude UNTCH", "van phong AI UNTCH", "cong kiem UNTCH", "gate UNTCH"]
related: ["[[UNTCH]]", "[[targets]]", "[[hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/06_Alternate_Versions/branches/aurel-main|aurel-main]]", "[[aurel-watch]]"]
always_load: true
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
legacy_tags: [style, guard, measured]
forbid_chars: ["—", "..."]
targets:
  long_sentence_pct_max: 4
  question_per_10k_min: 60
  exclam_per_10k_min: 20
  italic_per_10k_min: 32
gate:
  # Moc nen do tu 123/127 chuong van xuoi da tach (loai 4 chuong MNet: ch54, ch71,
  # ch75, ch115 - xem [[targets]]), 336.963 tu, bang CHINH ham measure() cua
  # chapter_gate.py (khac style_metrics.py - schema khac, dung cho targets.md/
  # hard-rules.md). Script do: 03_Workspace/untch-extract/measure_gate.py.
  # Chay lan dau 04/09/2026, do lai 04/09/2026 sau khi sua extract_all.py (L16 —
  # xem nhat-ky-loi-lam-viec.md). Dung chung cho ca hai nhanh aurel-main va
  # aurel-watch - ca hai deu tiep giong NGUYEN TAC, khong phai giong nhau.
  author:
    words: 2739.5
    sent_median: 9
    long_pct: 0.9
    para_mean: 28.2
    q10k: 91.3
    excl10k: 40.5
    ital10k: 54.4
    ell10k: 114.0
    term1k: 7.78
    had10k: 165.6
  targets:
    words_min: 2049
    words_max: 3877
    sent_median_min: 6
    sent_median_max: 11
    long_pct_max: 4
    para_mean_min: 20
    para_mean_max: 38
    q10k_min: 60
    excl10k_min: 20
    ital10k_min: 32
    ell10k_min: 70
    term1k_min: 5.0
    had10k_max: 215
  terms: [Flames, villain, hero, quirk, Vongola, soulmate, Sky, mafia, Flame, Cloud, Element, bond, "Hyper Intuition", Storm, Mist, Rain, Sun]
last_updated: 2026-09-04
---

# Tật AI — UNTCH — cổng kiểm cho `chapter_gate.py`

> Cổng kiểm chính: `python3 01_Origine/04_Tools/VaultTool/chapter_gate.py <chuong.md> --corpus <thu-muc-chuong-khac>`
> Cổng kiểm phụ (typography + construct): `python3 01_Origine/04_Tools/VaultTool/ai_tells_check.py --chapter <file> --project Studio/Continue/UNTCH_untouchable`

Khác `EMB/style/ai-tells.md`: file đó đo bằng cách **đối chiếu chương AI đã viết** với
nguyên tác. UNTCH **chưa có chương nào viết tiếp** (bước 8 mới đang dàn ý Hồi I của
`aurel-main`, `aurel-watch` còn chưa tới bước playlist). File này vì vậy là **hồ sơ nền
đơn thuần**: đo nguyên tác, đặt ngưỡng, chưa có gì để đối chiếu ngược. Phần "phát hiện
chính" kiểu EMB (nhân vật nào rò giọng AI, cụm nào bị lặp) **sẽ viết sau**, khi đã có
chương nháp thật để soi — không đoán trước.

## Bảng đo — 123 chương văn xuôi, đối chiếu với `targets.md`/`hard-rules.md`

Hai công cụ đo bằng hai thuật toán khác nhau trên cùng một mẫu, nên số **gần nhau
nhưng không trùng khớp tuyệt đối** — đây là bằng chứng chéo, không phải mâu thuẫn.

| | `measure_gate.py` (mốc nền `gate.author`) | `style_metrics.py` (`targets.md`) |
|---|---|---|
| Số từ TB/chương | 2.739,5 | 2.820 (trung vị 2.673) |
| Câu trung vị | **9** | **9** ✅ khớp |
| Câu dài | 0,9% (ngưỡng **≥35 từ**) | 2,4% (ngưỡng ≥30 từ — ngưỡng thấp hơn nên % cao hơn, hợp lý) |
| Đoạn TB | 28,2 từ | 29,7 từ |
| Chấm lửng /10k | **114,0** | suy từ hard-rules ("~89 từ/lần") ≈ **112,4** ✅ khớp rất sát |
| Mật độ thuật ngữ /1000 | 7,78 (đo trên **toàn corpus gộp**) | 8,96 TB (đo **trung bình mỗi chương** — bị kéo lên bởi các chương ngắn có tỉ lệ cao) |

Hai chỗ khớp gần tuyệt đối (câu trung vị, chấm lửng) cho độ tin cậy cao vào phương pháp.
Hai chỗ lệch (số từ, mật độ thuật ngữ) đều **giải thích được bằng khác biệt thuật toán**,
không phải lỗi đo — không cần sửa.

## ✅ Đã vá — `ital10k` từng đo ra 0,0 giả, nay đo lại ra 54,4 thật

**Phát hiện 04/09, vá cùng ngày sau khi Aurel cấp quyền truy cập kho `AureLysn-Kho`.**

Lần đo đầu tiên `ital10k` ra đúng **0,0/10k trên cả 123 chương**. Đây **không phải** vì
tác giả không dùng in nghiêng — đó là **lỗi trích xuất**: `03_Workspace/untch-extract/
extract_all.py` dùng `detag()` xoá **toàn bộ** thẻ HTML (`re.sub(r"(?s)<[^>]+>", "", s)`),
kể cả `<em>` (nguồn dùng đúng 1.847 cặp `<em></em>`, không có `<i>`), mà **không** đổi
chúng thành `*dấu sao*` markdown trước khi xoá. `chapter_gate.py.measure()` đếm in
nghiêng bằng regex tìm cặp `*...*` — văn bản trích xuất không còn dấu sao nào thì kết
quả **luôn luôn là 0**, bất kể nguyên tác dùng in nghiêng bao nhiêu lần thật.

**Cách vá.** Sửa `detag()`: chuyển `<em>x</em>` → `*x*` **trước khi** xoá thẻ, kèm một
hàm phụ `_em_to_md()` để **đưa khoảng trắng đầu/cuối ra NGOÀI dấu `*`** thay vì xoá — một
vài đoạn `<em>` trong nguồn có khoảng trắng ngay bên trong thẻ (vd. `<em>control </em>his`
→ nếu xoá thẳng khoảng trắng đó sẽ dính hai từ liền nhau thành `*control*his`). Kiểm
trước khi sửa: 1.847/1.847 cặp `<em></em>` không lồng nhau, không băng qua ranh giới
đoạn, 0 dấu `*` lạc trong 123 chương văn xuôi chính (1 dấu `*` duy nhất trong toàn bộ
127 chương nằm ở ch75, một mặt cười trong chương MNet, không liên quan). Đối chiếu sau
khi sửa: 126/127 chương khớp tuyệt đối tổng số từ với bản trước khi sửa; chương còn lại
(ch75, chương MNet, **không** nằm trong mẫu 123 chương dùng làm `gate.author`) lệch đúng
2 từ vì một thẻ lồng hiếm gặp (`<em><u>wants</u></em>`) — đã ghi nhận, không ảnh hưởng
tới số đo dùng thật.

**Kết quả đo lại:** `ital10k` từ **0,0 (giả)** → **54,4 (thật)**. Tất cả chỉ số khác
**không đổi** (đúng như dự đoán — chỉ có markup in nghiêng thay đổi): `words 2739,5`,
`sent_median 9`, `long_pct 0,9`, `para_mean 28,2`, `q10k 91,3`, `excl10k 40,5`,
`ell10k 114,0`, `term1k 7,78`, `had10k 165,6` — mọi số khác trùng khít với lần đo đầu,
xác nhận bản vá chỉ chạm đúng phần in nghiêng.

`gate.targets.ital10k_min` đổi từ `0` (tắt hẳn, vì không có số thật để ép) sang **`32`**
(~59% mốc nền 54,4 — cùng tỉ lệ khoảng với `ell10k_min`, `q10k_min` phía trên). Khối
`targets:` cấp cao nhất (dùng cho `ai_tells_check.py`) cũng thêm `italic_per_10k_min: 32`
— xem ghi chú ở mục dưới về vì sao khoá này **không có tác dụng** với script đó.

## Về `targets:` cấp cao nhất (dùng cho `ai_tells_check.py`)

Khai bốn khoá: `long_sentence_pct_max`, `question_per_10k_min`, `exclam_per_10k_min`,
`italic_per_10k_min` (dùng chung số với `gate.targets` phía trên, hai công cụ đếm từ hơi
khác nhau nhưng chênh lệch không đáng kể ở mức ngưỡng heuristic).

⚠️ **`italic_per_10k_min` ở đây không có tác dụng thật với `ai_tells_check.py`.**
`ai_tells_check.py` chỉ đọc khoá `italic_per_10k_**max**` (ép trần, cảnh báo nếu **dùng
quá nhiều**), trong khi `chapter_gate.py` đọc `ital10k_**min**` (ép sàn, cảnh báo nếu
**dùng quá ít**) — hai công cụ định nghĩa NGƯỢC HƯỚNG nhau cho cùng một chỉ số.
`EMB/style/ai-tells.md` cũng khai `italic_per_10k_min` ở khối `targets:` cấp cao nhất và
gặp đúng vấn đề này — khoá đó trong file EMB **không có tác dụng gì với script này**,
chắc là sai sót có sẵn từ trước, không phải riêng của UNTCH. Giữ khoá `_min` ở đây là để
**tài liệu hoá con số** (nhất quán với `gate.targets.ital10k_min`), không phải để script
này thực sự ép nó. Không tự sửa `ai_tells_check.py` ở đây (không phải việc đang làm); ghi
lại để Aurel biết nếu muốn sửa sau — sửa đúng chỗ là đổi `cmp_target("italic_per_10k", …, "max")`
thành đọc cả `_min` lẫn `_max` tuỳ khoá nào có mặt.

**Cố ý bỏ trống:**
- `not_fragment_per_10k_max` — cấu trúc "Not X. It was Y." (phủ định cụt rồi sửa lại)
  là tật của **văn AI viết ra**, đo được bằng cách so AI với nguyên tác. UNTCH chưa có
  chương AI nào để so. Để trống thì `ai_tells_check.py` vẫn **báo warning** nếu gặp cấu
  trúc đó (không hard-fail vì thiếu cap) — đủ dùng cho tới khi có chương nháp thật để
  hiệu chỉnh ngưỡng, giống đúng cách EMB đã làm (đối chiếu 6 chương AI với 43k từ gốc).

⚠️ **Phân biệt quan trọng, giống EMB:** hard-rules.md mục D nói câu cực ngắn (≤3 từ,
15,3%) là **chữ ký của tác giả, không phải tật**. Construct `not_fragment` trong
`ai_tells_check.py` **không** bắt câu ngắn nói chung — nó chỉ bắt nhịp cụ thể "phủ định
1-2 chữ rồi câu sau sửa lại nó thật ra là gì" (ví dụ tật của EMB: *"Not danger."* → rồi
giải thích). Đừng nhầm hai thứ khi đọc cảnh báo sau này.

## `terms` — dùng nguyên danh sách đã chốt ở `targets.md`

`Flames, villain, hero, quirk, Vongola, soulmate, Sky, mafia, Flame, Cloud, Element, bond,
Hyper Intuition, Storm, Mist, Rain, Sun` — không đổi. `term1k_min: 5,0` lấy nguyên ngưỡng
đã chốt ở `targets.md` ("Ngưỡng: ≥ 5,0/1000"), không suy ra số mới từ mốc nền
`measure_gate.py` (7,78) để khỏi có hai ngưỡng khác nhau cho cùng một khái niệm.

## Chưa làm

- `forbid_patterns` (khối `gate:`) và `extra_constructs` (khối `targets:` cấp cao) —
  chưa khai gì, chưa có chương AI nào để soi ra tật riêng của UNTCH kiểu "on the record"
  của EMB. Bổ sung sau khi có chương nháp đầu tiên của `aurel-main` (bước 9) và review.
  Nếu `aurel-watch` sinh ra tật khác (do khung tường thuật khác, đa nhân vật xem cùng
  lúc), ghi thêm vào đây chứ không tách file riêng — vẫn một mốc nền, một giọng.
- Chưa nối cổng kiểm này vào một bước tự động của skill viết chương (hiện phải chạy tay).
- Sửa lỗi khoá `italic_per_10k_min`/`_max` không khớp giữa `chapter_gate.py` và
  `ai_tells_check.py` (ghi nhận ở mục trên, không thuộc phạm vi UNTCH, không tự sửa).
- Ca lệch 2 từ ở ch75 (thẻ `<em><u>wants</u></em>` lồng nhau, xem mục vá italic ở trên)
  — không ảnh hưởng `gate.author` (ch75 là chương MNet, ngoài mẫu 123 chương), để
  nguyên, không đáng công sửa sâu hơn vào `detag()`.

---

> **Nguồn gốc.** `gate.author` đo lần đầu 04/09/2026, đo lại cùng ngày sau khi sửa
> `03_Workspace/untch-extract/extract_all.py` (bản vá italic — xem mục ở trên;
> `nhat-ky-loi-lam-viec.md#L16`), bằng `03_Workspace/untch-extract/measure_gate.py` chạy
> trên 123/127 chương đã tách của `03_Workspace/untch-extract/chapters/` (bản trích từ
> `Untouchable.html`, kho `personal-archive`). `targets.md`/`hard-rules.md` đo cùng ngày
> 31/08/2026 bằng `style_metrics.py` — số liệu ở đó **không đổi**, file này chỉ đối
> chiếu, không ghi đè.
