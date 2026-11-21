---
id: plan.PPCT.ch51-ds-plan
type: chapter_plan
scope: branch
lane: personal
project: PPCT
branch: deepseek-20261115
arc: arc-7-nguoi-xem-den-cuoi
chapter: 51
canon_layer: planned
status: planned
pov: [character.PPCT.tsuna]
target_words: "≥ 1.500 chữ Hán — dự kiến ~1.900"
aliases: ["plan ch51 ban DeepSeek", "dàn ý chương 51 bản song song", "邀请 ch51 PPCT", "loi moi ch51", "ket truyen chinh nhanh DeepSeek"]
related: ["[[ch47-ds-plan]]", "[[ch50-ds-plan]]", "[[ch50-ds-nhap]]", "[[ch49-ds-nhap]]", "[[bay-ngay-chi-la-loi-nhan-vat]]", "[[moc-bsd-truoc-cai-chet-cua-oda]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/structure/tropes|tropes]]"]
source:
  type: inference
  ref: "plan-continuation Mode 2, 17/11/2026 — chương 9 (cuối) arc 7, khép truyện chính nhánh deepseek-20261115, theo khung ch47–51 trong ch47-ds-plan (Aurel duyệt 17/11). Quyết định: canh-loi-moi-pov-tsuna-khong-ai-hien, loi-moi-hien-the-dap-an-cu-ket-mo (kết mở), quan-ca-phe-yokohama-sang-phien-ngoai, tsuna-mo-quan-ca-phe-o-yokohama, bay-ngay-chi-la-loi-nhan-vat."
authority: ai
confidence: 0.45
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-17
---

# Kế hoạch chương 51 bản DeepSeek — 邀请 · Lời mời · ✅ AUREL DUYỆT 17/11/2026

> Chương cuối arc 7 và **cuối truyện chính** của nhánh. POV Tsuna, sáng ngày 17, nối [[ch50-ds-nhap]] (Archer đi; chén rượu trong xe; Dazai mở cửa xe đợi). Ba việc phải khép: người phụ nữ ở ghế sau đi đâu; lời mời hiện thế (**có xuất hiện, không ai nhận trên trang, không cơ chế** — loi-moi-hien-the-dap-an-cu-ket-mo, canh-loi-moi-pov-tsuna-khong-ai-hien); đường về Yokohama, dừng **trước** quán (quán và Mori là phiên ngoại — quan-ca-phe-yokohama-sang-phien-ngoai).

## Mục tiêu chương

Người xem đi về. Chiến tranh xong mà tổ Caster không thắng ai. Họ trả lại một người, gửi đi một lời mời không ai trả lời trước mắt người đọc, rồi lái xe về nhà. Lời Tsuna ở ch2 — 「那么接下来的七天请多多指教了，太宰。」 — được nhắc lại như lời nhân vật: bảy ngày đã qua từ lâu, và không ai nói tiếp theo là bao lâu.

## Beat bắt buộc

1. **Cô tự xuống xe *(C1 — Aurel)*.** Xe đi qua khu đã cháy. Người phụ nữ tỉnh, ngồi dậy, nhìn ra cửa sổ. Cô xin xuống ở một góc phố; Dazai dừng xe. Trước khi đi, cô nhìn Tsuna một lần (cô vẫn không biết cậu là ai) — tối đa một câu ngắn. Cô tự đi tìm người của mình; Tsuna **không biết** cô đi đâu. Không tên ai.
2. **Lời mời *(C2, C3, C4 — Aurel: để DeepSeek/GPT đề xuất)*.** Lời mời phải **xuất hiện**, không ai nhận trên trang, không cơ chế, không tên, không gì đáp lại. Nơi, hình thức (lời hay cử chỉ), phản ứng của Dazai: DeepSeek viết **2–3 cách**, GPT chấm, Claude chọn theo luật kết mở. Gợi ý ban đầu: cây cầu lớn (nơi Rider ngã ở ch45), nói thành tiếng, Dazai không hỏi.
3. **Bảy ngày *(C5 — để DeepSeek/GPT đề xuất)*.** Câu ch2 「那么接下来的七天请多多指教了，太宰。」 có thể được nhắc lại như lời nhân vật (ai nhắc, có nhắc hay không: DeepSeek viết 2–3 cách, GPT chấm). Không ai đáp bằng con số.
4. **Đường về *(C6 — để DeepSeek/GPT đề xuất)*.** Đường cao tốc, nắng; chén rượu của vua: uống hay không, ai uống — DeepSeek viết 2–3 cách, GPT chấm. Một cử chỉ tối đa.
5. **Yokohama *(C7 — để DeepSeek/GPT đề xuất)*.** Vào Yokohama; điểm dừng (biển, căn cứ, biển báo, một mặt tiền cho thuê…) do DeepSeek viết 2–3 cách, GPT chấm. Luật: **không** quán cà phê thành chữ, không Mori/Chuuya/Oda. Dừng — **hết truyện chính**.

## Hook phải chạm

- loi-moi-hien-the-ai-nhan — lời mời **xuất hiện**, câu trả lời **không** lên trang. Chạy `pov_leak_check` (leak_terms).
- irisviel-song / tsuna-cuu-irisviel — khép mở: cô tự đi tìm người của mình, ngoài tầm nhìn của Tsuna.
- tsuna-mo-quan-ca-phe-o-yokohama — có thể gieo bằng hình ảnh tuỳ kết được chọn (C7), không nói "quán cà phê".
- [[hook-can-dazai-de-thang-archer]] / lệnh chú — Dazai vẫn giữ đạo cuối; không nhắc.

