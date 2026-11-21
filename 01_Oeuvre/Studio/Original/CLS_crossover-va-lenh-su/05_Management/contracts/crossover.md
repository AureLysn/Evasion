---
id: rule.CLS.crossover
type: rule
scope: project
project: CLS
universes: [KHR, BSD, DC, HSR]
lane: personal
canon_layer: user_canon
status: active
strength: hard
aliases: ["hop dong crossover CLS", "crossover contract CLS", "luat ghep the gioi", "power policy CLS", "he suc manh nao thang", "lenh su la gi", "KHR x BSD x DC x HSR"]
related: ["[[CLS]]", "[[khung-chieu-xem-gop]]", "[[hai-vong-chieu]]", "[[ba-nguoi-da-quen-o-phia-duoc-chieu]]", "[[moc-thoi-gian-ca-ba-o-day]]", "[[the-gioi-thu-ba-batman]]", "[[watch-frame]]", "[[luat-doi-xung-quan-he-ngang-hang]]", "[[lech-su-la-suc-manh-menh-do]]", "[[q-can-bang-suc-manh]]", "[[hsr]]", "[[05_Evasion/01_Oeuvre/Database/Fandom/HSR/Lore/Emanator|Emanator (canon)]]"]
source:
  type: user_input
  ref: "Aurel 13/09/2026: giu khung lenh su HSR, ba the gioi. 14/09: timeline. 24-25/09: suc manh menh do, khung Aeon. 03/10: mo pham vi HSR, menh do Dazai va Jason, khung chieu-xem-gop. 04/10: ba nguoi da quen o phia duoc chieu; ho tro khac tham gia."
authority: user
confidence: 0.9
always_load: true
load_for: [writer, planner, continuity-reviewer]
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-11-21
---

# Hợp đồng crossover — CLS

> ✅ **`active`** — sáu trường đã đủ. Viết lại gọn 04/10/2026; nội dung từng dòng trỏ về quyết định đã chốt nó.

## 1. `universes`

| Vai trò | Thế giới | `Database/Fandom/` |
|---|---|---|
| **Sân khấu của vòng 1, và phía xem** | **HSR** — mở toàn bộ, tra theo nhu cầu *(từ 03/10)* | ✅ [[hsr]] — Aeon, Cảnh Binh, Planarcadia, Ashveil, Boothill, Welt, Aventurine |
| Thế giới của Tsuna | **KHR** | ✅ có |
| Thế giới của Dazai | **BSD** | ✅ có |
| Thế giới của Jason | **DC / Batman** — **không đào sâu canon** ([[the-gioi-thu-ba-batman]]) | ✅ có, mức tối thiểu |

Ba lớp của truyện — [[khung-chieu-xem-gop]]:

| Lớp | Là gì |
|---|---|
| **Phía được chiếu** | thế giới trong phim: ba người đã bị thay chỗ ở nhà mình, đã quen nhau, và đã đi qua các sự kiện HSR |
| **Phía xem** | vũ trụ HSR nơi các sự kiện ấy diễn ra **theo canon**, không có ba người |
| **Thế giới gộp** | hình thành **sau khi xem**: phía xem gộp với ba thế giới KHR · BSD · DC nơi chuyện chưa bắt đầu |

## 2. `interaction.mode` — **người đi sang, và phim đi sang**

- **Người:** ở phía được chiếu, ba nhân vật trục **có mặt trong** vũ trụ HSR và tham gia sự kiện của nó. Ai đưa họ sang: **chưa quyết**, và arc 1 không nói.
- **Phim:** chuyện ở phía được chiếu được chiếu cho người phía xem. Bản thân việc phim đi qua ranh giới **đã là tương tác crossover**. Luật phòng chiếu: [[watch-frame]].
- **Vòng 2** đưa phim về KHR · BSD · DC của phía được chiếu ([[hai-vong-chieu]]).

## 3. `timeline`

**Ba nhân vật trục** — [[moc-thoi-gian-ca-ba-o-day]] là bản đầy đủ:

| Nhân vật | Mốc ở thế giới của mình |
|---|---|
| **Jason** | sau *Under the Hood*; cơn giận còn nguyên; chưa hoà giải với ai |
| **Dazai** | cuối quãng khoảng hai năm ẩn mình — canon không kể, **CLS tự lấp** |
| **Tsuna** | thói quen tự rút lui đã thành phản xạ — mốc canon cụ thể **chưa xác minh** |

**Trong phim**, các sự kiện HSR xảy ra theo thứ tự **Penacony *(Tsuna)* → Amphoreus *(Dazai)* → Planarcadia *(Jason)***; ba người quen nhau **trước cả** các sự kiện ấy. Thứ tự chiếu: khung mới quyết
([[ba-nguoi-da-quen-o-phia-duoc-chieu]]).

## 4. `memory` — **giữ nguyên**

Ai sang vũ trụ HSR cũng mang đầy đủ ký ức và tính cách của mình. Không ai bị xoá ký ức, không ai bị đặt lại tuổi.

## 5. `power_policy` — **không quy đổi được**

```yaml
direct_scaling: false
convertible: false
```

- Flame của Vongola, dị năng BSD, trang bị của Red Hood **không phải cùng một loại năng lượng**. Một nhân vật có thể học cách **nhận ra** hệ kia mà không dùng được nó.
- **Lệnh sứ là sức mạnh mệnh đồ chồng lên** hệ địa phương — không thay nó, không giải thích lại nó. Cơ chế **không giải thích** trong truyện ([[lech-su-la-suc-manh-menh-do]]).
- Mệnh đồ: **Jason — Săn bắn** *(Lan)* · **Dazai — Ký ức** *(Fuli)* · **Tsuna — Hòa Hợp** *(Xipe)*.
- Sức mạnh Săn bắn của Jason: đã chọn mục tiêu thì không trượt; tả bằng hệ quả (Aurel 04/10/2026).
- **Hỗ trợ khác với trực tiếp tham gia**: một nhân vật trục trực tiếp tham gia việc của người kia thì **phải có cảnh người ấy gọi nhờ** (Aurel 04/10/2026).
- Có cần một luật **cân sức mạnh** giữa ba lệnh sứ không: **chưa quyết** — [[q-can-bang-suc-manh]]. Chưa quyết thì **không viết cảnh so sức mạnh** giữa ba người.

## 6. `canon_priority`

```
CLS/decisions/  >  CLS/canon/  >  Database/Fandom/<the gioi>/  >  canon goc cua franchise
```

CLS là **sáng tác gốc**, nên canon franchise là **tham chiếu, không phải luật**. Chỗ CLS **cố ý** đi khác canon HSR được khai ở dàn ý của arc *(mục 「Thay canon ở đâu」)*, để phiên sau không 「sửa lại cho đúng」.
Hai bộ của 陌上若非花 **không** nằm trong thang này: chúng là bản đối chiếu về kết cấu.

Hai hệ luật đá nhau mà thang trên không tách được → **dừng và hỏi Aurel**.
