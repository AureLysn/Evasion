---
id: style.PPCT.hard-rules
type: style
scope: project
lane: personal
project: PPCT
canon_layer: project_locked
status: active
strength: hard
aliases: ["hard rules PPCT", "luat cung van phong PPCT", "quy tac cung PPCT", "khong duoc vi pham PPCT"]
related: ["[[signature]]", "[[targets]]", "[[thoai-la-cau-trong-ngoac-kep]]", "[[go-quy-uoc-cam-trich-dazai-osamu]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten|phan-biet-cung-ten]]"]
source:
  type: measured
  ref: "Do 13/09/2026 tren 反派战争 ch1–15 + tien truyen; hai quyet dinh Aurel 13/09/2026"
authority: user
confidence: 0.9
always_load: true
load_for: [writer]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-09-25
---

# Luật cứng — vi phạm là lỗi, không phải lệch

> Mỗi luật phát biểu được thành **có/không**. Luật nào chưa đo được trên nguyên tác thì **không** vào đây.

## 1. Thoại đặt trong ngoặc kép

Nguồn: [[thoai-la-cau-trong-ngoac-kep]] (Aurel, 13/09/2026). Nguyên tác: thoại thường luôn trong `“”`; `「」` chỉ 6 lần / 28.131 chữ Hán, ở đoạn dệt từ tiểu thuyết Fate/Zero.

- ✅ Thoại trong ngoặc kép.
- ❌ Dùng `「」` làm dấu thoại.

## 2. Không kaomoji trong thân truyện chính

Nguyên tác: **0** trong 15 chương. Tiền truyện thượng: 1 lần (giai đoạn học trò).

- ❌ Kaomoji kiểu `( p_q)` trong chương chính.
- ✅ Được trong phiên ngoại/tiền truyện nếu bắt chước đúng giai đoạn đó.

## 3. Lời kể không dùng ngôi thứ nhất — trừ chế độ nhật ký

Nguyên tác: 「我」 ngoài ngoặc kép **2 lần / 15 chương**, cả hai là **nội tâm gián tiếp tự do của Waver**, có `韦伯…想 / 觉得` đi kèm (ch14, ch15). Tiền truyện hạ là ngoại lệ có khai báo: 「太宰视角第一人称，日记体」.

- ✅ Ngôi ba giới hạn.
- ✅ Một câu nội tâm gián tiếp ngôi một, **có tag `X想 / X觉得`** ngay sau.
- ✅ Chương/đoạn nhật ký ngôi một **khi đã khai báo** chế độ nhật ký.
- ❌ Người kể xưng "tôi/ta" ngoài hai trường hợp trên.

## 4. Trích văn Dazai Osamu phải có chú thích 注 và gắn "sách kiếp trước"

Nguồn: [[go-quy-uoc-cam-trich-dazai-osamu]]. Nguyên tác: ch10 và ch15, cả hai có 注 cuối chương ghi rõ tác phẩm và thiết lập 「太宰治前世/上辈子写的书」.

- ✅ Trích hoặc phỏng một câu, có 注 cuối chương nêu tác phẩm.
- ❌ Trích mà không chú thích.

## 5. Tiêu đề chương có tag CP vô sai + tên truyện + số

Nguyên tác: **15/15** — 【太纲无差】 hoặc 【纲太无差】 + 反派战争 + số chương (ch1–11 có ngoặc 「（N）」, ch12–15 không).

- ✅ `【太纲无差】反派战争（N）` hoặc `【纲太无差】…`.
- ❌ Tiêu đề thiếu tag CP hoặc gắn tag một chiều cố định cho cả truyện.

## 6. Không đặt tên sai thực thể cùng tên

Nguồn: [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten|phan-biet-cung-ten]] (`strength: hard`). Không lặp nội dung ở đây — đọc note đó.

## 7. Luật trên áp cho bản nháp tiếng Trung

Nguồn: [[viet-tieng-trung-roi-convert]] (Aurel, 13/09/2026). §1–§5 kiểm trên **bản nháp tiếng Trung**. Bản convert chỉ chuyển ngữ, xưng hô theo lối convert (我 → ta · 你 → ngươi · 他 → hắn · 她 → nàng).

## Chưa chốt — không phải luật cho tới khi Aurel quyết

Chi tiết convert: tên riêng giữ chữ Hán hay phiên âm, dạng ngoặc kép tiếng Việt, câu giữ nguyên tiếng Trung, danh sách từ cấm của briefing cũ — [[q-quy-uoc-convert]]. **Không chặn bản nháp tiếng Trung.**

## Cổng kiểm

ai_tells_check.py và style_metrics.py đã hỗ trợ đo chữ Hán.

✅ **Cập nhật 25/09/2026 — PPCT đã có [[ai-tells]]** (Aurel duyệt; ch36 là chương đầu chạy nó). `ai_tells_check.py --chapter <chương> --project PPCT` giờ kiểm **cứng**: §1 qua `project_4` (「说：「」 — 「」 **làm dấu thoại**, đúng lằn ranh ghi ngay dưới đây) và tag thoại sau ngoặc qua `project_3`. Vẫn kiểm tay: §2 kaomoji, §3 「我」 ngoài ngoặc kép (grep), §4, §5 bằng mắt. *(Đừng đưa §1 vào `forbid_chars`: §1 cấm `「」` **làm dấu thoại**, không cấm mọi `「」` — nguyên tác dùng 6 lần ở đoạn dệt từ Fate/Zero — còn `forbid_chars` là vi phạm cứng ở mọi chỗ.)*