## Tuyến cỡ trung — gieo → trả

| Tuyến | Gieo | Trả | Khoảng |
|---|---|---|---|
| Người phụ nữ ghế sau | ch47 | ch51 ① | 4 (trong cùng một đêm) |
| Chén rượu | ch50 | ch51 ④ | 1 ✓ |
| 「接下来的七天」 | ch2 | ch51 ③ | dài — nhắc lại có chủ đích |

## Bí mật / chi tiết — cho phép và CẤM

- 🔴 Leak terms của loi-moi-hien-the-ai-nhan: 「接受了邀请」「答应了邀请」「拒绝了邀请」「答应留下」「决定留下来」「留在这个世界」「重新现界」 và mọi câu cho thấy ai nhận / từ chối; không ai hiện, không bóng người, không tiếng đáp, không ánh sáng đáp lại.
- 🔴 Không cơ chế lời mời; không 白兰, kế vị, 7³, Tri-ni-sette; nhẫn Mare không làm gì.
- 🔴 Không giải thích vì sao Tsuna vẫn còn sau khi Chén vỡ.
- 🔴 Không 容器; không tên người phụ nữ, Kiritsugu, đứa trẻ, Saber/Rider/Lancer/Berserker trong lời mời *(C3)*.
- 🔴 Không Waver, không Archer, không Mori, không Chuuya, không Oda; không quán cà phê thành chữ.
- 🔴 Dazai không dùng đạo cuối, không dị năng.

## Ngân sách theo cảnh

| Cảnh | Chữ Hán | Beat |
|---|---|---|
| 51-1 Cô xuống xe | 450 | 1 |
| 51-2 Cầu | 600 | 2 |
| 51-3 Đường về | 500 | 3–4 |
| 51-4 Yokohama | 350 | 5 |
| **Tổng** | **~1.900** | |

## Chỉ tiêu văn phong riêng chương này

- Đời thường sau trận: nhịp chậm, thoại 25–40 %; motif mắt / nhìn ≥ 1.
- Không tuyết; tag thoại trước ngoặc; không tổng kết ("cuối cùng mọi thứ đã kết thúc" bị cấm); không cliffhanger.

## Định dạng

- Tiêu đề `【太纲无差】反派战争51`.
- Lời người viết tiếp: một hai câu, ghi **truyện chính (bản song song) hết**, phiên ngoại sau.

## Chọn của ch51 — ✅ Aurel duyệt 17/11/2026 (sửa C1; C2–C7 để DeepSeek/GPT đề xuất; "Duyệt, viết ch51")

| # | Câu hỏi | Đề xuất | Vì sao · phương án khác |
|---|---|---|---|
| C1 | Người phụ nữ đi đâu | ✅ Aurel: **Cô tự xuống xe** ở một góc phố, tự đi tìm người của mình; Tsuna không biết cô đi đâu | Đề xuất cũ (bệnh viện) bỏ |
| C2 | Lời mời ở đâu | ✅ Aurel: **để DeepSeek/GPT đề xuất** (gợi ý: cây cầu lớn) | — |
| C3 | Lời mời nói thế nào | ✅ Aurel: **để DeepSeek/GPT đề xuất** (luật: không tên, không cơ chế, không đáp lại) | Không tên = không gợi ai được mời / ai nhận. *Khác:* gọi tên từng người (rủi ro rò rỉ) ; không lời, chỉ một cử chỉ |
| C4 | Dazai lúc đó | ✅ Aurel: **để DeepSeek/GPT đề xuất** | — |
| C5 | Câu bảy ngày | ✅ Aurel: **để DeepSeek/GPT đề xuất** ([[bay-ngay-chi-la-loi-nhan-vat]]) | — |
| C6 | Chén rượu | ✅ Aurel: **để DeepSeek/GPT đề xuất** | — |
| C7 | Kết | ✅ Aurel: **để DeepSeek/GPT đề xuất** (luật: không quán cà phê thành chữ, không Mori/Chuuya/Oda) | — |

## Rủi ro trope (nói thẳng)

tropes dòng 18 (7³ thành cái cớ vạn năng): lời mời + Tsuna còn tồn tại sau chiến tranh dễ bị đọc là "vì bảo vật bầu trời". Giảm bằng: không nhẫn nào sáng, không giải thích, lời mời không có phản hồi, câu ở lại không xuất hiện.

## Thời điểm

Sáng ngày 17 → trưa (đường Fuyuki → Yokohama).

## Điều kiện trước `write-chapter`

| Điều kiện | Trạng thái |
|---|---|
| Khung ch47–51 | ✅ Aurel 17/11/2026 |
| Aurel duyệt C1–C7 | ✅ 17/11/2026 (C1 cô tự xuống xe; C2–C7 để DeepSeek/GPT đề xuất) |
| `pov_leak_check --pov tsuna` (leak_terms lời mời) sau bản nháp | sau khi viết |
| Crosscheck BSD (Yokohama) | không cần — không Mori/Chuuya/Oda lên trang ([[moc-bsd-truoc-cai-chet-cua-oda]] chỉ chặn khi họ xuất hiện) |

## Quyết định còn treo chặn chương này

Không có câu ❌. C1 Aurel chốt 17/11/2026: cô tự xuống xe.
