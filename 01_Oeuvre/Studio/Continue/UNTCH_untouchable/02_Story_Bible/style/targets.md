---
id: style.UNTCH.targets
type: style
scope: project
lane: personal
project: UNTCH
canon_layer: high_confidence_inference
strength: target
status: active
aliases: ["van phong UNTCH", "targets UNTCH", "do dai chuong Untouchable", "style profile UNTCH", "nguong van phong", "chuong bao nhieu tu"]
related: ["[[UNTCH]]", "[[hard-rules]]", "[[nguyen-tac-ao3]]", "[[bien-ban-su-kien-untch]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable/00_Overview/drop-point|drop-point]]"]
source:
  type: measured
  ref: "Do bang 01_Origine/04_Tools/VaultTool/style_metrics.py qua 03_Workspace/untch-extract/measure_all.py tren 127/127 chuong da tach (343.418 tu, khop moc nen). Chay 31/08/2026."
authority: ai
confidence: 0.95
always_load: false
tags: [d/fanfic, p/personal]
legacy_tags: [k/style]
last_updated: 2026-08-31
---

# Hồ sơ văn phong — UNTCH

> **Đây là số đo, không phải cảm nhận.** Toàn bộ con số dưới đây lấy từ `measure_all.py`
> chạy trên bản văn xuôi đã tách, đã qua ba cổng kiểm (byte / số chương / tổng từ).
> Chạy lại được bất cứ lúc nào: `python3 03_Workspace/untch-extract/measure_all.py`.

## Mẫu đo — và vì sao tách làm hai

**Aurel chốt 31/08/2026:** bốn chương log chat MNet (**ch54 · ch71 · ch75 · ch115**) **loại
khỏi mẫu chính, đo riêng.** Số liệu xác nhận quyết định đó là đúng, không phải chuyện hình thức:

| | 123 chương văn xuôi | 4 chương MNet |
|---|---|---|
| Độ dài đoạn trung bình | **29,7 từ** | **11,5 từ** |
| Trung vị độ dài đoạn | 20,5 từ | **4,0 từ** |
| Tỉ lệ đoạn thoại | **0,255** | 0,076 |
| Số đoạn / chương | 98,3 | **165,8** |
| Mật độ thuật ngữ /1000 | 8,96 | 5,88 |

⇒ Trộn chúng vào sẽ kéo độ dài đoạn xuống **~29 → ~29,1** thì không đáng kể, nhưng kéo
**trung vị đoạn và tỉ lệ thoại lệch hẳn** — và mọi bản nháp văn xuôi đem so sẽ trượt chuẩn.

## Ngưỡng độ dài chương

**Mục tiêu: 2.049 – 3.877 từ** (khoảng p10–p90 của mẫu chính).

| | |
|---|---|
| Trung vị | **2.673 từ** ← đây là con số nên nhắm |
| Trung bình | 2.820 từ |
| Độ lệch chuẩn | 753 từ |
| Ngắn nhất | 699 từ (**ch1**, prologue — ngoại lệ duy nhất) |
| Dài nhất | 5.466 từ (ch41) · 5.400 (ch108) · 4.481 (ch123) |

⚠️ **ch1 là ngoại lệ có chủ đích**, đừng lấy làm chuẩn. Chương ngắn thứ hai đã là 1.779 từ (ch109).
Dưới **1.700 từ** là lệch giọng, trừ khi cố ý làm prologue/interlude.

## Câu

Đo trên **31.778 câu** của mẫu chính.

| | |
|---|---|
| Trung bình | **10,6 từ/câu** |
| Trung vị | **9 từ** |
| p10 – p90 | 2 – 21 từ |
| Câu ≤ 3 từ | **15,3%** |
| Câu ≤ 6 từ | **34,9%** |
| Câu ≥ 30 từ | 2,4% |

🔴 **Một phần bảy số câu trong fic dài không quá ba từ.** Đây là **đặc trưng mạnh nhất của
giọng văn này** và là chỗ dễ trượt nhất khi viết tiếp: văn AI mặc định cho ra câu 15–20 từ đều
đặn, còn tác giả thì nhịp rất gãy. *"Normally."* · *"But that just meant…"* · *"Right."*

## Đoạn

Đo trên **12.097 đoạn**.

| | |
|---|---|
| Trung bình | 29,7 từ |
| Trung vị | 20,5 từ |
| Đoạn chỉ **một từ** | 2,5% |
| Đoạn ≤ 5 từ | **17,8%** |
| Đoạn ≥ 100 từ | 2,5% |
| **Đoạn một câu ngắn (≤8 từ), đứng riêng làm nhịp ngắt** | **19,6%** |

