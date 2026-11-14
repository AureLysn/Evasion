---
id: question.CCHT.q-do-van-phong-tu-ban-convert
type: question
scope: project
lane: personal
project: CCHT
canon_layer: planned
status: unresolved
needed_before:
  arc: "style"
  chapter: "truoc khi chay analyze-style va truoc khi viet signature.md cho CCHT"
decision_owner: user
aliases: ["do van phong tu convert", "signature CCHT do o dau", "convert co do duoc van phong khong", "hai lop van xem anh the", "style CCHT"]
related: ["[[CCHT]]", "[[nguyen-tac-convert]]", "[[quy-uoc-ma-project]]"]
source:
  type: measured
  ref: "Do 13/09/2026 trong phien Claude Code: metadata OPF cua Cương cát Yokohama!.epub khai language=vi, source=jjwxc/1/8721957 — tuc ban dich may tu nguyen van Trung, khong phai nguyen van"
authority: ai
confidence: 0.9
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-13
---

# Đo văn phong ở đâu, khi nguồn duy nhất là bản convert?

> ⚠️ Đây là câu hỏi **CHƯA CHỐT**. Không phương án nào dưới đây được dùng như sự thật.
> Khi chốt, tạo note `decision` và đổi `status: resolved`.

## Vì sao cần quyết

Luật 6 của [[quy-uoc-ma-project]]: *"Style đo theo từng truyện. Mỗi fic mimic một tác giả
khác nhau — không dùng chung."* Và [[CCHT]] ghi cảnh báo *"chưa có signature thì đang bịa
giọng, không phải mimic."*

Nhưng nguồn tầng ① là **bản convert** (`language: vi`, dịch máy từ 晋江). Chạy `analyze-style`
trên nó thì con số thu được mô tả **máy dịch**, không mô tả 霜湘家的猫. Độ dài câu, nhịp,
cách ngắt đoạn — ba thứ `style_metrics` đo — đều bị máy dịch viết lại.

Và xem ảnh thể có **hai lớp văn với hai chủ sở hữu khác nhau**, nên một lần đo không đủ:

| Lớp | Giọng của ai |
|---|---|
| Khối đang chiếu (trong 【 】 hoặc quy ước tương đương) | 霜湘家的猫 — tầng ① |
| Phản ứng khán giả, phần ngoài màn hình | **Aurel** |

## Các phương án — chưa cái nào được chọn

**A. Chấp nhận bản convert làm mốc đo cho lớp chiếu.**
Lý: nếu bản của Aurel viết bằng tiếng Việt và khối 【 】 trích/rút gọn thẳng từ convert, thì
convert *chính là* văn bản người đọc Việt gặp. Cái đang mimic là bản convert, và điều đó
nhất quán.
Giá: `signature` sẽ mang đặc trưng máy dịch (lặp hư từ, trật tự Hán-Việt sống sượng). Phải
khai rõ trong `signature.md` là đo trên convert, đừng để đời sau tưởng là giọng tác giả.

**B. Tìm nguyên văn Trung của 晋江 book 8721957, đo trên đó.**
Lý: đúng luật 6 theo nghĩa đen.
Giá: cần tải thêm; và số đo tiếng Trung (ký tự/câu) **không quy đổi thẳng** sang ngưỡng
tiếng Việt của `style_metrics`. Muốn dùng phải định nghĩa lại cách quy đổi trước.

**C. Tách hai hồ sơ.** `signature-chieu.md` đo từ convert (hoặc nguyên văn), `signature-aurel.md`
đo từ mẫu văn của chính Aurel; `targets.md` khai ngưỡng riêng cho từng lớp.
Lý: khớp đúng thực tế hai lớp văn.
Giá: chưa project nào trong vault làm kiểu này — `chapter_gate.py` đọc **một** khối `gate:`
trong `style/ai-tells.md`. Chọn C thì phải kiểm xem cổng có chịu hai bộ ngưỡng không, hoặc
chấp nhận chạy gate hai lần.

## Chặn cái gì

- `analyze-style` cho CCHT
- `style/signature.md` · `style/targets.md` · khối `gate:` trong `style/ai-tells.md`
- Gián tiếp: `write-chapter` (cổng từ chối khi thiếu `gate:`)

**Không chặn:** `extract-entities` từ tầng ①, và `watch-frame-contract`. Hai việc đó đọc nội
dung chứ không đọc văn phong — làm được ngay.
