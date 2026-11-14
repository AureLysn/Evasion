---
id: decision.EMB.uu-tien-nguon
type: decision
scope: project
lane: personal
project: EMB
canon_layer: project_locked
status: active
aliases: ["uu tien nguon", "ho so cu", "file nao thang", "precedence nguon KOHAKU", "xung dot ho so"]
related: ["[[sources/_MOC|sources]]", "[[EMB]]"]
always_load: false
tags: [d/fanfic, k/rule, p/personal]
legacy_tags: [decision, conflict, staleness]
last_updated: 2026-08-15
---

# Quyết định — file nào thắng khi hồ sơ mâu thuẫn

## Quyết định

Khi hai file hồ sơ KOHAKU nói khác nhau, thứ tự ưu tiên là:

```
comment AO3 cua tac gia  >  TRITHUC-KOHAKU  >  DANY-KOHAKU
   >  van ban fic goc  >  HOSO-KOHAKU  >  Ho_so_truyen_ExMafiaBoss
```

Hai file cuối mang `status: superseded`. Chúng **không bao giờ thắng** một tranh chấp.

**Ngoại lệ duy nhất:** `HOSO-KOHAKU` §3.1–3.6 (phân tích văn phong) vẫn **có hiệu lực đầy đủ**. Phần đó đo từ chính văn bản gốc bằng script, không phụ thuộc comment tác giả, và đã kiểm chéo — khớp với đo lại. Xem [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/signature|signature]].

## Vì sao cần quyết định này

Bốn tiền đề nền của KOHAKU bị tác giả bác bỏ qua comment AO3, và hậu quả là **toàn bộ chương v1 và v2 bị xoá** (`DANY` §A2).

Hai file hồ sơ cũ **vẫn còn nguyên các tiền đề sai đó**, và:

- không có dấu phiên bản
- không có ngày cập nhật
- không có dòng nào nói mình đã bị thay thế
- mang cái tên nghe chính thống nhất trong cả bộ — *"Hồ sơ truyện"*
- không trùng một đoạn nào với bản mới, nên mâu thuẫn không lộ ra khi đọc lướt

Một agent được bảo *"đọc hồ sơ truyện"* sẽ mở đúng file sai và dựng lại đúng bốn lỗi cũ. Không có gì báo.

## Bốn tiền đề đã bị bác bỏ

| Sai (còn trong hai file cũ) | Đúng (TRITHUC I.3e/I.3f) |
|---|---|
| Kawahira là người ngoài đang dò xét, "đối tác giao dịch" | **Đã là Mist Guardian bên trái** từ trước Brat Arc Ch1 |
| Kyouya đứng ngoài, đang "courting" | Là **anh em họ** — cha Kyouya là em ruột nhỏ tuổi hơn nhiều của ông ngoại Tsuna. Cậu là **người nhà** |
| Lõi Flame đã ở trong người Tsuna | **Vẫn nằm trong cây sakaki**, gây các cơn phiêu tán *"floaty episodes"* |
| Con cáo là sinh vật lạ | **Chính là Natsu**, box animal kiếp trước, mang hình kudagitsune |

## Hệ quả cho hệ thống

Đây đúng là kịch bản `check-conflicts` được thiết kế để xử: một fact tầng `author_confirmed` xuất hiện muộn, làm hỏng nhiều chương đã viết.

Lần này chi phí là **bốn chương bị xoá** vì không ai biết chương nào chạm vào đâu. Có vault thì impact analysis chỉ ra ngay các note `character.kawahira` · `character.kyouya` · `fact.loi-flame` · `character.natsu` và mọi chương liên kết tới chúng — sửa ba chương thay vì bỏ bốn.

**Đây là lý lẽ mạnh nhất cho việc migrate KOHAKU vào vault**, và nó không phải giả định — nó đã xảy ra một lần rồi.