🔴 **Cứ năm đoạn thì một đoạn là một câu ngắn đứng một mình.** Đây là **nhịp thở của fic**.
Bỏ nó đi thì văn đúng nội dung nhưng sai giọng ngay lập tức.

Đoạn dài nhất mẫu chính: **482 từ** (cảnh điểm danh cả gia đình trong một phòng) — tác giả
**có** viết đoạn rất dài, nhưng chỉ khi liệt kê/quét toàn cảnh.

## Thoại

| | |
|---|---|
| Tỉ lệ đoạn mở đầu bằng dấu thoại | **0,255** (trung vị 0,25) |
| Khoảng thực tế | 0,00 – 0,67 |
| Chương ít thoại nhất | ch1 · ch3 · ch7 · ch68 · ch80 (= 0,00) |
| Chương nhiều thoại nhất | ch48 (0,67) · ch117 (0,54) · ch87 (0,51) |

⇒ **Biên độ rất rộng.** Tác giả sẵn sàng viết cả chương không một câu thoại, và cả chương
gần như toàn thoại. **Đừng ép mọi chương về 0,25** — hãy chọn theo loại chương.

## Mật độ thuật ngữ

`Flames, villain, hero, quirk, Vongola, soulmate, Sky, mafia, Flame, Cloud, Element, bond, Hyper Intuition, Storm, Mist, Rain, Sun` chia cho tổng số từ.

**Ngưỡng: ≥ 5,0 / 1000** (mẫu chính đạt trung bình **8,96**, trung vị 8,30; khoảng 0,50 – 26,43).

Tổng lượt xuất hiện, mẫu chính:

| Thuật ngữ | Lượt | Thuật ngữ | Lượt |
|---|---|---|---|
| Flames | 545 | Flame | 112 |
| villain | 447 | Cloud | 76 |
| hero | 443 | Element | 49 |
| quirk | 442 | bond | 45 |
| Vongola | 293 | Hyper Intuition | 41 |
| soulmate | 205 | Storm | 31 |
| Sky | 193 | Mist | 25 |
| mafia | 113 | Rain 23 · Sun 20 | |

⚠️ **Đọc bảng này cho đúng.** `Flames` (545) áp đảo `bond` (45) **gấp hơn mười lần**, dù bond
mới là thứ cả cốt truyện xoay quanh. Tác giả **nói về Flames, và để bond tự hiện ra qua hành
động** — chứ không gọi tên nó. Viết tiếp mà nhồi chữ "bond" là lệch giọng, dù đúng nội dung.

## Chương MNet — hồ sơ riêng

Dùng khi viết chương log chat, **không** dùng cho văn xuôi.

| Chương | Số từ | Tỉ lệ thoại | Độ dài đoạn TB |
|---|---|---|---|
| ch54 | 1.768 | 0,037 | 9,5 |
| ch71 | 1.177 | 0,000 | 7,7 |
| ch75 | 2.451 | 0,166 | 15,6 |
| ch115 | 2.185 | 0,102 | 13,1 |

**Ngưỡng riêng:** 1.180 – 2.450 từ · độ dài đoạn 8–16 từ · trung vị đoạn **4 từ** ·
số đoạn/chương ~166 · mật độ thuật ngữ trung bình 5,88/1000.

⇒ Chương MNet **ngắn hơn, vụn hơn, và ít thuật ngữ Flame hơn hẳn** — vì nhân vật đang nói
chuyện công khai trên mạng xã hội và **không nhắc tới Flames ở đó** (`Sky` 0 lượt, `bond`
0 lượt, `Mist/Cloud/Storm/Sun` 0 lượt trong cả bốn chương). **Đó là một luật, không phải ngẫu nhiên.**

## Nhịp bố cục chương

- Chương được chia bằng dấu ngắt cảnh **`…` đứng riêng một dòng**, không dùng `***` hay `---`.
- Mỗi chương thường có **2–4 POV**, mỗi POV một khối, phân cách bằng dấu ngắt trên.
- POV **luôn là ngôi ba giới hạn**, và **gọi nhân vật bằng tên riêng theo cách chính nhân vật đó
  nghĩ về mình** (Aizawa nghĩ mình là *Shouta*; Todoroki là *Shouto*; Tokoyami là *Fumi*;
  Shinsou là *Hitoshi*) — nhưng **gọi người khác bằng họ** (*Sawada*, *Todoroki*). Đây là
  **chỉ dấu POV mạnh nhất trong fic** và là lỗi dễ mắc nhất khi viết tiếp.

## Cách dùng

```
python3 01_Origine/04_Tools/VaultTool/style_metrics.py <chuong.md> --project 05_Evasion/01_Oeuvre/Studio/Continue/UNTCH_untouchable
```

Exit 0 = đạt · 1 = lệch target · 2 = vi phạm hard rule (xem [[hard-rules]]).
