---
id: meta.evasion-moc
type: info
scope: global
lane: personal
status: active
aliases: ["evasion moc", "05 evasion moc", "khu vuc sang tac va doc", "evasion zone map"]
related: ["[[_VAULT-MOC]]", "[[_OEUVRE-MOC]]"]
always_load: false
tags: [d/doc, k/moc, p/personal]
last_updated: 2026-11-11
---

# `05_Evasion/` — Sáng tác văn học & Dữ liệu thế giới

> **Bản quyền & Lane:** `lane: personal`. Toàn bộ dữ liệu sáng tác, dịch thuật và đọc truyện cá nhân. Tuyệt đối không đưa vào public portfolio.

---

## 1. Phân khu chức năng

| Phân khu | Mục đích | Thành phần |
|---|---|---|
| `01_Oeuvre/` | Khu vực sáng tác văn học, studio truyện và wiki database | [[_OEUVRE-MOC]] · `Studio/` (`Original/`, `Continue/`) · `Database/` (`Fandom/`, `Folklore/`, `Principle/`, `SI_OC/`, `Taxonomy/`, `Researcher/`) |
| `02_Library/` | Giao diện và ứng dụng đọc truyện tranh/truyện chữ cá nhân (Kệ Sách) | App đọc, server đọc, quản lý kệ truyện, OCR dịch bong bóng thoại truyện tranh |
| `03_Subsystems/` | Phân hệ công cụ hỗ trợ đọc và dịch thuật | `Verba/` (dữ liệu dịch thuật Trung-Việt), `Pilot/` (userscripts tải truyện/hỗ trợ đọc), `Nexus/` (Trạm Dịch TranslateCenter) |

---

## 2. Đường dẫn công cụ nhanh

- **Kệ Sách (`02_Library`):** `python server.py` hoặc `start.bat` (cổng `8771`).
- **Trạm Dịch Nexus (`03_Subsystems/Nexus`):** `python server.py` hoặc `start.bat` (cổng `8765`).
- **Userscripts Pilot (`03_Subsystems/Pilot`):** Bộ script Tampermonkey/Violentmonkey thu thập văn bản từ AO3, Lofter, JJWXC, FFN, Sangtacviet, Wikidich.
- **Verba Dữ liệu Dịch (`03_Subsystems/Verba`):** Bộ từ điển, cụm từ và tên riêng Trung-Việt.
