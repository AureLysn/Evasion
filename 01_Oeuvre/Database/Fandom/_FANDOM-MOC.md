---
id: moc.fandom-database
type: info
scope: global
lane: personal
canon_layer: user_canon
status: active
aliases: ["fandom moc", "canon fandom", "fandom database", "cac vu tru fandom"]
related: ["[[_OEUVRE-MOC]]", "[[04-lanes]]"]
tags: [d/fanfic, k/moc, p/personal]
last_updated: 2026-11-13
---

# `Database/Fandom/` — Shared Franchise Canon Map of Content

> **Role:** Kho tư liệu canon nguyên tác của các vũ trụ fandom dùng chung trong **AureLysn Vault**.
> **Contract:** Governed by [[04-lanes]] Part 2 (`scope: universe`). Nghiên cứu nguyên tác một lần, dùng lại cho mọi dự án cùng fandom. Tuyệt đối không ghi headcanon hoặc biến đổi tình tiết riêng của một dự án vào kho dùng chung này.

---

## 1. Danh Mục Các Vũ Trụ Fandom

| Universe | Mã Fandom | Quy mô dữ liệu hiện có | MOC chi tiết |
|---|---|---|---|
| **Katekyo Hitman Reborn!** | `KHR` | 61 ghi chú canon, hồ sơ nhân vật, luật Dying Will Flame và Trinisette | [[_KHR-MOC]] |
| **Boku no Hero Academia** | `BNHA` | 20 ghi chú: năng lực Quirk, tổ chức UA, anh hùng và tội phạm | [[_BNHA-MOC]] |
| **Bungou Stray Dogs** | `BSD` | 29 ghi chú: Dị năng lực, Yokohama, Trụ sở Thám tử và Mafia Cảng | [[_BSD-MOC]] |
| **Jujutsu Kaisen** | `JJK` | 16 ghi chú: Chú thuật, Chú linh, Gojo Satoru và Giới Chú thuật | [[_JJK-MOC]] |
| **TYPE-MOON / Fate** | `Fate` | 25 ghi chú: Hệ thống Chén Thánh, Lệnh chú (Command Spells), Servant | [[_Fate-MOC]] |
| **Honkai: Star Rail** | `HSR` | 24 ghi chú: Thiết lập Lệnh sứ (Emanator), Vận mệnh (Paths) và các Aeon | [[_HSR-MOC]] |
| **Detective Conan** | `CONAN` | 15 ghi chú: Thiết lập thế giới phá án, Tổ chức Áo đen | [[_CONAN-MOC]] |
| **DC Comics** | `DC` | 3 ghi chú: Gotham, Jason Todd (Red Hood) | [[_DC-MOC]] |

---

## 2. Cấu Trúc Chuẩn Cho Mỗi Universe (`00_Oeuvre.outline.md`)

Mỗi phân khu fandom được tổ chức theo 9 thực thể chuẩn:

```
Database/Fandom/[CODE] Fandom_Name/
├── universe.md           Ghi chú tổng quan về nguyên tác & nguồn canon được công nhận
├── characters/           Hồ sơ nhân vật nguyên tác (bảo toàn tính cách & tiểu sử gốc)
├── Arcs/                 Các hồi / cung truyện chính thức trong nguyên tác
├── locations/            Địa danh, bối cảnh, kiến trúc đặc thù
├── organizations/        Các phe phái, tổ chức, gia tộc
├── Power_System/         Hệ thống sức mạnh, năng lực siêu nhiên, quy tắc chiến đấu
├── Items/                Vật phẩm, bảo bối, vũ khí đặc thù
├── Worldbuilding/        Thiết lập xã hội, lịch sử thế giới, luật lệ căn bản
├── Timeline/             Biểu đồ thời gian và niên biểu các sự kiện canon
└── Lore/                 Thuật ngữ chuyên môn, thần thoại nội bộ của tác phẩm
```

## Placeholder folders

Recorded 2026-11-13. In all eight fandoms `Arcs/`, `Items/` and `Worldbuilding/` are kept on purpose and hold no file yet; a fandom may have further empty folders. `[CODE] Fandom_Name/` is the folder skeleton for a new fandom.
